import type {
  AdminCredentials,
  AdminUser,
  AuthResponse,
  LogoutResponse,
  UserProfileResponse,
} from "@/interfaces/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { api } from "./api";

export const useAdminAuthStore = defineStore("adminAuth", () => {
  const isAuthenticated = ref(false);
  const user = ref<AdminUser | null>(null);
  const token = ref<string | null>(null);
  const tokenExpiry = ref<number | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  function initializeFromStorage() {
    const storedToken =
      localStorage.getItem("admin_token") ||
      sessionStorage.getItem("admin_token");
    const storedUser =
      localStorage.getItem("admin_user") ||
      sessionStorage.getItem("admin_user");
    const storedExpiry =
      localStorage.getItem("token_expiry") ||
      sessionStorage.getItem("token_expiry");

    if (storedToken && storedUser && storedExpiry) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
      tokenExpiry.value = parseInt(storedExpiry);

      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = tokenExpiry.value <= currentTime;

      isAuthenticated.value = !isExpired;

      if (isAuthenticated.value) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
      }
    }
  }

  async function login(credentials: AdminCredentials): Promise<boolean> {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);

      if (response.data.status && response.data.data) {
        const { access_token, expires_in, user: userData } = response.data.data;

        token.value = access_token;
        user.value = userData;
        isAuthenticated.value = true;
        tokenExpiry.value = Math.floor(Date.now() / 1000) + expires_in;

        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

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
      const response = await api.get<UserProfileResponse>("/auth/user");

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
      const response = await api.post<AuthResponse>("/auth/refresh");

      if (response.data.status && response.data.data) {
        const { access_token, expires_in, user: userData } = response.data.data;

        token.value = access_token;
        user.value = userData;
        tokenExpiry.value = Math.floor(Date.now() / 1000) + expires_in;
        isAuthenticated.value = true;

        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

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
        await api.post<LogoutResponse>("/auth/logout");
      } catch (err) {
        console.error("Logout API error:", err);
      }
    }

    clearAuthState();
  }

  function clearAuthState(): void {
    isAuthenticated.value = false;
    user.value = null;
    token.value = null;
    tokenExpiry.value = null;
    error.value = null;

    delete api.defaults.headers.common["Authorization"];

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

    if (tokenExpiry.value && currentTime >= tokenExpiry.value) {
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

api.interceptors.request.use(async (config) => {
  const authStore = useAdminAuthStore();

  if (authStore.isAuthenticated) {
    await authStore.ensureValidToken();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
  }

  return config;
});

export { api };
