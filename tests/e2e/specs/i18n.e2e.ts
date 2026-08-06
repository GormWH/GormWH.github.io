import { test, expect } from '@playwright/test';
import { LEGACY_ROUTES, LOCALES } from '../fixtures/selectors';

// i18n journeys: legacy URL preservation, locale rendering, the fallback
// (untranslated) path, the language switcher round-trip, and unknown-locale
// 404 handling. See .omc/plans/i18n-url-prefix-plan.md for the design this
// coverage checks against.

const ALL_LEGACY_ROUTES: string[] = [
  LEGACY_ROUTES.home,
  LEGACY_ROUTES.contact,
  LEGACY_ROUTES.work,
  LEGACY_ROUTES.writing,
  ...LEGACY_ROUTES.workSlugs,
  ...LEGACY_ROUTES.writingSlugs,
];

// The stub's canonical target is always the site's real, absolute
// production origin (baked in at build time from astro.config's `site`);
// the meta-refresh/anchor navigation itself is site-relative and
// origin-agnostic (works on dev, preview, and production alike).
const SITE_ORIGIN = 'https://gormwh.github.io';

test.describe('i18n — legacy redirect stubs', () => {
  test('I1: all 11 legacy URLs navigate relative to their /en-us/... target and canonical stays absolute', async ({
    page,
    request,
  }) => {
    expect(ALL_LEGACY_ROUTES).toHaveLength(11);

    for (const legacyPath of ALL_LEGACY_ROUTES) {
      const expectedTarget = `/en-us${legacyPath}`;

      // T1: real navigation — follow the meta-refresh with an actual
      // browser and assert it lands same-origin. Before the fix, the
      // meta-refresh pointed at the absolute production origin, so this
      // would try to cross-navigate off the current origin and 404/fail on
      // any non-production origin.
      const response = await page.goto(legacyPath);
      const startOrigin = new URL(response!.url()).origin;
      await page.waitForURL(`**${expectedTarget}`, { timeout: 5000 });
      const landedUrl = new URL(page.url());
      expect(landedUrl.origin, `${legacyPath} navigation stays same-origin`).toBe(startOrigin);
      expect(landedUrl.pathname, `${legacyPath} lands on the relative target`).toBe(expectedTarget);

      // Request-based assertions against the stub's raw HTML.
      const res = await request.get(legacyPath);
      expect(res.status(), `${legacyPath} should resolve 200`).toBe(200);
      const body = await res.text();

      // Positive: the meta-refresh target is site-relative — the exact
      // form of the bug this suite regression-guards against.
      expect(body, `${legacyPath} meta-refresh target is relative`).toContain(
        `content="0; url=${landedUrl.pathname}"`,
      );
      expect(body, `${legacyPath} has no absolute meta-refresh target`).not.toContain('0; url=https://');
      expect(body, `${legacyPath} visible fallback link`).toContain(`href="${landedUrl.pathname}"`);

      // Canonical stays the absolute production URL (SEO signal, unchanged intent).
      const canonicalMatch = body.match(/<link rel="canonical" href="([^"]*)">/);
      expect(canonicalMatch, `${legacyPath} canonical link present`).not.toBeNull();

      // T2: canonical and the real landing path must be byte-identical
      // (same trailing-slash form) — they can never silently diverge.
      expect(canonicalMatch![1], `${legacyPath} canonical matches the real landing path exactly`).toBe(
        `${SITE_ORIGIN}${landedUrl.pathname}`,
      );
    }
  });
});

test.describe('i18n — locale rendering', () => {
  test('I2: /en-us/ and /ja-jp/ homepages render with the correct <html lang>', async ({ page }) => {
    await page.goto('/en-us/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.gh-display')).toBeVisible();

    await page.goto('/ja-jp/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
    await expect(page.locator('.gh-display')).toBeVisible();
  });

  test('I3: an untranslated /ja-jp/writing/<slug> renders the English source with a fallback notice and canonical to /en-us/...', async ({
    page,
  }) => {
    await page.goto('/ja-jp/writing/closer-to-the-decisions/');

    // Locale-driven chrome still follows the URL's locale even though the
    // article body is the untranslated English source.
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');

    const notice = page.getByRole('note');
    await expect(notice).toBeVisible();
    await expect(notice).toContainText('翻訳');

    await expect(page.locator('.gh-article-title')).toHaveText('Closer to where the decisions get made');

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE_ORIGIN}/en-us/writing/closer-to-the-decisions/`,
    );
  });
});

test.describe('i18n — language switcher', () => {
  test('I4: switcher round-trips from a real en-us article through the ja-jp fallback and back', async ({
    page,
  }) => {
    await page.goto('/en-us/writing/closer-to-the-decisions/');
    await expect(page.getByRole('note')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE_ORIGIN}/en-us/writing/closer-to-the-decisions/`,
    );

    // Scope to the Footer's switcher — deliberately the site's ONLY
    // `<nav aria-label="Language">` landmark. The Header switcher is a
    // non-landmark `<details>` disclosure, so this query stays unique.
    const switcher = page.getByRole('navigation', { name: 'Language' });

    await switcher.getByRole('link', { name: LOCALES['ja-jp'].label }).click();
    await expect(page).toHaveURL(/\/ja-jp\/writing\/closer-to-the-decisions\/?$/);
    await expect(page.getByRole('note')).toBeVisible();

    await switcher.getByRole('link', { name: LOCALES['en-us'].label }).click();
    await expect(page).toHaveURL(/\/en-us\/writing\/closer-to-the-decisions\/?$/);
    await expect(page.getByRole('note')).toHaveCount(0);
  });
});

test.describe('i18n — unknown locale', () => {
  test('I5: an unrecognized locale path falls through to the top-level 404', async ({ page }) => {
    await page.goto('/xx-xx/');
    await expect(page.locator('h1')).toHaveText("This page isn't here.");
  });
});

test.describe('i18n — header language disclosure', () => {
  test('I6: options are hidden until the trigger is clicked; selecting 日本語 lands on the fallback', async ({
    page,
  }) => {
    await page.goto('/en-us/writing/closer-to-the-decisions/');
    const menu = page.locator('header details.gh-lang-menu');
    const trigger = menu.locator('summary.gh-lang-trigger');
    const jaLink = menu.getByRole('link', { name: LOCALES['ja-jp'].label });

    await expect(trigger).toBeVisible();
    await expect(jaLink).not.toBeVisible();

    await trigger.click();
    await expect(menu).toHaveAttribute('open', '');
    await expect(jaLink).toBeVisible();
    // The active locale is rendered non-interactive — no self-link.
    await expect(menu.getByRole('link', { name: LOCALES['en-us'].label })).toHaveCount(0);

    await jaLink.click();
    await expect(page).toHaveURL(/\/ja-jp\/writing\/closer-to-the-decisions\/?$/);
    await expect(page.getByRole('note')).toBeVisible();
  });

  test('I7: keyboard — Enter opens the disclosure, Escape closes it and returns focus to the trigger', async ({
    page,
  }) => {
    await page.goto('/en-us/');
    const menu = page.locator('header details.gh-lang-menu');
    const trigger = menu.locator('summary.gh-lang-trigger');

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('open', '');

    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveAttribute('open', '');
    await expect(trigger).toBeFocused();
  });

  test.describe('I8: zero-JS baseline', () => {
    // The <details> disclosure is the design's core premise: it must work
    // with JavaScript disabled (the lang-menu script only adds niceties).
    test.use({ javaScriptEnabled: false });

    test('the disclosure opens and a locale link navigates without JavaScript', async ({ page }) => {
      await page.goto('/en-us/writing/closer-to-the-decisions/');
      const menu = page.locator('header details.gh-lang-menu');

      await menu.locator('summary.gh-lang-trigger').click();
      await expect(menu).toHaveAttribute('open', '');

      await menu.getByRole('link', { name: LOCALES['ja-jp'].label }).click();
      await expect(page).toHaveURL(/\/ja-jp\/writing\/closer-to-the-decisions\/?$/);
    });
  });
});
