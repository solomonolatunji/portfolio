import { defineStore } from "pinia";
import type { Comment, CommentState } from "@/interfaces/comment";

/**
 * Comments Store
 * State management for comments
 */
export const useCommentStore = defineStore("comment", {
  state: (): CommentState => ({
    comments: [],
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
     * Check if comments are loading
     */
    isLoadingComments: (state): boolean => state.isLoading,

    /**
     * Get comment by ID
     */
    getCommentById:
      (state) =>
      (id: string): Comment | undefined => {
        return state.comments.find((comment) => comment.id === id);
      },

    /**
     * Check if has comments
     */
    hasComments: (state): boolean => state.comments.length > 0,

    /**
     * Get comments count
     */
    commentsCount: (state): number => state.comments.length,
  },

  actions: {
    /**
     * Set comments with pagination metadata
     */
    setComments(data: {
      comments: Comment[];
      total: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
      nextPage?: number;
      currentPage?: number;
    }): void {
      this.comments = data.comments;
      this.total = data.total;
      this.pages = data.pages;
      this.hasNext = data.hasNext;
      this.hasPrev = data.hasPrev;
      this.currentPage = data.currentPage || 1;
    },

    /**
     * Add comment to list
     */
    addComment(comment: Comment): void {
      this.comments.unshift(comment);
      this.total += 1;
    },

    /**
     * Remove comment from list
     */
    removeComment(id: string): void {
      const index = this.comments.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.comments.splice(index, 1);
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
      this.comments = [];
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
