<template>
    <div v-if="showAlert" class="alert-wrapper">
        <div class="alert-container">
            <div class="alert-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="alert-content">
                <p class="alert-title">TinyMCE API Key Required</p>
                <p class="alert-message">A valid API key is required to continue using TinyMCE. Please check the current
                    API key.</p>
            </div>
            <button @click="dismiss" class="alert-close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showAlert = ref(true);

const dismiss = () => {
    showAlert.value = false;
};
</script>

<style scoped>
.alert-wrapper {
    margin-bottom: 1.5rem;
}

.alert-container {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: rgba(254, 252, 232, 0.1);
    border-left: 4px solid #f59e0b;
    border-radius: 0.375rem;
}

.alert-icon {
    flex-shrink: 0;
    color: #f59e0b;
    margin-right: 0.75rem;
}

.alert-content {
    flex-grow: 1;
}

.alert-title {
    font-weight: 600;
    color: #fef3c7;
    margin-bottom: 0.25rem;
}

.alert-message {
    color: #d1d5db;
    font-size: 0.875rem;
}

.alert-close {
    color: #9ca3af;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    transition: color 0.2s ease;
}

.alert-close:hover {
    color: #f3f4f6;
}
</style>