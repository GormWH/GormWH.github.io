import { test, expect } from '@playwright/test';
import { ROUTES, DATA } from '../fixtures/selectors';

// Collaborator persona: is the work relevant and deep enough.
// Real tag picked from src/content/work/*.md frontmatter — "CFD" matches
// osaka-thesis and utokyo-thesis (2 of 4 entries), a subset, not all.
const TAG = 'cfd';

test.describe('collaborator — work', () => {
  test('C1: work index lists entries and the header count matches on initial load', async ({ page }) => {
    await page.goto(ROUTES.work);

    const items = page.locator(DATA.entryItem);
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
    await expect(page.locator(DATA.filterCount)).toHaveText(String(count));
  });

  test('C2: tag chip filters the visible list and clear resets it', async ({ page }) => {
    await page.goto(ROUTES.work);

    const totalCount = await page.locator(DATA.entryItem).count();
    const chip = page.locator(`[data-tag-filter-chips] [data-tag="${TAG}"]`);
    await chip.click();

    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await expect(page).toHaveURL(new RegExp(`[?&]tags=${TAG}`));

    // Count VISIBLE items via the DOM — [data-tag-filter-count] is frozen (S3),
    // it does not reflect the active filter.
    const visibleAfterFilter = await page.locator(`${DATA.entryItem}:visible`).count();
    expect(visibleAfterFilter).toBeGreaterThan(0);
    expect(visibleAfterFilter).toBeLessThan(totalCount);

    await page.locator(DATA.tagClear).click();

    await expect(page).not.toHaveURL(/[?&]tags=/);
    const visibleAfterClear = await page.locator(`${DATA.entryItem}:visible`).count();
    expect(visibleAfterClear).toBe(totalCount);
    await expect(page.locator(DATA.filterEmpty)).toBeHidden();
  });

  test('C2b: a filter combination with no matches shows the empty state', async ({ page }) => {
    await page.goto(`${ROUTES.work}?tags=nonexistenttag`);

    await expect(page.locator(DATA.filterEmpty)).toBeVisible();
    const visible = await page.locator(`${DATA.entryItem}:visible`).count();
    expect(visible).toBe(0);
  });

  test('C3: entry links preserve the active filter in their URL', async ({ page }) => {
    await page.goto(`${ROUTES.work}?tags=${TAG}`);

    const visibleEntry = page.locator(`${DATA.entryItem}:visible`).first();
    const link = visibleEntry.locator(DATA.entryLink);
    await link.click();

    await expect(page).toHaveURL(new RegExp(`[?&]tags=${TAG}`));
  });

  test('C4: a case study renders its title and body', async ({ page }) => {
    await page.goto('/work/osaka-thesis/');

    await expect(page.locator('.gh-article-title')).toBeVisible();
    const firstParagraph = page.locator('.gh-prose p').first();
    await expect(firstParagraph).toBeVisible();
    await expect(firstParagraph).not.toHaveText('');
  });

  test('C5: contact page states fit for AI-tooling collaborations', async ({ page }) => {
    await page.goto(ROUTES.contact);

    const availability = page.locator('.ct-avail-text');
    await expect(availability).toContainText('Best fit');
    await expect(availability).toContainText('AI-tooling');
  });
});
