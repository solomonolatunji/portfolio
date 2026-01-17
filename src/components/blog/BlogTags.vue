<template>
  <div v-if="tags && tags.length" class="mt-10 border-t border-[#333] pt-6 sm:mt-12">
    <h3 class="mb-4 flex items-center text-lg font-semibold text-white">
      <HashtagIcon class="mr-2 h-4 w-4 text-purple-400" />
      Tags
    </h3>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="flex items-center rounded-md bg-[#1e1e1e] px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-purple-900/20"
      >
        <span class="mr-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></span>
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HashtagIcon } from "@heroicons/vue/24/solid";
import type { PropType } from "vue";

defineProps({
  tags: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
</script>
