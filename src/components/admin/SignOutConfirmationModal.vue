<template>
    <div v-if="modelValue" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/50">
        <div class="bg-[#1e1e1e] rounded-lg p-6 max-w-md w-full">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-white">Sign Out Confirmation</h3>
                <button @click="$emit('update:modelValue', false)" class="text-gray-400 hover:text-white">
                    <XMarkIcon class="h-6 w-6" />
                </button>
            </div>
            <p class="text-gray-300 mb-6">
                Are you sure you want to sign out of your admin session? Any unsaved changes will be lost.
            </p>
            <div class="flex justify-end space-x-4">
                <button @click="$emit('update:modelValue', false)"
                    class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                    Cancel
                </button>
                <button @click="confirmSignOut"
                    class="px-4 py-2 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white rounded-lg transition-colors flex items-center"
                    :disabled="isSigningOut">
                    <ArrowPathIcon v-if="isSigningOut" class="animate-spin h-4 w-4 mr-2" />
                    Sign Out
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    'confirm': [];
}>();

const isSigningOut = ref(false);

function confirmSignOut() {
    isSigningOut.value = true;
    emit('confirm');
    setTimeout(() => {
        isSigningOut.value = false;
    }, 500);
}
</script>