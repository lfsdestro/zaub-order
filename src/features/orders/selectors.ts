import { RootState } from '@/store/store';

import { Order } from './types';

export const selectOrders = (state: RootState): Order[] => state.orders.orders;

export const selectOrderById =
  (orderId: string) =>
  (state: RootState): Order | undefined =>
    state.orders.orders.find((order) => order.id === orderId);