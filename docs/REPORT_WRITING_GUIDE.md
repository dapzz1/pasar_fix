# Panduan Penulisan Laporan Magang

Panduan ini membantu mengubah hasil pemeriksaan teknis proyek Satu Peta Pasar menjadi narasi laporan magang yang akademik, runtut, dan tidak melebihkan kontribusi mahasiswa. Referensi yang digunakan adalah `MAGANG_REPORT_CONTEXT.md`, `INTERNSHIP_CONTRIBUTION_CONTEXT.md`, dan `BAB_MAPPING.md`.

Fokus penulisan dibagi menjadi tiga jenis narasi:

1. **Fakta Sistem** — menjelaskan kondisi aplikasi yang dapat diamati.
2. **Hasil Analisis** — menjelaskan pemahaman dan temuan penulis setelah mempelajari sistem.
3. **Pengalaman Mahasiswa** — menjelaskan aktivitas belajar, observasi, analisis, dokumentasi, atau implementasi yang benar-benar dilakukan selama magang.

# 1. PRINSIP DASAR PENULISAN

## 1.1 Bedakan Objek yang Dipelajari dan Pekerjaan yang Dilakukan

Keberadaan sebuah modul dalam repository tidak selalu berarti modul tersebut dibuat oleh mahasiswa. Gunakan subjek kalimat sesuai konteks:

| Konteks | Subjek yang Tepat | Contoh |
| --- | --- | --- |
| Menjelaskan aplikasi | Sistem, aplikasi, modul, backend | “Modul Product Dosage menyediakan operasi pengelolaan dosis produk.” |
| Menjelaskan temuan | Hasil analisis, hasil observasi, hasil penelusuran | “Hasil analisis menunjukkan bahwa Province Commodity masih berfokus pada penyajian data.” |
| Menjelaskan kegiatan mahasiswa | Penulis | “Penulis mempelajari relasi data komoditas provinsi dengan tabel provinsi dan jenis komoditas.” |
| Menjelaskan kontribusi implementasi | Penulis, disertai bukti aktivitas | “Penulis mengembangkan…” hanya jika didukung commit, logbook, tiket, atau konfirmasi pembimbing. |

## 1.2 Pola Narasi Akademik

Gunakan urutan berikut pada setiap pembahasan modul:

1. Jelaskan tujuan modul.
2. Jelaskan data dan relasinya.
3. Jelaskan alur kerja sistem.
4. Jelaskan hasil observasi atau analisis.
5. Jelaskan pengalaman penulis.
6. Cantumkan gambar, tabel, atau diagram pendukung.
7. Tutup dengan kesimpulan singkat atau rekomendasi.

Pola paragraf:

> Modul **[nama modul]** digunakan untuk **[fungsi]**. Data yang dikelola meliputi **[data]** dan berelasi dengan **[entitas]**. Pada sisi backend, proses tersebut ditangani melalui **[API/procedure]**, sedangkan penyimpanan data menggunakan **[tabel]**. Berdasarkan hasil observasi, **[temuan]**. Selama kegiatan magang, penulis mempelajari dan mendokumentasikan **[aspek yang benar-benar dikerjakan]**.

## 1.3 Mengubah Bahasa Audit Menjadi Bahasa Laporan

| Bahasa audit yang dihindari | Bahasa laporan akademik |
| --- | --- |
| “Bukti kontribusi mahasiswa belum dapat dibuktikan.” | “Selama kegiatan magang, penulis melakukan observasi, analisis, dan dokumentasi terhadap modul tersebut.” |
| “Modul ini cuma ada di first commit.” | “Modul telah tersedia pada baseline repository yang menjadi objek kegiatan magang.” |
| “Tidak ada commit mahasiswa.” | “Pembahasan modul difokuskan pada proses pemahaman dan analisis, bukan pada klaim pengembangan dari awal.” |
| “Endpoint CRUD-nya tidak lengkap.” | “Fungsi modul saat ini berfokus pada penyajian data, sedangkan operasi penambahan, perubahan, dan penghapusan belum diaktifkan pada router.” |
| “Schema dan migration mismatch.” | “Hasil analisis menunjukkan adanya indikasi perbedaan antara definisi schema dan berkas migration yang perlu diverifikasi terhadap database aktual.” |
| “Authorization API lemah.” | “Mekanisme protected procedure telah memeriksa session, tetapi validasi role pada lapisan API masih dapat diperkuat.” |
| “Kode Stall terlalu kompleks.” | “Modul Stall memiliki tanggung jawab yang cukup luas sehingga pemisahan komponen dan use case dapat meningkatkan maintainability.” |
| “Product Brand tidak benar-benar diubah.” | “Perubahan yang teridentifikasi berfokus pada pengelolaan relasi Product Brand dengan Stall, bukan pada CRUD master Product Brand.” |
| “Perubahan lokal belum jelas siapa yang membuat.” | “Perubahan tersebut diperlakukan sebagai bahan observasi teknis dan tidak digunakan sebagai dasar klaim kontribusi implementasi.” |
| “Database salah.” | “Struktur database memiliki beberapa area yang memerlukan validasi dan penyempurnaan lebih lanjut.” |

## 1.4 Pilihan Kata yang Disarankan

Gunakan:

- mengamati;
- mempelajari;
- menganalisis;
- menelusuri;
- mendokumentasikan;
- memetakan alur;
- mengidentifikasi;
- membandingkan;
- melakukan pengujian, jika pengujian benar-benar dilakukan;
- mengembangkan atau memperbaiki, hanya jika memiliki bukti kegiatan.

Hindari kata berikut tanpa bukti pendukung:

- membangun seluruh sistem;
- merancang dari awal;
- mengembangkan semua modul;
- menyelesaikan seluruh fitur;
- mengoptimalkan;
- meningkatkan performa;
- memperbaiki keamanan;
- menjamin keamanan;
- berhasil seratus persen.

# 2. PEMISAHAN TIGA JENIS NARASI

## 2.1 Fakta Sistem

Fakta Sistem menjawab pertanyaan: **“Apa yang tersedia dan bagaimana sistem bekerja?”**

Materi yang dapat ditulis:

- arsitektur full-stack monolith pada `apps/web`;
- technology stack;
- struktur project;
- tabel database dan relasi;
- route, API, authentication, dan authorization;
- status CRUD, read-only, parsial, atau database-only;
- tampilan halaman dan alur penggunaan.

Gaya bahasa:

> Sistem Satu Peta Pasar menerapkan arsitektur full-stack monolith pada workspace `apps/web`. Antarmuka dibangun menggunakan React dan TanStack Start, sedangkan komunikasi data ditangani oleh oRPC. Setiap procedure mengakses PostgreSQL melalui Drizzle ORM dan dapat menerapkan validasi input menggunakan Zod.

Penempatan utama: **BAB II, BAB III, dan BAB IV bagian Hasil Implementasi Sistem**.

## 2.2 Hasil Analisis

Hasil Analisis menjawab pertanyaan: **“Apa yang dipahami atau ditemukan setelah sistem dipelajari?”**

Materi yang dapat ditulis:

- relasi dan dependensi modul;
- perbedaan status kesiapan fitur;
- alur data dari UI ke database;
- indikasi perbedaan schema dan migration;
- missing foreign key atau constraint;
- gap authorization;
- coupling dan peluang refactor;
- rekomendasi pengembangan.

Gaya bahasa:

> Berdasarkan hasil analisis, mekanisme pembatasan akses admin telah diterapkan pada route antarmuka. Namun, protected procedure pada lapisan API masih berfokus pada pemeriksaan session. Kondisi tersebut menunjukkan bahwa validasi role pada API dapat ditambahkan agar aturan akses tidak hanya bergantung pada route guard.

Penempatan utama: **BAB III dan BAB IV bagian Hasil Analisis Sistem**.

## 2.3 Pengalaman Mahasiswa

Pengalaman Mahasiswa menjawab pertanyaan: **“Apa yang dilakukan dan dipelajari penulis selama magang?”**

Narasi dasar yang aman:

> Selama kegiatan magang, penulis mempelajari struktur aplikasi Satu Peta Pasar melalui dokumentasi dan source code. Kegiatan dilakukan dengan menelusuri alur request, mengidentifikasi hubungan antarentitas, memetakan status setiap modul, serta menyusun dokumentasi teknis sebagai bahan pemeliharaan dan pengembangan sistem.

Untuk modul tanpa bukti implementasi individual:

> Pada modul tersebut, kegiatan penulis berfokus pada observasi, analisis alur data, dan dokumentasi. Oleh karena itu, pembahasan tidak menempatkan penulis sebagai pengembang awal modul, melainkan sebagai pihak yang mempelajari struktur dan perilaku sistem.

Untuk Stall, sebelum identitas author Git dikonfirmasi:

> Penulis mempelajari implementasi modul Stall, termasuk operasi pengelolaan data dan relasi Product Brand. Riwayat pengembangan modul digunakan sebagai bahan untuk memahami perubahan struktur API, form, dan hubungan data.

Setelah keterlibatan mahasiswa pada commit dikonfirmasi:

> Penulis melengkapi modul Stall melalui pengembangan operasi create, update, dan delete, penyempurnaan form, integrasi procedure pada router oRPC, serta pengelolaan assignment Product Brand pada Stall.

Penempatan utama: **BAB IV bagian Kontribusi Mahasiswa**, dengan pengalaman belajar juga dapat dijelaskan pada metodologi BAB III.

# 3. PANDUAN PENULISAN PER MODUL

## 3.1 Ringkasan Penempatan

| Modul | Implementasi Sistem | Analisis Sistem | Kontribusi Mahasiswa |
| --- | --- | --- | --- |
| Product Dosage | Ya | Ya | Observasi/analisis; pengembangan tidak diklaim |
| Product Brand | Ya | Ya | Observasi/analisis; assignment di Stall bersifat kondisional |
| Commodity Type | Ya | Ya | Observasi/analisis; pengembangan tidak diklaim |
| Province Commodity | Ya, sebagai read-only | Ya | Observasi/analisis; pengembangan tidak diklaim |
| Regency Commodity | Ya | Ya | Observasi/analisis; pengembangan tidak diklaim |
| Province Potential | Ya, sebagai read-only | Ya | Observasi/analisis; pengembangan tidak diklaim |
| Sales Realization | Ya | Ya | Observasi/analisis; perubahan lokal tidak diklaim |
| Daily Sales | Ya | Ya | Observasi/analisis; pengembangan tidak diklaim |
| Stall | Ya | Ya | Pengembangan hanya setelah keterlibatan pada commit dikonfirmasi |

## 3.2 Product Dosage

### Cara Menulis di Laporan

Jelaskan Product Dosage sebagai modul yang menghubungkan komoditas dengan brand produk melalui nilai dosis, satuan, dan tahun. Uraikan fungsi tabel `product_dosages`, relasi ke `commodity_types` dan `product_brands`, validasi input, serta operasi CRUD yang tersedia.

Perubahan lokal terkait field `year` dapat dibahas sebagai bahan evaluasi kebutuhan data, bukan sebagai hasil implementasi mahasiswa.

### Penempatan

- **Implementasi Sistem:** Ya. Jelaskan CRUD dan alur data yang tersedia.
- **Analisis Sistem:** Ya. Jelaskan relasi, validasi, field tahun, dan kebutuhan konsistensi schema/form.
- **Kontribusi Mahasiswa:** Batasi pada kegiatan mempelajari, menelusuri, dan mendokumentasikan. Jangan mengklaim pengembangan atau perbaikan field `year`.

### Contoh Paragraf

> Modul Product Dosage digunakan untuk mencatat dosis penggunaan suatu brand produk pada jenis komoditas tertentu. Data utama yang dikelola meliputi komoditas, brand produk, nilai dosis, satuan, dan tahun. Pada lapisan backend, modul menyediakan operasi pengambilan, penambahan, perubahan, dan penghapusan data yang terhubung dengan tabel `commodity_types` dan `product_brands`. Selama kegiatan magang, penulis mempelajari alur validasi dan relasi data pada modul ini serta mendokumentasikan kebutuhan konsistensi field antara form, procedure, dan schema database.

## 3.3 Product Brand

### Cara Menulis di Laporan

Jelaskan Product Brand sebagai data master brand yang berada di bawah Product Type dan digunakan oleh Product Dosage, Potential, Sales, Daily Sales, dan Stall. Pisahkan CRUD master Product Brand dari pengelolaan assignment Product Brand pada Stall.

### Penempatan

- **Implementasi Sistem:** Ya. Jelaskan CRUD master dan relasi lintas modul.
- **Analisis Sistem:** Ya. Jelaskan fungsi sentral Product Brand dan perbedaan antara master data dengan tabel penghubung Stall.
- **Kontribusi Mahasiswa:** CRUD master tidak diklaim. Assignment Product Brand pada Stall hanya diklaim sebagai implementasi setelah keterlibatan mahasiswa dikonfirmasi.

### Contoh Paragraf

> Product Brand merupakan data master yang menghubungkan jenis produk dengan berbagai proses bisnis lain, seperti penentuan dosis, perhitungan potensi, pencatatan penjualan, dan pendataan produk pada Stall. Hasil analisis menunjukkan bahwa perubahan yang berkaitan dengan Product Brand pada riwayat pengembangan berfokus pada pengelolaan relasinya dengan Stall. Selama magang, penulis memetakan perbedaan antara pengelolaan master Product Brand dan proses assignment brand pada Stall agar alur data kedua fungsi tersebut dapat dijelaskan secara terpisah.

## 3.4 Commodity Type

### Cara Menulis di Laporan

Jelaskan Commodity Type sebagai data master komoditas yang memiliki relasi dengan Land Type. Uraikan pemakaiannya pada Province Commodity, Regency Commodity, dan Product Dosage.

### Penempatan

- **Implementasi Sistem:** Ya. Jelaskan CRUD, pencarian, dan filter berdasarkan Land Type.
- **Analisis Sistem:** Ya. Jelaskan posisi Commodity Type sebagai penghubung data lahan, wilayah, dan produk.
- **Kontribusi Mahasiswa:** Batasi pada observasi struktur, relasi, validasi, dan dokumentasi.

### Contoh Paragraf

> Modul Commodity Type berfungsi sebagai data master komoditas yang dikelompokkan berdasarkan jenis lahan. Data tersebut menjadi referensi bagi pencatatan komoditas pada tingkat provinsi dan kabupaten serta digunakan dalam penentuan dosis produk. Penulis melakukan analisis terhadap hubungan antartabel dan alur pemilihan Land Type untuk memahami peran Commodity Type dalam menjaga konsistensi data lintas modul.

## 3.5 Province Commodity

### Cara Menulis di Laporan

Jelaskan bahwa Province Commodity menyajikan komoditas berdasarkan provinsi, jenis komoditas, luas, dan tahun. Gunakan istilah **fitur penyajian data/read-only**, bukan CRUD penuh.

### Penempatan

- **Implementasi Sistem:** Ya, sebagai modul pembacaan data.
- **Analisis Sistem:** Ya. Jelaskan join Province-Commodity Type, filter, pagination, dan belum aktifnya mutation.
- **Kontribusi Mahasiswa:** Batasi pada observasi, identifikasi status read-only, dan dokumentasi.

### Contoh Paragraf

> Province Commodity digunakan untuk menyajikan data komoditas pada tingkat provinsi. Informasi yang ditampilkan diperoleh melalui relasi antara provinsi dan jenis komoditas, disertai data luas serta tahun. Berdasarkan hasil analisis, fungsi backend yang aktif berfokus pada pengambilan, pencarian, dan penyaringan data, sedangkan operasi penambahan, perubahan, dan penghapusan belum diaktifkan pada router. Penulis mendokumentasikan kondisi tersebut sebagai dasar untuk menggambarkan tingkat kesiapan modul secara objektif.

## 3.6 Regency Commodity

### Cara Menulis di Laporan

Jelaskan Regency Commodity sebagai pengelolaan data komoditas pada tingkat kabupaten/kota. Uraikan relasi ke Regency dan Commodity Type serta operasi CRUD yang tersedia.

### Penempatan

- **Implementasi Sistem:** Ya. Jelaskan CRUD, query join, search, dan filter.
- **Analisis Sistem:** Ya. Bandingkan tingkat kesiapan dengan Province Commodity yang masih read-only.
- **Kontribusi Mahasiswa:** Batasi pada analisis perbandingan, alur data, dan dokumentasi.

### Contoh Paragraf

> Berbeda dengan Province Commodity yang berfokus pada pembacaan data, Regency Commodity telah menyediakan operasi pengelolaan data yang lebih lengkap. Modul ini menghubungkan kabupaten/kota dengan jenis komoditas dan menyimpan informasi luas serta tahun. Selama magang, penulis membandingkan implementasi kedua tingkat wilayah tersebut untuk mengidentifikasi perbedaan kesiapan fitur dan kebutuhan pengembangan selanjutnya.

## 3.7 Province Potential

### Cara Menulis di Laporan

Jelaskan Province Potential sebagai penyajian nilai potensi brand produk pada suatu provinsi. Sebutkan data nilai potensi, deskripsi, tahun, Province, dan Product Brand. Jangan menulisnya sebagai CRUD penuh.

### Penempatan

- **Implementasi Sistem:** Ya, sebagai fitur pembacaan/filter data.
- **Analisis Sistem:** Ya. Jelaskan relasi Province-Product Brand dan belum aktifnya create/update/delete.
- **Kontribusi Mahasiswa:** Batasi pada observasi, analisis status modul, dan dokumentasi.

### Contoh Paragraf

> Province Potential menyajikan informasi potensi suatu brand produk pada tingkat provinsi. Backend menggabungkan data provinsi dan Product Brand serta menyediakan filter berdasarkan wilayah, produk, dan tahun. Hasil observasi menunjukkan bahwa fungsi aktif masih berfokus pada penyajian data. Penulis menganalisis struktur tersebut untuk memahami kebutuhan data potensi dan mendokumentasikan peluang pengembangan operasi pengelolaan pada tahap berikutnya.

## 3.8 Sales Realization

### Cara Menulis di Laporan

Jelaskan Sales Realization sebagai pencatatan realisasi dan RKAP harian, bulanan, year-to-date, serta tahunan per Product Brand. Uraikan filter, pagination, CRUD, dan relasi database.

Pilihan jumlah baris yang terdapat pada perubahan lokal boleh dibahas sebagai usulan/objek observasi, bukan kontribusi yang sudah selesai.

### Penempatan

- **Implementasi Sistem:** Ya. Jelaskan CRUD dan metrik realisasi/RKAP.
- **Analisis Sistem:** Ya. Jelaskan kebutuhan pagination dan indikasi perbedaan nama field migration-schema.
- **Kontribusi Mahasiswa:** Batasi pada analisis alur penjualan dan dokumentasi. Jangan mengklaim page-size selector sebagai perbaikan mahasiswa.

### Contoh Paragraf

> Modul Sales Realization digunakan untuk menyimpan dan menampilkan capaian penjualan berdasarkan Product Brand. Informasi yang dikelola mencakup realisasi harian, bulanan, year-to-date, RKAP, dan pembanding tahun sebelumnya. Penulis menelusuri alur data dari form hingga tabel `sales_realizations` serta mengidentifikasi perlunya verifikasi konsistensi penamaan field antara schema dan migration. Analisis ini digunakan untuk menyusun rekomendasi pemeliharaan database tanpa menyatakan bahwa perubahan telah diterapkan.

## 3.9 Daily Sales

### Cara Menulis di Laporan

Jelaskan Daily Sales sebagai pencatatan transaksi atau rekap penjualan harian yang memuat tanggal, bulan, tahun, Product Brand, provinsi, kuantitas, pendapatan, target, catatan, dan realisasi.

### Penempatan

- **Implementasi Sistem:** Ya. Jelaskan CRUD, Product Brand join, search, dan pagination.
- **Analisis Sistem:** Ya. Jelaskan `province_id` yang belum menjadi foreign key dan indikasi perbedaan migration-schema.
- **Kontribusi Mahasiswa:** Batasi pada observasi schema, alur CRUD, identifikasi relasi, dan dokumentasi.

### Contoh Paragraf

> Daily Sales digunakan untuk mengelola data penjualan harian yang mencakup kuantitas, pendapatan, target, dan realisasi berdasarkan Product Brand. Berdasarkan hasil analisis struktur database, field `province_id` telah tersedia untuk menyimpan konteks wilayah, tetapi relasi foreign key belum didefinisikan pada schema yang diamati. Penulis mendokumentasikan kondisi tersebut sebagai pertimbangan untuk memperkuat integritas referensial pada pengembangan selanjutnya.

## 3.10 Stall

### Cara Menulis di Laporan

Jelaskan Stall sebagai modul pengelolaan kios yang memuat nama, alamat, provinsi, kabupaten, koordinat, pemilik, nomor telepon, kriteria, dan tahun. Uraikan relasi many-to-many dengan Product Brand serta alur assignment brand.

Stall merupakan modul dengan jejak perubahan paling jelas. Namun, narasi kontribusi implementasi tetap bergantung pada konfirmasi bahwa author Git adalah mahasiswa.

### Penempatan

- **Implementasi Sistem:** Ya. Jelaskan CRUD, join wilayah, form, dan assignment Product Brand.
- **Analisis Sistem:** Ya. Jelaskan relasi, coupling, validasi, dan peluang pemisahan tanggung jawab.
- **Kontribusi Mahasiswa:** Kondisional. Sebelum verifikasi, tulis sebagai pengalaman analisis. Setelah verifikasi, boleh ditulis sebagai pengembangan/pelengkapan modul.

### Contoh Paragraf Fakta Sistem

> Modul Stall menyediakan fungsi pengelolaan data kios beserta informasi lokasi, pemilik, kontak, koordinat, dan kriteria. Setiap Stall dapat terhubung dengan lebih dari satu Product Brand melalui tabel `stall_product_brands`. Sistem menyediakan form pengelolaan data dan antarmuka untuk menentukan brand yang tersedia pada masing-masing Stall.

### Contoh Paragraf Pengalaman Sebelum Verifikasi Kontribusi

> Selama kegiatan magang, penulis mempelajari alur pengelolaan Stall mulai dari validasi form, pemanggilan procedure oRPC, hingga penyimpanan relasi Product Brand. Penulis juga mendokumentasikan hubungan antarentitas dan mengidentifikasi bahwa kompleksitas modul dapat dikurangi melalui pemisahan komponen serta use case yang lebih terstruktur.

### Contoh Paragraf Setelah Kontribusi Terverifikasi

> Dalam pengembangan modul Stall, penulis melengkapi operasi create, update, dan delete, menyempurnakan form pengelolaan kios, serta mengintegrasikan procedure ke dalam router oRPC. Penulis juga mengembangkan fungsi assignment Product Brand agar admin dapat menentukan produk yang tersedia pada setiap Stall. Implementasi tersebut didokumentasikan melalui commit `7a38bb7` dan divalidasi menggunakan **[HASIL PENGUJIAN PERLU DIISI]**.

# 4. NARASI AMAN UNTUK SIDANG

## 4.1 Ringkasan Pekerjaan

Narasi utama sebelum atribusi commit diverifikasi:

> Fokus kegiatan magang saya adalah mempelajari, menganalisis, dan mendokumentasikan arsitektur serta modul bisnis pada aplikasi Satu Peta Pasar. Saya menelusuri alur data dari antarmuka, procedure oRPC, validasi Zod, Drizzle ORM, hingga PostgreSQL. Saya juga memetakan status setiap modul, relasi database, mekanisme authentication, dan beberapa area yang dapat ditingkatkan. Untuk fitur yang telah tersedia sejak baseline repository, saya membahasnya sebagai objek analisis dan tidak mengklaim sebagai implementasi pribadi.

Narasi setelah kontribusi Stall terverifikasi:

> Selain melakukan analisis dan dokumentasi sistem, saya terlibat dalam pelengkapan modul Stall dan pengelolaan Product Brand pada Stall. Pekerjaan tersebut meliputi operasi create, update, delete, form, integrasi router oRPC, serta assignment brand. Modul bisnis lain saya pelajari dan analisis untuk memahami relasi data serta kesiapan fiturnya, bukan saya klaim sebagai pengembangan dari awal.

## 4.2 Jawaban Aman untuk Pertanyaan Penguji

### “Apakah Anda membuat seluruh sistem?”

> Tidak. Sistem telah memiliki baseline saat kegiatan magang dimulai. Fokus saya adalah memahami arsitektur, menganalisis modul, menyusun dokumentasi teknis, dan mengerjakan bagian yang memang dapat ditelusuri melalui bukti kegiatan. Karena itu, laporan membedakan implementasi sistem yang sudah tersedia dengan kontribusi saya.

### “Modul apa yang Anda pelajari?”

> Saya mempelajari Product Dosage, Product Brand, Commodity Type, Province Commodity, Regency Commodity, Province Potential, Sales Realization, Daily Sales, dan Stall. Analisis mencakup fungsi modul, alur API, validasi, relasi database, serta status operasinya.

### “Apa perbedaan Province Commodity dan Regency Commodity?”

> Province Commodity saat ini berfokus pada pembacaan dan penyaringan data, sedangkan Regency Commodity telah memiliki operasi CRUD yang lebih lengkap. Perbedaan ini saya catat sebagai bagian dari analisis kesiapan modul.

### “Apa kontribusi implementasi yang paling jelas?”

Sebelum identitas commit diverifikasi:

> Dari riwayat repository, perubahan paling jelas terdapat pada modul Stall dan assignment Product Brand. Dalam laporan, saya baru menempatkannya sebagai kontribusi pribadi setelah hubungan antara aktivitas saya dan bukti commit dikonfirmasi.

Setelah identitas commit diverifikasi:

> Kontribusi implementasi yang paling jelas adalah pelengkapan modul Stall dan assignment Product Brand, yang mencakup backend procedure, form, integrasi router, dan pengelolaan relasi data.

### “Apa temuan teknis utama?”

> Temuan utama meliputi perbedaan tingkat kesiapan antar modul, indikasi ketidaksinkronan schema dan migration pada data penjualan, field provinsi pada Daily Sales yang belum memiliki foreign key, serta perlunya validasi role pada lapisan API. Temuan tersebut saya sajikan sebagai hasil analisis dan rekomendasi, bukan sebagai perbaikan yang sudah diterapkan.

### “Mengapa rekomendasi tidak langsung diimplementasikan?”

> Ruang lingkup kegiatan difokuskan pada pemahaman, pemetaan, dan dokumentasi sistem. Beberapa rekomendasi memerlukan validasi kebutuhan bisnis, pemeriksaan database aktual, serta persetujuan tim sebelum diterapkan agar tidak menimbulkan perubahan perilaku yang tidak diinginkan.

### “Bagaimana Anda memastikan laporan tidak melebihkan kontribusi?”

> Saya memisahkan pembahasan menjadi fakta sistem, hasil analisis, dan pengalaman mahasiswa. Modul yang sudah tersedia pada baseline dijelaskan sebagai kondisi sistem. Klaim implementasi hanya digunakan apabila terdapat bukti aktivitas yang dapat ditelusuri.

# 5. NARASI YANG HARUS DIHINDARI

Jangan gunakan:

- “Saya membangun aplikasi Satu Peta Pasar dari awal.”
- “Saya membuat seluruh database dan semua tabel.”
- “Saya mengembangkan semua modul admin.”
- “Saya menyelesaikan Product Dosage.”
- “Saya membuat CRUD Product Brand.”
- “Saya mengembangkan Commodity Type, Province Commodity, dan Regency Commodity.”
- “Saya membuat Province Potential.”
- “Saya memperbaiki Sales Realization dan Daily Sales.”
- “Saya meningkatkan keamanan API.”
- “Saya memperbaiki seluruh migration database.”
- “Semua fitur telah selesai dan berjalan sempurna.”
- “Aplikasi terbukti meningkatkan penjualan perusahaan.”
- “Sistem aman dari seluruh serangan.”
- “Backend menggunakan Hono di `apps/server`.”
- “Province Commodity dan Province Potential memiliki CRUD lengkap.”
- “Regency Potential telah tersedia sebagai API aktif.”

Gunakan pengganti berikut:

| Hindari | Gunakan |
| --- | --- |
| “Saya membuat modul…” | “Saya mempelajari dan menganalisis modul…” |
| “Saya memperbaiki…” | “Saya mengidentifikasi area yang perlu disempurnakan…” |
| “Saya mengoptimalkan…” | “Saya menyusun rekomendasi pengembangan…” |
| “Fitur selesai…” | “Fitur telah tersedia pada sistem dengan status…” |
| “Database bermasalah…” | “Ditemukan area yang memerlukan verifikasi lebih lanjut…” |
| “Keamanan lemah…” | “Mekanisme authorization masih dapat diperkuat…” |

# 6. CONTOH PARAGRAF BERDASARKAN JENIS PEMBAHASAN

## 6.1 Contoh Fakta Sistem

> Satu Peta Pasar merupakan aplikasi full-stack yang menempatkan implementasi frontend dan backend pada workspace `apps/web`. Antarmuka dibangun menggunakan React dan TanStack Start, sedangkan pertukaran data menggunakan oRPC. Data aplikasi disimpan pada PostgreSQL dan diakses melalui Drizzle ORM. Struktur tersebut membentuk alur terintegrasi mulai dari komponen antarmuka hingga penyimpanan data.

## 6.2 Contoh Hasil Analisis

> Hasil analisis menunjukkan bahwa tingkat kesiapan modul belum sepenuhnya seragam. Regency Commodity telah menyediakan operasi CRUD, sedangkan Province Commodity masih berfokus pada pengambilan dan penyaringan data. Perbedaan tersebut menunjukkan bahwa pengembangan pada tingkat provinsi dan kabupaten dilakukan dengan prioritas yang berbeda. Pada tahap selanjutnya, kebutuhan operasi mutation pada Province Commodity perlu dikonfirmasi kepada pemilik proses bisnis.

## 6.3 Contoh Pengalaman Mahasiswa

> Selama kegiatan magang, penulis melakukan observasi terhadap struktur route, procedure API, schema domain, dan tabel database. Penulis kemudian menyusun pemetaan hubungan antarentitas serta mendokumentasikan status setiap modul. Kegiatan tersebut membantu penulis memahami penerapan arsitektur full-stack TypeScript dan pentingnya konsistensi kontrak data antara frontend, backend, dan database.

## 6.4 Contoh Kontribusi Implementasi Bersyarat

> Setelah ruang lingkup pekerjaan dan bukti perubahan dikonfirmasi, penulis terlibat dalam pelengkapan modul Stall. Pekerjaan meliputi pengelolaan data kios, penyempurnaan form, integrasi procedure pada router oRPC, dan assignment Product Brand. Hasil pekerjaan ditelusuri melalui commit terkait dan didukung oleh dokumentasi pengujian fitur.

Gunakan paragraf ini hanya setelah identitas author commit dan aktivitas mahasiswa telah dikonfirmasi.

## 6.5 Contoh Keterbatasan

> Pembahasan kontribusi implementasi dibatasi pada aktivitas yang dapat ditelusuri melalui dokumentasi kegiatan dan riwayat perubahan. Modul yang telah tersedia pada baseline repository diposisikan sebagai objek observasi dan analisis. Pendekatan ini digunakan agar laporan menggambarkan ruang lingkup kegiatan magang secara proporsional.

## 6.6 Contoh Temuan Database

> Pada tabel `daily_sales`, field `province_id` telah tersedia untuk menyimpan konteks wilayah, tetapi definisi foreign key belum ditemukan pada schema yang dianalisis. Kondisi ini tidak langsung menunjukkan kegagalan sistem, namun menjadi pertimbangan dalam menjaga integritas referensial. Penambahan constraint perlu didahului pemeriksaan data aktual dan konfirmasi kebutuhan bisnis.

## 6.7 Contoh Temuan Security

> Sistem telah menggunakan protected procedure untuk memastikan request berasal dari pengguna yang memiliki session. Pada sisi antarmuka, route admin juga memeriksa role pengguna. Meskipun demikian, validasi role pada lapisan API masih dapat diperkuat agar pembatasan akses diterapkan secara konsisten pada setiap jalur request.

## 6.8 Contoh Rekomendasi

> Berdasarkan hasil analisis, pengembangan berikutnya dapat difokuskan pada standardisasi bentuk response, konsistensi pagination, sinkronisasi schema dengan migration, dan penambahan pengujian authorization. Rekomendasi tersebut perlu diprioritaskan berdasarkan risiko serta kebutuhan bisnis agar perubahan dapat diterapkan secara bertahap.

## 6.9 Contoh Pengantar Screenshot

> Gambar 4.x menampilkan halaman pengelolaan Product Dosage yang digunakan untuk melihat dan mengelola hubungan dosis antara komoditas dan brand produk. Tampilan tersebut memperlihatkan data utama yang digunakan oleh admin serta menyediakan akses menuju operasi pengelolaan data.

Hindari paragraf yang hanya berbunyi “berikut adalah screenshot”. Jelaskan fungsi gambar dan hubungannya dengan pembahasan.

## 6.10 Contoh Pengantar Diagram

> Gambar 3.x menggambarkan alur request dari antarmuka pengguna menuju database. Request yang dipicu dari komponen React dikelola oleh TanStack Query, diteruskan melalui procedure oRPC, divalidasi menggunakan Zod, kemudian diproses oleh Drizzle ORM sebelum berinteraksi dengan PostgreSQL.

## 6.11 Contoh Hasil Pengujian

> Pengujian dilakukan dengan memasukkan **[SKENARIO INPUT]** pada modul **[NAMA MODUL]**. Sistem menghasilkan **[HASIL AKTUAL]**, sesuai dengan hasil yang diharapkan berupa **[HASIL YANG DIHARAPKAN]**. Bukti pengujian ditampilkan pada Gambar 4.x.

Jangan mengisi hasil pengujian sebelum command atau skenario benar-benar dijalankan.

## 6.12 Contoh Kesimpulan BAB

> Berdasarkan pembahasan pada bab ini, Satu Peta Pasar telah menyediakan modul untuk mengelola data wilayah, komoditas, produk, potensi, penjualan, dan Stall. Hasil analisis memperlihatkan bahwa setiap modul memiliki tingkat kesiapan yang berbeda. Kegiatan magang membantu penulis memahami alur integrasi antarlapisan serta menyusun dokumentasi dan rekomendasi yang dapat digunakan dalam pengembangan sistem selanjutnya.

# 7. STRUKTUR NARASI BAB IV YANG DISARANKAN

## 7.1 Hasil Implementasi Sistem

Gunakan struktur:

1. tujuan modul;
2. tampilan sistem;
3. data yang dikelola;
4. alur backend dan database;
5. status fitur;
6. screenshot hasil.

Kalimat pembuka:

> Bagian ini menjelaskan fungsi yang tersedia pada sistem berdasarkan hasil observasi aplikasi dan source code. Pembahasan berfokus pada perilaku sistem dan tidak dimaksudkan sebagai klaim bahwa seluruh fungsi dikembangkan oleh penulis.

## 7.2 Hasil Analisis Sistem

Gunakan struktur:

1. metode observasi;
2. temuan per modul;
3. perbandingan status fitur;
4. temuan database/API/security;
5. dampak teknis;
6. rekomendasi.

Kalimat pembuka:

> Setelah memahami fungsi utama aplikasi, penulis melakukan analisis terhadap struktur backend, relasi database, dan kesiapan setiap modul. Analisis dilakukan untuk memperoleh gambaran mengenai konsistensi implementasi serta area yang masih dapat dikembangkan.

## 7.3 Kontribusi Mahasiswa

Gunakan struktur:

1. ruang lingkup aktivitas;
2. metode yang dilakukan;
3. artefak yang dihasilkan;
4. implementasi yang memiliki bukti;
5. hasil pengujian;
6. pembelajaran.

Kalimat pembuka sebelum verifikasi kontribusi kode:

> Kontribusi penulis selama kegiatan magang berfokus pada observasi, analisis, pemetaan alur, dan penyusunan dokumentasi teknis. Pembahasan implementasi kode dibatasi pada aktivitas yang dapat dihubungkan dengan bukti perubahan dan konfirmasi kegiatan.

Kalimat pembuka setelah kontribusi Stall terverifikasi:

> Selain melakukan analisis dan dokumentasi, penulis berkontribusi pada pelengkapan modul Stall dan pengelolaan relasi Product Brand. Kontribusi tersebut dijelaskan berdasarkan aktivitas, file yang berubah, alur implementasi, dan hasil pengujian.

# 8. CHECKLIST PENULISAN

Sebelum menyelesaikan naskah, pastikan:

- [ ] Setiap paragraf jelas termasuk Fakta Sistem, Hasil Analisis, atau Pengalaman Mahasiswa.
- [ ] Fitur baseline tidak menggunakan subjek “penulis mengembangkan”.
- [ ] Product Dosage dibahas sebagai implementasi dan analisis, bukan kontribusi coding.
- [ ] CRUD Product Brand dipisahkan dari assignment Product Brand pada Stall.
- [ ] Province Commodity dan Province Potential disebut read-only.
- [ ] Regency Commodity tidak diklaim sebagai hasil pengembangan mahasiswa.
- [ ] Sales Realization dan Daily Sales tidak diklaim diperbaiki tanpa bukti final.
- [ ] Stall hanya menjadi kontribusi implementasi setelah keterlibatan mahasiswa dikonfirmasi.
- [ ] Temuan teknis ditulis dengan bahasa objektif dan tidak menyalahkan pihak tertentu.
- [ ] Rekomendasi tidak ditulis sebagai fitur yang sudah diterapkan.
- [ ] Hasil test hanya ditulis setelah pengujian benar-benar dilakukan.
- [ ] Screenshot disertai penjelasan, nomor gambar, dan sumber.
- [ ] Secret, token, cookie, email pribadi, serta data pengguna telah disensor.
- [ ] Narasi sidang konsisten dengan isi laporan dan bukti pendukung.
- [ ] Kesimpulan tidak memperkenalkan klaim baru.
