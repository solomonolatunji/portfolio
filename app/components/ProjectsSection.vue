<script setup lang="ts">
import AppleIcon from "@/components/icons/AppleIcon.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import GooglePlayIcon from "@/components/icons/GooglePlayIcon.vue";
import LiveIcon from "@/components/icons/LiveIcon.vue";
import { projects } from "@/constants/projects";

const categoryLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  ui: "UI",
};

const projectLinkIcons = {
  Live: LiveIcon,
  GitHub: GitHubIcon,
  "Google Play": GooglePlayIcon,
  "App Store": AppleIcon,
} as const;
</script>

<template>
  <section id="projects" class="projects-section">
    <div class="section-heading">
      <p class="eyebrow">Selected Work</p>
      <h2>Projects</h2>
    </div>

    <div class="projects-grid">
      <article v-for="project in projects" :key="project.id" class="project-row">
        <div class="project-meta">
          <span class="project-category">
            {{ categoryLabels[project.category] ?? project.category }}
          </span>
          <span class="project-year">{{ project.year }}</span>
        </div>

        <div class="project-body">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </div>

        <div class="project-links">
          <a
            v-for="link in project.links"
            :key="`${project.id}-${link.label}`"
            :href="link.href"
            class="project-link-button"
            :aria-label="`${project.title} ${link.label}`"
            target="_blank"
            rel="noreferrer"
          >
            <component
              :is="projectLinkIcons[link.label as keyof typeof projectLinkIcons]"
              v-if="projectLinkIcons[link.label as keyof typeof projectLinkIcons]"
              aria-hidden="true"
            />
            <span class="project-link-text">{{ link.label }}</span>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
