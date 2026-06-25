'use client';

import { AppShell } from '@/components/layout/AppShell';
import { ProductCard } from '@/components/products/ProductCard';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '@/features/products/productsApi';
import { useAuth } from '@/hooks/useAuth';
import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

const PRODUCTS_LIMIT = 12;

export default function ProductsPage() {
  const { isAdmin } = useAuth();

  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(0);

  const skip = page * PRODUCTS_LIMIT;

  const productsQueryParams = useMemo(
    () => ({
      limit: PRODUCTS_LIMIT,
      skip,
      search: submittedSearch || undefined,
      category: category || undefined,
    }),
    [category, skip, submittedSearch],
  );

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProductsQuery(productsQueryParams);

  const { data: categories = [] } = useGetCategoriesQuery();

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const hasNextPage = skip + PRODUCTS_LIMIT < total;
  const hasPreviousPage = page > 0;

  function handleSearchSubmit() {
    setPage(0);
    setSubmittedSearch(search.trim());
  }

  function handleCategoryChange(value: string) {
    setPage(0);
    setSubmittedSearch('');
    setSearch('');
    setCategory(value);
  }

  return (
    <AppShell>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Catálogo de produtos
          </Typography>
          <Typography color="text.secondary">
            Consulte produtos da DummyJSON com busca, categoria e paginação.
          </Typography>
        </Box>

        <Paper sx={{ p: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              label="Buscar produto"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              fullWidth
            />

            <TextField
              select
              label="Categoria"
              value={category}
              onChange={(event) => handleCategoryChange(event.target.value)}
              sx={{ minWidth: { xs: '100%', md: 240 } }}
            >
              <MenuItem value="">Todas</MenuItem>
              {categories.map((item) => (
                <MenuItem key={item.slug} value={item.slug}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" onClick={handleSearchSubmit}>
              Buscar
            </Button>
          </Stack>
        </Paper>

        {isError ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            }
          >
            Não foi possível carregar os produtos.
          </Alert>
        ) : null}

        {!isLoading && !isError && products.length === 0 ? (
          <Alert severity="info">Nenhum produto encontrado.</Alert>
        ) : null}

        <Grid container spacing={3}>
          {isLoading || isFetching
            ? Array.from({ length: PRODUCTS_LIMIT }).map((_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Skeleton variant="rounded" height={420} />
                </Grid>
              ))
            : products.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ProductCard product={product} canAddToCart={isAdmin} />
                </Grid>
              ))}
        </Grid>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            disabled={!hasPreviousPage}
            onClick={() => setPage((currentPage) => currentPage - 1)}
          >
            Anterior
          </Button>

          <Button
            variant="outlined"
            disabled={!hasNextPage}
            onClick={() => setPage((currentPage) => currentPage + 1)}
          >
            Próxima
          </Button>
        </Stack>
      </Stack>
    </AppShell>
  );
}