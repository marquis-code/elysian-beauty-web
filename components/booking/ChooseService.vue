<template>
    <div class="p-6 max-w-lg mx-auto">
      <h3 class="text-xl font-semibold mb-6">Book</h3>
      
      <div class="space-y-4">
        <button 
          class="w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors"
          @click="$emit('next', 'select-service')"
        >
          <div class="text-lg font-medium">Book an appointment</div>
          <div class="text-gray-500">Schedule services for yourself</div>
        </button>
        
        <button 
          class="w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors opacity-75"
          disabled
        >
          <div class="text-lg font-medium">Gift others an appointment</div>
          <div class="text-gray-500">Coming soon!</div>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineEmits(['next']);
  </script>