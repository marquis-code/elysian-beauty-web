<template>
  <div class="min-h-screen flex flex-col">
          <ReusableServiceProviderHeader 
        :serviceProvider="serviceType"
        :user="user"
        @logout="handleLogout"
        @navigateToProfile="goToProfile"
      />
    <!-- Header -->
    <header class="bg-white border-b-[0.5px] border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button 
          @click="goBack"
          class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span class="text-sm font-medium">Back</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <!-- Page Title -->
      <div class="mb-4">
        <h3 class="text-lg font-black text-gray-900 mb-2">
          Choose a Service
        </h3>
      </div>

      <!-- Book Section -->
      <div class="space-y-4">
        <h2 class="text-base font-bold text-gray-900">Book</h2>

        <!-- Book an Appointment Card -->
        <div
          @click="handleBookAppointment"
          class="group relative w-full py-3 border-[0.5px] border-gray-100 px-3 rounded-xl bg-white hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 cursor-pointer"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div class="flex-1 mb-4 sm:mb-0">
              <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Book an appointment
              </h3>
              <p class="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                Schedule services for yourself
              </p>
            </div>
          </div>

          <!-- Icon - Positioned absolutely on right -->
          <div class="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all duration-300">
            <span class="text-white text-xl sm:text-2xl font-bold">E</span>
          </div>
        </div>

        <!-- Gift an Appointment Card -->
        <div
          @click="handleGiftAppointment"
          class="group relative w-full py-3 border-[0.5px] border-gray-100 px-3 rounded-xl bg-white hover:border-gray-100 transition-all duration-300 cursor-not-allowed opacity-75"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div class="flex-1 mb-4 sm:mb-0">
              <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                Gift others an appointment
              </h3>
              <p class="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                Coming soon!
              </p>
            </div>
          </div>

          <!-- Icon - Positioned absolutely on right -->
          <div class="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-lg opacity-50">
            <span class="text-white text-xl sm:text-2xl font-bold">E</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUser } from "@/composables/auth/useUser"
  import { useFetchServiceType } from "@/composables/modules/serviceTypes/useFetchServiceType"
  const { serviceType, loading } = useFetchServiceType()
const { user } = useUser()
const router = useRouter()
const route = useRoute()

interface ServiceOption {
  id: string
  title: string
  description: string
  enabled: boolean
  route?: string
}

// Handle book appointment click
const handleBookAppointment = () => {
  // Navigate to booking flow
   navigateTo(`/explore/${route?.params?.id}/book`)
}

// Handle gift appointment click
const handleGiftAppointment = () => {
  // Coming soon - show toast or alert
  console.log('Gift appointment feature coming soon!')
  // Optional: Show a toast notification
  // useToast().info('Gift appointment feature coming soon!')
}

// Handle back button
const goBack = () => {
  router.back()
}

definePageMeta({
  layout: 'header-only'
})

  const handleLogout = () => {
    localStorage.clear()
    navigateTo('/')
  }
</script>

<style scoped>
/* Smooth transitions for interactive elements */
button,
div[role="button"] {
  @apply transition-all duration-300 ease-in-out;
}

/* Ensure proper focus states for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    @apply transition-none !important;
  }
}

/* Responsive text sizing */
@media (max-width: 640px) {
  h1 {
    @apply text-3xl;
  }

  h2 {
    @apply text-xl;
  }

  h3 {
    @apply text-lg;
  }

  p {
    @apply text-sm;
  }
}
</style>