<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Edit Availability</h2>
  
        <div class="mb-6">
          <p class="text-gray-600">When are you available?</p>
          <div class="space-x-4 mt-2">
            <input
              type="radio"
              id="now"
              value="now"
              v-model="availabilityStatus"
              class="hidden"
            />
            <label
              for="now"
              class="cursor-pointer px-4 py-2 bg-gray-200 rounded-md text-gray-700"
              :class="{
                'bg-blue-500 text-white': availabilityStatus === 'now',
              }"
              >Now</label>
  
            <input
              type="radio"
              id="not-available"
              value="not-available"
              v-model="availabilityStatus"
              class="hidden"
            />
            <label
              for="not-available"
              class="cursor-pointer px-4 py-2 bg-gray-200 rounded-md text-gray-700"
              :class="{
                'bg-blue-500 text-white': availabilityStatus === 'not-available',
              }"
              >Not Available</label>
  
            <input
              type="radio"
              id="within-days"
              value="within-days"
              v-model="availabilityStatus"
              class="hidden"
            />
            <label
              for="within-days"
              class="cursor-pointer px-4 py-2 bg-gray-200 rounded-md text-gray-700"
              :class="{
                'bg-blue-500 text-white': availabilityStatus === 'within-days',
              }"
              >Within the Next Few Days</label>
          </div>
        </div>
  
        <div v-if="availabilityStatus === 'now'" class="mb-6">
          <p class="text-gray-600">Select Working Days</p>
          <div class="space-x-4 mt-2">
            <div class="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                id="monday"
                v-model="workingDays.monday"
                class="h-5 w-5"
              />
              <label for="monday" class="text-gray-600">Monday</label>
            </div>
  
            <div class="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                id="tuesday"
                v-model="workingDays.tuesday"
                class="h-5 w-5"
              />
              <label for="tuesday" class="text-gray-600">Tuesday</label>
            </div>
  
            <!-- Add other weekdays here similarly... -->
          </div>
        </div>
  
        <div v-if="availabilityStatus === 'within-days'" class="mb-6">
          <p class="text-gray-600">Choose your preferred working days</p>
          <div class="space-x-4 mt-2">
            <div class="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                id="monday-2"
                v-model="workingDays.monday"
                class="h-5 w-5"
              />
              <label for="monday-2" class="text-gray-600">Monday</label>
            </div>
  
            <div class="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                id="tuesday-2"
                v-model="workingDays.tuesday"
                class="h-5 w-5"
              />
              <label for="tuesday-2" class="text-gray-600">Tuesday</label>
            </div>
  
            <!-- Add other weekdays here similarly... -->
          </div>
        </div>
  
        <div class="mb-6">
          <p class="text-gray-600">Working Hours</p>
          <div class="flex items-center space-x-4 mt-2">
            <input
              type="time"
              v-model="workingHours.start"
              class="border p-2 rounded-md"
            />
            <span class="text-gray-600">to</span>
            <input
              type="time"
              v-model="workingHours.end"
              class="border p-2 rounded-md"
            />
          </div>
        </div>
  
        <div class="flex justify-between">
          <button
            @click="cancel"
            class="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            @click="save"
            class="px-4 py-2 bg-blue-500 rounded-md text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // State
  const isVisible = ref(true); // Modal visibility
  const availabilityStatus = ref<'now' | 'not-available' | 'within-days'>('now');
  const workingDays = ref({
    monday: true,
    tuesday: false,
    // Add other days...
  });
  const workingHours = ref({
    start: '09:00',
    end: '00:00',
  });
  
  // Methods
  const save = () => {
    console.log('Availability saved:', {
      availabilityStatus: availabilityStatus.value,
      workingDays: workingDays.value,
      workingHours: workingHours.value,
    });
  };
  
  const cancel = () => {
    isVisible.value = false; // Close modal on cancel
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles for the modal if needed */
  </style>
  