"use client"

import DashboardHeader from "@/components/dashboard/dashboard-header";
import { getMahasiswaById } from "@/libs/apis/mahasiswa";
import { Mahasiswa } from "@/libs/types/mahasiswa";
import { Button, Card, CardContent, Chip, Divider } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function GridItems({
  title,
  value }: {
    title: string,
    value: string
  }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm">{title}</h4>
      <h3 className="text-xl">{value}</h3>
    </div>
  )
}

export default function DetailMahasiswaPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()


  const [mahasiswa, setMahasiswa] = useState<Mahasiswa | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    
    getMahasiswaById(Number(id))
      .then((res) => {
        if (res.success && res.data) {
          setMahasiswa(res.data)
        } else {
          setNotFound(true)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id])

  if (notFound || !mahasiswa) {
    return (
      <div className="grid place-items-center h-svh">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="font-bold text-3xl ">Mahasiswa Tidak Ditemukan</h1>
          <Button onClick={() => router.push('/mahasiswa')}>Kembali ke Daftar</Button>
        </div>
      </div>
    )
  }

  return (
    <section>
      <DashboardHeader
        title="Detail Mahasiswa"
        description="Informasi Lengkap data mahasiswa"
      />

      <Card>
        <CardContent>
          <div className="flex flex-row items-center gap-4 py-2">
            {/* Profile */}
            <div className="bg-primary aspect-square w-20 flex items-center justify-center rounded-full">
              <h6 className="font-bold text-white text-4xl">
                {mahasiswa.nama.charAt(0).toUpperCase()}
              </h6>
            </div>
            <div className="flex flex-col gap-1">
              <h1>{mahasiswa.nama}</h1>
              <Chip
                label={mahasiswa?.jurusan}
                color={"primary"}
                size="small"
                variant="outlined"
              />
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-2 gap-4 py-5">
            <GridItems title="NIM" value={mahasiswa.nim} />
            <GridItems title="Email" value={mahasiswa.email} />
            <GridItems title="Jurusan" value={mahasiswa.jurusan} />
            <GridItems title="Tanggal Lahir" value={mahasiswa.tanggal_lahir ?? "-"} />
            <GridItems title="Tanggal Daftar" value={mahasiswa.created_at} />
            <GridItems title="Tanggal Diperbaharui" value={mahasiswa.updated_at} />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

