<template>
    <div class="weekly-view">
      <!-- Week header -->
      <div class="grid grid-cols-8 border-b">
        <div class="p-4"></div> <!-- Empty cell for time column -->
        <div 
          v-for="day in weekDays" 
          :key="day.date" 
          class="p-4 text-center border-l"
        >
          <div class="uppercase text-xs text-gray-500">{{ day.dayName }}</div>
          <div class="text-2xl font-semibold">{{ day.date }}</div>
        </div>
      </div>
      
      <!-- Time slots -->
      <div class="grid grid-cols-8">
        <!-- Time column -->
        <div class="time-column">
          <div 
            v-for="time in timeSlots" 
            :key="time" 
            class="h-24 flex items-start justify-end pr-2 text-sm text-gray-600 border-b"
          >
            {{ time }}
          </div>
        </div>
        
        <!-- Day columns -->
        <div 
          v-for="day in weekDays" 
          :key="day.date" 
          class="day-column border-l"
        >
          <div 
            v-for="time in timeSlots" 
            :key="time" 
            class="h-24 border-b relative"
          >
            <!-- Appointments for this day and time -->
            <div 
              v-for="appointment in getAppointmentsForDayAndTime(day.fullDate, time)" 
              :key="appointment.id" 
              class="absolute top-1 left-1 right-1 bg-[#ECFDF5] border border-[#045940] rounded-lg p-2 text-sm"
            >
              <div class="font-medium">{{ appointment.title }}</div>
              <div class="flex items-center text-xs text-gray-600 mt-1">
                <ClockIcon class="w-3 h-3 mr-1" />
                <span>08:21 - 09:00am</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { ClockIcon } from 'lucide-vue-next'
  
  const props = defineProps<{
    appointments: Array<{
      id: string;
      title: string;
      date: Date;
      startTime: string;
      endTime: string;
      location: string;
      attendees: Array<{
        id: string;
        name: string;
        avatar: string;
      }>;
      type: string;
      contact?: string;
    }>
  }>()
  
  // Generate week days (Mon-Sun)
  const weekDays = computed(() => {
    const days = []
    const today = new Date()
    const monday = new Date(today)
    
    // Find the Monday of the current week
    monday.setDate(today.getDate() - today.getDay() + 1)
    
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      
      days.push({
        dayName: dayNames[i],
        date: date.getDate(),
        fullDate: new Date(date)
      })
    }
    
    return days
  })
  
  // Generate time slots from 8 AM to 4 PM
  const timeSlots = computed(() => {
    const slots = []
    for (let hour = 8; hour <= 16; hour++) {
      slots.push(hour < 12 ? `${hour} AM` : `${hour - 12} PM`)
    }
    return slots
  })
  
  // Get appointments for a specific day and time
  const getAppointmentsForDayAndTime = (date: Date, timeSlot: string) => {
    const hour = timeSlot.includes('AM') 
      ? parseInt(timeSlot.split(' ')[0]) 
      : parseInt(timeSlot.split(' ')[0]) + 12
    
    return props.appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date)
      const appointmentHour = parseInt(appointment.startTime.split(':')[0])
      
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear() &&
        appointmentHour === hour
      )
    })
  }
  </script>
  
  <style scoped>
  .time-column {
    @apply border-r;
  }
  
  .time-column > div {
    @apply pt-2;
  }
  
  .day-column > div {
    @apply relative;
  }
  </style>