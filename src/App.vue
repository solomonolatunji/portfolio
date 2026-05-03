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

document.title = "Akinlabi Olatunji | Portfolio";

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
        <p class="hero-support">
          I build products end-to-end, from mobile clients and frontends to backend systems that
          need to ship and hold up in production.
        </p>

        <a class="hero-cta" href="#projects">View Projects</a>

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

    <section id="projects" class="projects-section">
      <div class="section-heading">
        <p class="eyebrow">Selected Work</p>
        <h2>Projects</h2>
        <p class="section-copy">
          A focused selection up front, with the full project list still available below when you
          want to browse everything.
        </p>
      </div>

      <div class="projects-grid">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          :class="{ 'project-card-featured': project.featured }"
        >
          <div class="project-meta">
            <span class="project-category">
              {{ categoryLabels[project.category] ?? project.category }}
            </span>
            <span class="project-year">{{ project.year }}</span>
          </div>

          <div class="project-body">
            <div class="project-heading">
              <h3>{{ project.title }}</h3>
              <span v-if="project.featured" class="featured-badge">Featured</span>
            </div>
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
