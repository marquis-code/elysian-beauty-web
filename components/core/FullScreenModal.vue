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
        <div class="p-8">
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
  </script>
  
  <style scoped></style>
  