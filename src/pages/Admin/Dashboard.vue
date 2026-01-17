<template>
  <div>
    <!-- Stats Grid -->
    <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400">Total Users</p>
            <h3 class="mt-2 text-3xl font-bold text-white">{{ userTotal }}</h3>
          </div>
          <div class="rounded-lg bg-[#6d28d9]/10 p-3 text-[#6d28d9]">
            <IconUsers class="h-6 w-6" />
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400">Total Projects</p>
            <h3 class="mt-2 text-3xl font-bold text-white">{{ projectTotal }}</h3>
          </div>
          <div class="rounded-lg bg-blue-500/10 p-3 text-blue-500">
            <IconBriefcase class="h-6 w-6" />
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400">Total Posts</p>
            <h3 class="mt-2 text-3xl font-bold text-white">{{ postTotal }}</h3>
          </div>
          <div class="rounded-lg bg-green-500/10 p-3 text-green-500">
            <IconFileText class="h-6 w-6" />
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400">Response Rate</p>
            <h3 class="mt-2 text-3xl font-bold text-white">98%</h3>
          </div>
          <div class="rounded-lg bg-yellow-500/10 p-3 text-yellow-500">
            <IconActivity class="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Recent Projects -->
      <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-lg font-bold text-white">Recent Projects</h3>
          <router-link to="/admin/projects" class="text-sm text-[#6d28d9] hover:text-[#8b5cf6]">
            View All
          </router-link>
        </div>
        <div class="space-y-4">
          <div
            v-for="project in recentProjects"
            :key="project.id"
            class="flex items-center gap-4 rounded-lg bg-white/5 p-4 transition hover:bg-white/10"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-lg font-bold text-white"
            >
              {{ project.title.charAt(0) }}
            </div>
            <div class="flex-1 overflow-hidden">
              <h4 class="truncate font-medium text-white">{{ project.title }}</h4>
              <p class="truncate text-xs text-gray-400">{{ project.year }} • {{ project.role }}</p>
            </div>
          </div>
          <div v-if="!recentProjects.length" class="py-4 text-center text-gray-500">
            No projects found
          </div>
        </div>
      </div>

      <!-- Recent Posts -->
      <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-lg font-bold text-white">Recent Posts</h3>
          <router-link to="/admin/activity" class="text-sm text-[#6d28d9] hover:text-[#8b5cf6]">
            View All
          </router-link>
        </div>
        <div class="space-y-4">
          <div
            v-for="post in recentPosts"
            :key="post.id"
            class="flex items-center gap-4 rounded-lg bg-white/5 p-4 transition hover:bg-white/10"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-lg font-bold text-white"
            >
              <IconFileText class="h-5 w-5" />
            </div>
            <div class="flex-1 overflow-hidden">
              <h4 class="truncate font-medium text-white">{{ post.title }}</h4>
              <p class="truncate text-xs text-gray-400">{{ formatDate(post.createdAt) }}</p>
            </div>
          </div>
          <div v-if="!recentPosts.length" class="py-4 text-center text-gray-500">
            No posts found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useUser } from "@/hooks/useUser";
import { useProject } from "@/hooks/useProject";
import { usePost } from "@/hooks/usePost";
import { IconUsers, IconBriefcase, IconFileText, IconActivity } from "@tabler/icons-vue";

const { total: userTotal, fetchUsers } = useUser();
const { projects, total: projectTotal, fetchProjects } = useProject();
// Assuming usePost has similar structure based on patterns
const { posts, total: postTotal, fetchPosts } = usePost();

const recentProjects = computed(() => projects.value.slice(0, 5));
const recentPosts = computed(() => posts.value.slice(0, 5));

const formatDate = (date: string | Date | undefined) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

onMounted(async () => {
  try {
    await Promise.all([
      fetchUsers({ limit: 1 }), // Just to get total count
      fetchProjects({ limit: 5 }),
      fetchPosts({ limit: 5 }),
    ]);
  } catch (error) {
    console.error("Dashboard data load error:", error);
  }
});
</script>
