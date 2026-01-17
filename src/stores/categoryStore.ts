import { defineStore } from "pinia";
import type { Category, CategoryState } from "@/interfaces/category";

export const useCategoryStore = defineStore("category", {
  state: (): CategoryState => ({
    categories: [],
    currentCategory: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isLoadingCategories: (state): boolean => state.isLoading,

    getCategoryById:
      (state) =>
      (id: string): Category | undefined => {
        return state.categories.find((category) => category.id === id);
      },

    getCategoryBySlug:
      (state) =>
      (slug: string): Category | undefined => {
        return state.categories.find((category) => category.slug === slug);
      },

    hasCategories: (state): boolean => state.categories.length > 0,

    categoriesCount: (state): number => state.categories.length,
  },

  actions: {
    setCategories(categories: Category[]): void {
      this.categories = categories;
    },

    setCurrentCategory(category: Category | null): void {
      this.currentCategory = category;
    },

    addCategory(category: Category): void {
      this.categories.push(category);
    },

    updateCategoryItem(category: Category): void {
      const index = this.categories.findIndex((c) => c.id === category.id);
      if (index !== -1) {
        this.categories[index] = category;
      }
    },

    removeCategory(id: string): void {
      const index = this.categories.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.categories.splice(index, 1);
      }
    },

    setLoading(loading: boolean): void {
      this.isLoading = loading;
    },

    setError(error: string | null): void {
      this.error = error;
    },

    clearError(): void {
      this.error = null;
    },

    clearState(): void {
      this.categories = [];
      this.currentCategory = null;
      this.isLoading = false;
      this.error = null;
    },
  },
});
