<template>
  <div class="relative w-full pt-8 pb-16 md:pt-20 md:pb-20 lg:pt-32">
    <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12 lg:gap-16">
        <!-- Profile Image Section -->
        <div class="flex w-full items-center justify-center md:w-2/5">
          <div class="floating relative">
            <div class="profile-gradient animate-spin-slow absolute inset-0 rounded-full"></div>

            <div
              class="profile-image-container animate-fadeIn h-44 w-44 overflow-hidden rounded-full border-4 border-[#6d28d9] shadow-xl sm:h-52 sm:w-52 md:h-64 md:w-64 lg:h-72 lg:w-72">
              <img :src="aboutData.profileImage.src" :alt="aboutData.profileImage.alt"
                class="h-full w-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
            </div>

            <!-- Animated decorative elements -->
            <div
              class="shadow-glow absolute -top-2 -left-2 h-6 w-6 animate-bounce rounded-full bg-[#6d28d9] delay-300 sm:-top-3 sm:-left-3 sm:h-8 sm:w-8">
            </div>
            <div
              class="shadow-glow absolute -right-1 -bottom-1 h-4 w-4 animate-ping rounded-full bg-[#9f7aea] delay-700 sm:-right-2 sm:-bottom-2 sm:h-6 sm:w-6">
            </div>
            <div
              class="shadow-glow absolute top-1/2 -right-3 h-3 w-3 animate-pulse rounded-full bg-[#4c1d95] sm:-right-4 sm:h-4 sm:w-4">
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="flex w-full flex-col items-center text-center md:w-3/5 md:items-start md:text-left">
          <div class="animate-slideDown">
            <p class="mb-3 flex items-center justify-center font-medium tracking-wider text-[#6d28d9] md:justify-start">
              <span class="mr-2 hidden h-0.5 w-5 bg-[#6d28d9] md:block"></span>
              {{ aboutData.greeting }}
            </p>
            <h1 class="mb-3 text-xl font-bold sm:text-2xl md:mb-4 md:text-4xl lg:text-5xl">
              I'm
              <span
                class="text-gradient bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#9f7aea] bg-clip-text text-transparent">
                {{ aboutData.name }}
              </span>
            </h1>
            <h2
              class="typewriter mb-4 flex items-center justify-center text-base font-medium text-gray-300 sm:text-lg md:mb-6 md:justify-start md:text-xl lg:text-2xl">
              <span class="mr-3 role-text">{{ currentRole }}</span>
              <span class="animate-blink">|</span>
            </h2>
          </div>

          <!-- Description Card -->
          <div
            class="glass-card animate-fadeIn mb-6 w-full max-w-2xl rounded-xl border border-white/10 p-4 backdrop-blur-sm delay-300 sm:p-5">
            <p class="text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
              {{ aboutData.description }}
            </p>
          </div>

          <!-- Social Links -->
          <div class="animate-slideUp flex flex-wrap justify-center gap-3 delay-500 sm:gap-4 md:justify-start md:gap-5">
            <a v-for="social in aboutData.socialLinks" :key="social.platform" :href="social.url" target="_blank"
              rel="noopener noreferrer" :aria-label="social.ariaLabel"
              class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-[#1e1e1e]/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#6d28d9]/30 hover:bg-[#2d2d2d] sm:h-11 sm:w-11">
              <component :is="social.icon" class="h-4 w-4 text-[#6d28d9] sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { aboutData } from '@/constants/about';
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandTelegram,
  IconBrandWhatsapp
} from '@tabler/icons-vue';

export default {
  name: "Home",
  components: {
    IconBrandGithub,
    IconBrandTwitter,
    IconBrandTelegram,
    IconBrandWhatsapp
  },
  data() {
    return {
      aboutData,
      currentRoleIndex: 0,
      currentRole: aboutData.roles[0]
    };
  },
  mounted() {
    this.startRoleRotation();
  },
  beforeUnmount() {
    if (this.roleInterval) {
      clearInterval(this.roleInterval);
    }
  },
  methods: {
    startRoleRotation() {
      this.roleInterval = setInterval(() => {
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.aboutData.roles.length;
        this.currentRole = this.aboutData.roles[this.currentRoleIndex];
      }, 3000);
    }
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(30, 30, 30, 0.4);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
}

.profile-gradient {
  background: linear-gradient(135deg, #6d28d9, #9333ea, #6d28d9, #4c1d95);
  opacity: 0.5;
  transform: scale(1.05);
  filter: blur(8px);
}

.profile-image-container {
  position: relative;
  z-index: 1;
}

.shadow-glow {
  box-shadow: 0 0 15px rgba(109, 40, 217, 0.4);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

.text-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
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

.role-text {
  transition: opacity 0.5s ease-in-out;
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: transparent;
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

.social-link {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.social-link::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(109, 40, 217, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
  z-index: -1;
}

.social-link:hover::after {
  width: 120%;
  height: 120%;
}

.animate-fadeIn {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

.animate-slideUp {
  opacity: 0;
  animation: slideUp 0.8s ease forwards;
}

.animate-slideDown {
  opacity: 0;
  animation: slideDown 0.8s ease forwards;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-500 {
  animation-delay: 500ms;
}

.delay-700 {
  animation-delay: 700ms;
}

@keyframes blink {

  from,
  to {
    opacity: 1;
  }

  50% {
    opacity: 0;
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

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>