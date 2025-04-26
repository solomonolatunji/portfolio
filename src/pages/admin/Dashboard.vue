<template>
    <div class="min-h-screen flex bg-[#121212]">
        <!-- Sidebar -->
        <div class="w-64 bg-[#1e1e1e] border-r border-[#333] fixed h-full shadow-lg z-10">
            <div class="flex items-center justify-center h-16 border-b border-[#333]">
                <h1 class="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div class="px-4 py-6">
                <nav>
                    <div class="space-y-1">
                        <router-link to="/admin" exact-active-class="bg-[#6d28d9] text-white"
                            class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Dashboard
                        </router-link>
                        <router-link to="/admin/portfolio" active-class="bg-[#6d28d9] text-white"
                            class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                                    clip-rule="evenodd" />
                            </svg>
                            Portfolio
                        </router-link>
                        <router-link to="/admin/blog" active-class="bg-[#6d28d9] text-white"
                            class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                    clip-rule="evenodd" />
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                            </svg>
                            Blog
                        </router-link>
                    </div>

                    <div class="mt-10 pt-6 border-t border-[#333]">
                        <a @click.prevent="logoutAdmin" href="#"
                            class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                    clip-rule="evenodd" />
                            </svg>
                            Sign Out
                        </a>
                        <router-link to="/"
                            class="mt-2 flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            View Website
                        </router-link>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Main Content -->
        <div class="ml-64 w-full">
            <!-- Top bar -->
            <div class="h-16 bg-[#1e1e1e] border-b border-[#333] px-6 flex items-center justify-between">
                <h1 class="text-lg font-medium text-white">{{ currentPageTitle }}</h1>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-400">{{ currentDate }}</span>
                    <div class="w-8 h-8 bg-[#6d28d9] rounded-full flex items-center justify-center">
                        <span class="text-white font-medium">{{ userInitial }}</span>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="p-6">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAdminAuthStore } from '@/stores/adminAuth';
import { useRoute, useRouter } from 'vue-router';

const adminStore = useAdminAuthStore();
const router = useRouter();
const route = useRoute();

// Initialize auth from session storage
onMounted(() => {
    adminStore.initializeFromStorage();

    // Redirect to login if not authenticated
    if (!adminStore.isAuthenticated) {
        router.push('/admin/login');
    }
});

// Get the first letter of the username for the avatar
const userInitial = computed(() => {
    return adminStore.user?.username.charAt(0).toUpperCase() || 'A';
});

// Current date
const currentDate = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Get the current page title based on the route
const currentPageTitle = computed(() => {
    const path = route.path;
    if (path === '/admin') return 'Dashboard Overview';
    if (path === '/admin/portfolio') return 'Portfolio Management';
    if (path.includes('/admin/portfolio/create')) return 'Create Project';
    if (path.includes('/admin/portfolio/edit')) return 'Edit Project';
    if (path === '/admin/blog') return 'Blog Management';
    if (path.includes('/admin/blog/create')) return 'Create Blog Post';
    if (path.includes('/admin/blog/edit')) return 'Edit Blog Post';
    return 'Admin Dashboard';
});

// Logout function
const logoutAdmin = () => {
    adminStore.logout();
    router.push('/admin/login');
};
</script>