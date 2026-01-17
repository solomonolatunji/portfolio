import type { User, UserRole } from "@/interfaces/auth";
import type { PaginationMeta } from "@/interfaces/base";

/**
 * Users list response structure
 */
export interface UsersListResponse {
  data: User[];
  meta: PaginationMeta;
}

/**
 * Update user role payload
 */
export interface UpdateUserRolePayload {
  name: UserRole;
}

/**
 * Users query parameters
 */
export interface UsersQueryParams {
  username?: string;
  email?: string;
  role?: UserRole;
  page?: number;
  limit?: number;
}

/**
 * User state
 */
export interface UserState {
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;
  total: number;
  pages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}
