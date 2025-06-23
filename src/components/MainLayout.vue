<template>
  <div class="main-background flex min-h-screen">
    <div class="relative z-10 flex flex-1 flex-col">
      <div class="flex w-full items-center justify-center text-white">
        <div class="w-full px-4 pb-16 md:pb-0">
          <router-view />
        </div>

        <div
          class="fixed top-1/2 right-8 z-20 hidden -translate-y-1/2 transform flex-col gap-6 md:flex"
        >
          <router-link
            to="/"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-[#333] bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:bg-[#2d2d2d]"
          >
            <HomeIcon class="h-5 w-5 text-[#6d28d9]" />
          </router-link>
          <router-link
            to="/about"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-[#333] bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:bg-[#2d2d2d]"
          >
            <UserIcon class="h-5 w-5 text-[#6d28d9]" />
          </router-link>
          <router-link
            to="/portfolio"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-[#333] bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:bg-[#2d2d2d]"
          >
            <BriefcaseIcon class="h-5 w-5 text-[#6d28d9]" />
          </router-link>
          <router-link
            to="/contact"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-[#333] bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:bg-[#2d2d2d]"
          >
            <EnvelopeIcon class="h-5 w-5 text-[#6d28d9]" />
          </router-link>
          <router-link
            to="/blog"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-[#333] bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:bg-[#2d2d2d]"
          >
            <ChatBubbleLeftRightIcon class="h-5 w-5 text-[#6d28d9]" />
          </router-link>
        </div>

        <div
          class="bg-opacity-95 fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-[#333] bg-[#1e1e1e] p-3 backdrop-blur-lg md:hidden"
        >
          <router-link
            to="/"
            class="flex flex-col items-center text-[#6d28d9] transition-all hover:text-[#8b5cf6]"
          >
            <HomeIcon class="h-6 w-6" />
            <span class="mt-1 text-xs text-gray-300">Home</span>
          </router-link>
          <router-link
            to="/about"
            class="flex flex-col items-center text-[#6d28d9] transition-all hover:text-[#8b5cf6]"
          >
            <UserIcon class="h-6 w-6" />
            <span class="mt-1 text-xs text-gray-300">About</span>
          </router-link>
          <router-link
            to="/portfolio"
            class="flex flex-col items-center text-[#6d28d9] transition-all hover:text-[#8b5cf6]"
          >
            <BriefcaseIcon class="h-6 w-6" />
            <span class="mt-1 text-xs text-gray-300">Portfolio</span>
          </router-link>
          <router-link
            to="/contact"
            class="flex flex-col items-center text-[#6d28d9] transition-all hover:text-[#8b5cf6]"
          >
            <EnvelopeIcon class="h-6 w-6" />
            <span class="mt-1 text-xs text-gray-300">Contact</span>
          </router-link>
          <router-link
            to="/blog"
            class="flex flex-col items-center text-[#6d28d9] transition-all hover:text-[#8b5cf6]"
          >
            <ChatBubbleLeftRightIcon class="h-6 w-6" />
            <span class="mt-1 text-xs text-gray-300">Blog</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/vue/24/solid";

export default {
  name: "MainLayout",
  components: {
    HomeIcon,
    UserIcon,
    BriefcaseIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.main-background {
  background: linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #262626 100%);
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
  background: radial-gradient(
    circle at 15% 50%,
    rgba(109, 40, 217, 0.08) 0%,
    transparent 40%
  );
  z-index: 1;
  pointer-events: none;
}

.main-background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 85% 30%,
    rgba(109, 40, 217, 0.05) 0%,
    transparent 45%
  );
  z-index: 2;
  pointer-events: none;
}

/* Add some subtle animated noise texture */
@keyframes subtle-shift {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(3px, 3px);
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>
