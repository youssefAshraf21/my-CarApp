import { createContext, useState, type ReactNode } from 'react';
import type { Car, CartItem } from '../types/car';

interface CartContextType {
  items: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (carId: number) => void;
  updateQuantity: (carId: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (car: Car) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.car.id === car.id);
      if (existing) {
        return prev.map((i) =>
          i.car.id === car.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { car, quantity: 1 }];
    });
  };

  const removeFromCart = (carId: number) => {
    setItems((prev) => prev.filter((i) => i.car.id !== carId));
  };

  const updateQuantity = (carId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(carId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.car.id === carId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.car.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
