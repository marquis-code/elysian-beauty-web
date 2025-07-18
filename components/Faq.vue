<template>
  <section class="bg-white px-4 py-16 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 fade-in-up">
        <h2 class="text-3xl sm:text-[39px] font-bold text-[#282B2A] mb-8">
          Frequently Asked Questions (FAQs)
        </h2>
      </div>

      <!-- FAQ Items -->
      <div v-for="(faq, index) in faqs" :key="index" class="px-6 sm:px-8 lg:px-12 fade-in-up" :style="{ animationDelay: `${0.2 * index}s` }">
        <div class="flex items-start justify-between mb-6">
          <h3 class="text-xl font-medium text-gray-800 pr-4 leading-relaxed">
            {{ faq.question }}
          </h3>
          <button 
            class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            @click="toggleQuestion(index)"
          >
            <svg v-if="selectedQuestion === index" class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <svg v-else class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
        </div>

        <!-- FAQ Answer -->
        <div v-show="selectedQuestion === index" class="mb-8">
          <p class="text-[#4B5563] font-[400] text-base sm:text-lg leading-relaxed">
            {{ faq.answer }}
          </p>
        </div>

        <!-- Read more FAQ Button -->
        <!-- <div class="flex justify-center">
          <button class="group inline-flex items-center px-8 py-4 bg-[#045940] text-white font-semibold text-base rounded-full hover:bg-[#045940]00 transition-all duration-300 ease-in-out transform">
            Read more FAQs
          </button>
        </div> -->
      </div>
      <div class="flex justify-center">
          <button class="group inline-flex items-center px-8 py-4 bg-[#045940] text-white font-semibold text-base rounded-full hover:bg-[#045940]00 transition-all duration-300 ease-in-out transform">
            Read more FAQs
          </button>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// FAQ data
const faqs = [
  {
    question: 'What is Elysian Beauty and how does it work?',
    answer: 'Elysian Beauty is a digital platform that connects you with professional beauty service providers — from hairstylists and makeup artists to massage therapists and tattoo artists. You can browse services, view portfolios, and book appointments directly through our platform.'
  },
  {
    question: 'How do I book an appointment?',
    answer: 'Booking an appointment is easy. Simply browse through the available services, select the one that suits you, and book it directly through our platform.'
  },
  {
    question: 'Can I cancel my appointment?',
    answer: 'Yes, you can cancel your appointment, but please make sure to check the cancellation policy of the service provider before doing so.'
  }
];

// Track the currently selected question
const selectedQuestion = ref<number | null>(null);

// Toggle selected question
const toggleQuestion = (index: number) => {
  if (selectedQuestion.value === index) {
    selectedQuestion.value = null; // Close the question if it's already open
  } else {
    selectedQuestion.value = index; // Open the clicked question
  }
};
</script>

