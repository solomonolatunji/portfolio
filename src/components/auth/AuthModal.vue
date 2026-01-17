<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        @click="handleClose"
      ></div>

      <!-- Modal Content -->
      <div
        class="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#1e1e1e] shadow-2xl transition-all"
      >
        <!-- Close Button -->
        <button
          @click="handleClose"
          class="absolute top-4 right-4 text-gray-400 transition-colors hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-8">
          <div class="mb-8 text-center">
            <h2 class="mb-2 text-2xl font-bold text-white">
              {{ modalTitle }}
            </h2>
            <p class="text-sm text-gray-400">
              {{ modalDescription }}
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div
              v-if="error"
              class="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500"
            >
              {{ error }}
            </div>

            <!-- Signup Fields -->
            <template v-if="mode === 'signup'">
              <div class="space-y-1">
                <label for="username" class="text-sm font-medium text-gray-300">Username</label>
                <input
                  id="username"
                  v-model="formData.username"
                  type="text"
                  required
                  class="w-full rounded-lg border border-gray-700 bg-[#2d2d2d] px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="johndoe"
                />
              </div>
              <div class="space-y-1">
                <label for="email" class="text-sm font-medium text-gray-300">Email Address</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full rounded-lg border border-gray-700 bg-[#2d2d2d] px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </template>

            <!-- Login Fields -->
            <template v-if="mode === 'login'">
              <div class="space-y-1">
                <label for="login-username" class="text-sm font-medium text-gray-300"
                  >Username</label
                >
                <input
                  id="login-username"
                  v-model="formData.username"
                  type="text"
                  required
                  class="w-full rounded-lg border border-gray-700 bg-[#2d2d2d] px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="johndoe"
                />
              </div>
            </template>

            <!-- Password -->
            <div class="space-y-1">
              <label for="password" class="text-sm font-medium text-gray-300">Password</label>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                required
                class="w-full rounded-lg border border-gray-700 bg-[#2d2d2d] px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="mt-6 w-full rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 px-4 py-2.5 font-semibold text-white shadow-lg transition-all hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span v-if="isLoading" class="flex items-center justify-center gap-2">
                <svg
                  class="h-5 w-5 animate-spin text-white"
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
                Processing...
              </span>
              <span v-else>
                {{ mode === "login" ? "Sign In" : "Create Account" }}
              </span>
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-gray-400">
            <p v-if="mode === 'login'">
              Don't have an account?
              <button
                @click="switchMode('signup')"
                class="font-medium text-purple-400 transition-colors hover:text-purple-300"
              >
                Sign up
              </button>
            </p>
            <p v-else>
              Already have an account?
              <button
                @click="switchMode('login')"
                class="font-medium text-purple-400 transition-colors hover:text-purple-300"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useAuth } from "@/hooks/useAuth";

const { isOpen, mode, closeModal, switchMode } = useAuthModal();
const { signin, signup, isLoading, error, clearError } = useAuth();

const formData = reactive({
  username: "",
  email: "",
  password: "",
});

// Clear error when mode changes
watch(mode, () => {
  clearError();
  formData.username = "";
  formData.email = "";
  formData.password = "";
});

// Clear error when modal opens
watch(isOpen, (newVal) => {
  if (newVal) {
    clearError();
  }
});

const handleClose = () => {
  closeModal();
};

const handleSubmit = async () => {
  try {
    if (mode.value === "login") {
      await signin({
        username: formData.username,
        password: formData.password,
      });
    } else {
      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    }
    closeModal();
  } catch (err) {
    // Error is handled by the hook
  }
};

const modalTitle = computed(() => {
  return mode.value === "login" ? "Welcome Back" : "Create Account";
});

const modalDescription = computed(() => {
  return mode.value === "login"
    ? "Sign in to leave comments and reactions"
    : "Join our community to interact";
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}
</style>
