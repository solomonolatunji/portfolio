<template>
  <div
    class="admin-login admin-background flex min-h-screen w-full items-center justify-center px-4 py-8"
  >
    <!-- Login Card -->
    <div class="animate-slideUp relative z-10 w-full max-w-md">
      <!-- Logo/Header Section -->
      <div class="animate-fadeIn mb-8 text-center">
        <div class="mb-4 flex justify-center">
          <div class="relative">
            <div
              class="shadow-glow animate-pulse-glow h-16 w-16 rounded-2xl bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] p-0.5"
            >
              <div class="flex h-full w-full items-center justify-center rounded-2xl bg-[#0a0a0a]">
                <IconShieldLock class="h-8 w-8 text-[#6d28d9]" />
              </div>
            </div>
            <div
              class="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-[#6d28d9]"
            ></div>
          </div>
        </div>
        <h1 class="mb-2 text-3xl font-bold text-white">
          Admin
          <span
            class="text-gradient bg-gradient-to-r from-[#6d28d9] to-[#9f7aea] bg-clip-text text-transparent"
          >
            Portal
          </span>
        </h1>
        <p class="text-sm text-gray-400">Sign in to manage your portfolio</p>
      </div>

      <!-- Login Form Card -->
      <div
        class="login-card animate-fadeIn rounded-2xl border border-white/10 bg-[#1e1e1e] p-8 delay-200"
      >
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email/Username Field -->
          <Input
            id="username"
            v-model="formData.username"
            type="text"
            label="Email / Username"
            placeholder="Enter your email or username"
            autocomplete="username"
            :disabled="isLoading"
            :required="true"
          >
            <template #iconLeft>
              <IconMail />
            </template>
          </Input>

          <!-- Password Field -->
          <Input
            id="password"
            v-model="formData.password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            autocomplete="current-password"
            :disabled="isLoading"
            :required="true"
          >
            <template #iconLeft>
              <IconLock />
            </template>
          </Input>

          <!-- Error Message -->
          <div
            v-if="error"
            class="error-message animate-shake rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
          >
            <div class="flex items-center gap-2">
              <IconAlertCircle class="h-5 w-5 flex-shrink-0" />
              <span>{{ error }}</span>
            </div>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            variant="primary"
            size="md"
            :full-width="true"
            :loading="isLoading"
            :disabled="!formData.username || !formData.password"
            loading-text="Signing in..."
          >
            <template #iconLeft>
              <IconLogin2 />
            </template>
            Sign In
          </Button>
        </form>
      </div>

      <!-- Footer -->
      <div class="animate-fadeIn mt-6 text-center text-sm text-gray-500 delay-300">
        <p>Protected admin area • Authorized access only</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { IconShieldLock, IconMail, IconLock, IconLogin2, IconAlertCircle } from "@tabler/icons-vue";

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  username: "",
  password: "",
});

const isLoading = computed(() => authStore.isLoading);
const error = computed(() => authStore.error);

const handleLogin = async () => {
  try {
    await authStore.login(formData.value);
    router.push("/");
  } catch (err) {
    console.error("Login error:", err);
  }
};
</script>

<style scoped>
.admin-background {
  background: linear-gradient(
    135deg,
    #0a0a0a 0%,
    #1a1a1a 25%,
    #1e1e1e 50%,
    #262626 75%,
    #2a2a2a 100%
  );
  position: relative;
  overflow: hidden;
}

.admin-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 15% 50%, rgba(109, 40, 217, 0.12) 0%, transparent 40%),
    radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 45%),
    radial-gradient(circle at 50% 80%, rgba(109, 40, 217, 0.06) 0%, transparent 50%);
  z-index: 1;
  pointer-events: none;
  animation: background-pulse 8s ease-in-out infinite alternate;
}

.admin-background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(45deg, transparent 49%, rgba(109, 40, 217, 0.02) 50%, transparent 51%),
    linear-gradient(-45deg, transparent 49%, rgba(139, 92, 246, 0.015) 50%, transparent 51%);
  background-size:
    60px 60px,
    80px 80px;
  z-index: 2;
  pointer-events: none;
  opacity: 0.3;
}

.login-card {
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
}

.shadow-glow {
  box-shadow:
    0 0 20px rgba(109, 40, 217, 0.4),
    0 0 40px rgba(109, 40, 217, 0.2);
}

.text-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Animations */
@keyframes background-pulse {
  0% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow:
      0 0 20px rgba(109, 40, 217, 0.4),
      0 0 40px rgba(109, 40, 217, 0.2);
  }

  50% {
    box-shadow:
      0 0 30px rgba(109, 40, 217, 0.6),
      0 0 60px rgba(109, 40, 217, 0.3);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

.animate-fadeIn {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

.animate-slideUp {
  opacity: 0;
  animation: slideUp 0.8s ease forwards;
}

.animate-shake {
  animation: shake 0.5s ease;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-300 {
  animation-delay: 300ms;
}
</style>
