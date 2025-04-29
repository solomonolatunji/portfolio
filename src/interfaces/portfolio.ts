export interface Technology {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  icon?: string;
}

export interface TechnologyResponse {
  status: boolean;
  message: string;
  data: Technology;
}

export interface TechnologiesResponse {
  status: boolean;
  message: string;
  data: Technology[];
}

export interface TechnologyForm {
  name: string;
  icon?: string;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  status: boolean;
  message: string;
  data: Category;
}

export interface CategoriesResponse {
  status: boolean;
  message: string;
  data: Category[];
}

export interface CategoryForm {
  name: string;
}

export interface Media {
  id: number;
  mediable_type: string;
  mediable_id: number;
  file_name: string;
  file_type: string;
  public_id: string;
  url: string;
  width: number;
  height: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number | string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  github_url?: string;
  demo_url?: string;
  project_category_id?: number;
  created_at?: string;
  updated_at?: string;

  technologies: Technology[];
  category?: Category;
  media?: Media[];

  detailedDescription?: string;
  image?: string;
  year?: string;
  features?: string[];
  role?: string;
  challenges?: string;
  gallery?: string[];
  codeUrl?: string;
  demoUrl?: string;
}

export interface ProjectForm {
  title: string;
  slug: string;
  description: string;
  detailed_description?: string;
  featured_image?: File | null;
  year: string;
  category_id: number;
  role?: string;
  challenges?: string;
  demo_url?: string;
  code_url?: string;
  technologies?: number[];
  features?: { title: string }[];
  gallery?: File[];
  media_ids_to_delete?: number[];
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface ProjectsResponse {
  status: boolean;
  message: string;
  data: Project[];
  meta: PaginationMeta;
}

export interface ProjectResponse {
  status: boolean;
  message: string;
  data: Project;
}
