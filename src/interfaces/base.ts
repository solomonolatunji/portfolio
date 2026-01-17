/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}

/**
 * API error response
 */
export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number | null;
  prevPage?: number | null;
}

/**
 * Paginated response data wrapper
 */
export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Paginated API response
 * Example: { statusCode: 200, data: { posts: [...], total: 45, pages: 5, ... } }
 */
export interface PaginatedResponse<T> {
  statusCode: number;
  data: PaginatedData<T>;
}
