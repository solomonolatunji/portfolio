<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Edit Post</h1>
        <p class="text-sm text-gray-400">Update post content</p>
      </div>
    </div>

    <div v-if="loadingPost" class="flex items-center justify-center p-12">
      <div
        class="h-8 w-8 animate-spin rounded-full border-2 border-[#6d28d9] border-t-transparent"
      ></div>
    </div>

    <div v-else-if="post" class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
      <PostForm
        :initial-data="post"
        :is-loading="isLoading"
        @submit="handleSubmit"
        @cancel="goBack"
      />
    </div>

    <div v-else class="p-12 text-center text-gray-400">Post not found</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "@/stores/postStore";
import { usePost } from "@/hooks/usePost";
import { postService } from "@/services/postService";
import PostForm from "@/components/Admin/Post/PostForm.vue";
import type { Post } from "@/interfaces/post";

const route = useRoute();
const router = useRouter();
const { updatePost, isLoading } = usePost();
const postStore = usePostStore();

const post = ref<Post | null>(null);
const loadingPost = ref(true);

const goBack = () => {
  router.push("/admin/posts");
};

onMounted(async () => {
  const id = route.params.id as string;

  // Try to find in store first
  const existing = postStore.getPostById(id);

  if (existing) {
    post.value = existing;
    loadingPost.value = false;
  } else {
    // Fetch if not in store
    try {
      const data = await postService.getPostById(id);
      post.value = data;
    } catch (error) {
      console.error("Failed to fetch post", error);
    } finally {
      loadingPost.value = false;
    }
  }
});

const handleSubmit = async (payload: any) => {
  if (!post.value) return;

  try {
    await updatePost(post.value.id, payload);
    router.push("/admin/posts");
  } catch (error) {
    console.error("Failed to update post", error);
  }
};
</script>
