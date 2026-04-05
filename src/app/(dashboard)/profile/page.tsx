'use client';

import DashboardHeader from '@/components/dashboard/dashboard-header';
import { useAuthStore } from '@/libs/store/auth-store';
import { PersonRounded } from '@mui/icons-material';
import { Card, CardContent, Chip, Divider } from '@mui/material';

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-base">{value || '-'}</p>
    </div>
  );
}

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <section className="space-y-5">
      <DashboardHeader
        title="Profil Saya"
        description="Informasi akun pengguna"
      />

      <Card className="max-w-xl">
        <CardContent sx={{ p: 3 }}>
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
              <span className="text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() ?? <PersonRounded />}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <Chip
                label={user?.is_active ? 'Aktif' : 'Tidak Aktif'}
                color={user?.is_active ? 'success' : 'error'}
                size="small"
              />
            </div>
          </div>

          <Divider sx={{ mb: 3 }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileRow label="Nama Lengkap" value={user?.name ?? '-'} />
            <ProfileRow label="Email" value={user?.email ?? '-'} />
            <ProfileRow label="Tanggal Daftar" value={user?.register_date ?? '-'} />
            <ProfileRow
              label="Status Akun"
              value={user?.is_active ? 'Aktif' : 'Tidak Aktif'}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}