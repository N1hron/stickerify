import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      enabled: true,
      include: ['src'],
      exclude: [...coverageConfigDefaults.exclude, 'src/**/index.ts', 'src/main.tsx'],
    },
  },
});
