<template>
    <div class="not-found container py-16 mx-auto text-center">
        <h1 class="text-6xl font-bold mb-4 animate-bounce text-gradient">404</h1>
        <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p class="text-lg mb-8">
                The page you are looking for doesn't exist or has been moved.
            </p>
        </div>
        <div class="flex justify-center mb-12">
            <router-link to="/"
                class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg">
                <HomeIcon class="h-5 w-5" />
                Back to Home
            </router-link>
        </div>
        <div class="mx-auto max-w-md flex items-center justify-center">
            <ExclamationCircleIcon class="h-48 w-48 text-fuchsia-500 animate-pulse" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { ExclamationCircleIcon, HomeIcon } from '@heroicons/vue/24/outline';

useHead({
    title: '404 - Page Not Found'
});
</script>

<style scoped>
.not-found {
    min-height: calc(100vh - 300px);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.text-gradient {
    background: linear-gradient(90deg, #6d28d9, #9333ea, #d946ef);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.6;
    }
}
</style>