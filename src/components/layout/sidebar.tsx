"use client";

import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import { Divider, IconButton } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/libs/store/auth-store";

const menu = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "Mahasiswa", href: "/mahasiswa", icon: GroupIcon },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  const isProfileActive = pathname.startsWith("/profile");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
          <SchoolIcon fontSize="small" className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sidebar-foreground">
            Sistem Mahasiswa
          </p>
          <p className="text-sm text-muted-foreground">Manajemen Data</p>
        </div>

        {onClose && (
          <IconButton
            onClick={onClose}
            size="small"
            className="ml-auto xl:hidden"
            aria-label="Tutup menu navigasi"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {menu.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <div
                className={`flex items-center gap-3 rounded-full px-4 py-3 transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon fontSize="small" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <Divider sx={{ mb: 2 }} />

        <Link href="/profile" onClick={onClose}>
          <div
            className={`mb-1 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
              isProfileActive
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <div
              className={`flex aspect-square w-10 shrink-0 items-center justify-center rounded-full ${
                isProfileActive ? "bg-white" : "bg-primary"
              }`}
            >
              <span
                className={`text-sm font-bold ${isProfileActive ? "text-primary" : "text-white"}`}
              >
                {user?.name?.charAt(0).toUpperCase() ?? (
                  <PersonIcon fontSize="small" />
                )}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user?.name ?? "User"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email ?? ""}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[260px] flex-col border-r border-sidebar-border bg-sidebar xl:flex">
        <SidebarContent />
      </aside>

      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-sidebar-border bg-white px-4 py-3 xl:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
            <SchoolIcon sx={{ fontSize: 16 }} />
          </div>
          <span className="truncate text-sm font-semibold">
            Sistem Mahasiswa
          </span>
        </div>

        <IconButton
          onClick={() => setMobileOpen(true)}
          aria-label="Buka menu navigasi"
        >
          <MenuIcon />
        </IconButton>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup menu navigasi"
          />

          <aside className="relative ml-auto flex h-full w-[260px] max-w-[85vw] flex-col border-l border-sidebar-border bg-sidebar shadow-xl">
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
