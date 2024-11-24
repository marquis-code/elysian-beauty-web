<template>
  <div class="h-screen w-full relative flex items-center justify-end md:justify-center">
    <!-- Background Image with Overlay -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${currentBackground})` }"
    >
      <!-- Logo -->
      <img
          src="@/assets/img/logo-white.png"
          class="absolute h-16 top-10 left-10 z-20"
      />

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black opacity-50 z-10"></div>
    </div>

    <!-- Form Container -->
    <div
        class="relative z-30 bg-white w-full h-screen sm:h-auto sm:w-4/5 md:w-1/3 p-4 lg:p-8 rounded-none sm:rounded-lg shadow-none sm:shadow-lg mx-auto md:mr-12 mt-auto mb-auto"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import background1 from '@/assets/img/signup.png';
import background2 from '@/assets/img/login.png';
import background3 from '@/assets/img/auth.png';
import { ref, onMounted } from 'vue';

const backgrounds = [background1, background2, background3];
const currentBackground = ref(backgrounds[0]);

onMounted(() => {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % backgrounds.length;
    currentBackground.value = backgrounds[index];
  }, 5000); // Update background every 5 seconds
});
</script>

<style scoped>
/* Add custom styles for transitions if needed */
</style>
