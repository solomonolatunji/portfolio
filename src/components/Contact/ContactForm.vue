<template>
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
            <div v-if="emailStore.successMessage"
                class="p-4 mb-6 rounded-xl bg-green-900/30 border border-green-600 text-green-200">
                {{ emailStore.successMessage }}
            </div>

            <div v-if="emailStore.error" class="p-4 mb-6 rounded-xl bg-red-900/30 border border-red-600 text-red-200">
                {{ emailStore.error }}
            </div>

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
                    :disabled="emailStore.isLoading">
                    <span v-if="emailStore.isLoading" class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
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
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useEmailStore } from '@/stores/email';
import {
    UserIcon,
    EnvelopeIcon,
    PaperAirplaneIcon,
    TagIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/solid';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default defineComponent({
    name: 'ContactForm',
    components: {
        UserIcon,
        EnvelopeIcon,
        PaperAirplaneIcon,
        TagIcon,
        ChatBubbleLeftRightIcon
    },
    setup() {
        const emailStore = useEmailStore();
        const form = reactive<FormData>({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        const submitForm = async () => {
            try {
                await emailStore.sendEmail({
                    from_name: form.name,
                    from_email: form.email,
                    subject: form.subject,
                    message: form.message
                });

                form.name = '';
                form.email = '';
                form.subject = '';
                form.message = '';
            } catch (error) {
                console.error('Form submission error:', error);
            }
        };

        return {
            form,
            submitForm,
            emailStore
        };
    }
});
</script>