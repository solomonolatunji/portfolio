<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-white">Media Manager</h1>
            <button @click="openUploadModal"
                class="flex items-center px-4 py-2.5 text-sm font-medium text-white transition bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] rounded-lg">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Upload Media
            </button>
        </div>

        <div class="p-4 mb-6 bg-[#1e1e1e] rounded-xl border border-[#333] shadow">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div>
                    <label for="mediable-type" class="block text-sm font-medium text-gray-300">Content Type</label>
                    <select id="mediable-type" v-model="filters.mediable_type"
                        class="block w-full px-3 py-2 mt-1 bg-[#2d2d2d] border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-[#6d28d9] focus:border-[#6d28d9] text-white"
                        @change="applyFilters">
                        <option value="">All Types</option>
                        <option value="App\\Models\\Project">Projects</option>
                        <option value="App\\Models\\BlogPost">Blog Posts</option>
                    </select>
                </div>
                <div>
                    <label for="file-type" class="block text-sm font-medium text-gray-300">File Type</label>
                    <select id="file-type" v-model="filters.file_type"
                        class="block w-full px-3 py-2 mt-1 bg-[#2d2d2d] border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-[#6d28d9] focus:border-[#6d28d9] text-white"
                        @change="applyFilters">
                        <option value="">All Files</option>
                        <option value="image/jpeg">JPEG Images</option>
                        <option value="image/png">PNG Images</option>
                        <option value="image/svg+xml">SVG Images</option>
                        <option value="application/pdf">PDF Files</option>
                    </select>
                </div>
                <div>
                    <label for="is-featured" class="block text-sm font-medium text-gray-300">Featured Status</label>
                    <select id="is-featured" v-model="filters.is_featured"
                        class="block w-full px-3 py-2 mt-1 bg-[#2d2d2d] border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-[#6d28d9] focus:border-[#6d28d9] text-white"
                        @change="applyFilters">
                        <option value="">All Items</option>
                        <option :value="true">Featured Only</option>
                        <option :value="false">Not Featured</option>
                    </select>
                </div>
                <div>
                    <label for="per-page" class="block text-sm font-medium text-gray-300">Items Per Page</label>
                    <select id="per-page" v-model="filters.per_page"
                        class="block w-full px-3 py-2 mt-1 bg-[#2d2d2d] border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-[#6d28d9] focus:border-[#6d28d9] text-white"
                        @change="applyFilters">
                        <option :value="15">15</option>
                        <option :value="25">25</option>
                        <option :value="50">50</option>
                        <option :value="100">100</option>
                    </select>
                </div>
            </div>
        </div>

        <div v-if="mediaStore.isLoading" class="flex items-center justify-center py-10">
            <svg class="w-10 h-10 text-[#6d28d9] animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </div>

        <div v-else-if="mediaStore.error"
            class="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-700 rounded-lg">
            <p>{{ mediaStore.error }}</p>
            <button @click="fetchMedia"
                class="inline-flex items-center px-3 py-1 mt-2 text-xs font-medium text-red-400 bg-red-900/20 border border-red-700 rounded-md hover:bg-red-800/30">
                Try Again
            </button>
        </div>

        <div v-else-if="!mediaStore.mediaItems.length"
            class="flex flex-col items-center justify-center px-6 py-12 bg-[#1e1e1e] rounded-xl border border-[#333] shadow">
            <svg class="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                </path>
            </svg>
            <h3 class="mt-2 text-lg font-medium text-white">No media files found</h3>
            <p class="mt-1 text-sm text-gray-400">
                Get started by uploading your first media file
            </p>
            <button @click="openUploadModal"
                class="flex items-center px-4 py-2 mt-4 text-sm font-medium text-white transition bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] rounded-lg">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Upload Media
            </button>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div v-for="media in mediaStore.mediaItems" :key="media.id"
                class="overflow-hidden bg-[#1e1e1e] rounded-lg border border-[#333] shadow group hover:border-[#6d28d9] transition-all duration-200">
                <div class="relative aspect-w-16 aspect-h-12 bg-[#2d2d2d]">
                    <img v-if="media.file_type.startsWith('image/')" :src="media.url" :alt="media.file_name"
                        class="object-cover w-full h-full" style="aspect-ratio: 1/1; object-fit: cover;" />
                    <div v-else class="flex items-center justify-center h-full">
                        <svg class="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" />
                        </svg>
                    </div>

                    <div
                        class="absolute inset-0 flex flex-col items-center justify-center transition-opacity opacity-0 bg-black/70 group-hover:opacity-100">
                        <div class="flex space-x-2">
                            <a :href="media.url" target="_blank"
                                class="p-2 text-gray-100 transition rounded-full hover:bg-gray-700 hover:text-white"
                                title="View">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                    </path>
                                </svg>
                            </a>
                            <button @click="toggleFeatured(media)" class="p-2 transition rounded-full hover:bg-gray-700"
                                :class="media.is_featured ? 'text-yellow-400' : 'text-gray-100'"
                                title="Toggle featured">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                            </button>
                            <button @click="showDeleteModal(media)"
                                class="p-2 text-gray-100 transition rounded-full hover:bg-red-600 hover:text-white"
                                title="Delete">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="px-4 py-2">
                    <p class="text-sm font-medium text-white truncate" :title="media.file_name">
                        {{ media.file_name }}
                    </p>
                    <p class="mt-1 text-xs text-gray-400">
                        <span v-if="media.width && media.height" class="mr-2">{{ media.width }}×{{ media.height
                            }}</span>
                        <span>{{ formatDate(media.created_at) }}</span>
                    </p>
                </div>
            </div>
        </div>

        <div v-if="mediaStore.mediaItems.length" class="flex items-center justify-between py-4 mt-6">
            <div class="text-sm text-gray-400">
                Showing {{ mediaStore.pagination.from }} to {{ mediaStore.pagination.to }} of {{
                    mediaStore.pagination.total }} results
            </div>
            <div class="flex space-x-1">
                <button @click="changePage(mediaStore.pagination.current_page - 1)"
                    :disabled="mediaStore.pagination.current_page === 1" :class="[
                        mediaStore.pagination.current_page === 1
                            ? 'text-gray-600 cursor-not-allowed'
                            : 'text-gray-300 hover:bg-[#2d2d2d]'
                    ]" class="px-3 py-2 text-sm font-medium border border-gray-700 rounded-md">
                    Previous
                </button>
                <button v-for="page in generatePageNumbers(mediaStore.pagination.last_page)" :key="page"
                    @click="changePage(page)" :class="[
                        mediaStore.pagination.current_page === page
                            ? 'bg-[#6d28d9] text-white'
                            : 'text-gray-300 hover:bg-[#2d2d2d]'
                    ]" class="px-3 py-2 text-sm font-medium border border-gray-700 rounded-md">
                    {{ page }}
                </button>
                <button @click="changePage(mediaStore.pagination.current_page + 1)"
                    :disabled="mediaStore.pagination.current_page === mediaStore.pagination.last_page" :class="[
                        mediaStore.pagination.current_page === mediaStore.pagination.last_page
                            ? 'text-gray-600 cursor-not-allowed'
                            : 'text-gray-300 hover:bg-[#2d2d2d]'
                    ]" class="px-3 py-2 text-sm font-medium border border-gray-700 rounded-md">
                    Next
                </button>
            </div>
        </div>

        <div v-if="toastMessage"
            class="fixed bottom-0 right-0 z-50 p-4 m-4 text-white bg-red-900/80 rounded-lg shadow-lg border border-red-700">
            {{ toastMessage }}
        </div>

        <DeleteMediaModal :is-visible="showConfirmDelete" :media-to-delete="mediaToDelete" @close="hideDeleteModal"
            @confirm="confirmDeleteMedia" />

        <UploadMedia :is-visible="showUploadModal" @close="closeUploadModal" @upload="handleMediaUpload" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMediaStore } from '@/stores/mediaStore';
import type { Media, MediaFilters } from '@/interfaces/media';
import DeleteMediaModal from '@/components/admin/DeleteMediaModal.vue';
import UploadMedia from '@/components/admin/UploadMedia.vue';
import { useToast } from 'vue-toastification';

const mediaStore = useMediaStore();
const toast = useToast();

const toastMessage = ref<string | null>(null);
const showConfirmDelete = ref(false);
const mediaToDelete = ref<Media | null>(null);
const showUploadModal = ref(false);
const filters = ref<MediaFilters>({
    per_page: 15,
    mediable_type: '',
    is_featured: undefined,
    file_type: '',
    page: 1
});

const fetchMedia = async () => {
    try {
        await mediaStore.fetchMedia(filters.value);
    } catch (error) {
    }
};

const applyFilters = () => {
    filters.value.page = 1;
    fetchMedia();
};

const changePage = (page: number) => {
    if (page < 1 || page > mediaStore.pagination.last_page) {
        return;
    }
    filters.value.page = page;
    fetchMedia();
};

const generatePageNumbers = (totalPages: number) => {
    const MAX_VISIBLE_PAGES = 5;
    if (totalPages <= MAX_VISIBLE_PAGES) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const currentPage = filters.value.page || 1;
    const halfVisiblePages = Math.floor(MAX_VISIBLE_PAGES / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = startPage + MAX_VISIBLE_PAGES - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};

const openUploadModal = () => {
    showUploadModal.value = true;
};

const closeUploadModal = () => {
    showUploadModal.value = false;
};

const handleMediaUpload = async (uploadData: { file: File, isFeatured: boolean, altText: string, directory?: string }) => {
    try {
        await mediaStore.uploadMedia(
            uploadData.file,
            uploadData.directory
        );
        closeUploadModal();
        toast.success('Media uploaded successfully');
    } catch (error: any) {
        toastMessage.value = error.message || 'Failed to upload file';
        setTimeout(() => {
            toastMessage.value = null;
        }, 5000);
    }
};

const toggleFeatured = async (media: Media) => {
    try {
        await mediaStore.setMediaAsFeatured(media.id);
        toast.success(`Media ${media.is_featured ? 'removed from' : 'set as'} featured`);
    } catch (error: any) {
        toastMessage.value = error.message || 'Failed to update featured status';
        setTimeout(() => {
            toastMessage.value = null;
        }, 5000);
    }
};

const showDeleteModal = (media: Media) => {
    mediaToDelete.value = media;
    showConfirmDelete.value = true;
};

const hideDeleteModal = () => {
    showConfirmDelete.value = false;
    mediaToDelete.value = null;
};

const confirmDeleteMedia = async () => {
    if (!mediaToDelete.value) return;

    try {
        await mediaStore.deleteMedia(mediaToDelete.value.id);
        toast.success('Media deleted successfully');
        hideDeleteModal();
    } catch (error: any) {
        toastMessage.value = error.message || 'Failed to delete media';
        setTimeout(() => {
            toastMessage.value = null;
        }, 5000);
    }
};

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
};

onMounted(() => {
    fetchMedia();
});
</script>