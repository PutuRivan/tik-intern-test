import { Card, CardContent, Divider } from "@mui/material";
import React from "react";
import LoginForm from "@/components/auth/login-form";
import AuthHeader from "@/components/auth/auth-header";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid place-items-center h-screen">
      <Card className="max-w-lg w-full">
        <CardContent>
          <AuthHeader
            title="Selamat Datang"
            description="Masuk ke Sistem Manajemen Mahasiswa"
          />
          <LoginForm />
          <Divider sx={{ my: 3 }} />
          <p className="text-center">
            Belum Punya akun?{" "}
            <Link href={"/register"} className="text-blue-400 underline">
              Daftar Sekarang
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
