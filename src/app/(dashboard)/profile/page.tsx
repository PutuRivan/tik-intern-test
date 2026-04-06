'use client';

import { PersonRounded } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Card, CardContent, Chip, Divider } from '@mui/material';
import toast from 'react-hot-toast';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import EditableField from '@/components/dashboard/editable-field';
import ProfileRow from '@/components/dashboard/profile-row';
import { logout } from '@/libs/apis/auth';
import { updateUserEmail, updateUserName } from '@/libs/apis/user';
import { useAuthStore } from '@/libs/store/auth-store';
import { formatDate } from '@/libs/utils';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const handleLogout = async () => {
    await logout();
    toast.success('Berhasil keluar.');
    window.location.href = '/login';
  };

  const handleSaveName = async (newName: string) => {
    if (!user) return;
    const result = await updateUserName(user.id, newName);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    setUser({ ...user, name: newName });
    toast.success(result.message);
  };

  const handleSaveEmail = async (newEmail: string) => {
    if (!user) return;
    const result = await updateUserEmail(user.id, newEmail);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    setUser({ ...user, email: newEmail });
    toast.success(result.message);
  };

  return (
    <section className="min-w-0 space-y-5">
      <DashboardHeader
        title="Profil Saya"
        description="Informasi akun pengguna"
      />

      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Avatar */}
          <div className="mb-4 flex gap-4 sm:flex-row sm:items-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
              <span className="text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() ?? <PersonRounded />}
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="wrap-break-word text-xl font-bold">{user?.name}</h2>
              <Chip
                label={user?.is_active ? 'Aktif' : 'Tidak Aktif'}
                color={user?.is_active ? 'success' : 'error'}
                size="small"
              />
            </div>
          </div>

          <Divider sx={{ mb: 3 }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <EditableField
              label="Nama Lengkap"
              value={user?.name ?? ''}
              onSave={handleSaveName}
              type="text"
            />
            <EditableField
              label="Email"
              value={user?.email ?? ''}
              onSave={handleSaveEmail}
              type="email"
            />
            <ProfileRow
              label="Tanggal Daftar"
              value={formatDate(user?.register_date)}
            />
            <ProfileRow
              label="Status Akun"
              value={user?.is_active ? 'Aktif' : 'Tidak Aktif'}
            />
          </div>

          <div className="mt-10 flex w-full justify-stretch sm:justify-end">
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              startIcon={<LogoutIcon fontSize="small" />}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              <span className="font-medium text-sm">Keluar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}