<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 px-4"
      >
        <div class="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal Header with Close Button -->
          <div class="px-6 relative">

            <!-- Modal Content -->
            <div class="py-4">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-black text-gray-900">Edit Availability</h2>
                <button
                  @click="handleClose"
                  :disabled="isLoading"
                  class="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p class="text-gray-600 text-sm mb-6">
                Stay booked with
                <span class="font-semibold">real-time availability</span>. Set your
                <span class="font-semibold">working hours</span>, and let clients see
                open slots instantly.
              </p>

              <!-- Loading State -->
              <div v-if="fetchLoading" class="flex justify-center items-center py-8">
                <svg
                  class="w-8 h-8 animate-spin text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>

              <template v-else>
                <!-- Availability Options -->
                <div class="bg-gray-25 p-6 rounded-2xl mb-6">
                  <h3 class="text-base font-semibold text-gray-900 mb-4">
                    When are you available?
                  </h3>

                  <div class="space-y-4">
                    <label class="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        v-model="availabilityOption"
                        value="IMMEDIATELY"
                        :disabled="isLoading"
                        class="h-5 w-5 text-gray-900 disabled:opacity-50"
                      />
                      <span class="ml-3 text-sm text-gray-700">Now</span>
                    </label>

                    <label class="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        v-model="availabilityOption"
                        value="NOT_AVAILABLE"
                        :disabled="isLoading"
                        class="h-5 w-5 text-gray-900 disabled:opacity-50"
                      />
                      <span class="ml-3 text-sm text-gray-700">Not available</span>
                    </label>

                    <label class="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        v-model="availabilityOption"
                        value="FEW_DAYS"
                        :disabled="isLoading"
                        class="h-5 w-5 text-gray-900 disabled:opacity-50"
                      />
                      <span class="ml-3 text-sm text-gray-700">Custom</span>
                    </label>
                  </div>
                </div>

                <!-- Working Days Section - Only for custom -->
                <div v-if="availabilityOption === 'FEW_DAYS'" class="mb-6">
                  <div
                    class="border-[0.5px] border-gray-25 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-25 transition-colors"
                    @click="workingDaysOpen = !workingDaysOpen"
                  >
                    <div>
                      <h3 class="text-base font-black text-gray-900">Working days</h3>
                      <p class="text-gray-600 text-sm">Choose your preferred working days</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 transform transition-transform"
                      :class="{ 'rotate-180': workingDaysOpen }"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  <!-- Working Days Content -->
                  <div v-if="workingDaysOpen" class="border-x-[0.5px] border-gray-50 border-b-[0.5px] rounded-b-lg p-4 space-y-4">
                    <!-- Day Selector Buttons -->
                    <div class="flex justify-between gap-2 mb-4">
                      <button
                        v-for="day in dayButtons"
                        :key="day.short"
                        @click="toggleDay(day.long)"
                        :disabled="isLoading"
                        :class="[
                          'flex-1 h-10 rounded-md flex items-center justify-center font-medium transition-colors disabled:opacity-50',
                          isSelectedDay(day.long)
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                        ]"
                      >
                        {{ day.short }}
                      </button>
                    </div>

                    <!-- Apply to All Toggle (shown only if days selected) -->
                    <div v-if="workingDays.length > 0" class="border-t pt-4">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <span class="mr-3 text-gray-700 text-sm">Apply to all</span>
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              v-model="applyToAll"
                              :disabled="isLoading"
                              class="sr-only peer"
                              @change="handleApplyToAllChange"
                            />
                            <div
                              class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"
                            ></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <!-- Working Days List -->
                    <div v-if="workingDays.length > 0" class="space-y-4 pt-2">
                      <div
                        v-for="(day, index) in workingDays"
                        :key="day.day"
                        class="border-[0.5px] border-gray-50 rounded-lg p-4 bg-white hover:bg-gray-25 transition-colors"
                      >
                        <div class="flex justify-between items-start mb-4">
                          <h4 class="text-base font-semibold text-gray-900">{{ day.day }}</h4>
                          <button
                            @click="removeDay(day.day)"
                            :disabled="isLoading"
                            class="text-red-600 hover:text-red-700 p-1 hover:bg-red-100 rounded disabled:opacity-50 transition-colors"
                          >
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>

                        <!-- Working Hours Section -->
                        <div>
                          <h5 class="text-gray-700 text-sm font-medium mb-3">Working Hours</h5>
                          <div class="flex items-center gap-3">
                            <!-- Start Time Picker -->
                            <div class="flex-1">
                              <label class="block text-xs text-gray-600 mb-1">Start Time</label>
                              <div class="relative">
                                <input
                                  type="time"
                                  v-model="day.startTime"
                                  :disabled="isLoading || (applyToAll && index !== 0)"
                                  class="custom-input disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                              </div>
                            </div>

                            <span class="text-gray-600 font-medium pt-6">to</span>

                            <!-- End Time Picker -->
                            <div class="flex-1">
                              <label class="block text-xs text-gray-600 mb-1">End Time</label>
                              <div class="relative">
                                <input
                                  type="time"
                                  v-model="day.endTime"
                                  :disabled="isLoading || (applyToAll && index !== 0)"
                                  class="custom-input disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                              </div>
                            </div>
                          </div>

                          <!-- Time validation error -->
                          <div
                            v-if="getTimeError(day.day)"
                            class="mt-2 text-xs text-red-600"
                          >
                            {{ getTimeError(day.day) }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Empty State -->
                    <div v-else class="text-center flex justify-center items-center flex-col py-8 text-gray-500">
                      <img src="@/assets/img/empty-state.svg" class="h-20 w-20" />
                      <p class="font-medium">No days selected</p>
                      <p class="text-sm mt-1">Click a day button above to add working hours</p>
                    </div>
                  </div>
                </div>

                <!-- Error Message -->
                <Transition name="fade">
                  <div
                    v-if="errorMessage"
                    class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                  >
                    <svg
                      class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p class="text-sm text-red-800">{{ errorMessage }}</p>
                  </div>
                </Transition>

                <!-- Action Buttons -->
                <div class="flex space-x-4 mt-8">
                  <button
                    @click="handleSave"
                    :disabled="isLoading"
                    class="bg-primary text-white px-6 py-3 text-sm rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center flex-1"
                  >
                    <svg
                      v-if="isLoading"
                      class="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>{{ isLoading ? 'Saving...' : 'Save' }}</span>
                  </button>
                  <button
                    @click="handleClose"
                    :disabled="isLoading"
                    class="bg-gray-200 text-gray-700 px-6 text-sm py-3 rounded-full font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFetchAvailabilityByProvider } from '@/composables/modules/availability/useFetchAvailabilityByProvider'
import { useCreateAvailability } from '@/composables/modules/availability/useCreateAvailability'
import { useUpdateAvailability } from '@/composables/modules/availability/useUpdateAvailability'
import { useUser } from "@/composables/auth/useUser"

const { createAvailability, loading: createLoading } = useCreateAvailability()
const { fetchAvailabilityByProvider, availabilities, loading: fetchLoading } = useFetchAvailabilityByProvider()
const { updateAvailability, loading: updateLoading } = useUpdateAvailability()
const { user } = useUser()

type AvailabilityTypeEnum = "IMMEDIATELY" | "NOT_AVAILABLE" | "FEW_DAYS"

interface WorkingDay {
  day: string
  startTime: string
  endTime: string
}

interface Props {
  show: boolean
  workingDay?: {
    id: string
    day: string
    startTime: string
    endTime: string
    availabilityId: string
  } | null
  availabilityId?: string
}

interface Emits {
  (e: 'close'): void
  (e: 'success'): void
}

const props = withDefaults(defineProps<Props>(), {
  workingDay: null,
  availabilityId: ''
})

const emit = defineEmits<Emits>()

// Days of week mapping
const dayButtons = [
  { short: 'Mo', long: 'Monday' },
  { short: 'Tu', long: 'Tuesday' },
  { short: 'We', long: 'Wednesday' },
  { short: 'Th', long: 'Thursday' },
  { short: 'Fr', long: 'Friday' },
  { short: 'Sat', long: 'Saturday' },
  { short: 'Su', long: 'Sunday' },
]

const standardWeekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

// State
const availabilityOption = ref<AvailabilityTypeEnum>('IMMEDIATELY')
const workingDaysOpen = ref(false)
const workingDays = ref<WorkingDay[]>([])
const applyToAll = ref(false)
const errorMessage = ref('')
const timeErrors = ref<Record<string, string>>({})
const existingAvailabilityId = ref<string>('')
const isEditMode = ref(false)

const isLoading = computed(() => createLoading.value || updateLoading.value)

// Fetch existing availability data
const loadExistingAvailability = async () => {
  if (!user.value.serviceProvider?.id) return

  try {
    const result = await fetchAvailabilityByProvider(user.value.serviceProvider?.id || '')
    
    // The API returns data at res.data.data
    if (result && result.type !== 'ERROR' && result.data?.data) {
      const availability = result.data.data
      
      // Store the availability ID for updates
      existingAvailabilityId.value = availability.id || availability._id || ''
      isEditMode.value = true

      // Set availability type
      availabilityOption.value = availability.availabilityType || 'IMMEDIATELY'

      // Load working days if they exist
      if (availability.workingDays && availability.workingDays.length > 0) {
        workingDays.value = availability.workingDays.map((day: any) => ({
          day: day.day,
          startTime: day.startTime,
          endTime: day.endTime,
        }))
        sortWorkingDays()
        
        if (availabilityOption.value === 'FEW_DAYS') {
          workingDaysOpen.value = true
        }
      } else {
        workingDays.value = []
      }
    } else {
      // No existing availability found
      isEditMode.value = false
      existingAvailabilityId.value = ''
      initializeDefaultValues()
    }
  } catch (error) {
    console.error('Error loading availability:', error)
    isEditMode.value = false
    initializeDefaultValues()
  }
}

// Initialize default values for new availability
const initializeDefaultValues = () => {
  workingDays.value = []
  availabilityOption.value = 'IMMEDIATELY'
  workingDaysOpen.value = false
  applyToAll.value = false
  errorMessage.value = ''
  timeErrors.value = {}
}

// Watch for show prop changes
watch(
  () => props.show,
  async (newVal) => {
    if (newVal) {
      await loadExistingAvailability()
    }
  }
)

watch(
  () => availabilityOption.value,
  (newVal) => {
    errorMessage.value = ''
    timeErrors.value = {}

    // Only preserve working days when in custom mode
    if (newVal !== 'FEW_DAYS') {
      workingDaysOpen.value = false
      if (newVal === 'IMMEDIATELY') {
        // Don't clear working days yet, let the save handler populate them
      } else if (newVal === 'NOT_AVAILABLE') {
        workingDays.value = []
      }
      applyToAll.value = false
    } else if (newVal === 'FEW_DAYS' && workingDays.value.length === 0) {
      workingDaysOpen.value = true
    }
  }
)

const isSelectedDay = (day: string): boolean => {
  return workingDays.value.some((wd) => wd.day === day)
}

const toggleDay = (day: string) => {
  const index = workingDays.value.findIndex((wd) => wd.day === day)

  if (index === -1) {
    // Add day with default times
    workingDays.value.push({
      day,
      startTime: '09:00',
      endTime: '17:00',
    })
    // Keep working days in week order
    sortWorkingDays()
  } else {
    // Remove day
    workingDays.value.splice(index, 1)
    if (workingDays.value.length === 0) {
      applyToAll.value = false
    }
  }
}

const sortWorkingDays = () => {
  const dayOrder = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  workingDays.value.sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  )
}

const removeDay = (day: string) => {
  const index = workingDays.value.findIndex((wd) => wd.day === day)
  if (index !== -1) {
    workingDays.value.splice(index, 1)
    if (workingDays.value.length === 0) {
      applyToAll.value = false
    }
  }
}

const handleApplyToAllChange = () => {
  if (applyToAll.value && workingDays.value.length > 0) {
    // Apply first day's times to all days
    const firstDayTime = {
      startTime: workingDays.value[0].startTime,
      endTime: workingDays.value[0].endTime,
    }
    workingDays.value.forEach((day) => {
      day.startTime = firstDayTime.startTime
      day.endTime = firstDayTime.endTime
    })
  }
}

const getTimeError = (day: string): string => {
  return timeErrors.value[day] || ''
}

const validateTimes = (): boolean => {
  timeErrors.value = {}
  errorMessage.value = ''

  for (const day of workingDays.value) {
    if (!day.startTime || !day.endTime) {
      timeErrors.value[day.day] = 'Please fill in all time fields'
      errorMessage.value = 'Please fill in all time fields'
      return false
    }

    const start = day.startTime.split(':').map(Number)
    const end = day.endTime.split(':').map(Number)
    const startMinutes = start[0] * 60 + start[1]
    const endMinutes = end[0] * 60 + end[1]

    if (startMinutes >= endMinutes) {
      timeErrors.value[day.day] = 'End time must be after start time'
      errorMessage.value = 'Please check time fields for errors'
      return false
    }
  }
  return true
}

const buildWorkingDaysPayload = (): WorkingDay[] => {
  if (availabilityOption.value === 'IMMEDIATELY') {
    // Monday to Friday, 9 AM to 5 PM
    return standardWeekdays.map((day) => ({
      day,
      startTime: '09:00',
      endTime: '17:00',
    }))
  } else if (availabilityOption.value === 'NOT_AVAILABLE') {
    // Empty array
    return []
  } else if (availabilityOption.value === 'FEW_DAYS') {
    // Use selected working days
    return workingDays.value.map((day) => ({
      day: day.day,
      startTime: day.startTime,
      endTime: day.endTime,
    }))
  }
  return []
}

const handleSave = async () => {
  errorMessage.value = ''
  timeErrors.value = {}

  // Validate based on availability option
  if (availabilityOption.value === 'FEW_DAYS') {
    if (workingDays.value.length === 0) {
      errorMessage.value = 'Please select at least one working day'
      return
    }

    if (!validateTimes()) {
      return
    }
  }

  try {
    const workingDaysPayload = buildWorkingDaysPayload()

    if (isEditMode.value && existingAvailabilityId.value) {
      // Update existing availability
      await updateAvailability(existingAvailabilityId.value, workingDaysPayload)
    } else {
      // Create new availability
      const createPayload = {
        serviceProviderId: user.value.serviceProvider?.id || '',
        availabilityType: availabilityOption.value,
        workingDays: workingDaysPayload
      }
      await createAvailability(createPayload)
    }

    emit('success')
    handleClose()
  } catch (error: any) {
    errorMessage.value = error?.message || 'Failed to save availability. Please try again.'
  }
}

const handleClose = () => {
  if (!isLoading.value) {
    emit('close')
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>