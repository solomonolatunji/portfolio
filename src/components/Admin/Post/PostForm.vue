<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Info -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-white">Post Details</h3>
      <Input v-model="form.title" label="Title" placeholder="Post title" required />

      <!-- Content (Simple Textarea for now, could be Rich Text later) -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">Content</label>
        <textarea
          v-model="form.content"
          rows="15"
          required
          class="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] focus:outline-none"
          placeholder="Write your post content here (Markdown or HTML)..."
        ></textarea>
      </div>

      <!-- Published Toggle -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          :aria-checked="form.published"
          @click="form.published = !form.published"
          :class="form.published ? 'bg-[#6d28d9]' : 'bg-gray-700'"
          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-[#6d28d9] focus:ring-offset-2 focus:ring-offset-[#1e1e1e] focus:outline-none"
        >
          <span
            aria-hidden="true"
            :class="form.published ? 'translate-x-5' : 'translate-x-0'"
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          />
        </button>
        <span class="text-sm font-medium text-gray-300">
          {{ form.published ? "Published" : "Draft" }}
        </span>
      </div>
    </div>

    <!-- Metadata (Categories, Tags) -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-white">Metadata</h3>

      <!-- Categories -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">Categories (Press Enter)</label>
        <div
          class="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-white/5 p-2 focus-within:border-[#6d28d9] focus-within:ring-1 focus-within:ring-[#6d28d9]"
        >
          <span
            v-for="(cat, index) in form.categories"
            :key="index"
            class="inline-flex items-center rounded bg-[#6d28d9]/20 px-2 py-1 text-xs text-[#d8b4fe]"
          >
            {{ cat }}
            <button
              type="button"
              @click="removeArrayItem('categories', index)"
              class="ml-1 text-[#d8b4fe] hover:text-white"
            >
              &times;
            </button>
          </span>
          <input
            v-model="newItem.categories"
            @keydown.enter.prevent="addArrayItem('categories')"
            class="flex-1 bg-transparent p-1 text-sm text-white outline-none placeholder:text-gray-500"
            placeholder="Add category..."
          />
        </div>
      </div>

      <!-- Tags -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">Tags (Press Enter)</label>
        <div
          class="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-white/5 p-2 focus-within:border-[#6d28d9] focus-within:ring-1 focus-within:ring-[#6d28d9]"
        >
          <span
            v-for="(tag, index) in form.tags"
            :key="index"
            class="inline-flex items-center rounded bg-blue-500/20 px-2 py-1 text-xs text-blue-300"
          >
            {{ tag }}
            <button
              type="button"
              @click="removeArrayItem('tags', index)"
              class="ml-1 text-blue-300 hover:text-white"
            >
              &times;
            </button>
          </span>
          <input
            v-model="newItem.tags"
            @keydown.enter.prevent="addArrayItem('tags')"
            class="flex-1 bg-transparent p-1 text-sm text-white outline-none placeholder:text-gray-500"
            placeholder="Add tag..."
          />
        </div>
      </div>
    </div>

    <!-- Cover Image -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-white">Cover Image</h3>
      <div>
        <div class="flex items-center gap-4">
          <div
            v-if="preview.cover"
            class="h-32 w-48 overflow-hidden rounded-lg border border-white/10"
          >
            <img :src="preview.cover" class="h-full w-full object-cover" />
          </div>
          <div class="flex-1">
            <input
              type="file"
              accept="image/*"
              @change="handleCoverUpload"
              class="block w-full text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-[#6d28d9]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#d8b4fe] hover:file:bg-[#6d28d9]/20"
            />
            <p class="mt-1 text-xs text-gray-500">Recommended: 1200x630px</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4 border-t border-white/10 pt-6">
      <Button variant="ghost" text="Cancel" @click="$emit('cancel')" type="button" />
      <Button
        variant="primary"
        :text="isEditing ? 'Save Changes' : 'Create Post'"
        :loading="isLoading"
        type="submit"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import Input from "@/components/Input.vue";
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

const isEditing = !!props.initialData;

const form = reactive({
  title: "",
  content: "",
  published: false,
  categories: [] as string[],
  tags: [] as string[],
  cover: null as File | string | null,
});

// Helper inputs for array additions
const newItem = reactive({
  categories: "",
  tags: "",
});

const preview = reactive({
  cover: null as string | null,
});

// Initialize form if editing
onMounted(() => {
  if (props.initialData) {
    Object.assign(form, {
      ...props.initialData,
      categories: props.initialData.categories?.map((c) => c.category.name) || [],
      tags: [...(props.initialData.tags || [])],
    });

    preview.cover = props.initialData.cover;
  }
});

const addArrayItem = (field: "categories" | "tags") => {
  const value = newItem[field].trim();
  if (value && !form[field].includes(value)) {
    form[field].push(value);
    newItem[field] = "";
  }
};

const removeArrayItem = (field: "categories" | "tags", index: number) => {
  form[field].splice(index, 1);
};

const handleCoverUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    form.cover = file;
    preview.cover = URL.createObjectURL(file);
  }
};

const handleSubmit = () => {
  // Clone and prepare payload
  const payload = { ...form };
  emit("submit", payload);
};
</script>
