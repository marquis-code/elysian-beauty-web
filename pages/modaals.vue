<template>
    <div class="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div class="max-w-md w-full space-y-4">
        <button 
          @click="showAvailabilityModal = true" 
          class="w-full bg-black text-white py-2 px-4 rounded-lg"
        >
          Open Availability Modal
        </button>
        <button 
          @click="showCategoriesModal = true" 
          class="w-full bg-black text-white py-2 px-4 rounded-lg"
        >
          Open Categories Modal
        </button>
        <button 
          @click="showMessagesModal = true" 
          class="w-full bg-black text-white py-2 px-4 rounded-lg"
        >
          Open Messages Modal
        </button>
      </div>
  
      <!-- Modals -->
      <UpdatedAvailabilityModal 
        v-if="showAvailabilityModal" 
        @close="showAvailabilityModal = false"
        @save="handleSaveAvailability"
      />
      <CategoriesModal 
        v-if="showCategoriesModal" 
        @close="showCategoriesModal = false"
        @save="handleSaveCategories"
      />
      <MessagesModal 
        v-if="showMessagesModal" 
        @close="showMessagesModal = false"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  const showAvailabilityModal = ref(false);
  const showCategoriesModal = ref(false);
  const showMessagesModal = ref(false);
  
  const handleSaveAvailability = (data: any) => {
    console.log('Availability saved:', data);
    showAvailabilityModal.value = false;
  };
  
  const handleSaveCategories = (data: any) => {
    console.log('Categories saved:', data);
    showCategoriesModal.value = false;
  };
  </script>