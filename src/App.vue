<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "@/components/nav/MainLayout.vue";
import { usePageTitle } from "@/hooks/usePageTitle";

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith("/admin"));

usePageTitle();
</script>

<template>
  <MainLayout v-if="!isAdminRoute" />
  <router-view v-else />
</template>
