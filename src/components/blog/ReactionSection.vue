<template>
  <div class="my-8 flex items-center gap-4 border-t border-b border-gray-800 py-8">
    <div class="flex items-center gap-2">
      <button
        @click="handleToggleReaction('LIKE')"
        class="group flex items-center gap-2 rounded-full px-4 py-2 transition-all"
        :class="
          hasReacted('LIKE')
            ? 'bg-purple-500/20 text-purple-400'
            : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#3d3d3d] hover:text-white'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-5 w-5 transition-transform group-active:scale-125"
          :class="{ 'scale-110': hasReacted('LIKE') }"
        >
          <path
            d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H7.494z"
          />
        </svg>
        <span class="font-medium">{{ getCount("LIKE") }}</span>
      </button>

      <!-- Add more reaction types here if needed -->
    </div>

    <div class="ml-auto text-sm text-gray-500">{{ totalCount }} reactions</div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useReaction } from "@/hooks/useReaction";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";

const props = defineProps<{
  postId: string;
}>();

const { fetchReactions, createReaction, getReactionCount, viewerReaction, totalCount } =
  useReaction();

const { isLoggedIn } = useAuth();
const { openModal } = useAuthModal();

const loadReactions = async () => {
  await fetchReactions({ postId: props.postId });
};

const hasReacted = (type: string) => {
  return viewerReaction.value === type;
};

const getCount = (type: any) => {
  return getReactionCount(type);
};

const handleToggleReaction = async (type: any) => {
  if (!isLoggedIn.value) {
    openModal("login");
    return;
  }

  // If already reacted with same type, we could remove it if API supported
  // For now, allow switching or adding
  try {
    await createReaction({
      postId: props.postId,
      type,
    });
    // Optimistic update or refetch handled by store usually, but let's refetch to be safe
    // Actually createReaction in hook calls updateReactionFromResponse which updates store
  } catch (err) {
    console.error(err);
  }
};

watch(
  () => props.postId,
  () => {
    if (props.postId) {
      loadReactions();
    }
  },
  { immediate: true }
);
</script>
