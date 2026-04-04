"use client"

import DashboardHeader from '@/components/dashboard/dashboard-header'
import { getMahasiswaById, updateMahasiswa } from '@/libs/apis/mahasiswa'
import { JURUSAN_LIST } from '@/libs/mapper/jurusan-mapper';
import { Mahasiswa, UpdateMahasiswaDTO } from '@/libs/types/mahasiswa'
import { Alert, Button, Card, CardContent, CircularProgress, Divider, MenuItem, TextField } from '@mui/material';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function EditMahasiswaPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)

    getMahasiswaById(Number(id))
      .then((res) => {
        if (res.success && res.data) {
          setMahasiswa(res.data)
        } else {
          setNotFound(true)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateMahasiswaDTO>({
    defaultValues: {
      nim: '',
      nama: '',
      email: '',
      jurusan: 'Informatika',
      tanggal_lahir: '',
    },
  })

  useEffect(() => {
    if (!mahasiswa) return

    reset({
      nim: mahasiswa.nim,
      nama: mahasiswa.nama,
      email: mahasiswa.email,
      jurusan: mahasiswa.jurusan,
      tanggal_lahir: mahasiswa.tanggal_lahir ?? '',
    })
  }, [mahasiswa, reset])

  const onSubmit = async (data: UpdateMahasiswaDTO) => {
    setServerError('')
    try {
      const result = await updateMahasiswa(Number(id), data)
      if (!result.success) {
        setServerError(result.message)
        return
      }
      router.push('/mahasiswa')
    } catch {
      setServerError('Terjadi kesalahan. Silakan coba lagi.')
    }
  }

  if (loading) {
    return (
      <section className="space-y-5">
        <DashboardHeader
          title="Edit Mahasiswa"
          description="Isi form berikut untuk edit data mahasiswa"
        />

        <Card sx={{ Width: 640 }}>
          <CardContent sx={{ p: 3 }} className="flex justify-center">
            <CircularProgress />
          </CardContent>
        </Card>
      </section>
    )
  }

  if (notFound) {
    return (
      <section className="space-y-5">
        <DashboardHeader
          title="Edit Mahasiswa"
          description="Isi form berikut untuk edit data mahasiswa"
        />

        <Alert severity="error">Data mahasiswa tidak ditemukan.</Alert>
      </section>
    )
  }

  return (
    <section className="space-y-5">
      <DashboardHeader
        title="Edit Mahasiswa"
        description="Isi form berikut untuk edit data mahasiswa"
      />

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
                      value={field.value ?? ''}
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
                      value={field.value ?? ''}
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
                      value={field.value ?? ''}
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
                      value={field.value ?? ''}
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
                    value={field.value ?? ''}
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
