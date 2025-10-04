<template>
<main class="max-w-6xl mx-auto">
    <!-- {{ serviceTypes }} -->
<BookingFlow 
    :services="serviceTypes" 
    :service-provider-id="providerId" 
  />
</main>
</template>

<script setup lang="ts">
import BookingFlow from '@/components/BookingFlow.vue'
import { useFetchServiceTypes } from "@/composables/modules/serviceTypes/useFetchServiceTypes";

const { serviceTypes, fetchServiceTypes } = useFetchServiceTypes()
const providerId = 'provider-id-here'

onMounted(() => {
  fetchServiceTypes()
})

definePageMeta({
    layout: 'booking'
})
</script>