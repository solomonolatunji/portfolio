<template>
    <div class="w-full min-h-screen flex items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
                <span class="text-[#6d28d9]">—</span> CONTACT ME
            </h1>

            <div class="flex flex-col md:flex-row gap-10 lg:gap-16">
                <!-- Contact Form -->
                <div class="w-full md:w-7/12">
                    <div class="bg-[#1e1e1e] p-6 sm:p-8 rounded-lg shadow-lg">
                        <h2 class="text-xl font-bold mb-6">Send Me a Message</h2>

                        <form @submit.prevent="submitForm">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label for="name" class="block text-sm text-gray-400 mb-1">Name</label>
                                    <input type="text" id="name" v-model="form.name"
                                        class="w-full px-4 py-2 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                                        required>
                                </div>
                                <div>
                                    <label for="email" class="block text-sm text-gray-400 mb-1">Email</label>
                                    <input type="email" id="email" v-model="form.email"
                                        class="w-full px-4 py-2 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                                        required>
                                </div>
                            </div>

                            <div class="mb-6">
                                <label for="subject" class="block text-sm text-gray-400 mb-1">Subject</label>
                                <input type="text" id="subject" v-model="form.subject"
                                    class="w-full px-4 py-2 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                                    required>
                            </div>

                            <div class="mb-6">
                                <label for="message" class="block text-sm text-gray-400 mb-1">Message</label>
                                <textarea id="message" v-model="form.message" rows="5"
                                    class="w-full px-4 py-2 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white resize-none"
                                    required></textarea>
                            </div>

                            <button type="submit"
                                class="bg-[#6d28d9] hover:bg-[#5b21b6] text-white transition-all duration-300 px-6 py-3 rounded-full font-medium text-base shadow-md hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto"
                                :disabled="submitting">
                                {{ submitting ? 'Sending...' : 'Send Message' }}
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="w-full md:w-5/12">
                    <div class="bg-[#1e1e1e] p-6 sm:p-8 rounded-lg shadow-lg mb-8">
                        <h2 class="text-xl font-bold mb-6">Contact Information</h2>

                        <div class="space-y-5">
                            <div class="flex items-start">
                                <div class="bg-[#2d2d2d] p-3 rounded-full mr-4">
                                    <MapPinIcon class="w-5 h-5 text-[#6d28d9]" />
                                </div>
                                <div>
                                    <h3 class="text-gray-300 font-medium mb-1">Location</h3>
                                    <p class="text-gray-400">Ilorin, Nigeria</p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="bg-[#2d2d2d] p-3 rounded-full mr-4">
                                    <EnvelopeIcon class="w-5 h-5 text-[#6d28d9]" />
                                </div>
                                <div>
                                    <h3 class="text-gray-300 font-medium mb-1">Email</h3>
                                    <p class="text-gray-400 break-all">hello@solomonolatunji.com</p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="bg-[#2d2d2d] p-3 rounded-full mr-4">
                                    <PhoneIcon class="w-5 h-5 text-[#6d28d9]" />
                                </div>
                                <div>
                                    <h3 class="text-gray-300 font-medium mb-1">Phone</h3>
                                    <p class="text-gray-400">+2349017818024</p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="bg-[#2d2d2d] p-3 rounded-full mr-4">
                                    <BriefcaseIcon class="w-5 h-5 text-[#6d28d9]" />
                                </div>
                                <div>
                                    <h3 class="text-gray-300 font-medium mb-1">Freelance</h3>
                                    <p class="text-gray-400">Available for hire</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Social Media Links -->
                    <div class="bg-[#1e1e1e] p-6 sm:p-8 rounded-lg shadow-lg">
                        <h2 class="text-xl font-bold mb-6">Find Me On</h2>

                        <div class="flex flex-wrap gap-4">
                            <a href="https://github.com/eminisolomon" target="_blank"
                                class="bg-[#2d2d2d] hover:bg-[#6d28d9] text-white p-3 rounded-full transition-colors duration-300">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/eminisolomon" target="_blank"
                                class="bg-[#2d2d2d] hover:bg-[#6d28d9] text-white p-3 rounded-full transition-colors duration-300">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.159 1.2A4.92 4.92 0 0012.09 7.05a4.97 4.97 0 00.125 1.12A14.09 14.09 0 011.64 3.16a4.822 4.822 0 00-.665 2.473c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.95 4.829 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com/in/eminisolomon" target="_blank"
                                class="bg-[#2d2d2d] hover:bg-[#6d28d9] text-white p-3 rounded-full transition-colors duration-300">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    BriefcaseIcon
} from '@heroicons/vue/24/solid'

export default {
    name: 'Contact',
    components: {
        MapPinIcon,
        PhoneIcon,
        EnvelopeIcon,
        BriefcaseIcon
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
            // Simulate submission
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
