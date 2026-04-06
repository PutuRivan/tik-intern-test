"use client";

import { login } from "@/libs/apis/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { LoginDTO } from "@/libs/types/user";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDTO>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginDTO) => {
    const result = await login(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email wajib diisi.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Format email tidak valid.",
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

        <Controller
          name="password"
          control={control}
          rules={{ required: "Password wajib diisi." }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              placeholder="Masukkan password"
              type={showPassword ? "text" : "password"}
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
          sx={{ py: 1.5, fontWeight: 600 }}
        >
          {isSubmitting ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Masuk"
          )}
        </Button>
      </Stack>
    </form>
  );
}
