<template>
    <Transition name="toast">
      <div 
        v-if="show"
        class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg"
        :class="typeClasses"
      >
        <div class="flex items-center">
          <CheckCircleIcon v-if="type === 'success'" class="w-5 h-5 mr-2" />
          <AlertCircleIcon v-else-if="type === 'error'" class="w-5 h-5 mr-2" />
          <InfoIcon v-else class="w-5 h-5 mr-2" />
          
          <span>{{ message }}</span>
          
          <button 
            class="ml-4 p-1 rounded-full hover:bg-black hover:bg-opacity-10"
            @click="$emit('close')"
          >
            <XIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue';
  import { CheckCircleIcon, AlertCircleIcon, InfoIcon, XIcon } from 'lucide-vue-next';
  
  const props = defineProps<{
    message: string;
    type?: 'success' | 'error' | 'info';
  }>();
  
  const emit = defineEmits(['close']);
  
  const show = ref(false);
  
  const typeClasses = computed(() => {
    switch (props.type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  });
  
  onMounted(() => {
    show.value = true;
  });
  
  watch(() => props.message, () => {
    show.value = true;
  });
  </script>
  
  <style scoped>
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }
  
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  </style>