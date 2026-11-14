import { defineConfig } from 'vite';

// GitHub Pages serves a project site at https://<user>.github.io/<repo>/, so the build needs
// base '/<repo>/'. The deploy workflow sets VITE_BASE automatically; for a custom domain or a
// <user>.github.io repo set the repository variable VITE_BASE to '/'. Locally it stays '/'.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: { port: 5173, strictPort: true },
});
