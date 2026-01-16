/**
 * User info in post author
 */
export interface PostAuthor {
  id: string;
  username: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Post category
 */
export interface PostCategory {
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

/**
 * Single post
 */
export interface Post {
  id: string;
  title: string;
  content: string;
  cover: string;
  coverPublicId?: string | null;
  authorId: string;
  author: PostAuthor;
  published: boolean;
  isFeatured: boolean;
  tags: string[];
  categories: PostCategory[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Posts query parameters
 */
export interface PostsQueryParams {
  title?: string;
  content?: string;
  page?: number;
  limit?: number;
}

/**
 * Create post payload
 */
export interface CreatePostPayload {
  title: string;
  content: string;
  cover: string;
  published: boolean;
  categories: string[];
  tags: string[];
}

/**
 * Update post payload
 */
export interface UpdatePostPayload {
  title?: string;
  content?: string;
  cover?: string;
  published?: boolean;
  categories?: string[];
  tags?: string[];
}

/**
 * Post store state
 */
export interface PostState {
  posts: Post[];
  featuredPosts: Post[];
  currentPost: Post | null;
  relatedPosts: Post[];
  isLoading: boolean;
  error: string | null;
  total: number;
  pages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}
