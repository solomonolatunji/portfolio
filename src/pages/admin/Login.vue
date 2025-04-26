<template>
    <div class="min-h-screen flex items-center justify-center bg-[#121212] px-4">
        <div class="w-full max-w-md">
            <!-- Logo and Title -->
            <div class="text-center mb-10">
                <div class="flex justify-center mb-4">
                    <div
                        class="w-16 h-16 rounded-full bg-gradient-to-br from-[#6d28d9] to-[#9f7aea] flex items-center justify-center shadow-lg">
                        <UserCircleIcon class="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 class="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
                <p class="text-gray-400">Sign in to manage your website content</p>
            </div>

            <!-- Login Form -->
            <div class="bg-[#1e1e1e] rounded-xl p-8 shadow-xl border border-[#333]">
                <form @submit.prevent="handleLogin">
                    <div class="mb-6">
                        <label for="username" class="block text-gray-400 text-sm font-medium mb-2">Username</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <UserIcon class="h-5 w-5 text-gray-500" />
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
                                <LockClosedIcon class="h-5 w-5 text-gray-500" />
                            </div>
                            <input type="password" id="password" v-model="form.password"
                                class="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                                placeholder="Enter your password" required />
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                        :disabled="isLoading">
                        <SpinnerIcon v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
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
import { ref, reactive, h, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuthStore } from '@/stores/adminAuth';
import type { AdminCredentials } from '@/interfaces/auth';
import { UserIcon, UserCircleIcon, LockClosedIcon } from '@heroicons/vue/24/outline';
import { useToast } from 'vue-toastification';

const router = useRouter();
const adminStore = useAdminAuthStore();
const toast = useToast();

const form = reactive<AdminCredentials>({
    username: '',
    password: '',
});

const isLoading = ref(false);

const SpinnerIcon = defineComponent({
    setup() {
        return () => h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            class: 'animate-spin',
            fill: 'none',
            viewBox: '0 0 24 24'
        }, [
            h('circle', {
                class: 'opacity-25',
                cx: '12',
                cy: '12',
                r: '10',
                stroke: 'currentColor',
                'stroke-width': '4'
            }),
            h('path', {
                class: 'opacity-75',
                fill: 'currentColor',
                d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            })
        ]);
    }
});

const handleLogin = async () => {
    isLoading.value = true;

    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = adminStore.login(form.username, form.password);

        if (success) {
            toast.success('Login successful! Redirecting to dashboard...');
            router.push('/admin');
        } else {
            toast.error('Invalid username or password. Please try again.');
        }
    } catch (error) {
        toast.error('An error occurred. Please try again later.');
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>