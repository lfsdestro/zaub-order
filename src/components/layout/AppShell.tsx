'use client';

import { toggleThemeMode } from '@/features/theme/themeSlice';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const { user, logout } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" color="primary" elevation={1}>
        <Toolbar>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700 }}
          >
            Zaub Order
          </Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {user ? (
              <Chip
                label={`${user.name} • ${user.role}`}
                size="small"
                sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
              />
            ) : null}

            <Button
              color="inherit"
              onClick={() => dispatch(toggleThemeMode())}
            >
              {themeMode === 'light' ? 'Dark' : 'Light'}
            </Button>

            <IconButton
              component={Link}
              href="/cart"
              color="inherit"
              aria-label="Abrir carrinho"
            >
              <ShoppingCartIcon />
            </IconButton>

            <IconButton color="inherit" onClick={logout} aria-label="Sair">
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}