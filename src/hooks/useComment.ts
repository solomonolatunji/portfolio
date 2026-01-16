import { computed } from "vue";
import { useToast } from "vue-toastification";
import { useCommentStore } from "@/stores/commentStore";
import { commentService } from "@/services/commentService";
import type { CommentsQueryParams, CreateCommentPayload } from "@/interfaces/comment";

/**
 * Comments Hook
 * Combines service calls with state management
 * Similar to TanStack Query pattern but simpler
 */
export function useComment() {
  const commentStore = useCommentStore();
  const toast = useToast();

  const isLoading = computed(() => commentStore.isLoading);
  const error = computed(() => commentStore.error);
  const comments = computed(() => commentStore.comments);
  const total = computed(() => commentStore.total);
  const pages = computed(() => commentStore.pages);
  const currentPage = computed(() => commentStore.currentPage);
  const hasNext = computed(() => commentStore.hasNext);
  const hasPrev = computed(() => commentStore.hasPrev);

  /**
   * Fetch comments with optional filters
   */
  const fetchComments = async (params?: CommentsQueryParams): Promise<void> => {
    commentStore.setLoading(true);
    commentStore.clearError();

    try {
      const data = await commentService.getComments(params);
      commentStore.setComments(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch comments";
      commentStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      commentStore.setLoading(false);
    }
  };

  /**
   * Create comment (Users only)
   */
  const createComment = async (payload: CreateCommentPayload): Promise<void> => {
    commentStore.setLoading(true);
    commentStore.clearError();

    try {
      const data = await commentService.createComment(payload);
      commentStore.addComment(data);
      toast.success("Comment created successfully");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create comment";
      commentStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      commentStore.setLoading(false);
    }
  };

  /**
   * Delete comment (Users can delete their own, Admins can delete any)
   */
  const deleteComment = async (id: string): Promise<void> => {
    commentStore.setLoading(true);
    commentStore.clearError();

    try {
      await commentService.deleteComment(id);
      commentStore.removeComment(id);
      toast.success("Comment deleted successfully");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete comment";
      commentStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      commentStore.setLoading(false);
    }
  };

  return {
    // State
    isLoading,
    error,
    comments,
    total,
    pages,
    currentPage,
    hasNext,
    hasPrev,

    // Actions
    fetchComments,
    createComment,
    deleteComment,

    // Utilities
    clearError: () => commentStore.clearError(),
  };
}
