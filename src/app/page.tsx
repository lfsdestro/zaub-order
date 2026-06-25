import { AppShell } from '@/components/layout/AppShell';
import { Button, Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <AppShell>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Bem-vindo ao Zaub Order
          </Typography>

          <Typography color="text.secondary">
            Fluxo de pedidos com catálogo, carrinho, checkout e histórico.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button component={Link} href="/products" variant="contained">
              Ver produtos
            </Button>

            <Button component={Link} href="/orders" variant="outlined">
              Histórico de pedidos
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </AppShell>
  );
}