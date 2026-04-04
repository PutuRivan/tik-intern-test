import { db } from "@/libs/db"
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