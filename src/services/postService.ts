import api from "@/utilities/api";
import type {
  Post,
  PostsQueryParams,
  CreatePostPayload,
  UpdatePostPayload,
} from "@/interfaces/post";
import type { ApiResponse, PaginatedData } from "@/interfaces/base";

/**
 * Posts Service
 * Pure API calls without state management
 */
class PostService {
  /**
   * Get public posts with optional filters
   */
  async getPosts(params?: PostsQueryParams): Promise<PaginatedData<Post>> {
    const response = await api.get<ApiResponse<PaginatedData<Post>>>("/posts", {
      params,
    });
    return response.data.data;
  }

  /**
   * Get featured posts
   */
  async getFeaturedPosts(): Promise<Post[]> {
    const response = await api.get<ApiResponse<Post[]>>("/posts/featured");
    return response.data.data;
  }

  /**
   * Get single post by ID
   */
  async getPostById(id: string): Promise<Post> {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
    return response.data.data;
  }

  /**
   * Get related posts by category
   */
  async getRelatedPosts(id: string): Promise<Post[]> {
    const response = await api.get<ApiResponse<Post[]>>(`/posts/${id}/related`);
    return response.data.data;
  }

  /**
   * Create post (Admin only)
   */
  async createPost(payload: CreatePostPayload): Promise<Post> {
    const response = await api.post<ApiResponse<Post>>("/posts", payload);
    return response.data.data;
  }

  /**
   * Update post by ID (Admin only)
   */
  async updatePost(id: string, payload: UpdatePostPayload): Promise<Post> {
    const response = await api.patch<ApiResponse<Post>>(`/posts/${id}`, payload);
    return response.data.data;
  }

  /**
   * Delete post by ID (Admin only)
   */
  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  }

  /**
   * Mark post as featured or unfeatured (Admin only)
   */
  async toggleFeatured(id: string, isFeatured: boolean): Promise<Post> {
    const response = await api.patch<ApiResponse<Post>>(`/posts/${id}/featured`, { isFeatured });
    return response.data.data;
  }
}

export const postService = new PostService();
