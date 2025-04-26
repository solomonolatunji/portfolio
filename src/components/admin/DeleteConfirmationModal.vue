<template>
    <div v-if="modelValue" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/50">
        <div class="bg-[#1e1e1e] rounded-lg p-6 max-w-md w-full">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-white">Confirm Deletion</h3>
                <button @click="$emit('update:modelValue', false)" class="text-gray-400 hover:text-white">
                    <XMarkIcon class="h-6 w-6" />
                </button>
            </div>
            <p class="text-gray-300 mb-6">
                Are you sure you want to delete the {{ itemType }}
                <span class="font-medium text-white">{{ itemTitle }}</span>?
                This action cannot be undone.
            </p>
            <div class="flex justify-end space-x-4">
                <button @click="$emit('update:modelValue', false)"
                    class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                    Cancel
                </button>
                <button @click="confirmDelete"
                    class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center"
                    :disabled="isDeleting">
                    <ArrowPathIcon v-if="isDeleting" class="animate-spin h-4 w-4 mr-2" />
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
    modelValue: boolean;
    itemType: string;
    itemTitle: string;
    itemId: string | number;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    'confirm': [id: string | number];
}>();

const isDeleting = ref(false);

function confirmDelete() {
    isDeleting.value = true;
    emit('confirm', props.itemId);
    setTimeout(() => {
        isDeleting.value = false;
    }, 500);
}
</script>