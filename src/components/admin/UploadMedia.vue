<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 transition-opacity backdrop-blur-md bg-black/50" @click="cancel"></div>
            <div
                class="z-10 w-full max-w-lg p-6 mx-auto overflow-hidden bg-[#1e1e1e] rounded-xl shadow-xl border border-[#333]">
                <div class="text-center">
                    <h3 class="mb-5 text-lg font-medium text-white">Upload Media</h3>

                    <div v-if="!selectedFile" class="mb-6">
                        <div class="flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-[#6d28d9] transition-colors"
                            @click="triggerFileInput" @dragover.prevent="dragOver = true"
                            @dragleave.prevent="dragOver = false" @drop.prevent="onDrop($event)"
                            :class="{ 'border-[#6d28d9] bg-[#6d28d9]/10': dragOver }">
                            <svg class="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <p class="mb-2 text-lg font-medium text-gray-300">
                                Click to select or drag and drop
                            </p>
                            <p class="text-sm text-gray-500">
                                Supported files: PNG, JPG, GIF, PDF, DOC, DOCX
                            </p>
                            <input type="file" class="hidden" ref="fileInput" @change="onFileSelected"
                                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx">
                        </div>
                    </div>

                    <div v-else class="mb-5">
                        <p class="mb-2 text-sm text-gray-400">Preview:</p>

                        <!-- Image Preview -->
                        <div v-if="isImage" class="mb-4 overflow-hidden rounded-lg">
                            <img :src="filePreviewUrl || undefined" alt="Selected file"
                                class="max-h-72 mx-auto object-contain">
                        </div>

                        <!-- Document Preview -->
                        <div v-else class="mb-4 p-6 bg-[#2d2d2d] rounded-lg flex items-center justify-center">
                            <div class="flex flex-col items-center">
                                <svg class="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <p class="mt-2 text-gray-300">{{ selectedFile.name }}</p>
                            </div>
                        </div>

                        <!-- File Details -->
                        <div class="grid grid-cols-1 gap-4 p-4 bg-[#2d2d2d] rounded-lg">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-400">Filename:</span>
                                <span class="text-sm text-white">{{ selectedFile.name }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-400">Type:</span>
                                <span class="text-sm text-white">{{ selectedFile.type }}</span>
                            </div>

                            <div class="mt-4 text-left">
                                <label class="block text-sm font-medium text-gray-300">Directory (optional)</label>
                                <input type="text" v-model="directory" placeholder="e.g., portfolio/projects"
                                    class="block w-full px-3 py-2 mt-1 bg-[#2d2d2d] border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-[#6d28d9] focus:border-[#6d28d9] text-white">
                                <p class="mt-1 text-xs text-gray-400">Specify a directory path for organizing your
                                    uploads</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between mt-5">
                        <button type="button" @click="cancel"
                            class="px-4 py-2 text-sm font-medium text-gray-300 bg-[#2d2d2d] border border-gray-600 rounded-md hover:bg-[#3d3d3d] transition-colors">
                            Cancel
                        </button>

                        <div v-if="selectedFile">
                            <button type="button" @click="resetSelection"
                                class="px-4 py-2 mr-2 text-sm font-medium text-gray-300 bg-[#2d2d2d] border border-gray-600 rounded-md hover:bg-[#3d3d3d] transition-colors">
                                Choose Another
                            </button>
                            <button type="button" @click="confirmUpload"
                                class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] rounded-md transition-all duration-300"
                                :disabled="isUploading">
                                <svg v-if="isUploading" class="inline w-4 h-4 mr-1 -ml-1 text-white animate-spin"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                {{ isUploading ? 'Uploading...' : 'Upload File' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, toRefs } from 'vue';

const props = defineProps<{
    isVisible: boolean;
}>();

// Extract isVisible from props to ensure it's properly used
const { isVisible } = toRefs(props);

const emit = defineEmits(['close', 'upload']);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const filePreviewUrl = ref<string | null>(null);
const isUploading = ref(false);
const dragOver = ref(false);
const directory = ref('');

const isImage = computed(() => {
    return selectedFile.value?.type.startsWith('image/') || false;
});

const triggerFileInput = () => {
    fileInput.value?.click();
};

const onFileSelected = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];

        if (isImage.value) {
            filePreviewUrl.value = URL.createObjectURL(selectedFile.value);
        }
    }
};

const onDrop = (event: DragEvent) => {
    dragOver.value = false;
    if (event.dataTransfer?.files.length) {
        selectedFile.value = event.dataTransfer.files[0];

        if (isImage.value) {
            filePreviewUrl.value = URL.createObjectURL(selectedFile.value);
        }
    }
};

const resetSelection = () => {
    if (filePreviewUrl.value) {
        URL.revokeObjectURL(filePreviewUrl.value);
    }
    selectedFile.value = null;
    filePreviewUrl.value = null;
    directory.value = '';
};

const cancel = () => {
    resetSelection();
    emit('close');
};

const confirmUpload = async () => {
    if (!selectedFile.value) return;

    isUploading.value = true;
    try {
        emit('upload', {
            file: selectedFile.value,
            directory: directory.value
        });
    } finally {
        isUploading.value = false;
    }
};
</script>