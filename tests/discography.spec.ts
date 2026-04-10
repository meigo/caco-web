import { test, expect } from '@playwright/test';

const BASE = '/caco-web';

test.describe('Discography page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/discography`);
  });

  test('renders at /discography', async ({ page }) => {
    await expect(page).toHaveURL(/\/discography/);
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Discography.*Cacophony/);
  });

  test('renders the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Discography', level: 1 })).toBeVisible();
  });

  test('displays both albums', async ({ page }) => {
    const cards = page.locator('article.album-card');
    await expect(cards).toHaveCount(2);
  });

  test('shows Speed Metal Symphony album', async ({ page }) => {
    const card = page.locator('article.album-card').nth(0);
    await expect(card).toContainText('Speed Metal Symphony');
    await expect(card).toContainText('1987');
    await expect(card).toContainText('Shrapnel Records');
  });

  test('shows Go Off! album', async ({ page }) => {
    const card = page.locator('article.album-card').nth(1);
    await expect(card).toContainText('Go Off!');
    await expect(card).toContainText('1988');
    await expect(card).toContainText('Shrapnel Records');
  });

  test('shows catalog numbers', async ({ page }) => {
    await expect(page.getByText('SH-1023')).toBeVisible();
    await expect(page.getByText('SH-1036')).toBeVisible();
  });

  test('album art placeholders are present with titles', async ({ page }) => {
    const artBlocks = page.locator('.album-art');
    await expect(artBlocks).toHaveCount(2);
    await expect(artBlocks.nth(0)).toContainText('Speed Metal Symphony');
    await expect(artBlocks.nth(1)).toContainText('Go Off!');
  });

  test('track listings are visible for both albums', async ({ page }) => {
    const trackLists = page.locator('.track-list');
    await expect(trackLists).toHaveCount(2);
  });

  test('Speed Metal Symphony has correct tracks', async ({ page }) => {
    const firstList = page.locator('.track-list').nth(0);
    await expect(firstList).toContainText('The Ninja');
    await expect(firstList).toContainText('Speed Metal Symphony');
    await expect(firstList).toContainText('Where My Fortune Lies');
  });

  test('Go Off! has correct tracks', async ({ page }) => {
    const secondList = page.locator('.track-list').nth(1);
    await expect(secondList).toContainText('Stranger');
    await expect(secondList).toContainText('Floating World');
    await expect(secondList).toContainText('Imaginary Window');
  });

  test('shows album descriptions', async ({ page }) => {
    await expect(page.getByText(/neoclassical/i).first()).toBeVisible();
    await expect(page.getByText(/Floating World/).first()).toBeVisible();
  });

  test('shows personnel for both albums', async ({ page }) => {
    await expect(page.getByText(/Marty Friedman/).first()).toBeVisible();
    await expect(page.getByText(/Jason Becker/).first()).toBeVisible();
    await expect(page.getByText('Peter Marrino').first()).toBeVisible();
    await expect(page.getByText('Shane Phillip').first()).toBeVisible();
  });

  test('page uses BaseLayout (has nav and footer)', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Discography nav link is marked as current page', async ({ page }) => {
    const toggle = page.locator('.nav-toggle');
    if (await toggle.isVisible()) {
      await toggle.click();
    }
    const link = page.locator('#nav-menu').getByRole('link', { name: 'Discography' });
    await expect(link).toHaveAttribute('aria-current', 'page');
  });

  test('no horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
