<template>
    <div class="w-full min-h-screen flex items-center justify-center py-8 md:py-12 pb-16 md:pb-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center">
                <span class="text-[#6d28d9]">—</span> BLOG
            </h1>

            <!-- Search and Categories -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 md:mb-10">
                <div class="relative w-full md:w-72">
                    <input type="text" v-model="searchQuery" placeholder="Search articles"
                        class="w-full bg-[#1e1e1e] border border-[#333] rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white">
                    <MagnifyingGlassIcon class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <div class="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                    <button @click="setCategory('all')" :class="[
                        'px-3 py-1 rounded-full text-xs font-medium transition-all duration-300',
                        activeCategory === 'all'
                            ? 'bg-[#6d28d9] text-white'
                            : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]'
                    ]">
                        All
                    </button>
                    <button @click="setCategory('web-dev')" :class="[
                        'px-3 py-1 rounded-full text-xs font-medium transition-all duration-300',
                        activeCategory === 'web-dev'
                            ? 'bg-[#6d28d9] text-white'
                            : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]'
                    ]">
                        Web Development
                    </button>
                    <button @click="setCategory('ui-ux')" :class="[
                        'px-3 py-1 rounded-full text-xs font-medium transition-all duration-300',
                        activeCategory === 'ui-ux'
                            ? 'bg-[#6d28d9] text-white'
                            : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]'
                    ]">
                        UI/UX Design
                    </button>
                    <button @click="setCategory('career')" :class="[
                        'px-3 py-1 rounded-full text-xs font-medium transition-all duration-300',
                        activeCategory === 'career'
                            ? 'bg-[#6d28d9] text-white'
                            : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]'
                    ]">
                        Career
                    </button>
                </div>
            </div>

            <!-- Featured Article -->
            <div v-if="featuredArticle" class="mb-8 md:mb-12">
                <div class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg">
                    <div class="flex flex-col md:flex-row">
                        <div class="w-full md:w-1/2">
                            <img :src="featuredArticle.image" :alt="featuredArticle.title"
                                class="w-full h-56 sm:h-64 md:h-full object-cover">
                        </div>
                        <div class="p-4 sm:p-6 w-full md:w-1/2 flex flex-col justify-between">
                            <div>
                                <div class="flex flex-wrap items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                                    <span
                                        class="bg-[#6d28d9] text-white px-3 py-1 text-xs font-medium rounded-full">Featured</span>
                                    <span class="hidden sm:inline mx-2 text-gray-500">•</span>
                                    <span class="text-gray-400 text-xs sm:text-sm">{{ featuredArticle.date }}</span>
                                </div>
                                <h2 class="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">{{
                                    featuredArticle.title }}
                                </h2>
                                <p class="text-sm md:text-base text-gray-400 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                                    {{ featuredArticle.excerpt }}</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <img :src="featuredArticle.author.avatar" :alt="featuredArticle.author.name"
                                        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3">
                                    <span class="text-sm sm:text-base text-white font-medium">{{
                                        featuredArticle.author.name }}</span>
                                </div>
                                <router-link :to="'/blog/' + featuredArticle.id"
                                    class="text-sm sm:text-base text-[#6d28d9] hover:text-[#8b5cf6]">
                                    Read More →
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Blog Posts Grid -->
            <div v-if="paginatedArticles.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div v-for="article in paginatedArticles" :key="article.id"
                    class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <img :src="article.image" :alt="article.title" class="w-full h-40 sm:h-48 object-cover">
                    <div class="p-4 sm:p-5">
                        <div class="flex items-center mb-2 sm:mb-3">
                            <span class="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded-full">{{ article.category
                                }}</span>
                            <span class="mx-2 text-gray-500">•</span>
                            <span class="text-gray-400 text-xs">{{ article.date }}</span>
                        </div>
                        <h3 class="font-bold text-base sm:text-lg text-white mb-2">{{ article.title }}</h3>
                        <p class="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{{
                            article.excerpt }}</p>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center">
                                <img :src="article.author.avatar" :alt="article.author.name"
                                    class="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2">
                                <span class="text-gray-300 text-xs sm:text-sm">{{ article.author.name }}</span>
                            </div>
                            <router-link :to="'/blog/' + article.id"
                                class="text-[#6d28d9] hover:text-[#8b5cf6] text-xs sm:text-sm">
                                Read More
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center py-10 sm:py-16 text-center">
                <DocumentIcon class="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mb-3 sm:mb-4" />
                <h3 class="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">No articles found</h3>
                <p class="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center mt-10">
                <div class="flex items-center space-x-1">
                    <!-- Previous Button -->
                    <button @click="prevPage" :disabled="currentPage === 1" :class="[
                        'flex items-center justify-center w-10 h-10 rounded-full',
                        currentPage === 1
                            ? 'bg-[#1e1e1e] text-gray-500 cursor-not-allowed'
                            : 'bg-[#1e1e1e] text-white hover:bg-[#2d2d2d]'
                    ]">
                        <ChevronLeftIcon class="w-5 h-5" />
                    </button>

                    <!-- Page Numbers -->
                    <div class="flex space-x-1">
                        <button v-for="page in displayedPages" :key="page" @click="goToPage(page)" :class="[
                            'flex items-center justify-center w-10 h-10 rounded-full font-medium',
                            page === currentPage
                                ? 'bg-[#6d28d9] text-white'
                                : 'bg-[#1e1e1e] text-white hover:bg-[#2d2d2d]'
                        ]">
                            {{ page }}
                        </button>
                    </div>

                    <!-- Next Button -->
                    <button @click="nextPage" :disabled="currentPage === totalPages" :class="[
                        'flex items-center justify-center w-10 h-10 rounded-full',
                        currentPage === totalPages
                            ? 'bg-[#1e1e1e] text-gray-500 cursor-not-allowed'
                            : 'bg-[#1e1e1e] text-white hover:bg-[#2d2d2d]'
                    ]">
                        <ChevronRightIcon class="w-5 h-5" />
                    </button>
                </div>
            </div>

            <!-- Newsletter Signup -->
            <div
                class="mt-10 sm:mt-16 bg-gradient-to-r from-[#4c1d95] to-[#6d28d9] rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                    <div class="mb-4 md:mb-0 w-full md:w-2/3 text-center md:text-left">
                        <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Subscribe to my newsletter
                        </h2>
                        <p class="text-sm sm:text-base text-purple-200">Get the latest articles, tutorials and updates
                            delivered to your
                            inbox.</p>
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
import { MagnifyingGlassIcon, DocumentIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

export default {
    name: 'Blog',
    components: {
        MagnifyingGlassIcon,
        DocumentIcon,
        ChevronLeftIcon,
        ChevronRightIcon
    },
    data() {
        return {
            searchQuery: '',
            activeCategory: 'all',
            newsletterEmail: '',
            currentPage: 1,
            postsPerPage: 6,
            articles: [
                {
                    id: '1',
                    title: 'Building Responsive Web Applications with Vue 3 and Tailwind CSS',
                    excerpt: 'Learn how to create beautiful, responsive interfaces using the power of Vue 3 combined with the utility-first approach of Tailwind CSS.',
                    content: '',
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
                },
                {
                    id: '6',
                    title: 'The Future of Front-End Development: Trends to Watch',
                    excerpt: 'Explore the emerging technologies and methodologies that are shaping the future of front-end web development.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=80',
                    date: 'March 10, 2025',
                    category: 'web-dev',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                },
                {
                    id: '7',
                    title: 'Building a Personal Brand as a Developer',
                    excerpt: 'Learn how to establish your professional identity and stand out in the competitive tech industry.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    date: 'March 5, 2025',
                    category: 'career',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                },
                {
                    id: '8',
                    title: 'Color Theory for Web Design: Creating Harmonious Color Schemes',
                    excerpt: 'Understanding the principles of color theory and how to apply them effectively in your web design projects.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
                    date: 'February 28, 2025',
                    category: 'ui-ux',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                },
                {
                    id: '9',
                    title: 'Mastering Git: Advanced Techniques for Efficient Workflow',
                    excerpt: 'Take your Git skills to the next level with these advanced strategies and best practices for managing code.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80',
                    date: 'February 22, 2025',
                    category: 'web-dev',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                },
                {
                    id: '10',
                    title: 'How to Prepare for Technical Interviews: A Comprehensive Guide',
                    excerpt: 'Strategies and tips to help you ace your next technical interview and land your dream job in tech.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    date: 'February 15, 2025',
                    category: 'career',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                },
                {
                    id: '11',
                    title: 'Creating Micro-interactions That Enhance User Experience',
                    excerpt: 'Learn how small, thoughtful animations and interactions can significantly improve your application\'s usability and delight users.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
                    date: 'February 8, 2025',
                    category: 'ui-ux',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                },
                {
                    id: '12',
                    title: 'Progressive Web Apps (PWAs): The Future of Web Development',
                    excerpt: 'Discover how PWAs combine the best of web and mobile apps to provide users with a seamless, engaging experience.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
                    date: 'February 1, 2025',
                    category: 'web-dev',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                },
                {
                    id: '13',
                    title: 'The Importance of Mentorship in Tech Careers',
                    excerpt: 'How finding the right mentor can accelerate your learning and help you navigate challenges in your professional journey.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80',
                    date: 'January 25, 2025',
                    category: 'career',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                },
                {
                    id: '14',
                    title: 'Accessible Design: Making the Web Usable for Everyone',
                    excerpt: 'Best practices for ensuring your websites and applications are accessible to users with different abilities and needs.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    date: 'January 18, 2025',
                    category: 'ui-ux',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                },
                {
                    id: '15',
                    title: 'Understanding Web Security: Protecting Your Users and Applications',
                    excerpt: 'Essential security concepts and practices every web developer should know to build secure applications.',
                    content: '',
                    image: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
                    date: 'January 10, 2025',
                    category: 'web-dev',
                    author: {
                        name: 'Solomon Olatunji',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    }
                }
            ]
        }
    },
    computed: {
        featuredArticle() {
            return this.articles.find(article => article.featured);
        },
        filteredArticles() {
            let filtered = this.articles;

            // Filter by category
            if (this.activeCategory !== 'all') {
                filtered = filtered.filter(article => article.category === this.activeCategory);
            }

            // Filter by search query
            if (this.searchQuery.trim() !== '') {
                const query = this.searchQuery.toLowerCase().trim();
                filtered = filtered.filter(article =>
                    article.title.toLowerCase().includes(query) ||
                    article.excerpt.toLowerCase().includes(query)
                );
            }

            // Remove featured from regular list
            return filtered.filter(article => !article.featured);
        },
        // Paginated articles based on current page
        paginatedArticles() {
            const startIndex = (this.currentPage - 1) * this.postsPerPage;
            const endIndex = startIndex + this.postsPerPage;
            return this.filteredArticles.slice(startIndex, endIndex);
        },
        // Total number of pages
        totalPages() {
            return Math.ceil(this.filteredArticles.length / this.postsPerPage);
        },
        // Calculate which page numbers to display
        displayedPages() {
            const pages = [];
            const totalToShow = 5; // Maximum number of page buttons to show

            if (this.totalPages <= totalToShow) {
                // If total pages is less than or equal to totalToShow, display all pages
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Complex pagination logic when there are many pages
                let startPage = Math.max(1, this.currentPage - Math.floor(totalToShow / 2));
                let endPage = startPage + totalToShow - 1;

                // Adjust if endPage exceeds total pages
                if (endPage > this.totalPages) {
                    endPage = this.totalPages;
                    startPage = Math.max(1, endPage - totalToShow + 1);
                }

                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }
            }

            return pages;
        }
    },
    methods: {
        subscribeNewsletter() {
            // Simulate subscription process
            alert(`Thank you for subscribing with ${this.newsletterEmail}!`);
            this.newsletterEmail = '';
        },
        // Pagination control methods
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        goToPage(page) {
            this.currentPage = page;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        // Reset to page 1 when filters change
        setCategory(category) {
            this.activeCategory = category;
            this.currentPage = 1; // Reset to first page
        }
    },
    watch: {
        // Reset pagination when search query changes
        searchQuery() {
            this.currentPage = 1;
        }
    }
}
</script>