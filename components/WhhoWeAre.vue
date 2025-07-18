<template>
    <section class="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <!-- Text Content -->
          <div class="space-y-8 fade-in-left">
            <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#045940] leading-tight">
              Who We Are
            </h2>
            
            <p class="text-[#5D6066] font-[400] text-base  sm:text-xl leading-loose">
              Built for Beauty Professionals. Designed for Everyday Clients. Elysian 
              Beauty is a beauty services marketplace that connects clients to verified 
              hairstylists, makeup artists, and nail technicians in major Nigerian cities. 
              We eliminate no-shows, unverified "plugs," and unstructured booking — 
              giving users professional beauty services with real accountability
            </p>
            
            <div class="pt-4">
              <button class="group inline-flex items-center px-8 py-4 border border-gray-800 rounded-full text-[#121212] font-semibold text-lg  transition-all duration-300 ease-in-out transform hover:scale-105">
                Learn more about our company
                <svg class="ml-3" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.91667 0.75V2.41667H10.4083L0.75 12.075L1.925 13.25L11.5833 3.59167V9.08333H13.25V0.75H4.91667Z" fill="#121212"/>
</svg>

              </button>
            </div>
          </div>
          
          <!-- Image -->
          <div class="fade-in-right">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="@/assets/img/about4.png" 
                alt="Beauty professionals providing makeup services" 
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  // Component logic can be added here if needed
  </script>