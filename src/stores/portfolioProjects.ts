import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "./api";
import type {
  Project,
  ProjectsResponse,
  ProjectResponse,
  PaginationMeta,
  ProjectForm,
} from "@/interfaces/portfolio";

export const usePortfolioStore = defineStore("portfolio", () => {
  const projects = ref<Project[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentProject = ref<Project | null>(null);
  const pagination = ref<PaginationMeta | null>(null);
  const categories = ref<string[]>(["web", "mobile", "ui"]);

  const hasProjects = computed(() => projects.value.length > 0);
  const featuredProjects = computed(() =>
    projects.value.filter((project) =>
      project.media?.some((media) => media.is_featured)
    )
  );

  const mapApiProject = (project: Project): Project => {
    const featuredMedia =
      project.media?.find((m) => m.is_featured) || project.media?.[0];

    return {
      ...project,
      detailedDescription: project.content,
      image: featuredMedia?.url || project.image,
      codeUrl: project.github_url,
      demoUrl: project.demo_url,
      technologies: project.technologies || [],
    };
  };

  async function fetchProjects(params = { per_page: 10, page: 1 }) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<ProjectsResponse>("/portfolio/projects", {
        params,
      });
      projects.value = response.data.data.map(mapApiProject);
      pagination.value = response.data.meta;
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch projects";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchProjectsByCategory(
    category: string,
    params = { per_page: 10, page: 1 }
  ) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<ProjectsResponse>(
        `/portfolio/projects/category/${category}`,
        { params }
      );
      projects.value = response.data.data.map(mapApiProject);
      pagination.value = response.data.meta;
      return response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to fetch projects by category";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchProjectBySlug(slug: string) {
    loading.value = true;
    error.value = null;
    currentProject.value = null;

    try {
      const response = await api.get<ProjectResponse>(
        `/portfolio/projects/${slug}`
      );
      currentProject.value = mapApiProject(response.data.data);
      return currentProject.value;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to fetch project details";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createProject(projectData: ProjectForm) {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();

      Object.entries(projectData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "featured_image" && value instanceof File) {
            formData.append(key, value);
          } else if (key === "gallery" && Array.isArray(value)) {
            value.forEach((file: File) => {
              formData.append("gallery[]", file);
            });
          } else if (key === "technologies" && Array.isArray(value)) {
            value.forEach((tech: number) => {
              formData.append("technologies[]", tech.toString());
            });
          } else if (key === "features" && Array.isArray(value)) {
            value.forEach((feature, index) => {
              formData.append(`features[${index}][title]`, feature.title);
            });
          } else if (key === "media_ids_to_delete" && Array.isArray(value)) {
            value.forEach((id: number) => {
              formData.append("media_ids_to_delete[]", id.toString());
            });
          } else if (typeof value !== "object") {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await api.post<ProjectResponse>(
        "/portfolio/projects",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newProject = mapApiProject(response.data.data);
      projects.value.unshift(newProject);

      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create project";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateProject(id: number | string, projectData: ProjectForm) {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();

      formData.append("_method", "PUT");

      Object.entries(projectData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "featured_image" && value instanceof File) {
            formData.append(key, value);
          } else if (key === "gallery" && Array.isArray(value)) {
            value.forEach((file: File) => {
              formData.append("gallery[]", file);
            });
          } else if (key === "technologies" && Array.isArray(value)) {
            value.forEach((tech: number) => {
              formData.append("technologies[]", tech.toString());
            });
          } else if (key === "features" && Array.isArray(value)) {
            value.forEach((feature, index) => {
              formData.append(`features[${index}][title]`, feature.title);
            });
          } else if (key === "media_ids_to_delete" && Array.isArray(value)) {
            value.forEach((mediaId: number) => {
              formData.append("media_ids_to_delete[]", mediaId.toString());
            });
          } else if (typeof value !== "object") {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await api.post<ProjectResponse>(
        `/portfolio/projects/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProject = mapApiProject(response.data.data);
      const index = projects.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        projects.value[index] = updatedProject;
      }

      if (currentProject.value && currentProject.value.id === id) {
        currentProject.value = updatedProject;
      }

      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update project";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteProject(id: number | string) {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/portfolio/projects/${id}`);

      const index = projects.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        projects.value.splice(index, 1);
      }

      if (currentProject.value && currentProject.value.id === id) {
        currentProject.value = null;
      }

      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to delete project";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function getProjectById(id: string | number) {
    return projects.value.find((p) => p.id == id) || null;
  }

  return {
    projects,
    loading,
    error,
    currentProject,
    pagination,
    categories,

    hasProjects,
    featuredProjects,

    fetchProjects,
    fetchProjectsByCategory,
    fetchProjectBySlug,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
  };
});
