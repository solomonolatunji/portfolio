<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'button',
      `button-${variant}`,
      `button-${size}`,
      {
        'button-loading': loading,
        'button-full-width': fullWidth,
      },
    ]"
  >
    <!-- Button Background Effect -->
    <div v-if="variant === 'primary'" class="button-background"></div>

    <!-- Button Content -->
    <span class="button-content">
      <!-- Loading Spinner -->
      <svg
        v-if="loading"
        class="button-spinner"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="spinner-track"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="spinner-head"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <!-- Icon Left -->
      <span v-if="$slots.iconLeft && !loading" class="button-icon">
        <slot name="iconLeft" />
      </span>

      <!-- Text -->
      <span class="button-text">
        <slot>{{ loading ? loadingText : text }}</slot>
      </span>

      <!-- Icon Right -->
      <span v-if="$slots.iconRight && !loading" class="button-icon">
        <slot name="iconRight" />
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  text?: string;
  loadingText?: string;
}

withDefaults(defineProps<ButtonProps>(), {
  type: "button",
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  fullWidth: false,
  loadingText: "Loading...",
});
</script>

<style scoped>
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  outline: none;
  overflow: hidden;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.button-full-width {
  width: 100%;
}

/* Sizes */
.button-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.button-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.button-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Primary Variant */
.button-primary {
  color: white;
  background: linear-gradient(to right, #6d28d9, #8b5cf6);
  box-shadow: 0 4px 14px 0 rgba(109, 40, 217, 0.3);
}

.button-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px 0 rgba(109, 40, 217, 0.5);
}

.button-primary:active:not(:disabled) {
  transform: translateY(0);
}

.button-primary .button-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #8b5cf6, #9f7aea);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.button-primary:hover:not(:disabled) .button-background {
  opacity: 1;
}

/* Secondary Variant */
.button-secondary {
  color: white;
  background-color: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.button-secondary:hover:not(:disabled) {
  background-color: rgba(45, 45, 45, 0.8);
  border-color: rgba(109, 40, 217, 0.3);
}

/* Outline Variant */
.button-outline {
  color: #6d28d9;
  background-color: transparent;
  border: 2px solid #6d28d9;
}

.button-outline:hover:not(:disabled) {
  background-color: rgba(109, 40, 217, 0.1);
  border-color: #8b5cf6;
  color: #8b5cf6;
}

/* Ghost Variant */
.button-ghost {
  color: #6d28d9;
  background-color: transparent;
}

.button-ghost:hover:not(:disabled) {
  background-color: rgba(109, 40, 217, 0.1);
  color: #8b5cf6;
}

/* Button Content */
.button-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 1;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-icon :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.button-text {
  white-space: nowrap;
}

/* Loading Spinner */
.button-spinner {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

.spinner-track {
  opacity: 0.25;
}

.spinner-head {
  opacity: 0.75;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
