<template>
  <form @submit.prevent="handleSubmit" class="wordpress-editor">
    <div class="editor-grid">
      <div class="main-content">
        <div class="title-section">
          <input
            v-model="form.title"
            type="text"
            placeholder="Add project title"
            required
            class="title-input"
          />
          <div class="year-role-row">
            <input v-model="form.year" type="text" placeholder="Year" required class="year-input" />
            <input
              v-model="form.role"
              type="text"
              placeholder="Your Role"
              required
              class="role-input"
            />
          </div>
        </div>

        <div class="content-section">
          <label class="section-label">Project Description</label>
          <TiptapEditor
            v-model="form.detailedDescription"
            placeholder="Describe your project in detail..."
          />
        </div>

        <div class="content-section">
          <label class="section-label">Challenges & Solutions</label>
          <TiptapEditor
            v-model="form.challenges"
            placeholder="Describe technical challenges and how you solved them..."
          />
        </div>
      </div>

      <div class="sidebar">
        <div class="sidebar-section publish-box">
          <h3 class="sidebar-title">Publish</h3>
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
          <h3 class="sidebar-title">Links</h3>
          <div class="links-container">
            <Input v-model="form.demoUrl" label="Live Demo" placeholder="https://" />
            <Input v-model="form.codeUrl" label="Source Code" placeholder="https://github.com/" />
            <Input v-model="form.googlePlayUrl" label="Google Play" placeholder="https://" />
            <Input v-model="form.appleStoreUrl" label="App Store" placeholder="https://" />
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Technologies</h3>
          <div class="tags-container">
            <div class="tag-list">
              <span v-for="(tech, index) in form.technologies" :key="index" class="tag-item">
                {{ tech }}
                <button type="button" @click="removeTech(index)" class="tag-remove">×</button>
              </span>
            </div>
            <input
              v-model="newTech"
              @keydown.enter.prevent="addTech"
              class="tag-input"
              placeholder="Add technology and press Enter"
            />
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Categories</h3>
          <div class="tags-container">
            <div class="tag-list">
              <span
                v-for="(cat, index) in form.categories"
                :key="index"
                class="tag-item category-tag"
              >
                {{ cat }}
                <button type="button" @click="removeCategory(index)" class="tag-remove">×</button>
              </span>
            </div>
            <input
              v-model="newCategory"
              @keydown.enter.prevent="addCategory"
              class="tag-input"
              placeholder="Add category and press Enter"
            />
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Features</h3>
          <div class="tags-container">
            <div class="tag-list">
              <span
                v-for="(feat, index) in form.features"
                :key="index"
                class="tag-item feature-tag"
              >
                {{ feat }}
                <button type="button" @click="removeFeature(index)" class="tag-remove">×</button>
              </span>
            </div>
            <input
              v-model="newFeature"
              @keydown.enter.prevent="addFeature"
              class="tag-input"
              placeholder="Add feature and press Enter"
            />
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Main Image</h3>
          <div class="featured-image">
            <div v-if="preview.image" class="image-preview">
              <img :src="preview.image" alt="Main" class="preview-img" />
              <button type="button" @click="removeMainImage" class="remove-image">Remove</button>
            </div>
            <div v-else class="image-upload">
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                id="main-upload"
                class="file-input"
              />
              <label for="main-upload" class="upload-label">
                <IconPhoto class="h-8 w-8 text-gray-400" />
                <span class="upload-text">Upload main image</span>
                <span class="upload-hint">1920x1080px recommended</span>
              </label>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Gallery</h3>
          <div class="gallery-grid" v-if="preview.gallery.length > 0">
            <div v-for="(img, index) in preview.gallery" :key="index" class="gallery-item">
              <img :src="img" alt="Gallery" class="gallery-img" />
              <button type="button" @click="removeGalleryItem(index)" class="gallery-remove">
                ×
              </button>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            @change="handleGalleryUpload"
            id="gallery-upload"
            class="file-input"
          />
          <label for="gallery-upload" class="gallery-upload-btn">
            <IconPhotoPlus class="h-4 w-4" />
            <span>Add Images</span>
          </label>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { IconPhoto, IconPhotoPlus } from "@tabler/icons-vue";
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
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

.year-role-row {
  display: flex;
  gap: 0.75rem;
}

.year-input,
.role-input {
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: white;
  outline: none;
}

.year-input::placeholder,
.role-input::placeholder {
  color: rgb(107, 114, 128);
}

.year-input:focus,
.role-input:focus {
  border-color: #6d28d9;
  --tw-ring-shadow: 0 0 0 1px #6d28d9;
  box-shadow: var(--tw-ring-shadow);
}

.year-input {
  width: 6rem;
}

.role-input {
  flex: 1;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e1e;
  padding: 1.5rem;
}

.section-label {
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: white;
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

.publish-actions {
  display: flex;
  gap: 0.5rem;
}

.links-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

.category-tag {
  background-color: rgba(109, 40, 217, 0.2);
  color: rgb(216, 180, 254);
}

.feature-tag {
  background-color: rgba(34, 197, 94, 0.2);
  color: rgb(134, 239, 172);
}

.tag-remove {
  color: currentColor;
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

.gallery-grid {
  margin-bottom: 0.75rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 0.5rem;
}

.gallery-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.gallery-remove {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  border-radius: 9999px;
  background-color: rgba(0, 0, 0, 0.5);
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: white;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 150ms;
}

.gallery-item:hover .gallery-remove {
  opacity: 1;
}

.gallery-remove:hover {
  background-color: rgb(239, 68, 68);
}

.gallery-upload-btn {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: white;
  transition-property: color, background-color, border-color;
  transition-duration: 150ms;
}

.gallery-upload-btn:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
