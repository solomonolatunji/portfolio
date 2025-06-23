<template>
  <div class="not-found container mx-auto py-16 text-center">
    <h1 class="text-gradient mb-4 animate-bounce text-6xl font-bold">404</h1>
    <div class="mb-8">
      <h2 class="mb-4 text-2xl font-semibold">Page Not Found</h2>
      <p class="mb-8 text-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>
    </div>
    <div class="mb-12 flex justify-center">
      <router-link
        to="/"
        class="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-lg transition-colors hover:bg-indigo-700"
      >
        <HomeIcon class="h-5 w-5" />
        Back to Home
      </router-link>
    </div>
    <div class="mx-auto flex max-w-md items-center justify-center">
      <ExclamationCircleIcon class="h-48 w-48 animate-pulse text-fuchsia-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { ExclamationCircleIcon, HomeIcon } from "@heroicons/vue/24/outline";

useHead({
  title: "404 - Page Not Found",
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
