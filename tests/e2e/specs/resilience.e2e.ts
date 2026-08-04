import { test, expect, type Page } from '@playwright/test';
import { ROUTES } from '../fixtures/selectors';

// Cross-cutting resilience / shareability checks. Kept viewport-agnostic so
// they pass under both the chromium and mobile (Pixel 5) projects — no
// hover-state assertions, no hamburger menu (nav is always visible).

async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

test.describe('resilience', () => {
  test('X1: 404 page renders with recovery links', async ({ page }) => {
    await page.goto(ROUTES.notFound);

    await expect(page.locator('h1')).toHaveText("This page isn't here.");

    // Scope to the recovery lists — the Header/Footer repeat some of these
    // hrefs on every page and would otherwise collide (strict mode).
    const lists = page.locator('.gh-collection-list');
    await expect(lists.locator('a[href="/en-us/"]').first()).toBeVisible();
    await expect(lists.locator('a[href="/en-us/work/"]')).toBeVisible();
    await expect(lists.locator('a[href="/en-us/writing/"]')).toBeVisible();
    await expect(lists.locator('a[href="/en-us/contact/"]')).toBeVisible();

    // The 404 page also links straight to each locale's homepage.
    await expect(lists.locator('a[href="/ja-jp/"]')).toBeVisible();
    await expect(lists.locator('a[href="/ko-kr/"]')).toBeVisible();
  });

  for (const path of [ROUTES.home, ROUTES.work, ROUTES.contact]) {
    test(`X2: no console errors on ${path}`, async ({ page }) => {
      const errors = await collectConsoleErrors(page);
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      expect(errors).toEqual([]);
    });
  }

  for (const path of ['/en-us/', '/en-us/work/osaka-thesis/']) {
    test(`X3: SEO basics present on ${path}`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /.+/);

      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content', /.+/);
      const ogImage = page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveAttribute('content', /.+/);
    });
  }

  test('X4: mobile smoke — hero and nav usable at any viewport', async ({ page }) => {
    await page.goto(ROUTES.home);

    await expect(page.locator('.gh-display')).toBeVisible();

    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Work' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Writing' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();
  });
});
