# Project Architecture Analysis

## 1. Architecture Summary

This project is currently structured as a single `apps/web` TanStack Start application. Although the Better-T-Stack notes mention a possible `apps/server` folder, the active implementation places the frontend, server routes, ORPC procedures, Drizzle schema, authentication, and feature modules inside `apps/web`.

The dominant architecture is route-colocated feature architecture:

```txt
apps/web/src
  components/ui/
  hooks/
  lib/
    auth/
    db/
    lingui/
    orpc/
    tanstack-query/
  routes/
    __root.tsx
    api/
    auth/
    admin/
    map/
    todos/
```

The route modules use TanStack Router file routing and colocated private folders prefixed with `-`, for example:

```txt
routes/admin/stall/
  index.tsx
routes/admin/stall/-app/
  get-stalls.ts
  create-stall.ts
  update-stall.ts
routes/admin/stall/-components/
  create-stall-form.tsx
  create-stall-modal.tsx
  edit-stall-form.tsx
routes/admin/stall/-domain/
  schema.ts
routes/admin/stall/-hooks/
  form.ts
```

This is a good foundation for feature-based development because each business capability can keep its route, UI, validation, hooks, and server operations close together.

## 2. Folder Structure Hierarchy

```txt
apps/web
  public/
    data/
      indonesia-boundary.geojson
      regencies/*.geojson
  src/
    client.tsx
    server.ts
    router.tsx
    routeTree.gen.ts
    styles/
      globals.css
    components/
      header.tsx
      language-switcher.tsx
      ui/
    hooks/
    lib/
      auth/
      db/
      lingui/
      orpc/
      tanstack-query/
      utils/
    routes/
      __root.tsx
      index.tsx
      dashboard.tsx
      api/
      auth/
      admin/
      map/
      stall/
      todos/
```

### Root Project

- `package.json`: root workspace commands.
- `bun.lock`: Bun dependency lockfile.
- `biome.json`: formatter and linter configuration.
- `turbo.json`: Turborepo task pipeline.
- `AGENTS.md`: project rules and coding standards.
- `bts.jsonc`: Better-T-Stack metadata.

### `apps/web`

The main application package. It contains the TanStack Start app, API routes, DB schema, auth integration, ORPC router, UI components, and feature routes.

### `apps/web/public/data`

Static GeoJSON assets for map rendering. These are infrastructure/static-data assets and should stay outside feature logic unless converted into database-backed administrative data.

### `apps/web/src/components/ui`

Shared UI primitives, mostly shadcn/Radix-style components:

- `button.tsx`
- `dialog.tsx`
- `form.tsx`
- `input.tsx`
- `select.tsx`
- `sidebar.tsx`
- `textarea.tsx`

These should remain domain-agnostic. They should not import ORPC, route modules, database code, or business schemas.

### `apps/web/src/hooks`

Shared generic hooks:

- `use-mobile.ts`
- `use-toast.ts`
- `use-debounce.ts`

These should be reusable across multiple routes and should not contain domain-specific logic.

### `apps/web/src/lib`

Infrastructure and framework integration:

- `auth/`: Better Auth setup and auth client.
- `db/`: Drizzle client, schema, and migrations.
- `lingui/`: i18n runtime and middleware.
- `orpc/`: ORPC client, context, procedure setup, and router composition.
- `tanstack-query/`: QueryClient provider and integration.
- `utils/`: generic utility functions.

### `apps/web/src/routes`

TanStack Router route tree plus route-colocated feature modules.

Route files such as `index.tsx`, `route.tsx`, `$id.tsx`, and `__root.tsx` are public router entry points. Folders prefixed with `-` are private route support modules and are not route paths.

## 3. Major Folder Purposes

### `routes/__root.tsx`

Application shell. It:

- Defines root router context.
- Loads session data through ORPC.
- Sets `<html lang={i18n.locale}>`.
- Renders global header for non-admin routes.
- Renders `Outlet`, `Toaster`, and scripts.

This file acts as presentation infrastructure and app composition.

### `routes/api`

Server routes:

- `rpc.$.ts`: ORPC endpoint handler.
- `auth.$.ts`: Better Auth route integration.
- `$.ts`: catch-all API route.

This folder is infrastructure.

### `routes/admin`

Protected admin area. It includes:

- `route.tsx`: admin route guard and layout wrapper.
- `-components`: admin shell UI.
- `-domain`: navigation metadata.
- `-hooks`: admin form context.
- `-libs`: admin state/options.
- nested business modules: region, land, commodity, product, sale, stall, user.

### `routes/admin/*/-app`

Application layer. These files define ORPC procedures and currently also contain Drizzle query logic.

Examples:

- `get-provinces.ts`
- `create-commodity-type.ts`
- `get-stalls.ts`
- `update-stall.ts`

### `routes/admin/*/-domain`

Domain validation and schema layer. These files usually export Zod schemas for procedure input and form validation.

Examples:

- `ProvinceSchema`
- `CommodityTypeSchema`
- `StallSchema`

### `routes/admin/*/-components`

Presentation layer for route-owned UI:

- create/edit/delete forms
- modals
- tables
- page fragments

### `lib/db/schema`

Database schema layer. Current files:

- `auth.ts`
- `todo.ts`
- `map-product.ts`
- `stall.ts`
- `sale.ts`
- `utils.ts`
- `index.ts`

The schema is currently grouped by broad areas. Some files are too large for long-term maintainability, especially `map-product.ts`.

## 4. Recommended File Placement Conventions

Use this rule:

```txt
Shared and generic -> src/components, src/hooks, src/lib
Route-owned feature code -> src/routes/<route>/-*
Server/API procedure -> -app
Business validation/type contracts -> -domain
UI implementation -> -components
Feature hooks -> -hooks
Feature local utilities/state -> -libs
```

Recommended module layout:

```txt
routes/admin/<module>/
  index.tsx
  -app/
    get-<entities>.ts
    get-<entity>.ts
    create-<entity>.ts
    update-<entity>.ts
    delete-<entity>.ts
  -domain/
    schema.ts
    types.ts
    constants.ts
  -components/
    <module>-page.tsx
    <module>-table.tsx
    <module>-toolbar.tsx
    <entity>-form.tsx
    create-<entity>-dialog.tsx
    edit-<entity>-dialog.tsx
    delete-<entity>-dialog.tsx
  -hooks/
    use-<entities>.ts
    use-<entity>-mutations.ts
    use-<entity>-form.ts
```

Route files should be thin. They should handle route concerns, search params, and composition, while the actual page UI lives in `-components`.

## 5. Existing Architecture Patterns

### Route-Colocated Feature Modules

The strongest existing pattern is colocating feature support folders near the route:

```txt
-app
-components
-domain
-hooks
-locales
-libs
```

This is a productive structure because developers can work on one feature without jumping across unrelated global folders.

### ORPC as Unified API Boundary

All major server operations are exposed through `lib/orpc/router/index.ts`.

Client usage:

```ts
useQuery(orpc.admin.region.province.get.queryOptions({ input: {} }));
```

Mutation usage:

```ts
useMutation(orpc.admin.stall.create.mutationOptions({ ... }));
```

This gives strong end-to-end type inference when procedure input/output is well typed.

### Drizzle as Infrastructure Layer

Feature procedures directly use `context.db` and Drizzle table definitions:

```ts
context.db.select(...).from(stalls)
```

This is simple and readable, but it mixes application and persistence concerns.

### Admin Layout Composition

`routes/admin/route.tsx` protects admin routes and renders `AdminLayout`. The layout uses shared sidebar primitives and navigation metadata from `admin/-domain`.

### Mixed Form Architecture

The project currently uses both:

- TanStack Form in many admin modules.
- React Hook Form with Zod in the Stall module.

This should be standardized.

## 6. Layer Classification

### Domain Layer

Files that define business concepts, validation, and domain metadata:

```txt
routes/admin/*/-domain/schema.ts
routes/todos/-domain/*
routes/admin/-domain/navigation.ts
routes/admin/-domain/navigation-items.ts
routes/map/-domain/marketing.ts
```

Current limitation: most domain folders only contain validation schemas. They do not yet model domain types, status constants, business rules, or query DTOs.

### Application Layer

Files that execute use cases:

```txt
routes/**/-app/*.ts
```

Examples:

- `create-stall.ts`
- `update-stall.ts`
- `get-stalls.ts`
- `create-province.ts`
- `get-regencies.ts`

Current limitation: these files also contain direct Drizzle persistence logic.

### Presentation Layer

Files that render UI:

```txt
routes/**/index.tsx
routes/**/$id.tsx
routes/**/-components/*.tsx
components/ui/*.tsx
components/header.tsx
components/language-switcher.tsx
```

The distinction:

- `components/ui` should stay generic.
- `routes/**/-components` can be feature-specific.

### Infrastructure Layer

Framework, persistence, API transport, and runtime integration:

```txt
lib/db/*
lib/orpc/*
lib/auth/*
lib/lingui/*
lib/tanstack-query/*
routes/api/*
env/*
```

## 7. ORPC Structure

### Procedure Setup

`lib/orpc/index.ts` defines:

- `publicProcedure`
- `protectedProcedure`
- auth middleware through Better Auth session context

Protected procedures require:

```ts
context.session?.user
```

### Context

`lib/orpc/context.ts` creates:

```ts
{
  session,
  db,
}
```

This gives every handler access to the authenticated session and Drizzle DB.

### Client

`lib/orpc/client.ts` creates an isomorphic ORPC client:

- Server side: direct `createRouterClient(router)`
- Client side: `RPCLink` to `/api/rpc`
- TanStack Query helpers through `createTanstackQueryUtils`

### Router Composition

`lib/orpc/router/index.ts` imports all feature procedures and groups them:

```ts
admin: {
  region: {
    province: { get, create, update, delete },
    regency: { get, create, update, delete },
  },
  stall: {
    get,
    getStallProduct,
    create,
    update,
  },
}
```

### ORPC Issues

- Router file is too large and should be split by domain.
- API keys use mixed naming, for example `product_brand` and `daily_sales`. Prefer camelCase in TypeScript.
- Some imports are inconsistent. The Stall `updateStall` import should use the same alias style as the other imports.
- Some CRUD endpoints are incomplete or commented out.

Recommended router split:

```txt
lib/orpc/router/
  index.ts
  auth.ts
  admin.ts
  admin-region.ts
  admin-land.ts
  admin-commodity.ts
  admin-product.ts
  admin-sale.ts
  admin-stall.ts
```

## 8. Drizzle ORM Schema Organization

Current schema files:

```txt
lib/db/schema/
  auth.ts
  index.ts
  map-product.ts
  sale.ts
  stall.ts
  todo.ts
  utils.ts
```

### Current Strengths

- Tables are grouped in schema files rather than scattered across routes.
- Foreign keys are declared in most relationship columns.
- UUID primary keys are used consistently.
- Common audit columns exist on many tables.

### Current Weaknesses

- `map-product.ts` contains too many bounded contexts:
  - geography
  - land
  - commodity
  - product
  - potential
- `schema/index.ts` currently exports only `auth`, `todo`, and `utils`, while active tables are imported from direct files. The schema barrel should export all active schemas.
- No Drizzle `relations()` definitions are visible for easier relational queries.
- Some foreign keys lack explicit delete behavior.
- Some naming is inconsistent between DB columns and returned DTO fields, for example `noTelp` becomes `notelp`.

### Recommended Schema Split

```txt
lib/db/schema/
  auth.ts
  geography.ts
  land.ts
  commodity.ts
  product.ts
  potential.ts
  stall.ts
  sale.ts
  todo.ts
  utils.ts
  index.ts
```

### Recommended Relation Flow

```txt
provinces
  -> regencies
  -> regencyLands
  -> regencyCommodities

landTypes
  -> commodityTypes
  -> productDosages

productTypes
  -> productBrands
  -> productDosages
  -> salesRealizations
  -> dailySales
  -> stallProductBrands

stalls
  -> province
  -> regency
  -> stallProductBrands
```

## 9. Query and Mutation Flow

### Query Flow

```txt
route component
  -> useQuery(orpc.admin.x.y.get.queryOptions({ input }))
  -> ORPC client
  -> /api/rpc/$ server route
  -> ORPC router
  -> feature -app handler
  -> context.db Drizzle query
  -> DB tables
  -> React Query cache
  -> UI render
```

### Mutation Flow

```txt
form component
  -> form validation
  -> useMutation(orpc.admin.x.y.create/update/delete)
  -> ORPC input validation
  -> Drizzle insert/update/delete
  -> returning data
  -> invalidateQueries
  -> toast
  -> close modal
  -> list refetch
```

### Current Issues

- Mutation invalidation is repeated manually in each form.
- Invalidation often targets `{ input: {} }`, which can miss lists using search, pagination, or filters.
- Some modules use `orpc.*.mutationOptions`, while others call `orpc.*.call` manually inside `mutationFn`.
- Search is sometimes client-side and sometimes server-side.

Recommended standard:

- Use server-side search for paginated lists.
- Keep search/filter/pagination in route search params.
- Use shared mutation hooks per entity.
- Invalidate by query key prefix where appropriate.

## 10. TanStack Query Usage

Current usage is direct and mostly correct:

```ts
useQuery(orpc.admin.region.province.get.queryOptions({ input: {} }))
```

The ORPC TanStack Query utilities are a strong pattern because query keys and inputs are generated from the router.

Recommended improvements:

- Create feature hooks for repeated queries:

```ts
useProvinces()
useRegencies({ provinceId })
useStalls({ page, limit, search })
```

- Keep components focused on rendering.
- Centralize invalidation:

```ts
queryClient.invalidateQueries({
  queryKey: orpc.admin.stall.get.queryKey(),
});
```

- Add `enabled` for dependent queries where needed.
- Use debounced search input for server queries.

## 11. React Hook Form Patterns

The Stall module uses React Hook Form with:

- `useForm`
- `zodResolver`
- shared `components/ui/form.tsx`
- `FormField`
- `FormItem`
- `FormLabel`
- `FormControl`
- `FormMessage`

This is a good pattern for accessible, schema-driven forms.

Current issues:

- Create and edit forms duplicate field markup.
- `Number(e.target.value)` turns empty input into `0`.
- Option items use `any`.
- Create and update share one schema even though update requires `id`.
- The rest of admin mostly uses TanStack Form, so form patterns are inconsistent.

Recommended React Hook Form standard:

```txt
-domain/schema.ts
  EntityCreateSchema
  EntityUpdateSchema
  EntityListInputSchema

-components/entity-form.tsx
  shared form fields

-components/create-entity-dialog.tsx
  provides create defaults and mutation

-components/edit-entity-dialog.tsx
  maps selected item into form defaults and mutation
```

## 12. Zod Schema Organization

Current schema files mostly define one schema per entity:

```ts
export const StallSchema = z.object(...)
```

Recommended schema split:

```ts
export const StallBaseSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  provinceId: z.string().uuid(),
  regencyId: z.string().uuid(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  owner: z.string().optional(),
  noTelp: z.string().optional(),
  criteria: z.string().max(1).optional(),
});

export const CreateStallSchema = StallBaseSchema;

export const UpdateStallSchema = StallBaseSchema.extend({
  id: z.string().uuid(),
});

export const GetStallsSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  provinceId: z.string().uuid().optional(),
  regencyId: z.string().uuid().optional(),
  stallId: z.string().uuid().optional(),
});
```

This avoids optional IDs in update flows and makes each use case explicit.

## 13. Route and Module Coupling Analysis

Many route files currently do too much. For example, `routes/admin/stall/index.tsx` handles:

- query state
- pagination state
- search state
- summary metrics
- Excel export
- table rendering
- action buttons
- modal composition

This creates high coupling between the route and the Stall feature implementation.

Better route responsibility:

```tsx
export const Route = createFileRoute('/admin/stall/')({
  component: StallRoute,
  validateSearch: stallSearchSchema.parse,
});

function StallRoute() {
  const search = Route.useSearch();
  return <StallPage search={search} />;
}
```

Then `StallPage` can compose:

- `StallSummary`
- `StallToolbar`
- `StallTable`
- `CreateStallDialog`
- `EditStallDialog`
- `DeleteStallDialog`

## 14. Reusable Component Opportunities

Recommended reusable admin components:

```txt
routes/admin/-components/
  crud-page-layout.tsx
  entity-toolbar.tsx
  entity-dialog.tsx
  confirm-delete-dialog.tsx
  empty-state.tsx
  loading-state.tsx
  pagination-controls.tsx
```

Recommended reusable form components:

```txt
components/forms/
  form-text-field.tsx
  form-number-field.tsx
  form-select-field.tsx
  form-textarea-field.tsx
```

Recommended feature-specific reusable components:

```txt
routes/admin/region/-components/
  province-select-field.tsx
  regency-select-field.tsx
  province-regency-fields.tsx
```

Recommended hooks:

```txt
routes/admin/-hooks/
  use-crud-mutation.ts
  use-url-modal-state.ts
  use-debounced-route-search.ts
```

## 15. Anti-Patterns and Duplicated Logic

Observed issues:

- `any` usage in list mapping and Drizzle conditions.
- Non-null assertion in `update-stall.ts`.
- Duplicate create/edit form fields.
- Empty files exist for some intended components.
- Inconsistent ORPC import paths.
- Mixed form libraries.
- Inline table rendering inside route files.
- Manual repeated mutation toast/invalidation logic.
- Some route modules filter client-side after fetching full lists.
- Some server handlers define pagination variables but do not apply pagination.
- Large ORPC router file.
- Large multi-domain DB schema file.
- Inconsistent naming: `notelp`, `noTelp`, `no_telp`.

## 16. Suggested Enterprise-Grade Improvements

Priority 1:

- Standardize form library.
- Split create/update/list Zod schemas.
- Remove `any`.
- Move route inline tables into `-components`.
- Complete empty modal/table files or delete them.
- Fix inconsistent imports.
- Ensure `schema/index.ts` exports all active DB schema modules.

Priority 2:

- Split ORPC router by domain.
- Add typed feature query and mutation hooks.
- Move repeated modal/form patterns into reusable components.
- Make route search params the source of truth for list filters.
- Add Drizzle `relations()`.
- Add consistent query invalidation helpers.

Priority 3:

- Introduce repository/query-service layer for complex modules.
- Add integration tests for ORPC handlers.
- Add form tests for complex validation.
- Add table component abstraction for admin CRUD modules.
- Add server-side pagination and total pages consistently.

## 17. Dependency Flow Between Routes, Forms, ORPC, Schemas, and DB

Recommended dependency direction:

```txt
UI route/components
  -> feature hooks
  -> ORPC client
  -> ORPC router
  -> application handlers
  -> domain schemas/types
  -> infrastructure repositories/Drizzle
  -> DB schema tables
```

Rules:

- `components/ui` must not import routes.
- `-domain` must not import React, ORPC, or DB clients.
- `-app` may import domain schemas and DB schema.
- Route components may import ORPC client, but feature hooks are preferred.
- DB schema must not import route modules.

## 18. Current Stall Module Analysis

Files analyzed:

```txt
routes/admin/stall/-app/get-stalls.ts
routes/admin/stall/-app/create-stall.ts
routes/admin/stall/-app/update-stall.ts
routes/admin/stall/-components/create-stall-form.tsx
routes/admin/stall/-components/edit-stall-form.tsx
routes/admin/stall/index.tsx
routes/admin/stall/-domain/schema.ts
```

### Current Strengths

- Clear feature folders exist.
- ORPC procedures are protected.
- Create/update use Zod validation.
- `get-stalls.ts` joins province and regency names.
- Form uses React Hook Form and shared form primitives.
- Mutation success invalidates list query.
- Province and regency dropdowns reuse existing ORPC endpoints.

### Current Weaknesses

- `get-stalls.ts` uses `any[]` for conditions.
- `update-stall.ts` uses `input.id!`.
- Create and update share `StallSchema`, even though update requires `id`.
- Create and edit forms duplicate most fields.
- `edit-stall-form.tsx` imports `orpc` from `@/utils/orpc`, while most code uses `@/lib/orpc/client`.
- `edit-stall-modal.tsx` and `stall-table.tsx` appear empty.
- `index.tsx` has inline table rendering instead of using `stall-table.tsx`.
- Delete and product assignment are not wired into visible table actions.
- Search is not debounced.
- Pagination does not show total pages.
- `criteria` DB length is 1, but Zod allows any string length.
- `noTelp` is returned as `notelp`, creating naming mismatch.

### Scalability Concerns

The Stall module is already showing the common CRUD growth problem:

- one route file becomes a page controller
- form duplication increases
- list actions become hard to maintain
- mutation invalidation is copy-pasted
- input/output types become implicit through `any`

If this pattern is copied into more modules, the admin area will become expensive to maintain.

### Recommended Stall Refactor

Target layout:

```txt
routes/admin/stall/
  index.tsx
  -app/
    get-stalls.ts
    create-stall.ts
    update-stall.ts
    delete-stall.ts
    assign-product-brand.ts
  -domain/
    schema.ts
    types.ts
  -components/
    stall-page.tsx
    stall-summary.tsx
    stall-toolbar.tsx
    stall-table.tsx
    stall-form.tsx
    create-stall-dialog.tsx
    edit-stall-dialog.tsx
    delete-stall-dialog.tsx
    assign-product-dialog.tsx
  -hooks/
    use-stalls.ts
    use-stall-mutations.ts
```

Use one shared form component:

```txt
stall-form.tsx
```

Then create wrappers:

```txt
create-stall-dialog.tsx
edit-stall-dialog.tsx
```

## 19. Ideal Architecture Recommendation

Keep the route-colocated architecture, but make the boundaries stricter:

```txt
routes/admin/<bounded-context>/<module>/
  route files
  -app         application use cases
  -domain     schemas, types, constants
  -components presentation
  -hooks      client-side query/mutation/form hooks
```

For cross-cutting reusable code:

```txt
components/ui       primitive UI
components/forms    generic form controls
lib/orpc            API transport
lib/db              persistence
lib/auth            auth infrastructure
```

For complex server logic, introduce:

```txt
routes/admin/<module>/-server/
  repository.ts
  service.ts
```

or a global:

```txt
server/modules/<module>/
  repository.ts
  service.ts
```

Only do this when queries become complex enough to justify the extra layer.

## 20. Suggested Folder Cleanup

Recommended cleanup tasks:

- Split `map-product.ts` into narrower schema files.
- Update `schema/index.ts` to export all schema modules.
- Rename ORPC keys from snake_case to camelCase.
- Remove or complete empty files.
- Move inline admin tables into feature table components.
- Standardize form implementation.
- Add `types.ts` in mature modules.
- Add route search schemas in each list route.

## 21. Naming Convention Improvements

Recommended conventions:

- DB tables and columns: snake_case.
- TypeScript variables/functions/properties: camelCase.
- React components: PascalCase.
- Files: kebab-case.
- ORPC route keys: camelCase.
- Zod schemas: PascalCase with action suffix.

Examples:

```txt
DB column: no_telp
Drizzle property: noTelp
DTO property: noTelp
UI label: Phone
```

Avoid returning `notelp` from queries.

Recommended ORPC names:

```txt
admin.land.landType.get
admin.product.productBrand.get
admin.sale.dailySales.get
admin.stall.get
```

## 22. Reusable CRUD Strategy

Every CRUD module should follow this flow:

```txt
schema.ts
  -> create/list/update/delete input schemas

-app/*.ts
  -> ORPC procedures validate inputs and execute use cases

-hooks/*.ts
  -> use list query and mutations

-components/*-form.tsx
  -> schema-driven fields

-components/*-table.tsx
  -> render list and row actions

index.tsx
  -> route search params and composition
```

CRUD page responsibilities:

- URL search params: route
- query and mutation behavior: hooks
- forms: form component
- modal state: URL-driven or dialog wrapper
- table display: table component
- business validation: Zod schema
- persistence: ORPC handler and Drizzle

## 23. Scalable Modal and Form Architecture

Recommended modal pattern:

```txt
create=true
edit=<id>
delete=<id>
assignProduct=<stallId>
```

Keep modal state in route search params for admin pages. Benefits:

- browser back button works
- dialogs are shareable/debuggable
- one source of truth
- no deeply nested state passing

Recommended form pattern:

```txt
<EntityForm
  mode="create" | "edit"
  defaultValues={...}
  onSubmit={...}
  isSubmitting={...}
/>
```

Dialog wrappers should own:

- open/close state
- mutation call
- success handling

The form should own:

- fields
- validation display
- local form state

## 24. Future Module Blueprint Template

Use this template for new modules:

```txt
routes/admin/example/
  index.tsx
  -app/
    get-examples.ts
    get-example.ts
    create-example.ts
    update-example.ts
    delete-example.ts
  -domain/
    schema.ts
    types.ts
    constants.ts
  -hooks/
    use-examples.ts
    use-example-mutations.ts
  -components/
    example-page.tsx
    example-toolbar.tsx
    example-table.tsx
    example-form.tsx
    create-example-dialog.tsx
    edit-example-dialog.tsx
    delete-example-dialog.tsx
```

Minimum schema pattern:

```ts
export const ExampleBaseSchema = z.object({
  name: z.string().min(1),
});

export const CreateExampleSchema = ExampleBaseSchema;

export const UpdateExampleSchema = ExampleBaseSchema.extend({
  id: z.string().uuid(),
});

export const GetExamplesSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  search: z.string().optional(),
});
```

Minimum ORPC pattern:

```ts
export const createExample = protectedProcedure
  .input(CreateExampleSchema)
  .handler(async ({ input, context }) => {
    const [data] = await context.db
      .insert(examples)
      .values(input)
      .returning();

    return data;
  });
```

Minimum route pattern:

```tsx
export const Route = createFileRoute('/admin/example/')({
  component: ExampleRoute,
  validateSearch: exampleSearchSchema.parse,
});

function ExampleRoute() {
  const search = Route.useSearch();
  return <ExamplePage search={search} />;
}
```

## 25. Final Best Practices

- Keep route files thin.
- Keep UI primitives generic.
- Keep domain schemas free from React and database clients.
- Use explicit create/update/list schemas.
- Prefer feature hooks over direct repeated `useQuery` and `useMutation`.
- Keep list state in URL search params.
- Use server-side filtering when lists are paginated.
- Use shared CRUD components for common admin patterns.
- Use Drizzle relations for query clarity.
- Use consistent naming from DB to DTO to UI.
- Remove `any` and non-null assertions.
- Standardize one form architecture for admin modules.
- Split large schema and ORPC router files before they become harder to maintain.
