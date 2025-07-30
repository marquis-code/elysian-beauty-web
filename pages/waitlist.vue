<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
        </div>
      </div>
  
      <!-- Hero Section -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Convenient Self-Care,<br>
            <span class="text-brand animate-gradient-text">Made Available Nationwide</span>
          </h2>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Elysian Beauty links you to confirmed, professional beauty experts and genuine products 
            in a variety of categories, all on one easy to use site.
          </p>
          
          <!-- Fixed Animated CTA Button -->
          <div class="relative inline-block animate-fade-in-up animation-delay-400 z-20">
            <button
              @click="openModal"
              type="button"
              class="bg-brand hover:bg-brand text-white font-bold py-4 px-12 rounded-full text-sm transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl animate-pulse-glow relative overflow-hidden group cursor-pointer select-none"
              style="pointer-events: auto; position: relative; z-index: 100;"
            >
              <span class="relative z-10 flex items-center justify-center space-x-3">
                <span class="animate-bounce-gentle">🎉</span>
                <span>Join the Beauty Revolution</span>
                <span class="animate-spin-slow">✨</span>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shimmer"></div>
            </button>
            <div class="absolute -inset-1 bg-gradient-to-r from-brand to-brand rounded-full blur opacity-30 animate-pulse-ring pointer-events-none"></div>
          </div>
        </div>
  
        <!-- Animated Features Grid -->
        <div class="grid md:grid-cols-2 gap-8 mt-16">
          <div class="bg-white rounded-3xl p-8 shadow-xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 animate-slide-in-left group">
            <div class="text-6xl mb-4 animate-bounce-gentle group-hover:animate-spin-slow transition-all duration-500">💄</div>
            <h3 class="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand transition-colors duration-300">Book Trusted Beauty Experts</h3>
            <p class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              Find and book verified hairstylists, makeup artists, nail technicians, and more. 
              Enjoy stress-free beauty appointments from the comfort of your home.
            </p>
          </div>
          
          <div class="bg-white rounded-3xl p-8 shadow-xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 animate-slide-in-right group">
            <div class="text-6xl mb-4 animate-bounce-gentle group-hover:animate-pulse transition-all duration-500">🏠</div>
            <h3 class="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand transition-colors duration-300">Beauty at Your Doorstep</h3>
            <p class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              Experience convenient beauty services brought to you in the comforts of your own home. 
              Deluxe services and goods, right at your doorstep.
            </p>
          </div>
        </div>
      </main>
  
      <!-- Fixed Ultra Animated Gamified Modal -->
      <Teleport to="body">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm"
          style="z-index: 9999; pointer-events: auto;"
          @click="handleBackdropClick"
        >
          <div
            ref="modalContent"
            class="bg-white rounded-3xl max-w-md w-full max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all duration-700 animate-modal-enter relative"
            style="pointer-events: auto; z-index: 10000;"
            @click.stop
          >
            <!-- Fixed Animated Modal Header -->
            <div class="bg-brand text-white p-6 rounded-t-3xl relative overflow-hidden">
              <!-- Animated Background Pattern -->
              <div class="absolute inset-0 opacity-10 pointer-events-none">
                <div class="animate-float-1 absolute top-2 left-4 text-2xl">✨</div>
                <div class="animate-float-2 absolute top-8 right-8 text-xl">💫</div>
                <div class="animate-float-3 absolute bottom-4 left-8 text-lg">🌟</div>
              </div>
              
              <button
                @click="closeModal"
                type="button"
                class="absolute top-4 right-4 text-white hover:text-gray-200 text-3xl transform transition-all duration-300 hover:rotate-90 hover:scale-125 cursor-pointer select-none"
                style="pointer-events: auto; z-index: 10001;"
              >
                ×
              </button>
              
              <div class="text-center relative z-10">
                <div class="text-5xl mb-3 animate-bounce-gentle">
                  <span v-if="currentStep === 1">🌟</span>
                  <span v-else-if="currentStep === 2">💄</span>
                  <span v-else-if="currentStep === 3">📍</span>
                  <span v-else-if="currentStep === 4">💰</span>
                  <span v-else-if="currentStep === 5">📝</span>
                  <span v-else>🎉</span>
                </div>
                <h3 class="text-2xl font-bold animate-slide-in">
                  <span v-if="currentStep === 1">Welcome to Beauty Quiz!</span>
                  <span v-else-if="currentStep === 2">Beauty Preferences</span>
                  <span v-else-if="currentStep === 3">Location Choice</span>
                  <span v-else-if="currentStep === 4">Budget Range</span>
                  <span v-else-if="currentStep === 5">Join Waitlist</span>
                  <span v-else>Success!</span>
                </h3>
                <p class="text-white opacity-90 animate-fade-in animation-delay-200">
                  <span v-if="currentStep === 1">Discover your perfect beauty journey</span>
                  <span v-else-if="currentStep === 2">What makes you feel beautiful?</span>
                  <span v-else-if="currentStep === 3">Where's your happy place?</span>
                  <span v-else-if="currentStep === 4">Investment in your beauty</span>
                  <span v-else-if="currentStep === 5">Almost there, beauty!</span>
                  <span v-else>Welcome to the family!</span>
                </p>
              </div>
              
              <!-- Fixed Animated Progress Bar -->
              <div class="mt-6 bg-white bg-opacity-20 rounded-full h-3 relative overflow-hidden">
                <div
                  class="bg-white rounded-full h-3 transition-all duration-1000 ease-out relative animate-progress-glow"
                  :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                </div>
              </div>
              <p class="text-center text-sm mt-2 text-white opacity-80 animate-pulse">
                Step {{ currentStep }} of {{ totalSteps }}
              </p>
            </div>
  
            <!-- Fixed Animated Modal Content -->
            <div class="p-6" style="pointer-events: auto;">
              <!-- Step 1: Fixed Animated Welcome -->
              <div v-if="currentStep === 1" class="text-center animate-step-enter">
                <div class="relative mb-6">
                  <div class="text-8xl animate-float-gentle mb-4">🌟</div>
                  <div class="absolute inset-0 animate-ping-slow opacity-30 pointer-events-none">
                    <div class="text-8xl">✨</div>
                  </div>
                </div>
                <h4 class="text-3xl font-bold text-gray-900 mb-4 animate-slide-in">Welcome to Elysian Beauty!</h4>
                <p class="text-gray-600 mb-8 animate-fade-in animation-delay-300">
                  Let's discover your beauty preferences and get you early access to our revolutionary platform!
                </p>
                <button
                  @click="nextStep"
                  type="button"
                  class="bg-brand hover:bg-brand text-white font-bold py-4 px-10 rounded-full transition-all duration-500 w-full transform hover:scale-105 animate-pulse-glow relative overflow-hidden group cursor-pointer select-none"
                  style="pointer-events: auto;"
                >
                  <span class="relative z-10 flex items-center justify-center space-x-2">
                    <span>Let's Start!</span>
                    <span class="animate-bounce-gentle">🚀</span>
                  </span>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shimmer"></div>
                </button>
              </div>
  
              <!-- Step 2: Fixed Animated Beauty Preference -->
              <div v-if="currentStep === 2" class="animate-step-enter">
                <h4 class="text-xl font-bold text-gray-900 mb-6 text-center animate-slide-in">
                  What's your favorite beauty service?
                </h4>
                <div class="space-y-4">
                  <button
                    v-for="(service, index) in beautyServices"
                    :key="service.id"
                    @click="selectService(service)"
                    type="button"
                    class="w-full p-5 border-2 rounded-2xl transition-all duration-500 hover:border-brand hover:bg-gray-50 flex items-center space-x-4 transform hover:scale-105 hover:shadow-lg group animate-slide-in-stagger cursor-pointer select-none"
                    :class="selectedService?.id === service.id ? 'border-brand bg-gray-50 scale-105 shadow-lg' : 'border-gray-200'"
                    :style="{ animationDelay: `${index * 100}ms`, pointerEvents: 'auto' }"
                  >
                    <span class="text-3xl animate-bounce-gentle group-hover:animate-spin-slow transition-all duration-500">{{ service.emoji }}</span>
                    <span class="font-medium text-lg group-hover:text-brand transition-colors duration-300">{{ service.name }}</span>
                    <div v-if="selectedService?.id === service.id" class="ml-auto animate-bounce-gentle">
                      <span class="text-brand text-xl">✓</span>
                    </div>
                  </button>
                </div>
              </div>
  
              <!-- Step 3: Fixed Animated Location Preference -->
              <div v-if="currentStep === 3" class="animate-step-enter">
                <h4 class="text-xl font-bold text-gray-900 mb-6 text-center animate-slide-in">
                  Where do you prefer your beauty treatments?
                </h4>
                <div class="space-y-4">
                  <button
                    v-for="(location, index) in locations"
                    :key="location.id"
                    @click="selectLocation(location)"
                    type="button"
                    class="w-full p-5 border-2 rounded-2xl transition-all duration-500 hover:border-brand hover:bg-gray-50 flex items-center space-x-4 transform hover:scale-105 hover:shadow-lg group animate-slide-in-stagger cursor-pointer select-none"
                    :class="selectedLocation?.id === location.id ? 'border-brand bg-gray-50 scale-105 shadow-lg' : 'border-gray-200'"
                    :style="{ animationDelay: `${index * 100}ms`, pointerEvents: 'auto' }"
                  >
                    <span class="text-3xl animate-bounce-gentle group-hover:animate-pulse transition-all duration-500">{{ location.emoji }}</span>
                    <div class="text-left flex-1">
                      <div class="font-medium text-lg group-hover:text-brand transition-colors duration-300">{{ location.name }}</div>
                      <div class="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">{{ location.description }}</div>
                    </div>
                    <div v-if="selectedLocation?.id === location.id" class="animate-bounce-gentle">
                      <span class="text-brand text-xl">✓</span>
                    </div>
                  </button>
                </div>
              </div>
  
              <!-- Step 4: Fixed Animated Budget Range -->
              <div v-if="currentStep === 4" class="animate-step-enter">
                <h4 class="text-xl font-bold text-gray-900 mb-6 text-center animate-slide-in">
                  What's your typical beauty budget?
                </h4>
                <div class="space-y-4">
                  <button
                    v-for="(budget, index) in budgetRanges"
                    :key="budget.id"
                    @click="selectBudget(budget)"
                    type="button"
                    class="w-full p-5 border-2 rounded-2xl transition-all duration-500 hover:border-brand hover:bg-gray-50 flex items-center space-x-4 transform hover:scale-105 hover:shadow-lg group animate-slide-in-stagger cursor-pointer select-none"
                    :class="selectedBudget?.id === budget.id ? 'border-brand bg-gray-50 scale-105 shadow-lg' : 'border-gray-200'"
                    :style="{ animationDelay: `${index * 100}ms`, pointerEvents: 'auto' }"
                  >
                    <span class="text-3xl animate-bounce-gentle group-hover:animate-spin-slow transition-all duration-500">{{ budget.emoji }}</span>
                    <span class="font-medium text-lg group-hover:text-brand transition-colors duration-300">{{ budget.range }}</span>
                    <div v-if="selectedBudget?.id === budget.id" class="ml-auto animate-bounce-gentle">
                      <span class="text-brand text-xl">✓</span>
                    </div>
                  </button>
                </div>
              </div>
  
              <!-- Step 5: Fixed Animated Waitlist Form -->
              <div v-if="currentStep === 5" class="animate-step-enter">
                <div class="text-center mb-6">
                  <div class="text-5xl mb-3 animate-bounce-gentle">🎊</div>
                  <h4 class="text-2xl font-bold text-gray-900 mb-2 animate-slide-in">You're Almost In!</h4>
                  <p class="text-gray-600 text-sm animate-fade-in animation-delay-200">Join our exclusive waitlist for early access</p>
                </div>
  
                <form @submit.prevent="submitWaitlist" class="space-y-5" style="pointer-events: auto;">
                  <div class="animate-slide-in-stagger" style="animation-delay: 100ms">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      v-model="formData.name"
                      type="text"
                      required
                      class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-300 hover:border-brand"
                      placeholder="Enter your full name"
                      style="pointer-events: auto;"
                    >
                  </div>
  
                  <div class="animate-slide-in-stagger" style="animation-delay: 200ms">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      v-model="formData.email"
                      type="email"
                      required
                      class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-300 hover:border-brand"
                      placeholder="Enter your email"
                      style="pointer-events: auto;"
                    >
                  </div>
  
                  <div class="animate-slide-in-stagger" style="animation-delay: 300ms">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      required
                      class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-300 hover:border-brand"
                      placeholder="Enter your phone number"
                      style="pointer-events: auto;"
                    >
                  </div>
  
                  <div class="animate-slide-in-stagger" style="animation-delay: 400ms">
                    <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      v-model="formData.city"
                      type="text"
                      required
                      class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-300 hover:border-brand"
                      placeholder="Enter your city"
                      style="pointer-events: auto;"
                    >
                  </div>
  
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full bg-brand hover:bg-brand text-sm text-white font-bold py-3 px-6 rounded-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 animate-pulse-glow relative overflow-hidden group animate-slide-in-stagger cursor-pointer select-none"
                    style="animation-delay: 500ms; pointer-events: auto;"
                  >
                    <span v-if="!isSubmitting" class="relative z-10 flex items-center justify-center space-x-2">
                      <span>Join Waitlist & Get WhatsApp Access</span>
                      <span class="animate-bounce-gentle">🎉</span>
                    </span>
                    <span v-else class="relative z-10 flex items-center justify-center space-x-2">
                      <span class="animate-spin">⏳</span>
                      <span>Submitting...</span>
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shimmer"></div>
                  </button>
                </form>
              </div>
  
              <!-- Step 6: Fixed Animated Success -->
              <div v-if="currentStep === 6" class="text-center animate-step-enter">
                <div class="relative mb-6">
                  <div class="text-8xl animate-bounce-celebration mb-4">🎉</div>
                  <div class="absolute inset-0 animate-confetti pointer-events-none">
                    <div class="text-2xl animate-float-1">🎊</div>
                    <div class="text-2xl animate-float-2">✨</div>
                    <div class="text-2xl animate-float-3">🌟</div>
                  </div>
                </div>
                <h4 class="text-3xl font-bold text-gray-900 mb-4 animate-slide-in">Welcome to Elysian Beauty!</h4>
                <p class="text-gray-600 mb-6 animate-fade-in animation-delay-200">
                  You're now on our exclusive waitlist! We're redirecting you to our community WhatsApp group.
                </p>
                <div class="bg-gray-50 border-2 border-brand rounded-2xl p-6 mb-6 animate-slide-in animation-delay-400">
                  <p class="text-sm text-brand font-medium">
                    <strong class="animate-pulse">Your Beauty Profile:</strong><br>
                    <span class="animate-slide-in animation-delay-500">Favorite Service: {{ selectedService?.name }}</span><br>
                    <span class="animate-slide-in animation-delay-600">Preferred Location: {{ selectedLocation?.name }}</span><br>
                    <span class="animate-slide-in animation-delay-700">Budget Range: {{ selectedBudget?.range }}</span>
                  </p>
                </div>
                <div class="animate-pulse text-brand font-medium">
                  Redirecting to WhatsApp in {{ countdown }} seconds...
                </div>
              </div>
  
              <!-- Fixed Animated Navigation Buttons -->
              <div v-if="currentStep > 1 && currentStep < 5" class="flex justify-between mt-8 animate-fade-in" style="pointer-events: auto;">
                <button
                  @click="prevStep"
                  type="button"
                  class="px-8 py-3 border-2 border-brand text-brand rounded-full hover:bg-brand hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 cursor-pointer select-none"
                  style="pointer-events: auto;"
                >
                  <span class="animate-bounce-gentle">←</span>
                  <span>Back</span>
                </button>
                <button
                  @click="nextStep"
                  :disabled="!canProceed"
                  type="button"
                  class="px-8 py-3 bg-brand text-white rounded-full hover:bg-brand transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 flex items-center space-x-2 animate-pulse-glow cursor-pointer select-none"
                  style="pointer-events: auto;"
                >
                  <span>Next</span>
                  <span class="animate-bounce-gentle">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, nextTick } from 'vue'
  
  // Modal state
  const showModal = ref(false)
  const currentStep = ref(1)
  const totalSteps = 6
  const isSubmitting = ref(false)
  const countdown = ref(5)
  const modalContent = ref<HTMLElement | null>(null)
  
  // Form data
  const formData = ref({
    name: '',
    email: '',
    phone: '',
    city: ''
  })
  
  // Quiz selections
  const selectedService = ref<any>(null)
  const selectedLocation = ref<any>(null)
  const selectedBudget = ref<any>(null)
  
  // Quiz options
  const beautyServices = [
    { id: 1, name: 'Hair Styling & Cuts', emoji: '💇‍♀️' },
    { id: 2, name: 'Makeup & Beauty', emoji: '💄' },
    { id: 3, name: 'Nail Care & Art', emoji: '💅' },
    { id: 4, name: 'Skincare Treatments', emoji: '✨' },
    { id: 5, name: 'Spa & Wellness', emoji: '🧘‍♀️' }
  ]
  
  const locations = [
    { 
      id: 1, 
      name: 'At Home', 
      emoji: '🏠',
      description: 'Comfort of your own space'
    },
    { 
      id: 2, 
      name: 'Beauty Salon', 
      emoji: '💺',
      description: 'Professional salon environment'
    },
    { 
      id: 3, 
      name: 'Both Options', 
      emoji: '🔄',
      description: 'Flexible based on service'
    }
  ]
  
  const budgetRanges = [
    { id: 1, range: '₦5,000 - ₦15,000', emoji: '💰' },
    { id: 2, range: '₦15,000 - ₦30,000', emoji: '💎' },
    { id: 3, range: '₦30,000 - ₦50,000', emoji: '👑' },
    { id: 4, range: '₦50,000+', emoji: '✨' }
  ]
  
  // Computed properties
  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 2: return selectedService.value !== null
      case 3: return selectedLocation.value !== null
      case 4: return selectedBudget.value !== null
      default: return true
    }
  })
  
  // Methods
  const openModal = async () => {
    console.log('Opening modal...')
    showModal.value = true
    currentStep.value = 1
    await nextTick()
    // Ensure modal is properly focused
    if (modalContent.value) {
      modalContent.value.focus()
    }
  }
  
  const closeModal = () => {
    console.log('Closing modal...')
    showModal.value = false
    resetForm()
  }
  
  const handleBackdropClick = (event: MouseEvent) => {
    // Only close if clicking the backdrop, not the modal content
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }
  
  const nextStep = () => {
    console.log('Next step clicked, current:', currentStep.value)
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }
  
  const prevStep = () => {
    console.log('Previous step clicked, current:', currentStep.value)
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }
  
  const selectService = (service: any) => {
    console.log('Service selected:', service)
    selectedService.value = service
  }
  
  const selectLocation = (location: any) => {
    console.log('Location selected:', location)
    selectedLocation.value = location
  }
  
  const selectBudget = (budget: any) => {
    console.log('Budget selected:', budget)
    selectedBudget.value = budget
  }
  
  const submitWaitlist = async () => {
    console.log('Submitting waitlist...')
    isSubmitting.value = true
    
    try {
      // Prepare data for API
      const waitlistData = {
        ...formData.value,
        preferences: {
          service: selectedService.value,
          location: selectedLocation.value,
          budget: selectedBudget.value
        },
        timestamp: new Date().toISOString()
      }
  
      console.log('Waitlist data:', waitlistData)
  
      // Simulate API call (replace with your actual API endpoint)
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(waitlistData)
      })
  
      if (response.ok || response.status === 404) { // Allow 404 for demo purposes
        console.log('Waitlist submission successful')
        currentStep.value = 6
        startCountdown()
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      console.error('Error submitting waitlist:', error)
      // For demo purposes, still proceed to success step
      currentStep.value = 6
      startCountdown()
    } finally {
      isSubmitting.value = false
    }
  }
  
  const startCountdown = () => {
    console.log('Starting countdown...')
    const timer = setInterval(() => {
      countdown.value--
      console.log('Countdown:', countdown.value)
      if (countdown.value <= 0) {
        clearInterval(timer)
        redirectToWhatsApp()
      }
    }, 1000)
  }
  
  const redirectToWhatsApp = () => {
    console.log('Redirecting to WhatsApp...')
    const whatsappNumber = '2348029778733' // Replace with your WhatsApp number
    const message = encodeURIComponent(
      `Hi! I just joined the Elysian Beauty waitlist. My name is ${formData.value.name} and I'm excited to experience your beauty services! 🌟`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
    closeModal()
  }
  
  const resetForm = () => {
    console.log('Resetting form...')
    formData.value = {
      name: '',
      email: '',
      phone: '',
      city: ''
    }
    selectedService.value = null
    selectedLocation.value = null
    selectedBudget.value = null
    currentStep.value = 1
    countdown.value = 5
  }
  </script>
  
  <style scoped>
  .bg-brand {
    background-color: #064E3B !important;
  }
  
  .text-brand {
    color: #064E3B !important;
  }
  
  .border-brand {
    border-color: #064E3B !important;
  }
  
  .ring-brand {
    --tw-ring-color: #064E3B !important;
  }
  
  .focus\:ring-brand:focus {
    --tw-ring-color: #064E3B !important;
  }
  
  /* Ensure all interactive elements are clickable */
  button, .cursor-pointer {
    pointer-events: auto !important;
    cursor: pointer !important;
    user-select: none !important;
  }
  
  input, textarea, select {
    pointer-events: auto !important;
  }
  
  /* Floating Background Shapes */
  .floating-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .shape {
    position: absolute;
    background: #064E3B;
    opacity: 0.05;
    border-radius: 50%;
    pointer-events: none;
  }
  
  .shape-1 {
    width: 100px;
    height: 100px;
    top: 10%;
    left: 10%;
    animation: float-1 20s infinite ease-in-out;
  }
  
  .shape-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 10%;
    animation: float-2 25s infinite ease-in-out;
  }
  
  .shape-3 {
    width: 80px;
    height: 80px;
    bottom: 20%;
    left: 20%;
    animation: float-3 30s infinite ease-in-out;
  }
  
  .shape-4 {
    width: 120px;
    height: 120px;
    top: 30%;
    right: 30%;
    animation: float-1 35s infinite ease-in-out reverse;
  }
  
  .shape-5 {
    width: 200px;
    height: 200px;
    bottom: 10%;
    right: 20%;
    animation: float-2 40s infinite ease-in-out reverse;
  }
  
  /* Animations */
  @keyframes float-1 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-30px) rotate(120deg); }
    66% { transform: translateY(30px) rotate(240deg); }
  }
  
  @keyframes float-2 {
    0%, 100% { transform: translateX(0px) rotate(0deg); }
    50% { transform: translateX(50px) rotate(180deg); }
  }
  
  @keyframes float-3 {
    0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }
  
  @keyframes rotate-360 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(6, 78, 59, 0.3); }
    50% { box-shadow: 0 0 40px rgba(6, 78, 59, 0.6); }
  }
  
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(1.2); opacity: 0; }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(200%) skewX(-12deg); }
  }
  
  @keyframes bounce-gentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fade-in-up {
    from { 
      opacity: 0; 
      transform: translateY(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes slide-in {
    from { 
      opacity: 0; 
      transform: translateX(-30px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  @keyframes slide-in-left {
    from { 
      opacity: 0; 
      transform: translateX(-50px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  @keyframes slide-in-right {
    from { 
      opacity: 0; 
      transform: translateX(50px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  @keyframes slide-in-stagger {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes modal-enter {
    from { 
      opacity: 0; 
      transform: scale(0.8) translateY(50px); 
    }
    to { 
      opacity: 1; 
      transform: scale(1) translateY(0); 
    }
  }
  
  @keyframes step-enter {
    from { 
      opacity: 0; 
      transform: translateX(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes ping-slow {
    0% { transform: scale(1); opacity: 1; }
    75%, 100% { transform: scale(2); opacity: 0; }
  }
  
  @keyframes bounce-celebration {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0, -30px, 0); }
    70% { transform: translate3d(0, -15px, 0); }
    90% { transform: translate3d(0, -4px, 0); }
  }
  
  @keyframes confetti {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
  }
  
  @keyframes gradient-text {
    0%, 100% { color: #064E3B; }
    50% { color: #065f46; }
  }
  
  @keyframes progress-glow {
    0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
    50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
  }
  
  /* Animation Classes */
  .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
  .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
  .animate-float-3 { animation: float-3 10s ease-in-out infinite; }
  .animate-rotate-360 { animation: rotate-360 0.5s ease-in-out; }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .animate-shimmer { animation: shimmer 1.5s ease-in-out; }
  .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
  .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
  .animate-spin-slow { animation: spin-slow 3s linear infinite; }
  .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
  .animate-fade-in { animation: fade-in 0.6s ease-out; }
  .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
  .animate-slide-in { animation: slide-in 0.6s ease-out; }
  .animate-slide-in-left { animation: slide-in-left 1s ease-out; }
  .animate-slide-in-right { animation: slide-in-right 1s ease-out; }
  .animate-slide-in-stagger { animation: slide-in-stagger 0.6s ease-out; }
  .animate-modal-enter { animation: modal-enter 0.7s ease-out; }
  .animate-step-enter { animation: step-enter 0.5s ease-out; }
  .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
  .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
  .animate-bounce-celebration { animation: bounce-celebration 2s ease-in-out; }
  .animate-confetti { animation: confetti 3s ease-out infinite; }
  .animate-gradient-text { animation: gradient-text 3s ease-in-out infinite; }
  .animate-progress-glow { animation: progress-glow 2s ease-in-out infinite; }
  
  /* Animation Delays */
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
  .animation-delay-500 { animation-delay: 500ms; }
  .animation-delay-600 { animation-delay: 600ms; }
  .animation-delay-700 { animation-delay: 700ms; }
  
  /* Hover Effects */
  .group:hover .group-hover\:animate-spin-slow { animation: spin-slow 1s linear infinite; }
  .group:hover .group-hover\:animate-pulse { animation: pulse-slow 1s ease-in-out infinite; }
  
  /* Custom Utilities */
  .hover\:rotate-360:hover { transform: rotate(360deg); }
  .hover\:scale-110:hover { transform: scale(1.1); }
  .hover\:scale-105:hover { transform: scale(1.05); }
  .hover\:rotate-1:hover { transform: rotate(1deg); }
  .hover\:-rotate-1:hover { transform: rotate(-1deg); }
  .hover\:shadow-3xl:hover { box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25); }
  </style>