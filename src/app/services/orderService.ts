import type { CartLine, Order, OrderSubmissionResult } from '../types/order';
import { sanitizeCartLines } from '../domain/orderRules';
import { getApiBaseUrl } from './api';

type ApiOrderResponse = {
  order?: {
    id?: number | string;
    table_number?: number;
    status?: string;
    total_price?: number | string;
  };
};

export async function submitOrder(
  lines: CartLine[],
  tableNumber: number,
  fetcher: typeof fetch = fetch
): Promise<OrderSubmissionResult> {
  const sanitizedLines = sanitizeCartLines(lines);
  if (sanitizedLines.length === 0) {
    throw new Error('Cannot submit an empty cart');
  }

  const response = await fetcher(`${getApiBaseUrl()}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      table_number: tableNumber,
      items: sanitizedLines.map(line => ({
        product_id: line.item.id,
        quantity: line.quantity,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Order API returned ${response.status}`);
  }

  const data = (await response.json()) as ApiOrderResponse;
  const order = data.order ?? {};

  return {
    order: {
      id: String(order.id ?? ''),
      tableNumber: Number(order.table_number ?? tableNumber),
      status: order.status ?? 'pendente',
      totalPrice: Number(order.total_price ?? 0),
    },
  };
}
