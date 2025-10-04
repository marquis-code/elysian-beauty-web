<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNuxtApp, useRuntimeConfig } from '#app'

interface ServiceCategory {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

interface ServiceProvider {
  id: string
  businessName: string
  businessIsVerified: boolean
  identityIsVerified: boolean
  identityNumber: string | null
  otherServiceType: string | null
  businessLocationType: string
  businessLocation: string
  userId: string
  serviceRole: string
  accountId: string
  createdAt: string
  updatedAt: string
}

interface Service {
  id: string
  description: string
  price: number
  duration: number
  serviceType: string
  serviceProviderId: string
  ServiceCategory: ServiceCategory[]
  ServiceProvider: ServiceProvider
}

interface Props {
  services: Service[]
  serviceProviderId: string
}

const props = defineProps<Props>()

const serviceTypes = ref<Service[]>([])
const loading = ref(false)

// Step management
const currentStep = ref<'services' | 'time' | 'payment'>('services')
const selectedServices = ref<Service[]>([])
const selectedDate = ref<Date | null>(null)
const selectedTime = ref<string>('')
const location = ref('')
const showLocationModal = ref(false)
const showMiniCalendar = ref(false)
const paymentLoading = ref(false)

// Service categories
const activeCategory = ref('Featured')

// Group services by category
const groupedServices = computed(() => {
  const categories = ['Featured']
  const grouped: Record<string, Service[]> = { Featured: [] }
  
  const servicesToGroup = serviceTypes.value.length > 0 ? serviceTypes.value : props.services
  
  servicesToGroup.forEach(service => {
    grouped.Featured.push(service)
    
    const category = service.serviceType
    if (!categories.includes(category)) {
      categories.push(category)
      grouped[category] = []
    }
    grouped[category].push(service)
  })
  
  return { categories, grouped }
})

// Calculate totals
const totalPrice = computed(() => 
  selectedServices.value.reduce((sum, service) => sum + service.price, 0)
)

const totalDuration = computed(() => 
  selectedServices.value.reduce((sum, service) => sum + service.duration, 0)
)

// Check if service is selected
const isServiceSelected = (serviceId: string) => 
  selectedServices.value.some(s => s.id === serviceId)

// Toggle service selection
const toggleService = (service: Service) => {
  const index = selectedServices.value.findIndex(s => s.id === service.id)
  if (index > -1) {
    selectedServices.value.splice(index, 1)
  } else {
    selectedServices.value.push(service)
  }
}

// Remove service
const removeService = (serviceId: string) => {
  selectedServices.value = selectedServices.value.filter(s => s.id !== serviceId)
}

// Calendar functionality
const currentMonth = ref(new Date())
const daysInMonth = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysCount = lastDay.getDate()
  
  const days = []
  for (let i = 1; i <= daysCount; i++) {
    days.push(new Date(year, month, i))
  }
  
  return { days, firstDay: firstDay.getDay() }
})

const monthYear = computed(() => {
  return currentMonth.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const horizontalDates = computed(() => {
  const baseDate = selectedDate.value || new Date()
  const dates = []
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate)
    date.setDate(baseDate.getDate() + i)
    dates.push(date)
  }
  
  return dates
})

// Time slots (every 10 minutes from 04:00 to 23:50)
const timeSlots = computed(() => {
  const slots = []
  for (let hour = 4; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      const h = hour.toString().padStart(2, '0')
      const m = minute.toString().padStart(2, '0')
      slots.push(`${h}:${m}`)
    }
  }
  return slots
})

// Navigation
const goToNextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1)
}

const goToPreviousMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1)
}

const selectDate = (date: Date) => {
  selectedDate.value = date
  showMiniCalendar.value = false
}

const selectTime = (time: string) => {
  selectedTime.value = time
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isSelected = (date: Date) => {
  return selectedDate.value && date.toDateString() === selectedDate.value.toDateString()
}

const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return ''
  return selectedDate.value.toLocaleDateString('en-US', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  })
})

const formattedTimeRange = computed(() => {
  if (!selectedTime.value || totalDuration.value === 0) return ''
  
  const [hours, minutes] = selectedTime.value.split(':').map(Number)
  const startTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  
  // Calculate end time
  const totalMinutes = totalDuration.value * 60
  const endHours = Math.floor((hours * 60 + minutes + totalMinutes) / 60)
  const endMinutes = (hours * 60 + minutes + totalMinutes) % 60
  const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`
  
  const durationText = totalDuration.value >= 1 
    ? `${totalDuration.value} ${totalDuration.value > 1 ? 'hrs' : 'hr'}` 
    : `${(totalDuration.value * 60).toFixed(0)} mins`
  
  return `${startTime}-${endTime} (${durationText} duration)`
})

const getDayName = (date: Date) => {
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

// Step navigation
const canProceedFromServices = computed(() => selectedServices.value.length > 0)
const canProceedFromTime = computed(() => selectedDate.value && selectedTime.value && location.value.trim())

const goToTimeSelection = () => {
  if (canProceedFromServices.value) {
    currentStep.value = 'time'
  }
}

const goBackToServices = () => {
  currentStep.value = 'services'
}

const proceedToPayment = async () => {
  if (!canProceedFromTime.value) return
  
  paymentLoading.value = true
  
  try {
    // Access Nuxt app and config at call time instead of destructuring at top
    const nuxtApp = useNuxtApp()
    const config = useRuntimeConfig()
    
    nuxtApp.$paystack({
      key: config.public.paystackKey,
      email: "user@example.com", // Replace with actual user email
      amount: totalPrice.value * 100,
      ref: "" + Math.floor(Math.random() * 100000000000000 + 1),
      currency: "NGN",
      callback: async (response: any) => {
        console.log('Payment successful:', response)
        
        try {
          const bookingData = {
            services: selectedServices.value.map(s => s.id),
            date: formatDateForAPI(),
            location: location.value,
            serviceProviderId: props.serviceProviderId,
            paymentReference: response.reference,
            amount: totalPrice.value
          }
          
          console.log('Booking data:', bookingData)
          alert('Booking created successfully!')
          
          // Reset form
          selectedServices.value = []
          selectedDate.value = null
          selectedTime.value = ''
          location.value = ''
          currentStep.value = 'services'
        } catch (error) {
          console.error('Booking creation failed:', error)
          alert('Payment successful but booking creation failed. Please contact support.')
        }
      },
      onClose: () => {
        paymentLoading.value = false
        alert('Payment window closed')
      },
    })
  } catch (error) {
    console.error('Payment initialization failed:', error)
    alert('Failed to initialize payment. Please try again.')
    paymentLoading.value = false
  }
}

const formatDateForAPI = () => {
  if (!selectedDate.value || !selectedTime.value) return ''
  
  const [hours, minutes] = selectedTime.value.split(':')
  const date = new Date(selectedDate.value)
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0)
  
  return date.toISOString()
}

// Get first service provider
const serviceProvider = computed(() => {
  const services = serviceTypes.value.length > 0 ? serviceTypes.value : props.services
  return services[0]?.ServiceProvider || null
})

onMounted(() => {
  serviceTypes.value = props.services
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="px-5 py-4 border-b border-gray-200">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <button 
          v-if="currentStep !== 'services'"
          @click="currentStep === 'time' ? goBackToServices() : currentStep = 'time'"
          class="hover:text-gray-900"
        >
          Services
        </button>
        <span v-else class="text-gray-900 font-medium">Services</span>
        
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        
        <span :class="currentStep === 'time' ? 'text-gray-900 font-medium' : 'text-gray-400'">
          Time
        </span>
        
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        
        <span class="text-gray-400">Confirm</span>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
      <div class="flex-1 overflow-y-auto">
        <div v-if="currentStep === 'services'" class="px-5 py-6">
          <h1 class="text-xl font-bold text-gray-900 mb-6">Services</h1>
        
          <div class="flex overflow-x-auto pb-2 mb-6 hide-scrollbar border-b border-gray-200">
            <button
              v-for="category in groupedServices.categories"
              :key="category"
              @click="activeCategory = category"
              class="flex-shrink-0 px-4 py-2 text-sm font-medium transition-all whitespace-nowrap"
              :class="activeCategory === category 
                ? 'text-gray-900 border-b-2 border-gray-900' 
                : 'text-gray-500 hover:text-gray-700'"
            >
              {{ category }}
            </button>
          </div>

          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ activeCategory }}</h2>
            
            <div
              v-for="service in groupedServices.grouped[activeCategory]"
              :key="service.id"
              class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all cursor-pointer"
              :class="isServiceSelected(service.id) ? 'bg-blue-50 border-blue-300' : 'bg-white'"
              @click="toggleService(service)"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 mb-1">
                    {{ service?.serviceType }}
                  </h3>
                  <p class="text-sm text-gray-600 mb-2">
                    <span v-if="service.duration >= 1">{{ service?.duration }} {{ service.duration > 1 ? 'hrs' : 'hr' }}</span>
                    <span v-else>{{ (service.duration * 60).toFixed(0) }} mins</span>
                  </p>
                  <p class="text-sm text-gray-500 line-clamp-2">
                    {{ service?.description }}
                  </p>
                  <p class="text-lg font-bold text-gray-900 mt-3">
                    from ₦{{ service?.price?.toLocaleString() }}
                  </p>
                </div>
                
                <button
                  class="flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all"
                  :class="isServiceSelected(service.id) 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300 hover:border-gray-400'"
                >
                  <svg v-if="isServiceSelected(service.id)" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                  <span v-else class="text-2xl text-gray-400 leading-none">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 'time'" class="px-5 py-6">
        <section class="relative">
              <div class="flex items-center justify-between mb-6">
            <h1 class="text-lg font-semibold text-gray-900">Select time</h1>
            <button
              @click="showMiniCalendar = !showMiniCalendar"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <Transition name="calendar-popup">
            <div
              v-if="showMiniCalendar"
              class="absolute right-0 top-10 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-80"
            >
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-base font-semibold text-gray-900">{{ monthYear }}</h2>
                <div class="flex items-center gap-1">
                  <button 
                    @click="goToPreviousMonth"
                    class="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    @click="goToNextMonth"
                    class="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="grid grid-cols-7 gap-1 mb-2">
                <div v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="day" class="text-center text-xs font-medium text-gray-500 py-1">
                  {{ day }}
                </div>
              </div>
              
              <div class="grid grid-cols-7 gap-1">
                <div v-for="_ in daysInMonth.firstDay" :key="`empty-${_}`"></div>
                <button
                  v-for="date in daysInMonth.days"
                  :key="date.toISOString()"
                  @click="selectDate(date)"
                  class="aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all"
                  :class="isSelected(date) 
                    ? 'bg-blue-600 text-white' 
                    : isToday(date)
                    ? 'bg-gray-900 text-white'
                    : 'hover:bg-gray-100 text-gray-900'"
                >
                  {{ date.getDate() }}
                </button>
              </div>
            </div>
          </Transition>
        </section>

          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">{{ monthYear }}</h2>
              <div class="flex items-center gap-2">
                <button 
                  @click="goToPreviousMonth"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  @click="goToNextMonth"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex justify-between gap-3 overflow-x-auto pb-2 hide-scrollbar">
              <button
                v-for="date in horizontalDates"
                :key="date.toISOString()"
                @click="selectDate(date)"
                class="flex-shrink-0 flex text-xs flex-col items-center justify-center w-16 h-20 rounded-full border-2 transition-all"
                :class="isSelected(date)
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-200 hover:border-gray-300 text-gray-900'"
              >
                <span class="text-2xl font-bold">{{ date.getDate() }}</span>
                <span class="text-xs mt-1">{{ getDayName(date) }}</span>
              </button>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Service Location
            </label>
            <textarea
              v-model="location"
              rows="3"
              placeholder="Enter your full address where the service will be performed..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            ></textarea>
          </div>


          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Available Times</h3>
            <button
              v-for="time in timeSlots"
              :key="time"
              @click="selectTime(time)"
              class="w-full px-4 py-3 text-left border-2 rounded-lg hover:border-gray-300 transition-all text-sm font-medium"
              :class="selectedTime === time ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-900'"
            >
              {{ time }}
            </button>
          </div>
        </div>
      </div>

      <div class="lg:w-96 border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-50 p-6">
        <div v-if="serviceProvider" class="mb-6">
          <div class="flex items-start gap-3 mb-4">
            <img 
              src="/placeholder.svg?height=64&width=64" 
              alt="Provider"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 mb-1">
                {{ serviceProvider.businessName }}
              </h3>
              <div class="flex items-center gap-1 text-sm mb-1">
                <span class="text-yellow-500">★</span>
                <span class="font-semibold">4.9</span>
                <span class="text-gray-500">(46)</span>
              </div>
              <p class="text-sm text-gray-600 line-clamp-2">
                {{ serviceProvider.businessLocation }}
              </p>
            </div>
          </div>
        </div>


        <div v-if="selectedDate && selectedTime" class="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">{{ formattedSelectedDate }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3 mt-3">
            <svg class="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">{{ formattedTimeRange }}</p>
            </div>
          </div>
        </div>


        <div v-if="location.trim()" class="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-600">{{ location }}</p>
            </div>
          </div>
        </div>


        <div v-if="selectedServices.length > 0" class="mb-6">
          <h3 class="font-semibold text-gray-900 mb-3">Selected Services</h3>
          <div class="space-y-2">
            <div
              v-for="service in selectedServices"
              :key="service.id"
              class="bg-white p-3 rounded-lg border border-gray-200"
            >
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-900 text-sm mb-1">
                    {{ service.serviceType }}
                  </p>
                  <p class="text-xs text-gray-500">
                    <span v-if="service.duration >= 1">{{ service.duration }} {{ service.duration > 1 ? 'hrs' : 'hr' }}</span>
                    <span v-else>{{ (service.duration * 60).toFixed(0) }} mins</span>
                    • Pick me up with any professional
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold text-gray-900 whitespace-nowrap">
                    ₦{{ service.price.toLocaleString() }}
                  </span>
                  <button
                    @click="removeService(service.id)"
                    class="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-500 text-sm">No services selected</p>
        </div>


        <div class="border-t border-gray-300 pt-4 mb-6">
          <div class="flex items-center justify-between text-lg font-semibold">
            <span class="text-gray-900">Total</span>
            <span class="text-gray-900">
              {{ selectedServices.length > 0 ? `₦${totalPrice.toLocaleString()}` : 'free' }}
            </span>
          </div>
        </div>


        <button
          v-if="currentStep === 'services'"
          @click="goToTimeSelection"
          :disabled="!canProceedFromServices"
          class="w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="canProceedFromServices ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-gray-400 text-white'"
        >
          Continue
        </button>

        <button
          v-if="currentStep === 'time'"
          @click="proceedToPayment"
          :disabled="!canProceedFromTime || paymentLoading"
          class="w-full py-3 rounded-full font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          :class="canProceedFromTime && !paymentLoading ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-gray-400 text-white'"
        >
          <svg
            v-if="paymentLoading"
            class="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{{ paymentLoading ? 'Processing...' : 'Continue' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Calendar popup animation */
.calendar-popup-enter-active,
.calendar-popup-leave-active {
  transition: all 0.2s ease;
}

.calendar-popup-enter-from,
.calendar-popup-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
