<template>
    <div class="w-full min-h-screen flex items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div class="title-with-bg-shadow" data-text="MY PORTFOLIO">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl mb-8 text-center modern-title">
                    <span class="accent">—</span> MY PORTFOLIO
                </h1>
            </div>

            <div class="flex flex-nowrap justify-start md:justify-center gap-1 sm:gap-3 mb-12 pb-2">
                <button @click="setActiveFilter('all')" :class="[
                    'px-2 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 filter-button whitespace-nowrap',
                    activeFilter === 'all'
                        ? 'bg-[#6d28d9] text-white filter-active shadow-glow'
                        : 'bg-[#1e1e1e]/70 text-gray-300 hover:bg-[#2d2d2d] backdrop-blur-sm border border-white/10'
                ]">
                    All Projects
                </button>
                <button @click="setActiveFilter('web')" :class="[
                    'px-2 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 filter-button whitespace-nowrap',
                    activeFilter === 'web'
                        ? 'bg-[#6d28d9] text-white filter-active shadow-glow'
                        : 'bg-[#1e1e1e]/70 text-gray-300 hover:bg-[#2d2d2d] backdrop-blur-sm border border-white/10'
                ]">
                    Web Apps
                </button>
                <button @click="setActiveFilter('mobile')" :class="[
                    'px-2 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 filter-button whitespace-nowrap',
                    activeFilter === 'mobile'
                        ? 'bg-[#6d28d9] text-white filter-active shadow-glow'
                        : 'bg-[#1e1e1e]/70 text-gray-300 hover:bg-[#2d2d2d] backdrop-blur-sm border border-white/10'
                ]">
                    Mobile Apps
                </button>
                <button @click="setActiveFilter('ui')" :class="[
                    'px-2 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 filter-button whitespace-nowrap',
                    activeFilter === 'ui'
                        ? 'bg-[#6d28d9] text-white filter-active shadow-glow'
                        : 'bg-[#1e1e1e]/70 text-gray-300 hover:bg-[#2d2d2d] backdrop-blur-sm border border-white/10'
                ]">
                    UI/UX Design
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" ref="projectsGrid">
                <div v-for="(project, index) in filteredProjects" :key="index"
                    class="project-card bg-[#1e1e1e]/70 rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-sm border border-white/5 hover:border-[#6d28d9]/50 group"
                    @click="toggleProjectActive(index)">
                    <div class="relative overflow-hidden project-image-container">
                        <img :src="project.image" :alt="project.title"
                            class="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110">

                        <div
                            class="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60">
                        </div>

                        <div :class="['absolute inset-0 bg-gradient-to-b from-[#6d28d9]/80 to-[#4c1d95]/80 flex items-center justify-center gap-6 transition-all duration-500',
                            (isMobile && activeProjectIndex === index) || !isMobile ? 'md:opacity-0 md:group-hover:opacity-100' : 'opacity-0',
                            (isMobile && activeProjectIndex === index) ? 'opacity-100' : '']">
                            <router-link :to="'/portfolio/' + project.id"
                                class="bg-white text-[#6d28d9] p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:shadow-glow"
                                @click.stop>
                                <EyeIcon class="w-5 h-5" />
                            </router-link>
                            <a :href="project.codeUrl" target="_blank"
                                class="bg-white text-[#6d28d9] p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:shadow-glow"
                                @click.stop>
                                <CodeBracketIcon class="w-5 h-5" />
                            </a>
                        </div>

                        <div class="absolute top-4 left-4">
                            <span
                                class="text-xs font-bold bg-[#6d28d9]/80 text-white px-3 py-1 rounded-full backdrop-blur-sm">{{
                                    project.year }}</span>
                        </div>
                    </div>

                    <div class="p-6">
                        <router-link :to="'/portfolio/' + project.id" class="hover:text-[#6d28d9] transition-colors">
                            <h3
                                class="font-bold text-xl text-white mb-2 group-hover:text-[#6d28d9] transition-colors duration-300">
                                {{ project.title }}</h3>
                        </router-link>
                        <p class="text-gray-300 text-sm mb-4 line-clamp-2">{{ project.description }}</p>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="(tech, i) in project.technologies" :key="i"
                                class="text-xs bg-[#2d2d2d]/70 text-gray-300 px-2.5 py-1 rounded-full backdrop-blur-sm hover:bg-[#6d28d9]/20 hover:text-white transition-colors duration-300">{{
                                    tech }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mt-16">
                <a href="https://github.com/eminisolomon" target="_blank"
                    class="cta-button bg-[#1e1e1e]/70 hover:bg-[#2d2d2d] text-white transition-all duration-300 px-8 py-4 rounded-xl inline-flex items-center font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-sm border border-white/10">
                    MORE ON GITHUB
                    <span
                        class="ml-3 bg-[#6d28d9] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm transition-transform duration-300 group-hover:rotate-45">
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
import { projects } from '../constants/projects';

export default {
    name: 'Portfolio',
    components: {
        EyeIcon,
        CodeBracketIcon
    },
    data() {
        return {
            activeFilter: 'all',
            projects,
            isMobile: false,
            activeProjectIndex: null,
            ticking: false
        }
    },
    computed: {
        filteredProjects() {
            if (this.activeFilter === 'all') {
                return this.projects;
            }
            return this.projects.filter(project => project.category === this.activeFilter);
        }
    },
    mounted() {
        this.checkIfMobile();
        this.animateProjectCards();
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.checkIfMobile);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.checkIfMobile);
    },
    methods: {
        checkIfMobile() {
            this.isMobile = window.innerWidth < 768;
            if (!this.isMobile) {
                this.activeProjectIndex = null;
            }
        },
        toggleProjectActive(index) {
            if (!this.isMobile) return;
            if (this.activeProjectIndex === index) {
                this.activeProjectIndex = null;
            } else {
                this.activeProjectIndex = index;
            }
        },
        handleScroll() {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.animateProjectCards();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        },
        animateProjectCards() {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                if (this.isInViewport(card)) {
                    setTimeout(() => {
                        card.classList.add('fadeInUp');
                    }, index * 100);
                }
            });
        },
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
                rect.bottom >= 0
            );
        },
        setActiveFilter(filter) {
            this.activeFilter = filter;
            this.activeProjectIndex = null;

            this.$nextTick(() => {
                const projectCards = document.querySelectorAll('.project-card');
                projectCards.forEach((card) => {
                    card.classList.remove('fadeInUp');
                    void card.offsetWidth;
                });
                setTimeout(() => {
                    this.animateProjectCards();
                }, 50);
            });
        }
    }
}
</script>

<style scoped>
.filter-button {
    position: relative;
    overflow: hidden;
}

.filter-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: rgba(109, 40, 217, 0.1);
    transition: width 0.3s ease;
    z-index: -1;
}

.filter-button:hover::after {
    width: 100%;
}

.filter-active {
    position: relative;
}

.filter-active::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 2px;
    background-color: white;
    border-radius: 2px;
}

.project-card {
    opacity: 0;
    transform: translateY(20px);
}

.project-card.fadeInUp {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.shadow-glow {
    box-shadow: 0 0 15px rgba(109, 40, 217, 0.4);
}

.project-image-container {
    position: relative;
}

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
    background: radial-gradient(circle, rgba(109, 40, 217, 0.2) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.cta-button:hover::after {
    opacity: 1;
}
</style>