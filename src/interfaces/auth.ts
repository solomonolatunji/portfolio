export interface AdminUser {
  username: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AdminAuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
}
