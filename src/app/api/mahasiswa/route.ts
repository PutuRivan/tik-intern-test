import { db } from "@/libs/db"
import { Mahasiswa } from "@/libs/types/mahasiswa";
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const search = searchParams.get('search') ?? ""
  const page = Number(searchParams.get('page') ?? 1)
  const perPage = Number(searchParams.get('perPage') ?? 10)

  let filtered = db.mahasiswa

  if (search.trim()) {
    filtered = db.mahasiswa.filter((m) =>
      m.nim.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    )
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const data = filtered.slice(start, start + perPage)

  return Response.json({ data, total, totalPages, currentPage: page })
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const nimExists = db.mahasiswa.some((m) => m.nim === body.nim);
  if (nimExists) {
    return Response.json(
      { success: false, message: "NIM sudah terdaftar." },
      { status: 400 },
    );
  }

  const emailExists = db.mahasiswa.some((m) => m.email === body.email);
  if (emailExists) {
    return Response.json(
      { success: false, message: "Email sudah terdaftar." },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const newMahasiswa: Mahasiswa = {
    id: Date.now(),
    ...body,
    created_at: now,
    updated_at: now,
  };

  db.mahasiswa.push(newMahasiswa);

  return Response.json(
    {
      success: true,
      message: "Mahasiswa berhasil ditambahkan.",
      data: newMahasiswa,
    },
    { status: 201 },
  );
}
