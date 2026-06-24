# REPORT OUTLINE

**Judul:** PENGEMBANGAN BACKEND SISTEM INFORMASI MANAJEMEN PRODUK BARU UNTUK MENDUKUNG PENGELOLAAN DATA DAN MONITORING PRODUK BERBASIS WEB PADA PT PETROKIMIA GRESIK

**Mahasiswa:** Henokh Yeremia Olbrain Perangin Angin — NBI: 1462300075

**Perusahaan:** PT Petrokimia Gresik — Departemen Manajemen Produk Baru

**Struktur:** 4 BAB (format Kerja Praktek Teknik Informatika)

**Target halaman:** 70–100 halaman

---

# DAFTAR RIWAYAT HIDUP
*Target: 1 halaman*

---

# KATA PENGANTAR
*Target: 1 halaman*

---

# DAFTAR ISI
*Target: 2 halaman*

---

# DAFTAR GAMBAR
*Target: 1–2 halaman*

---

# DAFTAR TABEL
*Target: 1 halaman*

---

# BAB I — PENDAHULUAN

**Tujuan bab:** Memberikan gambaran umum konteks magang, masalah yang mendasari kegiatan, rumusan masalah, tujuan, manfaat, batasan, metode pengumpulan data, dan sistematika laporan.

**Estimasi halaman:** 8–10 halaman

**Screenshot yang digunakan:**
- Tidak ada screenshot teknis ( jika diizinkan: No 18 — Landing page)
- Lampiran: jadwal/logbook kegiatan

**Diagram yang dibutuhkan:**
- Diagram konteks sistem (pengunjung, guest, viewer, admin, aplikasi)

**Tabel yang dibutuhkan:**
- Tabel jadwal kegiatan magang

---

## 1.1 Latar Belakang
*Target: 1,5–2 halaman*

**Isi:**
- Kebutuhan PT Petrokimia Gresik, khususnya Departemen Manajemen Produk Baru, dalam mengelola data pasar secara terpusat.
- Data yang dikelola: wilayah, lahan, komoditas, produk, potensi pasar, kios, dan penjualan.
- Kebutuhan visualisasi geografis untuk membaca persebaran dan potensi pasar.
- Kebutuhan aplikasi berbasis web yang aman, type-safe, dan mudah dikelola.
- Peran backend dalam menyediakan API, validasi data, authentication, dan integrasi database.
- Kegiatan magang sebagai sarana penerapan pengetahuan Teknik Informatika di lingkungan industri.

## 1.2 Identifikasi Masalah
*Target: 0,5 halaman*

**Isi:**
- Data pasar yang dikelola Departemen Manajemen Produk Baru masih tersebar dan belum terintegrasi dalam satu sistem.
- Analisis geografis data pasar sulit dilakukan dalam bentuk tabel.
- Perlu pengelolaan data yang konsisten dengan validasi dan kontrol akses.
- Dokumentasi arsitektur backend, database, dan API diperlukan sebagai landasan pengembangan sistem.
- Status kesiapan setiap modul bisnis perlu dipetakan untuk mengetahui area yang masih dapat dikembangkan.

## 1.3 Rumusan Masalah
*Target: 0,5 halaman*

**Isi:**
- Bagaimana struktur arsitektur backend dan alur data pada sistem aplikasi?
- Bagaimana perancangan database untuk mendukung pengelolaan data pasar?
- Bagaimana implementasi authentication dan authorization pada sistem?
- Bagaimana implementasi API untuk setiap modul bisnis?
- Bagaimana tingkat kesiapan setiap modul bisnis dalam sistem?
- Apa temuan dan rekomendasi untuk pengembangan sistem selanjutnya?

## 1.4 Tujuan Magang
*Target: 0,5 halaman*

**Isi:**
- Memahami arsitektur full-stack dan alur data dari antarmuka hingga database.
- Mempelajari perancangan database untuk domain data pasar menggunakan PostgreSQL dan Drizzle ORM.
- Menganalisis dan mendokumentasikan struktur backend, API, authentication, dan setiap modul bisnis.
- Menyusun dokumentasi teknis arsitektur, database, API, dan modul sebagai referensi pengembangan.
- Mengimplementasikan pengembangan/pelengkapan modul sesuai ruang lingkup yang ditetapkan (Stall dan assignment Product Brand — bersyarat verifikasi kontribusi).

## 1.5 Manfaat
*Target: 0,5 halaman*

**Isi:**
- **Bagi mahasiswa:** penerapan pengetahuan arsitektur full-stack, database, API, dan authentication dalam proyek nyata.
- **Bagi perusahaan:** dokumentasi teknis backend sebagai referensi pengembangan dan pemeliharaan sistem.
- **Bagi akademik:** bahan studi kasus pengembangan backend berbasis TypeScript, oRPC, dan Drizzle ORM.

## 1.6 Batasan Masalah
*Target: 0,5 halaman*

**Isi:**
- Analisis dilakukan terhadap source code, dokumentasi, dan riwayat Git repository pada branch yang diperiksa.
- Fokus pada backend yang mencakup database, API oRPC, authentication, dan modul bisnis.
- Tidak membahas frontend secara mendalam, kecuali yang berkaitan langsung dengan alur data backend.
- Modul yang dibahas: wilayah (province/regency), lahan, komoditas, produk, potensi, penjualan, kios, user, peta, dan authentication.
- Identitas author Git (`HenokhYeremia`) masih memerlukan verifikasi hubungan dengan mahasiswa.
- Tidak semua modul dapat diklaim sebagai hasil implementasi mahasiswa; keberadaan fitur pada snapshot awal diposisikan sebagai objek analisis.

## 1.7 Metode Pengumpulan Data
*Target: 1 halaman*

**Isi:**
- **Studi dokumentasi:** mempelajari README, GUIDEBOOK, BACKEND.md, arch.md, dan dokumentasi proyek.
- **Observasi source code:** menelusuri struktur route, procedure oRPC, schema Drizzle, dan konfigurasi aplikasi.
- **Pemeriksaan database:** analisis schema, migration, relasi tabel, foreign key, dan constraint.
- **Analisis riwayat Git:** memeriksa 15 commit, author, tanggal, dan perubahan file untuk identifikasi kontribusi.

## 1.8 Sistematika Penulisan
*Target: 0,5 halaman*

**Isi:**
- BAB I Pendahuluan: latar belakang, masalah, tujuan, manfaat, batasan, metode, sistematika.
- BAB II Gambaran Umum: profil perusahaan, gambaran sistem, landasan teori.
- BAB III Pelaksanaan Kerja Praktek: analisis, perancangan, hasil implementasi, pengujian, kontribusi.
- BAB IV Kesimpulan dan Saran.

---

# BAB II — GAMBARAN UMUM

**Tujuan bab:** Memberikan gambaran tentang perusahaan tempat magang, sistem yang menjadi objek kegiatan, serta landasan teori yang mendukung pembahasan laporan.

**Estimasi halaman:** 14–18 halaman

**Screenshot yang digunakan:**
- No 20 — Landing page program cards
- No 98 — `package.json` dependencies
- Opsional: No 25 — Admin sidebar navigasi

**Diagram yang dibutuhkan:**
- Struktur organisasi perusahaan [PERLU VERIFIKASI]
- Diagram proses bisnis tingkat tinggi
- Diagram pengelompokan technology stack

**Tabel yang dibutuhkan:**
- Tabel technology stack dan fungsinya
- Tabel pengguna sistem dan hak akses
- Tabel modul bisnis dan fungsi

---

## 2.1 Profil Perusahaan
*Target: 3–4 halaman*

**Isi:**
- Nama, bidang usaha, visi, misi PT Petrokimia Gresik [PERLU VERIFIKASI data resmi].
- Struktur organisasi perusahaan dan posisi Departemen Manajemen Produk Baru [PERLU VERIFIKASI].
- Peran dan fungsi Departemen Manajemen Produk Baru dalam pengembangan produk pupuk bersubsidi/non-subsidi.
- Struktur pimpinan departemen: PM dan SMD I.

**Screenshot:** Logo perusahaan, struktur organisasi [PERLU VERIFIKASI].

## 2.2 Gambaran Umum Sistem
*Target: 3–4 halaman*

**Isi:**
- Nama sistem: Satu Peta Pasar (PASAR — Platform Analisis Strategi dan Realisasi Pasar).
- Tujuan: aplikasi pemetaan dan pengelolaan data pasar untuk mendukung pengelolaan data dan monitoring produk.
- Pengguna: admin, viewer, guest, pengunjung umum.
- Modul utama: landing page, marketing map, dashboard admin, region management, product management, land & commodity, stall management, sales management, authentication, internationalization.
- Status implementasi: beberapa modul CRUD penuh, beberapa read-only, beberapa database-only.

**Screenshot:** No 20, No 25.

**Diagram:** Diagram konteks sistem (aktor dan interaksi dengan sistem).

## 2.3 Proses Bisnis Sistem
*Target: 2 halaman*

**Isi:**
- Alur pengelolaan data master: wilayah → lahan → komoditas → produk.
- Alur pencatatan potensi dan penjualan.
- Alur pendataan kios dan assignment produk.
- Alur visualisasi peta dari data potensi/wilayah.

**Diagram:** Diagram proses bisnis tingkat tinggi.

## 2.4 Landasan Teori
*Target: 6–8 halaman*

**Isi:**
- **Frontend:** React 19, TanStack Start/Router/Query, Tailwind CSS, komponen shadcn/ui.
- **Backend & API:** TypeScript, oRPC (RPC type-safe), Zod (validasi), konsep public/protected procedure.
- **Database:** PostgreSQL, Drizzle ORM, schema, migration, primary key, foreign key, relasi.
- **Authentication:** Better Auth, session-based, email/password, cookie, route guard, role.
- **Pemetaan Digital:** Leaflet, React Leaflet, GeoJSON, choropleth.
- **Build & Deployment:** Bun, Vite, Turborepo, Biome/Ultracite, Docker, Netlify, Vercel.

**Screenshot:** No 98 — `package.json`.

**Diagram:** Diagram pengelompokan technology stack.

**Tabel:** Tabel technology stack per kategori (frontend, backend, database, auth, API, build).

---

# BAB III — PELAKSANAAN KERJA PRAKTEK

**Tujuan bab:** Menjelaskan seluruh kegiatan yang dilakukan selama magang, meliputi persiapan lingkungan kerja, analisis sistem, perancangan database dan API, hasil implementasi setiap modul, pengujian, serta kontribusi mahasiswa.

**Estimasi halaman:** 42–54 halaman

**Screenshot yang digunakan:**
- Kelompok 1 (No 1–2): setup lingkungan
- Kelompok 1 (No 4–5): bukti aktivitas Git
- Kelompok 2 (No 10–11): data survei
- Kelompok 2 (dokumentasi foto): dokumentasi kegiatan lapangan
- Kelompok 3 (No 13–17): authentication
- Kelompok 4 (No 18–19, 21–26): dashboard
- Kelompok 5 (No 27–30): province
- Kelompok 6 (No 31–32): regency
- Kelompok 7 (No 33–37): commodity type
- Kelompok 8 (No 38–39): product type
- Kelompok 9 (No 40–41): product brand
- Kelompok 10 (No 42–43): product dosage
- Kelompok 11 (No 44): province potential
- Kelompok 12 (No 45): regency potential [opsional]
- Kelompok 13 (No 46–48): sales realization
- Kelompok 14 (No 49–50): daily sales
- Kelompok 15 (No 51–57): stall
- Kelompok 16 (No 58–60): user management
- Kelompok 17 (No 61–67): map
- Kelompok 18 (No 68–78): database
- Kelompok 19 (No 79–87): API
- Kelompok 20 (No 88–93): authentication
- Kelompok 21 (No 94–100): deployment
- Kelompok 22 (No 101–104): testing

**Diagram yang dibutuhkan:**
1. Diagram arsitektur high-level (browser → TanStack Start → oRPC → Drizzle → PostgreSQL)
2. Diagram deployment (browser, hosting, database, aset GeoJSON)
3. Diagram struktur folder dan layer proyek
4. Peta lokasi wilayah survei (Bojonegoro, Banyuwangi, Jember, Lumajang) — opsional
5. ERD lengkap 22 tabel
6. ERD domain autentikasi (user, session, account, verification)
7. ERD domain wilayah/lahan/komoditas
8. ERD domain produk/potensi
9. ERD domain stall dan product brand
10. ERD domain penjualan
11. Sequence diagram login dan pembuatan session
12. Sequence diagram pengecekan akses route admin
13. Sequence diagram query melalui TanStack Query dan oRPC
14. Sequence diagram mutation CRUD dan invalidasi cache
15. Activity diagram proses pengelolaan data master
16. Activity diagram pencatatan penjualan
17. Activity diagram assignment brand produk ke stall
18. Data flow diagram level 0
19. Diagram aliran validasi UI → Zod → constraint database

**Tabel yang dibutuhkan:**
- Tabel 22 tabel database (nama, fungsi, PK, FK, relasi)
- Tabel seluruh endpoint API oRPC (procedure, metode, auth, input, output)
- Tabel matriks status modul (nama, status CRUD, keterangan)
- Tabel matriks kontribusi per modul
- Tabel ringkasan lokasi survei lapangan (wilayah, tujuan, aktivitas) [PERLU VERIFIKASI tanggal]

---

## 3.1 Persiapan Lingkungan dan Tools
*Target: 2–3 halaman*

**Isi:**
- Prasyarat: Bun, PostgreSQL, Git.
- Proses instalasi dependency (`bun install`).
- Konfigurasi environment variable (`.env.example`).
- Menjalankan database lokal (`bun run db:start`, `bun run db:push`).
- Menjalankan development server (`bun run dev`).
- Perintah penting: format, lint, typecheck, build.

**Screenshot:** No 1, 2, 3 (opsional).

**Tabel:** Tabel perintah penting dan fungsinya.

## 3.2 Kegiatan Survei Lapangan dan Observasi Wilayah
*Target: 3–4 halaman*

**Isi:**
- **Tujuan kegiatan lapangan:** mengamati secara langsung kondisi pasar, potensi pertanian, dan aktivitas penjualan di wilayah binaan PT Petrokimia Gresik untuk memperoleh pemahaman kontekstual terhadap data yang dikelola dalam Sistem Informasi Manajemen Produk Baru [PERLU VERIFIKASI tujuan spesifik].
- **Lokasi yang dikunjungi:**
  - Bojonegoro
  - Banyuwangi
  - Jember
  - Lumajang
- **Aktivitas observasi yang dilakukan:**
  - Kunjungan ke kios/lokasi penjualan untuk mengamati proses bisnis di lapangan [PERLU VERIFIKASI detail aktivitas].
  - Pencatatan data geografis dan informasi lapangan yang relevan dengan data potensi pasar.
  - Observasi jenis komoditas unggulan dan kebutuhan pupuk di masing-masing wilayah.
  - Dokumentasi kondisi lapangan sebagai bahan verifikasi data sistem.
- **Hubungan dengan kebutuhan data sistem:**
  - Data yang diamati di lapangan menjadi acuan validasi data potensi provinsi dan kabupaten pada sistem.
  - Informasi kios dan lokasi geografis mendukung modul Stall dan visualisasi peta.
  - Observasi komoditas per wilayah memperkuat data pada modul Province Commodity dan Regency Commodity.
  - Hasil survei digunakan dalam proses import data kios dari Excel ke database melalui script `scripts/seed-stalls.ts`.
- **Manfaat observasi lapangan:**
  - Memberikan pemahaman langsung tentang alur distribusi produk dari gudang ke kios dan ke petani.
  - Membantu interpretasi data potensi pasar yang tersimpan dalam sistem.
  - Menjembatani kesenjangan antara representasi data digital dengan kondisi aktual di lapangan.
  - Mendukung rekomendasi pengembangan fitur berdasarkan kebutuhan pengguna lapangan.

**Dokumentasi foto:** Minimal 2–4 foto kegiatan lapangan (wajib disensor jika menampilkan wajah narasumber tanpa izin). Foto ditempatkan sebagai dokumentasi kegiatan pada subbab ini.

**Screenshot:** No 10 — File Excel data survei, No 11 (opsional) — isi worksheet.

**Tabel:** Tabel ringkasan lokasi, tanggal, dan aktivitas per wilayah kunjungan [PERLU VERIFIKASI tanggal].

## 3.3 Arsitektur Sistem
*Target: 2–3 halaman*

**Isi:**
- Arsitektur full-stack monolith pada `apps/web` (bukan backend Hono terpisah seperti deskripsi template).
- Frontend: React 19, TanStack Start/Router/Query, Tailwind CSS.
- Backend: server route TanStack Start, oRPC, Drizzle ORM, PostgreSQL.
- Authentication: Better Auth (email/password, session, cookie).
- Alur request: browser → TanStack Router → oRPC client → `/api/rpc/$` → oRPC procedure → Drizzle → PostgreSQL.
- Perbedaan kondisi aktual dengan instruksi template `AGENTS.md` yang menyebut `apps/server`.

**Diagram:** Diagram arsitektur high-level, diagram deployment.

## 3.4 Struktur Proyek dan Pembagian Layer
*Target: 2–3 halaman*

**Isi:**
- Struktur root: `apps/web`, `data`, `scripts`, konfigurasi.
- Route-colocated feature modules: `-app` (use case), `-domain` (schema/type), `-components` (UI), `-hooks`.
- Infrastructure layer: `lib/auth`, `lib/db`, `lib/orpc`, `lib/lingui`.
- Policy dependency: UI → hooks → oRPC → handler → schema → DB.

**Screenshot:** No 68, 69, 79, 80 (opsional), 81 (opsional).

**Diagram:** Diagram struktur folder dan layer proyek.

## 3.5 Perancangan Database
*Target: 6–8 halaman*

**Isi:**
- **22 tabel** yang teridentifikasi.
- **Domain autentikasi:** `user`, `session`, `account`, `verification` — dikelola Better Auth, role: admin/viewer/guest.
- **Domain wilayah dan lahan:** `provinces`, `regencies`, `land_types`, `province_lands`, `regency_lands`.
- **Domain komoditas:** `commodity_types`, `province_commodities`, `regency_commodities`.
- **Domain produk dan potensi:** `product_types`, `product_brands`, `product_dosages`, `province_potentials`, `regency_potentials`.
- **Domain kios:** `stalls`, `stall_product_brands` (many-to-many).
- **Domain penjualan:** `sales_realizations`, `daily_sales`.
- **Domain demo:** `todo`.
- **Temuan:** missing FK `daily_sales.province_id`, potensi mismatch schema-migration pada `sales_realizations` (typo `realizaton_ytd` vs `realization_ytd`), unique constraint belum terdokumentasi.

**Screenshot:** No 70, 71, 72, 73 (opsional), 74, 75 (opsional), 76 (opsional), 77 (opsional), 78.

**Diagram:** ERD lengkap dan 5 ERD per domain.

**Tabel:** Tabel 22 tabel database (nama, fungsi, PK, FK, tabel referensi).

## 3.6 Perancangan API
*Target: 4–5 halaman*

**Isi:**
- **oRPC Router:** endpoint publik (`healthCheck`, `auth.getSession`, `map.getProvinces`, `map.getStalls`) dan endpoint admin (region, land, commodity, product, potential, sale, stall, user).
- **Public vs Protected procedure:** `publicProcedure` tanpa session, `protectedProcedure` membutuhkan session.
- **Context:** session (Better Auth) dan db (Drizzle).
- **Validasi:** Zod untuk input setiap procedure.
- **Struktur endpoint per modul:**
  - Region: `admin.region.province.get/create/update/delete`, `admin.region.regency.get/create/update/delete`
  - Land: `admin.land.land_type.get/create/update/delete`, `admin.land.province_land.*`, `admin.land.regency_land.*`
  - Commodity: `admin.commodity.commodity_type.*`, `admin.commodity.province_commodity.*`, `admin.commodity.regency_commodity.*`
  - Product: `admin.product.product_type.*`, `admin.product.product_brand.*`, `admin.product.product_dosage.*`
  - Potential: `admin.potential.province_potential.get`, `admin.potential.regency_potential.*` [PERLU VERIFIKASI]
  - Sales: `admin.sale.sale_overview.get`, `admin.sale.sales_realization.*`, `admin.sale.daily_sales.*`
  - Stall: `admin.stall.get/create/update/delete`, `admin.stall.stall_product_brand.*`
  - User: `admin.user.get/getById/create/update/delete`
  - Dashboard: `admin.dashboard.getSummary`

**Screenshot:** No 79, 80 (opsional), 81 (opsional), 87.

**Diagram:** Sequence diagram query dan mutation.

**Tabel:** Tabel endpoint API (procedure, metode, auth, input, output).

## 3.7 Authentication dan Authorization
*Target: 3–4 halaman*

**Isi:**
- **Better Auth:** konfigurasi email/password, Drizzle adapter, session management, cookie.
- **Route guard:** `routes/admin/route.tsx` memeriksa session dan role admin; `/map` memeriksa admin/viewer.
- **Protected procedure:** memeriksa session, tetapi belum memvalidasi role admin secara eksplisit di semua endpoint.
- **Role:** admin (akses penuh), viewer (akses terbatas ke halaman tertentu), guest (role default, hanya halaman publik).
- **Gap authorization:** route UI sudah membatasi role, tetapi API procedure hanya memeriksa session, bukan role.

**Screenshot:** No 88, 89, 90, 91, 92, 93 (opsional).

**Diagram:** Sequence diagram login, sequence diagram route guard admin.

**Tabel:** Tabel role dan hak akses.

## 3.8 Hasil Implementasi Modul Bisnis
*Target: 12–16 halaman*

### 3.8.1 Modul Wilayah (Province dan Regency)
*Target: 2 halaman*

**Isi:**
- Province: CRUD data provinsi (kode, nama, luas, tahun), search, pagination.
- Regency: CRUD data kabupaten/kota (kode, nama, provinsi induk, luas, tahun), search, pagination.
- Relasi: satu provinsi memiliki banyak regency.

**Screenshot:** No 27, 28, 29, 30 (opsional), 31, 32.

### 3.8.2 Modul Lahan (Land Type, Province Land, Regency Land)
*Target: 2 halaman*

**Isi:**
- Land Type: CRUD master jenis lahan, digunakan oleh province/regency land.
- Province Land: CRUD data luas lahan per provinsi per jenis lahan per tahun.
- Regency Land: pembacaan data (read-only), create/update/delete belum aktif.
- Relasi: land type → province land / regency land → province / regency.

**Screenshot:** No 33, 34 (jika dianggap bagian lahan) — atau dari kelompok Commodity.

### 3.8.3 Modul Komoditas (Commodity Type, Province Commodity, Regency Commodity)
*Target: 2 halaman*

**Isi:**
- Commodity Type: CRUD jenis komoditas, filter berdasarkan Land Type.
- Province Commodity: read-only, menampilkan data komoditas tingkat provinsi, mutation belum aktif.
- Regency Commodity: CRUD data komoditas tingkat kabupaten/kota.
- Perbandingan: Province Commodity read-only vs Regency Commodity CRUD penuh.

**Screenshot:** No 33, 34, 35, 36, 37 (opsional).

### 3.8.4 Modul Produk (Product Type, Product Brand, Product Dosage)
*Target: 2 halaman*

**Isi:**
- Product Type: CRUD jenis produk (nama, deskripsi, tahun).
- Product Brand: CRUD brand produk (nama, industri, deskripsi) di bawah Product Type.
- Product Dosage: CRUD dosis brand untuk komoditas tertentu.
- Hierarki: Product Type → Product Brand → Product Dosage (menghubungkan Commodity Type).

**Screenshot:** No 38, 39, 40, 41, 42, 43.

### 3.8.5 Modul Potensi (Province Potential, Regency Potential)
*Target: 1 halaman*

**Isi:**
- Province Potential: penyajian data potensi brand produk per provinsi, filter wilayah/produk/tahun, status read-only.
- Regency Potential: tabel database tersedia, endpoint aktif belum ditemukan [PERLU VERIFIKASI].

**Screenshot:** No 44, 45 (opsional).

### 3.8.6 Modul Penjualan (Sales Realization, Daily Sales)
*Target: 2 halaman*

**Isi:**
- Sales Realization: CRUD realisasi dan RKAP harian/bulanan/YTD/tahunan per brand, filter, pagination.
- Daily Sales: CRUD penjualan harian (qty, revenue, target, realisasi) per brand, filter, pagination.
- Catatan: indikasi mismatch schema-migration, missing FK `daily_sales.province_id`.

**Screenshot:** No 46, 47, 48 (opsional), 49, 50.

### 3.8.7 Modul Stall
*Target: 2 halaman*

**Isi:**
- CRUD data kios: nama, alamat, provinsi, kabupaten, koordinat (lat/lng), pemilik, kontak, kriteria.
- Many-to-many dengan Product Brand melalui tabel `stall_product_brands`.
- Fitur assignment brand: admin memilih brand yang tersedia pada kios.
- Halaman detail publik untuk melihat informasi kios dan brand terkait.
- Import data dari Excel (`data/SURVEY PASAR KIOS (Jawaban).xlsx`) melalui script `scripts/seed-stalls.ts`.
- Modul dengan bukti pengembangan terkuat (commit `7a38bb7`).

**Screenshot:** No 51, 52, 53, 54 (opsional), 55, 56, 57 (opsional).

### 3.8.8 User Management
*Target: 1 halaman*

**Isi:**
- CRUD user: get list, get detail, update (termasuk role), delete.
- Role: admin, viewer, guest.
- Pembuatan user menggunakan Better Auth signup API.

**Screenshot:** No 58, 59, 60 (opsional).

### 3.8.9 Dashboard Admin
*Target: 1 halaman*

**Isi:**
- Summary cards: jumlah provinsi, kabupaten, tipe lahan, komoditas, tipe produk, brand produk, kios, realisasi penjualan.
- Province Potential Coverage: progress bar.
- Latest Product Brands: daftar brand terbaru.
- Health check indicator: status API.

**Screenshot:** No 21, 22 (opsional), 23 (opsional), 24 (opsional), 26.

### 3.8.10 Visualisasi Peta
*Target: 2 halaman*

**Isi:**
- Halaman peta interaktif berbasis Leaflet.
- Layer: batas wilayah Indonesia (GeoJSON), choropleth potensi, marker kios.
- Filter sidebar: tahun, level administrasi, brand/land type/commodity.
- Popup: informasi provinsi/kabupaten saat diklik.
- Data bersumber dari GeoJSON statis (`public/data/`) dan data potensi dari oRPC.

**Screenshot:** No 61, 62, 63, 64 (opsional), 65 (opsional), 66 (opsional), 67 (opsional).

### 3.8.11 Landing Page Publik
*Target: 1 halaman*

**Isi:**
- Hero section dengan statistik (provinces, commodities, product brands, stalls).
- Program cards: Market Map, Roadshow, Socialization.
- Monitoring agenda 2026.
- Struktur pimpinan (PM, SMD I).
- Call-to-action: "Buka Peta Potensi", "Lihat Program Kerja".

**Screenshot:** No 18, 19.

## 3.9 Pengujian Sistem
*Target: 4–5 halaman*

**Isi:**
- **Pengujian API:** health check, unauthorized access, validasi input, response sukses.
- **Pengujian Authentication:** login valid, login invalid, guest ditolak, admin diterima.
- **Pengujian CRUD:** create, read, update, delete pada setiap modul.
- **Quality check:** type checking (`bun run check-types`), lint/format (`bun run check`).
- **Build:** production build (`bun run build`).
- **Testing:** unit test (jika tersedia — `bun test`).

**Screenshot:** No 82, 83, 84, 85 (opsional), 86 (opsional), 100, 101, 102, 103 (opsional).

**Tabel:** Tabel skenario pengujian (modul, skenario, input, hasil yang diharapkan, hasil aktual, status).

## 3.10 Build, Testing, dan Deployment
*Target: 2–3 halaman*

**Isi:**
- **Build:** Vite, Turborepo, target Netlify pada TanStack Start.
- **Testing:** Vitest, Biome/Ultracite untuk linting dan type checking.
- **Deployment:**
  - Netlify: `netlify.toml` (base `apps/web`, publish `dist`, command `bun run build`).
  - Vercel: `vercel.json`.
  - Docker: Dockerfile dan docker-compose.yml untuk PostgreSQL.
  - GitHub Actions: workflow ping Supabase keep-alive.
- **Environment variable:** DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, CORS_ORIGIN, VITE_BETTER_AUTH_URL.

**Screenshot:** No 94, 95, 96 (opsional), 97 (opsional), 99 (opsional).

## 3.11 Analisis dan Temuan
*Target: 4–5 halaman*

**Isi:**
- **Status modul:** perbandingan tingkat kesiapan (CRUD penuh, read-only, database-only).
- **Gap authorization:** protected API hanya memeriksa session, belum role admin.
- **Mismatch schema-migration:** indikasi perbedaan nama field `realizaton_ytd` pada migration vs `realization_ytd` pada schema.
- **Missing foreign key:** `daily_sales.province_id` belum menjadi FK.
- **Unique constraint:** kombinasi unik seperti (province_id, land_type_id, year) belum terdokumentasi.
- **Coupling modul Stall:** tanggung jawab luas, peluang pemisahan komponen dan use case.
- **Standardisasi:** response, pagination, error handling, split router/schema belum seragam.
- **Rekomendasi:** tambah `adminProcedure`, sinkronisasi migration, tambah FK/constraint, standardisasi API, tambah test.

**Screenshot:** No 8 (opsional), 9 (opsional), 77 (opsional).

**Diagram:** Diagram perbandingan schema dan migration, matriks readiness modul.

**Tabel:** Tabel matriks status modul (nama, status CRUD, keterangan temuan).

## 3.12 Kontribusi Mahasiswa
*Target: 3–4 halaman*

**Isi:**
- **Bukti repository (commit `7a38bb7`):**
  - Melengkapi CRUD Stall: create, update, delete, form, modal.
  - Assignment Product Brand ke Stall: `manage-stall-products.tsx`, prosedur sinkronisasi relasi.
  - Perubahan query Regency.
  - Integrasi procedure Stall pada router oRPC.
- **Perubahan konfigurasi deployment:** 12 commit Vercel/Netlify, redirect SSR, target build, workflow Supabase.
- **Kegiatan analisis dan dokumentasi:**
  - Analisis arsitektur, database, API, authentication, dan 9 modul bisnis.
  - Dokumentasi teknis: struktur backend, relasi database, endpoint API, matriks modul.
  - Pemetaan status kesiapan fitur dan temuan kualitas.
- **Batasan:** identitas author Git (`HenokhYeremia`) masih [PERLU VERIFIKASI] hubungan dengan mahasiswa. CRUD Product Dosage, Product Brand, Commodity Type, Province Commodity, Regency Commodity, Province Potential, Sales Realization, Daily Sales tidak diklaim sebagai kontribusi mandiri mahasiswa — diposisikan sebagai objek analisis.

**Screenshot:** No 4, 5, 6, 7 (opsional).

**Diagram:** Timeline commit relevan, diagram before/after Stall (jika dapat direkonstruksi).

**Tabel:** Tabel matriks traceability kontribusi (aktivitas → commit → file → status).

---

# BAB IV — KESIMPULAN DAN SARAN

**Tujuan bab:** Menyimpulkan seluruh hasil kegiatan magang serta memberikan saran yang didasarkan pada temuan analisis.

**Estimasi halaman:** 6–8 halaman

**Screenshot yang digunakan:**
- Tidak ada screenshot baru (dapat menyertakan 1–2 screenshot representatif jika format mengizinkan)

**Diagram yang dibutuhkan:**
- Matriks ringkasan kondisi saat ini vs rekomendasi (opsional)

**Tabel yang dibutuhkan:**
- Tabel ringkasan temuan dan rekomendasi

---

## 4.1 Kesimpulan
*Target: 3–4 halaman*

**Isi:**

### Kesimpulan Arsitektur Sistem
- Aplikasi Satu Peta Pasar menerapkan arsitektur full-stack monolith pada `apps/web` yang mengintegrasikan React/TanStack Start, oRPC, Drizzle ORM, dan PostgreSQL.
- Alur data: browser → TanStack Query → oRPC client → `/api/rpc/$` → procedure → Drizzle → PostgreSQL.
- Better Auth menangani authentication; route guard UI memeriksa role, tetapi API procedure belum menerapkan validasi role secara eksplisit.

### Kesimpulan Database
- Terdapat 22 tabel yang mencakup domain autentikasi, wilayah, lahan, komoditas, produk, potensi, kios, penjualan, dan demo.
- Relasi antar domain terbentuk melalui foreign key dengan primary key UUID.
- Ditemukan beberapa area yang memerlukan perhatian: missing FK `daily_sales.province_id`, indikasi mismatch schema-migration pada sales, dan unique constraint yang belum terdokumentasi.

### Kesimpulan Modul Bisnis
- Modul dengan CRUD penuh: Province, Regency, Land Type, Province Land, Commodity Type, Regency Commodity, Product Type, Product Brand, Product Dosage, Sales Realization, Daily Sales, Stall.
- Modul read-only: Regency Land, Province Commodity, Province Potential.
- Regency Potential: tabel database tersedia, endpoint aktif belum ditemukan.
- Stall memiliki bukti pengembangan terkuat dalam riwayat repository.

### Kesimpulan Kontribusi
- Bukti repository menunjukkan pengembangan/pelengkapan modul Stall dan assignment Product Brand (commit `7a38bb7`) serta 12 commit konfigurasi deployment.
- Atribusi kepada mahasiswa bersifat kondisional sampai identitas author Git terverifikasi.
- Modul lain dibahas sebagai objek analisis dan dokumentasi, bukan klaim implementasi mandiri.

## 4.2 Keterbatasan
*Target: 1 halaman*

**Isi:**
- Identitas author Git (`HenokhYeremia`) belum terkonfirmasi sebagai mahasiswa.
- Logbook harian, tiket, pull request, atau bukti acceptance test belum tersedia.
- Perubahan lokal Product Dosage (field `year`) dan Sales Realization (page-size selector) belum di-commit dan belum dapat diklaim.
- Build, lint, test, dan pengujian API aktual masih perlu dilakukan untuk memvalidasi temuan.
- Database production belum diperiksa; analisis hanya berdasarkan schema dan migration pada repository.
- Beberapa fitur memiliki endpoint yang belum aktif atau belum terdokumentasi (Regency Potential, Province Commodity mutation).

## 4.3 Saran Pengembangan
*Target: 1,5–2 halaman*

**Isi:**

### Saran Jangka Pendek
- Tambahkan `adminProcedure` untuk validasi role pada seluruh protected API.
- Sinkronkan nama field antara schema dan migration (khususnya `realizaton_ytd` / `realization_ytd`).
- Tambahkan foreign key `daily_sales.province_id` untuk memperkuat integritas referensial.

### Saran Jangka Menengah
- Standardisasi response API, pagination, error handling, dan struktur router/schema.
- Pisahkan router oRPC per domain untuk mengurangi kompleksitas file router utama.
- Tambahkan unique constraint pada kombinasi data yang seharusnya unik.
- Lengkapi CRUD untuk modul yang masih read-only jika kebutuhan bisnis menghendaki.

### Saran Jangka Panjang
- Implementasikan integration test untuk API dan authorization test untuk skenario role.
- Terapkan repository pattern untuk memisahkan logika bisnis dari kueri database.
- Sempurnakan pipeline CI/CD dengan build otomatis, lint, test, dan deployment.

### Saran untuk Kegiatan Magang
- Dokumentasikan kegiatan secara berkala dalam logbook harian.
- Gunakan pull request dan tiket untuk melacak perubahan dan diskusi.
- Konfirmasi identitas author Git dan hubungannya dengan mahasiswa pada awal kegiatan.

## 4.4 Penutup
*Target: 0,5 halaman*

**Isi:**
- Ucapan terima kasih kepada PT Petrokimia Gresik, Departemen Manajemen Produk Baru, pembimbing lapangan, dosen pembimbing, dan semua pihak yang mendukung kegiatan magang.

---

# DAFTAR PUSTAKA
*Target: 2–3 halaman*

**Isi:**
- Dokumentasi resmi teknologi yang digunakan: React, TanStack, oRPC, Better Auth, Drizzle ORM, PostgreSQL, Leaflet, Bun, Vite, Turborepo.
- Referensi buku/pedoman penulisan laporan KP jika ada.

---

# LAMPIRAN
*Target: 8–15 halaman*

**Isi:**
- **Lampiran A — Logbook Kegiatan:** tabel aktivitas harian/mingguan selama magang.
- **Lampiran B — Screenshot Tambahan:** kumpulan screenshot opsional yang tidak dimuat di BAB III (maksimal 20 screenshot).
- **Lampiran C — Source Code Representatif:** potongan kode penting (router oRPC, schema database, route guard).
- **Lampiran D — Surat Keterangan Magang:** jika tersedia.
- **Lampiran E — Daftar Lengkap Endpoint API:** seluruh procedure oRPC dan deskripsi singkat.
- **Lampiran F — Daftar Lengkap Tabel Database:** seluruh 22 tabel dengan kolom dan tipe data.

---

# RINGKASAN ALOKASI HALAMAN

| Bagian | Target Halaman |
| --- | ---: |
| Bagian awal (Riwayat Hidup, Kata Pengantar, Daftar Isi, Daftar Gambar, Daftar Tabel) | 8–10 |
| BAB I — Pendahuluan | 8–10 |
| BAB II — Gambaran Umum | 14–18 |
| BAB III — Pelaksanaan Kerja Praktek | 42–54 |
| BAB IV — Kesimpulan dan Saran | 6–8 |
| Daftar Pustaka | 2–3 |
| Lampiran | 8–15 |
| **Total** | **88–120** |

Jika total melebihi 100 halaman, pangkas pada:
1. Lampiran — kurangi screenshot repetitif (pindah ke file terpisah).
2. BAB III — ringkas pembahasan modul yang memiliki pola serupa (hemat 4–6 halaman).
3. Daftar endpoint/database lengkap — cukup di lampiran, bukan badan utama.

---

# MATRIKS PENEMPATAN SCREENSHOT PER BAB

| BAB | Subbab | Nomor Screenshot | Jumlah |
| --- | --- | ---: | ---: |
| I | 1.1–1.8 | — (opsional: No 18) | 0–1 |
| II | 2.1–2.4 | No 20, 25 (opsional), 98 | 2–3 |
| III | 3.1 Persiapan Lingkungan | No 1, 2, 3 (opsional) | 2–3 |
| III | 3.2 Survei Lapangan | No 10, 11 (opsional) + foto dokumentasi | 1–2 + foto |
| III | 3.3–3.4 Arsitektur & Struktur | No 68, 69, 79, 80 (opsional), 81 (opsional) | 3–5 |
| III | 3.5 Perancangan Database | No 70, 71, 72, 73 (opsional), 74, 75 (opsional), 76 (opsional), 77 (opsional), 78 | 5–9 |
| III | 3.6 Perancangan API | No 79, 80 (opsional), 81 (opsional), 87 | 2–4 |
| III | 3.7 Authentication | No 88, 92, 93 (opsional) | 2–3 |
| III | 3.8.1 Wilayah | No 27, 28, 29, 30 (opsional), 31, 32 | 4–6 |
| III | 3.8.2 Lahan | — (dapat digabung dengan komoditas) | 0 |
| III | 3.8.3 Komoditas | No 33, 34, 35, 36, 37 (opsional) | 4–5 |
| III | 3.8.4 Produk | No 38, 39, 40, 41, 42, 43 | 6 |
| III | 3.8.5 Potensi | No 44, 45 (opsional) | 1–2 |
| III | 3.8.6 Penjualan | No 46, 47, 48 (opsional), 49, 50 | 4–5 |
| III | 3.8.7 Stall | No 51, 52, 53, 54 (opsional), 55, 56, 57 (opsional) | 5–7 |
| III | 3.8.8 User | No 58, 59, 60 (opsional) | 2–3 |
| III | 3.8.9 Dashboard | No 21, 22 (opsional), 23 (opsional), 24 (opsional), 26 | 2–5 |
| III | 3.8.10 Peta | No 61, 62, 63, 64 (opsional), 65 (opsional), 66 (opsional), 67 (opsional) | 3–7 |
| III | 3.8.11 Landing Page | No 18, 19 | 2 |
| III | 3.9 Pengujian | No 82, 83, 84, 85 (opsional), 86 (opsional), 100, 101, 102, 103 (opsional) | 5–9 |
| III | 3.10 Build/Deployment | No 94, 95, 96 (opsional), 97 (opsional), 99 (opsional) | 2–5 |
| III | 3.11 Temuan | No 8 (opsional), 9 (opsional), 77 (opsional) | 0–3 |
| III | 3.12 Kontribusi | No 4, 5, 6, 7 (opsional) | 3–4 |
| IV | 4.1–4.4 | — | 0 |
| Lampiran | Screenshot opsional sisa | Semua opsional yang tidak masuk BAB III | 10–20 |
| **Total screenshot dalam badan laporan** | | | **55–90** |
| **Target** | | | **60–80** |

---

# MATRIKS PENEMPATAN DIAGRAM PER BAB

| BAB | Diagram | Status |
| --- | --- | --- |
| I | Diagram konteks sistem | Wajib |
| II | Diagram proses bisnis | Wajib |
| II | Diagram pengelompokan technology stack | Wajib |
| III | Diagram arsitektur high-level | Wajib |
| III | Diagram deployment | Wajib |
| III | Diagram struktur folder/layer proyek | Wajib |
| III | ERD lengkap 22 tabel | Wajib |
| III | ERD domain autentikasi | Wajib |
| III | ERD domain wilayah/lahan/komoditas | Wajib |
| III | ERD domain produk/potensi | Wajib |
| III | ERD domain stall dan product brand | Wajib |
| III | ERD domain penjualan | Wajib |
| III | Sequence diagram login | Wajib |
| III | Sequence diagram route guard admin | Wajib |
| III | Sequence diagram query | Wajib |
| III | Sequence diagram mutation | Wajib |
| III | Activity diagram CRUD data master | Wajib |
| III | Activity diagram pencatatan penjualan | Wajib |
| III | Activity diagram assignment brand ke stall | Wajib |
| III | Data flow diagram level 0 | Opsional |
| III | Diagram aliran validasi UI → Zod → DB | Opsional |
| III | Diagram perbandingan schema vs migration | Opsional |
| III | Timeline commit | Wajib untuk subbab kontribusi |
| IV | Matriks rekomendasi (opsional) | Opsional |

---

# MATRIKS PENEMPATAN TABEL PER BAB

| BAB | Tabel | Status |
| --- | --- | --- |
| I | Tabel jadwal kegiatan magang | Wajib |
| II | Tabel technology stack | Wajib |
| II | Tabel pengguna dan hak akses | Wajib |
| II | Tabel modul bisnis | Wajib |
| III | Tabel perintah penting | Opsional |
| III | Tabel 22 database | Wajib |
| III | Tabel endpoint API | Wajib |
| III | Tabel matriks status modul | Wajib |
| III | Tabel role dan hak akses | Wajib |
| III | Tabel skenario pengujian | Wajib |
| III | Tabel matriks kontribusi | Wajib |
| IV | Tabel ringkasan temuan dan rekomendasi | Wajib |
| Lampiran | Tabel logbook kegiatan | Wajib |
| Lampiran | Tabel daftar endpoint lengkap | Opsional |
| Lampiran | Tabel seluruh kolom database | Opsional |

---

*Dokumen ini disusun berdasarkan `MAGANG_REPORT_CONTEXT.md`, `INTERNSHIP_CONTRIBUTION_CONTEXT.md`, `REPORT_WRITING_GUIDE.md`, `BAB_MAPPING.md`, dan `SCREENSHOT_MASTERLIST.md`. Seluruh klaim kontribusi mahasiswa bersifat kondisional terhadap verifikasi identitas author Git. Sesuaikan nomor subbab, gambar, dan tabel dengan format pedoman laporan masing-masing.*
