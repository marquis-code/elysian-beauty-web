<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCreateAvailability } from '@/composables/modules/availability/useCreateAvailability'

interface WorkingDay {
  id: string
  day: string
  startTime: string
  endTime: string
}

interface Props {
  serviceProviderId: string
  show: boolean
  preSelectedDay?: string
}

interface Emits {
  (e: 'close'): void
  (e: 'success'): void
}

const props = withDefaults(defineProps<Props>(), {
  preSelectedDay: ''
})
const emit = defineEmits<Emits>()

const { createAvailability, loading: createLoading } = useCreateAvailability()

const allDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const workingDays = ref<WorkingDay[]>([])
const selectedDay = ref('')
const errorMessage = ref('')
const successMessage = ref('')

// Initialize with pre-selected day if provided
watch(() => props.show, (isShown) => {
  if (isShown && props.preSelectedDay && !workingDays.value.some(wd => wd.day === props.preSelectedDay)) {
    selectedDay.value = props.preSelectedDay
    // Automatically add the pre-selected day
    setTimeout(() => {
      if (canAddDay.value) {
        addWorkingDay()
      }
    }, 100)
  }
})

const availableDays = computed(() => {
  const usedDays = workingDays.value.map(wd => wd.day)
  return allDays.filter(day => !usedDays.includes(day))
})

const canAddDay = computed(() => 
  selectedDay.value && availableDays.value.includes(selectedDay.value)
)

const hasWorkingDays = computed(() => workingDays.value.length > 0)

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const addWorkingDay = () => {
  if (!canAddDay.value) return
  
  workingDays.value.push({
    id: generateId(),
    day: selectedDay.value,
    startTime: '09:00',
    endTime: '17:00'
  })
  
  selectedDay.value = ''
  errorMessage.value = ''
}

const removeWorkingDay = (id: string) => {
  workingDays.value = workingDays.value.filter(wd => wd.id !== id)
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

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!hasWorkingDays.value) {
    errorMessage.value = 'Please add at least one working day'
    return
  }
  
  if (!validateTimes()) {
    return
  }
  
  try {
    const payload = {
      serviceProviderId: props.serviceProviderId,
      workingDays: workingDays.value.map(({ day, startTime, endTime }) => ({
        day,
        startTime,
        endTime
      }))
    }
    
    await createAvailability(payload)
    
    successMessage.value = 'Availability created successfully!'
    
    setTimeout(() => {
      emit('success')
      handleClose()
    }, 1500)
  } catch (error: any) {
    errorMessage.value = error?.message || 'Failed to create availability. Please try again.'
  }
}

const handleClose = () => {
  if (!createLoading.value) {
    resetForm()
    emit('close')
  }
}

const resetForm = () => {
  workingDays.value = []
  selectedDay.value = ''
  errorMessage.value = ''
  successMessage.value = ''
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        @click.self="handleClose"
      >
        <div
          class="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">
                  Create Availability
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  Add your working days and set hours for each day
                </p>
              </div>
              <button
                type="button"
                :disabled="createLoading"
                class="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1 hover:bg-gray-100 rounded-lg"
                @click="handleClose"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Add Working Day Section -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Add Working Day
              </label>
              <div class="flex gap-3">
                <div class="flex-1">
                  <select
                    v-model="selectedDay"
                    :disabled="createLoading || availableDays.length === 0"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                  >
                    <option value="" disabled>
                      {{ availableDays.length > 0 ? 'Select a day' : 'All days added' }}
                    </option>
                    <option
                      v-for="day in availableDays"
                      :key="day"
                      :value="day"
                    >
                      {{ day }}
                    </option>
                  </select>
                </div>
                <button
                  type="button"
                  :disabled="!canAddDay || createLoading"
                  class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center gap-2"
                  @click="addWorkingDay"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Day
                </button>
              </div>
            </div>

            <!-- Working Days List -->
            <div v-if="hasWorkingDays" class="space-y-3 mb-6">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-semibold text-gray-700">
                  Working Days ({{ workingDays.length }})
                </label>
              </div>
              
              <TransitionGroup name="list">
                <div
                  v-for="workingDay in workingDays"
                  :key="workingDay.id"
                  class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div class="flex items-start gap-4">
                    <!-- Day Badge -->
                    <div class="flex-shrink-0 pt-1">
                      <div class="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold text-sm min-w-[100px] text-center">
                        {{ workingDay.day }}
                      </div>
                    </div>

                    <!-- Time Inputs -->
                    <div class="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1.5">
                          Start Time
                        </label>
                        <input
                          v-model="workingDay.startTime"
                          type="time"
                          :disabled="createLoading"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm bg-white"
                        >
                      </div>

                      <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1.5">
                          End Time
                        </label>
                        <input
                          v-model="workingDay.endTime"
                          type="time"
                          :disabled="createLoading"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm bg-white"
                        >
                      </div>
                    </div>

                    <!-- Delete Button -->
                    <button
                      type="button"
                      :disabled="createLoading"
                      class="flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-colors disabled:opacity-50 mt-6"
                      @click="removeWorkingDay(workingDay.id)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </TransitionGroup>
            </div>

            <!-- Empty State -->
            <div
              v-else
              class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
            >
              <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-gray-500 font-medium">No working days added yet</p>
              <p class="text-sm text-gray-400 mt-1">Select a day from the dropdown above to get started</p>
            </div>

            <!-- Messages -->
            <Transition name="fade">
              <div
                v-if="errorMessage"
                class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <p class="text-sm text-red-800">{{ errorMessage }}</p>
              </div>
            </Transition>

            <Transition name="fade">
              <div
                v-if="successMessage"
                class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              >
                <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <p class="text-sm text-green-800">{{ successMessage }}</p>
              </div>
            </Transition>
          </div>

          <!-- Footer -->
          <div class="p-6 border-t border-gray-100 bg-gray-50">
            <div class="flex items-center justify-end gap-3">
              <button
                type="button"
                :disabled="createLoading"
                class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                @click="handleClose"
              >
                Cancel
              </button>
              <button
                type="button"
                :disabled="createLoading || !hasWorkingDays"
                class="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[160px] justify-center"
                @click="handleSubmit"
              >
                <svg
                  v-if="createLoading"
                  class="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{{ createLoading ? 'Creating...' : 'Create Availability' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9);
  opacity: 0;
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

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.4s ease;
}
</style>