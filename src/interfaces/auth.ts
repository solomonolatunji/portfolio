export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: AdminUser;
  } | null;
}

export interface UserProfileResponse {
  status: boolean;
  message: string;
  data: AdminUser;
}

export interface LogoutResponse {
  status: boolean;
  message: string;
  data: null;
}

export interface ValidationErrors {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export interface AdminAuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  tokenExpiry: number | null;
}
