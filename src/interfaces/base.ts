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
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  statusCode: number;
  data: T[];
  meta: PaginationMeta;
}
