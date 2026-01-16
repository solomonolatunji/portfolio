/**
 * Category
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create category payload
 */
export interface CreateCategoryPayload {
  name: string;
  slug: string;
}

/**
 * Update category payload
 */
export interface UpdateCategoryPayload {
  name?: string;
  slug?: string;
}

/**
 * Category store state
 */
export interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  isLoading: boolean;
  error: string | null;
  total?: number;
  pages?: number;
}
