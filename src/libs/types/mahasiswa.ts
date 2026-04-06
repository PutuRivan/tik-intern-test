export type Jurusan =
  | "Informatika"
  | "Sistem Informasi"
  | "Teknik Elektro"
  | "Manajemen";

export interface Mahasiswa {
  id: number;
  nim: string;
  nama: string;
  email: string;
  jurusan: Jurusan;
  tanggal_lahir?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMahasiswaDTO {
  nim: string;
  nama: string;
  email: string;
  jurusan: Jurusan;
  tanggal_lahir: string;
}

export interface UpdateMahasiswaDTO extends Partial<CreateMahasiswaDTO> {}

export interface GetMahasiswaParams {
  page?: number;
  limit?: number;
  search?: string;
  jurusan?: string;
}

export interface GetMahasiswaResult {
  data: Mahasiswa[];
  total: number;
  totalPages: number;
  currentPage: number;
}
