import type { MenuItem } from '../data/menuItems';

export type CartLine = {
  item: MenuItem;
  quantity: number;
};

export type Order = {
  id: string;
  tableNumber: number;
  status: string;
  totalPrice: number;
};

export type OrderSubmissionResult = {
  order: Order;
};
