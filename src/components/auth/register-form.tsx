"use client"

import React, {useState} from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button,  IconButton,  InputAdornment, Stack, TextField } from '@mui/material';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Stack spacing={2}>
      <TextField 
        label="Nama Lengkap"
        placeholder="Masukkan email"
        type="email"
        name="email" 
        fullWidth required 
      />
      <TextField 
        label="Email"
        placeholder="Masukkan email"
        type="email"
        name="email" 
        fullWidth required 
      />
      <TextField 
        label="Password"
        placeholder="Masukkan password"
        type={showPassword ? 'text' : 'password'} 
        name="password" 
        fullWidth 
        required 
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }}
      />
      <Button variant="contained" color="primary">Login</Button>
  </Stack>
  )
}
