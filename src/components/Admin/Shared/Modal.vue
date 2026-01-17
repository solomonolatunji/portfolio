<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4 backdrop-blur-sm sm:p-6"
        @click="close"
      >
        <div
          class="relative w-full max-w-lg transform rounded-2xl border border-white/10 bg-[#1e1e1e] p-6 text-left shadow-xl transition-all"
          @click.stop
        >
          <!-- Header -->
          <div class="mb-5 flex items-center justify-between">
            <h3 class="text-xl font-bold text-white">
              <slot name="title">{{ title }}</slot>
            </h3>
            <button
              @click="close"
              class="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>

          <!-- Content -->
          <div class="mb-6">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="flex justify-end gap-3">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { IconX } from "@tabler/icons-vue";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
