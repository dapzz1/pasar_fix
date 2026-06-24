# SCREENSHOT PRIORITY 40 — CHECKLIST FINAL

Target: 40 screenshot untuk laporan final. Setiap screenshot memiliki instruksi capture dan caption gambar.

---

## Kelompok 1: Setup & Kontribusi (2 screenshot)

### 1. Development Server Berjalan
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.1 Persiapan Lingkungan |
| **Halaman** | Terminal PowerShell, direktori root proyek |
| **Area capture** | Output `bun run dev` — tunjukkan dev server running di localhost:3000 |
| **Caption** | "Gambar 3.x Proses menjalankan development server" |

### 2. Detail Commit Stall `7a38bb7`
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.12 Kontribusi Mahasiswa |
| **Halaman** | Terminal: `git show 7a38bb7 --stat` |
| **Area capture** | 5-10 baris pertama output: commit hash, author, date, message, files changed |
| **Caption** | "Gambar 3.x Detail commit pengembangan modul Stall" |

---

## Kelompok 2: Survei Lapangan (1 screenshot)

### 3. File Excel Data Survei
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.2 Kegiatan Survei Lapangan |
| **Halaman** | File Explorer: `D:\pasar_fix\data\SURVEY PASAR KIOS (Jawaban).xlsx` |
| **Area capture** | File terpilih di Explorer + properties (size, type) — sensor nama responden |
| **Caption** | "Gambar 3.x Data survei lapangan kios dalam format Excel" |

---

## Kelompok 3: Authentication (4 screenshot)

### 4. Halaman Login
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.7 Authentication |
| **Halaman** | Browser: `http://localhost:3000/auth/login` |
| **Area capture** | Form login: input email, password, tombol sign in |
| **Caption** | "Gambar 3.x Halaman login pengguna" |

### 5. Gagal Login
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.9 Pengujian Authentication |
| **Halaman** | Browser: `http://localhost:3000/auth/login` — isi dengan kredensial salah lalu submit |
| **Area capture** | Pesan error (toast/alert) setelah submit kredensial tidak valid |
| **Caption** | "Gambar 3.x Pesan error saat login gagal" |

### 6. Redirect Setelah Login Berhasil
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.7 Authentication |
| **Halaman** | Login dengan admin credentials, tangkapan setelah redirect |
| **Area capture** | Halaman admin yang muncul setelah login berhasil (URL bar visible) |
| **Caption** | "Gambar 3.x Halaman admin setelah login berhasil" |

### 7. Session Cookie DevTools
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.7 Authentication |
| **Halaman** | Browser DevTools → Application → Cookies → localhost:3000 |
| **Area capture** | Cookie session Better Auth — sensor value cookie (blur value) |
| **Caption** | "Gambar 3.x Cookie session Better Auth pada browser" |

---

## Kelompok 4: Landing Page & Dashboard (4 screenshot)

### 8. Landing Page Publik — Hero
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.11 Landing Page Publik |
| **Halaman** | Browser: `http://localhost:3000/` |
| **Area capture** | Hero section: judul "Satu Peta Pasar" + statistik counters |
| **Caption** | "Gambar 3.x Halaman utama Satu Peta Pasar" |

### 9. Landing Page — Program Cards
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB II / 2.2 Gambaran Umum Sistem |
| **Halaman** | Browser: scroll ke bawah dari landing page |
| **Area capture** | Tiga program cards: Market Map, Roadshow, Socialization |
| **Caption** | "Gambar 2.x Program kerja Departemen Manajemen Produk Baru" |

### 10. Admin Dashboard — Summary Cards
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.9 Dashboard Admin |
| **Halaman** | Browser: `http://localhost:3000/admin` (login as admin) |
| **Area capture** | Cards statistik: provinsi, kabupaten, komoditas, brand, kios, penjualan |
| **Caption** | "Gambar 3.x Dashboard admin dengan ringkasan data" |

### 11. Admin Sidebar Navigasi
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.4 Struktur Proyek |
| **Halaman** | Browser: dashboard admin — sidebar terbuka |
| **Area capture** | Sidebar menu: Overview, Wilayah, Lahan, Komoditas, Produk, Potensi, Penjualan, Stall, User |
| **Caption** | "Gambar 3.x Sidebar navigasi panel admin" |

---

## Kelompok 5: Wilayah (3 screenshot)

### 12. Daftar Province
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.1 Modul Wilayah |
| **Halaman** | Browser: `http://localhost:3000/admin/region/province` (login as admin) |
| **Area capture** | Tabel daftar provinsi: kolom kode, nama, luas, tahun + search bar + pagination |
| **Caption** | "Gambar 3.x Daftar data provinsi pada panel admin" |

### 13. Form Tambah Province
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.1 Modul Wilayah |
| **Halaman** | Klik tombol "Tambah" pada halaman Province |
| **Area capture** | Modal/dialog form: input kode, nama, luas, tahun |
| **Caption** | "Gambar 3.x Form penambahan data provinsi" |

### 14. Daftar Regency
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.1 Modul Wilayah |
| **Halaman** | Browser: `http://localhost:3000/admin/region/regency` |
| **Area capture** | Tabel kabupaten/kota: kolom kode, nama, provinsi induk, luas, tahun + search/pagination |
| **Caption** | "Gambar 3.x Daftar data kabupaten dengan relasi provinsi" |

---

## Kelompok 6: Komoditas (3 screenshot)

### 15. Daftar Commodity Type
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.3 Modul Komoditas |
| **Halaman** | Browser: `http://localhost:3000/admin/commodity` |
| **Area capture** | Tabel jenis komoditas: kolom nama, jenis lahan, tahun + filter Land Type dropdown |
| **Caption** | "Gambar 3.x Daftar jenis komoditas dengan filter jenis lahan" |

### 16. Daftar Province Commodity (Read-Only)
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.3 Modul Komoditas |
| **Halaman** | Browser: `http://localhost:3000/admin/commodity/province-commodity` |
| **Area capture** | Tabel komoditas provinsi — pastikan tidak ada tombol tambah/edit/delete |
| **Caption** | "Gambar 3.x Data komoditas tingkat provinsi (read-only)" |

### 17. Daftar Regency Commodity
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.3 Modul Komoditas |
| **Halaman** | Browser: `http://localhost:3000/admin/commodity/regency-commodity` |
| **Area capture** | Tabel komoditas kabupaten: kolom regency, komoditas, luas, tahun + tombol aksi |
| **Caption** | "Gambar 3.x Data komoditas tingkat kabupaten dengan CRUD penuh" |

---

## Kelompok 7: Produk (2 screenshot)

### 18. Daftar Product Brand
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.4 Modul Produk |
| **Halaman** | Browser: `http://localhost:3000/admin/product/product-brand` |
| **Area capture** | Tabel brand: kolom nama, industri, deskripsi, product type + filter/search |
| **Caption** | "Gambar 3.x Daftar brand produk yang direferensikan oleh seluruh modul" |

### 19. Daftar Product Dosage
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.4 Modul Produk |
| **Halaman** | Browser: `http://localhost:3000/admin/product/product-dosage` |
| **Area capture** | Tabel dosis: kolom komoditas, brand, dosis, satuan, tahun |
| **Caption** | "Gambar 3.x Daftar dosis produk untuk setiap brand dan komoditas" |

---

## Kelompok 8: Potensi (1 screenshot)

### 20. Daftar Province Potential (Read-Only)
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.5 Modul Potensi |
| **Halaman** | Browser: `http://localhost:3000/admin/potential/province-potential` |
| **Area capture** | Tabel potensi provinsi: kolom provinsi, brand, nilai, tahun + filter — pastikan tanpa tombol create/edit/delete |
| **Caption** | "Gambar 3.x Data potensi provinsi (read-only)" |

---

## Kelompok 9: Penjualan (2 screenshot)

### 21. Daftar Sales Realization
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.6 Modul Penjualan |
| **Halaman** | Browser: `http://localhost:3000/admin/sale` |
| **Area capture** | Tabel realisasi: brand, tanggal, realisasi harian/bulanan/YTD, RKAP + filter date range |
| **Caption** | "Gambar 3.x Data realisasi penjualan dengan metrik RKAP dan YTD" |

### 22. Daftar Daily Sales
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.6 Modul Penjualan |
| **Halaman** | Browser: `http://localhost:3000/admin/sale/sale-daily` |
| **Area capture** | Tabel penjualan harian: brand, provinsi, qty, revenue, target, realisasi + filter |
| **Caption** | "Gambar 3.x Data penjualan harian per brand produk" |

---

## Kelompok 10: Stall (4 screenshot)

### 23. Daftar Stall
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.7 Modul Stall |
| **Halaman** | Browser: `http://localhost:3000/admin/stall` (login as admin) |
| **Area capture** | Tabel kios: nama, alamat, provinsi, kabupaten, pemilik + search/pagination |
| **Caption** | "Gambar 3.x Daftar kios pada modul Stall" |

### 24. Form Tambah Stall
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.7 Modul Stall |
| **Halaman** | Klik tombol "Tambah" pada halaman Stall |
| **Area capture** | Form lengkap: nama, alamat, provinsi (dropdown), kabupaten (dropdown), latitude, longitude, pemilik, noTelp, kriteria |
| **Caption** | "Gambar 3.x Form penambahan data kios" |

### 25. Modal Assignment Product Brand
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.7 Modul Stall |
| **Halaman** | Klik tombol "Products" pada baris stall |
| **Area capture** | Modal dialog: daftar brand dengan checkbox + tombol Simpan |
| **Caption** | "Gambar 3.x Modal assignment brand produk ke kios" |

### 26. Halaman Detail Stall Publik
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.7 Modul Stall |
| **Halaman** | Browser: `http://localhost:3000/stall/[id]` (buka dari landing page atau map) |
| **Area capture** | Detail kios publik: nama, alamat, kontak, daftar brand yang tersedia |
| **Caption** | "Gambar 3.x Halaman detail kios publik" |

---

## Kelompok 11: User Management (1 screenshot)

### 27. Daftar User
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.8 User Management |
| **Halaman** | Browser: `http://localhost:3000/admin/user` |
| **Area capture** | Tabel pengguna: nama, email, role (admin/viewer/guest) — sensor email |
| **Caption** | "Gambar 3.x Daftar pengguna dengan role masing-masing" |

---

## Kelompok 12: Visualisasi Peta (2 screenshot)

### 28. Halaman Peta Utama
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.10 Visualisasi Peta |
| **Halaman** | Browser: `http://localhost:3000/map` |
| **Area capture** | Peta Leaflet interaktif dengan batas wilayah Indonesia + sidebar filter |
| **Caption** | "Gambar 3.x Peta interaktif dengan batas wilayah Indonesia" |

### 29. Peta Choropleth Potensi
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.8.10 Visualisasi Peta |
| **Halaman** | Browser: pilih filter potensi pada halaman peta |
| **Area capture** | Peta dengan gradasi warna per wilayah + legend + sidebar filter aktif |
| **Caption** | "Gambar 3.x Visualisasi choropleth data potensi pasar" |

---

## Kelompok 13: Database (4 screenshot)

### 30. Struktur Folder Schema Drizzle
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.5 Perancangan Database |
| **Halaman** | VS Code / File Explorer: `apps/web/src/lib/db/schema/` |
| **Area capture** | Tree: auth.ts, map-product.ts, sale.ts, stall.ts, todo.ts, utils.ts |
| **Caption** | "Gambar 3.x Struktur file schema Drizzle ORM" |

### 31. Potongan Schema Auth
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.5 Perancangan Database |
| **Halaman** | Editor: `apps/web/src/lib/db/schema/auth.ts` |
| **Area capture** | Definisi tabel `user` (kolom id, name, email, role) dan relasi ke session/account |
| **Caption** | "Gambar 3.x Definisi tabel autentikasi pada schema Drizzle" |

### 32. Daftar Tabel di Drizzle Studio
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.5 Perancangan Database |
| **Halaman** | Terminal: `bun run db:studio` lalu buka browser di URL studio |
| **Area capture** | Panel kiri Drizzle Studio: daftar seluruh tabel (22 tabel) |
| **Caption** | "Gambar 3.x Seluruh tabel database pada Drizzle Studio" |

### 33. ERD 22 Tabel
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.5 Perancangan Database |
| **Halaman** | Drizzle Studio → tab Relations / ERD atau buka dari dokumentasi |
| **Area capture** | Diagram ERD yang menampilkan seluruh tabel dan relasi |
| **Caption** | "Gambar 3.x Entity Relationship Diagram 22 tabel database" |

---

## Kelompok 14: API (3 screenshot)

### 34. Struktur Router oRPC
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.6 Perancangan API |
| **Halaman** | Editor: `apps/web/src/lib/orpc/router/index.ts` |
| **Area capture** | Komposisi router: healthCheck, auth, todo, map, admin (dengan subdomain) |
| **Caption** | "Gambar 3.x Struktur router oRPC utama" |

### 35. Response Health Check
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.9 Pengujian API |
| **Halaman** | Browser: `http://localhost:3000/api/rpc/healthCheck` atau terminal `curl` |
| **Area capture** | Response "OK" dari endpoint publik |
| **Caption** | "Gambar 3.x Response endpoint health check" |

### 36. Response Validation Error Zod
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.9 Pengujian API |
| **Halaman** | DevTools Network / terminal: kirim request dengan input tidak valid ke protected endpoint |
| **Area capture** | Response JSON error validasi Zod (array of field errors) |
| **Caption** | "Gambar 3.x Response validasi error dari Zod" |

---

## Kelompok 15: Authentication — Code (2 screenshot)

### 37. Route Guard Admin
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.7 Authentication |
| **Halaman** | Editor: `apps/web/src/routes/admin/route.tsx` |
| **Area capture** | Fungsi `beforeLoad`: pemeriksaan session + redirect logic |
| **Caption** | "Gambar 3.x Implementasi route guard pada halaman admin" |

### 38. Konfigurasi Better Auth
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.7 Authentication |
| **Halaman** | Editor: `apps/web/src/lib/auth/index.ts` |
| **Area capture** | Setup Better Auth: Drizzle adapter, email/password provider, session config |
| **Caption** | "Gambar 3.x Konfigurasi Better Auth dengan adapter Drizzle" |

---

## Kelompok 16: Deployment (2 screenshot)

### 39. File netlify.toml
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB III / 3.10 Build, Testing, dan Deployment |
| **Halaman** | Editor: `D:\pasar_fix\netlify.toml` |
| **Area capture** | Konfigurasi: base, command, publish, redirects |
| **Caption** | "Gambar 3.x Konfigurasi deployment Netlify" |

### 40. File package.json Dependencies
| Field | Isi |
| --- | --- |
| **BAB/Sub BAB** | BAB II / 2.4 Landasan Teori |
| **Halaman** | Editor: `D:\pasar_fix\apps\web\package.json` |
| **Area capture** | Bagian dependencies: oRPC, Drizzle, Better Auth, TanStack, Zod, Leaflet |
| **Caption** | "Gambar 2.x Dependency utama aplikasi pada package.json" |

---

# RINGKASAN PER BAB

| BAB | Screenshot | Jumlah |
| --- | --- | ---: |
| BAB II — Gambaran Umum | 9, 40 | 2 |
| BAB III — Pelaksanaan KP | 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39 | **38** |
| **Total** | | **40** |

# RINGKASAN PER PRIORITAS AREA

| Area | Jumlah | Nomor Screenshot |
| --- | ---: | --- |
| Setup & Kontribusi | 2 | 1, 2 |
| Survei Lapangan | 1 | 3 |
| Authentication | 4 | 4, 5, 6, 7 |
| Landing Page & Dashboard | 4 | 8, 9, 10, 11 |
| Wilayah | 3 | 12, 13, 14 |
| Komoditas | 3 | 15, 16, 17 |
| Produk | 2 | 18, 19 |
| Potensi | 1 | 20 |
| Penjualan | 2 | 21, 22 |
| Stall | 4 | 23, 24, 25, 26 |
| User Management | 1 | 27 |
| Visualisasi Peta | 2 | 28, 29 |
| Database | 4 | 30, 31, 32, 33 |
| API | 3 | 34, 35, 36 |
| Authentication Code | 2 | 37, 38 |
| Deployment | 2 | 39, 40 |
| **Total** | **40** | |

# PANDUAN PENGAMBILAN

1. **Urutan ambil:** Ikuti nomor 1-40, mulai dari yang paling mudah (terminal, file) ke yang membutuhkan login (UI).
2. **Login admin:** Gunakan kredensial admin untuk screenshot yang membutuhkan panel admin.
3. **Sensor data sensitif:** Cookie session, email pengguna, token, dan data pribadi wajib diblur.
4. **Ukuran gambar:** Capture dalam resolusi layar penuh (1920x1080 atau 1366x768) untuk konsistensi.
5. **Format file:** PNG untuk hasil terbaik, JPG jika ukuran file perlu ditekan.
6. **Penamaan file:** `screenshot_01.png` hingga `screenshot_40.png` sesuai nomor urut.
