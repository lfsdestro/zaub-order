'use client';

import { makeStore } from '@/store/store';
import { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';

type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  const store = useMemo(() => makeStore(), []);

  return <Provider store={store}>{children}</Provider>;
}