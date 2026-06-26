'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { StoreProvider } from '@/store/provider';
import { PersistenceGate } from '@/store/PersistenceGate';
import { ThemeRegistry } from '@/theme/theme-registry';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <PersistenceGate>
        <ThemeRegistry>
          <AuthGuard>{children}</AuthGuard>
        </ThemeRegistry>
      </PersistenceGate>
    </StoreProvider>
  );
}