<!-- components/MissionSection.vue -->
<template>
   <main>
     <section class="flex flex-col md:flex-row items-center gap-6 px-6 py-12 md:px-20 md:py-24">
       <div class="text-center md:text-left space-y-6">
         <h2 class="text-3xl md:text-5xl font-medium text-emerald-900">
           Our Mission: To Empower Individuals to Embrace Their Unique Beauty
         </h2>
         <p class="text-gray-700">
           Enjoy flawless skin and rejuvenating experiences, free from worries
           about imperfections and dullness.
         </p>
     <div class="flex lg:justify-start justify-center items-center ">
    <button class="flex text-[#121212] items-center gap-2 border-[0.5px] border-[#121212] px-6 py-3.5 rounded-full">
        Learn More
        <span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.91667 3.75V5.41667H13.4083L3.75 15.075L4.925 16.25L14.5833 6.59167V12.0833H16.25V3.75H7.91667Z" fill="#121212"/>
            </svg>
        </span>
    </button>
</div>
       </div>
       <img
           src="@/assets/img/mission1.png"
           alt="Mission"
           class="w-full md:w-1/2 rounded-lg"
       />
     </section>

     <section class="flex flex-col md:flex-row items-center gap-6 px-6 py-12 md:px-20 md:py-24">
       <img
           src="@/assets/img/mission2.png"
           alt="Mission"
           class="w-full md:w-1/2 rounded-lg order-2 lg:order-1"
       />
       <div class="text-center md:text-left space-y-6 order-1 lg:order-2">
         <h2 class="text-3xl md:text-5xl font-medium text-emerald-900">
           Our Mission: To empower individuals to embrace and celebrate their unique beauty.
         </h2>
         <p class="text-gray-700">
           Enjoy flawless skin and rejuvenating experiences, free from worries about imperfections and dullness.
         </p>
         <div class="flex lg:justify-start justify-center items-center ">
         <button class="flex text-[#121212] items-center gap-2 border-[0.5px] border-[#121212] px-6 py-3.5 rounded-full">
           Learn More
           <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.91667 3.75V5.41667H13.4083L3.75 15.075L4.925 16.25L14.5833 6.59167V12.0833H16.25V3.75H7.91667Z" fill="#121212"/>
              </svg>
              </span>
         </button>
         </div>
       </div>
     </section>
   </main>
  </template>
<script setup lang="ts">
</script>