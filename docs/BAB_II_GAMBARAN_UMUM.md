# BAB II — GAMBARAN UMUM

## 2.1 Profil Perusahaan

### 2.1.1 Sejarah dan Bidang Usaha

PT Petrokimia Gresik merupakan perusahaan pupuk terbesar dan terlengkap di Indonesia yang didirikan pada tanggal 10 Juli 1972. Perusahaan ini berlokasi di Gresik, Jawa Timur, dan bergerak di bidang produksi pupuk serta bahan kimia untuk sektor pertanian dan industri. Sebagai anggota holding perusahaan pupuk Indonesia (PT Pupuk Indonesia Holding Company), PT Petrokimia Gresik memiliki peran strategis dalam mendukung program ketahanan pangan nasional melalui penyediaan pupuk bersubsidi maupun non-subsidi.

Visi perusahaan adalah menjadi perusahaan kimia dan pupuk yang unggul di tingkat regional dan berkelanjutan. Misi perusahaan meliputi menyediakan produk dan jasa yang berkualitas, mengelola sumber daya secara efisien dan bertanggung jawab, serta memberikan kontribusi optimal bagi pemangku kepentingan. **[PERLU VERIFIKASI visi, misi, dan data resmi perusahaan]**

### 2.1.2 Departemen Manajemen Produk Baru

Departemen Manajemen Produk Baru merupakan unit kerja di bawah PT Petrokimia Gresik yang bertanggung jawab dalam pengembangan produk pupuk baru, baik bersubsidi maupun non-subsidi. Departemen ini melakukan riset pasar, analisis potensi wilayah, pemetaan distribusi, dan monitoring realisasi penjualan produk. Dalam menjalankan fungsinya, departemen mengelola data pasar yang mencakup informasi wilayah pertanian, komoditas unggulan, produk pesaing, jaringan kios, dan data penjualan.

Struktur pimpinan departemen terdiri dari Project Manager (PM) dan Senior Manager Department I (SMD I). **[PERLU VERIFIKASI struktur organisasi resmi dan nama pejabat]**

## 2.2 Gambaran Umum Sistem

### 2.2.1 Nama dan Tujuan Sistem

Sistem yang menjadi objek kegiatan magang adalah **Satu Peta Pasar (PASAR — Platform Analisis Strategi dan Realisasi Pasar)**. Sistem ini merupakan aplikasi berbasis web yang bertujuan untuk memetakan dan mengelola data pasar secara terpusat guna mendukung pengelolaan data dan monitoring produk di Departemen Manajemen Produk Baru PT Petrokimia Gresik.

Tujuan utama sistem adalah menyediakan platform terintegrasi yang mampu mengelola data wilayah, lahan, komoditas, produk, potensi pasar, kios, dan penjualan dalam satu kesatuan. Sistem dilengkapi peta interaktif untuk visualisasi geografis data pasar serta panel administrasi untuk pengelolaan data master.

### 2.2.2 Pengguna Sistem

Sistem memiliki empat kategori pengguna dengan hak akses yang berbeda:

| Pengguna | Peran dan Akses |
| --- | --- |
| Admin | Memiliki akses penuh ke panel admin (`/admin`) untuk mengelola seluruh data master, wilayah, lahan, komoditas, produk, penjualan, kios, dan pengguna. |
| Viewer | Role yang terdefinisi pada kode, memiliki akses terbatas ke halaman tertentu. Tidak dapat mengakses panel admin. **[PERLU VERIFIKASI hak akses final]** |
| Guest | Role default bagi pengguna baru. Dapat mengakses halaman publik tetapi tidak dapat masuk ke panel admin. |
| Pengunjung umum | Mengakses halaman publik seperti beranda, peta, informasi potensi produk, realisasi penjualan, dan data kios tanpa perlu login. |

### 2.2.3 Modul Utama Sistem

Sistem terdiri dari modul-modul utama sebagai berikut:

| Modul | Fungsi |
| --- | --- |
| Landing Page | Halaman publik dengan hero section, statistik ringkas, program cards, dan navigasi utama. |
| Authentication | Login dan registrasi berbasis email/password, manajemen session, dan route guard. |
| Marketing Map | Peta interaktif untuk visualisasi data potensi pasar, batas wilayah, dan persebaran kios. |
| Dashboard Admin | Ringkasan data berupa cards statistik, progress bar potensi, dan daftar produk terbaru. |
| Province Management | CRUD data provinsi (kode, nama, luas wilayah, tahun). |
| Regency Management | CRUD data kabupaten/kota yang terhubung dengan provinsi induk. |
| Land Management | CRUD jenis lahan dan data luas lahan per provinsi/kabupaten. |
| Commodity Management | CRUD jenis komoditas serta data komoditas per provinsi/kabupaten. |
| Product Management | CRUD jenis produk, brand produk, dan dosis produk. |
| Potential Management | Penyajian data potensi brand produk per provinsi/kabupaten. |
| Sales Management | CRUD realisasi penjualan dan penjualan harian. |
| Stall Management | CRUD data kios dan assignment brand produk ke kios. |
| User Management | Pengelolaan data pengguna dan peran (role). |
| Internationalization | Dukungan bahasa Inggris dan Indonesia melalui Lingui. |

### 2.2.4 Status Implementasi

Tingkat kesiapan setiap modul belum sepenuhnya seragam. Beberapa modul telah memiliki operasi CRUD penuh, beberapa masih bersifat read-only, dan terdapat modul yang tabel databasenya telah tersedia tetapi endpoint aktifnya belum ditemukan. Pembahasan lebih rinci mengenai status setiap modul disajikan pada BAB III laporan ini.

## 2.3 Proses Bisnis Sistem

### 2.3.1 Alur Pengelolaan Data Master

Proses bisnis pengelolaan data master dimulai dari pendataan wilayah sebagai entitas geografis tertinggi. Data provinsi dan kabupaten menjadi referensi bagi seluruh data operasional lainnya. Setelah wilayah terdefinisi, sistem mencatat data lahan (jenis lahan dan luasnya per wilayah) dan data komoditas (jenis komoditas unggulan per wilayah). Data produk kemudian dikelola dengan hierarki dari jenis produk, brand produk, hingga dosis produk untuk komoditas tertentu.

### 2.3.2 Alur Pencatatan Potensi dan Penjualan

Modul potensi menyimpan data potensi pasar suatu brand produk pada tingkat provinsi dan kabupaten. Data ini digunakan sebagai acuan dalam perencanaan strategis pengembangan produk. Sementara itu, modul penjualan mencatat realisasi penjualan dan data penjualan harian untuk memantau capaian dibandingkan dengan rencana (RKAP).

### 2.3.3 Alur Pendataan Kios dan Assignment Produk

Proses pendataan kios mencakup pencatatan informasi lokasi (provinsi, kabupaten, koordinat geografis), data pemilik, dan kontak. Setiap kios dapat di-assign dengan satu atau lebih brand produk melalui relasi many-to-many, sehingga sistem dapat mengetahui produk apa saja yang tersedia di setiap kios.

### 2.3.4 Alur Visualisasi Peta

Data potensi pasar divisualisasikan melalui peta interaktif berbasis Leaflet. Layer peta mencakup batas wilayah Indonesia dalam format GeoJSON, visualisasi choropleth untuk data potensi, serta marker untuk lokasi kios. Pengguna dapat memfilter data berdasarkan tahun, tingkat administrasi, dan jenis data yang ingin ditampilkan.

## 2.4 Landasan Teori

### 2.4.1 React dan TanStack

React merupakan library JavaScript untuk membangun antarmuka pengguna berbasis komponen. Dalam sistem Satu Peta Pasar, React digunakan bersama TanStack Start sebagai framework full-stack yang memungkinkan server-side rendering dan routing berbasis file. TanStack Router menangani navigasi client-side dengan dukungan loader, context, dan route guard. TanStack Query digunakan untuk mengelola server state, caching, fetching, dan mutation data dari API.

### 2.4.2 TypeScript

TypeScript adalah superset JavaScript yang menambahkan sistem tipe statis. TypeScript digunakan di seluruh lapisan sistem untuk menjaga type safety antara frontend, API, dan database. Penggunaan TypeScript memungkinkan deteksi kesalahan pada tahap kompilasi, dokumentasi kode yang lebih baik, dan pengalaman pengembangan yang lebih produktif melalui autocompletion dan type checking.

### 2.4.3 oRPC dan Zod

oRPC merupakan library untuk membuat kontrak Remote Procedure Call (RPC) yang type-safe antara client dan server. Setiap procedure oRPC mendefinisikan input, output, dan handler secara eksplisit. Input procedure divalidasi menggunakan Zod, yaitu library validasi skema data untuk TypeScript. Zod memungkinkan pendefinisian skema validasi yang dapat digunakan bersama antara lapisan form frontend dan validasi API backend.

oRPC mendukung dua jenis procedure:
- **publicProcedure** — dapat diakses tanpa session, digunakan untuk endpoint publik seperti health check dan data peta.
- **protectedProcedure** — memerlukan session pengguna yang valid, digunakan untuk endpoint administratif.

### 2.4.4 PostgreSQL dan Drizzle ORM

PostgreSQL adalah sistem manajemen basis data relasional objek yang digunakan sebagai database utama sistem. Drizzle ORM adalah TypeScript ORM yang menyediakan query builder type-safe, definisi schema deklaratif, dan sistem migrasi database. Schema Drizzle mendefinisikan tabel, kolom, foreign key, dan constraint secara eksplisit dalam kode TypeScript.

Komponen utama Drizzle ORM yang digunakan meliputi:
- **Schema** — definisi tabel, relasi, dan constraint dalam kode TypeScript.
- **Migration** — file SQL yang dihasilkan dari perubahan schema untuk menjaga konsistensi database.
- **Drizzle Kit** — alat CLI untuk generate, migrate, dan push schema ke database.

### 2.4.5 Better Auth

Better Auth adalah library authentication untuk TypeScript yang menyediakan manajemen user, session, dan account. Sistem Satu Peta Pasar menggunakan Better Auth dengan adapter Drizzle ORM untuk menyimpan data autentikasi ke PostgreSQL. Metode autentikasi yang digunakan adalah email dan password dengan session yang dikelola melalui cookie.

Mekanisme keamanan mencakup:
- **Session-based authentication** — pengguna yang login mendapatkan session token yang disimpan dalam cookie.
- **Route guard** — halaman admin memeriksa session dan role pengguna sebelum memberikan akses.
- **Protected procedure** — API procedure memvalidasi session sebelum memproses request.

### 2.4.6 Leaflet dan GeoJSON

Leaflet merupakan library JavaScript sources terbuka untuk menampilkan peta interaktif berbasis web. React Leaflet menyediakan binding React untuk Leaflet sehingga peta dapat diintegrasikan sebagai komponen React. GeoJSON adalah format data geospasial berbasis JSON yang digunakan untuk merepresentasikan fitur geografis seperti batas wilayah dan titik lokasi.

Dalam sistem, GeoJSON digunakan untuk menyimpan data batas provinsi dan kabupaten Indonesia. Data ini disimpan dalam folder `public/data/` dan dimuat oleh Leaflet untuk ditampilkan sebagai layer peta. Data choropleth diperoleh dari API oRPC yang menyediakan data potensi pasar per wilayah.

### 2.4.7 Build dan Deployment

Proses build dan deployment sistem menggunakan perangkat sebagai berikut:

| Teknologi | Fungsi |
| --- | --- |
| Bun | Runtime JavaScript dan package manager. |
| Vite | Development server dan production bundling. |
| Turborepo | Menjalankan task monorepo secara paralel dengan caching. |
| Biome / Ultracite | Linting, formatting, dan pemeriksaan kualitas kode. |
| Vitest | Framework pengujian unit dan integrasi. |
| Docker | Kontainerisasi PostgreSQL dan aplikasi. |
| Netlify | Target deployment utama dengan TanStack Start. |
| Vercel | Alternatif platform deployment. |
| GitHub Actions | Workflow otomatisasi, termasuk ping Supabase keep-alive. |

### 2.4.8 Arsitektur Full-Stack Monolith

Sistem Satu Peta Pasar menerapkan arsitektur full-stack monolith pada workspace `apps/web`. Berbeda dengan deskripsi template proyek yang membayangkan backend Hono terpisah pada folder `apps/server`, implementasi aktif menempatkan frontend dan backend dalam satu aplikasi TanStack Start. Server route di `apps/web/src/routes/api` mengekspos endpoint untuk oRPC, OpenAPI, dan Better Auth, sehingga seluruh lapisan aplikasi terintegrasi dalam satu kesatuan deployment.
