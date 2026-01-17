import { defineStore } from "pinia";
import type { Comment, CommentState } from "@/interfaces/comment";
import type { PaginatedData } from "@/interfaces/base";

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
    isLoadingComments: (state): boolean => state.isLoading,

    getCommentById:
      (state) =>
      (id: string): Comment | undefined => {
        return state.comments.find((comment) => comment.id === id);
      },

    hasComments: (state): boolean => state.comments.length > 0,

    commentsCount: (state): number => state.comments.length,
  },

  actions: {
    setComments(data: PaginatedData<Comment>): void {
      this.comments = data.data;
      this.total = data.meta.total;
      this.pages = data.meta.totalPages;
      this.hasNext = data.meta.hasNext;
      this.hasPrev = data.meta.hasPrev;
      this.currentPage = data.meta.page;
    },

    addComment(comment: Comment): void {
      this.comments.unshift(comment);
      this.total += 1;
    },

    removeComment(id: string): void {
      const index = this.comments.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.comments.splice(index, 1);
        this.total -= 1;
      }
    },

    setLoading(loading: boolean): void {
      this.isLoading = loading;
    },

    setError(error: string | null): void {
      this.error = error;
    },

    clearError(): void {
      this.error = null;
    },

    setCurrentPage(page: number): void {
      this.currentPage = page;
    },

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
