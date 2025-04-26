<template>
    <div class="w-full min-h-screen py-8 md:py-12 pb-16 md:pb-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <!-- Back Button -->
            <router-link to="/blog"
                class="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 sm:mb-8 group transition-colors">
                <ArrowLeftIcon class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span class="text-sm sm:text-base font-medium">Back to all posts</span>
            </router-link>

            <div v-if="post" class="mb-12 sm:mb-16 animate-fadeIn">
                <!-- Post Header -->
                <div class="mb-8 sm:mb-10">
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

                <!-- Progress Bar -->
                <div class="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 z-50 transition-all duration-200"
                    :style="{ width: `${readingProgress}%` }"></div>

                <!-- Featured Image -->
                <div class="mb-8 sm:mb-10">
                    <div class="relative rounded-2xl overflow-hidden shadow-xl">
                        <img :src="post.image" :alt="post.title" class="w-full h-auto object-cover max-h-[500px]">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                </div>

                <!-- Table of Contents (desktop) -->
                <div
                    class="hidden lg:block sticky top-8 float-right ml-8 mb-8 w-64 bg-[#1e1e1e] rounded-xl p-5 shadow-lg">
                    <h3 class="text-base font-bold text-white mb-3 flex items-center">
                        <ListBulletIcon class="w-4 h-4 mr-2 text-purple-400" />
                        Table of Contents
                    </h3>
                    <ul class="space-y-2 text-sm">
                        <li v-for="(heading, index) in tableOfContents" :key="index">
                            <a :href="`#heading-${index}`"
                                class="text-gray-300 hover:text-purple-400 transition-colors flex items-start">
                                <span class="inline-block w-4 text-right mr-2 text-purple-500">{{ index + 1 }}.</span>
                                {{ heading }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Post Content -->
                <div class="prose prose-sm sm:prose lg:prose-lg prose-invert prose-purple max-w-none">
                    <!-- If content is available -->
                    <div v-if="post.content" v-html="post.content"></div>

                    <!-- Placeholder content if no content is provided -->
                    <div v-else>
                        <p class="lead">{{ post.excerpt }}</p>

                        <p>
                            In today's rapidly evolving tech landscape, staying ahead of emerging trends and best
                            practices is essential for developers who want to build successful, future-proof
                            applications. This article explores key concepts and techniques that can help elevate your
                            development skills.
                        </p>

                        <h2 id="heading-0">Understanding Core Principles</h2>
                        <p>
                            Whether you're building web applications, mobile apps, or desktop software, certain
                            fundamental principles remain consistent across platforms. These include:
                        </p>
                        <ul>
                            <li>Writing clean, maintainable code with clear organization</li>
                            <li>Prioritizing user experience and accessibility</li>
                            <li>Implementing proper error handling and logging</li>
                            <li>Designing with performance in mind from the start</li>
                        </ul>

                        <h2 id="heading-1">Best Practices for Modern Development</h2>
                        <p>
                            As frameworks and tools evolve, so do the best practices for using them effectively. Some
                            current approaches worth adopting include:
                        </p>

                        <div class="bg-[#2d2d2d] p-4 rounded-lg my-6">
                            <h3 class="text-lg font-bold text-white">Pro Tip</h3>
                            <p class="mb-0">
                                When working with modern frameworks, consider using a component-based architecture that
                                promotes reusability and maintainability.
                            </p>
                        </div>

                        <pre><code>// Example code showing best practices
function processData(rawData) {
  // Validate input
  if (!rawData || typeof rawData !== 'object') {
    throw new Error('Invalid data format');
  }
  
  // Process and transform data
  return {
    ...rawData,
    processed: true,
    timestamp: new Date().toISOString()
  };
}</code></pre>

                        <h2 id="heading-2">Implementation Strategies</h2>
                        <p>
                            When implementing these concepts in real-world applications, consider these approaches:
                        </p>
                        <ol>
                            <li>Start with a clear architecture pattern appropriate for your use case</li>
                            <li>Break functionality into small, testable components or modules</li>
                            <li>Implement comprehensive testing for critical paths</li>
                            <li>Document code thoroughly, especially public APIs and interfaces</li>
                        </ol>

                        <h2 id="heading-3">Looking Forward</h2>
                        <p>
                            As we look to the future of development, several trends are likely to shape how we build
                            applications:
                        </p>
                        <blockquote>
                            <p>
                                "The most successful developers will be those who continually adapt to emerging
                                technologies while maintaining
                                strong fundamentals and focusing on user needs."
                            </p>
                        </blockquote>

                        <h2 id="heading-4">Conclusion</h2>
                        <p>
                            By applying these principles and staying informed about industry trends, you'll be
                            well-positioned to build
                            robust, maintainable applications that provide real value to users.
                        </p>
                    </div>
                </div>

                <!-- Tags -->
                <div class="mt-10 sm:mt-12 pt-6 border-t border-[#333]">
                    <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                        <HashtagIcon class="w-4 h-4 mr-2 text-purple-400" />
                        Tags
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="(tag, index) in postTags" :key="index"
                            class="bg-[#1e1e1e] text-gray-300 hover:bg-purple-900/20 px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center">
                            <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5"></span>
                            {{ tag }}
                        </span>
                    </div>
                </div>

                <!-- Share buttons -->
                <div class="mt-8 pt-6 border-t border-[#333]">
                    <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                        <ShareIcon class="w-4 h-4 mr-2 text-purple-400" />
                        Share this article
                    </h3>
                    <div class="flex gap-3">
                        <button class="p-2 bg-[#1e1e1e] hover:bg-blue-600 text-white rounded-full transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                                </path>
                            </svg>
                        </button>
                        <button class="p-2 bg-[#1e1e1e] hover:bg-blue-800 text-white rounded-full transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <button class="p-2 bg-[#1e1e1e] hover:bg-blue-900 text-white rounded-full transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M22.258 1.87H1.742a1.742 1.742 0 00-1.742 1.742v16.776a1.742 1.742 0 001.742 1.742h20.516a1.742 1.742 0 001.742-1.742V3.612a1.742 1.742 0 00-1.742-1.742zM7.74 19.355h-3.87v-11.61h3.87v11.61zM5.823 6.216a2.129 2.129 0 11.004-4.258 2.129 2.129 0 01-.004 4.258zm13.53 13.139h-3.87V13.32c0-1.448-.024-3.313-2.023-3.313-2.022 0-2.335 1.575-2.335 3.206v6.142h-3.87v-11.61h3.717v1.706h.052a4.08 4.08 0 013.677-2.022c3.927 0 4.652 2.584 4.652 5.95v5.976z">
                                </path>
                            </svg>
                        </button>
                        <button class="p-2 bg-[#1e1e1e] hover:bg-red-600 text-white rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M8 0C3.582 0 0 3.582 0 8c0 3.39 2.108 6.285 5.084 7.45-.07-.633-.133-1.604.028-2.295.146-.625.938-3.977.938-3.977s-.24-.48-.24-1.188c0-1.11.646-1.943 1.448-1.943.683 0 1.012.513 1.012 1.127 0 .687-.436 1.713-.662 2.664-.19.797.4 1.445 1.185 1.445 1.42 0 2.514-1.498 2.514-3.662 0-1.915-1.376-3.254-3.342-3.254-2.276 0-3.61 1.707-3.61 3.472 0 .687.263 1.424.593 1.825.066.08.075.15.057.23-.06.252-.196.796-.223.907-.035.146-.115.178-.268.107-.998-.465-1.624-1.926-1.624-3.1 0-2.524 1.834-4.84 5.287-4.84 2.774 0 4.932 1.977 4.932 4.62 0 2.757-1.74 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Author Bio -->
            <div v-if="post"
                class="mb-12 bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-900/20">
                <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                    <UserIcon class="w-4 h-4 mr-2 text-purple-400" />
                    About the author
                </h3>
                <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <img :src="post.author.avatar" :alt="post.author.name"
                        class="w-24 h-24 rounded-full border-2 border-purple-600">
                    <div>
                        <h4 class="text-lg font-medium text-white mb-2">{{ post.author.name }}</h4>
                        <p class="text-gray-300 text-sm mb-4">
                            Software developer and technical writer specialized in frontend development with over 5
                            years of experience
                            building modern web applications using Vue, React, and other cutting-edge technologies.
                        </p>
                        <div class="flex gap-3">
                            <a href="#" class="text-purple-400 hover:text-purple-300 transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                                    </path>
                                </svg>
                            </a>
                            <a href="#" class="text-purple-400 hover:text-purple-300 transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                            <a href="#" class="text-purple-400 hover:text-purple-300 transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Related Posts -->
            <div class="mb-12">
                <h2 class="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
                    <span class="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-1 rounded mr-3"></span>
                    Related Posts
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="article in relatedArticles" :key="article.id"
                        class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-800/10">
                        <div class="relative">
                            <img :src="article.image" :alt="article.title" class="w-full h-40 object-cover">
                            <div class="absolute top-3 right-3">
                                <span
                                    class="bg-[#2d2d2d]/80 backdrop-blur-sm text-gray-300 px-2 py-1 text-xs rounded-md">
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

            <!-- Newsletter Component -->
            <Newsletter @subscribed="handleNewsletterSubscription" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import {
    ArrowLeftIcon,
    ArrowSmallRightIcon,
    ClockIcon,
    CalendarIcon,
    UserIcon,
    HashtagIcon,
    ShareIcon,
    ListBulletIcon
} from '@heroicons/vue/24/solid';
import Newsletter from '../components/Newsletter.vue';

const route = useRoute();
const readingProgress = ref(0);

// Sample table of contents
const tableOfContents = [
    'Understanding Core Principles',
    'Best Practices for Modern Development',
    'Implementation Strategies',
    'Looking Forward',
    'Conclusion'
];

// Articles data
const articles = [
    {
        id: '1',
        title: 'Building Responsive Web Applications with Vue 3 and Tailwind CSS',
        excerpt: 'Learn how to create beautiful, responsive interfaces using the power of Vue 3 combined with the utility-first approach of Tailwind CSS.',
        content: '<p>Vue 3 and Tailwind CSS are powerful tools for creating responsive web applications. In this article, we will explore how to use these technologies together effectively.</p><p>Vue 3 is the latest version of the popular JavaScript framework, and it brings several new features that make it even more powerful and flexible. Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.</p><h2 id="heading-0">Getting Started with Vue 3</h2><p>Vue 3 offers a more modular architecture, improved TypeScript support, and the new Composition API. Here\'s how you can create a new Vue 3 project:</p><pre><code>npm create vite@latest my-project --template vue</code></pre><h2 id="heading-1">Adding Tailwind CSS</h2><p>Tailwind CSS is easy to integrate with Vue. First, install Tailwind CSS and its dependencies:</p><pre><code>npm install tailwindcss postcss autoprefixer</code></pre><p>Then, initialize your Tailwind configuration:</p><pre><code>npx tailwindcss init -p</code></pre><h2 id="heading-2">Building Responsive Components</h2><p>Tailwind CSS makes it easy to create responsive designs with its mobile-first approach and responsive modifiers. Here\'s an example of a responsive component:</p><pre><code>&lt;div class="w-full md:w-1/2 lg:w-1/3 p-4"&gt;\n  &lt;div class="bg-white shadow-lg rounded-lg overflow-hidden"&gt;\n    &lt;img class="w-full h-48 object-cover" src="image.jpg" alt="Card image"&gt;\n    &lt;div class="p-6"&gt;\n      &lt;h2 class="text-xl font-bold mb-2"&gt;Card Title&lt;/h2&gt;\n      &lt;p class="text-gray-700"&gt;This is a card description.&lt;/p&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;</code></pre><h2 id="heading-3">Advanced Techniques</h2><p>Once you\'ve mastered the basics, you can explore more advanced techniques like:</p><ul><li>Using Tailwind\'s JIT (Just-In-Time) mode for faster development</li><li>Creating custom theme configurations</li><li>Integrating Tailwind with Vue\'s component system</li><li>Building responsive layouts with Flexbox and Grid</li></ul><h2 id="heading-4">Conclusion</h2><p>By combining Vue 3 and Tailwind CSS, you can create beautiful, responsive web applications with less effort. The flexibility of Vue 3\'s Composition API and the utility-first approach of Tailwind CSS make them a perfect match for modern web development.</p>',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
        date: 'April 26, 2025',
        category: 'web-dev',
        author: {
            name: 'Solomon Olatunji',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        featured: true,
        readTime: '8 min read',
        tags: ['Vue.js', 'Tailwind CSS', 'Frontend', 'Responsive Design']
    },
    {
        id: '2',
        title: 'Modern UI/UX Design Principles Every Developer Should Know',
        excerpt: 'Explore essential design principles that can help developers create more user-friendly and aesthetically pleasing applications.',
        content: '',
        image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
        date: 'April 10, 2025',
        category: 'ui-ux',
        author: {
            name: 'Solomon Olatunji',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        readTime: '6 min read',
        tags: ['UI/UX', 'Design', 'User Experience']
    },
    {
        id: '3',
        title: 'Optimizing Performance in JavaScript Applications',
        excerpt: 'Discover techniques and best practices for improving the performance of your JavaScript applications to provide a better user experience.',
        content: '',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        date: 'April 2, 2025',
        category: 'web-dev',
        author: {
            name: 'Solomon Olatunji',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        readTime: '5 min read',
        tags: ['JavaScript', 'Performance', 'Web Development']
    },
    {
        id: '4',
        title: 'Navigating a Career in Software Development: Tips from the Field',
        excerpt: 'Insights and advice for both new and experienced developers to grow their skills and advance their careers in the ever-changing tech industry.',
        content: '',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        date: 'March 25, 2025',
        category: 'career',
        author: {
            name: 'Solomon Olatunji',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        readTime: '7 min read',
        tags: ['Career', 'Development', 'Advice']
    },
    {
        id: '5',
        title: 'Designing for Accessibility: Creating Inclusive Web Experiences',
        excerpt: 'Why accessibility matters and how to implement it effectively in your design process to create web applications that everyone can use.',
        content: '',
        image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
        date: 'March 18, 2025',
        category: 'ui-ux',
        author: {
            name: 'Solomon Olatunji',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        readTime: '5 min read',
        tags: ['Accessibility', 'Design', 'Inclusion']
    }
];

// Computed properties
const post = computed(() => {
    const postId = route.params.id as string;
    return articles.find(article => article.id === postId);
});

const relatedArticles = computed(() => {
    return articles
        .filter(article => article.id !== route.params.id && article.category === post.value?.category)
        .slice(0, 3);
});

const postTags = computed(() => {
    return post.value?.tags || ['Development', 'Web', 'Technology', 'Programming'];
});

// Methods
const handleNewsletterSubscription = (email: string) => {
    // Using the Newsletter component's built-in success modal now
    console.log(`Subscribed with email: ${email}`);
};

// Reading progress bar
const updateReadingProgress = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    readingProgress.value = Math.min(100, Math.max(0, progress));
};

// Lifecycle hooks
onMounted(() => {
    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress(); // Initialize
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateReadingProgress);
});
</script>

<style>
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
    content: '';
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
    font-size: 1.75em;
}

.prose h3 {
    font-size: 1.375em;
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
    padding: 1.25rem;
    overflow-x: auto;
    margin: 1.75em 0;
    border: 1px solid #2d2d2d;
}

.prose code {
    color: #e5e7eb;
    background-color: #2d2d2d;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.prose pre code {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    font-size: 0.875em;
    color: #d1d5db;
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
</style>