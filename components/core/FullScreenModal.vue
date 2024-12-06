<template>
    <div
      v-if="show"
      class="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-90"
    >
      <div
        class="bg-[#F1F2F2] rounded-lg w-[90%] max-w-md shadow-lg text-center"
      >
        <h2 class="text-center text-[#045940] text-sm py-4 font-semibold mb-4 border-gray-100 border-b">
          {{headerText}}
        </h2>

        <button @click="emit('close')" class="" >
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="p-4 lg:p-8">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
 const props = defineProps({
   show: {
     type: Boolean,
     default: false,
   },
   headerText: {
     type: String,
     default: "",
   }
 })

 const emit = defineEmits(['close'])


  </script>
  
  <style scoped></style>
  