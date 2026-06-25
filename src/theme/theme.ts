import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#ff9800',
      },
      background: {
        default: mode === 'light' ? '#f5f7fb' : '#101418',
        paper: mode === 'light' ? '#ffffff' : '#151b22',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  });