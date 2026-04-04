'use client'

import { useRouter } from 'next/navigation'
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { ArrowBack } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { createMahasiswa } from '@/libs/apis/mahasiswa'
import type { CreateMahasiswaDTO, Jurusan } from '@/libs/types/mahasiswa'
import { JURUSAN_LIST } from '@/libs/mapper/jurusan-mapper'
import { useState } from 'react'
import DashboardHeader from '@/components/dashboard/dashboard-header'

export default function TambahMahasiswaPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateMahasiswaDTO>({
    defaultValues: {
      nim: '',
      nama: '',
      email: '',
      jurusan: 'Informatika',
      tanggal_lahir: '',
    },
  })

  const onSubmit = async (data: CreateMahasiswaDTO) => {
    setServerError('')
    try {
      const result = await createMahasiswa(data)
      if (!result.success) {
        setServerError(result.message)
        return
      }
      router.push('/mahasiswa')
    } catch {
      setServerError('Terjadi kesalahan. Silakan coba lagi.')
    }
  }

  return (
    <section className="space-y-4">
      <DashboardHeader title="Tambah Mahasiswa" description="Isi form berikut untuk menambahkan data mahasiswa baru" />

      <Card sx={{ Width: 640 }}>
        <CardContent sx={{ p: 3 }}>
          {serverError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {serverError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nama & NIM */}
            <div className="flex flex-row gap-5">
              {/* Nama */}
              <div className='flex-1'>
                <Controller
                  name="nama"
                  control={control}
                  rules={{
                    required: 'Nama wajib diisi.',
                    minLength: {
                      value: 3,
                      message: 'Nama minimal 3 karakter.',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nama Lengkap"
                      fullWidth
                      required
                      error={!!errors.nama}
                      helperText={errors.nama?.message}
                    />
                  )}
                />
              </div>

              {/* NIM */}
              <div className='flex-1'>
                <Controller
                  name="nim"
                  control={control}
                  rules={{
                    required: 'NIM wajib diisi.',
                    pattern: {
                      value: /^\d+$/,
                      message: 'NIM hanya boleh berisi angka.',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="NIM"
                      fullWidth
                      required
                      placeholder="Contoh: 2021001001"
                      error={!!errors.nim}
                      helperText={errors.nim?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-row gap-5">
              {/* Email */}
              <div className='flex-1'>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email wajib diisi.',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Format email tidak valid.',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      fullWidth
                      required
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </div>

              {/* Jurusan */}
              <div className='flex-1'>
                <Controller
                  name="jurusan"
                  control={control}
                  rules={{ required: 'Jurusan wajib dipilih.' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Jurusan"
                      fullWidth
                      required
                      error={!!errors.jurusan}
                      helperText={errors.jurusan?.message}
                    >
                      {JURUSAN_LIST.map((j) => (
                        <MenuItem key={j} value={j}>{j}</MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </div>

            {/* Tanggal Lahir */}
            <div>
              <Controller
                name="tanggal_lahir"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tanggal Lahir"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.tanggal_lahir}
                    helperText={errors.tanggal_lahir?.message}
                  />
                )}
              />
            </div>

            <Divider sx={{ my: 3 }} />

            <div className="flex justify-end gap-3">
              <Button
                variant="outlined"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ fontWeight: 600, minWidth: 120 }}
              >
                {isSubmitting
                  ? <CircularProgress size={20} color="inherit" />
                  : 'Simpan'
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}