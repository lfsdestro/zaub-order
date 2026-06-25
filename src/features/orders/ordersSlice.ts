import { clearCart } from '@/features/cart/cartSlice';
import { CartItem } from '@/features/cart/types';
import { AppDispatch } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Order, OrderItem } from './types';

type OrdersState = {
  orders: Order[];
};

const initialState: OrdersState = {
  orders: [],
};

function createOrderFromCart(items: CartItem[]): Order {
  const orderItems: OrderItem[] = items.map((item) => ({
    ...item,
    subtotal: item.product.price * item.quantity,
  }));

  const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    items: orderItems,
    total,
    totalItems,
  };
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: {
      reducer: (state, action: PayloadAction<Order>) => {
        state.orders.unshift(action.payload);
      },
      prepare: (items: CartItem[]) => ({
        payload: createOrderFromCart(items),
      }),
    },

    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { createOrder, setOrders } = ordersSlice.actions;

export const createOrderAndClearCart =
  (items: CartItem[]) => (dispatch: AppDispatch) => {
    dispatch(createOrder(items));
    dispatch(clearCart());
  };

export default ordersSlice.reducer;