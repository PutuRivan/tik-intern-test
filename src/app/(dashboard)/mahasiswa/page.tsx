"use client";

import { Add, Search } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TableMahasiswa from "@/components/dashboard/table-mahasiswa";
import { deleteMahasiswa, getMahasiswa } from "@/libs/apis/mahasiswa";
import { JURUSAN_LIST } from "@/libs/mapper/jurusan-mapper";
import type { Mahasiswa } from "@/libs/types/mahasiswa";

export default function MahasiswaPage() {
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [jurusan, setJurusan] = useState("");

  // Pagination state — MUI TablePagination uses 0-based page index
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMahasiswa({
        page: page + 1, // API is 1-based
        perPage: rowsPerPage,
        search,
        jurusan,
      });
      setMahasiswa(res.data);
      setTotal(res.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, search, jurusan]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0); // reset to first page on search
  };

  const handleJurusanChange = (value: string) => {
    setJurusan(value);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // reset to first page when changing rows per page
  };

  const handleDelete = async (id: number) => {
    await deleteMahasiswa(id);
    fetchData(); // refresh table after delete
  };

  return (
    <section className="min-w-0 space-y-5">
      <DashboardHeader
        title="Mahasiswa"
        description="Kelola seluruh data mahasiswa terdaftar"
      />

      <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row lg:items-center">
        <TextField
          placeholder="Cari berdasarkan NIM atau email..."
          value={search}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          size="small"
          className="w-full lg:flex-1"
        />

        <FormControl
          size="small"
          sx={{
            width: { xs: "100%", sm: "220px", lg: "180px" },
            flexShrink: 0,
          }}
        >
          <InputLabel id="jurusan-filter">Jurusan</InputLabel>
          <Select
            labelId="jurusan-filter"
            label="Jurusan"
            value={jurusan}
            onChange={(e) => handleJurusanChange(e.target.value)}
          >
            <MenuItem value="">Semua Jurusan</MenuItem>
            {JURUSAN_LIST.map((j) => (
              <MenuItem key={j} value={j}>
                {j}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push("/mahasiswa/tambah")}
          sx={{
            fontWeight: 600,
            whiteSpace: "nowrap",
            width: { xs: "100%", sm: "auto" },
            flexShrink: 0,
          }}
        >
          Tambah Mahasiswa
        </Button>
      </div>

      <TableMahasiswa
        data={mahasiswa}
        loading={loading}
        withPagination
        total={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onDelete={handleDelete}
      />
    </section>
  );
}
