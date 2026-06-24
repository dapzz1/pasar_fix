# DIAGRAM_MASTERLIST

**Proyek:** PENGEMBANGAN BACKEND SISTEM INFORMASI MANAJEMEN PRODUK BARU UNTUK MENDUKUNG PENGELOLAAN DATA DAN MONITORING PRODUK BERBASIS WEB PADA PT PETROKIMIA GRESIK

**Mahasiswa:** Henokh Yeremia Olbrain Perangin Angin — NBI: 1462300075

**Target:** 15 diagram

---

# 1. Diagram Arsitektur Sistem

## Tujuan Diagram
Menggambarkan arsitektur full-stack monolith aplikasi Satu Peta Pasar. Menunjukkan bahwa backend tidak berada pada service Hono terpisah (seperti tertulis di template `AGENTS.md`) melainkan menyatu dalam workspace `apps/web`. Memperlihatkan alur komunikasi dari browser (React 19, TanStack Router, TanStack Query) melalui server TanStack Start menuju oRPC procedure, serta bagaimana setiap procedure mengakses database melalui Drizzle ORM dan menangani authentication melalui Better Auth. Serta menunjukkan jalur data GeoJSON statis menuju Leaflet untuk visualisasi peta.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.3 — Arsitektur Sistem**

## Data yang Diperlukan
- Diagram ASCII arsitektur dari `MAGANG_REPORT_CONTEXT.md` bagian ARSITEKTUR SISTEM
- Struktur folder `apps/web` dan keterangan fungsi setiap layer dari `arch.md`
- Konfigurasi oRPC context (`lib/orpc/context.ts`) — session + db
- Router oRPC (`lib/orpc/router/index.ts`) — pengelompokan endpoint
- Konfigurasi Better Auth (`lib/auth/index.ts`) — Drizzle adapter
- Integrasi TanStack Query (`lib/tanstack-query/`)
- Alur request dari browser ke PostgreSQL

## Bentuk Diagram yang Direkomendasikan
**Blok diagram/arsitektur** menggunakan Draw.io atau Excalidraw. Tampilkan kotak-kotak layer yang berjejer vertikal dengan panah request (atas ke bawah) dan response (bawah ke atas).

Elemen minimal:
- Browser (React 19, TanStack Router, TanStack Query)
- TanStack Start Server Routes (`routes/api/`)
- oRPC Procedures (public + protected)
- Better Auth (session, cookie)
- Drizzle ORM
- PostgreSQL
- GeoJSON (`public/data/`) → Leaflet Map

## Estimasi Halaman Pembahasan
2–3 halaman (narasi arsitektur + diagram)

## Screenshot Pendukung
- No 79 — Struktur file router oRPC
- No 80 — oRPC context (opsional)
- No 81 — Route handler API (opsional)

---

# 2. Diagram Struktur Project

## Tujuan Diagram
Menunjukkan hierarki folder repository dan pembagian layer berdasarkan arsitektur route-colocated feature modules. Memperlihatkan bahwa kode dikelompokkan dalam `apps/web` dengan pemisahan infrastructure (`lib/`), routing (`routes/`), dan komponen bersama (`components/`). Serta menunjukkan pola folder `-app`, `-domain`, `-components` pada setiap modul admin sebagai implementasi Clean Architecture.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.4 — Struktur Proyek dan Pembagian Layer**

## Data yang Diperlukan
- Struktur project dari `arch.md` bagian FOLDER STRUCTURE HIERARCHY
- Daftar folder dalam `apps/web/src/`: `routes/`, `lib/`, `components/`, `styles/`, `hooks/`
- Contoh struktur modul admin: `routes/admin/stall/` dengan subfolder `-app`, `-domain`, `-components`, `-hooks`
- Folder infrastructure: `lib/auth/`, `lib/db/`, `lib/orpc/`, `lib/lingui/`
- Root files: `package.json`, `turbo.json`, `netlify.toml`, `vite.config.ts`

## Bentuk Diagram yang Direkomendasikan
**Tree diagram** menggunakan Draw.io atau Mermaid. Tampilkan folder tree dengan indentasi dan anotasi fungsi masing-masing folder. Beri warna berbeda untuk layer infrastructure, feature modules, dan shared components.

## Estimasi Halaman Pembahasan
2–3 halaman (narasi struktur + diagram)

## Screenshot Pendukung
- No 68 — Struktur folder schema Drizzle
- No 69 — Struktur folder migration
- No 25 — Admin sidebar navigasi

---

# 3. Entity Relationship Diagram (ERD)

## Tujuan Diagram
Menampilkan seluruh entitas database (22 tabel), primary key (UUID), foreign key, dan relasi antar domain. Mencakup domain autentikasi (`user`, `session`, `account`, `verification`), wilayah (`provinces`, `regencies`), lahan (`land_types`, `province_lands`, `regency_lands`), komoditas (`commodity_types`, `province_commodities`, `regency_commodities`), produk (`product_types`, `product_brands`, `product_dosages`), potensi (`province_potentials`, `regency_potentials`), kios (`stalls`, `stall_product_brands`), penjualan (`sales_realizations`, `daily_sales`), dan demo (`todo`). Juga menandai temuan: missing FK `daily_sales.province_id`, dan potensi mismatch nama field `realizaton_ytd` pada migration.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.5 — Perancangan Database**

## Data yang Diperlukan
- Seluruh definisi tabel dari schema Drizzle: `auth.ts`, `map-product.ts`, `sale.ts`, `stall.ts`, `todo.ts`
- Analisis 22 tabel dari `MAGANG_REPORT_CONTEXT.md` bagian DATABASE ANALYSIS
- Informasi PK, FK, dan relasi dari dokumentasi database
- Temuan: missing FK, mismatch migration, unique constraint

## Bentuk Diagram yang Direkomendasikan
**ERD standar (crow's foot notation)** menggunakan Draw.io, dbdiagram.io, atau Drizzle Studio (screenshot dianotasi). Tampilkan seluruh tabel dengan kolom-kolom kunci dan garis relasi. Pisahkan domain dengan warna berbeda (biru untuk auth, hijau untuk wilayah/lahan, oranye untuk produk, merah untuk penjualan, ungu untuk kios).

## Estimasi Halaman Pembahasan
6–8 halaman (seluruh subbab database termasuk ERD)

## Screenshot Pendukung
- No 70 — Potongan schema `auth.ts`
- No 71 — Potongan schema `map-product.ts`
- No 72 — Potongan schema `sale.ts`
- No 73 — Potongan schema `stall.ts` (opsional)
- No 74 — Daftar tabel di Drizzle Studio
- No 78 — ERD tekstual dari dokumentasi

---

# 4. Diagram Login Flow

## Tujuan Diagram
Menjelaskan alur login dari input email/password oleh pengguna hingga memperoleh session. Menunjukkan interaksi antara browser, Better Auth route handler, dan tabel `user`, `account`, serta `session` di PostgreSQL. Alur mencakup: inisiasi login, validasi kredensial, pembuatan session, pengiriman cookie, dan redirect ke halaman tujuan.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.7 — Authentication dan Authorization**

## Data yang Diperlukan
- Konfigurasi Better Auth (`lib/auth/index.ts`) — email/password provider, Drizzle adapter
- Auth client signIn function
- Route handler auth (`routes/api/auth.$.ts`)
- Tabel `user` (email, password hash, role), `account` (credential), `session` (token, expires)
- Alur redirect setelah login

## Bentuk Diagram yang Direkomendasikan
**UML Sequence Diagram** menggunakan Mermaid atau Draw.io. Aktor: User, Browser, Better Auth Server, PostgreSQL. Lifeline vertikal dengan panah pesan berurutan.

Langkah sequence:
1. User → Browser: input email + password
2. Browser → Better Auth: POST `/api/auth/sign-in`
3. Better Auth → PostgreSQL: query `user` + `account`
4. PostgreSQL → Better Auth: user data + password hash
5. Better Auth → PostgreSQL: insert `session`
6. PostgreSQL → Better Auth: session token
7. Better Auth → Browser: set cookie + 302 redirect
8. Browser → User: landing page

## Estimasi Halaman Pembahasan
1–2 halaman (dalam subbab Authentication)

## Screenshot Pendukung
- No 13 — Halaman login (`/auth/login`)
- No 14 — Halaman signup (`/auth/signup`)
- No 16 — Gagal login
- No 17 — Redirect setelah login berhasil
- No 89 — Session cookie di browser DevTools
- No 92 — Potongan konfigurasi Better Auth

---

# 5. Diagram Authentication Flow (Route Guard & Authorization)

## Tujuan Diagram
Menunjukkan mekanisme route guard pada halaman admin dan mekanisme protected procedure pada API oRPC. Memperlihatkan dua skenario: (1) admin berhasil mengakses `/admin` karena memiliki session dan role admin, (2) guest/gagal login ditolak akses dan diarahkan ke halaman login. Juga menunjukkan gap authorization: route UI memeriksa role, sedangkan protected procedure API hanya memeriksa session.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.7 — Authentication dan Authorization**

## Data yang Diperlukan
- Route guard admin (`routes/admin/route.tsx`) — `beforeLoad` + `redirect`
- Protected procedure definition (`lib/orpc/index.ts`) — `protectedProcedure` middleware
- oRPC context (`lib/orpc/context.ts`) — session dari Better Auth
- Nilai role: `admin`, `viewer`, `guest` pada kolom `user.role`
- Route guard map (`routes/map/route.tsx`) — admin/viewer access

## Bentuk Diagram yang Direkomendasikan
**Flowchart** untuk menampilkan decision tree akses. Mulai dari request masuk → cek session? → cek role? → izinkan/tolak. Atau **UML Sequence Diagram** dengan dua skenario paralel (admin vs guest).

Elemen minimal:
- Request ke `/admin`
- Pemeriksaan session (redirect ke `/auth/login` jika tidak ada)
- Pemeriksaan role admin (redirect jika bukan admin)
- Request ke protected API procedure
- Pemeriksaan session (error unauthorized jika tidak ada)
- Gap: role tidak diperiksa di API layer

## Estimasi Halaman Pembahasan
1–2 halaman (dalam subbab Authentication)

## Screenshot Pendukung
- No 88 — Route guard admin (`routes/admin/route.tsx`)
- No 90 — Guest ditolak akses `/admin`
- No 91 — Admin berhasil membuka halaman admin
- No 87 — `protectedProcedure` pada kode
- No 93 — Tabel `user` dengan kolom role (opsional)

---

# 6. Diagram API Flow

## Tujuan Diagram
Menjelaskan alur data dari komponen React hingga database dan kembali, untuk operasi query (pembacaan data) dan mutation (penulisan data). Untuk query: komponen → `useQuery(oRPC.queryOptions)` → `/api/rpc/$` → handler Drizzle → response → cache → render. Untuk mutation: form → `useMutation` → `/api/rpc/$` → validasi Zod → Drizzle insert/update/delete → invalidate cache → refetch → toast.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.6 — Perancangan API**

## Data yang Diperlukan
- oRPC client (`lib/orpc/client.ts`) — isomorphic client (server + browser)
- TanStack Query integration (`lib/tanstack-query/`) — `createTanstackQueryUtils`
- Contoh query: `orpc.admin.region.province.get.queryOptions({})`
- Contoh mutation: `orpc.admin.stall.create.mutationOptions({})`
- Route handler RPC (`routes/api/rpc.$.ts`)
- Proses invalidasi query setelah mutation
- Validasi Zod di client (form) dan server (procedure)

## Bentuk Diagram yang Direkomendasikan
**UML Sequence Diagram** dengan dua bagian (query dan mutation). Atau **Activity Diagram** yang menunjukkan alur decision dan parallel flow.

Bagian Query:
1. Komponen → `useQuery(opts)`
2. TanStack Query → cek cache (jika ada → render langsung)
3. Cache miss → oRPC client → `/api/rpc/$`
4. oRPC router → handler `-app/get-*.ts`
5. Handler → `context.db.select()` → PostgreSQL
6. Response → TanStack Query cache → UI render

Bagian Mutation:
1. Form → validasi Zod client
2. `useMutation` → oRPC client → `/api/rpc/$`
3. oRPC router → validasi Zod server
4. Handler → `context.db.insert()` → PostgreSQL
5. Return data → `invalidateQueries({ queryKey })`
6. Refetch → toast sukses

## Estimasi Halaman Pembahasan
2–3 halaman (dalam subbab Perancangan API)

## Screenshot Pendukung
- No 79 — Struktur router oRPC
- No 82 — Response health check
- No 83 — Response unauthorized
- No 84 — Response validation error Zod
- No 85 — Response success query (opsional)

---

# 7. Diagram Modul Province dan Regency

## Tujuan Diagram
Menunjukkan alur pengelolaan data master wilayah pada dua level: Province (provinsi) dan Regency (kabupaten/kota). Memperlihatkan relasi one-to-many antara Province dan Regency, operasi CRUD yang tersedia pada masing-masing modul, serta fitur search dan pagination pada daftar data. Setiap entitas menyimpan kode, nama, luas, dan tahun.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.8.1 — Modul Wilayah (Province dan Regency)**

## Data yang Diperlukan
- Endpoint: `admin.region.province.get/create/update/delete`
- Endpoint: `admin.region.regency.get/create/update/delete`
- Tabel `provinces` (id, code, name, area, year)
- Tabel `regencies` (id, code, name, province_id FK, area, year)
- Schema domain Province dan Regency
- Form field: kode, nama, luas, tahun, provinsi induk (untuk regency)
- Fitur: search by name/code, pagination

## Bentuk Diagram yang Direkomendasikan
**Activity Diagram** untuk menggambarkan alur CRUD dari admin membuka menu hingga data tersimpan. Tampilkan pula relasi parent-child Province → Regency menggunakan diagram entitas sederhana di pojok.

Langkah CRUD Province:
1. Admin buka menu Province
2. Sistem tampilkan tabel (search, pagination)
3. Admin create/edit/delete
4. Validasi → oRPC → Drizzle → response
5. List refetch

Langkah CRUD Regency (sama, ditambah dropdown Province)

## Estimasi Halaman Pembahasan
2 halaman

## Screenshot Pendukung
- No 27 — Daftar Province
- No 28 — Form tambah Province
- No 29 — Form edit Province
- No 30 — Dialog hapus Province (opsional)
- No 31 — Daftar Regency
- No 32 — Form tambah/edit Regency

---

# 8. Diagram Modul Commodity

## Tujuan Diagram
Menunjukkan pengelolaan data komoditas yang mencakup tiga level: Commodity Type (master jenis komoditas), Province Commodity (komoditas tingkat provinsi — read-only), dan Regency Commodity (komoditas tingkat kabupaten — CRUD penuh). Memperlihatkan relasi Commodity Type dengan Land Type (jenis lahan) sebagai parent. Juga menunjukkan perbedaan status implementasi: Province Commodity hanya menyajikan data (read-only) sedangkan Regency Commodity memiliki operasi CRUD lengkap.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.8.3 — Modul Komoditas**

## Data yang Diperlukan
- Endpoint: `admin.commodity.commodity_type.get/create/update/delete`
- Endpoint: `admin.commodity.province_commodity.get` (read-only)
- Endpoint: `admin.commodity.regency_commodity.get/create/update/delete`
- Tabel `commodity_types` (land_type_id FK), `province_commodities` (province_id FK + commodity_type_id FK), `regency_commodities` (regency_id FK + commodity_type_id FK)
- Filter Commodity Type by Land Type
- Data: luas area, tahun

## Bentuk Diagram yang Direkomendasikan
**Activity Diagram + Entity Diagram kombinasi.** Tampilkan tiga bagian: (1) CRUD Commodity Type dengan filter Land Type, (2) Province Commodity read-only (tanpa tombol create/edit/delete), (3) Regency Commodity dengan CRUD penuh. Sertakan relasi Land Type → Commodity Type → Province/Regency Commodity.

## Estimasi Halaman Pembahasan
2 halaman

## Screenshot Pendukung
- No 33 — Daftar Commodity Type
- No 34 — Form tambah/edit Commodity Type
- No 35 — Daftar Province Commodity (read-only)
- No 36 — Daftar Regency Commodity
- No 37 — Form tambah/edit Regency Commodity (opsional)

---

# 9. Diagram Product Brand Flow

## Tujuan Diagram
Menunjukkan alur pengelolaan master Product Brand. Product Brand adalah entitas sentral yang direferensikan oleh Product Dosage, Province Potential, Regency Potential, Sales Realization, Daily Sales, dan Stall Product Brand. Diagram ini mencakup CRUD Product Brand (create, read, update, delete), relasi dengan parent Product Type, serta daftar modul lain yang bergantung pada Product Brand.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.8.4 — Modul Produk**

## Data yang Diperlukan
- Endpoint: `admin.product.product_brand.get/create/update/delete`
- Tabel `product_brands` (product_type_id FK, name, industry, description)
- Tabel `product_types` sebagai parent
- Modul dependen: `product_dosages`, `province_potentials`, `regency_potentials`, `sales_realizations`, `daily_sales`, `stall_product_brands`
- Fitur search dan filter

## Bentuk Diagram yang Direkomendasikan
**Activity Diagram** untuk alur CRUD + **Entity Dependency Diagram** untuk menunjukkan modul-modul yang bergantung pada Product Brand.

Langkah CRUD:
1. Admin buka menu Product Brand
2. Tabel daftar (search, filter by product type)
3. Admin tambah: input nama, industri, deskripsi, pilih Product Type
4. Submit → validasi → oRPC → Drizzle insert → refetch
5. Edit/Delete dengan pola serupa

## Estimasi Halaman Pembahasan
1–2 halaman

## Screenshot Pendukung
- No 40 — Daftar Product Brand
- No 41 — Form tambah/edit Product Brand

---

# 10. Diagram Product Dosage Flow

## Tujuan Diagram
Menunjukkan alur pengelolaan Product Dosage yang menghubungkan Commodity Type dengan Product Brand. Setiap dosage mencatat nilai dosis, satuan, dan tahun untuk kombinasi brand dan komoditas tertentu. Hierarki data: Product Type → Product Brand → Product Dosage (dengan Commodity Type). Juga mencatat adanya perubahan lokal penambahan field `year` yang belum di-commit.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.8.4 — Modul Produk**

## Data yang Diperlukan
- Endpoint: `admin.product.product_dosage.get/create/update/delete`
- Tabel `product_dosages` (commodity_type_id FK, product_brand_id FK, dosage, unit, year)
- Schema domain Product Dosage
- Relasi: Commodity Type dan Product Brand sebagai referensi
- Perubahan lokal: field `year` pada create/get/update [PERLU VERIFIKASI status commit]

## Bentuk Diagram yang Direkomendasikan
**Activity Diagram** untuk alur CRUD. Tampilkan hierarki data menggunakan nested box atau entity relationship kecil di sudut diagram.

Langkah:
1. Admin memilih Product Brand dari daftar
2. Sistem menampilkan daftar dosage untuk brand tersebut
3. Admin tambah: pilih Commodity Type, input dosis, unit, tahun
4. Submit → validasi → oRPC → Drizzle insert ke `product_dosages`
5. List refetch
6. Edit/Delete

Relasi hierarki:
`Product Type (1) → Product Brand (N) → Product Dosage (N)`
`Commodity Type (1) → Product Dosage (N)`

## Estimasi Halaman Pembahasan
1–2 halaman

## Screenshot Pendukung
- No 42 — Daftar Product Dosage
- No 43 — Form tambah/edit Product Dosage

---

# 11. Diagram Province Potential Flow

## Tujuan Diagram
Menunjukkan alur penyajian data Province Potential (potensi produk tingkat provinsi). Modul ini berstatus **read-only**: data dapat dilihat, difilter, dan dicari, tetapi operasi create, update, dan delete belum diaktifkan pada router oRPC. Data menampilkan nilai potensi suatu Product Brand pada provinsi tertentu, lengkap dengan deskripsi dan tahun.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.8.5 — Modul Potensi**

## Data yang Diperlukan
- Endpoint: `admin.potential.province_potential.get` (read-only — create/update/delete belum aktif)
- Tabel `province_potentials` (province_id FK, product_brand_id FK, potential_value, description, year)
- Filter: provinsi, product brand, tahun
- Perbandingan: Regency Potential ada di database tetapi endpoint aktif belum ditemukan [PERLU VERIFIKASI]

## Bentuk Diagram yang Direkomendasikan
**Activity Diagram** yang menunjukkan keterbatasan modul: admin hanya dapat melihat daftar dan menerapkan filter, tanpa tombol create/edit/delete. Gunakan simbol "terminator" atau "X" pada operasi yang belum aktif.

Langkah:
1. Admin buka menu Province Potential
2. Sistem tampilkan tabel (filter: provinsi, brand, tahun)
3. Admin dapat: search, filter, view details
4. Operasi create/edit/delete: **tidak tersedia** (beri label "Read-Only")

## Estimasi Halaman Pembahasan
1 halaman

## Screenshot Pendukung
- No 44 — Daftar Province Potential (read-only)
- No 45 — Tabel `regency_potentials` di Drizzle Studio (opsional)

---

# 12. Diagram Sales Realization Flow

## Tujuan Diagram
Menunjukkan alur pengelolaan data Sales Realization (realisasi penjualan). Modul ini menyimpan data realisasi dan RKAP (Rencana Kerja dan Anggaran Perusahaan) harian, bulanan, year-to-date (YTD), dan tahunan per Product Brand. Menampilkan fitur CRUD, filter (brand, periode), pagination, serta metrik yang dikelola. Juga menandai temuan: indikasi perbedaan nama field antara schema (`realization_ytd`) dan migration (`realizaton_ytd`).

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.8.6 — Modul Penjualan**

## Data yang Diperlukan
- Endpoint: `admin.sale.sales_realization.get/create/update/delete`
- Endpoint: `admin.sale.sale_overview.get` (aggregate)
- Tabel `sales_realizations` (product_brand_id FK, report_date, realization_daily, realization_monthly, realization_ytd, rkap_monthly, rkap_ytd, realization_previous_year)
- Filter: brand, date range
- Pagination (termasuk page-size selector 10/25/50/100)
- Temuan: typo migration `realizaton_ytd`

## Bentuk Diagram yang Direkomendasikan
**Activity Diagram** untuk alur CRUD lengkap dengan filter dan pagination.

Langkah:
1. Admin buka menu Sales Realization
2. Sistem tampilkan tabel (pilih brand, date range, pilih jumlah baris)
3. Admin tambah: pilih brand, isi tanggal laporan, realisasi, RKAP
4. Validasi → oRPC → Drizzle insert ke `sales_realizations`
5. List refetch dengan pagination
6. Edit/Delete

Tambahkan catatan temuan di sudut diagram: "Schema: realization_ytd | Migration: realizaton_ytd"

## Estimasi Halaman Pembahasan
2 halaman

## Screenshot Pendukung
- No 46 — Daftar Sales Realization
- No 47 — Form tambah/edit Sales Realization
- No 48 — Pagination / page-size selector (opsional)

---

# 13. Diagram Daily Sales Flow

## Tujuan Diagram
Menunjukkan alur pengelolaan data Daily Sales (penjualan harian). Data mencakup tanggal, bulan, tahun, Product Brand, provinsi, kuantitas, revenue, target, realisasi, dan catatan. Menampilkan fitur CRUD, filter, dan pagination. Juga menandai temuan: kolom `province_id` telah tersedia tetapi belum memiliki definisi foreign key di schema Drizzle.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.8.6 — Modul Penjualan**

## Data yang Diperlukan
- Endpoint: `admin.sale.daily_sales.get/create/update/delete`
- Tabel `daily_sales` (product_brand_id FK, province_id, date, month, year, quantity, revenue, target, realization, notes)
- Filter: brand, date range
- Pagination
- Temuan: `province_id` belum menjadi foreign key

## Bentuk Diagram yang Direkomendasikan
**Activity Diagram** untuk alur CRUD. Mirip dengan Sales Realization tetapi dengan field berbeda.

Langkah:
1. Admin buka menu Daily Sales
2. Sistem tampilkan tabel (filter brand, date range, pagination)
3. Admin tambah: pilih brand, provinsi, input tanggal, qty, revenue, target, realisasi
4. Validasi → oRPC → Drizzle insert ke `daily_sales`
5. List refetch
6. Edit/Delete

Tambahkan catatan: "FK province_id belum didefinisikan — [PERLU VERIFIKASI]"

## Estimasi Halaman Pembahasan
2 halaman

## Screenshot Pendukung
- No 49 — Daftar Daily Sales
- No 50 — Form tambah/edit Daily Sales

---

# 14. Diagram Stall Management Flow

## Tujuan Diagram
Menunjukkan dua alur utama modul Stall: (1) **CRUD data kios** — admin mengelola informasi nama, alamat, provinsi, kabupaten, koordinat (latitude/longitude), pemilik, nomor telepon, dan kriteria; (2) **Assignment Product Brand** — admin memilih brand produk yang tersedia pada suatu kios melalui mekanisme sinkronisasi (insert relasi baru, hapus relasi yang tidak dipilih). Data kios juga dapat di-import dari file Excel melalui script `scripts/seed-stalls.ts`. Modul ini merupakan area dengan bukti pengembangan terkuat (commit `7a38bb7` — author Git `HenokhYeremia`).

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.8.7 — Modul Stall**

## Data yang Diperlukan
- Endpoint: `admin.stall.get/create/update/delete`, `admin.stall.getStallProduct`
- Endpoint: `admin.stall.stall_product_brand.get/assign/get_product_brands`
- Tabel `stalls` (province_id FK, regency_id FK, name, address, latitude, longitude, owner, noTelp, criteria, year)
- Tabel `stall_product_brands` (stall_id FK, product_brand_id FK) — junction table many-to-many
- File Excel: `data/SURVEY PASAR KIOS (Jawaban).xlsx`
- Script: `scripts/seed-stalls.ts`
- Komponen: `manage-stall-products.tsx` (dibuat pada commit `7a38bb7`)
- Commit `7a38bb7` — diff Stall CRUD + assignment

## Bentuk Diagram yang Direkomendasikan
**Activity Diagram** dengan dua bagian paralel: Alur CRUD Stall dan Alur Assignment Product Brand. Tampilkan pula alur import dari Excel.

Bagian 1 — CRUD Stall:
1. Admin buka menu Stall → tabel daftar (search, pagination)
2. Tambah: form input lengkap (provinsi, kabupaten, koordinat, dll)
3. Edit: form terisi data existing
4. Delete: konfirmasi → hapus

Bagian 2 — Assignment Product Brand:
1. Admin klik "Products" pada baris stall
2. Modal muncul dengan daftar semua product brand + checkbox
3. Admin centang brand yang tersedia
4. Simpan → procedure `assign` → sync `stall_product_brands`
5. Toast sukses + refetch

Bagian 3 — Import Excel:
1. File Excel → script `seed-stalls.ts`
2. Resolve region → parse koordinat → transaction insert

## Estimasi Halaman Pembahasan
2 halaman

## Screenshot Pendukung
- No 51 — Daftar Stall
- No 52 — Form tambah Stall
- No 53 — Form edit Stall
- No 54 — Dialog hapus Stall (opsional)
- No 55 — Modal assignment Product Brand
- No 56 — Halaman detail Stall
- No 57 — Fitur export Excel Stall (opsional)
- No 5 — Detail commit `7a38bb7`
- No 10 — File Excel data survei
- No 12 — Terminal import stalls (opsional)

---

# 15. Diagram Hubungan Survei Lapangan dengan Sistem

## Tujuan Diagram
Menunjukkan alur data dari kegiatan survei lapangan (dinas lapangan ke Bojonegoro, Banyuwangi, Jember, dan Lumajang) hingga tersimpan dalam database sistem dan digunakan oleh modul Stall serta visualisasi peta. Menjelaskan bagaimana data hasil observasi lapangan dicatat dalam file Excel, kemudian di-import ke database melalui script, dan akhirnya ditampilkan melalui antarmuka sistem.

## BAB dan Sub BAB
**BAB III — Pelaksanaan Kerja Praktek**
**Sub BAB 3.2 — Kegiatan Survei Lapangan dan Observasi Wilayah**

## Data yang Diperlukan
- File Excel: `data/SURVEY PASAR KIOS (Jawaban).xlsx` — worksheet `Cleaning tipis`
- Script: `scripts/seed-stalls.ts` — alur: read Excel → normalize region names → resolve province/regency IDs → parse coordinates → transaction insert → verify count
- Tabel: `stalls`, `provinces`, `regencies`
- Lokasi survei: Bojonegoro, Banyuwangi, Jember, Lumajang
- Modul yang menggunakan data hasil survei: Stall (CRUD), Map (marker kios)
- Informasi dari kegiatan lapangan: [PERLU VERIFIKASI detail tujuan dan tanggal]

## Bentuk Diagram yang Direkomendasikan
**Flowchart/Activity Diagram** dengan dua bagian: (1) alur kegiatan lapangan (observasi → pencatatan), (2) alur teknis (Excel → script → database → aplikasi).

Bagian 1 — Alur Kegiatan Lapangan:
1. Tim kunjungan ke Bojonegoro, Banyuwangi, Jember, Lumajang
2. Observasi kios, komoditas unggulan, kondisi pasar
3. Pencatatan data ke formulir/Excel

Bagian 2 — Alur Data ke Sistem:
1. File Excel `SURVEY PASAR KIOS (Jawaban).xlsx`
2. Script `scripts/seed-stalls.ts` membaca worksheet
3. Normalisasi nama provinsi dan kabupaten
4. Resolve ke ID dari tabel `provinces` dan `regencies`
5. Parse koordinat (latitude, longitude)
6. Insert dalam transaksi ke tabel `stalls`
7. Verifikasi jumlah row
8. Data siap digunakan di modul Stall dan visualisasi peta

## Estimasi Halaman Pembahasan
3–4 halaman (seluruh subbab Survei Lapangan)

## Screenshot Pendukung
- No 10 — File Excel data survei
- No 11 — Isi worksheet Excel (opsional)
- No 12 — Terminal import stalls (opsional)
- Dokumentasi foto kegiatan lapangan (minimal 2–4 foto)

---

# RINGKASAN

| No | Diagram | BAB | Sub BAB | Estimasi Halaman |
| --- | --- | --- | --- | ---: |
| 1 | Diagram Arsitektur Sistem | III | 3.3 Arsitektur Sistem | 2–3 |
| 2 | Diagram Struktur Project | III | 3.4 Struktur Proyek | 2–3 |
| 3 | Entity Relationship Diagram (ERD) | III | 3.5 Perancangan Database | 6–8 |
| 4 | Diagram Login Flow | III | 3.7 Authentication | 1–2 |
| 5 | Diagram Authentication Flow | III | 3.7 Authentication | 1–2 |
| 6 | Diagram API Flow | III | 3.6 Perancangan API | 2–3 |
| 7 | Diagram Modul Province dan Regency | III | 3.8.1 Modul Wilayah | 2 |
| 8 | Diagram Modul Commodity | III | 3.8.3 Modul Komoditas | 2 |
| 9 | Diagram Product Brand Flow | III | 3.8.4 Modul Produk | 1–2 |
| 10 | Diagram Product Dosage Flow | III | 3.8.4 Modul Produk | 1–2 |
| 11 | Diagram Province Potential Flow | III | 3.8.5 Modul Potensi | 1 |
| 12 | Diagram Sales Realization Flow | III | 3.8.6 Modul Penjualan | 2 |
| 13 | Diagram Daily Sales Flow | III | 3.8.6 Modul Penjualan | 2 |
| 14 | Diagram Stall Management Flow | III | 3.8.7 Modul Stall | 2 |
| 15 | Diagram Hubungan Survei Lapangan dengan Sistem | III | 3.2 Survei Lapangan | 3–4 |
| | **Total estimasi halaman untuk diagram** | | | **30–41** |

---

# ATURAN PEMBUATAN

1. **Konsistensi notasi:** gunakan notasi UML standar (sequence diagram, activity diagram, ERD) atau flowchart yang konsisten di seluruh diagram.
2. **Bahasa:** label dan keterangan menggunakan Bahasa Indonesia, kecuali istilah teknis (nama tabel, endpoint, teknologi).
3. **Penomoran:** setiap diagram harus memiliki nomor gambar berurutan (contoh: Gambar 3.1, Gambar 3.2, ...) sesuai urutan kemunculan di laporan.
4. **Sumber data:** setiap diagram wajib menyebutkan sumber data yang digunakan (contoh: "Disusun berdasarkan source code `lib/orpc/router/index.ts` dan dokumentasi `BACKEND.md`").
5. **Larangan elemen fiktif:** hanya gunakan entitas, relasi, dan alur yang terbukti ada pada dokumentasi repository. Jangan menambahkan proses, tabel, atau endpoint yang tidak ditemukan.
6. **Label temuan:** jika diagram memuat temuan teknis (seperti missing FK, mismatch migration, gap authorization), beri label visual yang jelas (stempel "Read-Only", "Temuan", atau "PERLU VERIFIKASI").
7. **Penyensoran:** jika diagram memuat data sensitif (seperti field yang berisi token atau password), gunakan label generik.

---

*Dokumen ini disusun berdasarkan `MAGANG_REPORT_CONTEXT.md`, `INTERNSHIP_CONTRIBUTION_CONTEXT.md`, `REPORT_WRITING_GUIDE.md`, `BAB_MAPPING.md`, `SCREENSHOT_MASTERLIST.md`, `REPORT_OUTLINE.md`, `BACKEND.md`, dan `arch.md`.*
