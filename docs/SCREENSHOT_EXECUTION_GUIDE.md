# SCREENSHOT EXECUTION GUIDE

Panduan untuk mengambil 40 screenshot laporan Kerja Praktek secara otomatis.

---

## 1. Prasyarat

| Komponen | Keterangan |
| --- | --- |
| Node.js 18+ | Runtime JavaScript |
| Bun 1.0+ | Package manager |
| Playwright | Browser automation (diinstal otomatis) |
| Chromium | Browser engine (diinstal otomatis) |

---

## 2. Instalasi

```bash
# Install Playwright dan browser
bun add -d @playwright/test
bunx playwright install chromium

# Verifikasi instalasi
npx playwright --version
```

---

## 3. Jalankan Screenshot

```bash
# Langsung dengan Playwright
npx playwright test scripts/capture-report-screenshots.ts

# Atau via bun (script sudah di package.json root)
bun run screenshots

# Mode debug (lihat browser)
npx playwright test --headed scripts/capture-report-screenshots.ts
```

---

## 4. Screenshot yang Dihasilkan

### ✅ Otomatis (23 screenshots)

| # | Nama | Route | Folder |
| --- | --- | --- | --- |
| 04 | Halaman Login | `/auth/login` | `bab3/auth/` |
| 05 | Gagal Login | `/auth/login` (isi kredensial salah) | `bab3/auth/` |
| 06 | Redirect Setelah Login | `/auth/login?redirect=/admin` | `bab3/auth/` |
| 08 | Landing Page Hero | `/` | `bab3/dashboard/` |
| 09 | Landing Page Program Cards | `/` (scroll) | `bab2/` |
| 10 | Dashboard Admin | `/admin` | `bab3/dashboard/` |
| 11 | Admin Sidebar | `/admin` | `bab3/dashboard/` |
| 12 | Daftar Province | `/admin/region/province` | `bab3/wilayah/` |
| 13 | Form Tambah Province | `/admin/region/province` | `bab3/wilayah/` |
| 14 | Daftar Regency | `/admin/region/regency` | `bab3/wilayah/` |
| 15 | Daftar Commodity Type | `/admin/commodity` | `bab3/komoditas/` |
| 16 | Province Commodity (Read-Only) | `/admin/commodity/province-commodity` | `bab3/komoditas/` |
| 17 | Regency Commodity | `/admin/commodity/regency-commodity` | `bab3/komoditas/` |
| 18 | Daftar Product Brand | `/admin/product/product-brand` | `bab3/produk/` |
| 19 | Daftar Product Dosage | `/admin/product/product-dosage` | `bab3/produk/` |
| 20 | Province Potential (Read-Only) | `/admin/potential/province_potential` | `bab3/potensi/` |
| 21 | Daftar Sales Realization | `/admin/sale` | `bab3/penjualan/` |
| 22 | Daftar Daily Sales | `/admin/sale/sale-daily` | `bab3/penjualan/` |
| 23 | Daftar Stall | `/admin/stall` | `bab3/stall/` |
| 24 | Form Tambah Stall | `/admin/stall` (klik "Add Stall") | `bab3/stall/` |
| 25 | Modal Assignment Brand | `/admin/stall` (klik "Products") | `bab3/stall/` |
| 27 | Daftar User | `/admin/user` | `bab3/user/` |
| 28 | Peta Interaktif | `/map` | `bab3/peta/` |
| 29 | Peta Choropleth | `/map` | `bab3/peta/` |

### 📄 Code Viewer (8 screenshots — otomatis via HTML renderer)

| # | Nama | File | Folder |
| --- | --- | --- | --- |
| 30 | Struktur Folder Schema | `apps/web/src/lib/db/schema/` | `bab3/database/` |
| 31 | Potongan Schema Auth | `apps/web/src/lib/db/schema/auth.ts` | `bab3/database/` |
| 34 | Struktur Router oRPC | `apps/web/src/lib/orpc/router/index.ts` | `bab3/api/` |
| 37 | Route Guard Admin | `apps/web/src/routes/admin/route.tsx` | `bab3/auth/` |
| 38 | Konfigurasi Better Auth | `apps/web/src/lib/auth/index.ts` | `bab3/auth/` |
| 39 | File netlify.toml | `netlify.toml` | `bab3/deployment/` |
| 40 | File package.json | `apps/web/package.json` | `bab2/` |

### 🌐 API Response (2 screenshots — otomatis)

| # | Nama | Route | Folder |
| --- | --- | --- | --- |
| 35 | Health Check Response | `GET /api/rpc/healthCheck` | `bab3/api/` |
| 36 | Zod Validation Error | `POST /api/rpc/admin.stall.create` (invalid) | `bab3/api/` |

### 🔧 Manual (5 screenshots)

Ambil secara manual dan simpan di folder yang sesuai:

| # | Nama | Cara Ambil | Simpan di |
| --- | --- | --- | --- |
| 01 | Development Server | Terminal: `bun run dev` | `bab3/setup/screenshot_01.png` |
| 02 | Detail Commit Stall | Terminal: `git show 7a38bb7 --stat` | `bab3/kontribusi/screenshot_02.png` |
| 03 | File Excel Survei | File Explorer: `data/SURVEY PASAR KIOS (Jawaban).xlsx` (sensor nama) | `bab3/survei/screenshot_03.png` |
| 07 | Session Cookie | DevTools → Application → Cookies (sensor value) | `bab3/auth/screenshot_07.png` |
| 32 | Drizzle Studio | `bun run db:studio` → buka browser → capture panel kiri | `bab3/database/screenshot_32.png` |
| 33 | ERD | Drizzle Studio → tab Relations/ERD | `bab3/database/screenshot_33.png` |

### ⚡ Conditional (1 screenshot)

| # | Nama | Route | Folder | Catatan |
| --- | --- | --- | --- | --- |
| 26 | Detail Stall Publik | `/stall/[id]` | `bab3/stall/` | Script otomatis resolve ID dari tabel admin. Jika gagal, akses manual: buka `/admin/stall`, copy UUID stall, buka `/stall/{uuid}`. |

---

## 5. Output Folder Structure

```
screenshots/
├── bab2/
│   ├── screenshot_09.png
│   └── screenshot_40.png
├── bab3/
│   ├── setup/          → screenshot_01.png
│   ├── survei/         → screenshot_03.png
│   ├── auth/           → screenshot_04, 05, 06, 07, 37, 38
│   ├── dashboard/      → screenshot_08, 10, 11
│   ├── wilayah/        → screenshot_12, 13, 14
│   ├── komoditas/      → screenshot_15, 16, 17
│   ├── produk/         → screenshot_18, 19
│   ├── potensi/        → screenshot_20
│   ├── penjualan/      → screenshot_21, 22
│   ├── stall/          → screenshot_23, 24, 25, 26
│   ├── user/           → screenshot_27
│   ├── peta/           → screenshot_28, 29
│   ├── database/       → screenshot_30, 31, 32, 33
│   ├── api/            → screenshot_34, 35, 36
│   ├── kontribusi/     → screenshot_02
│   └── deployment/     → screenshot_39
└── report/             → Playwright HTML report
```

---

## 6. Environment Variables

Buat file `.env.screenshot` di root proyek:

```bash
SCREENSHOT_EMAIL=adminmpb@example.com
SCREENSHOT_PASSWORD=admin12345
```

Atau copy dari template:

```bash
cp .env.screenshot.example .env.screenshot
```

| Variable | Default Development | Keterangan |
| --- | --- | --- |
| `SCREENSHOT_EMAIL` | `adminmpb@example.com` | Email admin untuk login |
| `SCREENSHOT_PASSWORD` | `admin12345` | Password admin |

Script secara otomatis membaca `.env.screenshot` jika ada. Environment variable sistem tetap prioritas tertinggi.

```bash
# Windows PowerShell (override env file)
$env:SCREENSHOT_EMAIL="adminmpb@example.com"
$env:SCREENSHOT_PASSWORD="admin12345"
npx playwright test
```

Jika login gagal, script akan menampilkan:
- URL setelah submit
- Pesan error dari halaman
- Kredensial yang digunakan (password disensor)

---

## 7. Troubleshooting

| Masalah | Solusi |
| --- | --- |
| `ECONNREFUSED :::3000` | Jalankan `bun run dev` di terminal terpisah |
| `@playwright/test not found` | `bun add -d @playwright/test` |
| `Chromium not found` | `bunx playwright install chromium` |
| Halaman redirect ke login | Cek `SCREENSHOT_EMAIL` dan `SCREENSHOT_PASSWORD` |
| Modal tidak muncul | Jalankan dengan `--headed` untuk debug visual |
| Map kosong/tile tidak muncul | Koneksi internet diperlukan untuk tile Leaflet |
| Cookie/login state tidak tersimpan | Hapus `.playwright-auth.json` dan jalankan ulang |

---

## 8. License

Script ini dirancang untuk mendukung penyusunan laporan Kerja Praktek. Output screenshot hanya untuk keperluan dokumentasi akademik.
