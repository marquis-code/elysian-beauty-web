<script setup lang="ts">
import { ref } from 'vue'
import BookingsCalendar from '@/components/BookingsCalendar.vue'
// Meta
useHead({
  title: 'Category Management'
})

definePageMeta({
  layout: 'dashboard'
})
// Your service provider ID - could come from auth, route params, etc.
const serviceProviderId = ref('c46fd793-9856-4fba-9f48-a2b9f4839709')
</script>

<template>
  <div>
    <BookingsCalendar :service-provider-id="serviceProviderId" />
  </div>
</template>