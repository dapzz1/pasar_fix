# Codex Project Handoff

Dokumen ini adalah ringkasan konteks dan progres aktif proyek **Satu Peta Pasar** untuk melanjutkan pengembangan. Informasi di bawah disusun dari kondisi repository, riwayat Git, perubahan lokal, dan dokumen Markdown yang tersedia pada **19 Juni 2026**.

## 1. Ringkasan Proyek

Satu Peta Pasar adalah aplikasi web untuk mengelola dan memvisualisasikan data wilayah, lahan, komoditas, produk, potensi pasar, kios, serta penjualan. Implementasi aktif berada di `apps/web`; meskipun metadata Better-T-Stack menyebut backend Hono, frontend, server route, oRPC, autentikasi, dan akses database saat ini tergabung dalam satu aplikasi TanStack Start.

Stack utama:

- Bun dan Turborepo
- React 19 dan TanStack Start/Router
- oRPC dan TanStack Query
- PostgreSQL dan Drizzle ORM
- Better Auth
- Zod
- Tailwind CSS dan komponen shadcn/Radix UI
- Lingui untuk internasionalisasi
- Biome dan Ultracite untuk kualitas kode
- Netlify sebagai target deployment terakhir yang tercatat

## 2. Arsitektur Aktif

Pola utama proyek adalah feature-based dan route-colocated:

```text
apps/web/src/
├── components/ui/       # Komponen UI bersama
├── lib/                 # Auth, database, oRPC, i18n, dan infrastruktur
└── routes/              # TanStack file-based routes
    └── admin/<feature>/
        ├── -app/        # Query, mutation, dan use case server
        ├── -components/ # Form, modal, tabel, dan UI fitur
        ├── -domain/     # Schema dan aturan domain
        └── index.tsx    # Halaman route
```

Alur data umumnya:

```text
UI/form → oRPC client → protected/public procedure → Drizzle → PostgreSQL
        ← TanStack Query cache dan response type-safe ←
```

Semua penambahan fitur sebaiknya mengikuti pola folder fitur yang sudah ada dan memakai alias import `@/`.

## 3. Baseline Git

- Branch aktif: `main`
- Commit terakhir: `19dda4b` — `fix: update netlify deployment config`
- Tanggal commit terakhir: 27 Mei 2026
- Commit fitur besar terakhir: `7a38bb7` — `feat: complete stall and product brand management`

Riwayat setelah fitur tersebut didominasi konfigurasi dan perbaikan deployment Vercel/Netlify. Berdasarkan commit terakhir dan `NETLIFY.md`, Netlify adalah konfigurasi deployment terkini. Keberhasilan build tidak boleh dianggap sebagai bukti bahwa SSR/function production sudah berjalan; deployment tetap perlu diverifikasi dari URL dan Netlify Functions.

## 4. Progres yang Sudah Tercatat

Fitur yang telah tersedia di codebase dan dokumentasi:

- Autentikasi dan session dengan Better Auth.
- Route admin dan pengelolaan pengguna.
- Master data provinsi dan kabupaten/kota.
- Pengelolaan jenis lahan dan data lahan wilayah.
- Pengelolaan jenis komoditas dan data komoditas wilayah.
- Pengelolaan tipe produk, brand produk, dan dosis produk.
- Data potensi pasar per wilayah.
- Pengelolaan kios/stall dan relasi produk.
- Realisasi penjualan dan penjualan harian.
- Visualisasi peta berbasis Leaflet dan GeoJSON.
- Ekspor data penjualan ke Excel.
- Internasionalisasi Bahasa Indonesia dan Inggris.
- Konfigurasi build dan deployment Netlify.

Status detail dan tingkat kesiapan tiap modul dijelaskan dalam `PROJECT_DOCUMENTATION_FOR_INTERNSHIP.md`. Klaim di dokumen tersebut tetap harus diverifikasi terhadap source code sebelum digunakan sebagai bukti implementasi final.

## 5. Perubahan Lokal yang Sedang Dikerjakan

Working tree belum bersih. Terdapat perubahan pada 10 file source dan dua dokumen baru yang belum dilacak Git.

### 5.1 Product Dosage

Perubahan aktif mencakup:

- Menambahkan field `year` pada input create dan update.
- Menyimpan `year` melalui procedure oRPC.
- Mengambil `year` pada query daftar dosis.
- Menampilkan tahun pada kartu dosis produk.
- Menambahkan input tahun pada form create dan edit.
- Menyesuaikan tipe hasil query agar menerima nilai `null` dari database.
- Memperbaiki navigasi detail brand agar memakai route dan params TanStack Router yang eksplisit.
- Menyesuaikan bentuk `ORPCError` agar message dikirim melalui object options.

Schema database `product_dosages` sudah memiliki kolom `year` dengan default tahun saat ini. Jadi, perubahan ini terutama menghubungkan kolom yang sudah ada ke API dan UI.

Catatan yang perlu diselesaikan:

- Form create menampilkan input `year`, tetapi submit masih mengirim `String(new Date().getFullYear())`; nilai yang diketik pengguna belum dipakai.
- Default form create memakai angka, sedangkan API mengharapkan string. Tipe nilai form perlu dibuat konsisten.
- Validasi tahun masih terlalu longgar (`z.string().optional()`); pertimbangkan format empat digit dan rentang yang masuk akal.
- Formatting/indentasi beberapa file belum konsisten.
- Masih terdapat `any` dan `console.error` pada procedure/form terkait, yang bertentangan dengan aturan Ultracite di `AGENTS.md`.
- Perlu memastikan perubahan constructor `ORPCError` sesuai versi oRPC yang terpasang.

### 5.2 Sales Realization

Perubahan aktif mencakup:

- Menambahkan pilihan jumlah baris per halaman: 10, 25, 50, atau 100.
- Mengirim nilai `limit` terpilih ke query oRPC.
- Mengembalikan halaman ke 1 ketika limit berubah.

Catatan yang perlu diselesaikan:

- Belum ada bukti type-check, lint, test, atau pengujian manual pagination setelah perubahan.
- Import dan whitespace perlu dirapikan oleh formatter.
- State dan item edit masih menggunakan `any` pada file terkait.

### 5.3 Stall

Perubahan lokal hanya berupa penyesuaian indentasi pada `SelectTrigger`; tidak ada perubahan perilaku yang teridentifikasi.

### 5.4 Dokumentasi Baru

File yang belum dilacak Git:

- `NETLIFY.md`: handbook deployment, troubleshooting SSR/function, environment variables, dan checklist Netlify.
- `PROJECT_DOCUMENTATION_FOR_INTERNSHIP.md`: dokumentasi akademik yang sangat lengkap, termasuk arsitektur, database, API, keamanan, aktivitas magang, risiko, dan roadmap.

Kedua file perlu direview untuk data sensitif dan akurasi sebelum ditambahkan ke commit.

## 6. Validasi yang Masih Diperlukan

Belum ada hasil validasi baru untuk working tree saat dokumen ini dibuat. Sebelum perubahan dinyatakan selesai, jalankan dari root:

```bash
bun run check-types
bun run check
bun run build
```

Jika tersedia test yang relevan, jalankan juga:

```bash
cd apps/web
bun run test
```

Checklist pengujian manual minimum:

- Create product dosage dengan tahun yang dipilih pengguna.
- Edit tahun, dosis, dan unit lalu pastikan data tersimpan setelah refresh.
- Tampilkan nilai `null` tanpa crash pada daftar dosis.
- Buka detail dosis dari kartu product brand dan pastikan params route benar.
- Uji duplicate dosage dan pastikan pesan conflict tampil dengan benar.
- Ganti limit sales 10/25/50/100 dan pastikan query, jumlah baris, serta pagination sinkron.
- Pastikan perubahan tidak merusak export Excel.
- Jalankan build production dan smoke test route admin terkait.

## 7. Risiko dan Technical Debt Prioritas

Temuan utama dari `arch.md`, dokumentasi magang, dan source code:

1. Authorization perlu ditegakkan di procedure/API, bukan hanya melalui proteksi UI atau status login.
2. Migration database perlu dipastikan sinkron dengan schema Drizzle aktual.
3. Bentuk pagination, response, error, dan DTO antar modul perlu distandardisasi.
4. Penggunaan `any`, type assertion, dan penanganan error berbasis `console` perlu dikurangi.
5. Automated test untuk procedure, authorization, validasi, dan alur CRUD masih perlu diperkuat.
6. Query database memerlukan review index, constraint unik, foreign key, dan perilaku delete.
7. Dokumentasi template lama masih menyebut struktur atau command yang tidak selalu cocok dengan implementasi aktif.
8. Observability, audit log, serta strategi logging production belum matang.

Urutan perbaikan yang disarankan: correctness dan security, konsistensi API, hardening database, testing/observability, kemudian refactor UI reusable.

## 8. Aturan Implementasi

Ikuti `AGENTS.md` sebagai aturan kualitas utama. Ringkasan wajib:

- Pertahankan strict TypeScript; jangan menambah `any`, implicit any, atau `@ts-ignore`.
- Gunakan `import type` dan `export type` untuk tipe.
- Jangan meninggalkan import, parameter, atau variabel yang tidak digunakan.
- Tangani Promise dan error secara eksplisit.
- Patuhi semantic HTML dan seluruh aturan aksesibilitas.
- Gunakan elemen interaktif yang benar; button wajib memiliki `type`.
- Jangan menambahkan `console`, secret, token, atau credential ke source maupun dokumentasi.
- Gunakan TanStack Query untuk server state dan invalidasi cache setelah mutation.
- Validasi input pada boundary oRPC dengan Zod.
- Pertahankan pemisahan `-app`, `-domain`, dan `-components`.
- Format dan lint perubahan sebelum commit.

Jangan mengubah file generated seperti `routeTree.gen.ts` secara manual.

## 9. Command Penting

Dijalankan dari root repository:

```bash
bun install
bun run dev
bun run build
bun run check-types
bun run check
bun run db:start
bun run db:push
bun run db:generate
bun run db:migrate
bun run db:studio
```

Command aplikasi web tersedia di `apps/web/package.json`, termasuk `test`, `lint`, `format`, dan command Lingui.

## 10. Peta Dokumen Rujukan

| Dokumen | Fungsi | Catatan |
| --- | --- | --- |
| `AGENTS.md` | Aturan coding, type safety, a11y, React, dan Ultracite | Jadikan aturan utama saat mengubah kode |
| `arch.md` | Analisis arsitektur, coupling, anti-pattern, dan rekomendasi refactor | Rujukan teknis paling detail |
| `PROJECT_DOCUMENTATION_FOR_INTERNSHIP.md` | Dokumentasi sistem dan laporan magang | Verifikasi klaim terhadap kode aktual |
| `NETLIFY.md` | Deployment dan troubleshooting Netlify | Gunakan untuk build/SSR/function production |
| `GUIDEBOOK.md` | Panduan singkat pengguna Marketing Map | Rujukan perilaku aplikasi dari sisi pengguna |
| `README.md` | Dokumentasi template dan quick start | Sebagian isi masih generik/template lama |
| `CLAUDE.md` | Pedoman struktur layer dan feature organization | Melengkapi aturan arsitektur |
| `QWEN.md` | Alur spec-driven development | Relevan bila memakai spesifikasi di `.qwen/` |
| `GEMINI.md` | Ringkasan Better-T-Stack | Informasi umum, bukan status progres utama |

Jika terdapat perbedaan informasi, gunakan urutan prioritas: source code dan schema aktual, konfigurasi/package scripts, `AGENTS.md`, `arch.md`, lalu dokumen umum/template.

## 11. Rencana Lanjutan Terdekat

1. Selesaikan wiring field `year` agar input create benar-benar digunakan dan tervalidasi.
2. Rapikan type safety serta error handling pada seluruh file product dosage yang berubah.
3. Format perubahan dan jalankan type-check/lint.
4. Uji CRUD product dosage dan pagination sales secara manual.
5. Jalankan test dan production build.
6. Review dua dokumen baru sebelum staging.
7. Pisahkan commit source feature dari commit dokumentasi agar riwayat mudah ditinjau.

## 12. Definition of Done untuk Perubahan Aktif

Perubahan aktif dapat dinyatakan selesai apabila:

- Tahun product dosage dapat dibuat, dibaca, diperbarui, dan ditampilkan dengan benar.
- Nilai tahun dari form, API, dan database memiliki tipe dan validasi yang konsisten.
- Navigasi detail product brand berfungsi tanpa route error.
- Pagination sales mengikuti limit terpilih dan kembali ke halaman pertama saat limit berubah.
- Tidak ada error type-check, lint, test relevan, atau build.
- Tidak ada regresi pada CRUD, cache invalidation, export Excel, dan aksesibilitas form.
- Dokumentasi progres diperbarui sesuai hasil validasi aktual.

---

`codex.md` adalah living document. Perbarui bagian baseline Git, perubahan aktif, hasil validasi, risiko, dan rencana lanjutan setiap kali satu rangkaian pekerjaan selesai atau scope berubah.
