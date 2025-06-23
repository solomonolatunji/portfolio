<template>
  <div class="min-h-screen w-full py-6 pb-12 md:py-12 md:pb-24">
    <div class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <router-link to="/blog"
        class="group mb-4 inline-flex items-center text-purple-400 transition-colors hover:text-purple-300 sm:mb-8">
        <ArrowLeftIcon class="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        <span class="text-sm font-medium sm:text-base">Back to all posts</span>
      </router-link>

      <div v-if="post" class="animate-fadeIn mb-12 sm:mb-16">
        <BlogHeader :post="post" />

        <div
          class="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-200"
          :style="{ width: `${readingProgress}%` }"></div>

        <BlogTableOfContents :headings="tableOfContents" />

        <div class="mb-8 sm:mb-10">
          <div class="relative max-w-full overflow-hidden rounded-2xl shadow-xl">
            <img :src="post.image" :alt="post.title" class="h-auto max-h-[500px] w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        <div class="prose prose-sm sm:prose lg:prose-lg prose-invert prose-purple clear-both max-w-none">
          <div v-if="post.content" v-html="post.content"></div>

          <div v-else>
            <p class="lead">{{ post.excerpt }}</p>

            <p>
              In today's rapidly evolving tech landscape, staying ahead of
              emerging trends and best practices is essential for developers who
              want to build successful, future-proof applications. This article
              explores key concepts and techniques that can help elevate your
              development skills.
            </p>

            <h2 id="heading-0">Understanding Core Principles</h2>
            <p>
              Whether you're building web applications, mobile apps, or desktop
              software, certain fundamental principles remain consistent across
              platforms. These include:
            </p>
            <ul>
              <li>Writing clean, maintainable code with clear organization</li>
              <li>Prioritizing user experience and accessibility</li>
              <li>Implementing proper error handling and logging</li>
              <li>Designing with performance in mind from the start</li>
            </ul>

            <h2 id="heading-1">Best Practices for Modern Development</h2>
            <p>
              As frameworks and tools evolve, so do the best practices for using
              them effectively. Some current approaches worth adopting include:
            </p>

            <div class="my-6 rounded-lg bg-[#2d2d2d] p-4">
              <h3 class="text-lg font-bold text-white">Pro Tip</h3>
              <p class="mb-0">
                When working with modern frameworks, consider using a
                component-based architecture that promotes reusability and
                maintainability.
              </p>
            </div>

            <pre><code>function processData(rawData) {
  if (!rawData || typeof rawData !== 'object') {
    throw new Error('Invalid data format');
  }

  return {
    ...rawData,
    processed: true,
    timestamp: new Date().toISOString()
  };
}</code></pre>

            <h2 id="heading-2">Implementation Strategies</h2>
            <p>
              When implementing these concepts in real-world applications,
              consider these approaches:
            </p>
            <ol>
              <li>
                Start with a clear architecture pattern appropriate for your use
                case
              </li>
              <li>
                Break functionality into small, testable components or modules
              </li>
              <li>Implement comprehensive testing for critical paths</li>
              <li>
                Document code thoroughly, especially public APIs and interfaces
              </li>
            </ol>

            <h2 id="heading-3">Looking Forward</h2>
            <p>
              As we look to the future of development, several trends are likely
              to shape how we build applications:
            </p>
            <blockquote>
              <p>
                "The most successful developers will be those who continually
                adapt to emerging technologies while maintaining strong
                fundamentals and focusing on user needs."
              </p>
            </blockquote>

            <h2 id="heading-4">Conclusion</h2>
            <p>
              By applying these principles and staying informed about industry
              trends, you'll be well-positioned to build robust, maintainable
              applications that provide real value to users.
            </p>
          </div>
        </div>

        <BlogTags :tags="postTags" />

        <BlogShareButtons :title="post.title" :url="currentUrl" />
      </div>

      <BlogAuthorBio v-if="post" :author="post.author" />

      <BlogRelatedPosts :articles="relatedArticles" />

      <Newsletter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import Newsletter from "../components/Newsletter.vue";
import BlogHeader from "../components/blog/BlogHeader.vue";
import BlogTableOfContents from "../components/blog/BlogTableOfContents.vue";
import BlogTags from "../components/blog/BlogTags.vue";
import BlogShareButtons from "../components/blog/BlogShareButtons.vue";
import BlogAuthorBio from "../components/blog/BlogAuthorBio.vue";
import BlogRelatedPosts from "../components/blog/BlogRelatedPosts.vue";
import { articles } from "../constants/blogArticles";

const route = useRoute();
const readingProgress = ref(0);
const currentUrl = ref(window.location.href);

const tableOfContents = [
  "Understanding Core Principles",
  "Best Practices for Modern Development",
  "Implementation Strategies",
  "Looking Forward",
  "Conclusion",
];

const post = computed(() => {
  const postId = route.params.id as string;
  return articles.find((article) => article.id === postId);
});

const relatedArticles = computed(() => {
  if (!post.value) return [];
  return articles
    .filter(
      (article) =>
        article.id !== post.value?.id &&
        article.category === post.value?.category,
    )
    .slice(0, 3);
});

const postTags = computed(() => {
  return (
    post.value?.tags || ["Development", "Web", "Technology", "Programming"]
  );
});

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

onMounted(() => {
  window.addEventListener("scroll", updateReadingProgress);
  updateReadingProgress();
  currentUrl.value = window.location.href;
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateReadingProgress);
});
</script>

<style>
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
  word-break: break-word;
}

.prose a:hover {
  color: #8b5cf6;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose ol {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding-left: 0.5em;
}

.prose li::marker {
  color: #8b5cf6;
}

.prose blockquote {
  font-style: italic;
  border-left: 4px solid #8b5cf6;
  padding-left: 1rem;
  margin-left: 0;
  margin-right: 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #d1d5db;
}

.prose pre {
  background-color: #1a1a1a;
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.75em 0;
  border: 1px solid #2d2d2d;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 640px) {
  .prose pre {
    padding: 1.25rem;
  }
}

.prose code {
  color: #e5e7eb;
  background-color: #2d2d2d;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  word-break: break-word;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 0.875em;
  color: #d1d5db;
  word-break: normal;
}

.prose img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
  margin: 1.5em 0;
}

.prose .lead {
  font-size: 1.125em;
  line-height: 1.8;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  color: #a78bfa;
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .prose table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .prose iframe {
    max-width: 100%;
    height: auto;
  }

  .prose blockquote {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding-left: 0.75rem;
  }

  .prose img {
    max-width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }

  .prose pre {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.8rem;
  }

  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  h1.text-2xl {
    font-size: 1.75rem;
    line-height: 2.1rem;
  }
}
</style>
