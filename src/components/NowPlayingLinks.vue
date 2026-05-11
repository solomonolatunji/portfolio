<script setup lang="ts">
import { siApplemusic, siSpotify, siYoutubemusic } from "simple-icons";
import type { NowPlaying } from "@/interfaces/now-playing";

defineProps<{
  nowPlaying: NowPlaying;
}>();
</script>

<template>
  <hr class="lm-divider" aria-hidden="true" />

  <div class="lm-links" aria-label="Listen on streaming services">
    <a
      :href="nowPlaying.spotifyUrl"
      target="_blank"
      rel="noreferrer"
      class="lm-link lm-link--spotify"
    >
      <span class="lm-link-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path :fill="`#${siSpotify.hex}`" :d="siSpotify.path" />
        </svg>
      </span>
      <span class="lm-link-label">Spotify</span>
      <span class="lm-link-arrow" aria-hidden="true">↗</span>
    </a>

    <a
      v-if="nowPlaying.appleMusicUrl"
      :href="nowPlaying.appleMusicUrl"
      target="_blank"
      rel="noreferrer"
      class="lm-link lm-link--apple"
    >
      <span class="lm-link-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path :fill="`#${siApplemusic.hex}`" :d="siApplemusic.path" />
        </svg>
      </span>
      <span class="lm-link-label">Apple Music</span>
      <span class="lm-link-arrow" aria-hidden="true">↗</span>
    </a>

    <a
      v-if="nowPlaying.youtubeUrl"
      :href="nowPlaying.youtubeUrl"
      target="_blank"
      rel="noreferrer"
      class="lm-link lm-link--youtube"
    >
      <span class="lm-link-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path :fill="`#${siYoutubemusic.hex}`" :d="siYoutubemusic.path" />
        </svg>
      </span>
      <span class="lm-link-label">YouTube Music</span>
      <span class="lm-link-arrow" aria-hidden="true">↗</span>
    </a>
  </div>
</template>

<style scoped>
.lm-divider {
  margin: 0;
  border: none;
  border-top: 1px solid var(--line, #242424);
  width: 100%;
}

.lm-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lm-link {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  position: relative;
  overflow: hidden;
  transition:
    background 0.18s,
    border-color 0.18s,
    color 0.18s,
    transform 0.15s;
  backdrop-filter: blur(6px);
}

.lm-link::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.18s;
}

.lm-link:hover {
  transform: translateY(-1px);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.14);
}

.lm-link:hover::before {
  opacity: 1;
}

.lm-link:active {
  transform: translateY(0);
}

.lm-link:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.35);
  outline-offset: 2px;
}

.lm-link--spotify::before {
  background: linear-gradient(90deg, rgba(29, 185, 84, 0.07) 0%, transparent 60%);
}

.lm-link--spotify:hover {
  border-color: rgba(29, 185, 84, 0.25);
  background: rgba(29, 185, 84, 0.06);
}

.lm-link--apple::before {
  background: linear-gradient(90deg, rgba(252, 60, 68, 0.08) 0%, transparent 60%);
}

.lm-link--apple:hover {
  border-color: rgba(252, 60, 68, 0.25);
  background: rgba(252, 60, 68, 0.06);
}

.lm-link--youtube::before {
  background: linear-gradient(90deg, rgba(255, 0, 0, 0.07) 0%, transparent 60%);
}

.lm-link--youtube:hover {
  border-color: rgba(255, 0, 0, 0.22);
  background: rgba(255, 0, 0, 0.05);
}

.lm-link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.lm-link-icon > * {
  width: 18px;
  height: 18px;
}

.lm-link-label {
  flex: 1;
}

.lm-link-arrow {
  font-size: 0.8rem;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition:
    opacity 0.18s,
    transform 0.18s;
  color: rgba(255, 255, 255, 0.4);
}

.lm-link:hover .lm-link-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

@media (max-width: 480px) {
  .lm-links {
    gap: 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lm-link,
  .lm-link-arrow {
    transition: none !important;
  }
}
</style>
