<template>
  <div class="relative mt-20 mb-8">
    <div class="absolute inset-0 rounded-2xl bg-[#6d28d9]/5"></div>
    <div
      class="relative z-10 overflow-hidden rounded-2xl border border-white/5 bg-[#1e1e1e]/70 px-6 py-12 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-[#6d28d9]/50 hover:bg-[#2d2d2d] hover:shadow-2xl md:px-12"
    >
      <div
        class="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#6d28d9]/20 blur-3xl filter"
      ></div>
      <div
        class="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#8b5cf6]/10 blur-3xl filter"
      ></div>

      <div
        class="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row"
      >
        <div>
          <h2 class="mb-2 text-2xl font-bold text-white sm:text-3xl">
            Want to see my work?
          </h2>
          <p class="text-lg text-gray-400">
            Check out my latest projects and case studies
          </p>
        </div>
        <router-link
          to="/portfolio"
          class="group flex transform items-center rounded-xl bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:from-[#5b21b6] hover:to-[#7c3aed] hover:shadow-lg hover:shadow-purple-500/20"
        >
          View Projects
          <ArrowRightIcon
            class="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/solid";

export default {
  name: "PortfolioCTA",
  components: {
    ArrowRightIcon,
  },
};
</script>

<style scoped>
.relative {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
