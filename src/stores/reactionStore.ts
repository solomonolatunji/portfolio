import { defineStore } from "pinia";
import type { ReactionState, ReactionCount, ReactionType } from "@/interfaces/reaction";

export const useReactionStore = defineStore("reaction", {
  state: (): ReactionState => ({
    reactions: [],
    viewerReaction: null,
    totalCount: 0,
    isLoading: false,
    error: null,
  }),

  getters: {
    isLoadingReactions: (state): boolean => state.isLoading,

    getReactionCount:
      (state) =>
      (type: ReactionType): number => {
        const reaction = state.reactions.find((r) => r.type === type);
        return reaction?.count || 0;
      },

    hasViewerReacted: (state): boolean => state.viewerReaction !== null,

    reactionsByType: (state): Map<ReactionType, number> => {
      const map = new Map<ReactionType, number>();
      state.reactions.forEach((reaction) => {
        map.set(reaction.type, reaction.count);
      });
      return map;
    },
  },

  actions: {
    setReactions(data: {
      data: ReactionCount[];
      viewerReaction: ReactionType | null;
      totalCount: number;
    }): void {
      this.reactions = data.data;
      this.viewerReaction = data.viewerReaction;
      this.totalCount = data.totalCount;
    },

    updateReactionFromResponse(data: {
      data: ReactionCount[];
      viewerReaction: ReactionType | null;
      totalCount: number;
    }): void {
      this.setReactions(data);
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

    clearState(): void {
      this.reactions = [];
      this.viewerReaction = null;
      this.totalCount = 0;
      this.isLoading = false;
      this.error = null;
    },
  },
});
