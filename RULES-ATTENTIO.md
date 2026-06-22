# Aturan Seleksi File Sebelum Push

Dokumen ini adalah hasil audit struktur repository **Satu Peta Pasar** pada 22 Juni 2026. Tujuannya menentukan file yang layak masuk Git, file yang harus tetap lokal, dan file yang perlu ditinjau sebelum dipublikasikan.

## Ringkasan keputusan

| Kategori | Keputusan |
| --- | --- |
| Source code, schema, migration, test, dan konfigurasi proyek | **Push** |
| Lockfile `bun.lock` | **Push** |
| `.env.example` | **Push hanya setelah disanitasi** |
| `.env`, `.env.local`, `.env.production`, dan secret deployment | **Jangan push** |
| Dependency, build output, cache, log, dan state deployment lokal | **Jangan push** |
| GeoJSON di `apps/web/public/data/` | **Push bersyarat; data dipakai runtime tetapi terlalu besar untuk Git biasa** |
| Dokumentasi di root dan `docs/` | **Push setelah pemeriksaan isi/PII dan hanya satu salinan** |
| `henokhdoc/` | **Jangan push dalam kondisi sekarang karena seluruh isinya duplikat** |
| Konfigurasi editor bersama | **Push jika disepakati tim** |
| Konfigurasi lokal pengguna/AI tool | **Jangan push** |

## Struktur repository yang ditemukan

```text
.
|-- apps/
|   `-- web/                  # Aplikasi full-stack TanStack Start
|       |-- public/           # Aset publik dan dataset GeoJSON
|       |-- src/
|       |   |-- components/   # Komponen React/UI
|       |   |-- env/          # Validasi environment client/server
|       |   |-- hooks/        # React hooks
|       |   |-- lib/          # Auth, DB, oRPC, i18n, dan utilitas
|       |   `-- routes/       # Route publik, auth, map, dan admin
|       |-- .env.example      # Template environment; wajib disanitasi
|       |-- Dockerfile
|       |-- docker-compose.yml
|       `-- package.json
|-- docs/                     # Dokumentasi laporan magang
|-- henokhdoc/                # Salinan duplikat dokumentasi
|-- MAINTENANCE/              # Referensi/skrip lama
|-- .github/                  # Workflow dan instruksi repository
|-- .husky/                   # Git hook
|-- .kiro/                    # Spesifikasi serta screenshot desain
|-- .serena/                  # Konfigurasi dan cache tool lokal
|-- .vscode/ dan .zed/        # Konfigurasi editor
|-- package.json              # Script monorepo
|-- bun.lock                  # Dependency lockfile
|-- turbo.json                # Konfigurasi Turborepo
|-- biome.json                # Lint/format
`-- bts.jsonc                 # Metadata Better-T-Stack lama
```

Catatan: implementasi aktif tidak mempunyai `apps/server/`. Backend, oRPC, autentikasi, dan Drizzle berada di `apps/web/`. Keterangan lama yang menyebut backend Hono terpisah tidak boleh dijadikan acuan struktur aktual.

## File dan folder yang layak dipush

### Source dan konfigurasi aplikasi

Push perubahan yang memang selesai dan sudah diverifikasi pada:

- `apps/web/src/**/*.ts` dan `apps/web/src/**/*.tsx`;
- `apps/web/src/**/*.css`;
- file katalog terjemahan sumber `*.po`;
- `apps/web/public/` untuk aset yang memang dibutuhkan aplikasi;
- `apps/web/src/lib/db/schema/`;
- `apps/web/src/lib/db/migrations/`, termasuk SQL, snapshot, dan `_journal.json`;
- test, setup test, dan konfigurasi TypeScript/Vite/Vitest;
- `package.json`, `apps/web/package.json`, dan `bun.lock`;
- `biome.json`, `turbo.json`, `tsconfig.json`, `bunfig.toml`, dan `lefthook.yml`;
- `Dockerfile`, `docker-compose.yml`, `.dockerignore`, `netlify.toml`, dan `vercel.json` selama tidak berisi credential;
- `.github/workflows/` dan `.husky/` jika workflow/hook berlaku untuk seluruh tim;
- `.gitignore` dan dokumentasi teknis yang sudah ditinjau.

Migration harus dipush bersama perubahan schema yang memerlukannya. Jangan push schema baru tanpa migration yang sesuai, kecuali perubahan tersebut secara eksplisit memakai alur `db:push` dan keputusan itu didokumentasikan.

### File generated yang dipakai source

`apps/web/src/routeTree.gen.ts` saat ini tracked dan diimpor oleh `src/router.tsx`, tetapi script `clean` menghapusnya. Pilih satu kebijakan tim dan gunakan secara konsisten:

1. Tetap push file tersebut agar clone baru langsung memiliki route tree; atau
2. Jangan push, tambahkan ke `.gitignore`, dan pastikan `dev`, `build`, serta CI selalu membuatnya kembali.

Untuk kondisi repository saat ini, mempertahankannya di Git adalah pilihan paling aman sampai proses generation di CI dibuktikan stabil.

## File dan folder yang tidak boleh dipush

### Secret dan environment lokal

Jangan pernah push:

```text
.env
.env.*
!.env.example
!.env.*.example
*.pem
*.key
*.p12
*.pfx
*.crt
*.cer
credentials*.json
```

Pada audit ini ditemukan file lokal berikut dan semuanya harus tetap ignored:

- `apps/web/.env`;
- `apps/web/.env.local`;
- `apps/web/.env.production`.

Nilai `DATABASE_URL`, `BETTER_AUTH_SECRET`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_SECRET`, password PostgreSQL, token, dan credential provider harus disimpan di secret manager platform deployment, bukan di Git.

### Dependency, hasil build, cache, dan log

Jangan push:

```text
node_modules/
.turbo/
.nitro/
.tanstack/
.netlify/
.vercel/
.output/
dist/
build/
out/
coverage/
*.tsbuildinfo
*.log
*.log.*
```

Contoh artefak lokal yang ditemukan: `.dev-stdout.log`, `.dev-stderr.log`, root `.turbo/`, `apps/web/.turbo/`, `apps/web/.nitro/`, `apps/web/.tanstack/`, `apps/web/.netlify/`, `apps/web/.vercel/`, `apps/web/dist/`, dan seluruh `node_modules/`.

### Cache dan konfigurasi personal tool

- `.serena/cache/` tidak boleh dipush. File cache pickle Serena sudah terlanjur tracked dan sebaiknya dikeluarkan dari index Git.
- `.claude/settings.local.json` bersifat lokal, berisi permission serta path komputer pengguna, dan tidak boleh dipush. File ini juga sudah terlanjur tracked.
- `.kiro/`, `.qwen/`, `.claude/`, atau konfigurasi AI lain hanya boleh dipush jika berisi aturan proyek yang sengaja dibagikan. State lokal, cache, permission personal, dan absolute path harus tetap lokal.

Perintah perbaikan index yang dapat dijalankan pada commit housekeeping terpisah:

```bash
git rm --cached .serena/cache/typescript/document_symbols_cache_v23-06-25.pkl
git rm --cached .claude/settings.local.json
```

Jangan menghapus file lokalnya jika masih digunakan; `--cached` hanya mengeluarkannya dari tracking Git.

## Temuan yang wajib ditangani sebelum push berikutnya

### 1. Sanitasi `.env.example`

`apps/web/.env.example` saat audit memuat blok konfigurasi ganda, secret autentikasi yang tampak konkret, URL tunnel, dan nilai OAuth dummy. Walaupun sebagian mungkin bukan credential produksi, format tersebut tidak layak dipublikasikan.

Aturan template environment:

- hanya satu definisi untuk setiap variable;
- gunakan placeholder yang jelas, misalnya `replace-with-random-secret-at-least-32-chars`;
- gunakan URL lokal atau domain `example.com`;
- jangan salin nilai dari `.env.production`;
- jangan isi `DATABASE_URL` produksi;
- variable berawalan `VITE_` dianggap dapat terlihat di browser, sehingga tidak boleh berisi secret.

Jika nilai yang tampak konkret pernah digunakan, rotasi nilai tersebut sebelum melakukan push berikutnya. Menghapusnya dari commit baru tidak menghapusnya dari histori lama.

### 2. Keluarkan cache yang sudah tracked

`.gitignore` sudah mengabaikan `.serena/cache/` dan `.claude/settings.local.json`, tetapi ignore tidak berpengaruh pada file yang sudah tracked. Jalankan `git rm --cached` seperti di atas lalu commit perubahan housekeeping.

### 3. Jangan push dokumentasi duplikat

Seluruh 11 file di `henokhdoc/` identik byte-per-byte dengan file di root atau `apps/web/` pada saat audit. Folder ini tidak memberikan sumber informasi baru dan hanya memperbesar risiko dokumen berbeda versi.

Gunakan root dan `docs/` sebagai lokasi kanonis. Jangan stage `henokhdoc/` kecuali folder tersebut diubah menjadi artefak terpisah dengan tujuan yang jelas.

### 4. Tinjau dokumentasi magang dan PII

Dokumen di `docs/` dan `PROJECT_DOCUMENTATION_FOR_INTERNSHIP.md` layak dipush bila repository memang menjadi sumber dokumentasi magang. Sebelum dipublikasikan:

- pastikan nama, NBI/NIM, email, perusahaan, dan data personal memang boleh dipublikasikan;
- hapus credential, URL internal, data user nyata, dan informasi deployment privat;
- bedakan fakta source code dari klaim kontribusi individu;
- jangan push salinan yang sama ke root, `docs/`, dan `henokhdoc/` sekaligus.

`NETLIFY.md` menggunakan placeholder pada contoh yang diperiksa dan layak dipush sebagai panduan deployment setelah review akhir. `PROJECT_DOCUMENTATION_FOR_INTERNSHIP.md` dan `docs/` harus diperlakukan sebagai **review required** karena memuat konteks identitas/atribusi dan informasi internal proyek.

### 5. Perbaiki whitespace sebelum commit source

`git diff --check` menemukan trailing whitespace pada `apps/web/src/routes/admin/sale/index.tsx`. Perubahan source saat ini layak dipush hanya setelah lint, typecheck, test, dan pemeriksaan diff berhasil.

## Kebijakan dataset GeoJSON

`apps/web/public/data/` berisi 515 file tracked dengan ukuran working tree sekitar **542 MB**. File terbesar sekitar **22,19 MB**. Data tersebut dipakai langsung oleh aplikasi melalui request ke `/data/indonesia-boundary.geojson` dan `/data/regencies/{code}.geojson`, sehingga tidak boleh sekadar dihapus tanpa mengganti cara distribusinya.

Keputusan yang disarankan:

- Untuk sementara, push hanya bila data tersebut merupakan dependency runtime resmi dan lisensinya mengizinkan redistribusi.
- Tambahkan dokumentasi sumber data, versi/tanggal, lisensi, checksum, dan proses pembaruan.
- Jangan commit ulang seluruh dataset untuk perubahan kecil atau hasil formatting.
- Untuk jangka panjang, pindahkan data ke object storage/CDN atau Git LFS dan sediakan script download/build yang reproducible.
- Jika memakai storage eksternal, simpan manifest dan script pengambilan data di Git, bukan credential storage.

GitHub menolak file individual di atas batas platform tertentu, tetapi masalah utama repo ini adalah ukuran clone dan histori, bukan hanya ukuran satu file. Pemindahan file yang sudah ada di histori memerlukan rencana migrasi tersendiri; jangan rewrite history tanpa koordinasi tim.

## Konfigurasi editor dan dokumentasi tool

| Path | Keputusan |
| --- | --- |
| `.vscode/settings.json` | Push jika merupakan standar format tim; saat ini berisi konfigurasi Biome yang relevan. |
| `.vscode/extensions.json` | Push jika berisi rekomendasi extension tim. |
| `.zed/settings.json` | Push jika tim memakai Zed; selain itu boleh tidak dilacak untuk mengurangi noise. |
| `.serena/project.yml` | Push hanya jika Serena merupakan tool resmi tim; cache-nya tetap jangan dipush. |
| `.kiro/steering/` dan spesifikasi | Push jika menjadi dokumentasi requirement/desain resmi. |
| Screenshot besar di `.kiro/specs/` | Push bersyarat; optimalkan gambar atau pindahkan ke dokumentasi/release asset. |
| `.qwen/commands/` dan instruksi AI | Push hanya jika workflow tersebut sengaja dibagikan. |
| `MAINTENANCE/` | Review required; pertahankan hanya referensi yang masih berguna dan beri penjelasan asal/tujuannya. |

## Tambahan `.gitignore` yang disarankan

Aturan saat ini sudah melindungi sebagian besar artefak. Pertimbangkan menambahkan pola berikut:

```gitignore
# Private keys and certificates
*.key
*.p12
*.pfx
*.crt
*.cer

# Local database and backups
*.db
*.sqlite
*.sqlite3
*.bak
*.tmp

# Personal AI-tool state
.claude/settings.local.json
.serena/cache/

# Duplicate local documentation staging area
henokhdoc/
```

Jangan menambahkan `apps/web/public/data/` ke `.gitignore` sebelum mekanisme distribusi penggantinya tersedia.

## Checklist wajib sebelum commit dan push

1. Periksa status lengkap:

   ```bash
   git status --short --untracked-files=all
   ```

2. Pastikan file ignored benar-benar ignored:

   ```bash
   git check-ignore -v apps/web/.env apps/web/.env.local apps/web/.env.production
   ```

3. Cari file sensitif berdasarkan nama dan periksa hasilnya tanpa menyalin nilainya ke issue/chat:

   ```bash
   git ls-files | grep -Ei '(^|/)(\.env($|\.)|.*\.(pem|key|p12|pfx|db|sqlite|log))$'
   ```

4. Review diff dan whitespace:

   ```bash
   git diff --check
   git diff --stat
   git diff
   ```

5. Jalankan validasi proyek dari root:

   ```bash
   bun run check-types
   bun run check
   bun run build
   ```

6. Jalankan test aplikasi:

   ```bash
   cd apps/web
   bun run test
   ```

7. Stage file secara eksplisit. Hindari `git add .` ketika working tree berisi dokumentasi, data, atau file lokal campuran:

   ```bash
   git add path/to/file1 path/to/file2
   git diff --cached --check
   git diff --cached --stat
   git diff --cached
   ```

8. Pastikan commit hanya mempunyai satu tujuan: source feature/fix, migration, dataset, dokumentasi, atau housekeeping. Jangan mencampur semuanya dalam satu commit.

## Matriks keputusan cepat

| Jika file... | Tindakan |
| --- | --- |
| Dibutuhkan untuk build, test, atau runtime dan tidak generated/local | Push |
| Menjelaskan arsitektur, setup, keputusan, atau API tanpa data sensitif | Push |
| Merupakan migration yang sesuai perubahan schema | Push |
| Mengunci dependency (`bun.lock`) | Push |
| Berisi secret, token, password, connection string nyata, atau data user | Jangan push; rotasi bila pernah bocor |
| Dapat dibuat ulang oleh install/build/test | Jangan push |
| Berisi cache, log, PID, state IDE/tool, atau absolute path pengguna | Jangan push |
| Duplikat dari file kanonis | Jangan push |
| Dataset besar yang dipakai runtime | Push bersyarat atau pindahkan ke storage/LFS |
| Belum jelas lisensi, kepemilikan, atau izin publikasinya | Tahan dan verifikasi |

## Status working tree saat audit

- Terdapat 12 file source yang dimodifikasi pada modul product dosage, sale, stall, dan map. File-file ini termasuk kategori **layak dipush setelah review dan validasi**, bukan otomatis siap commit.
- `NETLIFY.md`, `PROJECT_DOCUMENTATION_FOR_INTERNSHIP.md`, empat file dalam `docs/`, dan seluruh `henokhdoc/` masih untracked.
- `henokhdoc/` tidak perlu dipush karena duplikat.
- File source yang sudah dimodifikasi adalah pekerjaan pengguna dan harus dipertahankan; jangan menghapus atau menimpa perubahan tersebut saat melakukan housekeeping repository.

Dokumen ini harus diperbarui bila struktur aplikasi, strategi penyimpanan GeoJSON, sistem deployment, atau kebijakan generated file berubah.
