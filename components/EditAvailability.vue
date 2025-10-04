<script setup lang="ts">
import { ref, watch } from 'vue'
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

interface Props {
  workingDay: WorkingDay
  availabilityId: string
  show: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { updateAvailability, loading: updateLoading } = useUpdateAvailability()

const startTime = ref('')
const endTime = ref('')
const errorMessage = ref('')
const successMessage = ref('')

// Initialize form with working day data
watch(() => props.workingDay, (newVal) => {
  if (newVal) {
    startTime.value = newVal.startTime
    endTime.value = newVal.endTime
  }
}, { immediate: true })

const validateTimes = (): boolean => {
  if (!startTime.value || !endTime.value) {
    errorMessage.value = 'Please fill in all time fields'
    return false
  }
  
  const start = startTime.value.split(':').map(Number)
  const end = endTime.value.split(':').map(Number)
  const startMinutes = start[0] * 60 + start[1]
  const endMinutes = end[0] * 60 + end[1]
  
  if (startMinutes >= endMinutes) {
    errorMessage.value = 'End time must be after start time'
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!validateTimes()) {
    return
  }
  
  try {
    const payload = {
      availabilityId: props.availabilityId,
      workingDayId: props.workingDay.id,
      day: props.workingDay.day,
      startTime: startTime.value,
      endTime: endTime.value
    }
    
    await updateAvailability(payload)
    
    successMessage.value = 'Availability updated successfully!'
    
    setTimeout(() => {
      emit('success')
      handleClose()
    }, 1500)
  } catch (error: any) {
    errorMessage.value = error?.message || 'Failed to update availability. Please try again.'
  }
}

const handleClose = () => {
  if (!updateLoading.value) {
    resetForm()
    emit('close')
  }
}

const resetForm = () => {
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
          class="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">
                  Edit Availability
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  Update working hours for {{ workingDay.day }}
                </p>
              </div>
              <button
                type="button"
                :disabled="updateLoading"
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
          <div class="p-6 space-y-5">
            <!-- Day Display -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Day
              </label>
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
                <div class="text-center font-semibold text-blue-900">
                  {{ workingDay.day }}
                </div>
              </div>
            </div>

            <!-- Time Inputs -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  v-model="startTime"
                  type="time"
                  :disabled="updateLoading"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                >
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  v-model="endTime"
                  type="time"
                  :disabled="updateLoading"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                >
              </div>
            </div>

            <!-- Duration Display -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Duration:</span>
                <span class="font-semibold text-gray-900">
                  {{ startTime }} - {{ endTime }}
                </span>
              </div>
            </div>

            <!-- Messages -->
            <Transition name="fade">
              <div
                v-if="errorMessage"
                class="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
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
                class="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
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
                :disabled="updateLoading"
                class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                @click="handleClose"
              >
                Cancel
              </button>
              <button
                type="button"
                :disabled="updateLoading"
                class="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[140px] justify-center"
                @click="handleSubmit"
              >
                <svg
                  v-if="updateLoading"
                  class="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{{ updateLoading ? 'Updating...' : 'Update' }}</span>
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
</style>