'use client';

import { AppShell } from '@/components/layout/AppShell';
import { removeFromCart, updateQuantity } from '@/features/cart/cartSlice';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '@/features/cart/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatCurrency } from '@/utils/formatters';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default function CartPage() {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotalPrice);

  return (
    <AppShell>
      <Stack spacing={3}>
        <Box>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
            Carrinho
          </Typography>

          <Typography color="text.secondary">
            Revise os itens antes de finalizar o pedido.
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
          <Paper sx={{ p: 3 }} component="section" aria-label="Itens do carrinho">
            <Stack spacing={2}>
              {items.map((item) => {
                const subtotal = item.product.price * item.quantity;

                return (
                  <Box key={item.product.id} component="article">
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={2}
                      sx={{
                        alignItems: { xs: 'stretch', md: 'center' },
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        <Typography component="h2" sx={{ fontWeight: 700 }}>
                          {item.product.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {formatCurrency(item.product.price)} cada
                        </Typography>
                      </Box>

                      <TextField
                        label="Qtd."
                        type="number"
                        size="small"
                        value={item.quantity}
                        inputProps={{
                          min: 1,
                          'aria-label': `Quantidade de ${item.product.title}`,
                        }}
                        onChange={(event) =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              quantity: Number(event.target.value),
                            }),
                          )
                        }
                        sx={{ width: { xs: '100%', md: 120 } }}
                      />

                      <Typography sx={{ fontWeight: 700 }}>
                        {formatCurrency(subtotal)}
                      </Typography>

                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                        aria-label={`Remover ${item.product.title} do carrinho`}
                        title={`Remover ${item.product.title} do carrinho`}
                      >
                        <DeleteIcon aria-hidden="true" />
                      </IconButton>
                    </Stack>

                    <Divider sx={{ mt: 2 }} />
                  </Box>
                );
              })}

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography component="p" variant="h6" sx={{ fontWeight: 700 }}>
                  Total: {formatCurrency(total)}
                </Typography>

                <Button
                  component={Link}
                  href="/checkout"
                  variant="contained"
                  aria-label="Ir para o checkout e finalizar pedido"
                >
                  Finalizar pedido
                </Button>
              </Stack>
            </Stack>
          </Paper>
        )}
      </Stack>
    </AppShell>
  );
}