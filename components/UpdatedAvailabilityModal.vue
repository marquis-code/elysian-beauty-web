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
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Edit Availability</h2>
            
            <p class="text-gray-600 mb-6">
              Stay booked with <span class="font-semibold">real-time availability</span>. Set your <span class="font-semibold">working hours</span>, 
              and let clients see open slots instantly.
            </p>
            
            <!-- Availability Options -->
            <div class="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">When are you available?</h3>
              
              <div class="space-y-4">
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    v-model="availabilityOption" 
                    value="now" 
                    class="h-5 w-5 text-gray-900"
                  >
                  <span class="ml-3 text-gray-700">Now</span>
                </label>
                
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    v-model="availabilityOption" 
                    value="not_available" 
                    class="h-5 w-5 text-gray-900"
                  >
                  <span class="ml-3 text-gray-700">Not available</span>
                </label>
                
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    v-model="availabilityOption" 
                    value="within_days" 
                    class="h-5 w-5 text-gray-900"
                  >
                  <span class="ml-3 text-gray-700">Within the next few days</span>
                </label>
              </div>
            </div>
            
            <!-- Working Days Dropdown -->
            <div class="mb-6">
              <div 
                class="border rounded-lg p-4 flex justify-between items-center cursor-pointer"
                @click="workingDaysOpen = !workingDaysOpen"
              >
                <div>
                  <h3 class="text-xl font-semibold text-gray-900">Working days</h3>
                  <p class="text-gray-600">Choose your preferred working days</p>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-6 w-6 transform transition-transform" 
                  :class="{ 'rotate-180': workingDaysOpen }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <!-- Working Days Content -->
              <div v-if="workingDaysOpen" class="border-x border-b rounded-b-lg p-4">
                <!-- Day Selector -->
                <div class="flex justify-between mb-6">
                  <button 
                    v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su']" 
                    :key="day"
                    @click="toggleDay(day)"
                    :class="[
                      'w-10 h-10 rounded-md flex items-center justify-center',
                      selectedDays.includes(day) ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                    ]"
                  >
                    {{ day }}
                  </button>
                </div>
                
                <!-- Monday Settings -->
                <div class="mb-6">
                  <div class="flex justify-between items-center mb-2">
                    <h4 class="text-xl font-semibold text-gray-900">Monday</h4>
                    <div class="flex items-center">
                      <span class="mr-2 text-gray-700">Apply to all</span>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="applyToAll" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                  </div>
                  <p class="text-gray-600 mb-4">Choose your preferred working days</p>
                  
                  <!-- Working Hours -->
                  <div class="mb-4">
                    <h5 class="text-gray-700 mb-2">Working Hours</h5>
                    <div class="flex items-center">
                      <div class="relative w-full mr-2">
                        <input 
                          type="text" 
                          v-model="startTime" 
                          class="w-full border rounded-lg p-3 pr-10"
                          placeholder="09:00"
                        >
                        <button 
                          v-if="startTime" 
                          @click="startTime = ''" 
                          class="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <span class="mx-2">to</span>
                      
                      <div class="relative w-full">
                        <input 
                          type="text" 
                          v-model="endTime" 
                          class="w-full border rounded-lg p-3 pr-10"
                          placeholder="00:00"
                        >
                        <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
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
  const availabilityOption = ref('now');
  const workingDaysOpen = ref(true);
  const selectedDays = ref(['Mo']);
  const applyToAll = ref(false);
  const startTime = ref('09:00');
  const endTime = ref('00:00');
  
  // Methods
  const toggleDay = (day: string) => {
    const index = selectedDays.value.indexOf(day);
    if (index === -1) {
      selectedDays.value.push(day);
    } else {
      selectedDays.value.splice(index, 1);
    }
  };
  
  const collectData = () => {
    return {
      availabilityOption: availabilityOption.value,
      selectedDays: selectedDays.value,
      applyToAll: applyToAll.value,
      workingHours: {
        start: startTime.value,
        end: endTime.value
      }
    };
  };
  </script>