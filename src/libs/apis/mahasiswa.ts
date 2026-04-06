import {
  CreateMahasiswaDTO,
  GetMahasiswaParams,
  GetMahasiswaResult,
  Mahasiswa,
  UpdateMahasiswaDTO,
} from "../types/mahasiswa";

const BASE_URL = "http://localhost:3001/mahasiswa";

export async function getAllMahasiswa(): Promise<Mahasiswa[]> {
  const res = await fetch(BASE_URL); // no params = returns ALL records
  if (!res.ok) throw new Error("Gagal mengambil data.");
  return res.json();
}

export async function getRecentMahasiswa(limit = 5): Promise<Mahasiswa[]> {
  // json-server v0 supports _sort and _order natively
  const params = new URLSearchParams({
    _sort: "created_at",
    _order: "desc",
    _limit: String(limit),
  });

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error("Gagal mengambil data.");
  return res.json();
}

export async function getMahasiswa({
  page = 1,
  perPage = 10,
  search = "",
  jurusan = "",
}: GetMahasiswaParams): Promise<GetMahasiswaResult> {
  // json-server uses _page, _per_page, and q for search
  const params = new URLSearchParams({
    _page: String(page),
    _per_page: String(perPage),
  });

  if (search.trim()) {
    params.append("q", search); // json-server full-text search
  }

  if (jurusan.trim()) {
    params.append("jurusan", jurusan);
  }

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error("Gagal mengambil data mahasiswa.");

  const data: Mahasiswa[] = await res.json();
  const total = Number(res.headers.get("X-Total-Count") ?? 0);
  const totalPages = Math.ceil(total / perPage);

  // json-server v1 pagination response shape
  return {
    data,
    total,
    totalPages,
    currentPage: page,
  };
}

export async function getMahasiswaById(
  id: number,
): Promise<{ success: boolean; data?: Mahasiswa; message?: string }> {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    return { success: false, message: "Mahasiswa tidak ditemukan." };
  }

  const data = await res.json();
  return { success: true, data };
}

export async function createMahasiswa(
  dto: CreateMahasiswaDTO,
): Promise<{ success: boolean; message: string; data?: Mahasiswa }> {
  // Check unique NIM
  const checkNim = await fetch(`${BASE_URL}?nim=${dto.nim}`);
  const nimData = await checkNim.json();
  if (nimData.length > 0) {
    return { success: false, message: "NIM sudah terdaftar." };
  }

  // Check unique email
  const checkEmail = await fetch(`${BASE_URL}?email=${dto.email}`);
  const emailData = await checkEmail.json();
  if (emailData.length > 0) {
    return { success: false, message: "Email sudah terdaftar." };
  }

  // Get current max id to generate next integer id
  const allRes = await fetch(`${BASE_URL}`);
  const allData: Mahasiswa[] = await allRes.json();
  const maxId =
    allData.length > 0 ? Math.max(...allData.map((m) => Number(m.id))) : 0;
  const nextId = maxId + 1;

  const now = new Date().toISOString();
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: nextId, // ✅ explicitly set integer id
      ...dto,
      created_at: now,
      updated_at: now,
    }),
  });

  if (!res.ok) {
    return { success: false, message: "Gagal menambahkan mahasiswa." };
  }

  const data = await res.json();
  return { success: true, message: "Mahasiswa berhasil ditambahkan.", data };
}

export async function updateMahasiswa(
  id: number,
  dto: UpdateMahasiswaDTO,
): Promise<{ success: boolean; message: string; data?: Mahasiswa }> {
  // Check unique NIM — exclude current record
  if (dto.nim) {
    const res = await fetch(`${BASE_URL}?nim=${dto.nim}`);
    const data: Mahasiswa[] = await res.json();
    // Now id is always number — no type mismatch
    if (data.some((m) => m.id !== id)) {
      return { success: false, message: "NIM sudah digunakan mahasiswa lain." };
    }
  }

  // Check unique email — exclude current record
  if (dto.email) {
    const res = await fetch(`${BASE_URL}?email=${dto.email}`);
    const data: Mahasiswa[] = await res.json();
    // Now id is always number — no type mismatch
    if (data.some((m) => m.id !== id)) {
      return {
        success: false,
        message: "Email sudah digunakan mahasiswa lain.",
      };
    }
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...dto,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    return { success: false, message: "Gagal memperbarui data mahasiswa." };
  }

  const result = await res.json();
  return {
    success: true,
    message: "Data mahasiswa berhasil diperbarui.",
    data: result,
  };
}

export async function deleteMahasiswa(
  id: number,
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    return { success: false, message: "Gagal menghapus mahasiswa." };
  }

  return { success: true, message: "Mahasiswa berhasil dihapus." };
}
