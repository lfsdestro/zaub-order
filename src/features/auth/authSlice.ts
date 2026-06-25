import { MOCK_USERS } from '@/constants/users';
import { AuthUser, LoginCredentials } from '@/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: AuthUser | null;
};

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },

    login: (state, action: PayloadAction<LoginCredentials>) => {
      const foundUser = MOCK_USERS.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password,
      );

      if (!foundUser) {
        throw new Error('E-mail ou senha inválidos.');
      }

      const userWithoutPassword: AuthUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };

      state.user = userWithoutPassword;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, setSession } = authSlice.actions;

export default authSlice.reducer;