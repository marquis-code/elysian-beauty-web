<template>
<main>
<main class="max-w-6xl mx-auto">
    <ReusableServiceProviderHeader 
        :serviceProvider="serviceType"
        :user="user"
        @logout="handleLogout"
        @navigateToProfile="goToProfile"
      />
    <!-- {{ serviceTypes }} -->
<BookingFlow 
    :services="serviceTypes" 
    :serviceType=" serviceType"
    :service-provider-id="route.params.id" 
  />
</main>
</main>
</template>

<script setup lang="ts">
import BookingFlow from '@/components/BookingFlow.vue'
import { useUser } from "@/composables/auth/useUser"
import { useFetchServiceType } from "@/composables/modules/serviceTypes/useFetchServiceType"
import { useFetchServiceTypes } from "@/composables/modules/serviceTypes/useFetchServiceTypes";
import { useFetchServiceProviderServices } from "@/composables/modules/serviceTypes/useFetchServiceProviderServices"
const { fetchServiceType, serviceType, loading } = useFetchServiceType()
const { fetchServiceProviderServices, services, loading: fetchingServices } = useFetchServiceProviderServices()
const { serviceTypes, fetchServiceTypes } = useFetchServiceTypes()
const { user } = useUser()
const route = useRoute()
onMounted(() => {
  fetchServiceTypes()
})

  const handleLogout = () => {
    localStorage.clear()
    navigateTo('/')
  }

definePageMeta({
    layout: 'booking'
})
</script>