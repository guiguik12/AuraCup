import { expect, test } from '@playwright/test';
import { catalogProducts, mockMenuApi } from './helpers.js';

test('envia um pedido e exibe a confirmacao', async ({ page }) => {
  let submittedOrder;
  await mockMenuApi(page, {
    onOrderRequest: request => {
      submittedOrder = request;
    },
    orderResponse: request => {
      const totalPrice = request.items.reduce((total, item) => {
        const product = catalogProducts.find(
          catalogProduct => catalogProduct.id === item.product_id
        );
        return total + (product?.price ?? 0) * item.quantity;
      }, 0);

      return {
        message: 'Pedido realizado com sucesso!',
        order: {
          id: 101,
          table_number: request.table_number,
          status: 'pendente',
          total_price: totalPrice,
          products: request.items.map(item => {
            const product = catalogProducts.find(
              catalogProduct => catalogProduct.id === item.product_id
            );

            return {
              id: product?.id ?? item.product_id,
              name_en: product?.name_en ?? '',
              name_pt: product?.name_pt ?? '',
              pivot: {
                quantity: item.quantity,
                price: product?.price ?? 0,
              },
            };
          }),
        },
      };
    },
  });

  await page.goto('/');
  await page.getByRole('button', { name: /view menu/i }).click();
  await page
    .getByRole('button', { name: /add to cart/i })
    .first()
    .click();
  await page
    .getByRole('button', { name: /increase espresso artesanal/i })
    .click();

  await expect(
    page.getByRole('heading', { name: /your order/i })
  ).toBeVisible();
  await expect(page.getByText(/2 items/i)).toBeVisible();
  await page.getByLabel(/table number/i).fill('7');
  await page.getByRole('button', { name: /send order/i }).click();

  expect(submittedOrder).toMatchObject({
    table_number: 7,
    items: [{ product_id: 1, quantity: 2 }],
  });
  await expect(page.getByText(/order created successfully/i)).toBeVisible();
  await expect(page.getByText(/order number:\s*101/i)).toBeVisible();
});

test('bloqueia envio de pedido com numero de mesa invalido', async ({
  page,
}) => {
  let orderRequests = 0;
  await mockMenuApi(page, {
    onOrderRequest: () => {
      orderRequests += 1;
    },
  });

  await page.goto('/');
  await page.getByRole('button', { name: /view menu/i }).click();
  await page
    .getByRole('button', { name: /add to cart/i })
    .first()
    .click();

  const tableNumber = page.getByLabel(/table number/i);
  await tableNumber.fill('0');
  await page.getByRole('button', { name: /send order/i }).click();

  await expect.poll(() => orderRequests).toBe(0);
  await expect
    .poll(() => tableNumber.evaluate(input => input.validity.valid))
    .toBe(false);
  await expect(page.getByText(/order created successfully/i)).toBeHidden();
});

test('bloqueia envio de pedido sem numero de mesa', async ({ page }) => {
  let orderRequests = 0;
  await mockMenuApi(page, {
    onOrderRequest: () => {
      orderRequests += 1;
    },
  });

  await page.goto('/');
  await page.getByRole('button', { name: /view menu/i }).click();
  await page
    .getByRole('button', { name: /add to cart/i })
    .first()
    .click();

  const tableNumber = page.getByLabel(/table number/i);
  await page.getByRole('button', { name: /send order/i }).click();

  await expect.poll(() => orderRequests).toBe(0);
  await expect
    .poll(() => tableNumber.evaluate(input => input.validity.valueMissing))
    .toBe(true);
  await expect(page.getByText(/order created successfully/i)).toBeHidden();
});
