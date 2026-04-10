import { test, expect } from '@playwright/test';

const BASE = '/caco-web';

test.describe('BaseLayout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/`);
  });

  test.describe('SEO meta tags', () => {
    test('has a title tag', async ({ page }) => {
      await expect(page).toHaveTitle(/Cacophony/);
    });

    test('has a description meta tag', async ({ page }) => {
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute('content', /.+/);
    });

    test('has Open Graph meta tags', async ({ page }) => {
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    });

    test('has Twitter card meta tags', async ({ page }) => {
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', /.+/);
    });
  });

  test.describe('Header navigation', () => {
    test('renders header with nav', async ({ page }) => {
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('header nav')).toBeVisible();
    });

    test('shows Cacophony logo/name', async ({ page }) => {
      const logo = page.locator('.logo');
      await expect(logo).toBeVisible();
      await expect(logo).toContainText('CACOPHONY');
    });

    test('has all six navigation links', async ({ page }) => {
      // Open the hamburger menu if visible (mobile viewport)
      const toggle = page.locator('.nav-toggle');
      if (await toggle.isVisible()) {
        await toggle.click();
      }
      const nav = page.locator('#nav-menu');
      await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'History' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Members' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Discography' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Media' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Gallery' })).toBeVisible();
    });

    test('Home link points to base path', async ({ page }) => {
      const toggle = page.locator('.nav-toggle');
      if (await toggle.isVisible()) {
        await toggle.click();
      }
      const homeLink = page.locator('#nav-menu').getByRole('link', { name: 'Home' });
      await expect(homeLink).toHaveAttribute('href', `${BASE}/`);
    });

    test('navigation links have correct hrefs', async ({ page }) => {
      const toggle = page.locator('.nav-toggle');
      if (await toggle.isVisible()) {
        await toggle.click();
      }
      const nav = page.locator('#nav-menu');
      await expect(nav.getByRole('link', { name: 'History' })).toHaveAttribute('href', `${BASE}/history`);
      await expect(nav.getByRole('link', { name: 'Members' })).toHaveAttribute('href', `${BASE}/members`);
      await expect(nav.getByRole('link', { name: 'Discography' })).toHaveAttribute('href', `${BASE}/discography`);
      await expect(nav.getByRole('link', { name: 'Media' })).toHaveAttribute('href', `${BASE}/media`);
      await expect(nav.getByRole('link', { name: 'Gallery' })).toHaveAttribute('href', `${BASE}/gallery`);
    });
  });

  test.describe('Footer', () => {
    test('renders footer', async ({ page }) => {
      await expect(page.locator('footer')).toBeVisible();
    });

    test('shows copyright notice', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toContainText('Cacophony');
    });

    test('has links to member Wikipedia pages', async ({ page }) => {
      const footer = page.locator('footer');
      const martyLink = footer.getByRole('link', { name: 'Marty Friedman' });
      const jasonLink = footer.getByRole('link', { name: 'Jason Becker' });

      await expect(martyLink).toBeVisible();
      await expect(jasonLink).toBeVisible();

      await expect(martyLink).toHaveAttribute('href', /wikipedia\.org/);
      await expect(jasonLink).toHaveAttribute('href', /wikipedia\.org/);
    });

    test('member Wikipedia links open in a new tab', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer.getByRole('link', { name: 'Marty Friedman' })).toHaveAttribute('target', '_blank');
      await expect(footer.getByRole('link', { name: 'Jason Becker' })).toHaveAttribute('target', '_blank');
    });
  });

  test.describe('Mobile viewport', () => {
    test('page has no horizontal scroll on mobile', async ({ page }) => {
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = page.viewportSize()?.width ?? 0;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('hamburger toggle button is visible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE}/`);
      await expect(page.locator('.nav-toggle')).toBeVisible();
    });

    test('mobile menu opens and closes via toggle', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      const toggle = page.locator('.nav-toggle');
      const menu = page.locator('#nav-menu');

      // Menu should be hidden initially
      await expect(menu).not.toHaveClass(/open/);

      // Open the menu
      await toggle.click();
      await expect(menu).toHaveClass(/open/);
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');

      // Close the menu
      await toggle.click();
      await expect(menu).not.toHaveClass(/open/);
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
