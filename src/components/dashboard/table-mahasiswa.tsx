"use client"

import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import type { Mahasiswa } from "@/libs/types/mahasiswa";
import { useRouter } from "next/navigation";
import { getJurusanColorMui } from "@/libs/mapper/jurusan-mapper";

interface TableMahasiswaProps {
  data: Mahasiswa[];
  loading: boolean;
}

export default function TableMahasiswa({
  data = [],
  loading = false,
}: TableMahasiswaProps) {
  const router = useRouter()
  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  NIM
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Nama
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Jurusan
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow hover>
                  <TableCell align="center" colSpan={5}>
                    <Typography color="text.secondary">
                      Memuat data mahasiswa...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow hover>
                  <TableCell align="center" colSpan={5}>
                    <Typography color="text.secondary">
                      Belum ada data mahasiswa.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((mahasiswa) => (
                  <TableRow hover key={mahasiswa.id}>
                    <TableCell align="center">{mahasiswa.nim}</TableCell>
                    <TableCell align="center">{mahasiswa.nama}</TableCell>
                    <TableCell align="center">{mahasiswa.email}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={mahasiswa.jurusan}
                        color={getJurusanColorMui(mahasiswa.jurusan)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex flex-row gap-2 items-center justify-center">
                        <Tooltip title="Detail">
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() => router.push(`/mahasiswa/${mahasiswa.id}`)}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hapus">
                          <IconButton size="small" color="error">
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
