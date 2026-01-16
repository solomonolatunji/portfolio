import { defineStore } from "pinia";
import type { Category, CategoryState } from "@/interfaces/category";

/**
 * Categories Store
 * State management for categories
 */
export const useCategoryStore = defineStore("category", {
  state: (): CategoryState => ({
    categories: [],
    currentCategory: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    /**
     * Check if categories are loading
     */
    isLoadingCategories: (state): boolean => state.isLoading,

    /**
     * Get category by ID
     */
    getCategoryById:
      (state) =>
      (id: string): Category | undefined => {
        return state.categories.find((category) => category.id === id);
      },

    /**
     * Get category by slug
     */
    getCategoryBySlug:
      (state) =>
      (slug: string): Category | undefined => {
        return state.categories.find((category) => category.slug === slug);
      },

    /**
     * Check if has categories
     */
    hasCategories: (state): boolean => state.categories.length > 0,

    /**
     * Get categories count
     */
    categoriesCount: (state): number => state.categories.length,
  },

  actions: {
    /**
     * Set categories
     */
    setCategories(categories: Category[]): void {
      this.categories = categories;
    },

    /**
     * Set current category
     */
    setCurrentCategory(category: Category | null): void {
      this.currentCategory = category;
    },

    /**
     * Add category to list
     */
    addCategory(category: Category): void {
      this.categories.push(category);
    },

    /**
     * Update category in list
     */
    updateCategoryItem(category: Category): void {
      const index = this.categories.findIndex((c) => c.id === category.id);
      if (index !== -1) {
        this.categories[index] = category;
      }
    },

    /**
     * Remove category from list
     */
    removeCategory(id: string): void {
      const index = this.categories.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.categories.splice(index, 1);
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
     * Clear all state
     */
    clearState(): void {
      this.categories = [];
      this.currentCategory = null;
      this.isLoading = false;
      this.error = null;
    },
  },
});
