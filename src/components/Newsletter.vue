<template>
    <div class="mt-10 sm:mt-16 bg-gradient-to-r from-[#4c1d95] to-[#6d28d9] rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
        <div class="text-center">
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Subscribe to my newsletter</h2>
            <p class="text-sm sm:text-base text-purple-200 mb-4">Get the latest articles, tutorials and updates
                delivered to your inbox.</p>
            <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row max-w-md mx-auto">
                <input type="email" v-model="email" placeholder="Your email" required
                    class="w-full px-4 py-2 rounded-l-md sm:rounded-r-none rounded-r-md sm:rounded-l-md mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-purple-300 text-white bg-transparent border border-white placeholder-white placeholder-opacity-75">
                <button type="submit"
                    class="w-full sm:w-auto bg-white text-[#6d28d9] px-4 py-2 rounded-r-md sm:rounded-l-none rounded-l-md sm:rounded-r-md font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
                    Subscribe
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Newsletter',
    data() {
        return {
            email: ''
        }
    },
    methods: {
        subscribeNewsletter() {
            this.$emit('subscribed', this.email);
            this.email = '';
        }
    }
}
</script>