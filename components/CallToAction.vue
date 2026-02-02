<template>
        <!-- Main Content -->
        <main class="flex-1 bg-white">
      <!-- Call to Action Section -->
      <section class="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#141515] mb-6">
            Don't Miss Out
          </h1>
          <div class="space-y-2 mb-10">
            <p class="text-lg sm:text-xl text-[#505554] max-w-2xl mx-auto">
              Join thousands of Nigerians booking beauty services the smart way.
            </p>
            <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Search. Book. Slay – with Elysian Beauty.
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink to="/waitlist" class="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-sm py-4 px-8 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 text-center">
              Join Waitlist
            </NuxtLink>
            <NuxtLink to="/waitlist" class="w-full sm:w-auto border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white font-semibold text-sm py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-center">
              Join as a Professional
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
</template>