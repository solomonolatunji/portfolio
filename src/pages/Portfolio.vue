<template>
    <div class="w-full min-h-screen flex items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div class="title-with-bg-shadow" data-text="MY PORTFOLIO">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl mb-8 text-center modern-title">
                    <span class="accent">—</span> MY PORTFOLIO
                </h1>
            </div>

            <!-- Project Filters -->
            <div class="flex flex-wrap justify-center gap-3 mb-10">
                <button @click="activeFilter = 'all'" :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeFilter === 'all'
                        ? 'bg-[#6d28d9] text-white'
                        : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]'
                ]">
                    All Projects
                </button>
                <button @click="activeFilter = 'web'" :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeFilter === 'web'
                        ? 'bg-[#6d28d9] text-white'
                        : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]'
                ]">
                    Web Apps
                </button>
                <button @click="activeFilter = 'mobile'" :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeFilter === 'mobile'
                        ? 'bg-[#6d28d9] text-white'
                        : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]'
                ]">
                    Mobile Apps
                </button>
                <button @click="activeFilter = 'ui'" :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeFilter === 'ui'
                        ? 'bg-[#6d28d9] text-white'
                        : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2d2d2d]'
                ]">
                    UI/UX Design
                </button>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="(project, index) in filteredProjects" :key="index"
                    class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div class="relative overflow-hidden group">
                        <img :src="project.image" :alt="project.title" class="w-full h-52 object-cover">
                        <!-- Overlay with actions -->
                        <div
                            class="absolute inset-0 bg-[#6d28d9] bg-opacity-0 group-hover:bg-opacity-80 flex items-center justify-center gap-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                            <router-link :to="'/portfolio/' + project.id"
                                class="bg-white text-[#6d28d9] p-2 rounded-full hover:bg-gray-100 transition-all">
                                <EyeIcon class="w-5 h-5" />
                            </router-link>
                            <a :href="project.codeUrl" target="_blank"
                                class="bg-white text-[#6d28d9] p-2 rounded-full hover:bg-gray-100 transition-all">
                                <CodeBracketIcon class="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-center mb-2">
                            <router-link :to="'/portfolio/' + project.id"
                                class="hover:text-[#6d28d9] transition-colors">
                                <h3 class="font-bold text-lg text-white">{{ project.title }}</h3>
                            </router-link>
                            <span class="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded-full">{{ project.year
                            }}</span>
                        </div>
                        <p class="text-gray-400 text-sm mb-3">{{ project.description }}</p>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="(tech, i) in project.technologies" :key="i"
                                class="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded-full">{{ tech }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- More Projects -->
            <div class="flex justify-center mt-12">
                <a href="https://github.com/eminisolomon" target="_blank"
                    class="bg-[#1e1e1e] hover:bg-[#2d2d2d] text-white transition-all duration-300 px-6 py-3 rounded-full inline-flex items-center font-medium text-base sm:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    MORE ON GITHUB
                    <span
                        class="ml-2 bg-[#6d28d9] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { EyeIcon, CodeBracketIcon } from '@heroicons/vue/24/solid'

export default {
    name: 'Portfolio',
    components: {
        EyeIcon,
        CodeBracketIcon
    },
    data() {
        return {
            activeFilter: 'all',
            projects: [
                {
                    id: '1',
                    title: 'Enterprise SaaS Dashboard',
                    description: 'A comprehensive analytics dashboard for enterprise SaaS platforms with real-time data visualization, role-based access control, and customizable reporting.',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2025',
                    category: 'web',
                    technologies: ['Vue 3', 'TypeScript', 'Pinia', 'GraphQL', 'Docker'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    id: '2',
                    title: 'Team Collaboration Platform',
                    description: 'A modern collaboration tool with real-time document editing, task management, video conferencing, and AI-powered workflow automation.',
                    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
                    year: '2024',
                    category: 'web',
                    technologies: ['React 18', 'NextJS 14', 'TypeScript', 'tRPC', 'Prisma'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    id: '3',
                    title: 'Fintech Mobile Application',
                    description: 'A comprehensive financial management app with AI-powered insights, investment portfolio tracking, and advanced security features.',
                    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
                    year: '2024',
                    category: 'mobile',
                    technologies: ['React Native', 'TypeScript', 'Redux Toolkit', 'Firebase', 'Stripe API'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    id: '4',
                    title: 'Wellness & Fitness Platform',
                    description: 'A personalized health application with AI-driven workout plans, nutrition analysis, and wearable device integration for comprehensive health monitoring.',
                    image: 'https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2023',
                    category: 'mobile',
                    technologies: ['Flutter', 'Dart', 'Firebase', 'TensorFlow Lite', 'BLE Integration'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    id: '5',
                    title: 'Marketing Analytics Dashboard',
                    description: 'A comprehensive marketing analytics interface with multi-platform data integration, custom reporting, and predictive analytics for ROI optimization.',
                    image: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2023',
                    category: 'ui',
                    technologies: ['Figma', 'Adobe XD', 'Design Systems', 'Data Visualization'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    id: '6',
                    title: 'EdTech Platform Redesign',
                    description: 'Complete UX/UI overhaul for an education technology platform with personalized learning paths, interactive content modules, and accessibility improvements.',
                    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
                    year: '2022',
                    category: 'ui',
                    technologies: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                }
            ]
        }
    },
    computed: {
        filteredProjects() {
            if (this.activeFilter === 'all') {
                return this.projects;
            }
            return this.projects.filter(project => project.category === this.activeFilter);
        }
    }
}
</script>