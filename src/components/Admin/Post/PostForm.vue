<template>
  <form @submit.prevent="handleSubmit" class="wordpress-editor">
    <div class="editor-grid">
      <div class="main-content">
        <div class="title-section">
          <input
            v-model="form.title"
            type="text"
            placeholder="Add title"
            required
            class="title-input"
          />
        </div>

        <div class="content-section">
          <TiptapEditor v-model="form.content" placeholder="Start writing your post content..." />
        </div>
      </div>

      <div class="sidebar">
        <div class="sidebar-section publish-box">
          <h3 class="sidebar-title">Publish</h3>
          <div class="publish-status">
            <span class="status-label">Status:</span>
            <div class="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                :aria-checked="form.published"
                @click="form.published = !form.published"
                :class="form.published ? 'bg-[#6d28d9]' : 'bg-gray-700'"
                class="toggle-switch"
              >
                <span
                  :class="form.published ? 'translate-x-5' : 'translate-x-0'"
                  class="toggle-thumb"
                />
              </button>
              <span class="status-text">
                {{ form.published ? "Published" : "Draft" }}
              </span>
            </div>
          </div>
          <div class="publish-actions">
            <Button variant="ghost" text="Cancel" @click="$emit('cancel')" type="button" />
            <Button
              variant="primary"
              :text="isEditing ? 'Update' : 'Publish'"
              :loading="isLoading"
              type="submit"
            />
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Categories</h3>
          <div class="categories-list">
            <div v-if="loadingCategories" class="loading-state">Loading categories...</div>
            <div v-else-if="availableCategories.length === 0" class="empty-state">
              No categories available
            </div>
            <label
              v-else
              v-for="category in availableCategories"
              :key="category.id"
              class="category-item"
            >
              <input
                type="checkbox"
                :value="category.id"
                :checked="form.categories.includes(category.id)"
                @change="toggleCategory(category.id)"
                class="category-checkbox"
              />
              <span class="category-name">{{ category.name }}</span>
            </label>
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Tags</h3>
          <div class="tags-container">
            <div class="tag-list">
              <span v-for="(tag, index) in form.tags" :key="index" class="tag-item">
                {{ tag }}
                <button type="button" @click="removeTag(index)" class="tag-remove">×</button>
              </span>
            </div>
            <input
              v-model="newTag"
              @keydown.enter.prevent="addTag"
              class="tag-input"
              placeholder="Add tag and press Enter"
            />
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Featured Image</h3>
          <div class="featured-image">
            <div v-if="preview.cover" class="image-preview">
              <img :src="preview.cover" alt="Cover" class="preview-img" />
              <button type="button" @click="removeCover" class="remove-image">Remove</button>
            </div>
            <div v-else class="image-upload">
              <input
                type="file"
                accept="image/*"
                @change="handleCoverUpload"
                id="cover-upload"
                class="file-input"
              />
              <label for="cover-upload" class="upload-label">
                <IconPhoto class="h-8 w-8 text-gray-400" />
                <span class="upload-text">Click to upload</span>
                <span class="upload-hint">Recommended: 1200x630px</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useCategory } from "@/hooks/useCategory";
import { IconPhoto } from "@tabler/icons-vue";
import TiptapEditor from "@/components/Admin/Shared/TiptapEditor.vue";
import Button from "@/components/Button.vue";
import type { Post } from "@/interfaces/post";

const props = defineProps<{
  initialData?: Post;
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", payload: any): void;
  (e: "cancel"): void;
}>();

const {
  categories: availableCategories,
  isLoading: loadingCategories,
  fetchCategories,
} = useCategory();

const isEditing = !!props.initialData;

const form = reactive({
  title: "",
  content: "",
  published: false,
  categories: [] as string[],
  tags: [] as string[],
  cover: null as File | string | null,
});

const newTag = ref("");

const preview = reactive({
  cover: null as string | null,
});

onMounted(() => {
  fetchCategories();

  if (props.initialData) {
    Object.assign(form, {
      ...props.initialData,
      categories: props.initialData.categories?.map((c) => c.category.id) || [],
      tags: [...(props.initialData.tags || [])],
    });

    preview.cover = props.initialData.cover;
  }
});

const toggleCategory = (categoryId: string) => {
  const index = form.categories.indexOf(categoryId);
  if (index > -1) {
    form.categories.splice(index, 1);
  } else {
    form.categories.push(categoryId);
  }
};

const addTag = () => {
  const value = newTag.value.trim();
  if (value && !form.tags.includes(value)) {
    form.tags.push(value);
    newTag.value = "";
  }
};

const removeTag = (index: number) => {
  form.tags.splice(index, 1);
};

const handleCoverUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    form.cover = file;
    preview.cover = URL.createObjectURL(file);
  }
};

const removeCover = () => {
  form.cover = null;
  preview.cover = null;
};

const handleSubmit = () => {
  const payload = { ...form };
  emit("submit", payload);
};
</script>

<style>
.wordpress-editor {
  min-height: 100vh;
}

.editor-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .editor-grid {
    grid-template-columns: 1fr 320px;
  }
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title-section {
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e1e;
  padding: 1.5rem;
}

.title-input {
  width: 100%;
  border: none;
  background-color: transparent;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: white;
  outline: none;
}

.title-input::placeholder {
  color: rgb(107, 114, 128);
}

.content-section {
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e1e;
  padding: 1.5rem;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-section {
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e1e;
  padding: 1rem;
}

.publish-box {
  position: sticky;
  top: 1rem;
}

.sidebar-title {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: white;
}

.publish-status {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.75rem;
}

.status-label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(156, 163, 175);
}

.toggle-switch {
  position: relative;
  display: inline-flex;
  height: 1.5rem;
  width: 2.75rem;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 9999px;
  border-width: 2px;
  border-color: transparent;
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.toggle-switch:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 2px #1e1e1e;
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + 2px) #6d28d9;
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow);
}

.toggle-thumb {
  pointer-events: none;
  display: inline-block;
  height: 1.25rem;
  width: 1.25rem;
  transform: translateX(0);
  border-radius: 9999px;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition-property: transform;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.status-text {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: rgb(209, 213, 219);
}

.publish-actions {
  display: flex;
  gap: 0.5rem;
}

.categories-list {
  max-height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
}

.loading-state,
.empty-state {
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107, 114, 128);
}

.category-item {
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.25rem;
  padding: 0.5rem;
  transition-property: color, background-color;
  transition-duration: 150ms;
}

.category-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.category-checkbox {
  height: 1rem;
  width: 1rem;
  border-radius: 0.25rem;
  border-color: rgb(75, 85, 99);
  background-color: rgb(55, 65, 81);
  color: #6d28d9;
}

.category-checkbox:focus {
  --tw-ring-shadow: 0 0 0 2px #6d28d9;
  box-shadow: var(--tw-ring-shadow);
  --tw-ring-offset-width: 0;
}

.category-name {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: white;
}

.tags-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  background-color: rgba(59, 130, 246, 0.2);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(147, 197, 253);
}

.tag-remove {
  color: rgb(147, 197, 253);
}

.tag-remove:hover {
  color: white;
}

.tag-input {
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: white;
  outline: none;
}

.tag-input::placeholder {
  color: rgb(107, 114, 128);
}

.tag-input:focus {
  border-color: #6d28d9;
  --tw-ring-shadow: 0 0 0 1px #6d28d9;
  box-shadow: var(--tw-ring-shadow);
}

.featured-image {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.image-preview {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
}

.preview-img {
  height: 12rem;
  width: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  border-radius: 0.25rem;
  background-color: rgb(239, 68, 68);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: white;
  transition-property: background-color;
  transition-duration: 150ms;
}

.remove-image:hover {
  background-color: rgb(220, 38, 38);
}

.image-upload {
  position: relative;
}

.file-input {
  display: none;
}

.upload-label {
  display: flex;
  height: 12rem;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  transition-property: color, background-color, border-color;
  transition-duration: 150ms;
}

.upload-label:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
}

.upload-text {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: white;
}

.upload-hint {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(107, 114, 128);
}
</style>
