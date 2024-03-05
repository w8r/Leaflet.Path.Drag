import { defineConfig } from 'vite';

const extensions = {
  es: 'mjs',
  cjs: 'cjs',
  umd: 'js',
};

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.mjs',
      formats: ['es', 'umd', 'cjs'],
      name: require('./package.json').name,
      fileName: (format) => `index.${extensions[format]}`,
    },
    rollupOptions: {
      external: ['leaflet'],
      output: {
        globals: { leaflet: 'L' },
      },
    },
  },
  server: {
    open: true,
  },
});
