import { defineConfig } from '@lingui/cli';

export default defineConfig({
  locales: ['en', 'id'],
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en',
  },
  catalogs: [
    // Global translations (header, common UI, shared components)
    {
      path: '<rootDir>/src/locales/global-{locale}',
      include: ['src/components/**', 'src/lib/**'],
      exclude: [
        '**/node_modules/**',
        'src/routes/**/-locales/**', // Exclude feature locales - they have their own catalogs
      ],
    },
    // Top-level pages and public feature pages
    {
      path: '<rootDir>/src/routes/-locales/pages-{locale}',
      include: ['src/routes/**'],
      exclude: [
        '**/node_modules/**',
        'src/routes/**/-locales/**',
        'src/routes/auth/**',
        'src/routes/todos/**',
        'src/routes/admin/**',
        'src/routes/map/**',
      ],
    },
    // Auth feature translations
    {
      path: '<rootDir>/src/routes/auth/-locales/auth-{locale}',
      include: ['src/routes/auth/**'],
      exclude: ['**/node_modules/**'],
    },
    // Todos feature translations
    {
      path: '<rootDir>/src/routes/todos/-locales/todos-{locale}',
      include: ['src/routes/todos/**'],
      exclude: ['**/node_modules/**'],
    },
    // Admin feature translations
    {
      path: '<rootDir>/src/routes/admin/-locales/admin-{locale}',
      include: ['src/routes/admin/**'],
      exclude: ['**/node_modules/**'],
    },
    // Map feature translations
    {
      path: '<rootDir>/src/routes/map/-locales/map-{locale}',
      include: ['src/routes/map/**'],
      exclude: ['**/node_modules/**'],
    },
  ],
  format: 'po',
  formatOptions: {
    lineNumbers: false,
  },
});
