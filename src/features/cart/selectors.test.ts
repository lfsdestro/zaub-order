import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
} from './selectors';
import { Product } from '../products/types';
import { RootState } from '@/store/store';
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

const state = {
  cart: {
    items: [
      {
        product,
        quantity: 2,
      },
    ],
  },
} as RootState;

describe('cart selectors', () => {
  it('selects cart items', () => {
    expect(selectCartItems(state)).toHaveLength(1);
  });

  it('selects total items', () => {
    expect(selectCartTotalItems(state)).toBe(2);
  });

  it('selects total price', () => {
    expect(selectCartTotalPrice(state)).toBe(2000);
  });
});