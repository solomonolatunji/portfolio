import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminAuthStore = defineStore("adminAuth", () => {
  const isAuthenticated = ref(false);
  const user = ref<{ username: string } | null>(null);

  const adminUser = {
    username: "admin",
    password: "admin123",
  };

  function login(username: string, password: string) {
    if (username === adminUser.username && password === adminUser.password) {
      isAuthenticated.value = true;
      user.value = { username };
      sessionStorage.setItem(
        "adminAuth",
        JSON.stringify({ isAuthenticated: true, user: { username } })
      );
      return true;
    }
    return false;
  }

  function logout() {
    isAuthenticated.value = false;
    user.value = null;

    sessionStorage.removeItem("adminAuth");
  }

  function initializeFromStorage() {
    const storedAuth = sessionStorage.getItem("adminAuth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      isAuthenticated.value = authData.isAuthenticated;
      user.value = authData.user;
    }
  }

  return { isAuthenticated, user, login, logout, initializeFromStorage };
});
