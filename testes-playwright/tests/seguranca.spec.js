import { expect, test } from '@playwright/test';
import { mockAttendantApi, mockMenuApi } from './helpers.js';

test('nao executa conteudo malicioso vindo do cardapio', async ({ page }) => {
  await mockMenuApi(page, {
    products: [
      {
        id: 99,
        category_id: 1,
        name_en: '<img src=x onerror=alert(1)>',
        name_pt: '<img src=x onerror=alert(1)>',
        description_en: 'Malicious payload',
        description_pt: 'Carga maliciosa',
        price: 500,
        image_url:
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="360"%3E%3Crect width="640" height="360" fill="%23f3f0ea"/%3E%3C/svg%3E',
        is_available: true,
      },
    ],
  });

  let alertTriggered = false;
  page.on('dialog', async dialog => {
    alertTriggered = true;
    await dialog.dismiss();
  });

  await page.goto('/');
  await page.getByRole('button', { name: /view menu/i }).click();

  await expect(page.getByText('<img src=x onerror=alert(1)>')).toBeVisible();
  expect(alertTriggered).toBeFalsy();
});

test('abre a area restrita e lista pedidos para atendentes', async ({
  page,
}) => {
  await mockMenuApi(page);
  await mockAttendantApi(page);

  await page.goto('/');
  await page.getByRole('button', { name: /view menu/i }).click();
  await page.getByRole('button', { name: /staff/i }).click();

  await page
    .getByRole('textbox', { name: /e-mail/i })
    .fill('atendente@auracup.com');
  await page.getByLabel(/password/i).fill('Auracup@123');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page.getByText(/order management/i)).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /in progress/i })
  ).toBeVisible();
  await expect(page.getByText(/#7/)).toBeVisible();
});

test('bloqueia acesso de atendente com credenciais invalidas', async ({
  page,
}) => {
  await mockMenuApi(page);
  await mockAttendantApi(page, { loginStatus: 401 });

  await page.goto('/');
  await page.getByRole('button', { name: /view menu/i }).click();
  await page.getByRole('button', { name: /staff/i }).click();

  await page
    .getByRole('textbox', { name: /e-mail/i })
    .fill('cliente@auracup.com');
  await page.getByLabel(/password/i).fill('senha-incorreta');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(
    page.getByText(/could not sign in with these staff credentials/i)
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /staff login/i })
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /in progress/i })
  ).toBeHidden();
});
