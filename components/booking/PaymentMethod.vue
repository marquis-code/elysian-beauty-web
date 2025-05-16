<template>
    <div class="p-6 max-w-lg mx-auto">
      <h3 class="text-xl font-semibold mb-6">Select Amount</h3>
      
      <div class="space-y-4 mb-8">
        <button 
          v-for="option in paymentOptions" 
          :key="option.id"
          class="w-full p-4 border rounded-lg flex items-center hover:bg-gray-50 transition-colors"
          @click="selectedOption = option.id"
        >
          <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <component :is="option.icon" class="w-6 h-6" />
          </div>
          <div class="flex-1">
            <div class="text-lg text-[#282B2A] text-start font-medium">{{ option.title }}</div>
            <div class="text-[#A3A8A7] text-start">{{ option.description }}</div>
          </div>
        </button>
      </div>
      
      <button 
        class="w-full py-4 bg-gray-800 text-white rounded-full font-medium mt-8"
        @click="$emit('select-payment', selectedOption)"
      >
        Continue
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { WalletIcon, Building } from 'lucide-vue-next';
  
  const selectedOption = ref('wallet');
  
  const paymentOptions = [
    {
      id: 'wallet',
      title: 'Pay with Wallet',
      description: 'Wallet Bal: ₦200,000,000',
      icon: WalletIcon
    },
    {
      id: 'bank',
      title: 'Pay via Bank card',
      description: 'Pay with your linked card',
      icon: Building
    }
  ];
  
  defineEmits(['select-payment']);
  </script>