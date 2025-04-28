<template>
    <div class="min-h-screen flex bg-[#121212]">
        <!-- Mobile Sidebar Toggle Button -->
        <button v-if="!sidebarOpen" @click="sidebarOpen = !sidebarOpen"
            class="fixed top-4 left-4 z-30 lg:hidden p-2 rounded-md bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6d28d9]">
            <Bars3Icon class="h-6 w-6" />
        </button>

        <!-- Sidebar -->
        <div
            :class="['w-64 bg-gradient-to-b from-[#1a1a1a] to-[#232323] border-r border-[#333] fixed h-full shadow-xl z-20 transition-all duration-300 ease-in-out', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
            <!-- Dashboard Header -->
            <div class="flex items-center justify-between h-16 border-b border-[#333] px-4">
                <h1 class="text-xl font-bold text-white">Admin Panel</h1>
                <button v-if="sidebarOpen" @click="sidebarOpen = false"
                    class="lg:hidden text-gray-400 hover:text-white">
                    <XMarkIcon class="h-6 w-6" />
                </button>
            </div>

            <!-- User Profile Card -->
            <div class="px-4 py-5 border-b border-[#333]">
                <div class="flex items-center space-x-3">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] rounded-full flex items-center justify-center">
                        <span class="text-white font-medium text-lg">{{ userInitial }}</span>
                    </div>
                    <div>
                        <div class="font-medium text-white">{{ adminStore.user?.name }}</div>
                        <div class="text-xs text-gray-400">{{ adminStore.user?.email }}</div>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <div class="px-4 py-4">
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Main</p>
                <nav class="space-y-1">
                    <router-link to="/admin"
                        exact-active-class="bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white"
                        class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-all"
                        @click="sidebarOpen = false">
                        <HomeIcon class="h-5 w-5 mr-3" />
                        Dashboard
                    </router-link>
                    <router-link to="/admin/portfolio"
                        active-class="bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white"
                        class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-all"
                        @click="sidebarOpen = false">
                        <ComputerDesktopIcon class="h-5 w-5 mr-3" />
                        Portfolio
                    </router-link>
                    <router-link to="/admin/blog" active-class="bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white"
                        class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-all"
                        @click="sidebarOpen = false">
                        <DocumentTextIcon class="h-5 w-5 mr-3" />
                        Blog
                    </router-link>
                    <router-link to="/admin/contact"
                        active-class="bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white"
                        class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-all"
                        @click="sidebarOpen = false">
                        <EnvelopeIcon class="h-5 w-5 mr-3" />
                        Contact
                    </router-link>
                </nav>

                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8 mb-3">System</p>
                <nav class="space-y-1">
                    <router-link to="/admin/settings"
                        active-class="bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white"
                        class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-all"
                        @click="sidebarOpen = false">
                        <Cog6ToothIcon class="h-5 w-5 mr-3" />
                        Settings
                    </router-link>

                    <router-link to="/"
                        class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2d2d2d] transition-all"
                        @click="sidebarOpen = false">
                        <GlobeAltIcon class="h-5 w-5 mr-3" />
                        View Website
                    </router-link>

                    <a @click.prevent="showSignOutModal = true; sidebarOpen = false" href="#"
                        class="flex items-center px-4 py-3 text-red-400 rounded-lg hover:bg-[#2d2d2d] transition-all hover:text-red-300">
                        <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3" />
                        Sign Out
                    </a>
                </nav>
            </div>
        </div>

        <!-- Sidebar Overlay for Mobile -->
        <div v-if="sidebarOpen" @click="sidebarOpen = false"
            class="fixed inset-0 bg-black/50 z-10 lg:hidden backdrop-blur-sm"></div>

        <!-- Main Content -->
        <div class="lg:ml-64 w-full transition-all duration-300 ease-in-out flex flex-col">
            <!-- Top bar -->
            <div
                class="sticky top-0 z-10 h-16 bg-[#1e1e1e]/80 backdrop-blur-md border-b border-[#333] px-6 flex items-center justify-between flex-shrink-0">
                <div class="flex items-center">
                    <h1 class="text-lg font-medium text-white lg:pl-0 pl-12">{{ currentPageTitle }}</h1>
                    <span class="ml-3 px-3 py-1 bg-[#333] text-xs font-medium rounded-full text-gray-300">{{ pageSection
                    }}</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-400 hidden sm:inline">{{ currentDate }}</span>
                    <button class="relative p-2 text-gray-400 hover:text-white">
                        <BellIcon class="h-5 w-5" />
                        <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div
                        class="w-8 h-8 bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] rounded-full flex items-center justify-center">
                        <span class="text-white font-medium">{{ userInitial }}</span>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="p-4 sm:p-6 md:p-8 flex-grow bg-[#121212]">
                <transition name="fade" mode="out-in">
                    <router-view />
                </transition>
            </div>

            <!-- Footer -->
            <div class="bg-[#1a1a1a] text-gray-400 text-xs px-6 py-4 border-t border-[#333]">
                <div class="flex flex-col sm:flex-row justify-between items-center">
                    <div>© {{ new Date().getFullYear() }} Portfolio Admin. All rights reserved.</div>
                    <div class="mt-2 sm:mt-0">Version 1.0.0</div>
                </div>
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
    Bars3Icon,
    XMarkIcon,
    BellIcon,
    EnvelopeIcon,
    Cog6ToothIcon
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
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && sidebarOpen.value) {
            sidebarOpen.value = false;
        }
    });
});

const userInitial = computed(() => {
    return adminStore.user?.name?.charAt(0).toUpperCase() || 'A';
});

const currentDate = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
});

const currentPageTitle = computed(() => {
    const path = route.path;
    if (path === '/admin') return 'Dashboard';
    if (path === '/admin/portfolio') return 'Portfolio';
    if (path.includes('/admin/portfolio/create')) return 'Create Project';
    if (path.includes('/admin/portfolio/edit')) return 'Edit Project';
    if (path === '/admin/blog') return 'Blog';
    if (path.includes('/admin/blog/create')) return 'Create Blog Post';
    if (path.includes('/admin/blog/edit')) return 'Edit Blog Post';
    if (path === '/admin/contact') return 'Contact';
    if (path === '/admin/settings') return 'Settings';
    return 'Admin Dashboard';
});

const pageSection = computed(() => {
    const path = route.path;
    if (path.includes('/admin/portfolio')) return 'Portfolio';
    if (path.includes('/admin/blog')) return 'Blog';
    if (path.includes('/admin/contact')) return 'Contact';
    if (path.includes('/admin/settings')) return 'Settings';
    return 'Dashboard';
});

const logoutAdmin = () => {
    adminStore.logout();
    router.push('/admin/login');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>