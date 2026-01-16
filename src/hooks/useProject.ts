import { computed } from "vue";
import { useToast } from "vue-toastification";
import { useProjectStore } from "@/stores/projectStore";
import { projectService } from "@/services/projectService";
import type {
  Project,
  ProjectsQueryParams,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/interfaces/project";

/**
 * Projects Hook
 * Combines service calls with state management
 * Similar to TanStack Query pattern but simpler
 */
export function useProject() {
  const projectStore = useProjectStore();
  const toast = useToast();

  const isLoading = computed(() => projectStore.isLoading);
  const error = computed(() => projectStore.error);
  const projects = computed(() => projectStore.projects);
  const currentProject = computed(() => projectStore.currentProject);
  const total = computed(() => projectStore.total);
  const pages = computed(() => projectStore.pages);
  const currentPage = computed(() => projectStore.currentPage);
  const hasNext = computed(() => projectStore.hasNext);
  const hasPrev = computed(() => projectStore.hasPrev);
  const allCategories = computed(() => projectStore.allCategories);
  const allTechnologies = computed(() => projectStore.allTechnologies);

  /**
   * Fetch projects with optional filters
   */
  const fetchProjects = async (params?: ProjectsQueryParams): Promise<void> => {
    projectStore.setLoading(true);
    projectStore.clearError();

    try {
      const data = await projectService.getProjects(params);
      projectStore.setProjects(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch projects";
      projectStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      projectStore.setLoading(false);
    }
  };

  /**
   * Fetch project by ID
   */
  const fetchProjectById = async (id: string): Promise<void> => {
    projectStore.setLoading(true);
    projectStore.clearError();

    try {
      const data = await projectService.getProjectById(id);
      projectStore.setCurrentProject(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch project";
      projectStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      projectStore.setLoading(false);
    }
  };

  /**
   * Create project (Admin only)
   */
  const createProject = async (payload: CreateProjectPayload): Promise<void> => {
    projectStore.setLoading(true);
    projectStore.clearError();

    try {
      const data = await projectService.createProject(payload);
      projectStore.addProject(data);
      toast.success("Project created successfully");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create project";
      projectStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      projectStore.setLoading(false);
    }
  };

  /**
   * Update project (Admin only)
   */
  const updateProject = async (id: string, payload: UpdateProjectPayload): Promise<void> => {
    projectStore.setLoading(true);
    projectStore.clearError();

    try {
      const data = await projectService.updateProject(id, payload);
      projectStore.updateProjectItem(data);
      if (projectStore.currentProject?.id === id) {
        projectStore.setCurrentProject(data);
      }
      toast.success("Project updated successfully");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update project";
      projectStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      projectStore.setLoading(false);
    }
  };

  /**
   * Delete project (Admin only)
   */
  const deleteProject = async (id: string): Promise<void> => {
    projectStore.setLoading(true);
    projectStore.clearError();

    try {
      await projectService.deleteProject(id);
      projectStore.removeProject(id);
      toast.success("Project deleted successfully");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete project";
      projectStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      projectStore.setLoading(false);
    }
  };

  /**
   * Clear current project
   */
  const clearCurrentProject = (): void => {
    projectStore.setCurrentProject(null);
  };

  /**
   * Get projects by category
   */
  const getProjectsByCategory = (category: string): Project[] => {
    return projectStore.getProjectsByCategory(category);
  };

  /**
   * Get projects by technology
   */
  const getProjectsByTechnology = (technology: string): Project[] => {
    return projectStore.getProjectsByTechnology(technology);
  };

  /**
   * Get projects by year
   */
  const getProjectsByYear = (year: string): Project[] => {
    return projectStore.getProjectsByYear(year);
  };

  return {
    // State
    isLoading,
    error,
    projects,
    currentProject,
    total,
    pages,
    currentPage,
    hasNext,
    hasPrev,
    allCategories,
    allTechnologies,

    // Actions
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,

    // Utilities
    clearCurrentProject,
    getProjectsByCategory,
    getProjectsByTechnology,
    getProjectsByYear,
    clearError: () => projectStore.clearError(),
  };
}
