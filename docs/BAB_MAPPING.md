# Pemetaan BAB Laporan Magang

Dokumen ini memetakan isi laporan magang berdasarkan `MAGANG_REPORT_CONTEXT.md` dan `INTERNSHIP_CONTRIBUTION_CONTEXT.md`. Pemetaan menggunakan fakta yang tersedia pada source code, dokumentasi, dan riwayat Git.

> Aturan utama: keberadaan fitur pada repository bukan bukti bahwa fitur tersebut dibuat mahasiswa. Fitur yang atribusinya belum dapat dibuktikan harus dibahas sebagai **implementasi sistem** atau **analisis sistem**, bukan sebagai **kontribusi mahasiswa**.

# ATURAN KLASIFIKASI BUKTI

| Kategori | Definisi | Cara menulis dalam laporan |
| --- | --- | --- |
| Implementasi sistem | Fitur, tabel, route, API, atau konfigurasi yang terbukti ada pada repository. | “Sistem memiliki…”, “Pada repository ditemukan…”, atau “Modul menyediakan…”. Jangan menggunakan “mahasiswa membuat…”. |
| Analisis sistem | Hasil pemeriksaan struktur, relasi, status CRUD, kekurangan, risiko, dan rekomendasi yang tercatat dalam dokumentasi. | “Berdasarkan analisis…”, “Ditemukan bahwa…”, atau “Hasil audit menunjukkan…”. |
| Kontribusi repository | Perubahan yang memiliki commit/diff dan author Git. | Sebut commit, tanggal, file, dan author Git. Jangan menyebut author sebagai mahasiswa sebelum identitas terkonfirmasi. |
| Kontribusi mahasiswa | Pekerjaan yang terhubung ke identitas mahasiswa melalui commit, logbook, tiket, PR, atau konfirmasi pembimbing. | Saat ini sebagian besar **[BELUM DAPAT DIBUKTIKAN]**. Klaim harus menunggu verifikasi identitas author Git. |
| Kandidat perubahan | Perubahan lokal yang belum di-commit. | Boleh menjadi objek analisis, tetapi bukan hasil kerja mahasiswa atau fitur selesai. |

# RINGKASAN PEMETAAN BAB

| BAB | Fokus | Target halaman |
| --- | --- | ---: |
| BAB I | Pendahuluan dan batasan laporan | 6-8 |
| BAB II | Profil perusahaan, profil sistem, dan landasan teori | 10-14 |
| BAB III | Analisis kebutuhan, arsitektur, database, API, dan metode kerja | 22-28 |
| BAB IV | Hasil implementasi sistem, hasil analisis, dan kontribusi mahasiswa yang dipisahkan secara eksplisit | 22-28 |
| BAB V | Kesimpulan dan saran berbasis temuan | 3-4 |
| **Total BAB I-V** |  | **63-82** |

Dengan bagian awal, daftar pustaka, dan lampiran, target keseluruhan tetap **70-100 halaman**.

# BAB I — PENDAHULUAN

## Struktur yang Disarankan

1. 1.1 Latar Belakang
2. 1.2 Identifikasi Masalah
3. 1.3 Rumusan Masalah
4. 1.4 Tujuan Magang dan Tujuan Laporan
5. 1.5 Manfaat
6. 1.6 Batasan Masalah
7. 1.7 Metode Pengumpulan Data
8. 1.8 Sistematika Penulisan

## Isi yang Boleh Ditulis

- Kebutuhan pengelolaan data wilayah, lahan, komoditas, produk, potensi, kios, dan penjualan secara terpusat.
- Pentingnya visualisasi geografis untuk membaca persebaran dan potensi pasar.
- Kebutuhan API type-safe, validasi input, authentication, dan pengelolaan data melalui panel admin.
- Tujuan laporan untuk mendokumentasikan arsitektur, database, API, modul bisnis, hasil analisis, dan bukti kontribusi yang tersedia.
- Rumusan masalah tentang struktur full-stack, relasi database, integrasi oRPC, authentication, status modul, dan temuan kualitas sistem.
- Batasan bahwa analisis menggunakan repository, dokumentasi, dan 15 commit pada branch yang diperiksa.
- Batasan bahwa `IMPLEMENTATION_PROGRESS.md`, logbook, tiket, dan identitas mahasiswa-author Git belum ditemukan atau belum diverifikasi.
- Metode berupa studi dokumentasi, observasi source code, pemeriksaan schema/migration, dan analisis riwayat Git.
- Nama domain sistem “Satu Peta Pasar”, dengan catatan nama resmi perusahaan **[PERLU VERIFIKASI]**.

## Isi yang Harus Dihindari

- Klaim bahwa mahasiswa membangun seluruh aplikasi Satu Peta Pasar.
- Klaim bahwa semua modul dibuat selama periode magang.
- Klaim bahwa Product Dosage, Product Brand, Commodity Type, Province Commodity, Regency Commodity, Province Potential, Sales Realization, atau Daily Sales dikembangkan mahasiswa.
- Narasi masalah bisnis perusahaan yang tidak tercantum pada dokumentasi atau tidak dikonfirmasi narasumber.
- Angka manfaat, efisiensi, peningkatan penjualan, atau penghematan waktu tanpa data pengukuran.
- Nama perusahaan, departemen, periode, pembimbing, NBI, dan judul final sebelum diverifikasi.
- Pernyataan bahwa sistem menggunakan backend Hono pada `apps/server`; kondisi implementasi aktif berada di `apps/web`.

## Bukti yang Tersedia

- Deskripsi sistem, tujuan, masalah, pengguna, dan ruang lingkup pada `MAGANG_REPORT_CONTEXT.md`.
- Source code aktif pada `apps/web`.
- Daftar modul bisnis dan status implementasi.
- Dokumentasi arsitektur, database, API, authentication, dan deployment.
- Riwayat Git sebanyak 15 commit.
- Temuan bahwa identitas author Git belum terhubung ke profil mahasiswa.

## Screenshot yang Diperlukan

| No | Screenshot | Kegunaan |
| ---: | --- | --- |
| 1 | Halaman utama Satu Peta Pasar | Memperkenalkan objek magang. |
| 2 | Halaman peta | Menunjukkan konteks pemetaan pasar. |
| 3 | Dashboard admin | Menunjukkan ruang lingkup pengelolaan sistem. |
| 4 | Struktur root repository | Menunjukkan sumber observasi teknis. |

Screenshot pada BAB I bersifat opsional jika pedoman kampus mengharuskan pendahuluan tanpa gambar teknis.

## Diagram yang Diperlukan

- Diagram konteks sistem: pengunjung, guest, viewer, admin, dan aplikasi.
- Diagram ruang lingkup masalah: data wilayah, komoditas, produk, potensi, penjualan, serta stall.

## Target Halaman

**6-8 halaman.** Fokus pada masalah, tujuan, batasan, dan metode; hindari detail implementasi yang menjadi bagian BAB III/IV.

# BAB II — PROFIL DAN LANDASAN TEORI

## Struktur yang Disarankan

1. 2.1 Profil Perusahaan
2. 2.2 Struktur Organisasi dan Departemen
3. 2.3 Gambaran Umum Satu Peta Pasar
4. 2.4 Proses Bisnis Sistem
5. 2.5 Landasan Teori Frontend
6. 2.6 Landasan Teori Backend dan API
7. 2.7 Landasan Teori Database
8. 2.8 Landasan Teori Authentication dan Authorization
9. 2.9 Landasan Teori Pemetaan Digital
10. 2.10 Tools Build, Testing, dan Deployment

## Isi yang Boleh Ditulis

### Profil Perusahaan

- Nama, bidang usaha, visi, misi, struktur organisasi, lokasi, dan departemen hanya setelah memperoleh data resmi perusahaan.
- Posisi mahasiswa dalam organisasi hanya berdasarkan surat magang, logbook, atau konfirmasi pembimbing.
- Untuk data yang belum ada, gunakan **[PERLU VERIFIKASI]** dan jangan mengisi dengan asumsi.

### Gambaran Sistem

- Satu Peta Pasar sebagai aplikasi web untuk pengelolaan dan visualisasi data pasar berbasis wilayah.
- Pengguna yang ditemukan: admin, viewer, guest, dan pengunjung umum, dengan keterbatasan role viewer yang belum jelas.
- Modul wilayah, lahan, komoditas, produk, potensi, penjualan, stall, user, authentication, dan map.
- Status implementasi setiap modul: CRUD aktif, parsial, read-only, database-only, atau demo.

### Landasan Teori

- React 19, TanStack Start, TanStack Router, TanStack Query, TanStack Form, dan React Hook Form.
- TypeScript, Zod, oRPC, konsep RPC type-safe, dan OpenAPI handler.
- PostgreSQL, Drizzle ORM, migration, primary key, foreign key, dan relasi database.
- Better Auth, session-based authentication, route guard, role, authentication, dan authorization.
- Tailwind CSS, Radix/shadcn-style components, aksesibilitas antarmuka, dan validasi form.
- Leaflet, React Leaflet, GeoJSON, serta konsep visualisasi peta.
- Bun, Vite, Turborepo, Biome/Ultracite, Vitest, Docker, Netlify, Vercel, dan GitHub Actions sesuai fungsi yang terbukti dalam konfigurasi/dokumentasi.

## Isi yang Harus Dihindari

- Profil perusahaan hasil tebakan atau salinan dari pihak lain tanpa sumber resmi.
- Teori teknologi yang tidak dipakai pada repository.
- Menyatakan Recharts aktif pada fitur tertentu sebelum penggunaan aktual diverifikasi.
- Menyatakan Supabase pasti menjadi database production; yang tersedia hanya indikasi workflow/configuration.
- Menggambarkan `apps/server` sebagai backend aktif.
- Menyebut fitur repository sebagai hasil kerja mahasiswa.
- Menjelaskan rekomendasi arsitektur sebagai kondisi yang sudah diimplementasikan.

## Bukti yang Tersedia

- Daftar technology stack dan fungsi masing-masing.
- Struktur folder dan konfigurasi aplikasi.
- Schema PostgreSQL dan Drizzle ORM.
- Route/API untuk oRPC, OpenAPI, dan Better Auth.
- Data GeoJSON pada `public/data` dan komponen Leaflet.
- Dokumentasi pengguna serta role.
- Profil perusahaan dan struktur organisasi: **[PERLU VERIFIKASI]**.

## Screenshot yang Diperlukan

| No | Screenshot | Kegunaan |
| ---: | --- | --- |
| 1 | Logo/perusahaan dari sumber resmi | Profil perusahaan; **[PERLU VERIFIKASI]**. |
| 2 | Struktur organisasi resmi | Posisi departemen; **[PERLU VERIFIKASI]**. |
| 3 | Halaman publik sistem | Gambaran umum sistem. |
| 4 | Sidebar menu admin | Ruang lingkup modul. |
| 5 | Peta Indonesia pada aplikasi | Landasan pemetaan digital. |
| 6 | Struktur dependency atau `package.json` | Bukti teknologi yang digunakan. |

## Diagram yang Diperlukan

- Struktur organisasi perusahaan **[PERLU VERIFIKASI]**.
- Diagram proses bisnis tingkat tinggi.
- Diagram pengelompokan technology stack.
- Diagram aktor dan hak akses tingkat konsep.

## Target Halaman

**10-14 halaman.** Alokasikan 3-5 halaman untuk profil perusahaan setelah datanya tersedia dan 7-9 halaman untuk sistem serta landasan teori.

# BAB III — ANALISIS DAN PERANCANGAN SISTEM

## Struktur yang Disarankan

1. 3.1 Metode Analisis Repository
2. 3.2 Analisis Kebutuhan Fungsional dan Nonfungsional
3. 3.3 Arsitektur Full-Stack Monolith
4. 3.4 Struktur Project dan Pembagian Layer
5. 3.5 Perancangan Database
6. 3.6 Perancangan API oRPC
7. 3.7 Perancangan Authentication dan Authorization
8. 3.8 Analisis Modul Bisnis
9. 3.9 Perancangan Alur Query dan Mutation
10. 3.10 Perancangan Peta dan GeoJSON
11. 3.11 Build, Testing, dan Deployment
12. 3.12 Batasan dan Risiko Teknis

## Isi yang Boleh Ditulis

### Metode dan Kebutuhan

- Cara memeriksa dokumentasi, source code, route, schema, migration, dan Git history.
- Kebutuhan fungsional yang langsung tercermin pada modul repository.
- Kebutuhan nonfungsional: type safety, validasi, authentication, aksesibilitas, maintainability, dan konsistensi data.

### Arsitektur dan Struktur

- Aplikasi full-stack monolith pada `apps/web`.
- Frontend React/TanStack, server route TanStack Start, oRPC, Better Auth, Drizzle, dan PostgreSQL.
- Folder route-colocated `-app`, `-domain`, dan `-components`.
- Perbedaan antara kondisi aktual dan instruksi template `AGENTS.md` yang menyebut `apps/server`.

### Database

- Seluruh 22 tabel: fungsi, PK, FK, dan relasi.
- Domain auth, wilayah/lahan/komoditas, produk/potensi, stall, dan sales.
- `todo` sebagai fitur demo/template, bukan domain bisnis utama.
- Temuan missing FK `daily_sales.province_id`, unique constraint yang belum terlihat, dan ketidaksinkronan schema-migration.
- Kondisi database production tetap **[PERLU VERIFIKASI]**.

### API, Auth, dan Modul

- Endpoint `/api/rpc/$`, `/api/$`, dan `/api/auth/$`.
- Public/protected procedure, context session/DB, Zod validation, query, mutation, dan cache invalidation.
- Better Auth, email/password, user-account-session, cookie, dan route guard admin.
- Gap authorization: protected API memeriksa session, sedangkan role admin paling jelas diperiksa route UI.
- Analisis setiap modul dan status CRUD/read-only/database-only.
- Semua modul boleh dibahas sebagai desain/implementasi sistem, tanpa atribusi mahasiswa.

### Build dan Deployment

- Bun, Vite, Turborepo, Biome/Ultracite, Vitest, Docker, Netlify/Vercel, dan workflow Supabase berdasarkan artefak repository.
- Riwayat perubahan target deployment dapat dijelaskan sebagai evolusi konfigurasi repository.

## Isi yang Harus Dihindari

- Klaim bahwa arsitektur dibuat dari nol oleh mahasiswa.
- Klaim bahwa seluruh schema dan migration dirancang mahasiswa.
- Klaim bahwa seluruh endpoint atau modul dikembangkan mahasiswa.
- Menyatakan rekomendasi seperti `adminProcedure`, split router, FK tambahan, atau sinkronisasi migration sudah diterapkan.
- Menggambarkan module Province Commodity dan Province Potential sebagai CRUD penuh; keduanya terdokumentasi read-only.
- Menggambarkan Regency Potential sebagai endpoint aktif; statusnya database-only/belum aktif.
- Menyatakan role viewer telah memiliki hak akses final.
- Menganggap perubahan lokal Product Dosage dan Sales Realization sebagai rancangan final yang diterima.

## Bukti yang Tersedia

- Source tree dan file konfigurasi.
- Diagram ASCII arsitektur pada `MAGANG_REPORT_CONTEXT.md`.
- Analisis 22 tabel dan relasinya.
- Matriks modul dan status backend.
- Dokumentasi alur authentication dan request.
- Audit architecture dan Stall pada `ARCH.md` yang dirangkum dalam contribution context.
- Riwayat Git schema/migration hanya pada snapshot awal.
- Temuan integritas dan security dari dokumentasi.

## Screenshot yang Diperlukan

| No | Screenshot | Subbab |
| ---: | --- | --- |
| 1 | Struktur root repository | 3.3/3.4 |
| 2 | Struktur `apps/web` | 3.3/3.4 |
| 3 | Struktur `src/routes` | 3.4 |
| 4 | Struktur `src/lib` | 3.4 |
| 5 | Struktur folder modul `-app/-domain/-components` | 3.4 |
| 6 | Struktur schema Drizzle | 3.5 |
| 7 | Struktur migration | 3.5 |
| 8 | Potongan schema auth | 3.5/3.7 |
| 9 | Potongan schema domain pasar | 3.5 |
| 10 | Struktur oRPC router/context | 3.6 |
| 11 | Route handler RPC/OpenAPI/Auth | 3.6/3.7 |
| 12 | Route guard admin | 3.7 |
| 13 | Struktur module readiness | 3.8 |
| 14 | Data GeoJSON dan struktur map | 3.10 |
| 15 | Konfigurasi Docker/Vite/deployment | 3.11 |

Screenshot kode harus menampilkan bagian secukupnya dan tidak mengekspos secret.

## Diagram yang Diperlukan

1. Diagram arsitektur high-level.
2. Diagram deployment.
3. Diagram struktur/layer project.
4. ERD lengkap 22 tabel.
5. ERD auth.
6. ERD wilayah-lahan-komoditas.
7. ERD produk-potensi.
8. ERD stall-product brand.
9. ERD sales.
10. Sequence diagram login.
11. Sequence diagram route guard admin.
12. Sequence diagram query TanStack Query-oRPC-Drizzle.
13. Sequence diagram mutation dan invalidasi cache.
14. Diagram alur validasi UI-Zod-database.
15. Activity diagram CRUD data master.
16. Activity diagram pencatatan sales.
17. Activity diagram assignment brand ke Stall.
18. Data Flow Diagram level 0 dan level 1.

## Target Halaman

**22-28 halaman.** Detail seluruh kolom tabel dan daftar endpoint lengkap dapat dipindahkan ke lampiran agar BAB III tetap terarah.

# BAB IV — HASIL DAN PEMBAHASAN

BAB IV wajib memisahkan tiga kategori berikut. Judul subbab harus tetap eksplisit agar fitur repository tidak terlihat sebagai kontribusi mahasiswa.

# 4.1 HASIL IMPLEMENTASI SISTEM

Bagian ini menjelaskan apa yang terbukti tersedia dan dapat diamati pada sistem. Bagian ini **bukan daftar kontribusi mahasiswa**.

## Isi yang Boleh Ditulis

- Halaman publik, login, signup, dashboard admin, sidebar, dan peta.
- Authentication email/password, session, role, dan route guard berdasarkan perilaku/source code yang dapat diamati.
- CRUD aktif: Province, Regency, Land Type, Province Land, Commodity Type, Regency Commodity, Product Type, Product Brand, Product Dosage, Sales Realization, Daily Sales, dan Stall.
- Modul read-only: Regency Land, Province Commodity, dan Province Potential.
- Regency Potential sebagai tabel database dengan endpoint aktif yang belum ditemukan.
- User Management: get, detail, update, dan delete; create mandiri belum jelas.
- Stall Product Brand sebagai relasi many-to-many dan fitur assignment.
- Peta Leaflet/GeoJSON serta ketergantungannya pada data.
- Hasil build, lint, test, atau deployment hanya setelah command benar-benar dijalankan dan hasilnya disimpan.
- Gunakan kalimat “sistem menyediakan” atau “repository menunjukkan”, bukan “mahasiswa mengembangkan”.

## Isi yang Harus Dihindari

- Memasukkan daftar modul di atas sebagai kontribusi mahasiswa.
- Menulis “mahasiswa berhasil membuat CRUD” hanya karena CRUD ada pada snapshot awal.
- Menyatakan semua module complete; beberapa read-only, partial, database-only, atau demo.
- Menyatakan hasil pengujian berhasil tanpa output aktual.
- Menyebut perubahan lokal Product Dosage atau Sales Realization sebagai fitur final.
- Menampilkan data user, token, cookie, password, atau environment secret tanpa sensor.

## Bukti yang Tersedia

- Route, procedure, form, schema domain, dan schema database.
- Snapshot awal `3959ce9` yang sudah berisi seluruh modul bisnis.
- Module readiness dan analisis status CRUD.
- Halaman aplikasi dan konfigurasi runtime.
- Bukti build/test aktual: **[PERLU VERIFIKASI]**.

## Screenshot yang Diperlukan

| Kelompok | Screenshot minimum |
| --- | --- |
| Authentication | Login, signup, gagal login, login berhasil, guest ditolak, admin diterima. |
| Dashboard | Dashboard, sidebar, dan profil/header user. |
| Region | List/create/edit/delete Province serta list/form Regency. |
| Land | Land Type, Province Land, dan Regency Land read-only. |
| Commodity | Commodity Type, Province Commodity read-only, dan Regency Commodity. |
| Product | Product Type, Product Brand, dan Product Dosage beserta form. |
| Potential | Province Potential read-only. |
| Sales | Sales Realization dan Daily Sales beserta form. |
| Stall | List, form, delete, dan assignment Product Brand. |
| User | Daftar user dan edit role. |
| Map | Peta, filter, layer, dan marker jika data tersedia. |
| Technical result | Drizzle Studio, OpenAPI/API response, build, lint, dan test jika tersedia. |

Target **25-35 screenshot** utama di badan BAB IV; bukti tambahan dipindahkan ke lampiran.

## Diagram yang Diperlukan

- Diagram alur login hasil observasi.
- Diagram alur CRUD dari UI sampai database.
- Diagram relasi Stall-Product Brand.
- Diagram alur visualisasi GeoJSON.
- Tabel/matriks status implementasi modul.

## Target Halaman

**10-12 halaman.** Fokus pada hasil yang terlihat dan status nyata setiap modul.

# 4.2 HASIL ANALISIS SISTEM

Semua fitur yang ditemukan pada repository tetapi tidak terbukti sebagai kontribusi mahasiswa ditempatkan di bagian ini ketika dibahas dari sisi pekerjaan magang.

## Isi yang Boleh Ditulis

### Analisis Modul

- Product Dosage: CRUD ada; terdapat perubahan lokal penambahan `year`, tetapi author dan status selesai belum terbukti.
- Product Brand: CRUD ada pada snapshot awal; commit berjudul Product Brand sebenarnya mengubah pengelolaan brand di domain Stall, bukan file CRUD Product Brand.
- Commodity Type: CRUD ada pada snapshot awal; tidak ada commit spesifik lanjutan.
- Province Commodity: read-only; create/update/delete belum aktif.
- Regency Commodity: CRUD ada pada snapshot awal; tidak ada commit spesifik lanjutan.
- Province Potential: read-only; create/update/delete belum aktif.
- Sales Realization: CRUD ada; terdapat perubahan lokal page-size selector yang belum di-commit.
- Daily Sales: CRUD ada; ditemukan missing FK provinsi dan potensi mismatch migration.
- Stall: implementasi dan analisis arsitektur paling lengkap; commit spesifik tersedia.

### Analisis Arsitektur, Database, dan Security

- Full-stack monolith di `apps/web`, bukan backend Hono terpisah.
- Kelebihan type safety TypeScript-oRPC-Drizzle-Zod.
- Gap authorization antara route guard admin dan protected API berbasis session.
- Potensi mismatch migration/schema Sales Realization dan Daily Sales.
- Missing FK `daily_sales.province_id` serta unique constraint yang belum terlihat.
- Coupling dan peluang refactor pada Stall.
- Kebutuhan standardisasi response, pagination, error handling, split router/schema, dan test.
- Semua poin perbaikan harus disebut “temuan” atau “rekomendasi”, bukan “sudah diperbaiki”.

## Isi yang Harus Dihindari

- Mengubah hasil analisis menjadi klaim implementasi.
- Menyatakan rekomendasi telah diterapkan.
- Menyatakan perubahan lokal sudah selesai, diuji, atau diterima.
- Menyebut ketidaksinkronan migration pasti terjadi di database production tanpa pemeriksaan database aktual.
- Menyatakan mahasiswa menemukan semua masalah tanpa bukti authorship dokumentasi/logbook.
- Memindahkan modul tanpa bukti kontribusi ke subbab Kontribusi Mahasiswa.

## Bukti yang Tersedia

- `MAGANG_REPORT_CONTEXT.md` dan `INTERNSHIP_CONTRIBUTION_CONTEXT.md`.
- Analisis database, modul, authentication, authorization, dan architecture.
- Git history per path.
- Working-tree diff Product Dosage dan Sales Realization.
- `ARCH.md` untuk audit Stall dan pola arsitektur.
- Tidak ada `IMPLEMENTATION_PROGRESS.md` atau audit file terpisah.

## Screenshot yang Diperlukan

| No | Screenshot | Temuan yang Didukung |
| ---: | --- | --- |
| 1 | `git log --oneline` | Sejarah commit dan keterbatasan atribusi. |
| 2 | `git show --stat 7a38bb7` | Bukti perubahan Stall. |
| 3 | Daftar file commit `7a38bb7` | Membuktikan file CRUD Product Brand tidak berubah. |
| 4 | Working-tree diff Product Dosage | Kandidat perubahan `year` yang belum committed. |
| 5 | Working-tree diff Sales Realization | Kandidat page-size selector yang belum committed. |
| 6 | Schema `daily_sales` | Missing FK `province_id`. |
| 7 | Migration/schema Sales Realization | Perbedaan `realizaton_ytd`/`realization_ytd`. |
| 8 | Protected procedure dan admin route guard | Gap authorization. |
| 9 | Struktur/router oRPC | Coupling dan peluang split router. |
| 10 | Struktur Stall route | Kompleksitas/coupling modul. |

Data email pada Git atau data sensitif lain harus disensor bila laporan dipublikasikan.

## Diagram yang Diperlukan

- Diagram gap authorization UI route versus API procedure.
- Diagram perbandingan schema dan migration.
- Matriks readiness modul.
- Matriks bukti implementasi-modifikasi-dokumentasi-keyakinan.
- Diagram dependency/coupling Stall.
- Diagram rekomendasi arsitektur; beri label jelas **“usulan”**, bukan kondisi aktual.

## Target Halaman

**8-10 halaman.** Bagian ini menjadi lokasi utama pembahasan sembilan modul yang atribusi kontribusinya belum terbukti.

# 4.3 KONTRIBUSI MAHASISWA

Bagian ini hanya memuat pekerjaan yang terhubung ke mahasiswa melalui bukti. Pada kondisi dokumen saat ini, identitas author Git belum terhubung ke nama/NBI mahasiswa.

## Isi yang Boleh Ditulis

### Fakta yang Aman Tanpa Verifikasi Identitas

- Repository memiliki commit `7a38bb7` pada 26 Mei 2026 oleh author Git `HenokhYeremia` yang memodifikasi/melengkapi Stall dan assignment Product Brand pada Stall.
- Repository memiliki rangkaian 12 commit infrastruktur/deployment oleh author Git yang sama.
- Dokumentasi internship berisi analisis arsitektur, database, API, security, modul, dan rekomendasi.
- Hubungan seluruh artefak tersebut dengan mahasiswa masih **[BELUM DAPAT DIBUKTIKAN]**.

### Klaim Bersyarat Setelah Identitas Author Git Diverifikasi

Jika `HenokhYeremia` dikonfirmasi sebagai mahasiswa, kontribusi yang boleh ditulis:

- Melengkapi CRUD dan form Stall.
- Mengintegrasikan create/update/delete Stall pada router oRPC.
- Mengembangkan pengelolaan assignment Product Brand pada Stall.
- Menambahkan `manage-stall-products.tsx` dan mengubah procedure sinkronisasi relasi Stall-Product Brand.
- Mengubah konfigurasi deployment Vercel/Netlify, redirect SSR, target build, dan workflow Supabase.
- Menyusun dokumentasi/analisis hanya jika authorship file dokumentasi dikonfirmasi melalui commit, metadata, logbook, atau pembimbing.

### Bukti Tambahan yang Harus Dimasukkan

- Identitas mahasiswa dan konfirmasi hubungan dengan author Git.
- Logbook, tiket, PR, atau konfirmasi pembimbing.
- Commit hash dan file berubah.
- Screenshot sebelum/sesudah atau hasil pengujian.
- Tanggal serta deskripsi aktivitas.

## Isi yang Harus Dihindari

- Mengklaim seluruh sembilan modul sebagai kontribusi mahasiswa.
- Mengklaim Product Dosage dan Sales Realization sebagai perbaikan mahasiswa hanya dari working-tree diff.
- Mengklaim CRUD Product Brand diubah pada `7a38bb7`; diff tidak mendukung klaim tersebut.
- Mengklaim Commodity Type, Province Commodity, Regency Commodity, Province Potential, atau Daily Sales dikembangkan mahasiswa.
- Mengklaim schema database diubah selama magang; tidak ada commit schema setelah snapshot awal.
- Menulis rekomendasi security/database sebagai hasil implementasi mahasiswa.
- Menyebut author Git sebagai mahasiswa tanpa verifikasi identitas.

## Bukti yang Tersedia

- Commit `7a38bb7` beserta diff dan daftar file.
- Dua belas commit deployment/infrastruktur.
- Nama author Git yang konsisten pada seluruh 15 commit.
- Dokumentasi analisis yang belum committed.
- Bukti identitas mahasiswa-author Git, logbook, ticket, PR, dan acceptance test: **[BELUM DAPAT DIBUKTIKAN]**.

## Screenshot yang Diperlukan

| No | Screenshot | Status |
| ---: | --- | --- |
| 1 | Detail commit `7a38bb7` | Tersedia dari Git. |
| 2 | Diff create/update/delete Stall | Tersedia dari Git. |
| 3 | Diff assignment Product Brand | Tersedia dari Git. |
| 4 | File `manage-stall-products.tsx` pada commit | Tersedia dari Git. |
| 5 | Daftar commit deployment | Tersedia dari Git. |
| 6 | Hasil fitur Stall pada UI | Perlu dijalankan dan didokumentasikan. |
| 7 | Hasil assignment Product Brand | Perlu dijalankan dan didokumentasikan. |
| 8 | Logbook/tiket/PR | **[BELUM DAPAT DIBUKTIKAN]**. |
| 9 | Konfirmasi pembimbing | **[BELUM DAPAT DIBUKTIKAN]**. |

## Diagram yang Diperlukan

- Timeline commit yang relevan.
- Diagram before/after alur pengelolaan Stall, hanya jika kondisi sebelum dapat direkonstruksi secara akurat.
- Diagram alur assignment Product Brand pada Stall.
- Matriks traceability: aktivitas -> commit -> file -> hasil uji -> bukti pembimbing.

## Target Halaman

**4-6 halaman** jika identitas dan bukti tambahan tersedia. Jika belum, batasi menjadi **1-2 halaman** yang menjelaskan keterbatasan bukti dan jangan mengisi kekurangan dengan asumsi.

## Target Total BAB IV

| Subbagian | Target halaman |
| --- | ---: |
| 4.1 Hasil Implementasi Sistem | 10-12 |
| 4.2 Hasil Analisis Sistem | 8-10 |
| 4.3 Kontribusi Mahasiswa | 4-6 setelah verifikasi; 1-2 sebelum verifikasi |
| **Total** | **22-28** setelah verifikasi dan penyesuaian isi |

# BAB V — PENUTUP

## Struktur yang Disarankan

1. 5.1 Kesimpulan
2. 5.2 Keterbatasan
3. 5.3 Saran Pengembangan
4. 5.4 Saran untuk Kegiatan Magang Berikutnya

## Isi yang Boleh Ditulis

### Kesimpulan Sistem

- Satu Peta Pasar merupakan aplikasi full-stack monolith di `apps/web` yang mengintegrasikan frontend, API, authentication, database, dan peta.
- Sistem memiliki modul wilayah, lahan, komoditas, produk, potensi, penjualan, stall, user, dan map dengan tingkat kesiapan berbeda.
- oRPC, Zod, Drizzle, dan TypeScript mendukung alur data type-safe.
- Better Auth menyediakan session-based authentication, sementara authorization API admin masih menjadi area evaluasi.

### Kesimpulan Analisis

- Terdapat 22 tabel dengan relasi lintas domain.
- Beberapa modul aktif penuh, beberapa read-only, dan Regency Potential belum memiliki endpoint aktif yang ditemukan.
- Terdapat indikasi mismatch schema-migration, missing FK, kebutuhan unique constraint, dan kebutuhan test/security improvement.
- Dokumentasi berhasil memetakan arsitektur, database, API, status modul, dan bukti kontribusi repository.

### Kesimpulan Kontribusi

- Bukti repository paling kuat berada pada Stall, assignment Product Brand pada Stall, dan konfigurasi deployment.
- Atribusi kepada mahasiswa harus tetap bersyarat sampai identitas author Git terkonfirmasi.
- Modul lain yang tidak memiliki bukti kontribusi spesifik disimpulkan sebagai objek analisis, bukan hasil pengembangan mahasiswa.

### Saran

- Tambahkan role-based `adminProcedure`.
- Sinkronkan schema dan migration.
- Tambahkan FK/unique constraint yang diperlukan setelah validasi kebutuhan bisnis.
- Standardisasi pagination, response, error handling, serta struktur router/schema.
- Tambahkan test API, authorization, dan database migration.
- Lengkapi logbook, traceability commit, PR, tiket, dan acceptance evidence untuk kegiatan magang.

## Isi yang Harus Dihindari

- Kesimpulan bahwa seluruh tujuan implementasi berhasil tanpa hasil uji.
- Klaim dampak kuantitatif tanpa data.
- Klaim bahwa rekomendasi telah diterapkan.
- Klaim seluruh modul sebagai karya mahasiswa.
- Menambah temuan baru yang tidak dibahas pada BAB III/IV.
- Menutupi keterbatasan identitas, logbook, atau bukti kontribusi.

## Bukti yang Tersedia

- Ringkasan arsitektur, database, modul, dan readiness.
- Temuan security, migration, FK, constraint, coupling, dan testing.
- Commit Stall serta deployment.
- Matriks kontribusi dan tingkat keyakinan.
- Bukti pengujian aktual serta identitas mahasiswa: **[PERLU VERIFIKASI]**.

## Screenshot yang Diperlukan

BAB V umumnya tidak memerlukan screenshot baru. Jika pedoman mengizinkan, gunakan maksimal:

- Satu screenshot sistem akhir yang representatif.
- Satu matriks ringkasan hasil atau traceability kontribusi.

Jangan mengulang seluruh screenshot BAB IV.

## Diagram yang Diperlukan

- Tidak wajib.
- Opsional: roadmap rekomendasi jangka pendek, menengah, dan panjang.
- Opsional: matriks ringkas kondisi saat ini versus rekomendasi.

## Target Halaman

**3-4 halaman.** Kesimpulan harus menjawab rumusan masalah BAB I dan hanya merangkum hasil BAB III/IV.

# MATRIKS PENEMPATAN MODUL

Matriks ini menjadi kontrol akhir agar kontribusi mahasiswa tidak tercampur dengan fitur repository.

| Modul/area | Hasil Implementasi Sistem | Analisis Sistem | Kontribusi Mahasiswa |
| --- | --- | --- | --- |
| Product Dosage | Jelaskan CRUD yang tersedia. | Jelaskan relasi, status modul, dan perubahan lokal `year`. | **[BELUM DAPAT DIBUKTIKAN]**. |
| Product Brand | Jelaskan CRUD dan relasinya. | Jelaskan bahwa commit berjudul Product Brand tidak mengubah folder CRUD-nya. | CRUD Product Brand: **[BELUM DAPAT DIBUKTIKAN]**. Assignment pada Stall bersyarat verifikasi author. |
| Commodity Type | Jelaskan CRUD yang tersedia. | Jelaskan relasi dengan Land Type dan komoditas wilayah. | **[BELUM DAPAT DIBUKTIKAN]**. |
| Province Commodity | Jelaskan fungsi read-only. | Jelaskan endpoint mutation belum aktif. | **[BELUM DAPAT DIBUKTIKAN]**. |
| Regency Commodity | Jelaskan CRUD yang tersedia. | Jelaskan join, dependency, dan tidak adanya commit spesifik. | **[BELUM DAPAT DIBUKTIKAN]**. |
| Province Potential | Jelaskan fungsi read-only. | Jelaskan filter/relasi dan mutation belum aktif. | **[BELUM DAPAT DIBUKTIKAN]**. |
| Sales Realization | Jelaskan CRUD dan metrik RKAP/realisasi. | Jelaskan candidate page-size diff dan mismatch migration. | **[BELUM DAPAT DIBUKTIKAN]**. |
| Daily Sales | Jelaskan CRUD yang tersedia. | Jelaskan missing FK dan mismatch migration. | **[BELUM DAPAT DIBUKTIKAN]**. |
| Stall | Jelaskan CRUD dan assignment brand. | Jelaskan coupling, schema, relasi, dan hasil audit. | Commit `7a38bb7` dapat digunakan setelah identitas author terverifikasi. |
| Database schema | Jelaskan 22 tabel dan relasi. | Jelaskan integritas serta migration gap. | Perubahan schema selama magang: **[BELUM DAPAT DIBUKTIKAN]**. |
| Deployment | Jelaskan Docker/Netlify/Vercel/workflow yang ada. | Jelaskan evolusi konfigurasi dari commit. | Dua belas commit dapat digunakan setelah identitas author terverifikasi. |
| Dokumentasi | Jelaskan artefak dokumentasi yang tersedia. | Gunakan sebagai hasil analisis. | Authorship mahasiswa **[BELUM DAPAT DIBUKTIKAN]**. |

# CHECKLIST SEBELUM FINALISASI LAPORAN

- [ ] Nama, NBI, perusahaan, departemen, periode, dan judul telah diverifikasi.
- [ ] Identitas `HenokhYeremia` telah dikonfirmasi atau tidak disebut sebagai mahasiswa.
- [ ] Setiap klaim kontribusi memiliki commit, file, tanggal, dan bukti pendukung.
- [ ] Fitur snapshot awal ditulis sebagai implementasi/analisis sistem.
- [ ] Product Dosage dan Sales Realization lokal tidak diklaim selesai sebelum committed dan diuji.
- [ ] CRUD Product Brand tidak diklaim berubah pada `7a38bb7`.
- [ ] Modul read-only tidak ditulis sebagai CRUD penuh.
- [ ] Temuan/rekomendasi tidak ditulis sebagai perbaikan yang sudah diterapkan.
- [ ] Screenshot data sensitif telah disensor.
- [ ] Semua diagram membedakan kondisi aktual dan usulan.
- [ ] Kesimpulan BAB V menjawab rumusan masalah BAB I.
- [ ] Total laporan berada pada rentang 70-100 halaman.
