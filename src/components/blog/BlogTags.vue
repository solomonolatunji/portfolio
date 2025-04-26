<template>
    <div class="mt-10 sm:mt-12 pt-6 border-t border-[#333]">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <HashtagIcon class="w-4 h-4 mr-2 text-purple-400" />
            Tags
        </h3>
        <div class="flex flex-wrap gap-2">
            <span v-for="(tag, index) in tags" :key="index"
                class="bg-[#1e1e1e] text-gray-300 hover:bg-purple-900/20 px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center">
                <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5"></span>
                {{ tag }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HashtagIcon } from '@heroicons/vue/24/solid';
import type { PropType } from 'vue';

defineProps({
    tags: {
        type: Array as PropType<string[]>,
        required: true
    }
});
</script>
