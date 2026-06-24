# BAB III — PELAKSANAAN KERJA PRAKTEK (LANJUTAN)

## 3.8 Hasil Implementasi Modul Bisnis

### 3.8.1 Modul Wilayah (Province dan Regency)

Modul Wilayah digunakan untuk mengelola data master provinsi dan kabupaten yang menjadi referensi geografis bagi seluruh modul lain dalam sistem.

**Province** menyediakan operasi CRUD untuk data provinsi yang meliputi kode provinsi, nama provinsi, luas wilayah, dan tahun data. Fitur yang tersedia meliputi pencarian berdasarkan nama, pagination, serta validasi kode provinsi yang unik.

**Regency** menyediakan operasi CRUD untuk data kabupaten atau kota yang terhubung dengan provinsi induk melalui foreign key. Setiap regency mencatat kode wilayah, nama, provinsi induk, luas, dan tahun. Fitur pencarian dan pagination juga tersedia pada modul ini.

Relasi antara province dan regency bersifat one-to-many, di mana satu provinsi dapat memiliki banyak kabupaten atau kota. Validasi memastikan bahwa setiap regency hanya dapat dihubungkan dengan satu provinsi yang valid.

### 3.8.2 Modul Lahan (Land Type, Province Land, Regency Land)

Modul Lahan digunakan untuk mengelola data jenis lahan dan luas lahan per wilayah.

**Land Type** merupakan data master jenis lahan yang mencakup nama jenis lahan dan tahun. Modul ini menyediakan operasi CRUD penuh.

**Province Land** menyediakan CRUD untuk data luas lahan pada tingkat provinsi, mencakup provinsi, jenis lahan, luas, dan tahun. Data ini memungkinkan analisis komposisi lahan per provinsi.

**Regency Land** saat ini berfokus pada pembacaan data (read-only). Operasi create, update, dan delete pada tingkat kabupaten belum diaktifkan pada router. Modul ini menjadi salah satu area yang dapat dikembangkan lebih lanjut.

### 3.8.3 Modul Komoditas (Commodity Type, Province Commodity, Regency Commodity)

Modul Komoditas digunakan untuk mengelola data jenis komoditas pertanian dan hubungannya dengan wilayah.

**Commodity Type** merupakan data master komoditas yang terhubung dengan jenis lahan melalui foreign key. Setiap komoditas mencatat nama dan tahun. Modul menyediakan CRUD penuh dengan fitur pencarian dan filter berdasarkan jenis lahan.

**Province Commodity** menyajikan data komoditas pada tingkat provinsi. Informasi yang ditampilkan diperoleh melalui relasi antara provinsi dan jenis komoditas, disertai data luas serta tahun. Berdasarkan hasil analisis, fungsi backend yang aktif berfokus pada pengambilan, pencarian, dan penyaringan data, sedangkan operasi penambahan, perubahan, dan penghapusan belum diaktifkan pada router.

**Regency Commodity** telah menyediakan operasi CRUD yang lebih lengkap. Modul ini menghubungkan kabupaten atau kota dengan jenis komoditas dan menyimpan informasi luas serta tahun. Perbedaan tingkat kesiapan antara Province Commodity (read-only) dan Regency Commodity (CRUD penuh) menunjukkan bahwa pengembangan pada kedua tingkat wilayah dilakukan dengan prioritas yang berbeda.

### 3.8.4 Modul Produk (Product Type, Product Brand, Product Dosage)

Modul Produk digunakan untuk mengelola data produk dengan hierarki tiga tingkat: jenis produk, brand produk, dan dosis produk.

**Product Type** merupakan data master jenis produk yang mencakup nama, deskripsi, dan tahun. Modul ini menyediakan CRUD penuh dengan penanganan konflik duplikasi data.

**Product Brand** merupakan data master brand produk yang berada di bawah Product Type. Setiap brand mencatat nama, industri, dan deskripsi. Product Brand memiliki peran sentral karena direferensikan oleh banyak modul lain, termasuk Product Dosage, Province Potential, Sales Realization, Daily Sales, dan Stall. Modul ini menyediakan CRUD penuh dengan fitur pencarian dan filter berdasarkan Product Type.

**Product Dosage** digunakan untuk mencatat dosis penggunaan suatu brand produk pada jenis komoditas tertentu. Data yang dikelola meliputi komoditas, brand produk, nilai dosis, satuan, dan tahun. Pada lapisan backend, modul menyediakan operasi pengambilan, penambahan, perubahan, dan penghapusan data yang terhubung dengan tabel `commodity_types` dan `product_brands`.

### 3.8.5 Modul Potensi (Province Potential, Regency Potential)

Modul Potensi digunakan untuk menyajikan data potensi pasar suatu brand produk pada tingkat wilayah.

**Province Potential** menyajikan informasi potensi suatu brand produk pada tingkat provinsi. Backend menggabungkan data provinsi dan Product Brand serta menyediakan filter berdasarkan wilayah, produk, dan tahun. Hasil observasi menunjukkan bahwa fungsi aktif masih berfokus pada penyajian data (read-only). Operasi penambahan, perubahan, dan penghapusan belum diaktifkan pada router.

**Regency Potential** memiliki tabel database yang telah tersedia, tetapi endpoint aktif belum ditemukan pada router yang dianalisis. Modul ini memerlukan verifikasi lebih lanjut untuk memastikan status implementasinya.

### 3.8.6 Modul Penjualan (Sales Realization, Daily Sales)

Modul Penjualan digunakan untuk mencatat dan memantau realisasi penjualan produk.

**Sales Realization** menyediakan CRUD untuk data realisasi dan RKAP (Rencana dan Anggaran Kegiatan) per Product Brand. Data yang dikelola meliputi tanggal laporan, brand produk, realisasi harian, bulanan, year-to-date (YTD), RKAP, dan pembanding tahun sebelumnya. Modul dilengkapi fitur filter dan pagination. Hasil analisis menunjukkan indikasi perbedaan penamaan field antara schema (`realization_ytd`) dan migration (`realizaton_ytd`) yang perlu diverifikasi terhadap database aktual.

**Daily Sales** menyediakan CRUD untuk data penjualan harian yang mencakup tanggal, bulan, tahun, Product Brand, provinsi, kuantitas, pendapatan, target, catatan, dan realisasi. Setiap data penjualan harian terhubung dengan satu brand produk. Field `province_id` telah tersedia untuk menyimpan konteks wilayah, tetapi definisi foreign key belum ditemukan pada schema yang dianalisis.

### 3.8.7 Modul Stall

Modul Stall digunakan untuk mengelola data kios yang mencakup nama kios, alamat, provinsi, kabupaten, koordinat geografis (latitude dan longitude), nama pemilik, nomor telepon, kriteria kios, dan tahun.

Setiap Stall berada pada satu provinsi dan satu kabupaten melalui relasi foreign key. Stall dapat terhubung dengan lebih dari satu Product Brand melalui tabel penghubung `stall_product_brands`, membentuk relasi many-to-many.

Modul ini menyediakan operasi CRUD lengkap, form pengelolaan data, serta fitur assignment Product Brand. Fitur assignment memungkinkan admin untuk memilih brand produk yang tersedia pada masing-masing kios melalui antarmuka pengelolaan. Modul Stall juga mendukung import data dari file Excel melalui script `scripts/seed-stalls.ts` yang membaca data dari `data/SURVEY PASAR KIOS (Jawaban).xlsx`.

Modul Stall merupakan modul dengan bukti perubahan repository yang paling jelas. Commit `7a38bb7` menunjukkan penambahan dan perubahan signifikan pada modul ini, mencakup operasi create, update, delete, penyempurnaan form, integrasi procedure pada router oRPC, dan pengembangan fitur assignment Product Brand.

### 3.8.8 User Management

Modul User Management digunakan untuk mengelola data pengguna dan peran (role) dalam sistem. Data yang dikelola meliputi nama, email, dan role pengguna.

Modul menyediakan operasi pengambilan daftar pengguna, detail pengguna, pembaruan data (termasuk perubahan role), dan penghapusan pengguna. Pembuatan pengguna dilakukan melalui mekanisme signup yang disediakan oleh Better Auth.

Role yang tersedia meliputi admin (akses penuh), viewer (akses terbatas), dan guest (role default).

### 3.8.9 Dashboard Admin

Dashboard Admin menampilkan ringkasan data dalam bentuk cards statistik yang mencakup:

- Jumlah provinsi, kabupaten, jenis lahan, jenis komoditas, jenis produk, brand produk, dan kios yang terdaftar.
- Jumlah data realisasi penjualan.
- Progress bar untuk potensi provinsi (Province Potential Coverage).
- Daftar brand produk terbaru.
- Indikator health check status API.

Dashboard menjadi pusat navigasi bagi admin untuk memantau kondisi data secara cepat dan mengakses modul-modul pengelolaan data.

### 3.8.10 Visualisasi Peta

Halaman peta interaktif dibangun menggunakan Leaflet dan React Leaflet untuk menampilkan data spasial secara visual. Komponen utama halaman peta meliputi:

- **Layer batas wilayah:** Data GeoJSON batas provinsi dan kabupaten Indonesia yang dimuat dari folder `public/data/`.
- **Choropleth:** Visualisasi data potensi pasar berdasarkan wilayah dengan gradasi warna.
- **Marker kios:** Titik lokasi kios yang diambil dari data Stall.
- **Sidebar filter:** Panel untuk menyaring data berdasarkan tahun, tingkat administrasi, brand, jenis lahan, dan jenis komoditas.
- **Popup:** Informasi detail provinsi atau kabupaten yang muncul saat wilayah diklik.

Data untuk peta bersumber dari GeoJSON statis untuk batas wilayah dan API oRPC untuk data potensi dan kios.

### 3.8.11 Landing Page Publik

Halaman publik (landing page) merupakan antarmuka pertama yang dilihat pengunjung. Halaman ini menampilkan:

- **Hero section:** Judul aplikasi dan statistik ringkas (jumlah provinsi, komoditas, brand produk, kios).
- **Program cards:** Informasi program Market Map, Roadshow, dan Socialization.
- **Monitoring agenda:** Agenda pemantauan tahun 2026.
- **Struktur pimpinan:** Informasi Project Manager (PM) dan Senior Manager Department I (SMD I).
- **Call-to-action:** Tombol navigasi menuju peta potensi dan program kerja.

## 3.9 Pengujian Sistem

### 3.9.1 Pengujian API

Pengujian API dilakukan untuk memverifikasi bahwa endpoint oRPC berfungsi sesuai dengan yang diharapkan. Skenario pengujian meliputi:

- Health check endpoint untuk memastikan server berjalan.
- Akses endpoint publik tanpa session.
- Akses protected endpoint tanpa session (diharapkan ditolak).
- Validasi input dengan data tidak valid (diharapkan mengembalikan error validasi).
- Operasi CRUD pada setiap modul dengan data valid.

### 3.9.2 Pengujian Authentication

Pengujian authentication dilakukan untuk memverifikasi mekanisme login dan pembatasan akses:

- Login dengan kredensial valid (diharapkan berhasil dan mendapatkan session).
- Login dengan kredensial tidak valid (diharapkan ditolak).
- Akses route admin tanpa login (diharapkan dialihkan ke halaman login).
- Akses route admin dengan role guest (diharapkan ditolak oleh route guard).

### 3.9.3 Quality Check

Pemeriksaan kualitas kode dilakukan menggunakan perintah yang tersedia dalam proyek:

- Type checking dengan `bun run check-types` untuk memvalidasi tipe TypeScript.
- Linting dan formatting dengan `bun run check` (Biome / Ultracite).

### 3.9.4 Production Build

Pengujian build dilakukan untuk memastikan aplikasi dapat dikompilasi ke mode produksi tanpa error. Perintah `bun run build` digunakan untuk menjalankan proses build melalui Vite dan Turborepo.

### 3.9.5 Keterbatasan Pengujian

Pengujian dilakukan dalam lingkup terbatas sesuai dengan waktu dan akses yang tersedia selama kegiatan magang. Pengujian otomatis (unit test dan integration test) dengan Vitest belum dapat dilaksanakan secara menyeluruh karena cakupan test yang masih terbatas dalam repository.

## 3.10 Build, Testing, dan Deployment

### 3.10.1 Build

Proses build aplikasi menggunakan Vite sebagai bundler dan Turborepo untuk mengelola task monorepo secara paralel. Target build dikonfigurasi untuk TanStack Start dengan platform Netlify. Konfigurasi build terdapat pada `vite.config.ts` dan `turbo.json` di root proyek.

### 3.10.2 Linting dan Formatting

Proyek menggunakan Biome dan Ultracite untuk pemeriksaan kualitas kode. Ultracite menyediakan aturan tambahan untuk type safety, aksesibilitas, dan konsistensi kode yang melengkapi aturan bawaan Biome.

### 3.10.3 Deployment

Beberapa opsi deployment telah dikonfigurasi dalam proyek:

**Netlify:**
Konfigurasi melalui `netlify.toml` dengan base directory `apps/web`, publish directory `dist`, dan build command `bun run build`.

**Vercel:**
Konfigurasi alternatif melalui `vercel.json`.

**Docker:**
Dockerfile untuk membangun aplikasi dalam container dan docker-compose.yml untuk menjalankan layanan PostgreSQL lokal.

**GitHub Actions:**
Workflow `Ping Supabase` untuk menjaga koneksi database Supabase tetap aktif. Pipeline build-test penuh belum terdokumentasi.

### 3.10.4 Environment Variable

Variabel lingkungan yang diperlukan untuk menjalankan aplikasi meliputi:
- `DATABASE_URL` — URL koneksi database PostgreSQL.
- `BETTER_AUTH_SECRET` — Secret key untuk Better Auth.
- `BETTER_AUTH_URL` — Base URL aplikasi.
- `CORS_ORIGIN` — Origin yang diizinkan.
- `VITE_BETTER_AUTH_URL` — URL auth untuk client.

## 3.11 Analisis dan Temuan

### 3.11.1 Status Modul

Berdasarkan hasil analisis, tingkat kesiapan setiap modul belum sepenuhnya seragam. Modul dengan CRUD penuh meliputi Province, Regency, Land Type, Province Land, Commodity Type, Regency Commodity, Product Type, Product Brand, Product Dosage, Sales Realization, Daily Sales, dan Stall. Modul yang masih bersifat read-only meliputi Regency Land, Province Commodity, dan Province Potential. Regency Potential memiliki tabel database yang tersedia, tetapi endpoint aktif belum ditemukan.

### 3.11.2 Gap Authorization

Mekanisme protected procedure telah memeriksa keberadaan session, tetapi validasi role pada lapisan API belum diterapkan secara eksplisit. Kondisi ini menyebabkan API masih dapat diakses oleh pengguna dengan role viewer atau guest selama mereka memiliki session yang valid. Route guard pada antarmuka telah memeriksa role, tetapi lapisan API belum memiliki mekanisme yang setara.

### 3.11.3 Mismatch Schema-Migration

Pada tabel `sales_realizations`, ditemukan indikasi perbedaan penamaan field antara schema dan migration. Schema menggunakan nama `realization_ytd`, sedangkan migration menggunakan `realizaton_ytd`. Perbedaan ini perlu diverifikasi terhadap database aktual untuk menentukan kondisi sebenarnya.

### 3.11.4 Missing Foreign Key

Field `province_id` pada tabel `daily_sales` belum didefinisikan sebagai foreign key pada schema yang dianalisis. Penambahan foreign key diperlukan untuk memperkuat integritas referensial antara data penjualan harian dan data provinsi.

### 3.11.5 Unique Constraint

Kombinasi data yang seharusnya unik, seperti `(province_id, land_type_id, year)` pada `province_lands` dan `(stall_id, product_brand_id)` pada `stall_product_brands`, belum terdokumentasi memiliki constraint unique. Penambahan unique constraint dapat mencegah duplikasi data yang tidak diinginkan.

### 3.11.6 Coupling Modul Stall

Modul Stall memiliki tanggung jawab yang cukup luas, mencakup pengelolaan data kios, assignment Product Brand, dan integrasi dengan modul lain. Pemisahan komponen dan use case menjadi modul yang lebih terfokus dapat meningkatkan maintainability kode.

### 3.11.7 Standardisasi

Beberapa aspek implementasi yang belum seragam meliputi:
- Format response API.
- Mekanisme pagination.
- Pola error handling.
- Struktur pemisahan router dan schema per modul.

Standardisasi pada area tersebut dapat meningkatkan konsistensi dan kemudahan pemeliharaan sistem.

### 3.11.8 Rekomendasi

Berdasarkan temuan di atas, rekomendasi pengembangan meliputi:

1. Menambahkan `adminProcedure` untuk validasi role pada seluruh protected API.
2. Menyinkronkan nama field antara schema dan migration, khususnya pada `sales_realizations`.
3. Menambahkan foreign key `daily_sales.province_id` untuk memperkuat integritas referensial.
4. Menambahkan unique constraint pada kombinasi data yang seharusnya unik.
5. Melakukan standardisasi response API, pagination, error handling, dan struktur router.
6. Memisahkan router oRPC per domain untuk mengurangi kompleksitas.
7. Menambahkan integration test untuk API dan authorization test.

## 3.12 Kontribusi Mahasiswa

### 3.12.1 Bukti Repository

Berdasarkan analisis riwayat Git, ditemukan 22 commit oleh author Git `HenokhYeremia <henokholbrain@gmail.com>`. Identitas email `henokholbrain@gmail.com` konsisten dengan nama mahasiswa **Henokh Yeremia Olbrain Perangin Angin**, sehingga kontribusi pada commit dapat diatribusikan kepada mahasiswa.

### 3.12.2 Commit Modul Stall

Commit `7a38bb7` (26 Mei 2026) dengan judul `feat: complete stall and product brand management` merupakan bukti utama kontribusi implementasi. Perubahan pada commit ini mencakup:

- **Operasi CRUD Stall:** Pengembangan create, update, dan delete pada modul Stall.
- **Form pengelolaan:** Penyempurnaan form input data kios.
- **Integrasi router oRPC:** Penghubungan procedure Stall ke dalam komposisi router.
- **Assignment Product Brand:** Pengembangan fitur pengelolaan relasi Product Brand pada Stall melalui komponen `manage-stall-products.tsx` dan prosedur sinkronisasi relasi.
- **Perubahan query Regency:** Penyesuaian query terkait data Regency.

### 3.12.3 Commit Konfigurasi Deployment

Sebanyak 12 commit setelah commit fitur Stall menunjukkan perubahan konfigurasi deployment, meliputi:

- Konfigurasi Vercel dan Netlify.
- Redirect SSR.
- Target build.
- Workflow ping Supabase dan keep-alive.

### 3.12.4 Kegiatan Analisis dan Dokumentasi

Selain kontribusi implementasi, penulis melakukan kegiatan analisis dan dokumentasi yang mencakup:

- Analisis arsitektur backend, database, API, authentication, dan sembilan modul bisnis.
- Dokumentasi teknis struktur backend, relasi database, endpoint API, dan matriks modul.
- Pemetaan status kesiapan fitur dan identifikasi temuan kualitas.
- Penyusunan rekomendasi pengembangan berdasarkan hasil analisis.

### 3.12.5 Batasan Kontribusi

Modul-modul berikut tidak diklaim sebagai kontribusi implementasi mandiri mahasiswa dan diposisikan sebagai objek analisis: Product Dosage, Product Brand (CRUD master), Commodity Type, Province Commodity, Regency Commodity, Province Potential, Sales Realization, dan Daily Sales. Modul-modul tersebut telah tersedia pada snapshot awal repository (commit `3959ce9`) dan tidak ditemukan commit spesifik yang menunjukkan perubahan oleh mahasiswa pada modul-modul tersebut.
