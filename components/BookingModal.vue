<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-[#F6F8FA] w-full h-full md:h-auto md:max-h-[90vh] md:w-[90%] md:max-w-5xl md:rounded-2xl overflow-hidden">
        <div class="flex flex-col h-full">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b">
            <button @click="$emit('back')" class="p-2">
                <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="54" height="54" rx="27" fill="white"/>
                    <path d="M32 27H22M22 27L26 23M22 27L26 31" stroke="#282B2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

            </button>
            
            <h2 class="text-2xl text-[#282B2A] font-bold">
              {{ modalTitle }}
            </h2>
            
            <button @click="$emit('close')" class="p-2">
                <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="54" height="54" rx="27" fill="white"/>
                <g clip-path="url(#clip0_1518_7997)">
                <path d="M27 25.5857L31.95 20.6357L33.364 22.0497L28.414 26.9997L33.364 31.9497L31.95 33.3637L27 28.4137L22.05 33.3637L20.636 31.9497L25.586 26.9997L20.636 22.0497L22.05 20.6357L27 25.5857Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_1518_7997">
                <rect width="24" height="24" fill="white" transform="translate(15 15)"/>
                </clipPath>
                </defs>
                </svg>
            </button>
          </div>
          
          <!-- Modal Content -->
          <div class="flex-1 overflow-auto">
            <component 
              :is="currentComponent" 
              @next="handleNext"
              @select-service="handleSelectService"
              @select-time="handleSelectTime"
              @select-payment="handleSelectPayment"
              @complete-checkout="handleCompleteCheckout"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import { ArrowLeftIcon, XIcon } from 'lucide-vue-next';
  import ChooseService from '@/components/booking/ChooseService.vue';
  import SelectService from '@/components/booking/SelectService.vue';
  import SelectTime from '@/components/booking/SelectTime.vue';
  import PaymentMethod from '@/components/booking/PaymentMethod.vue';
  import Checkout from '@/components/booking/Checkout.vue';
  
  const props = defineProps<{
    step: string;
  }>();
  
  const emit = defineEmits(['close', 'back', 'next']);
  
  // Booking state
  const selectedService = ref<string | null>(null);
  const selectedTime = ref<string | null>(null);
  const selectedPaymentMethod = ref<string | null>(null);
  
  // Computed properties
  const modalTitle = computed(() => {
    switch (props.step) {
      case 'choose-service': return 'Choose a Service';
      case 'select-service': return 'Services';
      case 'select-time': return 'Select Time';
      case 'payment-method': return 'Payment';
      case 'checkout': return 'Checkout';
      default: return '';
    }
  });
  
  const currentComponent = computed(() => {
    switch (props.step) {
      case 'choose-service': return ChooseService;
      case 'select-service': return SelectService;
      case 'select-time': return SelectTime;
      case 'payment-method': return PaymentMethod;
      case 'checkout': return Checkout;
      default: return null;
    }
  });
  
  // Event handlers
  const handleNext = (nextStep: string) => {
    emit('next', nextStep);
  };
  
  const handleSelectService = (service: string) => {
    selectedService.value = service;
    emit('next', 'select-time');
  };
  
  const handleSelectTime = (time: string) => {
    selectedTime.value = time;
    emit('next', 'payment-method');
  };
  
  const handleSelectPayment = (method: string) => {
    selectedPaymentMethod.value = method;
    emit('next', 'checkout');
  };
  
  const handleCompleteCheckout = () => {
    // In a real app, this would make an API call to process payment
    emit('next', 'success');
  };
  </script>