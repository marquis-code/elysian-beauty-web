<template>
  <div class="container mx-auto px-4  lg:px-12 py-8">

    <div class="flex justify-center items-center flex-col mb-16">
      <div class="flex items-center space-x-2 mb-4">
          <span class="bg-[#045940] flex items-center gap-x-2 text-white text-sm font-medium px-4 py-3 rounded-full">
               <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.60002" cy="6.60039" r="5.7" fill="#FFD23F"/>
          </svg>
          Our Services</span>
        </div>
        <p class="lg:text-xl text-lg text-[#505554] font-normal max-w-5xl leading-loose mb-4">
          Discover Elysian Beauty’s full spectrum of professional beauty services — tailored for every skin tone, style, and occasion. Whether you’re preparing for a big day, maintaining your look, or simply in need of pampering, we connect you with trusted beauty professionals who deliver high-quality, on-demand services at your convenience — in-studio or at home
        </p>
    </div>

    <!-- Mission Section -->
    <section class="grid grid-cols-1 pb-20 lg:grid-cols-2 gap-8 items-center my-16">
      <!-- Text Content -->
      <div>
        <div class="flex items-center space-x-2 mb-4">
          <span class="text-black text-sm border-[#F0F0F0] border font-medium flex items-center gap-x-3 px-4 py-2 rounded-full">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.10002" cy="5.79961" r="5.7" fill="black"/>
            </svg>
            To the vendors</span>
        </div>
        <h2 class="text-2xl lg:text-5xl font-bold text-gray-900 mb-4">
          Tailored Selfcare
          Solutions for Every Client
        </h2>
        <p class="lg:text-xl text-lg text-[#505554] leading-relaxed mb-4">
          At Elysian Beauty, we believe that self-care should be as unique as you are. Our personalized beauty treatments are designed to address your specific skin concerns, lifestyle, and wellness goals. Whether you need a hydrating facial for dry skin, an anti-aging regimen, or a relaxing spa experience, our experts craft customized solutions just for you.
        </p>

        <button class="group inline-flex mt-6 items-center gap-3 px-8 py-4 border border-[#121212] rounded-full text-gray-800 font-medium text-lg hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105">
          Sign up as a professional
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.41667 0.488281V2.15495H9.90833L0.25 11.8133L1.425 12.9883L11.0833 3.32995V8.82161H12.75V0.488281H4.41667Z" fill="#121212"/>
                </svg>
          </button>
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
    <section class="grid grid-cols-1 my-20 lg:grid-cols-2 gap-8 items-center">
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
        <p class="lg:text-xl text-lg text-[#505554]">
          Elevate your practice with Elysian Beauty’s professional treatments. Advanced protocols, premium products, and expert training for estheticians and dermatologists. For Estheticians | Dermatologists | Spa Owners; Let’s redefine professional skincare together. Partner with us!
        </p>
        <button class="group mt-6 inline-flex items-center gap-3 px-8 py-4 border border-[#121212] rounded-full text-gray-800 font-medium text-lg hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105">
          Sign up as a client
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.41667 0.488281V2.15495H9.90833L0.25 11.8133L1.425 12.9883L11.0833 3.32995V8.82161H12.75V0.488281H4.41667Z" fill="#121212"/>
                </svg>
          </button>
      </div>
    </section>
  </div>
  <WhatWeOfferServices />
  <WhyElysianServices />
  <!-- <CoreValues /> -->
</template>
<script setup lang="ts">
</script>