<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFetchAvailabilities } from '@/composables/modules/availability/useFetchAvailabilities'
import { useCreateAvailability } from '@/composables/modules/availability/useCreateAvailability'
import { useUpdateAvailability } from '@/composables/modules/availability/useUpdateAvailability'

interface WorkingDay {
  id: string
  day: string
  startTime: string
  endTime: string
  availabilityId: string
  createdAt: string
  updatedAt: string
}

interface Availability {
  id: string
  serviceProviderId: string
  availabilityType: string
  workingDays: WorkingDay[]
  createdAt: string
  updatedAt: string
}

interface Props {
  serviceProviderId: string
}

const props = defineProps<Props>()

const { fetchAvailabilities, loading: fetchLoading, availabilities: fetchedAvailabilities } = useFetchAvailabilities()
const { createAvailability, loading: createLoading } = useCreateAvailability()
const { updateAvailability, loading: updateLoading } = useUpdateAvailability()

// Calendar state
const currentDate = ref(new Date())
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedSlot = ref<{ day: string; date: Date } | null>(null)
const selectedWorkingDay = ref<WorkingDay | null>(null)

// Time slots (00:00 to 23:00)
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return `${hour}:00`
})

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Get week dates
const weekDates = computed(() => {
  const start = new Date(currentDate.value)
  const day = start.getDay()
  const diff = start.getDate() - day
  const weekStart = new Date(start.setDate(diff))
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    return date
  })
})

// Format date range
const dateRangeText = computed(() => {
  const start = weekDates.value[0]
  const end = weekDates.value[6]
  
  const startMonth = start.toLocaleString('default', { month: 'short' })
  const endMonth = end.toLocaleString('default', { month: 'short' })
  const year = end.getFullYear()
  
  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate().toString().padStart(2, '0')} - ${end.getDate().toString().padStart(2, '0')} ${year}`
  }
  
  return `${startMonth} ${start.getDate().toString().padStart(2, '0')} - ${endMonth} ${end.getDate().toString().padStart(2, '0')} ${year}`
})

// Get availability data
const availabilityData = computed<Availability | null>(() => {
  return fetchedAvailabilities.value?.data || null
})

// Map working days by day name
const workingDaysByDay = computed(() => {
  if (!availabilityData.value?.workingDays) return {}
  
  const map: Record<string, WorkingDay> = {}
  availabilityData.value.workingDays.forEach(wd => {
    map[wd.day] = wd
  })
  return map
})

// Get events for a specific day and time slot
const getEventsForSlot = (date: Date, timeSlot: string) => {
  const dayName = daysOfWeek[date.getDay()]
  const workingDay = workingDaysByDay.value[dayName]
  
  if (!workingDay) return []
  
  // Parse time slot
  const [slotHour] = timeSlot.split(':').map(Number)
  const [startHour, startMinute] = workingDay.startTime.split(':').map(Number)
  const [endHour, endMinute] = workingDay.endTime.split(':').map(Number)
  
  const slotMinutes = slotHour * 60
  const startMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute
  
  // Check if this slot falls within the working day
  if (slotMinutes >= startMinutes && slotMinutes < endMinutes) {
    // Only show the event at the start hour
    if (slotMinutes === startMinutes) {
      return [{
        id: workingDay.id,
        title: dayName,
        startTime: workingDay.startTime,
        endTime: workingDay.endTime,
        workingDay: workingDay
      }]
    }
  }
  
  return []
}

// Calculate event height based on duration
const getEventHeight = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)
  
  const startMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute
  const durationMinutes = endMinutes - startMinutes
  
  // Each hour is 80px, calculate proportional height
  return (durationMinutes / 60) * 80
}

// Navigation
const goToPreviousWeek = () => {
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() - 7)
  currentDate.value = newDate
}

const goToNextWeek = () => {
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() + 7)
  currentDate.value = newDate
}

const goToToday = () => {
  currentDate.value = new Date()
}

// Handle slot click
const handleSlotClick = (date: Date, timeSlot: string) => {
  const dayName = daysOfWeek[date.getDay()]
  const workingDay = workingDaysByDay.value[dayName]
  
  if (workingDay) {
    // Edit existing
    selectedWorkingDay.value = workingDay
    showEditModal.value = true
  } else {
    // Create new
    selectedSlot.value = { day: dayName, date }
    showCreateModal.value = true
  }
}

// Handle event click
const handleEventClick = (workingDay: WorkingDay, event: Event) => {
  event.stopPropagation()
  selectedWorkingDay.value = workingDay
  showEditModal.value = true
}

// Load availability
const loadAvailability = async () => {
  try {
    await fetchAvailabilities(props.serviceProviderId)
  } catch (error) {
    console.error('Failed to fetch availability:', error)
  }
}

// Success handlers
const handleCreateSuccess = () => {
  showCreateModal.value = false
  selectedSlot.value = null
  loadAvailability()
}

const handleUpdateSuccess = () => {
  showEditModal.value = false
  selectedWorkingDay.value = null
  loadAvailability()
}

// Check if date is today
const isToday = (date: Date) => {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
}

onMounted(() => {
  loadAvailability()
})
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-xl  border-[0.5px] border-gray-100 p-6 mb-6">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <!-- Date Navigation -->
          <div class="flex items-center gap-4">
            <h1 class="text-base font-semibold text-gray-900">
              {{ dateRangeText }}
            </h1>
            <div class="flex items-center gap-2">
              <button
                @click="goToPreviousWeek"
                :disabled="fetchLoading"
                class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                @click="goToNextWeek"
                :disabled="fetchLoading"
                class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <button
              @click="goToToday"
              :disabled="fetchLoading"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Today
            </button>
            <button
              @click="loadAvailability"
              :disabled="fetchLoading"
              class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <svg class="w-5 h-5" :class="{ 'animate-spin': fetchLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="bg-white rounded-xl border-[0.5px] border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <div class="inline-block min-w-full">
            <!-- Calendar Header -->
            <div class="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
              <div class="px-4 py-3 text-sm font-medium text-gray-500">
                Time
              </div>
              <div
                v-for="(date, index) in weekDates"
                :key="index"
                class="px-4 py-3 text-center border-l border-gray-200"
              >
                <div class="text-sm font-medium text-gray-500">
                  {{ daysOfWeek[date.getDay()].substring(0, 3) }}
                </div>
                <div
                  class="mt-1 text-lg font-semibold"
                  :class="isToday(date) ? 'text-white bg-teal-500 rounded-full w-8 h-8 flex items-center justify-center mx-auto' : 'text-gray-900'"
                >
                  {{ date.getDate().toString().padStart(2, '0') }}
                </div>
              </div>
            </div>

            <!-- Calendar Body -->
            <div class="relative">
              <div
                v-for="timeSlot in timeSlots"
                :key="timeSlot"
                class="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                style="min-height: 80px;"
              >
                <!-- Time Label -->
                <div class="px-4 py-2 text-sm text-gray-500 font-medium">
                  {{ timeSlot }}
                </div>

                <!-- Day Slots -->
                <div
                  v-for="(date, index) in weekDates"
                  :key="index"
                  class="relative border-l border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors"
                  @click="handleSlotClick(date, timeSlot)"
                >
                  <!-- Events -->
                  <div
                    v-for="event in getEventsForSlot(date, timeSlot)"
                    :key="event.id"
                    class="absolute inset-x-1 top-1 bg-teal-100 border-l-4 border-teal-500 rounded-md p-2 hover:bg-teal-200 transition-colors cursor-pointer overflow-hidden"
                    :style="{ height: `${getEventHeight(event.startTime, event.endTime) - 8}px` }"
                    @click="handleEventClick(event.workingDay, $event)"
                  >
                    <div class="text-xs font-semibold text-teal-900 truncate">
                      {{ event.title }}
                    </div>
                    <div class="text-xs text-teal-700 mt-0.5">
                      {{ event.startTime }} - {{ event.endTime }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div
        v-if="fetchLoading"
        class="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40"
      >
        <div class="bg-white rounded-lg p-6 shadow-xl">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span class="text-gray-700 font-medium">Loading availability...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <CreateAvailabilityModal
      v-if="selectedSlot"
      :service-provider-id="serviceProviderId"
      :show="showCreateModal"
      :pre-selected-day="selectedSlot.day"
      @close="showCreateModal = false; selectedSlot = null"
      @success="handleCreateSuccess"
    />

    <!-- Edit Modal -->
    <EditAvailability
      v-if="selectedWorkingDay"
      :working-day="selectedWorkingDay"
      :availability-id="availabilityData?.id || ''"
      :show="showEditModal"
      @close="showEditModal = false; selectedWorkingDay = null"
      @success="handleUpdateSuccess"
    />
  </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>