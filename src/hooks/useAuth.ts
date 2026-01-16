import { computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import type { LoginCredentials, SigninCredentials, SignupCredentials } from "@/interfaces/auth";

/**
 * Authentication Hook
 * Combines service calls with state management
 * Similar to TanStack Query pattern but simpler
 */
export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();
  const toast = useToast();

  const isLoading = computed(() => authStore.isLoading);
  const error = computed(() => authStore.error);
  const user = computed(() => authStore.currentUser);
  const isLoggedIn = computed(() => authStore.isLoggedIn);

  /**
   * Login Admin
   */
  const loginAdmin = async (credentials: LoginCredentials): Promise<void> => {
    authStore.setLoading(true);
    authStore.clearError();

    try {
      const authData = await authService.loginAdmin(credentials);

      // Update store with auth data including refreshToken
      authStore.setAuth(authData.accessToken, authData.refreshToken, authData.user);

      toast.success(`Welcome back, ${authData.user.username}!`);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Admin login failed. Please check your credentials.";

      authStore.setError(errorMessage);
      toast.error(errorMessage);

      throw err;
    } finally {
      authStore.setLoading(false);
    }
  };

  /**
   * User signup
   */
  const signup = async (credentials: SignupCredentials): Promise<void> => {
    authStore.setLoading(true);
    authStore.clearError();

    try {
      const authData = await authService.signup(credentials);

      // Update store with auth data
      authStore.setAuth(authData.accessToken, authData.refreshToken, authData.user);

      toast.success(`Welcome, ${authData.user.username}! Your account has been created.`);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Signup failed. Please try again.";

      authStore.setError(errorMessage);
      toast.error(errorMessage);

      throw err;
    } finally {
      authStore.setLoading(false);
    }
  };

  /**
   * User signin
   */
  const signin = async (credentials: SigninCredentials): Promise<void> => {
    authStore.setLoading(true);
    authStore.clearError();

    try {
      const authData = await authService.signin(credentials);

      // Update store with auth data
      authStore.setAuth(authData.accessToken, authData.refreshToken, authData.user);

      toast.success(`Welcome back, ${authData.user.username}!`);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Signin failed. Please check your credentials.";

      authStore.setError(errorMessage);
      toast.error(errorMessage);

      throw err;
    } finally {
      authStore.setLoading(false);
    }
  };

  /**
   * Logout
   */
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      authStore.clearAuth();
      toast.info("You have been logged out");
      router.push("/admin");
    }
  };

  /**
   * Initialize auth on app start
   */
  const initializeAuth = (): void => {
    authStore.initializeAuth();
  };

  return {
    // State
    isLoading,
    error,
    user,
    isLoggedIn,

    // Actions
    loginAdmin,
    signup,
    signin,
    logout,
    initializeAuth,

    // Utilities
    clearError: () => authStore.clearError(),
  };
}
