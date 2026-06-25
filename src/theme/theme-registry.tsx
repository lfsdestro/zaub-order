'use client';

import { useAppSelector } from '@/store/hooks';
import { createAppTheme } from '@/theme/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';

type ThemeRegistryProps = {
  children: ReactNode;
};

export function ThemeRegistry({ children }: ThemeRegistryProps) {
  const mode = useAppSelector((state) => state.theme.mode);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}