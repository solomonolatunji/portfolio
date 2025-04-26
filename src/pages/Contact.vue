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
                        <a href="https://wa.me/2348130690998" target="_blank"
                            class="social-link bg-[#1e1e1e]/50 hover:bg-[#2d2d2d]/70 text-white border border-white/5 hover:border-[#6d28d9]/30 p-5 rounded-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center backdrop-blur-sm">
                            <div class="bg-[#2d2d2d]/80 p-3 rounded-full mb-3 social-icon-container">
                                <svg class="w-6 h-6 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                            <span class="text-sm text-gray-300 font-medium">WhatsApp</span>
                        </a>
                        <a href="https://t.me/eminisolomon" target="_blank"
                            class="social-link bg-[#1e1e1e]/50 hover:bg-[#2d2d2d]/70 text-white border border-white/5 hover:border-[#6d28d9]/30 p-5 rounded-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center backdrop-blur-sm">
                            <div class="bg-[#2d2d2d]/80 p-3 rounded-full mb-3 social-icon-container">
                                <svg class="w-6 h-6 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </div>
                            <span class="text-sm text-gray-300 font-medium">Telegram</span>
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
