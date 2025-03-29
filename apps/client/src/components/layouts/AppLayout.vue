<template>
  <div
    class="flex flex-col min-h-screen bg-gradient-to-br from-blackBerry from-25% to-blackBerry/85 to-60% text-offWhiteBerry font-body"
  >
    <!-- Navbar -->
    <div class="fixed top-0 left-0 w-full z-50">
      <Navbar />
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 container mx-auto px-6 mt-24">
      <RouterView />
    </div>
    <!-- Global Toaster -->
    <Toaster ref="toasterRef" />
  </div>
</template>

<style scoped>
/* Ensuring font styles */
:root {
  --font-heading: 'Sora', sans-serif;
  --font-body: 'Karla', sans-serif;
}
</style>

<script setup lang="ts">
import Navbar from './Navbar.vue';
import { provide, ref } from 'vue';
import Toaster from '../ui/Toaster.vue';

const toasterRef = ref();

provide(
  'showToast',
  (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    toasterRef.value?.showToast(message, type);
  }
);
</script>

<style scoped>
/* Optional: Add additional styles for layout */
</style>
