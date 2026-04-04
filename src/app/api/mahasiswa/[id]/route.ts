import { db } from "@/libs/db";
import { Mahasiswa } from "@/libs/types/mahasiswa";
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = Number(id);
  const index = db.mahasiswa.findIndex((m) => m.id === numId);

  if (index === -1) {
    return Response.json(
      { success: false, message: "Mahasiswa tidak ditemukan." },
      { status: 404 },
    );
  }

  const body = await req.json();

  if (body.nim) {
    const nimExists = db.mahasiswa.some(
      (m) => m.nim === body.nim && m.id !== numId,
    );
    if (nimExists) {
      return Response.json(
        { success: false, message: "NIM sudah digunakan mahasiswa lain." },
        { status: 400 },
      );
    }
  }

  if (body.email) {
    const emailExists = db.mahasiswa.some(
      (m) => m.email === body.email && m.id !== numId,
    );
    if (emailExists) {
      return Response.json(
        { success: false, message: "Email sudah digunakan mahasiswa lain." },
        { status: 400 },
      );
    }
  }

  const updated: Mahasiswa = {
    ...db.mahasiswa[index],
    ...body,
    updated_at: new Date().toISOString(),
  };

  db.mahasiswa[index] = updated;

  return Response.json({
    success: true,
    message: "Data mahasiswa berhasil diperbarui.",
    data: updated,
  });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = db.mahasiswa.findIndex((m) => m.id === Number(id));

  if (index === -1) {
    return Response.json(
      { success: false, message: "Mahasiswa tidak ditemukan." },
      { status: 404 },
    );
  }

  db.mahasiswa.splice(index, 1);

  return Response.json({
    success: true,
    message: "Mahasiswa berhasil dihapus.",
  });
}
