# Backend Documentation

## Overview

The application backend is implemented inside `apps/web` using:

- TanStack Start for the server runtime and API routes
- oRPC for typed server procedures
- Drizzle ORM for PostgreSQL access
- Better Auth for authentication and email/password accounts
- PostgreSQL/Supabase as the configured database

The main oRPC router is located at:

`apps/web/src/lib/orpc/router/index.ts`

Database access is configured in:

`apps/web/src/lib/db/index.ts`

## Environment

Required server variables are defined in `apps/web/.env`:

```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

Do not commit real credentials into source control.

## Database Entities

### Authentication

- `user`
- `session`
- `account`
- `verification`

These tables are managed primarily by Better Auth. User roles are stored in
`user.role` with supported values `admin`, `viewer`, and `guest`.

### Regions and Mapping

- `provinces`
- `regencies`
- `land_types`
- `province_lands`
- `regency_lands`
- `commodity_types`
- `province_commodities`
- `regency_commodities`

### Products and Potential

- `product_types`
- `product_brands`
- `product_dosages`
- `province_potentials`
- `regency_potentials`

### Stalls

- `stalls`
- `stall_product_brands`

`stall_product_brands` is a many-to-many relation managed from the **Products**
button on each stall in the admin panel.

### Sales

- `sales_realizations`
- `daily_sales`

## API Structure

All admin procedures require an authenticated session.

### Public/System

| Procedure | Purpose |
| --- | --- |
| `healthCheck` | Returns `OK` for application monitoring |
| `auth.getSession` | Returns the current Better Auth session |
| `map.getProvinces` | Public province reference data |

### Map

| Procedure | Purpose |
| --- | --- |
| `map.getStalls` | Returns every stall with valid coordinates for map markers |
| `map.getProvinces` | Returns province IDs, names, codes, and areas |

The map-specific stall endpoint does not paginate because marker rendering needs
the complete coordinate set. It accepts optional `provinceId` and `regencyId`
filters.

The marketing map supports three province-level thematic layers:

- Product potential, filtered by product brand and year
- Province land area, filtered by land type and year
- Province commodity area, filtered by commodity type and year

The year selector is derived from the selected dataset. Legacy land and
commodity rows currently have a null year, so those layers expose an
`All Years` option rather than filtering the rows out.

### Admin Dashboard

| Procedure | Purpose |
| --- | --- |
| `admin.dashboard.getSummary` | Aggregated entity counts and potential summary |

### Regions

- `admin.region.province.get/create/update/delete`
- `admin.region.regency.get/create/update/delete`

### Land

- `admin.land.land_type.get/create/update/delete`
- `admin.land.province_land.get/create/update/delete`
- `admin.land.regency_land.get/create/update/delete`

### Commodities

- `admin.commodity.commodity_type.get/create/update/delete`
- `admin.commodity.province_commodity.get/create/update/delete`
- `admin.commodity.regency_commodity.get/create/update/delete`

### Products

- `admin.product.product_type.get/create/update/delete`
- `admin.product.product_brand.get/create/update/delete`
- `admin.product.product_dosage.get/create/update/delete`

### Potential

- `admin.potential.province_potential.get/create/update/delete`
- `admin.potential.regency_potential.get/create/update/delete`

### Sales

- `admin.sale.sale_overview.get`
- `admin.sale.sales_realization.get/create/update/delete`
- `admin.sale.daily_sales.get/create/update/delete`

`sale_overview.get` returns aggregate realization, RKAP, quantity, revenue, and
target values for non-admin reporting pages.

### Stalls

- `admin.stall.get/create/update/delete`
- `admin.stall.getStallProduct`
- `admin.stall.stall_product_brand.get`
- `admin.stall.stall_product_brand.get_product_brands`
- `admin.stall.stall_product_brand.assign`

The assignment procedure synchronizes the selected product brands by inserting
new relations and deleting unchecked relations.

### Users

- `admin.user.get`
- `admin.user.getById`
- `admin.user.create`
- `admin.user.update`
- `admin.user.delete`

User creation uses Better Auth's email signup API so the password is hashed and
the corresponding credential account is created correctly. The selected role is
then stored on the created user.

## Frontend Integration

The following previously incomplete features are connected:

- Regency Land full CRUD
- Province Commodity full CRUD
- Admin user creation
- Product Knowledge reporting page
- Product Potential reporting page
- Sales Realization reporting page
- Public province lookup for map boundaries
- Dedicated complete stall marker feed
- Sales overview aggregation
- Health status display on the admin dashboard

## Stall Excel Import

The import script is:

`scripts/seed-stalls.ts`

Dry run:

```bash
bun run scripts/seed-stalls.ts
```

Execute:

```bash
bun run scripts/seed-stalls.ts --execute
```

The script:

- Reads `data/SURVEY PASAR KIOS (Jawaban).xlsx`
- Uses the `Cleaning tipis` worksheet
- Resolves province and regency IDs by normalized names
- Parses coordinates when valid
- Inserts all rows in a transaction
- Verifies the resulting `stalls` count

The import is not idempotent. Running `--execute` again inserts duplicate stalls.

## Database Commands

Run from the repository root:

```bash
bun run db:generate
bun run db:migrate
bun run db:push
bun run db:studio
```

Workspace-specific commands can also be run from `apps/web`.

## Validation

Recommended checks:

```bash
bunx biome check apps/web/src
bun run --cwd apps/web check-types
bun run --cwd apps/web build
```

The repository currently contains some pre-existing TypeScript and lint issues
outside the backend integrations documented here. New backend work should still
pass targeted Biome and TypeScript checks before being merged.

## Operational Notes

- Deleting referenced master data may fail due to foreign-key constraints.
- Stall marker rendering requires both latitude and longitude.
- Authentication tables should not be edited manually except for controlled
  administrative recovery.
- Production changes require deployment; local file changes do not update the
  deployed Netlify application automatically.
