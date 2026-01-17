<template>
  <div class="space-y-6">
    <div class="mb-6 flex items-center gap-4">
      <button
        @click="goBack"
        class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        title="Back to Posts"
      >
        <IconArrowLeft class="h-5 w-5" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-white">Create Post</h1>
        <p class="text-sm text-gray-400">Write a new blog post</p>
      </div>
    </div>

    <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
      <PostForm :is-loading="isLoading" @submit="handleSubmit" @cancel="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { usePost } from "@/hooks/usePost";
import { IconArrowLeft } from "@tabler/icons-vue";
import PostForm from "@/components/Admin/Post/PostForm.vue";

const router = useRouter();
const { createPost, isLoading } = usePost();

const goBack = () => {
  router.push("/admin/posts");
};

const handleSubmit = async (payload: any) => {
  try {
    await createPost(payload);
    router.push("/admin/posts");
  } catch (error) {
    console.error("Failed to create post", error);
  }
};
</script>
