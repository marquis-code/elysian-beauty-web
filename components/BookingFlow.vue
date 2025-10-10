<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useNuxtApp, useRuntimeConfig } from '#app'
import { useCreateBooking } from "@/composables/modules/bookings/useCreateBooking"
import { useInitializeTransaction } from "@/composables/modules/transactions/useInitializeTransaction"
import { useVerifyTransaction } from "@/composables/modules/transactions/useVerifyTransaction"

const { initializeTransaction, loading: initializing } = useInitializeTransaction()
const { verifyTransaction, loading: verifying } = useVerifyTransaction()
const { createBooking, loading: creatingBooking } = useCreateBooking()

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
  serviceType: Service
  serviceProviderId: string
}

const props = defineProps<Props>()

const serviceTypes = ref<Service[]>([])
const loading = ref(false)

// Intersection Observer for category detection
const categoryRefs = ref<Record<string, HTMLElement | null>>({})
const observerInstance = ref<IntersectionObserver | null>(null)

// Step management
const currentStep = ref<'services' | 'time' | 'payment'>('services')
const selectedServices = ref<Service[]>([])
const selectedDate = ref<Date | null>(null)
const selectedTime = ref<string>('')
const location = ref('')
const showLocationModal = ref(false)
const showMiniCalendar = ref(false)
const paymentLoading = ref(false)

// Auth modal state
const showAuthModal = ref(false)
const authMode = ref<'initial' | 'email'>('initial')
const loginEmail = ref('')
const loginPassword = ref('')
const loginLoading = ref(false)
const userEmail = ref('')

// Service categories
const activeCategory = ref('Featured')
const userScrolling = ref(false)

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

// Auth functions
const checkAuthAndProceed = () => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    showAuthModal.value = true
    return false
  }
  
  // Get user email from localStorage or token
  const storedEmail = localStorage.getItem('userEmail')
  if (storedEmail) {
    userEmail.value = storedEmail
  }
  
  return true
}

const selectAuthMode = (mode: 'email' | 'google') => {
  if (mode === 'email') {
    authMode.value = 'email'
  } else {
    handleGoogleLogin()
  }
}

const handleGoogleLogin = async () => {
  try {
    loginLoading.value = true
    
    // TODO: Implement Google OAuth login
    // Example implementation:
    // const response = await $fetch('/api/auth/google')
    // if (response.success) {
    //   localStorage.setItem('token', response.data.token)
    //   localStorage.setItem('userEmail', response.data.email)
    //   userEmail.value = response.data.email
    //   showAuthModal.value = false
    //   proceedToPayment()
    // }
    
    console.log('Google login not implemented yet')
    alert('Google login coming soon!')
  } catch (error) {
    console.error('Google login failed:', error)
    alert('Google login failed. Please try again.')
  } finally {
    loginLoading.value = false
  }
}

const handleEmailLogin = async () => {
  if (!loginEmail.value || !loginPassword.value) {
    alert('Please enter both email and password')
    return
  }
  
  try {
    loginLoading.value = true
    
    // TODO: Replace with your actual login API call
    // Example:
    // const response = await $fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: {
    //     email: loginEmail.value,
    //     password: loginPassword.value
    //   }
    // })
    
    // Simulate API call for demonstration
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // After successful login, store token and email:
    // localStorage.setItem('token', response.data.token)
    // localStorage.setItem('userEmail', loginEmail.value)
    // userEmail.value = loginEmail.value
    
    // For demo purposes - remove this in production:
    localStorage.setItem('token', 'demo-token-12345')
    localStorage.setItem('userEmail', loginEmail.value)
    userEmail.value = loginEmail.value
    
    // Close modal and reset
    showAuthModal.value = false
    authMode.value = 'initial'
    
    alert('Login successful!')
    
    // Clear form
    const email = loginEmail.value
    loginEmail.value = ''
    loginPassword.value = ''
    
    // Proceed to payment
    await nextTick()
    proceedToPayment()
    
  } catch (error) {
    console.error('Email login failed:', error)
    alert('Login failed. Please check your credentials and try again.')
  } finally {
    loginLoading.value = false
  }
}

const closeAuthModal = () => {
  showAuthModal.value = false
  authMode.value = 'initial'
  loginEmail.value = ''
  loginPassword.value = ''
}

const proceedToPayment = async () => {
  if (!canProceedFromTime.value) return
  
  // Check authentication first
  if (!checkAuthAndProceed()) {
    return
  }
  
  paymentLoading.value = true
  
  try {
    const paymentPayload = {
      email: userEmail.value || 'abahmarquis@gmail.com',
      amount: totalPrice.value,
      subaccount: "ACCT_f0qa1mpt73miwf6"
    } as any

    const response = await initializeTransaction(paymentPayload)
    console.log(response, 'responsehere')
    
    if (response.success && response.data) {
      const { authorization_url, reference } = response.data.data
      
      // Create a payment popup window
      const paymentWindow = window.open(
        authorization_url,
        'PaystackPayment',
        'width=600,height=700,left=200,top=100'
      )

      if (!paymentWindow) {
        throw new Error('Payment window blocked. Please allow popups for this site.')
      }

      // Poll for payment verification
      const verificationInterval = setInterval(async () => {
        // Check if payment window is closed
        if (paymentWindow.closed) {
          clearInterval(verificationInterval)
          paymentLoading.value = false
          
          // Verify the transaction
          try {
            const verificationResult = await verifyTransaction(reference)
            
            if (verificationResult.success && verificationResult.data?.status === 'success') {
              // Payment successful, create booking
              const bookingData = {
                services: selectedServices.value.map(s => s.id),
                date: formatDateForAPI(),
                location: location.value,
                serviceProviderId: props.serviceProviderId,
                paymentReference: reference,
                amount: Math.round(totalPrice.value * 100)
              }
              
              await createBooking(bookingData)
              
              // Reset form
              selectedServices.value = []
              selectedDate.value = null
              selectedTime.value = ''
              location.value = ''
              currentStep.value = 'services'
              
              alert('Booking created successfully!')
            } else {
              alert('Payment was not completed. Please try again.')
            }
          } catch (verifyError) {
            console.error('Transaction verification failed:', verifyError)
            alert('Could not verify payment. Please contact support if you were charged.')
          }
        }
      }, 1000)

      // Timeout after 10 minutes
      setTimeout(() => {
        if (!paymentWindow.closed) {
          paymentWindow.close()
        }
        clearInterval(verificationInterval)
        paymentLoading.value = false
      }, 600000)
    } else {
      throw new Error('Failed to initialize payment. Invalid response.')
    }
  } catch (error) {
    console.error('Payment initialization failed:', error)
    alert(error instanceof Error ? error.message : 'Failed to initialize payment. Please try again.')
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

// Scroll to category
const scrollToCategory = (category: string) => {
  userScrolling.value = true
  activeCategory.value = category
  
  const element = categoryRefs.value[category]
  if (element) {
    const offset = 120
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  setTimeout(() => {
    userScrolling.value = false
  }, 1000)
}

// Setup Intersection Observer
const setupObserver = () => {
  observerInstance.value = new IntersectionObserver(
    (entries) => {
      if (userScrolling.value) return

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const category = entry.target.getAttribute('data-category')
          if (category) {
            activeCategory.value = category
          }
        }
      })
    },
    {
      threshold: [0, 0.3, 0.5, 0.7, 1],
      rootMargin: '-120px 0px -40% 0px'
    }
  )

  Object.values(categoryRefs.value).forEach((ref) => {
    if (ref) observerInstance.value?.observe(ref)
  })
}

onMounted(() => {
  serviceTypes.value = props.services
  
  // Check if user is logged in and get email
  const token = localStorage.getItem('token')
  const storedEmail = localStorage.getItem('userEmail')
  if (token && storedEmail) {
    userEmail.value = storedEmail
  }
  
  nextTick(() => {
    setupObserver()
  })
})

onBeforeUnmount(() => {
  observerInstance.value?.disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- {{serviceType }} -->
    <!-- Breadcrumb Navigation -->
    <div class="sticky top-0 z-40 bg-white border-b-[0.5px] border-gray-25 shadow-sm">
      <div class="px-4 py-4">
        <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <button 
            v-if="currentStep !== 'services'"
            @click="currentStep === 'time' ? goBackToServices() : currentStep = 'time'"
            class="hover:text-gray-900 transition-colors"
          >
            Services
          </button>
          <span v-else class="text-gray-500 font-medium">Services</span>
          
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          
          <span :class="currentStep === 'time' ? 'text-gray-900 font-medium' : 'text-gray-400'">
            Time
          </span>
          
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          
          <span class="text-gray-400">Confirm</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
      <!-- Main Content Area -->
      <div  class="flex-1 overflow-y-auto px-6 p pb-32 lg:pb-6">
        <!-- Services Step -->
        <div v-if="currentStep === 'services' && services?.length" class="py-4 sm:py-6">
          <h1 class="text-xl font-semibold text-gray-900 mb-4">Services</h1>
        
          <!-- Category Tabs - Sticky -->
          <div class="sticky top-[52px] z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-3 mb-4 border-b-[0.5px] border-gray-100">
            <div class="flex overflow-x-auto pb-2 hide-scrollbar gap-2">
              <button
                v-for="category in groupedServices.categories"
                :key="category"
                @click="scrollToCategory(category)"
                class="flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all whitespace-nowrap rounded-full"
                :class="activeCategory === category 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border-[0.5px] border-gray-25'"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Service Categories -->
          <div class="space-y-8 ">
            <div
              v-for="category in groupedServices.categories"
              :key="category"
              :ref="el => categoryRefs[category] = el as HTMLElement"
              :data-category="category"
              class="scroll-mt-32"
            >
              <h2 class="text-sm  font-semibold text-gray-900 mb-3 sticky top-[120px] py-2 z-20">
                {{ category }}
              </h2>
              
              <div class="space-y-2">
                <div
                  v-for="service in groupedServices.grouped[category]"
                  :key="service.id"
                  class="bg-white border-[0.5px] border-gray-100 rounded-xl p-3 sm:p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                  :class="isServiceSelected(service.id) ? 'ring-2 ring-blue-500 border-blue-500' : ''"
                  @click="toggleService(service)"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between mb-1">
                        <h3 class="font-semibold text-gray-900 text-sm sm:text-base">
                          {{ service?.serviceType }}
                        </h3>
                        <p class="text-base sm:text-lg font-bold text-gray-900 ml-2 whitespace-nowrap">
                          ₦{{ service?.price?.toLocaleString() }}
                        </p>
                      </div>
                      <p class="text-xs sm:text-sm text-gray-500 mb-2">
                        <span v-if="service.duration >= 1">{{ service?.duration }} {{ service.duration > 1 ? 'hrs' : 'hr' }}</span>
                        <span v-else>{{ (service.duration * 60).toFixed(0) }} mins</span>
                      </p>
                      <p class="text-xs sm:text-sm text-gray-600 line-clamp-2">
                        {{ service?.description }}
                      </p>
                    </div>
                    
                    <button
                      class="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[0.5px] flex items-center justify-center transition-all"
                      :class="isServiceSelected(service.id) 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300 hover:border-gray-400'"
                    >
                      <svg v-if="isServiceSelected(service.id)" class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Time Selection Step -->
        <div v-if="currentStep === 'time' && services?.length" class="px-4 sm:px-6 py-4 sm:py-6">
          <div class="relative mb-6">
            <div class="flex items-center justify-between mb-4">
              <h1 class="text-lg font-semibold text-gray-900">Select time</h1>
              <button
                @click="showMiniCalendar = !showMiniCalendar"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            <!-- Mini Calendar Popup -->
            <Transition name="calendar-popup">
              <div
                v-if="showMiniCalendar"
                class="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-2xl border-[0.5px] border-gray-50 p-4 w-full sm:w-80"
              >
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-xs font-semibold text-gray-900">{{ monthYear }}</h2>
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
                      ? 'bg-[#045940] text-white' 
                      : isToday(date)
                      ? 'bg-gray-900 text-white'
                      : 'hover:bg-gray-100 text-gray-900'"
                  >
                    {{ date.getDate() }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Horizontal Date Selector -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-base sm:text-lg font-semibold text-gray-900">{{ monthYear }}</h2>
              <div class="flex items-center gap-1">
                <button 
                  @click="goToPreviousMonth"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  @click="goToNextMonth"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              <button
                v-for="date in horizontalDates"
                :key="date.toISOString()"
                @click="selectDate(date)"
                class="flex-shrink-0 flex flex-col items-center justify-center w-14 sm:w-16 h-16 sm:h-20 rounded-2xl border-[0.5px] transition-all"
                :class="isSelected(date)
                  ? 'bg-[#045940] border-[#045940] text-white shadow-lg scale-105'
                  : 'bg-white border-gray-200 hover:border-gray-300 text-gray-900'"
              >
                <span class="text-xl sm:text-2xl font-bold">{{ date.getDate() }}</span>
                <span class="text-[10px] sm:text-xs mt-0.5">{{ getDayName(date) }}</span>
              </button>
            </div>
          </div>

          <!-- Location Input -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Service Location
            </label>
            <textarea
              v-model="location"
              rows="3"
              placeholder="Enter your full address where the service will be performed..."
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border-[0.5px] border-gray-200 rounded-xl focus:ring-2 focus:ring-[#045940] focus:border-[#045940] resize-none text-sm"
            ></textarea>
          </div>

          <!-- Time Slots -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Available Times</h3>
            <!-- <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2"> -->
               <div class="grid grid-cols-1 gap-2">
              <button
                v-for="time in timeSlots"
                :key="time"
                @click="selectTime(time)"
                class="px-3 py-3 text-start border-[0.5px] rounded-lg hover:border-gray-100 transition-all text-xs sm:text-sm font-medium"
                :class="selectedTime === time ? 'bg-[#045940] text-white' : 'bg-white border-gray-100 text-gray-900'"
              >
                {{ time }}
              </button>
            </div>
          </div>
        </div>

       <div v-else class="text-center flex justify-center pt-20 items-center flex-col py-6">
            <img src="@/assets/img/empty-state.svg" class="" />
            <p class="text-gray-500 text-xs sm:text-sm">
              No services Available
            </p>
          </div>
      </div>


      <!-- Right Sidebar - Sticky on Desktop, Fixed Bottom on Mobile -->
      <div class="flex-1 lg:sticky lg:top-[52px] lg:h-[calc(100vh-52px)] lg:overflow-y-auto bg-white border-t-[0.5px] border-gray-25  fixed bottom-0 left-0 right-0 lg:relative z-30 shadow-2xl lg:shadow-none">
        <div class="p-4 sm:p-6 max-h-[70vh] lg:max-h-full overflow-y-auto">
          <!-- Service Provider Info -->
          <div v-if="serviceType" class="mb-4 sm:mb-6">
            <div class="flex items-start gap-3 mb-3">
              <img 
                src="@/assets/img/about4.png" 
                alt="Provider"
                class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                  {{ serviceType?.ServiceProvider?.businessName ?? 'Nil' }}
                </h3>
                <div class="flex items-center gap-1 text-xs sm:text-sm mb-1">
                  <span class="text-yellow-500">★</span>
                  <span class="font-semibold">4.9</span>
                  <span class="text-gray-500">(46)</span>
                </div>
                <p class="text-xs sm:text-sm text-gray-600 line-clamp-1">
                  {{ serviceType?.ServiceProvider?.businessLocation }}
                </p>
              </div>
            </div>
          </div>

          <!-- Selected Date/Time -->
          <div v-if="selectedDate && selectedTime" class="mb-4 p-3 bg-gray-25 rounded-xl border-[0.5px] border-gray-100">
            <div class="flex items-start gap-2 mb-2">
              <svg class="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-xs sm:text-sm font-medium text-gray-900">{{ formattedSelectedDate }}</p>
            </div>
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-xs sm:text-sm font-medium text-gray-900">{{ formattedTimeRange }}</p>
            </div>
          </div>

          <!-- Selected Location -->
          <div v-if="location.trim()" class="mb-4 p-3 bg-gray-25 rounded-xl border-[0.5px] border-gray-100">
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="text-xs sm:text-sm text-gray-600">{{ location }}</p>
            </div>
          </div>

          <!-- Selected Services -->
          <div v-if="selectedServices.length > 0" class="mb-4">
            <h3 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Selected Services</h3>
            <div class="space-y-2">
              <div
                v-for="service in selectedServices"
                :key="service.id"
                class="bg-gray-25 p-2.5 sm:p-3 rounded-lg border border-gray-25"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 text-xs sm:text-sm mb-0.5">
                      {{ service.serviceType }}
                    </p>
                    <p class="text-[10px] sm:text-xs text-gray-900">
                      <span v-if="service.duration >= 1">{{ service.duration }} {{ service.duration > 1 ? 'hrs' : 'hr' }}</span>
                      <span v-else>{{ (service.duration * 60).toFixed(0) }} mins</span>
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      ₦{{ service.price.toLocaleString() }}
                    </span>
                    <button
                      @click="removeService(service.id)"
                      class="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center flex justify-center items-center flex-col py-6">
            <img src="@/assets/img/empty-state.svg" class="" />
            <p class="text-gray-500 text-xs sm:text-sm">
              No services selected
            </p>
          </div>

          <!-- Total -->
          <div class="border-t-[0.5px] border-gray-25 pt-3 mb-4">
            <div class="flex items-center justify-between text-base sm:text-lg font-semibold">
              <span class="text-gray-900">Total</span>
              <span class="text-gray-900">
                {{ selectedServices.length > 0 ? `₦${totalPrice.toLocaleString()}` : 'free' }}
              </span>
            </div>
          </div>

          <!-- Action Button -->
          <button
            v-if="currentStep === 'services'"
            @click="goToTimeSelection"
            :disabled="!canProceedFromServices"
            class="w-full py-2.5 rounded-xl font-medium text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :class="canProceedFromServices ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg' : 'bg-gray-200 text-white'"
          >
            Continue
          </button>

          <button
            v-if="currentStep === 'time'"
            @click="proceedToPayment"
            :disabled="!canProceedFromTime || paymentLoading"
            class="w-full py-2.5 rounded-xl font-medium text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            :class="canProceedFromTime && !paymentLoading ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-gray-200 text-white'"
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
            <span>{{ paymentLoading ? 'Processing...' : 'Continue to Payment' }}</span>
          </button>
        </div>
      </div>
    </div>


       <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showAuthModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          @click.self="closeAuthModal"
        >
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative">
            <!-- Close Button -->
            <button
              @click="closeAuthModal"
              class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Initial Mode - Choose Login Method -->
            <div v-if="authMode === 'initial'" class="text-center">
              <div class="mb-6">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-[#045940]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
                <p class="text-sm text-gray-600">Please login to continue with your booking</p>
              </div>
              
              <div class="space-y-3">
                <button
                  @click="selectAuthMode('google')"
                  :disabled="loginLoading"
                  class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                  </div>
                  <div class="relative flex justify-center text-xs">
                    <span class="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>
                
                <button
                  @click="selectAuthMode('email')"
                  :disabled="loginLoading"
                  class="w-full px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Continue with Email
                </button>
              </div>
            </div>

            <!-- Email Login Mode -->
            <div v-else-if="authMode === 'email'">
              <button
                @click="authMode = 'initial'"
                class="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Login with Email</h2>
                <p class="text-sm text-gray-600">Enter your credentials to continue</p>
              </div>
              
              <form @submit.prevent="handleEmailLogin" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    v-model="loginEmail"
                    type="email"
                    required
                    placeholder="you@example.com"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    v-model="loginPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div class="flex items-center justify-between text-sm">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="rounded border-gray-300 text-[#045940] focus:ring-blue-500">
                    <span class="text-gray-600">Remember me</span>
                  </label>
                  <a href="#" class="text-[#045940] hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>
                
                <button
                  type="submit"
                  :disabled="loginLoading"
                  class="w-full px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg
                    v-if="loginLoading"
                    class="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {{ loginLoading ? 'Logging in...' : 'Login' }}
                </button>
              </form>
              
              <p class="mt-6 text-center text-sm text-gray-600">
                Don't have an account? 
                <a href="#" class="text-[#045940] hover:text-blue-700 font-medium">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Mobile bottom sheet styling */
@media (max-width: 1023px) {
  .lg\:sticky {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
}
</style>