<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Settings</h1>
        <p class="text-sm text-gray-400">Manage your account and application preferences</p>
      </div>
      <button
        form="settings-form"
        type="submit"
        class="rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-medium text-white hover:bg-[#5b21b6]"
        :disabled="isLoading"
      >
        {{ isLoading ? "Saving..." : "Save Changes" }}
      </button>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Profile Settings -->
      <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
        <h2 class="mb-4 text-lg font-bold text-white">Profile Information</h2>
        <form id="settings-form" @submit.prevent="saveSettings" class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-400">Username</label>
            <input
              v-model="profile.username"
              type="text"
              class="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-400">Email Address</label>
            <input
              v-model="profile.email"
              type="email"
              class="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-400">Bio</label>
            <textarea
              v-model="profile.bio"
              class="h-24 w-full rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
            ></textarea>
          </div>
        </form>
      </div>

      <!-- Change Password -->
      <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
        <h2 class="mb-4 text-lg font-bold text-white">Security</h2>
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-400">Current Password</label>
            <input
              type="password"
              class="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-400">New Password</label>
            <input
              type="password"
              class="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
            />
          </div>
          <div class="pt-2">
            <button class="text-sm text-[#6d28d9] hover:text-[#8b5cf6]">Update Password</button>
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6 md:col-span-2">
        <h2 class="mb-4 text-lg font-bold text-white">Appearance</h2>
        <div class="flex items-center justify-between rounded-lg bg-white/5 p-4">
          <div>
            <p class="font-medium text-white">Dark Mode</p>
            <p class="text-xs text-gray-400">
              Application uses dark mode system preference by default
            </p>
          </div>
          <div class="relative inline-flex h-6 w-11 items-center rounded-full bg-[#6d28d9]">
            <span
              class="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const toast = useToast();
const isLoading = ref(false);

const profile = ref({
  username: "",
  email: "",
  bio: "",
});

onMounted(() => {
  if (authStore.user) {
    profile.value.username = authStore.user.username;
    profile.value.email = authStore.user.email;
  }
});

const saveSettings = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  toast.success("Settings saved successfully");
  isLoading.value = false;
};
</script>
