<template>
    <div>
        <!-- Dashboard stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-[#1e1e1e] rounded-xl p-6 border border-[#333] shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-gray-400 text-sm font-medium">Portfolio Items</h2>
                        <p class="text-3xl font-bold text-white mt-1">{{ portfolioCount }}</p>
                    </div>
                    <div class="bg-[#2d2d2d] p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#6d28d9]" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div class="mt-4">
                    <router-link to="/admin/portfolio"
                        class="text-[#6d28d9] hover:text-[#8b5cf6] text-sm font-medium flex items-center">
                        Manage Projects
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>
            </div>

            <div class="bg-[#1e1e1e] rounded-xl p-6 border border-[#333] shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-gray-400 text-sm font-medium">Blog Posts</h2>
                        <p class="text-3xl font-bold text-white mt-1">{{ blogCount }}</p>
                    </div>
                    <div class="bg-[#2d2d2d] p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#6d28d9]" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                clip-rule="evenodd" />
                            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                        </svg>
                    </div>
                </div>
                <div class="mt-4">
                    <router-link to="/admin/blog"
                        class="text-[#6d28d9] hover:text-[#8b5cf6] text-sm font-medium flex items-center">
                        Manage Posts
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>
            </div>

            <div class="bg-[#1e1e1e] rounded-xl p-6 border border-[#333] shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-gray-400 text-sm font-medium">Current Date</h2>
                        <p class="text-xl font-bold text-white mt-1">{{ currentDate }}</p>
                    </div>
                    <div class="bg-[#2d2d2d] p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#6d28d9]" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div class="mt-4 text-gray-400 text-sm">
                    Last login: {{ lastLoginDate }}
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-[#1e1e1e] rounded-xl p-6 border border-[#333] shadow-lg mb-8">
            <h2 class="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <router-link to="/admin/portfolio/create"
                    class="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#444] p-4 rounded-lg flex flex-col items-center justify-center text-center h-32 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#6d28d9] mb-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="text-white font-medium">Add New Project</span>
                </router-link>

                <router-link to="/admin/blog/create"
                    class="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#444] p-4 rounded-lg flex flex-col items-center justify-center text-center h-32 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#6d28d9] mb-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="text-white font-medium">Create Blog Post</span>
                </router-link>

                <a href="/" target="_blank"
                    class="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#444] p-4 rounded-lg flex flex-col items-center justify-center text-center h-32 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#6d28d9] mb-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="text-white font-medium">View Website</span>
                </a>

                <button @click="reloadStats"
                    class="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#444] p-4 rounded-lg flex flex-col items-center justify-center text-center h-32 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#6d28d9] mb-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="text-white font-medium">Refresh Stats</span>
                </button>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-[#1e1e1e] rounded-xl p-6 border border-[#333] shadow-lg">
            <h2 class="text-lg font-bold text-white mb-4">Recent Activity</h2>
            <div class="space-y-4">
                <div v-for="(activity, index) in recentActivity" :key="index"
                    class="bg-[#2d2d2d] border border-[#444] rounded-lg p-4">
                    <div class="flex items-center">
                        <div
                            class="w-10 h-10 rounded-full bg-[#6d28d9] flex items-center justify-center flex-shrink-0 mr-4">
                            <svg v-if="activity.type === 'portfolio'" xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                                    clip-rule="evenodd" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                    clip-rule="evenodd" />
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                            </svg>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-white font-medium">{{ activity.title }}</h3>
                            <p class="text-gray-400 text-sm">{{ activity.description }}</p>
                        </div>
                        <div class="text-gray-500 text-sm">{{ activity.time }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePortfolioStore } from '@/stores/portfolioProjects';
import { useBlogStore } from '@/stores/blogPosts';

const portfolioStore = usePortfolioStore();
const blogStore = useBlogStore();

// Stats
const portfolioCount = computed(() => portfolioStore.projects.length);
const blogCount = computed(() => blogStore.posts.length);

// Current date
const currentDate = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Last login date - normally would come from backend
const lastLoginDate = ref('Today, ' + new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
}));

// Recent activity - in a real app, this would be fetched from the backend
const recentActivity = ref([
    {
        type: 'blog',
        title: 'New Blog Post Created',
        description: 'Building Responsive Web Applications with Vue 3 and Tailwind CSS',
        time: '2 hours ago'
    },
    {
        type: 'portfolio',
        title: 'Portfolio Project Updated',
        description: 'E-commerce Dashboard project details were updated',
        time: 'Yesterday'
    },
    {
        type: 'blog',
        title: 'Blog Post Edited',
        description: 'Modern UI/UX Design Principles Every Developer Should Know',
        time: 'Yesterday'
    },
    {
        type: 'portfolio',
        title: 'New Project Added',
        description: 'Added Task Management App to portfolio',
        time: '3 days ago'
    }
]);

// Function to reload stats (simulated)
const reloadStats = () => {
    // In a real app, this would fetch updated data from the backend
    const now = new Date();
    lastLoginDate.value = 'Today, ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Initialize data when component is mounted
onMounted(() => {
    // In a real app, this would fetch data from the backend
    // For now, we'll use the data from our store
});
</script>