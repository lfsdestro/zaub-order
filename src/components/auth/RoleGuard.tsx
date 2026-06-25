'use client';

import { hasPermission, Permission } from '@/features/auth/permissions';
import { useAuth } from '@/hooks/useAuth';
import { Alert } from '@mui/material';
import { ReactNode } from 'react';

type RoleGuardProps = {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
};

export function RoleGuard({ permission, children, fallback }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user || !hasPermission(user.role, permission)) {
    return (
      fallback ?? (
        <Alert severity="warning">
          Você não tem permissão para executar esta ação.
        </Alert>
      )
    );
  }

  return children;
}