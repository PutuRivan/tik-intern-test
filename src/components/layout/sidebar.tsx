'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/libs/store/auth-store';
import { logout } from '@/libs/apis/auth';
import toast from 'react-hot-toast';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { Divider, IconButton } from '@mui/material';

const menu = [
  { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { label: 'Mahasiswa', href: '/mahasiswa', icon: GroupIcon },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  const isProfileActive = pathname.startsWith('/profile');

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <SchoolIcon fontSize="small" className='text-white' />
        </div>
        <div>
          <p className="font-semibold text-sidebar-foreground">Sistem Mahasiswa</p>
          <p className="text-sm text-muted-foreground">Manajemen Data</p>
        </div>

        {/* Close button — mobile only */}
        {onClose && (
          <IconButton
            onClick={onClose}
            size="small"
            className="ml-auto lg:hidden"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {menu.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <div
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-all
                  ${isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }
                `}
              >
                <Icon fontSize="small" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* PROFILE SECTION */}
      <div className="px-3 pb-4">
        <Divider sx={{ mb: 2 }} />

        {/* Profile link */}
        <Link href="/profile" onClick={onClose}>
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all mb-1
            ${isProfileActive
                ? 'bg-primary text-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }
              `}

          >
            {/* Avatar */}
            <div className={`aspect-square w-10 rounded-full ${isProfileActive ? "bg-white" : "bg-primary"} flex items-center justify-center shrink-0`}>
              <span className={`text-sm font-bold ${isProfileActive ? "text-primary" : "text-white"}`}>
                {user?.name?.charAt(0).toUpperCase() ?? <PersonIcon fontSize="small" />}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name ?? 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email ?? ''}</p>
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
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden lg:flex w-[260px] h-screen bg-sidebar border-r border-sidebar-border flex-col sticky top-0">
        <SidebarContent />
      </aside>

      {/* ── MOBILE HAMBURGER BUTTON ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center px-4 py-3 bg-white border-b border-gray-200">
        <IconButton onClick={() => setMobileOpen(true)}>
          <MenuIcon />
        </IconButton>
        <div className="flex items-center gap-2 ml-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white">
            <SchoolIcon sx={{ fontSize: 16 }} />
          </div>
          <span className="font-semibold text-sm">Sistem Mahasiswa</span>
        </div>
      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          onClick={() => setMobileOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Drawer */}
          <aside
            className="relative w-[260px] h-full bg-sidebar border-r border-sidebar-border flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}