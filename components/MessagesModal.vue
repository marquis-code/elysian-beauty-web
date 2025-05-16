<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header with Close Button -->
        <div class="p-6 relative">
          <button @click="$emit('close')" class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <!-- Modal Content -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Messages</h2>
            
            <!-- New Message Button -->
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <span class="text-xl font-semibold">New Message</span>
            </div>
            
            <h3 class="text-gray-500 mb-6">Messages</h3>
            
            <!-- Message List -->
            <div class="space-y-6">
              <div 
                v-for="(message, index) in messages" 
                :key="index"
                class="flex items-center justify-between"
              >
                <div class="flex items-center">
                  <img 
                    :src="message.avatar" 
                    alt="User Avatar" 
                    class="w-12 h-12 rounded-full object-cover mr-4"
                  >
                  <div>
                    <h4 class="font-semibold">{{ message.name }}</h4>
                    <p class="text-gray-500">{{ message.text }}</p>
                  </div>
                </div>
                <span class="text-gray-500">{{ message.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['close']);
  
  // Sample data for messages
  const messages = ref([
    {
      name: 'Mofoluwasho Adebayo',
      avatar: '/placeholder.svg?height=48&width=48',
      text: 'Did you get the address?',
      time: 'Now'
    },
    {
      name: 'Mofoluwasho Adebayo',
      avatar: '/placeholder.svg?height=48&width=48',
      text: 'Did you get the address?',
      time: '7mo'
    },
    {
      name: 'Mofoluwasho Adebayo',
      avatar: '/placeholder.svg?height=48&width=48',
      text: 'Did you get the address?',
      time: '7mo'
    },
    {
      name: 'Mofoluwasho Adebayo',
      avatar: '/placeholder.svg?height=48&width=48',
      text: 'Did you get the address?',
      time: '7mo'
    },
    {
      name: 'Mofoluwasho Adebayo',
      avatar: '/placeholder.svg?height=48&width=48',
      text: 'Did you get the address?',
      time: '7mo'
    },
    {
      name: 'Mofoluwasho Adebayo',
      avatar: '/placeholder.svg?height=48&width=48',
      text: 'Did you get the address?',
      time: '7mo'
    }
  ]);
  </script>