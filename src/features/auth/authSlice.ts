import { MOCK_USERS } from '@/constants/users';
import { AuthUser, LoginCredentials } from '@/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: AuthUser | null;
  isHydrated: boolean;
};

const initialState: AuthState = {
  user: null,
  isHydrated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.isHydrated = true;
    },

    login: (state, action: PayloadAction<LoginCredentials>) => {
      const foundUser = MOCK_USERS.find(
        (mockUser) =>
          mockUser.email === action.payload.email &&
          mockUser.password === action.payload.password,
      );

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      state.user = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };

      state.isHydrated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isHydrated = true;
    },
  },
});

export const { login, logout, setSession } = authSlice.actions;

export default authSlice.reducer;