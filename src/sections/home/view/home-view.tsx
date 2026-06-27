import { AppShell } from '@/components/layout/AppShell';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const highlights = [
  {
    title: 'Catálogo inteligente',
    description: 'Produtos com busca e categorias.',
  },
  {
    title: 'Carrinho interativo',
    description: 'Carrinho com funcionalidades de adição, remoção e atualização de quantidades.',
  },
  {
    title: 'Histórico completo',
    description: 'Pedidos finalizados com detalhes, totais e data de criação.',
  },
];

export function HomeView() {
  return (
    <AppShell>
      <Stack spacing={4}>
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: -80,
              top: -80,
              width: 240,
              height: 240,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.12)',
            }}
          />

          <Stack spacing={3} sx={{ maxWidth: 720, position: 'relative' }}>
            <Typography
              component="h1"
              variant="h3"
              sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}
            >
              Fluxo de pedidos moderno, responsivo e persistente.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={Link}
                href="/products"
                variant="contained"
                color="secondary"
                size="large"
              >
                Ver produtos
              </Button>

              <Button
                component={Link}
                href="/orders"
                variant="outlined"
                size="large"
                sx={{
                  color: 'primary.contrastText',
                  borderColor: 'rgba(255,255,255,0.7)',
                }}
              >
                Ver histórico
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          {highlights.map((item) => (
            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Typography>

                    <Typography color="text.secondary">
                      {item.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </AppShell>
  );
}