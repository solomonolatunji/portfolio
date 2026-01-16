import { computed } from "vue";
import { useToast } from "vue-toastification";
import { useCategoryStore } from "@/stores/categoryStore";
import { categoryService } from "@/services/categoryService";
import type { CreateCategoryPayload, UpdateCategoryPayload } from "@/interfaces/category";

/**
 * Categories Hook
 * Combines service calls with state management
 * Similar to TanStack Query pattern but simpler
 */
export function useCategory() {
  const categoryStore = useCategoryStore();
  const toast = useToast();

  const isLoading = computed(() => categoryStore.isLoading);
  const error = computed(() => categoryStore.error);
  const categories = computed(() => categoryStore.categories);
  const currentCategory = computed(() => categoryStore.currentCategory);

  /**
   * Fetch all categories
   */
  const fetchCategories = async (): Promise<void> => {
    categoryStore.setLoading(true);
    categoryStore.clearError();

    try {
      const data = await categoryService.getCategories();
      categoryStore.setCategories(data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch categories";
      categoryStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      categoryStore.setLoading(false);
    }
  };

  /**
   * Fetch category by ID
   */
  const fetchCategoryById = async (id: string): Promise<void> => {
    categoryStore.setLoading(true);
    categoryStore.clearError();

    try {
      const data = await categoryService.getCategoryById(id);
      categoryStore.setCurrentCategory(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch category";
      categoryStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      categoryStore.setLoading(false);
    }
  };

  /**
   * Fetch category by slug
   */
  const fetchCategoryBySlug = async (slug: string): Promise<void> => {
    categoryStore.setLoading(true);
    categoryStore.clearError();

    try {
      const data = await categoryService.getCategoryBySlug(slug);
      categoryStore.setCurrentCategory(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch category";
      categoryStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      categoryStore.setLoading(false);
    }
  };

  /**
   * Create category (Admin only)
   */
  const createCategory = async (payload: CreateCategoryPayload): Promise<void> => {
    categoryStore.setLoading(true);
    categoryStore.clearError();

    try {
      const data = await categoryService.createCategory(payload);
      categoryStore.addCategory(data);
      toast.success("Category created successfully");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to create category";
      categoryStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      categoryStore.setLoading(false);
    }
  };

  /**
   * Update category (Admin only)
   */
  const updateCategory = async (id: string, payload: UpdateCategoryPayload): Promise<void> => {
    categoryStore.setLoading(true);
    categoryStore.clearError();

    try {
      const data = await categoryService.updateCategory(id, payload);
      categoryStore.updateCategoryItem(data);
      if (categoryStore.currentCategory?.id === id) {
        categoryStore.setCurrentCategory(data);
      }
      toast.success("Category updated successfully");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update category";
      categoryStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      categoryStore.setLoading(false);
    }
  };

  /**
   * Delete category (Admin only)
   */
  const deleteCategory = async (id: string): Promise<void> => {
    categoryStore.setLoading(true);
    categoryStore.clearError();

    try {
      await categoryService.deleteCategory(id);
      categoryStore.removeCategory(id);
      toast.success("Category deleted successfully");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete category";
      categoryStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      categoryStore.setLoading(false);
    }
  };

  /**
   * Clear current category
   */
  const clearCurrentCategory = (): void => {
    categoryStore.setCurrentCategory(null);
  };

  return {
    // State
    isLoading,
    error,
    categories,
    currentCategory,

    // Actions
    fetchCategories,
    fetchCategoryById,
    fetchCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,

    // Utilities
    clearCurrentCategory,
    clearError: () => categoryStore.clearError(),
  };
}
