'use client';

import { STORAGE_KEYS } from '@/constants/storage';
import { setStorageItem } from '@/services/storage/localStorage';
import { AppStore, makeStore } from '@/store/store';
import { ReactNode, useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';

type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  const store = useMemo<AppStore>(() => makeStore(), []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      setStorageItem(STORAGE_KEYS.AUTH_USER, state.auth.user);
      setStorageItem(STORAGE_KEYS.CART_ITEMS, state.cart.items);
      setStorageItem(STORAGE_KEYS.ORDERS, state.orders.orders);
      setStorageItem(STORAGE_KEYS.THEME_MODE, state.theme.mode);
    });

    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}