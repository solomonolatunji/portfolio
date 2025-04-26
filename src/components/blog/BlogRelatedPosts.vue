<template>
    <div class="mb-12">
        <h2 class="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
            <span class="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-1 rounded mr-3"></span>
            Related Posts
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="article in articles" :key="article.id"
                class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-800/10">
                <div class="relative">
                    <img :src="article.image" :alt="article.title" class="w-full h-40 object-cover">
                    <div class="absolute top-3 right-3">
                        <span class="bg-[#2d2d2d]/80 backdrop-blur-sm text-gray-300 px-2 py-1 text-xs rounded-md">
                            {{ article.category }}
                        </span>
                    </div>
                </div>
                <div class="p-5">
                    <router-link :to="'/blog/' + article.id">
                        <h3
                            class="font-bold text-lg text-white mb-2 hover:text-purple-400 transition-colors line-clamp-2">
                            {{ article.title }}
                        </h3>
                    </router-link>
                    <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                        {{ article.excerpt }}
                    </p>
                    <router-link :to="'/blog/' + article.id"
                        class="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 mt-2">
                        Read Article
                        <ArrowSmallRightIcon class="w-3.5 h-3.5" />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowSmallRightIcon } from '@heroicons/vue/24/solid';
import type { PropType } from 'vue';

interface RelatedArticle {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
}

defineProps({
    articles: {
        type: Array as PropType<RelatedArticle[]>,
        required: true
    }
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
