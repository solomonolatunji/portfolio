import { defineStore } from "pinia";
import type { ReactionState, ReactionCount, ReactionType } from "@/interfaces/reaction";

/**
 * Reactions Store
 * State management for reactions
 */
export const useReactionStore = defineStore("reaction", {
  state: (): ReactionState => ({
    reactions: [],
    viewerReaction: null,
    totalCount: 0,
    isLoading: false,
    error: null,
  }),

  getters: {
    /**
     * Check if reactions are loading
     */
    isLoadingReactions: (state): boolean => state.isLoading,

    /**
     * Get reaction count by type
     */
    getReactionCount:
      (state) =>
      (type: ReactionType): number => {
        const reaction = state.reactions.find((r) => r.type === type);
        return reaction?.count || 0;
      },

    /**
     * Check if viewer has reacted
     */
    hasViewerReacted: (state): boolean => state.viewerReaction !== null,

    /**
     * Get all reaction types with counts
     */
    reactionsByType: (state): Map<ReactionType, number> => {
      const map = new Map<ReactionType, number>();
      state.reactions.forEach((reaction) => {
        map.set(reaction.type, reaction.count);
      });
      return map;
    },
  },

  actions: {
    /**
     * Set reactions
     */
    setReactions(data: {
      data: ReactionCount[];
      viewerReaction: ReactionType | null;
      totalCount: number;
    }): void {
      this.reactions = data.data;
      this.viewerReaction = data.viewerReaction;
      this.totalCount = data.totalCount;
    },

    /**
     * Update reaction after creation
     */
    updateReactionFromResponse(data: {
      data: ReactionCount[];
      viewerReaction: ReactionType | null;
      totalCount: number;
    }): void {
      this.setReactions(data);
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
     * Clear all state
     */
    clearState(): void {
      this.reactions = [];
      this.viewerReaction = null;
      this.totalCount = 0;
      this.isLoading = false;
      this.error = null;
    },
  },
});
