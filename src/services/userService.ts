import api from "@/utilities/api";
import type { User, UserRole } from "@/interfaces/auth";
import type { UsersListResponse, UsersQueryParams } from "@/interfaces/user";
import type { ApiResponse } from "@/interfaces/base";

class UserService {
  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>("/users/me");
    return response.data.data;
  }

  async getUsers(params?: UsersQueryParams): Promise<UsersListResponse> {
    const response = await api.get<ApiResponse<UsersListResponse>>("/users", {
      params,
    });
    return response.data.data;
  }

  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    const response = await api.put<ApiResponse<User>>(`/users/${userId}/role`, { name: role });
    return response.data.data;
  }

  async createUser(payload: {
    username: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<User> {
    const response = await api.post<ApiResponse<User>>("/users", payload);
    return response.data.data;
  }

  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`);
  }
}

export const userService = new UserService();
