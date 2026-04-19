/**
 * EPIC 1: TikTok Videos in Shop Detail
 * Automated E2E test using Playwright
 *
 * TC-01: Shop list loads and shop cards are visible
 * TC-02: Shop detail page loads correctly
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

test.describe('EPIC 1: TikTok Videos', () => {

  test('TC-01: Shops page loads and displays shop cards', async ({ page }) => {
    await page.goto(`${BASE_URL}/shops`);
    await page.waitForSelector('a[href^="/shop/"]', { timeout: 15000 });
    const shopCards = page.locator('a[href^="/shop/"]');
    const count = await shopCards.count();
    expect(count).toBeGreaterThan(0);
    await page.screenshot({ path: 'test-results/tc01-shops-list.png' });
  });

  test('TC-02: Shop detail page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/shops`);
    await page.waitForSelector('a[href^="/shop/"]', { timeout: 15000 });
    const firstShop = page.locator('a[href^="/shop/"]').first();
    await firstShop.click();
    await page.waitForURL(/\/shop\//, { timeout: 10000 });
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 10000 });
    await page.screenshot({ path: 'test-results/tc02-shop-detail.png' });
  });

});
