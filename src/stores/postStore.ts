import { defineStore } from "pinia";
import type { Post, PostState } from "@/interfaces/post";
import type { PaginatedData } from "@/interfaces/base";

/**
 * Posts Store
 * State management for posts
 */
export const usePostStore = defineStore("post", {
  state: (): PostState => ({
    posts: [],
    featuredPosts: [],
    currentPost: null,
    relatedPosts: [],
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
     * Check if posts are loading
     */
    isLoadingPosts: (state): boolean => state.isLoading,

    /**
     * Get post by ID
     */
    getPostById:
      (state) =>
      (id: string): Post | undefined => {
        return state.posts.find((post) => post.id === id);
      },

    /**
     * Get featured posts count
     */
    featuredCount: (state): number => state.featuredPosts.length,

    /**
     * Check if has posts
     */
    hasPosts: (state): boolean => state.posts.length > 0,

    /**
     * Check if has featured posts
     */
    hasFeaturedPosts: (state): boolean => state.featuredPosts.length > 0,
  },

  actions: {
    /**
     * Set posts with pagination metadata
     */
    setPosts(data: PaginatedData<Post>): void {
      this.posts = data.data;
      this.total = data.meta.total;
      this.pages = data.meta.totalPages;
      this.hasNext = data.meta.hasNext;
      this.hasPrev = data.meta.hasPrev;
    },

    /**
     * Set featured posts
     */
    setFeaturedPosts(posts: Post[]): void {
      this.featuredPosts = posts;
    },

    /**
     * Set current post
     */
    setCurrentPost(post: Post | null): void {
      this.currentPost = post;
    },

    /**
     * Set related posts
     */
    setRelatedPosts(posts: Post[]): void {
      this.relatedPosts = posts;
    },

    /**
     * Add post to list
     */
    addPost(post: Post): void {
      this.posts.unshift(post);
      this.total += 1;
    },

    /**
     * Update post in list
     */
    updatePostItem(post: Post): void {
      const index = this.posts.findIndex((p) => p.id === post.id);
      if (index !== -1) {
        this.posts[index] = post;
      }
    },

    /**
     * Remove post from list
     */
    removePost(id: string): void {
      const index = this.posts.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.posts.splice(index, 1);
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
      this.posts = [];
      this.featuredPosts = [];
      this.currentPost = null;
      this.relatedPosts = [];
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
