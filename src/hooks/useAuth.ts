'use client';

import { removeStorageItem } from '@/services/storage/localStorage';
import { STORAGE_KEYS } from '@/constants/storage';
import { logout } from '@/features/auth/authSlice';
import {
  selectAuthUser,
  selectIsAdmin,
  selectIsAuthenticated,
  selectIsHydrated,
} from '@/features/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function useAuth() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isHydrated = useAppSelector(selectIsHydrated);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  function handleLogout() {
    removeStorageItem(STORAGE_KEYS.AUTH_USER);
    dispatch(logout());
  }

  return {
    user,
    isAdmin,
    isHydrated,
    isAuthenticated,
    logout: handleLogout,
  };
}