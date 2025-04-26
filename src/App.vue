<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue';
import { useRoute } from 'vue-router';
import { usePageTitle } from './composables/usePageTitle';

const route = useRoute();
const isAdminPage = () => route.path.startsWith('/admin');

usePageTitle();
</script>

<template>
  <MainLayout v-if="!isAdminPage()" />
  <router-view v-else />
</template>