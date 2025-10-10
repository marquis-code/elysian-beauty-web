<template>
  <main>
      <NuxtLayout>
      <CoreToast class="fixed top-4 right-4 z-[9999999]" />
        <NuxtPage />
      </NuxtLayout>
  </main>
</template>

<style lang="css">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  #app {
    @apply min-h-screen font-sans;
  }
</style>

<script setup lang="ts">
import { provide } from 'vue';
import { visible, toastData, useCustomToast } from '@/composables/core/useCustomToast';

// Provide the toast state globally
provide('toastVisible', visible);
provide('toastData', toastData);
</script>
