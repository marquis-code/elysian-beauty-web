<template>
  <div class="min-h-screen">
    <div class="container mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-xl font-semibold text-gray-900">Appointment Management</h1>
        <p class="text-gray-600 mt-2">Manage your appointments efficiently</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Appointments Table -->
      <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Provider
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="appointment in appointments" :key="appointment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span class="text-sm font-medium text-white">
                          {{ appointment.client.firstName.charAt(0) }}{{ appointment.client.lastName.charAt(0) }}
                        </span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ appointment.client.firstName }} {{ appointment.client.lastName }}
                      </div>
                      <div class="text-sm text-gray-500">{{ appointment.client.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ appointment.serviceProvider.businessName }}</div>
                  <div class="text-sm text-gray-500">{{ appointment.serviceProvider.otherServiceType }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ appointment.serviceType }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{{ formatDate(appointment.date) }}</div>
                  <div class="text-gray-500">{{ formatTime(appointment.date) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ appointment.duration }}h
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                  {{ appointment.location }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    @click="viewAppointment(appointment)"
                    class="text-blue-600 hover:text-blue-900 transition-colors"
                    title="View Details"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    @click="editAppointment(appointment)"
                    class="text-green-600 hover:text-green-900 transition-colors"
                    title="Edit"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="confirmDelete(appointment)"
                    class="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="appointments.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new appointment.</p>
        </div>
      </div>
    </div>

    <!-- View Appointment Modal -->
    <Teleport to="body">
      <div
        v-if="showViewModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeViewModal"
      >
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
            @click.stop
          >
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
                  Appointment Details
                </h3>
                <div v-if="selectedAppointment" class="space-y-4">
                  <!-- Client Information -->
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Client Information</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span class="text-gray-600">Name:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.client.firstName }} {{ selectedAppointment.client.lastName }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Email:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.client.email }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Phone:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.client.phoneNum }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Location:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.client.location }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Service Provider Information -->
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Service Provider</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span class="text-gray-600">Business:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.serviceProvider.businessName }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Service Type:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.serviceProvider.otherServiceType }}</span>
                      </div>
                      <div class="col-span-2">
                        <span class="text-gray-600">Business Location:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.serviceProvider.businessLocation }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Appointment Details -->
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Appointment Details</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span class="text-gray-600">Service:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.serviceType }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Duration:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.duration }}h</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Date:</span>
                        <span class="ml-2 font-medium">{{ formatDate(selectedAppointment.date) }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Time:</span>
                        <span class="ml-2 font-medium">{{ formatTime(selectedAppointment.date) }}</span>
                      </div>
                      <div class="col-span-2">
                        <span class="text-gray-600">Location:</span>
                        <span class="ml-2 font-medium">{{ selectedAppointment.location }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="closeViewModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Edit Appointment Modal -->
    <Teleport to="body">
      <div
        v-if="showEditModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeEditModal"
      >
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            @click.stop
          >
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
                  Edit Appointment
                </h3>
                <form @submit.prevent="handleUpdateAppointment">
                  <div class="mb-4">
                    <label for="duration" class="block text-sm font-medium text-gray-700">
                      Duration (hours)
                    </label>
                    <input
                      id="duration"
                      v-model.number="editForm.duration"
                      type="number"
                      step="0.1"
                      min="0.1"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                :disabled="updateLoading"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                @click="handleUpdateAppointment"
              >
                <span v-if="updateLoading" class="mr-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ updateLoading ? 'Updating...' : 'Update' }}
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                @click="closeEditModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeDeleteModal"
      >
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            @click.stop
          >
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Delete Appointment
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete this appointment? This action cannot be undone.
                  </p>
                  <div v-if="appointmentToDelete" class="mt-3 p-3 bg-gray-50 rounded-md">
                    <p class="text-sm font-medium text-gray-900">
                      {{ appointmentToDelete.client.firstName }} {{ appointmentToDelete.client.lastName }}
                    </p>
                    <p class="text-sm text-gray-600">
                      {{ appointmentToDelete.serviceType }} - {{ formatDate(appointmentToDelete.date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                :disabled="deleteLoading"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                @click="handleDeleteAppointment"
              >
                <span v-if="deleteLoading" class="mr-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ deleteLoading ? 'Deleting...' : 'Delete' }}
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                @click="closeDeleteModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useFetchAppointments } from "@/composables/modules/appointment/useFetchAppointments"
import { useFetchAppointment } from "@/composables/modules/appointment/useFetchAppointment"
import { useUpdateAppointment } from "@/composables/modules/appointment/useUpdateAppointment"
import { useDeleteAppointment } from "@/composables/modules/appointment/useDeleteAppointment"

// Define types based on the data structure
interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNum: string
  location: string
  password: string
  role: string
  provider: string
  emailIsVerified: boolean
  image: string
  createdAt: string
  updatedAt: string
  isDeleted: boolean
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

interface Appointment {
  id: string
  clientId: string
  serviceProviderId: string
  serviceType: string
  location: string
  date: string
  duration: number
  createdAt: string
  updatedAt: string
  serviceProvider: ServiceProvider
  client: Client
}

// Composables
const { fetchAppointments, appointments, loading } = useFetchAppointments()
const { appointment, loading: fetchLoading } = useFetchAppointment()
const { updateAppointment, loading: updateLoading } = useUpdateAppointment()
const { deleteAppointment, loading: deleteLoading } = useDeleteAppointment()

// Modal states
const showViewModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

// Selected appointment data
const selectedAppointment = ref<Appointment | null>(null)
const appointmentToDelete = ref<Appointment | null>(null)

// Edit form
const editForm = reactive({
  duration: 0
})

// Utility functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Modal handlers
const viewAppointment = (appointment: Appointment) => {
  selectedAppointment.value = appointment
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedAppointment.value = null
}

const editAppointment = (appointment: Appointment) => {
  selectedAppointment.value = appointment
  editForm.duration = appointment.duration
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedAppointment.value = null
  editForm.duration = 0
}

const confirmDelete = (appointment: Appointment) => {
  appointmentToDelete.value = appointment
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  appointmentToDelete.value = null
}

// CRUD operations
const handleUpdateAppointment = async () => {
  if (!selectedAppointment.value) return

  try {
    await updateAppointment(selectedAppointment.value.id, {
      duration: editForm.duration
    })
    
    // Refresh appointments list
    await fetchAppointments()
    
    // Close modal
    closeEditModal()
    
    // Show success message (you can implement a toast notification here)
    console.log('Appointment updated successfully')
  } catch (error) {
    console.error('Error updating appointment:', error)
    // Handle error (you can implement error notification here)
  }
}

const handleDeleteAppointment = async () => {
  if (!appointmentToDelete.value) return

  try {
    await deleteAppointment(appointmentToDelete.value.id)
    
    // Refresh appointments list
    await fetchAppointments()
    
    // Close modal
    closeDeleteModal()
    
    // Show success message (you can implement a toast notification here)
    console.log('Appointment deleted successfully')
  } catch (error) {
    console.error('Error deleting appointment:', error)
    // Handle error (you can implement error notification here)
  }
}

// Initialize
onMounted(() => {
  fetchAppointments()
})

definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped>
/* Custom scrollbar for better UX */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>