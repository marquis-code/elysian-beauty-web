<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header with Close Button -->
        <div class="p-6 relative">
          <button @click="$emit('close')" class="absolute top-4 left-4 w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <!-- Modal Content -->
          <div class="mt-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Categories</h2>
            
            <p class="text-gray-600 mb-6">
              What are the main service you offer to clients?
            </p>
            
            <!-- Selected Categories Limit -->
            <p class="text-gray-600 mb-4">
              Select up to 10 categories
            </p>
            
            <!-- Selected Categories Pills -->
            <div class="flex flex-wrap gap-2 mb-6">
              <div 
                v-for="(category, index) in selectedCategories" 
                :key="index"
                class="bg-gray-300 rounded-full px-4 py-2 flex items-center"
              >
                <span>{{ category }}</span>
                <button @click="removeCategory(category)" class="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <hr class="my-6">
            
            <!-- Category Sections -->
            <div class="space-y-4">
              <!-- Manicure & Pedicure Section -->
              <div class="border rounded-lg overflow-hidden">
                <div 
                  class="p-4 flex justify-between items-center cursor-pointer"
                  @click="toggleSection('manicure')"
                >
                  <h3 class="text-lg font-semibold">Manicure & Pendicure</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-6 w-6 transform transition-transform" 
                    :class="{ 'rotate-180': openSections.manicure }"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div v-if="openSections.manicure" class="p-4 bg-white">
                  <div class="grid grid-cols-2 gap-4">
                    <div v-for="(service, index) in manicureServices" :key="index" class="flex items-center">
                      <input 
                        type="checkbox" 
                        :id="`manicure-${index}`" 
                        v-model="service.selected"
                        class="h-5 w-5 text-gray-900 rounded"
                      >
                      <label :for="`manicure-${index}`" class="ml-2 text-gray-700">
                        {{ service.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Massage and Shaving Section -->
              <div class="border rounded-lg overflow-hidden">
                <div 
                  class="p-4 flex justify-between items-center cursor-pointer"
                  @click="toggleSection('massage')"
                >
                  <h3 class="text-lg font-semibold">Massage and shaving</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-6 w-6 transform transition-transform" 
                    :class="{ 'rotate-180': openSections.massage }"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div v-if="openSections.massage" class="p-4 bg-white">
                  <div class="grid grid-cols-2 gap-4">
                    <div v-for="(service, index) in massageServices" :key="index" class="flex items-center">
                      <input 
                        type="checkbox" 
                        :id="`massage-${index}`" 
                        v-model="service.selected"
                        class="h-5 w-5 text-gray-900 rounded"
                      >
                      <label :for="`massage-${index}`" class="ml-2 text-gray-700">
                        {{ service.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Face Beauty & Makeup Section -->
              <div class="border rounded-lg overflow-hidden">
                <div 
                  class="p-4 flex justify-between items-center cursor-pointer"
                  @click="toggleSection('faceBeauty')"
                >
                  <h3 class="text-lg font-semibold">Face beauty & makeup</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-6 w-6 transform transition-transform" 
                    :class="{ 'rotate-180': openSections.faceBeauty }"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div v-if="openSections.faceBeauty" class="p-4 bg-white">
                  <div class="grid grid-cols-2 gap-4">
                    <div v-for="(service, index) in faceBeautyServices" :key="index" class="flex items-center">
                      <input 
                        type="checkbox" 
                        :id="`faceBeauty-${index}`" 
                        v-model="service.selected"
                        class="h-5 w-5 text-gray-900 rounded"
                      >
                      <label :for="`faceBeauty-${index}`" class="ml-2 text-gray-700">
                        {{ service.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Head Gear & Gele Section -->
              <div class="border rounded-lg overflow-hidden">
                <div 
                  class="p-4 flex justify-between items-center cursor-pointer"
                  @click="toggleSection('headGear')"
                >
                  <h3 class="text-lg font-semibold">Head gear & gele</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-6 w-6 transform transition-transform" 
                    :class="{ 'rotate-180': openSections.headGear }"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div v-if="openSections.headGear" class="p-4 bg-white">
                  <div class="grid grid-cols-2 gap-4">
                    <div v-for="(service, index) in headGearServices" :key="index" class="flex items-center">
                      <input 
                        type="checkbox" 
                        :id="`headGear-${index}`" 
                        v-model="service.selected"
                        class="h-5 w-5 text-gray-900 rounded"
                      >
                      <label :for="`headGear-${index}`" class="ml-2 text-gray-700">
                        {{ service.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex space-x-4 mt-8">
              <button 
                @click="$emit('save', collectData())" 
                class="bg-gray-900 text-white px-6 py-3 rounded-full font-medium"
              >
                Save
              </button>
              <button 
                @click="$emit('close')" 
                class="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['close', 'save']);
  
  // State
  const selectedCategories = ref(['Hair Styling', 'Makeup', 'Nails']);
  
  const openSections = ref({
    manicure: true,
    massage: false,
    faceBeauty: false,
    headGear: false
  });
  
  const manicureServices = ref([
    { name: 'Professional Manicure 1', selected: true },
    { name: 'Professional Manicure 1', selected: false },
    { name: 'Professional Manicure 1', selected: false },
    { name: 'Professional Manicure 1', selected: true },
    { name: 'Professional Manicure 1', selected: true },
    { name: 'Professional Manicure 1', selected: true }
  ]);
  
  const massageServices = ref([
    { name: 'Deep Tissue Massage', selected: false },
    { name: 'Swedish Massage', selected: false },
    { name: 'Hot Stone Massage', selected: false },
    { name: 'Shaving Service', selected: false }
  ]);
  
  const faceBeautyServices = ref([
    { name: 'Facial Cleansing', selected: false },
    { name: 'Makeup Application', selected: false },
    { name: 'Eyebrow Shaping', selected: false },
    { name: 'Eyelash Extensions', selected: false }
  ]);
  
  const headGearServices = ref([
    { name: 'Traditional Gele Tying', selected: false },
    { name: 'Modern Head Wrap', selected: false },
    { name: 'Bridal Head Gear', selected: false },
    { name: 'Turban Styling', selected: false }
  ]);
  
  // Methods
  const toggleSection = (section: string) => {
    openSections.value[section as keyof typeof openSections.value] = !openSections.value[section as keyof typeof openSections.value];
  };
  
  const removeCategory = (category: string) => {
    const index = selectedCategories.value.indexOf(category);
    if (index !== -1) {
      selectedCategories.value.splice(index, 1);
    }
  };
  
  const collectData = () => {
    const services: Record<string, any[]> = {};
    
    // Collect selected services from each category
    ['manicure', 'massage', 'faceBeauty', 'headGear'].forEach(category => {
      const categoryServices = category === 'manicure' 
        ? manicureServices.value 
        : category === 'massage' 
          ? massageServices.value 
          : category === 'faceBeauty' 
            ? faceBeautyServices.value 
            : headGearServices.value;
      
      services[category] = categoryServices
        .filter(service => service.selected)
        .map(service => service.name);
    });
    
    return {
      categories: selectedCategories.value,
      services
    };
  };
  </script>