<template>
    <div class="daily-view">
      <div class="space-y-4">
        <div v-for="(appointment, index) in timeSlots" :key="index" class="flex">
          <!-- Time column -->
          <div class="w-24 flex-shrink-0 pt-2 text-right pr-4 text-gray-600">
            {{ formatTime(appointment.time) }}
          </div>
          
          <!-- Appointment column -->
          <div class="flex-1 border-t border-gray-200 pt-2 pb-8 relative">
            <div 
              v-if="appointment.appointment" 
              :class="[
                'p-4 rounded-lg',
                getAppointmentClass(appointment.appointment.type)
              ]"
            >
              <h3 class="text-lg font-medium">{{ appointment.appointment.title }}</h3>
              <div class="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                <div class="flex items-center gap-1">
                  <UserIcon class="w-4 h-4" />
                  <span>{{ appointment.appointment.attendees[0].name }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <MapPinIcon class="w-4 h-4" />
                  <span>{{ appointment.appointment.location }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <ClockIcon class="w-4 h-4" />
                  <span>10:21AM - 09:00 AM</span>
                </div>
              </div>
              
              <!-- Attendee avatars -->
              <div v-if="appointment.appointment.attendees.length > 1" class="mt-2 flex justify-end">
                <div class="flex -space-x-2">
                  <div 
                    v-for="(attendee, i) in appointment.appointment.attendees" 
                    :key="i" 
                    class="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img :src="attendee.avatar" :alt="attendee.name" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { UserIcon, MapPinIcon, ClockIcon } from 'lucide-vue-next'
  
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
      type: 'gele' | 'makeup' | 'massage' | 'task';
      contact?: string;
    }>
  }>()
  
  // Generate time slots from 8 AM to 4 PM
  const timeSlots = computed(() => {
    const slots = []
    for (let hour = 8; hour <= 15; hour++) {
      const time = hour < 12 ? `${hour}:00 AM` : `${hour - 12 || 12}:00 PM`
      const hourStr = hour < 10 ? `0${hour}` : `${hour}`
      
      // Find appointment for this time slot
      const appointment = props.appointments.find(a => {
        const startHour = parseInt(a.startTime.split(':')[0])
        return startHour === hour
      })
      
      slots.push({
        time: hourStr,
        appointment
      })
    }
    return slots
  })
  
  // Format time for display
  const formatTime = (hour: string) => {
    const hourNum = parseInt(hour)
    if (hourNum < 12) {
      return `${hourNum}:00 AM`
    } else {
      return `${hourNum - 12 || 12}:00 PM`
    }
  }
  
  // Get CSS class based on appointment type
  const getAppointmentClass = (type: string) => {
    switch (type) {
      case 'gele':
        return 'bg-green-50 border border-green-100'
      case 'makeup':
        return 'bg-yellow-50 border border-yellow-100'
      case 'massage':
        return 'bg-red-50 border border-red-100'
      case 'task':
        return 'bg-gray-50 border border-gray-200'
      default:
        return 'bg-blue-50 border border-blue-100'
    }
  }
  </script>