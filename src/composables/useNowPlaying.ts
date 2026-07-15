import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { NowPlaying } from "@/interfaces/now-playing";

export function useNowPlaying() {
  const nowPlayingQuery = useQuery({
    queryKey: ["now-playing"],
    queryFn: async () => {
      const response = await fetch(`/now-playing?t=${Date.now()}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (response.status === 200) {
        return (await response.json()) as NowPlaying;
      }

      return null;
    },
    placeholderData: (previousData) => previousData,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 60_000,
    retry: false,
  });

  const nowPlaying = computed(() => nowPlayingQuery.data.value ?? null);
  const nowPlayingLoaded = computed(() => nowPlayingQuery.isFetched.value);
  const isListeningModalOpen = ref(false);

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

  function handleGlobalKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && isListeningModalOpen.value) {
      closeListeningModal();
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handleGlobalKeydown);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleGlobalKeydown);
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
