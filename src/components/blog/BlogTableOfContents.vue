<template>
    <div>
        <!-- Mobile Table of Contents (collapsible) -->
        <div class="lg:hidden mb-8 bg-[#1e1e1e] rounded-xl border border-[#333] overflow-hidden">
            <button @click="toggleTOC"
                class="w-full flex items-center justify-between px-5 py-4 text-left text-white font-medium">
                <span class="flex items-center">
                    <ListBulletIcon class="w-4 h-4 mr-2 text-purple-400" />
                    Table of Contents
                </span>
                <ChevronDownIcon :class="['w-5 h-5 transition-transform', showTOC ? 'rotate-180' : '']" />
            </button>
            <div v-show="showTOC" class="px-5 pb-5 border-t border-[#333]">
                <ul class="space-y-2 text-sm pt-3">
                    <li v-for="(heading, index) in headings" :key="index">
                        <a :href="`#heading-${index}`" @click="showTOC = false"
                            class="text-gray-300 hover:text-purple-400 transition-colors flex items-start">
                            <span class="inline-block w-4 text-right mr-2 text-purple-500">{{ index + 1 }}.</span>
                            {{ heading }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Table of Contents (desktop) -->
        <div class="hidden lg:block sticky top-8 float-right ml-8 mb-8 w-64 bg-[#1e1e1e] rounded-xl p-5 shadow-lg">
            <h3 class="text-base font-bold text-white mb-3 flex items-center">
                <ListBulletIcon class="w-4 h-4 mr-2 text-purple-400" />
                Table of Contents
            </h3>
            <ul class="space-y-2 text-sm">
                <li v-for="(heading, index) in headings" :key="index">
                    <a :href="`#heading-${index}`"
                        class="text-gray-300 hover:text-purple-400 transition-colors flex items-start">
                        <span class="inline-block w-4 text-right mr-2 text-purple-500">{{ index + 1 }}.</span>
                        {{ heading }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { ListBulletIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';

const showTOC = ref(false);

defineProps({
    headings: {
        type: Array as PropType<string[]>,
        required: true
    }
});

const toggleTOC = () => {
    showTOC.value = !showTOC.value;
};
</script>
