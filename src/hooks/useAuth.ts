'use client';

import { STORAGE_KEYS } from '@/constants/storage';
import { logout, setSession } from '@/features/auth/authSlice';
import {
  selectAuthUser,
  selectIsAdmin,
  selectIsAuthenticated,
  selectIsHydrated,
} from '@/features/auth/selectors';
import { getStorageItem, removeStorageItem } from '@/services/storage/localStorage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuthUser } from '@/types/auth';
import { useEffect } from 'react';

export function useAuth() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isHydrated = useAppSelector(selectIsHydrated);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    const storedUser = getStorageItem<AuthUser>(STORAGE_KEYS.AUTH_USER);

    dispatch(setSession(storedUser));
  }, [dispatch]);

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