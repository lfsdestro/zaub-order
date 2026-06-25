import { UserRole } from '@/types/auth';

export type Permission =
  | 'cart:write'
  | 'checkout:create'
  | 'orders:read'
  | 'products:read';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: ['products:read', 'cart:write', 'checkout:create', 'orders:read'],
  user: ['products:read', 'orders:read'],
};

export function hasPermission(role: UserRole, permission: Permission) {
  return ROLE_PERMISSIONS[role].includes(permission);
}