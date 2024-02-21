import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './test/',
  test: {
    include: ['test/**/*.test.ts'],
    testTimeout: 10_000,
    hookTimeout: 10_000,
    //environment: 'jsdom',
    setupFiles: ['test/setup.ts'],

    browser: {
      provider: 'playwright',
      enabled: true,
      name: 'chromium',
    },

    coverage: {
      reporter: ['json', 'cobertura'],
      all: true,
      reportsDirectory: 'reports/coverage',
    },
  },
});
