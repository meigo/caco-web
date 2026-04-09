import { test, expect } from '@playwright/test';

const BASE = '/caco-web';

test.describe('History page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/history`);
  });

  test('renders at /history', async ({ page }) => {
    await expect(page).toHaveURL(/\/history/);
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/History.*Cacophony/);
  });

  test('renders the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'The Story of Cacophony', level: 1 })).toBeVisible();
  });

  test('shows formation year and origin', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero).toContainText('1986');
    await expect(hero).toContainText('San Francisco');
  });

  test('shows timeline section with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Timeline', level: 2 })).toBeVisible();
  });

  test('timeline contains key years', async ({ page }) => {
    const timeline = page.locator('.timeline');
    await expect(timeline).toContainText('1986');
    await expect(timeline).toContainText('1987');
    await expect(timeline).toContainText('1988');
    await expect(timeline).toContainText('1989');
  });

  test('timeline mentions both albums', async ({ page }) => {
    const timeline = page.locator('.timeline');
    await expect(timeline).toContainText('Speed Metal Symphony');
    await expect(timeline).toContainText('Go Off!');
  });

  test('shows guitar virtuosity section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Guitar Virtuosity/i, level: 2 })).toBeVisible();
  });

  test('guitar section mentions shred techniques', async ({ page }) => {
    const styleSection = page.locator('#style-heading').locator('..');
    // Check the parent section has sweep picking mentioned
    await expect(page.getByText('Sweep picking', { exact: false })).toBeVisible();
    await expect(page.getByText('Alternate picking', { exact: false })).toBeVisible();
  });

  test('shows members section with Marty Friedman and Jason Becker', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Guitarists/i, level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Marty Friedman', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jason Becker', level: 3 })).toBeVisible();
  });

  test('member cards link to Wikipedia', async ({ page }) => {
    const links = page.locator('.wiki-link');
    await expect(links).toHaveCount(2);
    await expect(links.nth(0)).toHaveAttribute('href', /wikipedia\.org/);
    await expect(links.nth(1)).toHaveAttribute('href', /wikipedia\.org/);
  });

  test('shows influences and legacy section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Influences.*Legacy/i, level: 2 })).toBeVisible();
  });

  test('legacy section mentions Megadeth and ALS', async ({ page }) => {
    const legacySection = page.locator('#legacy-heading').locator('xpath=ancestor::section');
    await expect(legacySection).toContainText('Megadeth');
    await expect(legacySection).toContainText('ALS');
  });

  test('page uses BaseLayout (has nav and footer)', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('History nav link is marked as current page', async ({ page }) => {
    const toggle = page.locator('.nav-toggle');
    if (await toggle.isVisible()) {
      await toggle.click();
    }
    const historyLink = page.locator('#nav-menu').getByRole('link', { name: 'History' });
    await expect(historyLink).toHaveAttribute('aria-current', 'page');
  });

  test('track listings are visible for both albums', async ({ page }) => {
    const trackLists = page.locator('.track-list');
    await expect(trackLists).toHaveCount(2);
    // Speed Metal Symphony tracks
    await expect(trackLists.nth(0)).toContainText('The Ninja');
    // Go Off! tracks
    await expect(trackLists.nth(1)).toContainText('Stranger');
  });
});
