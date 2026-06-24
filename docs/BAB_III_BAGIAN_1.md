# BAB III — PELAKSANAAN KERJA PRAKTEK

## 3.1 Persiapan Lingkungan dan Tools

### 3.1.1 Prasyarat Sistem

Sebelum memulai kegiatan pengembangan dan analisis, perlu disiapkan lingkungan kerja dengan prasyarat sebagai berikut:

1. **Bun** — Runtime JavaScript dan package manager yang digunakan untuk menjalankan script, mengelola dependency, dan menjalankan development server.
2. **PostgreSQL** — Database relasional yang digunakan sebagai penyimpanan data utama aplikasi. Database dapat dijalankan secara lokal maupun melalui Docker.
3. **Git** — Version control system yang digunakan untuk melacak perubahan source code dan berkolaborasi dalam pengembangan.

### 3.1.2 Instalasi Dependency

Setelah repository dikloning, langkah pertama yang dilakukan adalah menginstal seluruh dependency proyek menggunakan perintah:

```bash
bun install
```

Perintah ini mengunduh dan memasang seluruh package yang didefinisikan dalam `package.json` workspaces. Struktur monorepo dengan Turborepo memastikan bahwa dependency diinstal untuk seluruh workspace secara efisien.

### 3.1.3 Konfigurasi Environment

Proyek menyediakan file `.env.example` sebagai template konfigurasi lingkungan. Variabel lingkungan yang perlu dikonfigurasi meliputi:

- `DATABASE_URL` — URL koneksi PostgreSQL.
- `BETTER_AUTH_SECRET` — Secret key untuk Better Auth.
- `BETTER_AUTH_URL` — Base URL aplikasi untuk authentication.
- `CORS_ORIGIN` — Origin yang diizinkan untuk CORS.
- `VITE_BETTER_AUTH_URL` — URL authentication untuk sisi client.

### 3.1.4 Menjalankan Database

Database PostgreSQL dapat dijalankan menggunakan Docker Compose yang telah disediakan:

```bash
docker compose up -d
```

Setelah database berjalan, skema database dibuat dan diperbarui menggunakan Drizzle ORM:

```bash
bun run db:push
```

### 3.1.5 Menjalankan Development Server

Development server dijalankan dengan perintah:

```bash
bun run dev
```

Perintah ini menjalankan aplikasi dalam mode pengembangan dengan fitur hot module replacement. Aplikasi dapat diakses melalui browser pada alamat yang ditentukan oleh konfigurasi Vite.

### 3.1.6 Perintah Penting

| Perintah | Fungsi |
| --- | --- |
| `bun run dev` | Menjalankan development server. |
| `bun run build` | Menjalankan production build. |
| `bun run check` | Menjalankan linting dan formatting check. |
| `bun run db:push` | Mendorong perubahan schema ke database. |
| `bun run db:generate` | Menghasilkan file migration dari schema. |
| `bun run db:migrate` | Menjalankan migrasi database. |
| `bun run db:studio` | Membuka Drizzle Studio untuk eksplorasi database. |
| `bun run check-types` | Menjalankan type checking TypeScript. |

## 3.2 Kegiatan Survei Lapangan dan Observasi Wilayah

### 3.2.1 Tujuan Kegiatan Lapangan

Selama kegiatan magang, penulis berkesempatan mengikuti survei lapangan ke beberapa wilayah binaan PT Petrokimia Gresik. Kegiatan ini bertujuan untuk mengamati secara langsung kondisi pasar, potensi pertanian, dan aktivitas penjualan di lapangan. Pemahaman kontekstual yang diperoleh dari kegiatan ini menjadi acuan dalam memvalidasi data yang dikelola dalam Sistem Informasi Manajemen Produk Baru. **[PERLU VERIFIKASI tujuan spesifik kegiatan survei]**

### 3.2.2 Lokasi yang Dikunjungi

Kegiatan survei lapangan dilaksanakan di empat wilayah, yaitu:

1. **Bojonegoro** — Observasi kondisi pertanian dan potensi pasar di wilayah Jawa Timur bagian barat.
2. **Banyuwangi** — Kunjungan ke kawasan pertanian di ujung timur Pulau Jawa.
3. **Jember** — Observasi sentra produksi pertanian dan perkebunan.
4. **Lumajang** — Pemantauan aktivitas distribusi produk dan kondisi kios.

**[PERLU VERIFIKASI tanggal kunjungan dan aktivitas spesifik per wilayah]**

### 3.2.3 Aktivitas Observasi

Aktivitas yang dilakukan selama survei lapangan meliputi:

- Kunjungan ke kios atau lokasi penjualan untuk mengamati proses bisnis di lapangan. **[PERLU VERIFIKASI detail aktivitas]**
- Pencatatan data geografis dan informasi lapangan yang relevan dengan data potensi pasar.
- Observasi jenis komoditas unggulan dan kebutuhan pupuk di masing-masing wilayah.
- Dokumentasi kondisi lapangan sebagai bahan verifikasi data sistem.

### 3.2.4 Hubungan dengan Kebutuhan Data Sistem

Data yang diamati di lapangan memiliki keterkaitan langsung dengan data yang dikelola dalam sistem:

- Informasi kondisi pasar menjadi acuan validasi data potensi provinsi dan kabupaten pada sistem.
- Data kios dan lokasi geografis mendukung modul Stall dan visualisasi peta interaktif.
- Observasi komoditas per wilayah memperkuat data pada modul Province Commodity dan Regency Commodity.
- Hasil survei digunakan dalam proses import data kios dari file Excel ke database melalui script `scripts/seed-stalls.ts`.

### 3.2.5 Manfaat Observasi Lapangan

Kegiatan observasi lapangan memberikan manfaat sebagai berikut:

- Memberikan pemahaman langsung tentang alur distribusi produk dari gudang ke kios dan ke petani.
- Membantu interpretasi data potensi pasar yang tersimpan dalam sistem.
- Menjembatani kesenjangan antara representasi data digital dengan kondisi aktual di lapangan.
- Mendukung rekomendasi pengembangan fitur berdasarkan kebutuhan pengguna lapangan.

## 3.3 Arsitektur Sistem

### 3.3.1 Arsitektur Full-Stack Monolith

Sistem Satu Peta Pasar menerapkan arsitektur full-stack monolith pada workspace `apps/web`. Berbeda dengan deskripsi template proyek yang membayangkan backend Hono terpisah pada folder `apps/server`, implementasi aktif menempatkan frontend dan backend dalam satu aplikasi TanStack Start. Seluruh lapisan aplikasi — mulai dari antarmuka pengguna, routing, API, authentication, hingga akses database — terintegrasi dalam satu kesatuan deployment.

### 3.3.2 Lapisan Aplikasi

**Frontend:**
- React 19 sebagai library komponen antarmuka.
- TanStack Router untuk file-based routing, loader, dan route guard.
- TanStack Query untuk pengelolaan server state dan caching.
- Tailwind CSS untuk styling utility-first.
- Leaflet dan React Leaflet untuk visualisasi peta interaktif.

**Backend:**
- Server route TanStack Start di `apps/web/src/routes/api` mengekspos endpoint.
- oRPC sebagai boundary API type-safe yang mendefinisikan procedure.
- Zod untuk validasi input setiap procedure.
- Better Auth untuk authentication dan session management.

**Database:**
- PostgreSQL sebagai database relasional utama.
- Drizzle ORM untuk query type-safe, definisi schema, dan migrasi.

### 3.3.3 Alur Request

Alur request dari antarmuka pengguna hingga database dapat digambarkan sebagai berikut:

```
Browser / Pengguna
    |
    ↓
React + TanStack Router
    |
    ↓ permintaan API (/api/rpc, /api, /api/auth)
TanStack Start Server Routes
    |
    ├── oRPC Procedures (public / protected)
    └── Better Auth (login, session, cookie)
    |
    ↓
Validasi Zod + Context (session, db)
    |
    ↓
Drizzle ORM (query builder type-safe)
    |
    ↓
PostgreSQL (penyimpanan data)
```

Data peta statis (GeoJSON) dimuat langsung dari folder `public/data/` oleh Leaflet tanpa melalui API.

### 3.3.4 Perbedaan dengan Deskripsi Template

Dokumentasi template proyek (`AGENTS.md`) menjelaskan struktur dengan backend Hono terpisah pada `apps/server`. Setelah dilakukan penelusuran source code, ditemukan bahwa struktur tersebut tidak sesuai dengan implementasi aktif. Folder `apps/server` tidak ditemukan, dan seluruh backend dijalankan dalam `apps/web` menggunakan server route TanStack Start. Laporan ini menggunakan kondisi implementasi aktif sebagai acuan pembahasan.

## 3.4 Struktur Proyek dan Pembagian Layer

### 3.4.1 Struktur Root

Struktur direktori root proyek terdiri dari:

- `apps/` — Container workspace aplikasi, dengan `apps/web` sebagai aplikasi aktif.
- `data/` — Berkas data pendukung, termasuk file Excel survei lapangan.
- `scripts/` — Script utilitas, termasuk `seed-stalls.ts` untuk import data kios.
- `docs/` — Dokumentasi proyek dan laporan magang.
- Konfigurasi root: `package.json`, `turbo.json`, `bun.lock`, `docker-compose.yml`, `.env.example`.

### 3.4.2 Struktur Aplikasi (`apps/web`)

Struktur direktori `apps/web/src/` mengikuti pola route-colocated feature modules:

| Direktori | Fungsi |
| --- | --- |
| `components/` | Komponen global (header, language switcher) dan komponen UI reusable (button, dialog, input, select, sidebar, tooltip). |
| `lib/` | Infrastruktur bersama: auth, database, Lingui, oRPC, TanStack Query. |
| `lib/auth/` | Konfigurasi Better Auth, client auth, middleware guard. |
| `lib/db/` | Koneksi database, schema Drizzle, dan migrasi. |
| `lib/db/schema/` | Schema tabel per domain: auth, map-product, sale, stall, todo. |
| `lib/orpc/` | Context, client, procedure, schema, dan komposisi router oRPC. |
| `routes/` | File-based routes: halaman publik, API, auth, admin, map. |
| `routes/admin/` | Layout, guard, navigasi, dan seluruh modul administrasi. |
| `routes/admin/*/-app/` | Procedure/use case backend (get, create, update, delete). |
| `routes/admin/*/-domain/` | Schema dan tipe data domain. |
| `routes/admin/*/-components/` | Tabel, form, dialog komponen presentasi. |
| `public/data/` | GeoJSON batas Indonesia dan kabupaten. |

### 3.4.3 Policy Dependency

Alur dependensi antar lapisan mengikuti arah berikut:

```
UI Components → Hooks → oRPC Client → Procedure (app) → Schema (domain) → Drizzle ORM → PostgreSQL
```

Struktur ini memastikan bahwa setiap lapisan memiliki tanggung jawab yang jelas dan dependensi hanya mengalir satu arah. Komponen UI tidak mengakses database secara langsung, melainkan melalui procedure oRPC yang menjembatani komunikasi client-server.
