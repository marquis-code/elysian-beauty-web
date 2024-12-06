<template>
  <div class="container mx-auto px-4 lg:px-12 py-8">

    <!-- Mission Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
      <!-- Text Content -->
      <div>
        <div class="flex items-center space-x-2 mb-4">
          <span class="text-black text-sm border-[#F0F0F0] border font-medium flex items-center gap-x-3 px-4 py-2 rounded-full">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.10002" cy="5.79961" r="5.7" fill="black"/>
            </svg>
            To the vendors</span>
        </div>
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Tailored Selfcare
          Solutions for Every Client
        </h2>
        <p class="text-lg text-gray-600 mb-4">
          At Elysian Beauty, our mission is to provide clients with seamless real beauty solutions tailored to their unique needs, ensuring a rewarding and fulfilling experience at every step.
        </p>
        <p class="text-lg text-gray-600">
          At Elysian Beauty, our mission is to provide clients with seamless real beauty solutions tailored to their unique needs, ensuring a rewarding and fulfilling experience at every step.
        </p>
      </div>

      <!-- Image -->
      <div>
        <img
            src="@/assets/img/service.png"
            alt="Mission"
            class="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </section>

    <!-- Another Mission Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <!-- Image -->
      <div>
        <img
            src="@/assets/img/service2.png"
            alt="Mission"
            class="w-full h-auto rounded-lg object-cover"
        />
      </div>
      <!-- Text Content -->
      <div>
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Tailored Selfcare Solutions for Every Client
        </h2>
        <p class="text-lg text-gray-600">
          At Elysian Beauty, our mission is to provide clients with seamless real beauty solutions tailored to their unique needs, ensuring a rewarding and fulfilling experience at every step. At Elysian Beauty, our mission is to provide clients with seamless real beauty solutions tailored to their unique needs, ensuring a rewarding and fulfilling experience at every step.At Elysian Beauty, our mission is to provide clients with seamless real beauty solutions tailored to their unique needs, ensuring a rewarding and fulfilling experience at every step.
        </p>
      </div>
    </section>
  </div>
  <CoreValues />
</template>
<script setup lang="ts">
</script>