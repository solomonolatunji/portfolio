<template>
    <div class="min-h-screen flex bg-[#121212]">
        <!-- Mobile Sidebar Toggle Button -->
        <button v-if="!sidebarOpen" @click="sidebarOpen = !sidebarOpen"
            class="fixed top-4 left-4 z-30 lg:hidden p-2 rounded-md bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6d28d9]">
            <Bars3Icon class="h-6 w-6" />
        </button>

        <!-- Sidebar -->
        <div
            :class="['w-64 bg-[#1e1e1e] border-r border-[#333] fixed h-full shadow-lg z-20 transition-transform duration-300 ease-in-out', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
            <div class="flex items-center justify-start lg:justify-center h-16 border-b border-[#333] pl-4 lg:pl-0">
                <h1 class="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div class="px-4 py-6">
                <nav>
                    <div class="space-y-1">
                        <router-link to="/admin" exact-active-class="bg-[#6d28d9] text-white"
                            class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors"
                            @click="sidebarOpen = false">
                            <HomeIcon class="h-5 w-5 mr-3" />
                            Dashboard
                        </router-link>
                        <router-link to="/admin/portfolio" active-class="bg-[#6d28d9] text-white"
                            class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors"
                            @click="sidebarOpen = false">
                            <ComputerDesktopIcon class="h-5 w-5 mr-3" />
                            Portfolio
                        </router-link>
                        <router-link to="/admin/blog" active-class="bg-[#6d28d9] text-white"
                            class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors"
                            @click="sidebarOpen = false">
                            <DocumentTextIcon class="h-5 w-5 mr-3" />
                            Blog
                        </router-link>
                    </div>

                    <div class="mt-10 pt-6 border-t border-[#333]">
                        <a @click.prevent="showSignOutModal = true; sidebarOpen = false" href="#"
                            class="flex items-center px-4 py-3 text-red-500 rounded-lg hover:bg-[#2d2d2d] transition-colors hover:text-red-400">
                            <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3" />
                            Sign Out
                        </a>
                        <router-link to="/"
                            class="mt-2 flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-colors hover:text-white"
                            @click="sidebarOpen = false">
                            <GlobeAltIcon class="h-5 w-5 mr-3" />
                            View Website
                        </router-link>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Sidebar Overlay for Mobile -->
        <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/50 z-10 lg:hidden"></div>

        <!-- Main Content -->
        <div class="lg:ml-64 w-full transition-all duration-300 ease-in-out flex flex-col">
            <!-- Top bar -->
            <div
                class="sticky top-0 z-10 h-16 bg-[#1e1e1e] border-b border-[#333] px-6 flex items-center justify-between flex-shrink-0">
                <h1 class="text-lg font-medium text-white lg:pl-0 pl-12">{{ currentPageTitle }}</h1>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-400 hidden sm:inline">{{ currentDate }}</span>
                    <div class="w-8 h-8 bg-[#6d28d9] rounded-full flex items-center justify-center">
                        <span class="text-white font-medium">{{ userInitial }}</span>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="p-4 sm:p-6 flex-grow">
                <router-view />
            </div>
        </div>

        <!-- Sign Out Confirmation Modal -->
        <SignOutConfirmationModal v-model="showSignOutModal" @confirm="logoutAdmin" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAdminAuthStore } from '@/stores/adminAuth';
import { useRoute, useRouter } from 'vue-router';
import {
    HomeIcon,
    ComputerDesktopIcon,
    DocumentTextIcon,
    ArrowRightOnRectangleIcon,
    GlobeAltIcon,
    Bars3Icon // Import Bars3Icon
} from '@heroicons/vue/24/outline';
import SignOutConfirmationModal from '@/components/admin/SignOutConfirmationModal.vue';

const adminStore = useAdminAuthStore();
const router = useRouter();
const route = useRoute();
const showSignOutModal = ref(false);
const sidebarOpen = ref(false);

onMounted(() => {
    adminStore.initializeFromStorage();

    if (!adminStore.isAuthenticated) {
        router.push('/admin/login');
    }
});

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