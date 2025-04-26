<template>
    <div class="w-full pt-24 md:pt-52 lg:pt-64 pb-16 md:pb-20">
        <div class="w-full max-w-5xl mx-auto">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                <div class="w-full md:w-2/5 flex items-center justify-center">
                    <div class="relative floating">
                        <div class="profile-gradient absolute inset-0 rounded-full animate-spin-slow"></div>

                        <div
                            class="profile-image-container w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-[#6d28d9] shadow-xl animate-fadeIn">
                            <img src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Solomon Olatunji"
                                class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        </div>

                        <div
                            class="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#6d28d9] animate-bounce delay-300 shadow-glow">
                        </div>
                        <div
                            class="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#9f7aea] animate-ping delay-700 shadow-glow">
                        </div>
                        <div
                            class="absolute top-1/2 -right-4 w-4 h-4 rounded-full bg-[#4c1d95] animate-pulse shadow-glow">
                        </div>
                    </div>
                </div>

                <div class="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left">
                    <div class="animate-slideDown">
                        <p class="text-[#6d28d9] font-medium mb-3 tracking-wider flex items-center">
                            <span class="w-5 h-0.5 bg-[#6d28d9] mr-2 hidden md:block"></span>
                            HELLO THERE 👋
                        </p>
                        <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                            I'm <span
                                class="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#9f7aea]">SOLOMON
                                OLATUNJI</span>
                        </h1>
                        <h2
                            class="text-lg md:text-xl lg:text-2xl font-medium mb-4 md:mb-6 text-gray-300 flex items-center justify-center md:justify-start typewriter">
                            <span class="mr-3">SOFTWARE ENGINEER</span>
                            <span class="animate-blink">|</span>
                        </h2>
                    </div>

                    <div
                        class="glass-card backdrop-blur-sm p-5 rounded-xl border border-white/10 mb-6 animate-fadeIn delay-300">
                        <p class="text-gray-300 leading-relaxed text-base md:text-lg max-w-2xl">
                            I'm a Full Stack Software Engineer specializing in modern web technologies.
                            With expertise in both frontend and backend development, I create
                            scalable, responsive, and user-friendly digital experiences. Passionate about
                            clean code, performance optimization, and building innovative solutions
                            that deliver real business value.
                        </p>
                    </div>

                    <div class="flex gap-5 mb-8 animate-slideUp delay-500">
                        <a href="https://github.com/eminisolomon" target="_blank"
                            class="social-link bg-[#1e1e1e]/70 hover:bg-[#2d2d2d] border border-white/5 hover:border-[#6d28d9]/30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#6d28d9]" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com/eminisolomon" target="_blank"
                            class="social-link bg-[#1e1e1e]/70 hover:bg-[#2d2d2d] border border-white/5 hover:border-[#6d28d9]/30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#6d28d9]" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.159 1.2A4.92 4.92 0 0012.09 7.05a4.97 4.97 0 00.125 1.12A14.09 14.09 0 011.64 3.16a4.822 4.822 0 00-.665 2.473c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.95 4.829 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com/in/eminisolomon" target="_blank"
                            class="social-link bg-[#1e1e1e]/70 hover:bg-[#2d2d2d] border border-white/5 hover:border-[#6d28d9]/30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#6d28d9]" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>

                    <div class="flex flex-row sm:flex-row gap-4 animate-slideUp delay-700">
                        <router-link to="/about"
                            class="cta-button bg-[#6d28d9] hover:bg-[#5b21b6] text-white transition-all duration-300 px-5 py-2 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl inline-flex items-center font-medium text-sm sm:text-base md:text-lg shadow-md sm:shadow-lg hover:shadow-[#6d28d9]/30 transform hover:-translate-y-1">
                            ABOUT ME
                            <span
                                class="ml-2 sm:ml-3 bg-white text-[#6d28d9] rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm">→</span>
                        </router-link>

                        <router-link to="/contact"
                            class="cta-button bg-[#1e1e1e]/70 hover:bg-[#2d2d2d] text-white border border-white/10 hover:border-[#6d28d9]/30 transition-all duration-300 px-5 py-2 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl inline-flex items-center font-medium text-sm sm:text-base md:text-lg shadow-md sm:shadow-lg backdrop-blur-sm hover:-translate-y-1">
                            <EnvelopeIcon class="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-[#6d28d9]" />
                            CONTACT ME
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EnvelopeIcon } from '@heroicons/vue/24/solid'

export default {
    name: 'Home',
    components: {
        EnvelopeIcon
    }
}
</script>

<style scoped>
.glass-card {
    background: rgba(30, 30, 30, 0.4);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
}

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

.shadow-glow {
    box-shadow: 0 0 15px rgba(109, 40, 217, 0.4);
}

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

.text-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
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
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.cta-button:hover::after {
    opacity: 1;
}

.typewriter {
    overflow: hidden;
    white-space: nowrap;
    border-right: transparent;
    animation: typing 3.5s steps(30, end);
}

@keyframes typing {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}

.animate-blink {
    animation: blink 1s step-end infinite;
}

.social-link {
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.social-link::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(109, 40, 217, 0.15);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
    z-index: -1;
}

.social-link:hover::after {
    width: 120%;
    height: 120%;
}

.animate-fadeIn {
    opacity: 0;
    animation: fadeIn 1s ease forwards;
}

.animate-slideUp {
    opacity: 0;
    animation: slideUp 0.8s ease forwards;
}

.animate-slideDown {
    opacity: 0;
    animation: slideDown 0.8s ease forwards;
}

.delay-300 {
    animation-delay: 300ms;
}

.delay-500 {
    animation-delay: 500ms;
}

.delay-700 {
    animation-delay: 700ms;
}

@keyframes blink {

    from,
    to {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>