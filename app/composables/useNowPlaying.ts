import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { NowPlaying } from "@/interfaces/now-playing";

export async function useNowPlaying() {
  const { data, status, refresh } = await useAsyncData<NowPlaying | null>(
    "now-playing",
    async () => {
      try {
        return await $fetch<NowPlaying | null>("/now-playing");
      } catch {
        return null;
      }
    },
    {
      default: () => null,
      dedupe: "defer",
      server: true,
    }
  );

  const nowPlaying = computed(() => data.value ?? null);
  const nowPlayingLoaded = computed(() => status.value !== "pending");
  const isListeningModalOpen = ref(false);
  let refreshTimer: ReturnType<typeof setInterval> | undefined;

  const listeningStateLabel = computed(() =>
    nowPlaying.value?.isPlaying ? "I'm currently listening to" : "Last Played"
  );
  const listeningDeviceLabel = computed(
    () => nowPlaying.value?.deviceName ?? nowPlaying.value?.deviceType ?? null
  );

  function openListeningModal() {
    if (!nowPlaying.value) {
      return;
    }
    isListeningModalOpen.value = true;
  }

  function closeListeningModal() {
    isListeningModalOpen.value = false;
  }

  function refreshNowPlaying() {
    void refresh();
  }

  function handleGlobalKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && isListeningModalOpen.value) {
      closeListeningModal();
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handleGlobalKeydown);
    window.addEventListener("focus", refreshNowPlaying);
    refreshTimer = setInterval(refreshNowPlaying, 5_000);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleGlobalKeydown);
    window.removeEventListener("focus", refreshNowPlaying);
    if (refreshTimer) {
      clearInterval(refreshTimer);
    }
  });

  return {
    nowPlaying,
    nowPlayingLoaded,
    isListeningModalOpen,
    listeningStateLabel,
    listeningDeviceLabel,
    openListeningModal,
    closeListeningModal,
  };
}
