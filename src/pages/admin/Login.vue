<template>
    <div class="min-h-screen flex items-center justify-center bg-[#121212] px-4">
        <div class="w-full max-w-md">
            <!-- Logo and Title -->
            <div class="text-center mb-10">
                <div class="flex justify-center mb-4">
                    <div
                        class="w-16 h-16 rounded-full bg-gradient-to-br from-[#6d28d9] to-[#9f7aea] flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.526-.077-1.034-.202-1.516A5.001 5.001 0 0010 11z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <h2 class="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
                <p class="text-gray-400">Sign in to manage your website content</p>
            </div>

            <!-- Login Form -->
            <div class="bg-[#1e1e1e] rounded-xl p-8 shadow-xl border border-[#333]">
                <div v-if="loginError" class="bg-red-900/30 text-red-300 border border-red-900 rounded-lg p-4 mb-6">
                    <p>{{ loginError }}</p>
                </div>

                <form @submit.prevent="handleLogin">
                    <div class="mb-6">
                        <label for="username" class="block text-gray-400 text-sm font-medium mb-2">Username</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="username" v-model="form.username"
                                class="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                                placeholder="Enter your username" required />
                        </div>
                    </div>

                    <div class="mb-8">
                        <label for="password" class="block text-gray-400 text-sm font-medium mb-2">Password</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="password" id="password" v-model="form.password"
                                class="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                                placeholder="Enter your password" required />
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                        :disabled="isLoading">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span>{{ isLoading ? 'Signing in...' : 'Sign in' }}</span>
                    </button>
                </form>
            </div>

            <!-- Back to home -->
            <div class="mt-8 text-center">
                <router-link to="/" class="text-[#6d28d9] hover:text-[#8b5cf6] text-sm font-medium">
                    &larr; Back to website
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuthStore } from '@/stores/adminAuth';

const router = useRouter();
const adminStore = useAdminAuthStore();

const form = reactive({
    username: '',
    password: '',
});

const isLoading = ref(false);
const loginError = ref('');

const handleLogin = async () => {
    isLoading.value = true;
    loginError.value = '';

    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = adminStore.login(form.username, form.password);

        if (success) {
            router.push('/admin');
        } else {
            loginError.value = 'Invalid username or password. Please try again.';
        }
    } catch (error) {
        loginError.value = 'An error occurred. Please try again later.';
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>