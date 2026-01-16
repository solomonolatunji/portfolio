<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
    </label>
    <div class="input-container">
      <!-- Left Icon Slot -->
      <div v-if="$slots.iconLeft" class="input-icon input-icon-left">
        <slot name="iconLeft" />
      </div>

      <!-- Input Field -->
      <input
        :id="id"
        v-model="internalValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :class="[
          'input-field',
          {
            'has-icon-left': $slots.iconLeft,
            'has-icon-right': $slots.iconRight || type === 'password',
          },
        ]"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />

      <!-- Right Icon Slot or Password Toggle -->
      <div v-if="type === 'password'" class="input-icon input-icon-right">
        <button
          type="button"
          @click="togglePasswordVisibility"
          class="password-toggle"
          :disabled="disabled"
          tabindex="-1"
        >
          <IconEye v-if="!showPassword" class="icon" />
          <IconEyeOff v-else class="icon" />
        </button>
      </div>
      <div v-else-if="$slots.iconRight" class="input-icon input-icon-right">
        <slot name="iconRight" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { IconEye, IconEyeOff } from "@tabler/icons-vue";

interface InputProps {
  id?: string;
  modelValue: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autocomplete?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  placeholder: "",
  disabled: false,
  required: false,
  autocomplete: "off",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "blur"): void;
  (e: "focus"): void;
}>();

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  }
  return props.type;
});

const internalValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const onBlur = () => {
  emit("blur");
};

const onFocus = () => {
  emit("focus");
};
</script>

<style scoped>
.input-wrapper {
  width: 100%;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(209 213 219);
}

.input-container {
  position: relative;
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: white;
  background-color: rgba(30, 30, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  outline: none;
}

.input-field::placeholder {
  color: rgb(107 114 128);
}

.input-field.has-icon-left {
  padding-left: 3rem;
}

.input-field.has-icon-right {
  padding-right: 3rem;
}

.input-field:focus {
  background-color: rgba(30, 30, 30, 0.7);
  border-color: rgba(109, 40, 217, 0.5);
  box-shadow:
    0 0 0 3px rgba(109, 40, 217, 0.1),
    0 4px 12px rgba(109, 40, 217, 0.15);
}

.input-field:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.input-icon-left {
  left: 1rem;
}

.input-icon-right {
  right: 1rem;
}

.input-icon :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
  color: rgb(107 114 128);
}

.password-toggle {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: color 0.3s ease;
}

.password-toggle:hover:not(:disabled) .icon {
  color: rgb(109 40 217);
}

.password-toggle:disabled {
  cursor: not-allowed;
}

.password-toggle .icon {
  width: 1.25rem;
  height: 1.25rem;
  color: rgb(107 114 128);
  transition: color 0.3s ease;
}
</style>
