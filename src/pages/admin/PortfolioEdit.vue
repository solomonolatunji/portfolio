<template>
    <div>
        <div class="mb-6 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-white">Edit Project</h1>
            <router-link to="/admin/portfolio" class="text-[#a78bfa] hover:text-[#8b5cf6] flex items-center">
                <ArrowLeftIcon class="h-5 w-5 mr-1" />
                Back to Projects
            </router-link>
        </div>

        <div v-if="loading" class="flex items-center justify-center h-64">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8b5cf6]"></div>
        </div>

        <div v-else-if="error" class="bg-[#1e1e1e] rounded-xl p-6 border border-[#333]">
            <div class="text-center py-10">
                <ExclamationTriangleIcon class="h-16 w-16 mx-auto text-red-500 mb-4" />
                <h2 class="text-xl font-bold text-red-400 mb-2">Error Loading Project</h2>
                <p class="text-gray-400">{{ error }}</p>
                <router-link to="/admin/portfolio"
                    class="inline-block mt-6 px-4 py-2 bg-[#6d28d9] hover:bg-[#5b21b6] text-white rounded-lg">
                    Return to Projects
                </router-link>
            </div>
        </div>

        <div v-else class="bg-[#1e1e1e] rounded-xl p-6 border border-[#333]">
            <form @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <!-- Left Column -->
                    <div class="space-y-6">
                        <!-- Project Title -->
                        <div>
                            <label for="title" class="block text-white text-sm font-medium mb-2">Project Title *</label>
                            <input type="text" id="title" v-model="form.title"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                required placeholder="Enter project title" />
                        </div>

                        <!-- Project Category -->
                        <div>
                            <label for="category" class="block text-white text-sm font-medium mb-2">Category *</label>
                            <select id="category" v-model="form.category"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                required>
                                <option value="" disabled>Select a category</option>
                                <option value="web">Web Application</option>
                                <option value="mobile">Mobile Application</option>
                                <option value="ui">UI/UX Design</option>
                            </select>
                        </div>

                        <!-- Project URL -->
                        <div>
                            <label for="demoUrl" class="block text-white text-sm font-medium mb-2">
                                Project URL
                                <span class="text-gray-500 text-xs">(optional)</span>
                            </label>
                            <input type="url" id="demoUrl" v-model="form.demoUrl"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                placeholder="https://" />
                        </div>

                        <!-- Project Repository -->
                        <div>
                            <label for="codeUrl" class="block text-white text-sm font-medium mb-2">
                                Repository URL
                                <span class="text-gray-500 text-xs">(optional)</span>
                            </label>
                            <input type="url" id="codeUrl" v-model="form.codeUrl"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                placeholder="https://github.com/username/repo" />
                        </div>

                        <!-- Completion Year -->
                        <div>
                            <label for="year" class="block text-white text-sm font-medium mb-2">Year *</label>
                            <input type="text" id="year" v-model="form.year"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                required placeholder="Year completed" />
                        </div>

                        <!-- Client Name -->
                        <div>
                            <label for="client" class="block text-white text-sm font-medium mb-2">
                                Client Name
                                <span class="text-gray-500 text-xs">(optional)</span>
                            </label>
                            <input type="text" id="client" v-model="form.client"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                placeholder="Client or company name" />
                        </div>

                        <!-- Featured Project Toggle -->
                        <div class="flex items-center space-x-3">
                            <div class="relative inline-block w-12 align-middle select-none transition duration-200">
                                <input type="checkbox" id="featured" v-model="form.featured"
                                    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300"
                                    :class="{ 'translate-x-6 border-purple-500': form.featured, 'border-gray-600': !form.featured }" />
                                <label for="featured"
                                    class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"
                                    :class="{ 'bg-purple-700': form.featured }" />
                            </div>
                            <label for="featured" class="text-white text-sm font-medium cursor-pointer">Featured
                                Project</label>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="space-y-6">
                        <!-- Project Description -->
                        <div>
                            <label for="description" class="block text-white text-sm font-medium mb-2">Description
                                *</label>
                            <textarea id="description" v-model="form.description" rows="3"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                required placeholder="Brief description of the project"></textarea>
                        </div>

                        <!-- Technologies Used -->
                        <div>
                            <label class="block text-white text-sm font-medium mb-2">Technologies Used *</label>
                            <div class="flex flex-wrap gap-2 mb-2">
                                <div v-for="(tech, index) in form.technologies" :key="index"
                                    class="flex items-center bg-[#3d3d3d] text-white rounded-full pl-3 pr-2 py-1 text-sm">
                                    {{ tech }}
                                    <button type="button" @click="removeTechnology(index)"
                                        class="ml-2 text-gray-400 hover:text-red-400">
                                        <XMarkIcon class="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div class="flex">
                                <input type="text" v-model="newTech" @keydown.enter.prevent="addTechnology"
                                    class="flex-1 bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                    placeholder="Add a technology (e.g., Vue.js)" />
                                <button type="button" @click="addTechnology"
                                    class="bg-[#6d28d9] hover:bg-[#5b21b6] text-white rounded-r-lg px-4 py-2.5 transition-colors">
                                    Add
                                </button>
                            </div>
                            <p class="text-red-400 text-xs mt-2" v-if="technologiesError">{{ technologiesError }}</p>
                        </div>

                        <!-- Project Image -->
                        <div>
                            <label class="block text-white text-sm font-medium mb-2">Project Image</label>
                            <div class="rounded-lg border border-dashed border-gray-600 bg-[#2d2d2d] p-4">
                                <div v-if="imagePreview" class="mb-4">
                                    <img :src="imagePreview" alt="Preview" class="max-h-48 rounded-lg mx-auto" />
                                </div>

                                <div class="text-center">
                                    <label for="image" class="cursor-pointer">
                                        <div
                                            class="bg-gray-800 hover:bg-gray-700 text-white rounded-lg py-3 px-4 inline-flex items-center transition-colors">
                                            <CameraIcon class="h-5 w-5 mr-2" />
                                            {{ imagePreview ? 'Change Image' : 'Choose Image' }}
                                        </div>
                                    </label>
                                    <input type="file" id="image" ref="imageInput" @change="handleImageChange"
                                        accept="image/*" class="hidden" />
                                </div>

                                <p class="text-center text-gray-400 text-xs mt-3">
                                    Recommended: 1200×800px or higher, JPEG or PNG
                                </p>
                            </div>
                            <p class="text-red-400 text-xs mt-2" v-if="imageError">{{ imageError }}</p>
                        </div>
                    </div>
                </div>

                <!-- Submit Buttons -->
                <div class="border-t border-gray-700 pt-6 flex justify-end space-x-4">
                    <button type="button" @click="resetForm"
                        class="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        Reset
                    </button>
                    <button type="submit"
                        class="px-6 py-2.5 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white font-medium rounded-lg transition-all duration-300">
                        Update Project
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePortfolioStore } from '@/stores/portfolioProjects';
import type { Project, ProjectForm } from '@/interfaces/portfolio';
import {
    ArrowLeftIcon,
    XMarkIcon,
    CameraIcon,
    ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();
const portfolioStore = usePortfolioStore();

const imageInput = ref<HTMLInputElement | null>(null);
const imagePreview = ref<string | null>(null);
const imageError = ref<string | null>(null);
const technologiesError = ref<string | null>(null);
const newTech = ref('');
const loading = ref(true);
const error = ref<string | null>(null);

// Get current year for year input max value
const currentYear = computed(() => new Date().getFullYear());

// Form data with proper typing
const form = ref<ProjectForm & {
    id: string,
    image: File | null,
    imageUrl: string,
    client?: string,
    featured?: boolean
}>({
    id: '',
    title: '',
    description: '',
    detailedDescription: '',
    category: '' as "web" | "mobile" | "ui",
    demoUrl: '',
    codeUrl: '',
    technologies: [],
    year: currentYear.value.toString(),
    role: '',
    challenges: '',
    features: [],
    gallery: [],
    image: null,
    imageUrl: '',
    client: '',
    featured: false,
});

// Load project data
onMounted(async () => {
    try {
        const projectId = route.params.id as string;
        const project = portfolioStore.getProjectById(projectId);

        if (!project) {
            error.value = 'Project not found';
            loading.value = false;
            return;
        }

        // Fill form with project data
        form.value = {
            ...form.value,
            id: project.id,
            title: project.title,
            description: project.description,
            detailedDescription: project.detailedDescription || '',
            category: project.category,
            demoUrl: project.demoUrl || '',
            codeUrl: project.codeUrl || '',
            technologies: [...project.technologies],
            year: project.year,
            role: project.role || '',
            challenges: project.challenges || '',
            features: project.features || [],
            gallery: project.gallery || [],
            client: '',  // Optional fields
            featured: false, // Optional fields
            imageUrl: project.image,
        };

        // Set image preview
        imagePreview.value = project.image;

        loading.value = false;
    } catch (err) {
        console.error('Failed to load project:', err);
        error.value = 'Failed to load project data';
        loading.value = false;
    }
});

// Methods
function handleImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        // Validate file type
        if (!file.type.match('image.*')) {
            imageError.value = 'Please select a valid image file';
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            imageError.value = 'Image file size must be less than 5MB';
            return;
        }

        form.value.image = file;
        imageError.value = null;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
}

function addTechnology() {
    const tech = newTech.value.trim();

    if (tech) {
        if (!form.value.technologies.includes(tech)) {
            form.value.technologies.push(tech);
            technologiesError.value = null;
        }
        newTech.value = '';
    }
}

function removeTechnology(index: number) {
    form.value.technologies.splice(index, 1);
}

function resetForm() {
    // Reload original data
    const project = portfolioStore.getProjectById(form.value.id);
    if (project) {
        form.value = {
            ...form.value,
            title: project.title,
            description: project.description,
            detailedDescription: project.detailedDescription || '',
            category: project.category,
            demoUrl: project.demoUrl || '',
            codeUrl: project.codeUrl || '',
            technologies: [...project.technologies],
            year: project.year,
            role: project.role || '',
            challenges: project.challenges || '',
            features: project.features || [],
            gallery: project.gallery || [],
            image: null,
        };

        // Reset preview to original image
        imagePreview.value = project.image;
    }

    newTech.value = '';
    imageError.value = null;
    technologiesError.value = null;

    if (imageInput.value) {
        imageInput.value.value = '';
    }
}

function validateForm(): boolean {
    let isValid = true;

    // Validate technologies
    if (form.value.technologies.length === 0) {
        technologiesError.value = 'Please add at least one technology';
        isValid = false;
    } else {
        technologiesError.value = null;
    }

    return isValid;
}

async function handleSubmit() {
    if (!validateForm()) return;

    try {
        // In a real app, you'd upload the image to storage here if changed
        // For now we'll handle both cases (new image or existing)
        const imageUrl = form.value.image
            ? URL.createObjectURL(form.value.image)
            : form.value.imageUrl;

        // Update project using our interface
        const updatedProject: Project = {
            id: form.value.id,
            title: form.value.title,
            description: form.value.description,
            detailedDescription: form.value.detailedDescription,
            image: imageUrl,
            category: form.value.category,
            technologies: form.value.technologies,
            year: form.value.year,
            features: form.value.features,
            role: form.value.role,
            challenges: form.value.challenges,
            gallery: form.value.gallery,
            demoUrl: form.value.demoUrl,
            codeUrl: form.value.codeUrl,
        };

        // Update store
        portfolioStore.updateProject(updatedProject);

        // Navigate to portfolio manager
        router.push('/admin/portfolio');
    } catch (error) {
        console.error('Failed to update project:', error);
    }
}
</script>

<style scoped>
.toggle-checkbox:checked {
    @apply translate-x-6 border-purple-500;
}

.toggle-checkbox:checked+.toggle-label {
    @apply bg-purple-700;
}
</style>