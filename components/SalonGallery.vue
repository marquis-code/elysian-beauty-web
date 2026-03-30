<template>
    <div class="px-6 mb-6">
      <div class="relative rounded-lg overflow-hidden mb-4">
        <img 
          src="@/assets/img/salon-cover.png" 
          alt="Salon interior" 
          class="w-full h-[484px]"
        />
      </div>
      
      <h2 class="text-xl font-semibold mb-4">Gallery</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="(image, index) in galleryImages" 
          :key="index" 
          class="h-[267px] rounded-lg overflow-hidden"
        >
          <img 
            :src="image" 
            alt="Beauty service" 
            class="w-full  object-cover"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // In a real app, these would be actual image URLs
  import service1 from '@/assets/img/bservice2.png'
    import service2 from '@/assets/img/bservice3.png'
      import service3 from '@/assets/img/bservice4.png'
            // import service4 from '@/assets/img/service.png'
  const mainImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%2018.24.40-ovxBl969IhdJtNLNJYZKUInAByylW9.png';
  const galleryImages = [
    service1, service2, service3, service1, service2, service3
  ];

    const props = defineProps({
    serviceProvider: {
      type: Object,
      default: {}
    }
  })
  </script>