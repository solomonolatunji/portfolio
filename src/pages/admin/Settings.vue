<template>
    <div class="space-y-8">
        <div>
            <h2 class="text-2xl font-bold text-white">Settings</h2>
            <p class="text-gray-400 mt-1">Manage your website and account preferences.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column: Navigation -->
            <div class="lg:col-span-1">
                <div class="bg-[#1e1e1e] border border-[#333] rounded-lg overflow-hidden">
                    <div class="p-4 border-b border-[#333]">
                        <h3 class="text-lg font-medium text-white">Settings</h3>
                    </div>
                    <div class="p-1">
                        <nav>
                            <button v-for="(section, index) in settingSections" :key="index"
                                @click="activeSection = index" :class="[
                                    'w-full text-left px-4 py-3 flex items-center rounded-md',
                                    activeSection === index
                                        ? 'bg-[#6d28d9] text-white'
                                        : 'text-gray-300 hover:bg-[#2d2d2d]'
                                ]">
                                <component :is="section.icon" class="h-5 w-5 mr-3" />
                                {{ section.name }}
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            <!-- Right Column: Settings Content -->
            <div class="lg:col-span-2">
                <!-- Account Settings -->
                <div v-if="activeSection === 0" class="bg-[#1e1e1e] border border-[#333] rounded-lg overflow-hidden">
                    <div class="p-4 border-b border-[#333] flex items-center justify-between">
                        <h3 class="text-lg font-medium text-white">Account Settings</h3>
                        <span class="px-2 py-1 text-xs bg-[#6d28d9] rounded-full text-white">Admin</span>
                    </div>
                    <div class="p-6 space-y-6">
                        <!-- Profile Section -->
                        <div>
                            <h4 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Profile</h4>
                            <div class="flex items-center space-x-4">
                                <div
                                    class="w-16 h-16 bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] rounded-full flex items-center justify-center">
                                    <span class="text-white text-2xl font-medium">{{ userInitial }}</span>
                                </div>
                                <div>
                                    <div class="flex space-x-3">
                                        <button class="px-3 py-1 text-sm bg-[#333] hover:bg-[#444] text-white rounded">
                                            Change Avatar
                                        </button>
                                        <button class="px-3 py-1 text-sm bg-[#333] hover:bg-[#444] text-white rounded">
                                            Remove
                                        </button>
                                    </div>
                                    <p class="text-xs text-gray-400 mt-2">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label for="username"
                                        class="block text-sm font-medium text-gray-400 mb-1">Username</label>
                                    <input type="text" id="username" v-model="userSettings.username"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]" />
                                </div>
                                <div>
                                    <label for="email"
                                        class="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <input type="email" id="email" v-model="userSettings.email"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]" />
                                </div>
                                <div>
                                    <label for="firstname" class="block text-sm font-medium text-gray-400 mb-1">First
                                        Name</label>
                                    <input type="text" id="firstname" v-model="userSettings.firstName"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]" />
                                </div>
                                <div>
                                    <label for="lastname" class="block text-sm font-medium text-gray-400 mb-1">Last
                                        Name</label>
                                    <input type="text" id="lastname" v-model="userSettings.lastName"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]" />
                                </div>
                            </div>
                        </div>

                        <!-- Password Section -->
                        <div class="pt-6 border-t border-[#333]">
                            <h4 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Password</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="current-password"
                                        class="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                                    <input type="password" id="current-password" v-model="passwordForm.current"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]" />
                                </div>
                                <div class="md:col-span-2 h-4"></div>
                                <div>
                                    <label for="new-password" class="block text-sm font-medium text-gray-400 mb-1">New
                                        Password</label>
                                    <input type="password" id="new-password" v-model="passwordForm.new"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]" />
                                </div>
                                <div>
                                    <label for="confirm-password"
                                        class="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                                    <input type="password" id="confirm-password" v-model="passwordForm.confirm"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]" />
                                </div>
                            </div>
                        </div>

                        <!-- Save Button -->
                        <div class="flex justify-end pt-6 border-t border-[#333]">
                            <button @click="saveAccountSettings"
                                class="px-6 py-2 bg-[#6d28d9] text-white rounded-md hover:bg-[#5b21b6] focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:ring-opacity-50 transition duration-200">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Website Settings -->
                <div v-if="activeSection === 1" class="bg-[#1e1e1e] border border-[#333] rounded-lg overflow-hidden">
                    <div class="p-4 border-b border-[#333]">
                        <h3 class="text-lg font-medium text-white">Website Settings</h3>
                    </div>
                    <div class="p-6 space-y-6">
                        <!-- General Website Settings -->
                        <div>
                            <h4 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">General Settings
                            </h4>
                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <label for="website-title"
                                        class="block text-sm font-medium text-gray-400 mb-1">Website Title</label>
                                    <input type="text" id="website-title" v-model="websiteSettings.title"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]" />
                                </div>
                                <div>
                                    <label for="website-description"
                                        class="block text-sm font-medium text-gray-400 mb-1">Meta Description</label>
                                    <textarea id="website-description" v-model="websiteSettings.description" rows="3"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]"></textarea>
                                    <p class="text-xs text-gray-400 mt-1">Used for SEO. Maximum 160 characters
                                        recommended.</p>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <input type="checkbox" id="maintenance-mode"
                                        v-model="websiteSettings.maintenanceMode"
                                        class="rounded text-[#6d28d9] focus:ring-[#6d28d9] focus:ring-opacity-50 bg-[#333] border-[#444]" />
                                    <label for="maintenance-mode" class="text-sm font-medium text-white">Enable
                                        Maintenance Mode</label>
                                </div>
                            </div>
                        </div>

                        <!-- Social Media Links -->
                        <div class="pt-6 border-t border-[#333]">
                            <h4 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Social Media
                                Links</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-400 mb-1">Twitter/X</label>
                                    <div class="flex">
                                        <span
                                            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#333] bg-[#333] text-gray-400">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                                </path>
                                            </svg>
                                        </span>
                                        <input type="text" v-model="websiteSettings.social.twitter"
                                            class="bg-[#262626] border border-[#333] rounded-r-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]"
                                            placeholder="username" />
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-400 mb-1">GitHub</label>
                                    <div class="flex">
                                        <span
                                            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#333] bg-[#333] text-gray-400">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.271.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.92.678 1.852 0 1.337-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z">
                                                </path>
                                            </svg>
                                        </span>
                                        <input type="text" v-model="websiteSettings.social.github"
                                            class="bg-[#262626] border border-[#333] rounded-r-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]"
                                            placeholder="username" />
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-400 mb-1">LinkedIn</label>
                                    <div class="flex">
                                        <span
                                            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#333] bg-[#333] text-gray-400">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z">
                                                </path>
                                            </svg>
                                        </span>
                                        <input type="text" v-model="websiteSettings.social.linkedin"
                                            class="bg-[#262626] border border-[#333] rounded-r-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]"
                                            placeholder="username" />
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-400 mb-1">Instagram</label>
                                    <div class="flex">
                                        <span
                                            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#333] bg-[#333] text-gray-400">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z">
                                                </path>
                                            </svg>
                                        </span>
                                        <input type="text" v-model="websiteSettings.social.instagram"
                                            class="bg-[#262626] border border-[#333] rounded-r-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]"
                                            placeholder="username" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Save Button -->
                        <div class="flex justify-end pt-6 border-t border-[#333]">
                            <button @click="saveWebsiteSettings"
                                class="px-6 py-2 bg-[#6d28d9] text-white rounded-md hover:bg-[#5b21b6] focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:ring-opacity-50 transition duration-200">
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Advanced Settings -->
                <div v-if="activeSection === 2" class="space-y-4">
                    <!-- Analytics Settings -->
                    <div class="bg-[#1e1e1e] border border-[#333] rounded-lg overflow-hidden">
                        <div class="p-4 border-b border-[#333]">
                            <h3 class="text-lg font-medium text-white">Analytics Settings</h3>
                        </div>
                        <div class="p-6">
                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <label for="ga-id" class="block text-sm font-medium text-gray-400 mb-1">Google
                                        Analytics Tracking ID</label>
                                    <input type="text" id="ga-id" v-model="advancedSettings.googleAnalyticsId"
                                        placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                                        class="bg-[#262626] border border-[#333] rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-[#6d28d9]" />
                                </div>
                                <div class="flex items-center space-x-2">
                                    <input type="checkbox" id="enable-analytics"
                                        v-model="advancedSettings.enableAnalytics"
                                        class="rounded text-[#6d28d9] focus:ring-[#6d28d9] focus:ring-opacity-50 bg-[#333] border-[#444]" />
                                    <label for="enable-analytics" class="text-sm font-medium text-white">Enable
                                        Analytics Tracking</label>
                                </div>
                            </div>
                            <div class="flex justify-end mt-4">
                                <button @click="saveAnalyticsSettings"
                                    class="px-6 py-2 bg-[#6d28d9] text-white rounded-md hover:bg-[#5b21b6] focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:ring-opacity-50 transition duration-200">
                                    Save Analytics Settings
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Danger Zone -->
                    <div class="bg-[#1e1e1e] border border-red-900/30 rounded-lg overflow-hidden">
                        <div class="p-4 border-b border-red-900/30 bg-red-900/10">
                            <h3 class="text-lg font-medium text-red-400">Danger Zone</h3>
                        </div>
                        <div class="p-6">
                            <div class="grid grid-cols-1 gap-6">
                                <div>
                                    <h4 class="text-sm font-medium text-white mb-2">Clear Application Cache</h4>
                                    <p class="text-sm text-gray-400 mb-3">This will clear all cached data in your
                                        application. This action cannot be undone.</p>
                                    <button @click="clearCache"
                                        class="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-opacity-50 transition-colors">
                                        Clear Cache
                                    </button>
                                </div>
                                <div class="pt-4 border-t border-[#333]">
                                    <h4 class="text-sm font-medium text-red-400 mb-2">Reset All Settings</h4>
                                    <p class="text-sm text-gray-400 mb-3">This will reset all settings to their default
                                        values. This action cannot be undone.</p>
                                    <button @click="showResetConfirmation = true"
                                        class="px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/30 rounded-md hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors">
                                        Reset All Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reset Confirmation Modal -->
        <div v-if="showResetConfirmation"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="bg-[#1e1e1e] border border-[#333] rounded-lg max-w-md w-full mx-4">
                <div class="p-4 border-b border-[#333] flex justify-between items-center">
                    <h3 class="text-lg font-medium text-red-400">Confirm Reset</h3>
                    <button @click="showResetConfirmation = false" class="text-gray-400 hover:text-white">
                        <XMarkIcon class="w-5 h-5" />
                    </button>
                </div>
                <div class="p-6">
                    <div class="flex items-center mb-4">
                        <ExclamationTriangleIcon class="w-8 h-8 text-red-400 mr-3" />
                        <p class="text-white">Are you sure you want to reset all settings to their default values? This
                            action cannot be undone.</p>
                    </div>
                    <div class="flex justify-end gap-2 mt-6">
                        <button @click="showResetConfirmation = false"
                            class="px-4 py-2 bg-[#333] text-white rounded hover:bg-[#444] focus:outline-none">
                            Cancel
                        </button>
                        <button @click="resetAllSettings"
                            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                            Yes, Reset All
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Toast Notification -->
        <div v-if="showToast"
            class="fixed bottom-4 right-4 bg-[#6d28d9] text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-up">
            <CheckCircleIcon class="w-5 h-5 mr-2" />
            <span>{{ toastMessage }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import {
    UserIcon,
    GlobeAltIcon,
    CogIcon,
    CheckCircleIcon,
    XMarkIcon,
    ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

const activeSection = ref(0);
const showResetConfirmation = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
let toastTimer: number | null = null;

// Setting sections with icons
const settingSections = [
    { name: 'Account', icon: UserIcon },
    { name: 'Website', icon: GlobeAltIcon },
    { name: 'Advanced', icon: CogIcon }
];

// User Settings
const userSettings = ref({
    username: 'admin',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User'
});

// Password Form
const passwordForm = ref({
    current: '',
    new: '',
    confirm: ''
});

// Website Settings
const websiteSettings = ref({
    title: 'My Portfolio',
    description: 'Professional portfolio website showcasing my projects and skills in web development, design, and more.',
    maintenanceMode: false,
    social: {
        twitter: 'myusername',
        github: 'myusername',
        linkedin: 'myusername',
        instagram: 'myusername'
    }
});

// Advanced Settings
const advancedSettings = ref({
    googleAnalyticsId: 'G-XXXXXXXXXX',
    enableAnalytics: true,
    apiKey: 'sk_portfolio_28f5c8e7d6a940b8a5d2e9f14c238675',
    enableApi: true
});

const userInitial = computed(() => {
    return userSettings.value.firstName.charAt(0).toUpperCase();
});

// Methods
const saveAccountSettings = () => {
    showToastMessage('Account settings saved successfully!');
};

const saveWebsiteSettings = () => {
    showToastMessage('Website settings saved successfully!');
};

const saveAnalyticsSettings = () => {
    showToastMessage('Analytics settings saved successfully!');
};

const clearCache = () => {
    showToastMessage('Application cache cleared successfully!');
};

const resetAllSettings = () => {
    userSettings.value = {
        username: 'admin',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User'
    };

    websiteSettings.value = {
        title: 'My Portfolio',
        description: 'Professional portfolio website showcasing my projects and skills in web development, design, and more.',
        maintenanceMode: false,
        social: {
            twitter: '',
            github: '',
            linkedin: '',
            instagram: ''
        }
    };

    advancedSettings.value = {
        googleAnalyticsId: '',
        enableAnalytics: false,
        apiKey: 'sk_portfolio_' + generateRandomString(32),
        enableApi: false
    };

    showResetConfirmation.value = false;
    showToastMessage('All settings have been reset to defaults!');
};

const showToastMessage = (message: string) => {
    toastMessage.value = message;
    showToast.value = true;

    if (toastTimer) {
        clearTimeout(toastTimer);
    }

    toastTimer = window.setTimeout(() => {
        showToast.value = false;
    }, 3000);
};

const generateRandomString = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

onMounted(() => {
    document.title = "Settings | Admin Dashboard";
});

onBeforeUnmount(() => {
    if (toastTimer) {
        clearTimeout(toastTimer);
    }
});
</script>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>