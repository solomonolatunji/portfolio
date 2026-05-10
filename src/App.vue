<script setup lang="ts">
import axios from "axios";
import { useQuery } from "@tanstack/vue-query";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { aboutData, activeProducts, profileLinks } from "@/constants/about";
import AppleIcon from "@/components/icons/AppleIcon.vue";
import AppleMusicIcon from "@/components/icons/AppleMusicIcon.vue";
import EmailIcon from "@/components/icons/EmailIcon.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import GooglePlayIcon from "@/components/icons/GooglePlayIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import ListeningModal from "@/components/ListeningModal.vue";
import ListeningBarsIcon from "@/components/icons/ListeningBarsIcon.vue";
import LiveIcon from "@/components/icons/LiveIcon.vue";
import SpotifyIcon from "@/components/icons/SpotifyIcon.vue";
import YouTubeMusicIcon from "@/components/icons/YouTubeMusicIcon.vue";
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

const nowPlayingQuery = useQuery({
  queryKey: ["now-playing"],
  queryFn: async () => {
    const response = await axios.get<NowPlaying>("/api/now-playing", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      params: {
        t: Date.now(),
      },
      validateStatus: (status) => status === 200 || status === 204,
    });

    if (response.status === 200) {
      return response.data;
    }

    return null;
  },
  placeholderData: (previousData) => previousData,
  refetchInterval: 5000,
  refetchIntervalInBackground: true,
  refetchOnWindowFocus: true,
  staleTime: 0,
  gcTime: 60_000,
  retry: false,
});

const nowPlaying = computed(() => nowPlayingQuery.data.value ?? null);
const nowPlayingLoaded = computed(() => nowPlayingQuery.isFetched.value);
const isListeningModalOpen = ref(false);

const listeningStateLabel = computed(() =>
  nowPlaying.value?.isPlaying ? "Currently Listening" : "Last Played"
);

function openListeningModal() {
  if (!nowPlaying.value) {
    return;
  }

  isListeningModalOpen.value = true;
}

function closeListeningModal() {
  isListeningModalOpen.value = false;
}

function handleGlobalKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && isListeningModalOpen.value) {
    closeListeningModal();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleGlobalKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
});
</script>

<template>
  <main class="portfolio-shell">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Software Engineer</p>
        <h1>{{ aboutData.name }}</h1>

        <div class="hero-building-row" aria-label="Products currently building">
          <span class="hero-building-label">Building</span>
          <template v-for="(product, index) in activeProducts" :key="product.label">
            <div class="hero-building-item">
              <img :src="product.logo" :alt="`${product.label} logo`" class="hero-building-logo" />
              <span>{{ product.label }}</span>
            </div>
            <span v-if="index < activeProducts.length - 1" class="hero-building-separator"
              >and</span
            >
          </template>
        </div>

        <button
          v-if="nowPlaying"
          type="button"
          class="listening-card"
          aria-label="Open listening details"
          @click="openListeningModal"
        >
          <img
            v-if="nowPlaying.artworkUrl"
            :src="nowPlaying.artworkUrl"
            :alt="`${nowPlaying.title} cover art`"
            class="listening-artwork"
            loading="lazy"
          />

          <div class="listening-copy">
            <span class="listening-label">
              {{ listeningStateLabel }}
            </span>
            <div class="listening-text">
              <p class="listening-track">{{ nowPlaying.title }}</p>
              <p class="listening-artist">{{ nowPlaying.artist }}</p>
              <p v-if="nowPlaying.deviceName || nowPlaying.deviceType" class="listening-device">
                Playing on {{ nowPlaying.deviceName ?? nowPlaying.deviceType }}
              </p>
            </div>
            <div class="listening-side">
              <div
                class="listening-beam"
                :class="{ paused: !nowPlaying.isPlaying }"
                aria-hidden="true"
              >
                <ListeningBarsIcon />
              </div>
              <div class="listening-links" aria-label="Listening links">
                <a
                  :href="nowPlaying.spotifyUrl"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open on Spotify"
                >
                  <SpotifyIcon />
                </a>
                <a
                  v-if="nowPlaying.appleMusicUrl"
                  :href="nowPlaying.appleMusicUrl"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open on Apple Music"
                >
                  <AppleMusicIcon />
                </a>
                <a
                  v-if="nowPlaying.youtubeUrl"
                  :href="nowPlaying.youtubeUrl"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open on YouTube Music"
                >
                  <YouTubeMusicIcon />
                </a>
              </div>
            </div>
          </div>
        </button>

        <div
          v-else-if="nowPlayingLoaded"
          class="listening-fallback"
          aria-label="Listening unavailable"
        >
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

    <ListeningModal
      v-if="nowPlaying && isListeningModalOpen"
      :now-playing="nowPlaying"
      :state-label="listeningStateLabel"
      @close="closeListeningModal"
    />
  </main>
</template>
