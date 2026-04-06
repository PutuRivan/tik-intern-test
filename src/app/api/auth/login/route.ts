import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { success } = await req.json();

  const res = NextResponse.json({ success: true });

  if (success) {
    res.cookies.set("is_authenticated", "true", {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });
  }

  return res;
}
