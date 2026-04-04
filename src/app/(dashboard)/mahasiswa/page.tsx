"use client"

import DashboardHeader from '@/components/dashboard/dashboard-header'
import TableMahasiswa from '@/components/dashboard/table-mahasiswa'
import { getMahasiswa } from '@/libs/apis/mahasiswa'
import { Mahasiswa } from '@/libs/types/mahasiswa'
import { Search } from '@mui/icons-material'
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function MahasiswaPage() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)

    getMahasiswa({ page: 1, perPage: 10 })
      .then((res) => setMahasiswa(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

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

      <TableMahasiswa data={mahasiswa} loading={loading} />

    </section>
  )
}