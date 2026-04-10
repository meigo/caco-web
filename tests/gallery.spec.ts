import { test, expect } from '@playwright/test';

const BASE = '/caco-web';

test.describe('Gallery page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/gallery`);
  });

  test('renders at /gallery', async ({ page }) => {
    await expect(page).toHaveURL(/\/gallery/);
    await expect(page).toHaveTitle(/Gallery.*Cacophony/);
  });

  test('shows page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Gallery/i })).toBeVisible();
  });

  test('shows band photos section', async ({ page }) => {
    const section = page.getByRole('region', { name: 'Band photos' });
    await expect(section).toBeVisible();
    await expect(section.getByRole('heading', { name: /The Band/i })).toBeVisible();
  });

  test('shows Marty Friedman photos section', async ({ page }) => {
    const section = page.getByRole('region', { name: 'Marty Friedman photos' });
    await expect(section).toBeVisible();
    await expect(section.getByRole('heading', { name: /Marty Friedman/i })).toBeVisible();
  });

  test('shows Jason Becker photos section', async ({ page }) => {
    const section = page.getByRole('region', { name: 'Jason Becker photos' });
    await expect(section).toBeVisible();
    await expect(section.getByRole('heading', { name: /Jason Becker/i })).toBeVisible();
  });

  test('displays at least one photo of both members together', async ({ page }) => {
    const bandSection = page.getByRole('region', { name: 'Band photos' });
    const figures = bandSection.locator('figure');
    await expect(figures).toHaveCount(1);
  });

  test('all photos have descriptive alt text', async ({ page }) => {
    const images = page.locator('.photo-img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(10);
    }
  });

  test('all photos have captions', async ({ page }) => {
    const captions = page.locator('.caption-text');
    const count = await captions.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const text = await captions.nth(i).textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('all photos have attribution credits', async ({ page }) => {
    const credits = page.locator('.caption-credit');
    const count = await credits.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const text = await credits.nth(i).textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('photos use the Astro Image component (renders as img elements)', async ({ page }) => {
    const images = page.locator('.photo-img');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test('photos are rendered with grayscale CSS filter', async ({ page }) => {
    const firstImg = page.locator('.photo-img').first();
    await expect(firstImg).toBeVisible();
    const filter = await firstImg.evaluate(
      (el) => window.getComputedStyle(el).filter
    );
    expect(filter).toContain('grayscale');
  });

  test('Marty Friedman section contains multiple photos', async ({ page }) => {
    const section = page.getByRole('region', { name: 'Marty Friedman photos' });
    const figures = section.locator('figure');
    const count = await figures.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('inherits BaseLayout header with nav', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible();
    const toggle = page.locator('.nav-toggle');
    if (await toggle.isVisible()) {
      await toggle.click();
    }
    await expect(
      page.locator('#nav-menu').getByRole('link', { name: 'Gallery' })
    ).toHaveAttribute('aria-current', 'page');
  });

  test('page has no horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}/gallery`);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width ?? 0;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test('photo grid is responsive — single column on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}/gallery`);
    const grid = page.locator('.photo-grid').first();
    await expect(grid).toBeVisible();
  });

  test('figures have accessible labels', async ({ page }) => {
    const figures = page.locator('figure[aria-label]');
    const count = await figures.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const label = await figures.nth(i).getAttribute('aria-label');
      expect(label?.trim()).toBeTruthy();
    }
  });
});
