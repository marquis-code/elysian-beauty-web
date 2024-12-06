<template>
  <div class="container mx-auto px-4 lg:px-12 py-16">
    <!-- Section Header -->
    <div class="mb-12">
      <div class="flex  space-x-2 mb-4">
<!--        <span class="bg-black text-white text-sm font-medium px-4 py-1 rounded-full">-->
<!--          Our Core Value-->
<!--        </span>-->
        <span class="text-black text-sm border-[#F0F0F0] border font-medium flex items-center gap-x-3 px-4 py-2 rounded-full">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="6.10002" cy="5.79961" r="5.7" fill="black"/>
</svg>

            Our Core Value</span>
      </div>
      <h1 class="text-4xl lg:text-5xl font-semibold text-[#045940] mb-4">
        What We Stand For
      </h1>
      <p class="text-lg text-[#505554]">
        Core principles that guide every transaction, ensuring excellence and client satisfaction.
      </p>
    </div>

    <!-- Core Values Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pt-10 lg:pt-16">
      <!-- Integrity -->
      <div v-for="item in coreValues" :key="item.title" class="flex justify-start items-start flex-col">
      <div>
        <div class="bg-black text-white w-12 h-12 rounded-full mx-auto mb-4">
          <img :src="item.icon" alt="icon" />
        </div>
      </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{item?.title ?? 'Nil'}}</h3>
        <p class="text-[#8C8C8C] font-light leading-relaxed">
         {{item?.description ?? 'Nil'}}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import core1 from '@/assets/img/core1.svg'
import core2 from '@/assets/img/core2.svg'
import core3 from '@/assets/img/core3.svg'
import core4 from '@/assets/img/core4.svg'
import core5 from '@/assets/img/core5.svg'
import core6 from '@/assets/img/core6.svg'

interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

const coreValues: CoreValue[] = [
  {
    title: "Integrity",
    description:
        "We are always honest and transparent in all dealings, ensuring that clients receive clear and accurate information to make informed decisions.",
    icon: core1
  },
  {
    title: "Excellence",
    description:
        "We strive to exceed expectations by delivering outstanding results, paying close attention to detail, and committing fully to the quality of our services.",
    icon: core2
  },
  {
    title: "Customer-Centricity",
    description:
        "Our clients are our top priority; we listen carefully to their needs and provide personalized solutions tailored to each individual.",
    icon: core3
  },
  {
    title: "Innovation",
    description:
        "We continuously adopt the latest technologies and ideas to offer better, more efficient, and relevant services in the ever-evolving real estate market.",
    icon: core4
  },
  {
    title: "Collaboration",
    description:
        "We believe in the power of teamwork, both internally and with our clients, ensuring that every project benefits from collective expertise and shared goals.",
    icon: core5
  },
  {
    title: "Sustainability",
    description:
        "We are dedicated to supporting eco-friendly practices and sustainable development, ensuring a positive impact on both the community and the environment.",
    icon: core6
  },
];
</script>
