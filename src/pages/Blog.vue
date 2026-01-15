<template>
  <div class="min-h-screen w-full py-8 pb-16 md:py-12 md:pb-24">
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="title-with-bg-shadow" data-text="BLOG">
        <h1 class="modern-title mb-6 text-center text-2xl sm:mb-8 sm:text-3xl lg:text-4xl">
          <span class="accent">—</span>
          BLOG
        </h1>
      </div>

      <!-- Search and Categories -->
      <div class="mb-8 flex flex-col items-center justify-between gap-4 md:mb-10 md:flex-row">
        <div class="relative w-full md:w-72">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search articles"
            class="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 pl-10 text-white placeholder-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
          <MagnifyingGlassIcon class="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
        </div>
        <div class="flex w-full flex-wrap justify-center gap-2 md:w-auto">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="setCategory(category.id)"
            :class="[
              'rounded-full px-3 py-1 text-xs font-medium transition-all duration-300',
              activeCategory === category.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]',
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div class="mb-8 md:mb-12">
        <!-- Featured Article -->
        <div v-if="featuredArticle" class="mb-10 md:mb-16">
          <h2 class="mb-6 flex items-center text-xl font-bold text-white md:text-2xl">
            <span
              class="mr-3 h-1 w-8 rounded bg-gradient-to-r from-purple-500 to-indigo-500"
            ></span>
            Featured Post
          </h2>

          <div
            class="transform overflow-hidden rounded-2xl bg-[#1e1e1e] shadow-xl transition-all duration-500 hover:shadow-purple-900/20"
          >
            <div class="flex flex-col md:flex-row">
              <div class="relative w-full md:w-1/2">
                <img
                  :src="featuredArticle.image"
                  :alt="featuredArticle.title"
                  class="h-64 w-full object-cover md:h-full"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-r"
                ></div>
                <div class="absolute bottom-4 left-4 md:hidden">
                  <span class="rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
                    Featured
                  </span>
                </div>
              </div>
              <div class="flex w-full flex-col justify-between p-6 md:w-1/2 md:p-8">
                <div>
                  <div class="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      class="hidden rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white md:inline-block"
                    >
                      Featured
                    </span>
                    <span
                      class="rounded-full bg-[#2d2d2d] px-3 py-1 text-xs font-medium text-gray-300"
                    >
                      {{ featuredArticle.category }}
                    </span>
                    <span class="text-xs text-gray-400">{{ featuredArticle.date }}</span>
                  </div>
                  <h2
                    class="mb-4 text-xl font-bold text-white transition-colors hover:text-purple-300 sm:text-2xl md:text-3xl"
                  >
                    <router-link :to="'/blog/' + featuredArticle.id">
                      {{ featuredArticle.title }}
                    </router-link>
                  </h2>
                  <p class="mb-6 line-clamp-3 text-sm text-gray-300 md:text-base">
                    {{ featuredArticle.excerpt }}
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      :src="featuredArticle.author.avatar"
                      :alt="featuredArticle.author.name"
                      class="mr-3 h-10 w-10 rounded-full border-2 border-purple-600"
                    />
                    <div>
                      <span class="block text-sm font-medium text-white">
                        {{ featuredArticle.author.name }}
                      </span>
                      <span class="text-xs text-gray-400">Author</span>
                    </div>
                  </div>
                  <router-link
                    :to="'/blog/' + featuredArticle.id"
                    class="inline-flex items-center gap-1 font-medium text-purple-400 transition-colors hover:text-purple-300"
                  >
                    Read Article
                    <ArrowRightIcon class="h-4 w-4" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Blog Posts Display -->
        <div>
          <div class="mb-6 flex items-center justify-between">
            <h2 class="flex items-center text-xl font-bold text-white md:text-2xl">
              <span
                class="mr-3 h-1 w-8 rounded bg-gradient-to-r from-purple-500 to-indigo-500"
              ></span>
              Latest Articles
            </h2>
            <div class="flex gap-2">
              <button
                @click="setViewMode('grid')"
                class="rounded-md p-2"
                :class="viewMode === 'grid' ? 'bg-[#2d2d2d] text-white' : 'text-gray-400'"
              >
                <Squares2X2Icon class="h-5 w-5" />
              </button>
              <button
                @click="setViewMode('list')"
                class="rounded-md p-2"
                :class="viewMode === 'list' ? 'bg-[#2d2d2d] text-white' : 'text-gray-400'"
              >
                <ListBulletIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <!-- Grid View -->
            <div
              v-if="viewMode === 'grid' && paginatedArticles.length > 0"
              class="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div
                v-for="article in paginatedArticles"
                :key="article.id"
                class="transform overflow-hidden rounded-xl bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-800/10"
              >
                <div class="relative">
                  <img :src="article.image" :alt="article.title" class="h-48 w-full object-cover" />
                  <div class="absolute top-3 right-3">
                    <span
                      class="rounded-md bg-[#2d2d2d]/80 px-2 py-1 text-xs text-gray-300 backdrop-blur-sm"
                    >
                      {{ article.category }}
                    </span>
                  </div>
                </div>
                <div class="p-5">
                  <div class="mb-2 text-xs text-gray-400">
                    {{ article.date }}
                  </div>
                  <router-link :to="'/blog/' + article.id">
                    <h3
                      class="mb-2 text-lg font-bold text-white transition-colors hover:text-purple-400"
                    >
                      {{ article.title }}
                    </h3>
                  </router-link>
                  <p class="mb-4 line-clamp-2 text-sm text-gray-400">
                    {{ article.excerpt }}
                  </p>
                  <div class="mt-4 flex items-center justify-between border-t border-gray-800 pt-4">
                    <div class="flex items-center">
                      <img
                        :src="article.author.avatar"
                        :alt="article.author.name"
                        class="mr-2 h-8 w-8 rounded-full border border-purple-600"
                      />
                      <span class="text-xs text-gray-300">{{ article.author.name }}</span>
                    </div>
                    <router-link
                      :to="'/blog/' + article.id"
                      class="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                    >
                      Read
                      <ChevronRightIcon class="h-3.5 w-3.5" />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <!-- List View -->
            <div
              v-else-if="viewMode === 'list' && paginatedArticles.length > 0"
              class="mb-10 space-y-5"
            >
              <div
                v-for="article in paginatedArticles"
                :key="article.id"
                class="flex transform flex-col overflow-hidden rounded-xl bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-800/10 sm:flex-row"
              >
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="h-48 w-full object-cover sm:h-32 sm:w-48 md:h-36"
                />
                <div class="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div class="mb-2 flex items-center justify-between">
                      <span class="rounded-md bg-[#2d2d2d] px-2 py-1 text-xs text-gray-300">
                        {{ article.category }}
                      </span>
                      <span class="text-xs text-gray-400">{{ article.date }}</span>
                    </div>
                    <router-link :to="'/blog/' + article.id">
                      <h3
                        class="mb-2 text-lg font-bold text-white transition-colors hover:text-purple-400"
                      >
                        {{ article.title }}
                      </h3>
                    </router-link>
                    <p class="line-clamp-2 text-sm text-gray-400">
                      {{ article.excerpt }}
                    </p>
                  </div>
                  <div class="mt-4 flex items-center justify-between gap-4">
                    <div class="flex items-center">
                      <img
                        :src="article.author.avatar"
                        :alt="article.author.name"
                        class="mr-2 h-6 w-6 rounded-full"
                      />
                      <span class="text-xs text-gray-300">{{ article.author.name }}</span>
                    </div>
                    <router-link
                      :to="'/blog/' + article.id"
                      class="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                    >
                      Read Article
                      <ChevronRightIcon class="h-3.5 w-3.5" />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-else
              class="flex flex-col items-center justify-center rounded-xl bg-[#1e1e1e] py-16 text-center"
            >
              <DocumentIcon class="mb-4 h-16 w-16 text-gray-600" />
              <h3 class="mb-2 text-xl font-bold text-white">No articles found</h3>
              <p class="mb-6 text-base text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <button
                @click="resetFilters"
                class="rounded-md bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <Pagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          @prev="prevPage"
          @next="nextPage"
          @goto="goToPage"
          class="mt-10"
        />
      </div>

      <!-- Newsletter Component -->
      <Newsletter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  MagnifyingGlassIcon,
  DocumentIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/vue/24/solid";
import Newsletter from "@/components/Newsletter.vue";
import Pagination from "@/components/Pagination.vue";
import { articles } from "@/constants/blogArticles";

// State
const searchQuery = ref("");
const activeCategory = ref("all");
const currentPage = ref(1);
const viewMode = ref("grid");
const postsPerPage = 6;

// Categories
const categories = [
  { id: "all", name: "All Posts" },
  { id: "web-dev", name: "Web Development" },
  { id: "ui-ux", name: "UI/UX Design" },
  { id: "career", name: "Career" },
  { id: "tutorials", name: "Tutorials" },
];

const setCategory = (category: string) => {
  activeCategory.value = category;
  currentPage.value = 1;
};

const setViewMode = (mode: "grid" | "list") => {
  viewMode.value = mode;
};

const resetFilters = () => {
  searchQuery.value = "";
  activeCategory.value = "all";
  currentPage.value = 1;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const featuredArticle = computed(() => articles.find((article) => article.featured));

const filteredArticles = computed(() => {
  let filtered = articles;

  if (activeCategory.value !== "all") {
    filtered = filtered.filter((article) => article.category === activeCategory.value);
  }

  if (searchQuery.value.trim() !== "") {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(query) || article.excerpt.toLowerCase().includes(query)
    );
  }

  return filtered.filter((article) => !article.featured);
});

const paginatedArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return filteredArticles.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(filteredArticles.value.length / postsPerPage));

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
