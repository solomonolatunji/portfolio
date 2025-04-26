<template>
    <div class="w-full pt-16 md:pt-52 lg:pt-64 pb-16 md:pb-20">
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
                            Full Stack Engineer building modern, scalable web & mobile apps with clean code and
                            performance in
                            mind.
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
                        <a href="https://t.me/eminisolomon" target="_blank"
                            class="social-link bg-[#1e1e1e]/70 hover:bg-[#2d2d2d] border border-white/5 hover:border-[#6d28d9]/30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#6d28d9]" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                        </a>
                        <a href="https://wa.me/2348130690998" target="_blank"
                            class="social-link bg-[#1e1e1e]/70 hover:bg-[#2d2d2d] border border-white/5 hover:border-[#6d28d9]/30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#6d28d9]" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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