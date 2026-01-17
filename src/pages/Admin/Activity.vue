<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Activity Log</h1>
        <p class="text-sm text-gray-400">Recent system events and interactions</p>
      </div>
    </div>

    <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
      <div v-if="isLoading" class="py-8 text-center text-gray-500">Loading activity...</div>
      <div v-else-if="activities.length === 0" class="py-8 text-center text-gray-500">
        No recent activity found.
      </div>
      <div v-else class="space-y-8">
        <div v-for="(group, date) in groupedActivities" :key="date">
          <h3 class="mb-4 text-sm font-medium text-gray-500">{{ date }}</h3>
          <div class="relative space-y-6 border-l border-white/10 pl-6">
            <div v-for="item in group" :key="item.id" class="relative">
              <div
                class="absolute -left-[29px] mt-1.5 h-3 w-3 rounded-full border border-[#1e1e1e]"
                :class="{
                  'bg-blue-500': item.type === 'project',
                  'bg-green-500': item.type === 'post',
                  'bg-purple-500': item.type === 'comment',
                }"
              ></div>

              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-medium text-white">
                    <span v-if="item.type === 'project'">New Project Added: </span>
                    <span v-else-if="item.type === 'post'">New Post Published: </span>
                    <span v-else>New Comment: </span>
                    <span class="text-white">{{
                      item.title || item.content?.substring(0, 50)
                    }}</span>
                  </p>
                  <p class="mt-1 text-xs text-gray-400">
                    {{ formatTime(item.date) }}
                  </p>
                </div>
                <router-link
                  v-if="item.link"
                  :to="item.link"
                  class="shrink-0 rounded px-2 py-1 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  View
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProject } from "@/hooks/useProject";
import { usePost } from "@/hooks/usePost";
import { useComment } from "@/hooks/useComment";

const { projects, fetchProjects } = useProject();
const { posts, fetchPosts } = usePost();
const { comments, fetchComments } = useComment();

const isLoading = ref(true);

interface ActivityItem {
  id: string;
  type: "project" | "post" | "comment";
  title?: string;
  content?: string;
  date: Date;
  link?: string;
}

const activities = computed(() => {
  const items: ActivityItem[] = [];

  projects.value.forEach((p) => {
    // Assuming createdAt exists or using a fallback if not available in interface
    // Ideally existing backend provides createdAt. If not, this is best effort.
    // Checking Project interface previously... it had year.
    // If no exact date, we might skip or fake it for "Recent" if just created in session?
    // But requirement says "real data". If API returns no date, I can't invent it.
    // I'll assume projects might not have exact timestamp visible in basic interface but maybe in API response?
    // Actually Post has createdAt. Comment has createdAt.
    // Project usually has at least `year`.
    // Let's use `createdAt` if available, otherwise ignore or put at bottom.
    // checking projectService or interface... `Project` interface was not fully shown but likely has timestamps.
    // I'll assume it does or exclude if missing.
    if ((p as any).createdAt) {
      items.push({
        id: p.id,
        type: "project",
        title: p.title,
        date: new Date((p as any).createdAt),
        link: "/admin/projects",
      });
    }
  });

  posts.value.forEach((p) => {
    items.push({
      id: p.id,
      type: "post",
      title: p.title,
      date: new Date(p.createdAt),
      link: "/admin/activity", // or posts management if created
    });
  });

  comments.value.forEach((c) => {
    items.push({
      id: c.id,
      type: "comment",
      content: c.text,
      date: new Date(c.createdAt),
      link: "/admin/activity",
    });
  });

  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
});

const groupedActivities = computed(() => {
  const groups: Record<string, ActivityItem[]> = {};
  activities.value.forEach((item) => {
    const dateStr = item.date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!groups[dateStr]) groups[dateStr] = [];
    groups[dateStr].push(item);
  });
  return groups;
});

const formatTime = (date: Date) => {
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
};

onMounted(async () => {
  isLoading.value = true;
  try {
    await Promise.all([
      fetchProjects({ limit: 10 }),
      fetchPosts({ limit: 10 }),
      fetchComments({ limit: 20 }),
    ]);
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});
</script>
