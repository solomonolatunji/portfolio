<template>
  <div class="select-wrapper">
    <label v-if="label" :for="id" class="select-label">
      {{ label }}
    </label>
    <div class="select-container" ref="container">
      <button
        type="button"
        :id="id"
        @click="toggleDropdown"
        :disabled="disabled"
        class="select-button"
        :class="{ 'is-open': isOpen, 'has-error': error }"
      >
        <span class="select-value" :class="{ 'is-placeholder': !selectedOption }">
          {{ selectedOption ? selectedOption.label : placeholder }}
        </span>
        <span class="select-icon">
          <IconChevronDown class="icon" :class="{ 'is-rotated': isOpen }" />
        </span>
      </button>

      <transition name="fade">
        <div v-if="isOpen" class="select-dropdown">
          <ul class="select-options">
            <li
              v-for="option in options"
              :key="option.value"
              @click="selectOption(option)"
              class="select-option"
              :class="{ 'is-selected': modelValue === option.value }"
            >
              {{ option.label }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <span v-if="error" class="select-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { IconChevronDown } from "@tabler/icons-vue";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  id?: string;
  modelValue: string | number;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: "Select an option",
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "change", value: string | number): void;
}>();

const isOpen = ref(false);
const container = ref<HTMLElement | null>(null);

const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue);
});

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option: Option) => {
  emit("update:modelValue", option.value);
  emit("change", option.value);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (container.value && !container.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<style scoped>
.select-wrapper {
  width: 100%;
}

.select-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(209 213 219);
}

.select-container {
  position: relative;
  width: 100%;
}

.select-button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: white;
  background-color: rgba(30, 30, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
}

.select-button:hover:not(:disabled) {
  background-color: rgba(40, 40, 40, 0.6);
  border-color: rgba(255, 255, 255, 0.2);
}

.select-button:focus:not(:disabled),
.select-button.is-open {
  background-color: rgba(30, 30, 30, 0.7);
  border-color: rgba(109, 40, 217, 0.5);
  box-shadow:
    0 0 0 3px rgba(109, 40, 217, 0.1),
    0 4px 12px rgba(109, 40, 217, 0.15);
}

.select-button.has-error {
  border-color: rgba(239, 68, 68, 0.5);
}

.select-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.select-value.is-placeholder {
  color: rgb(107 114 128);
}

.select-icon .icon {
  width: 1.25rem;
  height: 1.25rem;
  color: rgb(107 114 128);
  transition: transform 0.3s ease;
}

.select-icon .icon.is-rotated {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 50;
  width: 100%;
  overflow: hidden;
  background-color: #1e1e1e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
}

.select-options {
  max-height: 200px;
  padding: 0.5rem;
  overflow-y: auto;
  list-style: none;
}

.select-option {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: rgb(209 213 219);
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.select-option:hover {
  color: white;
  background-color: rgba(109, 40, 217, 0.1);
}

.select-option.is-selected {
  color: white;
  background-color: rgba(109, 40, 217, 0.2);
}

.select-error {
  display: block;
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: rgb(239 68, 68);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
