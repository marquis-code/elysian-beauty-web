<template>
  <div class="min-h-screen w-[600px] h-96 overflow-y-auto flex flex-col">
    <!-- Header -->
    <header class="p-4 md:p-6 bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20">
      <div class="max-w-2xl mx-auto flex items-center justify-between">
        <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-gray-900">Client Signup</h1>
        <div class="w-9"></div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-900 mb-2">Create an Account</h2>
          <p class="text-gray-600 text-sm">Join as a client to book beauty services</p>
        </div>

        <!-- Signup Methods -->
        <div class="space-y-4 mb-6">
          <!-- Google Signup -->
          <button
            @click="signupWithGoogle"
            :disabled="googleLoading"
            class="w-full flex items-center text-sm justify-center px-4 py-3 border-[0.5px] border-gray-100 rounded-2xl shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg v-if="!googleLoading" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ googleLoading ? 'Signing up...' : 'Continue with Google' }}
          </button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 text-gray-500">or continue with email</span>
            </div>
          </div>
        </div>

        <!-- Email Signup Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div class="relative">
              <input
                v-model="form.fullName"
                type="text"
                placeholder="Enter your full name"
               class="custom-input"
                :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.fullName }"
              />
              <!-- <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg> -->
            </div>
            <p v-if="errors.fullName" class="text-red-500 text-xs mt-1">{{ errors.fullName }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div class="relative">
              <input
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
                class="custom-input"
                :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.email }"
              />
              <!-- <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg> -->
            </div>
            <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div class="flex space-x-3">
              <div class="w-20">
                  <select v-model="form.countryCode" class="border-[0.5px] bg-[#1A1A1B09] rounded-l-xl py-3.5 px-3 border-gray-100 text-sm">
                    <option value="+234">🇳🇬 +234</option>
                  </select>
                </div>
             <div class="flex-1">
                  <input
                    v-model="form.phoneNumber"
                    type="tel"
                    placeholder="Enter phone number"
                    class="w-full px-4 py-3.5 text-sm outline-none focus:border focus:border-[#045940] rounded-r-xl bg-[#1A1A1B09]  focus:bg-white pr-10"
                    :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.phoneNumber }"
                  />
                </div>
            </div>
            <p v-if="errors.phoneNumber" class="text-red-500 text-xs mt-1">{{ errors.phoneNumber }}</p>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div class="relative">
              <input
                v-model="form.location"
                type="text"
                placeholder="Enter your city/location"
               class="custom-input"
                :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.location }"
              />
              <!-- <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg> -->
            </div>
            <p v-if="errors.location" class="text-red-500 text-xs mt-1">{{ errors.location }}</p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a strong password"
               class="custom-input"
                :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.password }"
              />
              <!-- <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg> -->
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div class="relative">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
               class="custom-input"
                :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.confirmPassword }"
              />
              <!-- <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg> -->
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-primary text-white font-semibold rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] mt-8"

          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <footer class="py-6 px-4">
      <div class="max-w-md mx-auto flex items-center justify-center space-x-6 text-sm text-gray-500">
        <a href="#" class="flex items-center space-x-1 hover:text-gray-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span>Terms of Service</span>
        </a>
        <a href="#" class="flex items-center space-x-1 hover:text-gray-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Support</span>
        </a>
        <span>© 2025 Elysian Beauty</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRegister } from '@/composables/auth/useRegister'
const { setCredentials, register, loading } = useRegister()
const router = useRouter()

// Form state
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const googleLoading = ref(false)

// Cache key
const CACHE_KEY = 'client_signup_form'

// Form data
const form = reactive({
  fullName: '',
  email: '',
  countryCode: '+234',
  phoneNumber: '',
  location: '',
  password: '',
  confirmPassword: '',
  provider: 'EMAIL'
})

// Errors
const errors = reactive({
  fullName: '',
  email: '',
  phoneNumber: '',
  location: '',
  password: '',
  confirmPassword: ''
})

// Cache management
const saveFormToCache = () => {
  try {
    const cacheData = {
      form: { ...form },
      timestamp: Date.now()
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Failed to save form to cache:', error)
  }
}

const loadFormFromCache = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const cacheData = JSON.parse(cached)
      // Check if cache is less than 24 hours old
      if (Date.now() - cacheData.timestamp < 24 * 60 * 60 * 1000) {
        Object.assign(form, cacheData.form)
        return true
      }
    }
  } catch (error) {
    console.error('Failed to load form from cache:', error)
  }
  return false
}

const clearFormCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY)
  } catch (error) {
    console.error('Failed to clear form cache:', error)
  }
}

// Validation
const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required'
    isValid = false
  } else if (form.fullName.trim().split(' ').length < 2) {
    errors.fullName = 'Please enter your full name (first and last name)'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required'
    isValid = false
  } else if (!/^\d{10,11}$/.test(form.phoneNumber.replace(/\D/g, ''))) {
    errors.phoneNumber = 'Please enter a valid phone number'
    isValid = false
  }

  if (!form.location.trim()) {
    errors.location = 'Location is required'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

// Google signup
const signupWithGoogle = async () => {
  googleLoading.value = true
  
  try {
    // Mock Google OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate Google user data
    const googlePayload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      location: 'Lagos, Nigeria',
      provider: 'GOOGLE',
      role: 'CLIENT'
    }
    
    setCredentials(googlePayload)
    const result = await register()
    
    if (result.type !== 'ERROR') {
      // localStorage.setItem('signup_email', 'john.doe@gmail.com')
      clearFormCache()
      // router.push('/signup/verify')
    } else {
      console.error('Google signup failed:', result)
    }
  } catch (error) {
    console.error('Google signup error:', error)
  } finally {
    googleLoading.value = false
  }
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    const nameParts = form.fullName.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ')

    const payload = {
      firstName,
      lastName,
      email: form.email,
      password: form.password,
      location: form.location,
      phoneNum: form.countryCode + form.phoneNumber.replace(/\D/g, ''),
      provider: 'EMAIL',
      role: 'CLIENT'
    }

    setCredentials(payload)
    const result = await register()

    if (result.type !== 'ERROR') {
      localStorage.setItem('signup_email', form.email)
      clearFormCache()
      // router.push('/signup/verify')
    } else {
      console.error('Registration failed:', result)
    }
  } catch (error) {
    console.error('Error during registration:', error)
  }
}

// Watch for form changes to save to cache
watch(form, () => {
  saveFormToCache()
}, { deep: true })

// Load cached data on mount
onMounted(() => {
  loadFormFromCache()
})

// SEO
useHead({
  title: 'Client Signup - Elysian Beauty',
  meta: [
    { name: 'description', content: 'Sign up as a client to book beauty services' }
  ]
})

definePageMeta({
  layout: 'auth'
})
</script>
