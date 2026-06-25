'use client';

import { STORAGE_KEYS } from '@/constants/storage';
import { login } from '@/features/auth/authSlice';
import { setStorageItem } from '@/services/storage/localStorage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { LoginCredentials } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido.'),
  password: z.string().min(1, 'Informe sua senha.'),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: LoginCredentials) {
    setErrorMessage(null);

    try {
      dispatch(login(data));

      // Redux atualiza no próximo ciclo, então pegamos o usuário diretamente pelo retorno do reducer no próximo acesso.
      const loggedUser =
        data.email === 'admin@zaub.com'
          ? {
              id: '1',
              name: 'Admin Zaub',
              email: 'admin@zaub.com',
              role: 'admin' as const,
            }
          : {
              id: '2',
              name: 'Usuário Leitura',
              email: 'user@zaub.com',
              role: 'user' as const,
            };

      setStorageItem(STORAGE_KEYS.AUTH_USER, loggedUser);

      router.push('/');
    } catch {
      setErrorMessage('E-mail ou senha inválidos.');
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', p: 4 }}>
          <Stack spacing={3} sx={{ alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Zaub Order
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Acesse o fluxo de pedidos
              </Typography>
            </Box>

            {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ width: '100%' }}
            >
              <Stack spacing={2}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="E-mail"
                      type="email"
                      fullWidth
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Senha"
                      type="password"
                      fullWidth
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                >
                  Entrar
                </Button>
              </Stack>
            </Box>

            <Typography variant="caption" color="text.secondary">
              Admin: admin@zaub.com / admin123
              <br />
              Leitura: user@zaub.com / user123
            </Typography>

            {user ? (
              <Typography variant="caption" color="success.main">
                Sessão ativa: {user.name}
              </Typography>
            ) : null}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}