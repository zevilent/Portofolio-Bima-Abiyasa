import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config — local preview server, no external services.
 * M2 uses it for the review harness (screenshots) and axe checks; M3 adds the
 * capture script for the live project sites, M6 the full e2e gate.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile-chromium',
      use: {
        ...devices['Pixel 7'],
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'reduced-motion',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      },
    },
  ],
  webServer: {
    command: 'npm run build && npx astro preview --port 4321 --host 127.0.0.1',
    url: 'http://127.0.0.1:4321/Portofolio-Bima-Abiyasa/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
});
