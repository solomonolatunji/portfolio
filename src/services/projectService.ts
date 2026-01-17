import api from "@/utilities/api";
import type {
  Project,
  ProjectsQueryParams,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/interfaces/project";
import type { ApiResponse, PaginatedData } from "@/interfaces/base";

/**
 * Projects Service
 * Pure API calls without state management
 */
class ProjectService {
  /**
   * Get all projects with optional filters
   */
  async getProjects(params?: ProjectsQueryParams): Promise<PaginatedData<Project>> {
    const response = await api.get<ApiResponse<PaginatedData<Project>>>("/projects", {
      params,
    });
    return response.data.data;
  }

  /**
   * Get project by ID
   */
  async getProjectById(id: string): Promise<Project> {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data;
  }

  /**
   * Create project (Admin only)
   */
  async createProject(payload: CreateProjectPayload): Promise<Project> {
    const formData = new FormData();

    // Add all text fields
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("detailedDescription", payload.detailedDescription);
    formData.append("year", payload.year);
    formData.append("demoUrl", payload.demoUrl);
    formData.append("codeUrl", payload.codeUrl);
    formData.append("role", payload.role);
    formData.append("challenges", payload.challenges);

    // Add optional fields
    if (payload.googlePlayUrl) {
      formData.append("googlePlayUrl", payload.googlePlayUrl);
    }
    if (payload.appleStoreUrl) {
      formData.append("appleStoreUrl", payload.appleStoreUrl);
    }

    // Add arrays as JSON strings
    formData.append("categories", JSON.stringify(payload.categories));
    formData.append("technologies", JSON.stringify(payload.technologies));
    formData.append("features", JSON.stringify(payload.features));

    // Add image if provided
    if (payload.image instanceof File) {
      formData.append("image", payload.image);
    }

    // Add gallery images if provided
    if (payload.gallery && Array.isArray(payload.gallery)) {
      payload.gallery.forEach((image, index) => {
        if (image instanceof File) {
          formData.append(`gallery[${index}]`, image);
        }
      });
    }

    const response = await api.post<ApiResponse<Project>>("/projects", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  }

  /**
   * Update project by ID (Admin only)
   */
  async updateProject(id: string, payload: UpdateProjectPayload): Promise<Project> {
    const formData = new FormData();

    // Add text fields only if provided
    if (payload.title) formData.append("title", payload.title);
    if (payload.description) formData.append("description", payload.description);
    if (payload.detailedDescription)
      formData.append("detailedDescription", payload.detailedDescription);
    if (payload.year) formData.append("year", payload.year);
    if (payload.demoUrl) formData.append("demoUrl", payload.demoUrl);
    if (payload.codeUrl) formData.append("codeUrl", payload.codeUrl);
    if (payload.role) formData.append("role", payload.role);
    if (payload.challenges) formData.append("challenges", payload.challenges);
    if (payload.googlePlayUrl) formData.append("googlePlayUrl", payload.googlePlayUrl);
    if (payload.appleStoreUrl) formData.append("appleStoreUrl", payload.appleStoreUrl);

    // Add arrays as JSON strings only if provided
    if (payload.categories) formData.append("categories", JSON.stringify(payload.categories));
    if (payload.technologies) formData.append("technologies", JSON.stringify(payload.technologies));
    if (payload.features) formData.append("features", JSON.stringify(payload.features));

    // Add image if provided
    if (payload.image instanceof File) {
      formData.append("image", payload.image);
    }

    // Add gallery images if provided
    if (payload.gallery && Array.isArray(payload.gallery)) {
      payload.gallery.forEach((image, index) => {
        if (image instanceof File) {
          formData.append(`gallery[${index}]`, image);
        }
      });
    }

    const response = await api.patch<ApiResponse<Project>>(`/projects/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  }

  /**
   * Delete project by ID (Admin only)
   */
  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }
}

export const projectService = new ProjectService();
