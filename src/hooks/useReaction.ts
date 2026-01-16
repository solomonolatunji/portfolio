import { computed } from "vue";
import { useToast } from "vue-toastification";
import { useReactionStore } from "@/stores/reactionStore";
import { reactionService } from "@/services/reactionService";
import type {
  ReactionsQueryParams,
  CreateReactionPayload,
  ReactionType,
} from "@/interfaces/reaction";

/**
 * Reactions Hook
 * Combines service calls with state management
 * Similar to TanStack Query pattern but simpler
 */
export function useReaction() {
  const reactionStore = useReactionStore();
  const toast = useToast();

  const isLoading = computed(() => reactionStore.isLoading);
  const error = computed(() => reactionStore.error);
  const reactions = computed(() => reactionStore.reactions);
  const viewerReaction = computed(() => reactionStore.viewerReaction);
  const totalCount = computed(() => reactionStore.totalCount);
  const reactionsByType = computed(() => reactionStore.reactionsByType);

  /**
   * Fetch reactions with optional filters
   */
  const fetchReactions = async (params?: ReactionsQueryParams): Promise<void> => {
    reactionStore.setLoading(true);
    reactionStore.clearError();

    try {
      const data = await reactionService.getReactions(params);
      reactionStore.setReactions(data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch reactions";
      reactionStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      reactionStore.setLoading(false);
    }
  };

  /**
   * Create reaction
   */
  const createReaction = async (payload: CreateReactionPayload): Promise<void> => {
    reactionStore.setLoading(true);
    reactionStore.clearError();

    try {
      const data = await reactionService.createReaction(payload);
      reactionStore.updateReactionFromResponse(data);
      toast.success("Reaction added successfully");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to add reaction";
      reactionStore.setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      reactionStore.setLoading(false);
    }
  };

  /**
   * Get reaction count by type
   */
  const getReactionCount = (type: ReactionType): number => {
    return reactionStore.getReactionCount(type);
  };

  /**
   * Check if viewer has reacted with specific type
   */
  const hasViewerReacted = (): boolean => {
    return reactionStore.hasViewerReacted;
  };

  return {
    // State
    isLoading,
    error,
    reactions,
    viewerReaction,
    totalCount,
    reactionsByType,

    // Actions
    fetchReactions,
    createReaction,

    // Utilities
    getReactionCount,
    hasViewerReacted,
    clearError: () => reactionStore.clearError(),
  };
}
