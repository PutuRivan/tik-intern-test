
# Sistem Manajemen Mahasiswa

Aplikasi frontend untuk manajemen data mahasiswa yang dibangun dengan **Next.js**, **Tailwind CSS**, dan **Material UI**. Data dikelola menggunakan **json-server** sebagai mock REST API.

---

## Tech Stack

| Teknologi | Kegunaan |
|---|---|
| Next.js 15 (App Router) | Framework frontend |
| Tailwind CSS | Utility-first styling |
| Material UI v7 | UI component library |
| json-server v0 | Mock REST API |
| Zustand | Global state management (auth) |
| React Hook Form | Form state management |
| Zod | Schema validation |
| bcryptjs | Password hashing |
| react-hot-toast | Notification/toaster |

---

## Fitur

- **Autentikasi** — Login, Register, Logout dengan password hashing (bcryptjs)
- **Dashboard** — Statistik total mahasiswa per jurusan + daftar mahasiswa terbaru
- **CRUD Mahasiswa** — Tambah, lihat detail, edit, dan hapus data mahasiswa
- **Pencarian** — Real-time search berdasarkan NIM atau email
- **Filter Jurusan** — Filter data berdasarkan program studi
- **Paginasi** — Navigasi halaman dengan pilihan jumlah baris per halaman
- **Proteksi Route** — Middleware Next.js memproteksi halaman dashboard
- **Responsif** — Mendukung tampilan mobile, tablet, dan desktop

---

## Instalasi

### 1. Clone repositori

```bash
git clone <repository-url>
cd intern-user-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan aplikasi

Jalankan Next.js dan json-server secara bersamaan:

```bash
npm run dev:all
```

Atau jalankan secara terpisah di dua terminal:

```bash
# Terminal 1 — Next.js (http://localhost:3000)
npm run dev

# Terminal 2 — json-server (http://localhost:3001)
npm run json-server
```

### 4. Buka di browser

```
http://localhost:3000
```

---

## Scripts

| Script | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan Next.js development server |
| `npm run json-server` | Menjalankan json-server di port 3001 |
| `npm run dev:all` | Menjalankan keduanya secara bersamaan |
| `npm run build` | Build untuk production |
| `npm run lint` | Menjalankan linter |

---

## Akun Demo

| Email | Password | Status |
|---|---|---|
| admin@example.com | password | ✅ Aktif |
| john.doe@example.com | password | ✅ Aktif |
| jane.doe@example.com | password | ❌ Tidak Aktif |

> **Catatan:** Password disimpan dalam bentuk hash (bcrypt) di `db.json`.

---

## Struktur Folder

```
src/
├── app/
│   ├── api/                        # Next.js API Routes
│   │   └── auth/
│   │       ├── login/
|   |       |    └── route.ts       # Set cookie saat login
│   │       └── logout/
|   |           └── route.ts        # Hapus cookie saat logout
│   ├── (auth)/                     # Halaman autentikasi
│   │   ├── login/
|   |       └── page.tsx
│   │   └── register/
|   |       └── page.tsx
│   └── (dashboard)/                # Halaman dashboard (protected)
│       ├── layout.tsx
│       ├── dashboard/
|       |   └── page.tsx
│       ├── mahasiswa/
│       │   ├── page.tsx            # Daftar mahasiswa
│       │   ├── tambah/
|       |   |    └── page.tsx       # Tambah mahasiswa
│       │   └── [id]/
│       │       ├── page.tsx        # Detail mahasiswa
│       │       └── edit/
|       |           └── page.tsx    # Edit mahasiswa
│       └── profile/
│           └──  page.tsx
├── components/
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── dashboard/
│   │   ├── dashboard-header.tsx
│   │   ├── mahasiswa-form.tsx      # Reusable form (create & edit)
│   │   ├── stats-card.tsx
│   │   └── table-mahasiswa.tsx
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── sidebar.tsx
│   └── providers/
│       └── mui-provider.tsx
├── libs/
│   ├── apis/
│   │   ├── auth.ts                 # Login, register, logout
│   │   └── mahasiswa.ts            # CRUD mahasiswa
│   ├── mapper/
│   │   └── jurusan-mapper.tsx      # Mapping jurusan → warna/icon
│   ├── store/
│   │   └── auth-store.ts           # Zustand auth store
│   ├── types/
│   │   ├── mahasiswa.ts
│   │   └── user.ts
│   └── validation/
│       ├── auth.ts                 # Zod schema login & register
│       └── mahasiswa.ts            # Zod schema mahasiswa
├── middleware.ts                   # Route protection
└── db.json                         # json-server database (root)
```

---

## Arsitektur & Keputusan Teknis

### Mock API dengan json-server
Data dikelola menggunakan **json-server v0** yang berjalan di `http://localhost:3001`. json-server dipilih karena mendukung operasi REST (GET, POST, PATCH, DELETE), pagination, sorting, dan full-text search secara out-of-the-box tanpa perlu membuat backend sendiri. Data tersimpan di `db.json` sehingga perubahan CRUD bersifat persisten selama server berjalan.

### Proteksi Route dengan Middleware
Proteksi halaman dashboard menggunakan **Next.js Middleware** (`middleware.ts`) yang berjalan di sisi server sebelum halaman dirender. Cookie `is_authenticated` di-set melalui API Route saat login dan dihapus saat logout, sehingga middleware selalu membaca status autentikasi yang akurat.

### State Management
**Zustand** digunakan hanya untuk menyimpan data sesi pengguna (`user`, `isAuthenticated`) yang perlu diakses secara global. State UI lokal seperti pencarian, paginasi, dan loading dikelola dengan `useState` di masing-masing komponen — sesuai prinsip *use the right tool for the job*.

### Reusable Form
Form tambah dan edit mahasiswa menggunakan komponen yang sama (`mahasiswa-form.tsx`). Perbedaan antara mode create dan edit dikelola melalui prop `defaultValues` dan `onSubmit` yang diinjeksikan dari halaman masing-masing.

### Validasi dengan Zod
Validasi form menggunakan **Zod schema** yang didefinisikan di `libs/validation/`. Schema Zod diintegrasikan dengan React Hook Form melalui `zodResolver` dari `@hookform/resolvers`. Pendekatan ini memisahkan logika validasi dari komponen sehingga mudah diuji dan digunakan ulang.

### Password Hashing
Password di-hash menggunakan **bcryptjs** di sisi klien sebelum disimpan ke json-server. Meskipun dalam produksi hashing sebaiknya dilakukan di sisi server, pendekatan ini dipilih karena keterbatasan mock API.