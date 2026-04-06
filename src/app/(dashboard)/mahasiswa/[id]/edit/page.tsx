'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert, Card, CardContent, CircularProgress } from '@mui/material';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import MahasiswaForm from '@/components/dashboard/mahasiswa-form';
import { getMahasiswaById, updateMahasiswa } from '@/libs/apis/mahasiswa';
import type { CreateMahasiswaDTO, Mahasiswa } from '@/libs/types/mahasiswa';
import toast from 'react-hot-toast';
import { MahasiswaFormValues } from '@/libs/validation/mahasiswa';

export default function EditMahasiswaPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState<Mahasiswa | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    getMahasiswaById(Number(id))
      .then((res) => {
        if (res.success && res.data) {
          setMahasiswa(res.data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: MahasiswaFormValues) => {
    setServerError('');
    const result = await updateMahasiswa(Number(id), data);
    if (!result.success) {
      setServerError(result.message);
      return;
    }
    toast.success('Data mahasiswa berhasil diperbarui.');
    router.push('/mahasiswa');
  };

  if (loading) {
    return (
      <section className="min-w-0 space-y-5">
        <DashboardHeader
          title="Edit Mahasiswa"
          description="Isi form berikut untuk edit data mahasiswa"
        />
        <Card>
          <CardContent className="flex justify-center" sx={{ p: 3 }}>
            <CircularProgress />
          </CardContent>
        </Card>
      </section>
    );
  }

  if (notFound) {
    return (
      <section className="min-w-0 space-y-5">
        <DashboardHeader
          title="Edit Mahasiswa"
          description="Isi form berikut untuk edit data mahasiswa"
        />
        <Alert severity="error">Data mahasiswa tidak ditemukan.</Alert>
      </section>
    );
  }

  return (
    <section className="min-w-0 space-y-5">
      <DashboardHeader
        title="Edit Mahasiswa"
        description="Isi form berikut untuk edit data mahasiswa"
      />
      <Card>
        <CardContent sx={{ p: 3 }}>
          <MahasiswaForm
            // ✅ pre-fill form with existing data
            defaultValues={{
              nim: mahasiswa?.nim,
              nama: mahasiswa?.nama,
              email: mahasiswa?.email,
              jurusan: mahasiswa?.jurusan,
              tanggal_lahir: mahasiswa?.tanggal_lahir ?? '',
            }}
            serverError={serverError}
            submitLabel="Simpan Perubahan"
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </section>
  );
}