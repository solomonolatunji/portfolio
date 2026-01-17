import { defineStore } from "pinia";
import type { AuthState, User } from "@/interfaces/auth";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_REFRESH_TOKEN_KEY = "auth_refresh_token";
const AUTH_USER_KEY = "auth_user";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state): boolean => {
      return state.isAuthenticated && !!state.token && !!state.user;
    },

    currentUser: (state): User | null => {
      return state.user;
    },

    userRole: (state): string | null => {
      return state.user?.role || null;
    },
  },

  actions: {
    setAuth(token: string, refreshToken: string, user: User): void {
      this.token = token;
      this.refreshToken = refreshToken;
      this.user = user;
      this.isAuthenticated = true;

      // Persist to localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    },

    updateTokens(token: string, refreshToken: string): void {
      this.token = token;
      this.refreshToken = refreshToken;

      // Update localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
    },

    clearAuth(): void {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      this.error = null;

      // Clear localStorage
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    },

    initializeAuth(): void {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
      const userStr = localStorage.getItem(AUTH_USER_KEY);

      if (token && refreshToken && userStr) {
        try {
          const user = JSON.parse(userStr) as User;
          this.token = token;
          this.refreshToken = refreshToken;
          this.user = user;
          this.isAuthenticated = true;
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
          this.clearAuth();
        }
      }
    },

    setLoading(loading: boolean): void {
      this.isLoading = loading;
    },

    setError(error: string | null): void {
      this.error = error;
    },

    clearError(): void {
      this.error = null;
    },
  },
});
