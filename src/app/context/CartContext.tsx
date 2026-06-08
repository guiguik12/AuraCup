import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { MenuItem } from '../data/menuItems';
import {
  clampQuantity,
  getCartItemCount,
  getCartTotal,
  sanitizeCartLines,
} from '../domain/orderRules';
import { submitOrder as submitOrderRequest } from '../services/orderService';
import type { CartLine, OrderSubmissionResult } from '../types/order';

type CartContextType = {
  lines: CartLine[];
  cartItemCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: MenuItem) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  submitOrder: (tableNumber: number) => Promise<OrderSubmissionResult>;
};

const CART_STORAGE_KEY = 'auracup.cart.v2';
const CartContext = createContext<CartContextType | undefined>(undefined);

function getStoredCart(): CartLine[] {
  try {
    const storedCart = globalThis.localStorage?.getItem(CART_STORAGE_KEY);
    if (!storedCart) return [];
    const parsedCart = JSON.parse(storedCart);
    return Array.isArray(parsedCart) ? sanitizeCartLines(parsedCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [lines, setLines] = useState<CartLine[]>(getStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      globalThis.localStorage?.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      return;
    }
  }, [lines]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback((item: MenuItem) => {
    if (!item.available) return;

    setLines(currentLines => {
      const existingLine = currentLines.find(line => line.item.id === item.id);
      if (!existingLine) return [...currentLines, { item, quantity: 1 }];

      return currentLines.map(line =>
        line.item.id === item.id
          ? { ...line, quantity: clampQuantity(line.quantity + 1) }
          : line
      );
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((itemId: number, quantity: number) => {
    const nextQuantity = clampQuantity(quantity);
    setLines(currentLines =>
      currentLines
        .map(line =>
          line.item.id === itemId ? { ...line, quantity: nextQuantity } : line
        )
        .filter(line => line.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((itemId: number) => {
    setLines(currentLines =>
      currentLines.filter(line => line.item.id !== itemId)
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const submitOrder = useCallback(
    async (tableNumber: number) => {
      const result = await submitOrderRequest(lines, tableNumber);
      setLines([]);
      return result;
    },
    [lines]
  );

  const cartItemCount = useMemo(() => getCartItemCount(lines), [lines]);
  const cartTotal = useMemo(() => getCartTotal(lines), [lines]);

  const value = useMemo(
    () => ({
      lines,
      cartItemCount,
      cartTotal,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      submitOrder,
    }),
    [
      lines,
      cartItemCount,
      cartTotal,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      submitOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
