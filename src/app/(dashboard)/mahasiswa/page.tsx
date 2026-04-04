import DashboardHeader from '@/components/dashboard/dashboard-header'
import TableMahasiswa from '@/components/dashboard/table-mahasiswa'
import { Search } from '@mui/icons-material'
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

export default function MahasiswaPage() {
  return (
    <section className="space-y-5">
      <DashboardHeader
        title="Mahasiswa"
        description="Kelola seluruh data mahasiswa terdaftar"
      />
      <div className="flex flex-row w-full gap-4">
        <TextField
          placeholder="Cari Berdasarkan NIM atau email..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            )
          }}
          size="small"
          className="flex-1"
        />

        <FormControl size="small" sx={{ minWidth: "120px" }}>
          <InputLabel id="jurusan">Jurusan</InputLabel>
          <Select
            labelId="jurusan"
            label="Jurusan"
          >
            <MenuItem value={'informatika'}>Informatika</MenuItem>
            <MenuItem value={'sistem-informasi'}>Sistem Informasi</MenuItem>
            <MenuItem value={'Teknik'}>Teknik</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableMahasiswa />

    </section>
  )
}