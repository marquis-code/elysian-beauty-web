<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <!-- Modal Header with Close Button -->
      <div class="p-6 relative">
        <button @click="$emit('close')" class="absolute top-4 left-4 w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Modal Content -->
        <div class="mt-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Edit Availability</h2>
          
          <p class="text-gray-600 mb-6">
            Stay booked with <span class="font-semibold">real-time availability</span>. Set your <span class="font-semibold">working hours</span>, 
            and let clients see open slots instantly.
          </p>
          
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
          
          <template v-else>
            <!-- Availability Options -->
            <div class="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">When are you available?</h3>
              
              <div class="space-y-4">
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="availabilityOption" 
                    value="now" 
                    class="h-5 w-5 text-gray-900"
                  >
                  <span class="ml-3 text-gray-700">Now</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="availabilityOption" 
                    value="not_available" 
                    class="h-5 w-5 text-gray-900"
                  >
                  <span class="ml-3 text-gray-700">Not available</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="availabilityOption" 
                    value="within_days" 
                    class="h-5 w-5 text-gray-900"
                  >
                  <span class="ml-3 text-gray-700">Within the next few days</span>
                </label>
              </div>
            </div>
            
            <!-- Working Days Dropdown -->
            <div class="mb-6">
              <div 
                class="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                @click="workingDaysOpen = !workingDaysOpen"
              >
                <div>
                  <h3 class="text-xl font-semibold text-gray-900">Working days</h3>
                  <p class="text-gray-600">Choose your preferred working days</p>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-6 w-6 transform transition-transform" 
                  :class="{ 'rotate-180': workingDaysOpen }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <!-- Working Days Content -->
              <div v-if="workingDaysOpen" class="border-x border-b rounded-b-lg p-4">
                <!-- Day Selector -->
                <div class="flex justify-between mb-6">
                  <button 
                    v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su']" 
                    :key="day"
                    @click="toggleDay(day)"
                    type="button"
                    :class="[
                      'w-10 h-10 rounded-md flex items-center justify-center transition-colors',
                      selectedDays.includes(day) ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]"
                  >
                    {{ day }}
                  </button>
                </div>
                
                <!-- Selected Days Time Settings -->
                <div v-for="dayAbbr in selectedDays" :key="dayAbbr" class="mb-6">
                  <div class="flex justify-between items-center mb-2">
                    <h4 class="text-xl font-semibold text-gray-900">{{ dayMap[dayAbbr] }}</h4>
                    <div v-if="dayAbbr === 'Mo'" class="flex items-center">
                      <span class="mr-2 text-gray-700">Apply to all</span>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="applyToAll" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                  </div>
                  <p class="text-gray-600 mb-4">Set working hours for {{ dayMap[dayAbbr] }}</p>
                  
                  <!-- Working Hours -->
                  <div class="mb-4">
                    <h5 class="text-gray-700 mb-2">Working Hours</h5>
                    <div class="flex items-center">
                      <div class="relative w-full mr-2">
                        <input 
                          type="time" 
                          v-model="dayTimeMap[dayAbbr].start" 
                          :disabled="applyToAll && dayAbbr !== 'Mo'"
                          class="w-full border rounded-lg p-3 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="09:00"
                        >
                      </div>
                      
                      <span class="mx-2">to</span>
                      
                      <div class="relative w-full">
                        <input 
                          type="time" 
                          v-model="dayTimeMap[dayAbbr].end" 
                          :disabled="applyToAll && dayAbbr !== 'Mo'"
                          class="w-full border rounded-lg p-3 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="17:00"
                        >
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- No Days Selected Message -->
                <div v-if="selectedDays.length === 0" class="text-center py-6 text-gray-500">
                  Please select at least one working day
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex space-x-4 mt-8">
              <button 
                @click="handleSave" 
                :disabled="creating || updating || selectedDays.length === 0"
                class="bg-gray-900 text-white px-6 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
              >
                {{ creating || updating ? 'Saving...' : 'Save' }}
              </button>
              <button 
                @click="$emit('close')" 
                :disabled="creating || updating"
                class="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateAvailability } from "@/composables/modules/availability/useCreateAvailability"
import { useUpdateAvailability } from "@/composables/modules/availability/useUpdateAvailability"
import { useFetchAvailabilityByProvider } from "@/composables/modules/availability/useFetchAvailabilityByProvider"

// Define emits
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

// Define props
const props = defineProps<{
  serviceProviderId: string
}>()

// Composables
const { createAvailability, loading: creating } = useCreateAvailability()
const { fetchAvailabilityByProvider, availabilities, loading } = useFetchAvailabilityByProvider()
const { updateAvailability, loading: updating } = useUpdateAvailability()

// State
const availabilityOption = ref<string>('now')
const workingDaysOpen = ref<boolean>(true)
const selectedDays = ref<string[]>([])
const applyToAll = ref<boolean>(false)
const existingAvailabilityId = ref<string | null>(null)

// Day time map for each day
const dayTimeMap = ref<Record<string, { start: string; end: string }>>({
  Mo: { start: '09:00', end: '17:00' },
  Tu: { start: '09:00', end: '17:00' },
  We: { start: '09:00', end: '17:00' },
  Th: { start: '09:00', end: '17:00' },
  Fr: { start: '09:00', end: '17:00' },
  Sat: { start: '09:00', end: '17:00' },
  Su: { start: '09:00', end: '17:00' }
})

// Day abbreviation mapping
const dayMap: Record<string, string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sat: 'Saturday',
  Su: 'Sunday'
}

const reverseDayMap: Record<string, string> = {
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sat',
  Sunday: 'Su'
}

// Lifecycle - Fetch existing availability on mount
onMounted(async () => {
  await loadExistingAvailability()
})

// Load existing availability
const loadExistingAvailability = async () => {
  try {
    await fetchAvailabilityByProvider(props.serviceProviderId)
    
    if (availabilities.value && availabilities.value.data) {
      const availability = availabilities.value.data
      existingAvailabilityId.value = availability.id
      
      // Set availability type
      if (availability.availabilityType === 'IMMEDIATELY') {
        availabilityOption.value = 'now'
      } else if (availability.availabilityType === 'NOT_AVAILABLE') {
        availabilityOption.value = 'not_available'
      } else if (availability.availabilityType === 'WITHIN_DAYS') {
        availabilityOption.value = 'within_days'
      }
      
      // Set working days
      if (availability.workingDays && availability.workingDays.length > 0) {
        selectedDays.value = availability.workingDays
          .map((wd: any) => reverseDayMap[wd.day])
          .filter(Boolean)
        
        // Populate time map
        availability.workingDays.forEach((wd: any) => {
          const dayAbbr = reverseDayMap[wd.day]
          if (dayAbbr) {
            dayTimeMap.value[dayAbbr] = {
              start: wd.startTime,
              end: wd.endTime
            }
          }
        })
      }
    }
  } catch (error) {
    console.error('Error loading availability:', error)
  }
}

// Watch apply to all - update all selected days with Monday's time
watch(applyToAll, (newVal) => {
  if (newVal) {
    const mondayTime = dayTimeMap.value['Mo']
    selectedDays.value.forEach(day => {
      dayTimeMap.value[day] = { ...mondayTime }
    })
  }
})

// Watch Monday's time changes when apply to all is enabled
watch(
  () => [dayTimeMap.value['Mo'].start, dayTimeMap.value['Mo'].end],
  ([newStart, newEnd]) => {
    if (applyToAll.value) {
      selectedDays.value.forEach(day => {
        if (day !== 'Mo') {
          dayTimeMap.value[day] = { start: newStart, end: newEnd }
        }
      })
    }
  }
)

// Methods
const toggleDay = (day: string) => {
  const index = selectedDays.value.indexOf(day)
  if (index === -1) {
    selectedDays.value.push(day)
    // Sort days in week order
    const weekOrder = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su']
    selectedDays.value.sort((a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b))
  } else {
    selectedDays.value.splice(index, 1)
  }
}

const getAvailabilityType = (): string => {
  switch (availabilityOption.value) {
    case 'now':
      return 'IMMEDIATELY'
    case 'not_available':
      return 'NOT_AVAILABLE'
    case 'within_days':
      return 'WITHIN_DAYS'
    default:
      return 'IMMEDIATELY'
  }
}

const prepareWorkingDays = () => {
  return selectedDays.value.map(dayAbbr => ({
    day: dayMap[dayAbbr],
    startTime: dayTimeMap.value[dayAbbr].start,
    endTime: dayTimeMap.value[dayAbbr].end
  }))
}

const handleSave = async () => {
  if (selectedDays.value.length === 0) {
    return
  }
  
  try {
    const workingDays = prepareWorkingDays()
    
    if (existingAvailabilityId.value) {
      // Update existing availability
      const updatePayload = {
        availabilityType: getAvailabilityType(),
        workingDays
      }
      
      await updateAvailability(existingAvailabilityId.value, updatePayload)
    } else {
      // Create new availability
      const createPayload = {
        serviceProviderId: props.serviceProviderId,
        availabilityType: getAvailabilityType(),
        workingDays
      }
      
      await createAvailability(createPayload)
    }
    
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Error saving availability:', error)
  }
}
</script>