import { computed } from "vue";
import { useToast } from "vue-toastification";
import { usePostStore } from "@/stores/postStore";
import { postService } from "@/services/postService";
import type { PostsQueryParams, CreatePostPayload, UpdatePostPayload } from "@/interfaces/post";

/**
 * Posts Hook
 * Combines service calls with state management
 * Similar to TanStack Query pattern but simpler
 */
export function usePost() {
  const postStore = usePostStore();
  const toast = useToast();

  const isLoading = computed(() => postStore.isLoading);
  const error = computed(() => postStore.error);
  const posts = computed(() => postStore.posts);
  const featuredPosts = computed(() => postStore.featuredPosts);
  const currentPost = computed(() => postStore.currentPost);
  const relatedPosts = computed(() => postStore.relatedPosts);
  const total = computed(() => postStore.total);
  const pages = computed(() => postStore.pages);
  const currentPage = computed(() => postStore.currentPage);
  const hasNext = computed(() => postStore.hasNext);
  const hasPrev = computed(() => postStore.hasPrev);

  /**
   * Fetch posts with optional filters
   */
  const fetchPosts = async (params?: PostsQueryParams): Promise<void> => {
    postStore.setLoading(true);
    postStore.clearError();

    try {
      const data = await postService.getPosts(params);
      postStore.setPosts(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch posts";
      postStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      postStore.setLoading(false);
    }
  };

  /**
   * Fetch featured posts
   */
  const fetchFeaturedPosts = async (): Promise<void> => {
    postStore.setLoading(true);
    postStore.clearError();

    try {
      const data = await postService.getFeaturedPosts();
      postStore.setFeaturedPosts(data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch featured posts";
      postStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      postStore.setLoading(false);
    }
  };

  /**
   * Fetch single post by ID
   */
  const fetchPostById = async (id: string): Promise<void> => {
    postStore.setLoading(true);
    postStore.clearError();

    try {
      const data = await postService.getPostById(id);
      postStore.setCurrentPost(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch post";
      postStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      postStore.setLoading(false);
    }
  };

  /**
   * Fetch related posts by category
   */
  const fetchRelatedPosts = async (id: string): Promise<void> => {
    postStore.setLoading(true);
    postStore.clearError();

    try {
      const data = await postService.getRelatedPosts(id);
      postStore.setRelatedPosts(data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch related posts";
      postStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      postStore.setLoading(false);
    }
  };

  /**
   * Create post (Admin only)
   */
  const createPost = async (payload: CreatePostPayload): Promise<void> => {
    postStore.setLoading(true);
    postStore.clearError();

    try {
      const data = await postService.createPost(payload);
      postStore.addPost(data);
      toast.success("Post created");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create post";
      postStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      postStore.setLoading(false);
    }
  };

  /**
   * Update post (Admin only)
   */
  const updatePost = async (id: string, payload: UpdatePostPayload): Promise<void> => {
    postStore.setLoading(true);
    postStore.clearError();

    try {
      const data = await postService.updatePost(id, payload);
      postStore.updatePostItem(data);
      if (postStore.currentPost?.id === id) {
        postStore.setCurrentPost(data);
      }
      toast.success("Post updated");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update post";
      postStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      postStore.setLoading(false);
    }
  };

  /**
   * Delete post (Admin only)
   */
  const deletePost = async (id: string): Promise<void> => {
    postStore.setLoading(true);
    postStore.clearError();

    try {
      await postService.deletePost(id);
      postStore.removePost(id);
      toast.success("Post deleted");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete post";
      postStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      postStore.setLoading(false);
    }
  };

  /**
   * Toggle featured status (Admin only)
   */
  const toggleFeatured = async (id: string): Promise<void> => {
    postStore.setLoading(true);
    postStore.clearError();

    try {
      const data = await postService.toggleFeatured(id);
      postStore.updatePostItem(data);
      if (postStore.currentPost?.id === id) {
        postStore.setCurrentPost(data);
      }
      toast.success(`Post ${data.isFeatured ? "marked as featured" : "unfeatured"}`);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to toggle featured status";
      postStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      postStore.setLoading(false);
    }
  };

  /**
   * Clear current post
   */
  const clearCurrentPost = (): void => {
    postStore.setCurrentPost(null);
  };

  /**
   * Clear related posts
   */
  const clearRelatedPosts = (): void => {
    postStore.setRelatedPosts([]);
  };

  return {
    // State
    isLoading,
    error,
    posts,
    featuredPosts,
    currentPost,
    relatedPosts,
    total,
    pages,
    currentPage,
    hasNext,
    hasPrev,

    // Actions
    fetchPosts,
    fetchFeaturedPosts,
    fetchPostById,
    fetchRelatedPosts,
    createPost,
    updatePost,
    deletePost,
    toggleFeatured,

    // Utilities
    clearCurrentPost,
    clearRelatedPosts,
    clearError: () => postStore.clearError(),
  };
}
