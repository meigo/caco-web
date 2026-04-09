import { test, expect } from '@playwright/test';

const BASE = '/caco-web';

test.describe('Members page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/members`);
  });

  test('renders at /members', async ({ page }) => {
    await expect(page).toHaveURL(/\/members/);
    await expect(page).toHaveTitle(/Members.*Cacophony/);
  });

  test('shows page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /The Members/i })).toBeVisible();
  });

  test.describe('Founding guitarists', () => {
    test('features Marty Friedman prominently', async ({ page }) => {
      const marty = page.getByRole('article', { name: 'Marty Friedman' });
      await expect(marty).toBeVisible();
      await expect(marty.getByRole('heading', { name: 'Marty Friedman' })).toBeVisible();
    });

    test('features Jason Becker prominently', async ({ page }) => {
      const jason = page.getByRole('article', { name: 'Jason Becker' });
      await expect(jason).toBeVisible();
      await expect(jason.getByRole('heading', { name: 'Jason Becker' })).toBeVisible();
    });

    test('shows role for each guitarist', async ({ page }) => {
      const guitarists = page.locator('.guitarist-role');
      await expect(guitarists.first()).toBeVisible();
    });

    test('shows bio for Marty Friedman', async ({ page }) => {
      const marty = page.getByRole('article', { name: 'Marty Friedman' });
      await expect(marty.locator('.guitarist-bio')).toContainText('Megadeth');
    });

    test('shows bio for Jason Becker', async ({ page }) => {
      const jason = page.getByRole('article', { name: 'Jason Becker' });
      await expect(jason.locator('.guitarist-bio')).toContainText('ALS');
    });

    test('Marty Friedman Wikipedia link opens in new tab', async ({ page }) => {
      const marty = page.getByRole('article', { name: 'Marty Friedman' });
      const link = marty.getByRole('link', { name: /Wikipedia/i });
      await expect(link).toHaveAttribute('href', /wikipedia\.org\/wiki\/Marty_Friedman/);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('Jason Becker Wikipedia link opens in new tab', async ({ page }) => {
      const jason = page.getByRole('article', { name: 'Jason Becker' });
      const link = jason.getByRole('link', { name: /Wikipedia/i });
      await expect(link).toHaveAttribute('href', /wikipedia\.org\/wiki\/Jason_Becker/);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('each guitarist card shows notable skills tags', async ({ page }) => {
      const marty = page.getByRole('article', { name: 'Marty Friedman' });
      await expect(marty.locator('.tags')).toBeVisible();

      const jason = page.getByRole('article', { name: 'Jason Becker' });
      await expect(jason.locator('.tags')).toBeVisible();
    });

    test('each guitarist card shows post-Cacophony career highlights', async ({ page }) => {
      const marty = page.getByRole('article', { name: 'Marty Friedman' });
      await expect(marty.locator('.career-list')).toContainText('Megadeth');

      const jason = page.getByRole('article', { name: 'Jason Becker' });
      await expect(jason.locator('.career-list')).toContainText('David Lee Roth');
    });
  });

  test.describe('Supporting members', () => {
    test('shows supporting members section', async ({ page }) => {
      const section = page.getByRole('region', { name: 'Supporting members' });
      await expect(section).toBeVisible();
    });

    test('includes Atma Anur', async ({ page }) => {
      const atma = page.getByRole('article', { name: 'Atma Anur' });
      await expect(atma).toBeVisible();
      await expect(atma.locator('.supporting-role')).toContainText('Drums');
    });

    test('includes Jimmy Waldo', async ({ page }) => {
      const jimmy = page.getByRole('article', { name: 'Jimmy Waldo' });
      await expect(jimmy).toBeVisible();
      await expect(jimmy.locator('.supporting-role')).toContainText('Keyboards');
    });

    test('includes Dave Meniketti', async ({ page }) => {
      const dave = page.getByRole('article', { name: 'Dave Meniketti' });
      await expect(dave).toBeVisible();
    });

    test('Atma Anur Wikipedia link opens in new tab', async ({ page }) => {
      const atma = page.getByRole('article', { name: 'Atma Anur' });
      const link = atma.getByRole('link', { name: /Wikipedia/i });
      await expect(link).toHaveAttribute('href', /wikipedia\.org/);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test.describe('Layout and accessibility', () => {
    test('inherits BaseLayout header with nav', async ({ page }) => {
      await expect(page.getByRole('banner')).toBeVisible();
      const toggle = page.locator('.nav-toggle');
      if (await toggle.isVisible()) {
        await toggle.click();
      }
      await expect(page.locator('#nav-menu').getByRole('link', { name: 'Members' })).toHaveAttribute('aria-current', 'page');
    });

    test('page has no horizontal scroll on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE}/members`);
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = page.viewportSize()?.width ?? 0;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('all external links have noopener noreferrer', async ({ page }) => {
      const externalLinks = page.locator('a[target="_blank"]');
      const count = await externalLinks.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(externalLinks.nth(i)).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });
});
