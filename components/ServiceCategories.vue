<template>
    <div class="px-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Services</h2>
      
      <section class="flex justify-between items-center max-w-3xl">
        <div class="flex overflow-x-auto space-x-2 pb-4 mb-6">
          <button 
            v-for="category in dynamicCategories" 
            :key="category.key"
            :class="[
              'px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200',
              selectedCategory === category.key 
                ? 'bg-[#282B2A] text-sm font-bold text-white' 
                : 'text-[#A3A8A7] hover:text-[#282B2A] hover:bg-gray-100'
            ]"
            @click="selectedCategory = category.key"
          >
            {{ category.displayName }}
          </button>
        </div>
        
      </section>
  
      <!-- Loading state -->
      <div v-if="fetchingServiceTypes" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#282B2A]"></div>
      </div>
  
      <!-- Services for selected category -->
      <section v-else-if="selectedCategoryServices.length > 0" class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-medium text-gray-800">{{ selectedCategoryDisplayName }}</h2>
          <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {{ selectedCategoryServices.length }} service{{ selectedCategoryServices.length !== 1 ? 's' : '' }}
          </span>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div 
            v-for="(salon, index) in selectedCategoryServices" 
            :key="index" 
            @click="navigateToService(salon.id)"
            class="relative group cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div class="relative rounded-lg overflow-hidden shadow-sm">
              <img 
                src="@/assets/img/explore.png" 
                alt="Salon" 
                class="w-full h-[200px] object-cover group-hover:brightness-110 transition-all duration-200" 
              />
              <button 
                @click.stop="toggleFavorite(salon.id)"
                class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 hover:text-red-500 transition-colors">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </button>
              <!-- Gradient overlay for better text readability -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            
            <div class="mt-3 space-y-1 p-3 border-b-[0.5px] shadow-lg rounded-b-xl">
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
  
      <!-- Empty state -->
      <section v-else class="mt-8 text-center py-12">
        <div class="text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p class="text-lg text-gray-500">No services available for {{ selectedCategoryDisplayName }}</p>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useFetchServiceTypes } from "@/composables/modules/serviceTypes/useFetchServiceTypes";
  
  const { serviceTypes, loading: fetchingServiceTypes } = useFetchServiceTypes();
  const router = useRouter();
  
  // Create dynamic categories from API response
  const dynamicCategories = computed(() => {
    if (!serviceTypes.value?.length) return [];
    
    const categories = new Map();
    
    serviceTypes.value.forEach(service => {
      if (service.serviceType && !categories.has(service.serviceType)) {
        categories.set(service.serviceType, {
          key: service.serviceType,
          displayName: formatCategoryName(service.serviceType)
        });
      }
    });
    
    return Array.from(categories.values()).sort((a, b) => a.displayName.localeCompare(b.displayName));
  });
  
  // Format category names for better display
  const formatCategoryName = (categoryKey: string): string => {
    return categoryKey
      .split(/[-_\s]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  // Selected category state
  const selectedCategory = ref<string>('');
  
  // Set initial category when data loads
  watch(dynamicCategories, (newCategories) => {
    if (newCategories.length > 0 && !selectedCategory.value) {
      selectedCategory.value = newCategories[0].key;
    }
  }, { immediate: true });
  
  // Get services for the selected category
  const selectedCategoryServices = computed(() => {
    if (!serviceTypes.value?.length || !selectedCategory.value) return [];
    
    return serviceTypes.value.filter(service => service.serviceType === selectedCategory.value);
  });
  
  // Get display name for selected category
  const selectedCategoryDisplayName = computed(() => {
    const category = dynamicCategories.value.find(cat => cat.key === selectedCategory.value);
    return category ? category.displayName : '';
  });
  
  // Navigation and interaction methods
  const navigateToService = (serviceId: string) => {
    router.push(`/explore/${serviceId}`);
  };
  
  const toggleFavorite = (serviceId: string) => {
    // Implement favorite toggle logic here
    console.log('Toggle favorite for service:', serviceId);
  };
  
  // Emit events
  defineEmits(['book-now']);
  </script>