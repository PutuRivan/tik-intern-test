"use client";

import { PersonRounded } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Card, CardContent, Chip, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { logout } from "@/libs/apis/auth";
import { useAuthStore } from "@/libs/store/auth-store";

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-base">{value || "-"}</p>
    </div>
  );
}

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Berhasil keluar.");
    setTimeout(() => {
      router.push("/login");
    }, 100);
  };
  return (
    <section className="min-w-0 space-y-5">
      <DashboardHeader
        title="Profil Saya"
        description="Informasi akun pengguna"
      />

      <Card>
        <CardContent sx={{ p: 3 }}>
          <div className="mb-4 flex gap-4 sm:flex-row sm:items-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
              <span className="text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() ?? <PersonRounded />}
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="wrap-break-word text-xl font-bold">{user?.name}</h2>
              <Chip
                label={user?.is_active ? "Aktif" : "Tidak Aktif"}
                color={user?.is_active ? "success" : "error"}
                size="small"
              />
            </div>
          </div>

          <Divider sx={{ mb: 3 }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileRow label="Nama Lengkap" value={user?.name ?? "-"} />
            <ProfileRow label="Email" value={user?.email ?? "-"} />
            <ProfileRow
              label="Tanggal Daftar"
              value={user?.register_date ?? "-"}
            />
            <ProfileRow
              label="Status Akun"
              value={user?.is_active ? "Aktif" : "Tidak Aktif"}
            />
          </div>

          <div className="mt-10 flex w-full justify-stretch sm:justify-end">
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <LogoutIcon fontSize="small" />
              <span className="font-medium text-sm">Keluar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
