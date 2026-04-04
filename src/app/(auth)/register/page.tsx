import React from 'react'
import { Card, CardContent, Divider } from '@mui/material';
import { Login, SchoolRounded } from '@mui/icons-material';
import RegisterForm from '@/components/auth/register-form';
import AuthHeader from '@/components/auth/auth-header';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="grid place-items-center h-screen">
      <Card className="max-w-lg w-full">
        <CardContent>
        <AuthHeader 
            title="Buat Akun Baru"
            description="Daftarkan diri anda ke Sistem Manajemen Mahasiswa"
        />
          <RegisterForm />
          <Divider sx={{my:3}} />
          <p className="text-center">Sudah Punya akun? <Link href={'/login'} className="text-blue-400 underline">Masuk</Link></p>
        </CardContent>
      </Card>
  </div>
  )
}
