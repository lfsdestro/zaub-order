import { RootState } from '@/store/store';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.user);

export const selectIsAdmin = (state: RootState) =>
  state.auth.user?.role === 'admin';

export const selectIsReadOnlyUser = (state: RootState) =>
  state.auth.user?.role === 'user';