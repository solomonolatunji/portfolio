import { defineStore } from "pinia";
import type { User, UserRole } from "@/interfaces/auth";
import type { UserState, UsersListResponse } from "@/interfaces/user";

/**
 * Users Store
 * State management for users
 */
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
    /**
     * Check if users are loading
     */
    isLoadingUsers: (state): boolean => state.isLoading,

    /**
     * Get user by ID
     */
    getUserById:
      (state) =>
      (id: string): User | undefined => {
        return state.users.find((user) => user.id === id);
      },

    /**
     * Get users by role
     */
    getUsersByRole:
      (state) =>
      (role: UserRole): User[] => {
        return state.users.filter((user) => user.role === role);
      },

    /**
     * Check if has users
     */
    hasUsers: (state): boolean => state.users.length > 0,

    /**
     * Get users count
     */
    usersCount: (state): number => state.users.length,
  },

  actions: {
    /**
     * Set current user
     */
    setCurrentUser(user: User | null): void {
      this.currentUser = user;
    },

    /**
     * Set users with pagination metadata
     */
    setUsers(data: UsersListResponse): void {
      this.users = data.users;
      this.total = data.total;
      this.pages = data.pages;
      this.currentPage = data.currentPage;
      this.hasNext = data.hasNext;
      this.hasPrev = data.hasPrev;
    },

    /**
     * Update user in list
     */
    updateUserItem(user: User): void {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      }
    },

    /**
     * Set loading state
     */
    setLoading(loading: boolean): void {
      this.isLoading = loading;
    },

    /**
     * Set error
     */
    setError(error: string | null): void {
      this.error = error;
    },

    /**
     * Clear error
     */
    clearError(): void {
      this.error = null;
    },

    /**
     * Set current page
     */
    setCurrentPage(page: number): void {
      this.currentPage = page;
    },

    /**
     * Clear all state
     */
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
