'use client';

import { AppShell } from '@/components/layout/AppShell';
import { selectOrderById } from '@/features/orders/selectors';
import { useAppSelector } from '@/store/hooks';
import { formatDateTime } from '@/utils/formatters';
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const order = useAppSelector(selectOrderById(params.id));

  return (
    <AppShell>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Detalhes do pedido
          </Typography>

          <Typography color="text.secondary">
            Informações completas do pedido selecionado.
          </Typography>
        </Box>

        {!order ? (
          <Alert
            severity="warning"
            action={
              <Button component={Link} href="/orders" color="inherit">
                Voltar
              </Button>
            }
          >
            Pedido não encontrado.
          </Alert>
        ) : (
          <Paper sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>
                  Pedido #{order.id.slice(0, 8)}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {formatDateTime(order.createdAt)}
                </Typography>
              </Box>

              <Divider />

              {order.items.map((item) => (
                <Stack key={item.product.id} spacing={1}>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    sx={{
                      justifyContent: 'space-between',
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>
                        {item.product.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {item.quantity}x US$ {item.product.price.toFixed(2)}
                      </Typography>
                    </Box>

                    <Typography sx={{ fontWeight: 700 }}>
                      US$ {item.subtotal.toFixed(2)}
                    </Typography>
                  </Stack>

                  <Divider />
                </Stack>
              ))}

              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Total: US$ {order.total.toFixed(2)}
              </Typography>

              <Button component={Link} href="/orders" variant="outlined">
                Voltar ao histórico
              </Button>
            </Stack>
          </Paper>
        )}
      </Stack>
    </AppShell>
  );
}