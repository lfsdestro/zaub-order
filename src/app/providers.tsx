'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { StoreProvider } from '@/store/provider';
import { ThemeRegistry } from '@/theme/theme-registry';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <ThemeRegistry>
        <AuthGuard>{children}</AuthGuard>
      </ThemeRegistry>
    </StoreProvider>
  );
}