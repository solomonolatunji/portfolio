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
                            <HomeIcon class="h-5 w-5 mr-3" />
                            Dashboard
                        </router-link>
                        <router-link to="/admin/portfolio" active-class="bg-[#6d28d9] text-white"
                            class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors">
                            <ComputerDesktopIcon class="h-5 w-5 mr-3" />
                            Portfolio
                        </router-link>
                        <router-link to="/admin/blog" active-class="bg-[#6d28d9] text-white"
                            class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors">
                            <DocumentTextIcon class="h-5 w-5 mr-3" />
                            Blog
                        </router-link>
                    </div>

                    <div class="mt-10 pt-6 border-t border-[#333]">
                        <a @click.prevent="confirmLogout" href="#"
                            class="flex items-center px-4 py-3 text-red-500 rounded-lg hover:bg-[#2d2d2d] transition-colors hover:text-red-400">
                            <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3" />
                            Sign Out
                        </a>
                        <router-link to="/"
                            class="mt-2 flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors hover:text-white">
                            <GlobeAltIcon class="h-5 w-5 mr-3" />
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
import {
    HomeIcon,
    ComputerDesktopIcon,
    DocumentTextIcon,
    ArrowRightOnRectangleIcon,
    GlobeAltIcon
} from '@heroicons/vue/24/outline';

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

// Confirm Logout function
const confirmLogout = () => {
    if (confirm('Are you sure you want to sign out?')) {
        logoutAdmin();
    }
};
</script>