<template>
    <div class="w-full min-h-screen flex items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div class="title-with-bg-shadow" data-text="ABOUT ME">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl mb-8 text-center modern-title">
                    <span class="accent">—</span> ABOUT ME
                </h1>
            </div>

            <div class="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12">
                <div class="w-full md:w-1/3 flex items-center justify-center mb-8 md:mb-0">
                    <div class="relative">
                        <div
                            class="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-xl border-4 border-[#6d28d9]">
                            <img src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Solomon Olatunji" class="w-full h-full object-cover" />
                        </div>
                        <div
                            class="absolute -z-10 -bottom-3 -right-3 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-[#6d28d9] opacity-30">
                        </div>
                    </div>
                </div>

                <div class="w-full md:w-2/3">
                    <div class="grid grid-cols-2 gap-y-4 gap-x-4 sm:gap-x-6">
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <UserIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                First Name:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Solomon</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <UserIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Last Name:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Olatunji</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <GlobeAltIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Nationality:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Nigerian</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <BriefcaseIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Freelance:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Available</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <MapPinIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Address:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Ilorin, Nigeria</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <PhoneIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Phone:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">+2349017818024</p>
                        </div>
                        <div class="mb-2 col-span-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <EnvelopeIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Email:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg break-all">hello@solomonolatunji.com
                            </p>
                        </div>
                    </div>

                    <div class="mt-6 p-4 bg-[#1e1e1e] rounded-lg border border-[#333]">
                        <h3 class="text-lg font-semibold mb-3 flex items-center">
                            <DocumentTextIcon class="w-5 h-5 mr-2 text-[#6d28d9]" />
                            About Me
                        </h3>
                        <p class="text-gray-300 text-sm leading-relaxed">
                            I am a versatile Full Stack Software Engineer with over 5 years of experience crafting
                            robust web and mobile applications. My technical expertise spans the entire development
                            lifecycle, from concept and design to deployment and maintenance. I specialize in creating
                            seamless user experiences with modern frontend frameworks while building scalable backend
                            systems. I'm committed to writing clean, maintainable code and implementing best practices
                            for performance and security. Beyond coding, I actively contribute to open-source projects
                            and mentor aspiring developers in the tech community.
                        </p>
                    </div>
                </div>
            </div>

            <div class="mt-12 lg:mt-16">
                <h2 class="text-xl sm:text-2xl mb-6 text-center modern-section-title">
                    <span class="accent">—</span> MY SKILLS
                </h2>

                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8">
                    <div v-for="(tech, index) in technologies" :key="index"
                        class="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1">
                        <img :src="tech.icon" :alt="tech.name" class="w-12 h-12 mb-2" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">{{ tech.name }}</span>
                    </div>
                </div>
            </div>

            <div class="mt-16">
                <h2 class="text-xl sm:text-2xl mb-6 text-center modern-section-title">
                    <span class="accent">—</span> EXPERIENCE
                </h2>

                <div class="relative">
                    <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-[#333]"></div>

                    <div class="flex flex-col space-y-8">
                        <div v-for="(exp, index) in experiences" :key="index" :class="[
                            'relative flex flex-col md:flex-row md:items-center',
                            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        ]">
                            <div
                                class="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 border-[#6d28d9] bg-[#121212] z-10">
                            </div>

                            <div class="ml-8 md:ml-0 md:w-1/2" :class="index % 2 === 0 ? 'md:pr-10' : 'md:pl-10'">
                                <div
                                    class="bg-[#1e1e1e] p-4 rounded-lg border border-[#333] hover:border-[#6d28d9] transition-all">
                                    <span
                                        class="inline-block px-3 py-1 bg-[#2d2d2d] text-[#6d28d9] text-xs rounded-full mb-2">{{
                                            exp.period }}</span>
                                    <h3 class="text-white font-bold text-lg mb-1">{{ exp.role }}</h3>
                                    <h4 class="text-gray-400 mb-3">{{ exp.company }}</h4>
                                    <p class="text-gray-300 text-sm">{{ exp.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-16">
                <h2 class="text-xl sm:text-2xl mb-6 text-center modern-section-title">
                    <span class="accent">—</span> EDUCATION
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="(edu, index) in education" :key="index"
                        class="bg-[#1e1e1e] p-5 rounded-lg border border-[#333] hover:border-[#6d28d9] transition-all">
                        <div class="flex items-start">
                            <div class="bg-[#2d2d2d] p-2 rounded-lg mr-4">
                                <AcademicCapIcon class="w-6 h-6 text-[#6d28d9]" />
                            </div>
                            <div>
                                <span class="text-xs bg-[#2d2d2d] text-[#6d28d9] px-2 py-0.5 rounded-full">{{ edu.period
                                    }}</span>
                                <h3 class="text-white font-bold text-lg mt-1 mb-1">{{ edu.degree }}</h3>
                                <h4 class="text-gray-400 mb-2">{{ edu.institution }}</h4>
                                <p class="text-gray-300 text-sm">{{ edu.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-12 lg:mt-16 flex justify-center mb-16 md:mb-0">
                <router-link to="/portfolio"
                    class="bg-[#6d28d9] hover:bg-[#5b21b6] text-white transition-all duration-300 px-6 py-3 rounded-full inline-flex items-center font-medium text-base sm:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    VIEW MY PROJECTS
                    <span
                        class="ml-2 bg-white text-[#6d28d9] rounded-full w-6 h-6 flex items-center justify-center text-sm">→</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {
    UserIcon,
    GlobeAltIcon,
    BriefcaseIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    DocumentTextIcon,
    AcademicCapIcon
} from '@heroicons/vue/24/solid'

export default {
    name: 'About',
    components: {
        UserIcon,
        GlobeAltIcon,
        BriefcaseIcon,
        MapPinIcon,
        PhoneIcon,
        EnvelopeIcon,
        DocumentTextIcon,
        AcademicCapIcon
    },
    data() {
        return {
            technologies: [
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
                { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
                { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
                { name: 'Golang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg' },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' }
            ],
            experiences: [
                {
                    period: '2023 - Present',
                    role: 'Lead Full Stack Engineer',
                    company: 'TechVision Inc.',
                    description: 'Leading cross-functional development teams in building scalable cloud-native applications. Architecting microservices with Vue.js, TypeScript, and Node.js. Implementing CI/CD pipelines and automated testing strategies that reduced deployment time by 65%.'
                },
                {
                    period: '2021 - 2023',
                    role: 'Senior Full Stack Developer',
                    company: 'InnovateSoft',
                    description: 'Developed enterprise-grade applications using Vue.js, GraphQL, and PostgreSQL. Optimized database queries and frontend rendering, improving application performance by 40%. Mentored junior developers and introduced modern development practices.'
                },
                {
                    period: '2019 - 2021',
                    role: 'Frontend Developer',
                    company: 'CreativeTech Solutions',
                    description: 'Built responsive, accessible web applications using modern JavaScript frameworks. Collaborated with UX designers to implement pixel-perfect interfaces. Reduced loading times by 60% through asset optimization and lazy loading techniques.'
                }
            ],
            education: [
                {
                    period: '2015 - 2019',
                    degree: 'Bachelor of Science, Computer Science',
                    institution: 'University of Lagos',
                    description: 'Graduated with first-class honors. Specialized in software engineering, distributed systems, and data structures & algorithms. Completed thesis on optimizing microservice architectures.'
                },
                {
                    period: '2022',
                    degree: 'AWS Certified Solutions Architect',
                    institution: 'Amazon Web Services',
                    description: 'Professional certification validating expertise in designing distributed systems on AWS. Focused on security, reliability, and performance efficiency in cloud architecture.'
                },
                {
                    period: '2020',
                    degree: 'Advanced Frontend Development',
                    institution: 'Tech Academy Online',
                    description: 'Intensive program covering modern JavaScript frameworks, state management, responsive design patterns, and frontend performance optimization techniques.'
                }
            ]
        }
    },
    mounted() {
        this.animateProgressBars();
        window.addEventListener('scroll', this.animateProgressBars);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.animateProgressBars);
    },
    methods: {
        animateProgressBars() {
            const bars = document.querySelectorAll('.progress-bar');
            bars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level + '%';
                    bar.style.transition = 'width 1s ease-out';
                }
            });
        }
    }
}
</script>

<style scoped>
.progress-bar {
    width: 0;
}
</style>