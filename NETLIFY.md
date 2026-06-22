# 🚀 Netlify Deployment Handbook

> A polished deployment guide for this project: **TanStack Start + Nitro SSR + Bun + Netlify + Supabase PostgreSQL + Better Auth**.

This document explains the final working setup, the root cause behind the painful `"Page not found"` production issue, and the debugging lessons learned.

---

## 🧱 Stack Overview

| Layer | Technology | Purpose |
| --- | --- | --- |
| ⚛️ Frontend framework | TanStack Start | Full-stack React app with routing and SSR |
| 🧩 SSR runtime | Nitro | Generates the server runtime used by Netlify |
| 📦 Package manager | Bun | Installs dependencies and runs build scripts |
| ☁️ Hosting | Netlify | Hosts static assets and serverless SSR function |
| 🗄️ Database | Supabase PostgreSQL | Production PostgreSQL database |
| 🧬 ORM | Drizzle ORM | Type-safe database access |
| 🔐 Auth | Better Auth | Authentication and session handling |
| 🏗️ Repo layout | Monorepo | Web app lives in `apps/web` |

---

## ✅ Final Working Config

This project currently uses:

```json
"@tanstack/react-start": "1.131.2"
```

That version matters.

For **TanStack Start `1.131.x`**, the correct Netlify setup is:

| Setting | Value |
| --- | --- |
| TanStack Start target | `netlify` |
| Netlify publish directory | `dist` |
| Netlify base directory | `apps/web` |
| Netlify build command | `bun run build` |
| Netlify functions directory | Leave empty |
| Manual redirects | Not needed |
| `@netlify/vite-plugin-tanstack-start` | Not needed for `1.131.x` |

> ⚠️ The newer `@netlify/vite-plugin-tanstack-start` flow is for newer TanStack Start versions. This project is on `1.131.2`, so the correct approach is still `target: 'netlify'`.

---

## ⚙️ `vite.config.ts`

Location:

```text
apps/web/vite.config.ts
```

Final config:

```ts
import { lingui } from '@lingui/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3000,
    allowedHosts: true,
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      customViteReactPlugin: true,
      target: 'netlify',
    }),
    react({
      babel: {
        plugins: ['@lingui/babel-plugin-lingui-macro'],
      },
    }),
    lingui(),
  ],
});
```

### Why this matters 🧠

```ts
target: 'netlify'
```

tells TanStack Start/Nitro to generate Netlify-compatible SSR output.

After a successful build, Nitro should create:

```text
apps/web/.netlify/functions-internal/server
```

That folder is the SSR function bundle.

✅ If this folder exists locally, Nitro SSR generation worked.

---

## 🧾 `netlify.toml`

Location:

```text
netlify.toml
```

Final config:

```toml
[build]
  base = "apps/web"
  command = "bun run build"
  publish = "dist"

[functions]
  node_bundler = "esbuild"
```

### Why each setting matters 🔍

| Setting | Why it matters |
| --- | --- |
| `base = "apps/web"` | Netlify must build from the actual TanStack Start app directory |
| `command = "bun run build"` | Runs the app's build script from `apps/web` |
| `publish = "dist"` | For TanStack Start `1.131.x`, static assets are published from `dist` |
| `node_bundler = "esbuild"` | Bundles Netlify Functions with the standard Node bundler |

> ⚠️ Do not set `publish = "dist/client"` for this project while using `@tanstack/react-start@1.131.2`.

---

## 🔐 Environment Variables

Netlify environment variables must be configured in the **Netlify dashboard**, not only in local `.env` files.

### Required production variables ✅

| Variable | Scope | Required | Notes |
| --- | --- | --- | --- |
| `DATABASE_URL` | Runtime | ✅ Yes | Supabase PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Runtime | ✅ Yes | Must be at least 32 characters |
| `BETTER_AUTH_URL` | Runtime | ✅ Yes | Production site URL |
| `CORS_ORIGIN` | Runtime | ✅ Yes | Production site URL |
| `VITE_BETTER_AUTH_URL` | Build/client | ✅ Yes | Public auth URL baked into client bundle |
| `VITE_APP_TITLE` | Build/client | Optional | Public app title |

Example:

```env
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-<region>.pooler.supabase.com:6543/postgres?sslmode=require
BETTER_AUTH_SECRET=replace-with-a-strong-32-plus-character-secret
BETTER_AUTH_URL=https://your-site.netlify.app
CORS_ORIGIN=https://your-site.netlify.app

VITE_BETTER_AUTH_URL=https://your-site.netlify.app
VITE_APP_TITLE=Satu Peta Pasar
```

### Optional Supabase variables 🟢

Only add these if the app uses Supabase JS directly:

| Variable | Use case |
| --- | --- |
| `SUPABASE_URL` | Server-only Supabase client |
| `SUPABASE_ANON_KEY` | Server-only Supabase client |
| `VITE_SUPABASE_URL` | Browser/client Supabase client |
| `VITE_SUPABASE_ANON_KEY` | Browser/client Supabase client |

> ⚠️ Current Drizzle database access uses `DATABASE_URL`, not `SUPABASE_URL` or `SUPABASE_ANON_KEY`.

---

## 🧪 Build-Time vs Runtime Env

| Type | Examples | Where used |
| --- | --- | --- |
| Build-time/client | `VITE_BETTER_AUTH_URL`, `VITE_APP_TITLE` | Vite build and browser bundle |
| Runtime/server | `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `CORS_ORIGIN` | Netlify SSR function |

### Important rule 🚨

Only variables prefixed with:

```text
VITE_
```

are exposed to browser code.

✅ Public browser values need `VITE_`.

❌ Secrets must never use `VITE_`.

---

## ⚠️ `.env.production` Warning

> ⚠️ `.env.production` does **not** automatically become Netlify runtime environment.

Local files like:

```text
.env
.env.local
.env.production
```

are useful for local development and local builds.

But Netlify Functions need runtime variables configured in:

```text
Netlify Dashboard → Site configuration → Environment variables
```

If a variable exists only in local `.env.production`, the production SSR function may not receive it.

---

## 🗄️ Supabase Notes

This project uses:

```text
Supabase PostgreSQL → DATABASE_URL → pg Pool → Drizzle ORM → Better Auth
```

### Recommended connection strategy ✅

For Netlify serverless SSR, use the Supabase pooler connection:

```text
Host: aws-<region>.pooler.supabase.com
Port: 6543
Mode: Transaction pooler
SSL: required
```

Example:

```env
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-<region>.pooler.supabase.com:6543/postgres?sslmode=require
```

### Why pooler is recommended 🧠

Netlify Functions are serverless.

That means many short-lived function instances can start and stop independently. A direct database connection can exhaust PostgreSQL connection limits quickly.

The Supabase pooler helps protect the database from too many direct connections.

---

## 🧬 Drizzle + Better Auth Startup

The app's SSR path can initialize auth and database code during normal page rendering.

Simplified lifecycle:

```text
Request comes in
  ↓
Netlify routes request to Nitro SSR function
  ↓
TanStack Start server handler runs
  ↓
Root route beforeLoad runs
  ↓
oRPC session lookup runs
  ↓
Better Auth loads
  ↓
Drizzle database client loads
  ↓
DATABASE_URL and BETTER_AUTH_SECRET are required
```

### Important behavior ⚠️

Missing required server env vars usually cause:

```text
500 Function Error
```

They usually do **not** cause:

```text
Netlify Page not found
```

That distinction was critical during debugging.

---

## 🖥️ Netlify Dashboard Settings

Use these settings:

| Setting | Value |
| --- | --- |
| Base directory | `apps/web` |
| Build command | `bun run build` |
| Publish directory | `dist` |
| Functions directory | Empty |
| Package directory | Empty |

After changing these settings:

```text
Deploys → Trigger deploy → Clear cache and deploy site
```

✅ **Clear cache and deploy site** was critical.

Netlify can reuse stale build/deploy state, especially after changing monorepo base settings or publish directory settings.

---

## 🚢 Deployment Flow

The correct deployment flow looks like this:

1. Netlify enters the monorepo.
2. Netlify uses:

   ```text
   base = apps/web
   ```

3. Netlify runs:

   ```sh
   bun run build
   ```

4. TanStack Start builds the app.
5. Nitro generates Netlify SSR output.
6. Static files are written to:

   ```text
   apps/web/dist
   ```

7. SSR function is written to:

   ```text
   apps/web/.netlify/functions-internal/server
   ```

8. Netlify publishes:

   ```text
   apps/web/dist
   ```

9. Netlify registers the generated internal function.
10. Requests to pages are routed into the SSR function.

---

## 📦 Expected Build Output

After a successful local build:

```text
apps/web/dist/
apps/web/.netlify/functions-internal/server/
apps/web/.netlify/functions-internal/server/main.mjs
apps/web/.netlify/functions-internal/nitro.json
```

### What this proves ✅

If this exists:

```text
.netlify/functions-internal/server
```

then Nitro successfully generated the Netlify SSR function.

### What this does not prove ⚠️

It does **not** prove Netlify registered that function during deployment.

For that, check:

```text
Netlify Dashboard → Functions
```

---

## 🧩 Netlify Functions Tab

The biggest clue during debugging was:

```text
Netlify Functions tab was empty
```

That strongly suggests:

```text
The generated Nitro SSR function was not registered by Netlify.
```

If the SSR function is not registered, the request never reaches TanStack Start.

Result:

```text
Netlify Page not found
```

---

## 🧯 Root Cause Analysis

The issue was confusing because:

| Step | Result |
| --- | --- |
| Build | ✅ Succeeded |
| Deploy | ✅ Succeeded |
| Local Nitro function output | ✅ Existed |
| Production route handling | ❌ Netlify Page not found |

The important distinction:

```text
Build success does not guarantee function registration.
```

The local folder:

```text
apps/web/.netlify/functions-internal/server
```

proved that Nitro generated the function.

But the production 404 meant:

```text
Netlify was not routing requests into that function.
```

---

## 🧠 Why Netlify Showed "Page not found"

Netlify's `"Page not found"` usually means:

```text
No static file matched
No redirect matched
No SSR function handled the request
```

In this project, that pointed to deployment wiring:

```text
Monorepo base directory / publish directory / function registration
```

not primarily application code.

### Important difference

| Symptom | Likely cause |
| --- | --- |
| Netlify `"Page not found"` | Request never reached SSR function |
| Function `500` | SSR function ran but crashed |
| Auth redirect issue | Better Auth URL/CORS/cookie config |
| Client API wrong URL | `VITE_*` config issue |

---

## 🧭 Debugging Journey

### 1. Confirmed TanStack Start version ✅

```json
"@tanstack/react-start": "1.131.2"
```

This confirmed the correct deployment style:

```ts
tanstackStart({
  target: 'netlify',
})
```

### 2. Confirmed Nitro output existed ✅

Local build generated:

```text
apps/web/.netlify/functions-internal/server
```

This proved the SSR function was being generated.

### 3. Confirmed env vars can break SSR ⚠️

Missing:

```text
DATABASE_URL
BETTER_AUTH_SECRET
```

caused a runtime function error.

But it produced a `500`, not a Netlify 404.

### 4. Checked Netlify routing behavior 🔎

Production showed:

```text
Page not found
```

That means Netlify likely did not invoke the SSR function at all.

### 5. Checked Netlify Functions tab 🚨

The Functions tab being empty was the strongest clue.

If Netlify has no registered function, SSR routes cannot work.

### 6. Cleared deploy cache ✅

After changing base/publish settings, use:

```text
Clear cache and deploy site
```

This prevents stale deployment metadata from hiding the fix.

---

## ❌ Common Mistakes

| Mistake | Why it breaks |
| --- | --- |
| Leaving base directory empty | Netlify may build from the wrong monorepo location |
| Leaving publish directory empty | Netlify may deploy the wrong output |
| Using `dist/client` on TanStack Start `1.131.x` | Wrong publish output for this version |
| Adding SPA redirect `/* /index.html 200` | Can bypass SSR behavior |
| Setting custom functions directory | Nitro uses `.netlify/functions-internal` |
| Assuming `.env.production` becomes runtime env | Netlify Functions need dashboard env vars |
| Leaving `BETTER_AUTH_URL` as localhost | Auth cookies/callbacks break in production |
| Leaving `VITE_BETTER_AUTH_URL` as localhost | Browser auth client points to localhost |
| Ignoring empty Functions tab | SSR function was probably not registered |
| Not clearing cache | Netlify may reuse stale build/deploy settings |

---

## 🧪 Runtime Failure Cheatsheet

| Problem | Expected symptom |
| --- | --- |
| Missing `DATABASE_URL` | Function `500` |
| Missing `BETTER_AUTH_SECRET` | Function `500` |
| Wrong `BETTER_AUTH_URL` | Auth/session/cookie issues |
| Wrong `CORS_ORIGIN` | Cross-origin auth/API issues |
| Wrong `VITE_BETTER_AUTH_URL` | Client auth requests go to wrong URL |
| Missing SSR function registration | Netlify `"Page not found"` |
| Wrong publish directory | Netlify `"Page not found"` |

---

## 🧰 Production Checklist

Before deploying:

1. ✅ Confirm TanStack Start version:

   ```sh
   bun pm ls @tanstack/react-start
   ```

2. ✅ Confirm `vite.config.ts` includes:

   ```ts
   target: 'netlify'
   ```

3. ✅ Confirm `netlify.toml`:

   ```toml
   [build]
     base = "apps/web"
     command = "bun run build"
     publish = "dist"
   ```

4. ✅ Confirm Netlify dashboard matches:

   ```text
   Base directory: apps/web
   Build command: bun run build
   Publish directory: dist
   Functions directory: empty
   ```

5. ✅ Confirm required runtime env vars exist:

   ```text
   DATABASE_URL
   BETTER_AUTH_SECRET
   BETTER_AUTH_URL
   CORS_ORIGIN
   ```

6. ✅ Confirm required public build env vars exist:

   ```text
   VITE_BETTER_AUTH_URL
   VITE_APP_TITLE
   ```

7. ✅ Confirm local build generates:

   ```text
   apps/web/.netlify/functions-internal/server
   ```

8. ✅ Deploy with:

   ```text
   Clear cache and deploy site
   ```

9. ✅ Check:

   ```text
   Netlify Dashboard → Functions
   ```

10. ✅ Confirm the SSR function is registered.

---

## 🧼 Security Checklist

1. ✅ Never commit `.env` files.
2. ✅ Keep secrets out of `VITE_*`.
3. ✅ Rotate leaked database passwords immediately.
4. ✅ Rotate leaked `BETTER_AUTH_SECRET` immediately.
5. ✅ Use production URLs in production env vars.
6. ✅ Use Supabase pooler for serverless deployments.
7. ✅ Avoid printing env values in build logs.

---

## 🧠 Lessons Learned

### ✅ Build success is not enough

Netlify can successfully build and deploy while still not routing requests to SSR.

### ✅ Local Nitro output is a key clue

This folder:

```text
.netlify/functions-internal/server
```

means Nitro generated the SSR function.

### ✅ Function registration is separate

Netlify still has to register that generated function during deployment.

The Functions tab matters.

### ✅ Netlify 404 usually means routing failed before app code

If the app code crashes, expect a function error.

If Netlify says:

```text
Page not found
```

the request probably never reached the SSR function.

### ✅ Env vars matter, but symptoms differ

Missing env vars usually cause:

```text
500 Function Error
```

not:

```text
Netlify Page not found
```

### ✅ Cache can hide fixes

After changing Netlify base, publish, or build settings:

```text
Clear cache and deploy site
```

is not optional.

---

## 🏁 Final Deployment Architecture

```text
Browser
  ↓
Netlify CDN
  ↓
Static assets from apps/web/dist
  ↓
SSR route fallback
  ↓
Nitro-generated Netlify internal function
  ↓
TanStack Start request handler
  ↓
Root route / route loaders / server functions
  ↓
Better Auth
  ↓
Drizzle ORM
  ↓
Supabase PostgreSQL pooler
```

---

## ✅ Final Answer

The production setup should be:

```text
TanStack Start 1.131.2
Nitro target netlify
Netlify base apps/web
Netlify publish dist
Netlify Functions directory empty
Runtime env vars configured in Netlify dashboard
Supabase pooler DATABASE_URL
Clear cache and deploy site
Functions tab must show the SSR function
```

If production shows:

```text
Page not found
```

first check:

```text
Netlify Functions tab
Netlify base directory
Netlify publish directory
Deploy cache
Generated function registration
```

Then check runtime env vars if the function is registered but returns `500`.
