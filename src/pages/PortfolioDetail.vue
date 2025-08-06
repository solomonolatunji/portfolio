<template>
  <div class="flex min-h-screen w-full items-center justify-center py-12 pb-24 md:pb-12">
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div v-if="project" class="mb-12">
        <!-- Back Button -->
        <div class="mb-8">
          <router-link to="/portfolio"
            class="inline-flex items-center text-gray-400 transition-colors hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
            Back to Projects
          </router-link>
        </div>

        <!-- Project Header -->
        <div class="mb-8 flex flex-col gap-6 sm:mb-10 sm:gap-8 lg:flex-row">
          <!-- Project Image -->
          <div class="w-full lg:w-3/5">
            <div class="relative aspect-video overflow-hidden rounded-xl bg-[#1e1e1e] shadow-xl sm:aspect-auto">
              <img :src="project.image" :alt="project.title" class="h-full w-full object-cover" />
              <div class="absolute top-4 right-4 rounded-full bg-[#6d28d9] px-3 py-1 text-sm text-white shadow-md">
                {{ project.year }}
              </div>
            </div>
          </div>

          <!-- Project Info -->
          <div class="w-full lg:w-2/5">
            <div
              class="h-full rounded-xl border border-[#333] bg-[#1e1e1e] p-5 shadow-lg transition-colors duration-300 hover:border-[#6d28d9]/30 sm:p-6">
              <h1 class="mb-4 text-2xl font-bold text-white md:text-3xl">
                {{ project.title }}
              </h1>
              <div class="mb-6 space-y-4">
                <div class="flex items-start">
                  <div class="mr-3 rounded-lg bg-[#2d2d2d] p-2">
                    <CalendarIcon class="h-5 w-5 text-[#6d28d9]" />
                  </div>
                  <div>
                    <h3 class="text-sm text-gray-400">Project Date</h3>
                    <p class="text-white">{{ project.year }}</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="mr-3 rounded-lg bg-[#2d2d2d] p-2">
                    <TagIcon class="h-5 w-5 text-[#6d28d9]" />
                  </div>
                  <div>
                    <h3 class="text-sm text-gray-400">Category</h3>
                    <p class="text-white">
                      {{ getCategoryName(project.category) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="mr-3 rounded-lg bg-[#2d2d2d] p-2">
                    <CodeBracketIcon class="h-5 w-5 text-[#6d28d9]" />
                  </div>
                  <div>
                    <h3 class="text-sm text-gray-400">Technologies</h3>
                    <div class="mt-1 flex flex-wrap gap-2">
                      <span v-for="(tech, i) in project.technologies" :key="i"
                        class="inline-block rounded-full bg-[#2d2d2d] px-2 py-1 text-xs text-gray-300 transition-colors hover:bg-[#333]">
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-3">
                <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank"
                  class="inline-flex transform items-center rounded-full bg-[#6d28d9] px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#5b21b6] hover:shadow-lg">
                  <EyeIcon class="mr-2 h-4 w-4" />
                  Live Demo
                </a>
                <a v-if="project.codeUrl" :href="project.codeUrl" target="_blank"
                  class="inline-flex transform items-center rounded-full border border-[#333] bg-[#1e1e1e] px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#2d2d2d] hover:shadow-lg">
                  <CodeBracketIcon class="mr-2 h-4 w-4" />
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Description -->
        <div class="mb-10">
          <h2 class="modern-section-title mb-6 text-xl font-bold">
            <span class="accent">—</span>
            PROJECT DETAILS
          </h2>
          <div
            class="rounded-xl border border-[#333] bg-[#1e1e1e] p-5 shadow-lg transition-colors duration-300 hover:border-[#6d28d9]/30 sm:p-6">
            <div class="prose prose-invert max-w-none">
              <p class="text-base leading-relaxed text-gray-300 sm:text-lg">
                {{ project.detailedDescription }}
              </p>

              <h3 class="mt-6 mb-3 flex items-center text-lg font-bold text-white sm:text-xl">
                <span class="mr-2.5 inline-block h-6 w-1.5 rounded-full bg-[#6d28d9]"></span>
                Key Features:
              </h3>
              <ul class="space-y-3 pl-1">
                <li v-for="(feature, index) in project.features" :key="index"
                  class="flex items-start text-base text-gray-300 transition-colors duration-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-[#6d28d9]"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd" />
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <h3 class="mt-8 mb-3 flex items-center text-lg font-bold text-white sm:text-xl">
                <span class="mr-2.5 inline-block h-6 w-1.5 rounded-full bg-[#6d28d9]"></span>
                My Role:
              </h3>
              <p class="text-base leading-relaxed text-gray-300 sm:text-lg">
                {{ project.role }}
              </p>

              <h3 class="mt-8 mb-3 flex items-center text-lg font-bold text-white sm:text-xl">
                <span class="mr-2.5 inline-block h-6 w-1.5 rounded-full bg-[#6d28d9]"></span>
                Challenges & Solutions:
              </h3>
              <p class="text-base leading-relaxed text-gray-300 sm:text-lg">
                {{ project.challenges }}
              </p>
            </div>
          </div>
        </div>

        <!-- Project Gallery (if available) -->
        <div v-if="project.gallery && project.gallery.length > 0" class="mb-10">
          <h2 class="modern-section-title mb-6 text-xl font-bold">
            <span class="accent">—</span>
            PROJECT GALLERY
          </h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            <div v-for="(image, index) in project.gallery" :key="index"
              class="group overflow-hidden rounded-xl border border-[#333] bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#6d28d9]/30 hover:shadow-xl">
              <div class="relative aspect-[4/3] overflow-hidden">
                <img :src="image" :alt="`${project.title} screenshot ${index + 1}`"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-[#121212]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Next/Previous Project Navigation -->
        <div class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div v-if="prevProject" class="flex-1">
            <router-link :to="'/portfolio/' + prevProject.id"
              class="group flex w-full items-center rounded-xl border border-[#333] bg-[#1e1e1e] p-4 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[#6d28d9]/30 hover:bg-[#2d2d2d] hover:shadow-xl sm:p-5">
              <div
                class="mr-4 rounded-full bg-[#2d2d2d] p-2.5 text-[#6d28d9] transition-colors duration-300 group-hover:bg-[#6d28d9]/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
              </div>
              <div>
                <div class="mb-0.5 text-sm text-gray-400">Previous Project</div>
                <div class="font-medium text-white transition-colors group-hover:text-[#6d28d9]">
                  {{ prevProject.title }}
                </div>
              </div>
            </router-link>
          </div>
          <div v-else class="hidden flex-1 md:block"></div>

          <div v-if="nextProject" class="flex-1">
            <router-link :to="'/portfolio/' + nextProject.id"
              class="group flex w-full items-center justify-end rounded-xl border border-[#333] bg-[#1e1e1e] p-4 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[#6d28d9]/30 hover:bg-[#2d2d2d] hover:shadow-xl sm:p-5">
              <div class="text-right">
                <div class="mb-0.5 text-sm text-gray-400">Next Project</div>
                <div class="font-medium text-white transition-colors group-hover:text-[#6d28d9]">
                  {{ nextProject.title }}
                </div>
              </div>
              <div
                class="ml-4 rounded-full bg-[#2d2d2d] p-2.5 text-[#6d28d9] transition-colors duration-300 group-hover:bg-[#6d28d9]/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </router-link>
          </div>
          <div v-else class="hidden flex-1 md:block"></div>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else
        class="animate-fadeIn flex flex-col items-center justify-center rounded-xl border border-[#333] bg-[#1e1e1e]/70 p-6 py-16 text-center shadow-lg backdrop-blur-sm sm:p-10 sm:py-20">
        <div class="mb-6 rounded-full bg-[#2d2d2d] p-5 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#6d28d9]" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="mb-3 text-2xl font-bold text-white sm:text-3xl">
          Project Not Found
        </h1>
        <p class="mx-auto mb-8 max-w-md text-gray-400">
          The project you're looking for doesn't exist or has been removed.
          Check out my other projects instead.
        </p>
        <router-link to="/portfolio"
          class="inline-flex transform items-center rounded-full bg-[#6d28d9] px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#5b21b6] hover:shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Portfolio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CalendarIcon,
  TagIcon,
  CodeBracketIcon,
  EyeIcon,
} from "@heroicons/vue/24/solid";
import { useHead } from "@vueuse/head";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { projects } from "../constants/projects";

export default {
  name: "PortfolioDetail",
  components: {
    CalendarIcon,
    TagIcon,
    CodeBracketIcon,
    EyeIcon,
  },
  setup() {
    const route = useRoute();

    const project = computed(() => {
      const projectId = route.params.id;
      return projects.find((p) => p.id === projectId);
    });

    const nextProject = computed(() => {
      if (!project.value) return null;
      const currentIndex = projects.findIndex((p) => p.id === project.value.id);
      return currentIndex < projects.length - 1
        ? projects[currentIndex + 1]
        : null;
    });

    const prevProject = computed(() => {
      if (!project.value) return null;
      const currentIndex = projects.findIndex((p) => p.id === project.value.id);
      return currentIndex > 0 ? projects[currentIndex - 1] : null;
    });

    // SEO meta tags setup
    const pageTitle = computed(() =>
      project.value
        ? `${project.value.title} | Solomon Olatunji's Portfolio`
        : "Project Not Found",
    );
    const pageDescription = computed(() =>
      project.value
        ? project.value.description
        : "Explore my portfolio of web applications, mobile apps projects.",
    );
    const ogImage = computed(() =>
      project.value
        ? project.value.image
        : "https://solomonolatunji.com/og-image.jpg",
    );
    const canonicalUrl = computed(
      () => `https://solomonolatunji.com/portfolio/${route.params.id}`,
    );

    // Schema.org structured data for portfolio project
    const projectSchema = computed(() => {
      if (!project.value) return null;

      return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.value.title,
        description: project.value.description,
        image: project.value.image,
        dateCreated: `${project.value.year}-01-01`,
        creator: {
          "@type": "Person",
          name: "Solomon Olatunji",
          url: "https://solomonolatunji.com/about",
        },
        keywords: project.value.technologies.join(", "),
        url: canonicalUrl.value,
        thumbnailUrl: project.value.image,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl.value,
        },
        publisher: {
          "@type": "Person",
          name: "Solomon Olatunji",
          url: "https://solomonolatunji.com",
        },
      };
    });

    // Set meta tags for SEO
    useHead({
      title: pageTitle,
      meta: [
        {
          name: "description",
          content: pageDescription,
        },
        // OpenGraph tags
        {
          property: "og:title",
          content: pageTitle,
        },
        {
          property: "og:description",
          content: pageDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content: ogImage,
        },
        {
          property: "og:url",
          content: canonicalUrl,
        },
        // Twitter tags
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: pageTitle,
        },
        {
          name: "twitter:description",
          content: pageDescription,
        },
        {
          name: "twitter:image",
          content: ogImage,
        },
        // Project specific tags
        ...(project.value?.technologies.map((tech) => ({
          property: "article:tag",
          content: tech,
        })) || []),
      ],
      link: [
        {
          rel: "canonical",
          href: canonicalUrl,
        },
      ],
      script: [
        {
          type: "application/ld+json",
          children: computed(() => JSON.stringify(projectSchema.value)),
        },
      ],
    });

    function getCategoryName(category) {
      const categories = {
        web: "Web Application",
        mobile: "Mobile Application",
      };
      return categories[category] || category;
    }

    return {
      project,
      nextProject,
      prevProject,
      getCategoryName,
    };
  },
};
</script>

<style scoped>
.prose h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.prose ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
