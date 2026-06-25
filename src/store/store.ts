import authReducer from '@/features/auth/authSlice';
import themeReducer from '@/features/theme/themeSlice';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      theme: themeReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];