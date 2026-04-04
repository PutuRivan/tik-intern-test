import { GetMahasiswaParams, GetMahasiswaResult, Mahasiswa } from "../types/mahasiswa";

const BASE_URL = '/api/mahasiswa'

export async function getMahasiswa({
  page = 1,
  perPage = 10,
  search = ''
}: GetMahasiswaParams): Promise<GetMahasiswaResult> {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
    search
  })

  const res = await fetch(`${BASE_URL}?${params}`)
  if (!res.ok) throw new Error('Gagal Mengambil data mahasiswa')
  return res.json()
}

export async function getMahasiswaById(
  id: number
): Promise<{ success: boolean; data?: Mahasiswa; message?: string }> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}