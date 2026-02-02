// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static',
  site: 'https://tools.yourdomain.com', // Replace with your Cloudflare Pages domain
  build: {
    format: 'directory',
  },
});
