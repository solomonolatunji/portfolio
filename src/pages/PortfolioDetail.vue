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
                <div class="flex flex-col lg:flex-row gap-8 mb-10">
                    <!-- Project Image -->
                    <div class="w-full lg:w-3/5">
                        <div class="relative overflow-hidden rounded-xl shadow-xl bg-[#1e1e1e]">
                            <img :src="project.image" :alt="project.title" class="w-full h-auto object-cover" />
                            <div class="absolute top-4 right-4 bg-[#6d28d9] text-white text-sm px-3 py-1 rounded-full">
                                {{ project.year }}
                            </div>
                        </div>
                    </div>

                    <!-- Project Info -->
                    <div class="w-full lg:w-2/5">
                        <div class="bg-[#1e1e1e] p-6 rounded-xl shadow-lg h-full">
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
                                                class="inline-block bg-[#2d2d2d] text-gray-300 px-2 py-1 text-xs rounded-full">
                                                {{ tech }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-wrap gap-3">
                                <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank"
                                    class="bg-[#6d28d9] hover:bg-[#5b21b6] text-white py-2 px-5 rounded-full inline-flex items-center text-sm font-medium transition-all duration-300 transform hover:-translate-y-1">
                                    <EyeIcon class="w-4 h-4 mr-2" />
                                    Live Demo
                                </a>
                                <a v-if="project.codeUrl" :href="project.codeUrl" target="_blank"
                                    class="bg-[#1e1e1e] hover:bg-[#2d2d2d] border border-[#333] text-white py-2 px-5 rounded-full inline-flex items-center text-sm font-medium transition-all duration-300 transform hover:-translate-y-1">
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
                    <div class="bg-[#1e1e1e] rounded-xl p-6 shadow-lg">
                        <div class="prose prose-invert max-w-none">
                            <p class="text-gray-300 leading-relaxed">{{ project.detailedDescription }}</p>

                            <h3 class="text-lg font-bold text-white mt-6 mb-2">Key Features:</h3>
                            <ul class="space-y-2">
                                <li v-for="(feature, index) in project.features" :key="index"
                                    class="text-gray-300 flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-[#6d28d9] mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span>{{ feature }}</span>
                                </li>
                            </ul>

                            <h3 class="text-lg font-bold text-white mt-6 mb-2">My Role:</h3>
                            <p class="text-gray-300 leading-relaxed">{{ project.role }}</p>

                            <h3 class="text-lg font-bold text-white mt-6 mb-2">Challenges & Solutions:</h3>
                            <p class="text-gray-300 leading-relaxed">{{ project.challenges }}</p>
                        </div>
                    </div>
                </div>

                <!-- Project Gallery (if available) -->
                <div v-if="project.gallery && project.gallery.length > 0" class="mb-10">
                    <h2 class="text-xl font-bold mb-6 modern-section-title"><span class="accent">—</span> PROJECT
                        GALLERY</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="(image, index) in project.gallery" :key="index"
                            class="rounded-lg overflow-hidden shadow-lg bg-[#1e1e1e] transition-transform duration-300 hover:-translate-y-1">
                            <img :src="image" :alt="`${project.title} screenshot ${index + 1}`"
                                class="w-full h-44 object-cover">
                        </div>
                    </div>
                </div>

                <!-- Next/Previous Project Navigation -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                    <div v-if="prevProject" class="flex-1">
                        <router-link :to="'/portfolio/' + prevProject.id"
                            class="w-full bg-[#1e1e1e] hover:bg-[#2d2d2d] rounded-lg p-4 flex items-center transition-all duration-300 hover:-translate-y-1 shadow-lg border border-[#333]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-[#6d28d9]" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                            </svg>
                            <div>
                                <div class="text-sm text-gray-400">Previous Project</div>
                                <div class="text-white font-medium">{{ prevProject.title }}</div>
                            </div>
                        </router-link>
                    </div>

                    <div v-if="nextProject" class="flex-1">
                        <router-link :to="'/portfolio/' + nextProject.id"
                            class="w-full bg-[#1e1e1e] hover:bg-[#2d2d2d] rounded-lg p-4 flex items-center justify-end transition-all duration-300 hover:-translate-y-1 shadow-lg border border-[#333]">
                            <div class="text-right">
                                <div class="text-sm text-gray-400">Next Project</div>
                                <div class="text-white font-medium">{{ nextProject.title }}</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-3 text-[#6d28d9]" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Not Found State -->
            <div v-else class="flex flex-col items-center justify-center py-20 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-600 mb-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 class="text-2xl font-bold text-white mb-2">Project Not Found</h1>
                <p class="text-gray-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
                <router-link to="/portfolio"
                    class="bg-[#6d28d9] hover:bg-[#5b21b6] text-white transition-all duration-300 px-6 py-3 rounded-full inline-flex items-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
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

export default {
    name: 'PortfolioDetail',
    components: {
        CalendarIcon,
        TagIcon,
        CodeBracketIcon,
        EyeIcon
    },
    data() {
        return {
            projects: [
                {
                    id: '1',
                    title: 'E-commerce Dashboard',
                    description: 'A comprehensive admin dashboard for e-commerce platforms with sales analytics, inventory management, and customer insights.',
                    detailedDescription: 'This e-commerce dashboard serves as a central control panel for online store owners to manage their business operations efficiently. It provides a real-time overview of sales performance, inventory levels, customer behavior, and marketing campaign effectiveness, all in one intuitive interface.',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2024',
                    category: 'web',
                    technologies: ['Vue.js', 'Tailwind CSS', 'Chart.js', 'Node.js'],
                    features: [
                        'Interactive sales analytics with customizable date ranges and filters',
                        'Inventory management system with low-stock alerts and reorder recommendations',
                        'Customer insights with segmentation based on purchasing behavior',
                        'Order management with status tracking and processing tools',
                        'Marketing campaign performance tracking and ROI calculation'
                    ],
                    role: 'As the lead frontend developer, I designed and implemented the user interface using Vue.js and Tailwind CSS. I worked closely with UX designers to create intuitive data visualizations and dashboards that make complex information accessible and actionable for store owners.',
                    challenges: 'The main challenge was creating a responsive dashboard that could display large amounts of data without overwhelming users or causing performance issues. I solved this by implementing lazy loading, virtual scrolling for large data sets, and optimizing chart rendering based on viewport visibility.',
                    gallery: [
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                    ],
                    demoUrl: 'https://demo-link.com',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    id: '2',
                    title: 'Task Management App',
                    description: 'A cross-platform task management application with real-time collaboration, reminders, and progress tracking.',
                    detailedDescription: 'This task management application helps individuals and teams organize their work efficiently. With features like real-time collaboration, customizable workflows, deadline tracking, and automated reminders, it streamlines project management and boosts productivity.',
                    image: 'https://images.unsplash.com/photo-1623039405147-547794f94fda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2023',
                    category: 'web',
                    technologies: ['React', 'Redux', 'Firebase', 'Material UI'],
                    features: [
                        'Real-time collaboration with multiple team members',
                        'Customizable task boards with drag-and-drop functionality',
                        'Deadline tracking with automatic reminders',
                        'File attachments and comment threads for each task',
                        'Progress tracking with visual reports and analytics'
                    ],
                    role: 'As a full-stack developer on this project, I implemented the frontend using React and Material UI, set up the state management architecture with Redux, and built the backend services using Firebase for real-time data synchronization and authentication.',
                    challenges: 'Ensuring seamless real-time updates across multiple clients was challenging, particularly when handling conflicts and maintaining consistent state. I implemented an optimistic UI pattern with conflict resolution strategies to provide a responsive experience while maintaining data integrity.',
                    gallery: [
                        'https://images.unsplash.com/photo-1623039405147-547794f94fda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1607706189992-eae578626c86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1557568192-225f9f3d88b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                    ],
                    demoUrl: 'https://demo-link.com',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    id: '3',
                    title: 'Finance Mobile App',
                    description: 'A sleek mobile application for personal finance tracking, budgeting, and investment monitoring.',
                    detailedDescription: 'This mobile application helps users manage their personal finances effectively by tracking expenses, setting and monitoring budgets, managing investments, and providing insights for better financial decision-making. The clean, intuitive interface makes financial management accessible to everyone.',
                    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2023',
                    category: 'mobile',
                    technologies: ['React Native', 'TypeScript', 'Redux', 'Node.js'],
                    features: [
                        'Expense tracking with automatic categorization',
                        'Budget creation and monitoring with visual progress indicators',
                        'Integration with financial institutions for automatic transaction imports',
                        'Investment portfolio tracking and performance analytics',
                        'Secure authentication with biometric options'
                    ],
                    role: 'I led the mobile app development using React Native and TypeScript, ensuring a consistent experience across iOS and Android platforms. I also worked on the Node.js backend API that powers the financial data processing and synchronization.',
                    challenges: 'Handling sensitive financial data securely while maintaining a smooth user experience was our biggest challenge. I implemented end-to-end encryption for financial data, secure API communication patterns, and local caching strategies to balance security with performance.',
                    gallery: [
                        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1579621970590-9d624316904b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                    ],
                    demoUrl: 'https://demo-link.com',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    id: '4',
                    title: 'Health & Fitness Tracker',
                    description: 'A comprehensive health and fitness mobile app with workout plans, nutrition tracking, and progress analytics.',
                    detailedDescription: 'This health and fitness application helps users maintain their wellness goals by tracking workouts, nutrition, and health metrics. It provides personalized workout recommendations, meal planning tools, and progress visualization to keep users motivated and informed about their fitness journey.',
                    image: 'https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2022',
                    category: 'mobile',
                    technologies: ['Flutter', 'Dart', 'Firebase', 'GraphQL'],
                    features: [
                        'Personalized workout plans based on fitness goals and equipment availability',
                        'Nutrition tracking with barcode scanning and meal suggestions',
                        'Health metrics monitoring (weight, body measurements, sleep, etc.)',
                        'Progress visualization with charts and comparison tools',
                        'Community features for sharing achievements and participating in challenges'
                    ],
                    role: 'I developed this app using Flutter and Dart, focusing on creating a smooth, performant experience with attractive animations and transitions. I implemented the GraphQL API for efficient data fetching and Firebase for user authentication and real-time features.',
                    challenges: 'Creating accurate workout tracking mechanisms and nutrition calculations required extensive research and validation. I collaborated with fitness professionals to ensure the exercise demonstrations were accurate and safe, and worked with nutritionists to implement proper calorie and macronutrient calculations.',
                    gallery: [
                        'https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
                        'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
                    ],
                    demoUrl: 'https://demo-link.com',
                    codeUrl: 'https://github.com/eminisolomon'
                },
                {
                    id: '5',
                    title: 'Social Media Dashboard',
                    description: 'A modern UI design for a social media analytics dashboard with dark mode and customizable widgets.',
                    detailedDescription: 'This UI/UX design project focuses on creating an intuitive, visually appealing dashboard for social media managers and marketers. The design emphasizes clear data visualization, customizable widgets for different social platforms, and accessibility features including a well-implemented dark mode.',
                    image: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    year: '2022',
                    category: 'ui',
                    technologies: ['Figma', 'Adobe XD', 'Illustrator'],
                    features: [
                        'Unified dashboard for analytics across multiple social media platforms',
                        'Customizable widget system with drag-and-drop functionality',
                        'Responsive design adapting to desktop, tablet, and mobile screens',
                        'Thoughtfully designed dark mode with proper color contrast',
                        'Interactive prototype demonstrating user flows and animations'
                    ],
                    role: 'As the UI/UX designer for this project, I conducted user research to understand the pain points of social media professionals. I created wireframes, design systems, high-fidelity mockups, and interactive prototypes to showcase the solution.',
                    challenges: 'Consolidating analytics from different social platforms with their unique metrics into a cohesive, understandable interface was challenging. I created a flexible widget system with standardized data visualization components that could adapt to different types of metrics while maintaining visual consistency.',
                    gallery: [
                        'https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
                    ],
                    demoUrl: 'https://www.figma.com/',
                    codeUrl: ''
                },
                {
                    id: '6',
                    title: 'E-learning Platform UI',
                    description: 'A comprehensive UI/UX design for an e-learning platform with course navigation, video player, and student dashboard.',
                    detailedDescription: 'This UI/UX design project is a complete visual system for an online learning platform that focuses on providing an engaging and distraction-free learning experience. The design includes student dashboards, course catalogs, lesson pages with video integration, progress tracking, and community features.',
                    image: 'https://images.unsplash.com/photo-1613479205646-c0dc1ee8511f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
                    year: '2021',
                    category: 'ui',
                    technologies: ['Sketch', 'Figma', 'Principle'],
                    features: [
                        'Intuitive course navigation system with progress tracking',
                        'Custom video player with note-taking, bookmarking, and speed control',
                        'Student dashboard with personalized recommendations and achievement tracking',
                        'Discussion forums and community features integrated within the course interface',
                        'Mobile-responsive design for learning on any device'
                    ],
                    role: 'I led the UI/UX design process from user research through wireframing to high-fidelity mockups and interactive prototypes. I collaborated with educational experts to ensure the design supported effective learning experiences and incorporated feedback from user testing sessions.',
                    challenges: 'Creating an interface that supports focused learning while providing all necessary features without overwhelming students was the main challenge. I implemented a minimalist design with progressive disclosure principles, revealing features contextually when needed while keeping the main learning interface clean and focused.',
                    gallery: [
                        'https://images.unsplash.com/photo-1613479205646-c0dc1ee8511f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
                        'https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                    ],
                    demoUrl: 'https://www.figma.com/',
                    codeUrl: ''
                }
            ]
        };
    },
    computed: {
        project() {
            const projectId = this.$route.params.id;
            return this.projects.find(p => p.id === projectId);
        },
        nextProject() {
            if (!this.project) return null;
            const currentIndex = this.projects.findIndex(p => p.id === this.project.id);
            return currentIndex < this.projects.length - 1 ? this.projects[currentIndex + 1] : null;
        },
        prevProject() {
            if (!this.project) return null;
            const currentIndex = this.projects.findIndex(p => p.id === this.project.id);
            return currentIndex > 0 ? this.projects[currentIndex - 1] : null;
        }
    },
    methods: {
        getCategoryName(category) {
            const categories = {
                'web': 'Web Application',
                'mobile': 'Mobile Application',
                'ui': 'UI/UX Design'
            };
            return categories[category] || category;
        }
    },
    metaInfo() {
        return {
            title: this.project ? `${this.project.title} | Portfolio` : 'Project Not Found'
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