import { computed } from "vue";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/userStore";
import { userService } from "@/services/userService";
import type { User, UserRole } from "@/interfaces/auth";
import type { UsersQueryParams } from "@/interfaces/user";

/**
 * Users Hook
 * Combines service calls with state management
 * Similar to TanStack Query pattern but simpler
 */
export function useUser() {
  const userStore = useUserStore();
  const toast = useToast();

  const isLoading = computed(() => userStore.isLoading);
  const error = computed(() => userStore.error);
  const currentUser = computed(() => userStore.currentUser);
  const users = computed(() => userStore.users);
  const total = computed(() => userStore.total);
  const pages = computed(() => userStore.pages);
  const currentPage = computed(() => userStore.currentPage);
  const hasNext = computed(() => userStore.hasNext);
  const hasPrev = computed(() => userStore.hasPrev);

  /**
   * Fetch current user profile
   */
  const fetchCurrentUser = async (): Promise<void> => {
    userStore.setLoading(true);
    userStore.clearError();

    try {
      const data = await userService.getCurrentUser();
      userStore.setCurrentUser(data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch current user";
      userStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      userStore.setLoading(false);
    }
  };

  /**
   * Fetch all users (Admin only)
   */
  const fetchUsers = async (params?: UsersQueryParams): Promise<void> => {
    userStore.setLoading(true);
    userStore.clearError();

    try {
      const data = await userService.getUsers(params);
      userStore.setUsers(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch users";
      userStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      userStore.setLoading(false);
    }
  };

  /**
   * Update user role (Admin only)
   */
  const updateUserRole = async (userId: string, role: UserRole): Promise<void> => {
    userStore.setLoading(true);
    userStore.clearError();

    try {
      const data = await userService.updateUserRole(userId, role);
      userStore.updateUserItem(data);
      toast.success("User role updated successfully");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update user role";
      userStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      userStore.setLoading(false);
    }
  };

  const createUser = async (payload: {
    username: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<void> => {
    userStore.setLoading(true);
    userStore.clearError();

    try {
      await userService.createUser(payload);
      toast.success("User created successfully");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create user";
      userStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      userStore.setLoading(false);
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    userStore.setLoading(true);
    userStore.clearError();

    try {
      await userService.deleteUser(userId);
      toast.success("User deleted successfully");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete user";
      userStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      userStore.setLoading(false);
    }
  };

  /**
   * Get user by ID
   */
  const getUserById = (id: string): User | undefined => {
    return userStore.getUserById(id);
  };

  /**
   * Get users by role
   */
  const getUsersByRole = (role: UserRole): User[] => {
    return userStore.getUsersByRole(role);
  };

  return {
    // State
    isLoading,
    error,
    currentUser,
    users,
    total,
    pages,
    currentPage,
    hasNext,
    hasPrev,

    // Actions
    fetchCurrentUser,
    fetchUsers,
    updateUserRole,
    createUser,
    deleteUser,

    // Utilities
    getUserById,
    getUsersByRole,
    clearError: () => userStore.clearError(),
  };
}
