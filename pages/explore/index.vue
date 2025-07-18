<template>
  <div class="px-5 py-6 bg-white container mx-auto">
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
    <!-- Loading State -->
    <section v-if="fetchingServiceTypes" class="flex flex-col items-center justify-center py-16">
      <div class="relative">
        <!-- Animated Spinner -->
        <div class="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
        <!-- Pulsing Dots -->
        <div class="flex justify-center mt-6 space-x-2">
          <div class="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style="animation-delay: 0ms;"></div>
          <div class="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style="animation-delay: 150ms;"></div>
          <div class="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style="animation-delay: 300ms;"></div>
        </div>
      </div>
      <p class="text-gray-600 mt-4 text-lg font-medium">Loading services...</p>
      <p class="text-gray-400 text-sm mt-1">Please wait while we fetch the latest services for you</p>
    </section>

    <!-- Empty State -->
    <section v-else-if="!fetchingServiceTypes && !serviceTypes?.length" class="flex flex-col items-center justify-center py-20">
      <div class="text-center">
        <!-- Empty State Icon -->
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
            <polyline points="3,7 12,13 21,7"></polyline>
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"></circle>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">No Services Available</h3>
        <p class="text-gray-500 mb-6 max-w-md mx-auto">
          We couldn't find any services at the moment. This might be temporary while we're updating our listings.
        </p>
        <button class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium">
          Refresh Page
        </button>
      </div>
    </section>

    <!-- Services Content -->
    <section v-else class="animate-fade-in">
      <section v-for="(value, key) in groupedServices" :key="key" class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-medium text-gray-800">{{ key }}</h2>
          <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {{ value.length }} service{{ value.length !== 1 ? 's' : '' }}
          </span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div 
            v-for="(salon, index) in value" 
            :key="index" 
            @click="router.push(`/explore/${salon.id}`)"
            class="relative group cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div  @click="`/explore/${salon.id}`" class="relative rounded-lg overflow-hidden shadow-sm">
              <img 
                src="@/assets/img/explore.png" 
                alt="Salon" 
                class="w-full h-[200px] object-cover group-hover:brightness-110 transition-all duration-200" 
              />
              <button class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 hover:text-red-500 transition-colors">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </button>
              <!-- Gradient overlay for better text readability -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <div  @click="`/explore/${salon.id}`" class="mt-3 space-y-1 p-3 border-b-[0.5px] shadow-lg rounded-b-xl">
              <h3 class="text-sm font-semibold text-gray-800 line-clamp-1">
                {{ salon?.ServiceProvider?.businessName }}
              </h3>
              <p class="text-base font-bold text-emerald-600">
                ₦{{ salon?.price?.toLocaleString() }}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500 truncate flex-1 mr-2">
                  {{ salon?.ServiceProvider?.businessLocation }}
                </span>
                <div class="flex items-center space-x-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span class="text-gray-400">({{ salon?.reviews ?? 0 }})</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span v-if="salon?.ServiceProvider?.businessIsVerified" class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import explore from '@/assets/img/explore.png'
import { useFetchCategories } from "@/composables/modules/categories/useFetchCategories"
import { useFetchServiceTypes } from  "@/composables/modules/serviceTypes/useFetchServiceTypes"
import { computed } from 'vue'

const { categories: categoriesList, loading } = useFetchCategories()
const {  serviceTypes, loading: fetchingServiceTypes } = useFetchServiceTypes()
const router = useRouter()

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

const groupedServices = computed(() => {
  return serviceTypes.value?.length
    ? Object.groupBy(serviceTypes.value, (item) => item.serviceType)
    : {}
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

definePageMeta({
  layout: 'header-only'
})
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom animations */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Custom pulse animation with delays */
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Line clamp utility */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>