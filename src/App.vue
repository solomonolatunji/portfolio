<script setup lang="ts">
import MainLayout from './components/MainLayout.vue';
import { usePageTitle } from './composables/usePageTitle';

usePageTitle();
</script>

<template>
  <MainLayout />
</template>