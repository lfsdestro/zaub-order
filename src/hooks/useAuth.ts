'use client';

import { STORAGE_KEYS } from '@/constants/storage';
import { logout, setSession } from '@/features/auth/authSlice';
import {
  selectAuthUser,
  selectIsAdmin,
  selectIsAuthenticated,
} from '@/features/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuthUser } from '@/types/auth';
import { useEffect } from 'react';

export function useAuth() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);

    if (!storedUser) {
      return;
    }

    const parsedUser = JSON.parse(storedUser) as AuthUser;
    dispatch(setSession(parsedUser));
  }, [dispatch]);

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    dispatch(logout());
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    logout: handleLogout,
  };
}