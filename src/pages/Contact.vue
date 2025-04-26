<template>
    <div class="w-full min-h-screen flex items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div class="title-with-bg-shadow" data-text="CONTACT ME">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl mb-8 text-center modern-title">
                    <span class="accent">—</span> CONTACT ME
                </h1>
            </div>

            <div class="flex flex-col md:flex-row gap-10 lg:gap-16">
                <div class="w-full md:w-7/12 animate-slideUp flex flex-col">
                    <div
                        class="glass-card p-7 sm:p-8 rounded-xl shadow-xl border border-white/10 hover:border-[#6d28d9]/50 transition-all duration-300 h-full backdrop-blur-sm">
                        <h2 class="text-xl font-bold mb-7 flex items-center">
                            <div class="p-2 rounded-lg bg-[#6d28d9]/20 mr-3">
                                <PaperAirplaneIcon class="w-5 h-5 text-[#6d28d9]" />
                            </div>
                            Send Me a Message
                        </h2>

                        <form @submit.prevent="submitForm" class="space-y-6">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div class="form-group">
                                    <label for="name" class="text-sm text-gray-400 mb-1.5 flex items-center">
                                        <UserIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                        Name
                                    </label>
                                    <div class="relative">
                                        <input type="text" id="name" v-model="form.name"
                                            class="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-transparent text-white transition-all duration-300"
                                            required>
                                        <div class="form-input-highlight"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="text-sm text-gray-400 mb-1.5 flex items-center">
                                        <EnvelopeIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                        Email
                                    </label>
                                    <div class="relative">
                                        <input type="email" id="email" v-model="form.email"
                                            class="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-transparent text-white transition-all duration-300"
                                            required>
                                        <div class="form-input-highlight"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="subject" class="text-sm text-gray-400 mb-1.5 flex items-center">
                                    <TagIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                    Subject
                                </label>
                                <div class="relative">
                                    <input type="text" id="subject" v-model="form.subject"
                                        class="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-transparent text-white transition-all duration-300"
                                        required>
                                    <div class="form-input-highlight"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="message" class="text-sm text-gray-400 mb-1.5 flex items-center">
                                    <ChatBubbleLeftRightIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                    Message
                                </label>
                                <div class="relative">
                                    <textarea id="message" v-model="form.message" rows="5"
                                        class="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-transparent text-white resize-none transition-all duration-300"
                                        required></textarea>
                                    <div class="form-input-highlight"></div>
                                </div>
                            </div>

                            <button type="submit"
                                class="cta-button bg-[#6d28d9] hover:bg-[#5b21b6] text-white transition-all duration-300 px-8 py-4 rounded-xl font-medium text-base shadow-lg hover:shadow-[#6d28d9]/30 transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center"
                                :disabled="submitting">
                                <span v-if="submitting" class="flex items-center">
                                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Sending...
                                </span>
                                <span v-else class="flex items-center">
                                    Send Message
                                    <span
                                        class="ml-3 bg-white text-[#6d28d9] rounded-full w-6 h-6 flex items-center justify-center text-sm">→</span>
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                <div class="w-full md:w-5/12 flex flex-col">
                    <div
                        class="glass-card p-7 sm:p-8 rounded-xl shadow-xl border border-white/10 hover:border-[#6d28d9]/50 transition-all duration-300 animate-slideDown delay-300 h-full backdrop-blur-sm">
                        <h2 class="text-xl font-bold mb-8 flex items-center">
                            <div class="p-2 rounded-lg bg-[#6d28d9]/20 mr-3">
                                <InformationCircleIcon class="w-5 h-5 text-[#6d28d9]" />
                            </div>
                            Contact Information
                        </h2>

                        <div class="space-y-6">
                            <div
                                class="contact-info-item flex items-start transition-transform duration-300 hover:-translate-y-1 hover:bg-[#2d2d2d]/30 p-3 rounded-lg group">
                                <div
                                    class="bg-[#2d2d2d]/80 p-3 rounded-xl mr-4 border border-[#333] group-hover:border-[#6d28d9]/50 group-hover:bg-[#6d28d9]/20 transition-all duration-300">
                                    <MapPinIcon class="w-5 h-5 text-[#6d28d9]" />
                                </div>
                                <div>
                                    <h3 class="text-gray-200 font-medium mb-1 group-hover:text-white transition-colors">
                                        Location</h3>
                                    <p class="text-gray-400">Ilorin, Nigeria</p>
                                </div>
                            </div>

                            <div
                                class="contact-info-item flex items-start transition-transform duration-300 hover:-translate-y-1 hover:bg-[#2d2d2d]/30 p-3 rounded-lg group">
                                <div
                                    class="bg-[#2d2d2d]/80 p-3 rounded-xl mr-4 border border-[#333] group-hover:border-[#6d28d9]/50 group-hover:bg-[#6d28d9]/20 transition-all duration-300">
                                    <EnvelopeIcon class="w-5 h-5 text-[#6d28d9]" />
                                </div>
                                <div>
                                    <h3 class="text-gray-200 font-medium mb-1 group-hover:text-white transition-colors">
                                        Email</h3>
                                    <a href="mailto:hello@solomonolatunji.com"
                                        class="text-gray-400 break-all hover:text-[#6d28d9] transition-colors duration-300">hello@solomonolatunji.com</a>
                                </div>
                            </div>

                            <div
                                class="contact-info-item flex items-start transition-transform duration-300 hover:-translate-y-1 hover:bg-[#2d2d2d]/30 p-3 rounded-lg group">
                                <div
                                    class="bg-[#2d2d2d]/80 p-3 rounded-xl mr-4 border border-[#333] group-hover:border-[#6d28d9]/50 group-hover:bg-[#6d28d9]/20 transition-all duration-300">
                                    <PhoneIcon class="w-5 h-5 text-[#6d28d9]" />
                                </div>
                                <div>
                                    <h3 class="text-gray-200 font-medium mb-1 group-hover:text-white transition-colors">
                                        Phone</h3>
                                    <a href="tel:+2349017818024"
                                        class="text-gray-400 hover:text-[#6d28d9] transition-colors duration-300">+2349017818024</a>
                                </div>
                            </div>

                            <div
                                class="contact-info-item flex items-start transition-transform duration-300 hover:-translate-y-1 hover:bg-[#2d2d2d]/30 p-3 rounded-lg group">
                                <div
                                    class="bg-[#2d2d2d]/80 p-3 rounded-xl mr-4 border border-[#333] group-hover:border-[#6d28d9]/50 group-hover:bg-[#6d28d9]/20 transition-all duration-300">
                                    <BriefcaseIcon class="w-5 h-5 text-[#6d28d9]" />
                                </div>
                                <div>
                                    <h3 class="text-gray-200 font-medium mb-1 group-hover:text-white transition-colors">
                                        Freelance</h3>
                                    <p class="text-gray-400">Available for hire</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-14">
                <div
                    class="glass-card p-7 sm:p-8 rounded-xl shadow-xl border border-white/10 hover:border-[#6d28d9]/50 transition-all duration-300 animate-slideDown delay-500 backdrop-blur-sm">
                    <h2 class="text-xl font-bold mb-8 flex items-center">
                        <div class="p-2 rounded-lg bg-[#6d28d9]/20 mr-3">
                            <GlobeAltIcon class="w-5 h-5 text-[#6d28d9]" />
                        </div>
                        FIND ME ON
                    </h2>

                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
                        <a href="https://github.com/eminisolomon" target="_blank"
                            class="social-link bg-[#1e1e1e]/50 hover:bg-[#2d2d2d]/70 text-white border border-white/5 hover:border-[#6d28d9]/30 p-5 rounded-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center backdrop-blur-sm">
                            <div class="bg-[#2d2d2d]/80 p-3 rounded-full mb-3 social-icon-container">
                                <svg class="w-6 h-6 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </div>
                            <span class="text-sm text-gray-300 font-medium">GitHub</span>
                        </a>
                        <a href="https://twitter.com/eminisolomon" target="_blank"
                            class="social-link bg-[#1e1e1e]/50 hover:bg-[#2d2d2d]/70 text-white border border-white/5 hover:border-[#6d28d9]/30 p-5 rounded-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center backdrop-blur-sm">
                            <div class="bg-[#2d2d2d]/80 p-3 rounded-full mb-3 social-icon-container">
                                <svg class="w-6 h-6 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.159 1.2A4.92 4.92 0 0012.09 7.05a4.97 4.97 0 00.125 1.12A14.09 14.09 0 011.64 3.16a4.822 4.822 0 00-.665 2.473c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.95 4.829 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                </svg>
                            </div>
                            <span class="text-sm text-gray-300 font-medium">Twitter</span>
                        </a>
                        <a href="https://linkedin.com/in/eminisolomon" target="_blank"
                            class="social-link bg-[#1e1e1e]/50 hover:bg-[#2d2d2d]/70 text-white border border-white/5 hover:border-[#6d28d9]/30 p-5 rounded-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center backdrop-blur-sm">
                            <div class="bg-[#2d2d2d]/80 p-3 rounded-full mb-3 social-icon-container">
                                <svg class="w-6 h-6 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <span class="text-sm text-gray-300 font-medium">LinkedIn</span>
                        </a>
                        <a href="#" target="_blank"
                            class="social-link bg-[#1e1e1e]/50 hover:bg-[#2d2d2d]/70 text-white border border-white/5 hover:border-[#6d28d9]/30 p-5 rounded-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center backdrop-blur-sm">
                            <div class="bg-[#2d2d2d]/80 p-3 rounded-full mb-3 social-icon-container">
                                <svg class="w-6 h-6 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                            <span class="text-sm text-gray-300 font-medium">Instagram</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="mt-14 text-center animate-slideUp delay-700">
                <h3 class="text-lg font-medium text-gray-300 mb-6">Want to see my work?</h3>
                <router-link to="/portfolio"
                    class="cta-button bg-[#6d28d9] hover:bg-[#5b21b6] text-white transition-all duration-300 px-8 py-4 rounded-xl inline-flex items-center font-bold text-base shadow-lg hover:shadow-[#6d28d9]/50 transform hover:-translate-y-1">
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
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    BriefcaseIcon,
    UserIcon,
    PaperAirplaneIcon,
    TagIcon,
    ChatBubbleLeftRightIcon,
    InformationCircleIcon,
    GlobeAltIcon
} from '@heroicons/vue/24/solid'

export default {
    name: 'Contact',
    components: {
        MapPinIcon,
        PhoneIcon,
        EnvelopeIcon,
        BriefcaseIcon,
        UserIcon,
        PaperAirplaneIcon,
        TagIcon,
        ChatBubbleLeftRightIcon,
        InformationCircleIcon,
        GlobeAltIcon
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
            submitting: false
        }
    },
    methods: {
        submitForm() {
            this.submitting = true;
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.form = {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                };
                this.submitting = false;
            }, 2000);
        }
    }
}
</script>

<style scoped>
.glass-card {
    background: rgba(30, 30, 30, 0.5);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
}

.form-group {
    position: relative;
}

.form-input-highlight {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #6d28d9;
    transition: width 0.3s ease, left 0.3s ease;
}

.form-group input:focus~.form-input-highlight,
.form-group textarea:focus~.form-input-highlight {
    width: 100%;
    left: 0;
}

.social-icon-container {
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.social-link:hover .social-icon-container {
    transform: scale(1.1) rotate(5deg);
    background-color: rgba(109, 40, 217, 0.2);
}

.animate-blink {
    animation: blink 1s step-end infinite;
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

.contact-info-item {
    transition: all 0.3s ease;
}
</style>
