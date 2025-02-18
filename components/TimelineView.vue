<template>
    <div class="space-y-6">
      <div v-for="hour in hours" :key="hour" class="flex">
        <div class="w-24 text-gray-500">{{ formatHour(hour) }}</div>
        <div class="flex-1">
          <AppointmentCard
            v-for="appointment in getAppointmentsForHour(hour)"
            :key="appointment.id"
            :appointment="appointment"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { format } from 'date-fns'
  
  const props = defineProps<{
    appointments: any[]
  }>()
  
  const hours = computed(() => {
    return Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 8 PM
  })
  
  const formatHour = (hour: number) => {
    return format(new Date().setHours(hour), 'hh:mm a')
  }
  
  const getAppointmentsForHour = (hour: number) => {
    return props.appointments.filter(apt => {
      const aptHour = parseInt(apt.time.split(':')[0])
      return aptHour === hour
    })
  }
  </script>