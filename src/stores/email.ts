import { defineStore } from 'pinia'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
import { useToast } from 'vue-toastification'

interface EmailState {
  isLoading: boolean
  error: string | null
  successMessage: string | null
  isInitialized: boolean
}

interface TemplateParams {
  from_name: string
  from_email: string
  subject: string
  message: string
  [key: string]: string | number | boolean
}

export const useEmailStore = defineStore('email', {
  state: (): EmailState => ({
    isLoading: false,
    error: null,
    successMessage: null,
    isInitialized: false,
  }),

  actions: {
    /**
     * Initialize EmailJS with environment variables
     */
    initialize(): void {
      if (this.isInitialized) return

      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      if (!publicKey) {
        console.error('EmailJS public key is not configured')
        return
      }

      emailjs.init(publicKey)
      this.isInitialized = true
    },

    /**
     * Send email using configured EmailJS service
     * @param templateParams - Email content parameters
     */
    async sendEmail(templateParams: TemplateParams): Promise<EmailJSResponseStatus> {
      if (!this.isInitialized) {
        this.initialize()
      }

      this.isLoading = true
      this.error = null
      this.successMessage = null

      const toast = useToast()

      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
          throw new Error('EmailJS configuration is incomplete')
        }

        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

        this.successMessage = 'Message sent successfully! I will get back to you soon.'

        toast.success(this.successMessage)

        return response
      } catch (error) {
        console.error('Failed to send email:', error)
        this.error =
          error instanceof Error ? error.message : 'Failed to send message. Please try again later.'

        toast.error(this.error)

        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Clear error and success messages
     */
    clearMessages(): void {
      this.error = null
      this.successMessage = null
    },
  },
})
