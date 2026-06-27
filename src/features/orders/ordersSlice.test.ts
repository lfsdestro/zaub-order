import ordersReducer, { createOrder } from './ordersSlice';
import { Product } from '@/types/product';
import { describe, expect, it } from 'vitest';

const product: Product = {
  id: 1,
  title: 'iPhone',
  description: 'Smartphone',
  price: 1000,
  thumbnail: 'image.png',
  category: 'smartphones',
  stock: 10,
  rating: 4.5,
};

describe('ordersSlice', () => {
  it('creates an order from cart items', () => {
    const state = ordersReducer(
      undefined,
      createOrder([
        {
          product,
          quantity: 2,
        },
      ]),
    );

    expect(state.orders).toHaveLength(1);
    expect(state.orders[0].total).toBe(2000);
    expect(state.orders[0].totalItems).toBe(2);
    expect(state.orders[0].items[0].subtotal).toBe(2000);
  });
});