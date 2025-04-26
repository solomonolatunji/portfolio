<template>
    <div>
        <!-- Header with actions -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-white">Portfolio Projects</h1>
            <div>
                <router-link to="/admin/portfolio/create"
                    class="bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center">
                    <PlusIcon class="h-5 w-5 mr-2" />
                    Add New Project
                </router-link>
            </div>
        </div>

        <!-- Search and filter bar -->
        <div class="bg-[#1e1e1e] rounded-xl p-4 mb-6 border border-[#333] flex flex-col sm:flex-row gap-4">
            <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-500" />
                </div>
                <input type="text" v-model="search" placeholder="Search projects..."
                    class="w-full pl-10 pr-4 py-2.5 bg-[#2d2d2d] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white" />
            </div>
            <div>
                <select v-model="categoryFilter"
                    class="bg-[#2d2d2d] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6d28d9]">
                    <option value="all">All Categories</option>
                    <option value="web">Web Apps</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="ui">UI/UX Design</option>
                </select>
            </div>
        </div>

        <!-- Projects Grid -->
        <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div v-for="project in filteredProjects" :key="project.id"
                class="bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#333] shadow-lg group hover:border-purple-500 transition-all duration-300">
                <div class="relative h-48 overflow-hidden">
                    <img :src="project.image" :alt="project.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div class="p-4 w-full">
                            <div class="flex justify-between items-center">
                                <span class="px-2 py-1 text-xs rounded-full"
                                    :class="getCategoryClass(project.category)">
                                    {{ getCategoryName(project.category) }}
                                </span>
                                <span class="text-gray-300 text-sm">{{ project.year }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-5">
                    <h3 class="font-bold text-white text-lg mb-2 truncate">{{ project.title }}</h3>
                    <p class="text-gray-400 text-sm mb-4 line-clamp-2">{{ project.description }}</p>

                    <div class="flex flex-wrap gap-2 mb-4">
                        <span v-for="(tech, index) in project.technologies?.slice(0, 3)" :key="index"
                            class="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded-full">
                            {{ tech }}
                        </span>
                        <span v-if="project.technologies?.length > 3"
                            class="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded-full">
                            +{{ project.technologies.length - 3 }} more
                        </span>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                        <div class="flex space-x-3">
                            <router-link :to="`/admin/portfolio/edit/${project.id}`"
                                class="text-[#a78bfa] hover:text-[#8b5cf6] flex items-center">
                                <PencilIcon class="h-4 w-4 mr-1" />
                                Edit
                            </router-link>
                            <button @click="confirmDelete(project)"
                                class="text-red-400 hover:text-red-500 flex items-center">
                                <TrashIcon class="h-4 w-4 mr-1" />
                                Delete
                            </button>
                        </div>
                        <router-link :to="`/portfolio/${project.id}`" class="text-gray-400 hover:text-white">
                            Preview
                            <ArrowTopRightOnSquareIcon class="h-4 w-4 inline-block ml-1" />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div v-else class="bg-[#1e1e1e] rounded-xl p-10 text-center border border-[#333] mt-6">
            <DeviceTabletIcon class="mx-auto h-16 w-16 text-gray-600 mb-4" />
            <h3 class="text-xl font-medium text-white mb-2">No projects found</h3>
            <p class="text-gray-400 mb-6">{{ categoryFilter === 'all' ? 'You don\'t have any portfolio projects yet' :
                `No projects in the ${getCategoryName(categoryFilter)} category` }}</p>
            <router-link to="/admin/portfolio/create"
                class="bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white py-2.5 px-6 rounded-lg font-medium transition-all duration-300 inline-flex items-center">
                <PlusIcon class="h-5 w-5 mr-2" />
                Add Your First Project
            </router-link>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div class="bg-[#1e1e1e] rounded-lg p-6 max-w-md w-full">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-white">Confirm Deletion</h3>
                    <button @click="showDeleteModal = false" class="text-gray-400 hover:text-white">
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>
                <p class="text-gray-300 mb-6">Are you sure you want to delete the project <span
                        class="font-medium text-white">{{ projectToDelete?.title }}</span>? This action cannot be
                    undone.</p>
                <div class="flex justify-end space-x-4">
                    <button @click="showDeleteModal = false"
                        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button @click="deleteProject"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolioProjects';
import type { Project } from '@/interfaces/portfolio';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    ArrowTopRightOnSquareIcon,
    DeviceTabletIcon,
    XMarkIcon
} from '@heroicons/vue/24/outline';
import { useToast } from 'vue-toastification';

const portfolioStore = usePortfolioStore();
const toast = useToast();

// Filters
const search = ref('');
const categoryFilter = ref('all');

// Delete modal state
const showDeleteModal = ref(false);
const projectToDelete = ref<Project | null>(null);

// Filter projects based on search and category
const filteredProjects = computed(() => {
    let projects = portfolioStore.projects;

    if (categoryFilter.value !== 'all') {
        projects = projects.filter(p => p.category === categoryFilter.value);
    }

    if (search.value.trim()) {
        const searchLower = search.value.toLowerCase();
        projects = projects.filter(p =>
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.technologies?.some(tech => tech.toLowerCase().includes(searchLower))
        );
    }

    return projects;
});

// Category utilities
function getCategoryName(category: string): string {
    switch (category) {
        case 'web': return 'Web App';
        case 'mobile': return 'Mobile App';
        case 'ui': return 'UI/UX Design';
        default: return category;
    }
}

function getCategoryClass(category: string): string {
    switch (category) {
        case 'web': return 'bg-blue-900/30 text-blue-300';
        case 'mobile': return 'bg-green-900/30 text-green-300';
        case 'ui': return 'bg-purple-900/30 text-purple-300';
        default: return 'bg-gray-900/30 text-gray-300';
    }
}

// Delete functionality
function confirmDelete(project: Project) {
    projectToDelete.value = project;
    showDeleteModal.value = true;
}

function deleteProject() {
    if (projectToDelete.value) {
        portfolioStore.deleteProject(projectToDelete.value.id);
        toast.success(`Project "${projectToDelete.value.title}" has been deleted`);
        showDeleteModal.value = false;
        projectToDelete.value = null;
    }
}
</script>