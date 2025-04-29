import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  Media,
  MediaFilters,
  MediaResponse,
  UploadMediaResponse,
} from "@/interfaces/media";
import { api } from "./api";

export const useMediaStore = defineStore("media", () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const mediaItems = ref<Media[]>([]);
  const pagination = ref({
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 15,
    to: 0,
    total: 0,
  });

  const getMediaItems = computed(() => mediaItems.value);
  const getPagination = computed(() => pagination.value);
  const getIsLoading = computed(() => isLoading.value);
  const getError = computed(() => error.value);

  /**
   * Fetch all media items with optional filters
   */
  const fetchMedia = async (filters: MediaFilters = {}) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await api.get<MediaResponse>("/media", {
        params: filters,
      });

      mediaItems.value = response.data.data;
      pagination.value = response.data.meta;
      return response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || err.message || "Failed to fetch media";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Upload a new media file
   */
  const uploadMedia = async (
    file: File,
    isFeatured?: boolean,
    altText?: string,
    directory?: string
  ) => {
    isLoading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("file", file);

    if (isFeatured !== undefined) {
      formData.append("is_featured", isFeatured.toString());
    }

    if (altText) {
      formData.append("alt_text", altText);
    }

    if (directory) {
      formData.append("directory", directory);
    }

    try {
      const response = await api.post<UploadMediaResponse>(
        "/media/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      mediaItems.value = [response.data.data, ...mediaItems.value];
      return response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || err.message || "Failed to upload media";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Set a media item as featured
   */
  const setMediaAsFeatured = async (mediaId: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await api.patch(`/media/${mediaId}/featured`);

      const index = mediaItems.value.findIndex((item) => item.id === mediaId);
      if (index !== -1) {
        mediaItems.value[index] = response.data.data;
      }

      return response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        err.message ||
        "Failed to set media as featured";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Delete a media item
   */
  const deleteMedia = async (mediaId: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      await api.delete(`/media/${mediaId}`);

      mediaItems.value = mediaItems.value.filter((item) => item.id !== mediaId);
      return true;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || err.message || "Failed to delete media";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    mediaItems,
    pagination,

    getMediaItems,
    getPagination,
    getIsLoading,
    getError,

    fetchMedia,
    uploadMedia,
    setMediaAsFeatured,
    deleteMedia,
  };
});
