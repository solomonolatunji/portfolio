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
 * Admin login credentials
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * User signin credentials (normal user)
 */
export interface SigninCredentials {
  username: string;
  password: string;
}

/**
 * User signup data (normal user)
 */
export interface SignupCredentials {
  username: string;
  email: string;
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
