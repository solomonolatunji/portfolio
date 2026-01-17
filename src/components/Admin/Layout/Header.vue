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

      <nav class="hidden items-center gap-2 text-sm text-gray-400 md:flex">
        <template v-for="(crumb, index) in breadcrumbs" :key="crumb.url">
          <IconChevronRight v-if="index > 0" class="h-4 w-4 text-gray-600" />
          <router-link
            v-if="!crumb.isLast"
            :to="crumb.url"
            class="transition-colors hover:text-white"
          >
            {{ crumb.label }}
          </router-link>
          <span v-else class="font-medium text-white">{{ crumb.label }}</span>
        </template>
      </nav>
    </div>

    <div class="flex items-center gap-4">
      <div class="relative hidden md:block">
        <IconSearch class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          class="h-10 w-64 rounded-full border border-white/10 bg-white/5 pr-4 pl-10 text-sm text-white placeholder-gray-500 focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] focus:outline-none"
        />
      </div>

      <button class="relative rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white">
        <IconBell class="h-5 w-5" />
        <span class="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
      </button>

      <div class="relative">
        <button
          @click="isProfileOpen = !isProfileOpen"
          class="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 pr-3 hover:bg-white/10"
        >
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[#6d28d9] text-xs font-bold text-white uppercase"
          >
            {{ userInitials }}
          </div>
          <span class="hidden text-sm font-medium text-white md:block">{{
            authStore.user?.username || "Admin"
          }}</span>
          <IconChevronDown class="h-4 w-4 text-gray-400" />
        </button>

        <div
          v-if="isProfileOpen"
          v-click-outside="closeProfile"
          class="ring-opacity-5 absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-white/10 bg-[#1e1e1e] py-1 shadow-xl ring-1 ring-black focus:outline-none"
        >
          <div class="border-b border-white/10 px-4 py-3">
            <p class="text-xs text-gray-400">Signed in as</p>
            <p class="truncate text-sm font-medium text-white">{{ authStore.user?.email }}</p>
          </div>

          <div class="py-1">
            <router-link
              to="/admin/settings"
              class="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <IconSettings class="mr-3 h-4 w-4" /> Settings
            </router-link>
          </div>

          <div class="border-t border-white/10 py-1">
            <button
              @click="confirmLogout"
              class="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
            >
              <IconLogout class="mr-3 h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal :is-open="isLogoutModalOpen" title="Confirm Sign Out" @close="isLogoutModalOpen = false">
      <p class="text-gray-300">Are you sure you want to sign out?</p>
      <template #footer>
        <Button variant="ghost" @click="isLogoutModalOpen = false" text="Cancel" />
        <Button variant="primary" @click="handleLogout" text="Sign Out" />
      </template>
    </Modal>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import Modal from "@/components/Admin/Shared/Modal.vue";
import Button from "@/components/Button.vue";
import {
  IconMenu2,
  IconSearch,
  IconBell,
  IconChevronDown,
  IconSettings,
  IconLogout,
  IconChevronRight,
} from "@tabler/icons-vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const isProfileOpen = ref(false);
const isLogoutModalOpen = ref(false);

const closeProfile = () => {
  isProfileOpen.value = false;
};

const userInitials = computed(() => {
  return authStore.user?.username?.substring(0, 2) || "AD";
});

const breadcrumbs = computed(() => {
  const path = route.path;
  const segments = path.split("/").filter((s) => s);

  return segments.map((segment, index) => {
    const isLast = index === segments.length - 1;
    const url = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      label,
      url,
      isLast,
    };
  });
});

const confirmLogout = () => {
  isProfileOpen.value = false;
  isLogoutModalOpen.value = true;
};

const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    // Add delay to prevent immediate closing from the opening click
    setTimeout(() => {
      document.body.addEventListener("click", el.clickOutsideEvent);
    }, 0);
  },
  unmounted(el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};

const handleLogout = async () => {
  authStore.clearAuth();
  isLogoutModalOpen.value = false;
  router.push("/admin");
};
</script>
