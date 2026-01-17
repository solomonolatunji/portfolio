<template>
  <div class="mb-12">
    <h2 class="mb-6 flex items-center text-xl font-bold text-white md:text-2xl">
      <span class="mr-3 h-1 w-8 rounded bg-linear-to-r from-purple-500 to-indigo-500"></span>
      Related Posts
    </h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="article in articles"
        :key="article.id"
        class="transform overflow-hidden rounded-xl bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-800/10"
      >
        <div class="relative">
          <img :src="article.cover" :alt="article.title" class="h-40 w-full object-cover" />
          <div class="absolute top-3 right-3">
            <span
              v-if="article.categories?.length"
              class="rounded-md bg-[#2d2d2d]/80 px-2 py-1 text-xs text-gray-300 backdrop-blur-sm"
            >
              {{ article.categories[0]?.category.name }}
            </span>
          </div>
        </div>
        <div class="p-5">
          <router-link :to="'/blog/' + article.id">
            <h3
              class="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors hover:text-purple-400"
            >
              {{ article.title }}
            </h3>
          </router-link>
          <div
            v-if="article.content"
            class="mb-4 line-clamp-2 text-sm text-gray-400"
            v-html="article.content"
          ></div>
          <router-link
            :to="'/blog/' + article.id"
            class="mt-2 flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
          >
            Read Article
            <ArrowRightIcon class="h-3.5 w-3.5" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import type { PropType } from "vue";
import type { Post } from "@/interfaces/post";

defineProps({
  articles: {
    type: Array as PropType<Post[]>,
    required: true,
  },
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
