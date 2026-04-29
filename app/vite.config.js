import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  server: { fs: { allow: [path.resolve(__dirname, '..')] } },
  resolve: {
    alias: {
      '@data': path.resolve(__dirname, '../data'),
      '@sketches': path.resolve(__dirname, '../assets/sketches')
    }
  }
});
