import { test, expect } from '@playwright/test';
import { ROUTES, NAV, DATA, EXTERNAL, ASSETS } from '../fixtures/selectors';

// Recruiter persona: who is this, are they credible, how do I reach them / get the CV.

test.describe('recruiter — landing', () => {
  test('R1: hero renders and primary CTAs navigate', async ({ page }) => {
    await page.goto(ROUTES.home);

    await expect(page.locator('.gh-display')).toContainText('I build software');
    await expect(page.locator('.gh-lead')).toContainText("I'm Gorm");

    const primaryCta = page.locator('a.gh-btn-primary');
    await expect(primaryCta).toHaveAttribute('href', '/work/');
    await expect(primaryCta).toContainText('Recent work');
    await primaryCta.click();
    await expect(page).toHaveURL(/\/work\/?$/);

    await page.goto(ROUTES.home);
    const ghostCta = page.locator('a.gh-btn-ghost');
    await expect(ghostCta).toHaveAttribute('href', '/contact/');
    await expect(ghostCta).toContainText('Get in touch');
    await ghostCta.click();
    await expect(page).toHaveURL(/\/contact\/?$/);
  });

  test('R2: timeline "Show more" reveals overflow roles', async ({ page }) => {
    await page.goto(ROUTES.home);

    const toggle = page.locator(DATA.timelineToggle);
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    const overflowRole = page.getByText('Osaka University', { exact: true });
    await expect(overflowRole).toBeHidden();

    await toggle.click();

    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(overflowRole).toBeVisible();
  });

  test('R3: CV link is present on home, contact, and footer', async ({ page }) => {
    await page.goto(ROUTES.home);
    await expect(page.locator(`#home-contact a[href="${ASSETS.cv}"]`)).toBeVisible();
    await expect(page.locator(`.gh-footer-link[href="${ASSETS.cv}"]`)).toBeVisible();

    await page.goto(ROUTES.contact);
    await expect(page.locator(`.ct-row-link[href="${ASSETS.cv}"]`)).toBeVisible();
    await expect(page.locator(`.gh-footer-link[href="${ASSETS.cv}"]`)).toBeVisible();
  });

  // S1: public/CV.pdf does not exist yet — the link is wired but the asset 404s.
  // Un-skip once public/CV.pdf is added.
  test.fixme('CV.pdf asset resolves 200 — un-skip once public/CV.pdf is added (S1)', async ({ request }) => {
    const res = await request.get(ASSETS.cv);
    expect(res.status()).toBe(200);
  });

  test('R4: contact channels carry the right link attributes', async ({ page }) => {
    await page.goto(ROUTES.contact);

    // Scope to the page's contact-channels list — the Footer repeats GitHub/
    // LinkedIn/CV links on every page and would otherwise collide (strict mode).
    const channels = page.locator('.ct-channels');

    const github = channels.locator(`a[href="${EXTERNAL.github}"]`);
    await expect(github).toHaveAttribute('target', '_blank');
    await expect(github).toHaveAttribute('rel', /noopener|noreferrer/);

    const linkedin = channels.locator(`a[href="${EXTERNAL.linkedin}"]`);
    await expect(linkedin).toHaveAttribute('target', '_blank');
    await expect(linkedin).toHaveAttribute('rel', /noopener|noreferrer/);

    const resume = channels.locator(`a[href="${ASSETS.cv}"]`);
    await expect(resume).not.toHaveAttribute('target', '_blank');

    await expect(page.locator('.ct-avail-text')).toContainText('Open to short collaborations');
  });

  test('R5: header nav links to every top page with active state', async ({ page }) => {
    await page.goto(ROUTES.home);

    const nav = page.getByRole('navigation', { name: 'Primary' });
    const navLinks: Array<{ name: string; path: string }> = [
      { name: 'Work', path: NAV.work },
      { name: 'Writing', path: NAV.writing },
      { name: 'Contact', path: NAV.contact },
    ];

    for (const { name, path } of navLinks) {
      await page.goto(ROUTES.home);
      await nav.getByRole('link', { name }).click();
      await expect(page).toHaveURL(new RegExp(`${path}/?$`));
      await expect(nav.getByRole('link', { name })).toHaveAttribute('aria-current', 'page');
    }

    await page.locator('.gh-header a[href="/"]').click();
    await expect(page).toHaveURL(/\/$/);
  });
});
