import { ref } from "vue";

type AuthModalMode = "login" | "signup";

const isOpen = ref(false);
const mode = ref<AuthModalMode>("login");

export function useAuthModal() {
  const openModal = (initialMode: AuthModalMode = "login") => {
    mode.value = initialMode;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  const switchMode = (newMode: AuthModalMode) => {
    mode.value = newMode;
  };

  return {
    isOpen,
    mode,
    openModal,
    closeModal,
    switchMode,
  };
}
