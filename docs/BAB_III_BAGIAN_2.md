# BAB III — PELAKSANAAN KERJA PRAKTEK (LANJUTAN)

## 3.5 Perancangan Database

### 3.5.1 Gambaran Umum

Database sistem Satu Peta Pasar terdiri dari 22 tabel yang mencakup domain autentikasi, wilayah, lahan, komoditas, produk, potensi, kios, penjualan, dan demo. Seluruh tabel menggunakan primary key bertipe UUID untuk menjamin keunikan identitas data secara global. Relasi antar domain dibangun menggunakan foreign key yang menghubungkan entitas-entitas terkait.

### 3.5.2 Domain Autentikasi

Domain autentikasi dikelola oleh Better Auth dan terdiri dari empat tabel:

| Tabel | Fungsi | Primary Key | Foreign Key |
| --- | --- | --- | --- |
| `user` | Menyimpan identitas, email, profil, dan role pengguna. | `id` | - |
| `session` | Menyimpan session login beserta token dan masa berlaku. | `id` | `user_id` → `user.id` |
| `account` | Menyimpan credential dan password hash. | `id` | `user_id` → `user.id` |
| `verification` | Menyimpan token verifikasi. | `id` | - |

Role pengguna yang didefinisikan meliputi `admin`, `viewer`, dan `guest`. Role default bagi pengguna baru adalah `guest`.

### 3.5.3 Domain Wilayah dan Lahan

| Tabel | Fungsi | Primary Key | Foreign Key |
| --- | --- | --- | --- |
| `provinces` | Data master provinsi. | `id` | - |
| `regencies` | Data master kabupaten/kota. | `id` | `province_id` → `provinces.id` |
| `land_types` | Data master jenis lahan. | `id` | - |
| `province_lands` | Luas lahan per provinsi per jenis lahan. | `id` | `province_id` → `provinces.id`, `land_type_id` → `land_types.id` |
| `regency_lands` | Luas lahan per kabupaten per jenis lahan. | `id` | `regency_id` → `regencies.id`, `land_type_id` → `land_types.id` |

Relasi: satu provinsi memiliki banyak kabupaten. Satu jenis lahan digunakan oleh banyak provinsi dan kabupaten.

### 3.5.4 Domain Komoditas

| Tabel | Fungsi | Primary Key | Foreign Key |
| --- | --- | --- | --- |
| `commodity_types` | Data master jenis komoditas. | `id` | `land_type_id` → `land_types.id` |
| `province_commodities` | Data komoditas per provinsi. | `id` | `province_id` → `provinces.id`, `commodity_type_id` → `commodity_types.id` |
| `regency_commodities` | Data komoditas per kabupaten. | `id` | `regency_id` → `regencies.id`, `commodity_type_id` → `commodity_types.id` |

Relasi: satu jenis komoditas terhubung dengan satu jenis lahan. Setiap komoditas dapat dicatat pada tingkat provinsi dan kabupaten.

### 3.5.5 Domain Produk dan Potensi

| Tabel | Fungsi | Primary Key | Foreign Key |
| --- | --- | --- | --- |
| `product_types` | Data master jenis produk. | `id` | - |
| `product_brands` | Data brand produk. | `id` | `product_type_id` → `product_types.id` |
| `product_dosages` | Dosis brand untuk komoditas. | `id` | `commodity_type_id` → `commodity_types.id`, `product_brand_id` → `product_brands.id` |
| `province_potentials` | Nilai potensi brand di provinsi. | `id` | `province_id` → `provinces.id`, `product_brand_id` → `product_brands.id` |
| `regency_potentials` | Nilai potensi brand di kabupaten. | `id` | `regency_id` → `regencies.id`, `product_brand_id` → `product_brands.id` |

Relasi: hierarki produk dimulai dari jenis produk, kemudian brand produk, hingga dosis produk untuk komoditas tertentu. Potensi pasar dicatat pada tingkat provinsi dan kabupaten.

### 3.5.6 Domain Kios

| Tabel | Fungsi | Primary Key | Foreign Key |
| --- | --- | --- | --- |
| `stalls` | Data kios, lokasi, pemilik, kontak. | `id` | `province_id` → `provinces.id`, `regency_id` → `regencies.id` |
| `stall_product_brands` | Tabel penghubung many-to-many kios dan brand. | `id` | `stall_id` → `stalls.id`, `product_brand_id` → `product_brands.id` |

Relasi: satu kios berada pada satu provinsi dan satu kabupaten. Satu kios dapat menjual banyak brand produk, dan satu brand produk dapat tersedia di banyak kios.

### 3.5.7 Domain Penjualan

| Tabel | Fungsi | Primary Key | Foreign Key |
| --- | --- | --- | --- |
| `sales_realizations` | Rekap realisasi dan RKAP per brand. | `id` | `product_brand_id` → `product_brands.id` |
| `daily_sales` | Data penjualan harian per brand. | `id` | `product_brand_id` → `product_brands.id`, `province_id` (belum FK) |

Relasi: setiap data penjualan terhubung dengan satu brand produk.

### 3.5.8 Domain Demo

| Tabel | Fungsi | Primary Key |
| --- | --- | --- |
| `todo` | Contoh item todo dari template. | `id` |

### 3.5.9 Catatan Integritas Database

Berdasarkan hasil analisis, ditemukan beberapa catatan terkait integritas database:

1. **Missing foreign key:** Field `province_id` pada tabel `daily_sales` telah tersedia untuk menyimpan konteks wilayah, tetapi definisi foreign key belum ditemukan pada schema yang dianalisis. Penambahan constraint foreign key perlu didahului pemeriksaan data aktual.

2. **Indikasi mismatch schema-migration:** Pada tabel `sales_realizations`, file migration memiliki typo `realizaton_ytd`, sedangkan schema menggunakan `realization_ytd`. Perbedaan ini perlu diverifikasi terhadap database aktual untuk memastikan konsistensi.

3. **Unique constraint:** Kombinasi unik seperti `(province_id, land_type_id, year)` pada `province_lands` dan `(stall_id, product_brand_id)` pada `stall_product_brands` belum terdokumentasi secara eksplisit.

4. **Field `updated_at`:** Tabel `product_dosages` tidak memiliki field `updated_at` pada schema yang dianalisis.

## 3.6 Perancangan API

### 3.6.1 oRPC Router

Sistem menggunakan oRPC sebagai lapisan API yang menyediakan kontrak type-safe antara client dan server. Router oRPC mengelompokkan endpoint berdasarkan domain bisnis dan membedakan akses melalui public procedure dan protected procedure.

### 3.6.2 Public dan Protected Procedure

**Public procedure** dapat diakses tanpa session dan digunakan untuk endpoint yang bersifat publik, seperti:

- `healthCheck` — Pengecekan status API.
- `auth.getSession` — Mendapatkan session pengguna saat ini.
- `map.getProvinces` — Data provinsi untuk peta.
- `map.getStalls` — Data kios untuk peta.

**Protected procedure** memerlukan session pengguna yang valid dan digunakan untuk endpoint administratif. Seluruh endpoint CRUD pada modul bisnis termasuk dalam kategori ini.

### 3.6.3 Context

Setiap procedure oRPC memiliki akses terhadap context yang menyediakan:

- **Session** — Informasi session pengguna dari Better Auth, digunakan untuk memvalidasi authentication.
- **Database (db)** — Instance Drizzle ORM untuk menjalankan query ke PostgreSQL.

### 3.6.4 Struktur Endpoint per Modul

**Wilayah (Region):**
- `admin.region.province.get`, `create`, `update`, `delete`
- `admin.region.regency.get`, `create`, `update`, `delete`

**Lahan (Land):**
- `admin.land.land_type.get`, `create`, `update`, `delete`
- `admin.land.province_land.get`, `create`, `update`, `delete`
- `admin.land.regency_land.get` (read-only)

**Komoditas (Commodity):**
- `admin.commodity.commodity_type.get`, `create`, `update`, `delete`
- `admin.commodity.province_commodity.get` (read-only)
- `admin.commodity.regency_commodity.get`, `create`, `update`, `delete`

**Produk (Product):**
- `admin.product.product_type.get`, `create`, `update`, `delete`
- `admin.product.product_brand.get`, `create`, `update`, `delete`
- `admin.product.product_dosage.get`, `create`, `update`, `delete`

**Potensi (Potential):**
- `admin.potential.province_potential.get` (read-only)
- `admin.potential.regency_potential.*` **[PERLU VERIFIKASI endpoint aktif]**

**Penjualan (Sales):**
- `admin.sale.sale_overview.get`
- `admin.sale.sales_realization.get`, `create`, `update`, `delete`
- `admin.sale.daily_sales.get`, `create`, `update`, `delete`

**Kios (Stall):**
- `admin.stall.get`, `create`, `update`, `delete`
- `admin.stall.stall_product_brand.get`, `sync` (assignment brand)

**Pengguna (User):**
- `admin.user.get`, `getById`, `create`, `update`, `delete`

**Dashboard:**
- `admin.dashboard.getSummary`

### 3.6.5 Validasi Input

Setiap procedure oRPC menggunakan Zod untuk memvalidasi input. Validasi mencakup tipe data, panjang karakter, format, dan constraint domain. Zod schema didefinisikan pada folder `-domain` masing-masing modul dan digunakan bersama antara validasi form frontend dan validasi API backend.

## 3.7 Authentication dan Authorization

### 3.7.1 Konfigurasi Better Auth

Better Auth dikonfigurasi menggunakan adapter Drizzle ORM untuk menyimpan data autentikasi ke PostgreSQL. Metode autentikasi yang digunakan adalah email dan password. Session dikelola secara server-side dengan cookie sebagai mekanisme penyimpanan token di sisi client.

### 3.7.2 Route Guard

Pembatasan akses pada antarmuka diterapkan melalui route guard pada file `routes/admin/route.tsx`. Guard ini memeriksa:

1. Apakah pengguna memiliki session yang valid.
2. Apakah pengguna memiliki role `admin`.

Route guard pada halaman peta (`/map`) memeriksa apakah pengguna memiliki role `admin` atau `viewer`. Pengguna dengan role `guest` atau tanpa session tidak dapat mengakses halaman yang dilindungi.

### 3.7.3 Protected Procedure

Protected procedure pada oRPC memastikan bahwa request yang masuk memiliki session pengguna yang valid. Namun, berdasarkan hasil analisis, validasi role admin pada lapisan API belum diterapkan secara eksplisit di seluruh endpoint. Protected procedure saat ini hanya memeriksa keberadaan session, bukan role pengguna.

### 3.7.4 Role Pengguna

| Role | Akses |
| --- | --- |
| Admin | Akses penuh ke panel admin dan seluruh endpoint. |
| Viewer | Akses terbatas ke halaman tertentu (misalnya peta). Tidak dapat mengakses panel admin. |
| Guest | Role default, hanya halaman publik. |

### 3.7.5 Gap Authorization

Hasil analisis menunjukkan bahwa mekanisme pembatasan akses telah diterapkan pada route antarmuka, tetapi protected procedure pada lapisan API belum memvalidasi role secara eksplisit. Kondisi ini menyebabkan API masih dapat diakses oleh pengguna dengan role viewer atau guest selama mereka memiliki session yang valid. Penambahan `adminProcedure` yang memvalidasi role `admin` pada setiap protected endpoint direkomendasikan untuk menutup celah ini.
