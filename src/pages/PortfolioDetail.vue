<template>
    <div class="w-full min-h-screen flex items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div v-if="project" class="mb-12">
                <!-- Back Button -->
                <div class="mb-8">
                    <router-link to="/portfolio"
                        class="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Back to Projects
                    </router-link>
                </div>

                <!-- Project Header -->
                <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-8 sm:mb-10">
                    <!-- Project Image -->
                    <div class="w-full lg:w-3/5">
                        <div
                            class="relative overflow-hidden rounded-xl shadow-xl bg-[#1e1e1e] aspect-video sm:aspect-auto">
                            <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
                            <div
                                class="absolute top-4 right-4 bg-[#6d28d9] text-white text-sm px-3 py-1 rounded-full shadow-md">
                                {{ project.year }}
                            </div>
                        </div>
                    </div>

                    <!-- Project Info -->
                    <div class="w-full lg:w-2/5">
                        <div
                            class="bg-[#1e1e1e] p-5 sm:p-6 rounded-xl shadow-lg h-full border border-[#333] hover:border-[#6d28d9]/30 transition-colors duration-300">
                            <h1 class="text-2xl md:text-3xl font-bold text-white mb-4">{{ project.title }}</h1>
                            <div class="mb-6 space-y-4">
                                <div class="flex items-start">
                                    <div class="bg-[#2d2d2d] p-2 rounded-lg mr-3">
                                        <CalendarIcon class="w-5 h-5 text-[#6d28d9]" />
                                    </div>
                                    <div>
                                        <h3 class="text-gray-400 text-sm">Project Date</h3>
                                        <p class="text-white">{{ project.year }}</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="bg-[#2d2d2d] p-2 rounded-lg mr-3">
                                        <TagIcon class="w-5 h-5 text-[#6d28d9]" />
                                    </div>
                                    <div>
                                        <h3 class="text-gray-400 text-sm">Category</h3>
                                        <p class="text-white">{{ getCategoryName(project.category) }}</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="bg-[#2d2d2d] p-2 rounded-lg mr-3">
                                        <CodeBracketIcon class="w-5 h-5 text-[#6d28d9]" />
                                    </div>
                                    <div>
                                        <h3 class="text-gray-400 text-sm">Technologies</h3>
                                        <div class="flex flex-wrap gap-2 mt-1">
                                            <span v-for="(tech, i) in project.technologies" :key="i"
                                                class="inline-block bg-[#2d2d2d] text-gray-300 px-2 py-1 text-xs rounded-full hover:bg-[#333] transition-colors">
                                                {{ tech }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-wrap gap-3">
                                <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank"
                                    class="bg-[#6d28d9] hover:bg-[#5b21b6] text-white py-2 px-5 rounded-full inline-flex items-center text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                                    <EyeIcon class="w-4 h-4 mr-2" />
                                    Live Demo
                                </a>
                                <a v-if="project.codeUrl" :href="project.codeUrl" target="_blank"
                                    class="bg-[#1e1e1e] hover:bg-[#2d2d2d] border border-[#333] text-white py-2 px-5 rounded-full inline-flex items-center text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                                    <CodeBracketIcon class="w-4 h-4 mr-2" />
                                    Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project Description -->
                <div class="mb-10">
                    <h2 class="text-xl font-bold mb-6 modern-section-title"><span class="accent">—</span> PROJECT
                        DETAILS</h2>
                    <div
                        class="bg-[#1e1e1e] rounded-xl p-5 sm:p-6 shadow-lg border border-[#333] hover:border-[#6d28d9]/30 transition-colors duration-300">
                        <div class="prose prose-invert max-w-none">
                            <p class="text-gray-300 leading-relaxed text-base sm:text-lg">{{ project.detailedDescription
                            }}</p>

                            <h3 class="text-lg sm:text-xl font-bold text-white mt-6 mb-3 flex items-center">
                                <span class="w-1.5 h-6 bg-[#6d28d9] rounded-full mr-2.5 inline-block"></span>
                                Key Features:
                            </h3>
                            <ul class="space-y-3 pl-1">
                                <li v-for="(feature, index) in project.features" :key="index"
                                    class="text-gray-300 flex items-start text-base hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-[#6d28d9] mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span>{{ feature }}</span>
                                </li>
                            </ul>

                            <h3 class="text-lg sm:text-xl font-bold text-white mt-8 mb-3 flex items-center">
                                <span class="w-1.5 h-6 bg-[#6d28d9] rounded-full mr-2.5 inline-block"></span>
                                My Role:
                            </h3>
                            <p class="text-gray-300 leading-relaxed text-base sm:text-lg">{{ project.role }}</p>

                            <h3 class="text-lg sm:text-xl font-bold text-white mt-8 mb-3 flex items-center">
                                <span class="w-1.5 h-6 bg-[#6d28d9] rounded-full mr-2.5 inline-block"></span>
                                Challenges & Solutions:
                            </h3>
                            <p class="text-gray-300 leading-relaxed text-base sm:text-lg">{{ project.challenges }}</p>
                        </div>
                    </div>
                </div>

                <!-- Project Gallery (if available) -->
                <div v-if="project.gallery && project.gallery.length > 0" class="mb-10">
                    <h2 class="text-xl font-bold mb-6 modern-section-title"><span class="accent">—</span> PROJECT
                        GALLERY</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        <div v-for="(image, index) in project.gallery" :key="index"
                            class="rounded-xl overflow-hidden shadow-lg bg-[#1e1e1e] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-[#333] hover:border-[#6d28d9]/30 group">
                            <div class="relative aspect-[4/3] overflow-hidden">
                                <img :src="image" :alt="`${project.title} screenshot ${index + 1}`"
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-[#121212]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Next/Previous Project Navigation -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-12">
                    <div v-if="prevProject" class="flex-1">
                        <router-link :to="'/portfolio/' + prevProject.id"
                            class="w-full bg-[#1e1e1e] hover:bg-[#2d2d2d] rounded-xl p-4 sm:p-5 flex items-center transition-all duration-300 hover:-translate-y-1.5 shadow-lg border border-[#333] hover:border-[#6d28d9]/30 hover:shadow-xl group">
                            <div
                                class="bg-[#2d2d2d] p-2.5 rounded-full mr-4 text-[#6d28d9] group-hover:bg-[#6d28d9]/20 transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-sm text-gray-400 mb-0.5">Previous Project</div>
                                <div class="text-white font-medium group-hover:text-[#6d28d9] transition-colors">{{
                                    prevProject.title }}</div>
                            </div>
                        </router-link>
                    </div>
                    <div v-else class="flex-1 hidden md:block"></div>

                    <div v-if="nextProject" class="flex-1">
                        <router-link :to="'/portfolio/' + nextProject.id"
                            class="w-full bg-[#1e1e1e] hover:bg-[#2d2d2d] rounded-xl p-4 sm:p-5 flex items-center justify-end transition-all duration-300 hover:-translate-y-1.5 shadow-lg border border-[#333] hover:border-[#6d28d9]/30 hover:shadow-xl group">
                            <div class="text-right">
                                <div class="text-sm text-gray-400 mb-0.5">Next Project</div>
                                <div class="text-white font-medium group-hover:text-[#6d28d9] transition-colors">{{
                                    nextProject.title }}</div>
                            </div>
                            <div
                                class="bg-[#2d2d2d] p-2.5 rounded-full ml-4 text-[#6d28d9] group-hover:bg-[#6d28d9]/20 transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </router-link>
                    </div>
                    <div v-else class="flex-1 hidden md:block"></div>
                </div>
            </div>

            <!-- Not Found State -->
            <div v-else
                class="flex flex-col items-center justify-center py-16 sm:py-20 text-center bg-[#1e1e1e]/70 rounded-xl border border-[#333] shadow-lg backdrop-blur-sm p-6 sm:p-10 animate-fadeIn">
                <div class="bg-[#2d2d2d] p-5 rounded-full mb-6 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#6d28d9]" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 class="text-2xl sm:text-3xl font-bold text-white mb-3">Project Not Found</h1>
                <p class="text-gray-400 mb-8 max-w-md mx-auto">The project you're looking for doesn't exist or has been
                    removed. Check out my other projects instead.</p>
                <router-link to="/portfolio"
                    class="bg-[#6d28d9] hover:bg-[#5b21b6] text-white transition-all duration-300 px-6 py-3 rounded-full inline-flex items-center font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Back to Portfolio
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {
    CalendarIcon,
    TagIcon,
    CodeBracketIcon,
    EyeIcon
} from '@heroicons/vue/24/solid'
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { projects } from '../constants/projects';

export default {
    name: 'PortfolioDetail',
    components: {
        CalendarIcon,
        TagIcon,
        CodeBracketIcon,
        EyeIcon
    },
    setup() {
        const route = useRoute();

        const project = computed(() => {
            const projectId = route.params.id;
            return projects.find(p => p.id === projectId);
        });

        const nextProject = computed(() => {
            if (!project.value) return null;
            const currentIndex = projects.findIndex(p => p.id === project.value.id);
            return currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
        });

        const prevProject = computed(() => {
            if (!project.value) return null;
            const currentIndex = projects.findIndex(p => p.id === project.value.id);
            return currentIndex > 0 ? projects[currentIndex - 1] : null;
        });

        // SEO meta tags setup
        const pageTitle = computed(() => project.value ? `${project.value.title} | Solomon Olatunji's Portfolio` : 'Project Not Found');
        const pageDescription = computed(() => project.value ? project.value.description : 'Explore my portfolio of web applications, mobile apps, and UI/UX design projects.');
        const ogImage = computed(() => project.value ? project.value.image : 'https://solomonolatunji.com/og-image.jpg');
        const canonicalUrl = computed(() => `https://solomonolatunji.com/portfolio/${route.params.id}`);

        // Schema.org structured data for portfolio project
        const projectSchema = computed(() => {
            if (!project.value) return null;

            return {
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                'name': project.value.title,
                'description': project.value.description,
                'image': project.value.image,
                'dateCreated': `${project.value.year}-01-01`,
                'creator': {
                    '@type': 'Person',
                    'name': 'Solomon Olatunji',
                    'url': 'https://solomonolatunji.com/about'
                },
                'keywords': project.value.technologies.join(', '),
                'url': canonicalUrl.value,
                'thumbnailUrl': project.value.image,
                'mainEntityOfPage': {
                    '@type': 'WebPage',
                    '@id': canonicalUrl.value
                },
                'publisher': {
                    '@type': 'Person',
                    'name': 'Solomon Olatunji',
                    'url': 'https://solomonolatunji.com'
                }
            };
        });

        // Set meta tags for SEO
        useHead({
            title: pageTitle,
            meta: [
                {
                    name: 'description',
                    content: pageDescription,
                },
                // OpenGraph tags
                {
                    property: 'og:title',
                    content: pageTitle,
                },
                {
                    property: 'og:description',
                    content: pageDescription,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:image',
                    content: ogImage,
                },
                {
                    property: 'og:url',
                    content: canonicalUrl,
                },
                // Twitter tags
                {
                    name: 'twitter:card',
                    content: 'summary_large_image',
                },
                {
                    name: 'twitter:title',
                    content: pageTitle,
                },
                {
                    name: 'twitter:description',
                    content: pageDescription,
                },
                {
                    name: 'twitter:image',
                    content: ogImage,
                },
                // Project specific tags
                ...project.value?.technologies.map(tech => ({
                    property: 'article:tag',
                    content: tech
                })) || []
            ],
            link: [
                {
                    rel: 'canonical',
                    href: canonicalUrl,
                }
            ],
            script: [
                {
                    type: 'application/ld+json',
                    children: computed(() => JSON.stringify(projectSchema.value))
                }
            ]
        });

        function getCategoryName(category) {
            const categories = {
                'web': 'Web Application',
                'mobile': 'Mobile Application',
                'ui': 'UI/UX Design'
            };
            return categories[category] || category;
        }

        return {
            project,
            nextProject,
            prevProject,
            getCategoryName
        };
    }
}
</script>

<style scoped>
.prose h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.prose ul {
    list-style-type: none;
    padding-left: 0;
}
</style>