import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

interface SubscribeState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export const useSubscribeStore = defineStore("subscribe", {
  state: (): SubscribeState => ({
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    /**
     * Simulate subscribing to the newsletter
     * @param email - Subscriber's email address
     */
    async subscribe(email: string): Promise<void> {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      const toast = useToast();

      try {
        await new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (!email.includes("@")) {
              reject(new Error("Invalid email address"));
            } else {
              resolve();
            }
          }, 1000);
        });

        this.successMessage = "Subscribed successfully! Welcome to the newsletter.";
        toast.success(this.successMessage);
      } catch (error) {
        console.error("Failed to subscribe:", error);
        this.error =
          error instanceof Error ? error.message : "Failed to subscribe. Please try again later.";
        toast.error(this.error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    clearMessages(): void {
      this.error = null;
      this.successMessage = null;
    },
  },
});
