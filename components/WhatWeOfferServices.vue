<template>
    <section class="py-16 px-4 md:px-8 bg-white">
      <div class="max-w-6xl mx-auto">
        <!-- Section Title -->
        <h2 class="text-3xl md:text-4xl font-bold text-center text-[#045940] mb-12">
          What We Offer
        </h2>
        
        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <!-- Service Card -->
          <div v-for="(service, index) in services" :key="index" 
               class="flex flex-col items-center text-center">
            <!-- Service Image -->
            <div class="w-72 h-72 rounded-full overflow-hidden mb-6 shadow-lg">
              <img 
                :src="service.image" 
                :alt="service.title"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Service Title -->
            <h3 class="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {{ service.title }}
            </h3>
            
            <!-- Service Description -->
            <p class="text-[#505554] font-[400] text-sm md:text-base leading-relaxed max-w-xs">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import service1 from "@/assets/img/service1.png"
  import service2 from "@/assets/img/service2.png"
  import service3 from "@/assets/img/service4.png"
  import service4 from "@/assets/img/service2.png"
  import service5 from "@/assets/img/service5.png"
import service7 from "@/assets/img/service7.png"
import massage from "@/assets/img/massage.png"
  import { ref } from 'vue'
  
  interface Service {
    title: string
    description: string
    image: string
  }
  
  const services = ref<Service[]>([
    {
      title: "Barbing Services",
      description: "Precision grooming for men and boys, including fades, trims, and beard styling.",
      image: service1
    },
    {
      title: "Hair Styling",
      description: "From braids and silk press to wig installations and ponytails, we style hair that reflects your beauty.",
      image: service2
    },
    {
      title: "Makeup & Gele",
      description: "Book certified artists for bridal looks, event glam, and traditional gele styling.",
      image: service3
    },
    {
      title: "Nail & Lash Services",
      description: "Acrylics, gel polish, pedicures, lash extensions, and more by skilled technicians.",
      image: service4
    },
    {
      title: "Care & Spa Treatments",
      description: "Facials, exfoliation, anti-acne treatments, and deep skin rejuvenation.",
      image: service5
    },
    {
      title: "Massage Therapy",
      description: "Swedish, deep tissue, or sports massage by licensed therapists — wherever you are.",
      image: massage
    },
    {
      title: "Tattoo Artistry",
      description: "Creative inkwork from clean, professional, and experienced tattoo artists.",
      image: service7
    }
  ])
  </script>
  
  <style scoped>
  /* Additional custom styles if needed */
  </style>