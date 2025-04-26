<template>
    <div class="w-full min-h-screen flex items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
                <span class="text-[#6d28d9]">—</span> MY PORTFOLIO
            </h1>

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
                            <a :href="project.demoUrl" target="_blank"
                                class="bg-white text-[#6d28d9] p-2 rounded-full hover:bg-gray-100 transition-all">
                                <EyeIcon class="w-5 h-5" />
                            </a>
                            <a :href="project.codeUrl" target="_blank"
                                class="bg-white text-[#6d28d9] p-2 rounded-full hover:bg-gray-100 transition-all">
                                <CodeBracketIcon class="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-bold text-lg text-white">{{ project.title }}</h3>
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
                    title: 'E-commerce Dashboard',
                    description: 'A comprehensive admin dashboard for e-commerce platforms with sales analytics, inventory management, and customer insights.',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2024',
                    category: 'web',
                    technologies: ['Vue.js', 'Tailwind CSS', 'Chart.js', 'Node.js'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    title: 'Task Management App',
                    description: 'A cross-platform task management application with real-time collaboration, reminders, and progress tracking.',
                    image: 'https://images.unsplash.com/photo-1623039405147-547794f94fda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2023',
                    category: 'web',
                    technologies: ['React', 'Redux', 'Firebase', 'Material UI'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    title: 'Finance Mobile App',
                    description: 'A sleek mobile application for personal finance tracking, budgeting, and investment monitoring.',
                    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2023',
                    category: 'mobile',
                    technologies: ['React Native', 'TypeScript', 'Redux', 'Node.js'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    title: 'Health & Fitness Tracker',
                    description: 'A comprehensive health and fitness mobile app with workout plans, nutrition tracking, and progress analytics.',
                    image: 'https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2022',
                    category: 'mobile',
                    technologies: ['Flutter', 'Dart', 'Firebase', 'GraphQL'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    title: 'Social Media Dashboard',
                    description: 'A modern UI design for a social media analytics dashboard with dark mode and customizable widgets.',
                    image: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2022',
                    category: 'ui',
                    technologies: ['Figma', 'Adobe XD', 'Illustrator'],
                    demoUrl: '#',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    title: 'E-learning Platform UI',
                    description: 'A comprehensive UI/UX design for an e-learning platform with course navigation, video player, and student dashboard.',
                    image: 'https://images.unsplash.com/photo-1613479205646-c0dc1ee8511f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
                    year: '2021',
                    category: 'ui',
                    technologies: ['Sketch', 'Figma', 'Principle'],
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