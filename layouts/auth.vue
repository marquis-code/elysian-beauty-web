<template>
  <div class="h-screen w-full flex flex-col md:flex-row">
    <!-- Background Image with Overlay -->
    <div 
      class="hidden md:block md:w-1/2 h-full relative bg-cover bg-center"
      :style="{ backgroundImage: `url(${currentBackground})` }">
      <!-- Logo -->
      <img 
        src="@/assets/img/logo-white.png" 
        class="absolute h-16 top-10 left-10 z-20" 
      />

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black opacity-50 z-10"></div>
    </div>

    <!-- Form Container -->
    <div class="w-full md:w-1/2 h-full flex items-center justify-center bg-white">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import background1 from '@/assets/img/signup.png';
// import background3 from '@/assets/img/auth.png';
import { ref, onMounted } from 'vue';

const backgrounds = [background1];
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
/* Ensuring the parent container maintains full height */
</style>
