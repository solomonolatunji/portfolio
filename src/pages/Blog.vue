<template>
    <div class="w-full min-h-screen py-8 md:py-12 pb-16 md:pb-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div class="title-with-bg-shadow" data-text="BLOG">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 text-center modern-title">
                    <span class="accent">—</span> BLOG
                </h1>
            </div>

            <!-- Search and Categories -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 md:mb-10">
                <div class="relative w-full md:w-72">
                    <input type="text" v-model="searchQuery" placeholder="Search articles"
                        class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-white/70">
                    <MagnifyingGlassIcon class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <div class="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                    <button v-for="category in categories" :key="category.id" @click="setCategory(category.id)" :class="[
                        'px-3 py-1 rounded-full text-xs font-medium transition-all duration-300',
                        activeCategory === category.id
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                            : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]'
                    ]">
                        {{ category.name }}
                    </button>
                </div>
            </div>

            <div class="mb-8 md:mb-12">
                <!-- Featured Article -->
                <div v-if="featuredArticle" class="mb-10 md:mb-16">
                    <h2 class="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
                        <span class="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-1 rounded mr-3"></span>
                        Featured Post
                    </h2>

                    <div
                        class="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:shadow-purple-900/20">
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-1/2 relative">
                                <img :src="featuredArticle.image" :alt="featuredArticle.title"
                                    class="w-full h-64 md:h-full object-cover">
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-r">
                                </div>
                                <div class="absolute bottom-4 left-4 md:hidden">
                                    <span
                                        class="bg-purple-600 text-white px-3 py-1 text-xs font-medium rounded-full">Featured</span>
                                </div>
                            </div>
                            <div class="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between">
                                <div>
                                    <div class="flex flex-wrap items-center mb-4 gap-2">
                                        <span
                                            class="hidden md:inline-block bg-purple-600 text-white px-3 py-1 text-xs font-medium rounded-full">Featured</span>
                                        <span
                                            class="bg-[#2d2d2d] text-gray-300 px-3 py-1 text-xs font-medium rounded-full">{{
                                                featuredArticle.category }}</span>
                                        <span class="text-gray-400 text-xs">{{ featuredArticle.date }}</span>
                                    </div>
                                    <h2
                                        class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white hover:text-purple-300 transition-colors">
                                        <router-link :to="'/blog/' + featuredArticle.id">
                                            {{ featuredArticle.title }}
                                        </router-link>
                                    </h2>
                                    <p class="text-sm md:text-base text-gray-300 mb-6 line-clamp-3">
                                        {{ featuredArticle.excerpt }}
                                    </p>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <img :src="featuredArticle.author.avatar" :alt="featuredArticle.author.name"
                                            class="w-10 h-10 rounded-full mr-3 border-2 border-purple-600">
                                        <div>
                                            <span class="text-sm text-white font-medium block">{{
                                                featuredArticle.author.name }}</span>
                                            <span class="text-xs text-gray-400">Author</span>
                                        </div>
                                    </div>
                                    <router-link :to="'/blog/' + featuredArticle.id"
                                        class="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                        Read Article
                                        <ArrowRightIcon class="w-4 h-4" />
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Blog Posts Display -->
                <div>
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl md:text-2xl font-bold text-white flex items-center">
                            <span class="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-1 rounded mr-3"></span>
                            Latest Articles
                        </h2>
                        <div class="flex gap-2">
                            <button @click="setViewMode('grid')" class="p-2 rounded-md"
                                :class="viewMode === 'grid' ? 'bg-[#2d2d2d] text-white' : 'text-gray-400'">
                                <Squares2X2Icon class="w-5 h-5" />
                            </button>
                            <button @click="setViewMode('list')" class="p-2 rounded-md"
                                :class="viewMode === 'list' ? 'bg-[#2d2d2d] text-white' : 'text-gray-400'">
                                <ListBulletIcon class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <!-- Grid View -->
                        <div v-if="viewMode === 'grid' && paginatedArticles.length > 0"
                            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            <div v-for="article in paginatedArticles" :key="article.id"
                                class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-800/10">
                                <div class="relative">
                                    <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover">
                                    <div class="absolute top-3 right-3">
                                        <span
                                            class="bg-[#2d2d2d]/80 backdrop-blur-sm text-gray-300 px-2 py-1 text-xs rounded-md">
                                            {{ article.category }}
                                        </span>
                                    </div>
                                </div>
                                <div class="p-5">
                                    <div class="text-gray-400 text-xs mb-2">{{ article.date }}</div>
                                    <router-link :to="'/blog/' + article.id">
                                        <h3
                                            class="font-bold text-lg text-white mb-2 hover:text-purple-400 transition-colors">
                                            {{ article.title }}
                                        </h3>
                                    </router-link>
                                    <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {{ article.excerpt }}
                                    </p>
                                    <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                                        <div class="flex items-center">
                                            <img :src="article.author.avatar" :alt="article.author.name"
                                                class="w-8 h-8 rounded-full mr-2 border border-purple-600">
                                            <span class="text-gray-300 text-xs">{{ article.author.name }}</span>
                                        </div>
                                        <router-link :to="'/blog/' + article.id"
                                            class="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                                            Read
                                            <ChevronRightIcon class="w-3.5 h-3.5" />
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- List View -->
                        <div v-else-if="viewMode === 'list' && paginatedArticles.length > 0" class="space-y-5 mb-10">
                            <div v-for="article in paginatedArticles" :key="article.id"
                                class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-800/10 flex flex-col sm:flex-row">
                                <img :src="article.image" :alt="article.title"
                                    class="w-full sm:w-48 h-48 sm:h-32 md:h-36 object-cover">
                                <div class="p-5 flex-1 flex flex-col justify-between">
                                    <div></div>
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded-md">{{
                                            article.category }}</span>
                                        <span class="text-gray-400 text-xs">{{ article.date }}</span>
                                    </div>
                                    <router-link :to="'/blog/' + article.id">
                                        <h3
                                            class="font-bold text-lg text-white mb-2 hover:text-purple-400 transition-colors">
                                            {{ article.title }}</h3>
                                    </router-link>
                                    <p class="text-gray-400 text-sm line-clamp-2">{{ article.excerpt }}</p>
                                </div>
                                <div class="flex justify-between items-center mt-4">
                                    <div class="flex items-center">
                                        <img :src="article.author.avatar" :alt="article.author.name"
                                            class="w-6 h-6 rounded-full mr-2">
                                        <span class="text-gray-300 text-xs">{{ article.author.name }}</span>
                                    </div>
                                    <router-link :to="'/blog/' + article.id"
                                        class="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                                        Read Article
                                        <ChevronRightIcon class="w-3.5 h-3.5" />
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-else
                            class="flex flex-col items-center justify-center py-16 text-center bg-[#1e1e1e] rounded-xl">
                            <DocumentIcon class="w-16 h-16 text-gray-600 mb-4" />
                            <h3 class="text-xl font-bold text-white mb-2">No articles found</h3>
                            <p class="text-base text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                            <button @click="resetFilters"
                                class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <Pagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages" @prev="prevPage"
                    @next="nextPage" @goto="goToPage" class="mt-10" />
            </div>
        </div>

        <!-- Newsletter Component -->
        <Newsletter @subscribed="handleNewsletterSubscription" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MagnifyingGlassIcon, DocumentIcon, ArrowRightIcon, ChevronRightIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/solid';
import Newsletter from '../components/Newsletter.vue';
import Pagination from '../components/Pagination.vue';
import { articles } from '../data/blogArticles';

// State
const searchQuery = ref('');
const activeCategory = ref('all');
const currentPage = ref(1);
const viewMode = ref('grid');
const postsPerPage = 6;

// Categories
const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'web-dev', name: 'Web Development' },
    { id: 'ui-ux', name: 'UI/UX Design' },
    { id: 'career', name: 'Career' },
    { id: 'tutorials', name: 'Tutorials' }
];

const setCategory = (category: string) => {
    activeCategory.value = category;
    currentPage.value = 1;
};

const setViewMode = (mode: 'grid' | 'list') => {
    viewMode.value = mode;
};

const resetFilters = () => {
    searchQuery.value = '';
    activeCategory.value = 'all';
    currentPage.value = 1;
};

const handleNewsletterSubscription = (email: string) => {
    console.log(`Subscribed with email: ${email}`);
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const goToPage = (page: number) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const featuredArticle = computed(() =>
    articles.find(article => article.featured)
);

const filteredArticles = computed(() => {
    let filtered = articles;

    if (activeCategory.value !== 'all') {
        filtered = filtered.filter(article => article.category === activeCategory.value);
    }

    if (searchQuery.value.trim() !== '') {
        const query = searchQuery.value.toLowerCase().trim();
        filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query)
        );
    }

    return filtered.filter(article => !article.featured);
});

const paginatedArticles = computed(() => {
    const startIndex = (currentPage.value - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredArticles.value.slice(startIndex, endIndex);
});

const totalPages = computed(() =>
    Math.ceil(filteredArticles.value.length / postsPerPage)
);

watch(searchQuery, () => {
    currentPage.value = 1;
});
</script>

<style scoped>
.accent {
    color: #6d28d9;
    margin-right: 4px;
}
</style>