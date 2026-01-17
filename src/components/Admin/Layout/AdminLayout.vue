<template>
  <div class="min-h-screen bg-[#111111]">
    <!-- Sidebar -->
    <Sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Main Content -->
    <div class="lg:pl-64">
      <!-- Header -->
      <Header @toggle-sidebar="toggleSidebar" />

      <!-- Page Content -->
      <main class="p-4 lg:p-8">
        <!-- Breadcrumb / Page Title helper can trigger from router meta if needed -->
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform opacity-0 translate-y-2"
            enter-to-class="transform opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 translate-y-2"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
