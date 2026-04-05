'use client';

import { register } from '@/libs/apis/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { RegisterDTO } from '@/libs/types/user';

interface RegisterForm extends RegisterDTO {
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Watch password for confirm password validation
  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    const result = await register({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push('/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {/* Nama */}
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Nama wajib diisi.',
            minLength: { value: 3, message: 'Nama minimal 3 karakter.' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        {/* Email */}
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
              placeholder="Masukkan email"
              type="email"
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password wajib diisi.',
            minLength: { value: 6, message: 'Password minimal 6 karakter.' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              placeholder="Masukkan password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: 'Konfirmasi password wajib diisi.',
            validate: (val) =>
              val === password || 'Konfirmasi password tidak cocok.',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              type={showConfirm ? 'text' : 'password'}
              fullWidth
              required
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm((s) => !s)}>
                      {showConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
          sx={{ py: 1.5, fontWeight: 600 }}
        >
          {isSubmitting
            ? <CircularProgress size={22} color="inherit" />
            : 'Daftar'
          }
        </Button>
      </Stack>
    </form>
  );
}