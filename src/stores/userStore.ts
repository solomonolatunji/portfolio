import { defineStore } from "pinia";
import type { User, UserRole } from "@/interfaces/auth";
import type { UserState, UsersListResponse } from "@/interfaces/user";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    currentUser: null,
    users: [],
    isLoading: false,
    error: null,
    total: 0,
    pages: 0,
    currentPage: 1,
    hasNext: false,
    hasPrev: false,
  }),

  getters: {
    isLoadingUsers: (state): boolean => state.isLoading,

    getUserById:
      (state) =>
      (id: string): User | undefined => {
        return state.users.find((user) => user.id === id);
      },

    getUsersByRole:
      (state) =>
      (role: UserRole): User[] => {
        return state.users.filter((user) => user.role === role);
      },

    hasUsers: (state): boolean => state.users.length > 0,

    usersCount: (state): number => state.users.length,
  },

  actions: {
    setCurrentUser(user: User | null): void {
      this.currentUser = user;
    },

    setUsers(data: UsersListResponse): void {
      this.users = data.data;
      this.total = data.meta.total;
      this.pages = data.meta.totalPages;
      this.currentPage = data.meta.page;
      this.hasNext = data.meta.hasNext;
      this.hasPrev = data.meta.hasPrev;
    },

    updateUserItem(user: User): void {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
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

    setCurrentPage(page: number): void {
      this.currentPage = page;
    },

    clearState(): void {
      this.currentUser = null;
      this.users = [];
      this.isLoading = false;
      this.error = null;
      this.total = 0;
      this.pages = 0;
      this.currentPage = 1;
      this.hasNext = false;
      this.hasPrev = false;
    },
  },
});
