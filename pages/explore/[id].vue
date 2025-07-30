<template>
    <div class="min-h-screen container mx-auto">
      <SalonHeader v-if="!currentStep" />
      <SalonGallery v-if="!currentStep" />
      <ServiceCategories v-if="!currentStep" @book-now="startBooking" />
      
      <Transition name="modal">
        <BookingModal 
          v-if="currentStep" 
          :step="currentStep" 
          @close="closeModal" 
          @back="goBack"
          @next="goNext"
        />
      </Transition>
      
      <AppToast 
        v-if="showToast" 
        :message="toastMessage" 
        :type="toastType" 
        @close="showToast = false" 
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useFetchCategories } from "@/composables/modules/categories/useFetchCategories"
import { useFetchServiceTypes } from  "@/composables/modules/serviceTypes/useFetchServiceTypes"
  
  // State management
  const currentStep = ref<string | null>(null);
  const showToast = ref(false);
  const toastMessage = ref('');
  const toastType = ref('success');
  
  // Check for saved state on page load
  onMounted(() => {
    const savedState = localStorage.getItem('beautyBookingState');
    if (savedState) {
      const state = JSON.parse(savedState);
      if (state.currentStep) {
        currentStep.value = state.currentStep;
      }
    }
  });
  
  // Define types
interface Category {
  icon: string;
  name: string;
}

interface Salon {
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  level: string;
  isNew?: boolean;
}


  // Save state when it changes
  watch(currentStep, (newValue) => {
    if (newValue) {
      localStorage.setItem('beautyBookingState', JSON.stringify({ currentStep: newValue }));
    } else {
      localStorage.removeItem('beautyBookingState');
    }
  }, { deep: true });
  
  // Navigation functions
  const startBooking = () => {
    currentStep.value = 'choose-service';
  };
  
  const closeModal = () => {
    currentStep.value = null;
  };
  
  const goBack = () => {
    const steps = ['choose-service', 'select-service', 'select-time', 'payment-method', 'checkout'];
    const currentIndex = steps.indexOf(currentStep.value as string);
    
    if (currentIndex > 0) {
      currentStep.value = steps[currentIndex - 1];
    } else {
      closeModal();
    }
  };
  
  const goNext = (nextStep: string) => {
    currentStep.value = nextStep;
    
    if (nextStep === 'success') {
      showSuccessToast();
      setTimeout(() => {
        currentStep.value = null;
      }, 2000);
    }
  };
  
  const showSuccessToast = () => {
    toastMessage.value = 'Appointment has been booked successfully!';
    toastType.value = 'success';
    showToast.value = true;
    
    setTimeout(() => {
      showToast.value = false;
    }, 5000);
  };

  definePageMeta({
    layout: 'header-only'
  })
  </script>
  
  <style>
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  </style>