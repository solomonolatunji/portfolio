import { defineStore } from "pinia";
import type { Project, ProjectState } from "@/interfaces/project";

/**
 * Projects Store
 * State management for projects
 */
export const useProjectStore = defineStore("project", {
  state: (): ProjectState => ({
    projects: [],
    currentProject: null,
    isLoading: false,
    error: null,
    total: 0,
    pages: 0,
    currentPage: 1,
    hasNext: false,
    hasPrev: false,
  }),

  getters: {
    /**
     * Check if projects are loading
     */
    isLoadingProjects: (state): boolean => state.isLoading,

    /**
     * Get project by ID
     */
    getProjectById:
      (state) =>
      (id: string): Project | undefined => {
        return state.projects.find((project) => project.id === id);
      },

    /**
     * Get projects by category
     */
    getProjectsByCategory:
      (state) =>
      (category: string): Project[] => {
        return state.projects.filter((project) => project.categories.includes(category));
      },

    /**
     * Get projects by technology
     */
    getProjectsByTechnology:
      (state) =>
      (technology: string): Project[] => {
        return state.projects.filter((project) => project.technologies.includes(technology));
      },

    /**
     * Get projects by year
     */
    getProjectsByYear:
      (state) =>
      (year: string): Project[] => {
        return state.projects.filter((project) => project.year === year);
      },

    /**
     * Check if has projects
     */
    hasProjects: (state): boolean => state.projects.length > 0,

    /**
     * Get projects count
     */
    projectsCount: (state): number => state.projects.length,

    /**
     * Get all unique categories
     */
    allCategories: (state): string[] => {
      const categories = new Set<string>();
      state.projects.forEach((project) => {
        project.categories.forEach((cat) => categories.add(cat));
      });
      return Array.from(categories);
    },

    /**
     * Get all unique technologies
     */
    allTechnologies: (state): string[] => {
      const technologies = new Set<string>();
      state.projects.forEach((project) => {
        project.technologies.forEach((tech) => technologies.add(tech));
      });
      return Array.from(technologies);
    },
  },

  actions: {
    /**
     * Set projects with pagination metadata
     */
    setProjects(data: {
      projects: Project[];
      total: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
      nextPage?: number;
      currentPage?: number;
    }): void {
      this.projects = data.projects;
      this.total = data.total;
      this.pages = data.pages;
      this.hasNext = data.hasNext;
      this.hasPrev = data.hasPrev;
      this.currentPage = data.currentPage || 1;
    },

    /**
     * Set current project
     */
    setCurrentProject(project: Project | null): void {
      this.currentProject = project;
    },

    /**
     * Add project to list
     */
    addProject(project: Project): void {
      this.projects.unshift(project);
      this.total += 1;
    },

    /**
     * Update project in list
     */
    updateProjectItem(project: Project): void {
      const index = this.projects.findIndex((p) => p.id === project.id);
      if (index !== -1) {
        this.projects[index] = project;
      }
    },

    /**
     * Remove project from list
     */
    removeProject(id: string): void {
      const index = this.projects.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.projects.splice(index, 1);
        this.total -= 1;
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
     * Set current page
     */
    setCurrentPage(page: number): void {
      this.currentPage = page;
    },

    /**
     * Clear all state
     */
    clearState(): void {
      this.projects = [];
      this.currentProject = null;
      this.isLoading = false;
      this.error = null;
      this.total = 0;
      this.pages = 0;
      this.currentPage = 1;
      this.hasNext = false;
      this.hasPrev = false;
    },
  },
});
