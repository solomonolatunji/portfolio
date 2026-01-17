<template>
  <form @submit.prevent="handleSubmit" class="space-y-8 pb-12">
    <!-- Header Area -->
    <div class="flex items-center justify-between">
      <div>
        <h1
          class="bg-linear-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold text-transparent"
        >
          {{ isEditing ? "Edit Post" : "Create New Post" }}
        </h1>
        <p class="mt-1 text-sm text-gray-400">Draft your thoughts and share them with the world.</p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="secondary" size="md" text="Cancel" @click="$emit('cancel')" />
        <Button
          variant="primary"
          size="md"
          :text="isEditing ? 'Update Post' : 'Publish Post'"
          :loading="isLoading"
          type="submit"
        />
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_350px]">
      <!-- Left Column: Content -->
      <div class="space-y-6">
        <!-- Title Input Card -->
        <div
          class="group relative rounded-3xl border border-white/10 bg-white/5 p-1 transition-all hover:border-white/20"
        >
          <div class="p-6">
            <input
              v-model="form.title"
              type="text"
              placeholder="Enter post title..."
              required
              class="w-full border-none bg-transparent text-4xl font-extrabold text-white placeholder-white/20 outline-none focus:ring-0"
            />
          </div>
        </div>

        <!-- Editor Card -->
        <div class="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div class="p-1">
            <TiptapEditor v-model="form.content" placeholder="Start writing something amazing..." />
          </div>
        </div>
      </div>

      <!-- Right Column: Sidebar -->
      <div class="space-y-6">
        <!-- Publish Widget -->
        <div class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 class="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Status & Visibility
          </h3>

          <div class="group flex items-center justify-between">
            <div class="space-y-0.5">
              <span class="block font-medium text-white">Published</span>
              <span class="text-xs text-gray-500">{{
                form.published ? "Visible to everyone" : "Only you can see this"
              }}</span>
            </div>
            <button
              type="button"
              role="switch"
              :aria-checked="form.published"
              @click="form.published = !form.published"
              class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none"
              :class="form.published ? 'bg-purple-600' : 'bg-white/10'"
            >
              <span
                class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out"
                :class="form.published ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
          </div>

          <div class="mt-8 space-y-4 border-t border-white/5 pt-6">
            <div class="flex items-center gap-2 text-xs text-gray-500 italic">
              <IconPhoto class="h-4 w-4" />
              Last saved: Just now
            </div>
          </div>
        </div>

        <!-- Categories Widget -->
        <div class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 class="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Categories
          </h3>

          <div class="custom-scrollbar max-h-48 space-y-2 overflow-y-auto pr-2">
            <div v-if="loadingCategories" class="flex items-center justify-center py-4">
              <div
                class="h-5 w-5 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"
              ></div>
            </div>
            <div
              v-else-if="availableCategories.length === 0"
              class="py-4 text-center text-sm text-gray-500"
            >
              No categories found.
            </div>
            <label
              v-else
              v-for="category in availableCategories"
              :key="category.id"
              class="group flex cursor-pointer items-center rounded-xl p-2 transition-colors hover:bg-white/5"
            >
              <div class="relative flex h-5 w-5 items-center justify-center">
                <input
                  type="checkbox"
                  :value="category.id"
                  :checked="form.categories.includes(category.id)"
                  @change="toggleCategory(category.id)"
                  class="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-white/10 bg-white/5 transition-all checked:border-purple-600 checked:bg-purple-600"
                />
                <svg
                  class="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span class="ml-3 text-sm text-gray-300 transition-colors group-hover:text-white">{{
                category.name
              }}</span>
            </label>
          </div>
        </div>

        <!-- Tags Widget -->
        <div class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 class="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">Tags</h3>

          <div class="space-y-4">
            <Input
              v-model="newTag"
              placeholder="Press Enter to add tags..."
              @keydown.enter.prevent="addTag"
              class="border-white/10! bg-white/5! shadow-none focus:border-purple-500/50!"
            />

            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tag, index) in form.tags"
                :key="index"
                class="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 transition-all hover:bg-purple-500/20"
              >
                {{ tag }}
                <button
                  type="button"
                  @click="removeTag(index)"
                  class="ml-2 text-purple-400 transition-colors hover:text-white"
                >
                  <IconX class="h-3.5 w-3.5" />
                </button>
              </span>
            </div>
          </div>
        </div>

        <!-- Featured Image Widget -->
        <div class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 class="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Cover Image
          </h3>

          <div
            class="group relative aspect-video overflow-hidden rounded-2xl border-2 border-dashed border-white/10 bg-white/5 transition-all hover:border-purple-500/50"
          >
            <div v-if="preview.cover" class="h-full w-full">
              <img
                :src="preview.cover"
                alt="Cover"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <label
                  for="cover-upload-replace"
                  class="cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                >
                  <IconPhoto class="h-5 w-5" />
                </label>
                <button
                  type="button"
                  @click="removeCover"
                  class="rounded-full bg-red-500/20 p-2 text-red-500 transition-colors hover:bg-red-500/40"
                >
                  <IconTrash class="h-5 w-5" />
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                @change="handleCoverUpload"
                id="cover-upload-replace"
                class="hidden"
              />
            </div>

            <label
              v-else
              for="cover-upload"
              class="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4 text-center"
            >
              <div
                class="mb-3 rounded-full bg-white/5 p-4 transition-transform group-hover:scale-110"
              >
                <IconPhoto class="h-8 w-8 text-gray-400" />
              </div>
              <span class="block text-sm font-medium text-white">Upload Image</span>
              <span class="mt-1 text-xs text-gray-500">PNG, JPG, max 2MB</span>
              <input
                type="file"
                accept="image/*"
                @change="handleCoverUpload"
                id="cover-upload"
                class="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useCategory } from "@/hooks/useCategory";
import { IconPhoto, IconX, IconTrash } from "@tabler/icons-vue";
import TiptapEditor from "@/components/Admin/Shared/TiptapEditor.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
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
