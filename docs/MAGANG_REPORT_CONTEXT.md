# Konteks Utama Laporan Magang

Dokumen ini menjadi sumber utama untuk menyusun laporan magang proyek **Satu Peta Pasar**. Isinya dirangkum dari `PROJECT_DOCUMENTATION_FOR_INTERNSHIP.md`, `ARCH.md`, `README.md`, `GUIDEBOOK.md`, `AGENTS.md`, dan `apps/web/README.md`. Informasi yang tidak ditemukan atau belum dapat dibuktikan diberi tanda **[PERLU VERIFIKASI]**.

> Catatan konsistensi: `AGENTS.md` menjelaskan struktur template Better-T-Stack dengan backend Hono di `apps/server`. Dokumentasi hasil analisis source code menyatakan bahwa folder tersebut tidak ditemukan dan implementasi aktif berada di `apps/web` sebagai aplikasi full-stack TanStack Start. Laporan harus menggunakan kondisi implementasi aktif dan menyebut isi `AGENTS.md` sebagai informasi template yang sudah tidak sesuai.

# PROFIL MAGANG

| Data | Keterangan |
| --- | --- |
| Nama mahasiswa | **[PERLU VERIFIKASI]** |
| NBI | **[PERLU VERIFIKASI]** |
| Perusahaan | **[PERLU VERIFIKASI]** |
| Departemen | **[PERLU VERIFIKASI]** |
| Periode magang | **[PERLU VERIFIKASI]** |
| Judul laporan | **[PERLU VERIFIKASI]**. Judul yang didukung dokumentasi: *Pengembangan Backend Aplikasi Satu Peta Pasar Berbasis TypeScript dan PostgreSQL*. Pemilihan judul final harus disesuaikan dengan pekerjaan mahasiswa yang benar-benar dilakukan. |

# DESKRIPSI SISTEM

## Nama Sistem

**Satu Peta Pasar**. Nama teknis paket root masih `my-better-t-app-2` dan README awal masih membawa identitas template Better-T-Stack, tetapi domain fitur aktual mengarah pada Satu Peta Pasar.

## Tujuan Sistem

Sistem bertujuan mengelola dan memvisualisasikan data pasar secara terpusat. Data wilayah, lahan, komoditas, produk, potensi pasar, kios, dan penjualan disatukan dalam aplikasi web dengan panel administrasi dan peta interaktif.

## Masalah yang Diselesaikan

- Data wilayah, produk, komoditas, kios, potensi, dan penjualan yang tersebar dikelola dalam satu sistem.
- Data geografis yang sulit dianalisis dalam bentuk tabel divisualisasikan melalui Leaflet dan GeoJSON.
- Ketidakkonsistenan input dikurangi melalui validasi Zod dan constraint database.
- Akses panel admin dibatasi menggunakan session Better Auth dan route guard berbasis role.
- Kontrak data frontend dan backend dijaga type-safe dengan oRPC dan TypeScript.
- Perubahan skema dikelola melalui Drizzle schema dan migration, meskipun dokumentasi menemukan indikasi keduanya belum sepenuhnya sinkron.

## Pengguna Sistem

| Pengguna | Peran dan akses |
| --- | --- |
| Admin | Mengakses `/admin` dan mengelola data master, wilayah, lahan, komoditas, produk, penjualan, kios, serta user. |
| Viewer | Role ditemukan pada kode, tetapi hak akses final belum jelas dan tidak lolos guard `/admin`. **[PERLU VERIFIKASI]** |
| Guest | Role default user baru; dapat memakai halaman publik tetapi tidak dapat masuk panel admin. |
| Pengunjung umum | Mengakses halaman publik seperti beranda, peta, pengetahuan/potensi produk, realisasi penjualan, kios, dan halaman autentikasi sesuai route yang tersedia. |

# ARSITEKTUR SISTEM

Sistem menggunakan arsitektur **full-stack monolith** pada workspace `apps/web`.

## Frontend

Frontend dibangun dengan React 19 dan TanStack Start. TanStack Router menangani file-based routing, TanStack Query menangani server state dan cache, sedangkan Tailwind CSS serta komponen berbasis Radix/shadcn menangani antarmuka. Leaflet dan React Leaflet digunakan untuk visualisasi peta.

## Backend

Backend tidak berada pada service Hono terpisah. Server route TanStack Start di `apps/web/src/routes/api` mengekspos handler oRPC, OpenAPI, dan Better Auth. Procedure bisnis diletakkan dekat dengan route fitur, umumnya di folder `-app`.

## Database

PostgreSQL menjadi database utama. Drizzle ORM digunakan untuk definisi schema, query type-safe, foreign key, dan migration. Database lokal dapat disediakan melalui Docker Compose.

## Authentication

Better Auth menangani login email/password, account, session, cookie, dan data user. Route `/admin` memeriksa session dan role `admin`. Procedure API yang dilindungi saat ini hanya memastikan user memiliki session; pemeriksaan role admin pada boundary API belum terdokumentasi sebagai implementasi aktif.

## API

oRPC menjadi boundary API type-safe. Endpoint RPC tersedia melalui `/api/rpc/$`, OpenAPI melalui `/api/$`, dan handler autentikasi melalui `/api/auth/$`. Input procedure divalidasi dengan Zod dan query database dijalankan dengan Drizzle ORM.

## Diagram ASCII

```text
Pengguna / Browser
        |
        v
React 19 + TanStack Router + TanStack Query
        |
        | request /api/rpc, /api, /api/auth
        v
TanStack Start Server Routes (apps/web)
        |
        +--------------------+
        |                    |
        v                    v
oRPC Procedures        Better Auth
        |                    |
        +---------+----------+
                  |
                  v
          Validasi Zod + Context
                  |
                  v
              Drizzle ORM
                  |
                  v
              PostgreSQL

Sumber data peta statis:
public/data/*.geojson ---> Leaflet / React Leaflet ---> Tampilan peta
```

# TECHNOLOGY STACK

## Frontend

| Teknologi | Fungsi |
| --- | --- |
| React 19 | Membangun komponen dan antarmuka pengguna. |
| TanStack Start | Framework full-stack React dan integrasi server/client. |
| TanStack Router | File-based routing, loader, context, dan route guard. |
| TanStack Query | Fetching, cache, mutation, dan invalidasi server state. |
| TanStack Form dan React Hook Form | Pengelolaan form pada modul admin. |
| Zod | Validasi data form dan input API. |
| Tailwind CSS 4 | Styling utility-first. |
| Radix UI / komponen bergaya shadcn | Primitive UI yang reusable dan mendukung aksesibilitas. |
| Leaflet dan React Leaflet | Peta interaktif serta visualisasi GeoJSON. |
| Jotai | State lokal pada area admin. |
| Lingui | Internasionalisasi bahasa Inggris dan Indonesia. |
| Recharts | Dukungan visualisasi grafik; penggunaan aktual per halaman **[PERLU VERIFIKASI]**. |
| Lucide React | Ikon antarmuka. |
| Sonner | Notifikasi toast. |

## Backend

| Teknologi | Fungsi |
| --- | --- |
| TanStack Start server routes | Menjalankan backend dalam aplikasi full-stack `apps/web`. |
| Bun | Runtime dan package manager proyek. |
| TypeScript | Type safety lintas frontend, API, dan akses database. |
| Zod | Validasi input pada boundary procedure. |

## Database

| Teknologi | Fungsi |
| --- | --- |
| PostgreSQL | Menyimpan data autentikasi dan seluruh domain bisnis. |
| Drizzle ORM | Mendefinisikan schema dan menjalankan query type-safe. |
| Drizzle Kit | Generate, migrate, push schema, dan membuka Drizzle Studio. |
| `pg` / node-postgres | Driver koneksi PostgreSQL. |

## Authentication

| Teknologi | Fungsi |
| --- | --- |
| Better Auth | Login email/password, user, account, session, dan cookie. |
| Drizzle adapter | Menyimpan data Better Auth ke PostgreSQL. |
| Route guard dan `protectedProcedure` | Membatasi halaman admin dan procedure yang membutuhkan session. |

## API Layer

| Teknologi | Fungsi |
| --- | --- |
| oRPC Server/Client | Kontrak RPC type-safe antara client dan server. |
| oRPC TanStack Query | Menghasilkan query/mutation options untuk TanStack Query. |
| oRPC OpenAPI Handler | Menyediakan akses API melalui handler OpenAPI. |

## Build Tools

| Teknologi | Fungsi |
| --- | --- |
| Vite | Development server dan production bundling. |
| Turborepo | Menjalankan dan melakukan cache task monorepo. |
| Bun workspaces | Mengelola package dan script workspace. |
| Biome / Ultracite | Linting, formatting, type-safety, dan aturan kualitas kode. |
| Vitest | Framework pengujian; cakupan test bisnis masih terbatas menurut dokumentasi. |
| Husky / Lefthook | Dukungan Git hooks dan quality checks. Penggunaan efektifnya **[PERLU VERIFIKASI]**. |

## Deployment

| Teknologi | Fungsi |
| --- | --- |
| Dockerfile | Build aplikasi dalam container. |
| Docker Compose | Menjalankan layanan lokal, termasuk PostgreSQL. |
| Netlify | Target deployment yang disebut pada konfigurasi Vite dan `netlify.toml`. |
| Vercel | Alternatif deployment melalui `vercel.json`. |
| GitHub Actions | Workflow `Ping Supabase`; pipeline build-test penuh belum terdokumentasi. |
| Supabase | Database/layanan managed yang diindikasikan workflow dan dokumentasi. Pemakaian production **[PERLU VERIFIKASI]**. |

# STRUKTUR PROJECT

| Folder/file | Fungsi |
| --- | --- |
| `.github/workflows/` | Workflow otomatisasi GitHub, termasuk ping Supabase. |
| `.github/instructions/` | Instruksi pengembangan proyek. |
| `.husky/` | Konfigurasi Git hooks. |
| `MAINTENANCE/` | Arsip/contoh script pemeliharaan; bukan implementasi runtime utama. |
| `apps/` | Container workspace aplikasi. |
| `apps/web/` | Aplikasi aktif full-stack TanStack Start; berisi frontend, backend, database, dan auth. |
| `apps/web/public/` | Aset statis aplikasi. |
| `apps/web/public/data/` | GeoJSON batas Indonesia dan kabupaten untuk visualisasi peta. |
| `apps/web/src/` | Source code utama aplikasi. |
| `apps/web/src/components/` | Komponen global seperti header dan language switcher. |
| `apps/web/src/components/ui/` | Primitive UI reusable seperti button, dialog, input, select, sidebar, dan tooltip. |
| `apps/web/src/env/` | Validasi dan akses environment variable client/server. |
| `apps/web/src/hooks/` | React hooks reusable, misalnya debounce, mobile, dan toast. |
| `apps/web/src/lib/` | Infrastruktur bersama untuk auth, database, Lingui, oRPC, TanStack Query, dan utilitas. |
| `apps/web/src/lib/auth/` | Konfigurasi Better Auth, client auth, dan middleware guard. |
| `apps/web/src/lib/db/` | Koneksi database, schema, dan migration Drizzle. |
| `apps/web/src/lib/db/schema/` | Schema `auth`, `map-product`, `sale`, `stall`, `todo`, dan utility UUID. |
| `apps/web/src/lib/db/migrations/` | SQL migration dan metadata Drizzle. |
| `apps/web/src/lib/lingui/` | Konfigurasi dan middleware internasionalisasi. |
| `apps/web/src/lib/orpc/` | Context, client, procedure, schema, dan komposisi router oRPC. |
| `apps/web/src/lib/tanstack-query/` | Provider dan integrasi TanStack Query. |
| `apps/web/src/locales/` | Katalog terjemahan Inggris dan Indonesia. |
| `apps/web/src/routes/` | File-based routes publik, auth, API, map, demo, todo, dan admin. |
| `apps/web/src/routes/api/` | Endpoint RPC, OpenAPI, dan Better Auth. |
| `apps/web/src/routes/auth/` | Halaman login dan signup. |
| `apps/web/src/routes/admin/` | Layout, guard, navigasi, dan seluruh modul administrasi. |
| `apps/web/src/routes/admin/*/-app/` | Procedure/use case backend fitur: get, create, update, delete. |
| `apps/web/src/routes/admin/*/-domain/` | Schema dan tipe domain/validasi fitur. |
| `apps/web/src/routes/admin/*/-components/` | Tabel, form, dialog, dan komponen presentasi fitur. |
| `apps/web/src/routes/map/` | Halaman dan komponen peta berbasis Leaflet/GeoJSON. |
| `apps/web/src/styles/` | CSS global dan konfigurasi tampilan. |
| `client.tsx` / `server.ts` | Entry point client dan server. |
| `router.tsx` / `routeTree.gen.ts` | Konfigurasi router dan route tree hasil generate. |
| `drizzle.config.ts` | Konfigurasi Drizzle Kit. |
| `vite.config.ts` | Konfigurasi Vite dan target build. |
| `vitest.config.ts` | Konfigurasi test. |
| `docker-compose.yml` / `Dockerfile` | Infrastruktur container lokal dan build. |
| Root `package.json`, `turbo.json`, `bun.lock` | Workspace, task Turborepo, dependency, dan lockfile. |
| Root `README.md`, `GUIDEBOOK.md`, `ARCH.md` | Panduan setup, penggunaan, dan arsitektur proyek. |
| `docs/` | Dokumentasi turunan untuk kebutuhan laporan magang. |

# DATABASE ANALYSIS

Database memiliki 22 tabel yang terdokumentasi: empat tabel autentikasi, satu tabel demo, dan 17 tabel domain pasar. Primary key umumnya UUID.

| Tabel | Fungsi | Primary Key | Foreign Key | Relasi |
| --- | --- | --- | --- | --- |
| `user` | Menyimpan identitas, email, profil, dan role user. | `id` | - | Satu user memiliki banyak `session` dan `account`. |
| `session` | Menyimpan session login beserta token dan masa berlaku. | `id` | `user_id` -> `user.id` (cascade) | Banyak session dimiliki satu user. |
| `account` | Menyimpan credential/provider dan password hash atau token OAuth. | `id` | `user_id` -> `user.id` (cascade) | Banyak account dimiliki satu user. |
| `verification` | Menyimpan token/nilai proses verifikasi dan expiry. | `id` | - | Relasi eksplisit tidak didokumentasikan. |
| `todo` | Menyimpan contoh item todo dari template. | `id` | - | Tidak berelasi dengan domain utama. |
| `provinces` | Data master provinsi, kode, luas, dan tahun. | `id` | - | Satu provinsi memiliki banyak regency, province land, province commodity, province potential, dan stall. |
| `regencies` | Data master kabupaten/kota. | `id` | `province_id` -> `provinces.id` (cascade) | Banyak regency milik satu provinsi; direferensikan land, commodity, potential, dan stall. |
| `land_types` | Data master jenis lahan. | `id` | - | Direferensikan province/regency land dan commodity type. |
| `province_lands` | Luas lahan per provinsi, jenis lahan, dan tahun. | `id` | `province_id` -> `provinces.id`; `land_type_id` -> `land_types.id` | Penghubung provinsi dan jenis lahan. |
| `regency_lands` | Luas lahan per kabupaten, jenis lahan, dan tahun. | `id` | `regency_id` -> `regencies.id`; `land_type_id` -> `land_types.id` | Penghubung regency dan jenis lahan. |
| `commodity_types` | Data master komoditas berdasarkan jenis lahan. | `id` | `land_type_id` -> `land_types.id` | Direferensikan province/regency commodity dan product dosage. |
| `province_commodities` | Data komoditas dan luasnya per provinsi. | `id` | `province_id` -> `provinces.id`; `commodity_type_id` -> `commodity_types.id` | Penghubung provinsi dan komoditas. |
| `regency_commodities` | Data komoditas dan luasnya per kabupaten/kota. | `id` | `regency_id` -> `regencies.id`; `commodity_type_id` -> `commodity_types.id` | Penghubung regency dan komoditas. |
| `product_types` | Data master jenis produk. | `id` | - | Satu jenis produk memiliki banyak brand produk. |
| `product_brands` | Data brand, industri, dan deskripsi produk. | `id` | `product_type_id` -> `product_types.id` | Direferensikan dosage, potential, sales, daily sales, dan stall product brand. |
| `product_dosages` | Dosis brand produk untuk suatu komoditas. | `id` | `commodity_type_id` -> `commodity_types.id`; `product_brand_id` -> `product_brands.id` | Penghubung komoditas dan brand produk. |
| `province_potentials` | Nilai potensi suatu brand produk pada provinsi. | `id` | `province_id` -> `provinces.id`; `product_brand_id` -> `product_brands.id` | Penghubung provinsi dan brand produk. |
| `regency_potentials` | Nilai potensi suatu brand produk pada kabupaten/kota. | `id` | `regency_id` -> `regencies.id`; `product_brand_id` -> `product_brands.id` | Penghubung regency dan brand; endpoint aktif belum ditemukan. |
| `stalls` | Data kios, alamat, wilayah, koordinat, pemilik, kontak, dan kriteria. | `id` | `province_id` -> `provinces.id`; `regency_id` -> `regencies.id` | Stall berada pada provinsi/regency dan memiliki banyak brand melalui tabel penghubung. |
| `stall_product_brands` | Tabel penghubung many-to-many stall dan brand produk. | `id` | `stall_id` -> `stalls.id`; `product_brand_id` -> `product_brands.id` | Banyak stall dapat menjual banyak brand. |
| `daily_sales` | Data penjualan harian, kuantitas, pendapatan, target, dan realisasi. | `id` | `product_brand_id` -> `product_brands.id`; `province_id` belum didefinisikan FK | Banyak data penjualan dimiliki satu brand; relasi provinsi perlu diperkuat. |
| `sales_realizations` | Rekap realisasi dan RKAP harian, bulanan, YTD, serta tahunan per brand. | `id` | `product_brand_id` -> `product_brands.id` | Banyak laporan realisasi dimiliki satu brand produk. |

## Catatan Integritas Database

- Kombinasi seperti `(province_id, land_type_id, year)` dan `(stall_id, product_brand_id)` belum terdokumentasi memiliki unique constraint.
- `daily_sales.province_id` belum menjadi foreign key pada schema yang dianalisis.
- `product_dosages` tidak memiliki `updated_at` menurut dokumentasi schema.
- Migration dan schema `daily_sales` serta `sales_realizations` terindikasi tidak sinkron.
- Migration memiliki typo `realizaton_ytd`, sedangkan schema memakai `realization_ytd`; kondisi database aktual **[PERLU VERIFIKASI]**.

# MODULE ANALYSIS

| Modul | Fungsi | Data yang dikelola | Relasi utama | Peran backend |
| --- | --- | --- | --- | --- |
| Authentication | Login, signup, session, dan current user. | `user`, `account`, `session`, `verification` | User-account-session | Better Auth handler, session context, auth client, dan cookie. |
| API Infrastructure | Menyatukan kontrak API client-server. | Context DB/session dan router procedure | Seluruh modul | Menyediakan public/protected procedure, validasi input, RPC, dan OpenAPI. |
| Province | CRUD master provinsi. | Kode, nama, luas, tahun | Parent regency, land, commodity, potential, stall | Validasi, search, pagination, create, update, delete. |
| Regency | CRUD master kabupaten/kota. | Kode, nama, provinsi, luas, tahun | Province; parent land, commodity, potential, stall | CRUD dan query join provinsi. |
| Land Type | CRUD jenis lahan. | Nama dan tahun | Province/regency land; commodity type | CRUD data master. |
| Province Land | CRUD lahan tingkat provinsi. | Provinsi, jenis lahan, luas, tahun | Province dan land type | CRUD, filter, join, dan response list. |
| Regency Land | Membaca lahan tingkat kabupaten. | Regency, jenis lahan, luas, tahun | Regency dan land type | Query filter/pagination; create/update/delete belum aktif. |
| Commodity Type | CRUD jenis komoditas. | Jenis lahan, nama, tahun | Land type; province/regency commodity; dosage | CRUD, search, dan filter land type. |
| Province Commodity | Membaca komoditas provinsi. | Provinsi, komoditas, luas, tahun | Province dan commodity type | Query join/filter; create/update/delete belum aktif. |
| Regency Commodity | CRUD komoditas kabupaten. | Regency, komoditas, luas, tahun | Regency dan commodity type | CRUD dan query join. |
| Product Type | CRUD jenis produk. | Nama, deskripsi, tahun | Parent product brand | CRUD dan penanganan konflik duplikasi. |
| Product Brand | CRUD brand produk. | Product type, nama, industri, deskripsi | Product type; dosage, potential, sales, stall | CRUD, search, filter, dan join. |
| Product Dosage | CRUD dosis produk per komoditas. | Komoditas, brand, dosis, unit, tahun | Commodity type dan product brand | CRUD, filter, validasi, dan join. |
| Province Potential | Membaca potensi produk provinsi. | Provinsi, brand, nilai, deskripsi, tahun | Province dan product brand | Query join/filter; create/update/delete belum aktif. |
| Regency Potential | Menyimpan potensi produk kabupaten pada database. | Regency, brand, nilai, deskripsi, tahun | Regency dan product brand | Endpoint/router aktif belum ditemukan. |
| Sales Realization | CRUD rekap realisasi penjualan. | Tanggal laporan, brand, realisasi, RKAP | Product brand | CRUD, validasi, filter, pagination, dan join. |
| Daily Sales | CRUD penjualan harian. | Tanggal, brand, provinsi, qty, revenue, target, realisasi | Product brand; province belum FK | CRUD, validasi, filter, pagination, dan join. |
| Stall | CRUD kios dan assignment brand. | Lokasi, wilayah, koordinat, pemilik, kontak, kriteria | Province, regency, product brand | CRUD, join wilayah, dan sinkronisasi assignment brand. |
| User Management | Mengelola user dan role. | Nama, email, image, role | Tabel auth | Get list/detail, update, delete; create mandiri belum jelas. |
| Map and GeoJSON | Menampilkan wilayah dan data terkait pada peta. | GeoJSON serta data domain yang dipakai halaman peta | Province/regency dan data bisnis | Menyediakan data melalui API; rendering utama dilakukan frontend. |
| Internationalization | Menyediakan bahasa Inggris dan Indonesia. | Katalog pesan dan locale | Root route dan komponen UI | Middleware locale dan pemuatan katalog. |
| Todo Demo | Contoh CRUD bawaan template. | Teks dan status todo | Tidak terkait domain utama | Get, create, toggle, delete; bukan modul bisnis inti. |

# FITUR YANG DIKERJAKAN MAHASISWA

Dokumentasi membuktikan aktivitas analisis dan dokumentasi, tetapi tidak memuat identitas commit, pull request, tiket, logbook, atau pemetaan perubahan kode ke mahasiswa. Karena itu, jangan mengklaim implementasi fitur aplikasi tanpa bukti tambahan.

## Fitur yang Dikembangkan

- Dokumentasi teknis backend: arsitektur, database, API, authentication, authorization, dan proses bisnis.
- Pemetaan procedure oRPC serta pengelompokan endpoint berdasarkan domain.
- Dokumentasi PK, FK, relasi tabel, dan ERD tekstual.
- Matriks permission role dan identifikasi status kesiapan modul.
- Bahan proposal, laporan, presentasi, serta rekomendasi pengembangan.
- Fitur aplikasi yang secara langsung dikembangkan mahasiswa: **[PERLU VERIFIKASI]** melalui commit, pull request, tiket, atau konfirmasi pembimbing.

## Fitur yang Diperbaiki

Dokumentasi hanya menyebut rekomendasi perbaikan, bukan bukti bahwa perbaikannya telah diimplementasikan. Status berikut harus ditulis sebagai temuan/rekomendasi sampai ada bukti:

- Role-based `adminProcedure` untuk menutup gap authorization API: **[PERLU VERIFIKASI]**.
- Sinkronisasi migration dengan schema: **[PERLU VERIFIKASI]**.
- Standardisasi response, error handling, pagination, dan pemisahan router/schema: **[PERLU VERIFIKASI]**.
- Penambahan test API dan validasi yang lebih ketat: **[PERLU VERIFIKASI]**.
- Bug atau fitur kode lain yang benar-benar diperbaiki mahasiswa: **[PERLU VERIFIKASI]**.

## Fitur yang Dipelajari

Berdasarkan kontribusi analisis yang terdokumentasi, topik yang dipelajari meliputi:

- Arsitektur full-stack TanStack Start dan feature-colocated routes.
- Alur request browser -> oRPC -> Drizzle -> PostgreSQL.
- Public dan protected procedure pada oRPC.
- Schema serta relasi database PostgreSQL dengan Drizzle ORM.
- Better Auth, session management, route guard, dan authorization gap.
- CRUD wilayah, lahan, komoditas, produk, penjualan, stall, dan user.
- Validasi Zod, search, filter, pagination, serta query join.
- Pemetaan Leaflet/React Leaflet dengan GeoJSON.
- Build, lint, test, Docker, serta opsi deployment. Tingkat praktik langsung setiap topik **[PERLU VERIFIKASI]**.

# SCREENSHOT PLAN

Target berikut berisi **60 screenshot**. Setiap screenshot data sensitif wajib menyamarkan token, password, cookie, email pribadi, dan nilai environment variable.

| No | Screenshot | Lokasi Laporan |
| -- | ---------- | -------------- |
| 1 | Struktur root repository | BAB III - Struktur Proyek |
| 2 | Struktur folder `apps/web` | BAB III - Struktur Proyek |
| 3 | Struktur `apps/web/src/routes` | BAB III - Arsitektur Route |
| 4 | Struktur `apps/web/src/lib` | BAB III - Infrastruktur |
| 5 | Struktur folder schema Drizzle | BAB III - Database |
| 6 | Struktur folder migration | BAB III - Database |
| 7 | Terminal `bun install` berhasil | BAB III - Persiapan Lingkungan |
| 8 | Terminal development server berjalan | BAB III - Persiapan Lingkungan |
| 9 | Output production build | BAB IV - Pengujian Build |
| 10 | Output lint/check | BAB IV - Pengujian Kualitas |
| 11 | Output test Vitest | BAB IV - Pengujian |
| 12 | Konfigurasi environment tanpa nilai secret | BAB III - Konfigurasi |
| 13 | Halaman publik utama | BAB IV - Hasil Implementasi |
| 14 | Halaman login | BAB IV - Authentication |
| 15 | Halaman signup | BAB IV - Authentication |
| 16 | Pesan gagal login | BAB IV - Pengujian Authentication |
| 17 | Login berhasil/redirect | BAB IV - Pengujian Authentication |
| 18 | Guest ditolak dari `/admin` | BAB IV - Authorization |
| 19 | Admin berhasil membuka dashboard | BAB IV - Authorization |
| 20 | Session di browser DevTools dengan token disensor | BAB IV - Authentication |
| 21 | Dashboard admin | BAB IV - Dashboard |
| 22 | Sidebar seluruh menu admin | BAB IV - Dashboard |
| 23 | Header dan profil user | BAB IV - Dashboard |
| 24 | Daftar province | BAB IV - Modul Wilayah |
| 25 | Form tambah province | BAB IV - Modul Wilayah |
| 26 | Form edit province | BAB IV - Modul Wilayah |
| 27 | Dialog hapus province | BAB IV - Modul Wilayah |
| 28 | Daftar regency dan relasi province | BAB IV - Modul Wilayah |
| 29 | Form tambah/edit regency | BAB IV - Modul Wilayah |
| 30 | Daftar land type | BAB IV - Modul Lahan |
| 31 | Form CRUD land type | BAB IV - Modul Lahan |
| 32 | Daftar province land | BAB IV - Modul Lahan |
| 33 | Form province land | BAB IV - Modul Lahan |
| 34 | Daftar regency land read-only | BAB IV - Modul Lahan |
| 35 | Daftar commodity type | BAB IV - Modul Komoditas |
| 36 | Form CRUD commodity type | BAB IV - Modul Komoditas |
| 37 | Daftar province commodity read-only | BAB IV - Modul Komoditas |
| 38 | Daftar regency commodity | BAB IV - Modul Komoditas |
| 39 | Form regency commodity | BAB IV - Modul Komoditas |
| 40 | Daftar product type | BAB IV - Modul Produk |
| 41 | Form CRUD product type | BAB IV - Modul Produk |
| 42 | Daftar product brand | BAB IV - Modul Produk |
| 43 | Form CRUD product brand | BAB IV - Modul Produk |
| 44 | Daftar product dosage | BAB IV - Modul Produk |
| 45 | Form CRUD product dosage | BAB IV - Modul Produk |
| 46 | Daftar province potential | BAB IV - Modul Potensi |
| 47 | Daftar sales realization | BAB IV - Modul Penjualan |
| 48 | Form CRUD sales realization | BAB IV - Modul Penjualan |
| 49 | Daftar daily sales | BAB IV - Modul Penjualan |
| 50 | Form CRUD daily sales | BAB IV - Modul Penjualan |
| 51 | Daftar stall beserta wilayah | BAB IV - Modul Stall |
| 52 | Form CRUD stall | BAB IV - Modul Stall |
| 53 | Modal assignment brand ke stall | BAB IV - Modul Stall |
| 54 | Daftar user | BAB IV - User Management |
| 55 | Form edit role user | BAB IV - User Management |
| 56 | Halaman peta Indonesia | BAB IV - Peta |
| 57 | Filter/sidebar peta | BAB IV - Peta |
| 58 | Marker/layer wilayah atau stall jika tersedia | BAB IV - Peta |
| 59 | Daftar tabel di Drizzle Studio/DB client | BAB IV - Validasi Database |
| 60 | OpenAPI/API response dan validation error | BAB IV - Pengujian API |

# DIAGRAM PLAN

1. Diagram konteks sistem: pengunjung, guest, viewer, admin, dan Satu Peta Pasar.
2. Diagram arsitektur high-level browser, TanStack Start, oRPC, Better Auth, Drizzle, dan PostgreSQL.
3. Deployment diagram untuk browser, hosting aplikasi, database managed/local, dan aset GeoJSON.
4. Entity Relationship Diagram lengkap untuk 22 tabel.
5. ERD domain autentikasi: `user`, `session`, `account`, `verification`.
6. ERD domain wilayah/lahan/komoditas.
7. ERD domain produk/potensi.
8. ERD domain stall dan product brand.
9. ERD domain penjualan.
10. Sequence diagram login dan pembuatan session.
11. Sequence diagram pengecekan akses route admin.
12. Sequence diagram query list melalui TanStack Query dan oRPC.
13. Sequence diagram mutation CRUD dan invalidasi cache.
14. Activity diagram proses pengelolaan data master.
15. Activity diagram pencatatan penjualan.
16. Activity diagram assignment brand produk ke stall.
17. Data flow diagram level 0.
18. Data flow diagram level 1 untuk admin dashboard.
19. Diagram struktur folder/layer proyek.
20. Diagram aliran validasi UI -> Zod -> constraint database.

# BAB III PLAN

## 3.1 Gambaran Umum Sistem

- **Isi:** latar teknis Satu Peta Pasar, ruang lingkup, pengguna, dan tujuan digitalisasi data pasar.
- **Gambar yang dibutuhkan:** diagram konteks sistem dan screenshot halaman utama.
- **Target halaman:** 2-3 halaman.

## 3.2 Analisis Kebutuhan Sistem

- **Isi:** kebutuhan fungsional per modul dan kebutuhan nonfungsional seperti type safety, keamanan, aksesibilitas, validasi, dan maintainability.
- **Gambar yang dibutuhkan:** use-case/diagram konteks dan matriks role.
- **Target halaman:** 3-4 halaman.

## 3.3 Arsitektur Sistem

- **Isi:** monolit full-stack `apps/web`, pembagian frontend/backend, komunikasi client-server, dan alasan perbedaan dengan deskripsi template `apps/server`.
- **Gambar yang dibutuhkan:** diagram arsitektur high-level dan deployment diagram.
- **Target halaman:** 4-5 halaman.

## 3.4 Technology Stack

- **Isi:** fungsi React, TanStack Start/Router/Query/Form, oRPC, Zod, Better Auth, Drizzle, PostgreSQL, Tailwind, Leaflet, Bun, Vite, dan Turborepo.
- **Gambar yang dibutuhkan:** diagram pengelompokan stack dan screenshot dependency/config terkait.
- **Target halaman:** 4-5 halaman.

## 3.5 Struktur Proyek dan Layer

- **Isi:** root workspace, `apps/web`, route-colocation, folder `-app`, `-domain`, `-components`, serta folder infrastruktur `lib`.
- **Gambar yang dibutuhkan:** screenshot struktur root, `apps/web/src`, route, dan lib; diagram dependency layer.
- **Target halaman:** 4-5 halaman.

## 3.6 Perancangan Database

- **Isi:** seluruh 22 tabel, fungsi, kolom kunci, PK/FK, relasi, constraint, dan catatan mismatch migration/schema.
- **Gambar yang dibutuhkan:** ERD lengkap dan lima ERD per domain; screenshot schema dan migration.
- **Target halaman:** 8-10 halaman.

## 3.7 Perancangan API

- **Isi:** oRPC router, public/protected procedure, context, endpoint transport, input/output, validasi Zod, query, mutation, dan error handling.
- **Gambar yang dibutuhkan:** sequence query, sequence mutation, dan screenshot struktur oRPC/OpenAPI.
- **Target halaman:** 5-6 halaman.

## 3.8 Perancangan Authentication dan Authorization

- **Isi:** Better Auth, email/password, user-account-session, cookie, route guard, role admin/viewer/guest, serta gap authorization pada API.
- **Gambar yang dibutuhkan:** sequence login, sequence route guard, ERD auth, dan matriks permission.
- **Target halaman:** 4-5 halaman.

## 3.9 Perancangan Modul Bisnis

- **Isi:** wilayah, lahan, komoditas, produk, potensi, penjualan, stall, user, map, dan status CRUD/read-only setiap modul.
- **Gambar yang dibutuhkan:** activity diagram CRUD, sales, assignment brand, dan peta dependensi modul.
- **Target halaman:** 7-9 halaman.

## 3.10 Perancangan Antarmuka dan Peta

- **Isi:** pola dashboard, sidebar, form/dialog, tabel, state management, Leaflet, dan data GeoJSON.
- **Gambar yang dibutuhkan:** wireflow halaman admin dan diagram sumber data peta.
- **Target halaman:** 3-4 halaman.

## 3.11 Konfigurasi Build, Testing, dan Deployment

- **Isi:** Bun, Vite, Biome/Ultracite, Vitest, Docker, Netlify, Vercel, GitHub Actions, serta environment variable.
- **Gambar yang dibutuhkan:** deployment diagram dan screenshot konfigurasi tanpa secret.
- **Target halaman:** 3-4 halaman.

## 3.12 Metodologi Pengerjaan Magang

- **Isi:** onboarding, setup, analisis source code, dokumentasi DB/API, testing manual, security review, rekomendasi, dan pelaporan. Aktivitas aktual harus dicocokkan dengan logbook **[PERLU VERIFIKASI]**.
- **Gambar yang dibutuhkan:** timeline/Gantt kegiatan dan dokumentasi proses.
- **Target halaman:** 3-4 halaman.

**Target total BAB III: 50-64 halaman.** Jika format kampus membatasi BAB III, bagian detail tabel/API dapat dipindahkan ke lampiran.

# BAB IV PLAN

## 4.1 Hasil Setup dan Menjalankan Sistem

- **Screenshot yang dibutuhkan:** instalasi dependency, dev server, halaman utama, dan dashboard.
- **Penjelasan:** prasyarat, konfigurasi environment, proses menjalankan aplikasi, dan hasil akses awal.
- **Target halaman:** 2-3 halaman.

## 4.2 Hasil Authentication dan Authorization

- **Screenshot yang dibutuhkan:** login, signup, gagal login, login sukses, guest ditolak, admin diterima, session tersensor.
- **Penjelasan:** alur Better Auth, session, role default, route guard, dan gap pengecekan role pada API.
- **Target halaman:** 4-5 halaman.

## 4.3 Hasil Modul Wilayah

- **Screenshot yang dibutuhkan:** list/create/edit/delete province serta list/form regency.
- **Penjelasan:** validasi kode, relasi province-regency, search/pagination, dan operasi CRUD.
- **Target halaman:** 4-5 halaman.

## 4.4 Hasil Modul Lahan

- **Screenshot yang dibutuhkan:** land type, province land, form terkait, dan regency land read-only.
- **Penjelasan:** relasi jenis lahan-wilayah, data area/tahun, CRUD aktif, dan batasan regency land.
- **Target halaman:** 3-4 halaman.

## 4.5 Hasil Modul Komoditas

- **Screenshot yang dibutuhkan:** commodity type, province commodity read-only, regency commodity dan form.
- **Penjelasan:** relasi land type-komoditas-wilayah serta perbedaan status CRUD tiap tingkat wilayah.
- **Target halaman:** 3-4 halaman.

## 4.6 Hasil Modul Produk dan Potensi

- **Screenshot yang dibutuhkan:** product type, product brand, product dosage, seluruh form, dan province potential.
- **Penjelasan:** hierarki produk, dosis per komoditas, potensi per wilayah, serta modul potential yang belum lengkap.
- **Target halaman:** 5-6 halaman.

## 4.7 Hasil Modul Penjualan

- **Screenshot yang dibutuhkan:** list/form sales realization dan daily sales.
- **Penjelasan:** metrik realisasi/RKAP, data penjualan harian, filter, pagination, relasi brand, dan catatan schema/migration.
- **Target halaman:** 4-5 halaman.

## 4.8 Hasil Modul Stall

- **Screenshot yang dibutuhkan:** list, create/edit/delete stall, dan assignment product brand.
- **Penjelasan:** data lokasi, koordinat, owner, kontak, kriteria, join wilayah, dan relasi many-to-many brand.
- **Target halaman:** 4-5 halaman.

## 4.9 Hasil User Management

- **Screenshot yang dibutuhkan:** daftar user, edit role, dan dialog delete.
- **Penjelasan:** data yang dikelola, role admin/viewer/guest, operasi aktif, dan keterbatasan create user.
- **Target halaman:** 2-3 halaman.

## 4.10 Hasil Visualisasi Peta

- **Screenshot yang dibutuhkan:** peta Indonesia, filter/sidebar, layer wilayah, dan marker stall jika data tersedia.
- **Penjelasan:** sumber GeoJSON, Leaflet, hubungan data wilayah dengan visualisasi, serta ketergantungan data.
- **Target halaman:** 3-4 halaman.

## 4.11 Hasil Pengujian API dan Database

- **Screenshot yang dibutuhkan:** OpenAPI/response RPC, health check, unauthorized request, validation error, Drizzle Studio, dan daftar tabel.
- **Penjelasan:** skenario uji, input, hasil aktual, expected result, constraint, dan temuan integritas data.
- **Target halaman:** 5-6 halaman.

## 4.12 Hasil Build dan Quality Check

- **Screenshot yang dibutuhkan:** output build, lint/check, test, dan deployment log jika tersedia.
- **Penjelasan:** command, hasil, error yang ditemukan, cakupan pengujian, dan keterbatasan pipeline. Hasil aktual **[PERLU VERIFIKASI]**.
- **Target halaman:** 3-4 halaman.

## 4.13 Kontribusi Mahasiswa

- **Screenshot yang dibutuhkan:** commit/PR/tiket, dokumentasi yang dibuat, dan logbook. Bukti belum tersedia pada sumber **[PERLU VERIFIKASI]**.
- **Penjelasan:** pisahkan pekerjaan implementasi, perbaikan, analisis, dokumentasi, dan pembelajaran; klaim harus terhubung ke bukti.
- **Target halaman:** 3-4 halaman.

## 4.14 Kendala, Temuan, dan Rekomendasi

- **Screenshot yang dibutuhkan:** bukti mismatch schema/migration atau error yang aman ditampilkan.
- **Penjelasan:** authorization API, sinkronisasi migration, FK/unique constraint, response/pagination, test coverage, dan usulan perbaikan.
- **Target halaman:** 3-4 halaman.

**Target total BAB IV: 48-62 halaman.** Untuk target laporan keseluruhan 70-100 halaman, pilih kedalaman pembahasan dan pindahkan bukti repetitif ke lampiran.

# ESTIMASI HALAMAN

| Bagian | Target halaman |
| --- | ---: |
| Bagian awal: sampul, pengesahan, abstrak, kata pengantar, daftar isi/gambar/tabel | 8-12 |
| BAB I Pendahuluan | 6-8 |
| BAB II Profil Perusahaan dan Landasan Teori | 10-14 |
| BAB III Analisis dan Perancangan (versi ringkas dari plan) | 22-28 |
| BAB IV Hasil dan Pembahasan (versi ringkas dari plan) | 22-28 |
| BAB V Penutup | 3-4 |
| Daftar pustaka | 2-3 |
| Lampiran bukti kegiatan dan screenshot tambahan | 8-15 |
| **Total estimasi** | **81-112** |

Untuk memenuhi target akhir **70-100 halaman**, gunakan target operasional berikut:

- Naskah utama: 65-80 halaman.
- Lampiran terpilih: 10-15 halaman.
- Total ideal: 75-95 halaman.
- Hindari memasukkan seluruh 60 screenshot ke badan utama; tempatkan 25-35 screenshot paling penting pada BAB III/IV dan sisanya pada lampiran.

# DAFTAR VERIFIKASI SEBELUM PENULISAN FINAL

- Identitas mahasiswa, NBI, perusahaan, departemen, periode, pembimbing, dan judul final.
- Konfirmasi nama resmi sistem dari perusahaan.
- Logbook kegiatan aktual per hari/minggu.
- Commit, pull request, tiket, atau bukti fitur yang dikerjakan mahasiswa.
- Status implementasi rekomendasi security, migration, pagination, dan testing.
- Kondisi database deployment aktual serta kesesuaian migration-schema.
- Platform deployment yang benar-benar digunakan.
- Hak akses final role viewer dan guest.
- Hasil build, lint, test, dan pengujian API aktual.
- Persetujuan penggunaan screenshot dan penyamaran data sensitif.
