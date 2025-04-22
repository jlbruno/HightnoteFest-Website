// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  server: {
    port: 3000,
    open: true,
    // Preserve BrowserSync's behavior of reloading on HTML changes
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: '/index.html'
      }
    }
  }
});