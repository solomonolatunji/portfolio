<script setup lang="ts">
import HeroSection from "@/components/HeroSection.vue";
import ProjectsSection from "@/components/ProjectsSection.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import GuestbookSection from "@/components/GuestbookSection.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import { profileLinks } from "@/constants/about";

const isGuestbook = window.location.pathname === "/guestbook";
document.title = isGuestbook ? "Guestbook | Solomon Olatunji" : "Solomon Olatunji | Portfolio";
</script>

<template>
  <main class="portfolio-shell">
    <nav class="site-nav" aria-label="Primary navigation">
      <a href="/" class="site-mark">SO<span>/</span>26</a>
      <div class="site-nav-links">
        <a href="/" :class="{ active: !isGuestbook }">Home</a>
        <span aria-hidden="true">/</span>
        <a href="/guestbook" :class="{ active: isGuestbook }">Guestbook</a>
        <a
          :href="profileLinks[0].href"
          class="site-github-link"
          aria-label="Open Solomon's GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
      </div>
    </nav>
    <GuestbookSection v-if="isGuestbook" />
    <template v-else>
      <HeroSection />
      <ProjectsSection />
    </template>
    <SiteFooter />
  </main>
</template>
