// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://meigo.github.io',
  base: '/caco-web',
  integrations: [sitemap()],
});
