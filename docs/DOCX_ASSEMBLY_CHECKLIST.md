# DOCX ASSEMBLY CHECKLIST — SISTEM INFORMASI MANAJEMEN PRODUK BARU

> Checklist final sebelum export PDF.
> Sumber: `REPORT_IMAGE_MAPPING.md`, `WORD_ASSEMBLY_GUIDE.md`, `BAB_*.md`

---

## 🟦 BAGIAN AWAL

### Cover
| Item | Status |
| --- | --- |
| Template Word institusi (cover + logo) | [ ] |
| Judul laporan, nama, NBI, institusi | [ ] |
| **Estimasi:** 1 halaman (i) | |

### Lembar Pengesahan
| Item | Status |
| --- | --- |
| Template tanda tangan pembimbing | [ ] |
| Nama, NBI, judul laporan | [ ] |
| **Estimasi:** 1 halaman (ii) | |

### Kata Pengantar
| Item | Status |
| --- | --- |
| Sumber: `docs/BAGIAN_AWAL.md` — bagian KATA PENGANTAR | [ ] |
| Ucapan terima kasih & harapan | [ ] |
| **Estimasi:** 1 halaman (iii) | |

### Daftar Riwayat Hidup
| Item | Status |
| --- | --- |
| Sumber: `docs/BAGIAN_AWAL.md` — DAFTAR RIWAYAT HIDUP | [ ] |
| Tabel data pribadi + riwayat pendidikan | [ ] |
| **Estimasi:** 1 halaman (iv) | |

### Daftar Isi
| Item | Status |
| --- | --- |
| Generate otomatis dari heading styles | [ ] |
| **Estimasi:** 2 halaman (v–vi) | |

### Daftar Gambar
| Item | Status |
| --- | --- |
| Generate otomatis dari caption | [ ] |
| 40 screenshot + 15 diagram = 55 entri | [ ] |
| **Estimasi:** 2 halaman (vii–viii) | |

### Daftar Tabel
| Item | Status |
| --- | --- |
| Generate otomatis dari caption tabel | [ ] |
| **Estimasi:** 1 halaman (ix) | |

---

## 🟦 BAB I — PENDAHULUAN

| Sub BAB | Judul | Screenshot | Diagram | Tabel | Est. Hal |
| --- | --- | --- | --- | --- | ---: |
| 1.1 | Latar Belakang | — | — | — | 2 |
| 1.2 | Identifikasi Masalah | — | — | — | 1 |
| 1.3 | Rumusan Masalah | — | — | — | 1 |
| 1.4 | Tujuan Magang | — | — | — | 1 |
| 1.5 | Manfaat | — | — | — | 1 |
| 1.6 | Batasan Masalah | — | — | — | 1 |
| 1.7 | Metode Pengumpulan Data | — | — | — | 1 |
| 1.8 | Sistematika Penulisan | — | — | — | 1 |

**Total estimasi:** 8–10 halaman (halaman 1–10)

| Checklist | Status |
| --- | --- |
| Sumber: `docs/BAB_I_PENDAHULUAN.md` | [ ] |
| Tidak ada screenshot/diagram/tabel yang perlu disisipkan | [ ] |
| **Selesai** | [ ] |

---

## 🟦 BAB II — GAMBARAN UMUM

| Sub BAB | Judul | Screenshot | Diagram | Tabel | Est. Hal |
| --- | --- | --- | --- | --- | ---: |
| 2.1 | Profil Perusahaan | — | — | — | 3–4 |
| 2.2 | Gambaran Umum Sistem | #09 → **Gambar 2.1** | — | **Tabel 2.2** (Pengguna), **Tabel 2.3** (Modul) | 3–4 |
| 2.3 | Proses Bisnis Sistem | — | — | — | 2 |
| 2.4 | Landasan Teori | #40 → **Gambar 2.2** | — | **Tabel 2.1** (Technology Stack) | 6–8 |

### Sisipkan Screenshot

| Screenshot | File | Caption | Status |
| --- | --- | --- | --- |
| #09 | `screenshots/bab2/screenshot_09.png` | Gambar 2.1 Program kerja Departemen Manajemen Produk Baru | AUTO |
| #40 | `screenshots/bab2/screenshot_40.png` | Gambar 2.2 Dependency utama aplikasi pada package.json | AUTO |

### Sisipkan Tabel

| Tabel | Judul | Sumber | Status |
| --- | --- | --- | --- |
| Tabel 2.1 | Technology Stack dan Fungsinya | BAB_II_GAMBARAN_UMUM.md — 2.4 Landasan Teori | [ ] |
| Tabel 2.2 | Pengguna Sistem dan Hak Akses | BAB_II_GAMBARAN_UMUM.md — 2.2.2 | [ ] |
| Tabel 2.3 | Modul Utama Sistem | BAB_II_GAMBARAN_UMUM.md — 2.2.3 | [ ] |

**Total estimasi:** 14–18 halaman (halaman 11–28)

| Checklist | Status |
| --- | --- |
| Sumber: `docs/BAB_II_GAMBARAN_UMUM.md` | [ ] |
| Sisip screenshot #09 — Program Cards | [ ] |
| Sisip screenshot #40 — package.json | [ ] |
| Sisip Tabel 2.1 — Technology Stack | [ ] |
| Sisip Tabel 2.2 — Pengguna Sistem | [ ] |
| Sisip Tabel 2.3 — Modul Utama | [ ] |
| **Selesai** | [ ] |

---

## 🟦 BAB III — PELAKSANAAN KERJA PRAKTEK

| Sub BAB | Judul | Screenshot | Diagram | Tabel | Est. Hal |
| --- | --- | --- | --- | --- | ---: |
| 3.1 | Persiapan Lingkungan | #01 → **Gbr 3.16** | — | **Tabel 3.1** Perintah Penting | 2–3 |
| 3.2 | Survei Lapangan | #03 → **Gbr 3.17** | Diagram 3.15 | **Tabel 3.2** Lokasi Survei | 3–4 |
| 3.3 | Arsitektur Sistem | — | Diagram 3.1 | — | 2–3 |
| 3.4 | Struktur Proyek | #11 → **Gbr 3.18**, #30 → **Gbr 3.19** | Diagram 3.2 | — | 2–3 |
| 3.5 | Perancangan Database | #31 → **Gbr 3.20**, #32 → **Gbr 3.21**, #33 → **Gbr 3.22** | Diagram 3.3 | **Tabel 3.3** 22 Tabel DB | 6–8 |
| 3.6 | Perancangan API | #34 → **Gbr 3.23** | Diagram 3.6 | **Tabel 3.4** Endpoint API | 4–5 |
| 3.7 | Authentication | #04 → **Gbr 3.24**, #06 → **Gbr 3.25**, #07 → **Gbr 3.26**, #37 → **Gbr 3.27**, #38 → **Gbr 3.28** | Diagram 3.4, 3.5 | **Tabel 3.5** Role & Hak | 3–4 |
| 3.8.1 | Wilayah | #12 → **Gbr 3.29**, #13 → **Gbr 3.30**, #14 → **Gbr 3.31** | Diagram 3.7 | — | 2 |
| 3.8.2 | Lahan | — | — | — | 1 |
| 3.8.3 | Komoditas | #15 → **Gbr 3.32**, #16 → **Gbr 3.33**, #17 → **Gbr 3.34** | Diagram 3.8 | — | 2 |
| 3.8.4 | Produk | #18 → **Gbr 3.35**, #19 → **Gbr 3.36** | Diagram 3.9, 3.10 | — | 2 |
| 3.8.5 | Potensi | #20 → **Gbr 3.37** | Diagram 3.11 | — | 1 |
| 3.8.6 | Penjualan | #21 → **Gbr 3.38**, #22 → **Gbr 3.39** | Diagram 3.12, 3.13 | — | 2 |
| 3.8.7 | Stall | #23 → **Gbr 3.40**, #24 → **Gbr 3.41**, #25 → **Gbr 3.42**, #26 → **Gbr 3.43** | Diagram 3.14 | — | 2 |
| 3.8.8 | User Management | #27 → **Gbr 3.44** | — | — | 1 |
| 3.8.9 | Dashboard Admin | #10 → **Gbr 3.45** | — | — | 1 |
| 3.8.10 | Visualisasi Peta | #28 → **Gbr 3.46**, #29 → **Gbr 3.47** | — | — | 2 |
| 3.8.11 | Landing Page | #08 → **Gbr 3.48** | — | — | 1 |
| 3.9 | Pengujian Sistem | #05 → **Gbr 3.49**, #35 → **Gbr 3.50**, #36 → **Gbr 3.51** | — | **Tabel 3.6** Skenario Uji | 4–5 |
| 3.10 | Build & Deployment | #39 → **Gbr 3.52** | — | — | 2–3 |
| 3.11 | Analisis & Temuan | — | — | **Tabel 3.7** Status Modul | 4–5 |
| 3.12 | Kontribusi Mahasiswa | #02 → **Gbr 3.53** | — | **Tabel 3.8** Kontribusi | 3–4 |

### Sisipkan Diagram (15 diagram)

| No | File | Caption | Sub BAB | Status |
| --- | --- | --- | --- | --- |
| 3.1 | `diagrams/diagram_01.png` | Diagram arsitektur full-stack monolith Satu Peta Pasar | 3.3 | [ ] |
| 3.2 | `diagrams/diagram_02.png` | Diagram struktur direktori dan pembagian layer proyek | 3.4 | [ ] |
| 3.3 | `diagrams/diagram_03.png` | Entity Relationship Diagram 22 tabel database | 3.5 | [ ] |
| 3.4 | `diagrams/diagram_04.png` | Sequence diagram alur login pengguna | 3.7 | [ ] |
| 3.5 | `diagrams/diagram_05.png` | Diagram authentication dan route guard | 3.7 | [ ] |
| 3.6 | `diagrams/diagram_06.png` | Sequence diagram alur query dan mutation API | 3.6 | [ ] |
| 3.7 | `diagrams/diagram_07.png` | Diagram alur CRUD modul wilayah | 3.8.1 | [ ] |
| 3.8 | `diagrams/diagram_08.png` | Diagram modul komoditas dengan status read-only | 3.8.3 | [ ] |
| 3.9 | `diagrams/diagram_09.png` | Diagram alur CRUD Product Brand | 3.8.4 | [ ] |
| 3.10 | `diagrams/diagram_10.png` | Diagram alur CRUD Product Dosage | 3.8.4 | [ ] |
| 3.11 | `diagrams/diagram_11.png` | Diagram penyajian data Province Potential (read-only) | 3.8.5 | [ ] |
| 3.12 | `diagrams/diagram_12.png` | Diagram alur CRUD Sales Realization | 3.8.6 | [ ] |
| 3.13 | `diagrams/diagram_13.png` | Diagram alur CRUD Daily Sales | 3.8.6 | [ ] |
| 3.14 | `diagrams/diagram_14.png` | Diagram alur CRUD Stall dan assignment Product Brand | 3.8.7 | [ ] |
| 3.15 | `diagrams/diagram_15.png` | Diagram alur data survei lapangan ke dalam sistem | 3.2 | [ ] |

**Sumber diagram:** `docs/DIAGRAM_MERMAID.md` — render Mermaid ke PNG.
**Rekomendasi:** Gunakan mermaid.live atau plugin VS Code. Simpan di `diagrams/diagram_01.png` – `diagrams/diagram_15.png`.

### Sisipkan Screenshot (38 screenshot — urutan sesuai Sub BAB)

| No | # | File | Caption | Status |
| --- | --- | --- | --- | --- |
| 3.16 | 01 | `screenshots/bab3/setup/screenshot_01.png` | Gambar 3.16 Proses menjalankan development server | MANUAL |
| 3.17 | 03 | `screenshots/bab3/survei/screenshot_03.png` | Gambar 3.17 Data survei lapangan kios dalam format Excel | MANUAL |
| 3.18 | 11 | `screenshots/bab3/dashboard/screenshot_11.png` | Gambar 3.18 Sidebar navigasi panel admin | AUTO |
| 3.19 | 30 | `screenshots/bab3/database/screenshot_30.png` | Gambar 3.19 Struktur file schema Drizzle ORM | AUTO |
| 3.20 | 31 | `screenshots/bab3/database/screenshot_31.png` | Gambar 3.20 Definisi tabel autentikasi pada schema Drizzle | AUTO |
| 3.21 | 32 | `screenshots/bab3/database/screenshot_32.png` | Gambar 3.21 Seluruh tabel database pada Drizzle Studio | MANUAL |
| 3.22 | 33 | `screenshots/bab3/database/screenshot_33.png` | Gambar 3.22 Entity Relationship Diagram 22 tabel database | MANUAL |
| 3.23 | 34 | `screenshots/bab3/api/screenshot_34.png` | Gambar 3.23 Struktur router oRPC utama | AUTO |
| 3.24 | 04 | `screenshots/bab3/auth/screenshot_04.png` | Gambar 3.24 Halaman login pengguna | AUTO |
| 3.25 | 06 | `screenshots/bab3/auth/screenshot_06.png` | Gambar 3.25 Halaman admin setelah login berhasil | AUTO |
| 3.26 | 07 | `screenshots/bab3/auth/screenshot_07.png` | Gambar 3.26 Cookie session Better Auth pada browser | MANUAL |
| 3.27 | 37 | `screenshots/bab3/auth/screenshot_37.png` | Gambar 3.27 Implementasi route guard pada halaman admin | AUTO |
| 3.28 | 38 | `screenshots/bab3/auth/screenshot_38.png` | Gambar 3.28 Konfigurasi Better Auth dengan adapter Drizzle | AUTO |
| 3.29 | 12 | `screenshots/bab3/wilayah/screenshot_12.png` | Gambar 3.29 Daftar data provinsi pada panel admin | AUTO |
| 3.30 | 13 | `screenshots/bab3/wilayah/screenshot_13.png` | Gambar 3.30 Form penambahan data provinsi | AUTO |
| 3.31 | 14 | `screenshots/bab3/wilayah/screenshot_14.png` | Gambar 3.31 Daftar data kabupaten dengan relasi provinsi | AUTO |
| 3.32 | 15 | `screenshots/bab3/komoditas/screenshot_15.png` | Gambar 3.32 Daftar jenis komoditas dengan filter jenis lahan | AUTO |
| 3.33 | 16 | `screenshots/bab3/komoditas/screenshot_16.png` | Gambar 3.33 Data komoditas tingkat provinsi (read-only) | AUTO |
| 3.34 | 17 | `screenshots/bab3/komoditas/screenshot_17.png` | Gambar 3.34 Data komoditas tingkat kabupaten dengan CRUD penuh | AUTO |
| 3.35 | 18 | `screenshots/bab3/produk/screenshot_18.png` | Gambar 3.35 Daftar brand produk yang direferensikan oleh seluruh modul | AUTO |
| 3.36 | 19 | `screenshots/bab3/produk/screenshot_19.png` | Gambar 3.36 Daftar dosis produk untuk setiap brand dan komoditas | AUTO |
| 3.37 | 20 | `screenshots/bab3/potensi/screenshot_20.png` | Gambar 3.37 Data potensi provinsi (read-only) | AUTO |
| 3.38 | 21 | `screenshots/bab3/penjualan/screenshot_21.png` | Gambar 3.38 Data realisasi penjualan dengan metrik RKAP dan YTD | AUTO |
| 3.39 | 22 | `screenshots/bab3/penjualan/screenshot_22.png` | Gambar 3.39 Data penjualan harian per brand produk | AUTO |
| 3.40 | 23 | `screenshots/bab3/stall/screenshot_23.png` | Gambar 3.40 Daftar kios pada modul Stall | AUTO |
| 3.41 | 24 | `screenshots/bab3/stall/screenshot_24.png` | Gambar 3.41 Form penambahan data kios | AUTO |
| 3.42 | 25 | `screenshots/bab3/stall/screenshot_25.png` | Gambar 3.42 Modal assignment brand produk ke kios | AUTO |
| 3.43 | 26 | `screenshots/bab3/stall/screenshot_26.png` | Gambar 3.43 Halaman detail kios publik | MANUAL* |
| 3.44 | 27 | `screenshots/bab3/user/screenshot_27.png` | Gambar 3.44 Daftar pengguna dengan role masing-masing | AUTO |
| 3.45 | 10 | `screenshots/bab3/dashboard/screenshot_10.png` | Gambar 3.45 Dashboard admin dengan ringkasan data | AUTO |
| 3.46 | 28 | `screenshots/bab3/peta/screenshot_28.png` | Gambar 3.46 Peta interaktif dengan batas wilayah Indonesia | AUTO |
| 3.47 | 29 | `screenshots/bab3/peta/screenshot_29.png` | Gambar 3.47 Visualisasi choropleth data potensi pasar | AUTO |
| 3.48 | 08 | `screenshots/bab3/dashboard/screenshot_08.png` | Gambar 3.48 Halaman utama Satu Peta Pasar | AUTO |
| 3.49 | 05 | `screenshots/bab3/auth/screenshot_05.png` | Gambar 3.49 Pesan error saat login gagal | AUTO |
| 3.50 | 35 | `screenshots/bab3/api/screenshot_35.png` | Gambar 3.50 Response endpoint health check | AUTO |
| 3.51 | 36 | `screenshots/bab3/api/screenshot_36.png` | Gambar 3.51 Response validasi error dari Zod | AUTO |
| 3.52 | 39 | `screenshots/bab3/deployment/screenshot_39.png` | Gambar 3.52 Konfigurasi deployment Netlify | AUTO |
| 3.53 | 02 | `screenshots/bab3/kontribusi/screenshot_02.png` | Gambar 3.53 Detail commit pengembangan modul Stall | MANUAL |

**Catatan:** `MANUAL*` = #26 Stall Detail perlu diambil manual karena ID stall tidak bisa di-resolve otomatis.

### Sisipkan Tabel

| Tabel | Judul | Sumber | Status |
| --- | --- | --- | --- |
| Tabel 3.1 | Perintah Penting dan Fungsinya | BAB_III_BAGIAN_1.md — 3.1.6 | [ ] |
| Tabel 3.2 | Ringkasan Lokasi Survei Lapangan | BAB_III_BAGIAN_1.md — 3.2.2 | [ ] |
| Tabel 3.3 | Daftar 22 Tabel Database | BAB_III_BAGIAN_2.md — 3.5 | [ ] |
| Tabel 3.4 | Endpoint API per Modul | BAB_III_BAGIAN_2.md — 3.6.4 | [ ] |
| Tabel 3.5 | Role dan Hak Akses | BAB_III_BAGIAN_2.md — 3.7.4 | [ ] |
| Tabel 3.6 | Skenario Pengujian | BAB_III_BAGIAN_3.md — 3.9 | [ ] |
| Tabel 3.7 | Matriks Status Modul | BAB_III_BAGIAN_3.md — 3.11.1 | [ ] |
| Tabel 3.8 | Matriks Kontribusi Mahasiswa | BAB_III_BAGIAN_3.md — 3.12 | [ ] |

**Total estimasi:** 42–54 halaman (halaman 29–82)

| Checklist | Status |
| --- | --- |
| Sumber: `docs/BAB_III_BAGIAN_1.md` + `BAGIAN_2.md` + `BAGIAN_3.md` | [ ] |
| Sisip 15 diagram (Gambar 3.1–3.15) | [ ] |
| Sisip 38 screenshot (Gambar 3.16–3.53) | [ ] |
| Sisip Tabel 3.1 — Perintah Penting | [ ] |
| Sisip Tabel 3.2 — Lokasi Survei | [ ] |
| Sisip Tabel 3.3 — 22 Tabel Database | [ ] |
| Sisip Tabel 3.4 — Endpoint API | [ ] |
| Sisip Tabel 3.5 — Role & Hak Akses | [ ] |
| Sisip Tabel 3.6 — Skenario Pengujian | [ ] |
| Sisip Tabel 3.7 — Status Modul | [ ] |
| Sisip Tabel 3.8 — Kontribusi | [ ] |
| **Selesai** | [ ] |

---

## 🟦 BAB IV — KESIMPULAN DAN SARAN

| Sub BAB | Judul | Screenshot | Diagram | Tabel | Est. Hal |
| --- | --- | --- | --- | --- | ---: |
| 4.1 | Kesimpulan | — | — | — | 3–4 |
| 4.2 | Keterbatasan | — | — | — | 1 |
| 4.3 | Saran Pengembangan | — | — | **Tabel 4.1** Temuan & Rekomendasi | 2 |
| 4.4 | Penutup | — | — | — | 1 |

**Total estimasi:** 6–8 halaman (halaman 83–90)

| Checklist | Status |
| --- | --- |
| Sumber: `docs/BAB_IV_KESIMPULAN.md` | [ ] |
| Sisip Tabel 4.1 — Ringkasan Temuan dan Rekomendasi | [ ] |
| **Selesai** | [ ] |

---

## 🟦 DAFTAR PUSTAKA

| Item | Status |
| --- | --- |
| Sumber: `docs/BAGIAN_AWAL.md` — bagian DAFTAR PUSTAKA | [ ] |
| Minimal 15 referensi (Better Auth, Biome, Bun, Drizzle ORM, Leaflet, oRPC, PostgreSQL, React, TanStack, Ultracite, Vite, Zod, dll.) | [ ] |
| Format APA atau sesuai pedoman institusi | [ ] |
| **Estimasi:** 2–3 halaman (halaman 91–93) | |
| **Selesai** | [ ] |

---

## 🟦 LAMPIRAN

| Sub | Judul | Tabel | Est. Hal |
| --- | --- | --- | ---: |
| A | Logbook Kegiatan | **Tabel A.1** | 2 |
| B | Screenshot Tambahan | — | 1 |
| C | Source Code Representatif | — | 3–4 |
| D | Surat Keterangan Magang | — | 1 |
| E | Daftar Lengkap Endpoint API | **Tabel E.1** | 3–4 |
| F | Daftar Lengkap Tabel Database | (inline tables) | 4–5 |

**Total estimasi:** 8–15 halaman (halaman 94–108)

| Checklist | Status |
| --- | --- |
| Sumber: `docs/LAMPIRAN.md` | [ ] |
| Lampiran A — Logbook (Tabel 17 commit) | [ ] |
| Lampiran B — Screenshot Tambahan | [ ] |
| Lampiran C — Source Code Representatif | [ ] |
| Lampiran D — Surat Keterangan Magang | [ ] |
| Lampiran E — Daftar Endpoint API | [ ] |
| Lampiran F — Daftar Lengkap Tabel Database | [ ] |
| **Selesai** | [ ] |

---

## 🟥 FINALISASI — SEBELUM EXPORT PDF

| No | Item | Status |
| --- | --- | --- |
| 1 | **Numbering halaman** — romawi (i, ii, ...) untuk awal, angka (1, 2, ...) untuk isi | [ ] |
| 2 | **Heading styles** — Heading 1 (BAB), Heading 2 (Sub BAB), Heading 3 (Sub-sub) | [ ] |
| 3 | **Margin** — sesuai pedoman institusi (biasanya 4-4-3-3 cm) | [ ] |
| 4 | **Font** — Times New Roman 12pt atau sesuai pedoman | [ ] |
| 5 | **Line spacing** — 1.5 atau 2 spasi sesuai pedoman | [ ] |
| 6 | **Generate ulang Daftar Isi** — setelah semua konten selesai | [ ] |
| 7 | **Generate ulang Daftar Gambar** — setelah semua caption gambar terisi | [ ] |
| 8 | **Generate ulang Daftar Tabel** — setelah semua caption tabel terisi | [ ] |
| 9 | **Cross-reference** — periksa semua rujukan "Gambar 3.x" dan "Tabel 3.x" | [ ] |
| 10 | **Caption numbering** — pastikan berurutan (Gambar 3.1–3.15 diagram, 3.16–3.53 screenshot) | [ ] |
| 11 | **Sensor data sensitif** — cookie session (#07), email user (#27) harus diblur | [ ] |
| 12 | **Spelling & grammar check** — gunakan built-in Word atau tools eksternal | [ ] |
| 13 | **Cek halaman** — target 88–120 halaman sesuai WORD_ASSEMBLY_GUIDE.md | [ ] |
| 14 | **Export PDF final** | [ ] |

---

## 📊 RINGKASAN ALOKASI

| Bagian | Halaman | Screenshot | Diagram | Tabel | Status |
| --- | ---: | ---: | ---: | ---: | --- |
| Cover | i | 0 | 0 | 0 | [ ] |
| Pengesahan | ii | 0 | 0 | 0 | [ ] |
| Kata Pengantar | iii | 0 | 0 | 0 | [ ] |
| Riwayat Hidup | iv | 0 | 0 | 1 | [ ] |
| Daftar Isi | v–vi | 0 | 0 | 0 | [ ] |
| Daftar Gambar | vii–viii | — | — | 1 | [ ] |
| Daftar Tabel | ix | 0 | 0 | 1 | [ ] |
| BAB I | 1–10 | 0 | 0 | 0 | [ ] |
| BAB II | 11–28 | 2 | 0 | 3 | [ ] |
| BAB III | 29–82 | 38 | 15 | 8 | [ ] |
| BAB IV | 83–90 | 0 | 0 | 1 | [ ] |
| Daftar Pustaka | 91–93 | 0 | 0 | 0 | [ ] |
| Lampiran | 94–108 | 0 | 0 | 2 | [ ] |
| **Total** | **~108 hal** | **40** | **15** | **17** | |

---

## ✅ MASTER CHECKLIST

```
[ ] Cover
[ ] Lembar Pengesahan
[ ] Kata Pengantar
[ ] Daftar Riwayat Hidup
[ ] Daftar Isi
[ ] Daftar Gambar
[ ] Daftar Tabel
[ ] BAB I — Pendahuluan
[ ] BAB II — Gambaran Umum
    [ ] Screenshot #09 — Program Cards (Gambar 2.1)
    [ ] Screenshot #40 — package.json (Gambar 2.2)
    [ ] Tabel 2.1 Technology Stack
    [ ] Tabel 2.2 Pengguna Sistem
    [ ] Tabel 2.3 Modul Utama
[ ] BAB III — Pelaksanaan Kerja Praktek
    [ ] Diagram 3.1 — Arsitektur Sistem
    [ ] Diagram 3.2 — Struktur Project
    [ ] Diagram 3.3 — ERD
    [ ] Diagram 3.4 — Login Flow
    [ ] Diagram 3.5 — Auth & AuthZ
    [ ] Diagram 3.6 — API Flow
    [ ] Diagram 3.7 — Wilayah
    [ ] Diagram 3.8 — Komoditas
    [ ] Diagram 3.9 — Product Brand Flow
    [ ] Diagram 3.10 — Product Dosage Flow
    [ ] Diagram 3.11 — Province Potential Flow
    [ ] Diagram 3.12 — Sales Realization Flow
    [ ] Diagram 3.13 — Daily Sales Flow
    [ ] Diagram 3.14 — Stall Management Flow
    [ ] Diagram 3.15 — Survei Lapangan
    [ ] Screenshot #01 s.d. #39 (38 screenshot — Gambar 3.16–3.53)
    [ ] Tabel 3.1 Perintah Penting
    [ ] Tabel 3.2 Lokasi Survei
    [ ] Tabel 3.3 22 Tabel Database
    [ ] Tabel 3.4 Endpoint API
    [ ] Tabel 3.5 Role & Hak Akses
    [ ] Tabel 3.6 Skenario Pengujian
    [ ] Tabel 3.7 Status Modul
    [ ] Tabel 3.8 Kontribusi
[ ] BAB IV — Kesimpulan dan Saran
    [ ] Tabel 4.1 Temuan & Rekomendasi
[ ] Daftar Pustaka
[ ] Lampiran
    [ ] A — Logbook Kegiatan
    [ ] B — Screenshot Tambahan
    [ ] C — Source Code Representatif
    [ ] D — Surat Keterangan Magang
    [ ] E — Daftar Endpoint API
    [ ] F — Daftar Tabel Database
[ ] Finalisasi — numbering, heading, margin, spacing
[ ] Generate ulang Daftar Isi, Gambar, Tabel
[ ] Cross-reference & spelling check
[ ] EXPORT PDF
```
