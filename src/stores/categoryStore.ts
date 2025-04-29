import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "./api";
import type {
  Category,
  CategoryForm,
  CategoryResponse,
  CategoriesResponse,
} from "@/interfaces/portfolio";

export const useCategoryStore = defineStore("categories", () => {
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCategories() {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<CategoriesResponse>(
        "/portfolio/categories"
      );
      categories.value = response.data.data;
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch categories";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createCategory(categoryData: CategoryForm) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post<CategoryResponse>(
        "/portfolio/categories",
        categoryData
      );

      const newCategory = response.data.data;
      categories.value.push(newCategory);

      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create category";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateCategory(id: number, categoryData: CategoryForm) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.put<CategoryResponse>(
        `/portfolio/categories/${id}`,
        categoryData
      );

      const updatedCategory = response.data.data;
      const index = categories.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        categories.value[index] = updatedCategory;
      }

      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update category";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteCategory(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/portfolio/categories/${id}`);

      const index = categories.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        categories.value.splice(index, 1);
      }

      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to delete category";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function getCategoryById(id: number) {
    return categories.value.find((c) => c.id === id) || null;
  }

  return {
    categories,
    loading,
    error,

    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
});
