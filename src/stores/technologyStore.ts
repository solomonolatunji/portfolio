import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "./api";
import type {
  Technology,
  TechnologyForm,
  TechnologyResponse,
  TechnologiesResponse,
} from "@/interfaces/portfolio";

export const useTechnologyStore = defineStore("technologies", () => {
  const technologies = ref<Technology[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTechnologies() {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<TechnologiesResponse>(
        "/portfolio/technologies"
      );
      technologies.value = response.data.data;
      return response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to fetch technologies";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createTechnology(technologyData: TechnologyForm) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post<TechnologyResponse>(
        "/portfolio/technologies",
        technologyData
      );

      const newTechnology = response.data.data;
      technologies.value.push(newTechnology);

      return response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to create technology";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateTechnology(id: number, technologyData: TechnologyForm) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.put<TechnologyResponse>(
        `/portfolio/technologies/${id}`,
        technologyData
      );

      const updatedTechnology = response.data.data;
      const index = technologies.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        technologies.value[index] = updatedTechnology;
      }

      return response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to update technology";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteTechnology(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/portfolio/technologies/${id}`);

      const index = technologies.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        technologies.value.splice(index, 1);
      }

      return true;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to delete technology";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function getTechnologyById(id: number) {
    return technologies.value.find((t) => t.id === id) || null;
  }

  return {
    technologies,
    loading,
    error,

    fetchTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology,
    getTechnologyById,
  };
});
