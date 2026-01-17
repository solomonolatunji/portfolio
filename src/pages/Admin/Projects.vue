<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Projects</h1>
        <p class="text-sm text-gray-400">Manage your portfolio projects</p>
      </div>
      <div class="flex gap-4">
        <button
          class="flex items-center gap-2 rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-medium text-white hover:bg-[#5b21b6]"
        >
          <IconPlus class="h-4 w-4" />
          New Project
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-400">
          <thead class="bg-white/5 text-xs text-gray-400 uppercase">
            <tr>
              <th scope="col" class="px-6 py-4">Project</th>
              <th scope="col" class="px-6 py-4">Technology</th>
              <th scope="col" class="px-6 py-4">Year</th>
              <th scope="col" class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr v-if="isLoading" class="animate-pulse">
              <td colspan="4" class="px-6 py-8 text-center">Loading projects...</td>
            </tr>
            <tr v-else-if="projects.length === 0">
              <td colspan="4" class="px-6 py-8 text-center">No projects found</td>
            </tr>
            <tr v-else v-for="project in projects" :key="project.id" class="group hover:bg-white/5">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-800"
                  >
                    <img
                      v-if="project.image"
                      :src="project.image"
                      class="h-full w-full object-cover"
                    />
                    <IconBriefcase v-else class="h-5 w-5" />
                  </div>
                  <div>
                    <div class="font-medium text-white">{{ project.title }}</div>
                    <div class="max-w-[200px] truncate text-xs">{{ project.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tech in project.technologies.slice(0, 3)"
                    :key="tech"
                    class="inline-flex rounded bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400"
                  >
                    {{ tech }}
                  </span>
                  <span v-if="project.technologies.length > 3" class="text-xs text-gray-500">
                    +{{ project.technologies.length - 3 }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-white">
                {{ project.year }}
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

      <!-- Pagination -->
      <div class="flex items-center justify-between border-t border-white/10 px-6 py-4">
        <div class="text-xs text-gray-500">
          Showing <span class="text-white">{{ projects.length }}</span> of
          <span class="text-white">{{ total }}</span> projects
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
import { useProject } from "@/hooks/useProject";
import { IconPlus, IconEdit, IconTrash, IconBriefcase } from "@tabler/icons-vue";

const { projects, total, currentPage, hasNext, hasPrev, isLoading, fetchProjects } = useProject();

const changePage = (page: number) => {
  fetchProjects({ page, limit: 10 });
};

onMounted(() => {
  fetchProjects({ page: 1, limit: 10 });
});
</script>
