import api from "@/utilities/api";
import type {
  ReactionsResponse,
  ReactionsQueryParams,
  CreateReactionPayload,
} from "@/interfaces/reaction";
import type { ApiResponse } from "@/interfaces/base";

/**
 * Reactions Service
 * Pure API calls without state management
 */
class ReactionService {
  /**
   * Get reactions with optional filters
   */
  async getReactions(params?: ReactionsQueryParams): Promise<ReactionsResponse> {
    const response = await api.get<ApiResponse<ReactionsResponse>>("/reactions", {
      params,
    });
    return response.data.data;
  }

  /**
   * Create reaction
   */
  async createReaction(payload: CreateReactionPayload): Promise<ReactionsResponse> {
    const response = await api.post<ApiResponse<ReactionsResponse>>("/reactions", payload);
    return response.data.data;
  }
}

export const reactionService = new ReactionService();
