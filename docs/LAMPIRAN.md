# LAMPIRAN

## Lampiran A — Logbook Kegiatan

Daftar riwayat commit yang menunjukkan aktivitas pengembangan selama kegiatan magang:

| No | Tanggal | Commit | Aktivitas |
| --- | --- | --- | --- |
| 1 | 22 Mei 2026 | `3959ce9` | Initial commit — snapshot awal repository |
| 2 | 26 Mei 2026 | `7a38bb7` | Pengembangan modul Stall dan assignment Product Brand |
| 3 | 26 Mei 2026 | `896dacf` | Konfigurasi Turborepo output dan environment |
| 4 | 26 Mei 2026 | `e98cc1a` | Konfigurasi deployment Vercel |
| 5 | 26 Mei 2026 | `48cdc1a` | Penambahan konfigurasi Vercel |
| 6 | 26 Mei 2026 | `7626d30` | Perubahan target TanStack ke Vercel |
| 7 | 26 Mei 2026 | `7e0a167` | Rollback konfigurasi deployment |
| 8 | 26 Mei 2026 | `f750d88` | Alih target deployment ke Netlify |
| 9 | 26 Mei 2026 | `057109c` | Penambahan redirect Netlify |
| 10 | 27 Mei 2026 | `f55cf89` | Penambahan SSR redirect Netlify |
| 11 | 27 Mei 2026 | `7e02e4f` | Penggunaan functions-internal server redirect |
| 12 | 27 Mei 2026 | `a34e382` | Penghapusan manual Netlify redirects |
| 13 | 27 Mei 2026 | `19dda4b` | Pembaruan konfigurasi deployment Netlify |
| 14 | 19 Jun 2026 | `71a93b8` | Peningkatan workflow keep-alive Supabase |
| 15 | 22 Jun 2026 | `52dfe56` | Peningkatan admin data dan map loading |
| 16 | 24 Jun 2026 | `83bf8d8` | Pembaruan marketing map |
| 17 | 24 Jun 2026 | `c509687` | Exclude private workspace files |
| 18 | 24 Jun 2026 | `6acf260` | Penambahan potential management dan live dashboard |
| 19 | 24 Jun 2026 | `9446f96` | Pembaruan landing page dan marketing map |
| 20 | 24 Jun 2026 | `9e6cade` | Peningkatan sales dan stall management workflows |
| 21 | 24 Jun 2026 | `d035cbe` | Restorasi product management leadership |
| 22 | 24 Jun 2026 | `eee21e8` | Dokumentasi README dengan animated overview |

---

## Lampiran B — Screenshot Tambahan

**Catatan:** Screenshot akan diambil dari sistem yang berjalan. Berikut daftar screenshot tambahan yang direncanakan untuk lampiran:

| No | Nama Screenshot | Keterangan |
| --- | --- | --- |
| S1 | Tabel database di Drizzle Studio | Seluruh 22 tabel |
| S2 | Response API health check | Endpoint publik |
| S3 | Response validation error Zod | Error validasi input |
| S4 | Environment variable configuration | Tanpa nilai secret |
| S5 | Admin dashboard | Summary cards |
| S6 | Landing page publik | Hero section dan program cards |
| S7 | OpenAPI documentation | Jika tersedia |

---

## Lampiran C — Source Code Representatif

### C.1 Router oRPC Utama

**File:** `lib/orpc/router/index.ts`

Router utama yang mengelompokkan seluruh endpoint API berdasarkan domain bisnis. Setiap endpoint didefinisikan sebagai procedure oRPC (public atau protected) yang menghubungkan client dengan handler domain.

Struktur router mencakup:
- `healthCheck` — endpoint publik untuk monitoring
- `auth.getSession` — mendapatkan session pengguna
- `todo.*` — CRUD todo (demo)
- `map.*` — data untuk peta
- `admin.*` — seluruh endpoint administrasi yang dilindungi

### C.2 Schema Database

**File:** `lib/db/schema/`

Schema Drizzle ORM mendefinisikan 22 tabel dalam 5 file:

| File | Domain | Tabel |
| --- | --- | --- |
| `auth.ts` | Autentikasi | `user`, `session`, `account`, `verification` |
| `map-product.ts` | Wilayah, Lahan, Komoditas, Produk, Potensi | `provinces`, `regencies`, `land_types`, `province_lands`, `regency_lands`, `commodity_types`, `province_commodities`, `regency_commodities`, `product_types`, `product_brands`, `product_dosages`, `province_potentials`, `regency_potentials` |
| `sale.ts` | Penjualan | `sales_realizations`, `daily_sales` |
| `stall.ts` | Kios | `stalls`, `stall_product_brands` |
| `todo.ts` | Demo | `todo` |

### C.3 Route Guard Admin

**File:** `routes/admin/route.tsx`

Route guard yang memeriksa session dan role admin sebelum mengizinkan akses ke halaman admin. Logika:
1. Periksa session pengguna — jika tidak ada, redirect ke halaman login.
2. Periksa role pengguna — jika bukan admin, redirect ke halaman akses ditolak.

### C.4 Better Auth Configuration

**File:** `lib/auth/index.ts`

Konfigurasi Better Auth dengan provider email/password dan adapter Drizzle ORM. Mengelola:
- Sign in / Sign up
- Session management
- Cookie handling

### C.5 Stall Module — Assignment Product Brand

**File:** `routes/admin/stall/-app/assign-product-brand.ts`

Procedure untuk menyinkronkan relasi many-to-many antara Stall dan Product Brand. Logika:
1. Hapus seluruh relasi existing untuk stall yang dipilih.
2. Insert relasi baru berdasarkan daftar brand yang dipilih admin.
3. Menggunakan transaksi database untuk atomicity.

---

## Lampiran D — Surat Keterangan Magang

*[Tempatkan surat keterangan magang dari PT Petrokimia Gresik di sini jika tersedia]*

---

## Lampiran E — Daftar Lengkap Endpoint API

Berikut daftar seluruh endpoint oRPC yang terdaftar pada router:

### Public Endpoints

| Path | Method | Auth | Input | Output | Keterangan |
| --- | --- | --- | --- | --- | --- |
| `healthCheck` | handler | - | - | `string` | Pengecekan status API |
| `auth.getSession` | handler | public | - | Session user | Mendapatkan session saat ini |
| `map.getProvinces` | handler | public | - | Daftar provinsi | Data provinsi untuk peta |
| `map.getStalls` | handler | public | - | Daftar kios | Data kios untuk peta |

### Protected Endpoints (Admin)

#### Dashboard

| Path | Auth | Input | Output |
| --- | --- | --- | --- |
| `admin.dashboard.getSummary` | session | - | Summary cards |

#### Region

| Path | Auth | Input | Output |
| --- | --- | --- | --- |
| `admin.region.province.get` | session | `{ search, page, pageSize }` | Paginated provinces |
| `admin.region.province.create` | session | `{ code, name, area, year }` | Province |
| `admin.region.province.update` | session | `{ id, code?, name?, area?, year? }` | Province |
| `admin.region.province.delete` | session | `{ id }` | - |
| `admin.region.regency.get` | session | `{ search, page, pageSize }` | Paginated regencies |
| `admin.region.regency.create` | session | `{ code, name, province_id, area, year }` | Regency |
| `admin.region.regency.update` | session | `{ id, code?, name?, province_id?, area?, year? }` | Regency |
| `admin.region.regency.delete` | session | `{ id }` | - |

#### Land

| Path | Auth | Input | Output |
| --- | --- | --- | --- |
| `admin.land.land_type.get` | session | `{ search, page, pageSize }` | Paginated land types |
| `admin.land.land_type.create` | session | `{ name, year }` | Land type |
| `admin.land.land_type.update` | session | `{ id, name?, year? }` | Land type |
| `admin.land.land_type.delete` | session | `{ id }` | - |
| `admin.land.province_land.get` | session | `{ search, page, pageSize }` | Paginated province lands |
| `admin.land.province_land.create` | session | Data province land | Province land |
| `admin.land.province_land.update` | session | Data province land | Province land |
| `admin.land.province_land.delete` | session | `{ id }` | - |
| `admin.land.regency_land.get` | session | `{ search, page, pageSize }` | Paginated regency lands |
| `admin.land.regency_land.create` | session | Data regency land | Regency land |
| `admin.land.regency_land.update` | session | Data regency land | Regency land |
| `admin.land.regency_land.delete` | session | `{ id }` | - |

#### Commodity

| Path | Auth | Input | Output |
| --- | --- | --- | --- |
| `admin.commodity.commodity_type.get` | session | `{ search, page, pageSize, land_type_id? }` | Paginated commodity types |
| `admin.commodity.commodity_type.create` | session | `{ name, land_type_id, year }` | Commodity type |
| `admin.commodity.commodity_type.update` | session | `{ id, name?, land_type_id?, year? }` | Commodity type |
| `admin.commodity.commodity_type.delete` | session | `{ id }` | - |
| `admin.commodity.province_commodity.get` | session | `{ search, page, pageSize }` | Paginated province commodities |
| `admin.commodity.province_commodity.create` | session | Data province commodity | Province commodity |
| `admin.commodity.province_commodity.update` | session | Data province commodity | Province commodity |
| `admin.commodity.province_commodity.delete` | session | `{ id }` | - |
| `admin.commodity.regency_commodity.get` | session | `{ search, page, pageSize }` | Paginated regency commodities |
| `admin.commodity.regency_commodity.create` | session | Data regency commodity | Regency commodity |
| `admin.commodity.regency_commodity.update` | session | Data regency commodity | Regency commodity |
| `admin.commodity.regency_commodity.delete` | session | `{ id }` | - |

#### Product

| Path | Auth | Input | Output |
| --- | --- | --- | --- |
| `admin.product.product_type.get` | session | `{ search, page, pageSize }` | Paginated product types |
| `admin.product.product_type.create` | session | `{ name, description, year }` | Product type |
| `admin.product.product_type.update` | session | `{ id, name?, description?, year? }` | Product type |
| `admin.product.product_type.delete` | session | `{ id }` | - |
| `admin.product.product_brand.get` | session | `{ search, page, pageSize, product_type_id? }` | Paginated product brands |
| `admin.product.product_brand.create` | session | `{ name, industry, description, product_type_id }` | Product brand |
| `admin.product.product_brand.update` | session | `{ id, name?, industry?, description?, product_type_id? }` | Product brand |
| `admin.product.product_brand.delete` | session | `{ id }` | - |
| `admin.product.product_dosage.get` | session | `{ search, page, pageSize }` | Paginated product dosages |
| `admin.product.product_dosage.create` | session | `{ commodity_type_id, product_brand_id, dosage, unit, year }` | Product dosage |
| `admin.product.product_dosage.update` | session | Data product dosage | Product dosage |
| `admin.product.product_dosage.delete` | session | `{ id }` | - |

#### Potential

| Path | Auth | Input | Output |
| --- | --- | --- | --- |
| `admin.potential.province_potential.get` | session | `{ province_id?, product_brand_id?, year? }` | Paginated province potentials |
| `admin.potential.province_potential.create` | session | Data province potential | Province potential |
| `admin.potential.province_potential.update` | session | Data province potential | Province potential |
| `admin.potential.province_potential.delete` | session | `{ id }` | - |
| `admin.potential.regency_potential.get` | session | `{ search, page, pageSize }` | Paginated regency potentials |
| `admin.potential.regency_potential.create` | session | Data regency potential | Regency potential |
| `admin.potential.regency_potential.update` | session | Data regency potential | Regency potential |
| `admin.potential.regency_potential.delete` | session | `{ id }` | - |

#### Sales

| Path | Auth | Input | Output |
| --- | --- | --- | --- |
| `admin.sale.sale_overview.get` | session | - | Sales overview summary |
| `admin.sale.sales_realization.get` | session | `{ search, page, pageSize }` | Paginated sales realizations |
| `admin.sale.sales_realization.create` | session | Data sales realization | Sales realization |
| `admin.sale.sales_realization.update` | session | Data sales realization | Sales realization |
| `admin.sale.sales_realization.delete` | session | `{ id }` | - |
| `admin.sale.daily_sales.get` | session | `{ search, page, pageSize }` | Paginated daily sales |
| `admin.sale.daily_sales.create` | session | Data daily sales | Daily sales |
| `admin.sale.daily_sales.update` | session | Data daily sales | Daily sales |
| `admin.sale.daily_sales.delete` | session | `{ id }` | - |

#### Stall

| Path | Auth | Input | Output |
| --- | --- | --- | --- |
| `admin.stall.get` | session | `{ search, page, pageSize }` | Paginated stalls |
| `admin.stall.getStallProduct` | session | `{ stall_id }` | Brands for a stall |
| `admin.stall.create` | session | Data stall | Stall |
| `admin.stall.update` | session | Data stall | Stall |
| `admin.stall.delete` | session | `{ id }` | - |
| `admin.stall.stall_product_brand.get` | session | `{ stall_id }` | Stall product brands |
| `admin.stall.stall_product_brand.get_product_brands` | session | - | All product brands |
| `admin.stall.stall_product_brand.assign` | session | `{ stall_id, brand_ids }` | Sync assignment |

#### User

| Path | Auth | Input | Output |
| --- | --- | --- | --- |
| `admin.user.get` | session | `{ search, page, pageSize }` | Paginated users |
| `admin.user.getById` | session | `{ id }` | User detail |
| `admin.user.create` | session | `{ name, email, password, role }` | User |
| `admin.user.update` | session | `{ id, name?, email?, role? }` | User |
| `admin.user.delete` | session | `{ id }` | - |

---

## Lampiran F — Daftar Lengkap Tabel Database

### F.1 Domain Autentikasi

| Tabel | Kolom | Tipe | Constraint |
| --- | --- | --- | --- |
| `user` | id | UUID | PK |
| | name | text | - |
| | email | text | unique |
| | emailVerified | boolean | default false |
| | image | text | nullable |
| | role | text | default 'guest' |
| | createdAt | timestamp | - |
| | updatedAt | timestamp | - |
| `session` | id | UUID | PK |
| | userId | UUID | FK → user.id |
| | token | text | unique |
| | expiresAt | timestamp | - |
| | createdAt | timestamp | - |
| `account` | id | UUID | PK |
| | userId | UUID | FK → user.id |
| | accountId | text | - |
| | providerId | text | - |
| | password | text | nullable |
| | createdAt | timestamp | - |
| `verification` | id | UUID | PK |
| | value | text | - |
| | expiresAt | timestamp | - |
| | createdAt | timestamp | - |

### F.2 Domain Wilayah

| Tabel | Kolom | Tipe | Constraint |
| --- | --- | --- | --- |
| `provinces` | id | UUID | PK |
| | code | text | - |
| | name | text | - |
| | area | numeric | nullable |
| | year | integer | nullable |
| | createdAt | timestamp | - |
| `regencies` | id | UUID | PK |
| | province_id | UUID | FK → provinces.id |
| | code | text | - |
| | name | text | - |
| | area | numeric | nullable |
| | year | integer | nullable |
| | createdAt | timestamp | - |

### F.3 Domain Lahan

| Tabel | Kolom | Tipe | Constraint |
| --- | --- | --- | --- |
| `land_types` | id | UUID | PK |
| | name | text | - |
| | year | integer | nullable |
| | createdAt | timestamp | - |
| `province_lands` | id | UUID | PK |
| | province_id | UUID | FK → provinces.id |
| | land_type_id | UUID | FK → land_types.id |
| | area | numeric | - |
| | year | integer | nullable |
| | createdAt | timestamp | - |
| `regency_lands` | id | UUID | PK |
| | regency_id | UUID | FK → regencies.id |
| | land_type_id | UUID | FK → land_types.id |
| | area | numeric | - |
| | year | integer | nullable |
| | createdAt | timestamp | - |

### F.4 Domain Komoditas

| Tabel | Kolom | Tipe | Constraint |
| --- | --- | --- | --- |
| `commodity_types` | id | UUID | PK |
| | land_type_id | UUID | FK → land_types.id |
| | name | text | - |
| | year | integer | nullable |
| | createdAt | timestamp | - |
| `province_commodities` | id | UUID | PK |
| | province_id | UUID | FK → provinces.id |
| | commodity_type_id | UUID | FK → commodity_types.id |
| | area | numeric | nullable |
| | year | integer | nullable |
| | createdAt | timestamp | - |
| `regency_commodities` | id | UUID | PK |
| | regency_id | UUID | FK → regencies.id |
| | commodity_type_id | UUID | FK → commodity_types.id |
| | area | numeric | nullable |
| | year | integer | nullable |
| | createdAt | timestamp | - |

### F.5 Domain Produk dan Potensi

| Tabel | Kolom | Tipe | Constraint |
| --- | --- | --- | --- |
| `product_types` | id | UUID | PK |
| | name | text | - |
| | description | text | nullable |
| | year | integer | nullable |
| | createdAt | timestamp | - |
| `product_brands` | id | UUID | PK |
| | product_type_id | UUID | FK → product_types.id |
| | name | text | - |
| | industry | text | nullable |
| | description | text | nullable |
| | createdAt | timestamp | - |
| `product_dosages` | id | UUID | PK |
| | commodity_type_id | UUID | FK → commodity_types.id |
| | product_brand_id | UUID | FK → product_brands.id |
| | dosage | numeric | - |
| | unit | text | - |
| | year | integer | nullable |
| | createdAt | timestamp | - |
| `province_potentials` | id | UUID | PK |
| | province_id | UUID | FK → provinces.id |
| | product_brand_id | UUID | FK → product_brands.id |
| | potential_value | numeric | nullable |
| | description | text | nullable |
| | year | integer | nullable |
| | createdAt | timestamp | - |
| `regency_potentials` | id | UUID | PK |
| | regency_id | UUID | FK → regencies.id |
| | product_brand_id | UUID | FK → product_brands.id |
| | potential_value | numeric | nullable |
| | description | text | nullable |
| | year | integer | nullable |
| | createdAt | timestamp | - |

### F.6 Domain Kios

| Tabel | Kolom | Tipe | Constraint |
| --- | --- | --- | --- |
| `stalls` | id | UUID | PK |
| | province_id | UUID | FK → provinces.id |
| | regency_id | UUID | FK → regencies.id |
| | name | text | - |
| | address | text | nullable |
| | latitude | numeric | nullable |
| | longitude | numeric | nullable |
| | owner | text | nullable |
| | noTelp | text | nullable |
| | criteria | text | nullable |
| | year | integer | nullable |
| | createdAt | timestamp | - |
| `stall_product_brands` | id | UUID | PK |
| | stall_id | UUID | FK → stalls.id |
| | product_brand_id | UUID | FK → product_brands.id |
| | createdAt | timestamp | - |

### F.7 Domain Penjualan

| Tabel | Kolom | Tipe | Constraint |
| --- | --- | --- | --- |
| `sales_realizations` | id | UUID | PK |
| | product_brand_id | UUID | FK → product_brands.id |
| | report_date | date | - |
| | realization_daily | numeric | nullable |
| | realization_monthly | numeric | nullable |
| | realization_ytd | numeric | nullable |
| | rkap_monthly | numeric | nullable |
| | rkap_ytd | numeric | nullable |
| | realization_previous_year | numeric | nullable |
| | createdAt | timestamp | - |
| `daily_sales` | id | UUID | PK |
| | product_brand_id | UUID | FK → product_brands.id |
| | province_id | UUID | FK belum didefinisikan |
| | date | date | - |
| | month | integer | - |
| | year | integer | - |
| | quantity | integer | nullable |
| | revenue | numeric | nullable |
| | target | numeric | nullable |
| | realization | numeric | nullable |
| | notes | text | nullable |
| | createdAt | timestamp | - |

### F.8 Domain Demo

| Tabel | Kolom | Tipe | Constraint |
| --- | --- | --- | --- |
| `todo` | id | UUID | PK |
| | text | text | - |
| | done | boolean | default false |
| | createdAt | timestamp | - |
