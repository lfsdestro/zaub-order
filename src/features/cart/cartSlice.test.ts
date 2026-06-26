import cartReducer, {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from './cartSlice';
import { Product } from '../products/types';
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

describe('cartSlice', () => {
  it('adds a product to the cart', () => {
    const state = cartReducer(undefined, addToCart(product));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('increments quantity when product already exists', () => {
    const firstState = cartReducer(undefined, addToCart(product));
    const secondState = cartReducer(firstState, addToCart(product));

    expect(secondState.items[0].quantity).toBe(2);
  });

  it('updates item quantity', () => {
    const initialState = cartReducer(undefined, addToCart(product));

    const state = cartReducer(
      initialState,
      updateQuantity({ productId: product.id, quantity: 5 }),
    );

    expect(state.items[0].quantity).toBe(5);
  });

  it('does not allow quantity lower than 1', () => {
    const initialState = cartReducer(undefined, addToCart(product));

    const state = cartReducer(
      initialState,
      updateQuantity({ productId: product.id, quantity: 0 }),
    );

    expect(state.items[0].quantity).toBe(1);
  });

  it('removes an item from the cart', () => {
    const initialState = cartReducer(undefined, addToCart(product));

    const state = cartReducer(initialState, removeFromCart(product.id));

    expect(state.items).toHaveLength(0);
  });

  it('clears the cart', () => {
    const initialState = cartReducer(undefined, addToCart(product));

    const state = cartReducer(initialState, clearCart());

    expect(state.items).toHaveLength(0);
  });
});