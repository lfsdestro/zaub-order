import { CartItem } from '@/features/cart/types';

export type OrderItem = CartItem & {
  subtotal: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  totalItems: number;
};