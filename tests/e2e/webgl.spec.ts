import { test, expect } from '@playwright/test';

/**
 * WebGL lifecycle guarantees (brief §8.1, §7 law 3).
 *
 * These tests exist because they caught a real bug: page work that registers its own
 * disposer (the hero does — its disposer re-arms the WebGL boot) must not be torn down
 * by the same pass that consumed it. The rule is "duplicate init only"; a teardown is
 * never run speculatively.
 */
const BASE = '/Portofolio-Bima-Abiyasa/';

// The canvas-opening tests are about the animated tier, so the reduced-motion project
// (which intentionally has no canvas) skips them.
const withCanvas = test.describe.configure;
void withCanvas;

test('hero creates exactly one canvas and reports the chosen tier', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'reduced-motion', 'reduced motion never creates a canvas');
  await page.goto(BASE, { waitUntil: 'load' });
  await expect
    .poll(async () => page.locator('[data-webgl-host] canvas').count(), { timeout: 15_000 })
    .toBe(1);

  const tier = await page.locator('[data-webgl-host]').getAttribute('data-tier');
  expect(['full', 'lite']).toContain(tier);
  await expect(page.locator('[data-webgl-host]')).toHaveAttribute('data-ready', '');
});

test('an extra page-load event never destroys the running scene, and never adds a second canvas', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'reduced-motion', 'reduced motion never creates a canvas');
  await page.goto(BASE, { waitUntil: 'load' });
  await expect
    .poll(async () => page.locator('[data-webgl-host] canvas').count(), { timeout: 15_000 })
    .toBe(1);

  // Astro fires this event for the initial document and for every client-side
  // navigation. Firing it again must be a no-op: no duplicate init, no teardown.
  for (let i = 0; i < 3; i += 1) {
    await page.evaluate(() => document.dispatchEvent(new Event('astro:page-load')));
    await page.waitForTimeout(600);
    await expect(page.locator('[data-webgl-host] canvas')).toHaveCount(1);
  }
});

test('navigating away and back never leaves a second canvas', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'reduced-motion', 'reduced motion never creates a canvas');
  await page.goto(BASE, { waitUntil: 'load' });
  await expect
    .poll(async () => page.locator('canvas').count(), { timeout: 15_000 })
    .toBe(1);

  for (let round = 0; round < 2; round += 1) {
    await page.goto(`${BASE}404.html`, { waitUntil: 'load' });
    await expect(page.locator('canvas')).toHaveCount(0);

    await page.goto(BASE, { waitUntil: 'load' });
    await expect.poll(async () => page.locator('canvas').count(), { timeout: 15_000 }).toBe(1);
  }
});

test('reduced motion keeps the static fallback and creates no canvas', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BASE, { waitUntil: 'load' });
  await page.waitForTimeout(2500);

  await expect(page.locator('[data-webgl-host]')).toHaveAttribute('data-static', '');
  await expect(page.locator('[data-webgl-host] canvas')).toHaveCount(0);
  await expect(page.locator('[data-webgl-host] svg')).toBeVisible();
});
