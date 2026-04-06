"use client";

import { PeopleAltRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import StatsCard from "@/components/dashboard/stats-card";
import TableMahasiswa from "@/components/dashboard/table-mahasiswa";
import { getAllMahasiswa, getRecentMahasiswa } from "@/libs/apis/mahasiswa";
import {
  getJurusanColorHex,
  getJurusanIcon,
  JURUSAN_LIST,
} from "@/libs/mapper/jurusan-mapper";
import type { Jurusan, Mahasiswa } from "@/libs/types/mahasiswa";

export default function DashboardPage() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [recentMahasiswa, setRecentMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([getAllMahasiswa(), getRecentMahasiswa(5)])
      .then(([all, recent]) => {
        setMahasiswa(all ?? []);
        setRecentMahasiswa(recent ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalByJurusan = JURUSAN_LIST.reduce(
    (acc, jurusan) => {
      acc[jurusan] = mahasiswa.filter((m) => m.jurusan === jurusan).length;
      return acc;
    },
    {} as Record<Jurusan, number>,
  );

  return (
    <section className="min-w-0 space-y-5">
      <DashboardHeader
        title="Dashboard"
        description="Ringkasan Data Mahasiswa"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-5">
        <StatsCard
          title="Total Mahasiswa"
          color="#1976d2"
          icon={<PeopleAltRounded />}
          value={mahasiswa.length}
        />
        {JURUSAN_LIST.map((jurusan) => (
          <StatsCard
            key={jurusan}
            title={jurusan}
            color={getJurusanColorHex(jurusan)}
            icon={getJurusanIcon(jurusan)}
            value={totalByJurusan[jurusan]}
          />
        ))}
      </div>

      <h1 className="text-2xl font-bold">Mahasiswa Terbaru</h1>
      <TableMahasiswa data={recentMahasiswa} loading={loading} />
    </section>
  );
}
