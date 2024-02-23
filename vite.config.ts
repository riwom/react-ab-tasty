import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'react-ab-tasty',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts()],
});
