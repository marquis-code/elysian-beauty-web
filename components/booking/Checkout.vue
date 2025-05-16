<template>
    <div class="p-6 max-w-2xl mx-auto">
      <h3 class="text-xl font-semibold text-[#282B2A] mb-6">Complete Your Payment</h3>
      
      <p class="text-[#A3A8A7] mb-6">
        If your booking is canceled by you or the vendor, your payment will be refunded back to your wallet.
      </p>
      
      <form @submit.prevent="processPayment">
        <div class="space-y-6">
          <div>
            <label class="block text-gray-500 mb-2">Card Name</label>
            <input 
              v-model="formData.cardName"
              type="text" 
              class="w-full p-4 border rounded-full"
              placeholder="Enter card name"
              required
            />
          </div>
          
          <div>
            <label class="block text-gray-500 mb-2">Email</label>
            <input 
              v-model="formData.email"
              type="email" 
              class="w-full p-4 border rounded-full"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div class="flex space-x-4">
            <div class="flex-1">
              <label class="block text-gray-500 mb-2">Exp Date</label>
              <input 
                v-model="formData.expDate"
                type="text" 
                class="w-full p-4 border rounded-full"
                placeholder="MM/DD/YYYY"
                required
              />
            </div>
            
            <div class="flex-1">
              <label class="block text-gray-500 mb-2">CVV</label>
              <input 
                v-model="formData.cvv"
                type="password" 
                class="w-full p-4 border rounded-full"
                placeholder="***"
                required
              />
            </div>
          </div>
          
          <div>
            <label class="block text-gray-500 mb-2">Phone (Mobile)</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                <span class="text-gray-500 flex items-center">
                  <img src="@/assets/img/flag.png" alt="Flag" class="w-6 h-4 mr-2" />
                  +234
                </span>
              </div>
              <input 
                v-model="formData.phone"
                type="tel" 
                class="w-full p-4 pl-24 border rounded-full"
                placeholder="Enter phone number"
                required
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                <EyeIcon class="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div v-if="phoneError" class="text-red-500 text-sm mt-1">
              {{ phoneError }}
            </div>
          </div>
        </div>
        
        <button 
          type="submit"
          class="w-full py-4 bg-[#282B2A] text-white rounded-full font-medium mt-8 flex items-center justify-center"
          :disabled="isProcessing"
        >
          <span v-if="!isProcessing">Pay ₦3,750</span>
          <div v-else class="flex items-center">
            <LoaderIcon class="w-5 h-5 animate-spin mr-2" />
            Processing...
          </div>
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { EyeIcon, LoaderIcon } from 'lucide-vue-next';
  
  const emit = defineEmits(['complete-checkout']);
  
  const formData = ref({
    cardName: '',
    email: '',
    expDate: '',
    cvv: '',
    phone: ''
  });
  
  const phoneError = ref('');
  const isProcessing = ref(false);
  
  const validatePhone = () => {
    if (!formData.value.phone) {
      phoneError.value = 'Please enter a valid phone number';
      return false;
    }
    
    phoneError.value = '';
    return true;
  };
  
  const processPayment = async () => {
    if (!validatePhone()) return;
    
    isProcessing.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Payment successful
      emit('complete-checkout');
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment error
    } finally {
      isProcessing.value = false;
    }
  };
  </script>