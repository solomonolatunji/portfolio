<template>
  <form @submit.prevent="handleSubmit" class="space-y-8 pb-12">
    <!-- Header Area -->
    <div class="flex items-center justify-between">
      <div>
        <h1
          class="bg-linear-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold text-transparent"
        >
          {{ isEditing ? "Edit Project" : "Create New Project" }}
        </h1>
        <p class="mt-1 text-sm text-gray-400">
          Showcase your work and share your professional journey.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="secondary" size="md" text="Cancel" @click="$emit('cancel')" />
        <Button
          variant="primary"
          size="md"
          :text="isEditing ? 'Update Project' : 'Publish Project'"
          :loading="isLoading"
          type="submit"
        />
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <!-- Left Column: Primary Info -->
      <div class="space-y-8">
        <!-- Title & Basic Info Card -->
        <div
          class="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-white/20"
        >
          <div class="space-y-2">
            <label class="text-xs font-semibold tracking-widest text-gray-500 uppercase"
              >Project Title</label
            >
            <input
              v-model="form.title"
              type="text"
              placeholder="Enter project name..."
              required
              class="w-full border-none bg-transparent p-0 text-4xl font-extrabold text-white placeholder-white/10 outline-none focus:ring-0"
            />
          </div>

          <div class="grid grid-cols-2 gap-6 border-t border-white/5 pt-6">
            <Input
              v-model="form.year"
              label="Development Year"
              placeholder="e.g. 2024"
              required
              class="border-white/10! bg-white/5!"
            />
            <Input
              v-model="form.role"
              label="Your Role"
              placeholder="e.g. Lead Developer"
              required
              class="border-white/10! bg-white/5!"
            />
          </div>
        </div>

        <!-- Detailed Content Cards -->
        <div class="space-y-6">
          <div class="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div class="border-b border-white/10 bg-white/5 p-6">
              <h3 class="text-sm font-semibold tracking-wider text-white uppercase">
                Project Story
              </h3>
              <p class="mt-1 text-xs text-gray-400">Deep dive into what this project is about.</p>
            </div>
            <div class="p-2">
              <TiptapEditor
                v-model="form.detailedDescription"
                placeholder="Write the narrative of this project..."
                class="min-h-[400px]"
              />
            </div>
          </div>

          <div class="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div class="border-b border-white/10 bg-white/5 p-6">
              <h3 class="text-sm font-semibold tracking-wider text-white uppercase">
                Challenges & Solutions
              </h3>
              <p class="mt-1 text-xs text-gray-400">What technical hurdles did you overcome?</p>
            </div>
            <div class="p-2">
              <TiptapEditor
                v-model="form.challenges"
                placeholder="Detail the technical milestones..."
                class="min-h-[300px]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Metadata -->
      <div class="space-y-6">
        <!-- Project Assets (Sidebar) -->

        <!-- Links Section -->
        <div class="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 class="mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Platform & Links
          </h3>
          <div class="space-y-4">
            <Input
              v-model="form.demoUrl"
              label="Live Preview"
              placeholder="https://"
              class="border-white/10! bg-white/5!"
            />
            <Input
              v-model="form.codeUrl"
              label="Source Repository"
              placeholder="https://"
              class="border-white/10! bg-white/5!"
            />
            <Input
              v-model="form.googlePlayUrl"
              label="Play Store"
              placeholder="https://"
              class="border-white/10! bg-white/5!"
            />
            <Input
              v-model="form.appleStoreUrl"
              label="App Store"
              placeholder="https://"
              class="border-white/10! bg-white/5!"
            />
          </div>
        </div>

        <!-- Taxonomies (Tech, Categories, Features) -->
        <div class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 class="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Technologies
          </h3>
          <div class="space-y-4">
            <Input
              v-model="newTech"
              placeholder="Press Enter to add tech..."
              @keydown.enter.prevent="addTech"
              class="border-white/10! bg-white/5! shadow-none focus:border-blue-500/50!"
            />
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, index) in form.technologies"
                :key="index"
                class="inline-flex items-center rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300"
              >
                {{ tech }}
                <button
                  @click="removeTech(index)"
                  class="ml-1.5 transition-colors hover:text-white"
                >
                  <IconX class="h-3.5 w-3.5" />
                </button>
              </span>
            </div>
          </div>

          <h3 class="mt-8 mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Categories
          </h3>
          <div class="space-y-4">
            <Input
              v-model="newCategory"
              placeholder="Add category..."
              @keydown.enter.prevent="addCategory"
              class="border-white/10! bg-white/5! shadow-none focus:border-purple-500/50!"
            />
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(cat, index) in form.categories"
                :key="index"
                class="inline-flex items-center rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-300"
              >
                {{ cat }}
                <button
                  @click="removeCategory(index)"
                  class="ml-1.5 transition-colors hover:text-white"
                >
                  <IconX class="h-3.5 w-3.5" />
                </button>
              </span>
            </div>
          </div>
        </div>

        <!-- Features Widget -->
        <div class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 class="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Key Features
          </h3>
          <div class="space-y-4">
            <Input
              v-model="newFeature"
              placeholder="Add a standout feature..."
              @keydown.enter.prevent="addFeature"
              class="border-white/10! bg-white/5! shadow-none focus:border-green-500/50!"
            />
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(feat, index) in form.features"
                :key="index"
                class="inline-flex items-center rounded-lg border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-300"
              >
                {{ feat }}
                <button
                  @click="removeFeature(index)"
                  class="ml-1.5 transition-colors hover:text-white"
                >
                  <IconX class="h-3.5 w-3.5" />
                </button>
              </span>
            </div>
          </div>
        </div>

        <!-- Visuals -->
        <div class="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 class="mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Media Assets
          </h3>

          <!-- Main Image -->
          <div class="space-y-3">
            <label class="text-xs font-medium text-gray-500">Main Presentation Image</label>
            <div
              class="group relative aspect-video overflow-hidden rounded-2xl border-2 border-dashed border-white/10 bg-white/5 transition-all hover:border-purple-500/50"
            >
              <div v-if="preview.image" class="h-full w-full">
                <img :src="preview.image" alt="Main" class="h-full w-full object-cover" />
                <div
                  class="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <button
                    type="button"
                    @click="removeMainImage"
                    class="rounded-full bg-red-500/20 p-2 text-red-500 hover:bg-red-500/40"
                  >
                    <IconTrash class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <label
                v-else
                for="main-upload"
                class="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4"
              >
                <IconPhoto class="h-8 w-8 text-gray-400" />
                <span class="mt-2 text-xs text-gray-500">16:9 Aspect Ratio</span>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  id="main-upload"
                  class="hidden"
                />
              </label>
            </div>
          </div>

          <!-- Gallery -->
          <div class="space-y-4">
            <label class="text-xs font-medium text-gray-500">Project Gallery</label>
            <div class="grid grid-cols-2 gap-3" v-if="preview.gallery.length > 0">
              <div
                v-for="(img, index) in preview.gallery"
                :key="index"
                class="group relative aspect-square overflow-hidden rounded-xl"
              >
                <img :src="img" alt="Gallery" class="h-full w-full object-cover" />
                <button
                  @click="removeGalleryItem(index)"
                  class="absolute top-2 right-2 rounded-lg bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500"
                >
                  <IconX class="h-4 w-4" />
                </button>
              </div>
            </div>

            <label
              for="gallery-upload"
              class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-white/10"
            >
              <IconPhotoPlus class="h-5 w-5" />
              <span>Append Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                @change="handleGalleryUpload"
                id="gallery-upload"
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
import { IconPhoto, IconPhotoPlus, IconX, IconTrash } from "@tabler/icons-vue";
import TiptapEditor from "@/components/Admin/Shared/TiptapEditor.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
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

const newCategory = ref("");
const newTech = ref("");
const newFeature = ref("");

const preview = reactive({
  image: null as string | null,
  gallery: [] as string[],
});

onMounted(() => {
  if (props.initialData) {
    Object.assign(form, {
      ...props.initialData,
      categories: [...props.initialData.categories],
      technologies: [...props.initialData.technologies],
      features: [...props.initialData.features],
      gallery: [...props.initialData.gallery],
    });

    preview.image = props.initialData.image;
    preview.gallery = [...props.initialData.gallery];
  }
});

const addCategory = () => {
  const value = newCategory.value.trim();
  if (value && !form.categories.includes(value)) {
    form.categories.push(value);
    newCategory.value = "";
  }
};

const removeCategory = (index: number) => {
  form.categories.splice(index, 1);
};

const addTech = () => {
  const value = newTech.value.trim();
  if (value && !form.technologies.includes(value)) {
    form.technologies.push(value);
    newTech.value = "";
  }
};

const removeTech = (index: number) => {
  form.technologies.splice(index, 1);
};

const addFeature = () => {
  const value = newFeature.value.trim();
  if (value && !form.features.includes(value)) {
    form.features.push(value);
    newFeature.value = "";
  }
};

const removeFeature = (index: number) => {
  form.features.splice(index, 1);
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    form.image = file;
    preview.image = URL.createObjectURL(file);
  }
};

const removeMainImage = () => {
  form.image = null;
  preview.image = null;
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
  if (!form.description && form.detailedDescription) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = form.detailedDescription;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    form.description = textContent.substring(0, 160) + (textContent.length > 160 ? "..." : "");
  }

  const payload = { ...form };
  emit("submit", payload);
};
</script>
