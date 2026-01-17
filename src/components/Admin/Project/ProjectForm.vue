<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Info -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-white">Basic Information</h3>
      <div class="grid gap-4 md:grid-cols-2">
        <Input v-model="form.title" label="Title" placeholder="Project title" required />
        <Input v-model="form.year" label="Year" placeholder="e.g. 2024" required />
      </div>
      <Input
        v-model="form.description"
        label="Short Description"
        placeholder="Brief summary"
        required
      />

      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">Detailed Description</label>
        <textarea
          v-model="form.detailedDescription"
          rows="5"
          required
          class="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] focus:outline-none"
          placeholder="Full project description..."
        ></textarea>
      </div>
    </div>

    <!-- URLs -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-white">Links</h3>
      <div class="grid gap-4 md:grid-cols-2">
        <Input v-model="form.demoUrl" label="Demo URL" placeholder="https://" />
        <Input v-model="form.codeUrl" label="Code URL" placeholder="https://" />
        <Input v-model="form.googlePlayUrl" label="Google Play URL" placeholder="https://" />
        <Input v-model="form.appleStoreUrl" label="Apple Store URL" placeholder="https://" />
      </div>
    </div>

    <!-- Role & Details -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-white">Role & Challenges</h3>
      <Input v-model="form.role" label="Your Role" placeholder="e.g. Lead Developer" required />
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">Challenges</label>
        <textarea
          v-model="form.challenges"
          rows="4"
          required
          class="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] focus:outline-none"
          placeholder="Describe technical challenges..."
        ></textarea>
      </div>
    </div>

    <!-- Arrays (Categories, Technologies, Features) -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-white">Tags & Features</h3>

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

      <!-- Technologies -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300"
          >Technologies (Press Enter)</label
        >
        <div
          class="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-white/5 p-2 focus-within:border-[#6d28d9] focus-within:ring-1 focus-within:ring-[#6d28d9]"
        >
          <span
            v-for="(tech, index) in form.technologies"
            :key="index"
            class="inline-flex items-center rounded bg-blue-500/20 px-2 py-1 text-xs text-blue-300"
          >
            {{ tech }}
            <button
              type="button"
              @click="removeArrayItem('technologies', index)"
              class="ml-1 text-blue-300 hover:text-white"
            >
              &times;
            </button>
          </span>
          <input
            v-model="newItem.technologies"
            @keydown.enter.prevent="addArrayItem('technologies')"
            class="flex-1 bg-transparent p-1 text-sm text-white outline-none placeholder:text-gray-500"
            placeholder="Add technology..."
          />
        </div>
      </div>

      <!-- Features -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">Features (Press Enter)</label>
        <div
          class="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-white/5 p-2 focus-within:border-[#6d28d9] focus-within:ring-1 focus-within:ring-[#6d28d9]"
        >
          <span
            v-for="(feat, index) in form.features"
            :key="index"
            class="inline-flex items-center rounded bg-green-500/20 px-2 py-1 text-xs text-green-300"
          >
            {{ feat }}
            <button
              type="button"
              @click="removeArrayItem('features', index)"
              class="ml-1 text-green-300 hover:text-white"
            >
              &times;
            </button>
          </span>
          <input
            v-model="newItem.features"
            @keydown.enter.prevent="addArrayItem('features')"
            class="flex-1 bg-transparent p-1 text-sm text-white outline-none placeholder:text-gray-500"
            placeholder="Add feature..."
          />
        </div>
      </div>
    </div>

    <!-- Media -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-white">Media</h3>

      <!-- Main Image -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">Main Image</label>
        <div class="flex items-center gap-4">
          <div
            v-if="preview.image"
            class="h-32 w-48 overflow-hidden rounded-lg border border-white/10"
          >
            <img :src="preview.image" class="h-full w-full object-cover" />
          </div>
          <div class="flex-1">
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="block w-full text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-[#6d28d9]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#d8b4fe] hover:file:bg-[#6d28d9]/20"
            />
            <p class="mt-1 text-xs text-gray-500">Recommended: 1920x1080px (16:9)</p>
          </div>
        </div>
      </div>

      <!-- Gallery -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">Gallery Images</label>
        <div class="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            v-for="(img, index) in preview.gallery"
            :key="index"
            class="group relative aspect-video overflow-hidden rounded-lg border border-white/10"
          >
            <img :src="img" class="h-full w-full object-cover" />
            <button
              type="button"
              @click="removeGalleryItem(index)"
              class="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500"
            >
              &times;
            </button>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          @change="handleGalleryUpload"
          class="block w-full text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-[#6d28d9]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#d8b4fe] hover:file:bg-[#6d28d9]/20"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4 border-t border-white/10 pt-6">
      <Button variant="ghost" text="Cancel" @click="$emit('cancel')" type="button" />
      <Button
        variant="primary"
        :text="isEditing ? 'Save Changes' : 'Create Project'"
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
import type { Project } from "@/interfaces/project";

const props = defineProps<{
  initialData?: Project;
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", payload: any): void;
  (e: "cancel"): void;
}>();

const isEditing = !!props.initialData;

const form = reactive({
  title: "",
  description: "",
  detailedDescription: "",
  year: new Date().getFullYear().toString(),
  role: "",
  challenges: "",
  demoUrl: "",
  codeUrl: "",
  googlePlayUrl: "",
  appleStoreUrl: "",
  categories: [] as string[],
  technologies: [] as string[],
  features: [] as string[],
  image: null as File | string | null,
  gallery: [] as (File | string)[],
});

// Helper inputs for array additions
const newItem = reactive({
  categories: "",
  technologies: "",
  features: "",
});

const preview = reactive({
  image: null as string | null,
  gallery: [] as string[],
});

// Initialize form if editing
onMounted(() => {
  if (props.initialData) {
    Object.assign(form, {
      ...props.initialData,
      // Ensure arrays are arrays
      categories: [...props.initialData.categories],
      technologies: [...props.initialData.technologies],
      features: [...props.initialData.features],
      gallery: [...props.initialData.gallery],
    });

    // Set previews
    preview.image = props.initialData.image;
    preview.gallery = [...props.initialData.gallery];
  }
});

const addArrayItem = (field: "categories" | "technologies" | "features") => {
  const value = newItem[field].trim();
  if (value && !form[field].includes(value)) {
    form[field].push(value);
    newItem[field] = "";
  }
};

const removeArrayItem = (field: "categories" | "technologies" | "features", index: number) => {
  form[field].splice(index, 1);
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    form.image = file;
    preview.image = URL.createObjectURL(file);
  }
};

const handleGalleryUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    Array.from(target.files).forEach((file) => {
      form.gallery.push(file);
      preview.gallery.push(URL.createObjectURL(file));
    });
  }
};

const removeGalleryItem = (index: number) => {
  form.gallery.splice(index, 1);
  preview.gallery.splice(index, 1);
};

const handleSubmit = () => {
  // Clone and prepare payload
  const payload = { ...form };
  emit("submit", payload);
};
</script>
