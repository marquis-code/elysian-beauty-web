<template>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="day in weekDays" :key="day.date" class="space-y-4">
        <h3 class="font-medium">{{ day.label }}</h3>
        <AppointmentCard
          v-for="appointment in getAppointmentsForDay(day.date)"
          :key="appointment.id"
          :appointment="appointment"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { format, addDays } from 'date-fns'
  
  const props = defineProps<{
    appointments: any[]
  }>()
  
  const weekDays = computed(() => {
    const today = new Date()
    return Array.from({ length: 3 }, (_, i) => {
      const date = addDays(today, i)
      return {
        date: format(date, 'yyyy-MM-dd'),
        label: format(date, 'EEE, dd MMM')
      }
    })
  })
  
  const getAppointmentsForDay = (date: string) => {
    return props.appointments.filter(apt => apt.date === date)
  }
  </script>