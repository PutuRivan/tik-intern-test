import React from 'react'
import StatsCard from '@/components/dashboard/stats-card'
import { Card, CardContent, CardHeader } from '@mui/material'
import TableMahasiswa from '@/components/dashboard/table-mahasiswa'
import DashboardHeader from '@/components/dashboard/dashboard-header'

export default function DashboardPage() {
  return (
    <section className="space-y-5">
      {/* Header */}
      <DashboardHeader
        title="Dashboard"
        description="Ringkasan Data Mahasiswa"
      />

      <div className="grid grid-cols-5">
        <StatsCard />
      </div>

      <h1 className="text-2xl font-bold ">Mahasiswa Terbaru</h1>
      <TableMahasiswa />
    </section>
  )
}
