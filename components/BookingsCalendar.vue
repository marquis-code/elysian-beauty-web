<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFetchBookings } from '~/composables/modules/bookings/useFetchBookings'
import { useUpdateBooking } from '~/composables/modules/bookings/useUpdateBooking'
import { useDeleteBooking } from '~/composables/modules/bookings/useDeleteBooking'

interface ServiceType {
  id: string
  description: string | null
  price: number | null
  duration: number | null
  serviceType: string
  serviceProviderId: string
}

interface Client {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNum: string
  location: string
  image: string
}

interface ServiceProvider {
  id: string
  businessName: string
  businessIsVerified: boolean
  identityIsVerified: boolean
  identityNumber: string | null
  otherServiceType: string
  businessLocationType: string
  businessLocation: string
  userId: string
  serviceRole: string
}

interface Booking {
  id: string
  clientId: string
  serviceProviderId: string
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED'
  location: string
  date: string
  duration: number
  createdAt: string
  updatedAt: string
  serviceProvider: ServiceProvider
  client: Client
  serviceType: ServiceType[]
}

interface Props {
  serviceProviderId?: string
}

const props = defineProps<Props>()

const { fetchBookings, loading: fetchLoading } = useFetchBookings()
const { updateBooking, loading: updateLoading } = useUpdateBooking()
const { deleteBooking, loading: deleteLoading } = useDeleteBooking()

const currentDate = ref(new Date())
const bookings = ref<Booking[]>([])
const selectedBooking = ref<Booking | null>(null)
const showBookingModal = ref(false)
const showConfirmDelete = ref(false)

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Time slots (00:00 to 23:00)
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return `${hour}:00`
})

// Status colors
const statusColors = {
  PENDING: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-500',
    text: 'text-yellow-900',
    badge: 'bg-yellow-500'
  },
  CONFIRMED: {
    bg: 'bg-teal-100',
    border: 'border-teal-500',
    text: 'text-teal-900',
    badge: 'bg-teal-500'
  },
  REJECTED: {
    bg: 'bg-red-100',
    border: 'border-red-500',
    text: 'text-red-900',
    badge: 'bg-red-500'
  },
  CANCELLED: {
    bg: 'bg-gray-100',
    border: 'border-gray-500',
    text: 'text-gray-900',
    badge: 'bg-gray-500'
  }
}

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

// Get bookings for a specific day and time slot
const getBookingsForSlot = (date: Date, timeSlot: string) => {
  const slotDate = new Date(date)
  slotDate.setHours(0, 0, 0, 0)
  
  return bookings.value.filter(booking => {
    const bookingDate = new Date(booking.date)
    bookingDate.setHours(0, 0, 0, 0)
    
    if (slotDate.getTime() !== bookingDate.getTime()) return false
    
    const bookingTime = new Date(booking.date)
    const bookingHour = bookingTime.getHours()
    const bookingMinute = bookingTime.getMinutes()
    const bookingMinutes = bookingHour * 60 + bookingMinute
    
    const [slotHour] = timeSlot.split(':').map(Number)
    const slotMinutes = slotHour * 60
    
    // Show booking at its start time
    return bookingMinutes === slotMinutes
  })
}

// Calculate event height based on duration
const getEventHeight = (duration: number) => {
  // Each hour is 80px
  return duration * 80
}

// Format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
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

// Check if date is today
const isToday = (date: Date) => {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
}

// Handle booking click
const handleBookingClick = (booking: Booking, event: Event) => {
  event.stopPropagation()
  selectedBooking.value = booking
  showBookingModal.value = true
}

// Handle status update
const handleStatusUpdate = async (newStatus: 'CONFIRMED' | 'REJECTED' | 'CANCELLED') => {
  if (!selectedBooking.value) return
  
  try {
    await updateBooking({
      bookingId: selectedBooking.value.id,
      status: newStatus
    })
    
    // Update local state
    const index = bookings.value.findIndex(b => b.id === selectedBooking.value!.id)
    if (index !== -1) {
      bookings.value[index].status = newStatus
    }
    
    // Close modal and refresh
    showBookingModal.value = false
    await loadBookings()
  } catch (error) {
    console.error('Failed to update booking:', error)
  }
}

// Handle delete
const handleDelete = async () => {
  if (!selectedBooking.value) return
  
  try {
    await deleteBooking(selectedBooking.value.id)
    
    // Remove from local state
    bookings.value = bookings.value.filter(b => b.id !== selectedBooking.value!.id)
    
    showConfirmDelete.value = false
    showBookingModal.value = false
  } catch (error) {
    console.error('Failed to delete booking:', error)
  }
}

// Load bookings
const loadBookings = async () => {
  try {
    const response = await fetchBookings()
    if (response?.data?.bookings) {
      bookings.value = response.data.bookings
    }
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
  }
}

onMounted(() => {
  loadBookings()
})
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm border-[0.5px] border-gray-100 p-6 mb-6">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <!-- Date Navigation -->
          <div class="flex items-center gap-4">
            <h1 class="text-lg font-semibold text-gray-900">
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

          <!-- Legend & Actions -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span class="text-gray-600">Pending</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-teal-500"></div>
                <span class="text-gray-600">Confirmed</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <span class="text-gray-600">Rejected</span>
              </div>
            </div>
            
            <button
              @click="goToToday"
              :disabled="fetchLoading"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Today
            </button>
            <button
              @click="loadBookings"
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
      <div class="bg-white rounded-lg shadow-sm border-[0.5px] border-gray-100 overflow-hidden">
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
                class="grid grid-cols-8 border-b border-gray-100"
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
                  class="relative border-l border-gray-100"
                >
                  <!-- Bookings -->
                  <div
                    v-for="booking in getBookingsForSlot(date, timeSlot)"
                    :key="booking.id"
                    class="absolute inset-x-1 top-1 border-l-4 rounded-md p-2 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                    :class="[
                      statusColors[booking.status].bg,
                      statusColors[booking.status].border,
                      statusColors[booking.status].text
                    ]"
                    :style="{ height: `${getEventHeight(booking.duration) - 8}px` }"
                    @click="handleBookingClick(booking, $event)"
                  >
                    <div class="text-xs font-semibold truncate">
                      {{ booking.client.firstName }} {{ booking.client.lastName }}
                    </div>
                    <div class="text-xs mt-0.5 truncate">
                      {{ formatTime(booking.date) }}
                    </div>
                    <div class="text-xs mt-0.5 truncate opacity-75">
                      {{ booking.serviceType[0]?.serviceType || 'Service' }}
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
            <span class="text-gray-700 font-medium">Loading bookings...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Details Modal -->
    <BookingDetailsModal
      v-if="selectedBooking"
      :booking="selectedBooking"
      :show="showBookingModal"
      :update-loading="updateLoading"
      :delete-loading="deleteLoading"
      @close="showBookingModal = false"
      @update-status="handleStatusUpdate"
      @delete="showConfirmDelete = true"
    />

    <!-- Confirm Delete Modal -->
    <ConfirmDeleteModal
      :show="showConfirmDelete"
      :loading="deleteLoading"
      @close="showConfirmDelete = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<style scoped>
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