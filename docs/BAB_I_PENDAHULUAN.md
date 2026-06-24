# BAB I — PENDAHULUAN

## 1.1 Latar Belakang

PT Petrokimia Gresik merupakan perusahaan pupuk terbesar di Indonesia yang memiliki peran strategis dalam mendukung ketahanan pangan nasional. Dalam menjalankan fungsi pengembangan produk, Departemen Manajemen Produk Baru bertanggung jawab mengelola data pasar yang mencakup informasi wilayah, lahan pertanian, komoditas unggulan, produk pupuk, potensi pasar, jaringan kios, dan data penjualan. Pengelolaan data ini menjadi penting untuk mendukung analisis pasar, perencanaan strategis, dan monitoring produk secara tepat dan akurat.

Sebelum sistem ini dikembangkan, data pasar yang dikelola Departemen Manajemen Produk Baru masih tersebar dalam berbagai format dan belum terintegrasi dalam satu platform terpusat. Analisis geografis terhadap data pasar sulit dilakukan karena data disajikan dalam bentuk tabel yang tidak dilengkapi visualisasi spasial. Selain itu, konsistensi data sulit dijaga karena belum ada mekanisme validasi dan kontrol akses yang terstandarisasi. Kondisi ini mendorong perlunya sebuah aplikasi berbasis web yang mampu menyatukan pengelolaan data pasar sekaligus menyediakan visualisasi geografis untuk membaca persebaran dan potensi pasar.

Sistem Informasi Manajemen Produk Baru hadir sebagai solusi untuk menjawab kebutuhan tersebut. Aplikasi ini diberi nama **Satu Peta Pasar (PASAR — Platform Analisis Strategi dan Realisasi Pasar)**, yang bertujuan memetakan dan mengelola data pasar secara terpusat. Lingkup data yang dikelola meliputi provinsi, kabupaten, jenis lahan, komoditas, produk, potensi pasar, kios, dan penjualan. Sistem menyediakan peta interaktif untuk visualisasi data spasial serta panel administrasi untuk pengelolaan data master.

Dalam pengembangan aplikasi, backend memegang peranan krusial dalam menyediakan API yang konsisten, validasi data yang ketat, mekanisme authentication dan authorization, serta integrasi dengan database. Backend juga menjadi jembatan antara antarmuka pengguna dan data yang tersimpan, sehingga keandalan, keamanan, dan kemudahan pemeliharaan backend menjadi faktor penentu keberhasilan sistem secara keseluruhan.

Kegiatan magang ini menjadi sarana penerapan pengetahuan Teknik Informatika di lingkungan industri. Melalui kegiatan ini, mahasiswa dapat mempelajari arsitektur full-stack, perancangan database, implementasi API, mekanisme keamanan, dan proses deployment pada proyek nyata. Selain itu, kegiatan ini juga memberikan kesempatan untuk menuangkan hasil analisis dalam bentuk dokumentasi teknis yang bermanfaat bagi perusahaan.

## 1.2 Identifikasi Masalah

Berdasarkan latar belakang yang telah diuraikan, beberapa permasalahan yang teridentifikasi adalah sebagai berikut:

1. Data pasar yang dikelola Departemen Manajemen Produk Baru masih tersebar dan belum terintegrasi dalam satu sistem yang terpusat, sehingga menyulitkan proses pencarian, pembaruan, dan pelaporan data.

2. Analisis geografis data pasar sulit dilakukan dalam bentuk tabel, padahal informasi spasial seperti persebaran potensi pasar dan lokasi kios sangat penting dalam pengambilan keputusan bisnis.

3. Diperlukan pengelolaan data yang konsisten dengan validasi input dan kontrol akses untuk menjaga kualitas dan keamanan data.

4. Dokumentasi arsitektur backend, database, dan API diperlukan sebagai landasan pengembangan dan pemeliharaan sistem di masa mendatang.

5. Status kesiapan setiap modul bisnis perlu dipetakan untuk mengetahui area yang masih dapat dikembangkan atau disempurnakan.

## 1.3 Rumusan Masalah

Berdasarkan identifikasi masalah di atas, rumusan masalah yang menjadi fokus kegiatan magang ini adalah sebagai berikut:

1. Bagaimana struktur arsitektur backend dan alur data pada sistem aplikasi Satu Peta Pasar?

2. Bagaimana perancangan database untuk mendukung pengelolaan data pasar pada sistem?

3. Bagaimana implementasi authentication dan authorization pada sistem?

4. Bagaimana implementasi API untuk setiap modul bisnis pada sistem?

5. Bagaimana tingkat kesiapan setiap modul bisnis dalam sistem?

6. Apa temuan dan rekomendasi untuk pengembangan sistem selanjutnya?

## 1.4 Tujuan Magang

Tujuan yang ingin dicapai melalui kegiatan magang ini adalah sebagai berikut:

1. Memahami arsitektur full-stack dan alur data dari antarmuka pengguna hingga database pada aplikasi Satu Peta Pasar.

2. Mempelajari perancangan database untuk domain data pasar menggunakan PostgreSQL dan Drizzle ORM.

3. Menganalisis dan mendokumentasikan struktur backend, API, authentication, dan setiap modul bisnis pada sistem.

4. Menyusun dokumentasi teknis arsitektur, database, API, dan modul sebagai referensi pengembangan dan pemeliharaan sistem.

5. Mengimplementasikan pengembangan atau pelengkapan modul sesuai ruang lingkup yang ditetapkan, khususnya pada modul Stall dan assignment Product Brand.

## 1.5 Manfaat

Kegiatan magang ini diharapkan memberikan manfaat bagi berbagai pihak sebagai berikut:

**Bagi mahasiswa:**
- Menerapkan pengetahuan arsitektur full-stack, perancangan database, implementasi API, dan mekanisme authentication dalam proyek nyata di lingkungan industri.
- Memperoleh pengalaman dalam menganalisis source code, mendokumentasikan sistem, dan menyusun rekomendasi pengembangan.

**Bagi perusahaan:**
- Memperoleh dokumentasi teknis backend yang mencakup arsitektur, database, API, authentication, dan status modul sebagai referensi pengembangan dan pemeliharaan sistem.
- Mendapatkan identifikasi area pengembangan potensial dan rekomendasi perbaikan kualitas sistem.

**Bagi akademik:**
- Menyediakan bahan studi kasus pengembangan backend berbasis TypeScript, oRPC, dan Drizzle ORM.
- Memberikan gambaran penerapan praktik pengembangan perangkat lunak di lingkungan industri pupuk dan pertanian.

## 1.6 Batasan Masalah

Agar pembahasan lebih terfokus, kegiatan magang ini dibatasi pada hal-hal berikut:

1. Analisis dilakukan terhadap source code, dokumentasi, dan riwayat Git repository pada branch yang diperiksa.

2. Fokus utama adalah backend yang mencakup database, API oRPC, authentication, dan modul bisnis.

3. Pembahasan frontend dibatasi pada aspek yang berkaitan langsung dengan alur data backend, seperti pemanggilan API dan mekanisme route guard.

4. Modul yang dibahas meliputi wilayah (province dan regency), lahan (land type, province land, regency land), komoditas (commodity type, province commodity, regency commodity), produk (product type, product brand, product dosage), potensi (province potential, regency potential), penjualan (sales realization, daily sales), kios (stall), user management, peta interaktif, dan authentication.

5. Klaim kontribusi implementasi mahasiswa hanya digunakan untuk modul yang memiliki bukti perubahan pada riwayat repository, yaitu modul Stall dan assignment Product Brand. Modul lainnya diposisikan sebagai objek analisis dan dokumentasi.

6. Tidak semua fitur pada setiap modul memiliki tingkat kesiapan yang sama; beberapa modul masih bersifat read-only atau memiliki endpoint yang belum aktif.

## 1.7 Metode Pengumpulan Data

Metode yang digunakan dalam pengumpulan data untuk penyusunan laporan ini adalah sebagai berikut:

**Studi dokumentasi:**
Mempelajari dokumen proyek yang tersedia, seperti README, GUIDEBOOK, BACKEND.md, arch.md, dan dokumentasi lainnya yang menjelaskan arsitektur, konfigurasi, dan penggunaan sistem.

**Observasi source code:**
Menelusuri struktur route, procedure oRPC, schema Drizzle ORM, konfigurasi aplikasi, dan mekanisme authentication pada source code untuk memahami implementasi teknis setiap modul.

**Pemeriksaan database:**
Menganalisis schema database, file migration, relasi tabel, foreign key, dan constraint untuk memahami struktur dan integritas data.

**Analisis riwayat Git:**
Memeriksa riwayat commit, author, tanggal perubahan, dan file yang berubah untuk mengidentifikasi kontribusi pengembangan dan melacak evolusi sistem.

## 1.8 Sistematika Penulisan

Laporan ini disusun dalam empat bab dengan sistematika sebagai berikut:

**BAB I — Pendahuluan:**
Berisi latar belakang, identifikasi masalah, rumusan masalah, tujuan magang, manfaat, batasan masalah, metode pengumpulan data, dan sistematika penulisan.

**BAB II — Gambaran Umum:**
Berisi profil perusahaan, gambaran umum sistem Satu Peta Pasar, proses bisnis sistem, dan landasan teori yang mendukung pembahasan laporan.

**BAB III — Pelaksanaan Kerja Praktek:**
Berisi persiapan lingkungan kerja, analisis sistem, perancangan database dan API, implementasi authentication, hasil implementasi setiap modul bisnis, pengujian sistem, build dan deployment, analisis temuan, serta kontribusi mahasiswa.

**BAB IV — Kesimpulan dan Saran:**
Berisi kesimpulan dari seluruh kegiatan magang, keterbatasan, serta saran pengembangan untuk perusahaan dan kegiatan magang selanjutnya.
