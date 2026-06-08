import type { CartLine } from '../types/order';

export function clampQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(0, Math.min(99, Math.trunc(quantity)));
}

export function getLineSubtotal(line: CartLine) {
  return line.item.price * line.quantity;
}

export function getCartTotal(lines: CartLine[]) {
  return lines.reduce((total, line) => total + getLineSubtotal(line), 0);
}

export function getCartItemCount(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

export function sanitizeCartLines(lines: CartLine[]) {
  return lines
    .filter(line => line.item.available)
    .map(line => ({ ...line, quantity: clampQuantity(line.quantity) }))
    .filter(line => line.quantity > 0);
}

export function validateOrderDraft(lines: CartLine[], tableNumber: number) {
  if (lines.length === 0) return 'cart.validation.cart.empty';
  if (!Number.isInteger(tableNumber) || tableNumber < 1) {
    return 'cart.validation.table.required';
  }
  return null;
}
