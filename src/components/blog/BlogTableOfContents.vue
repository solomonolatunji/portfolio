<template>
  <div>
    <!-- Mobile Table of Contents (collapsible) -->
    <div class="mb-8 overflow-hidden rounded-xl border border-[#333] bg-[#1e1e1e] lg:hidden">
      <button
        @click="toggleTOC"
        class="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-white"
      >
        <span class="flex items-center">
          <ListBulletIcon class="mr-2 h-4 w-4 text-purple-400" />
          Table of Contents
        </span>
        <ChevronDownIcon :class="['h-5 w-5 transition-transform', showTOC ? 'rotate-180' : '']" />
      </button>
      <div v-show="showTOC" class="border-t border-[#333] px-5 pb-5">
        <ul class="space-y-2 pt-3 text-sm">
          <li v-for="(heading, index) in headings" :key="index">
            <a
              :href="`#heading-${index}`"
              @click="showTOC = false"
              class="flex items-start text-gray-300 transition-colors hover:text-purple-400"
            >
              <span class="mr-2 inline-block w-4 text-right text-purple-500">{{ index + 1 }}.</span>
              {{ heading }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Table of Contents (desktop) -->
    <div
      class="sticky top-8 float-right mb-8 ml-8 hidden w-64 rounded-xl bg-[#1e1e1e] p-5 shadow-lg lg:block"
    >
      <h3 class="mb-3 flex items-center text-base font-bold text-white">
        <ListBulletIcon class="mr-2 h-4 w-4 text-purple-400" />
        Table of Contents
      </h3>
      <ul class="space-y-2 text-sm">
        <li v-for="(heading, index) in headings" :key="index">
          <a
            :href="`#heading-${index}`"
            class="flex items-start text-gray-300 transition-colors hover:text-purple-400"
          >
            <span class="mr-2 inline-block w-4 text-right text-purple-500">{{ index + 1 }}.</span>
            {{ heading }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { ListBulletIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";

const showTOC = ref(false);

defineProps({
  headings: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const toggleTOC = () => {
  showTOC.value = !showTOC.value;
};
</script>
