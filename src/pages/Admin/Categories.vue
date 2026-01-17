<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Categories</h1>
        <p class="text-gray-400">Manage blog post categories</p>
      </div>
      <Button variant="primary" @click="openCreateModal">
        <template #iconLeft>
          <IconPlus />
        </template>
        Add Category
      </Button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && !categories.length" class="flex h-64 items-center justify-center">
      <div
        class="h-8 w-8 animate-spin rounded-full border-2 border-[#6d28d9] border-t-transparent"
      ></div>
    </div>

    <!-- Content -->
    <div v-else class="overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
      <!-- Search -->
      <div class="border-b border-white/10 p-4">
        <div class="relative max-w-md">
          <IconSearch class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search categories..."
            class="w-full rounded-lg border border-white/10 bg-black/20 py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] focus:outline-none"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-white/5 text-xs text-gray-400 uppercase">
            <tr>
              <th class="px-6 py-4 font-medium">Name</th>
              <th class="px-6 py-4 font-medium">Slug</th>
              <th class="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr v-if="filteredCategories.length === 0">
              <td colspan="3" class="px-6 py-8 text-center text-gray-500">No categories found</td>
            </tr>
            <tr
              v-for="category in filteredCategories"
              :key="category.id"
              class="group transition-colors hover:bg-white/5"
            >
              <td class="px-6 py-4">
                <div class="font-medium text-white">{{ category.name }}</div>
              </td>
              <td class="px-6 py-4 text-gray-400">{{ category.slug }}</td>
              <td class="px-6 py-4 text-right">
                <div
                  class="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <button
                    @click="openEditModal(category)"
                    class="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                    title="Edit"
                  >
                    <IconEdit class="h-4 w-4" />
                  </button>
                  <button
                    @click="openDeleteModal(category)"
                    class="rounded-lg p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                    title="Delete"
                  >
                    <IconTrash class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Modal
      :is-open="isFormModalOpen"
      :title="isEditing ? 'Edit Category' : 'Add Category'"
      @close="closeFormModal"
    >
      <form @submit.prevent="handleFormSubmit" class="space-y-4">
        <Input
          id="name"
          v-model="formData.name"
          label="Name"
          placeholder="e.g. Web Development"
          :required="true"
        />

        <!-- Slug is auto-generated usually, but editable if needed -->
        <Input
          id="slug"
          v-model="formData.slug"
          label="Slug (Optional)"
          placeholder="Leave empty to auto-generate"
        />

        <div class="flex justify-end gap-3 pt-4">
          <Button variant="ghost" @click="closeFormModal" text="Cancel" />
          <Button
            type="submit"
            variant="primary"
            :loading="isLoading"
            :text="isEditing ? 'Save Changes' : 'Create Category'"
          />
        </div>
      </form>
    </Modal>

    <!-- Delete Modal -->
    <Modal :is-open="isDeleteModalOpen" title="Delete Category" @close="closeDeleteModal">
      <div class="space-y-4">
        <p class="text-gray-300">
          Are you sure you want to delete
          <span class="font-bold text-white">{{ selectedCategory?.name }}</span
          >? This action cannot be undone.
        </p>

        <div class="flex justify-end gap-3 pt-4">
          <Button variant="ghost" @click="closeDeleteModal" text="Cancel" />
          <Button
            variant="danger"
            :loading="isLoading"
            @click="handleDelete"
            text="Delete Category"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCategory } from "@/hooks/useCategory";
import type { Category } from "@/interfaces/category";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Modal from "@/components/Admin/Shared/Modal.vue";
import { IconPlus, IconSearch, IconEdit, IconTrash } from "@tabler/icons-vue";

const { categories, isLoading, fetchCategories, createCategory, updateCategory, deleteCategory } =
  useCategory();

// State
const searchQuery = ref("");
const isFormModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditing = ref(false);
const selectedCategory = ref<Category | null>(null);

const formData = ref({
  name: "",
  slug: "",
});

// Computed
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value;
  const query = searchQuery.value.toLowerCase();
  return categories.value.filter(
    (c) => c.name.toLowerCase().includes(query) || c.slug.toLowerCase().includes(query)
  );
});

// Mock Initial Data if empty (optional, removed for real impl)
onMounted(() => {
  fetchCategories();
});

// Methods
const openCreateModal = () => {
  isEditing.value = false;
  selectedCategory.value = null;
  formData.value = { name: "", slug: "" };
  isFormModalOpen.value = true;
};

const openEditModal = (category: Category) => {
  isEditing.value = true;
  selectedCategory.value = category;
  formData.value = {
    name: category.name,
    slug: category.slug,
  };
  isFormModalOpen.value = true;
};

const closeFormModal = () => {
  isFormModalOpen.value = false;
  formData.value = { name: "", slug: "" };
};

const openDeleteModal = (category: Category) => {
  selectedCategory.value = category;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  selectedCategory.value = null;
};

const handleFormSubmit = async () => {
  try {
    if (isEditing.value && selectedCategory.value) {
      await updateCategory(selectedCategory.value.id, formData.value);
    } else {
      await createCategory(formData.value);
    }
    closeFormModal();
  } catch (error) {
    console.error("Form submission failed", error);
  }
};

const handleDelete = async () => {
  if (!selectedCategory.value) return;
  try {
    await deleteCategory(selectedCategory.value.id);
    closeDeleteModal();
  } catch (error) {
    console.error("Delete failed", error);
  }
};
</script>
