import { MockUser } from '@/types/auth';

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Admin Zaub',
    email: 'admin@zaub.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Usuário Leitura',
    email: 'user@zaub.com',
    password: 'user123',
    role: 'user',
  },
];