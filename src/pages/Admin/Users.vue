<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Users</h1>
        <p class="text-sm text-gray-400">Manage user accounts and permissions</p>
      </div>
      <div class="flex gap-4">
        <Button variant="primary" text="Add User" :disabled="true">
          <template #iconLeft>
            <IconPlus class="h-4 w-4" />
          </template>
        </Button>
      </div>
    </div>

    <div
      class="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-[#1e1e1e] p-4 sm:flex-row sm:items-center"
    >
      <div class="w-full sm:w-72">
        <Input v-model="search" placeholder="Search users...">
          <template #iconLeft>
            <IconSearch />
          </template>
        </Input>
      </div>
      <Button variant="secondary" text="Filters" @click="isFilterModalOpen = true">
        <template #iconLeft>
          <IconFilter class="h-4 w-4" />
        </template>
      </Button>
    </div>

    <div class="overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-400">
          <thead class="bg-white/5 text-xs text-gray-400 uppercase">
            <tr>
              <th scope="col" class="px-6 py-4">User</th>
              <th scope="col" class="px-6 py-4">Status</th>
              <th scope="col" class="px-6 py-4">Role</th>
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
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-[#6d28d9] font-bold text-white"
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
                  class="inline-flex rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400"
                >
                  Active
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
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
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button
                    @click="openRoleModal(user)"
                    class="p-1 text-gray-400 hover:text-white"
                    title="Change Role"
                  >
                    <IconUserCog class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="border-t border-white/10 px-6 py-4">
        <Pagination
          :current-page="currentPage"
          :total-pages="Math.ceil(total / 10)"
          @prev="changePage(currentPage - 1)"
          @next="changePage(currentPage + 1)"
          @goto="changePage"
        />
        <div class="mt-2 text-center text-xs text-gray-500">
          Showing <span class="text-white">{{ users.length }}</span> of
          <span class="text-white">{{ total }}</span>
          users
        </div>
      </div>
    </div>

    <Modal :is-open="isFilterModalOpen" title="Filter Users" @close="isFilterModalOpen = false">
      <div class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-300">Role</label>
          <select
            class="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-300">Status</label>
          <select
            class="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <template #footer>
        <Button variant="ghost" @click="isFilterModalOpen = false" text="Cancel" />
        <Button variant="primary" @click="isFilterModalOpen = false" text="Apply Filters" />
      </template>
    </Modal>

    <Modal :is-open="isRoleModalOpen" title="Change User Role" @close="closeRoleModal">
      <p class="mb-4 text-gray-300">
        Change role for <span class="font-bold text-white">{{ selectedUser?.username }}</span>
      </p>
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">Role</label>
        <select
          v-model="newRole"
          class="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <template #footer>
        <Button variant="ghost" @click="closeRoleModal" text="Cancel" />
        <Button
          variant="primary"
          :loading="isLoading"
          @click="confirmRoleChange"
          text="Update Role"
        />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { refDebounced } from "@vueuse/core";
import { useUser } from "@/hooks/useUser";
import { IconSearch, IconUserCog, IconPlus, IconFilter } from "@tabler/icons-vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Modal from "@/components/Admin/Shared/Modal.vue";
import Pagination from "@/components/Pagination.vue";

const { users, total, currentPage, isLoading, fetchUsers, updateUserRole } = useUser();
const search = ref("");
const debouncedSearch = refDebounced(search, 500);
const isFilterModalOpen = ref(false);
const isRoleModalOpen = ref(false);
const selectedUser = ref<any>(null);
const newRole = ref("");

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

const openRoleModal = (user: any) => {
  selectedUser.value = user;
  newRole.value = user.role;
  isRoleModalOpen.value = true;
};

const closeRoleModal = () => {
  isRoleModalOpen.value = false;
  selectedUser.value = null;
  newRole.value = "";
};

const confirmRoleChange = async () => {
  if (!selectedUser.value || !newRole.value) return;
  try {
    await updateUserRole(selectedUser.value.id, newRole.value as any);
    closeRoleModal();
    fetchUsers({ page: currentPage.value, limit: 10 });
  } catch (error) {
    console.error("Failed to update user role", error);
  }
};

onMounted(() => {
  fetchUsers({ page: 1, limit: 10 });
});
</script>
