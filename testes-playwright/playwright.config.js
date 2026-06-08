import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:5174',
    trace: 'on-first-retry',
  },
  webServer: {
    command:
      'npm --prefix .. run dev -- --host 127.0.0.1 --port 5174 --strictPort --mode test',
    url: 'http://127.0.0.1:5174',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
