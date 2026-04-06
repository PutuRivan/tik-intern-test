'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import MahasiswaForm from '@/components/dashboard/mahasiswa-form';
import { createMahasiswa } from '@/libs/apis/mahasiswa';
import toast from 'react-hot-toast';
import { MahasiswaFormValues } from '@/libs/validation/mahasiswa';

export default function TambahMahasiswaPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (data: MahasiswaFormValues) => {
    setServerError('');
    const result = await createMahasiswa(data);
    if (!result.success) {
      setServerError(result.message);
      return;
    }
    toast.success('Mahasiswa berhasil ditambahkan.');
    router.push('/mahasiswa');
  };

  return (
    <section className="min-w-0 space-y-4">
      <DashboardHeader
        title="Tambah Mahasiswa"
        description="Isi form berikut untuk menambahkan data mahasiswa baru"
      />
      <Card>
        <CardContent sx={{ p: 3 }}>
          <MahasiswaForm
            serverError={serverError}
            submitLabel="Simpan"
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </section>
  );
}