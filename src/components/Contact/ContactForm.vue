<template>
  <div
    class="relative h-full overflow-hidden rounded-2xl border border-[#222] bg-[#141414] p-6 shadow-xl sm:p-8 md:p-10"
  >
    <div
      class="absolute top-0 right-0 h-40 w-40 rounded-full bg-gradient-to-bl from-[#6d28d9]/10 to-transparent blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-gradient-to-tr from-[#6d28d9]/10 to-transparent blur-3xl"
    ></div>

    <div class="relative z-10 mb-8">
      <h2 class="mb-2 text-2xl font-bold text-white sm:text-3xl">Send a Message</h2>
      <p class="text-gray-400">I'll get back to you as soon as possible</p>
    </div>

    <form @submit.prevent="submitForm" class="relative z-10 space-y-6">
      <div
        v-if="emailStore.successMessage"
        class="mb-6 rounded-xl border border-green-600 bg-green-900/30 p-4 text-green-200"
      >
        {{ emailStore.successMessage }}
      </div>

      <div
        v-if="emailStore.error"
        class="mb-6 rounded-xl border border-red-600 bg-red-900/30 p-4 text-red-200"
      >
        {{ emailStore.error }}
      </div>

      <div class="space-y-6">
        <div class="form-group">
          <label for="name" class="mb-2 block font-medium text-white">Name</label>
          <div class="relative">
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full rounded-xl border-2 border-[#333] bg-[#1a1a1a] px-4 py-3.5 text-white transition-colors focus:border-[#6d28d9] focus:outline-none"
              placeholder="Your name"
              required
            />
            <UserIcon
              class="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform text-[#6d28d9]"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email" class="mb-2 block font-medium text-white">Email</label>
          <div class="relative">
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full rounded-xl border-2 border-[#333] bg-[#1a1a1a] px-4 py-3.5 text-white transition-colors focus:border-[#6d28d9] focus:outline-none"
              placeholder="Your email"
              required
            />
            <EnvelopeIcon
              class="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform text-[#6d28d9]"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="subject" class="mb-2 block font-medium text-white">Subject</label>
        <div class="relative">
          <input
            type="text"
            id="subject"
            v-model="form.subject"
            class="w-full rounded-xl border-2 border-[#333] bg-[#1a1a1a] px-4 py-3.5 text-white transition-colors focus:border-[#6d28d9] focus:outline-none"
            placeholder="Message subject"
            required
          />
          <TagIcon
            class="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform text-[#6d28d9]"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="message" class="mb-2 block font-medium text-white">Message</label>
        <div class="relative">
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            class="w-full resize-none rounded-xl border-2 border-[#333] bg-[#1a1a1a] px-4 py-3.5 text-white transition-colors focus:border-[#6d28d9] focus:outline-none"
            placeholder="Your message"
            required
          ></textarea>
          <ChatBubbleLeftRightIcon
            class="pointer-events-none absolute top-6 right-4 h-5 w-5 text-[#6d28d9]"
          />
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="flex transform items-center rounded-xl bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:from-[#5b21b6] hover:to-[#7c3aed] hover:shadow-lg hover:shadow-purple-500/20"
          :disabled="emailStore.isLoading"
        >
          <span v-if="emailStore.isLoading" class="flex items-center">
            <svg
              class="mr-2 -ml-1 h-5 w-5 animate-spin text-white"
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
            Sending...
          </span>
          <span v-else class="flex items-center">
            Send Message
            <PaperAirplaneIcon class="ml-2 h-5 w-5 rotate-45 transform" />
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { useEmailStore } from '@/stores/email'
  import {
    UserIcon,
    EnvelopeIcon,
    PaperAirplaneIcon,
    TagIcon,
    ChatBubbleLeftRightIcon,
  } from '@heroicons/vue/24/solid'

  interface FormData {
    name: string
    email: string
    subject: string
    message: string
  }

  export default defineComponent({
    name: 'ContactForm',
    components: {
      UserIcon,
      EnvelopeIcon,
      PaperAirplaneIcon,
      TagIcon,
      ChatBubbleLeftRightIcon,
    },
    setup() {
      const emailStore = useEmailStore()
      const form = reactive<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      const submitForm = async () => {
        try {
          await emailStore.sendEmail({
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          })

          form.name = ''
          form.email = ''
          form.subject = ''
          form.message = ''
        } catch (error) {
          console.error('Form submission error:', error)
        }
      }

      return {
        form,
        submitForm,
        emailStore,
      }
    },
  })
</script>
