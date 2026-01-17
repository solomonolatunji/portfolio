<template>
  <header
    class="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#0a0a0a]/80 px-4 backdrop-blur-md lg:px-8"
  >
    <!-- Left: Mobile Menu Button & Title -->
    <div class="flex items-center gap-4">
      <button
        @click="$emit('toggle-sidebar')"
        class="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
      >
        <IconMenu2 class="h-6 w-6" />
      </button>

      <!-- Optional: Breadcrumbs or Page Title could go here -->
    </div>

    <!-- Right: Actions & Profile -->
    <div class="flex items-center gap-4">
      <!-- Search (Visual Only) -->
      <div class="relative hidden md:block">
        <IconSearch class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          class="h-10 w-64 rounded-full border border-white/10 bg-white/5 pr-4 pl-10 text-sm text-white placeholder-gray-500 focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] focus:outline-none"
        />
      </div>

      <!-- Notifications -->
      <button class="relative rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white">
        <IconBell class="h-5 w-5" />
        <span class="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
      </button>

      <!-- Profile Dropdown -->
      <div class="relative">
        <button
          @click="isProfileOpen = !isProfileOpen"
          class="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 pr-3 hover:bg-white/10"
        >
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[#6d28d9] text-xs font-bold text-white"
          >
            AD
          </div>
          <span class="hidden text-sm font-medium text-white md:block">Admin</span>
          <IconChevronDown class="h-4 w-4 text-gray-400" />
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="isProfileOpen"
          v-click-outside="closeProfile"
          class="ring-opacity-5 absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-white/10 bg-[#1e1e1e] py-1 shadow-xl ring-1 ring-black focus:outline-none"
        >
          <div class="border-b border-white/10 px-4 py-3">
            <p class="text-xs text-gray-400">Signed in as</p>
            <p class="truncate text-sm font-medium text-white">admin@example.com</p>
          </div>

          <div class="py-1">
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <IconUser class="mr-3 h-4 w-4" /> Profile
            </a>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <IconSettings class="mr-3 h-4 w-4" /> Settings
            </a>
          </div>

          <div class="border-t border-white/10 py-1">
            <button
              @click="handleLogout"
              class="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
            >
              <IconLogout class="mr-3 h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import {
  IconMenu2,
  IconSearch,
  IconBell,
  IconChevronDown,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-vue"; // Using tabler icons as preferred

const router = useRouter();
const authStore = useAuthStore();
const isProfileOpen = ref(false);

const closeProfile = () => {
  isProfileOpen.value = false;
};

// Simple click-outside directive
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};

const handleLogout = async () => {
  authStore.clearAuth();
  router.push("/admin/login");
};
</script>
