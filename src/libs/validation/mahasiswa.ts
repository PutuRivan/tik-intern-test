import { z } from 'zod';
import { JURUSAN_LIST } from '@/libs/mapper/jurusan-mapper';

const JURUSAN_VALUES = ['Informatika', 'Sistem Informasi', 'Teknik Elektro', 'Manajemen'] as const;

export const mahasiswaSchema = z.object({
  nim: z
    .string()
    .min(1, 'NIM wajib diisi.')
    .min(8, 'NIM minimal 8 digit.')
    .max(15, 'NIM maksimal 15 digit.')
    .regex(/^\d+$/, 'NIM hanya boleh berisi angka.'),

  nama: z
    .string()
    .min(1, 'Nama wajib diisi.')
    .min(3, 'Nama minimal 3 karakter.')
    .max(100, 'Nama maksimal 100 karakter.'),

  email: z
    .string()
    .min(1, 'Email wajib diisi.')
    .email('Format email tidak valid.')
    .max(100, 'Email maksimal 100 karakter.'),

  jurusan: z.enum(JURUSAN_VALUES).refine(
    (val) => JURUSAN_VALUES.includes(val as typeof JURUSAN_VALUES[number]),
    { message: 'Jurusan wajib dipilih.' }
  ),

  tanggal_lahir: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // optional
      const date = new Date(val);
      const now = new Date();
      return date <= now;
    }, 'Tanggal lahir tidak boleh di masa depan.')
    .refine((val) => {
      if (!val) return true;
      return new Date(val).getFullYear() >= 1900;
    }, 'Tahun lahir minimal 1900.'),
});

// Infer type from schema — no need to maintain DTO separately
export type MahasiswaFormValues = z.infer<typeof mahasiswaSchema>;