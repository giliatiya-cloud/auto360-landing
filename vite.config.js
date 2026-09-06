import { defineConfig } from 'vite';

export default defineConfig({
  base: '/auto360-landing/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 4096,
  },
});
