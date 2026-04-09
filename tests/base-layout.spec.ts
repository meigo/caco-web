import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', label: 'Home' },
  { path: '/history', label: 'History' },
  { path: '/members', label: 'Members' },
  { path: '/discography', label: 'Discography' },
];

test.describe('BaseLayout — header', () => {
  test('renders site title "Cacophony"', async ({ page }) => {
    await page.goto('/');
    const title = page.locator('header .site-title');
    await expect(title).toHaveText('Cacophony');
  });

  test('site title links to home', async ({ page }) => {
    await page.goto('/history');
    const title = page.locator('header .site-title');
    await expect(title).toHaveAttribute('href', '/');
  });

  test('renders all four navigation links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('header nav');
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Members' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Discography' })).toBeVisible();
  });

  test('navigation links have correct hrefs', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('header nav');
    await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(nav.getByRole('link', { name: 'History' })).toHaveAttribute('href', '/history');
    await expect(nav.getByRole('link', { name: 'Members' })).toHaveAttribute('href', '/members');
    await expect(nav.getByRole('link', { name: 'Discography' })).toHaveAttribute('href', '/discography');
  });
});

test.describe('BaseLayout — active nav highlighting', () => {
  for (const { path, label } of pages) {
    test(`"${label}" is active on ${path}`, async ({ page }) => {
      await page.goto(path);
      const nav = page.locator('header nav');
      const activeLink = nav.getByRole('link', { name: label });
      await expect(activeLink).toHaveAttribute('aria-current', 'page');
      await expect(activeLink).toHaveClass(/active/);
    });

    test(`other links are not active on ${path}`, async ({ page }) => {
      await page.goto(path);
      const nav = page.locator('header nav');
      for (const { label: otherLabel } of pages) {
        if (otherLabel === label) continue;
        const link = nav.getByRole('link', { name: otherLabel });
        await expect(link).not.toHaveAttribute('aria-current', 'page');
        await expect(link).not.toHaveClass(/active/);
      }
    });
  }
});

test.describe('BaseLayout — footer', () => {
  test('renders footer on every page', async ({ page }) => {
    for (const { path } of pages) {
      await page.goto(path);
      await expect(page.locator('footer')).toBeVisible();
    }
  });

  test('footer contains credit text', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText('Cacophony');
  });
});

test.describe('BaseLayout — layout consistency', () => {
  test('all pages share the same header', async ({ page }) => {
    for (const { path } of pages) {
      await page.goto(path);
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('header .site-title')).toHaveText('Cacophony');
    }
  });

  test('all pages have a main element', async ({ page }) => {
    for (const { path } of pages) {
      await page.goto(path);
      await expect(page.locator('main')).toBeVisible();
    }
  });
});

test.describe('BaseLayout — responsive (mobile)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('hamburger toggle button is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav-toggle')).toBeVisible();
  });

  test('nav opens when toggle is clicked', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('.site-nav');
    await expect(nav).not.toHaveClass(/open/);
    await page.locator('.nav-toggle').click();
    await expect(nav).toHaveClass(/open/);
  });

  test('nav links are accessible after toggle', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-toggle').click();
    const nav = page.locator('.site-nav');
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
  });
});
