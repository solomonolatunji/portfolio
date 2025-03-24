<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1 class="text-3xl font-bold text-center mb-6">{{ msg }}</h1>

  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <button type="button" @click="count++"
      class="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      count is {{ count }}
    </button>
    <p class="mb-4 text-gray-700">
      Edit
      <code class="bg-gray-100 px-1 py-0.5 rounded">components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p class="mt-6 text-center text-gray-600">
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="text-blue-500 hover:underline">
      create-vue
    </a>, the official Vue + Vite starter
  </p>
  <p class="mt-2 text-center text-gray-600">
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank"
      class="text-blue-500 hover:underline">
      Vue Docs Scaling up Guide
    </a>.
  </p>
  <p class="mt-8 text-center text-gray-500">Click on the Vite and Vue logos to learn more</p>
</template>
