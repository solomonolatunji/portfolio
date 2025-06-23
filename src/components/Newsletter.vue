<template>
  <div class="newsletter-container relative my-8 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-800 p-6">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="mb-2 text-xl font-semibold text-white">Stay Updated</h2>
      <p class="mb-4 text-sm text-purple-100">
        Get exclusive content and insights delivered to your inbox.
      </p>

      <form @submit.prevent="handleSubscribe" class="flex flex-col gap-2 sm:flex-row">
        <input type="email" v-model="email" placeholder="Your email address" required
          class="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
          :disabled="subscribeStore.isLoading" />
        <button type="submit"
          class="flex items-center justify-center rounded-md bg-white px-4 py-2 font-medium text-purple-800 hover:bg-purple-100"
          :disabled="subscribeStore.isLoading">
          <svg v-if="subscribeStore.isLoading" class="mr-2 h-4 w-4 animate-spin text-purple-800"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0a0 0 0 0 12 0h4zm2 5.414-3-3L0 12c0 3.042 1.135 5.824 3 7.938l3-2.414z" />
          </svg>
          {{ subscribeStore.isLoading ? "Subscribing..." : "Subscribe" }}
        </button>
      </form>

      <p class="mt-2 text-xs text-purple-200/70">No spam. Unsubscribe anytime.</p>
    </div>

    <!-- Success Modal -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="subscribeStore.successMessage" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="subscribeStore.clearMessages"></div>
        <div class="relative w-full max-w-sm rounded-lg bg-white p-6">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-center text-lg font-semibold text-gray-900">Subscribed!</h3>
          <p class="mt-1 text-center text-sm text-gray-600">You'll receive updates in your inbox.</p>
          <button @click="subscribeStore.clearMessages"
            class="mt-4 w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
            Close
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSubscribeStore } from "@/stores/subscribe";

const email = ref("");
const subscribeStore = useSubscribeStore();

const emit = defineEmits<{
  (e: "subscribed", email: string): void;
}>();

const handleSubscribe = async () => {
  if (!email.value) return;
  try {
    await subscribeStore.subscribe(email.value);
    emit("subscribed", email.value);
    email.value = "";
  } catch (error) {
    console.error("Newsletter subscription error:", error);
  }
};
</script>

<style scoped>
.newsletter-container {
  background-size: cover;
}
</style>