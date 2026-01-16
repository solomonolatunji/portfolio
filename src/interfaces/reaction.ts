/**
 * Reaction type enum
 */
export type ReactionType = "LIKE" | "LOVE" | "LAUGH" | "WOW" | "SAD" | "ANGRY";

/**
 * Reaction count
 */
export interface ReactionCount {
  type: ReactionType;
  count: number;
}

/**
 * Reactions response
 */
export interface ReactionsResponse {
  data: ReactionCount[];
  viewerReaction: ReactionType | null;
  totalCount: number;
}

/**
 * Create reaction payload
 */
export interface CreateReactionPayload {
  type: ReactionType;
  postId?: string | null;
  commentId?: string | null;
}

/**
 * Reactions query parameters
 */
export interface ReactionsQueryParams {
  postId?: string;
  commentId?: string;
  type?: ReactionType;
  limit?: number;
}

/**
 * Reaction state
 */
export interface ReactionState {
  reactions: ReactionCount[];
  viewerReaction: ReactionType | null;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}
