<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
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
