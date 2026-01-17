<template>
  <aside
    class="fixed top-0 left-0 z-40 h-screen w-64 transform border-r border-white/10 bg-[#0a0a0a] transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
  >
    <!-- Logo -->
    <div class="flex h-16 items-center justify-center border-b border-white/10 px-6">
      <h1 class="text-2xl font-bold text-white">
        Admin
        <span class="text-[#6d28d9]">Panel</span>
      </h1>
    </div>

    <!-- Navigation -->
    <nav class="mt-6 space-y-2 px-4">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="group flex items-center rounded-lg px-4 py-3 text-gray-400 transition-all hover:bg-white/5 hover:text-white"
        active-class="bg-[#6d28d9]/10 text-[#6d28d9] hover:bg-[#6d28d9]/20 hover:text-[#6d28d9]"
      >
        <component
          :is="item.icon"
          class="mr-3 h-5 w-5 transition-colors group-hover:text-white"
          :class="{ 'text-[#6d28d9]': isRouteActive(item.path) }"
        />
        <span class="font-medium">{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>

  <!-- Overlay for mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
    @click="$emit('close')"
  ></div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  IconLayoutDashboard,
  IconUsers,
  IconBriefcase,
  IconActivity,
  IconSettings,
  IconFileText,
} from "@tabler/icons-vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);

const route = useRoute();

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: IconLayoutDashboard },
  { name: "Users", path: "/admin/users", icon: IconUsers },
  { name: "Posts", path: "/admin/posts", icon: IconFileText },
  { name: "Projects", path: "/admin/projects", icon: IconBriefcase },
  { name: "Activity", path: "/admin/activity", icon: IconActivity },
  { name: "Settings", path: "/admin/settings", icon: IconSettings },
];

const isRouteActive = (path: string) => {
  return route.path.startsWith(path);
};
</script>
