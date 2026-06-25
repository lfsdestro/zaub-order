'use client';

import { Product } from '@/features/products/types';
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
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={product.thumbnail}
        alt={product.title}
        sx={{ height: 180, objectFit: 'contain', bgcolor: 'background.default' }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
            <Chip label={product.category} size="small" />
            <Chip label={`${product.stock} em estoque`} size="small" variant="outlined" />
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {product.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          <Box>
            <Rating value={product.rating} precision={0.5} readOnly size="small" />
          </Box>

          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            US$ {product.price.toFixed(2)}
          </Typography>

          <Button variant="contained" disabled={!canAddToCart}>
            {canAddToCart ? 'Adicionar ao carrinho' : 'Somente leitura'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}