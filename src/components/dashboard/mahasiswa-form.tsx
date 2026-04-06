'use client';

import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JURUSAN_LIST } from '@/libs/mapper/jurusan-mapper';
import { mahasiswaSchema, type MahasiswaFormValues } from '@/libs/validation/mahasiswa';

interface MahasiswaFormProps {
  defaultValues?: Partial<MahasiswaFormValues>;
  onSubmit: (data: MahasiswaFormValues) => Promise<void>;
  serverError?: string;
  submitLabel?: string;
  onCancel: () => void;
}

export default function MahasiswaForm({
  defaultValues,
  onSubmit,
  serverError,
  submitLabel = 'Simpan',
  onCancel,
}: MahasiswaFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MahasiswaFormValues>({
    resolver: zodResolver(mahasiswaSchema), // ✅ zod handles all validation
    defaultValues: {
      nim: '',
      nama: '',
      email: '',
      jurusan: 'Informatika',
      tanggal_lahir: '',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <Alert severity="error">{serverError}</Alert>
      )}

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex-1">
          <Controller
            name="nama"
            control={control}
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

        <div className="flex-1">
          <Controller
            name="nim"
            control={control}
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

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex-1">
          <Controller
            name="email"
            control={control}
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

        <div className="flex-1">
          <Controller
            name="jurusan"
            control={control}
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

      <Divider sx={{ my: 3 }} />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isSubmitting}
          fullWidth
          sx={{ width: { sm: 'auto' } }}
        >
          Batal
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
          sx={{ fontWeight: 600, minWidth: 120, width: { sm: 'auto' } }}
        >
          {isSubmitting
            ? <CircularProgress size={20} color="inherit" />
            : submitLabel
          }
        </Button>
      </div>
    </form>
  );
}