<template>
  <div class="newsletter-container relative my-16 overflow-hidden rounded-2xl shadow-2xl">
    <div class="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-900 opacity-90"></div>
    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTI5Ljk5OTcgNjBDNDYuNTY4NSA2MCA2MCA0Ni41Njg1IDYwIDI5Ljk5OTdDNjAgMTMuNDMxNSA0Ni41Njg1IDAgMjkuOTk5NyAwQzEzLjQzMTUgMCAwIDEzLjQzMTUgMCAyOS45OTk3QzAgNDYuNTY4NSAxMy40MzE1IDYwIDI5Ljk1OTcgNjB6IiAvPjwvZz48L2c+PC9zdmc+')] opacity-20"
    ></div>

    <div class="relative z-10 mx-auto max-w-4xl p-8 md:p-12">
      <!-- Content Container -->
      <div class="text-center">
        <h2 class="mb-3 text-2xl font-bold text-white md:text-3xl">Stay Updated</h2>
        <p class="mx-auto mb-6 max-w-lg text-base text-purple-100">
          Subscribe to my newsletter for exclusive content, latest articles, and industry insights
          delivered directly to your inbox.
        </p>

        <form
          @submit.prevent="handleSubscribe"
          class="mx-auto flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <div class="relative flex-grow">
            <input
              type="email"
              v-model="email"
              placeholder="Your email address"
              required
              class="w-full rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-white placeholder-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-300 focus:outline-none sm:rounded-r-none"
              :disabled="isLoading"
            />
          </div>
          <button
            type="submit"
            class="flex items-center justify-center rounded-lg bg-white px-6 py-3 font-medium text-purple-800 transition-all duration-300 hover:bg-purple-100 hover:text-purple-900 sm:rounded-l-none"
            :disabled="isLoading"
          >
            <svg
              v-if="isLoading"
              class="mr-2 -ml-1 h-4 w-4 animate-spin text-purple-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isLoading ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </form>

        <!-- Small print -->
        <p class="mx-auto mt-4 max-w-sm text-xs text-purple-200/70">
          No spam, ever. You can unsubscribe at any time.
        </p>
      </div>
    </div>

    <!-- Success Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-sm"
          @click="showSuccessModal = false"
        ></div>
        <div class="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
          <!-- Success icon -->
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <h3 class="text-center text-xl font-bold text-gray-900">Subscription Successful!</h3>
          <p class="mt-2 text-center text-gray-600">
            Thank you for subscribing to my newsletter. You'll receive updates and insights directly
            in your inbox.
          </p>

          <button
            @click="showSuccessModal = false"
            class="mt-6 w-full rounded-lg bg-purple-600 px-5 py-3 font-medium text-white transition-colors duration-300 hover:bg-purple-700"
          >
            Close
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const email = ref('')
  const isLoading = ref(false)
  const showSuccessModal = ref(false)

  const emit = defineEmits<{
    (e: 'subscribed', email: string): void
  }>()

  const handleSubscribe = async () => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      emit('subscribed', email.value)
      email.value = ''

      showSuccessModal.value = true
    } catch (error) {
      console.error('Newsletter subscription error:', error)
    } finally {
      isLoading.value = false
    }
  }
</script>

<style scoped>
  .newsletter-container {
    background-size: cover;
    background-position: center;
  }
</style>
