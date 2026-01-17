<template>
  <div class="mt-16 border-t border-gray-800 pt-10">
    <h3 class="mb-8 text-2xl font-bold text-white">
      Comments <span class="ml-2 text-lg font-medium text-gray-500">({{ total }})</span>
    </h3>

    <!-- Add Comment Form -->
    <div class="mb-10 rounded-xl bg-[#1e1e1e] p-6">
      <div v-if="isLoggedIn">
        <div class="flex items-start gap-4">
          <div
            class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-purple-500 to-indigo-500 text-lg font-bold text-white"
          >
            {{ user?.username?.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1">
            <textarea
              v-model="commentContent"
              rows="3"
              placeholder="Share your thoughts..."
              class="w-full resize-none rounded-lg border border-gray-700 bg-[#2d2d2d] p-3 text-white placeholder-gray-500 transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            ></textarea>
            <div class="mt-3 flex justify-end">
              <button
                @click="handleSubmitComment"
                :disabled="!commentContent.trim() || isSubmitting"
                class="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Guest State -->
      <div v-else class="py-4 text-center">
        <p class="mb-4 text-gray-400">Join the discussion to leave a comment.</p>
        <button
          @click="openModal('login')"
          class="rounded-lg border border-purple-500/50 bg-purple-500/10 px-6 py-2 font-medium text-purple-400 transition-colors hover:bg-purple-500/20"
        >
          Log in to Comment
        </button>
      </div>
    </div>

    <!-- Comment List -->
    <div class="space-y-6">
      <div v-if="isLoading && !comments.length" class="py-10 text-center">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent align-[-0.125em]"
        ></div>
      </div>

      <div v-else-if="comments.length === 0" class="py-10 text-center text-gray-500">
        No comments yet. Be the first to share your thoughts!
      </div>

      <div v-for="comment in comments" :key="comment.id" class="group">
        <div class="flex gap-4">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-gray-700 to-gray-600 font-bold text-gray-300"
          >
            {{ comment.author?.username?.charAt(0).toUpperCase() || "?" }}
          </div>
          <div class="flex-1">
            <div class="mb-1 flex items-center justify-between">
              <span class="font-bold text-white">{{
                comment.author?.username || "Unknown User"
              }}</span>
              <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="leading-relaxed text-gray-300">{{ comment.text }}</p>

            <!-- Delete Action (if owner or admin) -->
            <button
              v-if="canDelete(comment)"
              @click="handleDeleteComment(comment.id)"
              class="mt-2 text-xs text-red-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasNext" class="mt-8 text-center">
        <button
          @click="handleLoadMore"
          class="text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
        >
          Load more comments
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useComment } from "@/hooks/useComment";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";
import { formatDistanceToNow } from "date-fns";

const props = defineProps<{
  postId: string;
}>();

const { comments, total, isLoading, hasNext, fetchComments, createComment, deleteComment } =
  useComment();

const { user, isLoggedIn } = useAuth();
const { openModal } = useAuthModal();

const commentContent = ref("");
const isSubmitting = ref(false);
const page = ref(1);

const formatDate = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

const canDelete = (comment: any) => {
  if (!isLoggedIn.value || !user.value) return false;
  return user.value.role === "ADMIN" || user.value.id === comment.author?.id;
};

const loadComments = async (reset = false) => {
  if (reset) {
    page.value = 1;
  }

  await fetchComments({
    postId: props.postId,
    page: page.value,
    limit: 10,
  });
};

const handleSubmitComment = async () => {
  if (!commentContent.value.trim()) return;

  isSubmitting.value = true;
  try {
    await createComment({
      text: commentContent.value,
      postId: props.postId,
    });
    commentContent.value = "";
    await loadComments(true);
  } finally {
    isSubmitting.value = false;
  }
};

const handleDeleteComment = async (commentId: string) => {
  if (confirm("Are you sure you want to delete this comment?")) {
    await deleteComment(commentId);
  }
};

const handleLoadMore = () => {
  page.value++;
  loadComments();
};

watch(
  () => props.postId,
  () => {
    if (props.postId) {
      loadComments(true);
    }
  },
  { immediate: true }
);
</script>
