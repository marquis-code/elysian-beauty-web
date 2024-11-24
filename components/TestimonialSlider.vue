<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useIntervalFn } from '@vueuse/core';

const testimonials = ref([
  {
    logo: 'Elysian',
    text: 'Sure we all love the enhanced experience of studying the sky using binoculars and various sizes and powers of telescopes.',
    name: 'Olasehinde Olalekan',
    position: 'Graphics designer, Developer | Elysian Beauty',
    // profilePicture: '/profile1.jpg',
  },
  {
    logo: 'Elysian',
    text: 'The stars are our inspiration, and telescopes are the windows to our dreams.',
    name: 'Adeola Adetunji',
    position: 'Astrophysicist | Elysian Beauty',
    // profilePicture: '/profile2.jpg',
  },
  {
    logo: 'Elysian',
    text: 'Exploring the universe one lens at a time.',
    name: 'Tayo Johnson',
    position: 'Sky Enthusiast | Elysian Beauty',
    // profilePicture: '/profile3.jpg',
  },
]);

const activeIndex = ref(0);

// Automatic flipping every 5 seconds
const { pause, resume } = useIntervalFn(() => {
  activeIndex.value = (activeIndex.value + 1) % testimonials.value.length;
}, 5000);

onMounted(() => {
  resume();
});
</script>

<template>
  <div class="relative w-full py-10 bg-[#F1F2F2] my-16">
   <div class="flex justify-center items-center flex-col p-3 lg:p-0">
     <h1 class="text-[#045940] text-4xl">What People Are Saying</h1>
     <p class="text-[#8C8C8C] pt-3 lg:pt-0">Real feedback from clients who’ve experienced the Elysian Beauty difference.</p>
   </div>
   <section class="space-y-10 mt-16">
     <div class="flex justify-center items-center relative max-w-4xl mx-auto overflow-hidden">
       <div class="flex gap-4 transition-transform duration-700" :style="{ transform: `translateX(-${activeIndex* 100}%)` }">
         <div
             v-for="(testimonial, index) in testimonials"
             :key="index"
             class="min-w-full p-8 bg-[#045940] text-white rounded-lg shadow-lg"
         >
           <div class="text-lg font-bold mb-4 flex items-center">
             <img src="@/assets/img/yellow-logo.png" alt="logo" class="h-10 w-32" />
           </div>

           <p class="text-lg  mb-6">
             “{{ testimonial.text }}”
           </p>

           <div class="flex items-center mt-4">
             <img src="@/assets/img/avatar.png" alt="profile" class="w-12 h-12 rounded-full border border-gray-100 mr-4" />
             <div>
               <p class="font-bold">{{ testimonial.name }}</p>
               <p class="text-sm text-yellow-300">{{ testimonial.position }}</p>
             </div>
           </div>
         </div>
       </div>
     </div>

     <!-- Indicators -->
     <div class="flex justify-center mt-4 gap-2">
       <button
           v-for="(testimonial, index) in testimonials"
           :key="index"
           class="w-3 h-3 rounded-full"
           :class="{ 'bg-green-600': index === activeIndex.value, 'bg-gray-300': index !== activeIndex.value }"
           @click="activeIndex.value = index; pause(); resume();"
       ></button>
     </div>
   </section>
  </div>
</template>

<style scoped>
.transition-transform {
  display: flex;
  transition: transform 0.7s ease-in-out;
}
</style>
