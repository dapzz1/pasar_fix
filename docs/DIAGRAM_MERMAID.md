# DIAGRAM MERMAID — SISTEM INFORMASI MANAJEMEN PRODUK BARU

Dokumen ini berisi 15 diagram dalam format Mermaid yang siap dirender. Setiap diagram memiliki nomor gambar sesuai urutan kemunculan di laporan.

---

## Gambar 3.1 — Diagram Arsitektur Sistem

```mermaid
flowchart TB
    subgraph Browser["Browser"]
        React["React 19 + TanStack Router"]
        Query["TanStack Query"]
        Leaflet["Leaflet / React Leaflet"]
    end

    subgraph Server["TanStack Start Server (apps/web)"]
        Routes["Server Routes (/api/rpc, /api, /api/auth)"]
        subgraph ORPC["oRPC Layer"]
            Pub["publicProcedure"]
            Prot["protectedProcedure"]
        end
        Auth["Better Auth\n(session, cookie)"]
        Zod["Validasi Zod"]
    end

    subgraph DB["Database Layer"]
        Drizzle["Drizzle ORM"]
        PG[("PostgreSQL")]
    end

    subgraph Static["Static Assets"]
        GeoJSON[("GeoJSON\npublic/data/")]
    end

    React --> Query
    Query --> Routes
    Routes --> ORPC
    Routes --> Auth
    ORPC --> Zod
    Zod --> Drizzle
    Drizzle --> PG
    Auth --> Drizzle
    Leaflet --> GeoJSON

    style React fill:#e1f5fe
    style Leaflet fill:#e1f5fe
    style Pub fill:#c8e6c9
    style Prot fill:#ffccbc
    style Auth fill:#fff9c4
    style Drizzle fill:#d1c4e9
    style PG fill:#b3e5fc
    style GeoJSON fill:#f0f4c3
```

**Sumber:** Source code `lib/orpc/`, `lib/auth/`, `lib/tanstack-query/`, `routes/api/`

---

## Gambar 3.2 — Diagram Struktur Project

```mermaid
mindmap
  root((pasar_fix))
    apps
      web
        src
          lib
            auth
            db
              schema
              migrations
            lingui
            orpc
            tanstack-query
          routes
            api
            auth
            admin
              stall
                -app
                -domain
                -components
            map
          components
            ui
          styles
          hooks
        public
          data
    data
    scripts
    docs
```

**Sumber:** Struktur folder repository dan `arch.md`

---

## Gambar 3.3 — Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    user ||--o{ session : "memiliki"
    user ||--o{ account : "memiliki"
    provinces ||--o{ regencies : "memiliki"
    provinces ||--o{ province_lands : "memiliki"
    provinces ||--o{ province_commodities : "memiliki"
    provinces ||--o{ province_potentials : "memiliki"
    provinces ||--o{ stalls : "memiliki"
    regencies ||--o{ regency_lands : "memiliki"
    regencies ||--o{ regency_commodities : "memiliki"
    regencies ||--o{ regency_potentials : "memiliki"
    regencies ||--o{ stalls : "memiliki"
    land_types ||--o{ province_lands : "memiliki"
    land_types ||--o{ regency_lands : "memiliki"
    land_types ||--o{ commodity_types : "memiliki"
    commodity_types ||--o{ province_commodities : "memiliki"
    commodity_types ||--o{ regency_commodities : "memiliki"
    commodity_types ||--o{ product_dosages : "memiliki"
    product_types ||--o{ product_brands : "memiliki"
    product_brands ||--o{ product_dosages : "memiliki"
    product_brands ||--o{ province_potentials : "memiliki"
    product_brands ||--o{ regency_potentials : "memiliki"
    product_brands ||--o{ sales_realizations : "memiliki"
    product_brands ||--o{ daily_sales : "memiliki"
    product_brands ||--o{ stall_product_brands : "memiliki"
    stalls ||--o{ stall_product_brands : "memiliki"

    user {
        string id PK
        string name
        string email
        string role "admin|viewer|guest"
    }
    session {
        string id PK
        string user_id FK
        string token
        datetime expires
    }
    account {
        string id PK
        string user_id FK
        string provider
    }
    provinces {
        string id PK
        string code
        string name
        float area
        int year
    }
    regencies {
        string id PK
        string province_id FK
        string code
        string name
        float area
        int year
    }
    land_types {
        string id PK
        string name
        int year
    }
    province_lands {
        string id PK
        string province_id FK
        string land_type_id FK
        float area
        int year
    }
    commodity_types {
        string id PK
        string land_type_id FK
        string name
        int year
    }
    product_brands {
        string id PK
        string product_type_id FK
        string name
        string industry
    }
    stalls {
        string id PK
        string province_id FK
        string regency_id FK
        string name
        float latitude
        float longitude
    }
    daily_sales {
        string id PK
        string product_brand_id FK
        string province_id "belum FK"
        int quantity
        float revenue
    }
    sales_realizations {
        string id PK
        string product_brand_id FK
        date report_date
        float realization_ytd "schema"
        float realizaton_ytd "migration typo"
    }
    stall_product_brands {
        string id PK
        string stall_id FK
        string product_brand_id FK
    }
```

**Sumber:** Schema Drizzle (`auth.ts`, `map-product.ts`, `sale.ts`, `stall.ts`)

---

## Gambar 3.4 — Diagram Login Flow

```mermaid
sequenceDiagram
    actor User as Pengguna
    participant Browser as Browser
    participant BA as Better Auth Server
    participant PG as PostgreSQL

    User->>Browser: Input email + password
    Browser->>BA: POST /api/auth/sign-in
    BA->>PG: Query user + account
    PG-->>BA: Data user + password hash
    BA->>BA: Verifikasi password
    alt Password valid
        BA->>PG: Insert session
        PG-->>BA: Session token
        BA->>Browser: Set cookie + 302 redirect
        Browser->>User: Tampilkan halaman tujuan
    else Password tidak valid
        BA->>Browser: Response error 401
        Browser->>User: Tampilkan pesan error
    end
```

**Sumber:** Konfigurasi Better Auth `lib/auth/index.ts`

---

## Gambar 3.5 — Diagram Authentication & Authorization

```mermaid
flowchart TD
    Start["Request ke /admin"] --> CheckSession{Ada session?}
    CheckSession -->|Tidak| RedirectLogin["Redirect ke /auth/login"]
    CheckSession -->|Ya| CheckRole{Role = admin?}
    CheckRole -->|Tidak| Denied["Tampilkan: Access Denied"]
    CheckRole -->|Ya| Admin["Akses panel admin"]

    Start2["Request ke API protected"] --> CheckSession2{Ada session?}
    CheckSession2 -->|Tidak| Err401["Error 401 Unauthorized"]
    CheckSession2 -->|Ya| Process["Proses request\n(tanpa cek role)"]
    Process --> Gap["Gap: role tidak divalidasi\npada API layer"]

    style Gap fill:#ffccbc,stroke:#e53935
    style Denied fill:#ffccbc
    style Err401 fill:#ffccbc
```

**Sumber:** `routes/admin/route.tsx`, `lib/orpc/index.ts` (protectedProcedure)

---

## Gambar 3.6 — Diagram API Flow (Query & Mutation)

```mermaid
sequenceDiagram
    participant Comp as Komponen React
    participant TQ as TanStack Query
    participant ORPC as oRPC Client
    participant Handler as Procedure Handler
    participant DB as PostgreSQL

    Note over Comp,DB: QUERY FLOW
    Comp->>TQ: useQuery(opts)
    TQ->>TQ: Cek cache
    alt Cache hit
        TQ-->>Comp: Data dari cache
    else Cache miss
        TQ->>ORPC: Request /api/rpc/$
        ORPC->>Handler: Panggil handler
        Handler->>DB: db.select()...
        DB-->>Handler: Result
        Handler-->>TQ: Response data
        TQ->>TQ: Simpan cache
        TQ-->>Comp: Render data
    end

    Note over Comp,DB: MUTATION FLOW
    Comp->>TQ: useMutation(opts)
    TQ->>ORPC: Request /api/rpc/$
    ORPC->>ORPC: Validasi Zod
    ORPC->>Handler: Panggil handler
    Handler->>DB: db.insert() / update() / delete()
    DB-->>Handler: Result
    Handler-->>TQ: Response
    TQ->>TQ: invalidateQueries()
    TQ-->>Comp: Refetch + Toast
```

**Sumber:** `lib/orpc/client.ts`, `lib/tanstack-query/`, pola route handler `routes/admin/*/-app/`

---

## Gambar 3.7 — Diagram Modul Province & Regency

```mermaid
flowchart TD
    subgraph Admin["Admin Panel"]
        Menu["Menu Wilayah"]
    end

    subgraph Province["Province CRUD"]
        PList["Daftar Province\n(search, pagination)"]
        PCreate["Create Province\n(kode, nama, luas, tahun)"]
        PEdit["Edit Province"]
        PDelete["Delete Province\n(konfirmasi)"]
    end

    subgraph Regency["Regency CRUD"]
        RList["Daftar Regency\n(search, pagination)"]
        RCreate["Create Regency\n(kode, nama, provinsi, luas, tahun)"]
        REdit["Edit Regency"]
        RDelete["Delete Regency"]
    end

    subgraph DB["Database"]
        TProv[("provinces")]
        TReg[("regencies")]
    end

    Menu --> PList
    PList --> PCreate
    PList --> PEdit
    PList --> PDelete
    PCreate --> TProv
    PEdit --> TProv
    PDelete --> TProv

    Menu --> RList
    RList --> RCreate
    RList --> REdit
    RList --> RDelete
    RCreate --> TReg
    REdit --> TReg
    RDelete --> TReg

    TProv -->|1:N| TReg
```

**Sumber:** Endpoint `admin.region.province.*`, `admin.region.regency.*`

---

## Gambar 3.8 — Diagram Modul Commodity

```mermaid
flowchart TD
    subgraph Master["Master Data"]
        LT[("land_types")]
        CT[("commodity_types\nCRUD penuh")]
    end

    subgraph Province["Tingkat Provinsi"]
        PC[("province_commodities\nREAD ONLY")]
        PC_View["Lihat + Filter\n(search, pagination)"]
        PC_Disabled["Create/Edit/Delete\nTIDAK AKTIF"]
    end

    subgraph Regency["Tingkat Kabupaten"]
        RC[("regency_commodities\nCRUD penuh")]
        RC_CRUD["Create / Read / Update / Delete"]
    end

    LT --> CT
    CT --> PC
    CT --> RC
    PC --> PC_View
    PC --> PC_Disabled
    RC --> RC_CRUD

    style PC_Disabled fill:#ffccbc,stroke:#e53935
    style PC_View fill:#fff9c4
```

**Sumber:** Endpoint `admin.commodity.*`

---

## Gambar 3.9 — Diagram Product Brand Flow

```mermaid
flowchart TD
    subgraph Master["Master Data"]
        PT[("product_types")]
        PB[("product_brands\nCRUD penuh")]
    end

    subgraph CRUD["Alur CRUD"]
        List["Daftar Brand\n(search, filter by type)"]
        Create["Tambah Brand\n(nama, industri, deskripsi,\npilih Product Type)"]
        Edit["Edit Brand"]
        Delete["Hapus Brand"]
    end

    subgraph Dependen["Modul Dependen"]
        Dosage["product_dosages"]
        Potential["province_potentials\nregency_potentials"]
        Sales["sales_realizations\ndaily_sales"]
        Stall["stall_product_brands"]
    end

    PT --> PB
    PB --> List
    List --> Create
    List --> Edit
    List --> Delete

    PB -.-> Dosage
    PB -.-> Potential
    PB -.-> Sales
    PB -.-> Stall

    style Dependen fill:#e8eaf6
```

**Sumber:** Endpoint `admin.product.product_brand.*`

---

## Gambar 3.10 — Diagram Product Dosage Flow

```mermaid
flowchart TD
    subgraph Hierarchy["Hierarki Data"]
        PT["Product Type"]
        PB["Product Brand"]
        CT["Commodity Type"]
    end

    subgraph CRUD["CRUD Product Dosage"]
        List["Daftar Dosage\n(per brand)"]
        Create["Tambah Dosage\n(pilih komoditas,\ninput dosis, unit, tahun)"]
        Edit["Edit Dosage"]
        Delete["Hapus Dosage"]
    end

    subgraph DB[("Database")]
        TBL[("product_dosages\ncommodity_type_id FK\nproduct_brand_id FK\ndosage, unit, year")]
    end

    PT --> PB
    PB --> List
    CT --> List
    List --> Create
    List --> Edit
    List --> Delete
    Create --> TBL
    Edit --> TBL
    Delete --> TBL

    style Hierarchy fill:#e1f5fe
```

**Sumber:** Endpoint `admin.product.product_dosage.*`

---

## Gambar 3.11 — Diagram Province Potential Flow

```mermaid
flowchart TD
    Start["Admin buka menu\nProvince Potential"]
    Table["Tampilkan tabel:\nprovinsi, brand, nilai potensi,\ndeskripsi, tahun"]
    Filter["Filter:\n- Provinsi\n- Product Brand\n- Tahun"]
    View["Lihat detail"]
    Disabled["CREATE / UPDATE / DELETE\nTIDAK TERSEDIA"]

    Start --> Table
    Table --> Filter
    Filter --> View
    Table --> Disabled

    subgraph Note["Status Modul"]
        N["READ-ONLY\nHanya penyajian data\nEndpoint mutation belum aktif"]
    end

    Disabled --> Note

    style Disabled fill:#ffccbc,stroke:#e53935
    style Note fill:#fff9c4
```

**Sumber:** Endpoint `admin.potential.province_potential.get` (read-only)

---

## Gambar 3.12 — Diagram Sales Realization Flow

```mermaid
flowchart TD
    Start["Admin buka menu\nSales Realization"]
    Filter["Filter:\n- Brand\n- Periode tanggal"]
    Table["Tabel realisasi:\nbrand, tgl laporan, realisasi harian,\nrealisasi bulanan, YTD, RKAP"]
    Pagination["Pagination\n(10/25/50/100)"]

    subgraph CRUD["CRUD Operations"]
        Create["Tambah\n(pilih brand, isi realisasi\n& RKAP)"]
        Edit["Edit"]
        Delete["Hapus"]
    end

    subgraph DB[("Database")]
        TBL[("sales_realizations\nproduct_brand_id FK")]
        Note["Catatan:\nSchema: realization_ytd\nMigration: realizaton_ytd\n[PERLU VERIFIKASI]"]
    end

    Start --> Filter --> Table
    Table --> Pagination
    Table --> Create --> TBL
    Table --> Edit --> TBL
    Table --> Delete --> TBL
    TBL -.-> Note

    style Note fill:#ffccbc,stroke:#e53935
```

**Sumber:** Endpoint `admin.sale.sales_realization.*`

---

## Gambar 3.13 — Diagram Daily Sales Flow

```mermaid
flowchart TD
    Start["Admin buka menu\nDaily Sales"]
    Filter["Filter:\n- Brand\n- Periode tanggal"]
    Table["Tabel penjualan harian:\ntanggal, brand, provinsi,\nqty, revenue, target, realisasi"]
    Pagination["Pagination"]

    subgraph CRUD["CRUD Operations"]
        Create["Tambah\n(pilih brand, provinsi,\ninput qty, revenue, target)"]
        Edit["Edit"]
        Delete["Hapus"]
    end

    subgraph DB[("Database")]
        TBL[("daily_sales\nproduct_brand_id FK\nprovince_id [belum FK]")]
    end

    Start --> Filter --> Table
    Table --> Pagination
    Table --> Create --> TBL
    Table --> Edit --> TBL
    Table --> Delete --> TBL
```

**Sumber:** Endpoint `admin.sale.daily_sales.*`

---

## Gambar 3.14 — Diagram Stall Management Flow

```mermaid
flowchart TD
    Start["Admin buka menu Stall"]

    subgraph CRUD["CRUD DATA KIOS"]
        List["Daftar Stall\n(search, pagination)"]
        Create["Tambah Stall\n(nama, alamat, provinsi,\nkabupaten, lat/lng,\npemilik, noTelp, kriteria)"]
        Edit["Edit Stall"]
        Delete["Hapus Stall\n(konfirmasi)"]
    end

    subgraph Assign["ASSIGNMENT PRODUCT BRAND"]
        Open["Klik 'Products'\npada baris stall"]
        Modal["Modal:\nDaftar semua brand\n+ checkbox"]
        Sync["Simpan → sync\nstall_product_brands"]
        Toast["Toast sukses\n+ refetch"]
    end

    subgraph Import["IMPORT EXCEL"]
        Excel[("File Excel\nSURVEY PASAR KIOS")]
        Script["Script\nseed-stalls.ts"]
        Process["Resolve region\nParse koordinat\nTransaksi insert"]
    end

    subgraph DB[("Database")]
        TStalls[("stalls")]
        TSPB[("stall_product_brands")]
    end

    Start --> CRUD
    List --> Open
    Open --> Modal --> Sync --> Toast
    Sync --> TSPB
    Create --> TStalls
    Edit --> TStalls
    Delete --> TStalls

    Excel --> Script --> Process --> TStalls

    style Assign fill:#e8eaf6
    style Import fill:#e1f5fe
```

**Sumber:** Endpoint `admin.stall.*`, commit `7a38bb7`, `scripts/seed-stalls.ts`

---

## Gambar 3.15 — Diagram Hubungan Survei Lapangan dengan Sistem

```mermaid
flowchart TD
    subgraph Lapangan["KEGIATAN LAPANGAN"]
        Kunjungan["Kunjungan ke:\nBojonegoro, Banyuwangi,\nJember, Lumajang"]
        Observasi["Observasi:\n- Kondisi kios\n- Komoditas unggulan\n- Kebutuhan pupuk"]
        Catat["Pencatatan data\nke formulir / Excel"]
    end

    subgraph Teknis["ALUR DATA KE SISTEM"]
        Excel[("File Excel\nSURVEY PASAR KIOS\n(Jawaban).xlsx")]
        Script["Script\nseed-stalls.ts"]
        Normalisasi["Normalisasi\nnama provinsi & kabupaten"]
        Resolve["Resolve ke ID\ndari tabel provinces & regencies"]
        Parse["Parse koordinat\n(latitude, longitude)"]
        Insert["Transaksi insert\nke tabel stalls"]
        Verifikasi["Verifikasi\njumlah row"]
    end

    subgraph Sistem["PENGGUNAAN DI SISTEM"]
        Stall["Modul Stall\n(CRUD data kios)"]
        Map["Visualisasi Peta\n(marker kios)"]
    end

    Kunjungan --> Observasi --> Catat --> Excel
    Excel --> Script --> Normalisasi --> Resolve --> Parse --> Insert --> Verifikasi
    Verifikasi --> Stall
    Verifikasi --> Map

    style Lapangan fill:#e8f5e9
    style Teknis fill:#e1f5fe
    style Sistem fill:#fff3e0
```

**Sumber:** `data/SURVEY PASAR KIOS (Jawaban).xlsx`, `scripts/seed-stalls.ts`, kegiatan survei lapangan
