/**
 * Comment author
 */
export interface CommentAuthor {
  id: string;
  username: string;
}

/**
 * Single comment
 */
export interface Comment {
  id: string;
  text: string;
  authorId: string;
  author: CommentAuthor;
  postId: string;
  replyId?: string | null;
  childs: Comment[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Comments query parameters
 */
export interface CommentsQueryParams {
  postId?: string;
  page?: number;
  limit?: number;
}

/**
 * Create comment payload
 */
export interface CreateCommentPayload {
  text: string;
  postId: string;
  replyId?: string;
}

/**
 * Comment store state
 */
export interface CommentState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  total: number;
  pages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}
