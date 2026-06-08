import { expect, test } from '@playwright/test';
import { catalogProducts, mockMenuApi } from './helpers.js';

test('abre o menu e mostra os produtos', async ({ page }) => {
  await mockMenuApi(page);

  await page.goto('/');
  await page.getByRole('button', { name: /view menu/i }).click();

  await expect(page.getByRole('heading', { name: /menu/i })).toBeVisible();
  await expect(page.getByText(catalogProducts[0].name_en)).toBeVisible();
  await expect(
    page.getByRole('button', {
      name: new RegExp(`add to cart ${catalogProducts[0].name_en}`, 'i'),
    })
  ).toBeVisible();
});
