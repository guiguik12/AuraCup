export const catalogProducts = [
  {
    id: 1,
    category_id: 1,
    name_en: 'Espresso Artesanal',
    name_pt: 'Espresso Artesanal',
    description_en: 'Short espresso made with selected beans.',
    description_pt: 'Expresso curto com grãos selecionados.',
    price: 600,
    image_url:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="360"%3E%3Crect width="640" height="360" fill="%23ddd9d3"/%3E%3C/svg%3E',
    is_available: true,
  },
  {
    id: 2,
    category_id: 1,
    name_en: 'Café com Leite',
    name_pt: 'Café com Leite',
    description_en: 'Traditional Brazilian coffee with steamed milk.',
    description_pt: 'Café tradicional brasileiro com leite vaporizado.',
    price: 900,
    image_url:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="360"%3E%3Crect width="640" height="360" fill="%23cfc4b6"/%3E%3C/svg%3E',
    is_available: true,
  },
];

export const attendantOrders = [
  {
    id: 7,
    table_number: 4,
    status: 'pendente',
    total_price: 2100,
    created_at: '2026-06-08T12:00:00.000Z',
    updated_at: '2026-06-08T12:00:00.000Z',
    products: [
      {
        id: 1,
        name_en: 'Espresso Artesanal',
        name_pt: 'Espresso Artesanal',
        price: 600,
        pivot: { quantity: 2, price: 600 },
      },
      {
        id: 2,
        name_en: 'Café com Leite',
        name_pt: 'Café com Leite',
        price: 900,
        pivot: { quantity: 1, price: 900 },
      },
    ],
  },
  {
    id: 8,
    table_number: 9,
    status: 'entregue',
    total_price: 600,
    created_at: '2026-06-08T10:30:00.000Z',
    updated_at: '2026-06-08T10:30:00.000Z',
    products: [
      {
        id: 1,
        name_en: 'Espresso Artesanal',
        name_pt: 'Espresso Artesanal',
        price: 600,
        pivot: { quantity: 1, price: 600 },
      },
    ],
  },
];

export async function mockMenuApi(page, options = {}) {
  const products = options.products ?? catalogProducts;
  const buildOrderResponse =
    typeof options.orderResponse === 'function'
      ? options.orderResponse
      : () =>
          options.orderResponse ?? {
            message: 'Pedido realizado com sucesso!',
            order: {
              id: 101,
              table_number: 7,
              status: 'pendente',
              total_price: 600,
              products: [
                {
                  id: 1,
                  name_en: 'Espresso Artesanal',
                  name_pt: 'Espresso Artesanal',
                  pivot: { quantity: 1, price: 600 },
                },
              ],
            },
          };

  await page.route('**/api/products**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(products),
    });
  });

  await page.route('**/api/orders', async route => {
    if (route.request().method() !== 'POST') {
      await route.fallback();
      return;
    }

    const requestBody = JSON.parse(route.request().postData() ?? '{}');
    options.onOrderRequest?.(requestBody);

    const orderResponse = buildOrderResponse(requestBody);

    await route.fulfill({
      status: orderResponse.status ?? 201,
      contentType: 'application/json',
      body: JSON.stringify(
        orderResponse.body ??
          orderResponse ?? {
            message: 'Pedido realizado com sucesso!',
            order: {
              id: 101,
              table_number: 7,
              status: 'pendente',
              total_price: 600,
              products: [
                {
                  id: 1,
                  name_en: 'Espresso Artesanal',
                  name_pt: 'Espresso Artesanal',
                  pivot: { quantity: 1, price: 600 },
                },
              ],
            },
          }
      ),
    });
  });
}

export async function mockAttendantApi(page, options = {}) {
  const orders = options.orders ?? attendantOrders;

  await page.route('**/api/attendant/login', async route => {
    if (options.loginStatus && options.loginStatus !== 200) {
      await route.fulfill({
        status: options.loginStatus,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Credenciais de atendente invalidas.',
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Login de atendente realizado com sucesso.',
        token: 'demo-token',
        user: {
          id: 2,
          name: 'Atendente AuraCup',
          email: 'atendente@auracup.com',
        },
      }),
    });
  });

  await page.route('**/api/attendant/orders', async route => {
    if (route.request().method() !== 'GET') {
      await route.fallback();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ orders }),
    });
  });

  await page.route('**/api/attendant/orders/*/complete', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Pedido concluido com sucesso.',
        order: { ...orders[0], status: 'entregue' },
      }),
    });
  });
}
