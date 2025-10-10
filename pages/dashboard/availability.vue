<script setup lang="ts">
import { ref } from 'vue'
import AvailabilityCalendar from '@/components/AvailabilityCalendar.vue'

// Your service provider ID - could come from auth, route params, etc.
const serviceProviderId = ref('3e7a75e5-2434-4ea2-9984-8d541bdaaee6')

definePageMeta({
  layout: 'dashboard'
})

</script>

<template>
  <div>
    <AvailabilityCalendar :service-provider-id="serviceProviderId" />
  </div>
</template>