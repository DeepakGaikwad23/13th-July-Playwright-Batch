import { test, expect } from '@playwright/test';

test('opens Meesho', async ({ page }) => {
  await page.goto('https://www.meesho.com/');

  await expect(page).toHaveURL(/meesho\.com/);
});
