# TanStack Start on Netlify Analysis

## Root cause

The deployment is building successfully but Netlify is not deploying the TanStack Start/Nitro output as the site.

This repository is a monorepo and the web app lives in `apps/web`. The previous root `netlify.toml` ran:

```toml
[build]
  command = "cd apps/web && bun run build"
```

That builds the app, but Netlify's build base remains the repository root. The generated TanStack Start/Nitro Netlify function is created under:

```text
apps/web/.netlify/functions-internal/server
```

and the static output is created under:

```text
apps/web/dist
```

With no `publish` directory configured, Netlify can complete the build and deploy, while still publishing the wrong directory from the repo root. That is why the production site returns Netlify's `Page not found` response. The server function endpoint `/.netlify/functions/server` also returns 404 because the generated function was not wired into the deploy from the app package output.

## Installed version matters

This project currently has:

```json
"@tanstack/react-start": "1.131.2"
```

According to the current official Netlify TanStack Start docs:

- TanStack Start `1.132.0` and later should use `@netlify/vite-plugin-tanstack-start`.
- TanStack Start `1.121.0` through `1.131.x` should use `tanstackStart({ target: "netlify" })`.
- For `1.121.0` through `1.131.x`, the Netlify publish directory is `dist`, not `dist/client`.

So for the installed version, `target: "netlify"` is not the bug. The missing Netlify base/publish configuration is the bug.

## Final configuration for the current installed version

### `vite.config.ts`

Keep the existing Netlify target. Do not add `@netlify/vite-plugin-tanstack-start` unless TanStack Start is upgraded to `1.132.0` or newer.

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

### `netlify.toml`

```toml
[build]
  base = "apps/web"
  command = "bun run build"
  publish = "dist"

[functions]
  node_bundler = "esbuild"
```

The `[functions]` block is optional for this app. Nitro generates internal Netlify functions under `.netlify/functions-internal`; you do not need to set a custom functions directory.

### `apps/web/package.json` scripts

The current scripts are compatible:

```json
{
  "scripts": {
    "dev": "bunx --bun vite dev",
    "start": "bun run .output/server/index.mjs",
    "build": "bunx --bun vite build",
    "serve": "bunx --bun vite preview"
  }
}
```

Netlify should run `bun run build` from `apps/web`.

### Netlify dashboard settings

Use file-based settings from `netlify.toml` and avoid conflicting dashboard overrides.

Set these values, or leave them blank if Netlify shows that they are coming from `netlify.toml`:

```text
Base directory: apps/web
Build command: bun run build
Publish directory: dist
Package directory: empty
Functions directory: empty
```

After changing these settings, trigger a deploy with "Clear cache and deploy site".

## Do you need these?

### `@netlify/vite-plugin-tanstack-start`

Not with the currently installed `@tanstack/react-start@1.131.2`.

Use it only after upgrading TanStack Start to `1.132.0` or newer.

### `nitro/vite` plugin

No. TanStack Start already uses Nitro internally. Do not add a separate Nitro Vite plugin for this deployment.

### Netlify adapter

No separate adapter package is needed for the current installed version. `target: "netlify"` tells TanStack Start/Nitro to generate Netlify output.

For newer TanStack Start versions, the official Netlify Vite plugin replaces this target configuration.

### Redirects

No manual SPA redirect such as `/* /index.html 200` should be used for SSR TanStack Start. That rewrite is for static SPAs and can bypass the server-rendered app.

### Publish directory

Yes. This is required.

For the current installed version, publish:

```text
dist
```

With `base = "apps/web"`, this means `apps/web/dist`.

### Functions directory

No custom functions directory is required. Nitro emits internal Netlify functions under `.netlify/functions-internal` when the build runs in the app base.

## Latest official Netlify plugin configuration

If upgrading TanStack Start to `1.132.0` or newer, switch to the official Netlify plugin flow.

Install:

```sh
bun add -d @netlify/vite-plugin-tanstack-start
```

Then use:

```ts
import { lingui } from '@lingui/vite-plugin';
import netlify from '@netlify/vite-plugin-tanstack-start';
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
    }),
    react({
      babel: {
        plugins: ['@lingui/babel-plugin-lingui-macro'],
      },
    }),
    lingui(),
    netlify(),
  ],
});
```

For that upgraded setup, use:

```toml
[build]
  base = "apps/web"
  command = "bun run build"
  publish = "dist/client"
```

The dashboard should then be:

```text
Base directory: apps/web
Build command: bun run build
Publish directory: dist/client
Package directory: empty
Functions directory: empty
```

## Minimal working setup

For this repo as it exists today, the minimal working setup is:

```toml
[build]
  base = "apps/web"
  command = "bun run build"
  publish = "dist"
```

and:

```ts
tanstackStart({
  customViteReactPlugin: true,
  target: 'netlify',
})
```

No manual redirects, no custom functions directory, no separate Nitro plugin, and no Netlify plugin until TanStack Start is upgraded.

## Sources checked

- Netlify TanStack Start docs: https://docs.netlify.com/frameworks/tanstack-start/
- TanStack Start hosting docs: https://tanstack.com/start/latest/docs/framework/react/guide/hosting
- Nitro Netlify provider docs: https://nitro-docs.pages.dev/deploy/providers/netlify/
- Netlify monorepo docs: https://docs.netlify.com/configure-builds/monorepos/
- Netlify file-based configuration docs: https://docs.netlify.com/configure-builds/file-based-configuration/
