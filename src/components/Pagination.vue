<template>
  <div v-if="totalPages > 1" class="mt-10 flex justify-center">
    <div class="flex items-center space-x-1">
      <!-- Previous Button -->
      <button
        @click="$emit('prev')"
        :disabled="currentPage === 1"
        :class="[
          'flex h-10 w-10 items-center justify-center rounded-full',
          currentPage === 1
            ? 'cursor-not-allowed bg-[#1e1e1e] text-gray-500'
            : 'bg-[#1e1e1e] text-white hover:bg-[#2d2d2d]',
        ]"
      >
        <ChevronLeftIcon class="h-5 w-5" />
      </button>

      <!-- Page Numbers -->
      <div class="flex space-x-1">
        <button
          v-for="page in displayedPages"
          :key="page"
          @click="$emit('goto', page)"
          :class="[
            'flex h-10 w-10 items-center justify-center rounded-full font-medium',
            page === currentPage
              ? 'bg-[#6d28d9] text-white'
              : 'bg-[#1e1e1e] text-white hover:bg-[#2d2d2d]',
          ]"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="$emit('next')"
        :disabled="currentPage === totalPages"
        :class="[
          'flex h-10 w-10 items-center justify-center rounded-full',
          currentPage === totalPages
            ? 'cursor-not-allowed bg-[#1e1e1e] text-gray-500'
            : 'bg-[#1e1e1e] text-white hover:bg-[#2d2d2d]',
        ]"
      >
        <ChevronRightIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

export default {
  name: "Pagination",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ["prev", "next", "goto"],
  computed: {
    displayedPages() {
      const pages = [];
      const totalToShow = 5;

      if (this.totalPages <= totalToShow) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        let startPage = Math.max(
          1,
          this.currentPage - Math.floor(totalToShow / 2),
        );
        let endPage = startPage + totalToShow - 1;

        if (endPage > this.totalPages) {
          endPage = this.totalPages;
          startPage = Math.max(1, endPage - totalToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }

      return pages;
    },
  },
};
</script>
