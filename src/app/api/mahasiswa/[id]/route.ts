import { db } from "@/libs/db";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const mahasiswa = db.mahasiswa.find((m) => m.id === Number(id));
  
  if (!mahasiswa) {
    return Response.json(
      { success: false, message: "Mahasiswa tidak ditemukan." },
      { status: 404 },
    );
  }

  return Response.json({ success: true, data: mahasiswa });
}