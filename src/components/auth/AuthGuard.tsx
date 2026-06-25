'use client';

import { useAuth } from '@/hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

type AuthGuardProps = {
  children: ReactNode;
};

const PUBLIC_ROUTES = ['/login'];

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, isHydrated } = useAuth();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!isAuthenticated && !isPublicRoute) {
      router.replace('/login');
    }

    if (isAuthenticated && isPublicRoute) {
      router.replace('/');
    }
  }, [isAuthenticated, isHydrated, isPublicRoute, router]);

  if (!isHydrated) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  return children;
}