import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  site: 'https://djk-bocklemuend.de',
  adapter: vercel(),
  integrations: [react(), tailwind(), keystatic(), sitemap(), markdoc()],
  vite: {
    envPrefix: ['VITE_', 'PUBLIC_', 'KEYSTATIC_'],
    ssr: {
      noExternal: ['@keystar/ui', /@react-aria/, /@internationalized/],
    },
  },
});
