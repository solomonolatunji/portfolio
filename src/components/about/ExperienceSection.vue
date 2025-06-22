<template>
  <div class="mt-20" id="experience-section">
    <div class="section-title mb-10 text-center">
      <h2 class="text-2xl font-bold text-white sm:text-3xl">
        <span class="text-[#6d28d9]">—</span>
        EXPERIENCE
      </h2>
      <div class="mx-auto mt-4 h-1 w-16 bg-[#6d28d9]"></div>
    </div>

    <div class="relative">
      <div
        class="absolute left-0 h-full w-1 transform bg-gradient-to-b from-[#6d28d9]/30 via-[#6d28d9] to-[#6d28d9]/30 md:left-1/2 md:-translate-x-1/2"
      ></div>

      <div class="flex flex-col space-y-12">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          :class="[
            'timeline-item relative flex flex-col md:flex-row md:items-center',
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
          ]"
        >
          <div
            class="timeline-dot absolute left-0 z-10 h-6 w-6 -translate-x-1/2 transform rounded-full border-4 border-[#6d28d9] bg-[#121212] md:left-1/2"
          ></div>

          <div class="ml-8 md:ml-0 md:w-1/2" :class="index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'">
            <div
              class="timeline-card rounded-xl border border-[#333] bg-[#1e1e1e]/70 p-6 shadow-xl transition-all duration-300 hover:border-[#6d28d9] hover:shadow-[#6d28d9]/20"
            >
              <span
                class="mb-3 inline-block rounded-full bg-[#2d2d2d] px-4 py-1.5 text-xs font-bold text-[#6d28d9]"
              >
                {{ exp.period }}
              </span>
              <h3 class="mb-2 text-xl font-bold text-white">{{ exp.role }}</h3>
              <h4 class="mb-3 font-medium text-[#6d28d9]/90">{{ exp.company }}</h4>
              <p class="text-sm leading-relaxed text-gray-300">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ExperienceSection',
    props: {
      experiences: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<style scoped>
  /* Timeline animations */
  .timeline-item {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  .timeline-item-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .timeline-dot {
    box-shadow: 0 0 0 4px rgba(109, 40, 217, 0.3);
  }

  /* Section fade in animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-section {
    animation: fadeIn 1s ease forwards;
  }
</style>
