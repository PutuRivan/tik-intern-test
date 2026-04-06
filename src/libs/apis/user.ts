const BASE_URL = 'http://localhost:3001/users';

export async function updateUserName(
  id: number,
  name: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) return { success: false, message: 'Gagal memperbarui nama.' };
  return { success: true, message: 'Nama berhasil diperbarui.' };
}

export async function updateUserEmail(
  id: number,
  email: string
): Promise<{ success: boolean; message: string }> {
  // Check email uniqueness
  const checkRes = await fetch(`${BASE_URL}?email=${email}`);
  const existing = await checkRes.json();
  const emailTaken = existing.some((u: { id: number }) => u.id !== id);
  if (emailTaken) {
    return { success: false, message: 'Email sudah digunakan pengguna lain.' };
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) return { success: false, message: 'Gagal memperbarui email.' };
  return { success: true, message: 'Email berhasil diperbarui.' };
}