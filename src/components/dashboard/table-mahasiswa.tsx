import React from 'react'
import { Card, CardContent, Chip, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { Delete, Edit, Visibility } from '@mui/icons-material'

export default function TableMahasiswa() {
  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }} align="center">NIM</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">Nama</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">Jurusan</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell align="center">2310511129</TableCell>
                <TableCell align="center">Putu Rivan</TableCell>
                <TableCell align="center">rivanputu55@gmail.com</TableCell>
                <TableCell align="center">
                  <Chip
                    label={"Informatika"}
                    color={"primary"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" justifyContent="center" spacing={0.5}>
                    <Tooltip title="Detail">
                      <IconButton
                        size="small"
                        color="info"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="primary"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton
                        size="small"
                        color="error"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer >
      </CardContent>
    </Card>
  )
}
