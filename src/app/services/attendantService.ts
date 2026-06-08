import type {
  AttendantLoginResult,
  AttendantOrder,
  AttendantOrderStatus,
  AttendantOrderUpdate,
  AttendantUser,
} from '../types/attendant';
import { getApiBaseUrl } from './api';

type ApiUser = {
  id: number;
  name: string;
  email: string;
};

type ApiProduct = {
  id: number;
  name_en?: string;
  name_pt?: string;
  price?: number | string;
  pivot?: {
    quantity?: number | string;
    price?: number | string;
  };
};

type ApiOrder = {
  id: number;
  table_number: number;
  status: AttendantOrderStatus;
  total_price: number | string;
  created_at: string;
  updated_at: string;
  products?: ApiProduct[];
};

type ApiOrderResponse = {
  order: ApiOrder;
};

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };
}

function mapUser(user: ApiUser): AttendantUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function mapOrder(order: ApiOrder): AttendantOrder {
  return {
    id: order.id,
    tableNumber: order.table_number,
    status: order.status,
    totalPrice: Number(order.total_price ?? 0),
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    products: (order.products ?? []).map(product => ({
      id: product.id,
      nameEn: product.name_en ?? '',
      namePt: product.name_pt ?? '',
      price: Number(product.price ?? 0),
      quantity: Number(product.pivot?.quantity ?? 0),
      unitPrice: Number(product.pivot?.price ?? product.price ?? 0),
    })),
  };
}

export async function loginAttendant(
  email: string,
  password: string
): Promise<AttendantLoginResult> {
  const response = await fetch(`${getApiBaseUrl()}/attendant/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Attendant login failed with ${response.status}`);
  }

  const data = (await response.json()) as { token: string; user: ApiUser };

  return {
    token: data.token,
    user: mapUser(data.user),
  };
}

export async function listAttendantOrders(
  token: string
): Promise<AttendantOrder[]> {
  const response = await fetch(`${getApiBaseUrl()}/attendant/orders`, {
    headers: authHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`Could not load attendant orders: ${response.status}`);
  }

  const data = (await response.json()) as { orders: ApiOrder[] };
  return data.orders.map(mapOrder);
}

export async function updateAttendantOrder(
  token: string,
  orderId: number,
  update: AttendantOrderUpdate
): Promise<AttendantOrder> {
  const response = await fetch(
    `${getApiBaseUrl()}/attendant/orders/${orderId}`,
    {
      method: 'PATCH',
      headers: {
        ...authHeaders(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        table_number: update.tableNumber,
        status: update.status,
        items: update.items.map(item => ({
          product_id: item.productId,
          quantity: item.quantity,
        })),
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Could not update order: ${response.status}`);
  }

  const data = (await response.json()) as ApiOrderResponse;
  return mapOrder(data.order);
}

export async function completeAttendantOrder(
  token: string,
  orderId: number
): Promise<AttendantOrder> {
  const response = await fetch(
    `${getApiBaseUrl()}/attendant/orders/${orderId}/complete`,
    {
      method: 'POST',
      headers: authHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error(`Could not complete order: ${response.status}`);
  }

  const data = (await response.json()) as ApiOrderResponse;
  return mapOrder(data.order);
}

export async function cancelAttendantOrder(
  token: string,
  orderId: number
): Promise<AttendantOrder> {
  const response = await fetch(
    `${getApiBaseUrl()}/attendant/orders/${orderId}/cancel`,
    {
      method: 'POST',
      headers: authHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error(`Could not cancel order: ${response.status}`);
  }

  const data = (await response.json()) as ApiOrderResponse;
  return mapOrder(data.order);
}
