import api from "@/utilities/api";
import type { Comment, CommentsQueryParams, CreateCommentPayload } from "@/interfaces/comment";
import type { ApiResponse, PaginatedData } from "@/interfaces/base";

/**
 * Comments Service
 * Pure API calls without state management
 */
class CommentService {
  /**
   * Get comments with optional filters
   */
  async getComments(params?: CommentsQueryParams): Promise<PaginatedData<Comment>> {
    const response = await api.get<ApiResponse<PaginatedData<Comment>>>("/comments", {
      params,
    });
    return response.data.data;
  }

  /**
   * Create comment (Users only)
   */
  async createComment(payload: CreateCommentPayload): Promise<Comment> {
    const response = await api.post<ApiResponse<Comment>>("/comments", payload);
    return response.data.data;
  }

  /**
   * Delete comment by ID
   */
  async deleteComment(id: string): Promise<void> {
    await api.delete(`/comments/${id}`);
  }
}

export const commentService = new CommentService();
