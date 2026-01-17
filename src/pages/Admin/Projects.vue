<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Projects</h1>
        <p class="text-sm text-gray-400">Manage your portfolio projects</p>
      </div>
      <div class="flex gap-4">
        <Button variant="primary" text="New Project" @click="navigateToCreate">
          <template #iconLeft>
            <IconPlus class="h-4 w-4" />
          </template>
        </Button>
      </div>
    </div>

    <!-- Filters placeholder -->
    <div
      class="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-[#1e1e1e] p-4 sm:flex-row sm:items-center"
    >
      <div class="w-full sm:w-72">
        <Input v-model="search" placeholder="Search projects...">
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
                  <button
                    class="p-1 text-gray-400 hover:text-white"
                    title="Edit"
                    @click="navigateToEdit(project)"
                  >
                    <IconEdit class="h-4 w-4" />
                  </button>
                  <button
                    class="p-1 text-gray-400 hover:text-red-400"
                    title="Delete"
                    @click="openDeleteModal(project)"
                  >
                    <IconTrash class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="border-t border-white/10 px-6 py-4">
        <Pagination
          :current-page="currentPage"
          :total-pages="Math.ceil(total / 10)"
          @prev="changePage(currentPage - 1)"
          @next="changePage(currentPage + 1)"
          @goto="changePage"
        />
        <div class="mt-2 text-center text-xs text-gray-500">
          Showing <span class="text-white">{{ projects.length }}</span> of
          <span class="text-white">{{ total }}</span>
          projects
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <Modal :is-open="isDeleteModalOpen" title="Delete Project" @close="closeDeleteModal">
      <p class="text-gray-300">
        Are you sure you want to delete
        <span class="font-bold text-white">{{ selectedProject?.title }}</span
        >? This action cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" @click="closeDeleteModal" text="Cancel" />
        <Button
          variant="primary"
          @click="confirmDelete"
          text="Delete"
          class="!hover:bg-red-700 border-none! bg-red-600!"
        />
      </template>
    </Modal>

    <!-- Filter Modal -->
    <Modal :is-open="isFilterModalOpen" title="Filter Projects" @close="isFilterModalOpen = false">
      <div class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-300">Year</label>
          <select
            class="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>
      <template #footer>
        <Button variant="ghost" @click="isFilterModalOpen = false" text="Cancel" />
        <Button variant="primary" @click="isFilterModalOpen = false" text="Apply Filters" />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProject } from "@/hooks/useProject";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconBriefcase,
  IconSearch,
  IconFilter,
} from "@tabler/icons-vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Modal from "@/components/Admin/Shared/Modal.vue";
import Pagination from "@/components/Pagination.vue";

const router = useRouter();
const { projects, total, currentPage, isLoading, fetchProjects, deleteProject } = useProject();

const search = ref("");
const isDeleteModalOpen = ref(false);
const isFilterModalOpen = ref(false);
const selectedProject = ref<any>(null);

const changePage = (page: number) => {
  fetchProjects({ page, limit: 10 });
};

const navigateToCreate = () => {
  router.push({ name: "CreateProject" });
};

const navigateToEdit = (project: any) => {
  router.push({ name: "EditProject", params: { id: project.id } });
};

const openDeleteModal = (project: any) => {
  selectedProject.value = project;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  selectedProject.value = null;
};

const confirmDelete = async () => {
  if (selectedProject.value) {
    try {
      await deleteProject(selectedProject.value.id);
      closeDeleteModal();
      fetchProjects({ page: currentPage.value, limit: 10 });
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  }
};

onMounted(() => {
  fetchProjects({ page: 1, limit: 10 });
});
</script>
