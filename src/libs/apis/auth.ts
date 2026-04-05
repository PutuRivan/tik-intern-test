import { useAuthStore } from '@/libs/store/auth-store';
import type { AuthUser, LoginDTO, RegisterDTO } from '@/libs/types/user';
import bcrypt from 'bcryptjs';

const BASE_URL = 'http://localhost:3001/users';

export async function login(
  dto: LoginDTO
): Promise<{ success: boolean; message: string; data?: AuthUser }> {
  const res = await fetch(`${BASE_URL}?email=${dto.email}`);
  const users = await res.json();

  if (users.length === 0) {
    return { success: false, message: 'Email atau password salah.' };
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(dto.password, user.password);
  if (!isMatch) {
    return { success: false, message: 'Email atau password salah.' };
  }

  if (!user.is_active) {
    return { success: false, message: 'Akun Anda tidak aktif.' };
  }

  // ✅ Set cookie via API route (server-side, reliable)
  await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true }),
  });

  const { password: _, ...authUser } = user;
  useAuthStore.getState().setUser(authUser);

  return { success: true, message: 'Login berhasil.', data: authUser };
}

export async function register(
  dto: RegisterDTO
): Promise<{ success: boolean; message: string }> {
  const checkEmail = await fetch(`${BASE_URL}?email=${dto.email}`);
  const existing = await checkEmail.json();
  if (existing.length > 0) {
    return { success: false, message: 'Email sudah terdaftar.' };
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const allRes = await fetch(BASE_URL);
  const allUsers = await allRes.json();
  const maxId = allUsers.length > 0
    ? Math.max(...allUsers.map((u: { id: number }) => Number(u.id)))
    : 0;
  const nextId = maxId + 1;

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: nextId,
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      is_active: true,
      register_date: new Date().toISOString().split('T')[0],
    }),
  });

  if (!res.ok) {
    return { success: false, message: 'Gagal melakukan registrasi.' };
  }

  return { success: true, message: 'Registrasi berhasil. Silakan login.' };
}

export async function logout(): Promise<void> {
  // ✅ Delete cookie via API route (server-side, reliable)
  await fetch('/api/auth/logout', { method: 'POST' });
  useAuthStore.getState().clearUser();
}