'use client';

import { addToCart } from '@/features/cart/cartSlice';
import { Product } from '@/features/products/types';
import { useAppDispatch } from '@/store/hooks';
import { formatCurrency } from '@/utils/formatters';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

type ProductCardProps = {
  product: Product;
  canAddToCart: boolean;
};

export function ProductCard({ product, canAddToCart }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  function handleAddToCart() {
    dispatch(addToCart(product));
    setFeedbackOpen(true);
  }

  return (
    <>
      <Card
        component="article"
        aria-label={`Produto ${product.title}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 160ms ease, box-shadow 160ms ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'background.default',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={`Imagem do produto ${product.title}`}
            sx={{ height: 190, objectFit: 'contain', p: 2 }}
          />

          <Chip
            icon={<Inventory2OutlinedIcon aria-hidden="true" />}
            label={`${product.stock} em estoque`}
            size="small"
            variant="filled"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: 'background.paper',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack spacing={1.5} sx={{ height: '100%' }}>
            <Chip
              label={product.category}
              size="small"
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            />

            <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
              {product.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.description}
            </Typography>

            <Box aria-label={`Avaliação ${product.rating} de 5`}>
              <Rating
                value={product.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>
              {formatCurrency(product.price)}
            </Typography>

            <Button
              variant="contained"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
              startIcon={<AddShoppingCartIcon aria-hidden="true" />}
              aria-label={
                canAddToCart
                  ? `Adicionar ${product.title} ao carrinho`
                  : `Produto ${product.title} disponível apenas para leitura`
              }
              title={
                canAddToCart
                  ? `Adicionar ${product.title} ao carrinho`
                  : 'Usuário sem permissão para adicionar ao carrinho'
              }
              fullWidth
            >
              {canAddToCart ? 'Adicionar' : 'Somente leitura'}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={feedbackOpen}
        autoHideDuration={1800}
        onClose={() => setFeedbackOpen(false)}
        message={`${product.title} adicionado ao carrinho.`}
        ContentProps={{
          role: 'status',
          'aria-live': 'polite',
        }}
      />
    </>
  );
}