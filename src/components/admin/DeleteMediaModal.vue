<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 transition-opacitybg-opacity-70 backdrop-blur-sm" @click="cancel"></div>
            <div
                class="z-10 w-full max-w-md p-6 mx-auto overflow-hidden bg-[#1e1e1e] rounded-lg shadow-xl border border-[#333]">
                <div class="text-center">
                    <h3 class="mb-5 text-lg font-medium text-white">Delete Media</h3>
                    <div class="mb-5">
                        <p class="text-sm text-gray-300">
                            Are you sure you want to delete this media item? This action cannot be undone.
                        </p>
                        <div class="mt-4">
                            <img v-if="mediaToDelete && mediaToDelete.file_type.startsWith('image/')"
                                :src="mediaToDelete.url" :alt="mediaToDelete.file_name"
                                class="object-cover w-32 h-32 mx-auto border border-[#333] rounded" />
                            <div v-else class="flex items-center justify-center w-32 h-32 mx-auto bg-[#2d2d2d] rounded">
                                <svg class="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" />
                                </svg>
                            </div>
                            <p class="mt-2 text-sm font-medium text-gray-300">
                                {{ mediaToDelete?.file_name }}
                            </p>
                        </div>
                    </div>
                    <div class="flex justify-end mt-5 space-x-2">
                        <button type="button" @click="cancel"
                            class="px-4 py-2 text-sm font-medium text-gray-300 bg-[#2d2d2d] border border-[#444] rounded-md hover:bg-[#3d3d3d]"
                            :disabled="isDeleting">
                            Cancel
                        </button>
                        <button type="button" @click="confirmDelete"
                            class="px-4 py-2 text-sm font-medium text-white bg-red-800 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                            :disabled="isDeleting">
                            <svg v-if="isDeleting" class="inline w-4 h-4 mr-1 -ml-1 animate-spin"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isDeleting ? 'Deleting...' : 'Delete' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Media } from '@/interfaces/media';

defineProps<{
    isVisible: boolean;
    mediaToDelete: Media | null;
}>();

const emit = defineEmits(['close', 'confirm']);

const isDeleting = ref(false);

const cancel = () => {
    emit('close');
};

const confirmDelete = async () => {
    isDeleting.value = true;
    try {
        emit('confirm');
    } finally {
        isDeleting.value = false;
    }
};
</script>