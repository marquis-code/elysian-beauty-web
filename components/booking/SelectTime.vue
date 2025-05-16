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
                : 'text-[#A3A8A7]'
            ]"
            @click="selectedCategory = category.id"
          >
            {{ category.name }}
          </button>
        </div>
        
        <h3 class="text-xl font-semibold mb-4">April 2024</h3>
        
        <!-- Calendar -->
        <div class="grid grid-cols-7 gap-2 mb-6">
          <div v-for="day in ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']" :key="day" class="text-center text-sm font-medium">
            {{ day }}
          </div>
          
          <button 
            v-for="date in dates" 
            :key="date.value"
            :class="[
              'p-4 rounded-lg text-center',
              selectedDate === date.value 
                ? 'bg-[#045940] text-white' 
                : date.disabled ? 'text-gray-300' : 'hover:bg-gray-100'
            ]"
            :disabled="date.disabled"
            @click="selectedDate = date.value"
          >
            <div class="text-sm">{{ date.day }}</div>
            <div class="font-semibold">{{ date.value }}</div>
          </button>
        </div>
        
        <!-- Time Slots -->
        <div class="space-y-3 overflow-y-auto h-96">
          <button 
            v-for="time in timeSlots" 
            :key="time"
            :class="[
              'w-full p-4 border rounded-lg text-left',
              selectedTime === time 
                ? 'bg-[#045940] text-white' 
                : 'hover:bg-gray-50'
            ]"
            @click="selectedTime = time"
          >
            {{ time }}
          </button>
        </div>
      </div>
      
      <!-- Summary Panel -->
      <div class="w-full md:w-96 border-t md:border-t-0 md:border-l bg-white p-6">
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%2018.24.40-ovxBl969IhdJtNLNJYZKUInAByylW9.png" 
            alt="Salon interior" 
            class="w-full h-24 object-cover rounded-lg"
          />
        </div>
        
        <div class="py-4 border-t border-b">
          <div class="text-gray-500">No Services selected</div>
        </div>
        
        <div class="py-4 flex justify-between items-center">
          <div class="font-semibold">Total</div>
          <div class="font-semibold">Free</div>
        </div>
        
        <button 
          class="w-full py-4 bg-gray-800 text-white rounded-full font-medium mt-4"
          @click="$emit('select-time', selectedTime)"
          :disabled="!selectedTime"
        >
          Continue
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { StarIcon } from 'lucide-vue-next';
  
  const selectedCategory = ref('waxing');
  const selectedDate = ref(25);
  const selectedTime = ref('9:00 am');
  
  const categories = [
    { id: 'head-spa', name: 'Head Spa' },
    { id: 'makeup', name: 'Make up' },
    { id: 'eyebrow', name: 'Eyebrow Microblading' },
    { id: 'eyelash', name: 'Eyelash Extension' },
    { id: 'waxing', name: 'Waxing' },
    { id: 'nail', name: 'Nail' },
    { id: 'facial', name: 'Facial' }
  ];
  
  const dates = [
    { day: 'MON', value: 24, disabled: true },
    { day: 'TUE', value: 25, disabled: false },
    { day: 'WED', value: 26, disabled: false },
    { day: 'THU', value: 27, disabled: false },
    { day: 'FRI', value: 28, disabled: false },
    { day: 'SAT', value: 29, disabled: false },
    { day: 'SUN', value: 30, disabled: false }
  ];
  
  const timeSlots = [
    '9:00 am',
    '9:15 am',
    '10:00 am',
    '11:00 am',
    '12:00 am',
    '1:00 am',
    '2:15 am',
    '3:00 am',
    '4:00 am',
    '5:00 am'
  ];
  
  defineEmits(['select-time']);
  </script>