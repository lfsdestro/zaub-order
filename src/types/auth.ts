export type UserRole = 'admin' | 'user';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type MockUser = AuthUser & {
  password: string;
};