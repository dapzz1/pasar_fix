import { test, type Page } from '@playwright/test';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// ─── Load .env.screenshot ───────────────────────────────────────────────────

try {
  const envPath = resolve('.env.screenshot');
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (key && val && !process.env[key]) {
        process.env[key] = val;
      }
    }
    console.log('  ✓ Loaded .env.screenshot');
  }
} catch {
  // silent
}

// ─── Configuration ──────────────────────────────────────────────────────────

const OUT_DIR = resolve('screenshots');
const ADMIN_EMAIL = process.env.SCREENSHOT_EMAIL || 'adminmpb@example.com';
const ADMIN_PASSWORD = process.env.SCREENSHOT_PASSWORD || 'admin12345';

interface ScreenshotTask {
  id: string;
  name: string;
  folder: string;
  caption: string;
  bab: 'bab2' | 'bab3';
  type: 'web' | 'modal' | 'api' | 'code' | 'manual';
  route: string;
}

// ─── 40 Screenshot Definitions ──────────────────────────────────────────────

const ALL: ScreenshotTask[] = [
  // Kelompok 1: Setup & Kontribusi
  { id: '01', name: 'development-server',       folder: 'bab3/setup',       bab: 'bab3', type: 'manual', route: 'MANUAL — terminal: bun run dev',        caption: 'Gambar 3.x Proses menjalankan development server' },
  { id: '02', name: 'commit-stall',              folder: 'bab3/kontribusi',  bab: 'bab3', type: 'manual', route: 'MANUAL — terminal: git show 7a38bb7 --stat', caption: 'Gambar 3.x Detail commit pengembangan modul Stall' },

  // Kelompok 2: Survei Lapangan
  { id: '03', name: 'excel-data-survei',          folder: 'bab3/survei',    bab: 'bab3', type: 'manual', route: 'MANUAL — File: data/SURVEY PASAR KIOS (Jawaban).xlsx', caption: 'Gambar 3.x Data survei lapangan kios dalam format Excel' },

  // Kelompok 3: Authentication
  { id: '04', name: 'halaman-login',             folder: 'bab3/auth',       bab: 'bab3', type: 'web',    route: '/auth/login',                          caption: 'Gambar 3.x Halaman login pengguna' },
  { id: '05', name: 'gagal-login',               folder: 'bab3/auth',       bab: 'bab3', type: 'web',    route: '/auth/login',                          caption: 'Gambar 3.x Pesan error saat login gagal' },
  { id: '06', name: 'redirect-setelah-login',    folder: 'bab3/auth',       bab: 'bab3', type: 'web',    route: '/auth/login?redirect=/admin',          caption: 'Gambar 3.x Halaman admin setelah login berhasil' },
  { id: '07', name: 'session-cookie',             folder: 'bab3/auth',       bab: 'bab3', type: 'manual', route: 'MANUAL — DevTools → Application → Cookies', caption: 'Gambar 3.x Cookie session Better Auth pada browser' },

  // Kelompok 4: Landing Page & Dashboard
  { id: '08', name: 'landing-hero',              folder: 'bab3/dashboard',  bab: 'bab3', type: 'web',    route: '/',                                    caption: 'Gambar 3.x Halaman utama Satu Peta Pasar' },
  { id: '09', name: 'landing-program-cards',     folder: 'bab2',            bab: 'bab2', type: 'web',    route: '/',                                    caption: 'Gambar 2.x Program kerja Departemen Manajemen Produk Baru' },
  { id: '10', name: 'dashboard-admin',            folder: 'bab3/dashboard',  bab: 'bab3', type: 'web',    route: '/admin',                               caption: 'Gambar 3.x Dashboard admin dengan ringkasan data' },
  { id: '11', name: 'admin-sidebar',              folder: 'bab3/dashboard',  bab: 'bab3', type: 'web',    route: '/admin',                               caption: 'Gambar 3.x Sidebar navigasi panel admin' },

  // Kelompok 5: Wilayah
  { id: '12', name: 'daftar-province',            folder: 'bab3/wilayah',   bab: 'bab3', type: 'web',    route: '/admin/region/province',               caption: 'Gambar 3.x Daftar data provinsi pada panel admin' },
  { id: '13', name: 'form-tambah-province',      folder: 'bab3/wilayah',   bab: 'bab3', type: 'modal',   route: '/admin/region/province',               caption: 'Gambar 3.x Form penambahan data provinsi' },
  { id: '14', name: 'daftar-regency',             folder: 'bab3/wilayah',   bab: 'bab3', type: 'web',    route: '/admin/region/regency',                caption: 'Gambar 3.x Daftar data kabupaten dengan relasi provinsi' },

  // Kelompok 6: Komoditas
  { id: '15', name: 'daftar-commodity-type',      folder: 'bab3/komoditas', bab: 'bab3', type: 'web',    route: '/admin/commodity',                     caption: 'Gambar 3.x Daftar jenis komoditas dengan filter jenis lahan' },
  { id: '16', name: 'province-commodity',         folder: 'bab3/komoditas', bab: 'bab3', type: 'web',    route: '/admin/commodity/province-commodity',  caption: 'Gambar 3.x Data komoditas tingkat provinsi (read-only)' },
  { id: '17', name: 'regency-commodity',          folder: 'bab3/komoditas', bab: 'bab3', type: 'web',    route: '/admin/commodity/regency-commodity',   caption: 'Gambar 3.x Data komoditas tingkat kabupaten dengan CRUD penuh' },

  // Kelompok 7: Produk
  { id: '18', name: 'daftar-product-brand',       folder: 'bab3/produk',    bab: 'bab3', type: 'web',    route: '/admin/product/product-brand',         caption: 'Gambar 3.x Daftar brand produk yang direferensikan oleh seluruh modul' },
  { id: '19', name: 'daftar-product-dosage',     folder: 'bab3/produk',    bab: 'bab3', type: 'web',    route: '/admin/product/product-dosage',        caption: 'Gambar 3.x Daftar dosis produk untuk setiap brand dan komoditas' },

  // Kelompok 8: Potensi
  { id: '20', name: 'province-potential',         folder: 'bab3/potensi',   bab: 'bab3', type: 'web',    route: '/admin/potential/province_potential',  caption: 'Gambar 3.x Data potensi provinsi (read-only)' },

  // Kelompok 9: Penjualan
  { id: '21', name: 'daftar-sales-realization',  folder: 'bab3/penjualan', bab: 'bab3', type: 'web',    route: '/admin/sale',                          caption: 'Gambar 3.x Data realisasi penjualan dengan metrik RKAP dan YTD' },
  { id: '22', name: 'daftar-daily-sales',         folder: 'bab3/penjualan', bab: 'bab3', type: 'web',    route: '/admin/sale/sale-daily',               caption: 'Gambar 3.x Data penjualan harian per brand produk' },

  // Kelompok 10: Stall
  { id: '23', name: 'daftar-stall',               folder: 'bab3/stall',     bab: 'bab3', type: 'web',    route: '/admin/stall',                         caption: 'Gambar 3.x Daftar kios pada modul Stall' },
  { id: '24', name: 'form-tambah-stall',          folder: 'bab3/stall',     bab: 'bab3', type: 'modal',   route: '/admin/stall',                         caption: 'Gambar 3.x Form penambahan data kios' },
  { id: '25', name: 'modal-assignment-brand',    folder: 'bab3/stall',     bab: 'bab3', type: 'modal',   route: '/admin/stall',                         caption: 'Gambar 3.x Modal assignment brand produk ke kios' },
  { id: '26', name: 'detail-stall-publik',        folder: 'bab3/stall',     bab: 'bab3', type: 'web',    route: '/stall/[PERLU VERIFIKASI ID]',         caption: 'Gambar 3.x Halaman detail kios publik' },

  // Kelompok 11: User Management
  { id: '27', name: 'daftar-user',               folder: 'bab3/user',      bab: 'bab3', type: 'web',    route: '/admin/user',                          caption: 'Gambar 3.x Daftar pengguna dengan role masing-masing' },

  // Kelompok 12: Visualisasi Peta
  { id: '28', name: 'peta-interaktif',            folder: 'bab3/peta',      bab: 'bab3', type: 'web',    route: '/map',                                 caption: 'Gambar 3.x Peta interaktif dengan batas wilayah Indonesia' },
  { id: '29', name: 'peta-choropleth',            folder: 'bab3/peta',      bab: 'bab3', type: 'web',    route: '/map',                                 caption: 'Gambar 3.x Visualisasi choropleth data potensi pasar' },

  // Kelompok 13: Database
  { id: '30', name: 'struktur-folder-schema',     folder: 'bab3/database',  bab: 'bab3', type: 'code',   route: 'apps/web/src/lib/db/schema/',         caption: 'Gambar 3.x Struktur file schema Drizzle ORM' },
  { id: '31', name: 'potongan-schema-auth',       folder: 'bab3/database',  bab: 'bab3', type: 'code',   route: 'apps/web/src/lib/db/schema/auth.ts',  caption: 'Gambar 3.x Definisi tabel autentikasi pada schema Drizzle' },
  { id: '32', name: 'daftar-tabel-drizzle',       folder: 'bab3/database',  bab: 'bab3', type: 'manual', route: 'MANUAL — http://localhost:4983 [PERLU VERIFIKASI PORT]', caption: 'Gambar 3.x Seluruh tabel database pada Drizzle Studio' },
  { id: '33', name: 'erd-22-tabel',              folder: 'bab3/database',  bab: 'bab3', type: 'manual', route: 'MANUAL — Drizzle Studio → tab Relations/ERD', caption: 'Gambar 3.x Entity Relationship Diagram 22 tabel database' },

  // Kelompok 14: API
  { id: '34', name: 'struktur-router-orpc',       folder: 'bab3/api',       bab: 'bab3', type: 'code',   route: 'apps/web/src/lib/orpc/router/index.ts', caption: 'Gambar 3.x Struktur router oRPC utama' },
  { id: '35', name: 'response-health-check',     folder: 'bab3/api',       bab: 'bab3', type: 'api',    route: '/api/rpc/healthCheck',                 caption: 'Gambar 3.x Response endpoint health check' },
  { id: '36', name: 'response-zod-error',         folder: 'bab3/api',       bab: 'bab3', type: 'api',    route: '/api/rpc/admin.stall.create',          caption: 'Gambar 3.x Response validasi error dari Zod' },

  // Kelompok 15: Authentication Code
  { id: '37', name: 'route-guard-admin',          folder: 'bab3/auth',      bab: 'bab3', type: 'code',   route: 'apps/web/src/routes/admin/route.tsx',  caption: 'Gambar 3.x Implementasi route guard pada halaman admin' },
  { id: '38', name: 'konfigurasi-better-auth',    folder: 'bab3/auth',      bab: 'bab3', type: 'code',   route: 'apps/web/src/lib/auth/index.ts',       caption: 'Gambar 3.x Konfigurasi Better Auth dengan adapter Drizzle' },

  // Kelompok 16: Deployment
  { id: '39', name: 'file-netlify-toml',          folder: 'bab3/deployment', bab: 'bab3', type: 'code',  route: 'netlify.toml',                         caption: 'Gambar 3.x Konfigurasi deployment Netlify' },
  { id: '40', name: 'file-package-json',          folder: 'bab2',            bab: 'bab2', type: 'code',  route: 'apps/web/package.json',                caption: 'Gambar 2.x Dependency utama aplikasi pada package.json' },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function outPath(def: ScreenshotTask): string {
  const dir = resolve(OUT_DIR, def.folder);
  ensureDir(dir);
  return resolve(dir, `screenshot_${def.id}.png`);
}

async function login(page: Page) {
  console.log(`  → Login as ${ADMIN_EMAIL}`);
  // Navigate to any page first to initialise the browser context
  await page.goto('/auth/login', { waitUntil: 'load', timeout: 15_000 });
  // Sign in via Better Auth API directly (bypasses React hydration issues)
  const resp = await page.request.post('/api/auth/sign-in/email', {
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    timeout: 15_000,
  });
  if (!resp.ok()) {
    const body = await resp.text();
    console.error(`  ✗ LOGIN GAGAL!`);
    console.error(`    Status: ${resp.status()} ${resp.statusText()}`);
    console.error(`    Body: ${body.slice(0, 500)}`);
    console.error(`    Email: ${ADMIN_EMAIL}`);
    console.error(`    Password: ${'*'.repeat(ADMIN_PASSWORD.length)}`);
    throw new Error(`Login API gagal: ${resp.status()} — ${body.slice(0, 200)}`);
  }
  console.log('  ✓ Login berhasil via API, session cookies tersimpan');
}

async function clickModalTrigger(page: Page, buttonText: string) {
  const btn = page.locator('button').filter({ hasText: buttonText });
  await btn.first().click({ timeout: 5_000 });
  await page.waitForTimeout(1_500);
}

async function captureCodeView(page: Page, fileRoute: string): Promise<string | null> {
  const projectRoot = resolve('.');
  const fullPath = resolve(projectRoot, fileRoute);
  let content: string;
  let fileName = fileRoute.split('/').pop() || fileRoute;
  let isDir = false;

  try {
    if (existsSync(fullPath)) {
      const stat = await import('node:fs').then(fs => fs.statSync(fullPath));
      if (stat.isDirectory()) {
        isDir = true;
        const files = (await import('node:fs')).readdirSync(fullPath);
        content = files.map(f => `📁 ${f}`).join('\n');
        fileName = fileRoute.split('/').pop() || 'folder';
      } else {
        content = readFileSync(fullPath, 'utf-8');
      }
    } else {
      content = `// File tidak ditemukan: ${fileRoute}`;
    }
  } catch {
    content = `// Error membaca file: ${fileRoute}`;
  }

  const escaped = content
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lines = content.split('\n');
  const lineCount = lines.length;
  const pad = String(lineCount).length;
  const lineNumbers = lines.map((_, i) =>
    String(i + 1).padStart(pad, ' ')
  ).join('\n');

  const lang = fileRoute.endsWith('.json') ? 'json' :
    fileRoute.endsWith('.toml') ? 'ini' : 'typescript';

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${fileName}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#1e1e1e;color:#d4d4d4;font-family:'Cascadia Code','Fira Code','JetBrains Mono','Consolas',monospace;font-size:13px;line-height:1.6}
  .header{background:#2d2d2d;padding:12px 20px;border-bottom:1px solid #404;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:10}
  .header .path{color:#9cdcfe;font-size:14px;font-weight:500}
  .header .meta{color:#888;font-size:12px;margin-left:auto}
  .code-wrap{display:flex}
  .ln{color:#858585;text-align:right;padding:16px 12px 16px 16px;user-select:none;border-right:1px solid #333;background:#252526;min-width:${pad * 8 + 32}px;white-space:pre;font-size:13px;line-height:1.6}
  .code{padding:16px 20px;white-space:pre;overflow-x:auto;font-size:13px;line-height:1.6;word-break:break-all}
  .comment{color:#6a9955}.keyword{color:#569cd6}.string{color:#ce9178}.number{color:#b5cea8}.prop{color:#9cdcfe}
</style></head>
<body>
<div class="header"><span class="path">${fileRoute}</span><span class="meta">${lang} · ${lineCount} lines${isDir ? ' · folder' : ''}</span></div>
<div class="code-wrap"><div class="ln">${lineNumbers}</div><div class="code">${escaped}</div></div>
</body></html>`;

  const htmlPath = resolve(OUT_DIR, `.code-${fileName.replace(/[^a-zA-Z0-9]/g, '-')}.html`);
  writeFileSync(htmlPath, html, 'utf-8');
  await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1_000);
  return htmlPath;
}

async function captureApiView(page: Page, route: string): Promise<void> {
  const origin = new URL(page.url()).origin;
  const url = `${origin}${route}`;
  try {
    const resp = await page.request.get(url, { timeout: 10_000 });
    const ct = resp.headers()['content-type'] || '';
    let body: string;
    if (ct.includes('json')) {
      body = JSON.stringify(await resp.json(), null, 2);
    } else {
      body = await resp.text();
    }
    const statusOk = resp.status() < 400;
    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>API ${route}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}
body{background:#1e1e1e;color:#d4d4d4;font-family:'Consolas',monospace;font-size:14px}
.hdr{background:#2d2d2d;padding:14px 20px;border-bottom:1px solid #404;display:flex;gap:16px;align-items:center;position:sticky;top:0}
.url{color:#9cdcfe;font-weight:500}.status{padding:3px 10px;border-radius:4px;font-weight:bold;font-size:13px;background:${statusOk ? '#1a3a2a' : '#3a1a1a'};color:${statusOk ? '#4ec9b0' : '#f44747'}}
pre{padding:20px;white-space:pre-wrap;word-break:break-word;font-size:13px}
</style></head>
<body>
<div class="hdr"><span class="url">GET ${route}</span><span class="status">${resp.status()} ${resp.statusText()}</span></div>
<pre>${body}</pre>
</body></html>`;
    const htmlPath = resolve(OUT_DIR, `.api-${route.replace(/[/\\:]/g, '-')}.html`);
    writeFileSync(htmlPath, html, 'utf-8');
    await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await page.setContent(`<pre style="background:#1e1e1e;color:#f44747;padding:40px;font-size:16px;">API Error: ${msg}</pre>`);
  }
  await page.waitForTimeout(500);
}

async function makeManualPlaceholder(page: Page, def: ScreenshotTask) {
  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Manual: ${def.name}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1e1e1e;color:#d4d4d4;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
.card{background:#2d2d2d;border-radius:12px;padding:40px;max-width:640px;text-align:center;border:1px solid #404}
.card h2{color:#f0c040;font-size:22px;margin-bottom:10px}
.card .emoji{font-size:48px;margin-bottom:12px}
.card .caption{color:#aaa;font-size:14px;line-height:1.6;margin-bottom:12px}
.card .route{background:#1a1a1a;padding:8px 16px;border-radius:6px;color:#9cdcfe;font-family:monospace;font-size:13px;display:inline-block;margin-top:8px}
.card .note{color:#f0c040;font-size:13px;margin-top:20px;padding-top:16px;border-top:1px solid #404}
</style></head>
<body>
<div class="card">
<div class="emoji">📷</div>
<h2>#${def.id} — ${def.name}</h2>
<p class="caption">${def.caption}</p>
<div class="route">${def.route}</div>
<p class="note">⚠️ Ambil screenshot manual dan simpan sebagai screenshot_${def.id}.png</p>
</div></body></html>`;
  await page.setContent(html);
  await page.waitForTimeout(300);
}

// ─── Resolve stall ID from admin page ───────────────────────────────────────

let _stallId: string | null = null;

async function resolveStallId(page: Page): Promise<string | null> {
  if (_stallId) return _stallId;
  try {
    await page.goto('/admin/stall', { waitUntil: 'load' });
    await page.waitForSelector('table tbody tr', { timeout: 10_000 });
    _stallId = await page.locator('table tbody tr').first().getAttribute('key');
    if (!_stallId) {
      const cells = page.locator('table tbody tr').first().locator('td');
      const count = await cells.count();
      if (count > 0) {
        const editBtn = page.locator('table tbody tr').first().locator('button').filter({ hasText: 'Edit' });
        if (await editBtn.count() > 0) {
          await editBtn.click();
          await page.waitForTimeout(500);
          _stallId = await page.locator('[data-stall-id]').getAttribute('data-stall-id').catch(() => null);
          await page.locator('button').filter({ hasText: /cancel|close|batal/i }).first().click().catch(() => {});
          await page.waitForTimeout(300);
        }
      }
    }
  } catch {
    _stallId = null;
  }
  return _stallId;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe.serial('Capture 40 Report Screenshots', () => {
  let serializedAuth: string | null = null;

  for (const def of ALL) {
    test(`[${def.id}] ${def.name}`, async ({ page }) => {
      test.setTimeout(120_000);
      const output = outPath(def);

      try {
        // ── Manual ──────────────────────────────────────────────────────
        if (def.type === 'manual') {
          await makeManualPlaceholder(page, def);
          await page.screenshot({ path: output, fullPage: true });
          test.info().annotations.push({ type: 'manual', description: def.route });
          console.log(`  ⚠️  ${def.id}. ${def.name} → MANUAL (placeholder saved)`);
          return;
        }

        // ── Code viewer ─────────────────────────────────────────────────
        if (def.type === 'code') {
          await captureCodeView(page, def.route);
          await page.screenshot({ path: output, fullPage: true });
          console.log(`  ✓ ${def.id}. ${def.name} → screenshots/${def.folder}/screenshot_${def.id}.png`);
          return;
        }

        // ── API response ────────────────────────────────────────────────
        if (def.type === 'api') {
          if (def.id === '36') {
            try {
              const resp = await page.request.post(def.route, {
                data: { name: '', address: null },
                timeout: 10_000,
              });
              const body = resp.ok()
                ? JSON.stringify(await resp.json(), null, 2)
                : `${resp.status()} ${resp.statusText()}\n${await resp.text()}`;
              await page.setContent(`<pre style="background:#1e1e1e;color:#d4d4d4;padding:40px;font-size:14px;font-family:monospace;white-space:pre-wrap">${body}</pre>`);
            } catch {
              await page.setContent(`<pre style="background:#1e1e1e;color:#f44747;padding:40px;font-size:16px;">POST ${def.route} failed</pre>`);
            }
          } else {
            await captureApiView(page, def.route);
          }
          await page.screenshot({ path: output, fullPage: true });
          console.log(`  ✓ ${def.id}. ${def.name} → screenshots/${def.folder}/screenshot_${def.id}.png`);
          return;
        }

        // ── Web or modal page ───────────────────────────────────────────

        // Restore auth or login once
        const needsAuth = def.route.startsWith('/admin') || def.route.startsWith('/map');
        if (needsAuth) {
          if (serializedAuth) {
            const state = JSON.parse(serializedAuth) as {
              cookies: Array<{ name: string; value: string; domain: string; path: string; httpOnly?: boolean; secure?: boolean; sameSite?: string }>;
            };
            await page.context().addCookies(state.cookies);
          } else {
            await login(page);
            serializedAuth = JSON.stringify(await page.context().storageState());
          }
        }

        // Navigate to the page
        await page.goto(def.route, { waitUntil: 'load', timeout: 30_000 });

        // Wait for body to render
        await page.waitForTimeout(2_000);
        await page.locator('body').waitFor({ state: 'visible', timeout: 10_000 });

        // Handle interactions
        if (def.id === '05') {
          await page.fill('#email', 'wrong@email.com');
          await page.fill('#password', 'wrongpass');
          await page.click('button[type="submit"]');
          await page.waitForTimeout(2_000);
        } else if (def.id === '06') {
          await page.fill('#email', ADMIN_EMAIL);
          await page.fill('#password', ADMIN_PASSWORD);
          await page.click('button[type="submit"]');
          await page.waitForURL('**/admin', { timeout: 15_000 });
          await page.waitForTimeout(2_000);
        } else if (def.id === '09') {
          // Scroll down to program cards
          await page.evaluate(() => window.scrollBy(0, 700));
          await page.waitForTimeout(1_000);
        } else if (def.id === '11') {
          // Sidebar — clip left 320px
          await page.screenshot({ path: output, clip: { x: 0, y: 0, width: 320, height: 900 } });
          console.log(`  ✓ ${def.id}. ${def.name} → screenshots/${def.folder}/screenshot_${def.id}.png`);
          return;
        } else if (def.id === '13') {
          await clickModalTrigger(page, /tambah|add/i);
        } else if (def.id === '24') {
          await clickModalTrigger(page, /add stall/i);
        } else if (def.id === '25') {
          await page.waitForSelector('table tbody tr', { timeout: 10_000 });
          await clickModalTrigger(page, 'Products');
        } else if (def.id === '26') {
          // Resolve stall ID dynamically
          const sid = await resolveStallId(page);
          if (sid) {
            await page.goto(`/stall/${sid}`, { waitUntil: 'load', timeout: 20_000 });
            await page.waitForTimeout(2_000);
          } else {
            console.log(`  ⚠️  ${def.id}. ${def.name} → no stall ID found, using placeholder`);
            await makeManualPlaceholder(page, def);
            await page.screenshot({ path: output, fullPage: true });
            return;
          }
        } else if (def.id === '08') {
          // Hero — clip top portion
          await page.screenshot({ path: output, clip: { x: 0, y: 0, width: 1440, height: 700 } });
          console.log(`  ✓ ${def.id}. ${def.name} → screenshots/${def.folder}/screenshot_${def.id}.png`);
          return;
        }

        // Take screenshot (with retry for protocol errors)
        await page.waitForTimeout(1_000);
        try {
          await page.screenshot({ path: output, fullPage: true });
        } catch {
          await page.waitForTimeout(3_000);
          await page.screenshot({ path: output, fullPage: false });
        }
        console.log(`  ✓ ${def.id}. ${def.name} → screenshots/${def.folder}/screenshot_${def.id}.png`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  ✗ ${def.id}. ${def.name} FAILED: ${msg}`);
        try {
          await page.setContent(`<pre style="background:#1e1e1e;color:#f44747;padding:40px;font-size:16px;font-family:monospace">
ERROR: ${msg}
Task: ${def.id}. ${def.name}
Route: ${def.route}
Type: ${def.type}
</pre>`);
          await page.screenshot({ path: output, fullPage: true });
        } catch {
          // last-resort empty
        }
        // Re-throw so playwright reports correctly
        throw err;
      }
    });
  }
});
