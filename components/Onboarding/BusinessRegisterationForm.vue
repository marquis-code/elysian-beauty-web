<template>
  <div class="min-h-screen  relative overflow-x-hidden">
    <div class="relative z-10 min-h-screen flex flex-col">
      <!-- Mobile-Optimized Header -->
      <header class="p-3 md:p-6 bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-20">
        <div class="max-w-4xl mx-auto">
          <!-- Top Row: Logo and Step Counter -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2 md:space-x-3">
              <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
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
              <div class="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <div class="text-white font-bold text-sm md:text-base">{{ Math.round((currentStep / totalSteps) * 100) }}%</div>
              </div>
            </div>
          </div>

          <!-- Enhanced Progress Bar -->
          <div class="relative">
            <!-- Background Progress Line -->
            <div class="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 rounded-full"></div>
            <div 
              class="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
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
                      'text-blue-600': step === currentStep,
                      'text-green-600': step < currentStep,
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
      <main class="flex-1 p-3 md:p-6">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
            <form @submit.prevent="handleSubmit" class="p-4 md:p-8">
              <!-- Step Content with Enhanced Animations -->
              <div class="relative min-h-[500px] md:min-h-[600px]">
                <!-- Step 1: Personal Information -->
                <Transition name="step" mode="out-in">
                  <div v-if="currentStep === 1" key="step1" class="space-y-4 md:space-y-6">
                    <div class="text-center mb-4 md:mb-6">
                      <div class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-3 md:mb-4 animate-bounce">
                        <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <h2 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Personal Information</h2>
                      <p class="text-sm text-gray-600">Let's start with your basic details</p>
                    </div>

                    <!-- Business Type Selection -->
                    <div class="space-y-3">
                      <label class="block text-sm font-semibold text-gray-700">Business Type</label>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div 
                          v-for="type in businessTypes" 
                          :key="type.value"
                          class="relative cursor-pointer transform transition-all duration-200 hover:scale-105 active:scale-95"
                          @click="form.businessType = type.value"
                        >
                          <input 
                            v-model="form.businessType" 
                            :value="type.value" 
                            type="radio" 
                            class="sr-only"
                          >
                          <div 
                            class="p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                            :class="form.businessType === type.value 
                              ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200' 
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'"
                          >
                            <div class="flex items-center space-x-3">
                              <div 
                                class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                                :class="form.businessType === type.value 
                                  ? 'border-blue-500 bg-blue-500 scale-110' 
                                  : 'border-gray-300'"
                              >
                                <div v-if="form.businessType === type.value" class="w-2 h-2 bg-white rounded-full"></div>
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
                      <p v-if="errors.businessType" class="text-red-500 text-xs flex items-center animate-shake">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        {{ errors.businessType }}
                      </p>
                    </div>

                    <!-- Personal Details -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <!-- Full Name -->
                      <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700">
                          Full Name <span class="text-red-500">*</span>
                        </label>
                        <div class="relative group">
                          <input 
                            v-model="form.fullName"
                            type="text"
                            placeholder="Enter your full name"
                            class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                            :class="{ 
                              'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.fullName,
                              'border-green-300 bg-green-50/50': form.fullName && !errors.fullName
                            }"
                          />
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                          </div>
                          <!-- Success Indicator -->
                          <div v-if="form.fullName && !errors.fullName" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                        <p v-if="errors.fullName" class="text-red-500 text-xs animate-fadeIn">{{ errors.fullName }}</p>
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
                            class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                            :class="{ 
                              'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.email,
                              'border-green-300 bg-green-50/50': form.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                            }"
                          />
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <!-- Success Indicator -->
                          <div v-if="form.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                        <p v-if="errors.email" class="text-red-500 text-xs animate-fadeIn">{{ errors.email }}</p>
                      </div>
                    </div>

                    <!-- Phone Number -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-gray-700">
                        Phone Number <span class="text-red-500">*</span>
                      </label>
                      <div class="flex space-x-3">
                        <div class="w-20 sm:w-24">
                          <select 
                            v-model="form.phone.countryCode"
                            class="w-full px-2 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
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
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                            :class="{ 
                              'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.phone,
                              'border-green-300 bg-green-50/50': form.phone.number && !errors.phone
                            }"
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
                            class="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                            :class="{ 
                              'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.password,
                              'border-green-300 bg-green-50/50': form.password && !errors.password && form.password.length >= 8
                            }"
                          />
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                          </div>
                          <button 
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
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
                            class="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                            :class="{ 
                              'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.confirmPassword,
                              'border-green-300 bg-green-50/50': form.confirmPassword && form.confirmPassword === form.password && !errors.confirmPassword
                            }"
                          />
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                          </div>
                          <button 
                            type="button"
                            @click="showConfirmPassword = !showConfirmPassword"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
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
                            <svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                        <p v-if="errors.confirmPassword" class="text-red-500 text-xs animate-fadeIn">{{ errors.confirmPassword }}</p>
                      </div>
                    </div>
                  </div>
                </Transition>

                <!-- Step 2: Business Details -->
              <Transition name="step" mode="out-in">
                <div v-if="currentStep === 2" key="step2" class="space-y-4 md:space-y-6">
                  <div class="text-center mb-4 md:mb-6">
                    <div class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-3 md:mb-4 animate-bounce">
                      <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                    <h2 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Business Details</h2>
                    <p class="text-sm text-gray-600">Tell us about your {{ form.businessType === 'Freelancer' ? 'services' : 'business' }}</p>
                  </div>

                  <!-- Business Name (only for Business type) -->
                  <div v-if="form.businessType === 'Business'" class="space-y-2">
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
                      />
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <!-- Success Indicator -->
                      <div v-if="form.businessName && !errors.businessName" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
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
                    <div v-if="form.services.length > 0" class="flex flex-wrap gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div 
                        v-for="service in form.services" 
                        :key="service"
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500 text-white"
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

                    <!-- Other Service Input -->
                    <div v-if="form.services.includes('Other')" class="relative group">
                      <input 
                        v-model="form.otherServiceType"
                        type="text"
                        placeholder="Please specify your service"
                        class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                      />
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </div>
                    </div>
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
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg ring-2 ring-emerald-200' 
                            : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'"
                        >
                          <div class="flex items-center space-x-3">
                            <div 
                              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                              :class="form.businessLocationType === type.value 
                                ? 'border-emerald-500 bg-emerald-500 scale-110' 
                                : 'border-gray-300'"
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

                  <!-- Business Address -->
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">
                      {{ form.businessType === 'Freelancer' ? 'Home' : 'Business' }} Address <span class="text-red-500">*</span>
                    </label>
                    <div class="relative group">
                      <input 
                        v-model="form.businessAddress"
                        type="text"
                        placeholder="Enter your full address"
                        class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 group-hover:border-emerald-300"
                        :class="{ 
                          'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.businessAddress,
                          'border-green-300 bg-green-50/50': form.businessAddress && !errors.businessAddress
                        }"
                      />
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <!-- Success Indicator -->
                      <div v-if="form.businessAddress && !errors.businessAddress" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.businessAddress" class="text-red-500 text-xs animate-fadeIn">{{ errors.businessAddress }}</p>
                  </div>
                </div>
              </Transition>

              <!-- Step 3: Bank Account Details -->
              <Transition name="step" mode="out-in">
                <div v-if="currentStep === 3" key="step3" class="space-y-4 md:space-y-6">
                  <div class="text-center mb-4 md:mb-6">
                    <div class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-3 md:mb-4 animate-bounce">
                      <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                      </svg>
                    </div>
                    <h2 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Bank Account Details</h2>
                    <p class="text-sm text-gray-600">Secure payment setup for your earnings</p>
                  </div>

                  <!-- Security Notice -->
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="flex items-start space-x-3">
                      <svg class="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                      </svg>
                      <div>
                        <h3 class="text-sm font-semibold text-blue-800">🔒 Secure Payment Setup</h3>
                        <p class="text-xs text-blue-700 mt-1">Your bank details are encrypted and secure. Used solely for payment processing.</p>
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
                          v-model="form.bankDetails.accountHolderName"
                          type="text"
                          placeholder="Full name on account"
                          class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 group-hover:border-purple-300"
                          :class="{ 
                            'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.accountHolderName,
                            'border-green-300 bg-green-50/50': form.bankDetails.accountHolderName && !errors.accountHolderName
                          }"
                        />
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg class="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                        <!-- Success Indicator -->
                        <div v-if="form.bankDetails.accountHolderName && !errors.accountHolderName" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <p v-if="errors.accountHolderName" class="text-red-500 text-xs animate-fadeIn">{{ errors.accountHolderName }}</p>
                    </div>

                    <!-- Bank Name -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-gray-700">
                        Bank Name <span class="text-red-500">*</span>
                      </label>
                      <div class="relative group">
                        <select 
                          v-model="form.bankDetails.bankName"
                          class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 group-hover:border-purple-300"
                          :class="{ 
                            'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.bankName,
                            'border-green-300 bg-green-50/50': form.bankDetails.bankName && !errors.bankName
                          }"
                        >
                          <option value="" disabled>Select your bank</option>
                          <option v-for="bank in nigerianBanks" :key="bank.code" :value="bank.name">
                            {{ bank.name }}
                          </option>
                        </select>
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg class="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          class="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 group-hover:border-purple-300"
                          :class="{ 
                            'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.accountNumber,
                            'border-green-300 bg-green-50/50': form.bankDetails.accountNumber && !errors.accountNumber
                          }"
                          @input="validateAccountNumber"
                        />
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg class="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <div v-if="accountVerificationStatus === 'verifying'" class="flex items-center">
                            <svg class="animate-spin h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                          <div v-else-if="accountVerificationStatus === 'verified'" class="flex items-center">
                            <svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
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
                      <p v-else-if="accountVerificationStatus === 'verified' && verifiedAccountName" class="text-green-600 text-xs flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Account verified: {{ verifiedAccountName }}
                      </p>
                      <p v-else-if="accountVerificationStatus === 'error'" class="text-red-500 text-xs">
                        Unable to verify account. Please check details.
                      </p>
                    </div>

                    <!-- BVN -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-gray-700">
                        BVN <span class="text-red-500">*</span>
                      </label>
                      <div class="relative group">
                        <input 
                          v-model="form.bankDetails.bvn"
                          type="text"
                          placeholder="11-digit BVN"
                          maxlength="11"
                          class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 group-hover:border-purple-300"
                          :class="{ 
                            'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.bvn,
                            'border-green-300 bg-green-50/50': form.bankDetails.bvn && !errors.bvn
                          }"
                        />
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg class="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                          </svg>
                        </div>
                      </div>
                      <p v-if="errors.bvn" class="text-red-500 text-xs animate-fadeIn">{{ errors.bvn }}</p>
                      <p class="text-xs text-gray-500">🔒 Required for identity verification and compliance.</p>
                    </div>
                  </div>
                </div>
              </Transition>

              <!-- Step 4: OTP Verification -->
              <Transition name="step" mode="out-in">
                <div v-if="currentStep === 4" key="step4" class="space-y-4 md:space-y-6">
                  <div class="text-center mb-4 md:mb-6">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4 animate-pulse">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h2 class="text-lg md:text-xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                    <p class="text-sm text-gray-600 mb-2">We've sent a 4-digit code to</p>
                    <p class="font-semibold text-blue-600 mb-1">{{ form.email }}</p>
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
                      class="w-12 h-12 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                      :class="{
                        'border-red-300 focus:ring-red-500/20 focus:border-red-500 animate-shake': errors.otpCode,
                        'border-green-400 bg-green-50': form.otpCode[index] && !errors.otpCode
                      }"
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
                      class="inline-flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
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
                  class="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
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
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">{{ getLoadingText() }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ getLoadingDescription() }}</p>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full animate-pulse" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Real composables - uncommented
import { use_auth_verify_user } from '@/composables/auth/useVerifyUser'
import { use_auth_resend_verify_email } from '@/composables/auth/useResendEmail'
import { useCreateBusiness } from '@/composables/auth/useCreateBusiness'

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

// Enhanced data structures
const businessTypes = [
  {
    value: 'Freelancer',
    label: 'Freelancer',
    description: 'Individual service provider',
    icon: '👤'
  },
  {
    value: 'Business',
    label: 'Business',
    description: 'Registered business entity',
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
  businessType: 'Freelancer' | 'Business'
  fullName: string
  email: string
  phone: {
    countryCode: string
    number: string
  }
  password: string
  confirmPassword: string
  businessName: string
  services: string[]
  otherServiceType: string
  businessLocationType: string
  businessAddress: string
  bankDetails: {
    accountHolderName: string
    bankName: string
    accountNumber: string
    bvn: string
  }
  otpCode: string[]
}

const form = reactive<FormData>({
  businessType: 'Freelancer',
  fullName: '',
  email: '',
  phone: {
    countryCode: '+234',
    number: ''
  },
  password: '',
  confirmPassword: '',
  businessName: '',
  services: [],
  otherServiceType: '',
  businessLocationType: 'PHYSICAL',
  businessAddress: '',
  bankDetails: {
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    bvn: ''
  },
  otpCode: ['', '', '', '']
})

const errors = reactive({
  businessType: '',
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  businessName: '',
  businessAddress: '',
  accountHolderName: '',
  bankName: '',
  accountNumber: '',
  bvn: '',
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

// Methods
const getStepTitle = () => {
  const titles = ['Personal', 'Business', 'Banking', 'Verify']
  return titles[currentStep.value - 1]
}

const getStepClasses = (step: number) => {
  if (step < currentStep.value) {
    return 'bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-500 text-white shadow-lg'
  } else if (step === currentStep.value) {
    return 'bg-white border-blue-500 text-blue-600 shadow-lg'
  } else {
    return 'bg-white border-gray-300 text-gray-400'
  }
}

const getButtonText = () => {
  if (currentStep.value === totalSteps) return 'Complete Registration'
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
    if (!form.businessType) {
      errors.businessType = 'Please select a business type'
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

  // Step 2 validation
  if (currentStep.value >= 2) {
    if (form.businessType === 'Business' && !form.businessName.trim()) {
      errors.businessName = 'Business name is required'
      isValid = false
    }
    if (form.services.length === 0) {
      errors.businessAddress = 'Please select at least one service'
      isValid = false
    }
    if (!form.businessAddress.trim()) {
      errors.businessAddress = 'Address is required'
      isValid = false
    }
  }

  // Step 3 validation
  if (currentStep.value >= 3) {
    if (!form.bankDetails.accountHolderName.trim()) {
      errors.accountHolderName = 'Account holder name is required'
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
    if (!form.bankDetails.bvn.trim()) {
      errors.bvn = 'BVN is required'
      isValid = false
    } else if (!/^\d{11}$/.test(form.bankDetails.bvn)) {
      errors.bvn = 'BVN must be exactly 11 digits'
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

const addService = () => {
  if (selectedService.value && !form.services.includes(selectedService.value)) {
    form.services.push(selectedService.value)
  }
  selectedService.value = ''
}

const removeService = (service: string) => {
  form.services = form.services.filter(s => s !== service)
  if (service === 'Other') {
    form.otherServiceType = ''
  }
}

const validateAccountNumber = async () => {
  if (form.bankDetails.accountNumber.length === 10 && form.bankDetails.bankName) {
    accountVerificationStatus.value = 'verifying'
    
    try {
      // Simulate account verification API call
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock verification result - replace with actual API response
      accountVerificationStatus.value = 'verified'
      verifiedAccountName.value = form.bankDetails.accountHolderName || 'Account Verified'
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
  
  if (currentStep.value === 3) {
    // Submit form data with bank details and create account
    await submitFormData()
  } else if (currentStep.value < totalSteps) {
    currentStep.value++
    updateUrlStep(currentStep.value)
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    updateUrlStep(currentStep.value)
  }
}

const updateUrlStep = (step: number) => {
  router.replace({ query: { ...route.query, step: step.toString() } })
}

const submitFormData = async () => {
  isSubmitting.value = true
  
  try {
    const mappedCredential = {
      firstName: form.fullName.split(' ')[0],
      lastName: form.fullName.split(' ').slice(1).join(' '),
      email: form.email,
      provider: 'EMAIL',
      password: form.password,
      role: 'SERVICEPROVIDER',
      businessLocation: form.businessAddress,
      serviceProvider: {
        serviceRole: form.businessType === 'Freelancer' ? 'FREELANCER' : 'REGISTEREDBUSINESS',
        businessName: form.businessName || form.fullName,
        serviceTypes: form.services.length > 0 ? form.services : ['Other'],
        otherServiceType: form.otherServiceType || form.services.join(', '),
        businessLocationType: form.businessLocationType.toUpperCase(),
      },
      bankDetails: {
        accountHolderName: form.bankDetails.accountHolderName,
        bankName: form.bankDetails.bankName,
        accountNumber: form.bankDetails.accountNumber,
        bvn: form.bankDetails.bvn
      }
    }

    setCredentials(mappedCredential)
    const result = await register()
    
    if (result.type !== 'ERROR') {
      currentStep.value = 4
      updateUrlStep(4)
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
        // Success - redirect to success page
        await router.push('/business/success')
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

// Watchers
watch(() => route.query.step, (newStep) => {
  if (newStep) {
    currentStep.value = parseInt(newStep as string)
  }
})

// Auto-fill account holder name when full name changes
watch(() => form.fullName, (newName) => {
  if (newName && !form.bankDetails.accountHolderName) {
    form.bankDetails.accountHolderName = newName
  }
})

// Lifecycle
onMounted(() => {
  const stepFromUrl = route.query.step
  if (stepFromUrl) {
    currentStep.value = parseInt(stepFromUrl as string)
  }
})

// Add these methods to your existing methods
const getStepLabels = () => {
  return ['Personal', 'Business', 'Banking', 'Verify']
}

const navigateToStep = (step: number) => {
  // Only allow navigation to completed steps or current step
  if (step <= currentStep.value) {
    currentStep.value = step
    updateUrlStep(step)
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
    return 'bg-green-400'
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
  return 'text-green-500'
}
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
  background: linear-gradient(to bottom, #3b82f6, #6366f1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #4f46e5);
}

/* Focus styles */
input:focus,
select:focus {
  outline: none;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* Enhanced animations and mobile optimizations */
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
  background: rgba(59, 130, 246, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}
</style>