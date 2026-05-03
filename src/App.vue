<script setup lang="ts">
import { aboutData, profileLinks } from "@/constants/about";
import AppleIcon from "@/components/icons/AppleIcon.vue";
import EmailIcon from "@/components/icons/EmailIcon.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import GooglePlayIcon from "@/components/icons/GooglePlayIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import LiveIcon from "@/components/icons/LiveIcon.vue";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon.vue";
import XIcon from "@/components/icons/XIcon.vue";
import { projects } from "@/constants/projects";

document.title = "Solomon Olatunji | Portfolio";

const categoryLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  ui: "UI",
};

const profileIcons = {
  github: GitHubIcon,
  email: EmailIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
} as const;

const projectLinkIcons = {
  Live: LiveIcon,
  "Google Play": GooglePlayIcon,
  "App Store": AppleIcon,
} as const;
</script>

<template>
  <main class="portfolio-shell">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Portfolio</p>
        <h1>{{ aboutData.name }}</h1>
        <p class="summary">{{ aboutData.description }}</p>

        <div class="contact-row" aria-label="Profile links">
          <a
            v-for="link in profileLinks"
            :key="link.label"
            class="contact-icon-button"
            :href="link.href"
            :aria-label="link.label"
            :target="link.label === 'Email' ? undefined : '_blank'"
            :rel="link.label === 'Email' ? undefined : 'noreferrer'"
          >
            <component :is="profileIcons[link.icon]" aria-hidden="true" />
            <span class="contact-tooltip">{{ link.label }}</span>
          </a>
        </div>
      </div>
    </section>

    <section class="projects-section">
      <div class="section-heading">
        <p class="eyebrow">Selected Work</p>
        <h2>Projects</h2>
        <p class="section-copy">
          Product and engineering work across fintech, mobile apps, education, commerce, and
          internal tools.
        </p>
      </div>

      <div class="projects-grid">
        <article v-for="project in projects" :key="project.id" class="project-card">
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

          <ul class="tech-list" aria-label="Technologies used">
            <li v-for="technology in project.technologies" :key="`${project.id}-${technology}`">
              {{ technology }}
            </li>
          </ul>

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
                v-if="projectLinkIcons[link.label as keyof typeof projectLinkIcons]"
                :is="projectLinkIcons[link.label as keyof typeof projectLinkIcons]"
                aria-hidden="true"
              />
              <span class="project-link-text">{{ link.label }}</span>
            </a>
          </div>
        </article>
      </div>
    </section>

    <footer class="site-footer">
      <p>&copy; 2026 Akinlabi</p>
    </footer>
  </main>
</template>
