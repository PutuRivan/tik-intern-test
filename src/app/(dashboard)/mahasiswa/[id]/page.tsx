import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Card, CardContent, Chip, Divider } from "@mui/material";

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
                B
              </h6>
            </div>
            <div className="flex flex-col gap-1">
              <h1>Budi Santoso</h1>
              <Chip
                label={"Informatika"}
                color={"primary"}
                size="small"
                variant="outlined"
              />
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-2 gap-4 py-5">
            <GridItems title="NIM" value="2310511129" />
            <GridItems title="Email" value="budi.santoso@student.ac.id" />
            <GridItems title="Jurusan" value="Informatika" />
            <GridItems title="Tanggal Lahir" value="20 Mei 203" />
            <GridItems title="Tanggal Daftar" value="15 Januari 2024" />
            <GridItems title="Tanggal Diperbaharui" value="15 Januari 2024" />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

