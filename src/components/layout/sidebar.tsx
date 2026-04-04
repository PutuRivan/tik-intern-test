'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// MUI Icons (boleh dipake tanpa MUI component)
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';

const menu = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'Mahasiswa',
    href: '/mahasiswa',
    icon: GroupIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
          <SchoolIcon fontSize="small" />
        </div>

        <div>
          <p className="font-semibold text-sidebar-foreground">
            Sistem Mahasiswa
          </p>
          <p className="text-sm text-muted-foreground">
            Manajemen Data
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-1 px-3 py-4">
        {menu.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-all
                  ${isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'}
                `}
              >
                <Icon fontSize="small" />

                <span className="font-medium">
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}