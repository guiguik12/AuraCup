import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config.js';

export default defineConfig({
  ...baseConfig,
  reporter: 'html',
  webServer: {
    ...baseConfig.webServer,
    reuseExistingServer: true,
  },
});
