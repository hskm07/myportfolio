import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://orbitto.example',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  output: 'static',
});
