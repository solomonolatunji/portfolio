<template>
    <div class="newsletter-container relative overflow-hidden my-16 rounded-2xl shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-900 opacity-90"></div>
        <div
            class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTI5Ljk5OTcgNjBDNDYuNTY4NSA2MCA2MCA0Ni41Njg1IDYwIDI5Ljk5OTdDNjAgMTMuNDMxNSA0Ni41Njg1IDAgMjkuOTk5NyAwQzEzLjQzMTUgMCAwIDEzLjQzMTUgMCAyOS45OTk3QzAgNDYuNTY4NSAxMy40MzE1IDYwIDI5Ljk1OTcgNjB6IiAvPjwvZz48L2c+PC9zdmc+')] opacity-20">
        </div>

        <div class="relative z-10 p-8 md:p-12 max-w-4xl mx-auto">
            <!-- Content Container -->
            <div class="text-center">
                <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Stay Updated</h2>
                <p class="text-base text-purple-100 mb-6 max-w-lg mx-auto">
                    Subscribe to my newsletter for exclusive content, latest articles, and industry insights delivered
                    directly to your inbox.
                </p>

                <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <div class="relative flex-grow">
                        <input type="email" v-model="email" placeholder="Your email address" required class="w-full px-5 py-3 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-purple-300 
                            bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70"
                            :disabled="isLoading">
                    </div>
                    <button type="submit"
                        class="px-6 py-3 rounded-lg sm:rounded-l-none font-medium transition-all duration-300
                        bg-white hover:bg-purple-100 text-purple-800 hover:text-purple-900 flex items-center justify-center"
                        :disabled="isLoading">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-800"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isLoading ? 'Subscribing...' : 'Subscribe' }}
                    </button>
                </form>

                <!-- Small print -->
                <p class="text-xs text-purple-200/70 mt-4 max-w-sm mx-auto">
                    No spam, ever. You can unsubscribe at any time.
                </p>
            </div>
        </div>

        <!-- Success Modal -->
        <Transition enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center z-50 px-4">
                <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showSuccessModal = false"></div>
                <div class="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 overflow-hidden">
                    <!-- Success icon -->
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>

                    <h3 class="text-xl font-bold text-gray-900 text-center">Subscription Successful!</h3>
                    <p class="text-gray-600 text-center mt-2">
                        Thank you for subscribing to my newsletter. You'll receive updates and insights directly in your
                        inbox.
                    </p>

                    <button @click="showSuccessModal = false" class="mt-6 w-full py-3 px-5 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 
                        text-white transition-colors duration-300">
                        Close
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const isLoading = ref(false);
const showSuccessModal = ref(false);

const emit = defineEmits<{
    (e: 'subscribed', email: string): void
}>();

const handleSubscribe = async () => {
    isLoading.value = true;
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        emit('subscribed', email.value);
        email.value = '';

        showSuccessModal.value = true;
    } catch (error) {
        console.error('Newsletter subscription error:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.newsletter-container {
    background-size: cover;
    background-position: center;
}
</style>