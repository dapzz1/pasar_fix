# SCREENSHOT MASTERLIST

**Proyek:** PENGEMBANGAN BACKEND SISTEM INFORMASI MANAJEMEN PRODUK BARU UNTUK MENDUKUNG PENGELOLAAN DATA DAN MONITORING PRODUK BERBASIS WEB PADA PT PETROKIMIA GRESIK

**Mahasiswa:** Henokh Yeremia Olbrain Perangin Angin — NBI: 1462300075

**Perusahaan:** PT Petrokimia Gresik — Departemen Manajemen Produk Baru

**Target:** 60+ screenshot

---

## Kelompok 1: Aktivitas Kerja Praktek

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 1 | Terminal `bun install` berhasil | BAB III | 3.1 Persiapan Lingkungan | Menunjukkan proses instalasi dependency berhasil tanpa error | Wajib |
| 2 | Terminal `bun run dev` server berjalan | BAB III | 3.1 Persiapan Lingkungan | Menunjukkan development server berjalan di localhost:3000 | Wajib |
| 3 | File `.env.example` (tanpa nilai secret) | BAB III | 3.1 Konfigurasi Environment | Menunjukkan struktur environment variable yang dibutuhkan sistem | Opsional |
| 4 | Terminal `git log --oneline` | BAB IV | 4.3 Kontribusi Mahasiswa | Menunjukkan riwayat commit repository beserta author | Wajib |
| 5 | Detail commit `7a38bb7` Stall & Product Brand | BAB IV | 4.3 Kontribusi Mahasiswa | Menunjukkan bukti pengembangan modul Stall oleh author Git | Wajib |
| 6 | Terminal `git diff --stat 7a38bb7` | BAB IV | 4.3 Kontribusi Mahasiswa | Menunjukkan daftar file yang berubah pada commit Stall | Wajib |
| 7 | Terminal `git show 7a38bb7` (parsial) | BAB IV | 4.3 Kontribusi Mahasiswa | Menunjukkan perubahan kode pada create/update/delete Stall | Opsional |
| 8 | Terminal working-tree diff Product Dosage | BAB IV | 4.2 Hasil Analisis Sistem | Menunjukkan perubahan lokal field `year` pada Product Dosage | Opsional |
| 9 | Terminal working-tree diff Sales Realization | BAB IV | 4.2 Hasil Analisis Sistem | Menunjukkan perubahan lokal page-size selector | Opsional |

---

## Kelompok 2: Survei Lapangan

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 10 | File Excel `SURVEY PASAR KIOS (Jawaban).xlsx` | BAB III | 3.8 Analisis Modul Bisnis | Menunjukkan data survei lapangan kios yang digunakan sebagai sumber data import | Wajib |
| 11 | Isi worksheet Excel (samar/tersensor) | BAB III | 3.8 Analisis Modul Bisnis | Menunjukkan struktur data survei: provinsi, kabupaten, koordinat, pemilik | Opsional |
| 12 | Terminal `bun run scripts/seed-stalls.ts --execute` | BAB IV | 4.1 Hasil Implementasi Sistem | Menunjukkan proses import data kios dari Excel ke database | Opsional |

---

## Kelompok 3: Login

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 13 | Halaman login (`/auth/login`) | BAB IV | 4.1 Authentication | Menunjukkan form login email/password dengan Better Auth | Wajib |
| 14 | Halaman signup (`/auth/signup`) | BAB IV | 4.1 Authentication | Menunjukkan form registrasi pengguna baru | Wajib |
| 15 | Validasi error form login (input kosong) | BAB IV | 4.1 Authentication | Menunjukkan pesan validasi saat input tidak diisi | Opsional |
| 16 | Gagal login (email/password salah) | BAB IV | 4.1 Pengujian Authentication | Menunjukkan response error saat kredensial tidak valid | Wajib |
| 17 | Redirect setelah login berhasil | BAB IV | 4.1 Authentication | Menunjukkan alur login sukses menuju halaman tujuan | Wajib |

---

## Kelompok 4: Dashboard

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 18 | Landing page publik (`/`) — hero section | BAB IV | 4.1 Hasil Implementasi Sistem | Menunjukkan halaman utama dengan informasi program kerja, statistik, dan struktur pimpinan | Wajib |
| 19 | Landing page — statistik counters | BAB IV | 4.1 Hasil Implementasi Sistem | Menunjukkan ringkasan jumlah provinsi, komoditas, brand produk, dan kios | Wajib |
| 20 | Landing page — program cards (Market Map, Roadshow, Socialization) | BAB II | 2.3 Gambaran Umum Sistem | Menunjukkan tiga program utama Manajemen Produk Baru | Wajib |
| 21 | Admin Dashboard (`/admin`) — summary cards | BAB IV | 4.1 Dashboard | Menunjukkan ringkasan dashboard: provinsi, kabupaten, tipe lahan, komoditas, produk, brand, kios, penjualan | Wajib |
| 22 | Admin Dashboard — Province Potential Coverage progress bar | BAB IV | 4.1 Dashboard | Menunjukkan progress bar cakupan data potensi provinsi | Opsional |
| 23 | Admin Dashboard — Latest Product Brands list | BAB IV | 4.1 Dashboard | Menunjukkan daftar brand produk terbaru pada dashboard | Opsional |
| 24 | Admin Dashboard — Health check indicator | BAB IV | 4.1 Dashboard | Menunjukkan status koneksi API (OK/error) | Opsional |
| 25 | Admin sidebar seluruh menu navigasi | BAB III | 3.4 Struktur Proyek | Menunjukkan hirarki menu: Overview, Marketing Map, Potential, Sale, Stall, User Management | Wajib |
| 26 | Admin layout dengan header dan profil user | BAB IV | 4.1 Dashboard | Menunjukkan tampilan layout admin secara keseluruhan | Wajib |

---

## Kelompok 5: Province

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 27 | Daftar Province (`/admin/region/province/`) | BAB IV | 4.1 Modul Wilayah | Menunjukkan tabel data provinsi dengan search dan pagination | Wajib |
| 28 | Form tambah Province (modal/dialog) | BAB IV | 4.1 Modul Wilayah | Menunjukkan input kode, nama, luas, dan tahun provinsi | Wajib |
| 29 | Form edit Province (modal/dialog) | BAB IV | 4.1 Modul Wilayah | Menunjukkan form perubahan data provinsi dengan data terisi | Wajib |
| 30 | Dialog hapus Province (konfirmasi) | BAB IV | 4.1 Modul Wilayah | Menunjukkan konfirmasi penghapusan data provinsi | Opsional |

---

## Kelompok 6: Regency

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 31 | Daftar Regency (`/admin/region/regency/`) | BAB IV | 4.1 Modul Wilayah | Menunjukkan tabel kabupaten/kota dengan informasi provinsi induk | Wajib |
| 32 | Form tambah/edit Regency | BAB IV | 4.1 Modul Wilayah | Menunjukkan form dengan dropdown pemilihan provinsi | Wajib |

---

## Kelompok 7: Commodity Type

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 33 | Daftar Commodity Type (`/admin/commodity/`) | BAB IV | 4.1 Modul Komoditas | Menunjukkan tabel jenis komoditas dengan filter Land Type | Wajib |
| 34 | Form tambah/edit Commodity Type | BAB IV | 4.1 Modul Komoditas | Menunjukkan form dengan pemilihan Land Type, nama, dan tahun | Wajib |
| 35 | Daftar Province Commodity (read-only) | BAB IV | 4.1 Modul Komoditas | Menunjukkan tabel data komoditas tingkat provinsi dengan status read-only | Wajib |
| 36 | Daftar Regency Commodity (`/admin/commodity/regency-commodity/`) | BAB IV | 4.1 Modul Komoditas | Menunjukkan tabel komoditas tingkat kabupaten/kota | Wajib |
| 37 | Form tambah/edit Regency Commodity | BAB IV | 4.1 Modul Komoditas | Menunjukkan form dengan relasi regency dan commodity type | Opsional |

---

## Kelompok 8: Product Type

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 38 | Daftar Product Type (`/admin/product/`) | BAB IV | 4.1 Modul Produk | Menunjukkan tabel jenis produk | Wajib |
| 39 | Form tambah/edit Product Type | BAB IV | 4.1 Modul Produk | Menunjukkan form input nama, deskripsi, dan tahun | Wajib |

---

## Kelompok 9: Product Brand

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 40 | Daftar Product Brand (`/admin/product/product-brand/`) | BAB IV | 4.1 Modul Produk | Menunjukkan tabel brand produk dengan relasi Product Type | Wajib |
| 41 | Form tambah/edit Product Brand | BAB IV | 4.1 Modul Produk | Menunjukkan form input nama, industri, deskripsi, dan pemilihan Product Type | Wajib |

---

## Kelompok 10: Product Dosage

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 42 | Daftar Product Dosage (`/admin/product/product-dosage/`) | BAB IV | 4.1 Modul Produk | Menunjukkan tabel dosis produk yang menghubungkan komoditas dan brand | Wajib |
| 43 | Form tambah/edit Product Dosage | BAB IV | 4.1 Modul Produk | Menunjukkan form dengan pemilihan Commodity Type, Product Brand, dosis, satuan, dan tahun | Wajib |

---

## Kelompok 11: Province Potential

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 44 | Daftar Province Potential (read-only) | BAB IV | 4.1 Modul Potensi | Menunjukkan tabel potensi provinsi dengan filter brand dan tahun; status read-only | Wajib |

---

## Kelompok 12: Regency Potential

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 45 | Tabel `regency_potentials` di Drizzle Studio | BAB IV | 4.2 Hasil Analisis Sistem | Menunjukkan bahwa tabel regency_potentials ada di database tetapi endpoint CRUD belum aktif [PERLU VERIFIKASI] | Opsional |

---

## Kelompok 13: Sales Realization

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 46 | Daftar Sales Realization (`/admin/sale/`) | BAB IV | 4.1 Modul Penjualan | Menunjukkan tabel realisasi penjualan dengan metrik RKAP, realisasi, YTD | Wajib |
| 47 | Form tambah/edit Sales Realization | BAB IV | 4.1 Modul Penjualan | Menunjukkan form input product brand, tanggal laporan, nilai realisasi dan RKAP | Wajib |
| 48 | Pagination / page-size selector Sales Realization | BAB IV | 4.2 Hasil Analisis Sistem | Menunjukkan pilihan jumlah baris 10/25/50/100 | Opsional |

---

## Kelompok 14: Daily Sales

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 49 | Daftar Daily Sales (`/admin/sale/sale-daily/`) | BAB IV | 4.1 Modul Penjualan | Menunjukkan tabel penjualan harian dengan kuantitas, revenue, target, realisasi | Wajib |
| 50 | Form tambah/edit Daily Sales | BAB IV | 4.1 Modul Penjualan | Menunjukkan form input tanggal, brand, provinsi, qty, revenue, target, realisasi | Wajib |

---

## Kelompok 15: Stall

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 51 | Daftar Stall (`/admin/stall/`) | BAB IV | 4.1 Modul Stall | Menunjukkan tabel kios dengan informasi nama, alamat, provinsi, kabupaten, pemilik | Wajib |
| 52 | Form tambah Stall | BAB IV | 4.1 Modul Stall | Menunjukkan form input data kios: nama, alamat, provinsi, kabupaten, koordinat, pemilik, kontak, kriteria | Wajib |
| 53 | Form edit Stall | BAB IV | 4.1 Modul Stall | Menunjukkan form perubahan data kios dengan data terisi | Wajib |
| 54 | Dialog hapus Stall (konfirmasi) | BAB IV | 4.1 Modul Stall | Menunjukkan konfirmasi penghapusan data kios | Opsional |
| 55 | Modal assignment Product Brand ke Stall | BAB IV | 4.1 Modul Stall | Menunjukkan antarmuka pengelolaan relasi many-to-many Stall dengan Product Brand | Wajib |
| 56 | Halaman detail Stall (`/stall/$id`) | BAB IV | 4.1 Modul Stall | Menunjukkan detail kios publik: info lokasi, kontak, dan daftar product brand | Wajib |
| 57 | Fitur export Excel Stall | BAB IV | 4.1 Modul Stall | Menunjukkan tombol/fungsi export data kios ke Excel | Opsional |

---

## Kelompok 16: User Management

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 58 | Daftar User (`/admin/user/`) | BAB IV | 4.1 User Management | Menunjukkan tabel pengguna dengan informasi nama, email, role | Wajib |
| 59 | Form edit role User | BAB IV | 4.1 User Management | Menunjukkan dropdown/select perubahan role (admin/viewer/guest) | Wajib |
| 60 | Dialog hapus User (konfirmasi) | BAB IV | 4.1 User Management | Menunjukkan konfirmasi penghapusan user | Opsional |

---

## Kelompok 17: Map

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 61 | Halaman peta utama (`/map`) | BAB IV | 4.1 Visualisasi Peta | Menunjukkan peta Leaflet interaktif dengan batas wilayah Indonesia | Wajib |
| 62 | Sidebar peta dengan kontrol filter | BAB IV | 4.1 Visualisasi Peta | Menunjukkan panel filter: tahun, level administrasi, filter brand/land type/commodity | Wajib |
| 63 | Peta dengan layer choropleth potensi | BAB IV | 4.1 Visualisasi Peta | Menunjukkan warna wilayah berdasarkan nilai potensi produk | Wajib |
| 64 | Marker kios pada peta | BAB IV | 4.1 Visualisasi Peta | Menunjukkan marker lokasi kios dengan popup informasi | Opsional |
| 65 | Popup detail wilayah pada peta | BAB IV | 4.1 Visualisasi Peta | Menunjukkan informasi provinsi/kabupaten saat diklik | Opsional |
| 66 | Toggle layer "Show Kios" / "Show Potential" | BAB IV | 4.1 Visualisasi Peta | Menunjukkan tombol perpindahan layer peta | Opsional |
| 67 | Legenda choropleth pada peta | BAB IV | 4.1 Visualisasi Peta | Menunjukkan rentang warna dan nilai yang digunakan pada peta | Opsional |

---

## Kelompok 18: Database

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 68 | Struktur folder schema Drizzle (`lib/db/schema/`) | BAB III | 3.5 Perancangan Database | Menunjukkan file-file schema database: auth, map-product, sale, stall, todo | Wajib |
| 69 | Struktur folder migration Drizzle | BAB III | 3.5 Perancangan Database | Menunjukkan file migration SQL dan metadata | Wajib |
| 70 | Potongan schema `auth.ts` | BAB III | 3.5 Perancangan Database | Menunjukkan definisi tabel user, session, account, verification | Wajib |
| 71 | Potongan schema `map-product.ts` | BAB III | 3.5 Perancangan Database | Menunjukkan definisi tabel geography, land, commodity, product, potential | Wajib |
| 72 | Potongan schema `sale.ts` | BAB III | 3.5 Perancangan Database | Menunjukkan definisi tabel sales_realizations dan daily_sales | Wajib |
| 73 | Potongan schema `stall.ts` | BAB III | 3.5 Perancangan Database | Menunjukkan definisi tabel stalls dan stall_product_brands | Opsional |
| 74 | Daftar tabel di Drizzle Studio | BAB IV | 4.1 Validasi Database | Menunjukkan UI Drizzle Studio dengan seluruh 22 tabel | Wajib |
| 75 | Isi salah satu tabel di Drizzle Studio | BAB IV | 4.1 Validasi Database | Menunjukkan sample data pada tabel provinsi atau wilayah | Opsional |
| 76 | Potongan migration `0000` | BAB III | 3.5 Perancangan Database | Menunjukkan SQL migration awal | Opsional |
| 77 | Perbandingan schema vs migration `realizaton_ytd` | BAB IV | 4.2 Hasil Analisis Sistem | Menunjukkan indikasi typo/perbedaan nama field antara schema dan migration | Opsional |
| 78 | ERD tekstual dari dokumentasi | BAB III | 3.5 Perancangan Database | Menunjukkan diagram Entity Relationship 22 tabel (dapat digambar manual) | Wajib |

---

## Kelompok 19: API

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 79 | Struktur file router oRPC (`lib/orpc/router/index.ts`) | BAB III | 3.6 Perancangan API | Menunjukkan komposisi router: healthCheck, auth, admin, todo, map | Wajib |
| 80 | Potongan struktur file oRPC context (`lib/orpc/context.ts`) | BAB III | 3.6 Perancangan API | Menunjukkan pembuatan context session dan DB | Opsional |
| 81 | Potongan file route handler API (`routes/api/rpc.$.ts`) | BAB III | 3.6 Perancangan API | Menunjukkan endpoint handler RPC | Opsional |
| 82 | Response endpoint `healthCheck` (browser/curl) | BAB IV | 4.1 Pengujian API | Menunjukkan response `OK` dari public procedure | Wajib |
| 83 | Response endpoint unauthorized (tanpa session) | BAB IV | 4.1 Pengujian API | Menunjukkan error/proteksi saat mengakses protected procedure tanpa auth | Wajib |
| 84 | Response validation error Zod (input tidak valid) | BAB IV | 4.1 Pengujian API | Menunjukkan error validasi saat input tidak sesuai schema | Wajib |
| 85 | Response success query salah satu modul (contoh: get provinces) | BAB IV | 4.1 Pengujian API | Menunjukkan response JSON data dari API oRPC | Opsional |
| 86 | Halaman OpenAPI/Swagger jika tersedia | BAB IV | 4.1 Pengujian API | Menunjukkan dokumentasi OpenAPI endpoint | Opsional |
| 87 | `privateProcedure` atau `protectedProcedure` pada kode | BAB III | 3.7 Authentication | Menunjukkan implementasi auth middleware pada procedure | Wajib |

---

## Kelompok 20: Authentication

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 88 | Route guard admin (`routes/admin/route.tsx`) | BAB III | 3.7 Authentication | Menunjukkan kode pemeriksaan session dan role pada route admin | Wajib |
| 89 | Session cookie di browser DevTools (token disensor) | BAB IV | 4.1 Authentication | Menunjukkan cookie session Better Auth setelah login | Wajib |
| 90 | Guest user ditolak akses `/admin` (redirect ke login) | BAB IV | 4.1 Pengujian Authentication | Menunjukkan halaman login saat guest mencoba akses admin | Wajib |
| 91 | Admin user berhasil membuka halaman admin | BAB IV | 4.1 Authentication | Menunjukkan admin berhasil mengakses `/admin` setelah login | Wajib |
| 92 | Potongan konfigurasi Better Auth (`lib/auth/index.ts`) | BAB III | 3.7 Authentication | Menunjukkan setup Better Auth dengan Drizzle adapter | Wajib |
| 93 | Tabel `user` dengan kolom role (admin/viewer/guest) | BAB III | 3.5 Perancangan Database | Menunjukkan struktur tabel user beserta field role | Opsional |

---

## Kelompok 21: Deployment

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 94 | File `netlify.toml` | BAB III | 3.11 Build, Testing, dan Deployment | Menunjukkan konfigurasi build Netlify: base, command, publish | Wajib |
| 95 | File `vite.config.ts` (target netlify) | BAB III | 3.11 Build, Testing, dan Deployment | Menunjukkan konfigurasi Vite dan TanStack Start target | Wajib |
| 96 | File `Dockerfile` | BAB III | 3.11 Build, Testing, dan Deployment | Menunjukkan Dockerfile untuk container build | Opsional |
| 97 | File `docker-compose.yml` | BAB III | 3.11 Build, Testing, dan Deployment | Menunjukkan konfigurasi Docker Compose PostgreSQL | Opsional |
| 98 | File `package.json` (`apps/web`) — scripts dan dependencies | BAB II | 2.6 Landasan Teori Backend | Menunjukkan dependencies backend: oRPC, Drizzle, Better Auth, TanStack | Wajib |
| 99 | Workflow GitHub Actions (ping Supabase) | BAB III | 3.11 Build, Testing, dan Deployment | Menunjukkan workflow otomatis keep-alive database | Opsional |
| 100 | Terminal output build production (`bun run build`) | BAB IV | 4.1 Hasil Implementasi Sistem | Menunjukkan proses build berhasil tanpa error | Wajib |

---

## Kelompok 22: Testing

| No | Nama Screenshot | BAB | Sub BAB | Tujuan | Wajib/Opsional |
| --- | --- | --- | --- | --- | --- |
| 101 | Terminal output `bun run check-types` | BAB IV | 4.1 Pengujian Kualitas | Menunjukkan hasil type checking TypeScript | Wajib |
| 102 | Terminal output `bun run check` (Biome lint) | BAB IV | 4.1 Pengujian Kualitas | Menunjukkan hasil linting dan formatting dengan Biome | Wajib |
| 103 | Terminal output `bun test` (Vitest) | BAB IV | 4.1 Pengujian | Menunjukkan hasil unit test jika tersedia | Opsional |
| 104 | Struktur folder test/modul test | BAB III | 3.11 Build, Testing, dan Deployment | Menunjukkan lokasi file test pada project | Opsional |

---

## Ringkasan Statistik

| Kelompok | Jumlah | Wajib | Opsional |
| --- | ---: | ---: | ---: |
| 1. Aktivitas Kerja Praktek | 9 | 6 | 3 |
| 2. Survei Lapangan | 3 | 2 | 1 |
| 3. Login | 5 | 4 | 1 |
| 4. Dashboard | 9 | 7 | 2 |
| 5. Province | 4 | 3 | 1 |
| 6. Regency | 2 | 2 | 0 |
| 7. Commodity Type | 5 | 4 | 1 |
| 8. Product Type | 2 | 2 | 0 |
| 9. Product Brand | 2 | 2 | 0 |
| 10. Product Dosage | 2 | 2 | 0 |
| 11. Province Potential | 1 | 1 | 0 |
| 12. Regency Potential | 1 | 0 | 1 |
| 13. Sales Realization | 3 | 2 | 1 |
| 14. Daily Sales | 2 | 2 | 0 |
| 15. Stall | 7 | 6 | 1 |
| 16. User Management | 3 | 2 | 1 |
| 17. Map | 7 | 4 | 3 |
| 18. Database | 11 | 8 | 3 |
| 19. API | 9 | 6 | 3 |
| 20. Authentication | 6 | 5 | 1 |
| 21. Deployment | 7 | 5 | 2 |
| 22. Testing | 4 | 2 | 2 |
| **Total** | **104** | **76** | **28** |

---

## Catatan Penggunaan

### Rekomendasi Penempatan ke Laporan

| Bagian Laporan | Rentang Screenshot | Jumlah Ideal |
| --- | --- | ---: |
| BAB I Pendahuluan | No 18, 21 (jika diizinkan) | 0-2 |
| BAB II Profil & Landasan Teori | No 20, 98 | 2-4 |
| BAB III Analisis & Perancangan | No 68-71, 73, 77-79, 81, 87, 92, 94-96, 104 | 15-20 |
| BAB IV Hasil & Pembahasan | No 1-17, 19, 22-67, 72, 74-76, 80, 82-86, 88-91, 97, 99-103 | 35-45 |
| BAB V Penutup | Tidak perlu screenshot baru | 0 |
| Lampiran | Screenshot opsional yang tidak masuk BAB utama | 10-20 |

### Aturan Penyensoran

Setiap screenshot wajib menyamarkan (blur/censor) data sensitif berikut:
- Token, password, dan cookie session
- Email pribadi pengguna
- Environment variable yang mengandung secret
- Data pribadi narasumber/nama responden survei (kecuali atas izin)

### Status Verifikasi

Label `[PERLU VERIFIKASI]` berarti:
- Fitur/halaman mungkin ada tetapi belum dapat dikonfirmasi melalui dokumentasi atau source code saat ini.
- Screenshot hanya boleh diambil setelah verifikasi langsung pada sistem berjalan.

### Prioritas Pengambilan

**Prioritas 1 (40 screenshot — harus ada sebelum finalisasi):**
No 1, 2, 4, 5, 6, 10, 13, 14, 16, 17, 18, 19, 20, 21, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 44, 46, 47, 49, 50, 51, 52, 53, 55, 56, 58, 59, 61, 62, 63, 68, 69, 70, 71, 72, 74, 78, 79, 82, 83, 84, 88, 89, 90, 91, 92, 94, 95, 98, 100, 101, 102

**Prioritas 2 (screenshot opsional — ambil jika waktu memungkinkan):**
Sisa screenshot opsional yang menunjang analisis dan dokumentasi.

---

*Dokumen ini disusun berdasarkan analisis source code, dokumentasi proyek (`MAGANG_REPORT_CONTEXT.md`, `BACKEND.md`, `arch.md`), dan pemetaan BAB (`BAB_MAPPING.md`). Sesuaikan nomor gambar dan subbab dengan format laporan masing-masing.*
