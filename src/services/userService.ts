import api from "@/utilities/api";
import type { User, UserRole } from "@/interfaces/auth";
import type { UsersListResponse, UsersQueryParams } from "@/interfaces/user";
import type { ApiResponse } from "@/interfaces/base";

/**
 * Users Service
 * Pure API calls without state management
 */
class UserService {
  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>("/users/me");
    return response.data.data;
  }

  /**
   * Get all users (Admin only)
   */
  async getUsers(params?: UsersQueryParams): Promise<UsersListResponse> {
    const response = await api.get<ApiResponse<UsersListResponse>>("/users", {
      params,
    });
    return response.data.data;
  }

  /**
   * Update user role (Admin only)
   */
  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    const response = await api.put<ApiResponse<User>>(`/users/${userId}/role`, { name: role });
    return response.data.data;
  }
}

export const userService = new UserService();
