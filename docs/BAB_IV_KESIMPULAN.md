# BAB IV — KESIMPULAN DAN SARAN

## 4.1 Kesimpulan

### 4.1.1 Kesimpulan Arsitektur Sistem

Aplikasi Satu Peta Pasar menerapkan arsitektur full-stack monolith pada workspace `apps/web` yang mengintegrasikan React dan TanStack Start untuk antarmuka pengguna, oRPC untuk lapisan API, Drizzle ORM untuk akses database, dan PostgreSQL untuk penyimpanan data. Berbeda dengan deskripsi template proyek yang membayangkan backend Hono terpisah pada `apps/server`, implementasi aktif menempatkan seluruh lapisan aplikasi dalam satu kesatuan.

Alur data dimulai dari komponen React yang memicu request melalui TanStack Query ke oRPC client. Request diteruskan ke server route TanStack Start yang menjalankan procedure oRPC. Setiap procedure memvalidasi input menggunakan Zod, memeriksa session melalui Better Auth, dan mengakses database melalui Drizzle ORM. Mekanisme ini memastikan type safety di seluruh lapisan aplikasi, mulai dari antarmuka pengguna hingga database.

Better Auth menangani authentication dengan metode email dan password, session berbasis cookie, dan adapter Drizzle ORM untuk penyimpanan data. Route guard pada antarmuka telah memeriksa role pengguna, tetapi protected procedure pada lapisan API belum menerapkan validasi role secara eksplisit.

### 4.1.2 Kesimpulan Database

Database sistem terdiri dari 22 tabel yang mencakup domain autentikasi (user, session, account, verification), wilayah dan lahan (provinces, regencies, land_types, province_lands, regency_lands), komoditas (commodity_types, province_commodities, regency_commodities), produk dan potensi (product_types, product_brands, product_dosages, province_potentials, regency_potentials), kios (stalls, stall_product_brands), penjualan (sales_realizations, daily_sales), dan demo (todo). Seluruh tabel menggunakan primary key UUID dan dihubungkan melalui foreign key.

Hasil analisis menemukan beberapa area yang memerlukan perhatian: field `province_id` pada `daily_sales` belum didefinisikan sebagai foreign key, indikasi perbedaan penamaan field antara schema dan migration pada `sales_realizations`, serta unique constraint yang belum terdokumentasi secara eksplisit.

### 4.1.3 Kesimpulan Modul Bisnis

Tingkat kesiapan setiap modul belum sepenuhnya seragam. Modul dengan CRUD penuh meliputi Province, Regency, Land Type, Province Land, Commodity Type, Regency Commodity, Product Type, Product Brand, Product Dosage, Sales Realization, Daily Sales, dan Stall. Modul yang masih bersifat read-only meliputi Regency Land, Province Commodity, dan Province Potential. Regency Potential memiliki tabel database yang tersedia tetapi endpoint aktif belum ditemukan.

### 4.1.4 Kesimpulan Kontribusi

Berdasarkan analisis riwayat Git, kontribusi implementasi mahasiswa teridentifikasi pada modul Stall dan assignment Product Brand melalui commit `7a38bb7`, serta rangkaian perubahan konfigurasi deployment Vercel, Netlify, dan workflow Supabase pada 12 commit berikutnya. Identitas author Git `HenokhYeremia <henokholbrain@gmail.com>` telah terverifikasi konsisten dengan nama mahasiswa, sehingga atribusi kontribusi dapat digunakan dalam laporan. Modul bisnis lainnya dibahas sebagai objek analisis dan dokumentasi, bukan sebagai klaim implementasi mandiri mahasiswa.

## 4.2 Keterbatasan

Kegiatan magang ini memiliki beberapa keterbatasan yang perlu dicatat:

1. Logbook harian, pull request, tiket, atau bukti acceptance test belum tersedia untuk mendukung klaim kegiatan secara lebih rinci.

2. Build, lint, test, dan pengujian API aktual masih perlu dilakukan untuk memvalidasi temuan analisis secara langsung.

3. Database production belum diperiksa; analisis hanya berdasarkan schema dan migration yang terdapat pada repository.

4. Beberapa fitur memiliki endpoint yang belum aktif atau belum terdokumentasi, seperti Regency Potential dan mutation Province Commodity.

5. Perubahan lokal pada Product Dosage (field `year`) dan Sales Realization (page-size selector) belum di-commit dan belum dapat diklaim sebagai kontribusi.

## 4.3 Saran Pengembangan

### 4.3.1 Saran Jangka Pendek

1. **Tambahkan adminProcedure:** Implementasi validasi role `admin` pada seluruh protected API untuk menutup gap authorization antara route guard UI dan lapisan API.

2. **Sinkronkan schema dan migration:** Verifikasi dan sinkronkan nama field antara schema dan migration, khususnya `realizaton_ytd` / `realization_ytd` pada tabel `sales_realizations`.

3. **Tambahkan foreign key:** Definisikan foreign key untuk field `province_id` pada tabel `daily_sales` untuk memperkuat integritas referensial.

### 4.3.2 Saran Jangka Menengah

1. **Standardisasi API:** Seragamkan format response, pagination, error handling, dan struktur router schema di seluruh modul.

2. **Pisahkan router per domain:** Kurangi kompleksitas router utama dengan memisahkan definisi router oRPC per domain bisnis.

3. **Tambahkan constraint:** Implementasikan unique constraint pada kombinasi data yang seharusnya unik, seperti `(province_id, land_type_id, year)`.

4. **Lengkapi CRUD modul read-only:** Aktifkan operasi create, update, dan delete pada modul yang masih read-only jika kebutuhan bisnis menghendaki.

### 4.3.3 Saran Jangka Panjang

1. **Integration test:** Implementasikan integration test untuk API dan authorization test untuk skenario role.

2. **Repository pattern:** Terapkan pola repository untuk memisahkan logika bisnis dari kueri database.

3. **CI/CD pipeline:** Sempurnakan pipeline dengan build otomatis, lint, test, dan deployment yang terintegrasi.

### 4.3.4 Saran untuk Kegiatan Magang

1. **Dokumentasi berkala:** Catat kegiatan secara teratur dalam logbook harian untuk mendukung klaim kontribusi.

2. **Gunakan pull request:** Manfaatkan pull request dan tiket untuk melacak perubahan dan diskusi pengembangan.

3. **Konfirmasi identitas:** Pastikan identitas author Git dan hubungannya dengan mahasiswa terverifikasi pada awal kegiatan untuk memudahkan atribusi kontribusi.

## 4.4 Penutup

Kegiatan magang ini telah memberikan pengalaman berharga dalam mempelajari dan menganalisis pengembangan backend aplikasi web skala industri. Penulis mengucapkan terima kasih kepada PT Petrokimia Gresik, khususnya Departemen Manajemen Produk Baru, yang telah memberikan kesempatan untuk melaksanakan kegiatan magang. Ucapan terima kasih juga disampaikan kepada pembimbing lapangan, dosen pembimbing, dan seluruh pihak yang telah mendukung kelancaran kegiatan magang ini.

Semoga laporan ini dapat memberikan manfaat bagi pengembangan sistem Satu Peta Pasar di masa mendatang serta menjadi referensi bagi kegiatan magang serupa di lingkungan akademik.
