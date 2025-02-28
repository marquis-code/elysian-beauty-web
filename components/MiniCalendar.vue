<template>
    <div class="mini-calendar">
      <!-- Calendar header -->
      <div class="flex items-center justify-between mb-4">
        <button class="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        <h3 class="text-sm font-medium border-[0.5px] px-4 py-2 border-[#BFBFBF] rounded-full">{{ currentMonthName }} {{ currentYear }}</h3>
        <button class="p-1 rounded-full hover:bg-gray-100">
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Weekday headers -->
      <div class="grid grid-cols-7 text-center mb-2">
        <div v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="day" class="text-xs text-gray-500">
          {{ day }}
        </div>
      </div>
      
      <!-- Calendar days -->
      <div class="grid grid-cols-7 gap-1">
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          :class="[
            'h-8 w-8 flex items-center justify-center text-xs rounded-full',
            day.isCurrentMonth ? 'hover:bg-gray-100 cursor-pointer' : 'text-gray-300',
            day.isToday ? 'bg-gray-900 text-white' : '',
            day.hasAppointment && !day.isToday ? 'bg-gray-200' : '',
            day.isSelected && !day.isToday ? 'border-2 border-gray-900' : ''
          ]"
          @click="day.isCurrentMonth ? selectDate(day.date) : null"
        >
          {{ day.day }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
  
  const props = defineProps<{
    appointments: Array<{
      id: string;
      title: string;
      date: Date;
    }>
  }>()
  
  const emit = defineEmits<{
    (e: 'select-date', date: Date): void
  }>()
  
  // State
  const currentMonth = ref(new Date().getMonth())
  const currentYear = ref(new Date().getFullYear())
  const selectedDate = ref(new Date())
  
  // Computed properties
  const currentMonthName = computed(() => {
    return new Date(currentYear.value, currentMonth.value, 1).toLocaleString('default', { month: 'long' })
  })
  
  const calendarDays = computed(() => {
    const days = []
    const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
    const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0)
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    
    // Add days from previous month
    const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        hasAppointment: false,
        date: new Date(currentYear.value, currentMonth.value - 1, day)
      })
    }
    
    // Add days from current month
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(currentYear.value, currentMonth.value, day)
      date.setHours(0, 0, 0, 0)
      
      const isToday = date.getTime() === today.getTime()
      const isSelected = date.getTime() === selectedDate.value.getTime() && !isToday
      
      // Check if there are appointments for this day
      const hasAppointment = props.appointments.some(appointment => {
        const appointmentDate = new Date(appointment.date)
        appointmentDate.setHours(0, 0, 0, 0)
        return appointmentDate.getTime() === date.getTime()
      })
      
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        isSelected,
        hasAppointment,
        date
      })
    }
    
    // Add days from next month to fill the grid (6 rows x 7 days = 42 cells)
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        hasAppointment: false,
        date: new Date(currentYear.value, currentMonth.value + 1, day)
      })
    }
    
    return days
  })
  
  // Methods
  const selectDate = (date: Date) => {
    selectedDate.value = date
    emit('select-date', date)
  }
  </script>