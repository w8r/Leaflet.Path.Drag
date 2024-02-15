import { defineConfig } from 'vite';

const extensions = {
  es: 'mjs',
  cjs: 'cjs',
  umd: 'js',
};

export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'umd', 'cjs'],
      entry: 'src/index.mjs',
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
