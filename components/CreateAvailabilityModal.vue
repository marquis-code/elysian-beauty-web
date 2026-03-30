<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal Header with Close Button -->
          <div class="p-6 relative">
            <button
              @click="handleClose"
              :disabled="isLoading"
              class="absolute top-4 left-4 w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
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

            <!-- Modal Content -->
            <div class="mt-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Edit Availability</h2>

              <p class="text-gray-600 mb-6">
                Stay booked with
                <span class="font-semibold">real-time availability</span>. Set your
                <span class="font-semibold">working hours</span>, and let clients see
                open slots instantly.
              </p>

              <!-- Availability Options -->
              <div class="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                  When are you available?
                </h3>

                <div class="space-y-4">
                  <label class="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      v-model="availabilityOption"
                      value="now"
                      :disabled="isLoading"
                      class="h-5 w-5 text-gray-900 disabled:opacity-50"
                    />
                    <span class="ml-3 text-gray-700">Now</span>
                  </label>

                  <label class="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      v-model="availabilityOption"
                      value="not_available"
                      :disabled="isLoading"
                      class="h-5 w-5 text-gray-900 disabled:opacity-50"
                    />
                    <span class="ml-3 text-gray-700">Not available</span>
                  </label>

                  <label class="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      v-model="availabilityOption"
                      value="custom"
                      :disabled="isLoading"
                      class="h-5 w-5 text-gray-900 disabled:opacity-50"
                    />
                    <span class="ml-3 text-gray-700">Custom</span>
                  </label>
                </div>
              </div>

              <!-- Working Days Dropdown - Only show for custom option -->
              <div v-if="availabilityOption === 'custom'" class="mb-6">
                <div
                  class="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  @click="workingDaysOpen = !workingDaysOpen"
                >
                  <div>
                    <h3 class="text-xl font-semibold text-gray-900">Working days</h3>
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
                <div v-if="workingDaysOpen" class="border-x border-b rounded-b-lg p-4">
                  <!-- Day Selector -->
                  <div class="flex justify-between mb-6 gap-2">
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

                  <!-- Working Days List -->
                  <div v-if="workingDays.length > 0" class="space-y-4">
                    <div
                      v-for="(day, index) in workingDays"
                      :key="day.day"
                      class="border rounded-lg p-4 bg-gray-50"
                    >
                      <div class="flex justify-between items-center mb-3">
                        <h4 class="text-lg font-semibold text-gray-900">{{ day.day }}</h4>
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

                      <!-- Apply to all toggle (only on first day) -->
                      <div v-if="index === 0" class="flex justify-between items-center mb-4">
                        <div class="flex items-center">
                          <span class="mr-2 text-gray-700 text-sm">Apply to all</span>
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              v-model="applyToAll"
                              :disabled="isLoading"
                              class="sr-only peer"
                            />
                            <div
                              class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"
                            ></div>
                          </label>
                        </div>
                      </div>

                      <!-- Working Hours -->
                      <div>
                        <h5 class="text-gray-700 font-medium mb-3">Working Hours</h5>
                        <div class="flex items-center gap-2">
                          <div class="relative flex-1">
                            <input
                              type="time"
                              v-model="day.startTime"
                              :disabled="isLoading"
                              class="w-full border rounded-lg p-3 text-sm disabled:opacity-50 disabled:bg-gray-100"
                            />
                          </div>

                          <span class="text-gray-600 font-medium">to</span>

                          <div class="relative flex-1">
                            <input
                              type="time"
                              v-model="day.endTime"
                              :disabled="isLoading"
                              class="w-full border rounded-lg p-3 text-sm disabled:opacity-50 disabled:bg-gray-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div v-else class="text-center py-8 text-gray-500">
                    <p>Select a day to add working hours</p>
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
                  class="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center min-w-[140px]"
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
                  class="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useUpdateAvailability } from '@/composables/modules/availability/useUpdateAvailability'

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
  availabilityId: string
}

interface Emits {
  (e: 'close'): void
  (e: 'success'): void
}

const props = withDefaults(defineProps<Props>(), {
  workingDay: null,
})

const emit = defineEmits<Emits>()

const { updateAvailability, loading: updateLoading } = useUpdateAvailability()

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
const availabilityOption = ref<'now' | 'not_available' | 'custom'>('now')
const workingDaysOpen = ref(false)
const workingDays = ref<WorkingDay[]>([])
const applyToAll = ref(false)
const errorMessage = ref('')
const isLoading = computed(() => updateLoading.value)

// Initialize working days
const initializeWorkingDays = () => {
  if (props.workingDay) {
    // Editing existing - load current state
    workingDays.value = [
      {
        day: props.workingDay.day,
        startTime: props.workingDay.startTime,
        endTime: props.workingDay.endTime,
      },
    ]
    availabilityOption.value = 'custom'
    workingDaysOpen.value = true
  } else {
    // Creating new - default to "now"
    workingDays.value = []
    availabilityOption.value = 'now'
    workingDaysOpen.value = false
  }
  applyToAll.value = false
  errorMessage.value = ''
}

// Watch for show prop changes
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      initializeWorkingDays()
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
  } else {
    // Remove day
    workingDays.value.splice(index, 1)
  }
}

const removeDay = (day: string) => {
  const index = workingDays.value.findIndex((wd) => wd.day === day)
  if (index !== -1) {
    workingDays.value.splice(index, 1)
  }
}

const validateTimes = (): boolean => {
  for (const day of workingDays.value) {
    if (!day.startTime || !day.endTime) {
      errorMessage.value = 'Please fill in all time fields'
      return false
    }

    const start = day.startTime.split(':').map(Number)
    const end = day.endTime.split(':').map(Number)
    const startMinutes = start[0] * 60 + start[1]
    const endMinutes = end[0] * 60 + end[1]

    if (startMinutes >= endMinutes) {
      errorMessage.value = `End time must be after start time for ${day.day}`
      return false
    }
  }
  return true
}

const buildPayload = () => {
  let days: WorkingDay[] = []

  if (availabilityOption.value === 'now') {
    // Monday to Friday, 9 AM to 5 PM
    days = standardWeekdays.map((day) => ({
      day,
      startTime: '09:00',
      endTime: '17:00',
    }))
  } else if (availabilityOption.value === 'not_available') {
    // Empty array
    days = []
  } else if (availabilityOption.value === 'custom') {
    // Use selected working days
    if (applyToAll.value && workingDays.value.length > 0) {
      // Apply first day's times to all selected days
      const firstDay = workingDays.value[0]
      days = workingDays.value.map((day) => ({
        day: day.day,
        startTime: firstDay.startTime,
        endTime: firstDay.endTime,
      }))
    } else {
      days = workingDays.value
    }
  }

  return {
    availabilityId: props.availabilityId,
    workingDays: days,
  }
}

const handleSave = async () => {
  errorMessage.value = ''

  // Validate custom option
  if (availabilityOption.value === 'custom') {
    if (workingDays.value.length === 0) {
      errorMessage.value = 'Please select at least one working day'
      return
    }

    if (!validateTimes()) {
      return
    }
  }

  try {
    const payload = buildPayload()
    await updateAvailability(props.availabilityId, payload)
    emit('success')
    handleClose()
  } catch (error: any) {
    errorMessage.value = error?.message || 'Failed to update availability. Please try again.'
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