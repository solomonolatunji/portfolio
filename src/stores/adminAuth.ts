import type {
  AdminCredentials,
  AdminUser,
  AuthResponse,
  LogoutResponse,
  UserProfileResponse,
} from "@/interfaces/auth";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { authApi } from "./api";

export const useAdminAuthStore = defineStore("adminAuth", () => {
  const isAuthenticated = ref(false);
  const user = ref<AdminUser | null>(null);
  const token = ref<string | null>(null);
  const tokenExpiry = ref<number | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isTokenExpired = computed(() => {
    if (!tokenExpiry.value) return true;
    return Date.now() >= tokenExpiry.value * 1000;
  });

  function initializeFromStorage() {
    const storedToken = localStorage.getItem("admin_token");
    const storedUser = localStorage.getItem("admin_user");
    const storedExpiry = localStorage.getItem("token_expiry");

    if (storedToken && storedUser && storedExpiry) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
      tokenExpiry.value = parseInt(storedExpiry);
      isAuthenticated.value = !isTokenExpired.value;

      authApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.value}`;
    }
  }

  async function login(credentials: AdminCredentials): Promise<boolean> {
    loading.value = true;
    error.value = null;

    try {
      const response = await authApi.post<AuthResponse>(
        "/auth/login",
        credentials
      );

      if (response.data.status && response.data.data) {
        const { access_token, expires_in, user: userData } = response.data.data;

        token.value = access_token;
        user.value = userData;
        isAuthenticated.value = true;
        tokenExpiry.value = Math.floor(Date.now() / 1000) + expires_in;

        authApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        if (credentials.remember_me) {
          localStorage.setItem("admin_token", access_token);
          localStorage.setItem("admin_user", JSON.stringify(userData));
          localStorage.setItem("token_expiry", tokenExpiry.value.toString());
        } else {
          sessionStorage.setItem("admin_token", access_token);
          sessionStorage.setItem("admin_user", JSON.stringify(userData));
          sessionStorage.setItem("token_expiry", tokenExpiry.value.toString());
        }

        return true;
      }

      error.value = "Login failed";
      return false;
    } catch (err: any) {
      if (err.response?.status === 401) {
        error.value = "Invalid credentials";
      } else if (err.response?.status === 422) {
        error.value = "Validation error";
      } else {
        error.value = err.message || "Login failed";
      }
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function fetchUserProfile(): Promise<boolean> {
    if (!token.value) return false;

    try {
      const response = await authApi.get<UserProfileResponse>("/auth/me");

      if (response.data.status) {
        user.value = response.data.data;
        localStorage.setItem("admin_user", JSON.stringify(user.value));
        return true;
      }
      return false;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        const refreshed = await refreshToken();
        if (!refreshed) logout();
      }
      return false;
    }
  }

  async function refreshToken(): Promise<boolean> {
    try {
      const response = await authApi.post<AuthResponse>("/auth/refresh");

      if (response.data.status && response.data.data) {
        const { access_token, expires_in, user: userData } = response.data.data;

        token.value = access_token;
        user.value = userData;
        tokenExpiry.value = Math.floor(Date.now() / 1000) + expires_in;
        isAuthenticated.value = true;

        authApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        localStorage.setItem("admin_token", access_token);
        localStorage.setItem("admin_user", JSON.stringify(userData));
        localStorage.setItem("token_expiry", tokenExpiry.value.toString());

        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  async function logout(): Promise<void> {
    if (token.value) {
      try {
        await authApi.post<LogoutResponse>("/auth/logout");
      } catch (err) {
        console.error("Logout API error:", err);
      }
    }

    clearAuthState();
  }

  // Clear auth state
  function clearAuthState(): void {
    isAuthenticated.value = false;
    user.value = null;
    token.value = null;
    tokenExpiry.value = null;
    error.value = null;

    // Clear axios header
    delete authApi.defaults.headers.common["Authorization"];

    // Clear storage
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("token_expiry");
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_user");
    sessionStorage.removeItem("token_expiry");
  }

  async function ensureValidToken(): Promise<boolean> {
    if (!token.value) return false;

    const expiryBuffer = 300;
    const currentTime = Math.floor(Date.now() / 1000);

    if (tokenExpiry.value && tokenExpiry.value - currentTime < expiryBuffer) {
      return await refreshToken();
    }

    return true;
  }

  return {
    isAuthenticated,
    user,
    token,
    loading,
    error,
    login,
    logout,
    refreshToken,
    fetchUserProfile,
    ensureValidToken,
    clearAuthState,
    initializeFromStorage,
  };
});

authApi.interceptors.request.use(async (config) => {
  const authStore = useAdminAuthStore();

  if (authStore.isAuthenticated) {
    await authStore.ensureValidToken();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
  }

  return config;
});

export { authApi };
