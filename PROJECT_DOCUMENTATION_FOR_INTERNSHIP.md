# Dokumentasi Proyek untuk Kebutuhan Magang

## Identitas Dokumen

| Item | Keterangan |
| --- | --- |
| Nama dokumen | `PROJECT_DOCUMENTATION_FOR_INTERNSHIP.md` |
| Bahasa | Indonesia |
| Tujuan | Bahan proposal magang, laporan magang, presentasi akhir magang, dan dokumentasi akademik |
| Basis analisis | Source code proyek di `D:\satu-peta-pasar-master` |
| Catatan penting | Dokumentasi ini menjelaskan fitur yang ditemukan di source code. Bagian yang belum pasti diberi label asumsi atau catatan. |

## Panduan Penggunaan Dokumen

Dokumen ini dirancang sebagai sumber utama untuk empat kebutuhan akademik dan teknis:

| Kebutuhan | Bagian yang paling relevan |
| --- | --- |
| Proposal magang | Executive Summary, Project Overview, Technology Stack, Business Process Analysis, Internship Report Assets. |
| Laporan magang | Semua bagian, terutama Database Documentation, Backend Module Documentation, API Documentation, Security Analysis, Daily Activities, dan Contributions. |
| Presentasi akhir | Executive Summary, System Architecture, Authentication Flow, CRUD Modules, Business Process, Challenges, Future Recommendations, dan Slide Outline. |
| Dokumentasi teknis internal | Folder Structure, Database Documentation, API Documentation, Feature-by-Feature Deep Analysis, Refactor Roadmap, Evidence Checklist. |

Cara membaca dokumen:

1. Mulai dari Executive Summary untuk memahami konteks bisnis.
2. Lanjut ke Project Overview dan Technology Stack untuk memahami sistem secara umum.
3. Gunakan Folder Structure, System Architecture, dan Database Documentation untuk memahami struktur teknis.
4. Gunakan API Documentation dan Feature-by-Feature Deep Analysis untuk memahami backend secara detail.
5. Gunakan Daily/Weekly Activities dan Internship Contributions untuk menyusun narasi laporan magang.
6. Gunakan Evidence Collection Checklist untuk menyiapkan lampiran bukti kegiatan.

## Daftar Isi Ringkas

| Bagian | Judul |
| --- | --- |
| 1 | Executive Summary |
| 2 | Project Overview |
| 3 | Technology Stack |
| 4 | Complete Folder Structure |
| 5 | System Architecture |
| 6 | User Roles and Permissions |
| 7 | Database Documentation |
| 8 | Entity Relationship Analysis |
| 9 | Backend Module Documentation |
| 10 | API Documentation |
| 11 | Authentication and Authorization |
| 12 | Business Process Analysis |
| 13 | Backend Developer Responsibilities |
| 14 | Challenges and Solutions |
| 15 | Security Analysis |
| 16 | Testing Strategy |
| 17 | Future Development Recommendations |
| 18 | Internship Report Assets |
| 23-29 | Deep Dive Backend, CRUD, Migration, Auth, Domain, Infrastructure, Testing |
| 30-35 | Academic Report Material, Presentation Outline, Risks, Roadmap, Academic Notes |
| 36 | Feature-by-Feature Deep Analysis |
| 37-40 | Daily Activities, Weekly Activities, Contributions, Evidence Checklist |

## Ringkasan Temuan Utama

| Area | Temuan utama | Dampak terhadap laporan magang |
| --- | --- | --- |
| Struktur proyek | Implementasi aktif berada di `apps/web`; folder `apps/server` dan `packages` tidak ditemukan. | Laporan harus menjelaskan bahwa backend berjalan melalui TanStack Start server routes, bukan service backend terpisah. |
| Backend API | API utama memakai oRPC dengan `publicProcedure` dan `protectedProcedure`. | Cocok untuk menjelaskan API type-safe dan integrasi TanStack Query. |
| Database | PostgreSQL dan Drizzle ORM digunakan untuk schema dan query. | Cocok untuk pembahasan database design dan ERD. |
| Auth | Better Auth digunakan untuk email/password dan session. | Cocok untuk pembahasan authentication flow. |
| Authorization | Route `/admin` membatasi role `admin`, tetapi API admin hanya mengecek session. | Cocok sebagai temuan security dan rekomendasi backend intern. |
| CRUD | Banyak modul CRUD sudah tersedia, tetapi beberapa masih read-only atau belum lengkap. | Cocok untuk laporan kontribusi analisis backend dan rekomendasi pengembangan. |
| Migration | Ada indikasi schema dan migration belum sepenuhnya sinkron. | Cocok untuk pembahasan tantangan database. |
| Deployment | Ada Docker, Netlify, Vercel, dan GitHub workflow ping Supabase. | Cocok untuk pembahasan infrastruktur dengan catatan bahwa CI/CD build-test belum lengkap. |

## 1. Executive Summary

### 1.1 Nama Proyek

Nama folder proyek adalah `satu-peta-pasar-master`. Di konfigurasi paket, nama teknis root masih `my-better-t-app-2`, sedangkan README bawaan masih merujuk ke template `Betterz Stack Template`. Berdasarkan struktur fitur aktual, domain bisnis aplikasi ini lebih tepat didokumentasikan sebagai **Satu Peta Pasar**, yaitu aplikasi web untuk pemetaan data wilayah, komoditas, produk, potensi pasar, kios/stall, dan realisasi penjualan.

### 1.2 Tujuan Utama

Tujuan utama sistem adalah menyediakan aplikasi digital berbasis web yang membantu pengelolaan dan visualisasi data pasar secara terpusat. Sistem menggabungkan fitur administrasi data master, pemetaan geografis, pengelolaan produk dan komoditas, pencatatan realisasi penjualan, serta informasi kios/stall dalam satu aplikasi.

Fokus sistem yang terlihat dari kode adalah:

| Area | Tujuan |
| --- | --- |
| Pemetaan wilayah | Menyediakan peta berbasis data provinsi/kabupaten dan GeoJSON Indonesia. |
| Data administrasi | Mengelola provinsi, kabupaten/kota, jenis lahan, komoditas, produk, dan brand produk. |
| Potensi pasar | Menampilkan potensi produk berdasarkan wilayah. |
| Kios/stall | Mengelola lokasi kios/stall, kontak pemilik, kriteria, dan produk yang dijual. |
| Penjualan | Mengelola data realisasi penjualan dan penjualan harian. |
| Pengguna | Mengelola user dan role melalui panel admin. |

### 1.3 Business Objectives

Sasaran bisnis yang dapat disimpulkan dari source code adalah:

1. Menyatukan data pasar dan data wilayah agar dapat diakses dari satu aplikasi web.
2. Mempermudah admin dalam mengelola data wilayah, lahan, komoditas, produk, dan penjualan.
3. Menyediakan tampilan peta interaktif untuk membantu analisis persebaran pasar.
4. Membantu pemantauan realisasi penjualan per produk/brand.
5. Membantu inventarisasi kios/stall dan relasi produk yang tersedia pada kios.
6. Menyediakan struktur sistem yang type-safe melalui TypeScript, oRPC, Zod, dan Drizzle ORM.

### 1.4 Problems Solved

Masalah yang diselesaikan sistem:

| Masalah | Solusi dalam sistem |
| --- | --- |
| Data wilayah, produk, komoditas, dan penjualan tersebar | Disediakan modul admin yang mengelola data secara terpusat. |
| Analisis wilayah sulit dilakukan jika hanya menggunakan tabel | Disediakan modul peta dengan Leaflet dan data GeoJSON. |
| Input data rawan tidak konsisten | Digunakan validasi Zod pada endpoint dan form. |
| Akses admin perlu dibatasi | Digunakan Better Auth, session, dan guard route admin berbasis role `admin`. |
| Query API rawan tidak sinkron dengan tipe frontend | Digunakan oRPC untuk type-safe API dan TanStack Query untuk data fetching. |
| Perubahan skema database perlu terdokumentasi | Digunakan Drizzle schema dan folder migrations. |

### 1.5 Target Users

Target user yang ditemukan dari struktur source code:

| User | Deskripsi |
| --- | --- |
| Admin | Pengguna internal yang dapat masuk ke panel `/admin` dan mengelola data master serta transaksi. |
| Viewer | Role ditemukan di kode user management dan header, tetapi akses admin penuh tidak diberikan oleh guard `/admin`. Viewer diasumsikan untuk akses baca terbatas atau akses menu tertentu di masa depan. |
| Guest | Role default untuk user baru. Tidak mendapat akses admin. |
| Pengunjung umum | Dapat membuka halaman publik seperti home, peta, produk, potensi produk, realisasi penjualan publik, dan auth page. |

### 1.6 Expected Benefits

Manfaat yang diharapkan:

1. Pengelolaan data menjadi lebih rapi karena modul data master tersedia dalam panel admin.
2. Proses validasi data lebih baik karena input dicek menggunakan schema Zod.
3. Data peta dan data bisnis dapat saling dikaitkan melalui provinsi/kabupaten.
4. Admin dapat memantau data kios/stall dan realisasi penjualan secara lebih cepat.
5. Struktur aplikasi mendukung pengembangan lanjutan karena memakai TypeScript, Drizzle ORM, TanStack Router, TanStack Query, dan oRPC.
6. Aplikasi dapat dikembangkan menjadi dashboard analitik pasar berbasis wilayah.

## 2. Project Overview

### 2.1 System Background

Sistem ini dibangun sebagai aplikasi full-stack TypeScript berbasis TanStack Start. Walaupun catatan Better-T-Stack menyebut kemungkinan struktur `apps/server`, source code aktual tidak memiliki `apps/server`; backend API, autentikasi, server route, database schema, dan frontend berada di `apps/web`.

Secara domain, aplikasi mengarah ke kebutuhan pemetaan pasar. Source code memiliki modul:

1. `map`: peta marketing/pemetaan administratif.
2. `admin/region`: data provinsi dan kabupaten/kota.
3. `admin/land`: jenis lahan, lahan provinsi, dan lahan kabupaten.
4. `admin/commodity`: jenis komoditas, komoditas provinsi, komoditas kabupaten.
5. `admin/product`: jenis produk, brand produk, dan dosis produk.
6. `admin/potential`: potensi produk per provinsi.
7. `admin/sale`: realisasi penjualan dan penjualan harian.
8. `admin/stall`: data kios/stall dan relasi produk brand.
9. `admin/user`: manajemen user dan role.
10. `auth`: login dan signup.

### 2.2 Why the System Was Built

Berdasarkan modul yang ada, sistem dibuat untuk menjawab kebutuhan pengelolaan data pasar berbasis wilayah. Data yang dikelola bukan hanya daftar produk, tetapi juga konteks geografis dan potensi pemasaran. Kombinasi ini menunjukkan kebutuhan untuk:

1. Melihat potensi produk berdasarkan wilayah.
2. Menghubungkan komoditas dan jenis lahan dengan produk.
3. Melacak realisasi penjualan produk.
4. Mengetahui persebaran kios/stall.
5. Menyediakan panel admin agar data dapat diperbarui tanpa mengubah source code.

### 2.3 Current Business Process

Proses bisnis manual yang dapat diasumsikan dari modul sistem:

1. Data wilayah dikumpulkan dari sumber administratif dan/atau file peta.
2. Data jenis lahan dan komoditas dicatat per wilayah.
3. Data produk dan brand produk disimpan dalam daftar terpisah.
4. Potensi produk dihitung atau dicatat berdasarkan wilayah.
5. Realisasi penjualan dicatat berkala.
6. Data kios/stall didata bersama lokasi, pemilik, kontak, dan produk yang tersedia.
7. Admin perlu melakukan pembaruan data dan memeriksa hasilnya melalui tabel atau peta.

### 2.4 Proposed Digital Solution

Solusi digital yang disediakan:

| Kebutuhan | Implementasi |
| --- | --- |
| Login dan session | Better Auth dengan email/password. |
| API type-safe | oRPC router di `apps/web/src/lib/orpc/router/index.ts`. |
| Data fetching frontend | TanStack Query melalui client oRPC. |
| Routing | TanStack Router file-based route. |
| Validasi input | Zod schema di folder `-domain` dan `.input(...)` oRPC. |
| Database | PostgreSQL dengan Drizzle ORM. |
| Peta | Leaflet, React Leaflet, GeoJSON wilayah Indonesia. |
| Admin dashboard | Route `/admin` dengan layout sidebar dan menu modul. |
| Manajemen role | Field `role` pada tabel `user`, role `admin`, `viewer`, `guest`. |

### 2.5 Scope of Implementation

Ruang lingkup implementasi yang sudah tampak pada source code:

| Scope | Status di kode |
| --- | --- |
| Autentikasi email/password | Ada melalui Better Auth. |
| Signup dan login UI | Ada di `routes/auth`. |
| Admin route guard | Ada, hanya role `admin` yang lolos ke `/admin`. |
| CRUD provinsi | Ada. |
| CRUD kabupaten/regency | Ada. |
| CRUD jenis lahan | Ada. |
| CRUD lahan provinsi | Ada. |
| Read lahan kabupaten | Ada endpoint get; create/update/delete belum aktif di router. |
| CRUD jenis komoditas | Ada. |
| Read komoditas provinsi | Ada endpoint get; create/update/delete belum aktif di router. |
| CRUD komoditas kabupaten | Ada. |
| CRUD jenis produk | Ada. |
| CRUD brand produk | Ada. |
| CRUD dosis produk | Ada. |
| Read potensi provinsi | Ada endpoint get; create/update/delete belum aktif di router. |
| Potensi kabupaten | Tabel ada, endpoint router belum aktif. |
| CRUD realisasi penjualan | Ada. |
| CRUD penjualan harian | Ada. |
| CRUD stall | Ada. |
| Assign product brand ke stall | Ada. |
| Manajemen user | Read, get by id, update, delete; create user UI tampak belum digunakan penuh. |
| Peta interaktif | Ada komponen map dan static GeoJSON. |
| Testing otomatis | Vitest tersedia, tetapi test bisnis tidak tampak dominan. |

## 3. Technology Stack

### 3.1 Frontend

| Kategori | Teknologi | Bukti source code |
| --- | --- | --- |
| Framework | React 19 dan TanStack Start | `apps/web/package.json`, `src/client.tsx`, `src/server.ts` |
| Routing | TanStack Router | `src/routes`, `routeTree.gen.ts`, `router.tsx` |
| Data fetching | TanStack Query | `@tanstack/react-query`, `lib/tanstack-query`, penggunaan `useQuery` |
| API client | oRPC client + TanStack Query utils | `lib/orpc/client.ts` |
| Form | TanStack Form dan React Hook Form | folder `-hooks/form.ts`, `react-hook-form` pada beberapa form |
| Validasi | Zod | schema di folder `-domain` dan `.input(z.object(...))` |
| UI framework | Tailwind CSS 4, shadcn-style components, Radix UI | `components/ui`, `tailwindcss`, `@radix-ui/*` |
| Icons | Lucide React | `lucide-react` |
| Peta | Leaflet dan React Leaflet | `leaflet`, `react-leaflet`, modul `routes/map` |
| Grafik | Recharts | dependency `recharts`, dipakai untuk potensi/penjualan jika dikembangkan |
| State lokal | Jotai | `admin/-libs/admin-atoms.ts` |
| i18n | Lingui | `src/lib/lingui`, file `.po` |
| Toast | Sonner | `Toaster` di root dan dependency `sonner` |

#### Framework

Frontend menggunakan **TanStack Start**, sebuah framework full-stack React yang memadukan routing, server route, dan rendering aplikasi. File penting:

| File | Fungsi |
| --- | --- |
| `apps/web/src/client.tsx` | Entry point client React. |
| `apps/web/src/server.ts` | Entry point server TanStack Start. |
| `apps/web/src/router.tsx` | Konfigurasi router dan context awal. |
| `apps/web/src/routes/__root.tsx` | Root layout, session loading, `<html lang>`, header, outlet, toaster. |

#### Libraries

Library penting:

| Library | Kegunaan |
| --- | --- |
| `@tanstack/react-router` | Routing file-based dan route guard. |
| `@tanstack/react-query` | Query cache, data fetching, invalidasi data. |
| `@orpc/*` | RPC type-safe, OpenAPI handler, client-server contract. |
| `better-auth` | Autentikasi email/password dan session. |
| `drizzle-orm` | Query database type-safe. |
| `zod` | Validasi input API dan form. |
| `leaflet`, `react-leaflet` | Peta interaktif. |
| `react-hook-form`, `@hookform/resolvers` | Form berbasis schema pada sebagian modul. |
| `@tanstack/react-form` | Form pada banyak modul admin. |
| `radix-ui`, `@radix-ui/*` | Primitive UI. |
| `lucide-react` | Ikon. |
| `xlsx`, `file-saver` | Ekspor data, terlihat dari dependency root dan modul stall/sale. |

#### State Management

State management terdiri dari:

1. **TanStack Query** untuk server state.
2. **Jotai** untuk state lokal admin, contohnya `currentUserAtom`.
3. **React state** untuk state halaman seperti search, modal, pagination.
4. **URL search params** pada beberapa route untuk state dialog atau filter.

#### UI Framework

UI memakai Tailwind CSS dan komponen bergaya shadcn/Radix. Folder `apps/web/src/components/ui` berisi komponen generik seperti:

| Komponen | Kegunaan |
| --- | --- |
| `button.tsx` | Tombol konsisten. |
| `dialog.tsx` | Modal/dialog. |
| `form.tsx` | Wrapper field form. |
| `input.tsx` | Input teks. |
| `select.tsx` | Select/dropdown. |
| `sidebar.tsx` | Sidebar admin. |
| `table` tidak tampak sebagai primitive terpisah | Tabel banyak dirender langsung di route atau komponen fitur. |
| `tooltip.tsx` | Tooltip. |
| `card.tsx` | Kontainer card. |

### 3.2 Backend

Walaupun proyek Better-T-Stack sering memisahkan backend Hono di `apps/server`, source code aktual menggunakan backend yang berada di TanStack Start server routes dalam `apps/web/src/routes/api`.

| Kategori | Teknologi | Bukti |
| --- | --- | --- |
| Runtime | Bun | `packageManager: bun@1.2.15`, script `bunx --bun vite` |
| Server route | TanStack Start server file route | `routes/api/*.ts` |
| API architecture | oRPC | `lib/orpc/router/index.ts`, `routes/api/rpc.$.ts` |
| OpenAPI | oRPC OpenAPI handler | `routes/api/$.ts` |
| Authentication | Better Auth | `lib/auth/index.ts`, `routes/api/auth.$.ts` |
| Authorization | Session middleware dan admin route guard | `lib/orpc/index.ts`, `routes/admin/route.tsx` |
| Middleware | oRPC middleware `requireAuth`; TanStack Start auth middleware | `lib/orpc/index.ts`, `lib/auth/middleware/auth-guard.ts` |

#### API Architecture

API utama menggunakan oRPC:

```txt
/api/rpc/$  -> RPCHandler(router)
/api/$      -> OpenAPIHandler(router)
/api/auth/$ -> Better Auth handler
```

Alur RPC:

```txt
Frontend component
  -> orpc client
  -> /api/rpc
  -> createContext(request)
  -> auth.api.getSession(headers)
  -> ORPC handler
  -> feature procedure
  -> Drizzle query
  -> PostgreSQL
```

#### Authentication

Autentikasi memakai Better Auth:

| Elemen | Implementasi |
| --- | --- |
| Provider utama | Email dan password (`emailAndPassword.enabled = true`) |
| OAuth | Konfigurasi GitHub/Google ada sebagai komentar atau env optional, belum aktif |
| Session store | Tabel `session` di PostgreSQL via Drizzle adapter |
| User store | Tabel `user` |
| Password store | Tabel `account.password` |
| Handler | `routes/api/auth.$.ts` memanggil `auth.handler(request)` |

#### Authorization

Ada dua lapis yang berbeda:

1. **API protectedProcedure**
   - Hanya mengecek `context.session?.user`.
   - Tidak mengecek role.
   - Semua user login dapat memanggil protected endpoint secara teknis, kecuali ada validasi tambahan pada route UI.

2. **Admin route guard**
   - `routes/admin/route.tsx` mengecek session.
   - Memanggil `orpc.admin.user.getById`.
   - Hanya role `admin` yang boleh masuk ke `/admin`.

Catatan keamanan: authorization API sebaiknya diperkuat dengan pengecekan role di middleware/procedure admin, karena saat ini pembatasan role paling jelas berada di sisi route guard.

#### Middleware

| Middleware | Lokasi | Fungsi |
| --- | --- | --- |
| `requireAuth` | `lib/orpc/index.ts` | Menolak oRPC protected procedure jika tidak ada session user. |
| `authMiddleware` | `lib/auth/middleware/auth-guard.ts` | Middleware TanStack Start untuk server function; memastikan session fresh. |
| Lingui middleware | `lib/lingui/i18n-middleware.ts` | Mendukung locale/i18n. |

### 3.3 Database

| Kategori | Teknologi |
| --- | --- |
| Database engine | PostgreSQL |
| ORM | Drizzle ORM |
| Migration tool | Drizzle Kit |
| Driver | `pg` dan `drizzle-orm/node-postgres` |
| Schema files | `apps/web/src/lib/db/schema` |
| Migration files | `apps/web/src/lib/db/migrations` |
| DB setup lokal | Docker Compose di `apps/web/docker-compose.yml` |

#### Database Engine

PostgreSQL digunakan sebagai database utama. Koneksi dibuat melalui:

```ts
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
```

Catatan: SSL selalu aktif dengan `rejectUnauthorized: false`. Ini umum untuk beberapa managed database, tetapi untuk local Docker dapat memerlukan konfigurasi berbeda jika PostgreSQL tidak menerima SSL.

#### ORM

Drizzle ORM digunakan untuk:

1. Mendefinisikan table schema.
2. Melakukan `select`, `insert`, `update`, `delete`.
3. Mendefinisikan foreign key.
4. Menghasilkan migration SQL.

#### Schema Strategy

Schema dikelompokkan dalam:

| File | Isi |
| --- | --- |
| `auth.ts` | `user`, `session`, `account`, `verification` |
| `todo.ts` | `todo` |
| `map-product.ts` | wilayah, lahan, komoditas, produk, potensi |
| `stall.ts` | `stalls`, `stall_product_brands` |
| `sale.ts` | `daily_sales`, `sales_realizations` |
| `utils.ts` | generator UUID |
| `index.ts` | saat ini hanya export `auth`, `todo`, `utils`; belum export semua schema aktif |

Catatan penting: `schema/index.ts` belum mengekspor `map-product`, `stall`, dan `sale`, padahal `db` mengimpor namespace schema dari folder schema. Untuk Drizzle runtime dan tooling, ini perlu diperiksa karena export barrel yang tidak lengkap bisa membuat table aktif tidak terdaftar jika hanya barrel yang dipakai.

#### Migration Strategy

Migration ada di:

```txt
apps/web/src/lib/db/migrations/
  0000_moaning_kinsey_walden.sql
  0001_nice_mongoose.sql
  meta/
```

Script:

| Command | Fungsi |
| --- | --- |
| `bun run db:push` | Push schema langsung ke database. |
| `bun run db:generate` | Generate migration dari schema. |
| `bun run db:migrate` | Jalankan migration. |
| `bun run db:studio` | Buka Drizzle Studio. |
| `bun run db:start` | Start DB Docker. |

### 3.4 Infrastructure

| Area | Implementasi aktual |
| --- | --- |
| Deployment | Ada konfigurasi Vercel dan Netlify, tetapi `bts.jsonc` menyebut `webDeploy: none`. |
| Hosting | Belum terkunci ke satu platform; tersedia `vercel.json`, `netlify.toml`, dan `Dockerfile`. |
| CI/CD | Ada `.github/workflows/ping.yml`; belum terlihat pipeline build/test lengkap. |
| Storage | PostgreSQL untuk data aplikasi; static GeoJSON di `public/data`. |
| Monitoring | Endpoint `healthCheck` oRPC mengembalikan `OK`; monitoring produksi belum tampak. |
| Container | `apps/web/Dockerfile` dan `docker-compose.yml` untuk database/dev. |
| Build | Vite/TanStack Start, Turborepo. |

#### Deployment

Konfigurasi deployment:

| File | Isi |
| --- | --- |
| `vercel.json` | Install `bun install`, build `cd apps/web && bun run build`, output `apps/web/.output/public`. |
| `netlify.toml` | Base `apps/web`, command `bun run build`, publish `dist`. |
| `apps/web/Dockerfile` | Mendukung containerisasi aplikasi web. |

Catatan: konfigurasi Vercel dan Netlify berbeda pada output directory (`.output/public` vs `dist`). Ini perlu diverifikasi pada deployment sebenarnya.

#### CI/CD

Folder `.github/workflows` hanya terlihat memiliki `ping.yml`. Dokumentasi ini menganggap CI/CD build-test-lint lengkap belum tersedia.

#### Storage

Storage yang digunakan:

1. PostgreSQL untuk data dinamis.
2. File static GeoJSON untuk batas wilayah Indonesia dan kabupaten/kota.
3. Public assets untuk icon PWA (`logo192`, `logo512`, `favicon`, `manifest`).

#### Monitoring

Monitoring minimal:

| Endpoint/procedure | Fungsi |
| --- | --- |
| `healthCheck` | Mengembalikan `OK` sebagai indikasi API hidup. |

Belum ditemukan integrasi monitoring eksternal seperti Sentry, Grafana, Prometheus, atau logging terstruktur.

## 4. Complete Folder Structure

### 4.1 Tree Struktur Tingkat Root

```txt
D:\satu-peta-pasar-master
├── .github/
│   ├── instructions/
│   │   └── bts.instructions.md
│   └── workflows/
│       └── ping.yml
├── .husky/
├── .kiro/
├── .qwen/
├── .serena/
├── .turbo/
├── .vscode/
├── .zed/
├── MAINTENANCE/
│   ├── index.ts.example
│   └── ori script route.txt
├── apps/
│   └── web/
├── AGENTS.md
├── CLAUDE.md
├── GEMINI.md
├── GUIDEBOOK.md
├── NETLIFY.md
├── QWEN.md
├── README.md
├── SETUPNLY.MD
├── arch.md
├── biome.json
├── bts.jsonc
├── bun.lock
├── bunfig.toml
├── lefthook.yml
├── netlify.toml
├── package.json
├── tsconfig.json
├── turbo.json
├── vercel.json
└── vitest.setup.ts
```

### 4.2 Tree Struktur `apps/web`

```txt
apps/web
├── .env.example
├── Dockerfile
├── README.md
├── build_log.txt
├── build_log_2.txt
├── components.json
├── docker-compose.yml
├── drizzle.config.ts
├── lingui.config.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── todos.json
├── public/
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── data/
│       ├── indonesia-boundary.geojson
│       └── regencies/
│           └── [ratusan file kode-kabupaten].geojson
└── src/
    ├── client.tsx
    ├── logo.svg
    ├── polyfill.ts
    ├── routeTree.gen.ts
    ├── router.tsx
    ├── server.ts
    ├── components/
    ├── env/
    ├── hooks/
    ├── lib/
    ├── locales/
    ├── routes/
    └── styles/
```

### 4.3 Tree Struktur `apps/web/src`

```txt
apps/web/src
├── client.tsx
├── server.ts
├── router.tsx
├── routeTree.gen.ts
├── polyfill.ts
├── logo.svg
├── styles/
│   └── globals.css
├── components/
│   ├── header.tsx
│   ├── language-switcher.tsx
│   └── ui/
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── switch.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
├── env/
│   ├── client.ts
│   └── server.ts
├── hooks/
│   ├── use-debounce.ts
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   ├── auth/
│   ├── db/
│   ├── lingui/
│   ├── orpc/
│   ├── tanstack-query/
│   ├── utils/
│   └── utils.ts
├── locales/
│   ├── global-en.po
│   └── global-id.po
└── routes/
    ├── __root.tsx
    ├── index.tsx
    ├── dashboard.tsx
    ├── product-knowledge/
    ├── product-potential/
    ├── sales-realization/
    ├── stall/
    ├── test.tsx
    ├── api/
    ├── auth/
    ├── demo/
    ├── map/
    ├── todos/
    └── admin/
```

### 4.4 Tree Struktur Infrastruktur `lib`

```txt
apps/web/src/lib
├── auth/
│   ├── auth-client.ts
│   ├── index.ts
│   └── middleware/
│       └── auth-guard.ts
├── db/
│   ├── index.ts
│   ├── migrations/
│   │   ├── 0000_moaning_kinsey_walden.sql
│   │   ├── 0001_nice_mongoose.sql
│   │   └── meta/
│   └── schema/
│       ├── auth.ts
│       ├── index.ts
│       ├── map-product.ts
│       ├── sale.ts
│       ├── stall.ts
│       ├── todo.ts
│       └── utils.ts
├── lingui/
│   ├── i18n-middleware.ts
│   ├── i18n-router-plugin.tsx
│   ├── i18n-server.ts
│   └── i18n.ts
├── orpc/
│   ├── client.ts
│   ├── context.ts
│   ├── index.ts
│   ├── schema.ts
│   └── router/
│       └── index.ts
├── tanstack-query/
│   ├── layout.tsx
│   └── root-provider.tsx
├── utils/
│   └── geojson-utils.ts
└── utils.ts
```

### 4.5 Tree Struktur Route API

```txt
apps/web/src/routes/api
├── $.ts
├── auth.$.ts
└── rpc.$.ts
```

| File | Tujuan |
| --- | --- |
| `rpc.$.ts` | Handler utama RPC oRPC pada prefix `/api/rpc`. |
| `auth.$.ts` | Handler Better Auth pada prefix `/api/auth`. |
| `$.ts` | Handler OpenAPI oRPC pada prefix `/api`. |

### 4.6 Tree Struktur Route Auth

```txt
apps/web/src/routes/auth
├── login.tsx
├── signup.tsx
├── -app/
│   └── get-session.ts
├── -components/
│   ├── login-form.tsx
│   └── signup-form.tsx
└── -locales/
    ├── auth-en.po
    └── auth-id.po
```

### 4.7 Tree Struktur Route Map

```txt
apps/web/src/routes/map
├── index.tsx
├── route.tsx
├── -app/
│   └── administrative-boundaries-service.ts
├── -components/
│   ├── choropleth-map.tsx
│   ├── dynamic-map.tsx
│   ├── map-context.tsx
│   ├── map-layout.tsx
│   ├── map-sidebar.tsx
│   ├── marketing-map.tsx
│   └── stall-markers.tsx
├── -domain/
│   └── marketing.ts
└── -locales/
    ├── map-en.po
    └── map-id.po
```

### 4.8 Tree Struktur Admin

```txt
apps/web/src/routes/admin
├── index.tsx
├── route.tsx
├── -components/
│   ├── admin-layout.tsx
│   ├── admin-sidebar.tsx
│   ├── form-components.tsx
│   ├── nav-main.tsx
│   └── nav-user.tsx
├── -domain/
│   ├── navigation-items.ts
│   └── navigation.ts
├── -hooks/
│   └── form-context.ts
├── -libs/
│   ├── admin-atoms.ts
│   └── admin-options.ts
├── -locales/
│   ├── admin-en.po
│   └── admin-id.po
├── commodity/
├── land/
├── potential/
├── product/
├── region/
├── sale/
├── stall/
└── user/
```

### 4.9 Tree Struktur Modul Admin per Domain

#### Region

```txt
admin/region
├── province/
│   ├── index.tsx
│   ├── -app/
│   │   ├── create-province.ts
│   │   ├── delete-province.ts
│   │   ├── get-all-provinces.ts
│   │   ├── get-provinces.ts
│   │   └── update-province.ts
│   ├── -components/
│   │   ├── create-province-form.tsx
│   │   ├── delete-province-form.tsx
│   │   └── edit-province-form.tsx
│   ├── -domain/
│   │   └── schema.ts
│   └── -hooks/
│       └── form.ts
└── regency/
    ├── index.tsx
    ├── -app/
    │   ├── create-regency.ts
    │   ├── delete-regency.ts
    │   ├── get-regencies.ts
    │   └── update-regency.ts
    ├── -components/
    │   ├── create-regency-form.tsx
    │   ├── delete-regency-form.tsx
    │   └── edit-regency-form.tsx
    ├── -domain/
    │   └── schema.ts
    └── -hooks/
        └── form.ts
```

#### Land

```txt
admin/land
├── index.tsx
├── -app/
│   ├── create-land-type.ts
│   ├── delete-land-type.ts
│   ├── get-land-types.ts
│   └── update-land-type.ts
├── -components/
│   ├── create-land-type-form.tsx
│   ├── delete-land-type-form.tsx
│   └── edit-land-type-form.tsx
├── -domain/
│   └── schema.ts
├── -hooks/
│   └── form.ts
├── province-land/
│   ├── $landType.tsx
│   ├── index.tsx
│   ├── -app/
│   │   ├── create-province-land.ts
│   │   ├── delete-province-land.ts
│   │   ├── get-province-lands.ts
│   │   └── update-province-land.ts
│   ├── -components/
│   ├── -domain/
│   └── -hooks/
└── regency-land/
    ├── index.tsx
    ├── -app/
    │   └── get-regency-lands.ts
    ├── -domain/
    └── -hooks/
```

#### Commodity

```txt
admin/commodity
├── index.tsx
├── -app/
│   ├── create-commodity-type.ts
│   ├── delete-commodity-type.ts
│   ├── get-commodity-types.ts
│   └── update-commodity-type.ts
├── -components/
├── -domain/
├── -hooks/
├── province-commodity/
│   ├── index.tsx
│   ├── -app/
│   │   └── get-province-commodities.ts
│   ├── -domain/
│   └── -hooks/
└── regency-commodity/
    ├── $commodityType.tsx
    ├── index.tsx
    ├── -app/
    │   ├── create-regency-commodity.ts
    │   ├── delete-regency-commodity.ts
    │   ├── get-regency-commodities.ts
    │   ├── get-regency-lands.ts
    │   └── update-regency-commodity.ts
    ├── -components/
    ├── -domain/
    └── -hooks/
```

#### Product

```txt
admin/product
├── index.tsx
├── -app/
│   ├── create-product-type.ts
│   ├── delete-product-type.ts
│   ├── get-product-types.ts
│   └── update-product-type.ts
├── -components/
├── -domain/
├── -hooks/
├── product-brand/
│   ├── index.tsx
│   ├── -app/
│   │   ├── create-product-brand.ts
│   │   ├── delete-product-brand.ts
│   │   ├── get-product-brands.ts
│   │   └── update-product-brand.ts
│   ├── -components/
│   ├── -domain/
│   └── -hooks/
└── product-dosage/
    ├── $productBrand.tsx
    ├── index.tsx
    ├── -app/
    │   ├── create-product-dosage.ts
    │   ├── delete-product-dosage.ts
    │   ├── get-product-dosages.ts
    │   └── update-product-dosage.ts
    ├── -components/
    ├── -domain/
    └── -hooks/
```

#### Sale

```txt
admin/sale
├── index.tsx
├── -app/
│   ├── create-sales-realization.ts
│   ├── delete-sales-realization.ts
│   ├── get-sales-realizations.ts
│   └── update-sales-realization.ts
├── -components/
│   ├── create-sales-realization-form.tsx
│   ├── create-sales-realization-modal.tsx
│   ├── edit-sales-realization-modal.tsx
│   └── sales-realization-table.tsx
├── -domain/
│   └── schema.ts
├── -hooks/
│   └── form.ts
└── sale-daily/
    ├── index.tsx
    ├── -app/
    │   ├── create-daily-sales.ts
    │   ├── delete-daily-sales.ts
    │   ├── get-daily-sales.ts
    │   └── update-daily-sales.ts
    ├── -components/
    ├── -domain/
    └── -hooks/
```

#### Stall

```txt
admin/stall
├── index.tsx
├── -app/
│   ├── assign-product-brand.ts
│   ├── create-stall.ts
│   ├── delete-stall.ts
│   ├── get-stall-product-brand.ts
│   ├── get-stalls.ts
│   └── update-stall.ts
├── -components/
│   ├── assign-product-modal.tsx
│   ├── create-stall-form.tsx
│   ├── create-stall-modal.tsx
│   ├── edit-stall-form.tsx
│   ├── edit-stall-modal.tsx
│   ├── manage-stall-products.tsx
│   └── stall-table.tsx
├── -domain/
│   └── schema.ts
└── -hooks/
    └── form.ts
```

#### User

```txt
admin/user
├── index.tsx
├── -app/
│   ├── delete-user.ts
│   ├── get-user-by-id.ts
│   ├── get-users.ts
│   └── update-user.ts
├── -components/
│   ├── create-user-form.tsx
│   ├── delete-user-form.tsx
│   └── edit-user-form.tsx
└── -hooks/
    └── form.ts
```

### 4.10 Purpose of Important Files

| File | Purpose |
| --- | --- |
| `package.json` root | Script monorepo, workspace Bun, Turbo, Biome, Ultracite. |
| `apps/web/package.json` | Dependency dan script aplikasi web. |
| `turbo.json` | Pipeline build/check/dev monorepo. |
| `biome.json` | Formatter/linter. |
| `bts.jsonc` | Metadata Better-T-Stack. |
| `drizzle.config.ts` | Konfigurasi Drizzle Kit. |
| `src/lib/db/index.ts` | Koneksi PostgreSQL dan instance Drizzle. |
| `src/lib/auth/index.ts` | Konfigurasi Better Auth. |
| `src/lib/orpc/index.ts` | Base procedure oRPC dan protected middleware. |
| `src/lib/orpc/router/index.ts` | Registrasi seluruh endpoint oRPC. |
| `src/routes/api/rpc.$.ts` | RPC HTTP entry point. |
| `src/routes/api/auth.$.ts` | Auth HTTP entry point. |
| `src/routes/admin/route.tsx` | Guard dan layout admin. |
| `src/routes/__root.tsx` | Root route, session loading, document shell. |

### 4.11 Relationship Between Modules

Relasi modul secara umum:

```txt
routes/* UI
  -> lib/orpc/client
  -> routes/api/rpc.$.ts
  -> lib/orpc/router
  -> routes/*/-app use case
  -> routes/*/-domain validation schema
  -> lib/db/schema table
  -> PostgreSQL
```

Relasi domain:

```txt
Region
  -> Land
  -> Commodity
  -> Product dosage
  -> Potential
  -> Sale
  -> Stall
```

## 5. System Architecture

### 5.1 High Level Architecture

Arsitektur sistem adalah full-stack monolith berbasis `apps/web`:

```txt
Browser
  |
  | React + TanStack Router + TanStack Query
  v
TanStack Start App
  |
  | /api/rpc, /api, /api/auth
  v
Server Routes
  |
  | oRPC + Better Auth
  v
Application Procedures (-app)
  |
  | Drizzle ORM
  v
PostgreSQL
```

Komponen pendukung:

1. Static GeoJSON di `public/data`.
2. Lingui untuk i18n.
3. Tailwind/Radix/shadcn untuk UI.
4. Docker Compose untuk database lokal.

### 5.2 Client-Server Communication

Komunikasi client-server dilakukan dengan oRPC:

1. Frontend memanggil `orpc.admin.region.province.get.queryOptions(...)`.
2. TanStack Query menjalankan request ke endpoint RPC.
3. `RPCHandler` menerima request pada `/api/rpc/$`.
4. `createContext` mengambil session dan DB.
5. Procedure terkait menjalankan logic.
6. Response dikembalikan ke client dan disimpan di React Query cache.

### 5.3 Request Flow

Alur request protected API:

```txt
User membuka halaman admin
  -> Route beforeLoad mengecek context.user
  -> Jika tidak login: redirect ke /auth/login
  -> Jika login: panggil admin.user.getById
  -> Jika role bukan admin: redirect ke /
  -> Jika admin: render AdminLayout
  -> Component memanggil useQuery/useMutation
  -> oRPC protectedProcedure mengecek session
  -> Handler menjalankan Drizzle query
  -> Response dikirim ke UI
```

### 5.4 Authentication Flow

```txt
User mengisi login form
  -> authClient.signIn.email
  -> /api/auth/*
  -> Better Auth memvalidasi account/password
  -> Session dibuat di tabel session
  -> Cookie/session dikirim ke browser
  -> Root route memanggil orpc.auth.getSession
  -> context.user tersedia pada route
```

Signup:

```txt
User mengisi signup form
  -> authClient.signUp.email
  -> Better Auth membuat user dan account
  -> role default dari schema user adalah guest
  -> user perlu diubah role-nya menjadi admin agar dapat mengakses admin
```

### 5.5 Database Flow

```txt
Procedure input
  -> Zod validation
  -> Drizzle query builder
  -> SQL parameterized query
  -> PostgreSQL
  -> returning/select result
  -> oRPC response
```

Drizzle digunakan untuk mencegah SQL injection melalui query builder dan parameterisasi.

### 5.6 Data Validation Flow

Validasi berada pada beberapa lapisan:

| Lapisan | Implementasi |
| --- | --- |
| UI form | React Hook Form/TanStack Form dengan schema di beberapa modul. |
| oRPC input | `.input(z.object(...))` atau `.input(EntitySchema)` |
| Database | Constraint `notNull`, `unique`, primary key, foreign key. |
| Auth | Better Auth memvalidasi credential dan session. |

Contoh:

| Modul | Schema |
| --- | --- |
| Province | `ProvinceSchema` dengan `code`, `name`, `area`. |
| Regency | `RegencySchema` dengan `code`, `name`, `provinceId`, `area`. |
| Stall | `StallSchema` dengan `name`, `provinceId`, `regencyId`, `latitude`, `longitude`. |
| Sales realization | `SalesRealizationSchema` dengan `reportDate`, `productBrandId`, angka realisasi/RKAP. |
| Daily sales | `DailySalesSchema` dengan `date`, `productBrandId`, `qty`, `revenue`, `target`. |

## 6. User Roles and Permissions

### 6.1 Roles Found in Source Code

Role yang ditemukan:

| Role | Sumber |
| --- | --- |
| `admin` | route guard admin, user management form, header. |
| `viewer` | header dan user edit form. |
| `guest` | default role schema user dan user edit form. |
| `user` | tipe `Navigation.User` menyebut `admin | user`, tetapi role database/form tidak memakai `user` sebagai role utama. |

### 6.2 Role `admin`

| Aspek | Keterangan |
| --- | --- |
| Responsibilities | Mengelola data master, data wilayah, lahan, komoditas, produk, penjualan, stall, dan user. |
| Accessible menus | Dashboard, Regions, Lands, Commodities, Products, Sales Overview, Stalls Overview, User Management. |
| Accessible APIs | Secara UI seluruh API admin. Secara API, selama session valid semua protected API dapat dipanggil. |
| Restrictions | Harus login dan role harus `admin` untuk membuka `/admin`. |

Menu admin berdasarkan `navigation-items.ts`:

| Menu | Submenu |
| --- | --- |
| Dashboard | - |
| Regions | Province, Regency |
| Lands | Land Type, Province Land, Regency Land |
| Commodities | Commodity Type, Province Commodity, Regency Commodity |
| Products | Product Type, Product Brand, Product Dosage |
| Sales Overview | Sales Realization, Daily Sales |
| Stalls Overview | - |
| User Management | - |

### 6.3 Role `viewer`

| Aspek | Keterangan |
| --- | --- |
| Responsibilities | Belum jelas dari source code. Header mengecek `viewer`, tetapi admin guard hanya menerima `admin`. |
| Accessible menus | Header kemungkinan menampilkan akses admin/viewer, tetapi `/admin` akan menolak karena bukan admin. |
| Accessible APIs | Protected API dapat dipanggil jika session valid, karena middleware API belum cek role. |
| Restrictions | Tidak lolos route guard `/admin`. |

Catatan: Role `viewer` sebaiknya diberi rule eksplisit, misalnya akses read-only untuk map/dashboard.

### 6.4 Role `guest`

| Aspek | Keterangan |
| --- | --- |
| Responsibilities | Role default untuk user baru. |
| Accessible menus | Halaman publik, login/signup, home, map publik jika tersedia. |
| Accessible APIs | Jika login, protected API secara teknis hanya mengecek session; tetapi UI admin tidak dapat diakses. |
| Restrictions | Tidak dapat mengakses `/admin`. |

### 6.5 Pengunjung Tidak Login

| Aspek | Keterangan |
| --- | --- |
| Responsibilities | Melihat halaman publik dan melakukan login/signup. |
| Accessible menus | Home, auth, kemungkinan map/stall/product-potential/sales-realization publik. |
| Accessible APIs | Public API seperti `healthCheck`, `auth.getSession`, `todo.*`. |
| Restrictions | Tidak dapat memakai protected procedure dan tidak dapat masuk admin. |

## 7. Database Documentation

### 7.1 Overview

Database menggunakan PostgreSQL. Primary key umumnya UUID. Banyak tabel memiliki kolom audit `created_at` dan `updated_at`. Relasi utama memakai foreign key.

### 7.2 Table: `user`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | Identitas user. |
| `name` | text | not null | Nama user. |
| `email` | text | not null, unique | Email login. |
| `email_verified` | boolean | not null | Status verifikasi email. |
| `image` | text | nullable | Avatar/profile image. |
| `role` | text | not null, default `guest` pada schema | Role aplikasi. |
| `created_at` | timestamp | not null | Waktu dibuat. |
| `updated_at` | timestamp | not null | Waktu diperbarui. |

Relasi:

1. One `user` has many `session`.
2. One `user` has many `account`.

### 7.3 Table: `session`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID session. |
| `expires_at` | timestamp | not null | Masa berlaku session. |
| `token` | text | not null, unique | Token session. |
| `created_at` | timestamp | not null | Waktu dibuat. |
| `updated_at` | timestamp | not null | Waktu diperbarui. |
| `ip_address` | text | nullable | IP user. |
| `user_agent` | text | nullable | Browser/user agent. |
| `user_id` | uuid | FK user, cascade delete | Pemilik session. |

### 7.4 Table: `account`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID account. |
| `account_id` | text | not null | ID dari provider. |
| `provider_id` | text | not null | Provider auth. |
| `user_id` | uuid | FK user, cascade delete | User pemilik account. |
| `access_token` | text | nullable | OAuth access token. |
| `refresh_token` | text | nullable | OAuth refresh token. |
| `id_token` | text | nullable | OAuth ID token. |
| `access_token_expires_at` | timestamp | nullable | Masa berlaku access token. |
| `refresh_token_expires_at` | timestamp | nullable | Masa berlaku refresh token. |
| `scope` | text | nullable | OAuth scope. |
| `password` | text | nullable | Password hash untuk email/password. |
| `created_at` | timestamp | not null | Waktu dibuat. |
| `updated_at` | timestamp | not null | Waktu diperbarui. |

### 7.5 Table: `verification`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID verification. |
| `identifier` | text | not null | Identifier proses verifikasi. |
| `value` | text | not null | Nilai token/verifikasi. |
| `expires_at` | timestamp | not null | Masa berlaku. |
| `created_at` | timestamp | nullable | Waktu dibuat. |
| `updated_at` | timestamp | nullable | Waktu diperbarui. |

### 7.6 Table: `todo`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID todo. |
| `text` | text | not null | Isi todo. |
| `completed` | boolean | default false, not null | Status selesai. |

Catatan: Todo tampak sebagai contoh/template Better-T-Stack, bukan domain utama Satu Peta Pasar.

### 7.7 Table: `provinces`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK, default random | ID provinsi. |
| `code` | varchar(3) | not null, unique | Kode provinsi. |
| `name` | varchar | not null | Nama provinsi. |
| `area` | real | nullable | Luas wilayah. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Relasi:

1. One province has many regencies.
2. One province has many province lands.
3. One province has many province commodities.
4. One province has many province potentials.
5. One province has many stalls.

### 7.8 Table: `regencies`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID kabupaten/kota. |
| `code` | varchar(5) | not null, unique | Kode kabupaten/kota. |
| `province_id` | uuid | FK provinces, cascade delete | Provinsi induk. |
| `name` | varchar | not null | Nama kabupaten/kota. |
| `area` | real | nullable | Luas wilayah. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Relasi:

1. Many regencies belong to one province.
2. One regency has many regency lands.
3. One regency has many regency commodities.
4. One regency has many regency potentials.
5. One regency has many stalls.

### 7.9 Table: `land_types`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID jenis lahan. |
| `name` | varchar | not null | Nama jenis lahan, contoh pangan/kebun/horti/tambak. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Relasi:

1. One land type has many province lands.
2. One land type has many regency lands.
3. One land type has many commodity types.

### 7.10 Table: `province_lands`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID data lahan provinsi. |
| `province_id` | uuid | FK provinces | Provinsi. |
| `land_type_id` | uuid | FK land_types | Jenis lahan. |
| `area` | real | nullable | Luas lahan. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

### 7.11 Table: `regency_lands`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID data lahan kabupaten. |
| `regency_id` | uuid | FK regencies | Kabupaten/kota. |
| `land_type_id` | uuid | FK land_types | Jenis lahan. |
| `area` | real | nullable | Luas lahan. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

### 7.12 Table: `commodity_types`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID jenis komoditas. |
| `land_type_id` | uuid | FK land_types | Jenis lahan terkait. |
| `name` | varchar | not null | Nama komoditas. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Relasi:

1. Many commodity types belong to one land type.
2. Commodity type dipakai pada province/regency commodities.
3. Commodity type dipakai pada product dosages.

### 7.13 Table: `province_commodities`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID komoditas provinsi. |
| `province_id` | uuid | FK provinces | Provinsi. |
| `commodity_type_id` | uuid | FK commodity_types | Jenis komoditas. |
| `area` | real | nullable | Luas/porsi area komoditas. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

### 7.14 Table: `regency_commodities`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID komoditas kabupaten. |
| `regency_id` | uuid | FK regencies | Kabupaten/kota. |
| `commodity_type_id` | uuid | FK commodity_types | Jenis komoditas. |
| `area` | real | nullable | Luas/porsi area komoditas. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

### 7.15 Table: `product_types`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID jenis produk. |
| `name` | varchar | not null | Nama jenis produk. |
| `description` | varchar | nullable | Deskripsi. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Relasi: one product type has many product brands.

### 7.16 Table: `product_brands`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID brand produk. |
| `product_type_id` | uuid | FK product_types | Jenis produk. |
| `name` | varchar | not null | Nama brand produk. |
| `industry` | varchar | nullable | Industri/produsen. |
| `description` | varchar | nullable | Deskripsi. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Relasi:

1. Brand produk dipakai pada product dosage.
2. Brand produk dipakai pada province/regency potentials.
3. Brand produk dipakai pada sales realization.
4. Brand produk dipakai pada daily sales.
5. Brand produk dipakai pada stall product brands.

### 7.17 Table: `product_dosages`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID dosis produk. |
| `commodity_type_id` | uuid | FK commodity_types | Komoditas target. |
| `product_brand_id` | uuid | FK product_brands | Brand produk. |
| `dosage` | real | nullable | Dosis, komentar schema menyebut kg/ha. |
| `unit` | varchar | nullable | Satuan. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |

### 7.18 Table: `province_potentials`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID potensi provinsi. |
| `province_id` | uuid | FK provinces | Provinsi. |
| `product_brand_id` | uuid | FK product_brands | Brand produk. |
| `potential` | real | nullable | Nilai potensi. |
| `description` | varchar | nullable | Deskripsi potensi. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

### 7.19 Table: `regency_potentials`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID potensi kabupaten. |
| `regency_id` | uuid | FK regencies | Kabupaten/kota. |
| `product_brand_id` | uuid | FK product_brands | Brand produk. |
| `potential` | real | nullable | Nilai potensi. |
| `description` | varchar | nullable | Deskripsi potensi. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Catatan: tabel ada, tetapi endpoint aktif untuk regency potential belum terlihat di router.

### 7.20 Table: `stalls`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID stall/kios. |
| `name` | varchar | not null | Nama stall/kios. |
| `address` | varchar | nullable | Alamat. |
| `regency_id` | uuid | FK regencies | Kabupaten/kota. |
| `province_id` | uuid | FK provinces | Provinsi. |
| `latitude` | real | nullable | Koordinat latitude. |
| `longitude` | real | nullable | Koordinat longitude. |
| `owner` | varchar | nullable | Pemilik. |
| `no_telp` | varchar | nullable | Nomor telepon. |
| `criteria` | varchar(1) | nullable | Kriteria stall. |
| `year` | varchar | default tahun saat ini | Tahun data. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

### 7.21 Table: `stall_product_brands`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID relasi. |
| `stall_id` | uuid | FK stalls | Stall/kios. |
| `product_brand_id` | uuid | FK product_brands | Brand produk. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Relasi ini adalah many-to-many antara stall dan product brand.

### 7.22 Table: `daily_sales`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID penjualan harian. |
| `date` | date | not null | Tanggal penjualan. |
| `month` | varchar | nullable | Bulan. |
| `year` | varchar | default tahun saat ini | Tahun. |
| `product_brand_id` | uuid | FK product_brands | Brand produk. |
| `province_id` | uuid | nullable pada schema | Provinsi. Tidak didefinisikan FK di schema saat ini. |
| `qty` | real | nullable | Kuantitas. |
| `revenue` | real | nullable | Pendapatan. |
| `target` | real | nullable | Target. |
| `notes` | varchar | nullable | Catatan. |
| `realization` | real | nullable | Realisasi. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Catatan: migration awal `0001` mencatat versi lama `daily_sales` yang lebih sedikit kolomnya. Schema source code saat ini lebih lengkap. Perlu sinkronisasi migration bila database produksi belum sesuai.

### 7.23 Table: `sales_realizations`

| Column | Type | Constraint | Purpose |
| --- | --- | --- | --- |
| `id` | uuid | PK | ID realisasi penjualan. |
| `report_date` | date | not null | Tanggal laporan. |
| `product_brand_id` | uuid | FK product_brands | Brand produk. |
| `realization_daily` | real | nullable | Realisasi harian. |
| `month` | varchar | nullable | Bulan. |
| `realization_monthly` | real | nullable | Realisasi bulanan. |
| `rkap_monthly` | real | nullable | RKAP bulanan. |
| `realization_ytd` | real | nullable | Realisasi year-to-date. |
| `rkap_ytd` | real | nullable | RKAP year-to-date. |
| `year` | varchar | default tahun saat ini | Tahun. |
| `rkap_yearly` | real | nullable | RKAP tahunan. |
| `realization_last_year` | real | nullable | Realisasi tahun lalu. |
| `created_at` | timestamp | default now | Waktu dibuat. |
| `updated_at` | timestamp | default now | Waktu diperbarui. |

Catatan: file migration memiliki typo kolom `realizaton_ytd`, sedangkan schema source code memakai `realization_ytd`. Ini perlu diperiksa dalam database aktual.

## 8. Entity Relationship Analysis

### 8.1 Main Entities

Entitas utama:

1. User, Session, Account, Verification.
2. Province dan Regency.
3. Land Type, Province Land, Regency Land.
4. Commodity Type, Province Commodity, Regency Commodity.
5. Product Type, Product Brand, Product Dosage.
6. Province Potential dan Regency Potential.
7. Stall dan Stall Product Brand.
8. Sales Realization dan Daily Sales.

### 8.2 Relationship Overview

```txt
user
├── session
└── account

provinces
├── regencies
├── province_lands
├── province_commodities
├── province_potentials
└── stalls

regencies
├── regency_lands
├── regency_commodities
├── regency_potentials
└── stalls

land_types
├── province_lands
├── regency_lands
└── commodity_types

commodity_types
├── province_commodities
├── regency_commodities
└── product_dosages

product_types
└── product_brands

product_brands
├── product_dosages
├── province_potentials
├── regency_potentials
├── sales_realizations
├── daily_sales
└── stall_product_brands

stalls
└── stall_product_brands
```

### 8.3 Data Dependencies

| Data | Bergantung pada |
| --- | --- |
| Regency | Province harus ada. |
| Province Land | Province dan Land Type harus ada. |
| Regency Land | Regency dan Land Type harus ada. |
| Commodity Type | Land Type harus ada. |
| Province Commodity | Province dan Commodity Type harus ada. |
| Regency Commodity | Regency dan Commodity Type harus ada. |
| Product Brand | Product Type harus ada. |
| Product Dosage | Commodity Type dan Product Brand harus ada. |
| Province Potential | Province dan Product Brand harus ada. |
| Regency Potential | Regency dan Product Brand harus ada. |
| Stall | Province dan Regency harus ada. |
| Stall Product Brand | Stall dan Product Brand harus ada. |
| Sales Realization | Product Brand harus ada. |
| Daily Sales | Product Brand harus ada; provinceId ada tetapi FK belum didefinisikan. |

### 8.4 Data Integrity Strategy

Strategi integritas:

1. Primary key UUID pada semua tabel utama.
2. Unique constraint pada `user.email`, `session.token`, `provinces.code`, dan `regencies.code`.
3. Foreign key untuk relasi utama.
4. Cascade delete pada `user -> session/account` dan `province -> regencies`.
5. Validasi Zod sebelum query database.
6. Drizzle query builder untuk query parameterized.

Kelemahan yang perlu diperhatikan:

1. Beberapa kombinasi data seharusnya unique tetapi belum terlihat constraint, misalnya `(province_id, land_type_id, year)` atau `(stall_id, product_brand_id)`.
2. `daily_sales.province_id` belum didefinisikan sebagai FK ke `provinces`.
3. Tidak semua tabel punya `updated_at`, misalnya `product_dosages` schema hanya punya `createdAt`.
4. Migration dan schema tampak tidak sepenuhnya sinkron untuk `sales_realizations` dan `daily_sales`.

## 9. Backend Module Documentation

### 9.1 Module: Auth

| Item | Keterangan |
| --- | --- |
| Lokasi | `src/lib/auth`, `src/routes/auth`, `src/routes/api/auth.$.ts` |
| Purpose | Login, signup, session, dan akses user saat ini. |
| Business logic | Better Auth mengelola credential, account, session, dan cookie. |
| Input validation | Ditangani Better Auth dan form client. |
| Output structure | Session object atau null melalui `auth.getSession`. |
| Dependencies | Better Auth, Drizzle adapter, PostgreSQL, TanStack Start cookies. |

Endpoint/procedure:

1. `/api/auth/*`: route Better Auth.
2. `orpc.auth.getSession`: mengembalikan `context.session || null`.

### 9.2 Module: oRPC Infrastructure

| Item | Keterangan |
| --- | --- |
| Lokasi | `src/lib/orpc` |
| Purpose | Menyatukan semua API server dan client. |
| Business logic | Routing procedure, public/protected middleware, context DB/session. |
| Input validation | Tiap procedure memakai `.input(...)`. |
| Output structure | Type-safe object/array sesuai handler. |
| Dependencies | `@orpc/server`, `@orpc/client`, `@orpc/tanstack-query`, Better Auth, Drizzle. |

### 9.3 Module: Region Province

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/region/province` |
| Purpose | Mengelola data provinsi. |
| Business logic | Create, read dengan search/pagination input, update field tertentu, delete. |
| Input validation | `ProvinceSchema`, z.object pada get/update/delete. |
| Output structure | Umumnya `{ data, meta }` untuk get; object row untuk create/update/delete. |
| Dependencies | `provinces` table, protectedProcedure. |

Validasi:

| Field | Rule |
| --- | --- |
| `id` | UUID pada update/delete. |
| `code` | string min 1 max 3. |
| `name` | string. |
| `area` | number optional. |

### 9.4 Module: Region Regency

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/region/regency` |
| Purpose | Mengelola data kabupaten/kota. |
| Business logic | CRUD regency, join dengan province saat get. |
| Input validation | `RegencySchema`, z.object filter. |
| Output structure | List regency dengan data provinsi. |
| Dependencies | `regencies`, `provinces`. |

### 9.5 Module: Land Type

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/land` |
| Purpose | Mengelola jenis lahan. |
| Business logic | CRUD sederhana untuk `land_types`. |
| Input validation | `LandTypeSchema`, search optional. |
| Output structure | List atau row land type. |
| Dependencies | `landTypes`. |

### 9.6 Module: Province Land

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/land/province-land` |
| Purpose | Mengelola luas/area lahan per provinsi dan jenis lahan. |
| Business logic | Create, read dengan join province dan land type, update, delete. |
| Input validation | `ProvinceLandSchema`. |
| Output structure | List data dengan nama province dan land type. |
| Dependencies | `provinceLands`, `provinces`, `landTypes`. |

### 9.7 Module: Regency Land

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/land/regency-land` |
| Purpose | Membaca data lahan per kabupaten dan jenis lahan. |
| Business logic | Endpoint get dengan filter page/limit/search/regencyId/landTypeId. |
| Input validation | z.object pada get. |
| Output structure | List data join regency dan land type. |
| Dependencies | `regencyLands`, `regencies`, `landTypes`. |
| Catatan | Create/update/delete belum aktif di router. |

### 9.8 Module: Commodity Type

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/commodity` |
| Purpose | Mengelola jenis komoditas berdasarkan jenis lahan. |
| Business logic | CRUD `commodity_types`, filter by landTypeId/search. |
| Input validation | `CommodityTypeSchema`. |
| Output structure | Row/list commodity type. |
| Dependencies | `commodityTypes`, `landTypes`. |

### 9.9 Module: Province Commodity

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/commodity/province-commodity` |
| Purpose | Membaca data komoditas per provinsi. |
| Business logic | Get dengan join province dan commodity type. |
| Input validation | page, limit, search, provinceId, commodityTypeId. |
| Output structure | List data komoditas provinsi. |
| Dependencies | `provinceCommodities`, `provinces`, `commodityTypes`. |
| Catatan | Create/update/delete belum aktif di router. |

### 9.10 Module: Regency Commodity

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/commodity/regency-commodity` |
| Purpose | Mengelola komoditas per kabupaten. |
| Business logic | CRUD `regency_commodities`, get join regency dan commodity type. |
| Input validation | `RegencyCommoditySchema`, filter get. |
| Output structure | Row/list regency commodity. |
| Dependencies | `regencyCommodities`, `regencies`, `commodityTypes`. |

### 9.11 Module: Product Type

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/product` |
| Purpose | Mengelola jenis produk. |
| Business logic | CRUD `product_types`, error conflict pada duplicate. |
| Input validation | `name`, `description`, `id`. |
| Output structure | Row/list product type. |
| Dependencies | `productTypes`. |

### 9.12 Module: Product Brand

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/product/product-brand` |
| Purpose | Mengelola brand produk berdasarkan product type. |
| Business logic | CRUD `product_brands`, filter productTypeId/search. |
| Input validation | `productTypeId`, `name`, `industry`, `description`. |
| Output structure | Row/list product brand. |
| Dependencies | `productBrands`, `productTypes`. |

### 9.13 Module: Product Dosage

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/product/product-dosage` |
| Purpose | Mengelola dosis produk per komoditas. |
| Business logic | CRUD `product_dosages`, filter commodityTypeId/productBrandId/search. |
| Input validation | `commodityTypeId`, `productBrandId`, `dosage`, `unit`. |
| Output structure | Row/list product dosage dengan relasi produk/komoditas. |
| Dependencies | `productDosages`, `commodityTypes`, `productBrands`. |

### 9.14 Module: Province Potential

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/potential/province_potential` |
| Purpose | Membaca potensi produk di level provinsi. |
| Business logic | Get join province dan product brand, filter search/province/product/year. |
| Input validation | page, limit, search, provinceId, productBrandId, year. |
| Output structure | List province potentials. |
| Dependencies | `provincePotentials`, `provinces`, `productBrands`. |
| Catatan | Create/update/delete belum aktif di router. |

### 9.15 Module: Sales Realization

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/sale` |
| Purpose | Mengelola realisasi penjualan per brand produk. |
| Business logic | CRUD `sales_realizations`, join product brand, filter search/productBrandId. |
| Input validation | `SalesRealizationSchema`. |
| Output structure | Row/list sales realization dengan meta pagination. |
| Dependencies | `salesRealizations`, `productBrands`. |

### 9.16 Module: Daily Sales

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/sale/sale-daily` |
| Purpose | Mengelola data penjualan harian. |
| Business logic | CRUD `daily_sales`, join product brand, filter search. |
| Input validation | `DailySalesSchema`. |
| Output structure | Row/list daily sales dengan meta. |
| Dependencies | `dailySales`, `productBrands`. |

### 9.17 Module: Stall

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/stall` |
| Purpose | Mengelola kios/stall dan relasi produk brand. |
| Business logic | CRUD stall, get stall dengan join province/regency, assign product brand. |
| Input validation | `StallSchema`, z.object untuk delete/get/assign. |
| Output structure | Row/list stall, list stall-product-brand. |
| Dependencies | `stalls`, `stallProductBrands`, `provinces`, `regencies`, `productBrands`. |

### 9.18 Module: User Management

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/admin/user` |
| Purpose | Melihat, memperbarui, dan menghapus user. |
| Business logic | Get all users, get by id, update name/email/image/role, delete user. |
| Input validation | UUID, email, role enum. |
| Output structure | `{ data }` pada beberapa endpoint. |
| Dependencies | `user` table, Better Auth schema. |

### 9.19 Module: Todo

| Item | Keterangan |
| --- | --- |
| Lokasi | `routes/todos` |
| Purpose | Contoh CRUD todo dari template. |
| Business logic | Get, create, toggle, delete todo. |
| Input validation | text min 1, UUID, boolean completed. |
| Output structure | Row/list todo. |
| Dependencies | `todo` table. |

## 10. API Documentation

### 10.1 API Transport

| Base | Fungsi |
| --- | --- |
| `/api/rpc` | Endpoint RPC utama oRPC. |
| `/api` | Endpoint OpenAPI oRPC/reference. |
| `/api/auth` | Endpoint Better Auth. |

Catatan: oRPC procedure tidak selalu dipanggil sebagai REST path tradisional. Dokumentasi berikut memakai nama procedure sebagai endpoint logis.

### 10.2 Public API

| Endpoint name | Method | Purpose | Parameters/body | Response | Auth |
| --- | --- | --- | --- | --- | --- |
| `healthCheck` | oRPC | Health check | none | `"OK"` | No |
| `auth.getSession` | oRPC | Ambil session aktif | none | session object atau null | No |
| `todo.getAll` | oRPC | Ambil semua todo | none | array todo | No |
| `todo.create` | oRPC | Buat todo | `{ text: string min 1 }` | created todo | No |
| `todo.toggle` | oRPC | Update completed | `{ id: uuid, completed: boolean }` | updated todo | No |
| `todo.delete` | oRPC | Hapus todo | `{ id: uuid }` | void/hasil delete | No |

### 10.3 Protected API General

Semua endpoint admin berikut memakai `protectedProcedure`, sehingga butuh session login. Namun pengecekan role admin belum berada di middleware API; role admin dicek pada route `/admin`.

### 10.4 Admin Region Province APIs

| Endpoint | Purpose | Input | Output | Validation |
| --- | --- | --- | --- | --- |
| `admin.region.province.get` | List provinsi | `{ page?, limit?, search? }` | `{ data, meta? }` | page/limit number optional, search string optional |
| `admin.region.province.create` | Tambah provinsi | `{ code, name, area? }` | province row | code max 3, name required |
| `admin.region.province.update` | Update provinsi | `{ id, code?, name?, area? }` | updated row | id UUID, minimal satu field |
| `admin.region.province.delete` | Hapus provinsi | `{ id }` | deleted row | id UUID |

### 10.5 Admin Region Regency APIs

| Endpoint | Purpose | Input | Output | Validation |
| --- | --- | --- | --- | --- |
| `admin.region.regency.get` | List kabupaten | `{ page?, limit?, search?, provinceId? }` | list join province | provinceId UUID optional |
| `admin.region.regency.create` | Tambah kabupaten | `{ code, name, provinceId, area? }` | regency row | code max 7, provinceId UUID |
| `admin.region.regency.update` | Update kabupaten | `{ id, code?, name?, provinceId?, area? }` | updated row | id UUID |
| `admin.region.regency.delete` | Hapus kabupaten | `{ id }` | deleted row | id UUID |

### 10.6 Admin Land APIs

| Endpoint | Purpose | Input | Output | Auth |
| --- | --- | --- | --- | --- |
| `admin.land.land_type.get` | List jenis lahan | `{ search? }` | list land type | Required |
| `admin.land.land_type.create` | Tambah jenis lahan | `{ name }` | row | Required |
| `admin.land.land_type.update` | Update jenis lahan | `{ id, name? }` | row | Required |
| `admin.land.land_type.delete` | Hapus jenis lahan | `{ id }` | row | Required |
| `admin.land.province_land.get` | List lahan provinsi | `{ page?, limit?, search?, provinceId?, landTypeId? }` | list join | Required |
| `admin.land.province_land.create` | Tambah lahan provinsi | `{ provinceId, landTypeId, area }` | row | Required |
| `admin.land.province_land.update` | Update lahan provinsi | `{ id, provinceId?, landTypeId?, area? }` | row | Required |
| `admin.land.province_land.delete` | Hapus lahan provinsi | `{ id }` | row | Required |
| `admin.land.regency_land.get` | List lahan kabupaten | `{ page?, limit?, search?, regencyId?, landTypeId? }` | list join | Required |

### 10.7 Admin Commodity APIs

| Endpoint | Purpose | Input | Output |
| --- | --- | --- | --- |
| `admin.commodity.commodity_type.get` | List jenis komoditas | `{ landTypeId?, search? }` | list |
| `admin.commodity.commodity_type.create` | Tambah jenis komoditas | `{ name, landTypeId, year }` | row |
| `admin.commodity.commodity_type.update` | Update jenis komoditas | `{ id, name?, landTypeId?, year? }` | row |
| `admin.commodity.commodity_type.delete` | Hapus jenis komoditas | `{ id }` | row |
| `admin.commodity.province_commodity.get` | List komoditas provinsi | `{ page?, limit?, search?, provinceId?, commodityTypeId? }` | list join |
| `admin.commodity.regency_commodity.get` | List komoditas kabupaten | `{ page?, limit?, search?, regencyId?, commodityTypeId? }` | list join |
| `admin.commodity.regency_commodity.create` | Tambah komoditas kabupaten | `{ regencyId, commodityTypeId, area, year, createdAt, updatedAt }` sesuai schema | row |
| `admin.commodity.regency_commodity.update` | Update komoditas kabupaten | `{ id, regencyId?, commodityTypeId?, area?, year? }` | row |
| `admin.commodity.regency_commodity.delete` | Hapus komoditas kabupaten | `{ id }` | row |

### 10.8 Admin Product APIs

| Endpoint | Purpose | Input | Output |
| --- | --- | --- | --- |
| `admin.product.product_type.get` | List jenis produk | `{ search? }` | list |
| `admin.product.product_type.create` | Tambah jenis produk | `{ name, description? }` | row |
| `admin.product.product_type.update` | Update jenis produk | `{ id, name?, description? }` | row |
| `admin.product.product_type.delete` | Hapus jenis produk | `{ id }` | result |
| `admin.product.product_brand.get` | List brand produk | `{ productTypeId?, search? }` | list |
| `admin.product.product_brand.create` | Tambah brand | `{ productTypeId, name, industry?, description? }` | row |
| `admin.product.product_brand.update` | Update brand | `{ id, name?, industry?, description? }` | row |
| `admin.product.product_brand.delete` | Hapus brand | `{ id }` | result |
| `admin.product.product_dosage.get` | List dosis produk | `{ commodityTypeId?, productBrandId?, search? }` | list |
| `admin.product.product_dosage.create` | Tambah dosis | `{ commodityTypeId, productBrandId, dosage, unit }` | row |
| `admin.product.product_dosage.update` | Update dosis | `{ id, dosage?, unit? }` | row |
| `admin.product.product_dosage.delete` | Hapus dosis | `{ id }` | result |

### 10.9 Admin Potential APIs

| Endpoint | Purpose | Input | Output | Status |
| --- | --- | --- | --- | --- |
| `admin.potential.province_potential.get` | List potensi provinsi | `{ page?, limit?, search?, provinceId?, productBrandId?, year? }` | list join province/product | Active |
| `admin.potential.regency_potential.*` | Potensi kabupaten | - | - | Belum aktif di router |

### 10.10 Admin Sale APIs

| Endpoint | Purpose | Input | Output |
| --- | --- | --- | --- |
| `admin.sale.sales_realization.get` | List realisasi penjualan | `{ page?, limit?, search?, productBrandId? }` | `{ data, meta }` |
| `admin.sale.sales_realization.create` | Tambah realisasi | `SalesRealizationSchema.omit({ id })` | row |
| `admin.sale.sales_realization.update` | Update realisasi | `SalesRealizationSchema` | row |
| `admin.sale.sales_realization.delete` | Hapus realisasi | `{ id: uuid }` | row |
| `admin.sale.daily_sales.get` | List penjualan harian | `{ page?, limit?, search? }` | `{ data, meta }` |
| `admin.sale.daily_sales.create` | Tambah penjualan harian | `DailySalesSchema` | row |
| `admin.sale.daily_sales.update` | Update penjualan harian | `DailySalesSchema` | row |
| `admin.sale.daily_sales.delete` | Hapus penjualan harian | `{ id: uuid }` | row |

### 10.11 Admin Stall APIs

| Endpoint | Purpose | Input | Output |
| --- | --- | --- | --- |
| `admin.stall.get` | List stall | `{ page?, limit?, search?, provinceId?, regencyId?, stallId? }` | list/meta |
| `admin.stall.create` | Tambah stall | `StallSchema` | row |
| `admin.stall.update` | Update stall | `StallSchema` dengan `id` | row |
| `admin.stall.delete` | Hapus stall | `{ id: uuid }` | row |
| `admin.stall.getStallProduct` | List relasi stall-product | `{ stallId?, productBrandId? }` | list |
| `admin.stall.stall_product_brand.get` | Alias get relasi | `{ stallId?, productBrandId? }` | list |
| `admin.stall.stall_product_brand.get_product_brands` | Ambil product brands | `{ productTypeId?, search? }` | list |
| `admin.stall.stall_product_brand.assign` | Assign produk ke stall | `{ stallId, productBrandIds }` | result assign/delete |

### 10.12 Admin User APIs

| Endpoint | Purpose | Input | Output | Validation |
| --- | --- | --- | --- | --- |
| `admin.user.get` | List user | `{ userId? }` | `{ data }` | userId optional |
| `admin.user.getById` | Ambil user by id | `{ userId }` | `{ data }` | string |
| `admin.user.update` | Update user | `{ id, name?, email?, image?, role? }` | `{ data }` | role enum `admin/viewer/guest` |
| `admin.user.delete` | Hapus user | `{ id }` | deleted row | id UUID |

### 10.13 Authentication Requirement

| API group | Auth |
| --- | --- |
| `healthCheck` | No |
| `auth.getSession` | No |
| `todo.*` | No |
| `privateData` | Yes |
| `admin.*` | Yes |

### 10.14 Validation Logic Summary

Validasi umum:

1. UUID memakai `z.uuid()` atau `z.string().uuid()`.
2. Search memakai `z.string().optional()`.
3. Pagination memakai `z.number().optional()`.
4. Field numeric memakai `z.number()` atau `z.coerce.number()` pada form stall.
5. Role memakai enum `admin`, `viewer`, `guest`.
6. Email memakai `z.string().email()`.

## 11. Authentication and Authorization

### 11.1 Login Mechanism

Login menggunakan `authClient.signIn.email` di form login. Backendnya ditangani Better Auth pada `/api/auth/$`.

Alur:

1. User mengisi email dan password.
2. Frontend memanggil Better Auth client.
3. Better Auth mencari account berdasarkan provider email/password.
4. Password diverifikasi.
5. Session dibuat.
6. Browser menerima cookie/session.
7. Root route memanggil `orpc.auth.getSession`.

### 11.2 Session Management

Session disimpan pada tabel `session`:

| Field | Kegunaan |
| --- | --- |
| `token` | Token session unik. |
| `expires_at` | Masa berlaku. |
| `user_id` | Pemilik session. |
| `ip_address` | IP login. |
| `user_agent` | Device/browser. |

Session diambil melalui:

```txt
auth.api.getSession({ headers: request.headers })
```

### 11.3 Token Strategy

Token strategy berasal dari Better Auth. Token session disimpan di tabel `session.token`, sedangkan OAuth token optional ada di tabel `account`. OAuth GitHub/Google belum aktif dalam konfigurasi runtime karena masih dikomentari di `auth/index.ts`.

### 11.4 Permission Strategy

Strategi izin saat ini:

| Layer | Strategy |
| --- | --- |
| Route UI admin | Cek login dan role `admin`. |
| Protected API | Cek session user. |
| User role storage | Field `user.role`. |
| Header | Mengecek `admin` atau `viewer` untuk akses tertentu. |

Gap:

1. API admin belum membedakan role.
2. Viewer belum punya akses formal.
3. Protected procedure belum punya `adminProcedure`.

Rekomendasi:

1. Tambahkan `adminProcedure`.
2. Tambahkan `viewerProcedure` atau `readOnlyProcedure`.
3. Terapkan pengecekan role pada semua procedure admin.
4. Tambahkan audit log untuk mutasi data penting.

### 11.5 Security Implementation

Keamanan yang sudah ada:

1. Password/session dikelola Better Auth.
2. Session dicek pada protected procedure.
3. Admin route dicek role.
4. Input divalidasi Zod.
5. Query DB memakai Drizzle.
6. Env divalidasi dengan T3 env (`env/server.ts`, `env/client.ts`).
7. `trustedOrigins` Better Auth memakai `CORS_ORIGIN`.

Catatan:

1. `.env.example` berisi nilai dummy dan duplikasi variabel; perlu dibersihkan agar tidak membingungkan.
2. Jangan menaruh secret produksi di `.env.example`.
3. Role API perlu diperketat.

## 12. Business Process Analysis

### 12.1 User Workflow

Workflow pengunjung/user umum:

1. Membuka halaman utama.
2. Melihat informasi publik seperti map, product potential, product knowledge, sales realization, atau stall jika route publik tersebut aktif.
3. Melakukan login/signup jika membutuhkan akses.
4. Setelah login, user mendapat session.
5. Jika role bukan admin, user tidak bisa masuk `/admin`.

### 12.2 Admin Workflow

Workflow admin:

1. Login melalui halaman `/auth/login`.
2. Sistem membuat session.
3. Admin membuka `/admin`.
4. Route guard memeriksa user dan role `admin`.
5. Admin masuk ke dashboard.
6. Admin memilih menu:
   - Region
   - Lands
   - Commodities
   - Products
   - Sales
   - Stalls
   - User Management
7. Admin melakukan create/update/delete data.
8. Frontend mengirim mutation ke oRPC.
9. Backend validasi input dan update database.
10. TanStack Query melakukan invalidasi/refetch.
11. UI menampilkan data terbaru.

### 12.3 Data Management Workflow

Urutan data master yang logis:

1. Buat data provinsi.
2. Buat data kabupaten berdasarkan provinsi.
3. Buat jenis lahan.
4. Input data lahan provinsi/kabupaten.
5. Buat jenis komoditas berdasarkan jenis lahan.
6. Input data komoditas provinsi/kabupaten.
7. Buat jenis produk.
8. Buat brand produk.
9. Buat dosis produk berdasarkan komoditas dan brand.
10. Input potensi produk per wilayah.
11. Input data stall dan produk yang tersedia.
12. Input realisasi penjualan dan penjualan harian.

### 12.4 Approval Workflow

Tidak ditemukan workflow approval eksplisit di source code. Tidak ada tabel status approval, endpoint approve/reject, atau role approver. Jika dibutuhkan untuk laporan, bagian ini harus ditulis sebagai **belum tersedia** dan dapat menjadi rekomendasi pengembangan.

Rekomendasi approval workflow:

1. Data baru masuk status `draft`.
2. Admin reviewer memeriksa.
3. Data disetujui menjadi `approved`.
4. Data yang ditolak diberi catatan.
5. Perubahan penting disimpan di audit log.

### 12.5 Reporting Workflow

Workflow reporting yang ada/tersirat:

1. Admin menginput realisasi penjualan.
2. Admin menginput penjualan harian.
3. Data ditampilkan di tabel sales.
4. Dependency `xlsx` dan `file-saver` menunjukkan dukungan ekspor data dapat/kemungkinan digunakan, terutama pada modul tabel.
5. Data potensi dan realisasi dapat menjadi bahan dashboard/presentasi.

## 13. Backend Developer Responsibilities

Bagian ini disusun khusus agar dapat digunakan sebagai materi laporan magang backend.

### 13.1 Scope Backend Developer

Backend developer pada proyek ini bertanggung jawab atas:

1. Merancang struktur database PostgreSQL.
2. Membuat Drizzle schema.
3. Membuat migration.
4. Mengembangkan oRPC procedure.
5. Menulis validasi input dengan Zod.
6. Menghubungkan autentikasi Better Auth dengan database.
7. Mengatur authorization awal melalui protected procedure.
8. Menghubungkan frontend dengan API type-safe.
9. Membuat query join untuk list data admin.
10. Menangani error seperti duplicate constraint dan data not found.
11. Menyiapkan endpoint health check.
12. Menyiapkan konfigurasi deployment dan environment.

### 13.2 Features Developed

Fitur backend yang ditemukan:

| Fitur | Modul |
| --- | --- |
| Auth email/password | Better Auth |
| Session endpoint | `auth.getSession` |
| User management | `admin.user.*` |
| Province CRUD | `admin.region.province.*` |
| Regency CRUD | `admin.region.regency.*` |
| Land type CRUD | `admin.land.land_type.*` |
| Province land CRUD | `admin.land.province_land.*` |
| Regency land read | `admin.land.regency_land.get` |
| Commodity type CRUD | `admin.commodity.commodity_type.*` |
| Province commodity read | `admin.commodity.province_commodity.get` |
| Regency commodity CRUD | `admin.commodity.regency_commodity.*` |
| Product type CRUD | `admin.product.product_type.*` |
| Product brand CRUD | `admin.product.product_brand.*` |
| Product dosage CRUD | `admin.product.product_dosage.*` |
| Province potential read | `admin.potential.province_potential.get` |
| Sales realization CRUD | `admin.sale.sales_realization.*` |
| Daily sales CRUD | `admin.sale.daily_sales.*` |
| Stall CRUD | `admin.stall.*` |
| Stall-product assignment | `admin.stall.stall_product_brand.assign` |
| Todo demo CRUD | `todo.*` |

### 13.3 APIs Created

Backend developer membuat router oRPC terpusat. Contoh grouping:

```txt
admin
├── region
│   ├── province
│   └── regency
├── land
│   ├── land_type
│   ├── province_land
│   └── regency_land
├── commodity
├── product
├── potential
├── sale
├── stall
└── user
```

Keunggulan API:

1. Type-safe dari server ke client.
2. Procedure dapat dipakai langsung dalam TanStack Query.
3. Validasi input ada pada boundary API.
4. Struktur modul mengikuti domain.

### 13.4 Database Design

Backend developer mendesain schema:

1. Auth tables untuk Better Auth.
2. Master wilayah: provinces, regencies.
3. Master lahan: land_types.
4. Data lahan: province_lands, regency_lands.
5. Master komoditas: commodity_types.
6. Data komoditas: province_commodities, regency_commodities.
7. Master produk: product_types, product_brands.
8. Dosis produk: product_dosages.
9. Potensi pasar: province_potentials, regency_potentials.
10. Stall: stalls, stall_product_brands.
11. Penjualan: sales_realizations, daily_sales.

### 13.5 Validation Logic

Validasi backend memakai Zod:

| Jenis validasi | Contoh |
| --- | --- |
| Required string | `name: z.string()` |
| UUID | `z.uuid()` dan `z.string().uuid()` |
| Email | `z.string().email()` |
| Role | `z.enum(['admin', 'viewer', 'guest'])` |
| Number optional | `z.number().optional()` |
| Nullable numeric report | `z.number().nullable().optional()` |
| Create schema | `EntitySchema.omit({ id: true })` |
| Update schema | object dengan `id` dan field optional |

### 13.6 Security Implementation

Tanggung jawab security backend:

1. Mengaktifkan Better Auth.
2. Menyimpan session di database.
3. Menggunakan `trustedOrigins`.
4. Menyediakan `protectedProcedure`.
5. Menggunakan Zod untuk input validation.
6. Menggunakan Drizzle untuk query parameterized.
7. Membatasi `/admin` pada role `admin`.

Perbaikan yang dapat dijadikan kontribusi magang:

1. Membuat `adminProcedure`.
2. Menambahkan role-based access control pada API.
3. Membersihkan `.env.example`.
4. Menambah audit log.
5. Menambah test authorization.

### 13.7 Optimization Work

Optimasi yang sudah ada:

1. TanStack Query caching.
2. Search/filter pada beberapa endpoint.
3. Pagination input pada beberapa endpoint.
4. Join query untuk mengurangi request client.
5. UUID random default pada database.

Optimasi yang masih dapat dilakukan:

1. Terapkan pagination SQL lengkap dengan `limit` dan `offset` secara konsisten.
2. Tambahkan index pada kolom pencarian dan FK penting.
3. Tambahkan query service/repository untuk query kompleks.
4. Hindari fetch semua data untuk filter client-side.
5. Gunakan relation Drizzle agar query lebih rapi.

## 14. Challenges and Solutions

### 14.1 Technical Challenges

| Challenge | Evidence | Solution implemented |
| --- | --- | --- |
| Menyatukan frontend dan backend | Full-stack di `apps/web` | TanStack Start server routes dan oRPC. |
| Type-safety API | Banyak modul admin | oRPC, TypeScript, Zod. |
| Banyak domain CRUD | Region, land, commodity, product, sale, stall | Route-colocated folder `-app`, `-domain`, `-components`. |
| Peta dan data bisnis | GeoJSON + DB region | Leaflet dan service administrative boundaries. |
| Auth integration | Better Auth dengan TanStack Start | `reactStartCookies`, `/api/auth`. |

### 14.2 Database Challenges

| Challenge | Solution |
| --- | --- |
| Banyak relasi antar master data | Foreign key pada Drizzle schema. |
| Data wilayah bertingkat | `provinces` dan `regencies` dengan FK. |
| Relasi many-to-many stall-product | Tabel `stall_product_brands`. |
| Kebutuhan migration | Drizzle migrations. |
| Data spatial/static GeoJSON | Disimpan sebagai file static di `public/data`. |

Catatan challenge belum selesai:

1. Migration dan schema perlu disinkronkan.
2. Belum ada unique compound untuk mencegah duplikasi data area per tahun.
3. `schema/index.ts` belum export semua schema.

### 14.3 Performance Challenges

| Challenge | Current handling | Recommendation |
| --- | --- | --- |
| List data besar | Search/filter pada endpoint tertentu | Tambahkan limit/offset konsisten. |
| Peta banyak GeoJSON | File static per regency | Lazy load GeoJSON sesuai level/area. |
| Banyak query join | Drizzle join | Tambahkan index FK dan search column. |
| Refetch setelah mutation | Invalidate query manual | Buat helper invalidation per module. |

### 14.4 Security Challenges

| Challenge | Current handling | Recommendation |
| --- | --- | --- |
| Akses admin | Route guard role admin | Tambah adminProcedure pada API. |
| Input malicious | Zod + Drizzle | Tambah schema lebih ketat, sanitize output bila perlu. |
| Secret management | Env variables | Bersihkan env example dari duplikasi. |
| Role viewer belum jelas | Role ada tapi belum dipakai penuh | Definisikan permission matrix. |
| Audit mutasi | Belum ditemukan | Tambahkan audit log. |

## 15. Security Analysis

### 15.1 Authentication

Authentication memakai Better Auth. Kelebihan:

1. Library khusus auth, bukan implementasi manual.
2. Session tersimpan di database.
3. Email/password aktif.
4. Struktur tabel auth disiapkan.
5. Cookie integration untuk TanStack Start tersedia.

### 15.2 Authorization

Authorization saat ini:

1. User harus login untuk protected procedure.
2. User harus role `admin` untuk route `/admin`.

Risiko:

1. Protected API admin hanya cek login, bukan role admin.
2. User role `viewer`/`guest` yang login secara teknis dapat melewati protectedProcedure jika memanggil API langsung.

Rekomendasi implementasi:

```txt
publicProcedure
protectedProcedure
adminProcedure
viewerProcedure/readOnlyProcedure
```

### 15.3 Input Validation

Input validation cukup baik karena Zod dipakai pada procedure. Namun beberapa schema masih longgar:

1. `criteria` stall di DB `varchar(1)`, tetapi schema hanya `z.string().optional()`.
2. Beberapa ID memakai `z.string()` bukan `z.string().uuid()`.
3. Pagination belum memakai `int`, `positive`, dan max limit.

### 15.4 Data Protection

Data protection:

1. Password tidak dikelola manual, dikelola Better Auth.
2. Token session ada di database.
3. Sensitive env tidak hardcode di source utama.

Catatan:

1. `.env.example` perlu dibersihkan dari nilai yang terlihat seperti secret walaupun mungkin dummy.
2. Jangan commit `.env` asli.

### 15.5 SQL Injection Prevention

Query memakai Drizzle ORM:

1. `eq(...)`, `and(...)`, `ilike(...)`.
2. Insert/update/delete menggunakan query builder.
3. Tidak terlihat raw SQL input dari user secara langsung, selain default SQL schema.

Ini mengurangi risiko SQL injection.

### 15.6 XSS Prevention

Frontend React secara default melakukan escaping untuk text. Tidak ditemukan penggunaan `dangerouslySetInnerHTML` pada analisis cepat. Namun tetap perlu:

1. Validasi input string.
2. Hindari render HTML dari user.
3. Sanitasi jika suatu saat menerima rich text.

### 15.7 Access Control

Access control route:

```txt
/admin
  -> require login
  -> admin.user.getById
  -> require role admin
```

Access control API:

```txt
protectedProcedure
  -> require context.session.user
```

Rekomendasi:

1. Tambahkan role check pada server API.
2. Tambahkan test untuk user `guest`, `viewer`, dan `admin`.
3. Tambahkan middleware audit untuk create/update/delete.

## 16. Testing Strategy

### 16.1 Current Testing Setup

Project memiliki:

| File | Fungsi |
| --- | --- |
| `vitest.setup.ts` | Setup test root. |
| `apps/web/vitest.config.ts` | Konfigurasi test web. |
| Dependency `vitest` | Test runner. |
| Dependency `@testing-library/react` | Testing UI React. |
| Dependency `jsdom` | DOM environment. |

Belum terlihat banyak test bisnis aktif dari daftar file.

### 16.2 Manual Testing

Manual test yang disarankan:

1. Login dengan user valid.
2. Signup user baru dan pastikan role default guest.
3. Akses `/admin` dengan guest, harus redirect.
4. Ubah role menjadi admin, akses `/admin`, harus berhasil.
5. CRUD provinsi.
6. CRUD kabupaten dengan provinsi.
7. CRUD jenis lahan dan lahan provinsi.
8. CRUD jenis komoditas dan komoditas kabupaten.
9. CRUD produk, brand, dan dosis.
10. CRUD sales realization.
11. CRUD daily sales.
12. CRUD stall.
13. Assign product brand ke stall.
14. Buka map dan validasi GeoJSON tampil.

### 16.3 API Testing

API test yang disarankan:

| Test | Expected |
| --- | --- |
| `healthCheck` tanpa login | `OK`. |
| Protected API tanpa login | `UNAUTHORIZED`. |
| Admin get province dengan login | data list. |
| Create province duplicate code | conflict/error DB tertangani. |
| Update tanpa field | error `No fields to update`. |
| Delete ID invalid | validation error. |
| User update role invalid | validation error. |

### 16.4 Validation Testing

Validasi yang perlu diuji:

1. UUID invalid pada setiap delete/update.
2. Email invalid pada update user.
3. Role selain `admin/viewer/guest`.
4. Code province lebih dari 3 karakter.
5. Code regency melebihi batas.
6. Number field dikirim string kosong.
7. `criteria` stall lebih dari 1 karakter.
8. Date invalid pada sales.

### 16.5 Integration Testing

Integration test disarankan untuk:

1. Auth login -> getSession -> protected API.
2. Province create -> regency create -> get regency join province.
3. Product type create -> product brand create -> product dosage create.
4. Stall create -> assign product brand -> get stall product.
5. Sales realization create -> get list with product brand.

## 17. Future Development Recommendations

### 17.1 Feature Recommendations

1. Tambahkan role `viewer` read-only secara resmi.
2. Tambahkan approval workflow untuk data penting.
3. Tambahkan audit log create/update/delete.
4. Tambahkan dashboard statistik penjualan dan potensi.
5. Tambahkan import Excel untuk data master.
6. Tambahkan export Excel/PDF untuk laporan.
7. Tambahkan endpoint CRUD untuk province commodity, regency land, province potential, dan regency potential.
8. Tambahkan halaman detail per wilayah.
9. Tambahkan geocoding atau validasi koordinat stall.
10. Tambahkan fitur upload data GeoJSON atau integrasi spatial DB bila dibutuhkan.

### 17.2 Security Improvements

1. Buat `adminProcedure`.
2. Terapkan role check pada semua `admin.*`.
3. Tambahkan CSRF/secure cookie configuration sesuai rekomendasi Better Auth.
4. Bersihkan `.env.example`.
5. Tambahkan audit log.
6. Tambahkan rate limiting login.
7. Tambahkan password policy jika didukung.
8. Tambahkan test authorization.

### 17.3 Scalability Improvements

1. Split `map-product.ts` menjadi schema domain kecil.
2. Split `lib/orpc/router/index.ts` menjadi router per domain.
3. Tambahkan Drizzle `relations()`.
4. Tambahkan repository/service layer untuk query kompleks.
5. Tambahkan index DB untuk FK dan kolom search.
6. Terapkan pagination SQL konsisten.
7. Buat reusable CRUD components dan hooks.
8. Standardisasi form library.

### 17.4 Performance Improvements

1. Lazy load GeoJSON per wilayah.
2. Cache static GeoJSON dengan header optimal.
3. Gunakan debounce search.
4. Hindari full list fetch untuk data besar.
5. Tambahkan query key invalidation yang lebih tepat.
6. Gunakan server-side pagination pada semua tabel besar.
7. Tambahkan monitoring slow query.

## 18. Internship Report Assets

### 18.1 Recommended Internship Title Alternatives

1. Pengembangan Backend Aplikasi Satu Peta Pasar Berbasis TypeScript dan PostgreSQL.
2. Implementasi API Type-Safe Menggunakan oRPC pada Sistem Pemetaan Potensi Pasar.
3. Perancangan Database dan Backend untuk Sistem Informasi Pemetaan Pasar Digital.
4. Pengembangan Modul Admin untuk Pengelolaan Data Wilayah, Komoditas, dan Produk.
5. Implementasi Autentikasi dan Otorisasi pada Aplikasi Web Satu Peta Pasar.
6. Pengembangan Sistem CRUD Data Master Berbasis TanStack Start, Drizzle ORM, dan PostgreSQL.
7. Integrasi Backend, Database, dan Peta Digital pada Sistem Informasi Potensi Pasar.
8. Pengembangan Modul Realisasi Penjualan dan Data Kios pada Sistem Satu Peta Pasar.
9. Penerapan Clean Architecture Berbasis Feature Folder pada Aplikasi Full-Stack TypeScript.
10. Perancangan API dan Validasi Data Menggunakan oRPC dan Zod pada Sistem Pemetaan Pasar.
11. Pengembangan Backend Admin Dashboard untuk Manajemen Data Potensi Produk.
12. Implementasi Database Relasional untuk Pengelolaan Wilayah, Lahan, Komoditas, Produk, dan Penjualan.
13. Optimalisasi Struktur API dan Validasi Backend pada Aplikasi Satu Peta Pasar.
14. Pengembangan Sistem Manajemen Kios dan Brand Produk Berbasis Web.
15. Implementasi Session-Based Authentication pada Aplikasi Full-Stack TanStack Start.

### 18.2 Background Ideas

1. Data pasar, wilayah, komoditas, produk, dan penjualan sering tersebar di berbagai format sehingga sulit dianalisis secara terpadu.
2. Pengambilan keputusan pemasaran membutuhkan data berbasis wilayah, bukan hanya tabel produk.
3. Digitalisasi data pasar memungkinkan admin memperbarui data secara cepat melalui dashboard.
4. Visualisasi peta membantu membaca potensi pasar dan persebaran kios secara lebih intuitif.
5. Backend yang type-safe mengurangi risiko error antara frontend dan database.
6. Sistem perlu autentikasi agar hanya user berwenang yang dapat mengelola data.

### 18.3 Problem Statements

1. Bagaimana merancang backend yang mampu mengelola data wilayah, lahan, komoditas, produk, potensi, stall, dan penjualan secara terpusat?
2. Bagaimana menerapkan API type-safe agar integrasi frontend dan backend lebih konsisten?
3. Bagaimana merancang database relasional untuk data pasar yang memiliki banyak hubungan antar entitas?
4. Bagaimana menerapkan autentikasi dan pembatasan akses admin?
5. Bagaimana melakukan validasi input agar data yang masuk ke database lebih konsisten?
6. Bagaimana menyiapkan struktur proyek yang mudah dikembangkan oleh tim?

### 18.4 Objectives

1. Menganalisis struktur source code aplikasi Satu Peta Pasar.
2. Mendokumentasikan arsitektur frontend, backend, database, dan infrastruktur.
3. Mengidentifikasi modul backend dan API yang tersedia.
4. Menjelaskan desain database dan relasi antar tabel.
5. Menjelaskan proses autentikasi dan authorization.
6. Menyusun rekomendasi pengembangan sistem berikutnya.
7. Menyediakan dokumentasi akademik untuk proposal, laporan, dan presentasi magang.

### 18.5 Benefits

| Pihak | Manfaat |
| --- | --- |
| Perusahaan/tim | Memiliki dokumentasi teknis yang lengkap untuk onboarding dan maintenance. |
| Admin sistem | Memahami alur data dan modul yang tersedia. |
| Backend developer | Memiliki peta API, schema, dan tanggung jawab pengembangan. |
| Intern | Memiliki bahan laporan yang detail dan berbasis source code aktual. |
| Akademik | Mendapat gambaran implementasi sistem nyata berbasis teknologi modern. |

### 18.6 Scope of Work

Ruang lingkup pekerjaan magang backend yang sesuai:

1. Menganalisis struktur proyek.
2. Mendokumentasikan schema database.
3. Mendokumentasikan endpoint oRPC.
4. Menguji API protected dan public.
5. Menambahkan validasi schema yang belum ketat.
6. Membuat role-based middleware.
7. Menyusun migration yang sinkron dengan schema.
8. Menambahkan test API.
9. Mengoptimalkan query list dan pagination.
10. Menyusun dokumentasi final.

### 18.7 Daily Activities Suitable for Backend Intern

| Hari/Kegiatan | Aktivitas |
| --- | --- |
| Analisis kode | Membaca struktur `apps/web/src/lib` dan `routes/admin`. |
| Dokumentasi DB | Membuat daftar tabel, kolom, PK, FK, dan relasi. |
| Dokumentasi API | Mencatat procedure, input, output, dan auth. |
| Validasi | Mengecek schema Zod dan membandingkan dengan DB constraint. |
| Testing manual | Menjalankan create/update/delete data pada modul admin. |
| Bug fixing | Memperbaiki mismatch field, ID validation, atau error handling. |
| Refactor kecil | Memisahkan schema, merapikan router, atau menambah helper. |
| Security review | Mengecek role access dan protected endpoint. |
| Performance review | Mengecek query list dan pagination. |
| Reporting | Menulis catatan harian magang dan hasil analisis. |

### 18.8 Weekly Activities Suitable for Backend Intern

| Minggu | Aktivitas |
| --- | --- |
| Minggu 1 | Onboarding proyek, setup environment, membaca arsitektur, menjalankan aplikasi lokal. |
| Minggu 2 | Analisis database, membuat ERD tekstual, mengecek migration dan schema. |
| Minggu 3 | Analisis API oRPC, dokumentasi endpoint, testing endpoint utama. |
| Minggu 4 | Implementasi perbaikan validasi dan error handling kecil. |
| Minggu 5 | Implementasi role-based API guard atau rekomendasi security. |
| Minggu 6 | Optimasi query/pagination dan penyusunan test backend. |
| Minggu 7 | Finalisasi dokumentasi teknis dan laporan magang. |
| Minggu 8 | Persiapan presentasi akhir, demo modul, dan penyusunan rekomendasi pengembangan. |

### 18.9 Internship Contributions

Kontribusi magang yang dapat ditulis:

1. Melakukan analisis source code aplikasi Satu Peta Pasar.
2. Membuat dokumentasi arsitektur sistem.
3. Membuat dokumentasi database dan relasi tabel.
4. Membuat dokumentasi API oRPC.
5. Mengidentifikasi gap authorization antara UI route dan API.
6. Mengidentifikasi kebutuhan sinkronisasi migration dengan schema.
7. Menyusun rekomendasi role-based access control.
8. Menyusun rekomendasi optimasi pagination dan query.
9. Menyusun rekomendasi pengembangan future features.
10. Menyediakan bahan proposal, laporan, dan presentasi magang.

## 19. Appendix: Ringkasan Endpoint oRPC

```txt
healthCheck
auth.getSession
privateData
todo.getAll
todo.create
todo.toggle
todo.delete
admin.region.province.get
admin.region.province.create
admin.region.province.update
admin.region.province.delete
admin.region.regency.get
admin.region.regency.create
admin.region.regency.update
admin.region.regency.delete
admin.land.land_type.get
admin.land.land_type.create
admin.land.land_type.update
admin.land.land_type.delete
admin.land.province_land.get
admin.land.province_land.create
admin.land.province_land.update
admin.land.province_land.delete
admin.land.regency_land.get
admin.commodity.commodity_type.get
admin.commodity.commodity_type.create
admin.commodity.commodity_type.update
admin.commodity.commodity_type.delete
admin.commodity.province_commodity.get
admin.commodity.regency_commodity.get
admin.commodity.regency_commodity.create
admin.commodity.regency_commodity.update
admin.commodity.regency_commodity.delete
admin.product.product_type.get
admin.product.product_type.create
admin.product.product_type.update
admin.product.product_type.delete
admin.product.product_brand.get
admin.product.product_brand.create
admin.product.product_brand.update
admin.product.product_brand.delete
admin.product.product_dosage.get
admin.product.product_dosage.create
admin.product.product_dosage.update
admin.product.product_dosage.delete
admin.potential.province_potential.get
admin.sale.sales_realization.get
admin.sale.sales_realization.create
admin.sale.sales_realization.update
admin.sale.sales_realization.delete
admin.sale.daily_sales.get
admin.sale.daily_sales.create
admin.sale.daily_sales.update
admin.sale.daily_sales.delete
admin.stall.get
admin.stall.getStallProduct
admin.stall.create
admin.stall.update
admin.stall.delete
admin.stall.stall_product_brand.get
admin.stall.stall_product_brand.get_product_brands
admin.stall.stall_product_brand.assign
admin.user.get
admin.user.getById
admin.user.update
admin.user.delete
```

## 20. Appendix: Catatan Risiko dan Asumsi

| Area | Catatan |
| --- | --- |
| Nama proyek | Nama package masih template; dokumentasi memakai nama folder/domain `Satu Peta Pasar`. |
| Backend Hono | `bts.jsonc` menyebut backend Hono, tetapi source aktif tidak memiliki `apps/server`; backend berada di TanStack Start server routes. |
| Authorization API | `protectedProcedure` belum cek role admin. |
| Viewer role | Ditemukan di kode, tetapi rule akses belum jelas. |
| Migration | Ada indikasi schema dan migration tidak sepenuhnya sinkron pada sales/daily sales. |
| Schema export | `schema/index.ts` belum export semua schema aktif. |
| Deployment | Ada Vercel/Netlify config, tetapi platform final belum pasti. |
| Monitoring | Health check ada, monitoring eksternal belum ditemukan. |
| Approval workflow | Belum ada di source code. |
| Testing | Setup test ada, tetapi coverage bisnis belum terlihat dari struktur file. |

## 21. Appendix: Rekomendasi Narasi Presentasi Akhir

Struktur presentasi akhir magang:

1. Latar belakang kebutuhan sistem Satu Peta Pasar.
2. Tujuan pengembangan sistem.
3. Teknologi yang digunakan.
4. Arsitektur sistem.
5. Desain database dan relasi utama.
6. Modul backend yang dianalisis/dikembangkan.
7. API oRPC dan validasi Zod.
8. Autentikasi dan authorization.
9. Demo workflow admin:
   - login
   - kelola provinsi
   - kelola produk
   - kelola stall
   - kelola sales
10. Tantangan teknis.
11. Solusi dan rekomendasi.
12. Kesimpulan kontribusi magang.

## 22. Kesimpulan

Proyek `satu-peta-pasar-master` merupakan aplikasi full-stack TypeScript yang menggabungkan frontend React/TanStack Start dengan backend server route, oRPC, Better Auth, Drizzle ORM, dan PostgreSQL. Domain utama aplikasi adalah pengelolaan dan pemetaan data pasar, mencakup wilayah, lahan, komoditas, produk, potensi, kios/stall, dan penjualan.

Secara arsitektur, sistem sudah memiliki fondasi modern: API type-safe, validasi Zod, database relasional, autentikasi Better Auth, dan route-colocated feature modules. Sistem juga sudah memiliki banyak modul CRUD admin yang dapat dijadikan bahan laporan magang backend.

Hal yang paling penting untuk pengembangan berikutnya adalah memperkuat role-based authorization pada API, menyinkronkan schema dengan migration, memperjelas role `viewer`, menambahkan test, dan mengoptimalkan query/pagination. Dokumentasi ini dapat digunakan sebagai dasar penyusunan proposal magang, laporan magang, presentasi akhir, dan dokumentasi akademik.

## 23. Deep Dive Backend Runtime dan Server-Side Execution

### 23.1 Posisi Backend dalam Struktur Proyek

Source code menunjukkan bahwa backend tidak dipisahkan menjadi aplikasi server tersendiri. Tidak ditemukan folder `apps/server`. Root `package.json` memang mendefinisikan workspace:

```txt
apps/web
packages/*
```

Namun folder `packages` tidak ada pada kondisi proyek yang dianalisis. Dengan demikian, semua implementasi aktif berada dalam `apps/web`.

Backend berjalan melalui fitur server route dan server runtime TanStack Start:

| Komponen | Lokasi | Peran |
| --- | --- | --- |
| Server entry | `apps/web/src/server.ts` | Membuat request handler TanStack Start, memuat i18n, dan membuat router. |
| Client entry | `apps/web/src/client.tsx` | Melakukan hydration React di browser. |
| Router factory | `apps/web/src/router.tsx` | Membuat TanStack Router, memasang TanStack Query SSR integration, dan plugin Lingui. |
| API routes | `apps/web/src/routes/api` | Menyediakan endpoint auth, RPC, dan OpenAPI. |
| oRPC context | `apps/web/src/lib/orpc/context.ts` | Membuat context request berisi session dan database. |
| DB client | `apps/web/src/lib/db/index.ts` | Membuat pool PostgreSQL dan instance Drizzle. |

### 23.2 Server Request Lifecycle

Alur eksekusi server untuk halaman biasa:

```txt
HTTP request masuk
  -> TanStack Start requestHandler
  -> getLocaleFromRequest()
  -> setupI18n()
  -> dynamicActivate(locale)
  -> createRouter({ i18n })
  -> defaultStreamHandler
  -> React/TanStack Router render
  -> Response HTML/stream
```

Alur eksekusi server untuk API:

```txt
HTTP request ke /api/rpc
  -> routes/api/rpc.$.ts
  -> createContext({ request })
  -> auth.api.getSession({ headers })
  -> context = { session, db }
  -> RPCHandler(router).handle(...)
  -> procedure handler
  -> Drizzle query
  -> response JSON/RPC
```

Alur eksekusi auth:

```txt
HTTP request ke /api/auth/*
  -> routes/api/auth.$.ts
  -> auth.handler(request)
  -> Better Auth menjalankan login/signup/session/logout
  -> Drizzle adapter membaca/menulis tabel auth
```

### 23.3 Isomorphic oRPC Client

File `lib/orpc/client.ts` menggunakan `createIsomorphicFn`. Artinya client oRPC punya dua mode:

| Mode | Cara kerja |
| --- | --- |
| Server-side | `createRouterClient(router)` memanggil router langsung tanpa HTTP external. |
| Client-side/browser | `RPCLink` mengirim request ke `${window.location.origin}/api/rpc`. |

Keuntungan desain ini:

1. Pada server-side rendering, pemanggilan data tidak perlu roundtrip HTTP.
2. Pada browser, API tetap dipanggil melalui endpoint `/api/rpc`.
3. Type inference tetap sama karena router oRPC menjadi sumber tipe utama.
4. TanStack Query utilities dibuat dari client yang sama melalui `createTanstackQueryUtils`.

Risiko/hal yang perlu diperhatikan:

1. Server-side call tetap menjalankan context berdasarkan request saat ini.
2. Jika procedure mengandalkan cookie/session, `getWebRequest()` harus tersedia.
3. Error handling perlu konsisten antara server-side direct call dan browser RPC call.

### 23.4 Environment Validation

Project menggunakan `@t3-oss/env-core`.

Server env:

| Variable | Required | Validation | Kegunaan |
| --- | --- | --- | --- |
| `DATABASE_URL` | Ya | URL | Koneksi PostgreSQL. |
| `BETTER_AUTH_SECRET` | Ya | min 32 char | Secret Better Auth. |
| `BETTER_AUTH_URL` | Optional | URL | Base URL auth. |
| `CORS_ORIGIN` | Optional | string | Trusted origin auth. |
| `GITHUB_CLIENT_ID` | Optional | string | OAuth GitHub jika diaktifkan. |
| `GITHUB_CLIENT_SECRET` | Optional | string | OAuth GitHub jika diaktifkan. |
| `GOOGLE_CLIENT_ID` | Optional | string | OAuth Google jika diaktifkan. |
| `GOOGLE_CLIENT_SECRET` | Optional | string | OAuth Google jika diaktifkan. |
| `SERVER_URL` | Optional | URL | URL server jika dibutuhkan. |

Client env:

| Variable | Required | Validation | Kegunaan |
| --- | --- | --- | --- |
| `VITE_APP_TITLE` | Optional | string min 1 | Judul aplikasi. |
| `VITE_BETTER_AUTH_URL` | Default tersedia | URL | URL auth untuk client. |

`emptyStringAsUndefined: true` membantu menghindari error ketika `.env` berisi string kosong. `skipValidation` dapat diaktifkan melalui `SKIP_ENV_VALIDATION`, dan Dockerfile memakai `SKIP_ENV_VALIDATION=true` pada tahap build.

### 23.5 API Route Handler Details

#### `routes/api/rpc.$.ts`

File ini menerima method:

```txt
HEAD, GET, POST, PUT, PATCH, DELETE
```

Semua method diarahkan ke fungsi `handle`. Handler membuat context dan memanggil `RPCHandler(router)`. Prefix yang digunakan adalah `/api/rpc`.

Perilaku fallback:

```txt
Jika handler tidak menghasilkan response, sistem mengembalikan "Not Found" dengan status 404.
```

#### `routes/api/$.ts`

File ini menggunakan `OpenAPIHandler`. Ada plugin `OpenAPIReferencePlugin` dan converter Zod ke JSON schema. Di konfigurasi OpenAPI, title masih `TanStack ORPC Playground`, sehingga untuk production sebaiknya diganti menjadi nama sistem, misalnya `Satu Peta Pasar API`.

Security scheme yang didefinisikan adalah bearerAuth. Namun auth aktual menggunakan Better Auth session/cookie, bukan bearer token manual. Ini perlu disesuaikan agar dokumentasi OpenAPI tidak membingungkan.

#### `routes/api/auth.$.ts`

File ini hanya meneruskan semua request ke `auth.handler(request)`. Desain ini sesuai pola Better Auth: framework route bertugas menjadi adapter HTTP, sedangkan semua logic login/signup/session/logout berada di Better Auth.

## 24. CRUD Implementation Pattern Analysis

### 24.1 Pola Umum CRUD

Sebagian besar modul admin mengikuti pola berikut:

```txt
routes/admin/<domain>/<module>/
  index.tsx
  -app/
    get-*.ts
    create-*.ts
    update-*.ts
    delete-*.ts
  -domain/
    schema.ts
  -components/
    create-*-form.tsx
    edit-*-form.tsx
    delete-*-form.tsx
  -hooks/
    form.ts
```

Alur create:

```txt
Form submit
  -> mutation oRPC
  -> protectedProcedure
  -> Zod input validation
  -> db.insert(table).values(input).returning()
  -> query invalidation
  -> toast success/error
```

Alur read:

```txt
Page load/search/filter
  -> useQuery(orpc.*.get.queryOptions({ input }))
  -> protectedProcedure
  -> build Drizzle select
  -> optional where conditions
  -> orderBy
  -> optional limit/offset
  -> return { data, total/meta }
```

Alur update:

```txt
Form submit
  -> mutation oRPC
  -> protectedProcedure
  -> Zod input validation
  -> pisahkan id dan update fields
  -> filter undefined values
  -> db.update(table).set(updateData).where(eq(id)).returning()
  -> jika tidak ada row: throw error
```

Alur delete:

```txt
Confirm delete
  -> mutation oRPC
  -> protectedProcedure
  -> validate id
  -> db.delete(table).where(eq(id)).returning()
  -> invalidate list
```

### 24.2 Province CRUD Pattern

Province adalah modul dasar karena banyak modul bergantung pada provinsi.

Endpoint `getProvinces`:

1. Input menerima `page`, `limit`, dan `search`.
2. Nilai default page adalah `1`.
3. Nilai default limit adalah `10`.
4. Offset dihitung, tetapi belum dipakai karena `.limit()` dan `.offset()` dikomentari.
5. Query select hanya mengambil `id`, `code`, `name`, `area`.
6. Search memakai `ilike(provinces.name, %search%)`.
7. Data diurutkan berdasarkan nama provinsi ascending.

Catatan teknis:

1. Pagination belum aktif walaupun variabel tersedia.
2. Count total juga masih dikomentari.
3. Response hanya `{ data }`, belum ada `total`, `page`, atau `limit`.

Implikasi bisnis:

1. Untuk data provinsi Indonesia yang relatif sedikit, full list masih aman.
2. Untuk konsistensi API admin, sebaiknya tetap menerapkan meta pagination.

### 24.3 Regency CRUD Pattern

Regency lebih kompleks karena bergantung pada province. Endpoint `getRegencies`:

1. Input menerima `page`, `limit`, `search`, dan `provinceId`.
2. `provinceId` divalidasi UUID.
3. Query melakukan `innerJoin(provinces, eq(regencies.provinceId, provinces.id))`.
4. Conditions array dibangun untuk filter province dan search.
5. Data diurutkan berdasarkan nama regency ascending.

Catatan teknis:

1. Conditions memakai `any[]`, melanggar target type-safety.
2. `.where(and(...conditions))` dipanggil walau conditions bisa kosong. Dalam Drizzle, ini perlu diuji karena `and()` tanpa argumen dapat menghasilkan perilaku tidak ideal tergantung versi.
3. Pagination belum aktif karena `.limit()` dan `.offset()` masih dikomentari.
4. Select tidak mengembalikan nama province walau join dilakukan. Jika UI butuh nama provinsi, select sebaiknya menambahkan `provinceName`.

Implikasi bisnis:

1. Kabupaten/kota Indonesia berjumlah ratusan; pagination server-side akan berguna.
2. Filter `provinceId` penting untuk dropdown dependent province -> regency.

### 24.4 Stall CRUD Pattern

Stall adalah modul yang paling representatif untuk use case bisnis karena menggabungkan wilayah, lokasi, pemilik, kontak, kriteria, dan produk.

Endpoint `getStalls`:

1. Input menerima `page`, `limit`, `search`, `provinceId`, `regencyId`, `stallId`.
2. Default page `1`, default limit `10`.
3. Query join:
   - `stalls` ke `provinces`.
   - `stalls` ke `regencies`.
4. Select mengembalikan:
   - data stall,
   - `provinceName`,
   - `regencyName`.
5. Conditions:
   - filter province,
   - filter regency,
   - filter stall,
   - search nama stall.
6. Pagination aktif dengan `.limit(limit).offset(offset)`.
7. Total dihitung dengan `select({ count: count() }).from(stalls)`.

Kelebihan:

1. Pagination sudah diterapkan.
2. Response memiliki `data` dan `total`.
3. Join memberikan data siap pakai untuk UI.
4. Filter cukup lengkap.

Catatan teknis:

1. Conditions masih memakai `any[]`.
2. Count total tidak melakukan join, tetapi filter hanya terhadap kolom `stalls`, jadi masih sesuai.
3. Property output nomor telepon diberi nama `notelp`, sedangkan schema/table menggunakan `noTelp`. Ini menciptakan mismatch DTO.
4. Input `provinceId`, `regencyId`, `stallId` memakai `z.string().optional()`, bukan UUID validation.
5. `criteria` di database `varchar(1)`, schema input belum membatasi panjang 1.

Endpoint `assignProductBrand`:

1. Input:
   - `stallId: uuid`.
   - `productBrandIds: array uuid`.
2. Query mengambil product brand existing untuk stall.
3. `toInsert` dihitung dari input yang belum ada di database.
4. `toDelete` dihitung dari existing yang tidak ada di input.
5. Insert dilakukan untuk brand baru.
6. Delete dilakukan untuk brand yang dihapus dari pilihan.
7. Response `{ success: true }`.

Kelebihan:

1. Logic idempotent untuk sinkronisasi relasi many-to-many.
2. Tidak menghapus lalu insert ulang semua data, hanya delta.
3. Memakai validasi UUID.

Rekomendasi:

1. Tambahkan unique constraint `(stall_id, product_brand_id)` agar tidak ada duplikasi jika race condition.
2. Jalankan insert/delete dalam transaction.
3. Validasi productBrandIds tidak mengandung duplikasi di input.

### 24.5 Sales Realization CRUD Pattern

Endpoint `getSalesRealizations`:

1. Input menerima `page`, `limit`, `search`, `productBrandId`.
2. Query join ke `productBrands`.
3. Select mengembalikan field laporan penjualan:
   - report date,
   - product brand,
   - daily/monthly/YTD realization,
   - RKAP monthly/YTD/yearly,
   - realization last year,
   - year.
4. Filter search dilakukan pada nama product brand.
5. Pagination aktif.
6. Total dihitung dari `salesRealizations`.

Catatan teknis:

1. Conditions diketik sebagai `ReturnType<typeof ilike>[]`, tetapi juga diisi `eq(...)`. Ini kurang tepat secara typing karena `eq` dan `ilike` menghasilkan SQL condition yang sama-sama compatible, tetapi tipe helper lebih baik memakai tipe SQL dari Drizzle.
2. `where(and(...conditions))` perlu aman ketika conditions kosong.
3. Total tidak memakai filter, sehingga jika search/productBrandId aktif total bisa tidak sesuai jumlah data terfilter. Ini perlu diperbaiki agar pagination benar.

Implikasi bisnis:

1. Data sales biasanya tumbuh besar, sehingga pagination dan filter harus benar.
2. Report sales sering dipakai untuk laporan akademik dan manajemen, sehingga konsistensi data sangat penting.

### 24.6 Error Handling Pattern

Beberapa create/update memakai `ORPCError`, contohnya untuk conflict duplicate. Pola yang terlihat:

1. Try insert.
2. Jika error database mengindikasikan unique violation, lempar `ORPCError('CONFLICT', ...)`.
3. Jika error lain, lempar `ORPCError('INTERNAL', ...)`.

Namun belum semua modul konsisten. Ada endpoint yang melempar `new Error('No fields to update')`, ada yang melempar ORPCError, dan ada yang tidak menangani not found secara eksplisit.

Rekomendasi error taxonomy:

| Kondisi | Error |
| --- | --- |
| Tidak login | `ORPCError('UNAUTHORIZED')` |
| Role tidak cukup | `ORPCError('FORBIDDEN')` |
| Data tidak ditemukan | `ORPCError('NOT_FOUND')` |
| Duplicate/unique violation | `ORPCError('CONFLICT')` |
| Input valid secara Zod tetapi tidak memenuhi rule bisnis | `ORPCError('BAD_REQUEST')` |
| Error database tidak terduga | `ORPCError('INTERNAL')` |

### 24.7 Backend Code Quality Observations

Observasi penting:

| Area | Kondisi |
| --- | --- |
| Type-safety | Baik secara umum, tetapi masih ada `any[]` di conditions. |
| Validation | Ada Zod, tetapi belum semua field ketat. |
| Router | Terpusat, tetapi terlalu besar. |
| Schema | Terpusat di Drizzle, tetapi `map-product.ts` terlalu luas. |
| Pagination | Tidak konsisten; beberapa endpoint punya variabel tapi belum menerapkan limit/offset. |
| Count total | Tidak selalu memperhitungkan filter. |
| Transactions | Belum tampak pada operasi multi-step seperti assign product brand. |
| Role check | Ada di UI route, belum kuat di API. |

## 25. Database Migration Deep Dive

### 25.1 Migration `0000_moaning_kinsey_walden.sql`

Migration pertama membuat tabel inti:

1. `account`
2. `session`
3. `user`
4. `verification`
5. `todo`

Migration ini juga menambahkan foreign key:

1. `account.user_id -> user.id` dengan cascade delete.
2. `session.user_id -> user.id` dengan cascade delete.

Catatan: pada migration ini tabel `user` belum memiliki kolom `role`. Kolom role baru ditambahkan pada migration berikutnya.

### 25.2 Migration `0001_nice_mongoose.sql`

Migration kedua menambahkan domain utama:

1. `commodity_types`
2. `land_types`
3. `product_brands`
4. `product_dosages`
5. `product_types`
6. `province_commodities`
7. `province_lands`
8. `province_potentials`
9. `provinces`
10. `regencies`
11. `regency_commodities`
12. `regency_lands`
13. `regency_potentials`
14. `daily_sales`
15. `sales_realizations`
16. `stall_product_brands`
17. `stalls`
18. Kolom `role` pada `user`

Migration ini juga menambahkan foreign key untuk hampir semua relasi utama.

### 25.3 Perbedaan Migration dengan Schema Saat Ini

Ada beberapa indikasi perbedaan antara migration SQL dan schema TypeScript saat ini:

| Area | Migration | Schema TypeScript |
| --- | --- | --- |
| `daily_sales` | Kolom hanya `date`, `product_brand_id`, `realization`, `year`, audit | Schema punya `month`, `province_id`, `qty`, `revenue`, `target`, `notes`, `realization` |
| `sales_realizations` | Kolom `realizaton_ytd` typo | Schema punya `realization_ytd` |
| `user.role` | Migration menambahkan `role text NOT NULL` tanpa default terlihat | Schema punya default function `guest` |
| `schema/index.ts` | Tidak terkait langsung | Barrel export belum memuat semua schema domain |

Risiko:

1. Database hasil migration lama dapat tidak cocok dengan query aplikasi.
2. Query terhadap `daily_sales.month` atau `qty` dapat gagal jika migration belum diperbarui.
3. Query terhadap `sales_realizations.realization_ytd` dapat gagal jika database masih punya typo `realizaton_ytd`.

Rekomendasi:

1. Jalankan `drizzle-kit generate` setelah schema final.
2. Review migration baru sebelum apply ke production.
3. Tambahkan migration rename column untuk typo.
4. Tambahkan migration add column untuk daily sales.
5. Tambahkan test smoke query untuk semua endpoint CRUD.

### 25.4 Schema Barrel Export Issue

`apps/web/src/lib/db/schema/index.ts` saat dianalisis berisi:

```txt
export * from './auth';
export * from './todo';
export * from './utils';
```

Padahal table aktif lain berada di:

```txt
map-product.ts
stall.ts
sale.ts
```

Karena `db/index.ts` melakukan namespace import dari `./schema`, Drizzle runtime hanya mendapat export dari barrel tersebut. Jika table domain tidak diekspor, relational schema pada Drizzle instance bisa tidak lengkap. Banyak handler memang mengimpor table langsung dari file schema spesifik, sehingga query tetap bisa berjalan. Namun untuk konsistensi dan Drizzle Studio/introspection, barrel sebaiknya mengekspor semua schema:

```txt
export * from './auth';
export * from './todo';
export * from './map-product';
export * from './stall';
export * from './sale';
export * from './utils';
```

### 25.5 Indexing Recommendations

Index yang disarankan:

| Table | Column | Reason |
| --- | --- | --- |
| `regencies` | `province_id` | Filter regency by province. |
| `province_lands` | `province_id`, `land_type_id` | Join/filter lahan. |
| `regency_lands` | `regency_id`, `land_type_id` | Join/filter lahan kabupaten. |
| `commodity_types` | `land_type_id` | Filter commodity by land type. |
| `product_brands` | `product_type_id` | Filter brand by type. |
| `product_dosages` | `commodity_type_id`, `product_brand_id` | Filter dosis. |
| `province_potentials` | `province_id`, `product_brand_id` | Filter potensi. |
| `stalls` | `province_id`, `regency_id` | Filter peta dan list stall. |
| `stall_product_brands` | `stall_id`, `product_brand_id` | Relasi many-to-many. |
| `sales_realizations` | `product_brand_id`, `report_date`, `year` | Laporan penjualan. |
| `daily_sales` | `product_brand_id`, `date`, `year` | Laporan harian. |

Unique compound yang disarankan:

| Table | Unique columns | Tujuan |
| --- | --- | --- |
| `province_lands` | `province_id`, `land_type_id`, `year` | Hindari duplikasi data lahan per tahun. |
| `regency_lands` | `regency_id`, `land_type_id`, `year` | Hindari duplikasi data lahan kabupaten. |
| `province_commodities` | `province_id`, `commodity_type_id`, `year` | Hindari duplikasi komoditas provinsi. |
| `regency_commodities` | `regency_id`, `commodity_type_id`, `year` | Hindari duplikasi komoditas kabupaten. |
| `product_dosages` | `commodity_type_id`, `product_brand_id`, `year` | Hindari dosis ganda. |
| `stall_product_brands` | `stall_id`, `product_brand_id` | Hindari produk ganda pada stall. |
| `sales_realizations` | `report_date`, `product_brand_id` | Hindari laporan ganda pada tanggal dan produk yang sama. |
| `daily_sales` | `date`, `product_brand_id`, `province_id` | Hindari penjualan harian ganda. |

## 26. Authentication and Authorization Deep Dive

### 26.1 Better Auth Configuration

Konfigurasi Better Auth:

| Config | Nilai |
| --- | --- |
| `baseURL` | `env.BETTER_AUTH_URL || http://localhost:3000` |
| `database` | Drizzle adapter provider `pg` |
| `schema` | `user`, `session`, `account`, `verification` |
| `plugins` | `reactStartCookies()` |
| `emailAndPassword` | enabled |
| `trustedOrigins` | `[env.CORS_ORIGIN || '']` |
| `secret` | `env.BETTER_AUTH_SECRET` |
| `generateId` | `generateUUID` |

### 26.2 Auth Data Model

Auth data model:

```txt
user
  id
  name
  email
  email_verified
  image
  role
  created_at
  updated_at

account
  user_id
  provider_id
  account_id
  password
  tokens...

session
  user_id
  token
  expires_at
  ip_address
  user_agent

verification
  identifier
  value
  expires_at
```

Better Auth memisahkan user profile, account provider, dan session. Ini memudahkan jika nanti social login diaktifkan.

### 26.3 Root Session Loading

Root route `__root.tsx` memanggil:

```txt
orpc.auth.getSession.call({})
```

Hasilnya disimpan dalam route context:

```txt
user: session?.user || null
```

Konsekuensi:

1. Semua route dapat membaca `context.user`.
2. Route guard seperti admin dapat bekerja sebelum component render.
3. Header dapat menampilkan status user.

### 26.4 Admin Route Guard Detail

`routes/admin/route.tsx` melakukan:

1. Jika `context.user` kosong, redirect ke `/auth/login`.
2. Jika user ada, panggil `orpc.admin.user.getById` dengan `context.user.id`.
3. Cek apakah hasil data memiliki role `admin`.
4. Jika bukan admin, redirect ke `/`.
5. Jika admin, render `AdminLayout`.

Ini adalah authorization di layer routing. Baik untuk UX, tetapi tidak cukup untuk keamanan API karena user dapat memanggil endpoint lewat script/browser devtools.

### 26.5 Permission Matrix Aktual

| Action | Anonymous | Guest login | Viewer login | Admin login |
| --- | --- | --- | --- | --- |
| Buka halaman publik | Bisa | Bisa | Bisa | Bisa |
| Login/signup | Bisa | Bisa | Bisa | Bisa |
| Panggil `auth.getSession` | Bisa | Bisa | Bisa | Bisa |
| Panggil `todo.*` | Bisa | Bisa | Bisa | Bisa |
| Panggil `admin.*` melalui UI `/admin` | Tidak | Tidak | Tidak | Bisa |
| Panggil `admin.*` langsung ke API | Tidak, karena no session | Bisa secara teknis | Bisa secara teknis | Bisa |

Bagian "bisa secara teknis" adalah risiko karena `protectedProcedure` hanya cek session.

### 26.6 Permission Matrix yang Disarankan

| Action | Anonymous | Guest | Viewer | Admin |
| --- | --- | --- | --- | --- |
| Halaman publik | Bisa | Bisa | Bisa | Bisa |
| Read map data publik | Bisa/opsional | Bisa | Bisa | Bisa |
| Read admin dashboard | Tidak | Tidak | Bisa jika read-only | Bisa |
| Create/update/delete data master | Tidak | Tidak | Tidak | Bisa |
| User management | Tidak | Tidak | Tidak | Bisa |
| Export report | Tidak/opsional | Tidak | Bisa | Bisa |
| Assign product to stall | Tidak | Tidak | Tidak | Bisa |

### 26.7 Admin Procedure Recommendation

Desain middleware yang disarankan:

```txt
protectedProcedure
  -> memastikan session user ada

adminProcedure
  -> protectedProcedure
  -> query user role atau baca role dari session jika tersedia
  -> role harus admin

viewerProcedure
  -> protectedProcedure
  -> role admin atau viewer
```

Manfaat:

1. Keamanan tidak bergantung pada UI.
2. Semua endpoint admin mendapat aturan seragam.
3. Penambahan role baru lebih mudah.
4. Test authorization lebih jelas.

## 27. Business Domain Deep Dive

### 27.1 Domain Region

Domain region adalah fondasi data. Provinsi dan kabupaten menjadi dimensi utama untuk:

1. Pemetaan GeoJSON.
2. Lahan.
3. Komoditas.
4. Potensi produk.
5. Stall.
6. Analisis penjualan jika dikaitkan dengan wilayah.

Data `code` sangat penting karena dapat menghubungkan database dengan file GeoJSON. File regency GeoJSON memakai pola kode seperti `11.01.geojson`, sedangkan tabel `regencies.code` punya panjang 5. Oleh karena itu mapping kode administratif perlu dijaga konsisten.

### 27.2 Domain Land

Jenis lahan menjadi dasar untuk mengelompokkan komoditas. Contoh yang tertulis di komentar schema:

```txt
Pangan, Kebun, Horti, Tambak
```

Relasi:

```txt
land_types
  -> province_lands
  -> regency_lands
  -> commodity_types
```

Manfaat bisnis:

1. Mengetahui potensi luas lahan per wilayah.
2. Menghubungkan jenis lahan dengan komoditas yang relevan.
3. Menjadi dasar rekomendasi produk/dosis berdasarkan komoditas.

### 27.3 Domain Commodity

Commodity type menyimpan komoditas seperti padi, sawit, atau bawang merah. Komoditas berelasi dengan jenis lahan dan dipakai untuk:

1. Data luas komoditas provinsi.
2. Data luas komoditas kabupaten.
3. Dosis produk.

Manfaat bisnis:

1. Memahami komoditas dominan per wilayah.
2. Menghubungkan kebutuhan produk dengan komoditas.
3. Membantu pemetaan potensi penjualan produk.

### 27.4 Domain Product

Produk terdiri dari:

1. `product_types`: kategori produk.
2. `product_brands`: brand/produk spesifik.
3. `product_dosages`: dosis brand untuk komoditas tertentu.

Komentar schema menyebut contoh:

```txt
Product type: Pupuk PSO, Probiotik, Dekomposer
Product brand: Urea, Petroganik, Petrofish
Dosage: kg/ha
```

Manfaat bisnis:

1. Mengelola katalog produk.
2. Menghubungkan produk dengan komoditas.
3. Menghitung potensi kebutuhan produk berdasarkan luas komoditas dan dosis.

### 27.5 Domain Potential

Potensi disimpan pada level provinsi dan kabupaten:

1. `province_potentials`
2. `regency_potentials`

Pada router saat ini, yang aktif hanya `province_potential.get`. Tabel `regency_potentials` ada, tetapi endpoint belum aktif.

Manfaat bisnis:

1. Menilai peluang pasar produk per wilayah.
2. Membantu prioritas distribusi dan pemasaran.
3. Menjadi bahan dashboard atau laporan manajemen.

### 27.6 Domain Stall

Stall/kios menyimpan:

1. Nama.
2. Alamat.
3. Provinsi dan kabupaten.
4. Latitude dan longitude.
5. Pemilik.
6. Nomor telepon.
7. Kriteria.
8. Brand produk yang tersedia.

Manfaat bisnis:

1. Mengetahui jaringan kios.
2. Melihat persebaran kios di peta.
3. Menganalisis cakupan produk berdasarkan lokasi.
4. Membantu sales/marketing menargetkan wilayah.

### 27.7 Domain Sales

Sales terdiri dari:

1. Realisasi penjualan periodik (`sales_realizations`).
2. Penjualan harian (`daily_sales`).

Field sales realization mendukung analisis:

1. Harian.
2. Bulanan.
3. Year-to-date.
4. RKAP bulanan.
5. RKAP YTD.
6. RKAP tahunan.
7. Perbandingan tahun lalu.

Manfaat bisnis:

1. Mengukur performa produk.
2. Membandingkan realisasi dengan target/RKAP.
3. Mendukung laporan periodik.
4. Menghubungkan performa penjualan dengan potensi wilayah.

## 28. Infrastructure, Deployment, and Operations

### 28.1 Dockerfile

Dockerfile memakai multi-stage build:

1. `builder` memakai `oven/bun:1`.
2. Install dependency dengan `bun install --frozen-lockfile`.
3. Copy source code.
4. Jalankan Lingui extract dan compile.
5. Set `SKIP_ENV_VALIDATION=true`.
6. Build aplikasi melalui `bun run build`.
7. Production stage memakai `oven/bun:1-slim`.
8. Copy `.output`.
9. Expose port 3000.
10. Start dengan `bun run start`.

Catatan:

1. Dependency runtime tidak dicopy karena bagian copy `node_modules` dikomentari. Jika `.output` sudah self-contained, ini bisa berjalan; jika tidak, perlu diuji.
2. Build target di Vite diset `netlify`, sehingga output untuk Docker perlu diverifikasi.
3. Build menjalankan Lingui extract di Docker, yang dapat mengubah file jika tidak hati-hati. Untuk CI production, biasanya compile saja cukup jika `.po` sudah final.

### 28.2 Docker Compose

`apps/web/docker-compose.yml` mendefinisikan:

| Service | Fungsi |
| --- | --- |
| `web` | Aplikasi web production. |
| `postgres` | Database PostgreSQL 16 Alpine. |

Network:

```txt
coolify
```

Network bersifat external, sehingga environment deployment diasumsikan memakai Coolify atau setup Docker network yang sudah ada.

Database:

1. Port host `45432` ke container `5432`.
2. Volume `siperan_app_postgres_final`.
3. Healthcheck memakai `pg_isready`.

Catatan:

1. Nama compose `siperan-app` berbeda dengan nama folder `satu-peta-pasar-master`.
2. Ini menunjukkan kemungkinan nama internal/proyek deployment adalah Siperan atau pernah berasal dari proyek lain.

### 28.3 Vite and Build Target

`vite.config.ts` menggunakan:

1. `tanstackStart({ target: 'netlify' })`.
2. Tailwind plugin.
3. Lingui plugin.
4. React plugin dengan Lingui macro.
5. tsconfig paths.
6. Dev server port 3000.

Catatan:

1. Target Netlify konsisten dengan adanya `netlify.toml`.
2. `vercel.json` juga ada, tetapi build output dan adapter perlu dicek.
3. Docker production perlu dipastikan kompatibel dengan output target Netlify.

### 28.4 GitHub Workflow

Workflow `.github/workflows/ping.yml`:

1. Nama workflow: `Ping Supabase`.
2. Schedule setiap 10 menit.
3. Menjalankan `curl -I` ke URL Supabase.

Ini bukan CI/CD build pipeline. Fungsinya tampaknya menjaga Supabase tetap aktif atau memonitor endpoint.

Rekomendasi CI/CD:

1. Tambahkan workflow pull request:
   - install dependency,
   - typecheck,
   - lint,
   - test,
   - build.
2. Tambahkan deployment workflow jika hosting dipilih.
3. Tambahkan migration check.
4. Tambahkan secret scanning.

### 28.5 Operational Checklist

Checklist menjalankan proyek:

1. Install Bun.
2. Copy `.env.example` menjadi `.env`.
3. Atur `DATABASE_URL`.
4. Atur `BETTER_AUTH_SECRET` minimal 32 karakter.
5. Atur `BETTER_AUTH_URL`.
6. Jalankan PostgreSQL.
7. Jalankan migration/push schema.
8. Jalankan `bun dev`.
9. Buat user pertama.
10. Ubah role user menjadi `admin`.
11. Login dan buka `/admin`.

## 29. Extended Testing and Quality Assurance Plan

### 29.1 Unit Test Targets

Unit test yang cocok:

| Area | Test |
| --- | --- |
| Zod schemas | Valid dan invalid input. |
| Utility UUID | Fallback crypto saat Bun tidak tersedia. |
| GeoJSON utils | Load boundary berdasarkan kode. |
| Role helper jika dibuat | admin/viewer/guest behavior. |
| Query input parser | Default page/limit/search. |

### 29.2 Integration Test Targets

Integration test backend:

1. Auth session context.
2. Protected procedure unauthorized.
3. Admin role forbidden jika belum admin.
4. Province CRUD.
5. Regency CRUD dengan FK province.
6. Product type -> brand -> dosage.
7. Stall -> assign products.
8. Sales realization dengan product brand.
9. Daily sales dengan product brand.

### 29.3 Database Test Data Strategy

Seed minimal:

```txt
1 province
2 regencies
2 land types
2 commodity types
2 product types
3 product brands
2 product dosages
1 province potential
2 stalls
2 sales realization rows
2 daily sales rows
1 admin user
1 viewer user
1 guest user
```

Manfaat seed:

1. Memastikan semua FK valid.
2. Memudahkan test join query.
3. Memudahkan demo.
4. Memudahkan screenshot presentasi.

### 29.4 API Test Matrix

| Test case | Expected result |
| --- | --- |
| Call `admin.region.province.get` tanpa session | UNAUTHORIZED |
| Call route `/admin` tanpa login | Redirect login |
| Call route `/admin` dengan guest | Redirect home |
| Call route `/admin` dengan admin | Render admin layout |
| Create province duplicate code | CONFLICT atau DB error tertangani |
| Create regency provinceId invalid | Validation error atau FK error |
| Update product type tanpa field | Error no fields |
| Assign duplicate productBrandIds | Tidak menghasilkan duplicate row |
| Delete product brand yang masih dipakai sales | FK error tertangani |
| Get sales with search | total sesuai filter |

### 29.5 Accessibility Testing

Karena AGENTS.md memuat aturan aksesibilitas, test manual perlu mencakup:

1. Semua button punya `type`.
2. Label form terhubung ke input.
3. Dialog dapat ditutup keyboard.
4. Select dapat dipakai dengan keyboard.
5. Link memiliki teks aksesibel.
6. SVG icon yang bermakna punya title atau label.
7. Tidak ada elemen click handler non-interaktif tanpa keyboard handler.
8. Tabel memiliki heading yang jelas.

### 29.6 Performance Testing

Skenario performance:

1. List stall dengan 10, 100, 1.000, 10.000 rows.
2. Search stall berdasarkan nama.
3. Filter stall berdasarkan province/regency.
4. Load peta national.
5. Load GeoJSON regency.
6. Export data sales.
7. Query sales realization dengan filter year/product.

Metode:

1. Ukur response time API.
2. Periksa query plan PostgreSQL.
3. Tambahkan index jika query lambat.
4. Uji pagination.
5. Uji cache static asset.

## 30. Academic Internship Report Draft Material

### 30.1 Contoh Latar Belakang Laporan

Perkembangan sistem informasi mendorong organisasi untuk mengelola data bisnis secara lebih terstruktur dan mudah dianalisis. Pada bidang pemasaran dan distribusi produk, data wilayah, komoditas, potensi pasar, kios, dan realisasi penjualan merupakan komponen penting dalam proses pengambilan keputusan. Apabila data tersebut masih dikelola secara terpisah, proses analisis menjadi kurang efisien dan rawan inkonsistensi.

Aplikasi Satu Peta Pasar dikembangkan sebagai solusi digital untuk mengintegrasikan data wilayah dan data bisnis ke dalam satu platform berbasis web. Sistem ini menyediakan modul administrasi untuk mengelola data provinsi, kabupaten/kota, jenis lahan, komoditas, produk, brand produk, dosis produk, potensi pasar, kios, serta realisasi penjualan. Selain itu, sistem juga menyediakan komponen peta yang memungkinkan data ditampilkan secara geografis.

Pada kegiatan magang, fokus pekerjaan diarahkan pada analisis dan dokumentasi arsitektur backend, desain database, implementasi API, autentikasi, otorisasi, validasi data, serta proses bisnis yang didukung oleh sistem. Dokumentasi ini diharapkan dapat membantu proses pengembangan lanjutan, onboarding developer, serta penyusunan laporan akademik.

### 30.2 Contoh Rumusan Masalah Laporan

1. Bagaimana struktur arsitektur backend pada aplikasi Satu Peta Pasar?
2. Bagaimana desain database relasional yang digunakan untuk merepresentasikan data wilayah, lahan, komoditas, produk, potensi, kios, dan penjualan?
3. Bagaimana implementasi API type-safe menggunakan oRPC?
4. Bagaimana mekanisme autentikasi dan otorisasi diterapkan pada sistem?
5. Apa saja tantangan teknis yang ditemukan pada backend dan database?
6. Apa rekomendasi pengembangan untuk meningkatkan keamanan, skalabilitas, dan maintainability sistem?

### 30.3 Contoh Tujuan Laporan

1. Menjelaskan arsitektur sistem Satu Peta Pasar berdasarkan source code.
2. Mendokumentasikan struktur database dan relasi antar tabel.
3. Mendokumentasikan endpoint API dan modul CRUD yang tersedia.
4. Menganalisis mekanisme autentikasi dan otorisasi.
5. Mengidentifikasi permasalahan teknis dan memberikan rekomendasi solusi.
6. Menyusun dokumentasi yang dapat digunakan untuk kebutuhan akademik dan pengembangan sistem.

### 30.4 Contoh Batasan Masalah

1. Analisis dilakukan berdasarkan source code yang tersedia di folder `D:\satu-peta-pasar-master`.
2. Fokus utama dokumentasi adalah backend, database, API, auth, authorization, dan proses bisnis.
3. Dokumentasi tidak melakukan pengujian production secara langsung.
4. Fitur yang belum ditemukan di source code tidak dianggap sudah tersedia.
5. Bagian yang belum pasti diberi catatan asumsi atau rekomendasi.

### 30.5 Contoh Metodologi Magang

Metodologi yang dapat ditulis:

1. **Observasi source code**
   Membaca struktur folder, konfigurasi proyek, schema database, API route, dan modul admin.

2. **Analisis arsitektur**
   Mengidentifikasi teknologi, alur request, client-server communication, dan dependency antar modul.

3. **Analisis database**
   Mencatat tabel, kolom, tipe data, primary key, foreign key, dan relasi.

4. **Analisis API**
   Mencatat endpoint oRPC, input, output, validasi, dan kebutuhan autentikasi.

5. **Analisis security**
   Mengevaluasi authentication, authorization, input validation, dan access control.

6. **Penyusunan dokumentasi**
   Membuat dokumentasi teknis dalam bahasa Indonesia untuk laporan magang dan presentasi.

### 30.6 Contoh Hasil dan Pembahasan

Hasil analisis menunjukkan bahwa aplikasi Satu Peta Pasar menggunakan arsitektur full-stack TypeScript dengan TanStack Start sebagai framework utama. Backend diimplementasikan menggunakan server routes dalam aplikasi web, sedangkan API menggunakan oRPC. Database menggunakan PostgreSQL dengan Drizzle ORM sebagai query builder dan schema management.

Sistem memiliki beberapa modul utama, yaitu region, land, commodity, product, potential, sale, stall, dan user management. Setiap modul admin umumnya memiliki folder `-app` untuk logic API, `-domain` untuk schema validasi, `-components` untuk antarmuka, dan `-hooks` untuk form atau state pendukung. Pola ini mendukung pengembangan berbasis fitur dan memudahkan pemisahan tanggung jawab.

Dari sisi keamanan, sistem sudah menggunakan Better Auth untuk autentikasi dan session management. Route admin juga dilindungi dengan pengecekan role `admin`. Namun, pada level API, protected procedure saat ini hanya memastikan user sudah login dan belum memverifikasi role admin. Oleh karena itu, salah satu rekomendasi utama adalah menambahkan middleware `adminProcedure` agar semua endpoint admin terlindungi secara server-side.

### 30.7 Contoh Kesimpulan Laporan

Berdasarkan analisis yang dilakukan, aplikasi Satu Peta Pasar memiliki fondasi teknologi yang modern dan cukup kuat untuk pengembangan sistem informasi berbasis wilayah. Penggunaan TanStack Start, oRPC, Drizzle ORM, Zod, Better Auth, dan PostgreSQL memberikan dukungan terhadap type-safety, validasi data, dan integrasi frontend-backend yang konsisten.

Sistem telah memiliki banyak modul backend yang relevan dengan kebutuhan bisnis, seperti pengelolaan wilayah, lahan, komoditas, produk, potensi, kios, dan penjualan. Dokumentasi ini menunjukkan bahwa backend developer memiliki peran penting dalam merancang database, membuat API, mengatur validasi, menerapkan autentikasi, dan menjaga integritas data.

Beberapa aspek yang masih perlu ditingkatkan adalah role-based authorization pada API, sinkronisasi migration dengan schema, konsistensi pagination, penambahan index database, serta pengujian otomatis. Dengan perbaikan tersebut, sistem dapat menjadi lebih aman, maintainable, dan siap dikembangkan ke skala yang lebih besar.

## 31. Suggested Final Presentation Slide Outline

### Slide 1: Judul

Judul yang disarankan:

```txt
Analisis dan Dokumentasi Backend Aplikasi Satu Peta Pasar Berbasis TypeScript, oRPC, Drizzle ORM, dan PostgreSQL
```

Isi:

1. Nama mahasiswa.
2. Institusi.
3. Tempat magang.
4. Periode magang.

### Slide 2: Latar Belakang

Poin:

1. Kebutuhan integrasi data pasar dan wilayah.
2. Pentingnya data potensi, kios, dan penjualan.
3. Kebutuhan dashboard admin.
4. Kebutuhan backend type-safe.

### Slide 3: Tujuan Magang

Poin:

1. Menganalisis source code.
2. Mendokumentasikan backend dan database.
3. Memetakan API dan modul CRUD.
4. Mengidentifikasi gap keamanan dan rekomendasi.

### Slide 4: Technology Stack

Poin:

1. TanStack Start.
2. React.
3. oRPC.
4. Better Auth.
5. Drizzle ORM.
6. PostgreSQL.
7. Zod.
8. TanStack Query.
9. Leaflet.

### Slide 5: Arsitektur Sistem

Diagram teks:

```txt
Browser -> TanStack Start -> oRPC -> Drizzle -> PostgreSQL
```

Tambahkan:

1. Better Auth untuk session.
2. GeoJSON untuk peta.
3. TanStack Query untuk cache.

### Slide 6: Struktur Folder

Tampilkan:

```txt
apps/web/src
  lib/auth
  lib/db
  lib/orpc
  routes/api
  routes/admin
```

### Slide 7: Database Design

Poin:

1. User/session/account.
2. Province/regency.
3. Land/commodity/product.
4. Potential.
5. Stall.
6. Sales.

### Slide 8: ERD Ringkas

Diagram:

```txt
Province -> Regency -> Stall
LandType -> CommodityType -> ProductDosage
ProductType -> ProductBrand -> Sales
ProductBrand -> StallProductBrand -> Stall
```

### Slide 9: API Implementation

Poin:

1. oRPC router.
2. protectedProcedure.
3. publicProcedure.
4. Zod validation.
5. TanStack Query client.

### Slide 10: Authentication Flow

Poin:

1. Login form.
2. Better Auth.
3. Session table.
4. Root route getSession.
5. Admin route guard.

### Slide 11: Authorization Analysis

Poin:

1. Role admin, viewer, guest.
2. Admin route hanya admin.
3. API protected hanya session.
4. Rekomendasi adminProcedure.

### Slide 12: CRUD Modules

Poin:

1. Region.
2. Land.
3. Commodity.
4. Product.
5. Potential.
6. Sale.
7. Stall.
8. User.

### Slide 13: Business Process

Poin:

1. Input data wilayah.
2. Input lahan dan komoditas.
3. Input produk dan dosis.
4. Input potensi.
5. Input stall.
6. Input penjualan.
7. Analisis melalui tabel dan peta.

### Slide 14: Tantangan

Poin:

1. Banyak relasi database.
2. API perlu type-safe.
3. Role permission perlu kuat.
4. Migration perlu sinkron.
5. Query pagination perlu konsisten.

### Slide 15: Rekomendasi

Poin:

1. adminProcedure.
2. Split router.
3. Split schema.
4. Add tests.
5. Add indexes.
6. Fix migrations.
7. Add audit log.

### Slide 16: Kesimpulan

Poin:

1. Sistem sudah memiliki fondasi modern.
2. Backend mencakup banyak modul bisnis.
3. Dokumentasi mendukung maintenance dan pengembangan.
4. Ada rekomendasi konkret untuk peningkatan.

## 32. Backend Intern Daily Log Examples

### Minggu 1

| Hari | Aktivitas | Output |
| --- | --- | --- |
| Senin | Setup repository dan membaca README/AGENTS | Memahami stack Bun, TanStack Start, oRPC, Drizzle. |
| Selasa | Menjalankan dependency dan memeriksa script | Daftar script dev/build/db/test. |
| Rabu | Menganalisis struktur `apps/web/src` | Peta folder frontend, backend, lib, routes. |
| Kamis | Membaca auth dan oRPC context | Catatan alur session dan API context. |
| Jumat | Membuat ringkasan arsitektur awal | Draft arsitektur high-level. |

### Minggu 2

| Hari | Aktivitas | Output |
| --- | --- | --- |
| Senin | Membaca schema auth dan todo | Dokumentasi tabel auth. |
| Selasa | Membaca schema map-product | Dokumentasi region, land, commodity, product, potential. |
| Rabu | Membaca schema sale dan stall | Dokumentasi sales dan stall. |
| Kamis | Membaca migrations | Catatan mismatch migration-schema. |
| Jumat | Menyusun ERD tekstual | Relasi entitas utama. |

### Minggu 3

| Hari | Aktivitas | Output |
| --- | --- | --- |
| Senin | Membaca router oRPC | Daftar endpoint. |
| Selasa | Analisis region/land API | Dokumentasi CRUD wilayah/lahan. |
| Rabu | Analisis commodity/product API | Dokumentasi CRUD komoditas/produk. |
| Kamis | Analisis sale/stall API | Dokumentasi sales dan stall. |
| Jumat | Analisis user management | Dokumentasi role dan user API. |

### Minggu 4

| Hari | Aktivitas | Output |
| --- | --- | --- |
| Senin | Analisis auth flow | Diagram login/session. |
| Selasa | Analisis authorization | Matrix role permission. |
| Rabu | Identifikasi security gap | Rekomendasi adminProcedure. |
| Kamis | Analisis validation schema | Daftar schema longgar. |
| Jumat | Menulis bagian security laporan | Draft security analysis. |

### Minggu 5

| Hari | Aktivitas | Output |
| --- | --- | --- |
| Senin | Analisis pagination endpoint | Daftar endpoint pagination aktif/tidak aktif. |
| Selasa | Analisis query join | Catatan optimasi query. |
| Rabu | Rekomendasi index DB | Tabel rekomendasi index. |
| Kamis | Analisis deployment config | Catatan Vercel/Netlify/Docker. |
| Jumat | Menulis rekomendasi teknis | Draft future development. |

### Minggu 6

| Hari | Aktivitas | Output |
| --- | --- | --- |
| Senin | Menyusun dokumentasi folder structure | Tree folder lengkap. |
| Selasa | Menyusun API documentation | Tabel endpoint lengkap. |
| Rabu | Menyusun business process | Workflow user/admin/data/report. |
| Kamis | Menyusun bahan presentasi | Outline slide. |
| Jumat | Review dokumentasi final | File dokumentasi siap dipakai. |

## 33. Implementation Risks and Mitigation Plan

### 33.1 Risk: Role Enforcement Hanya di UI

Risiko:

1. User login non-admin dapat memanggil endpoint admin langsung.
2. Data dapat diubah tanpa melewati UI route guard.
3. Security bergantung pada asumsi user hanya memakai UI.

Mitigasi:

1. Buat `adminProcedure`.
2. Ganti semua `admin.*` dari `protectedProcedure` menjadi `adminProcedure`.
3. Tambahkan integration test role guest/viewer/admin.
4. Tambahkan log forbidden access.

### 33.2 Risk: Migration Tidak Sinkron

Risiko:

1. Endpoint sales gagal karena kolom tidak ada.
2. Deployment baru tidak sesuai schema TypeScript.
3. Developer lokal memiliki DB berbeda dengan production.

Mitigasi:

1. Generate migration baru.
2. Review SQL migration.
3. Jalankan migration di staging.
4. Buat smoke test semua endpoint.
5. Hindari `db:push` langsung ke production.

### 33.3 Risk: Query Pagination Tidak Konsisten

Risiko:

1. Tabel besar lambat.
2. UI pagination salah.
3. Total count tidak sesuai filter.

Mitigasi:

1. Standardisasi response `{ data, total, page, limit }`.
2. Terapkan `.limit()` dan `.offset()` di semua endpoint list.
3. Count memakai filter yang sama.
4. Tambahkan max limit, misalnya 100.

### 33.4 Risk: Relasi Many-to-Many Duplicate

Risiko:

1. Stall dapat memiliki product brand duplicate.
2. Data laporan menjadi tidak akurat.
3. UI menampilkan produk berulang.

Mitigasi:

1. Unique constraint pada `(stall_id, product_brand_id)`.
2. Deduplicate input productBrandIds.
3. Gunakan transaction pada assign.

### 33.5 Risk: Mismatch Naming DTO

Risiko:

1. UI salah membaca field.
2. Developer bingung antara `noTelp`, `no_telp`, dan `notelp`.
3. Bug saat export/import data.

Mitigasi:

1. Gunakan camelCase konsisten pada TypeScript DTO.
2. DB tetap snake_case.
3. Rename output `notelp` menjadi `noTelp`.
4. Tambahkan typed output schema bila perlu.

## 34. Recommended Backend Refactor Roadmap

### Phase 1: Security and Correctness

1. Export semua schema di `schema/index.ts`.
2. Tambahkan `adminProcedure`.
3. Terapkan `adminProcedure` pada semua endpoint admin mutasi.
4. Perbaiki migration mismatch.
5. Perketat UUID validation.
6. Perbaiki `criteria` max length 1.
7. Perbaiki total count sales agar mengikuti filter.

### Phase 2: API Consistency

1. Standardisasi response list.
2. Standardisasi error handling dengan `ORPCError`.
3. Hilangkan `any[]` conditions.
4. Terapkan pagination semua list besar.
5. Split router oRPC per domain.
6. Rename oRPC keys ke camelCase untuk TypeScript consistency.

### Phase 3: Database Hardening

1. Tambahkan index.
2. Tambahkan unique compound constraints.
3. Tambahkan relations Drizzle.
4. Tambahkan audit log table.
5. Tambahkan transaction pada operasi multi-step.

### Phase 4: Testing and Observability

1. Tambahkan test auth.
2. Tambahkan test CRUD inti.
3. Tambahkan smoke test endpoint.
4. Tambahkan structured logging.
5. Tambahkan monitoring error.
6. Tambahkan health endpoint database.

### Phase 5: Business Feature Completion

1. CRUD province commodity.
2. CRUD regency land.
3. CRUD province potential.
4. CRUD regency potential.
5. Approval workflow.
6. Report export.
7. Dashboard analytics.
8. Import data master.

## 35. Final Notes for Academic Use

### 35.1 Klaim yang Aman Ditulis dalam Laporan

Klaim yang aman karena sesuai source code:

1. Sistem menggunakan TanStack Start dan React.
2. Sistem menggunakan oRPC untuk API.
3. Sistem menggunakan Better Auth untuk autentikasi.
4. Sistem menggunakan PostgreSQL dan Drizzle ORM.
5. Sistem memiliki modul admin untuk region, land, commodity, product, sale, stall, dan user.
6. Sistem memiliki schema database untuk potensi provinsi dan kabupaten.
7. Sistem memiliki static GeoJSON untuk peta Indonesia.
8. Sistem memiliki role `admin`, `viewer`, dan `guest`.
9. Route admin hanya mengizinkan role `admin`.
10. API admin saat ini berbasis session melalui `protectedProcedure`.

### 35.2 Klaim yang Harus Diberi Catatan

Klaim yang perlu catatan:

1. "Backend Hono" harus diberi catatan bahwa source aktif tidak memiliki `apps/server`; backend berjalan di TanStack Start server routes.
2. "CI/CD tersedia" harus diberi catatan bahwa workflow build/test belum terlihat, hanya ping Supabase.
3. "Viewer dapat melihat dashboard" belum terbukti karena admin guard hanya menerima admin.
4. "Approval workflow tersedia" tidak benar; belum ditemukan.
5. "Monitoring lengkap tersedia" tidak benar; baru ada health check dan workflow ping.
6. "Semua list sudah pagination" tidak benar; sebagian endpoint pagination belum aktif.
7. "Migration sepenuhnya sinkron" tidak pasti; ada mismatch.

### 35.3 Ringkasan Kontribusi Backend yang Paling Kuat untuk Magang

Kontribusi yang paling kuat untuk ditonjolkan:

1. Dokumentasi arsitektur backend end-to-end.
2. Dokumentasi schema database dan ERD tekstual.
3. Dokumentasi endpoint API oRPC.
4. Analisis authentication flow.
5. Analisis authorization dan permission gap.
6. Analisis CRUD modules.
7. Rekomendasi hardening database.
8. Rekomendasi adminProcedure.
9. Rekomendasi testing strategy.
10. Rekomendasi roadmap pengembangan backend.

### 35.4 Narasi Singkat untuk Sidang/Presentasi

Narasi yang dapat digunakan:

```txt
Selama kegiatan magang, saya melakukan analisis terhadap source code aplikasi Satu Peta Pasar. Aplikasi ini merupakan sistem full-stack berbasis TypeScript yang menggunakan TanStack Start sebagai framework, oRPC sebagai API layer, Better Auth untuk autentikasi, Drizzle ORM untuk akses database, dan PostgreSQL sebagai database utama.

Fokus analisis saya adalah backend architecture, database design, authentication, authorization, API implementation, dan business process. Dari hasil analisis, sistem telah memiliki modul admin yang cukup lengkap, meliputi pengelolaan wilayah, lahan, komoditas, produk, potensi, kios, penjualan, dan user.

Saya juga menemukan beberapa rekomendasi penting untuk pengembangan berikutnya, terutama penguatan role-based authorization pada API, sinkronisasi migration dengan schema, konsistensi pagination, penambahan index database, dan peningkatan testing. Dokumentasi yang saya susun dapat digunakan sebagai bahan proposal, laporan, presentasi akhir, dan referensi teknis untuk pengembangan lanjutan.
```

## 36. Feature-by-Feature Deep Analysis

Bagian ini menjelaskan setiap fitur yang ditemukan dari source code dengan enam sudut pandang: technical explanation, business purpose, backend responsibilities, database interaction, API interaction, dan security considerations.

### 36.1 Feature: Authentication dan Session Management

#### Technical Explanation

Authentication menggunakan Better Auth. Integrasi server berada di `apps/web/src/lib/auth/index.ts`, sedangkan route HTTP auth berada di `apps/web/src/routes/api/auth.$.ts`. Better Auth dikonfigurasi menggunakan Drizzle adapter dengan provider PostgreSQL. Email dan password diaktifkan melalui `emailAndPassword.enabled = true`.

Session dibaca pada setiap request API oRPC melalui `createContext`. Fungsi ini memanggil `auth.api.getSession({ headers: request.headers })`. Hasil session lalu dimasukkan ke context bersama database.

#### Business Purpose

Tujuan bisnis auth adalah memastikan hanya pengguna terdaftar yang dapat mengakses fitur internal. Untuk sistem Satu Peta Pasar, fitur seperti pengelolaan wilayah, produk, penjualan, stall, dan user merupakan data internal yang tidak boleh diubah oleh pengunjung umum.

#### Backend Responsibilities

Backend bertanggung jawab untuk:

1. Menghubungkan Better Auth dengan database.
2. Menyediakan route `/api/auth/*`.
3. Membaca session dari request.
4. Menyediakan session ke oRPC context.
5. Menjamin credential tidak dikelola manual oleh kode aplikasi.
6. Menyimpan data user, account, session, dan verification.

#### Database Interaction

Tabel yang terlibat:

| Table | Interaction |
| --- | --- |
| `user` | Menyimpan profil user dan role. |
| `account` | Menyimpan account provider dan password hash. |
| `session` | Menyimpan token session, expiry, IP, user agent. |
| `verification` | Menyimpan data verifikasi. |

#### API Interaction

API terkait:

| Endpoint | Purpose |
| --- | --- |
| `/api/auth/*` | Handler Better Auth untuk login, signup, logout, session, dan flow auth lain. |
| `auth.getSession` | Mengembalikan session aktif atau null. |

#### Security Considerations

1. `BETTER_AUTH_SECRET` wajib minimal 32 karakter.
2. `trustedOrigins` memakai `CORS_ORIGIN`.
3. Session disimpan di database, bukan hanya di memory.
4. OAuth provider belum aktif, sehingga perlu konfigurasi aman sebelum digunakan.
5. `.env.example` perlu dibersihkan dari duplikasi dan nilai yang menyerupai secret.

### 36.2 Feature: Admin Access Control

#### Technical Explanation

Route `/admin` dilindungi di `routes/admin/route.tsx`. Guard berjalan pada `beforeLoad`. Jika `context.user` kosong, user diarahkan ke `/auth/login`. Jika user ada, sistem memanggil `admin.user.getById` untuk mengecek role. User hanya boleh masuk jika memiliki role `admin`.

#### Business Purpose

Admin access control membatasi akses ke panel internal. Modul admin mengelola data penting seperti master wilayah, produk, penjualan, dan user, sehingga akses harus dibatasi.

#### Backend Responsibilities

Backend/route layer bertanggung jawab untuk:

1. Memastikan user sudah login.
2. Membaca role user dari database.
3. Mengizinkan hanya admin masuk ke layout admin.
4. Mengarahkan user tanpa izin ke halaman publik.

#### Database Interaction

Tabel:

| Table | Interaction |
| --- | --- |
| `user` | Field `role` dicek untuk menentukan akses admin. |

#### API Interaction

API:

| Endpoint | Purpose |
| --- | --- |
| `admin.user.getById` | Mengecek role user berdasarkan user id. |

#### Security Considerations

Route guard admin sudah baik untuk UX, tetapi API admin masih memakai `protectedProcedure` yang hanya mengecek session. Karena itu, user login non-admin secara teknis masih dapat memanggil endpoint admin langsung. Rekomendasi utama adalah menambahkan `adminProcedure` di server.

### 36.3 Feature: User Management

#### Technical Explanation

User management berada di `routes/admin/user`. Fitur yang tersedia adalah:

1. Get users.
2. Get user by ID.
3. Update user.
4. Delete user.

Update user menerima `name`, `email`, `image`, dan `role`. Role divalidasi dengan enum `admin`, `viewer`, `guest`.

#### Business Purpose

Fitur ini mendukung pengelolaan akses pengguna. Admin dapat mengatur siapa yang memiliki akses admin, viewer, atau guest. Ini penting untuk menjaga data internal dari perubahan tidak sah.

#### Backend Responsibilities

Backend bertanggung jawab untuk:

1. Mengambil daftar user.
2. Mengambil user tertentu untuk pengecekan role.
3. Memperbarui data profil dan role.
4. Menghapus user.
5. Memvalidasi email dan role.

#### Database Interaction

Tabel:

| Table | Interaction |
| --- | --- |
| `user` | Select, update, delete user. |
| `session` | Terpengaruh jika user dihapus karena FK cascade. |
| `account` | Terpengaruh jika user dihapus karena FK cascade. |

#### API Interaction

| Endpoint | Input | Output |
| --- | --- | --- |
| `admin.user.get` | `{ userId? }` | `{ data }` |
| `admin.user.getById` | `{ userId }` | `{ data }` |
| `admin.user.update` | `{ id, name?, email?, image?, role? }` | `{ data: updatedUser }` |
| `admin.user.delete` | `{ id }` | deleted user |

#### Security Considerations

1. Hanya admin seharusnya dapat mengubah role.
2. Delete user harus diproteksi karena dapat menghapus account dan session.
3. Perlu mencegah admin menghapus dirinya sendiri tanpa admin lain.
4. Perlu audit log untuk perubahan role.

### 36.4 Feature: Province Management

#### Technical Explanation

Province management berada di `routes/admin/region/province`. Schema `ProvinceSchema` memvalidasi `id`, `code`, `name`, dan `area`. CRUD dijalankan melalui Drizzle pada tabel `provinces`.

#### Business Purpose

Provinsi adalah entitas wilayah tingkat pertama. Data ini menjadi dasar pemetaan, filter, potensi, lahan, komoditas, stall, dan laporan berbasis wilayah.

#### Backend Responsibilities

1. Menyediakan list provinsi.
2. Menambah provinsi baru.
3. Mengubah data provinsi.
4. Menghapus provinsi.
5. Menjaga kode provinsi tetap unik.
6. Menyediakan data untuk dropdown/filter modul lain.

#### Database Interaction

Tabel:

| Table | Interaction |
| --- | --- |
| `provinces` | Select, insert, update, delete. |
| `regencies` | Bergantung pada province; cascade delete dari province ke regencies. |
| `province_lands` | Bergantung pada province. |
| `province_commodities` | Bergantung pada province. |
| `province_potentials` | Bergantung pada province. |
| `stalls` | Bergantung pada province. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.region.province.get` | Mengambil daftar provinsi. |
| `admin.region.province.create` | Menambah provinsi. |
| `admin.region.province.update` | Mengubah provinsi. |
| `admin.region.province.delete` | Menghapus provinsi. |

#### Security Considerations

1. Create/update/delete harus admin-only.
2. Penghapusan province dapat berdampak besar karena relasi cascade ke regencies.
3. Perlu confirmation dialog dan audit log.
4. Kode provinsi harus dijaga agar sinkron dengan GeoJSON.

### 36.5 Feature: Regency Management

#### Technical Explanation

Regency management berada di `routes/admin/region/regency`. Setiap regency memiliki `provinceId`. Query get melakukan join ke `provinces`, walau output saat ini terutama mengembalikan data regency.

#### Business Purpose

Regency/kabupaten adalah wilayah analisis tingkat kedua. Data ini penting untuk pemetaan detail, stall, lahan kabupaten, komoditas kabupaten, dan potensi kabupaten.

#### Backend Responsibilities

1. Validasi `provinceId`.
2. Menjaga kode regency unik.
3. Menyediakan filter regency berdasarkan province.
4. Menjalankan CRUD regency.
5. Menghubungkan regency dengan data peta.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `regencies` | Select, insert, update, delete. |
| `provinces` | Join dan FK. |
| `regency_lands` | Data turunan. |
| `regency_commodities` | Data turunan. |
| `regency_potentials` | Data turunan. |
| `stalls` | Data turunan. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.region.regency.get` | List regency dengan optional `provinceId` dan search. |
| `admin.region.regency.create` | Tambah regency. |
| `admin.region.regency.update` | Update regency. |
| `admin.region.regency.delete` | Hapus regency. |

#### Security Considerations

1. Perlu admin-only API guard.
2. Delete regency dapat merusak data stall/lahan/komoditas jika masih dipakai.
3. Perlu validasi kode administratif agar cocok dengan file GeoJSON.

### 36.6 Feature: Land Type Management

#### Technical Explanation

Land type management berada di `routes/admin/land`. Tabel `land_types` menyimpan kategori lahan. CRUD memakai protected procedure dan schema `LandTypeSchema`.

#### Business Purpose

Jenis lahan menjadi dasar pengelompokan komoditas dan perhitungan potensi. Contohnya lahan pangan, kebun, horti, dan tambak.

#### Backend Responsibilities

1. Menyediakan CRUD jenis lahan.
2. Menyediakan data untuk dropdown komoditas dan lahan wilayah.
3. Menjaga konsistensi nama jenis lahan.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `land_types` | Select, insert, update, delete. |
| `province_lands` | FK ke land type. |
| `regency_lands` | FK ke land type. |
| `commodity_types` | FK ke land type. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.land.land_type.get` | List land type. |
| `admin.land.land_type.create` | Tambah land type. |
| `admin.land.land_type.update` | Update land type. |
| `admin.land.land_type.delete` | Delete land type. |

#### Security Considerations

1. Delete land type harus hati-hati karena banyak data bergantung padanya.
2. Perlu unique constraint nama + tahun jika data tahunan.
3. Perlu audit perubahan karena mempengaruhi klasifikasi komoditas.

### 36.7 Feature: Province Land Management

#### Technical Explanation

Province land management berada di `routes/admin/land/province-land`. Data menghubungkan `provinceId`, `landTypeId`, dan `area`. Endpoint get melakukan join ke `provinces` dan `landTypes`.

#### Business Purpose

Fitur ini mencatat luas lahan berdasarkan jenis lahan pada level provinsi. Data ini dapat digunakan untuk menghitung potensi produk dan memahami karakter wilayah.

#### Backend Responsibilities

1. Validasi province dan land type.
2. Menyimpan luas area.
3. Menyediakan list data dengan nama province dan land type.
4. Mendukung filter province, land type, dan search.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `province_lands` | CRUD utama. |
| `provinces` | FK dan join. |
| `land_types` | FK dan join. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.land.province_land.get` | List lahan provinsi. |
| `admin.land.province_land.create` | Tambah data lahan provinsi. |
| `admin.land.province_land.update` | Update data. |
| `admin.land.province_land.delete` | Hapus data. |

#### Security Considerations

1. Area harus numeric dan tidak negatif.
2. Perlu mencegah duplikasi province-landType-year.
3. Data dapat mempengaruhi perhitungan potensi, sehingga perlu audit.

### 36.8 Feature: Regency Land Management

#### Technical Explanation

Regency land management berada di `routes/admin/land/regency-land`. Endpoint aktif pada router hanya `get`. Schema dan route UI tersedia, tetapi create/update/delete belum aktif di router.

#### Business Purpose

Data lahan kabupaten memberi granularitas lebih detail dibanding provinsi. Ini berguna untuk pemetaan potensi lebih presisi.

#### Backend Responsibilities

1. Menyediakan read endpoint.
2. Melakukan join ke regency dan land type.
3. Mendukung filter regency dan land type.
4. Di masa depan, menyediakan CRUD penuh.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `regency_lands` | Select. |
| `regencies` | Join. |
| `land_types` | Join. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.land.regency_land.get` | Mengambil data lahan kabupaten. |

#### Security Considerations

1. Walau hanya read, data tetap protected.
2. Jika dibuat CRUD, perlu admin-only.
3. Perlu unique compound regency-landType-year.

### 36.9 Feature: Commodity Type Management

#### Technical Explanation

Commodity type management berada di `routes/admin/commodity`. Komoditas dikaitkan dengan `landTypeId`, sehingga setiap komoditas memiliki konteks jenis lahan.

#### Business Purpose

Komoditas adalah objek produksi pertanian/perikanan/perkebunan yang menjadi dasar rekomendasi produk. Contoh: padi, sawit, bawang merah.

#### Backend Responsibilities

1. CRUD jenis komoditas.
2. Validasi land type.
3. Menyediakan data untuk province/regency commodity.
4. Menyediakan data untuk product dosage.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `commodity_types` | CRUD utama. |
| `land_types` | FK. |
| `province_commodities` | Data turunan. |
| `regency_commodities` | Data turunan. |
| `product_dosages` | Data turunan. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.commodity.commodity_type.get` | List komoditas. |
| `admin.commodity.commodity_type.create` | Tambah komoditas. |
| `admin.commodity.commodity_type.update` | Update komoditas. |
| `admin.commodity.commodity_type.delete` | Hapus komoditas. |

#### Security Considerations

1. Hapus komoditas dapat berdampak pada dosis produk dan data wilayah.
2. Nama komoditas sebaiknya unique per land type dan tahun.
3. Mutasi harus admin-only.

### 36.10 Feature: Province Commodity Read

#### Technical Explanation

Province commodity berada di `routes/admin/commodity/province-commodity`. Router hanya mengaktifkan endpoint get. Data berasal dari `province_commodities`, join `provinces` dan `commodityTypes`.

#### Business Purpose

Fitur ini digunakan untuk melihat komoditas dan area komoditas pada level provinsi.

#### Backend Responsibilities

1. Menyediakan list data.
2. Menyediakan filter province/commodity/search.
3. Menyediakan hasil join yang siap ditampilkan.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `province_commodities` | Select. |
| `provinces` | Join. |
| `commodity_types` | Join. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.commodity.province_commodity.get` | Mengambil data komoditas provinsi. |

#### Security Considerations

1. Data protected.
2. CRUD masa depan harus admin-only.
3. Perlu constraint untuk mencegah data ganda.

### 36.11 Feature: Regency Commodity Management

#### Technical Explanation

Regency commodity management memiliki CRUD aktif. Data menghubungkan `regencyId`, `commodityTypeId`, `area`, dan `year`.

#### Business Purpose

Fitur ini mencatat komoditas per kabupaten untuk analisis wilayah yang lebih detail.

#### Backend Responsibilities

1. CRUD regency commodity.
2. Validasi regency dan commodity type.
3. Menyediakan data join untuk UI.
4. Mendukung filter regency, commodity, dan search.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `regency_commodities` | CRUD utama. |
| `regencies` | FK dan join. |
| `commodity_types` | FK dan join. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.commodity.regency_commodity.get` | List komoditas kabupaten. |
| `admin.commodity.regency_commodity.create` | Tambah data. |
| `admin.commodity.regency_commodity.update` | Update data. |
| `admin.commodity.regency_commodity.delete` | Delete data. |

#### Security Considerations

1. Mutasi harus admin-only.
2. Area tidak boleh negatif.
3. Perlu mencegah duplikasi regency-commodity-year.

### 36.12 Feature: Product Type Management

#### Technical Explanation

Product type management berada di `routes/admin/product`. Product type adalah kategori produk. Endpoint CRUD memakai `productTypes`.

#### Business Purpose

Kategori produk membantu mengelompokkan brand. Contoh: pupuk, probiotik, dekomposer.

#### Backend Responsibilities

1. CRUD product type.
2. Menyediakan data dropdown untuk product brand.
3. Menangani duplicate conflict.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `product_types` | CRUD utama. |
| `product_brands` | Data turunan. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.product.product_type.get` | List product type. |
| `admin.product.product_type.create` | Tambah product type. |
| `admin.product.product_type.update` | Update product type. |
| `admin.product.product_type.delete` | Delete product type. |

#### Security Considerations

1. Delete harus mempertimbangkan product brand yang bergantung.
2. Perlu unique nama product type.
3. Mutasi harus admin-only.

### 36.13 Feature: Product Brand Management

#### Technical Explanation

Product brand management berada di `routes/admin/product/product-brand`. Brand memiliki `productTypeId`, `name`, `industry`, dan `description`.

#### Business Purpose

Brand produk adalah produk spesifik yang dipakai dalam potensi, dosis, penjualan, dan stall.

#### Backend Responsibilities

1. CRUD product brand.
2. Validasi product type.
3. Menyediakan filter product type dan search.
4. Menyediakan data untuk sales, dosage, potential, stall.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `product_brands` | CRUD utama. |
| `product_types` | FK. |
| `product_dosages` | Data turunan. |
| `province_potentials` | Data turunan. |
| `sales_realizations` | Data turunan. |
| `daily_sales` | Data turunan. |
| `stall_product_brands` | Data turunan. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.product.product_brand.get` | List brand. |
| `admin.product.product_brand.create` | Tambah brand. |
| `admin.product.product_brand.update` | Update brand. |
| `admin.product.product_brand.delete` | Delete brand. |

#### Security Considerations

1. Brand yang dipakai sales/stall tidak boleh dihapus sembarangan.
2. Perlu FK error handling yang ramah.
3. Mutasi harus admin-only.

### 36.14 Feature: Product Dosage Management

#### Technical Explanation

Product dosage menghubungkan `commodityTypeId` dan `productBrandId` dengan nilai dosis dan unit.

#### Business Purpose

Dosis produk dapat digunakan untuk menghitung kebutuhan produk berdasarkan luas komoditas. Ini penting untuk estimasi potensi pasar.

#### Backend Responsibilities

1. CRUD dosis produk.
2. Validasi commodity dan product brand.
3. Menyediakan filter berdasarkan commodity dan brand.
4. Menyimpan satuan dosis.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `product_dosages` | CRUD utama. |
| `commodity_types` | FK dan join. |
| `product_brands` | FK dan join. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.product.product_dosage.get` | List dosis. |
| `admin.product.product_dosage.create` | Tambah dosis. |
| `admin.product.product_dosage.update` | Update dosis. |
| `admin.product.product_dosage.delete` | Delete dosis. |

#### Security Considerations

1. Dosis harus numeric dan tidak negatif.
2. Unit harus distandardisasi.
3. Perlu unique commodity-brand-year.

### 36.15 Feature: Province Potential Read

#### Technical Explanation

Province potential saat ini memiliki endpoint get. Data berasal dari `province_potentials`, join province dan product brand.

#### Business Purpose

Fitur ini membantu melihat potensi produk per provinsi. Data ini dapat digunakan untuk perencanaan pemasaran dan target penjualan.

#### Backend Responsibilities

1. Menyediakan read endpoint.
2. Mendukung filter province, product brand, year, search.
3. Mengembalikan data join.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `province_potentials` | Select. |
| `provinces` | Join. |
| `product_brands` | Join. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.potential.province_potential.get` | Mengambil data potensi provinsi. |

#### Security Considerations

1. Data potensi dapat sensitif secara bisnis.
2. Jika dipublikasikan, perlu batasan field.
3. CRUD masa depan harus admin-only.

### 36.16 Feature: Sales Realization Management

#### Technical Explanation

Sales realization menyimpan laporan realisasi penjualan. Field mencakup realisasi harian, bulanan, YTD, RKAP, dan perbandingan tahun lalu. Endpoint CRUD tersedia.

#### Business Purpose

Fitur ini mendukung pemantauan performa penjualan produk. Admin dapat membandingkan realisasi dengan target/RKAP.

#### Backend Responsibilities

1. CRUD sales realization.
2. Validasi product brand.
3. Menyediakan list dengan join product brand.
4. Mendukung filter/search.
5. Menjaga konsistensi date/year/month.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `sales_realizations` | CRUD utama. |
| `product_brands` | FK dan join. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.sale.sales_realization.get` | List realisasi. |
| `admin.sale.sales_realization.create` | Tambah realisasi. |
| `admin.sale.sales_realization.update` | Update realisasi. |
| `admin.sale.sales_realization.delete` | Delete realisasi. |

#### Security Considerations

1. Data penjualan sensitif.
2. Mutasi harus admin-only.
3. Perlu audit log.
4. Total count harus sesuai filter untuk menghindari laporan salah.
5. Perlu sinkronisasi typo migration `realizaton_ytd`.

### 36.17 Feature: Daily Sales Management

#### Technical Explanation

Daily sales menyimpan data penjualan harian, termasuk tanggal, bulan, tahun, brand produk, provinceId, qty, revenue, target, notes, dan realization.

#### Business Purpose

Fitur ini mendukung pencatatan penjualan harian yang lebih granular dibanding laporan periodik.

#### Backend Responsibilities

1. CRUD daily sales.
2. Validasi date dan product brand.
3. Menyimpan numeric sales fields.
4. Menyediakan list dan filter.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `daily_sales` | CRUD utama. |
| `product_brands` | FK dan join. |
| `provinces` | `provinceId` ada, tetapi FK belum didefinisikan di schema. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.sale.daily_sales.get` | List daily sales. |
| `admin.sale.daily_sales.create` | Tambah daily sales. |
| `admin.sale.daily_sales.update` | Update daily sales. |
| `admin.sale.daily_sales.delete` | Delete daily sales. |

#### Security Considerations

1. Data revenue sensitif.
2. Perlu admin-only API.
3. Perlu validasi numeric non-negative.
4. Perlu FK untuk provinceId jika digunakan.
5. Perlu migration sinkron dengan schema.

### 36.18 Feature: Stall Management

#### Technical Explanation

Stall management menyimpan lokasi kios/stall, wilayah, koordinat, pemilik, telepon, dan kriteria. Fitur ini juga memiliki manajemen relasi product brand melalui `stall_product_brands`.

#### Business Purpose

Stall adalah titik distribusi/penjualan. Data stall membantu tim melihat persebaran pasar, jaringan distribusi, dan produk yang tersedia di lokasi tertentu.

#### Backend Responsibilities

1. CRUD stall.
2. Validasi province/regency.
3. Validasi koordinat.
4. Query join province/regency.
5. Mengelola relasi product brand.
6. Menyediakan data untuk marker peta.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `stalls` | CRUD utama. |
| `provinces` | FK dan join. |
| `regencies` | FK dan join. |
| `stall_product_brands` | Relasi product brand. |
| `product_brands` | Join untuk produk stall. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `admin.stall.get` | List stall. |
| `admin.stall.create` | Tambah stall. |
| `admin.stall.update` | Update stall. |
| `admin.stall.delete` | Delete stall. |
| `admin.stall.stall_product_brand.get` | List produk per stall. |
| `admin.stall.stall_product_brand.assign` | Sinkronisasi produk stall. |

#### Security Considerations

1. Data kontak pemilik harus dilindungi.
2. Koordinat lokasi dapat sensitif.
3. Assign product harus transaction.
4. Perlu unique constraint `stall_id + product_brand_id`.
5. Mutasi harus admin-only.

### 36.19 Feature: Map and GeoJSON Visualization

#### Technical Explanation

Map module berada di `routes/map`. Komponen utama mencakup `marketing-map`, `choropleth-map`, `dynamic-map`, `map-sidebar`, dan `stall-markers`. Data batas wilayah berada di `public/data`, termasuk `indonesia-boundary.geojson` dan ratusan file regency GeoJSON.

#### Business Purpose

Peta membantu memvisualisasikan wilayah, potensi, dan lokasi stall. Dengan peta, pengguna dapat memahami persebaran data secara spasial, bukan hanya tabel.

#### Backend Responsibilities

1. Menyediakan data province/regency dari database.
2. Menyediakan data potential/product/stall untuk layer map.
3. Memastikan kode administratif cocok dengan GeoJSON.
4. Menjaga endpoint read yang dibutuhkan map.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `provinces` | Boundary list dan filter. |
| `regencies` | Boundary list dan filter. |
| `province_potentials` | Potensi untuk choropleth. |
| `stalls` | Marker peta. |
| `product_brands` | Filter produk. |
| `land_types`, `commodity_types` | Filter analisis map. |

#### API Interaction

Map menggunakan beberapa oRPC:

1. `admin.region.province.get`.
2. `admin.region.regency.get`.
3. `admin.product.product_brand.get`.
4. `admin.land.land_type.get`.
5. `admin.commodity.commodity_type.get`.
6. `admin.potential.province_potential.get`.
7. `admin.stall.get`.

#### Security Considerations

1. Jika map publik memakai protected API, user publik tidak dapat melihat data.
2. Jika data map harus publik, perlu endpoint read-only publik yang tidak membocorkan data sensitif.
3. Data nomor telepon stall sebaiknya tidak ditampilkan publik tanpa izin.
4. GeoJSON static perlu cache, tetapi tidak mengandung data sensitif.

### 36.20 Feature: Internationalization

#### Technical Explanation

i18n menggunakan Lingui. File `.po` tersedia untuk global, auth, todos, admin, dan map dengan locale `en` dan `id`. Server memuat locale melalui `getLocaleFromRequest` dan `dynamicActivate`.

#### Business Purpose

Internationalization membantu sistem digunakan dalam bahasa Indonesia dan Inggris. Untuk kebutuhan akademik dan operasional lokal, bahasa Indonesia penting.

#### Backend Responsibilities

Backend/server rendering bertanggung jawab:

1. Membaca locale request.
2. Memuat katalog translasi.
3. Mengatur `<html lang>`.
4. Menjaga SSR dan hydration sinkron.

#### Database Interaction

Tidak ada interaksi database langsung untuk i18n.

#### API Interaction

Tidak ada endpoint bisnis khusus i18n, tetapi locale dipertahankan melalui search param dan plugin router.

#### Security Considerations

1. Locale divalidasi hanya `en` atau `id`.
2. Dynamic import locale harus dibatasi agar tidak menjadi path injection.

### 36.21 Feature: Todo Demo

#### Technical Explanation

Todo adalah contoh bawaan template. CRUD todo berada di `routes/todos/-app` dan tabel `todo`.

#### Business Purpose

Tidak terlihat sebagai domain utama Satu Peta Pasar. Fitur ini lebih berfungsi sebagai contoh implementasi oRPC CRUD.

#### Backend Responsibilities

1. Menyediakan contoh create/read/update/delete.
2. Menunjukkan pola validasi Zod.
3. Menunjukkan query Drizzle sederhana.

#### Database Interaction

| Table | Interaction |
| --- | --- |
| `todo` | Select, insert, update, delete. |

#### API Interaction

| Endpoint | Purpose |
| --- | --- |
| `todo.getAll` | Ambil semua todo. |
| `todo.create` | Buat todo. |
| `todo.toggle` | Update completed. |
| `todo.delete` | Delete todo. |

#### Security Considerations

Todo saat ini public. Jika tidak dibutuhkan production, sebaiknya dihapus atau diproteksi agar tidak menjadi endpoint contoh yang terbuka.

## 37. Daily Internship Activities - 30 Days

### Day 1

| Item | Detail |
| --- | --- |
| Objective | Memahami tujuan aplikasi dan struktur repository. |
| Activities | Membaca `README.md`, `AGENTS.md`, `package.json`, dan struktur root. Mengidentifikasi bahwa aplikasi aktif berada di `apps/web`. |
| Technologies used | Bun, Turborepo, TypeScript, PowerShell, ripgrep. |
| Outcomes | Mendapat gambaran awal bahwa proyek adalah aplikasi full-stack TanStack Start dengan oRPC dan Drizzle. |

### Day 2

| Item | Detail |
| --- | --- |
| Objective | Mengidentifikasi dependency dan script pengembangan. |
| Activities | Membaca `apps/web/package.json`, script dev/build/test/db, dependency frontend/backend. |
| Technologies used | Bun, Vite, TanStack Start, React, oRPC, Drizzle, Better Auth. |
| Outcomes | Daftar teknologi utama dan command development terdokumentasi. |

### Day 3

| Item | Detail |
| --- | --- |
| Objective | Memahami entry point client dan server. |
| Activities | Membaca `client.tsx`, `server.ts`, dan `router.tsx`. Mencatat alur SSR, hydration, i18n, dan router context. |
| Technologies used | TanStack Start, React, Lingui, TanStack Router. |
| Outcomes | Diagram lifecycle request halaman berhasil dibuat. |

### Day 4

| Item | Detail |
| --- | --- |
| Objective | Menganalisis API route backend. |
| Activities | Membaca `routes/api/rpc.$.ts`, `routes/api/auth.$.ts`, dan `routes/api/$.ts`. |
| Technologies used | oRPC, Better Auth, OpenAPI, TanStack Start server routes. |
| Outcomes | Dokumentasi endpoint `/api/rpc`, `/api/auth`, dan `/api` dibuat. |

### Day 5

| Item | Detail |
| --- | --- |
| Objective | Memahami koneksi database. |
| Activities | Membaca `lib/db/index.ts`, `drizzle.config.ts`, dan environment server. |
| Technologies used | PostgreSQL, Drizzle ORM, node-postgres, T3 Env. |
| Outcomes | Alur koneksi database dan kebutuhan `DATABASE_URL` terdokumentasi. |

### Day 6

| Item | Detail |
| --- | --- |
| Objective | Menganalisis schema auth. |
| Activities | Membaca `schema/auth.ts`, mencatat tabel user/session/account/verification. |
| Technologies used | Drizzle ORM, Better Auth, PostgreSQL. |
| Outcomes | Dokumentasi tabel auth dan relasi user-session-account selesai. |

### Day 7

| Item | Detail |
| --- | --- |
| Objective | Menganalisis schema wilayah. |
| Activities | Membaca `schema/map-product.ts` bagian provinces dan regencies. |
| Technologies used | Drizzle ORM, PostgreSQL FK, UUID. |
| Outcomes | Dokumentasi tabel provinces dan regencies beserta relasi selesai. |

### Day 8

| Item | Detail |
| --- | --- |
| Objective | Menganalisis schema lahan dan komoditas. |
| Activities | Membaca land_types, province_lands, regency_lands, commodity_types, province_commodities, regency_commodities. |
| Technologies used | Drizzle ORM, PostgreSQL relational design. |
| Outcomes | Relasi land -> commodity -> wilayah terdokumentasi. |

### Day 9

| Item | Detail |
| --- | --- |
| Objective | Menganalisis schema produk dan potensi. |
| Activities | Membaca product_types, product_brands, product_dosages, province_potentials, regency_potentials. |
| Technologies used | Drizzle ORM, PostgreSQL. |
| Outcomes | Relasi product brand dengan dosage dan potential terdokumentasi. |

### Day 10

| Item | Detail |
| --- | --- |
| Objective | Menganalisis schema stall dan sales. |
| Activities | Membaca `schema/stall.ts` dan `schema/sale.ts`. |
| Technologies used | Drizzle ORM, PostgreSQL, relational modeling. |
| Outcomes | Dokumentasi stall, stall_product_brands, daily_sales, dan sales_realizations selesai. |

### Day 11

| Item | Detail |
| --- | --- |
| Objective | Membandingkan schema dengan migration. |
| Activities | Membaca migration `0000` dan `0001`, membandingkan dengan schema TypeScript. |
| Technologies used | Drizzle Kit, SQL migration, PostgreSQL. |
| Outcomes | Ditemukan mismatch daily_sales dan typo realization_ytd pada migration. |

### Day 12

| Item | Detail |
| --- | --- |
| Objective | Menganalisis oRPC infrastructure. |
| Activities | Membaca `lib/orpc/index.ts`, `context.ts`, `client.ts`, dan router utama. |
| Technologies used | oRPC, TanStack Query, TanStack Start. |
| Outcomes | Alur publicProcedure/protectedProcedure dan isomorphic client terdokumentasi. |

### Day 13

| Item | Detail |
| --- | --- |
| Objective | Menganalisis authentication implementation. |
| Activities | Membaca `lib/auth/index.ts`, auth client, login form, signup form. |
| Technologies used | Better Auth, Drizzle Adapter, React form. |
| Outcomes | Flow login/signup/session terdokumentasi. |

### Day 14

| Item | Detail |
| --- | --- |
| Objective | Menganalisis admin route authorization. |
| Activities | Membaca `routes/admin/route.tsx`, header, user management role. |
| Technologies used | TanStack Router, oRPC, Better Auth. |
| Outcomes | Matrix role admin/viewer/guest dibuat dan gap API authorization ditemukan. |

### Day 15

| Item | Detail |
| --- | --- |
| Objective | Menganalisis Region API. |
| Activities | Membaca CRUD province dan regency. |
| Technologies used | oRPC, Zod, Drizzle. |
| Outcomes | Dokumentasi API region dan catatan pagination dibuat. |

### Day 16

| Item | Detail |
| --- | --- |
| Objective | Menganalisis Land API. |
| Activities | Membaca CRUD land type, province land, dan read regency land. |
| Technologies used | oRPC, Drizzle joins, Zod. |
| Outcomes | Dokumentasi fitur land dan gap CRUD regency land dibuat. |

### Day 17

| Item | Detail |
| --- | --- |
| Objective | Menganalisis Commodity API. |
| Activities | Membaca CRUD commodity type, read province commodity, CRUD regency commodity. |
| Technologies used | oRPC, Zod, Drizzle. |
| Outcomes | Dokumentasi fitur commodity dan status endpoint aktif selesai. |

### Day 18

| Item | Detail |
| --- | --- |
| Objective | Menganalisis Product API. |
| Activities | Membaca CRUD product type, product brand, dan product dosage. |
| Technologies used | oRPC, Zod, Drizzle, PostgreSQL FK. |
| Outcomes | Dokumentasi product domain dan relasi product-brand-dosage selesai. |

### Day 19

| Item | Detail |
| --- | --- |
| Objective | Menganalisis Potential API. |
| Activities | Membaca endpoint province potential dan schema regency potential. |
| Technologies used | oRPC, Drizzle joins. |
| Outcomes | Dokumentasi potensi dan catatan regency potential belum aktif dibuat. |

### Day 20

| Item | Detail |
| --- | --- |
| Objective | Menganalisis Sales API. |
| Activities | Membaca sales realization dan daily sales CRUD. |
| Technologies used | oRPC, Zod, Drizzle, PostgreSQL date/real fields. |
| Outcomes | Dokumentasi sales dan catatan security data revenue selesai. |

### Day 21

| Item | Detail |
| --- | --- |
| Objective | Menganalisis Stall API. |
| Activities | Membaca CRUD stall, get stall product, dan assign product brand. |
| Technologies used | oRPC, Zod, Drizzle, many-to-many relation. |
| Outcomes | Dokumentasi stall dan rekomendasi transaction/unique constraint dibuat. |

### Day 22

| Item | Detail |
| --- | --- |
| Objective | Menganalisis Map module. |
| Activities | Membaca map components dan administrative boundaries service. |
| Technologies used | Leaflet, React Leaflet, GeoJSON, oRPC. |
| Outcomes | Dokumentasi hubungan map dengan backend region/stall/potential selesai. |

### Day 23

| Item | Detail |
| --- | --- |
| Objective | Menganalisis UI admin navigation. |
| Activities | Membaca navigation-items, admin layout, sidebar, nav user. |
| Technologies used | React, Jotai, Lucide, shadcn/Radix. |
| Outcomes | Daftar menu dan akses admin terdokumentasi. |

### Day 24

| Item | Detail |
| --- | --- |
| Objective | Menganalisis security dan risiko. |
| Activities | Menyusun daftar risiko authentication, authorization, input validation, migration, dan data protection. |
| Technologies used | Better Auth, Zod, Drizzle, PostgreSQL. |
| Outcomes | Security analysis dan mitigasi dibuat. |

### Day 25

| Item | Detail |
| --- | --- |
| Objective | Menganalisis deployment dan infrastructure. |
| Activities | Membaca Dockerfile, docker-compose, Vite config, Vercel, Netlify, GitHub workflow. |
| Technologies used | Docker, Docker Compose, Netlify, Vercel, GitHub Actions, Bun. |
| Outcomes | Dokumentasi deployment dan catatan CI/CD selesai. |

### Day 26

| Item | Detail |
| --- | --- |
| Objective | Menyusun database documentation. |
| Activities | Membuat tabel kolom, tipe data, PK, FK, dan relasi setiap tabel. |
| Technologies used | PostgreSQL, Drizzle schema, SQL migrations. |
| Outcomes | Database documentation lengkap selesai. |

### Day 27

| Item | Detail |
| --- | --- |
| Objective | Menyusun API documentation. |
| Activities | Membuat tabel endpoint, input, output, auth, dan validasi. |
| Technologies used | oRPC, Zod, TanStack Query. |
| Outcomes | API documentation lengkap selesai. |

### Day 28

| Item | Detail |
| --- | --- |
| Objective | Menyusun business process analysis. |
| Activities | Menulis user workflow, admin workflow, data management workflow, reporting workflow. |
| Technologies used | Domain analysis, backend module mapping. |
| Outcomes | Business process siap digunakan untuk laporan. |

### Day 29

| Item | Detail |
| --- | --- |
| Objective | Menyusun rekomendasi teknis. |
| Activities | Menulis roadmap security, API consistency, database hardening, testing, dan feature completion. |
| Technologies used | Backend architecture, database design, QA strategy. |
| Outcomes | Future development recommendations selesai. |

### Day 30

| Item | Detail |
| --- | --- |
| Objective | Finalisasi dokumentasi magang. |
| Activities | Menggabungkan executive summary, overview, technical docs, internship assets, checklist evidence, dan slide outline. |
| Technologies used | Markdown, technical writing, source code analysis. |
| Outcomes | `PROJECT_DOCUMENTATION_FOR_INTERNSHIP.md` siap menjadi bahan laporan 50-100 halaman. |

## 38. Weekly Internship Activities

### Week 1

| Focus | Activities | Technologies | Outcomes |
| --- | --- | --- | --- |
| Onboarding dan pemahaman arsitektur | Setup proyek, membaca dokumentasi, memahami folder root dan `apps/web`, memahami script Bun/Turbo. | Bun, Turborepo, TypeScript, TanStack Start. | Peta arsitektur awal dan daftar teknologi utama. |

### Week 2

| Focus | Activities | Technologies | Outcomes |
| --- | --- | --- | --- |
| Database analysis | Membaca Drizzle schema, migration SQL, relasi tabel, dan mismatch schema-migration. | PostgreSQL, Drizzle ORM, Drizzle Kit. | Dokumentasi database, ERD tekstual, rekomendasi migration. |

### Week 3

| Focus | Activities | Technologies | Outcomes |
| --- | --- | --- | --- |
| API and backend module analysis | Membaca oRPC router, public/protected procedure, CRUD modules region/land/commodity/product. | oRPC, Zod, Drizzle, TanStack Query. | Dokumentasi API dan pola CRUD. |

### Week 4

| Focus | Activities | Technologies | Outcomes |
| --- | --- | --- | --- |
| Auth, authorization, and security | Menganalisis Better Auth, session, role admin/viewer/guest, admin guard, dan security gap. | Better Auth, TanStack Router, oRPC middleware. | Authentication flow, permission matrix, security recommendations. |

### Week 5

| Focus | Activities | Technologies | Outcomes |
| --- | --- | --- | --- |
| Business modules and reporting | Menganalisis stall, sales, potential, map, dan business workflow. | Leaflet, GeoJSON, PostgreSQL, oRPC. | Business process analysis dan laporan fitur per domain. |

### Week 6

| Focus | Activities | Technologies | Outcomes |
| --- | --- | --- | --- |
| Final documentation and presentation preparation | Menyusun dokumentasi final, daily log, contribution narrative, checklist evidence, dan slide outline. | Markdown, technical writing, backend documentation. | Dokumen siap untuk proposal, laporan, dan presentasi akhir. |

## 39. Internship Contributions as Backend Developer Intern

### 39.1 Technical Documentation Contribution

Sebagai Backend Developer Intern, kontribusi utama adalah menyusun dokumentasi teknis backend secara menyeluruh. Dokumentasi mencakup arsitektur sistem, API, database, authentication, authorization, dan business process. Kontribusi ini penting karena proyek memiliki banyak modul dan relasi data, sehingga dokumentasi membantu onboarding developer baru dan maintenance.

### 39.2 Backend Architecture Analysis

Kontribusi:

1. Mengidentifikasi bahwa backend aktif berada di `apps/web` melalui TanStack Start server routes.
2. Memetakan alur request dari browser ke oRPC, Drizzle, dan PostgreSQL.
3. Menjelaskan peran `publicProcedure` dan `protectedProcedure`.
4. Menjelaskan isomorphic oRPC client untuk server dan browser.

### 39.3 Database Design Analysis

Kontribusi:

1. Mendokumentasikan semua tabel.
2. Menjelaskan primary key, foreign key, dan relasi.
3. Mengidentifikasi dependency antar entitas.
4. Menemukan potensi mismatch migration dan schema.
5. Memberikan rekomendasi index dan unique constraints.

### 39.4 API Documentation Contribution

Kontribusi:

1. Mendata semua endpoint oRPC.
2. Menjelaskan input dan output.
3. Menandai endpoint public dan protected.
4. Mengelompokkan endpoint berdasarkan domain bisnis.
5. Menjelaskan validasi Zod pada API boundary.

### 39.5 Security Analysis Contribution

Kontribusi:

1. Menganalisis Better Auth.
2. Menganalisis session management.
3. Membuat role permission matrix.
4. Mengidentifikasi gap authorization API admin.
5. Merekomendasikan `adminProcedure`.
6. Merekomendasikan audit log dan test authorization.

### 39.6 CRUD Module Analysis Contribution

Kontribusi:

1. Menganalisis CRUD region.
2. Menganalisis CRUD land.
3. Menganalisis CRUD commodity.
4. Menganalisis CRUD product.
5. Menganalisis sales realization dan daily sales.
6. Menganalisis stall dan assign product brand.
7. Menandai modul yang read-only atau belum lengkap.

### 39.7 Quality Improvement Recommendations

Kontribusi rekomendasi:

1. Split router oRPC.
2. Split schema domain.
3. Export semua schema dari `schema/index.ts`.
4. Standardisasi response list.
5. Standardisasi error handling.
6. Hilangkan `any`.
7. Tambahkan pagination konsisten.
8. Tambahkan test API.

## 40. Evidence Collection Checklist

### 40.1 Development Process Screenshots

Screenshot yang perlu dikumpulkan:

| Evidence | Description |
| --- | --- |
| Repository root | Tampilan folder root proyek. |
| `apps/web` structure | Struktur aplikasi utama. |
| Terminal install dependencies | Proses `bun install`. |
| Terminal dev server | Proses menjalankan `bun dev` atau `bun run dev`. |
| Build command | Output `bun run build`. |
| Typecheck command | Output `bun run check-types` jika dijalankan. |
| Lint/check command | Output Biome/Ultracite jika dijalankan. |
| Git status | Bukti perubahan dokumentasi. |

### 40.2 Database Screenshots

| Evidence | Description |
| --- | --- |
| Drizzle schema files | Screenshot folder `lib/db/schema`. |
| Migration files | Screenshot folder migrations. |
| Database tables | Screenshot table list di Drizzle Studio/DB client. |
| User table | Struktur dan contoh data user dengan role. |
| Provinces table | Struktur/data provinsi. |
| Regencies table | Struktur/data kabupaten. |
| Product tables | Product type, brand, dosage. |
| Stall tables | Stalls dan stall_product_brands. |
| Sales tables | sales_realizations dan daily_sales. |
| ERD manual | Diagram relasi tabel yang dibuat dari dokumentasi. |

### 40.3 API Testing Screenshots

| Evidence | Description |
| --- | --- |
| OpenAPI page | Tampilan `/api` jika dapat dibuka. |
| Health check | Response `healthCheck`. |
| Unauthorized protected API | Bukti request protected tanpa login ditolak. |
| Auth getSession | Response session setelah login. |
| Province get | Request/response list province. |
| Province create | Request/response create province. |
| Product brand get | Request/response product brand. |
| Stall get | Request/response list stall. |
| Sales get | Request/response sales realization. |
| Validation error | Contoh request UUID invalid atau email invalid. |

### 40.4 Authentication Screenshots

| Evidence | Description |
| --- | --- |
| Login page | Tampilan form login. |
| Signup page | Tampilan form signup. |
| Login success | Redirect/session setelah login. |
| Login failed | Error ketika credential salah. |
| Session cookie | Bukti cookie/session di browser devtools, tanpa mengekspos token sensitif di laporan publik. |
| Guest blocked from admin | User non-admin diarahkan dari `/admin`. |
| Admin access success | Admin berhasil masuk dashboard. |
| User management role | Tampilan edit role admin/viewer/guest. |

### 40.5 Deployment Screenshots

| Evidence | Description |
| --- | --- |
| Dockerfile | Screenshot konfigurasi multi-stage build. |
| Docker Compose | Screenshot service web dan postgres. |
| Vercel config | Screenshot `vercel.json`. |
| Netlify config | Screenshot `netlify.toml`. |
| Vite config target | Screenshot `target: netlify`. |
| GitHub Actions | Screenshot workflow `Ping Supabase`. |
| Environment variables | Screenshot daftar env di platform, sensor nilai secret. |
| Deployment success | Log build/deploy berhasil jika tersedia. |

### 40.6 Dashboard Screenshots

| Evidence | Description |
| --- | --- |
| Admin dashboard | Tampilan `/admin`. |
| Sidebar menu | Menu Regions, Lands, Commodities, Products, Sales, Stalls, User. |
| Header/nav user | Tampilan user admin. |
| Public homepage | Tampilan halaman utama. |
| Map page | Tampilan peta. |
| Map filters | Sidebar/filter peta. |
| Stall markers | Marker stall pada peta jika data tersedia. |

### 40.7 CRUD Operation Screenshots

| Evidence | Description |
| --- | --- |
| Province list | Tabel/list province. |
| Province create form | Form tambah province. |
| Province edit form | Form edit province. |
| Province delete dialog | Konfirmasi delete province. |
| Regency list | Tabel/list regency. |
| Land type CRUD | List dan form land type. |
| Commodity type CRUD | List dan form commodity type. |
| Product type CRUD | List dan form product type. |
| Product brand CRUD | List dan form product brand. |
| Product dosage CRUD | List dan form product dosage. |
| Stall CRUD | List, create, edit, delete stall. |
| Assign product to stall | Modal assign product brand. |
| Sales realization CRUD | List dan form sales realization. |
| Daily sales CRUD | List dan form daily sales. |
| User management | List user, edit role, delete user. |

### 40.8 Report Evidence Organization

Rekomendasi folder bukti:

```txt
internship-assets/
|-- 01-development-process/
|-- 02-database/
|-- 03-api-testing/
|-- 04-authentication/
|-- 05-deployment/
|-- 06-dashboard/
|-- 07-crud-operations/
`-- 08-presentation/
```

Format penamaan file:

```txt
YYYY-MM-DD_urutan_deskripsi.png
```

Contoh:

```txt
2026-06-01_01_admin-dashboard.png
2026-06-01_02_province-create-form.png
2026-06-01_03_api-health-check.png
```

## 41. Module Readiness Matrix

Bagian ini merangkum kesiapan modul berdasarkan source code yang ditemukan. Status ini berguna untuk laporan magang karena menunjukkan mana fitur yang sudah lengkap, mana yang masih parsial, dan mana yang perlu pengembangan lanjutan.

| Module | UI route | API get | API create | API update | API delete | Database table | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Authentication | Ada | Ada melalui `auth.getSession` | Better Auth | Better Auth | Better Auth/logout | `user`, `account`, `session`, `verification` | Aktif |
| User Management | Ada | Ada | Tidak jelas sebagai create mandiri | Ada | Ada | `user` | Parsial |
| Province | Ada | Ada | Ada | Ada | Ada | `provinces` | Aktif |
| Regency | Ada | Ada | Ada | Ada | Ada | `regencies` | Aktif |
| Land Type | Ada | Ada | Ada | Ada | Ada | `land_types` | Aktif |
| Province Land | Ada | Ada | Ada | Ada | Ada | `province_lands` | Aktif |
| Regency Land | Ada | Ada | Belum aktif di router | Belum aktif di router | Belum aktif di router | `regency_lands` | Read-only |
| Commodity Type | Ada | Ada | Ada | Ada | Ada | `commodity_types` | Aktif |
| Province Commodity | Ada | Ada | Belum aktif di router | Belum aktif di router | Belum aktif di router | `province_commodities` | Read-only |
| Regency Commodity | Ada | Ada | Ada | Ada | Ada | `regency_commodities` | Aktif |
| Product Type | Ada | Ada | Ada | Ada | Ada | `product_types` | Aktif |
| Product Brand | Ada | Ada | Ada | Ada | Ada | `product_brands` | Aktif |
| Product Dosage | Ada | Ada | Ada | Ada | Ada | `product_dosages` | Aktif |
| Province Potential | Ada/terkait map | Ada | Belum aktif di router | Belum aktif di router | Belum aktif di router | `province_potentials` | Read-only |
| Regency Potential | Belum jelas | Belum aktif | Belum aktif | Belum aktif | Belum aktif | `regency_potentials` | Database only |
| Stall | Ada | Ada | Ada | Ada | Ada | `stalls` | Aktif |
| Stall Product Brand | Ada melalui modal | Ada | Ada melalui assign | Ada melalui assign sync | Ada melalui assign sync | `stall_product_brands` | Aktif |
| Sales Realization | Ada | Ada | Ada | Ada | Ada | `sales_realizations` | Aktif |
| Daily Sales | Ada | Ada | Ada | Ada | Ada | `daily_sales` | Aktif |
| Map | Ada | Menggunakan beberapa API admin | Tidak relevan | Tidak relevan | Tidak relevan | GeoJSON + domain tables | Aktif/tergantung data |
| Todo Demo | Ada | Ada | Ada | Toggle | Ada | `todo` | Demo/template |

## 42. Backend Data Flow per Major Workflow

### 42.1 Workflow: Login Admin sampai Dashboard

```txt
Admin membuka /auth/login
  -> LoginForm memanggil authClient.signIn.email
  -> /api/auth/* memproses credential
  -> Better Auth membaca account dan user
  -> Better Auth membuat session
  -> Browser menyimpan session cookie
  -> Root route memanggil auth.getSession
  -> /admin beforeLoad mengecek context.user
  -> /admin beforeLoad memanggil admin.user.getById
  -> Role admin diterima
  -> AdminLayout dan dashboard dirender
```

Tanggung jawab backend:

1. Memvalidasi credential.
2. Membuat session.
3. Mengambil session pada request berikutnya.
4. Mengambil role user dari database.
5. Menolak akses jika user tidak memiliki izin.

### 42.2 Workflow: Admin Membuat Data Provinsi

```txt
Admin membuka menu Region > Province
  -> UI mengambil admin.region.province.get
  -> Admin membuka create form
  -> Form mengirim code, name, area
  -> admin.region.province.create memvalidasi ProvinceSchema
  -> Drizzle insert ke provinces
  -> Database mengecek unique code
  -> API mengembalikan row baru
  -> TanStack Query invalidates/refetch list
```

Tanggung jawab backend:

1. Validasi kode dan nama.
2. Menjalankan insert.
3. Mengonversi unique violation menjadi error yang dapat dipahami.
4. Mengembalikan data baru.

### 42.3 Workflow: Admin Membuat Brand Produk dan Dosis

```txt
Admin membuat product type
  -> product_types
Admin membuat product brand berdasarkan product type
  -> product_brands.product_type_id
Admin membuat product dosage
  -> product_dosages.commodity_type_id
  -> product_dosages.product_brand_id
```

Business value:

1. Product type mengelompokkan produk.
2. Product brand menjadi produk spesifik yang dijual.
3. Product dosage menghubungkan produk dengan komoditas untuk analisis kebutuhan.

### 42.4 Workflow: Admin Mengelola Stall dan Produk Stall

```txt
Admin membuka menu Stalls
  -> admin.stall.get mengambil list stall dengan province/regency join
  -> Admin membuat atau mengedit stall
  -> Data disimpan ke stalls
  -> Admin membuka assign product modal
  -> admin.stall.stall_product_brand.assign menerima stallId dan productBrandIds
  -> Backend membaca existing product brands
  -> Backend menghitung toInsert dan toDelete
  -> Backend insert/delete relasi
```

Catatan teknis:

1. Workflow assign bersifat sinkronisasi daftar, bukan hanya tambah satu produk.
2. Operasi ini sebaiknya memakai transaction.
3. Unique constraint diperlukan agar tidak ada duplikasi relasi.

### 42.5 Workflow: Admin Mengelola Sales Report

```txt
Admin membuka Sales Overview
  -> admin.sale.sales_realization.get mengambil data sales
  -> Admin membuat laporan realisasi
  -> Data disimpan ke sales_realizations
  -> Admin dapat membuat daily sales
  -> Data disimpan ke daily_sales
  -> UI menampilkan laporan dan dapat dikembangkan untuk export
```

Business value:

1. Membantu monitoring target dan realisasi.
2. Membantu evaluasi performa produk.
3. Dapat menjadi bahan dashboard manajemen.

## 43. Glossary

| Istilah | Penjelasan |
| --- | --- |
| Admin | User dengan role `admin` yang dapat mengakses panel `/admin`. |
| Viewer | Role yang ditemukan di source code, tetapi aksesnya belum didefinisikan penuh. |
| Guest | Role default untuk user baru. |
| Province | Entitas provinsi. |
| Regency | Entitas kabupaten/kota. |
| Land Type | Jenis lahan seperti pangan, kebun, horti, atau tambak. |
| Commodity Type | Jenis komoditas seperti padi, sawit, atau bawang merah. |
| Product Type | Kategori produk. |
| Product Brand | Brand atau produk spesifik. |
| Product Dosage | Dosis produk untuk komoditas tertentu. |
| Potential | Nilai potensi produk pada wilayah tertentu. |
| Stall | Kios, toko, atau titik distribusi/penjualan. |
| Sales Realization | Laporan realisasi penjualan periodik. |
| Daily Sales | Data penjualan harian. |
| oRPC | Library API type-safe yang menghubungkan server procedure dengan client. |
| Drizzle ORM | ORM TypeScript untuk schema dan query database. |
| Better Auth | Library autentikasi yang mengelola login, session, dan account. |
| TanStack Start | Framework full-stack React berbasis TanStack Router. |
| TanStack Query | Library untuk server-state caching dan data fetching. |
| Zod | Library validasi schema TypeScript. |
| GeoJSON | Format data geografis yang digunakan untuk peta. |
| Migration | File perubahan schema database yang dapat dijalankan ke PostgreSQL. |
| FK | Foreign key, relasi antar tabel. |
| PK | Primary key, identitas utama row. |

## 44. Recommended Word Report Structure

Jika dokumen ini dikonversi menjadi laporan magang Word 50-100 halaman, struktur yang disarankan adalah:

### Bab 1 Pendahuluan

Isi yang dapat dipakai:

1. Latar belakang dari bagian 30.1.
2. Rumusan masalah dari bagian 30.2.
3. Tujuan dari bagian 30.3.
4. Batasan masalah dari bagian 30.4.
5. Manfaat dari bagian 18.5.

### Bab 2 Profil Proyek dan Landasan Teknologi

Isi yang dapat dipakai:

1. Project Overview.
2. Technology Stack.
3. Penjelasan TanStack Start, oRPC, Better Auth, Drizzle, PostgreSQL, Zod.
4. Struktur folder.

### Bab 3 Analisis Sistem

Isi yang dapat dipakai:

1. System Architecture.
2. Business Process Analysis.
3. User Roles and Permissions.
4. Feature-by-Feature Deep Analysis.
5. Data flow per workflow.

### Bab 4 Implementasi Backend

Isi yang dapat dipakai:

1. Backend Module Documentation.
2. API Documentation.
3. Database Documentation.
4. Authentication and Authorization.
5. CRUD Implementation Pattern Analysis.
6. Migration Deep Dive.

### Bab 5 Pengujian, Tantangan, dan Rekomendasi

Isi yang dapat dipakai:

1. Testing Strategy.
2. Security Analysis.
3. Challenges and Solutions.
4. Implementation Risks.
5. Future Recommendations.
6. Backend Refactor Roadmap.

### Bab 6 Kegiatan Magang dan Kontribusi

Isi yang dapat dipakai:

1. Daily Internship Activities.
2. Weekly Internship Activities.
3. Internship Contributions.
4. Evidence Collection Checklist.

### Bab 7 Penutup

Isi yang dapat dipakai:

1. Kesimpulan.
2. Saran.
3. Lampiran screenshot.

## 45. Quality Review Checklist for the Documentation

Gunakan checklist ini sebelum dokumen dikumpulkan:

| Check | Status |
| --- | --- |
| Semua fitur yang ditemukan sudah dijelaskan. | Perlu dicek saat finalisasi. |
| Fitur yang belum ada tidak diklaim sebagai selesai. | Sudah diberi catatan pada beberapa bagian. |
| Bagian backend lebih detail daripada frontend. | Sudah difokuskan pada backend, DB, API, auth, security. |
| Role dan permission dijelaskan dengan risiko aktual. | Sudah dijelaskan. |
| Database schema mencakup semua tabel. | Sudah dijelaskan. |
| API oRPC dikelompokkan per domain. | Sudah dijelaskan. |
| Daily activities minimal 30 hari. | Sudah tersedia. |
| Weekly activities Week 1-6. | Sudah tersedia. |
| Evidence screenshot checklist tersedia. | Sudah tersedia. |
| Ada rekomendasi pengembangan lanjutan. | Sudah tersedia. |
| Ada narasi proposal/laporan/presentasi. | Sudah tersedia. |

## 46. Final Academic Summary

Aplikasi Satu Peta Pasar adalah sistem informasi berbasis web yang mengintegrasikan data wilayah, lahan, komoditas, produk, potensi pasar, kios/stall, dan penjualan. Sistem ini dibangun menggunakan stack modern berbasis TypeScript, yaitu TanStack Start untuk aplikasi full-stack, oRPC untuk API type-safe, Better Auth untuk autentikasi, Drizzle ORM untuk akses database, dan PostgreSQL sebagai database utama.

Dari sisi backend, sistem memiliki banyak modul yang mendukung proses bisnis utama. Modul region mengelola provinsi dan kabupaten. Modul land dan commodity mengelola data lahan serta komoditas. Modul product mengelola jenis produk, brand, dan dosis. Modul potential mendukung analisis potensi wilayah. Modul stall mengelola titik distribusi dan relasi produk. Modul sale mengelola realisasi dan penjualan harian. Modul user management mengelola pengguna dan role.

Analisis source code menunjukkan bahwa sistem sudah memiliki fondasi yang baik, terutama dalam penggunaan schema validation, ORM, dan API type-safe. Namun, terdapat beberapa area pengembangan penting, seperti penguatan authorization pada level API, sinkronisasi migration dengan schema, standardisasi pagination, penambahan index database, testing otomatis, dan audit log. Temuan ini dapat menjadi kontribusi penting dalam laporan magang Backend Developer Intern karena menunjukkan kemampuan menganalisis sistem nyata dan memberikan rekomendasi teknis yang dapat ditindaklanjuti.
