'use client';

import { AppShell } from '@/components/layout/AppShell';
import { selectOrders } from '@/features/orders/selectors';
import { useAppSelector } from '@/store/hooks';
import { formatDateTime } from '@/utils/formatters';
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default function OrdersPage() {
  const orders = useAppSelector(selectOrders);

  return (
    <AppShell>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Histórico de pedidos
          </Typography>

          <Typography color="text.secondary">
            Consulte os pedidos finalizados.
          </Typography>
        </Box>

        {orders.length === 0 ? (
          <Alert
            severity="info"
            action={
              <Button component={Link} href="/products" color="inherit">
                Ver produtos
              </Button>
            }
          >
            Nenhum pedido finalizado até o momento.
          </Alert>
        ) : (
          <Stack spacing={2}>
            {orders.map((order) => (
              <Paper key={order.id} sx={{ p: 3 }}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                  sx={{
                    alignItems: { xs: 'stretch', md: 'center' },
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      Pedido #{order.id.slice(0, 8)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {formatDateTime(order.createdAt)}
                    </Typography>
                  </Box>

                  <Typography>{order.totalItems} itens</Typography>

                  <Typography sx={{ fontWeight: 700 }}>
                    US$ {order.total.toFixed(2)}
                  </Typography>

                  <Button
                    component={Link}
                    href={`/orders/${order.id}`}
                    variant="outlined"
                  >
                    Ver detalhes
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Stack>
    </AppShell>
  );
}