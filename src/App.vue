<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { aboutData, profileLinks } from "@/constants/about";
import AppleIcon from "@/components/icons/AppleIcon.vue";
import EmailIcon from "@/components/icons/EmailIcon.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import GooglePlayIcon from "@/components/icons/GooglePlayIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import LiveIcon from "@/components/icons/LiveIcon.vue";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon.vue";
import XIcon from "@/components/icons/XIcon.vue";
import type { NowPlaying } from "@/interfaces/now-playing";
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
  GitHub: GitHubIcon,
  "Google Play": GooglePlayIcon,
  "App Store": AppleIcon,
} as const;

const nowPlaying = ref<NowPlaying | null>(null);
const nowPlayingLoaded = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get<NowPlaying>("/api/now-playing", {
      validateStatus: (status) => status === 200 || status === 204,
    });

    if (response.status === 200) {
      nowPlaying.value = response.data;
    }
  } catch {
    // Silent failure keeps the hero minimal when music APIs aren't configured.
  } finally {
    nowPlayingLoaded.value = true;
  }
});
</script>

<template>
  <main class="portfolio-shell">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Software Engineer</p>
        <h1>{{ aboutData.name }}</h1>
        <p class="summary">{{ aboutData.description }}</p>

        <p class="hero-currently">
          <span>Currently</span>
          building production mobile apps, backend systems, and product-focused software for real
          users.
        </p>

        <div v-if="nowPlaying" class="listening-card" aria-label="Currently listening">
          <img
            v-if="nowPlaying.artworkUrl"
            :src="nowPlaying.artworkUrl"
            :alt="`${nowPlaying.title} cover art`"
            class="listening-artwork"
            loading="lazy"
          />

          <div class="listening-copy">
            <span class="listening-label">
              {{ nowPlaying.isPlaying ? "Currently Listening" : "Last Played" }}
            </span>
            <p class="listening-track">{{ nowPlaying.title }}</p>
            <p class="listening-artist">{{ nowPlaying.artist }}</p>
            <div class="listening-links">
              <a :href="nowPlaying.spotifyUrl" target="_blank" rel="noreferrer">Spotify</a>
              <a
                v-if="nowPlaying.appleMusicUrl"
                :href="nowPlaying.appleMusicUrl"
                target="_blank"
                rel="noreferrer"
              >
                Apple Music
              </a>
              <a v-if="nowPlaying.youtubeUrl" :href="nowPlaying.youtubeUrl" target="_blank" rel="noreferrer">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div v-else-if="nowPlayingLoaded" class="listening-fallback" aria-label="Listening unavailable">
          <span class="listening-label">Currently Listening</span>
          <p>No live track right now.</p>
        </div>

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
          </a>
        </div>
      </div>
    </section>

    <section id="projects" class="projects-section">
      <div class="section-heading">
        <p class="eyebrow">Selected Work</p>
        <h2>Projects</h2>
      </div>

      <div class="projects-grid">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-row"
        >
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
      <p>&copy; 2026 Solomon</p>
    </footer>
  </main>
</template>
