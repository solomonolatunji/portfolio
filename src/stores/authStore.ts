import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import api from "@/utilities/api";
import type { AuthState, LoginCredentials, AuthData, User } from "@/interfaces/auth";
import type { ApiResponse } from "@/interfaces/base";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    /**
     * Check if user is authenticated
     */
    isLoggedIn: (state): boolean => {
      return state.isAuthenticated && !!state.token && !!state.user;
    },

    /**
     * Get current user
     */
    currentUser: (state): User | null => {
      return state.user;
    },

    /**
     * Get user role
     */
    userRole: (state): string | null => {
      return state.user?.role || null;
    },
  },

  actions: {
    /**
     * Initialize authentication from localStorage
     */
    initializeAuth(): void {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userStr = localStorage.getItem(AUTH_USER_KEY);

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr) as User;
          this.token = token;
          this.user = user;
          this.isAuthenticated = true;
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
          this.logout();
        }
      }
    },

    /**
     * Login with credentials
     */
    async login(credentials: LoginCredentials): Promise<void> {
      this.isLoading = true;
      this.error = null;

      const toast = useToast();

      try {
        const response = await api.post<ApiResponse<AuthData>>("/auth/admin/signing", credentials);

        const { accessToken, user } = response.data.data;

        // Store authentication data
        this.token = accessToken;
        this.user = user;
        this.isAuthenticated = true;

        // Persist to localStorage
        localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

        toast.success(`Welcome back, ${user.username}!`);
      } catch (error: any) {
        console.error("Login failed:", error);

        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your credentials.";

        this.error = errorMessage;
        toast.error(errorMessage);

        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Logout user
     */
    logout(): void {
      const toast = useToast();

      // Clear state
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;

      // Clear localStorage
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);

      toast.info("You have been logged out");
    },

    /**
     * Clear error message
     */
    clearError(): void {
      this.error = null;
    },
  },
});
