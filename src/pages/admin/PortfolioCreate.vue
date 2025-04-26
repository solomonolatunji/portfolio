<template>
    <div>
        <div class="mb-6 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-white">Add New Project</h1>
            <router-link to="/admin/portfolio/manager" class="text-[#a78bfa] hover:text-[#8b5cf6] flex items-center">
                <ArrowLeftIcon class="h-5 w-5 mr-1" />
                Back to Projects
            </router-link>
        </div>

        <div class="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-[#333]">
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
                            <label for="projectUrl" class="block text-white text-sm font-medium mb-2">
                                Project URL
                                <span class="text-gray-500 text-xs">(optional)</span>
                            </label>
                            <input type="url" id="projectUrl" v-model="form.demoUrl"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                placeholder="https://" />
                        </div>

                        <!-- Project Repository -->
                        <div>
                            <label for="repoUrl" class="block text-white text-sm font-medium mb-2">
                                Repository URL
                                <span class="text-gray-500 text-xs">(optional)</span>
                            </label>
                            <input type="url" id="repoUrl" v-model="form.codeUrl"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                placeholder="https://github.com/username/repo" />
                        </div>

                        <!-- Completion Year -->
                        <div>
                            <label for="year" class="block text-white text-sm font-medium mb-2">Year *</label>
                            <input type="number" id="year" v-model="form.year"
                                class="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                required min="2000" :max="currentYear" placeholder="Year completed" />
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
                                    :class="{ 'transform-featured border-purple-500': form.featured, 'border-gray-600': !form.featured }" />
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

                            <div class="flex flex-col sm:flex-row">
                                <input type="text" v-model="newTech" @keydown.enter.prevent="addTechnology"
                                    class="flex-1 bg-[#2d2d2d] border border-gray-700 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                                    placeholder="Add a technology (e.g., Vue.js)" />
                                <button type="button" @click="addTechnology"
                                    class="bg-[#6d28d9] hover:bg-[#5b21b6] text-white rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none px-4 py-2.5 transition-colors w-full sm:w-auto">
                                    Add
                                </button>
                            </div>
                            <p class="text-red-400 text-xs mt-2" v-if="technologiesError">{{ technologiesError }}
                            </p>
                        </div>

                        <!-- Project Image -->
                        <div>
                            <label class="block text-white text-sm font-medium mb-2">Project Image *</label>
                            <div class="rounded-lg border border-dashed border-gray-600 bg-[#2d2d2d] p-4">
                                <div v-if="imagePreview" class="mb-4">
                                    <img :src="imagePreview" alt="Preview" class="max-h-48 rounded-lg mx-auto" />
                                </div>

                                <div class="text-center">
                                    <label for="image" class="cursor-pointer">
                                        <div
                                            class="bg-gray-800 hover:bg-gray-700 text-white rounded-lg py-2 px-4 sm:py-3 sm:px-4 inline-flex items-center transition-colors text-sm sm:text-base">
                                            <CameraIcon class="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
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
                <div
                    class="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <button type="button" @click="resetForm"
                        class="w-full sm:w-auto px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors order-2 sm:order-1">
                        Reset
                    </button>
                    <button type="submit"
                        class="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white font-medium rounded-lg transition-all duration-300 order-1 sm:order-2">
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePortfolioStore } from '@/stores/portfolioProjects';
import type { Project, ProjectForm } from '@/interfaces/portfolio';
import { ArrowLeftIcon, XMarkIcon, CameraIcon } from '@heroicons/vue/24/outline';
import { useToast } from 'vue-toastification';

const router = useRouter();
const portfolioStore = usePortfolioStore();
const toast = useToast();

const imageInput = ref<HTMLInputElement | null>(null);
const imagePreview = ref<string | null>(null);
const imageError = ref<string | null>(null);
const technologiesError = ref<string | null>(null);
const newTech = ref('');

const currentYear = computed(() => new Date().getFullYear());

const form = ref<ProjectForm & { image: File | string | null, client?: string, featured?: boolean }>({
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
    client: '',
    featured: false,
    image: "",
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
    form.value = {
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
        client: '',
        featured: false,
        image: "null",
    };

    newTech.value = '';
    imagePreview.value = null;
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

    // Validate image
    if (!form.value.image) {
        imageError.value = 'Please select a project image';
        isValid = false;
    } else {
        imageError.value = null;
    }

    return isValid;
}

async function handleSubmit() {
    if (!validateForm()) return;

    try {
        // In a real app, you'd upload the image to storage here
        // and get the URL back. For now we'll just simulate that.
        const imageUrl = URL.createObjectURL(form.value.image as File);

        // Create a new project using our interface
        const newProject: Project = {
            id: Date.now().toString(),
            title: form.value.title,
            description: form.value.description,
            detailedDescription: form.value.detailedDescription,
            image: imageUrl,
            year: form.value.year,
            category: form.value.category,
            technologies: form.value.technologies,
            features: form.value.features,
            role: form.value.role,
            challenges: form.value.challenges,
            gallery: form.value.gallery,
            demoUrl: form.value.demoUrl,
            codeUrl: form.value.codeUrl,
        };

        // Add to store
        portfolioStore.addProject(newProject);

        // Show success toast notification
        toast.success(`Project "${form.value.title}" has been created successfully!`);

        // Navigate to portfolio manager
        router.push('/admin/portfolio');
    } catch (error) {
        // Show error toast notification
        toast.error('Failed to create project. Please try again.');
        console.error('Failed to create project:', error);
    }
}
</script>

<style scoped>
.toggle-checkbox:checked {
    transform: translateX(1.5rem);
    border-color: #8b5cf6;
}

.toggle-checkbox:checked+.toggle-label {
    background-color: #7e22ce;
}
</style>