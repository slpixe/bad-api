import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: '/config/',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  },
  server: {
    middlewareMode: true,
    hmr: {
      host: 'localhost',
      port: 3000,
      protocol: 'ws'
    }
  }
});