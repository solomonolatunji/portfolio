<script setup lang="ts">
import NowPlayingArtwork from "./NowPlayingArtwork.vue";
import NowPlayingLinks from "./NowPlayingLinks.vue";
import NowPlayingWaveform from "./NowPlayingWaveform.vue";
import type { NowPlaying } from "@/interfaces/now-playing";

defineProps<{
  nowPlaying: NowPlaying;
  stateLabel: string;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <Teleport to="body">
    <div class="lm-backdrop" role="presentation" @click="emit('close')">
      <div class="lm-shell" role="dialog" aria-modal="true" aria-labelledby="lm-title" @click.stop>
        <div class="lm-bg-layer" aria-hidden="true">
          <img v-if="nowPlaying.artworkUrl" :src="nowPlaying.artworkUrl" alt="" class="lm-bg-img" >
          <div class="lm-bg-overlay" />
          <div class="lm-bg-eclipse" />
          <div class="lm-bg-noise" />
        </div>

        <button
          type="button"
          class="lm-close"
          aria-label="Close listening details"
          @click="emit('close')"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <NowPlayingArtwork :artwork-url="nowPlaying.artworkUrl" :title="nowPlaying.title" />

        <div v-if="nowPlaying.isPlaying" class="lm-wave-slot" aria-hidden="true">
          <NowPlayingWaveform />
        </div>

        <div class="lm-body">
          <div class="lm-label-row">
            <span class="lm-pulse" aria-hidden="true">
              <span class="lm-pulse-dot" />
            </span>
            <span class="lm-label">{{ stateLabel }}</span>
          </div>

          <div class="lm-meta">
            <h3 id="lm-title" class="lm-title">{{ nowPlaying.title }}</h3>
            <p class="lm-artist">{{ nowPlaying.artist }}</p>
            <p v-if="nowPlaying.album" class="lm-album">{{ nowPlaying.album }}</p>
          </div>

          <div v-if="nowPlaying.deviceName || nowPlaying.deviceType" class="lm-device">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect
                x="2"
                y="3"
                width="20"
                height="14"
                rx="2"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path
                d="M8 21H16M12 17V21"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
            {{ nowPlaying.deviceName ?? nowPlaying.deviceType }}
          </div>

          <NowPlayingLinks :now-playing="nowPlaying" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.lm-shell {
  --lm-artwork-size: 220px;
}

.lm-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: lm-fade-in 0.22s ease both;
}

.lm-shell {
  position: relative;
  width: min(420px, 100%);
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-card, #101010);
  border: 1px solid var(--line, #242424);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.4),
    0 40px 80px rgba(0, 0, 0, 0.7),
    0 8px 20px rgba(0, 0, 0, 0.5);
  animation: lm-slide-up 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.lm-bg-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.lm-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(48px) saturate(1.6) brightness(0.28);
  transform: scale(1.15);
}

.lm-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    170deg,
    rgba(16, 16, 16, 0.42) 0%,
    rgba(16, 16, 16, 0.84) 52%,
    rgba(10, 10, 10, 0.97) 100%
  );
}

.lm-bg-noise {
  position: absolute;
  inset: 0;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}

.lm-bg-eclipse {
  position: absolute;
  left: 50%;
  bottom: 12%;
  width: 88%;
  height: 18%;
  transform: translateX(-50%);
  opacity: 0.4;
  pointer-events: none;
}

.lm-bg-eclipse::before,
.lm-bg-eclipse::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 100%;
  border-radius: 50%;
  background:
    radial-gradient(circle at center, rgba(255, 255, 255, 0.12) 0, rgba(255, 255, 255, 0) 62%),
    repeating-radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.08) 0 1px,
      transparent 1px 14px
    );
  filter: blur(0.5px);
}

.lm-bg-eclipse::after {
  transform: scale(1.05) translateY(7%);
  opacity: 0.48;
}

.lm-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 10;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--line-strong, #333);
  background: rgba(255, 255, 255, 0.05);
  color: var(--muted, #a3a3a3);
  cursor: pointer;
  transition:
    background 0.18s,
    color 0.18s,
    transform 0.18s;
  backdrop-filter: blur(4px);
}

.lm-close:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--text, #f5f5f5);
  transform: rotate(90deg);
}

.lm-close:focus-visible {
  outline: 2px solid var(--line-strong, #333);
  outline-offset: 2px;
}

.lm-wave-slot {
  position: absolute;
  top: 50%;
  right: 14px;
  z-index: 2;
  transform: translateY(-50%);
}

.lm-body {
  position: relative;
  z-index: 1;
  padding: 20px 28px 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.lm-label-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lm-pulse {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
}

.lm-pulse-dot {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1db954;
  box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.5);
  animation: lm-pulse-ring 2s ease-out infinite;
}

.lm-label {
  font-size: 0.64rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--soft, #737373);
  font-family: ui-monospace, "SF Mono", "Cascadia Mono", monospace;
}

.lm-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.lm-title {
  margin: 0;
  font-size: clamp(1.15rem, 4.4vw, 1.45rem);
  font-weight: 700;
  color: var(--text, #f5f5f5);
  letter-spacing: -0.02em;
  line-height: 1.15;
  font-family: "Georgia", "Times New Roman", serif;
}

.lm-artist {
  margin: 0;
  font-size: 0.93rem;
  color: var(--muted, #a3a3a3);
  font-weight: 400;
  letter-spacing: 0.01em;
}

.lm-album {
  margin: 0;
  font-size: 0.8rem;
  color: var(--soft, #737373);
  font-style: italic;
}

.lm-device {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  font-size: 0.72rem;
  font-family: ui-monospace, "SF Mono", monospace;
  color: var(--soft, #737373);
  background: var(--chip, #171717);
  border: 1px solid var(--chip-border, #2a2a2a);
  border-radius: 999px;
  padding: 4px 10px;
  letter-spacing: 0.03em;
}

@keyframes lm-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes lm-slide-up {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes lm-pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.55);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(29, 185, 84, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(29, 185, 84, 0);
  }
}

@media (max-width: 480px) {
  .lm-shell {
    --lm-artwork-size: 175px;
  }

  .lm-backdrop {
    align-items: flex-end;
    padding: 0;
  }

  .lm-shell {
    width: 100%;
    border-radius: 24px 24px 0 0;
    animation: lm-sheet-up 0.34s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .lm-body {
    padding: 16px 22px 32px;
    gap: 12px;
  }

  .lm-wave-slot {
    right: 10px;
  }
}

@media (max-width: 360px) {
  .lm-shell {
    --lm-artwork-size: 145px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lm-backdrop,
  .lm-shell,
  .lm-close,
  .lm-pulse-dot {
    animation: none !important;
    transition: none !important;
  }
}

@keyframes lm-sheet-up {
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
