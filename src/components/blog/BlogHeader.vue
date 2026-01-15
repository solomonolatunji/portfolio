<template>
  <div v-if="post" class="mb-8 sm:mb-10">
    <div class="mb-4 flex flex-wrap items-center gap-2">
      <span class="rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
        {{ post.category }}
      </span>
      <span class="flex items-center text-xs text-gray-400">
        <ClockIcon class="mr-1 h-3.5 w-3.5" />
        {{ post.readTime || "5 min read" }}
      </span>
      <span class="flex items-center text-xs text-gray-400">
        <CalendarIcon class="mr-1 h-3.5 w-3.5" />
        {{ post.date }}
      </span>
    </div>
    <h1
      class="mb-6 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl"
    >
      {{ post.title }}
    </h1>
    <div class="flex items-center">
      <img
        :src="post.author.avatar"
        :alt="post.author.name"
        class="mr-4 h-12 w-12 rounded-full border-2 border-purple-600 sm:h-14 sm:w-14"
      />
      <div>
        <div class="text-sm font-medium text-white sm:text-base">
          {{ post.author.name }}
        </div>
        <div class="text-xs text-gray-400 sm:text-sm">Published on {{ post.date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClockIcon, CalendarIcon } from "@heroicons/vue/24/solid";
import type { PropType } from "vue";

interface Author {
  name: string;
  avatar: string;
}

interface Post {
  category: string;
  readTime?: string;
  date: string;
  title: string;
  author: Author;
}

defineProps({
  post: {
    type: Object as PropType<Post | null>,
    required: true,
  },
});
</script>
