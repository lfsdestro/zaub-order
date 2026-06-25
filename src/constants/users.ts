import { AuthUser } from '@/types/auth';

export type MockUser = AuthUser & {
  password: string;
};

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
    name: 'User Zaub',
    email: 'user@zaub.com',
    password: 'user123',
    role: 'user',
  },
];