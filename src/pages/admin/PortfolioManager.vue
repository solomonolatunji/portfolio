<template>
    <div>
        <!-- Header with actions -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-white">Portfolio Projects</h1>
            <div>
                <router-link to="/admin/portfolio/create"
                    class="bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                    Add New Project
                </router-link>
            </div>
        </div>

        <!-- Search and filter bar -->
        <div class="bg-[#1e1e1e] rounded-xl p-4 mb-6 border border-[#333] flex flex-col sm:flex-row gap-4">
            <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd" />
                    </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Edit
                            </router-link>
                            <button @click="confirmDelete(project)"
                                class="text-red-400 hover:text-red-500 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                Delete
                            </button>
                        </div>
                        <router-link :to="`/portfolio/${project.id}`" class="text-gray-400 hover:text-white">
                            Preview
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block ml-1"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path
                                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div v-else class="bg-[#1e1e1e] rounded-xl p-10 text-center border border-[#333] mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-gray-600 mb-4" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                    d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0v3H7V4h6zm-5 7a1 1 0 100-2 1 1 0 000 2zm0 2a1 1 0 110 2 1 1 0 010-2zm7-2a1 1 0 100-2 1 1 0 000 2zm-7 4h4a1 1 0 110 2H8a1 1 0 110-2z"
                    clip-rule="evenodd" />
            </svg>
            <h3 class="text-xl font-medium text-white mb-2">No projects found</h3>
            <p class="text-gray-400 mb-6">{{ categoryFilter === 'all' ? 'You don\'t have any portfolio projects yet' :
                `No projects in the ${getCategoryName(categoryFilter)} category` }}</p>
            <router-link to="/admin/portfolio/create"
                class="bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white py-2.5 px-6 rounded-lg font-medium transition-all duration-300 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clip-rule="evenodd" />
                </svg>
                Add Your First Project
            </router-link>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div class="bg-[#1e1e1e] rounded-lg p-6 max-w-md w-full">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-white">Confirm Deletion</h3>
                    <button @click="showDeleteModal = false" class="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
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
import { usePortfolioStore, type Project } from '@/stores/portfolioProjects';

const portfolioStore = usePortfolioStore();

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
        showDeleteModal.value = false;
        projectToDelete.value = null;
    }
}
</script>