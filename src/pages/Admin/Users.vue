<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Users</h1>
        <p class="text-sm text-gray-400">Manage your application users</p>
      </div>
      <div class="flex gap-4">
        <button
          class="flex items-center gap-2 rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-medium text-white hover:bg-[#5b21b6]"
        >
          <!-- Placeholder for create/export if needed -->
          Refresh
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#1e1e1e] p-4 md:flex-row">
      <div class="relative flex-1">
        <IconSearch class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          v-model="search"
          type="text"
          placeholder="Search users..."
          class="h-10 w-full rounded-lg border border-white/10 bg-white/5 pr-4 pl-10 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
        />
      </div>
      <!-- Role Filter could go here -->
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-400">
          <thead class="bg-white/5 text-xs text-gray-400 uppercase">
            <tr>
              <th scope="col" class="px-6 py-4">User</th>
              <th scope="col" class="px-6 py-4">Role</th>
              <th scope="col" class="px-6 py-4">Status</th>
              <th scope="col" class="px-6 py-4">Joined</th>
              <th scope="col" class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr v-if="isLoading" class="animate-pulse">
              <td colspan="5" class="px-6 py-8 text-center">Loading users...</td>
            </tr>
            <tr v-else-if="users.length === 0">
              <td colspan="5" class="px-6 py-8 text-center">No users found</td>
            </tr>
            <tr v-else v-for="user in users" :key="user.id" class="group hover:bg-white/5">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-xs font-bold text-white"
                  >
                    {{ user.username.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <div class="font-medium text-white">{{ user.username }}</div>
                    <div class="text-xs">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="
                    user.role === 'ADMIN'
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'bg-gray-500/10 text-gray-400'
                  "
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                  Active
                </span>
              </td>
              <td class="px-6 py-4">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-gray-400 hover:text-white">
                  <IconDotsVertical class="h-5 w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between border-t border-white/10 px-6 py-4">
        <div class="text-xs text-gray-500">
          Showing <span class="text-white">{{ users.length }}</span> of
          <span class="text-white">{{ total }}</span> users
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
import { ref, onMounted, watch } from "vue";
import { refDebounced } from "@vueuse/core";
import { useUser } from "@/hooks/useUser";
import { IconSearch, IconDotsVertical } from "@tabler/icons-vue";

const { users, total, currentPage, hasNext, hasPrev, isLoading, fetchUsers } = useUser();
const search = ref("");
const debouncedSearch = refDebounced(search, 500);

const formatDate = (date: any) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

watch(debouncedSearch, (newVal) => {
  fetchUsers({
    page: 1,
    limit: 10,
    username: newVal || undefined,
  });
});

const changePage = (page: number) => {
  fetchUsers({
    page,
    limit: 10,
    username: debouncedSearch.value || undefined,
  });
};

onMounted(() => {
  fetchUsers({ page: 1, limit: 10 });
});
</script>
