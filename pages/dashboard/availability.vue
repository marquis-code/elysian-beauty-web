<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Availability Management</h1>
            <p class="text-gray-600 mt-2">Manage your working hours and studio bookings</p>
          </div>
          <button
            @click="openCreateModal"
            :disabled="createLoading || updateLoading"
            class="bg-[#045940] hover:bg-[#034a37] disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <div v-if="createLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Create Availability</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="fetchLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#045940]"></div>
      </div>

      <!-- Calendar Navigation -->
      <div v-else class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div class="flex items-center justify-between mb-6">
          <button
            @click="previousMonth"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeftIcon class="w-5 h-5 text-gray-600" />
          </button>
          <h2 class="text-xl font-semibold text-gray-900">
            {{ currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}
          </h2>
          <button
            @click="nextMonth"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRightIcon class="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-4">
          <!-- Day Headers -->
          <div v-for="day in dayHeaders" :key="day" class="text-center font-medium text-gray-700 py-2">
            {{ day }}
          </div>

          <!-- Calendar Days -->
          <div
            v-for="day in calendarDays"
            :key="day.date"
            @click="selectDay(day)"
            class="relative min-h-[120px] border border-gray-200 rounded-lg p-2 cursor-pointer hover:bg-gray-50 transition-colors"
            :class="{
              'bg-gray-100': !day.isCurrentMonth,
              'bg-blue-50 border-blue-200': day.isToday,
              'bg-green-50 border-[#045940]': day.hasAvailability
            }"
          >
            <div class="text-sm font-medium text-gray-700 mb-1">{{ day.day }}</div>
            
            <!-- Availability indicators -->
            <div v-if="day.availabilities.length > 0" class="space-y-1">
              <div
                v-for="availability in day.availabilities.slice(0, 3)"
                :key="availability.id"
                class="text-xs bg-[#045940] text-white px-2 py-1 rounded truncate"
              >
                {{ availability.startTime }} - {{ availability.endTime }}
              </div>
              <div
                v-if="day.availabilities.length > 3"
                class="text-xs text-gray-500"
              >
                +{{ day.availabilities.length - 3 }} more
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Day Details Modal -->
    <Teleport to="body">
      <div
        v-if="selectedDay"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="closeSelectedDay"
      >
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div
          class="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 z-10"
          @click.stop
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ selectedDay.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }}
            </h3>
            <button
              @click="closeSelectedDay"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon class="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div v-if="selectedDay.availabilities.length > 0" class="space-y-3">
            <div
              v-for="availability in selectedDay.availabilities"
              :key="availability.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div class="font-medium text-gray-900">
                  {{ availability.startTime }} - {{ availability.endTime }}
                </div>
                <div class="text-sm text-gray-600">{{ availability.day }}</div>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="editAvailability(availability)"
                  :disabled="updateLoading"
                  class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <PencilIcon class="w-4 h-4" />
                </button>
                <button
                  @click="confirmDelete(availability)"
                  class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <div class="text-gray-400 mb-4">
              <CalendarIcon class="w-12 h-12 mx-auto" />
            </div>
            <p class="text-gray-600">No availability set for this day</p>
            <button
              @click="openCreateModalForDay(selectedDay)"
              class="mt-4 bg-[#045940] text-white px-4 py-2 rounded-lg hover:bg-[#034a37] transition-colors"
            >
              Add Availability
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Create/Edit Availability Modal -->
    <Teleport to="body">
      <div
        v-if="showCreateModal || showEditModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="closeModals"
      >
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div
          class="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 z-10 max-h-[80vh] overflow-y-auto"
          @click.stop
        >
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-900">
              {{ showEditModal ? 'Edit Availability' : 'Create Availability' }}
            </h3>
            <button
              @click="closeModals"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon class="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <form @submit.prevent="saveAvailability" class="space-y-6">
            <!-- Service Provider ID Input -->
            <UiCustomInput
              v-model="form.serviceProviderId"
              label="Service Provider ID"
              placeholder="Enter service provider ID"
              :required="true"
              :disabled="createLoading || updateLoading"
            />

            <div>
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-900">Working Days</h4>
                <button
                  type="button"
                  @click="addWorkingDay"
                  :disabled="createLoading || updateLoading"
                  class="bg-[#045940] text-white px-4 py-2 rounded-lg hover:bg-[#034a37] disabled:bg-gray-400 transition-colors text-sm"
                >
                  Add Day
                </button>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(workingDay, index) in form.workingDays"
                  :key="index"
                  class="p-4 border border-gray-200 rounded-lg"
                >
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <!-- Day Dropdown -->
                    <div>
                      <CustomDropdown
                        v-model="workingDay.day"
                        label="Day"
                        :options="dayOptions"
                        placeholder="Select Day"
                        :required="true"
                        :disabled="createLoading || updateLoading"
                      />
                    </div>

                    <!-- Start Time Input -->
                    <div>
                      <UiCustomTimeInput
                        v-model="workingDay.startTime"
                        label="Start Time"
                        :required="true"
                        :disabled="createLoading || updateLoading"
                      />
                    </div>

                    <!-- End Time Input -->
                    <div>
                      <UiCustomTimeInput
                        v-model="workingDay.endTime"
                        label="End Time"
                        :required="true"
                        :disabled="createLoading || updateLoading"
                      />
                    </div>

                    <!-- Remove Button -->
                    <div class="flex items-end">
                      <button
                        type="button"
                        @click="removeWorkingDay(index)"
                        :disabled="createLoading || updateLoading"
                        class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <TrashIcon class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Empty state -->
                <div v-if="form.workingDays.length === 0" class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <CalendarIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p class="text-gray-600 mb-4">No working days added yet</p>
                  <button
                    type="button"
                    @click="addWorkingDay"
                    class="bg-[#045940] text-white px-4 py-2 rounded-lg hover:bg-[#034a37] transition-colors"
                  >
                    Add First Working Day
                  </button>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                @click="closeModals"
                :disabled="createLoading || updateLoading"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="createLoading || updateLoading || form.workingDays.length === 0"
                class="px-6 py-2 bg-[#045940] text-white rounded-lg hover:bg-[#034a37] disabled:bg-gray-400 transition-colors flex items-center space-x-2"
              >
                <div v-if="createLoading || updateLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{{ showEditModal ? 'Update' : 'Create' }} Availability</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showConfirmModal"
        class="fixed inset-0 z-60 flex items-center justify-center p-4"
        @click="closeConfirmModal"
      >
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div
          class="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 z-10"
          @click.stop
        >
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Confirm Deletion</h3>
            <p class="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this availability? This action cannot be undone.
            </p>
            <div class="flex justify-center space-x-4">
              <button
                @click="closeConfirmModal"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="deleteAvailability"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

// Import composables
import { useCreateAvailability } from "@/composables/modules/availability/useCreateAvailability"
import { useUpdateAvailability } from "@/composables/modules/availability/useUpdateAvailability"
import { useFetchAvailabilities } from "@/composables/modules/availability/useFetchAvailabilities"

// Composables
const { createAvailability, loading: createLoading } = useCreateAvailability()
const { updateAvailability, loading: updateLoading } = useUpdateAvailability()
const { fetchAvailabilities, loading: fetchLoading, availabilities: fetchedAvailabilities } = useFetchAvailabilities()

// Types
interface WorkingDay {
  day: string
  startTime: string
  endTime: string
}

interface Availability {
  id?: string
  serviceProviderId: string
  workingDays: WorkingDay[]
}

interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  hasAvailability: boolean
  availabilities: any[]
}

interface DropdownOption {
  value: string
  label: string
}

// Reactive data
const currentDate = ref(new Date())
const availabilities = ref<Availability[]>([])
const selectedDay = ref<CalendarDay | null>(null)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showConfirmModal = ref(false)
const editingAvailability = ref<Availability | null>(null)
const deletingAvailability = ref<any>(null)

// Form data
const form = ref<Availability>({
  serviceProviderId: '',
  workingDays: []
})

// Constants
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Dropdown options
const dayOptions: DropdownOption[] = daysOfWeek.map(day => ({
  value: day,
  label: day
}))

// Computed
const calendarDays = computed(() => {
  const days: CalendarDay[] = []
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // First day of the month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Start from Sunday of the week containing the first day
  const startDate = new Date(firstDay)
  startDate.setDate(firstDay.getDate() - firstDay.getDay())
  
  // Generate 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const dayAvailabilities = getAvailabilitiesForDate(date)
    
    days.push({
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isToday(date),
      hasAvailability: dayAvailabilities.length > 0,
      availabilities: dayAvailabilities
    })
  }
  
  return days
})

// Methods
const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const getAvailabilitiesForDate = (date: Date) => {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
  const result: any[] = []
  
  availabilities.value.forEach(availability => {
    availability.workingDays.forEach(workingDay => {
      if (workingDay.day === dayName) {
        result.push({
          ...workingDay,
          id: availability.id,
          serviceProviderId: availability.serviceProviderId
        })
      }
    })
  })
  
  return result
}

const loadAvailabilities = async () => {
  try {
    await fetchAvailabilities()
    if (fetchedAvailabilities.value) {
      availabilities.value = fetchedAvailabilities.value
    }
  } catch (error) {
    console.error('Error fetching availabilities:', error)
  }
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDay = (day: CalendarDay) => {
  selectedDay.value = day
}

const closeSelectedDay = () => {
  selectedDay.value = null
}

const openCreateModal = () => {
  resetForm()
  showCreateModal.value = true
}

const openCreateModalForDay = (day: CalendarDay) => {
  resetForm()
  const dayName = day.date.toLocaleDateString('en-US', { weekday: 'long' })
  form.value.workingDays.push({
    day: dayName,
    startTime: '09:00',
    endTime: '17:00'
  })
  selectedDay.value = null
  showCreateModal.value = true
}

const editAvailability = (availability: any) => {
  const fullAvailability = availabilities.value.find(a => a.id === availability.id)
  if (fullAvailability) {
    editingAvailability.value = fullAvailability
    form.value = JSON.parse(JSON.stringify(fullAvailability))
    selectedDay.value = null
    showEditModal.value = true
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingAvailability.value = null
  resetForm()
}

const resetForm = () => {
  form.value = {
    serviceProviderId: '',
    workingDays: []
  }
}

const addWorkingDay = () => {
  form.value.workingDays.push({
    day: '',
    startTime: '09:00',
    endTime: '17:00'
  })
}

const removeWorkingDay = (index: number) => {
  form.value.workingDays.splice(index, 1)
}

const saveAvailability = async () => {
  try {
    if (showEditModal.value && editingAvailability.value) {
      // Update existing availability
      await updateAvailability(editingAvailability.value.id!, form.value)
    } else {
      // Create new availability
      await createAvailability(form.value)
    }
    
    // Refresh availabilities after save
    await loadAvailabilities()
    closeModals()
  } catch (error) {
    console.error('Error saving availability:', error)
    // Handle error (show toast notification, etc.)
  }
}

const confirmDelete = (availability: any) => {
  deletingAvailability.value = availability
  showConfirmModal.value = true
}

const deleteAvailability = async () => {
  try {
    if (deletingAvailability.value && deletingAvailability.value.id) {
      // Here you would call a delete composable if available
      // await deleteAvailability(deletingAvailability.value.id)
      
      // For now, remove from local state
      const index = availabilities.value.findIndex(a => a.id === deletingAvailability.value.id)
      if (index !== -1) {
        availabilities.value.splice(index, 1)
      }
    }
    closeConfirmModal()
    selectedDay.value = null
  } catch (error) {
    console.error('Error deleting availability:', error)
  }
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  deletingAvailability.value = null
}

// Load availabilities on mount
onMounted(async () => {
  await loadAvailabilities()
})

definePageMeta({
  layout: 'dashboard'
})
</script>