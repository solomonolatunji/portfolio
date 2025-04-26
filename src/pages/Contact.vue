<template>
    <div class="w-full min-h-screen pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-12">
            <div class="title-with-bg-shadow" data-text="CONTACT ME">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl mb-8 text-center modern-title">
                    <span class="accent">—</span> CONTACT ME
                </h1>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 contact-row">
                <div class="lg:col-span-1">
                    <div class="contact-card space-y-10 h-full flex flex-col">
                        <div>
                            <h2 class="text-xl font-semibold mb-6 text-white flex items-center">
                                <span
                                    class="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                    <UserIcon class="w-4 h-4 text-white" />
                                </span>
                                Connect With Me
                            </h2>

                            <div class="space-y-5">
                                <a href="mailto:hello@solomonolatunji.com"
                                    class="flex items-center p-4 bg-[#141414] hover:bg-[#1a1a1a] rounded-xl transition-all group border border-transparent hover:border-[#6d28d9]/20">
                                    <div
                                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                        <EnvelopeIcon class="w-5 h-5 text-[#6d28d9]" />
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-400">Email Me At</p>
                                        <p class="text-white font-medium">hello@solomonolatunji.com</p>
                                    </div>
                                </a>

                                <a href="tel:+2349017818024"
                                    class="flex items-center p-4 bg-[#141414] hover:bg-[#1a1a1a] rounded-xl transition-all group border border-transparent hover:border-[#6d28d9]/20">
                                    <div
                                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                        <PhoneIcon class="w-5 h-5 text-[#6d28d9]" />
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-400">Call Me</p>
                                        <p class="text-white font-medium">+2349017818024</p>
                                    </div>
                                </a>

                                <div
                                    class="flex items-center p-4 bg-[#141414] hover:bg-[#1a1a1a] rounded-xl transition-all group border border-transparent hover:border-[#6d28d9]/20">
                                    <div
                                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                        <MapPinIcon class="w-5 h-5 text-[#6d28d9]" />
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-400">Location</p>
                                        <p class="text-white font-medium">Ilorin, Nigeria</p>
                                    </div>
                                </div>

                                <div
                                    class="flex items-center p-4 bg-[#141414] hover:bg-[#1a1a1a] rounded-xl transition-all group border border-transparent hover:border-[#6d28d9]/20">
                                    <div
                                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                        <BriefcaseIcon class="w-5 h-5 text-[#6d28d9]" />
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-400">Availability</p>
                                        <p class="text-white font-medium">Available for hire</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-auto">
                            <h2 class="text-xl font-semibold mb-6 text-white flex items-center">
                                <span
                                    class="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                    <GlobeAltIcon class="w-4 h-4 text-white" />
                                </span>
                                Social Profiles
                            </h2>

                            <div class="grid grid-cols-2 gap-4">
                                <a href="https://github.com/eminisolomon" target="_blank"
                                    class="social-btn flex flex-col items-center justify-center p-4 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-transparent hover:border-[#6d28d9]/20 transition-all">
                                    <div
                                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-full flex items-center justify-center mb-2 social-icon-wrapper">
                                        <svg class="w-5 h-5 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </div>
                                    <span class="text-sm text-gray-300">GitHub</span>
                                </a>

                                <a href="https://twitter.com/eminisolomon" target="_blank"
                                    class="social-btn flex flex-col items-center justify-center p-4 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-transparent hover:border-[#6d28d9]/20 transition-all">
                                    <div
                                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-full flex items-center justify-center mb-2 social-icon-wrapper">
                                        <svg class="w-5 h-5 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.159 1.2A4.92 4.92 0 0012.09 7.05a4.97 4.97 0 00.125 1.12A14.09 14.09 0 011.64 3.16a4.822 4.822 0 00-.665 2.473c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.95 4.829 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                        </svg>
                                    </div>
                                    <span class="text-sm text-gray-300">Twitter</span>
                                </a>

                                <a href="https://wa.me/2348130690998" target="_blank"
                                    class="social-btn flex flex-col items-center justify-center p-4 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-transparent hover:border-[#6d28d9]/20 transition-all">
                                    <div
                                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-full flex items-center justify-center mb-2 social-icon-wrapper">
                                        <svg class="w-5 h-5 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </div>
                                    <span class="text-sm text-gray-300">WhatsApp</span>
                                </a>

                                <a href="https://t.me/eminisolomon" target="_blank"
                                    class="social-btn flex flex-col items-center justify-center p-4 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-transparent hover:border-[#6d28d9]/20 transition-all">
                                    <div
                                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-full flex items-center justify-center mb-2 social-icon-wrapper">
                                        <svg class="w-5 h-5 text-[#6d28d9]" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                        </svg>
                                    </div>
                                    <span class="text-sm text-gray-300">Telegram</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2">
                    <div
                        class="bg-[#141414] rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#222] relative overflow-hidden h-full">
                        <div
                            class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#6d28d9]/10 to-transparent rounded-full blur-3xl">
                        </div>
                        <div
                            class="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#6d28d9]/10 to-transparent rounded-full blur-3xl">
                        </div>

                        <div class="relative z-10 mb-8">
                            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2">Send a Message</h2>
                            <p class="text-gray-400">I'll get back to you as soon as possible</p>
                        </div>

                        <form @submit.prevent="submitForm" class="space-y-6 relative z-10">
                            <div class="space-y-6">
                                <div class="form-group">
                                    <label for="name" class="text-white font-medium mb-2 block">Name</label>
                                    <div class="relative">
                                        <input type="text" id="name" v-model="form.name"
                                            class="w-full bg-[#1a1a1a] border-2 border-[#333] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#6d28d9] transition-colors"
                                            placeholder="Your name" required>
                                        <UserIcon
                                            class="w-5 h-5 text-[#6d28d9] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="email" class="text-white font-medium mb-2 block">Email</label>
                                    <div class="relative">
                                        <input type="email" id="email" v-model="form.email"
                                            class="w-full bg-[#1a1a1a] border-2 border-[#333] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#6d28d9] transition-colors"
                                            placeholder="Your email" required>
                                        <EnvelopeIcon
                                            class="w-5 h-5 text-[#6d28d9] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="subject" class="text-white font-medium mb-2 block">Subject</label>
                                <div class="relative">
                                    <input type="text" id="subject" v-model="form.subject"
                                        class="w-full bg-[#1a1a1a] border-2 border-[#333] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#6d28d9] transition-colors"
                                        placeholder="Message subject" required>
                                    <TagIcon
                                        class="w-5 h-5 text-[#6d28d9] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="message" class="text-white font-medium mb-2 block">Message</label>
                                <div class="relative">
                                    <textarea id="message" v-model="form.message" rows="5"
                                        class="w-full bg-[#1a1a1a] border-2 border-[#333] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#6d28d9] transition-colors resize-none"
                                        placeholder="Your message" required></textarea>
                                    <ChatBubbleLeftRightIcon
                                        class="w-5 h-5 text-[#6d28d9] absolute right-4 top-6 pointer-events-none" />
                                </div>
                            </div>

                            <div class="flex justify-end">
                                <button type="submit"
                                    class="px-8 py-4 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white text-lg font-medium rounded-xl flex items-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1"
                                    :disabled="submitting">
                                    <span v-if="submitting" class="flex items-center">
                                        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                                        <PaperAirplaneIcon class="w-5 h-5 ml-2 transform rotate-45" />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="mt-20 mb-8 relative">
                <div class="absolute inset-0 bg-[#6d28d9]/5 rounded-2xl"></div>
                <div
                    class="relative z-10 py-12 px-6 md:px-12 rounded-2xl bg-gradient-to-r from-[#141414] via-[#141414] to-[#141414]/90 overflow-hidden border border-[#222]">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-[#6d28d9]/20 rounded-full filter blur-3xl"></div>
                    <div class="absolute bottom-0 left-0 w-64 h-64 bg-[#8b5cf6]/10 rounded-full filter blur-3xl"></div>

                    <div class="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
                        <div>
                            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2">Want to see my work?</h2>
                            <p class="text-gray-400 text-lg">Check out my latest projects and case studies</p>
                        </div>
                        <router-link to="/portfolio"
                            class="flex items-center bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] px-6 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 group">
                            View Projects
                            <ArrowRightIcon
                                class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
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
    GlobeAltIcon,
    ArrowRightIcon
} from '@heroicons/vue/24/solid'
import { useToast } from 'vue-toastification'

const toast = useToast();

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
        GlobeAltIcon,
        ArrowRightIcon
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
                toast.success("Thank you for your message! I will get back to you soon.");
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
.social-btn:hover .social-icon-wrapper {
    transform: translateY(-5px);
}

.social-icon-wrapper {
    transition: transform 0.3s ease;
}

.contact-row {
    display: grid;
    grid-template-rows: 1fr;
}

@media (max-width: 1023px) {
    .contact-card {
        height: auto;
    }
}
</style>
