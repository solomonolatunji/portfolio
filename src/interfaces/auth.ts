/**
 * User role types
 */
export type UserRole = "ADMIN" | "MANAGE_POSTS" | "MANAGE_COMMENTS";

/**
 * User entity
 */
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Authentication response data
 */
export interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Authentication store state
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
