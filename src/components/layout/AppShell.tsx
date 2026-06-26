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
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo principal
      </a>

      <AppBar component="header" position="sticky" color="primary" elevation={1}>
        <Toolbar component="nav" aria-label="Navegação principal">
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700 }}
            aria-label="Ir para a página inicial"
          >
            Zaub Order
          </Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {user ? (
              <Chip
                label={`${user.name} • ${user.role}`}
                size="small"
                sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
                aria-label={`Usuário logado: ${user.name}, perfil ${user.role}`}
              />
            ) : null}

            <Button
              color="inherit"
              onClick={() => dispatch(toggleThemeMode())}
              aria-label={`Alternar para tema ${
                themeMode === 'light' ? 'escuro' : 'claro'
              }`}
              title={`Alternar para tema ${
                themeMode === 'light' ? 'escuro' : 'claro'
              }`}
            >
              {themeMode === 'light' ? 'Dark' : 'Light'}
            </Button>

            <IconButton
              component={Link}
              href="/cart"
              color="inherit"
              aria-label="Abrir carrinho"
              title="Abrir carrinho"
            >
              <ShoppingCartIcon aria-hidden="true" />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={logout}
              aria-label="Sair da aplicação"
              title="Sair da aplicação"
            >
              <LogoutIcon aria-hidden="true" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container
        id="main-content"
        component="main"
        maxWidth="lg"
        sx={{ py: 4 }}
        tabIndex={-1}
      >
        {children}
      </Container>
    </Box>
  );
}