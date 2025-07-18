<template>
    <section class="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-12 fade-in-up">
          <p class="text-sm text-[#04594D] mb-2 font-medium">Top-Rated Services Near You</p>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 mb-8">
            Explore trending beauty services:
          </h2>
        </div>
  
        <!-- Services Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gapy-6 lg:gap-8 mb-12 stagger-children">
          <!-- Barbing Service -->
          <div class="group rounded-2xl  transition-all duration-300 transform hover:scale-105 overflow-hidden">
          <div class="relative h-48 sm:h-56 overflow-hidden rounded-2xl">
            <img 
              src="@/assets/img/service1.png" 
              alt="Professional barbing service"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-2xl"
            />
            <div class="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
          <div class="py-6">
            <div class="flex items-start gap-3">
              <img src="@/assets/img/service-logo1.png" class="w-12 h-12" />
              <!-- <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div> -->
              <div>
                <h3 class="font-bold text-gray-800 text-lg mb-2">Barbing Service</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Precision grooming for men and boys. 
                  Including fades, trims, and beard styling.
                </p>
              </div>
            </div>
          </div>
        </div>
  
          <!-- Hair Styling -->
          <div class="group transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div class="relative h-48 sm:h-56 rounded-2xl overflow-hidden">
              <img 
              src="@/assets/img/service2.png" 
                alt="Professional hair styling service"
                class="w-full h-full rounded-2xl object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
            <div class="py-6">
              <div class="flex items-start gap-3">
                <img src="@/assets/img/service-logo2.png" class="w-12 h-12" />
                <!-- <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> -->
                <div>
                  <h3 class="font-bold text-gray-800 text-lg mb-2">Hair Styling</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    From braids and silk press to wig 
                    installations and protective styles that 
                    reflects your beauty.
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Makeup & Gele -->
          <div class="group transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div class="relative h-48 sm:h-56 rounded-2xl overflow-hidden">
              <img 
              src="@/assets/img/service3.png" 
                alt="Makeup and gele styling service"
                class="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
            <div class="py-6">
              <div class="flex items-start gap-3">
                <!-- <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> -->
                <img src="@/assets/img/service-logo3.png" class="w-12 h-12" />
                <div>
                  <h3 class="font-bold text-gray-800 text-lg mb-2">Makeup & Gele</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Book certified artists for bridal looks, 
                    event glam and traditional gele styling.
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Nail & Lash Services -->
          <div class="group transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div class="relative h-48 sm:h-56 rounded-2xl overflow-hidden">
              <img 
              src="@/assets/img/service4.png" 
                alt="Nail and lash services"
                class="w-full h-full object-cover rounded-2xl group-hover:rounded-2xl group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
            <div class="py-6">
              <div class="flex items-start gap-3">
                <!-- <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> -->
                <img src="@/assets/img/service-logo4.png" class="w-12 h-12" />
                <div>
                  <h3 class="font-bold text-gray-800 text-lg mb-2">Nail & Lash Services</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Gel manicures, pedicures, lash 
                    extensions, and more by skilled technicians.
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Skincare & Spa Treatments -->
          <div class="group transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div class="relative h-48 sm:h-56 rounded-2xl overflow-hidden">
              <img 
              src="@/assets/img/service5.png" 
                alt="Skincare and spa treatments"
                class="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
            <div class="py-6">
              <div class="flex items-start gap-3">
                <!-- <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> -->
                <img src="@/assets/img/service-logo5.png" class="w-12 h-12" />
                <div>
                  <h3 class="font-bold text-gray-800 text-lg mb-2">Skincare & Spa Treatments</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Facials, exfoliation, and spa 
                    treatments, and deep skin rejuvenation.
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Massage Therapy -->
          <div class="group  transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div class="relative h-48 sm:h-56 rounded-2xl overflow-hidden">
              <img 
              src="@/assets/img/service6.png" 
                alt="Professional massage therapy"
                class="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
            <div class="py-6">
              <div class="flex items-start gap-3">
                <img src="@/assets/img/service-logo6.png" class="w-12 h-12" />
                <!-- <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> -->
                <div>
                  <h3 class="font-bold text-gray-800 text-lg mb-2">Massage Therapy</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Swedish, deep tissue or sports massage by 
                    licensed therapists — wherever you are.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Bottom Section -->
        <div class="text-center fade-in-up" style="animation-delay: 0.8s;">
          <p class="text-gray-600 text-[25px] mb-8 font-bold mx-auto leading-relaxed">
            We're Serving major cities across Nigeria — with new professionals joining every week.
          </p>
          
          <button class="group inline-flex items-center gap-3 px-8 py-4 border border-[#121212] rounded-full text-gray-800 font-medium text-lg hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105">
            Learn more about our company
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.41667 0.488281V2.15495H9.90833L0.25 11.8133L1.425 12.9883L11.0833 3.32995V8.82161H12.75V0.488281H4.41667Z" fill="#121212"/>
                </svg>
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  // Component logic can be added here if needed
  </script>