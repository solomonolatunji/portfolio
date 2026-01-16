import api from "@/utilities/api";
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from "@/interfaces/category";
import type { ApiResponse } from "@/interfaces/base";

/**
 * Categories Service
 * Pure API calls without state management
 */
class CategoryService {
  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    const response = await api.get<ApiResponse<Category[]>>("/categories");
    return response.data.data;
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: string): Promise<Category> {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await api.get<ApiResponse<Category>>(`/categories/s/${slug}`);
    return response.data.data;
  }

  /**
   * Create category (Admin only)
   */
  async createCategory(payload: CreateCategoryPayload): Promise<Category> {
    const response = await api.post<ApiResponse<Category>>("/categories", payload);
    return response.data.data;
  }

  /**
   * Update category by ID (Admin only)
   */
  async updateCategory(id: string, payload: UpdateCategoryPayload): Promise<Category> {
    const response = await api.patch<ApiResponse<Category>>(`/categories/${id}`, payload);
    return response.data.data;
  }

  /**
   * Delete category by ID (Admin only)
   */
  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  }
}

export const categoryService = new CategoryService();
