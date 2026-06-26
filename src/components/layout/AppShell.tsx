'use client';

import { selectCartTotalItems } from '@/features/cart/selectors';
import { toggleThemeMode } from '@/features/theme/themeSlice';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Divider,
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
  const cartTotalItems = useAppSelector(selectCartTotalItems);

  const { user, logout } = useAuth();

  const nextThemeLabel = themeMode === 'light' ? 'escuro' : 'claro';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo principal
      </a>

      <AppBar
        component="header"
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Toolbar component="nav" aria-label="Navegação principal">
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              color: 'primary.main',
              letterSpacing: '-0.02em',
            }}
            aria-label="Ir para a página inicial"
          >
            Zaub Order
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Button
              component={Link}
              href="/"
              startIcon={<HomeIcon aria-hidden="true" />}
            >
              Início
            </Button>

            <Button
              component={Link}
              href="/products"
              startIcon={<StorefrontIcon aria-hidden="true" />}
            >
              Produtos
            </Button>

            <Button
              component={Link}
              href="/orders"
              startIcon={<HistoryIcon aria-hidden="true" />}
            >
              Pedidos
            </Button>
          </Stack>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 2, display: { xs: 'none', md: 'block' } }}
          />

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {user ? (
              <Chip
                label={`${user.name} • ${user.role}`}
                size="small"
                variant="outlined"
                aria-label={`Usuário logado: ${user.name}, perfil ${user.role}`}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              />
            ) : null}

            <IconButton
              onClick={() => dispatch(toggleThemeMode())}
              aria-label={`Alternar para tema ${nextThemeLabel}`}
              title={`Alternar para tema ${nextThemeLabel}`}
            >
              {themeMode === 'light' ? (
                <DarkModeIcon aria-hidden="true" />
              ) : (
                <LightModeIcon aria-hidden="true" />
              )}
            </IconButton>

            <IconButton
              component={Link}
              href="/cart"
              aria-label={`Abrir carrinho com ${cartTotalItems} itens`}
              title="Abrir carrinho"
            >
              <Badge badgeContent={cartTotalItems} color="primary">
                <ShoppingCartIcon aria-hidden="true" />
              </Badge>
            </IconButton>

            <IconButton
              onClick={logout}
              aria-label="Sair da aplicação"
              title="Sair da aplicação"
            >
              <LogoutIcon aria-hidden="true" />
            </IconButton>
          </Stack>
        </Toolbar>

        <Container
          maxWidth="lg"
          sx={{
            display: { xs: 'flex', md: 'none' },
            gap: 1,
            overflowX: 'auto',
            py: 1,
          }}
          component="nav"
          aria-label="Navegação secundária"
        >
          <Button component={Link} href="/" size="small">
            Início
          </Button>
          <Button component={Link} href="/products" size="small">
            Produtos
          </Button>
          <Button component={Link} href="/orders" size="small">
            Pedidos
          </Button>
        </Container>
      </AppBar>

      <Container
        id="main-content"
        component="main"
        maxWidth="lg"
        sx={{ py: { xs: 3, md: 5 } }}
        tabIndex={-1}
      >
        {children}
      </Container>
    </Box>
  );
}