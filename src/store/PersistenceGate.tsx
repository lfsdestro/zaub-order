'use client';

import { STORAGE_KEYS } from '@/constants/storage';
import { setSession } from '@/features/auth/authSlice';
import { setCartItems } from '@/features/cart/cartSlice';
import { CartItem } from '@/features/cart/types';
import { setOrders } from '@/features/orders/ordersSlice';
import { Order } from '@/features/orders/types';
import { setThemeMode } from '@/features/theme/themeSlice';
import { getStorageItem } from '@/services/storage/localStorage';
import { useAppDispatch } from '@/store/hooks';
import { AuthUser } from '@/types/auth';
import { PaletteMode } from '@mui/material';
import { ReactNode, useEffect } from 'react';

type PersistenceGateProps = {
  children: ReactNode;
};

function isPaletteMode(value: string | null): value is PaletteMode {
  return value === 'light' || value === 'dark';
}

export function PersistenceGate({ children }: PersistenceGateProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = getStorageItem<AuthUser>(STORAGE_KEYS.AUTH_USER);
    const storedCartItems = getStorageItem<CartItem[]>(
      STORAGE_KEYS.CART_ITEMS,
    );
    const storedOrders = getStorageItem<Order[]>(STORAGE_KEYS.ORDERS);
    const storedThemeMode = getStorageItem<string>(STORAGE_KEYS.THEME_MODE);

    dispatch(setSession(storedUser));

    if (storedCartItems) {
      dispatch(setCartItems(storedCartItems));
    }

    if (storedOrders) {
      dispatch(setOrders(storedOrders));
    }

    if (isPaletteMode(storedThemeMode)) {
      dispatch(setThemeMode(storedThemeMode));
    }
  }, [dispatch]);

  return children;
}