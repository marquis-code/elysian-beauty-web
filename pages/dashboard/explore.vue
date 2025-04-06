<template>
    <div class="px-5 py-6 bg-white container mx-auto">
      <!-- Explore Category Section -->
      <h2 class="text-xl font-medium text-gray-800 mb-4">Explore Category</h2>
      <div class="flex overflow-x-auto pb-2 -mx-1 hide-scrollbar mb-8">
        <button
          v-for="(category, index) in categories"
          :key="index"
          class="flex-shrink-0 mx-1 px-4 py-2 rounded-full bg-emerald-800 text-white text-sm whitespace-nowrap"
        >
          <span class="mr-1">{{ category.icon }}</span>
          {{ category.name }}
        </button>
      </div>
  
      <!-- Makeup Salons Section -->
      <h2 class="text-xl font-medium text-gray-800 mb-4">Makeup Salons</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div v-for="(salon, index) in salons" :key="index" class="relative">
          <div class="relative rounded-lg overflow-hidden">
            <img :src="salon.image" alt="Salon" class="w-full h-[200px] object-cover" />
            <button class="absolute top-2 right-2 bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </button>
          </div>
          <div class="mt-2">
            <h3 class="text-sm font-medium">{{ salon.name }}</h3>
            <p class="text-sm font-bold mt-1">₦{{ salon.price.toLocaleString() }}</p>
            <div class="flex items-center mt-1 text-xs text-gray-500">
              <span class="mr-1">{{ salon.level }}</span>
              <div class="flex items-center">
                <span class="mr-1">{{ salon.rating }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span class="ml-1 text-gray-400">({{ salon.reviews }})</span>
              </div>
              <span v-if="salon.isNew" class="ml-auto text-xs font-medium text-blue-500">NEW!</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Flier Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-emerald-800 rounded-lg p-20 flex items-center justify-center">
          <span class="text-white text-xl font-medium">Flier</span>
        </div>
        <div class="bg-yellow-200 rounded-lg p-20 flex items-center justify-center">
          <span class="text-emerald-800 text-xl font-medium">Flier</span>
        </div>
      </div>
  
      <!-- Beard Grooming Section -->
      <h2 class="text-xl font-medium text-gray-800 mb-4">Beard Grooming</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div v-for="(salon, index) in beardGrooming" :key="index" class="relative">
          <div class="relative rounded-lg overflow-hidden">
            <img :src="salon.image" alt="Salon" class="w-full h-[200px] object-cover" />
            <button class="absolute top-2 right-2 bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </button>
          </div>
          <div class="mt-2">
            <h3 class="text-sm font-medium">{{ salon.name }}</h3>
            <p class="text-sm font-bold mt-1">₦{{ salon.price.toLocaleString() }}</p>
            <div class="flex items-center mt-1 text-xs text-gray-500">
              <span class="mr-1">{{ salon.level }}</span>
              <div class="flex items-center">
                <span class="mr-1">{{ salon.rating }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span class="ml-1 text-gray-400">({{ salon.reviews }})</span>
              </div>
              <span v-if="salon.isNew" class="ml-auto text-xs font-medium text-blue-500">NEW!</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Massage Therapy Section -->
      <h2 class="text-xl font-medium text-gray-800 mb-4">Massage Therapy</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div v-for="(salon, index) in massageTherapy" :key="index" class="relative">
          <div class="relative rounded-lg overflow-hidden">
            <img :src="salon.image" alt="Salon" class="w-full h-[200px] object-cover" />
            <button class="absolute top-2 right-2 bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </button>
          </div>
          <div class="mt-2">
            <h3 class="text-sm font-medium">{{ salon.name }}</h3>
            <p class="text-sm font-bold mt-1">₦{{ salon.price.toLocaleString() }}</p>
            <div class="flex items-center mt-1 text-xs text-gray-500">
              <span class="mr-1">{{ salon.level }}</span>
              <div class="flex items-center">
                <span class="mr-1">{{ salon.rating }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span class="ml-1 text-gray-400">({{ salon.reviews }})</span>
              </div>
              <span v-if="salon.isNew" class="ml-auto text-xs font-medium text-blue-500">NEW!</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Body Scrub & Polish Section -->
      <h2 class="text-xl font-medium text-gray-800 mb-4">Body Scrub & Polish</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div v-for="(salon, index) in bodyScrub" :key="index" class="relative">
          <div class="relative rounded-lg overflow-hidden">
            <img :src="salon.image" alt="Salon" class="w-full h-[200px] object-cover" />
            <button class="absolute top-2 right-2 bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </button>
          </div>
          <div class="mt-2">
            <h3 class="text-sm font-medium">{{ salon.name }}</h3>
            <p class="text-sm font-bold mt-1">₦{{ salon.price.toLocaleString() }}</p>
            <div class="flex items-center mt-1 text-xs text-gray-500">
              <span class="mr-1">{{ salon.level }}</span>
              <div class="flex items-center">
                <span class="mr-1">{{ salon.rating }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span class="ml-1 text-gray-400">({{ salon.reviews }})</span>
              </div>
              <span v-if="salon.isNew" class="ml-auto text-xs font-medium text-blue-500">NEW!</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Most Booked Vendors Section -->
      <h2 class="text-xl font-medium text-gray-800 mb-4">Most Booked vendors</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div v-for="(salon, index) in mostBooked" :key="index" class="relative">
          <div class="relative rounded-lg overflow-hidden">
            <img :src="salon.image" alt="Salon" class="w-full h-[200px] object-cover" />
            <button class="absolute top-2 right-2 bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </button>
          </div>
          <div class="mt-2">
            <h3 class="text-sm font-medium">{{ salon.name }}</h3>
            <p class="text-sm font-bold mt-1">₦{{ salon.price.toLocaleString() }}</p>
            <div class="flex items-center mt-1 text-xs text-gray-500">
              <span class="mr-1">{{ salon.level }}</span>
              <div class="flex items-center">
                <span class="mr-1">{{ salon.rating }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span class="ml-1 text-gray-400">({{ salon.reviews }})</span>
              </div>
              <span v-if="salon.isNew" class="ml-auto text-xs font-medium text-blue-500">NEW!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import explore from '@/assets/img/explore.png'
  // Define types
  interface Category {
    icon: string;
    name: string;
  }
  
  interface Salon {
    name: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    level: string;
    isNew?: boolean;
  }

  definePageMeta({
    layout: 'dashboard'
  })
  
  // Category data
  const categories: Category[] = [
    { icon: '+', name: 'Hair Styling' },
    { icon: '+', name: 'Makeup' },
    { icon: '+', name: 'Massage Therapy' },
    { icon: '+', name: 'Nail Fixing' },
    { icon: '+', name: 'Nail Fixing' },
    { icon: '+', name: 'Nail Fixing' },
    { icon: '+', name: 'Eye' },
    { icon: '+', name: 'Teeth Whitening' },
    { icon: '+', name: 'Eyelash' },
    { icon: '+', name: 'Body Waxing' },
    { icon: '+', name: 'Body Waxing' },
    { icon: '+', name: 'Body Waxing' },
    { icon: '+', name: 'Body Waxing' },
  ];
  
  // Sample salon data for each section
  const salons: Salon[] = [
    {
      name: 'House of Love Beauty World',
      price: 5999,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 3750,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
      isNew: true,
    },
    {
      name: 'House of Love Beauty World',
      price: 1200,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 10500,
       image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
  ];
  
  // Reuse the same data structure for other sections
  const beardGrooming: Salon[] = [
    {
      name: 'House of Love Beauty World',
      price: 1200,
       image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 3750,
       image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
      isNew: true,
    },
    {
      name: 'House of Love Beauty World',
      price: 10500,
       image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 5999,
       image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
  ];
  
  const massageTherapy: Salon[] = [
    {
      name: 'House of Love Beauty World',
      price: 3750,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
      isNew: true,
    },
    {
      name: 'House of Love Beauty World',
      price: 5999,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 1200,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 10500,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
  ];
  
  const bodyScrub: Salon[] = [
    {
      name: 'House of Love Beauty World',
      price: 5999,
       image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 10500,
       image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 3750,
       image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
      isNew: true,
    },
    {
      name: 'House of Love Beauty World',
      price: 1200,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
  ];
  
  const mostBooked: Salon[] = [
    {
      name: 'House of Love Beauty World',
      price: 1200,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 5999,
       image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 10500,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
    },
    {
      name: 'House of Love Beauty World',
      price: 3750,
      image: explore,
      rating: 5.0,
      reviews: 130,
      level: 'LEVEL | LAGOS',
      isNew: true,
    },
  ];
  </script>
  
  <style>
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>