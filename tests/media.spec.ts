import { test, expect } from '@playwright/test';

const BASE = '/caco-web';

test.describe('Media page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/media`);
  });

  test('renders at /media', async ({ page }) => {
    await expect(page).toHaveURL(/\/media/);
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Media.*Cacophony/);
  });

  test('renders the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Media', level: 1 })).toBeVisible();
  });

  test('shows hero subtitle', async ({ page }) => {
    await expect(page.locator('.hero-sub')).toContainText('Live performances');
  });

  test('shows Live Performances section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Live Performances', level: 2 })).toBeVisible();
  });

  test('shows Music Videos section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Music Videos', level: 2 })).toBeVisible();
  });

  test('embeds videos from media.json', async ({ page }) => {
    const iframes = page.locator('iframe');
    const count = await iframes.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('video iframes use youtube-nocookie.com', async ({ page }) => {
    const iframes = page.locator('iframe');
    const count = await iframes.count();
    for (let i = 0; i < count; i++) {
      const src = await iframes.nth(i).getAttribute('src');
      expect(src).toContain('youtube-nocookie.com');
    }
  });

  test('video iframes have accessible titles', async ({ page }) => {
    const iframes = page.locator('iframe');
    const count = await iframes.count();
    for (let i = 0; i < count; i++) {
      const title = await iframes.nth(i).getAttribute('title');
      expect(title).toBeTruthy();
    }
  });

  test('shows video titles in the page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'The Ninja', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Speed Metal Symphony/, level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Go Off!/, level: 3 })).toBeVisible();
  });

  test('video grid is responsive — single column on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const grid = page.locator('.video-grid').first();
    const style = await grid.evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
    // On mobile, grid should resolve to a single column (no repeat)
    expect(style).not.toMatch(/\d+px \d+px/);
  });

  test('no horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('has navigation link to media page', async ({ page }) => {
    const toggle = page.locator('.nav-toggle');
    if (await toggle.isVisible()) {
      await toggle.click();
    }
    const navLink = page.locator('#nav-menu').getByRole('link', { name: 'Media' });
    await expect(navLink).toBeVisible();
  });
});
