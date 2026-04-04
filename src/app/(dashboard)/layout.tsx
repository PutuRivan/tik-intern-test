'use client';

import { ReactNode } from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import Sidebar from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
    <Sidebar />
    <main className="flex-1 bg-background p-6">
      {children}
    </main>
  </div>
  );
}