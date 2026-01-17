<template>
  <div class="space-y-6">
    <div class="mb-6 flex items-center gap-4">
      <button
        @click="goBack"
        class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        title="Back to Projects"
      >
        <IconArrowLeft class="h-5 w-5" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-white">Create Project</h1>
        <p class="text-sm text-gray-400">Add a new project to your portfolio</p>
      </div>
    </div>

    <div class="rounded-xl border border-white/10 bg-[#1e1e1e] p-6">
      <ProjectForm :is-loading="isLoading" @submit="handleSubmit" @cancel="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useProject } from "@/hooks/useProject";
import { IconArrowLeft } from "@tabler/icons-vue";
import ProjectForm from "@/components/Admin/Project/ProjectForm.vue";

const router = useRouter();
const { createProject, isLoading } = useProject();

const goBack = () => {
  router.push("/admin/projects");
};

const handleSubmit = async (payload: any) => {
  try {
    await createProject(payload);
    router.push("/admin/projects");
  } catch (error) {
    console.error("Failed to create project", error);
  }
};
</script>
