<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Edit Project</h1>
        <p class="text-sm text-gray-400">Update project details</p>
      </div>
    </div>

    <div v-if="loadingProject" class="flex items-center justify-center p-12">
      <div
        class="h-8 w-8 animate-spin rounded-full border-2 border-[#6d28d9] border-t-transparent"
      ></div>
    </div>

    <div v-else-if="project" class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
      <ProjectForm
        :initial-data="project"
        :is-loading="isLoading"
        @submit="handleSubmit"
        @cancel="goBack"
      />
    </div>

    <div v-else class="p-12 text-center text-gray-400">Project not found</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProjectStore } from "@/stores/projectStore"; // Access store directly to find project
import { useProject } from "@/hooks/useProject";
import { projectService } from "@/services/projectService";
import ProjectForm from "@/components/Admin/Project/ProjectForm.vue";
import type { Project } from "@/interfaces/project";

const route = useRoute();
const router = useRouter();
const { updateProject, isLoading } = useProject();
const projectStore = useProjectStore();

const project = ref<Project | null>(null);
const loadingProject = ref(true);

const goBack = () => {
  router.push("/admin/projects");
};

onMounted(async () => {
  const id = route.params.id as string;

  // Try to find in store first
  const existing = projectStore.getProjectById(id);

  if (existing) {
    project.value = existing;
    loadingProject.value = false;
  } else {
    // Fetch if not in store
    try {
      const data = await projectService.getProjectById(id);
      project.value = data;
    } catch (error) {
      console.error("Failed to fetch project", error);
    } finally {
      loadingProject.value = false;
    }
  }
});

const handleSubmit = async (payload: any) => {
  if (!project.value) return;

  try {
    await updateProject(project.value.id, payload);
    router.push("/admin/projects");
  } catch (error) {
    console.error("Failed to update project", error);
  }
};
</script>
