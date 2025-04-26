<template>
    <div class="w-full min-h-screen flex items-center justify-center py-8 md:py-12 pb-16 md:pb-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <!-- Back Button -->
            <router-link to="/blog" class="inline-flex items-center text-[#6d28d9] hover:text-[#8b5cf6] mb-8">
                <ArrowLeftIcon class="w-4 h-4 mr-1" />
                <span>Back to all posts</span>
            </router-link>

            <div v-if="post" class="mb-12">
                <!-- Post Header -->
                <div class="mb-8">
                    <div class="flex flex-wrap items-center gap-2 mb-4">
                        <span class="bg-[#2d2d2d] text-gray-300 px-3 py-1 text-xs font-medium rounded-full">{{
                            post.category }}</span>
                        <span class="text-gray-500">•</span>
                        <span class="text-gray-400 text-sm">{{ post.date }}</span>
                    </div>
                    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">{{ post.title }}</h1>
                    <div class="flex items-center">
                        <img :src="post.author.avatar" :alt="post.author.name" class="w-12 h-12 rounded-full mr-3">
                        <div>
                            <div class="text-white font-medium">{{ post.author.name }}</div>
                            <div class="text-gray-400 text-sm">Author</div>
                        </div>
                    </div>
                </div>

                <!-- Featured Image -->
                <div class="mb-8">
                    <img :src="post.image" :alt="post.title"
                        class="w-full h-auto rounded-xl object-cover max-h-[500px]">
                </div>

                <!-- Post Content -->
                <div class="prose prose-invert prose-lg max-w-none">
                    <!-- If content is available -->
                    <div v-if="post.content" v-html="post.content"></div>

                    <!-- Placeholder content if no content is provided -->
                    <div v-else>
                        <p>{{ post.excerpt }}</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies
                            tincidunt,
                            nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Sed euismod, nisl nec ultricies
                            tincidunt,
                            nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.
                        </p>
                        <h2>Main Concepts</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies
                            tincidunt,
                            nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Sed euismod, nisl nec ultricies
                            tincidunt,
                            nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.
                        </p>
                        <ul>
                            <li>First important point about this topic</li>
                            <li>Second key concept that readers should understand</li>
                            <li>Third critical element of the discussion</li>
                            <li>Fourth consideration for implementation</li>
                        </ul>
                        <h2>Practical Application</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies
                            tincidunt,
                            nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.
                        </p>
                        <pre><code>
// Sample code block
function example() {
    const data = fetchData();
    return processResults(data);
}
                        </code></pre>
                        <h2>Conclusion</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies
                            tincidunt,
                            nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.
                        </p>
                    </div>
                </div>

                <!-- Tags -->
                <div class="mt-10 pt-6 border-t border-[#333]">
                    <h3 class="text-lg font-medium text-white mb-3">Tags</h3>
                    <div class="flex flex-wrap gap-2">
                        <span
                            class="bg-[#1e1e1e] text-gray-300 px-3 py-1 text-xs font-medium rounded-full">Vue.js</span>
                        <span
                            class="bg-[#1e1e1e] text-gray-300 px-3 py-1 text-xs font-medium rounded-full">Frontend</span>
                        <span
                            class="bg-[#1e1e1e] text-gray-300 px-3 py-1 text-xs font-medium rounded-full">Development</span>
                        <span class="bg-[#1e1e1e] text-gray-300 px-3 py-1 text-xs font-medium rounded-full">Tailwind
                            CSS</span>
                    </div>
                </div>
            </div>

            <!-- Related Posts -->
            <div class="mt-16">
                <h2 class="text-xl sm:text-2xl font-bold mb-6 text-white">Related Posts</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="article in relatedArticles" :key="article.id"
                        class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                        <img :src="article.image" :alt="article.title" class="w-full h-40 object-cover">
                        <div class="p-4">
                            <div class="flex items-center mb-2">
                                <span class="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded-full">{{
                                    article.category }}</span>
                                <span class="mx-2 text-gray-500">•</span>
                                <span class="text-gray-400 text-xs">{{ article.date }}</span>
                            </div>
                            <h3 class="font-bold text-white mb-2">{{ article.title }}</h3>
                            <router-link :to="'/blog/' + article.id"
                                class="text-[#6d28d9] hover:text-[#8b5cf6] text-sm">
                                Read More
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Newsletter -->
            <div class="mt-16 bg-gradient-to-r from-[#4c1d95] to-[#6d28d9] rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                    <div class="mb-4 md:mb-0 w-full md:w-2/3 text-center md:text-left">
                        <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Subscribe to my newsletter
                        </h2>
                        <p class="text-sm sm:text-base text-purple-200">Get the latest articles, tutorials and updates
                            delivered to your inbox.</p>
                    </div>
                    <div class="w-full md:w-1/3">
                        <form @submit.prevent="subscribeNewsletter" class="flex">
                            <input type="email" v-model="newsletterEmail" placeholder="Your email" required
                                class="flex-1 px-3 sm:px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-900 text-sm sm:text-base">
                            <button type="submit"
                                class="bg-white text-[#6d28d9] px-3 sm:px-4 py-2 rounded-r-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base whitespace-nowrap">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';

export default {
    name: 'BlogPost',
    components: {
        ArrowLeftIcon
    },
    data() {
        return {
            newsletterEmail: '',
            // Sample articles data (in production, you'd want to fetch this from an API)
            articles: [
                {
                    id: '1',
                    title: 'Building Responsive Web Applications with Vue 3 and Tailwind CSS',
                    excerpt: 'Learn how to create beautiful, responsive interfaces using the power of Vue 3 combined with the utility-first approach of Tailwind CSS.',
                    content: '<p>Vue 3 and Tailwind CSS are powerful tools for creating responsive web applications. In this article, we will explore how to use these technologies together effectively.</p><p>Vue 3 is the latest version of the popular JavaScript framework, and it brings several new features that make it even more powerful and flexible. Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.</p><h2>Getting Started with Vue 3</h2><p>Vue 3 offers a more modular architecture, improved TypeScript support, and the new Composition API. Here\'s how you can create a new Vue 3 project:</p><pre><code>npm create vite@latest my-project --template vue</code></pre><h2>Adding Tailwind CSS</h2><p>Tailwind CSS is easy to integrate with Vue. First, install Tailwind CSS and its dependencies:</p><pre><code>npm install tailwindcss postcss autoprefixer</code></pre><p>Then, initialize your Tailwind configuration:</p><pre><code>npx tailwindcss init -p</code></pre><h2>Building Responsive Components</h2><p>Tailwind CSS makes it easy to create responsive designs with its mobile-first approach and responsive modifiers. Here\'s an example of a responsive component:</p><pre><code>&lt;div class="w-full md:w-1/2 lg:w-1/3 p-4"&gt;\n  &lt;div class="bg-white shadow-lg rounded-lg overflow-hidden"&gt;\n    &lt;img class="w-full h-48 object-cover" src="image.jpg" alt="Card image"&gt;\n    &lt;div class="p-6"&gt;\n      &lt;h2 class="text-xl font-bold mb-2"&gt;Card Title&lt;/h2&gt;\n      &lt;p class="text-gray-700"&gt;This is a card description.&lt;/p&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;</code></pre><h2>Conclusion</h2><p>By combining Vue 3 and Tailwind CSS, you can create beautiful, responsive web applications with less effort. The flexibility of Vue 3\'s Composition API and the utility-first approach of Tailwind CSS make them a perfect match for modern web development.</p>',
                    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
                    date: 'April 15, 2025',
                    category: 'web-dev',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    },
                    featured: true
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
                    }
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
                    }
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
                    }
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
                    }
                }
            ]
        };
    },
    computed: {
        post() {
            const postId = this.$route.params.id;
            return this.articles.find(article => article.id === postId);
        },
        relatedArticles() {
            // Get posts with the same category, excluding the current post
            return this.articles
                .filter(article => article.id !== this.$route.params.id && article.category === this.post?.category)
                .slice(0, 3); // Show maximum 3 related articles
        }
    },
    methods: {
        subscribeNewsletter() {
            // Simulate subscription process
            alert(`Thank you for subscribing with ${this.newsletterEmail}!`);
            this.newsletterEmail = '';
        }
    },
    metaInfo() {
        return {
            title: this.post ? `${this.post.title} | Solomon Olatunji's Blog` : 'Blog Post'
        };
    }
}
</script>

<style>
/* Add Tailwind typography styles or custom styles for blog content */
.prose {
    color: #e5e7eb;
    /* text-gray-200 */
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
    color: white;
    margin-top: 1.5em;
    margin-bottom: 0.75em;
}

.prose h2 {
    font-size: 1.5em;
    font-weight: 700;
}

.prose p {
    margin-top: 1em;
    margin-bottom: 1em;
}

.prose a {
    color: #8b5cf6;
    /* purple-500 */
    text-decoration: underline;
}

.prose ul {
    list-style-type: disc;
    padding-left: 1.5em;
    margin-top: 1em;
    margin-bottom: 1em;
}

.prose li {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

.prose pre {
    background-color: #1a1a1a;
    border-radius: 0.375rem;
    padding: 1rem;
    overflow-x: auto;
    margin: 1.25em 0;
}

.prose code {
    color: #e5e7eb;
    /* text-gray-200 */
    background-color: #2d2d2d;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
}

.prose pre code {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    font-size: 0.875em;
}
</style>