<script setup lang="ts">
import ListeningBarsIcon from "@/components/icons/ListeningBarsIcon.vue";
</script>

<template>
  <div class="waveform" aria-label="Playing" aria-hidden="true">
    <ListeningBarsIcon />
  </div>
</template>

<style scoped>
.waveform {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  border-radius: 999px;
  background: rgba(18, 18, 18, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  width: 2.5rem;
  height: 4.9rem;
  transform: none;
}

.waveform :deep(svg) {
  width: 1.4rem;
  height: 3.3rem;
  fill: #d0c0a8;
  transform: rotate(90deg);
}

.waveform :deep(.bar) {
  transform-origin: center;
  animation: wf-pulse 1s ease-in-out infinite;
}

.waveform :deep(.bar-2) {
  animation-delay: 0.12s;
}

.waveform :deep(.bar-3) {
  animation-delay: 0.24s;
}

.waveform :deep(.bar-4) {
  animation-delay: 0.36s;
}

@keyframes wf-pulse {
  0%,
  100% {
    transform: scaleY(0.45);
    opacity: 0.55;
  }

  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .waveform :deep(.bar) {
    animation: none;
    transform: scaleY(0.72);
  }
}
</style>
