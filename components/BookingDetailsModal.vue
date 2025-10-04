<script setup lang="ts">
import { computed } from 'vue'

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
  booking: Booking
  show: boolean
  updateLoading: boolean
  deleteLoading: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'updateStatus', status: 'CONFIRMED' | 'REJECTED' | 'CANCELLED'): void
  (e: 'delete'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const statusColors = {
  PENDING: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    badge: 'bg-yellow-500'
  },
  CONFIRMED: {
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    badge: 'bg-teal-500'
  },
  REJECTED: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    badge: 'bg-red-500'
  },
  CANCELLED: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    badge: 'bg-gray-500'
  }
}

const isPending = computed(() => props.booking.status === 'PENDING')

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return {
    date: date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    })
  }
}

const bookingDateTime = computed(() => formatDateTime(props.booking.date))

const handleClose = () => {
  if (!props.updateLoading && !props.deleteLoading) {
    emit('close')
  }
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
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <h2 class="text-2xl font-bold text-gray-900">
                    Booking Details
                  </h2>
                  <span
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                    :class="[statusColors[booking.status].bg, statusColors[booking.status].text]"
                  >
                    {{ booking.status }}
                  </span>
                </div>
                <p class="mt-1 text-sm text-gray-500">
                  Booking ID: {{ booking.id.substring(0, 8) }}...
                </p>
              </div>
              <button
                type="button"
                :disabled="updateLoading || deleteLoading"
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
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Date & Time -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="flex items-center gap-2 text-gray-600 mb-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-xs font-medium">Date</span>
                  </div>
                  <p class="text-sm font-semibold text-gray-900">{{ bookingDateTime.date }}</p>
                </div>
                <div>
                  <div class="flex items-center gap-2 text-gray-600 mb-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-xs font-medium">Time</span>
                  </div>
                  <p class="text-sm font-semibold text-gray-900">{{ bookingDateTime.time }} ({{ booking.duration }}h)</p>
                </div>
              </div>
            </div>

            <!-- Client Information -->
            <div>
              <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Client Information
              </h3>
              <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {{ booking.client.firstName.charAt(0) }}{{ booking.client.lastName.charAt(0) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900">
                      {{ booking.client.firstName }} {{ booking.client.lastName }}
                    </p>
                    <p class="text-sm text-gray-600 truncate">{{ booking.client.email }}</p>
                    <p class="text-sm text-gray-600">{{ booking.client.phoneNum }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-2 pt-2 border-t border-gray-200">
                  <svg class="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p class="text-sm text-gray-600">{{ booking.client.location }}</p>
                </div>
              </div>
            </div>

            <!-- Service Details -->
            <div>
              <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Service Details
              </h3>
              <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                <div
                  v-for="service in booking.serviceType"
                  :key="service.id"
                  class="flex items-center justify-between"
                >
                  <span class="font-medium text-gray-900">{{ service.serviceType }}</span>
                  <span v-if="service.price" class="text-sm text-gray-600">${{ service.price }}</span>
                </div>
                <p v-if="booking.serviceType[0]?.description" class="text-sm text-gray-600 pt-2 border-t border-gray-200">
                  {{ booking.serviceType[0].description }}
                </p>
              </div>
            </div>

            <!-- Location -->
            <div>
              <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Booking Location
              </h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-900">{{ booking.location }}</p>
              </div>
            </div>

            <!-- Service Provider Info -->
            <div>
              <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Service Provider
              </h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="font-semibold text-gray-900">{{ booking.serviceProvider.businessName }}</p>
                <p class="text-sm text-gray-600 mt-1">{{ booking.serviceProvider.businessLocation }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <span
                    v-if="booking.serviceProvider.businessIsVerified"
                    class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Verified
                  </span>
                  <span class="text-xs text-gray-500 capitalize">
                    {{ booking.serviceProvider.businessLocationType }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Timestamps -->
            <div class="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div>
                <p class="font-medium mb-1">Created</p>
                <p>{{ new Date(booking.createdAt).toLocaleString() }}</p>
              </div>
              <div>
                <p class="font-medium mb-1">Last Updated</p>
                <p>{{ new Date(booking.updatedAt).toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-6 border-t border-gray-100 bg-gray-50">
            <div v-if="isPending" class="space-y-3">
              <!-- Status Update Buttons -->
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  :disabled="updateLoading || deleteLoading"
                  class="px-4 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  @click="emit('updateStatus', 'CONFIRMED')"
                >
                  <svg v-if="updateLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm
                </button>
                
                <button
                  type="button"
                  :disabled="updateLoading || deleteLoading"
                  class="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  @click="emit('updateStatus', 'REJECTED')"
                >
                  <svg v-if="updateLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject
                </button>
              </div>

              <!-- Delete Button -->
              <button
                type="button"
                :disabled="updateLoading || deleteLoading"
                class="w-full px-4 py-2.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                @click="emit('delete')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Booking
              </button>
            </div>

            <!-- Close button for non-pending bookings -->
            <div v-else class="flex justify-end">
              <button
                type="button"
                class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                @click="handleClose"
              >
                Close
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
</style>