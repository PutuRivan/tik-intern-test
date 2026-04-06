"use client";

import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getJurusanColorMui } from "@/libs/mapper/jurusan-mapper";
import type { Mahasiswa } from "@/libs/types/mahasiswa";

interface TableMahasiswaProps {
  data: Mahasiswa[];
  loading: boolean;
  // Pagination props — optional so dashboard doesn't need them
  withPagination?: boolean;
  total?: number;
  page?: number;
  limit?: number;
  onPageChange?: (newPage: number) => void;
  onlimitChange?: (newlimit: number) => void;
  // Delete prop — optional so dashboard doesn't need it
  onDelete?: (id: number) => void;
}

export default function TableMahasiswa({
  data = [],
  loading = false,
  withPagination = false,
  total = 0,
  page = 0,
  limit = 10,
  onPageChange,
  onlimitChange,
  onDelete,
}: TableMahasiswaProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;
    setDeleteLoading(true);
    try {
      await onDelete?.(deleteId);
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 720 }}>
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
                  <TableRow>
                    <TableCell align="center" colSpan={5} sx={{ py: 6 }}>
                      <CircularProgress size={28} />
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={5} sx={{ py: 6 }}>
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
                              onClick={() =>
                                router.push(`/mahasiswa/${mahasiswa.id}`)
                              }
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() =>
                                router.push(`/mahasiswa/${mahasiswa.id}/edit`)
                              }
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {onDelete && (
                            <Tooltip title="Hapus">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setDeleteId(mahasiswa.id)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

              {/* Pagination inside table footer — only for mahasiswa page */}
              {withPagination && (
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      sx={{
                        "& .MuiTablePagination-toolbar": {
                          flexWrap: "wrap",
                          justifyContent: "flex-end",
                          gap: 1,
                          px: { xs: 1, sm: 2 },
                        },
                      }}
                      count={total}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      onPageChange={(_, newPage) => onPageChange?.(newPage)}
                      onRowsPerPageChange={(e) =>
                        onlimitChange?.(Number(e.target.value))
                      }
                      labelRowsPerPage="Baris per halaman:"
                      labelDisplayedRows={({ from, to, count }) =>
                        `${from}–${to} dari ${count}`
                      }
                    />
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle>Hapus Mahasiswa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus data mahasiswa ini? Tindakan ini
            tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} disabled={deleteLoading}>
            Batal
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              "Hapus"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
