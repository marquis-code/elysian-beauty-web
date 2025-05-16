<template>
    <div class="flex flex-col md:flex-row h-full">
      <div class="flex-1 p-6 overflow-auto">
        <!-- Service Categories -->
        <div class="flex overflow-x-auto space-x-2 pb-4 mb-6">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="[
              'px-4 py-2 rounded-full text-sm whitespace-nowrap',
              selectedCategory === category.id 
                ? 'bg-[#282B2A] text-white' 
                : ' text-[#A3A8A7]'
            ]"
            @click="selectedCategory = category.id"
          >
            {{ category.name }}
          </button>
        </div>
        
        <h3 class="text-xl font-semibold mb-4">Selected Services</h3>
        
        <!-- Service List -->
        <div class="space-y-4 overflow-y-auto h-96">
          <div 
            v-for="(service, index) in services" 
            :key="index"
            class="border rounded-lg p-4"
          >
            <div class="flex justify-between">
              <div>
               <div class="flex items-center gap-x-6">
                <h4 class="text-lg font-medium text-[#282B2A]">{{ service.name }}</h4>
                <div class="text-sm text-[#A3A8A7]">{{ service.category }}</div>
               </div>
                <p class="text-sm text-[#282B2A] mt-2">
                  {{ service.description }}
                </p>
              </div>
              <div class="flex items-center">
                <button 
                  class=""
                  @click="selectService(service)"
                >
                <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="54" height="54" rx="27" fill="white"/>
                <path d="M27 30.5V27M27 27V23.5M27 27H30.5M27 27H23.5M33.364 33.364C29.8492 36.8787 24.1508 36.8787 20.636 33.364C17.1213 29.8492 17.1213 24.1508 20.636 20.636C24.1508 17.1213 29.8492 17.1213 33.364 20.636C36.8787 24.1508 36.8787 29.8492 33.364 33.364Z" stroke="#282B2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                </button>
              </div>
            </div>
            <div class="mt-4 font-semibold text-[#282B2A]">₦{{ service.price.toLocaleString() }}</div>
          </div>
        </div>
      </div>
      
      <!-- Summary Panel -->
      <div class="w-full md:w-96 rounded-3xl bg-white m-6 p-6">
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">House of Love Salon</h3>
          <div class="flex items-center">
            <span class="text-sm">5.0</span>
            <div class="flex ml-1">
              <StarIcon v-for="i in 5" :key="i" class="w-3 h-3 text-yellow-500" />
            </div>
            <span class="ml-1 text-xs text-gray-500">(7)</span>
            <span class="ml-2 text-xs text-gray-500">Closed opens at 9:00am</span>
          </div>
        </div>
        
        <div class="mb-6">
          <img 
            src="@/assets/img/salon-cover.png" 
            alt="Salon interior" 
            class="w-full h-24 object-cover rounded-lg"
          />
        </div>
        
        <div class="py-4 border-b">
          <div class="text-[#79807E] text-sm font-[400]">No Services selected</div>
        </div>
        
        <div class="py-4 flex justify-between items-center">
          <div class="font-semibold text-[#282B2A]">Total</div>
          <div class="font-semibold text-[#282B2A]">Free</div>
        </div>
        
        <button 
          class="w-full py-4 bg-[#A3A8A7] text-white rounded-full font-medium mt-4"
          @click="$emit('select-service', 'classic-manicure')"
        >
          Continue
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { PlusIcon, StarIcon } from 'lucide-vue-next';
  
  const selectedCategory = ref('waxing');
  
  const categories = [
    { id: 'head-spa', name: 'Head Spa' },
    { id: 'makeup', name: 'Make up' },
    { id: 'eyebrow', name: 'Eyebrow Microblading' },
    { id: 'eyelash', name: 'Eyelash Extension' },
    { id: 'waxing', name: 'Waxing' },
    { id: 'nail', name: 'Nail' },
    { id: 'facial', name: 'Facial' }
  ];
  
  const services = [
    {
      name: 'Classic Manicure',
      category: 'Make up',
      description: 'The Classic Manicure involves soaking, trimming, shaping nails, cuticle care, exfoliating, a hand massage, and finishing with a polished look.',
      price: 1200
    },
    {
      name: 'Classic Manicure',
      category: 'Make up',
      description: 'The Classic Manicure involves soaking, trimming, shaping nails, cuticle care, exfoliating, a hand massage, and finishing with a polished look.',
      price: 1200
    },
    {
      name: 'Classic Manicure',
      category: 'Make up',
      description: 'The Classic Manicure involves soaking, trimming, shaping nails, cuticle care, exfoliating, a hand massage, and finishing with a polished look.',
      price: 1200
    },
    {
      name: 'Classic Manicure',
      category: 'Make up',
      description: 'The Classic Manicure involves soaking, trimming, shaping nails, cuticle care, exfoliating, a hand massage, and finishing with a polished look.',
      price: 1200
    },
    {
      name: 'Classic Manicure',
      category: 'Make up',
      description: 'The Classic Manicure involves soaking, trimming, shaping nails, cuticle care, exfoliating, a hand massage, and finishing with a polished look.',
      price: 1200
    }
  ];
  
  const selectService = (service: any) => {
    // In a real app, this would add the service to a cart
    emit('select-service', service.name.toLowerCase().replace(' ', '-'));
  };
  
  const emit = defineEmits(['select-service']);
  </script>