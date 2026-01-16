/**
 * Project
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  imagePublicId?: string | null;
  year: string;
  categories: string[];
  technologies: string[];
  demoUrl: string;
  googlePlayUrl?: string | null;
  appleStoreUrl?: string | null;
  codeUrl: string;
  features: string[];
  role: string;
  challenges: string;
  gallery: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Projects query parameters
 */
export interface ProjectsQueryParams {
  title?: string;
  description?: string;
  year?: string;
  category?: string;
  technologies?: string;
  page?: number;
  limit?: number;
}

/**
 * Create project payload
 */
export interface CreateProjectPayload {
  title: string;
  description: string;
  detailedDescription: string;
  year: string;
  categories: string[];
  technologies: string[];
  demoUrl: string;
  googlePlayUrl?: string;
  appleStoreUrl?: string;
  codeUrl: string;
  features: string[];
  role: string;
  challenges: string;
  image?: File | string;
  gallery?: File[] | string[];
}

/**
 * Update project payload
 */
export interface UpdateProjectPayload {
  title?: string;
  description?: string;
  detailedDescription?: string;
  year?: string;
  categories?: string[];
  technologies?: string[];
  demoUrl?: string;
  googlePlayUrl?: string;
  appleStoreUrl?: string;
  codeUrl?: string;
  features?: string[];
  role?: string;
  challenges?: string;
  image?: File | string;
  gallery?: File[] | string[];
}

/**
 * Project store state
 */
export interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  pages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}
