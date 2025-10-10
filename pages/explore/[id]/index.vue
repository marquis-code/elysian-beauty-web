<template>
    <div class="min-h-screen container mx-auto">
      <!-- {{ serviceType }} -->
      <ReusableServiceProviderHeader 
        v-if="!currentStep"
        :serviceProvider="serviceType"
        :user="user"
        @logout="handleLogout"
        @navigateToProfile="goToProfile"
      />
    <!-- <header v-if="!loading" class="sticky top-0 z-50 bg-white">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between gap-6">
          <div class="flex-shrink-0">
          <NuxtLink to="/explore" class="flex items-center space-x-2">
             <img src="@/assets/img/blue-logo.png" class="h-8 w-32" />
            </NuxtLink>
          </div>

          <div class="flex-1 max-w-2xl">
            <SearchBar
              ref="searchBarComponent"
              @select="handleSearchSelect"
              @search="handleSearch"
            />
          </div>

          <div class="flex items-center space-x-4">
            <button class="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>


            <button class="flex items-center space-x-2 p-2 rounded-lg transition-colors">
              <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </div>
              <div class="hidden md:block">
                <p class="text-sm text-start font-medium text-gray-900">{{ `${user?.firstName} ${user?.lastName}`}}</p>
                <p class="text-xs text-start text-gray-500">{{ user?.role ?? 'Nil' }}</p>
              </div>
              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header> -->
      <!-- <SalonHeader :serviceProvider="serviceType" v-if="!currentStep" /> -->
      <SalonGallery :serviceProvider="serviceType" v-if="!currentStep" />
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
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from "@/composables/auth/useUser"
import SearchBar from '@/components/SearchBar.vue'
const { user } = useUser()
  import { useFetchServiceType } from "@/composables/modules/serviceTypes/useFetchServiceType"
  import { useFetchServiceProviderServices } from "@/composables/modules/serviceTypes/useFetchServiceProviderServices"
  const { serviceType, loading } = useFetchServiceType()
  const { fetchServiceProviderServices, services: serviceTypes, loading: fetchingServices } = useFetchServiceProviderServices()
  // State management
  const currentStep = ref<string | null>(null);
  const showToast = ref(false);
  const toastMessage = ref('');
  const toastType = ref('success');
  const router = useRouter()
  
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

  const handleLogout = () => {
    localStorage.clear()
    navigateTo('/')
  }

  // Get unique service types for filtered services
const uniqueServiceTypesFiltered = computed(() => {
  if (!filteredServices.value || filteredServices.value.length === 0) return []
  
  const types = Array.from(new Set(filteredServices.value.map(item => item.serviceType)))
  return types.sort() as string[]
})

const filteredServices = computed(() => {
  if (!currentSearch.value.trim()) return serviceTypes.value || []
  
  const query = currentSearch.value.toLowerCase().trim()
  
  return serviceTypes.value?.filter(service => {
    const matchesService = service.serviceType?.toLowerCase().includes(query)
    const matchesProvider = service.ServiceProvider?.businessName?.toLowerCase().includes(query)
    const matchesLocation = service.ServiceProvider?.businessLocation?.toLowerCase().includes(query)
    
    return matchesService || matchesProvider || matchesLocation
  }) || []
})

const scrollContainer = ref<HTMLElement | null>(null)
const categoryScrollContainer = ref<HTMLElement | null>(null)
const searchBarComponent = ref<any>(null)
const activeServiceType = ref<string>('')
const sectionRefs = ref<Record<string, HTMLElement>>({})
const currentSearch = ref<string>('')

  // Scroll to service type section
const scrollToServiceType = (serviceType: string) => {
  const element = sectionRefs.value[serviceType]
  if (element && scrollContainer.value) {
    activeServiceType.value = serviceType
    const elementTop = element.offsetTop - 120 // Account for sticky nav
    
    scrollContainer.value.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    })

    // Also scroll category button into view
    nextTick(() => {
      scrollCategoryIntoView(serviceType)
    })
  }
}

// Scroll the category button into view
const scrollCategoryIntoView = (serviceType: string) => {
  if (!categoryScrollContainer.value) return

  nextTick(() => {
    const button = categoryScrollContainer.value?.querySelector(
      `button:nth-child(${uniqueServiceTypesFiltered.value.indexOf(serviceType) + 1})`
    ) as HTMLElement

    if (button) {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  })
}

  // Handle search bar select event
const handleSearchSelect = (event: any) => {
  const { type, result } = event
  
  if (type === 'service') {
    router.push(`/explore/${result.id}`)
  } else if (type === 'serviceType') {
    currentSearch.value = ''
    scrollToServiceType(result.name)
  } else if (type === 'provider') {
    router.push(`/providers/${result.name}`)
  }
}

// Handle search event
const handleSearch = (query: string) => {
  currentSearch.value = query
}
  
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