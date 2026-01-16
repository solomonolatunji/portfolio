import api from "@/utilities/api";
import type {
  LoginCredentials,
  SigninCredentials,
  SignupCredentials,
  AuthData,
} from "@/interfaces/auth";
import type { ApiResponse } from "@/interfaces/base";

/**
 * Authentication Service
 * Pure API calls without state management
 */
class AuthService {
  /**
   * Admin login
   * @param credentials - Admin login credentials
   * @returns Promise with auth data
   */
  async loginAdmin(credentials: LoginCredentials): Promise<AuthData> {
    const response = await api.post<ApiResponse<AuthData>>("/auth/admin/signing", credentials);
    return response.data.data;
  }

  /**
   * User signup
   * @param credentials - Signup credentials
   * @returns Promise with auth data
   */
  async signup(credentials: SignupCredentials): Promise<AuthData> {
    const response = await api.post<ApiResponse<AuthData>>("/auth/signup", credentials);
    return response.data.data;
  }

  /**
   * User signin
   * @param credentials - Signin credentials
   * @returns Promise with auth data
   */
  async signin(credentials: SigninCredentials): Promise<AuthData> {
    const response = await api.post<ApiResponse<AuthData>>("/auth/signing", credentials);
    return response.data.data;
  }

  /**
   * Logout (client-side only)
   */
  async logout(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthData> {
    const response = await api.post<ApiResponse<AuthData>>("/auth/refresh", { refreshToken });
    return response.data.data;
  }

  /**
   * Get current user profile (if you have such endpoint)
   */
  async getCurrentUser(): Promise<AuthData["user"]> {
    const response = await api.get<ApiResponse<AuthData["user"]>>("/users/me");
    return response.data.data;
  }
}

export const authService = new AuthService();
