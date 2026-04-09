import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
  },
});
