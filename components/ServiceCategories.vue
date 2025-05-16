<template>
    <div class="px-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Services</h2>
      
<section class="flex justify-between items-center">
    <div class="flex overflow-x-auto space-x-2 pb-4 mb-6">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="[
            'px-4 py-2 rounded-full text-sm whitespace-nowrap',
            selectedCategory === category.id 
              ? 'bg-[#282B2A] text-sm font-bold text-white' 
              : 'text-[#A3A8A7]'
          ]"
          @click="selectedCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div class="flex border p-10 border-[#A3A8A7] rounded-xl justify-center">
        <button 
          class="bg-[#282B2A] text-white px-10 text-sm py-3 rounded-full font-medium"
          @click="$emit('book-now')"
        >
          BOOK NOW
        </button>
      </div>
</section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const selectedCategory = ref('head-spa');
  
  const categories = [
    { id: 'head-spa', name: 'Head Spa' },
    { id: 'makeup', name: 'Make up' },
    { id: 'eyebrow', name: 'Eyebrow Microblading' },
    { id: 'eyelash', name: 'Eyelash Extension' },
    { id: 'waxing', name: 'Waxing' },
    { id: 'nail', name: 'Nail' },
    { id: 'facial', name: 'Facial' }
  ];
  
  defineEmits(['book-now']);
  </script>