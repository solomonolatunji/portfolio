<template>
    <div class="w-full min-h-screen flex items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <!-- Restored original title -->
            <div class="title-with-bg-shadow" data-text="ABOUT ME">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl mb-8 text-center modern-title">
                    <span class="accent">—</span> ABOUT ME
                </h1>
            </div>

            <div class="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12">
                <!-- Modernized profile image with floating animation and gradient border -->
                <div class="w-full md:w-1/3 flex items-center justify-center mb-8 md:mb-0">
                    <div class="relative floating">
                        <div class="profile-gradient absolute inset-0 rounded-full animate-spin-slow"></div>
                        <div
                            class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-[#6d28d9] profile-image-container">
                            <img src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Solomon Olatunji"
                                class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>
                </div>

                <!-- Modernized profile info with glass-morphism card -->
                <div class="w-full md:w-2/3">
                    <div class="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div class="grid grid-cols-2 gap-y-4 gap-x-4 sm:gap-x-6">
                            <div class="mb-2 info-item hover:translate-x-1 transition-transform">
                                <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                    <UserIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                    First Name:
                                </p>
                                <p class="text-white font-medium text-base sm:text-lg">Solomon</p>
                            </div>
                            <div class="mb-2 info-item hover:translate-x-1 transition-transform">
                                <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                    <UserIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                    Last Name:
                                </p>
                                <p class="text-white font-medium text-base sm:text-lg">Olatunji</p>
                            </div>
                            <div class="mb-2 info-item hover:translate-x-1 transition-transform">
                                <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                    <GlobeAltIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                    Nationality:
                                </p>
                                <p class="text-white font-medium text-base sm:text-lg">Nigerian</p>
                            </div>
                            <div class="mb-2 info-item hover:translate-x-1 transition-transform">
                                <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                    <BriefcaseIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                    Freelance:
                                </p>
                                <p class="text-white font-medium text-base sm:text-lg">Available</p>
                            </div>
                            <div class="mb-2 info-item hover:translate-x-1 transition-transform">
                                <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                    <MapPinIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                    Address:
                                </p>
                                <p class="text-white font-medium text-base sm:text-lg">Ilorin, Nigeria</p>
                            </div>
                            <div class="mb-2 info-item hover:translate-x-1 transition-transform">
                                <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                    <PhoneIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                    Phone:
                                </p>
                                <p class="text-white font-medium text-base sm:text-lg">+2349017818024</p>
                            </div>
                            <div class="mb-2 col-span-2 info-item hover:translate-x-1 transition-transform">
                                <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                    <EnvelopeIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                    Email:
                                </p>
                                <p class="text-white font-medium text-base sm:text-lg break-all">
                                    hello@solomonolatunji.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modernized skills section with animated cards -->
            <div class="mt-16 lg:mt-24" id="skills-section">
                <div class="section-title mb-10 text-center">
                    <h2 class="text-2xl sm:text-3xl font-bold text-white">
                        <span class="text-[#6d28d9]">—</span> MY SKILLS
                    </h2>
                    <div class="h-1 w-16 bg-[#6d28d9] mx-auto mt-4"></div>
                </div>

                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8">
                    <div v-for="(tech, index) in technologies" :key="index"
                        class="skill-card p-4 backdrop-blur-sm border border-white/10 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:transform hover:scale-110 hover:shadow-glow">
                        <img :src="tech.icon" :alt="tech.name" class="w-12 h-12 mb-3 animate-pulse-slow" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">{{ tech.name }}</span>
                    </div>
                </div>
            </div>

            <!-- Modernized experience timeline -->
            <div class="mt-20" id="experience-section">
                <div class="section-title mb-10 text-center">
                    <h2 class="text-2xl sm:text-3xl font-bold text-white">
                        <span class="text-[#6d28d9]">—</span> EXPERIENCE
                    </h2>
                    <div class="h-1 w-16 bg-[#6d28d9] mx-auto mt-4"></div>
                </div>

                <div class="relative">
                    <div
                        class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#6d28d9]/30 via-[#6d28d9] to-[#6d28d9]/30">
                    </div>

                    <div class="flex flex-col space-y-12">
                        <div v-for="(exp, index) in experiences" :key="index" :class="[
                            'relative flex flex-col md:flex-row md:items-center timeline-item',
                            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        ]">
                            <div
                                class="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-[#6d28d9] bg-[#121212] z-10 timeline-dot">
                            </div>

                            <div class="ml-8 md:ml-0 md:w-1/2" :class="index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'">
                                <div
                                    class="bg-[#1e1e1e]/70 p-6 rounded-xl border border-[#333] hover:border-[#6d28d9] transition-all duration-300 shadow-xl hover:shadow-[#6d28d9]/20 timeline-card">
                                    <span
                                        class="inline-block px-4 py-1.5 bg-[#2d2d2d] text-[#6d28d9] text-xs font-bold rounded-full mb-3">{{
                                            exp.period }}</span>
                                    <h3 class="text-white font-bold text-xl mb-2">{{ exp.role }}</h3>
                                    <h4 class="text-[#6d28d9]/90 mb-3 font-medium">{{ exp.company }}</h4>
                                    <p class="text-gray-300 text-sm leading-relaxed">{{ exp.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modernized education section -->
            <div class="mt-20" id="education-section">
                <div class="section-title mb-10 text-center">
                    <h2 class="text-2xl sm:text-3xl font-bold text-white">
                        <span class="text-[#6d28d9]">—</span> EDUCATION
                    </h2>
                    <div class="h-1 w-16 bg-[#6d28d9] mx-auto mt-4"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div v-for="(edu, index) in education" :key="index"
                        class="glass-card p-6 rounded-xl border border-white/10 hover:border-[#6d28d9] transition-all duration-300 shadow-xl hover:shadow-[#6d28d9]/20 backdrop-blur-sm edu-card">
                        <div class="flex items-start">
                            <div class="bg-[#6d28d9]/20 p-3 rounded-lg mr-4 edu-icon">
                                <AcademicCapIcon class="w-7 h-7 text-[#6d28d9]" />
                            </div>
                            <div>
                                <span class="text-xs bg-[#2d2d2d] text-[#6d28d9] px-3 py-1 rounded-full font-bold">{{
                                    edu.period
                                    }}</span>
                                <h3 class="text-white font-bold text-xl mt-2 mb-1">{{ edu.degree }}</h3>
                                <h4 class="text-[#6d28d9]/80 mb-3 font-medium">{{ edu.institution }}</h4>
                                <p class="text-gray-300 text-sm leading-relaxed">{{ edu.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modernized CTA button -->
            <div class="mt-16 lg:mt-20 flex justify-center mb-16 md:mb-0">
                <router-link to="/portfolio"
                    class="cta-button bg-[#6d28d9] hover:bg-[#5b21b6] text-white transition-all duration-300 px-8 py-4 rounded-xl inline-flex items-center font-bold text-base sm:text-lg shadow-lg hover:shadow-[#6d28d9]/50 transform hover:-translate-y-1">
                    VIEW MY PROJECTS
                    <span
                        class="ml-3 bg-white text-[#6d28d9] rounded-full w-7 h-7 flex items-center justify-center text-sm">→</span>
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
        this.animateElements();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        animateElements() {
            // Initialize animations for elements that are initially visible
            this.animateOnScroll();
        },
        handleScroll() {
            // Throttle the scroll event
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.animateOnScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        },
        animateOnScroll() {
            // Animate elements when they come into view
            const sections = ['skills-section', 'experience-section', 'education-section'];
            sections.forEach(section => {
                const el = document.getElementById(section);
                if (el && this.isInViewport(el)) {
                    el.classList.add('fade-in-section');
                }
            });

            // Animate timeline items
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                if (this.isInViewport(item)) {
                    item.classList.add('timeline-item-visible');
                }
            });

            // Animate education cards
            const eduCards = document.querySelectorAll('.edu-card');
            eduCards.forEach(card => {
                if (this.isInViewport(card)) {
                    card.classList.add('edu-card-visible');
                }
            });
        },
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
    }
}
</script>

<style scoped>
/* Glass morphism effect */
.glass-card {
    background: rgba(30, 30, 30, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
    backdrop-filter: blur(8px);
}

/* Animations */
@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}

.floating {
    animation: float 6s ease-in-out infinite;
}

@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 12s linear infinite;
}

@keyframes pulse-slow {
    0% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.6;
    }
}

.animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
}

/* Profile image gradient border */
.profile-gradient {
    background: linear-gradient(135deg, #6d28d9, #9333ea, #6d28d9, #4c1d95);
    opacity: 0.5;
    transform: scale(1.05);
    filter: blur(8px);
}

.profile-image-container {
    position: relative;
    z-index: 1;
}

/* Shadow effects */
.shadow-glow {
    box-shadow: 0 0 15px rgba(109, 40, 217, 0.5);
}

/* Timeline animations */
.timeline-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.timeline-item-visible {
    opacity: 1;
    transform: translateY(0);
}

.timeline-dot {
    box-shadow: 0 0 0 4px rgba(109, 40, 217, 0.3);
}

/* Section fade in animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-section {
    animation: fadeIn 1s ease forwards;
}

/* Education card animations */
.edu-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.edu-card-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Skill card hover effect */
.skill-card {
    background: rgba(30, 30, 30, 0.3);
    overflow: hidden;
    position: relative;
}

.skill-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(109, 40, 217, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.skill-card:hover::before {
    opacity: 1;
}

/* Info item hover effect */
.info-item {
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.info-item:hover {
    background-color: rgba(109, 40, 217, 0.1);
}

/* CTA button glow effect */
.cta-button {
    position: relative;
    overflow: hidden;
}

.cta-button::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.cta-button:hover::after {
    opacity: 1;
}
</style>