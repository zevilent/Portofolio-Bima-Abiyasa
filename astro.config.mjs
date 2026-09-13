import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages **project site**: https://zevilent.github.io/Portofolio-Bima-Abiyasa/
// site + base are the single source of truth for every absolute URL (canonical, og:url,
// sitemap, OG-image endpoint). Internal links go through withBase() in src/lib/url.ts.
export const SITE = 'https://zevilent.github.io';
export const BASE = '/Portofolio-Bima-Abiyasa';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
