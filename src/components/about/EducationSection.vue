<template>
  <div class="mt-20" id="education-section">
    <div class="section-title mb-10 text-center">
      <h2 class="text-2xl font-bold text-white sm:text-3xl">
        <span class="text-[#6d28d9]">—</span>
        EDUCATION
      </h2>
      <div class="mx-auto mt-4 h-1 w-16 bg-[#6d28d9]"></div>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div
        v-for="(edu, index) in education"
        :key="index"
        class="glass-card edu-card rounded-xl border border-white/10 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-[#6d28d9] hover:shadow-[#6d28d9]/20"
      >
        <div class="flex items-start">
          <div class="edu-icon mr-4 rounded-lg bg-[#6d28d9]/20 p-3">
            <AcademicCapIcon class="h-7 w-7 text-[#6d28d9]" />
          </div>
          <div>
            <span class="rounded-full bg-[#2d2d2d] px-3 py-1 text-xs font-bold text-[#6d28d9]">
              {{ edu.period }}
            </span>
            <h3 class="mt-2 mb-1 text-xl font-bold text-white">
              {{ edu.degree }}
            </h3>
            <h4 class="mb-3 font-medium text-[#6d28d9]/80">
              {{ edu.institution }}
            </h4>
            <p class="text-sm leading-relaxed text-gray-300">
              {{ edu.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AcademicCapIcon } from "@heroicons/vue/24/solid";

export default {
  name: "EducationSection",
  components: {
    AcademicCapIcon,
  },
  props: {
    education: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Glass morphism effect */
.glass-card {
  background: rgba(30, 30, 30, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(8px);
}

/* Education card animations */
.edu-card {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.edu-card-visible {
  opacity: 1;
  transform: translateY(0);
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
