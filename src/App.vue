<script setup lang="ts">
import HeroSection from "@/components/HeroSection.vue";
import ProjectsSection from "@/components/ProjectsSection.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import GuestbookSection from "@/components/GuestbookSection.vue";

const isGuestbook = window.location.pathname === "/guestbook";
document.title = isGuestbook ? "Guestbook | Solomon Olatunji" : "Solomon Olatunji | Portfolio";
</script>

<template>
  <main class="portfolio-shell">
    <GuestbookSection v-if="isGuestbook" />
    <template v-else>
      <HeroSection />
      <ProjectsSection />
    </template>
    <SiteFooter />
  </main>
</template>
