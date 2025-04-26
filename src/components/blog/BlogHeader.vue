<template>
    <div v-if="post" class="mb-8 sm:mb-10">
        <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="bg-purple-600 text-white px-3 py-1 text-xs font-medium rounded-full">
                {{ post.category }}
            </span>
            <span class="text-gray-400 text-xs flex items-center">
                <ClockIcon class="w-3.5 h-3.5 mr-1" />
                {{ post.readTime || '5 min read' }}
            </span>
            <span class="text-gray-400 text-xs flex items-center">
                <CalendarIcon class="w-3.5 h-3.5 mr-1" />
                {{ post.date }}
            </span>
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {{ post.title }}
        </h1>
        <div class="flex items-center">
            <img :src="post.author.avatar" :alt="post.author.name"
                class="w-12 h-12 sm:w-14 sm:h-14 rounded-full mr-4 border-2 border-purple-600">
            <div>
                <div class="text-white font-medium text-sm sm:text-base">{{ post.author.name }}</div>
                <div class="text-gray-400 text-xs sm:text-sm">Published on {{ post.date }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ClockIcon, CalendarIcon } from '@heroicons/vue/24/solid';
import type { PropType } from 'vue';

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
        required: true
    }
});
</script>
