'use client';

import { addToCart } from '@/features/cart/cartSlice';
import { Product } from '@/features/products/types';
import { useAppDispatch } from '@/store/hooks';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

type ProductCardProps = {
  product: Product;
  canAddToCart: boolean;
};

export function ProductCard({ product, canAddToCart }: ProductCardProps) {
  const dispatch = useAppDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <Card
      component="article"
      aria-label={`Produto ${product.title}`}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        image={product.thumbnail}
        alt={`Imagem do produto ${product.title}`}
        sx={{ height: 180, objectFit: 'contain', bgcolor: 'background.default' }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: 'space-between' }}
          >
            <Chip label={product.category} size="small" />
            <Chip
              label={`${product.stock} em estoque`}
              size="small"
              variant="outlined"
            />
          </Stack>

          <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
            {product.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
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

          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            US$ {product.price.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            disabled={!canAddToCart}
            onClick={handleAddToCart}
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
          >
            {canAddToCart ? 'Adicionar ao carrinho' : 'Somente leitura'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}