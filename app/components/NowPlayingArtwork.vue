<script setup lang="ts">
defineProps<{
  artworkUrl?: string;
  title: string;
}>();
</script>

<template>
  <div class="artwork-wrap" aria-hidden="true">
    <img
      v-if="artworkUrl"
      :src="artworkUrl"
      :alt="`${title} cover art`"
      class="artwork-img"
      loading="lazy"
    >
    <div v-else class="artwork-placeholder">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18V5l12-2v13"
          stroke="rgba(255,255,255,0.2)"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="6" cy="18" r="3" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
        <circle cx="18" cy="16" r="3" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
      </svg>
    </div>

    <div class="artwork-shine" />
  </div>
</template>

<style scoped>
.artwork-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding: 28px 28px 0;
}

.artwork-img {
  width: var(--lm-artwork-size, 220px);
  height: var(--lm-artwork-size, 220px);
  border-radius: 12px;
  object-fit: cover;
  display: block;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 24px 56px rgba(0, 0, 0, 0.7),
    0 4px 12px rgba(0, 0, 0, 0.5);
  animation: artwork-pop 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
}

.artwork-placeholder {
  width: var(--lm-artwork-size, 220px);
  height: var(--lm-artwork-size, 220px);
  border-radius: 12px;
  background: var(--bg-elevated, #0b0b0b);
  border: 1px solid var(--line, #242424);
  display: flex;
  align-items: center;
  justify-content: center;
}

.artwork-shine {
  position: absolute;
  top: 28px;
  left: 28px;
  right: 28px;
  bottom: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, transparent 50%);
  pointer-events: none;
}

@keyframes artwork-pop {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(8px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (max-width: 480px) {
  .artwork-wrap {
    padding: 22px 22px 0;
  }

  .artwork-shine {
    top: 22px;
    left: 22px;
    right: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .artwork-img {
    animation: none;
  }
}
</style>
