<template>
  <div class="main-background min-h-screen">
    <!-- Top Header with Shop Icon - Now Sticky -->
    <header class="sticky top-0 z-30 flex w-full items-center justify-between p-4 md:p-6">
      <div class="flex items-center">
        <!-- Logo/Brand could go here -->
      </div>

      <!-- Shop Icon - Top Right -->
      <router-link :to="shopMenuItem.path"
        class="group flex h-12 w-12 items-center justify-center rounded-full border border-[#333] bg-[#1e1e1e]/80 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#2d2d2d] hover:border-[#6d28d9]/50 hover:shadow-xl hover:shadow-[#6d28d9]/20"
        :title="shopMenuItem.title">
        <component :is="shopMenuItem.icon"
          class="h-6 w-6 text-[#6d28d9] transition-all duration-300 group-hover:text-[#8b5cf6]" />
      </router-link>
    </header>

    <div class="relative z-10 flex min-h-screen">
      <div class="flex flex-1 w-full items-start justify-center text-white">
        <div class="w-full px-4 py-4 md:py-6">
          <router-view />
        </div>

        <!-- Desktop Navigation - Right Side -->
        <nav class="fixed top-1/2 right-8 z-20 hidden -translate-y-1/2 transform flex-col gap-4 md:flex">
          <router-link v-for="item in menuItems" :key="item.name" :to="item.path"
            class="nav-item group flex h-14 w-14 items-center justify-center rounded-full border border-[#333] bg-[#1e1e1e]/80 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-[#2d2d2d] hover:to-[#3d3d3d] hover:border-[#6d28d9]/50 hover:shadow-xl hover:shadow-[#6d28d9]/20"
            :title="item.title">
            <component :is="item.icon"
              class="h-6 w-6 text-[#6d28d9] transition-all duration-300 group-hover:text-[#8b5cf6] group-hover:scale-110" />
          </router-link>
        </nav>

        <!-- Mobile Navigation - Bottom -->
        <nav
          class="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-[#333]/60 bg-[#1e1e1e]/90 backdrop-blur-xl p-2 md:hidden">
          <router-link v-for="item in menuItems" :key="item.name" :to="item.path"
            class="nav-item-mobile group flex flex-col items-center px-3 py-2 text-[#6d28d9] transition-all duration-300 hover:text-[#8b5cf6] active:scale-95">
            <component :is="item.icon" class="h-6 w-6 transition-all duration-300 group-hover:scale-110" />
            <span class="mt-1 text-xs text-gray-300/80 font-medium">{{ item.label }}</span>
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Floating Particles Animation -->
    <div class="particle particle-1"></div>
    <div class="particle particle-2"></div>
    <div class="particle particle-3"></div>
  </div>
</template>

<script>
import { menuItems, shopMenuItem } from '@/constants/menu';

export default {
  name: "MainLayout",
  data() {
    return {
      menuItems,
      shopMenuItem
    };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.main-background {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #1e1e1e 50%, #262626 75%, #2a2a2a 100%);
  position: relative;
  overflow: hidden;
}

.main-background::before {
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

.main-background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(45deg, transparent 49%, rgba(109, 40, 217, 0.02) 50%, transparent 51%),
    linear-gradient(-45deg, transparent 49%, rgba(139, 92, 246, 0.015) 50%, transparent 51%);
  background-size: 60px 60px, 80px 80px;
  z-index: 2;
  pointer-events: none;
  opacity: 0.3;
}

.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 3;
}

.particle-1 {
  width: 4px;
  height: 4px;
  background: rgba(109, 40, 217, 0.6);
  top: 20%;
  left: 10%;
  animation: float-1 12s ease-in-out infinite;
}

.particle-2 {
  width: 6px;
  height: 6px;
  background: rgba(139, 92, 246, 0.4);
  top: 70%;
  right: 20%;
  animation: float-2 15s ease-in-out infinite;
}

.particle-3 {
  width: 3px;
  height: 3px;
  background: rgba(109, 40, 217, 0.8);
  bottom: 30%;
  left: 80%;
  animation: float-3 10s ease-in-out infinite;
}

.nav-item.router-link-active {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.2), rgba(139, 92, 246, 0.15));
  border-color: rgba(109, 40, 217, 0.6);
  box-shadow: 0 8px 25px rgba(109, 40, 217, 0.3);
}

.nav-item-mobile.router-link-active {
  color: #8b5cf6;
}

.nav-item-mobile.router-link-active span {
  color: #8b5cf6;
}

@keyframes background-pulse {
  0% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }
}

@keyframes float-1 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(30px, -20px) rotate(90deg);
  }

  50% {
    transform: translate(-10px, -40px) rotate(180deg);
  }

  75% {
    transform: translate(-30px, -10px) rotate(270deg);
  }
}

@keyframes float-2 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  33% {
    transform: translate(-25px, 30px) rotate(120deg);
  }

  66% {
    transform: translate(20px, -15px) rotate(240deg);
  }
}

@keyframes float-3 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(-40px, 25px) rotate(180deg);
  }
}

@media (max-width: 768px) {
  .main-background {
    padding-bottom: env(safe-area-inset-bottom);
  }

  .nav-item-mobile {
    min-width: 60px;
  }
}

@media (min-width: 768px) {
  .nav-item:hover {
    transform: translateX(-4px) scale(1.1);
  }
}

html {
  scroll-behavior: smooth;
}

@supports (backdrop-filter: blur(10px)) {

  .nav-item,
  .nav-item-mobile {
    backdrop-filter: blur(10px);
  }
}
</style>