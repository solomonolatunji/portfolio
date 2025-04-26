<template>
    <div>
        <!-- Dashboard stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <!-- Stat Card 1: Portfolio Items -->
            <div class="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-[#333] shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-gray-400 text-sm font-medium">Portfolio Items</h2>
                        <p class="text-3xl font-bold text-white mt-1">{{ portfolioCount }}</p>
                    </div>
                    <div class="bg-[#2d2d2d] p-3 rounded-full">
                        <ComputerDesktopIcon class="h-6 w-6 text-[#6d28d9]" />
                    </div>
                </div>
                <div class="mt-4">
                    <router-link to="/admin/portfolio"
                        class="text-[#6d28d9] hover:text-[#8b5cf6] text-sm font-medium flex items-center">
                        Manage Projects
                        <ArrowRightIcon class="h-4 w-4 ml-1" />
                    </router-link>
                </div>
            </div>

            <!-- Stat Card 2: Blog Posts -->
            <div class="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-[#333] shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-gray-400 text-sm font-medium">Blog Posts</h2>
                        <p class="text-3xl font-bold text-white mt-1">{{ blogCount }}</p>
                    </div>
                    <div class="bg-[#2d2d2d] p-3 rounded-full">
                        <DocumentTextIcon class="h-6 w-6 text-[#6d28d9]" />
                    </div>
                </div>
                <div class="mt-4">
                    <router-link to="/admin/blog"
                        class="text-[#6d28d9] hover:text-[#8b5cf6] text-sm font-medium flex items-center">
                        Manage Posts
                        <ArrowRightIcon class="h-4 w-4 ml-1" />
                    </router-link>
                </div>
            </div>

            <!-- Stat Card 3: Current Date -->
            <div class="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-[#333] shadow-lg md:col-span-2 lg:col-span-1">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-gray-400 text-sm font-medium">Current Date</h2>
                        <p class="text-xl sm:text-2xl font-bold text-white mt-1">{{ currentDate }}</p>
                    </div>
                    <div class="bg-[#2d2d2d] p-3 rounded-full flex-shrink-0">
                        <CalendarIcon class="h-6 w-6 text-[#6d28d9]" />
                    </div>
                </div>
                <div class="mt-4 text-gray-400 text-sm">
                    Last login: {{ lastLoginDate }}
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-[#333] shadow-lg mb-6 sm:mb-8">
            <h2 class="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <router-link to="/admin/portfolio/create"
                    class="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#444] p-4 rounded-lg flex flex-col items-center justify-center text-center h-28 sm:h-32 transition-all">
                    <PlusIcon class="h-6 sm:h-8 w-6 sm:w-8 text-[#6d28d9] mb-2" />
                    <span class="text-white font-medium text-sm sm:text-base">Add Project</span>
                </router-link>

                <router-link to="/admin/blog/create"
                    class="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#444] p-4 rounded-lg flex flex-col items-center justify-center text-center h-28 sm:h-32 transition-all">
                    <PencilSquareIcon class="h-6 sm:h-8 w-6 sm:w-8 text-[#6d28d9] mb-2" />
                    <span class="text-white font-medium text-sm sm:text-base">Create Post</span>
                </router-link>

                <a href="/" target="_blank"
                    class="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#444] p-4 rounded-lg flex flex-col items-center justify-center text-center h-28 sm:h-32 transition-all">
                    <EyeIcon class="h-6 sm:h-8 w-6 sm:w-8 text-[#6d28d9] mb-2" />
                    <span class="text-white font-medium text-sm sm:text-base">View Website</span>
                </a>

                <button @click="reloadStats"
                    class="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#444] p-4 rounded-lg flex flex-col items-center justify-center text-center h-28 sm:h-32 transition-all">
                    <ArrowPathIcon class="h-6 sm:h-8 w-6 sm:w-8 text-[#6d28d9] mb-2" />
                    <span class="text-white font-medium text-sm sm:text-base">Refresh Stats</span>
                </button>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-[#333] shadow-lg">
            <h2 class="text-lg font-bold text-white mb-4">Recent Activity</h2>
            <div class="space-y-4">
                <div v-for="(activity, index) in recentActivity" :key="index"
                    class="bg-[#2d2d2d] border border-[#444] rounded-lg p-3 sm:p-4">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div class="w-10 h-10 rounded-full bg-[#6d28d9] flex items-center justify-center flex-shrink-0">
                            <ComputerDesktopIcon v-if="activity.type === 'portfolio'" class="h-5 w-5 text-white" />
                            <DocumentTextIcon v-else class="h-5 w-5 text-white" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-white font-medium truncate">{{ activity.title }}</h3>
                            <p class="text-gray-400 text-sm truncate">{{ activity.description }}</p>
                        </div>
                        <div class="text-gray-500 text-xs sm:text-sm flex-shrink-0 sm:ml-auto pt-1 sm:pt-0">{{
                            activity.time }}</div>
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
import {
    ComputerDesktopIcon,
    DocumentTextIcon,
    CalendarIcon,
    PlusIcon,
    PencilSquareIcon,
    EyeIcon,
    ArrowPathIcon,
    ArrowRightIcon
} from '@heroicons/vue/24/outline';

const portfolioStore = usePortfolioStore();
const blogStore = useBlogStore();

const portfolioCount = computed(() => portfolioStore.projects.length);
const blogCount = computed(() => blogStore.posts.length);

const currentDate = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

const lastLoginDate = ref('Today, ' + new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
}));

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

const reloadStats = () => {
    const now = new Date();
    lastLoginDate.value = 'Today, ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

onMounted(() => { });
</script>