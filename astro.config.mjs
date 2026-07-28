// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import { isSitemapExcluded } from './src/lib/contentManifest.mjs';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    // Hand-rolled hreflang (src/lib/i18n.ts) is the only i18n signal — no
    // sitemap `i18n` option. The filter excludes legacy (locale-free) stub
    // URLs and fallback-rendered (untranslated) locale/slug combos, so only
    // real, locale-prefixed content and locale roots are indexed.
    sitemap({ filter: (page) => !isSitemapExcluded(page) }),
  ],
  site: 'https://GormWH.github.io',
});