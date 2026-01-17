<template>
  <div class="min-h-screen w-full py-6 pb-12 md:py-12 md:pb-24">
    <div class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <router-link
        to="/blog"
        class="group mb-4 inline-flex items-center text-purple-400 transition-colors hover:text-purple-300 sm:mb-8"
      >
        <ArrowLeftIcon
          class="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
        />
        <span class="text-sm font-medium sm:text-base">Back to all posts</span>
      </router-link>

      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div
          class="h-10 w-10 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"
        ></div>
      </div>

      <div v-else-if="error" class="py-20 text-center text-red-400">
        {{ error }}
        <button @click="loadPost" class="mx-auto mt-4 block text-purple-400 underline">
          Try Again
        </button>
      </div>

      <div v-else-if="currentPost" class="animate-fadeIn mb-12 sm:mb-16">
        <!-- Header -->
        <div class="container mx-auto mb-8">
          <BlogHeader :post="currentPost" />
        </div>

        <div
          class="fixed top-0 left-0 z-50 h-1 bg-linear-to-r from-purple-600 to-indigo-600 transition-all duration-200"
          :style="{ width: `${readingProgress}%` }"
        ></div>

        <!-- TOC -->
        <BlogTableOfContents v-if="tableOfContents.length" :headings="tableOfContents" />

        <div class="mb-8 sm:mb-10">
          <div class="relative max-w-full overflow-hidden rounded-2xl shadow-xl">
            <img
              :src="currentPost.cover"
              :alt="currentPost.title"
              class="h-auto max-h-[500px] w-full object-cover"
            />
            <div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        <div
          class="prose prose-sm sm:prose lg:prose-lg prose-invert prose-purple clear-both max-w-none"
        >
          <div v-html="currentPost.content"></div>
        </div>

        <BlogTags :tags="currentPost.tags" />

        <ReactionSection :post-id="currentPost.id" />

        <BlogShareButtons :title="currentPost.title" :url="currentUrl" />

        <BlogAuthorBio :author="authorForBio" />

        <CommentSection :post-id="currentPost.id" />
      </div>

      <BlogRelatedPosts v-if="relatedPosts.length" :articles="relatedPosts" />

      <Newsletter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import Newsletter from "../components/Newsletter.vue";
import BlogTags from "../components/blog/BlogTags.vue";
import BlogShareButtons from "../components/blog/BlogShareButtons.vue";
import BlogAuthorBio from "../components/blog/BlogAuthorBio.vue";
import BlogRelatedPosts from "../components/blog/BlogRelatedPosts.vue";
import CommentSection from "../components/blog/CommentSection.vue";
import ReactionSection from "../components/blog/ReactionSection.vue";
import BlogHeader from "../components/blog/BlogHeader.vue";
import BlogTableOfContents from "../components/blog/BlogTableOfContents.vue";
import { usePost } from "@/hooks/usePost";

const route = useRoute();
const {
  fetchPostById,
  fetchRelatedPosts,
  currentPost,
  relatedPosts,
  isLoading,
  error,
  clearCurrentPost,
} = usePost();

const readingProgress = ref(0);
const currentUrl = ref(window.location.href);

const authorForBio = computed(() => {
  if (!currentPost.value?.author) return null;
  return {
    name: currentPost.value.author.username,
    bio: "Content creator and software engineer.", // Fallback/Placeholder
    // Generate avatar using username initials if needed
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(currentPost.value.author.username)}&background=random`,
  };
});

const tableOfContents = computed(() => {
  if (!currentPost.value?.content) return [];
  // Extract h2/h3 headings
  const regex = /<h[23][^>]*>(.*?)<\/h[23]>/g;
  const headings: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(currentPost.value.content)) !== null) {
    if (match[1]) {
      // Strip HTML tags from heading text
      const text = match[1].replace(/<[^>]*>/g, "");
      headings.push(text);
    }
  }
  return headings;
});

const loadPost = async () => {
  const postId = route.params.id as string;
  if (postId) {
    // Reset current post to avoid showing old data while loading
    if (currentPost.value?.id !== postId) {
      clearCurrentPost();
    }
    await fetchPostById(postId);
    await fetchRelatedPosts(postId);
  }
};

const updateReadingProgress = () => {
  const contentElement = document.querySelector(".prose") as HTMLElement;
  if (!contentElement) {
    readingProgress.value = 0;
    return;
  }
  const elementTop = contentElement.offsetTop;
  const elementHeight = contentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;

  const scrollableHeight = elementHeight - viewportHeight + elementTop;
  const scrolledPastTop = Math.max(0, scrollY - elementTop);
  const progress = (scrolledPastTop / scrollableHeight) * 100;

  readingProgress.value = Math.min(100, Math.max(0, progress));
};

onMountedAsync(async () => {
  window.addEventListener("scroll", updateReadingProgress);
  currentUrl.value = window.location.href; // Ensure browser URL is used
  await loadPost();
});

// Helper for async mounted
async function onMountedAsync(fn: () => Promise<void>) {
  onMounted(() => {
    fn();
  });
}

onUnmounted(() => {
  window.removeEventListener("scroll", updateReadingProgress);
});

watch(
  () => route.params.id,
  () => {
    loadPost(); // Params changed, load new post
    window.scrollTo(0, 0);
  }
);
</script>

<style>
/* ... keep existing styles ... */
.clear-both {
  clear: both;
}

.prose {
  color: #e5e7eb;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  color: white;
  margin-top: 2em;
  margin-bottom: 1em;
  font-weight: 700;
  position: relative;
  scroll-margin-top: 80px;
}

.prose h2::before {
  content: "";
  position: absolute;
  left: 0;
  top: -0.5rem;
  width: 3rem;
  height: 0.25rem;
  border-radius: 0.25rem;
  background: linear-gradient(to right, #8b5cf6, #6366f1);
}

.prose h2 {
  padding-top: 0.5rem;
  font-size: 1.5em;
}

@media (min-width: 640px) {
  .prose h2 {
    font-size: 1.75em;
  }
}

.prose h3 {
  font-size: 1.25em;
}

@media (min-width: 640px) {
  .prose h3 {
    font-size: 1.375em;
  }
}

.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  line-height: 1.8;
}

.prose a {
  color: #a78bfa;
  text-decoration: underline;
  transition: color 0.15s ease;
}

.prose a:hover {
  color: #c4b5fd;
}

.prose ul,
.prose ol {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding-left: 0.375rem;
}

.prose ul > li {
  list-style-type: disc;
}

.prose ol > li {
  list-style-type: decimal;
}

.prose blockquote {
  font-weight: 500;
  font-style: italic;
  color: #e9d5ff;
  border-left-width: 0.25rem;
  border-left-color: #7c3aed;
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-left: 1em;
  background-color: rgba(124, 58, 237, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
}

.prose code {
  color: #e9d5ff;
  font-weight: 600;
  font-size: 0.875em;
}

.prose code::before {
  content: "`";
}

.prose code::after {
  content: "`";
}

.prose pre {
  color: #e5e7eb;
  background-color: #1e1e1e;
  overflow-x: auto;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding: 0.8571429em 1.1428571em;
  border: 1px solid #333;
}

.prose pre code {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: 400;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}

.prose pre code::before {
  content: none;
}

.prose pre code::after {
  content: none;
}

.prose img {
  margin-top: 2em;
  margin-bottom: 2em;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.prose hr {
  border-color: #374151;
  margin-top: 3em;
  margin-bottom: 3em;
}
</style>
