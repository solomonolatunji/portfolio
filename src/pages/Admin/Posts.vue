<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Posts</h1>
        <p class="text-sm text-gray-400">Manage your blog posts</p>
      </div>
      <div class="flex gap-4">
        <button
          class="flex items-center gap-2 rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-medium text-white hover:bg-[#5b21b6]"
        >
          <IconPlus class="h-4 w-4" />
          New Post
        </button>
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-400">
          <thead class="bg-white/5 text-xs text-gray-400 uppercase">
            <tr>
              <th scope="col" class="px-6 py-4">Title</th>
              <th scope="col" class="px-6 py-4">Category</th>
              <th scope="col" class="px-6 py-4">Status</th>
              <th scope="col" class="px-6 py-4">Date</th>
              <th scope="col" class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr v-if="isLoading" class="animate-pulse">
              <td colspan="5" class="px-6 py-8 text-center">Loading posts...</td>
            </tr>
            <tr v-else-if="posts.length === 0">
              <td colspan="5" class="px-6 py-8 text-center">No posts found</td>
            </tr>
            <tr v-else v-for="post in posts" :key="post.id" class="group hover:bg-white/5">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-800"
                  >
                    <img v-if="post.cover" :src="post.cover" class="h-full w-full object-cover" />
                    <IconFileText v-else class="h-5 w-5" />
                  </div>
                  <div>
                    <div class="max-w-[200px] truncate font-medium text-white" :title="post.title">
                      {{ post.title }}
                    </div>
                    <div class="max-w-[200px] truncate text-xs">
                      {{ post.content?.substring(0, 50) }}...
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400"
                >
                  {{ post.categories?.map((c) => c.category.name).join(", ") || "Uncategorized" }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button
                  @click="toggleFeatured(post.id)"
                  class="inline-flex items-center text-xs font-medium transition-colors"
                  :class="
                    post.isFeatured
                      ? 'text-yellow-500 hover:text-yellow-400'
                      : 'text-gray-500 hover:text-gray-400'
                  "
                  :title="post.isFeatured ? 'Featured Post' : 'Not Featured'"
                >
                  <IconStarFilled v-if="post.isFeatured" class="h-4 w-4" />
                  <IconStar v-else class="h-4 w-4" />
                </button>
              </td>
              <td class="px-6 py-4">
                {{ formatDate(post.createdAt) }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button class="p-1 text-gray-400 hover:text-white" title="Edit">
                    <IconEdit class="h-4 w-4" />
                  </button>
                  <button class="p-1 text-gray-400 hover:text-red-400" title="Delete">
                    <IconTrash class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-between border-t border-white/10 px-6 py-4">
        <div class="text-xs text-gray-500">
          Showing <span class="text-white">{{ posts.length }}</span> of
          <span class="text-white">{{ total }}</span> posts
        </div>
        <div class="flex gap-2">
          <button
            :disabled="!hasPrev"
            @click="changePage(currentPage - 1)"
            class="rounded px-3 py-1 text-xs font-medium text-gray-400 hover:bg-white/10 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            :disabled="!hasNext"
            @click="changePage(currentPage + 1)"
            class="rounded px-3 py-1 text-xs font-medium text-gray-400 hover:bg-white/10 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePost } from "@/hooks/usePost";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconFileText,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-vue";

const { posts, total, currentPage, hasNext, hasPrev, isLoading, fetchPosts, toggleFeatured } =
  usePost();

const formatDate = (date: any) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

const changePage = (page: number) => {
  fetchPosts({ page, limit: 10 });
};

onMounted(() => {
  fetchPosts({ page: 1, limit: 10 });
});
</script>
