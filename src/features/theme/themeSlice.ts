import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
  mode: PaletteMode;
};

const initialState: ThemeState = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleThemeMode } = themeSlice.actions;

export default themeSlice.reducer;