<template>
  <section class="relative flex flex-col md:flex-row rounded-3xl bg-emerald-900 text-white">
    <!-- Text Section -->
    <div class="flex flex-col justify-center max-w-lg px-6 py-12 ">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        Your Journey to
        Timeless Beauty
        Begins Here
      </h1>
      <p class="text-lg mb-6">
        Welcome to Elysian Beauty, where beauty meets confidence.
      </p>
      <div class="lg:flex gap-4 space-y-3 lg:space-y-0">
     <div>
       <button @click="router.push('/waitlist')" class="bg-[#FFD23F] text-[#045940] w-full lg:w-max text-sm rounded-full px-6 py-3.5 font-semibold hover:bg-yellow-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
         Join Waitlist
       </button>
     </div>
   <div>
     <button @click="router.push('/about')" class="flex items-center justify-center gap-2 text-sm w-full lg:w-max rounded-full border-[0.5px] border-white px-6 py-3.5 hover:bg-white hover:text-emerald-700 transition-all duration-300 transform hover:scale-105">
       Learn More
       <span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.91667 3.75V5.41667H13.4083L3.75 15.075L4.925 16.25L14.5833 6.59167V12.0833H16.25V3.75H7.91667Z" fill="currentColor"/>
            </svg>
          </span>
     </button>
   </div>
      </div>
    </div>

    <!-- Image Section -->
    <div class="flex-1 relative">
      <img
          src="@/assets/img/hero-female.png"
          alt="Beauty Model"
          class="object-cover h-full w-full rounded-3xl md:rounded-none"
      />
    </div>
  </section>
</template>

<style scoped>
section {
  min-height: 50vh;
}
</style>

<script setup lang="ts">
const router = useRouter()
</script>