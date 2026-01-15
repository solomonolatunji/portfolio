<template>
  <div class="flex min-h-screen w-full items-center justify-center py-12 pb-24 md:pb-12">
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="title-with-bg-shadow" data-text="ABOUT ME">
        <h1 class="modern-title mb-8 text-center text-2xl sm:text-3xl lg:text-4xl">
          <span class="accent">—</span>
          ABOUT ME
        </h1>
      </div>

      <ProfileSection />

      <SkillsSection :technologies="technologies" />

      <ExperienceSection :experiences="experiences" />

      <EducationSection :education="education" />

      <div class="mt-16 mb-16 flex justify-center md:mb-0 lg:mt-20">
        <router-link
          to="/portfolio"
          class="cta-button inline-flex transform items-center rounded-xl bg-[#6d28d9] px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#5b21b6] hover:shadow-[#6d28d9]/50 sm:text-lg"
        >
          VIEW MY PROJECTS
          <span
            class="ml-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm text-[#6d28d9]"
          >
            →
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSection from "@/components/about/ProfileSection.vue";
import SkillsSection from "@/components/about/SkillsSection.vue";
import ExperienceSection from "@/components/about/ExperienceSection.vue";
import EducationSection from "@/components/about/EducationSection.vue";
import { technologies } from "@/constants/technologies";
import { experiences } from "@/constants/experiences";
import { education } from "@/constants/education";

export default {
  name: "About",
  components: {
    ProfileSection,
    SkillsSection,
    ExperienceSection,
    EducationSection,
  },
  data() {
    return {
      technologies,
      experiences,
      education,
    };
  },
  mounted() {
    this.animateElements();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    animateElements() {
      this.animateOnScroll();
    },
    handleScroll() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.animateOnScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    animateOnScroll() {
      const sections = ["skills-section", "experience-section", "education-section"];
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el && this.isInViewport(el)) {
          el.classList.add("fade-in-section");
        }
      });

      const timelineItems = document.querySelectorAll(".timeline-item");
      timelineItems.forEach((item) => {
        if (this.isInViewport(item)) {
          item.classList.add("timeline-item-visible");
        }
      });

      const eduCards = document.querySelectorAll(".edu-card");
      eduCards.forEach((card) => {
        if (this.isInViewport(card)) {
          card.classList.add("edu-card-visible");
        }
      });
    },
    isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    },
  },
};
</script>

<style scoped>
.cta-button {
  position: relative;
  overflow: hidden;
}

.cta-button::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cta-button:hover::after {
  opacity: 1;
}
</style>
