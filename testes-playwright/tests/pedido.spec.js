import { expect, test } from '@playwright/test';
import { mockMenuApi } from './helpers.js';

test('envia um pedido e exibe a confirmacao', async ({ page }) => {
  await mockMenuApi(page);

  await page.goto('/');
  await page.getByRole('button', { name: /view menu/i }).click();
  await page
    .getByRole('button', { name: /add to cart/i })
    .first()
    .click();

  await expect(
    page.getByRole('heading', { name: /your order/i })
  ).toBeVisible();
  await page.getByLabel(/table number/i).fill('7');
  await page.getByRole('button', { name: /send order/i }).click();

  await expect(page.getByText(/order created successfully/i)).toBeVisible();
  await expect(page.getByText(/order number:\s*101/i)).toBeVisible();
});
