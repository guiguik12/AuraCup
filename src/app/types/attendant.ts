export type AttendantUser = {
  id: number;
  name: string;
  email: string;
};

export type AttendantLoginResult = {
  token: string;
  user: AttendantUser;
};

export type AttendantProduct = {
  id: number;
  nameEn: string;
  namePt: string;
  price: number;
  quantity: number;
  unitPrice: number;
};

export type AttendantOrderStatus =
  | 'pendente'
  | 'confirmado'
  | 'preparando'
  | 'pronto'
  | 'entregue'
  | 'cancelado';

export type AttendantOrder = {
  id: number;
  tableNumber: number;
  status: AttendantOrderStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  products: AttendantProduct[];
};

export type AttendantOrderUpdate = {
  tableNumber: number;
  status: AttendantOrderStatus;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
};
