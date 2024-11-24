<template>
    <section class="py-12">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">What We Stand For</h2>
        <p class="text-gray-600 mb-10">
          Core principles that guide every transaction, ensuring excellence and client satisfaction.
        </p>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="value in coreValues" :key="value.title" class="text-center">
            <div class="flex justify-center items-center text-4xl text-green-500 mb-4">
              <value.icon />
            </div>
            <h3 class="text-xl font-bold mb-2">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const coreValues = [
    { title: "Integrity", description: "We are always honest and transparent...", icon: "🔒" },
    { title: "Excellence", description: "We strive to exceed expectations...", icon: "🌟" },
    { title: "Customer-Centricity", description: "Our clients are our top priority...", icon: "👤" },
    // Add more values here
  ];
  </script>
  