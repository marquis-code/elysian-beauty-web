<template>
    <div class="min-h-screen relative overflow-x-hidden">
  
      <div class="relative z-10 min-h-screen flex flex-col">
        <!-- Enhanced Mobile Header -->
        <header class="p-3 md:p-6 bg-white/90  sticky top-0 z-20">
          <div class="max-w-4xl mx-auto">
            <!-- Top Row: Logo and Step Counter -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2 md:space-x-3">
                <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
                  <svg class="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h1 class="text-lg md:text-xl font-bold text-gray-900">Salon Partner</h1>
                  <p class="text-xs text-gray-600 hidden sm:block">Join our network</p>
                </div>
              </div>
                          
              <!-- Mobile Step Counter -->
              <div class="flex items-center space-x-2">
                <div class="text-right">
                  <div class="text-sm md:text-base font-bold text-gray-900">{{ currentStep }}/{{ totalSteps }}</div>
                  <div class="text-xs text-gray-500">{{ getStepTitle() }}</div>
                </div>
                <div class="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
                  <div class="text-white font-bold text-sm md:text-base">{{ Math.round((currentStep / totalSteps) * 100) }}%</div>
                </div>
              </div>
            </div>
            
            <!-- Enhanced Progress Bar -->
            <div class="relative">
              <!-- Background Progress Line -->
              <div class="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 rounded-full"></div>
              <div 
                class="absolute top-4 left-0 h-0.5 rounded-full transition-all duration-700 ease-out"
                style="background: linear-gradient(90deg, #045940 0%, #059669 100%);"
                :style="{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }"
              ></div>
                          
              <!-- Step Indicators -->
              <div class="flex justify-between items-center relative">
                <div 
                  v-for="step in totalSteps"
                  :key="step"
                  class="flex flex-col items-center group cursor-pointer"
                  @click="navigateToStep(step)"
                >
                  <!-- Step Circle -->
                  <div 
                    class="relative z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-500 group-hover:scale-110"
                    :class="getStepClasses(step)"
                  >
                    <!-- Completed Step -->
                    <svg v-if="step < currentStep" class="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <!-- Current Step -->
                    <div v-else-if="step === currentStep" class="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-pulse"></div>
                    <!-- Future Step -->
                    <span v-else class="text-xs md:text-sm font-medium">{{ step }}</span>
                  </div>
                                  
                  <!-- Step Label -->
                  <div class="mt-2 text-center">
                    <div 
                      class="text-xs md:text-sm font-medium transition-colors duration-300"
                      :class="{
                        'text-emerald-700': step === currentStep,
                        'text-emerald-600': step < currentStep,
                        'text-gray-500': step > currentStep
                      }"
                    >
                      {{ getStepLabels()[step - 1] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
  
        <!-- Main Content -->
        <main class="flex-1">
          <div class="">
            <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
              <form @submit.prevent="handleSubmit" class="p-4 md:p-8">
                <!-- Step Content with Enhanced Animations -->
                <div class="relative min-h-[500px] md:min-h-[600px]">
                  
                  <!-- Step 1: Account Type & Personal Information -->
                  <Transition name="step" mode="out-in">
                    <div v-if="currentStep === 1" key="step1" class="space-y-4 md:space-y-6">
                      <div class="text-center mb-4 md:mb-6">
                        <div class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 md:mb-4 animate-bounce shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
                          <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                        <h2 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Get Started</h2>
                        <p class="text-sm text-gray-600">Choose your account type and enter your details</p>
                      </div>
  
                      <!-- Account Type Selection -->
                      <div class="space-y-3">
                        <label class="block text-sm font-semibold text-gray-700">I want to join as</label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div 
                            v-for="type in accountTypes"
                            :key="type.value"
                            class="relative cursor-pointer transform transition-all duration-200 hover:scale-105 active:scale-95"
                            @click="form.accountType = type.value"
                          >
                            <input 
                              v-model="form.accountType"
                              :value="type.value"
                              type="radio"
                              class="sr-only"
                            >
                            <div 
                              class="p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                              :class="form.accountType === type.value
                                ? 'border-emerald-600 bg-emerald-50 shadow-lg ring-2 ring-emerald-200'
                                : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'"
                              :style="form.accountType === type.value ? 'border-color: #045940; background-color: rgba(4, 89, 64, 0.05);' : ''"
                            >
                              <div class="flex items-center space-x-3">
                                <div 
                                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                                  :class="form.accountType === type.value
                                    ? 'border-emerald-600 scale-110'
                                    : 'border-gray-300'"
                                  :style="form.accountType === type.value ? 'border-color: #045940; background-color: #045940;' : ''"
                                >
                                  <div v-if="form.accountType === type.value" class="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div class="flex-1">
                                  <div class="font-medium text-gray-900 text-sm">{{ type.label }}</div>
                                  <div class="text-xs text-gray-600">{{ type.description }}</div>
                                </div>
                                <div class="text-xl">{{ type.icon }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p v-if="errors.accountType" class="text-red-500 text-xs flex items-center animate-shake">
                          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                          </svg>
                          {{ errors.accountType }}
                        </p>
                      </div>
  
                      <!-- Signup Method Selection -->
                      <div class="space-y-4">
                        <div class="text-center">
                          <p class="text-sm font-medium text-gray-700 mb-4">Choose your signup method</p>
                          
                          <!-- Google Signup Button -->
                          <button
                            type="button"
                            @click="signupWithGoogle"
                            :disabled="!form.accountType || googleLoading"
                            class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                              <span class="px-2 bg-white text-gray-500">or continue with email</span>
                            </div>
                          </div>
                        </div>
  
                        <!-- Email Signup Form -->
                        <div class="space-y-4">
                          <!-- Personal Details -->
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- First Name -->
                            <div class="space-y-2">
                              <label class="block text-sm font-semibold text-gray-700">
                                First Name <span class="text-red-500">*</span>
                              </label>
                              <div class="relative group">
                                <input 
                                  v-model="form.firstName"
                                  type="text"
                                  placeholder="Enter first name"
                                  class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                                  :class="{
                                    'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.firstName,
                                    'border-green-300 bg-green-50/50': form.firstName && !errors.firstName
                                  }"
                                  :style="form.firstName && !errors.firstName ? 'border-color: #045940;' : ''"
                                />
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                  </svg>
                                </div>
                                <!-- Success Indicator -->
                                <div v-if="form.firstName && !errors.firstName" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <svg class="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                  </svg>
                                </div>
                              </div>
                              <p v-if="errors.firstName" class="text-red-500 text-xs animate-fadeIn">{{ errors.firstName }}</p>
                            </div>
  
                            <!-- Last Name -->
                            <div class="space-y-2">
                              <label class="block text-sm font-semibold text-gray-700">
                                Last Name <span class="text-red-500">*</span>
                              </label>
                              <div class="relative group">
                                <input 
                                  v-model="form.lastName"
                                  type="text"
                                  placeholder="Enter last name"
                                  class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                                  :class="{
                                    'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.lastName,
                                    'border-green-300 bg-green-50/50': form.lastName && !errors.lastName
                                  }"
                                  :style="form.lastName && !errors.lastName ? 'border-color: #045940;' : ''"
                                />
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                  </svg>
                                </div>
                                <!-- Success Indicator -->
                                <div v-if="form.lastName && !errors.lastName" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <svg class="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                  </svg>
                                </div>
                              </div>
                              <p v-if="errors.lastName" class="text-red-500 text-xs animate-fadeIn">{{ errors.lastName }}</p>
                            </div>
                          </div>
  
                          <!-- Email -->
                          <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-700">
                              Email Address <span class="text-red-500">*</span>
                            </label>
                            <div class="relative group">
                              <input 
                                v-model="form.email"
                                type="email"
                                placeholder="Enter your email"
                                class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                                :class="{
                                  'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.email,
                                  'border-green-300 bg-green-50/50': form.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                                }"
                                :style="form.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'border-color: #045940;' : ''"
                              />
                              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                              <!-- Success Indicator -->
                              <div v-if="form.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <svg class="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                              </div>
                            </div>
                            <p v-if="errors.email" class="text-red-500 text-xs animate-fadeIn">{{ errors.email }}</p>
                          </div>
  
                          <!-- Phone Number (only for email signup) -->
                          <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-700">
                              Phone Number <span class="text-red-500">*</span>
                            </label>
                            <div class="flex space-x-3">
                              <div class="w-20 sm:w-24">
                                <select 
                                  v-model="form.phone.countryCode"
                                  class="w-full px-2 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                                >
                                  <option v-for="country in countries" :key="country.code" :value="country.code">
                                    {{ country.code }}
                                  </option>
                                </select>
                              </div>
                              <div class="flex-1">
                                <input 
                                  v-model="form.phone.number"
                                  type="tel"
                                  placeholder="Enter phone number"
                                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                  :class="{
                                    'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.phone,
                                    'border-green-300 bg-green-50/50': form.phone.number && !errors.phone
                                  }"
                                  :style="form.phone.number && !errors.phone ? 'border-color: #045940;' : ''"
                                />
                              </div>
                            </div>
                            <p v-if="errors.phone" class="text-red-500 text-xs animate-fadeIn">{{ errors.phone }}</p>
                          </div>
  
                          <!-- Password Fields -->
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Password -->
                            <div class="space-y-2">
                              <label class="block text-sm font-semibold text-gray-700">
                                Create Password <span class="text-red-500">*</span>
                              </label>
                              <div class="relative group">
                                <input 
                                  v-model="form.password"
                                  :type="showPassword ? 'text' : 'password'"
                                  placeholder="Create password"
                                  class="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                  :class="{
                                    'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.password,
                                    'border-green-300 bg-green-50/50': form.password && !errors.password && form.password.length >= 8
                                  }"
                                  :style="form.password && !errors.password && form.password.length >= 8 ? 'border-color: #045940;' : ''"
                                />
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                  </svg>
                                </div>
                                <button 
                                  type="button"
                                  @click="showPassword = !showPassword"
                                  class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors"
                                >
                                  <svg v-if="showPassword" class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                  </svg>
                                  <svg v-else class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                                  </svg>
                                </button>
                              </div>
                              <p v-if="errors.password" class="text-red-500 text-xs animate-fadeIn">{{ errors.password }}</p>
                              <!-- Password Strength Indicator -->
                              <div v-if="form.password" class="mt-2">
                                <div class="flex space-x-1">
                                  <div 
                                    v-for="i in 4"
                                    :key="i"
                                    class="h-1 flex-1 rounded-full transition-all duration-300"
                                    :class="getPasswordStrengthClass(i)"
                                  ></div>
                                </div>
                                <p class="text-xs mt-1" :class="getPasswordStrengthTextClass()">
                                  {{ getPasswordStrengthText() }}
                                </p>
                              </div>
                            </div>
  
                            <!-- Confirm Password -->
                            <div class="space-y-2">
                              <label class="block text-sm font-semibold text-gray-700">
                                Confirm Password <span class="text-red-500">*</span>
                              </label>
                              <div class="relative group">
                                <input 
                                  v-model="form.confirmPassword"
                                  :type="showConfirmPassword ? 'text' : 'password'"
                                  placeholder="Confirm password"
                                  class="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                  :class="{
                                    'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.confirmPassword,
                                    'border-green-300 bg-green-50/50': form.confirmPassword && form.confirmPassword === form.password && !errors.confirmPassword
                                  }"
                                  :style="form.confirmPassword && form.confirmPassword === form.password && !errors.confirmPassword ? 'border-color: #045940;' : ''"
                                />
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                  </svg>
                                </div>
                                <button 
                                  type="button"
                                  @click="showConfirmPassword = !showConfirmPassword"
                                  class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors"
                                >
                                  <svg v-if="showConfirmPassword" class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                  </svg>
                                  <svg v-else class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                                  </svg>
                                </button>
                                <!-- Success Indicator -->
                                <div v-if="form.confirmPassword && form.confirmPassword === form.password && !errors.confirmPassword" class="absolute inset-y-0 right-10 pr-3 flex items-center">
                                  <svg class="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                  </svg>
                                </div>
                              </div>
                              <p v-if="errors.confirmPassword" class="text-red-500 text-xs animate-fadeIn">{{ errors.confirmPassword }}</p>
                            </div>
                          </div>
  
                          <!-- Location (for all users) -->
                          <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-700">
                              Location <span class="text-red-500">*</span>
                            </label>
                            <div class="relative group">
                              <input 
                                v-model="form.location"
                                type="text"
                                placeholder="Enter your city/location"
                                class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                                :class="{
                                  'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.location,
                                  'border-green-300 bg-green-50/50': form.location && !errors.location
                                }"
                                :style="form.location && !errors.location ? 'border-color: #045940;' : ''"
                              />
                              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                              </div>
                              <!-- Success Indicator -->
                              <div v-if="form.location && !errors.location" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <svg class="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                              </div>
                            </div>
                            <p v-if="errors.location" class="text-red-500 text-xs animate-fadeIn">{{ errors.location }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
  
                  <!-- Step 2: Service Provider Details (only for service providers) -->
                  <Transition name="step" mode="out-in">
                    <div v-if="currentStep === 2 && form.accountType === 'SERVICE_PROVIDER'" key="step2" class="space-y-4 md:space-y-6">
                      <div class="text-center mb-4 md:mb-6">
                        <div class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 md:mb-4 animate-bounce shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
                          <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                        <h2 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Service Details</h2>
                        <p class="text-sm text-gray-600">Tell us about your services and business</p>
                      </div>
  
                      <!-- Service Role Selection -->
                      <div class="space-y-3">
                        <label class="block text-sm font-semibold text-gray-700">Service Type</label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div 
                            v-for="role in serviceRoles"
                            :key="role.value"
                            class="relative cursor-pointer transform transition-all duration-200 hover:scale-105 active:scale-95"
                            @click="form.serviceRole = role.value"
                          >
                            <input 
                              v-model="form.serviceRole"
                              :value="role.value"
                              type="radio"
                              class="sr-only"
                            >
                            <div 
                              class="p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                              :class="form.serviceRole === role.value
                                ? 'border-emerald-600 bg-emerald-50 shadow-lg ring-2 ring-emerald-200'
                                : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'"
                              :style="form.serviceRole === role.value ? 'border-color: #045940; background-color: rgba(4, 89, 64, 0.05);' : ''"
                            >
                              <div class="flex items-center space-x-3">
                                <div 
                                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                                  :class="form.serviceRole === role.value
                                    ? 'border-emerald-600 scale-110'
                                    : 'border-gray-300'"
                                  :style="form.serviceRole === role.value ? 'border-color: #045940; background-color: #045940;' : ''"
                                >
                                  <div v-if="form.serviceRole === role.value" class="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div class="flex-1">
                                  <div class="font-medium text-gray-900 text-sm">{{ role.label }}</div>
                                  <div class="text-xs text-gray-600">{{ role.description }}</div>
                                </div>
                                <div class="text-xl">{{ role.icon }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p v-if="errors.serviceRole" class="text-red-500 text-xs flex items-center animate-shake">
                          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                          </svg>
                          {{ errors.serviceRole }}
                        </p>
                      </div>
  
                      <!-- Business Name (only for registered business) -->
                      <div v-if="form.serviceRole === 'REGISTEREDBUSINESS'" class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700">
                          Business Name <span class="text-red-500">*</span>
                        </label>
                        <div class="relative group">
                          <input 
                            v-model="form.businessName"
                            type="text"
                            placeholder="Enter your business name"
                            class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                            :class="{
                              'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.businessName,
                              'border-green-300 bg-green-50/50': form.businessName && !errors.businessName
                            }"
                            :style="form.businessName && !errors.businessName ? 'border-color: #045940;' : ''"
                          />
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                          </div>
                          <!-- Success Indicator -->
                          <div v-if="form.businessName && !errors.businessName" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg class="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                        <p v-if="errors.businessName" class="text-red-500 text-xs animate-fadeIn">{{ errors.businessName }}</p>
                      </div>
  
                      <!-- Services -->
                      <div class="space-y-3">
                        <label class="block text-sm font-semibold text-gray-700">
                          Services Offered <span class="text-red-500">*</span>
                        </label>
                        
                        <!-- Selected Services -->
                        <div v-if="form.services.length > 0" class="flex flex-wrap gap-2 p-3 rounded-lg border border-emerald-200" style="background-color: rgba(4, 89, 64, 0.05);">
                          <div 
                            v-for="service in form.services"
                            :key="service"
                            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                            style="background-color: #045940;"
                          >
                            {{ service }}
                            <button 
                              type="button"
                              @click="removeService(service)"
                              class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 hover:bg-white/30"
                            >
                              <svg class="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
  
                        <!-- Service Selection -->
                        <div class="relative group">
                          <select 
                            v-model="selectedService"
                            @change="addService"
                            class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                          >
                            <option value="" disabled>Select a service to add</option>
                            <option v-for="service in availableServices" :key="service" :value="service">
                              {{ service }}
                            </option>
                          </select>
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"></path>
                            </svg>
                          </div>
                        </div>
                        <p v-if="errors.services" class="text-red-500 text-xs animate-fadeIn">{{ errors.services }}</p>
                      </div>
  
                      <!-- Business Location Type -->
                      <div class="space-y-3">
                        <label class="block text-sm font-semibold text-gray-700">Business Location Type</label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div 
                            v-for="type in locationTypes"
                            :key="type.value"
                            class="relative cursor-pointer transform transition-all duration-200 hover:scale-105 active:scale-95"
                            @click="form.businessLocationType = type.value"
                          >
                            <input 
                              v-model="form.businessLocationType"
                              :value="type.value"
                              type="radio"
                              class="sr-only"
                            >
                            <div 
                              class="p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                              :class="form.businessLocationType === type.value
                                ? 'border-emerald-600 bg-emerald-50 shadow-lg ring-2 ring-emerald-200'
                                : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'"
                              :style="form.businessLocationType === type.value ? 'border-color: #045940; background-color: rgba(4, 89, 64, 0.05);' : ''"
                            >
                              <div class="flex items-center space-x-3">
                                <div 
                                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                                  :class="form.businessLocationType === type.value
                                    ? 'border-emerald-600 scale-110'
                                    : 'border-gray-300'"
                                  :style="form.businessLocationType === type.value ? 'border-color: #045940; background-color: #045940;' : ''"
                                >
                                  <div v-if="form.businessLocationType === type.value" class="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div class="flex-1">
                                  <div class="font-medium text-gray-900 text-sm">{{ type.label }}</div>
                                  <div class="text-xs text-gray-600">{{ type.description }}</div>
                                </div>
                                <div class="text-xl">{{ type.icon }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
  
                      <!-- Business Address (only for physical location) -->
                      <div v-if="form.businessLocationType === 'PHYSICAL'" class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700">
                          Business Address <span class="text-red-500">*</span>
                        </label>
                        <div class="relative group">
                          <input 
                            v-model="form.businessLocation"
                            type="text"
                            placeholder="Enter your business address"
                            class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                            :class="{
                              'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.businessLocation,
                              'border-green-300 bg-green-50/50': form.businessLocation && !errors.businessLocation
                            }"
                            :style="form.businessLocation && !errors.businessLocation ? 'border-color: #045940;' : ''"
                          />
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                          </div>
                          <!-- Success Indicator -->
                          <div v-if="form.businessLocation && !errors.businessLocation" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg class="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                        <p v-if="errors.businessLocation" class="text-red-500 text-xs animate-fadeIn">{{ errors.businessLocation }}</p>
                      </div>
                    </div>
                  </Transition>
  
                  <!-- Step 3: Bank Account Details (only for service providers) -->
                  <Transition name="step" mode="out-in">
                    <div v-if="currentStep === 3 && form.accountType === 'SERVICE_PROVIDER'" key="step3" class="space-y-4 md:space-y-6">
                      <div class="text-center mb-4 md:mb-6">
                        <div class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 md:mb-4 animate-bounce shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
                          <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                        </div>
                        <h2 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Bank Account Details</h2>
                        <p class="text-sm text-gray-600">Secure payment setup for your earnings</p>
                      </div>
  
                      <!-- Security Notice -->
                      <div class="border border-emerald-200 rounded-lg p-4" style="background-color: rgba(4, 89, 64, 0.05);">
                        <div class="flex items-start space-x-3">
                          <svg class="w-5 h-5 mt-0.5" style="color: #045940;" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                          </svg>
                          <div>
                            <h3 class="text-sm font-semibold" style="color: #045940;">🔒 Secure Payment Setup</h3>
                            <p class="text-xs mt-1" style="color: #065f46;">Your bank details are encrypted and secure. Used solely for payment processing.</p>
                          </div>
                        </div>
                      </div>
  
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Account Holder Name -->
                        <div class="space-y-2">
                          <label class="block text-sm font-semibold text-gray-700">
                            Account Holder Name <span class="text-red-500">*</span>
                          </label>
                          <div class="relative group">
                            <input 
                              v-model="form.bankDetails.accountName"
                              type="text"
                              placeholder="Full name on account"
                              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                              :class="{
                                'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.accountName,
                                'border-green-300 bg-green-50/50': form.bankDetails.accountName && !errors.accountName
                              }"
                              :style="form.bankDetails.accountName && !errors.accountName ? 'border-color: #045940;' : ''"
                            />
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                            </div>
                            <!-- Success Indicator -->
                            <div v-if="form.bankDetails.accountName && !errors.accountName" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <svg class="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                              </svg>
                            </div>
                          </div>
                          <p v-if="errors.accountName" class="text-red-500 text-xs animate-fadeIn">{{ errors.accountName }}</p>
                        </div>
  
                        <!-- Bank Name -->
                        <div class="space-y-2">
                          <label class="block text-sm font-semibold text-gray-700">
                            Bank Name <span class="text-red-500">*</span>
                          </label>
                          <div class="relative group">
                            <select 
                              v-model="form.bankDetails.bankName"
                              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                              :class="{
                                'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.bankName,
                                'border-green-300 bg-green-50/50': form.bankDetails.bankName && !errors.bankName
                              }"
                              :style="form.bankDetails.bankName && !errors.bankName ? 'border-color: #045940;' : ''"
                            >
                              <option value="" disabled>Select your bank</option>
                              <option v-for="bank in nigerianBanks" :key="bank.code" :value="bank.name">
                                {{ bank.name }}
                              </option>
                            </select>
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                              </svg>
                            </div>
                          </div>
                          <p v-if="errors.bankName" class="text-red-500 text-xs animate-fadeIn">{{ errors.bankName }}</p>
                        </div>
                      </div>
  
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Account Number -->
                        <div class="space-y-2">
                          <label class="block text-sm font-semibold text-gray-700">
                            Account Number <span class="text-red-500">*</span>
                          </label>
                          <div class="relative group">
                            <input 
                              v-model="form.bankDetails.accountNumber"
                              type="text"
                              placeholder="10-digit account number"
                              maxlength="10"
                              class="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                              :class="{
                                'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.accountNumber,
                                'border-green-300 bg-green-50/50': form.bankDetails.accountNumber && !errors.accountNumber
                              }"
                              :style="form.bankDetails.accountNumber && !errors.accountNumber ? 'border-color: #045940;' : ''"
                              @input="validateAccountNumber"
                            />
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                              </svg>
                            </div>
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <div v-if="accountVerificationStatus === 'verifying'" class="flex items-center">
                                <svg class="animate-spin h-4 w-4" style="color: #045940;" fill="none" viewBox="0 0 24 24">
                                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </div>
                              <div v-else-if="accountVerificationStatus === 'verified'" class="flex items-center">
                                <svg class="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                              </div>
                              <div v-else-if="accountVerificationStatus === 'error'" class="flex items-center">
                                <svg class="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <p v-if="errors.accountNumber" class="text-red-500 text-xs animate-fadeIn">{{ errors.accountNumber }}</p>
                          <p v-else-if="accountVerificationStatus === 'verified' && verifiedAccountName" class="text-emerald-600 text-xs flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            Account verified: {{ verifiedAccountName }}
                          </p>
                          <p v-else-if="accountVerificationStatus === 'error'" class="text-red-500 text-xs">
                            Unable to verify account. Please check details.
                          </p>
                        </div>
  
                        <!-- Bank Code -->
                        <div class="space-y-2">
                          <label class="block text-sm font-semibold text-gray-700">
                            Bank Code <span class="text-red-500">*</span>
                          </label>
                          <div class="relative group">
                            <input 
                              v-model="form.bankDetails.bankCode"
                              type="text"
                              placeholder="3-digit bank code"
                              maxlength="3"
                              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                              :class="{
                                'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.bankCode,
                                'border-green-300 bg-green-50/50': form.bankDetails.bankCode && !errors.bankCode
                              }"
                              :style="form.bankDetails.bankCode && !errors.bankCode ? 'border-color: #045940;' : ''"
                            />
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                              </svg>
                            </div>
                          </div>
                          <p v-if="errors.bankCode" class="text-red-500 text-xs animate-fadeIn">{{ errors.bankCode }}</p>
                          <p class="text-xs text-gray-500">🔒 Bank code will be auto-filled when you select your bank.</p>
                        </div>
                      </div>
                    </div>
                  </Transition>
  
                  <!-- Step 4: OTP Verification -->
                  <Transition name="step" mode="out-in">
                    <div v-if="currentStep === 4" key="step4" class="space-y-4 md:space-y-6">
                      <div class="text-center mb-4 md:mb-6">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 animate-pulse shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
                          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <h2 class="text-lg md:text-xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                        <p class="text-sm text-gray-600 mb-2">We've sent a 4-digit code to</p>
                        <p class="font-semibold mb-1" style="color: #045940;">{{ form.email }}</p>
                        <p class="text-xs text-gray-500">Enter the code below to complete registration</p>
                      </div>
  
                      <!-- OTP Input -->
                      <div class="flex justify-center space-x-3 mb-6">
                        <input 
                          v-for="(digit, index) in 4"
                          :key="index"
                          :ref="el => otpInputs[index] = el"
                          v-model="form.otpCode[index]"
                          type="text"
                          maxlength="1"
                          class="w-12 h-12 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                          :class="{
                            'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.otpCode,
                            'border-emerald-400 bg-emerald-50': form.otpCode[index] && !errors.otpCode
                          }"
                          :style="form.otpCode[index] && !errors.otpCode ? 'border-color: #045940; background-color: rgba(4, 89, 64, 0.05);' : ''"
                          @input="handleOtpInput($event, index)"
                          @keydown.delete="handleOtpDelete($event, index)"
                          @paste="handleOtpPaste($event, index)"
                        />
                      </div>
                      <p v-if="errors.otpCode" class="text-red-500 text-xs text-center animate-fadeIn">{{ errors.otpCode }}</p>
  
                      <!-- Resend OTP -->
                      <div class="text-center bg-gray-50 rounded-lg p-4">
                        <p class="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                        <button 
                          type="button"
                          @click="resendOtp"
                          :disabled="resendCooldown > 0 || resending"
                          class="inline-flex items-center px-4 py-2 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                          :style="resendCooldown === 0 && !resending ? 'color: #045940;' : ''"
                        >
                          <svg v-if="resending" class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                          <span v-if="resending">Sending...</span>
                          <span v-else-if="resendCooldown > 0">Resend in {{ resendCooldown }}s</span>
                          <span v-else>Resend Code</span>
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
  
                <!-- Enhanced Navigation Buttons -->
                <div class="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
                  <button 
                    v-if="currentStep > 1"
                    type="button"
                    @click="previousStep"
                    class="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-all duration-200 hover:bg-gray-100 rounded-lg"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back
                  </button>
                  <div v-else></div>
  
                  <button 
                    type="submit"
                    :disabled="processing || loading || isSubmitting"
                    class="flex items-center px-6 py-3 text-white font-semibold rounded-lg focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    style="background: linear-gradient(135deg, #045940 0%, #059669 100%);"
                  >
                    <span v-if="processing || loading || isSubmitting" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ getProcessingText() }}
                    </span>
                    <span v-else class="flex items-center">
                      {{ getButtonText() }}
                      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
  
      <!-- Enhanced Loading Overlay -->
      <Transition name="fade">
        <div v-if="loading || isSubmitting" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 text-center shadow-2xl transform animate-pulse">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ getLoadingText() }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ getLoadingDescription() }}</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="h-2 rounded-full animate-pulse" style="background: linear-gradient(90deg, #045940 0%, #059669 100%);" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted, watch, computed, nextTick } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  // Composables (uncomment when available)
  // import { use_auth_verify_user } from '@/composables/auth/useVerifyUser'
  // import { use_auth_resend_verify_email } from '@/composables/auth/useResendEmail'
  // import { useCreateBusiness } from '@/composables/auth/useCreateBusiness'
  
  // Mock composables for development
  const use_auth_verify_user = () => ({
    verifyUser: async () => ({ type: 'SUCCESS' }),
    loading: ref(false),
    setPayload: (payload: any) => console.log('Verify payload:', payload)
  })
  
  const use_auth_resend_verify_email = () => ({
    resendVerifyEmail: async () => ({ type: 'SUCCESS' }),
    loading: ref(false)
  })
  
  const useCreateBusiness = () => ({
    setCredentials: (credentials: any) => console.log('Credentials:', credentials),
    credential: ref(null),
    register: async () => ({ type: 'SUCCESS' }),
    loading: ref(false)
  })
  
  const { verifyUser, loading: processing, setPayload } = use_auth_verify_user()
  const { resendVerifyEmail, loading: resending } = use_auth_resend_verify_email()
  const { setCredentials, credential, register, loading } = useCreateBusiness()
  
  const router = useRouter()
  const route = useRoute()
  
  // Form state
  const currentStep = ref(1)
  const totalSteps = 4
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const selectedService = ref('')
  const isSubmitting = ref(false)
  const resendCooldown = ref(0)
  const accountVerificationStatus = ref('') // 'verifying', 'verified', 'error'
  const verifiedAccountName = ref('')
  const otpInputs = ref<HTMLInputElement[]>([])
  const googleLoading = ref(false)
  
  // Enhanced data structures
  const accountTypes = [
    {
      value: 'CLIENT',
      label: 'Client',
      description: 'Book services from providers',
      icon: '👤'
    },
    {
      value: 'SERVICE_PROVIDER',
      label: 'Service Provider',
      description: 'Offer services to clients',
      icon: '🏢'
    }
  ]
  
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
  
  interface FormData {
    accountType: 'CLIENT' | 'SERVICE_PROVIDER'
    provider: 'EMAIL' | 'GOOGLE'
    firstName: string
    lastName: string
    email: string
    phone: {
      countryCode: string
      number: string
    }
    password: string
    confirmPassword: string
    location: string
    serviceRole: 'FREELANCER' | 'REGISTEREDBUSINESS'
    businessName: string
    services: string[]
    businessLocationType: string
    businessLocation: string
    bankDetails: {
      accountName: string
      bankName: string
      accountNumber: string
      bankCode: string
    }
    otpCode: string[]
  }
  
  const form = reactive<FormData>({
    accountType: 'CLIENT',
    provider: 'EMAIL',
    firstName: '',
    lastName: '',
    email: '',
    phone: {
      countryCode: '+234',
      number: ''
    },
    password: '',
    confirmPassword: '',
    location: '',
    serviceRole: 'FREELANCER',
    businessName: '',
    services: [],
    businessLocationType: 'PHYSICAL',
    businessLocation: '',
    bankDetails: {
      accountName: '',
      bankName: '',
      accountNumber: '',
      bankCode: ''
    },
    otpCode: ['', '', '', '']
  })
  
  const errors = reactive({
    accountType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    serviceRole: '',
    businessName: '',
    services: '',
    businessLocation: '',
    accountName: '',
    bankName: '',
    accountNumber: '',
    bankCode: '',
    otpCode: ''
  })
  
  const countries = [
    { name: 'Nigeria', code: '+234' }
  ]
  
  const allowedServices = [
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
  
  // Computed properties
  const availableServices = computed(() => {
    return allowedServices.filter(service => !form.services.includes(service))
  })
  
  // Cache management
  const CACHE_KEY = 'salon_signup_form'
  
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
  
  // Methods
  const getStepTitle = () => {
    const titles = ['Account', 'Service', 'Banking', 'Verify']
    return titles[currentStep.value - 1]
  }
  
  const getStepClasses = (step: number) => {
    if (step < currentStep.value) {
      return 'border-emerald-600 text-white shadow-lg'
    } else if (step === currentStep.value) {
      return 'bg-white border-emerald-600 text-emerald-600 shadow-lg'
    } else {
      return 'bg-white border-gray-300 text-gray-400'
    }
  }
  
  const getStepLabels = () => {
    if (form.accountType === 'CLIENT') {
      return ['Account', 'Verify', '', '']
    }
    return ['Account', 'Service', 'Banking', 'Verify']
  }
  
  const getButtonText = () => {
    if (currentStep.value === totalSteps) return 'Complete Registration'
    if (form.accountType === 'CLIENT' && currentStep.value === 1) return 'Create Account'
    return 'Continue'
  }
  
  const getProcessingText = () => {
    if (currentStep.value === totalSteps) return 'Verifying...'
    if (currentStep.value === 3) return 'Creating Account...'
    return 'Processing...'
  }
  
  const getLoadingText = () => {
    if (currentStep.value === totalSteps) return 'Verifying Your Account'
    if (currentStep.value === 3) return 'Setting Up Your Business'
    return 'Processing Your Information'
  }
  
  const getLoadingDescription = () => {
    if (currentStep.value === totalSteps) return 'Please wait while we verify your email address'
    if (currentStep.value === 3) return 'We\'re creating your business profile and setting up payments'
    return 'Please wait while we process your information'
  }
  
  const validateForm = () => {
    let isValid = true
    Object.keys(errors).forEach(key => errors[key] = '')
  
    // Step 1 validation
    if (currentStep.value >= 1) {
      if (!form.accountType) {
        errors.accountType = 'Please select an account type'
        isValid = false
      }
  
      if (form.provider === 'EMAIL') {
        if (!form.firstName.trim()) {
          errors.firstName = 'First name is required'
          isValid = false
        }
  
        if (!form.lastName.trim()) {
          errors.lastName = 'Last name is required'
          isValid = false
        }
  
        if (!form.email.trim()) {
          errors.email = 'Email is required'
          isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
          errors.email = 'Please enter a valid email address'
          isValid = false
        }
  
        if (!form.phone.number.trim()) {
          errors.phone = 'Phone number is required'
          isValid = false
        } else if (!/^\d{10,11}$/.test(form.phone.number)) {
          errors.phone = 'Please enter a valid phone number (10-11 digits)'
          isValid = false
        }
  
        if (!form.password) {
          errors.password = 'Password is required'
          isValid = false
        } else if (form.password.length < 8) {
          errors.password = 'Password must be at least 8 characters'
          isValid = false
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
          errors.password = 'Password must contain uppercase, lowercase, and number'
          isValid = false
        }
  
        if (!form.confirmPassword) {
          errors.confirmPassword = 'Please confirm your password'
          isValid = false
        } else if (form.confirmPassword !== form.password) {
          errors.confirmPassword = 'Passwords do not match'
          isValid = false
        }
      }
  
      if (!form.location.trim()) {
        errors.location = 'Location is required'
        isValid = false
      }
    }
  
    // Step 2 validation (only for service providers)
    if (currentStep.value >= 2 && form.accountType === 'SERVICE_PROVIDER') {
      if (!form.serviceRole) {
        errors.serviceRole = 'Please select a service type'
        isValid = false
      }
  
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
    }
  
    // Step 3 validation (only for service providers)
    if (currentStep.value >= 3 && form.accountType === 'SERVICE_PROVIDER') {
      if (!form.bankDetails.accountName.trim()) {
        errors.accountName = 'Account holder name is required'
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
  
      if (!form.bankDetails.bankCode.trim()) {
        errors.bankCode = 'Bank code is required'
        isValid = false
      }
    }
  
    // Step 4 validation
    if (currentStep.value === 4) {
      const otpString = form.otpCode.join('')
      if (otpString.length !== 4) {
        errors.otpCode = 'Please enter the complete 4-digit code'
        isValid = false
      } else if (!/^\d{4}$/.test(otpString)) {
        errors.otpCode = 'OTP must contain only numbers'
        isValid = false
      }
    }
  
    return isValid
  }
  
  const signupWithGoogle = async () => {
    if (!form.accountType) {
      errors.accountType = 'Please select an account type first'
      return
    }
  
    googleLoading.value = true
    
    try {
      // Mock Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate Google user data
      form.provider = 'GOOGLE'
      form.firstName = 'John'
      form.lastName = 'Doe'
      form.email = 'john.doe@gmail.com'
      
      // Skip to appropriate step based on account type
      if (form.accountType === 'CLIENT') {
        await submitFormData()
      } else {
        currentStep.value = 2
        updateUrlStep(2)
      }
    } catch (error) {
      console.error('Google signup failed:', error)
    } finally {
      googleLoading.value = false
    }
  }
  
  const addService = () => {
    if (selectedService.value && !form.services.includes(selectedService.value)) {
      form.services.push(selectedService.value)
      saveFormToCache()
    }
    selectedService.value = ''
  }
  
  const removeService = (service: string) => {
    form.services = form.services.filter(s => s !== service)
    saveFormToCache()
  }
  
  const validateAccountNumber = async () => {
    if (form.bankDetails.accountNumber.length === 10 && form.bankDetails.bankName) {
      accountVerificationStatus.value = 'verifying'
      
      try {
        // Simulate account verification API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Mock verification result
        accountVerificationStatus.value = 'verified'
        verifiedAccountName.value = form.bankDetails.accountName || 'Account Verified'
      } catch (error) {
        accountVerificationStatus.value = 'error'
        console.error('Account verification failed:', error)
      }
    } else {
      accountVerificationStatus.value = ''
      verifiedAccountName.value = ''
    }
  }
  
  const handleOtpInput = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement
    const value = input.value.replace(/\D/g, '') // Only allow digits
    
    form.otpCode[index] = value
    
    if (value && index < 3) {
      const nextInput = otpInputs.value[index + 1]
      if (nextInput) nextInput.focus()
    }
  }
  
  const handleOtpDelete = (event: KeyboardEvent, index: number) => {
    if (event.key === 'Backspace' && !form.otpCode[index] && index > 0) {
      const prevInput = otpInputs.value[index - 1]
      if (prevInput) prevInput.focus()
    }
  }
  
  const handleOtpPaste = (event: ClipboardEvent, index: number) => {
    event.preventDefault()
    const paste = event.clipboardData?.getData('text') || ''
    const digits = paste.replace(/\D/g, '').slice(0, 4)
    
    for (let i = 0; i < digits.length && (index + i) < 4; i++) {
      form.otpCode[index + i] = digits[i]
    }
    
    // Focus the last filled input or the next empty one
    const lastIndex = Math.min(index + digits.length - 1, 3)
    const nextEmptyIndex = form.otpCode.findIndex((code, i) => i > lastIndex && !code)
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : lastIndex
    
    if (otpInputs.value[focusIndex]) {
      otpInputs.value[focusIndex].focus()
    }
  }
  
  const nextStep = async () => {
    if (!validateForm()) return
    
    // For clients, skip directly to account creation after step 1
    if (form.accountType === 'CLIENT' && currentStep.value === 1) {
      await submitFormData()
      return
    }
    
    if (currentStep.value === 3 && form.accountType === 'SERVICE_PROVIDER') {
      // Submit form data with bank details and create account
      await submitFormData()
    } else if (currentStep.value < totalSteps) {
      currentStep.value++
      updateUrlStep(currentStep.value)
      saveFormToCache()
    }
  }
  
  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
      updateUrlStep(currentStep.value)
      saveFormToCache()
    }
  }
  
  const updateUrlStep = (step: number) => {
    router.replace({ query: { ...route.query, step: step.toString() } })
  }
  
  const navigateToStep = (step: number) => {
    // Only allow navigation to completed steps or current step
    if (step <= currentStep.value) {
      currentStep.value = step
      updateUrlStep(step)
    }
  }
  
  const submitFormData = async () => {
    isSubmitting.value = true
    
    try {
      let payload: any
      
      if (form.accountType === 'CLIENT') {
        // Client payload
        payload = {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          provider: form.provider,
          role: 'CLIENT',
          location: form.location
        }
        
        // Add password and phone for email signup
        if (form.provider === 'EMAIL') {
          payload.password = form.password
          payload.phoneNum = form.phone.countryCode + form.phone.number
        }
      } else {
        // Service provider payload
        payload = {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          provider: form.provider,
          role: 'SERVICEPROVIDER',
          serviceProvider: {
            serviceRole: form.serviceRole,
            businessName: form.businessName || `${form.firstName} ${form.lastName}`,
            serviceTypes: form.services,
            businessLocationType: form.businessLocationType,
            businessLocation: form.businessLocationType === 'PHYSICAL' ? form.businessLocation : null
          }
        }
        
        // Add password and phone for email signup
        if (form.provider === 'EMAIL') {
          payload.password = form.password
          payload.phoneNum = form.phone.countryCode + form.phone.number
        }
        
        // Add bank details for service providers
        if (form.bankDetails.accountName) {
          payload.serviceProvider.serviceProviderAccount = {
            bankName: form.bankDetails.bankName,
            accountNumber: form.bankDetails.accountNumber,
            accountName: form.bankDetails.accountName,
            bankCode: form.bankDetails.bankCode
          }
        }
      }
      
      setCredentials(payload)
      const result = await register()
      
      if (result.type !== 'ERROR') {
        currentStep.value = 4
        updateUrlStep(4)
        saveFormToCache()
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error('Error submitting form data:', error)
      // Handle error appropriately
    } finally {
      isSubmitting.value = false
    }
  }
  
  const resendOtp = async () => {
    if (resendCooldown.value > 0) return
    
    try {
      await resendVerifyEmail()
      resendCooldown.value = 60
      
      const countdown = setInterval(() => {
        resendCooldown.value--
        if (resendCooldown.value <= 0) {
          clearInterval(countdown)
        }
      }, 1000)
    } catch (error) {
      console.error('Error resending OTP:', error)
    }
  }
  
  const handleSubmit = async () => {
    if (!validateForm()) return
    
    if (currentStep.value < totalSteps) {
      await nextStep()
    } else {
      // Final step - verify OTP
      isSubmitting.value = true
      
      try {
        const payload = {
          email: form.email,
          otp: form.otpCode.join('')
        }
        
        setPayload(payload)
        const result = await verifyUser()
        
        if (result.type !== 'ERROR') {
          // Success - clear cache and redirect
          clearFormCache()
          await router.push('/success')
        } else {
          throw new Error('OTP verification failed')
        }
      } catch (error) {
        console.error('Error during OTP verification:', error)
        errors.otpCode = 'Invalid verification code. Please try again.'
      } finally {
        isSubmitting.value = false
      }
    }
  }
  
  const getPasswordStrength = () => {
    const password = form.password
    let strength = 0
    
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    
    return Math.min(strength, 4)
  }
  
  const getPasswordStrengthClass = (index: number) => {
    const strength = getPasswordStrength()
    if (index <= strength) {
      if (strength <= 1) return 'bg-red-400'
      if (strength <= 2) return 'bg-yellow-400'
      if (strength <= 3) return 'bg-blue-400'
      return 'bg-emerald-400'
    }
    return 'bg-gray-200'
  }
  
  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength()
    if (strength <= 1) return 'Weak password'
    if (strength <= 2) return 'Fair password'
    if (strength <= 3) return 'Good password'
    return 'Strong password'
  }
  
  const getPasswordStrengthTextClass = () => {
    const strength = getPasswordStrength()
    if (strength <= 1) return 'text-red-500'
    if (strength <= 2) return 'text-yellow-500'
    if (strength <= 3) return 'text-blue-500'
    return 'text-emerald-500'
  }
  
  // Watchers
  watch(() => route.query.step, (newStep) => {
    if (newStep) {
      currentStep.value = parseInt(newStep as string)
    }
  })
  
  // Auto-fill account holder name when first/last name changes
  watch([() => form.firstName, () => form.lastName], ([firstName, lastName]) => {
    if (firstName && lastName && !form.bankDetails.accountName) {
      form.bankDetails.accountName = `${firstName} ${lastName}`
    }
  })
  
  // Auto-fill bank code when bank is selected
  watch(() => form.bankDetails.bankName, (bankName) => {
    if (bankName) {
      const bank = nigerianBanks.find(b => b.name === bankName)
      if (bank) {
        form.bankDetails.bankCode = bank.code
      }
    }
  })
  
  // Save form to cache on changes
  watch(form, () => {
    saveFormToCache()
  }, { deep: true })
  
  // Update total steps based on account type
  watch(() => form.accountType, (accountType) => {
    if (accountType === 'CLIENT') {
      totalSteps = 2 // Account + Verify
    } else {
      totalSteps = 4 // Account + Service + Banking + Verify
    }
    saveFormToCache()
  })
  
  // Lifecycle
  onMounted(() => {
    // Load cached form data
    loadFormFromCache()
    
    // Set step from URL
    const stepFromUrl = route.query.step
    if (stepFromUrl) {
      currentStep.value = parseInt(stepFromUrl as string)
    }
  })

  definePageMeta({
    layout: 'auth'
  })
  </script>
  
  <style scoped>
  /* Transition classes */
  .step-enter-active,
  .step-leave-active {
    transition: all 0.3s ease;
  }
  
  .step-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .step-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #045940, #059669);
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #034732, #047857);
  }
  
  /* Focus styles */
  input:focus,
  select:focus {
    outline: none;
  }
  
  /* Enhanced animations */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-10px); }
    70% { transform: translateY(-5px); }
    90% { transform: translateY(-2px); }
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-bounce {
    animation: bounce 2s infinite;
  }
  
  /* Mobile-first responsive design */
  @media (max-width: 640px) {
    .min-h-screen {
      min-height: 100vh;
      min-height: 100dvh; /* Dynamic viewport height for mobile */
    }
    
    /* Ensure form fits in viewport */
    .relative.min-h-\[500px\] {
      min-height: auto;
    }
    
    /* Better touch targets */
    button, input, select {
      min-height: 44px;
    }
    
    /* Improved spacing on mobile */
    .space-y-4 > * + * {
      margin-top: 1rem;
    }
    
    .space-y-6 > * + * {
      margin-top: 1.5rem;
    }
  }
  
  /* Improved focus states for accessibility */
  input:focus, select:focus, button:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  
  /* Better hover states on touch devices */
  @media (hover: hover) {
    .hover\:scale-105:hover {
      transform: scale(1.05);
    }
    
    .hover\:shadow-lg:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }
  
  /* Prevent zoom on input focus on iOS */
  @media screen and (max-width: 768px) {
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="password"],
    select {
      font-size: 16px;
    }
  }
  
  /* Custom scrollbar for mobile */
  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(4, 89, 64, 0.3);
    border-radius: 2px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(4, 89, 64, 0.5);
  }
  </style>