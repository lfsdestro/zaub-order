'use client';

import { AppShell } from '@/components/layout/AppShell';
import { clearCart } from '@/features/cart/cartSlice';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '@/features/cart/selectors';
import { createOrder } from '@/features/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatCurrency } from '@/utils/formatters';
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotalPrice);

  const [successOpen, setSuccessOpen] = useState(false);

  function handleFinishOrder() {
    if (items.length === 0) {
      return;
    }

    dispatch(createOrder(items));
    dispatch(clearCart());

    setSuccessOpen(true);

    window.setTimeout(() => {
      router.push('/orders');
    }, 600);
  }

  return (
    <AppShell>
      <Stack spacing={3}>
        <Box>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
            Checkout
          </Typography>

          <Typography color="text.secondary">
            Confirme os dados do pedido antes de finalizar.
          </Typography>
        </Box>

        {items.length === 0 ? (
          <Alert
            severity="info"
            action={
              <Button component={Link} href="/products" color="inherit">
                Ver produtos
              </Button>
            }
          >
            Seu carrinho está vazio.
          </Alert>
        ) : (
          <Paper sx={{ p: 3 }} component="section" aria-label="Resumo do pedido">
            <Stack spacing={2}>
              {items.map((item) => {
                const subtotal = item.product.price * item.quantity;

                return (
                  <Stack key={item.product.id} spacing={1} component="article">
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      sx={{
                        justifyContent: 'space-between',
                        gap: 1,
                      }}
                    >
                      <Box>
                        <Typography component="h2" sx={{ fontWeight: 700 }}>
                          {item.product.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {item.quantity}x {formatCurrency(item.product.price)}
                        </Typography>
                      </Box>

                      <Typography sx={{ fontWeight: 700 }}>
                        {formatCurrency(subtotal)}
                      </Typography>
                    </Stack>

                    <Divider />
                  </Stack>
                );
              })}

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{
                  justifyContent: 'space-between',
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: 2,
                }}
              >
                <Typography component="p" variant="h5" sx={{ fontWeight: 700 }}>
                  Total: {formatCurrency(total)}
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleFinishOrder}
                  aria-label="Confirmar e finalizar pedido"
                >
                  Confirmar pedido
                </Button>
              </Stack>
            </Stack>
          </Paper>
        )}

        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          message="Pedido finalizado com sucesso."
          ContentProps={{
            role: 'status',
            'aria-live': 'polite',
          }}
        />
      </Stack>
    </AppShell>
  );
}