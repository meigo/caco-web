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

  test('shows page label above the heading', async ({ page }) => {
    await expect(page.locator('.page-label')).toContainText('Cacophony');
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

  test('shows video thumbnails on load (facade — no iframes initially)', async ({ page }) => {
    const iframes = page.locator('iframe');
    await expect(iframes).toHaveCount(0);
    const thumbnails = page.locator('.video-thumbnail');
    const count = await thumbnails.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('shows play buttons for each video', async ({ page }) => {
    const playBtns = page.locator('.play-btn');
    const count = await playBtns.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('play buttons have accessible labels', async ({ page }) => {
    const playBtns = page.locator('.play-btn');
    const count = await playBtns.count();
    for (let i = 0; i < count; i++) {
      const label = await playBtns.nth(i).getAttribute('aria-label');
      expect(label).toMatch(/^Play /);
    }
  });

  test('clicking play button loads youtube-nocookie iframe', async ({ page }) => {
    const firstPlay = page.locator('.play-btn').first();
    await firstPlay.click();
    const iframe = page.locator('iframe').first();
    await expect(iframe).toBeVisible();
    const src = await iframe.getAttribute('src');
    expect(src).toContain('youtube-nocookie.com');
  });

  test('clicking play button loads iframe with accessible title', async ({ page }) => {
    await page.locator('.play-btn').first().click();
    const iframe = page.locator('iframe').first();
    const title = await iframe.getAttribute('title');
    expect(title).toBeTruthy();
  });

  test('shows video titles in the page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'The Ninja', level: 3 })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Speed Metal Symphony/, level: 3 }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: /Go Off!/, level: 3 })).toBeVisible();
  });

  test('video grid is responsive — single column on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const grid = page.locator('.video-grid').first();
    const style = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
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
