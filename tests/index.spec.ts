import { test, expect } from '@playwright/test';

const BASE = '/caco-web';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/`);
  });

  test('renders at base path', async ({ page }) => {
    await expect(page).toHaveURL(/\/caco-web\//);
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Cacophony/);
  });

  test.describe('Hero CTA links', () => {
    test('Our Story link points to /caco-web/history', async ({ page }) => {
      const link = page.getByRole('link', { name: 'Our Story' });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `${BASE}/history`);
    });

    test('The Duo link points to /caco-web/members', async ({ page }) => {
      const link = page.getByRole('link', { name: 'The Duo' });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `${BASE}/members`);
    });
  });

  test.describe('Featured albums section', () => {
    test('album cards link to /caco-web/discography', async ({ page }) => {
      const albumCards = page.locator('.album-card');
      const count = await albumCards.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(albumCards.nth(i)).toHaveAttribute('href', `${BASE}/discography`);
      }
    });

    test('Full Discography button links to /caco-web/discography', async ({ page }) => {
      const link = page.getByRole('link', { name: 'Full Discography' });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `${BASE}/discography`);
    });
  });

  test.describe('Explore section links', () => {
    test('History explore card links to /caco-web/history', async ({ page }) => {
      const link = page.locator('.explore-card').filter({ hasText: 'History' });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `${BASE}/history`);
    });

    test('Members explore card links to /caco-web/members', async ({ page }) => {
      const link = page.locator('.explore-card').filter({ hasText: 'Members' });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `${BASE}/members`);
    });
  });

  test.describe('Navigation from home page', () => {
    test('Our Story link navigates to history page', async ({ page }) => {
      await page.getByRole('link', { name: 'Our Story' }).click();
      await expect(page).toHaveURL(/\/history/);
    });

    test('The Duo link navigates to members page', async ({ page }) => {
      await page.getByRole('link', { name: 'The Duo' }).click();
      await expect(page).toHaveURL(/\/members/);
    });
  });
});
