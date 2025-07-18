<template>
  <div class="container mx-auto px-4 lg:px-12 py-8">
    <div class="flex justify-center items-center space-y-6 flex-col mb-16">
      <div class="flex items-center space-x-2  mb-4">
          <span class="bg-[#045940] flex items-center gap-x-2 text-white text-sm font-medium px-4 py-3 rounded-full">
               <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.60002" cy="6.60039" r="5.7" fill="#FFD23F"/>
          </svg>
          About Elysian Beauty</span>
        </div>
        <h3 class="text-[#000000] text-lg max-w-3xl lg:text-5xl text-center font-bold">Empowering Beauty Professionals. Elevating Everyday Glam</h3>
        <p class="lg:text-xl text-lg text-justify text-[#505554] font-normal max-w-5xl leading-loose mb-4">
          Elysian Beauty is Nigeria’s go-to platform for finding and booking trusted beauty professionals, including hairstylists, nail techs, makeup artists, and skincare experts. It was created to provide the necessary tools for both clients and professionals. For clients, Elysian Beauty offers verified experts, secure payments, and reliable service. For professionals, it provides free tools, exposure, and payment processing — all in one place.
        </p>
    </div>
    <!-- <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
      <div>
        <div class="flex items-center space-x-2 mb-4">
          <span class="bg-[#045940] flex items-center gap-x-2 text-white text-sm font-medium px-4 py-3 rounded-full">
               <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.60002" cy="6.60039" r="5.7" fill="#FFD23F"/>
          </svg>
            About Elysian Beauty</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Your Dream Home, Our Expertise.
        </h1>
        <p class="text-lg text-gray-600">
          Connecting you with premium properties and unparalleled real estate services.
        </p>
      </div>
      <div>
        <img
            src="@/assets/img/about1.png"
            alt="About Us"
            class="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </section> -->

    <!-- Mission Section -->
    <!-- <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
      <div>
        <img
            src="@/assets/img/about2.png"
            alt="Mission"
            class="w-full h-auto rounded-lg object-cover"
        />
      </div>
      <div>
        <div class="flex items-center space-x-2 mb-4">
          <span class="text-black text-sm border-[#F0F0F0] border font-medium flex items-center gap-x-3 px-4 py-2 rounded-full">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="6.10002" cy="5.79961" r="5.7" fill="black"/>
</svg>

            Our Mission</span>
        </div>
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Leading with Excellence, Integrity, and Innovation in Real Estate
        </h2>
        <p class="text-lg text-gray-600 mb-4">
          Our vision is to become a trusted leader in the real estate industry by delivering excellence, integrity, and innovation in every transaction.
        </p>
        <p class="text-lg text-gray-600">
          Our vision is to become a trusted leader in the real estate industry by delivering excellence, integrity, and innovation in every transaction.
        </p>
      </div>
    </section> -->

    <!-- Vision Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
      <!-- Text Content -->
      <div>
        <div class="flex items-center space-x-2 mb-4">
                  <span class="text-black text-sm border-[#F0F0F0] border font-medium flex items-center gap-x-3 px-4 py-2 rounded-full">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="6.10002" cy="5.79961" r="5.7" fill="black"/>
</svg>

            Our Vision</span>
        </div>
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          To be the go-to platform for beauty 
        </h2>
        <p class="text-lg text-gray-600">
          appointments, starting with Nigeria — empowering professionals, celebrating creativity, and redefining how beauty services are accessed.
        </p>
      </div>
      <!-- Image -->
      <div>
        <img
            src="@/assets/img/about3.png"
            alt="Vision"
            class="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </section>

    <!-- Another Mission Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <!-- Image -->
      <div>
        <img
            src="@/assets/img/about2.png"
            alt="Mission"
            class="w-full h-auto rounded-lg object-cover"
        />
      </div>
      <!-- Text Content -->
      <div>
        <div class="flex items-center space-x-2 mb-4">
                  <span class="text-black text-sm border-[#F0F0F0] border font-medium flex items-center gap-x-3 px-4 py-2 rounded-full">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="6.10002" cy="5.79961" r="5.7" fill="black"/>
</svg>

            Our Mission</span>
        </div>
        <section class="py-8 bg-white">
        <div class="max-w-4xl mx-auto">
          <!-- Mission Points List -->
          <div class="space-y-6">
            <div v-for="(point, index) in missionPoints" :key="index"
                class="flex items-start gap-4">
              <!-- Bullet Point -->
              <div class="w-3 h-3 rounded-full bg-gray-700 flex-shrink-0 mt-2"></div>
              
              <!-- Text Content -->
              <p class="text-[#505554] font-[400] text-lg md:text-xl leading-relaxed">
                {{ point }}
              </p>
            </div>
          </div>
        </div>
      </section>
        <!-- <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Leading with Excellence, Integrity, and Innovation in Real Estate
        </h2>
        <p class="text-lg text-gray-600">
          Our vision is to become a trusted leader in the real estate industry by delivering excellence, integrity, and innovation in every transaction.
        </p> -->
      </div>
    </section>
  </div>
  <CoreValues />
</template>
<script setup lang="ts">
const missionPoints = ref<string[]>([
  "Help clients find trustworthy, skilled beauty professionals without guesswork",
  "Provide beauty experts with tools to grow and manage their business online",
  "Create a safe, seamless, and modern booking experience for all"
])
</script>