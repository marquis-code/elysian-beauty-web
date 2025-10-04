<template>
  <div class="min-h-screen w-[600px] h-96 overflow-y-auto flex flex-col">
    <!-- Header with Progress -->
    <header class="p-4 md:p-6 bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20">
      <div class="max-w-md mx-auto">
        <!-- {{ banks }} -->
        <!-- Top Row -->
        <div class="flex items-center justify-between mb-4">
          <button @click="handleBack" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div class="text-center">
            <h1 class="text-lg font-semibold text-gray-900">Service Provider</h1>
            <p class="text-xs text-gray-500">{{ currentStep }}/{{ totalSteps }}</p>
          </div>
          <div class="w-9"></div>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="h-2 rounded-full transition-all duration-300"
            style="background: linear-gradient(90deg, #045940 0%, #059669 100%);"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          ></div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-1 flex items-start justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <!-- Step 1: Basic Information -->
        <div v-if="currentStep === 1">
          <div class="text-center mb-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Create an Account</h2>
            <p class="text-gray-600">Join as a beauty professional</p>
          </div>

          <!-- Google Signup -->
          <div class="mb-6">
            <button
              @click="signupWithGoogle"
              :disabled="googleLoading"
              class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-2xl shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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

          <!-- Form -->
          <form @submit.prevent="nextStep" class="space-y-4">
            <!-- Service Role -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <div class="space-y-3">
                <div 
                  v-for="role in serviceRoles"
                  :key="role.value"
                  class="relative cursor-pointer"
                  @click="form.serviceRole = role.value"
                >
                  <input 
                    v-model="form.serviceRole"
                    :value="role.value"
                    type="radio"
                    class="sr-only"
                  >
                  <div 
                    class="p-4 border-2 rounded-2xl transition-all duration-300 hover:shadow-md"
                    :class="form.serviceRole === role.value
                      ? 'border-emerald-600 bg-emerald-50 shadow-lg'
                      : 'border-gray-200 hover:border-emerald-300'"
                  >
                    <div class="flex items-center space-x-3">
                      <div 
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                        :class="form.serviceRole === role.value
                          ? 'border-emerald-600 bg-emerald-600'
                          : 'border-gray-300'"
                      >
                        <div v-if="form.serviceRole === role.value" class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div class="flex-1">
                        <div class="font-medium text-gray-900">{{ role.label }}</div>
                        <div class="text-sm text-gray-600">{{ role.description }}</div>
                      </div>
                      <div class="text-2xl">{{ role.icon }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <p v-if="errors.serviceRole" class="text-red-500 text-xs mt-1">{{ errors.serviceRole }}</p>
            </div>

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
                  <select
                    v-model="form.countryCode"
                    class="custom-input"
                  >
                    <option value="+234">🇳🇬 +234</option>
                  </select>
                </div>
                <div class="flex-1">
                  <input
                    v-model="form.phoneNumber"
                    type="tel"
                    placeholder="Enter phone number"
                   class="custom-input"
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
              class="w-full py-3 text-white bg-primary font-semibold rounded-2xl focus:outline-none transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] mt-8"
            >
              Continue
            </button>
          </form>
        </div>

        <!-- Step 2: Business Details -->
        <div v-if="currentStep === 2">
          <div class="text-center mb-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Business Details</h2>
            <p class="text-gray-600">Tell us about your services and business</p>
          </div>

          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Business Name (if registered business) -->
            <div v-if="form.serviceRole === 'REGISTEREDBUSINESS'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <div class="relative">
                <input
                  v-model="form.businessName"
                  type="text"
                  placeholder="Enter your business name"
                  class="custom-input"
                  :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.businessName }"
                />
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <p v-if="errors.businessName" class="text-red-500 text-xs mt-1">{{ errors.businessName }}</p>
            </div>

            <!-- Services -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What type of services do you offer?</label>
              <div class="relative">
                <!-- Services Input Container -->
                <div 
                  @click="toggleServicesDropdown"
                  class="w-full min-h-[60px] px-4 py-3 bg-gray-100 border border-gray-300 rounded-2xl cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all duration-200"
                  :class="{ 'border-red-300 focus-within:ring-red-500/20 focus-within:border-red-500': errors.services }"
                >
                  <!-- Selected Services Tags -->
                  <div class="flex flex-wrap gap-2 items-center min-h-[36px]">
                    <div 
                      v-for="service in form.services" 
                      :key="service"
                      class="inline-flex items-center px-3 py-1.5 bg-gray-400 text-white text-sm rounded-full"
                    >
                      <span>{{ service }}</span>
                      <button
                        type="button"
                        @click.stop="removeService(service)"
                        class="ml-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-500 transition-colors"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <!-- Placeholder text when no services selected -->
                    <span 
                      v-if="form.services.length === 0" 
                      class="text-gray-500 text-sm"
                    >
                      Select services you offer
                    </span>
                  </div>
                  
                  <!-- Dropdown Arrow -->
                  <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg 
                      class="w-5 h-5 text-gray-400 transition-transform duration-200"
                      :class="{ 'rotate-180': showServicesDropdown }"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                
                <!-- Dropdown Menu -->
                <div 
                  v-if="showServicesDropdown"
                  class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto"
                >
                  <div class="p-2">
                    <div 
                      v-for="service in availableServices"
                      :key="service"
                      @click="toggleService(service)"
                      class="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <span class="text-sm text-gray-700">{{ service }}</span>
                      <div 
                        class="w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200"
                        :class="form.services.includes(service) 
                          ? 'border-emerald-600 bg-emerald-600' 
                          : 'border-gray-300'"
                      >
                        <svg 
                          v-if="form.services.includes(service)"
                          class="w-3 h-3 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p v-if="errors.services" class="text-red-500 text-xs mt-1">{{ errors.services }}</p>
            </div>

            <!-- Business Location Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Location Type</label>
              <div class="space-y-3">
                <div 
                  v-for="type in locationTypes"
                  :key="type.value"
                  class="relative cursor-pointer"
                  @click="form.businessLocationType = type.value"
                >
                  <input 
                    v-model="form.businessLocationType"
                    :value="type.value"
                    type="radio"
                    class="sr-only"
                  >
                  <div 
                    class="p-4 border-2 rounded-2xl transition-all duration-300 hover:shadow-md"
                    :class="form.businessLocationType === type.value
                      ? 'border-emerald-600 bg-emerald-50 shadow-lg'
                      : 'border-gray-200 hover:border-emerald-300'"
                  >
                    <div class="flex items-center space-x-3">
                      <div 
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                        :class="form.businessLocationType === type.value
                          ? 'border-emerald-600 bg-emerald-600'
                          : 'border-gray-300'"
                      >
                        <div v-if="form.businessLocationType === type.value" class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div class="flex-1">
                        <div class="font-medium text-gray-900">{{ type.label }}</div>
                        <div class="text-sm text-gray-600">{{ type.description }}</div>
                      </div>
                      <div class="text-2xl">{{ type.icon }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Address (if physical) -->
            <div v-if="form.businessLocationType === 'PHYSICAL'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
              <div class="relative">
                <input
                  v-model="form.businessLocation"
                  type="text"
                  placeholder="Enter your business address"
                 class="custom-input"
                  :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.businessLocation }"
                />
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <p v-if="errors.businessLocation" class="text-red-500 text-xs mt-1">{{ errors.businessLocation }}</p>
            </div>

            <!-- Bank Details -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Bank Account Details</h3>
              <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 mt-0.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 class="text-sm font-semibold text-emerald-800">🔒 Secure Payment Setup</h4>
                    <p class="text-xs mt-1 text-emerald-700">Your bank details are encrypted and secure. Used solely for payment processing.</p>
                  </div>
                </div>
              </div>
              
              <!-- Bank Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <div class="relative">
                  <select
                    v-model="form.bankDetails.bankName"
                   class="custom-input"
                    :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.bankName }"
                  >
                    <option value="">Select your bank</option>
                    <option v-for="bank in nigerianBanks" :key="bank.code" :value="bank.name">
                      {{ bank.name }}
                    </option>
                  </select>
                  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <p v-if="errors.bankName" class="text-red-500 text-xs mt-1">{{ errors.bankName }}</p>
              </div>

              <!-- Account Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <div class="relative">
                  <input
                    v-model="form.bankDetails.accountNumber"
                    type="text"
                    placeholder="10-digit account number"
                    maxlength="10"
                    class="custom-input"
                    :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.accountNumber }"
                  />
                  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <p v-if="errors.accountNumber" class="text-red-500 text-xs mt-1">{{ errors.accountNumber }}</p>
              </div>

              <!-- Account Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <div class="relative">
                  <input
                    v-model="form.bankDetails.accountName"
                    type="text"
                    placeholder="Account holder name"
                    class="custom-input"
                    :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.accountName }"
                  />
                  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <p v-if="errors.accountName" class="text-red-500 text-xs mt-1">{{ errors.accountName }}</p>
              </div>

              <!-- Bank Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bank Code</label>
                <div class="relative">
                  <input
                    v-model="form.bankDetails.bankCode"
                    type="text"
                    placeholder="3-digit bank code"
                    maxlength="3"
                    readonly
                   class="custom-input"
                  />
                  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <p class="text-xs text-gray-500 mt-1">Bank code will be auto-filled when you select your bank.</p>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex space-x-4 mt-8">
              <button
                type="button"
                @click="previousStep"
                class="flex-1 py-3 text-sm bg-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 py-3 text-sm bg-primary text-white font-semibold rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
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
            </div>
          </form>
        </div>
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
import { useFetchBanksList } from "@/composables/modules/transactions/useFetchBanksList"
import { useCreateBusiness } from '@/composables/auth/useCreateBusiness'
// Composables
const { setCredentials, register, loading } = useCreateBusiness()
const {  banks, loading: fetchingBanksList } = useFetchBanksList()
const router = useRouter()

// Form state
const currentStep = ref(1)
const totalSteps = 2
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const googleLoading = ref(false)

// Cache key
const CACHE_KEY = 'service_provider_signup_form'

// Form data
const form = reactive({
  serviceRole: 'FREELANCER',
  fullName: '',
  email: '',
  countryCode: '+234',
  phoneNumber: '',
  location: '',
  password: '',
  confirmPassword: '',
  businessName: '',
  services: [] as string[],
  businessLocationType: 'PHYSICAL',
  businessLocation: '',
  bankDetails: {
    bankName: '',
    accountNumber: '',
    accountName: '',
    bankCode: ''
  },
  provider: 'EMAIL'
})

// Errors
const errors = reactive({
  serviceRole: '',
  fullName: '',
  email: '',
  phoneNumber: '',
  location: '',
  password: '',
  confirmPassword: '',
  businessName: '',
  services: '',
  businessLocation: '',
  bankName: '',
  accountNumber: '',
  accountName: '',
  bankCode: ''
})

// Add to reactive data
const showServicesDropdown = ref(false)

// Data
const serviceRoles = [
  {
    value: 'FREELANCER',
    label: 'Freelancer',
    description: 'Individual service provider',
    icon: '👤'
  },
  {
    value: 'REGISTEREDBUSINESS',
    label: 'Registered Business',
    description: 'Business entity',
    icon: '🏢'
  }
]

const locationTypes = [
  {
    value: 'PHYSICAL',
    label: 'Physical Location',
    description: 'Customers visit your location',
    icon: '🏪'
  },
  {
    value: 'ONLINE',
    label: 'Virtual/Mobile',
    description: 'You visit customers',
    icon: '🚗'
  }
]

const availableServices = [
  'Hair Styling',
  'Makeup Artist',
  'Nail Technician',
  'Massage Therapy',
  'Beautician',
  'Barber',
  'Tattoo Artist',
  'Piercing Artist',
  'Personal Trainer',
  'Nutritionist',
  'Yoga Instructor',
  'Revamping',
  'Skin Therapy',
  'Other'
]

const nigerianBanks = [
  { name: 'Access Bank', code: '044' },
  { name: 'Citibank Nigeria', code: '023' },
  { name: 'Diamond Bank', code: '063' },
  { name: 'Ecobank Nigeria', code: '050' },
  { name: 'Fidelity Bank', code: '070' },
  { name: 'First Bank of Nigeria', code: '011' },
  { name: 'First City Monument Bank', code: '214' },
  { name: 'Guaranty Trust Bank', code: '058' },
  { name: 'Heritage Bank', code: '030' },
  { name: 'Keystone Bank', code: '082' },
  { name: 'Polaris Bank', code: '076' },
  { name: 'Providus Bank', code: '101' },
  { name: 'Stanbic IBTC Bank', code: '221' },
  { name: 'Standard Chartered Bank', code: '068' },
  { name: 'Sterling Bank', code: '232' },
  { name: 'Union Bank of Nigeria', code: '032' },
  { name: 'United Bank For Africa', code: '033' },
  { name: 'Unity Bank', code: '215' },
  { name: 'Wema Bank', code: '035' },
  { name: 'Zenith Bank', code: '057' }
]

// Cache management
const saveFormToCache = () => {
  try {
    const cacheData = {
      form: { ...form },
      currentStep: currentStep.value,
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
        currentStep.value = cacheData.currentStep
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
const validateStep1 = () => {
  let isValid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.serviceRole) {
    errors.serviceRole = 'Please select a service role'
    isValid = false
  }

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

const validateStep2 = () => {
  let isValid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  if (form.serviceRole === 'REGISTEREDBUSINESS' && !form.businessName.trim()) {
    errors.businessName = 'Business name is required'
    isValid = false
  }

  if (form.services.length === 0) {
    errors.services = 'Please select at least one service'
    isValid = false
  }

  if (form.businessLocationType === 'PHYSICAL' && !form.businessLocation.trim()) {
    errors.businessLocation = 'Business address is required'
    isValid = false
  }

  if (!form.bankDetails.bankName) {
    errors.bankName = 'Please select a bank'
    isValid = false
  }

  if (!form.bankDetails.accountNumber.trim()) {
    errors.accountNumber = 'Account number is required'
    isValid = false
  } else if (!/^\d{10}$/.test(form.bankDetails.accountNumber)) {
    errors.accountNumber = 'Account number must be exactly 10 digits'
    isValid = false
  }

  if (!form.bankDetails.accountName.trim()) {
    errors.accountName = 'Account holder name is required'
    isValid = false
  }

  if (!form.bankDetails.bankCode.trim()) {
    errors.bankCode = 'Bank code is required'
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
    
    // Simulate Google user data and move to step 2
    form.provider = 'GOOGLE'
    form.fullName = 'Jane Smith'
    form.email = 'jane.smith@gmail.com'
    form.location = 'Lagos, Nigeria'
    
    currentStep.value = 2
    saveFormToCache()
  } catch (error) {
    console.error('Google signup error:', error)
  } finally {
    googleLoading.value = false
  }
}

// Navigation
const nextStep = () => {
  if (currentStep.value === 1 && validateStep1()) {
    currentStep.value = 2
    saveFormToCache()
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value = 1
    saveFormToCache()
  }
}

const handleBack = () => {
  if (currentStep.value > 1) {
    previousStep()
  } else {
    router.back()
  }
}

// Add these methods
const toggleServicesDropdown = () => {
  showServicesDropdown.value = !showServicesDropdown.value
}

const toggleService = (service: string) => {
  const index = form.services.indexOf(service)
  if (index > -1) {
    form.services.splice(index, 1)
  } else {
    form.services.push(service)
  }
}

const removeService = (service: string) => {
  const index = form.services.indexOf(service)
  if (index > -1) {
    form.services.splice(index, 1)
  }
}

// Form submission
const submitForm = async () => {
  if (!validateStep2()) return

  try {
    const nameParts = form.fullName.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ')

    const payload = {
      firstName,
      lastName,
      email: form.email,
      provider: form.provider,
      role: 'SERVICEPROVIDER',
      serviceProvider: {
        serviceRole: form.serviceRole,
        businessName: form.businessName || `${firstName} ${lastName}`,
        serviceTypes: form.services,
        businessLocationType: form.businessLocationType,
        businessLocation: form.businessLocationType === 'PHYSICAL' ? form.businessLocation : null,
        serviceProviderAccount: {
          bankName: form.bankDetails.bankName,
          accountNumber: form.bankDetails.accountNumber,
          accountName: form.bankDetails.accountName,
          bankCode: form.bankDetails.bankCode
        }
      }
    }

    // Add password and phone for email signup
    if (form.provider === 'EMAIL') {
      payload.password = form.password
      payload.phoneNum = form.countryCode + form.phoneNumber.replace(/\D/g, '')
    }

    setCredentials(payload)
    const result = await register()

    if (result.type !== 'ERROR') {
      localStorage.setItem('signup_email', form.email)
      clearFormCache()
      router.push('/signup/verify')
    } else {
      console.error('Registration failed:', result)
    }
  } catch (error) {
    console.error('Error during registration:', error)
  }
}

// Watchers
watch(() => form.bankDetails.bankName, (bankName) => {
  if (bankName) {
    const bank = nigerianBanks.find(b => b.name === bankName)
    if (bank) {
      form.bankDetails.bankCode = bank.code
    }
  }
})

watch(() => form.fullName, (fullName) => {
  if (fullName && !form.bankDetails.accountName) {
    form.bankDetails.accountName = fullName
  }
})

watch(() => form.serviceRole, (role) => {
  if (role === 'FREELANCER') {
    form.businessLocationType = 'ONLINE'
    form.businessLocation = ''
  }
})

watch(form, () => {
  saveFormToCache()
}, { deep: true })

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showServicesDropdown.value = false
  }
}

// Load cached data on mount
onMounted(() => {
  loadFormFromCache()
  document.addEventListener('click', handleClickOutside)
})

// Add to onUnmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('click', handleClickOutside)
})

// SEO
useHead({
  title: 'Service Provider Signup - Elysian Beauty',
  meta: [
    { name: 'description', content: 'Sign up as a service provider to offer beauty services' }
  ]
})

definePageMeta({
  layout: 'auth'
})
</script>
