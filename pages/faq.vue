<template>
    <div class="max-w-4xl mx-auto px-6 py-16">
      <!-- FAQ Header -->
      <h1 class="lg:text-[39px] text-lg font-bold text-gray-900 text-center mb-16">
        Frequently Asked Questions (FAQs)
      </h1>
  
      <!-- FAQ Items -->
      <div class="">
        <!-- FAQ Item -->
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="bg-white border-y-[0.5px] border-gray-25"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
          >
            <h3 class="text-lg font-medium text-[#282B2A]">
              {{ faq.question }}
            </h3>
            <span class="text-gray-500 text-xl">
              {{ openFaq === index ? '−' : '+' }}
            </span>
          </button>
          <div v-if="openFaq === index" class="px-6 pb-6">
            <p class="text-[#505554] leading-relaxed">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
  
      <!-- Contact Section -->
      <div class="text-center mt-16">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          Didn't find an answer to your question?
        </h2>
        <p class="text-gray-600 mb-8">
          Is there something you're uncertain about? Reach out to our welcoming team for assistance.
        </p>
        <button class="bg-[#045940] text-white font-medium px-8 py-3 rounded-lg transition-colors">
          Contact us
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // FAQ interface
  interface FAQ {
    question: string
    answer: string
  }
  
  // FAQ data array
  const faqs = ref<FAQ[]>([
    {
      question: "What is Elysian Beauty and how does it work?",
      answer: "Elysian Beauty is a digital platform that connects you with professional beauty service providers — from hairstylists and makeup artists to massage therapists and tattoo artists. You can browse services, view portfolios, and book appointments directly through our platform."
    },
    {
      question: "Do I need to come to a salon or can beauty professionals come to me?",
      answer: "Both options are available! Many of our beauty professionals offer mobile services and can come to your location for added convenience. Others operate from their own salons or studios. You can filter services based on your preference when booking."
    },
    {
      question: "How do I book a beauty service on Elysian Beauty?",
      answer: "Booking is simple! Browse our categories, select your desired service, choose from available professionals, pick your preferred date and time, and complete your booking. You'll receive confirmation details via email and SMS."
    },
    {
      question: "Are the beauty professionals on your platform vetted?",
      answer: "Yes, all our beauty professionals undergo a thorough verification process. We check their certifications, experience, and reviews to ensure you receive quality service from trusted professionals."
    },
    {
      question: "What beauty services can I book on Elysian Beauty?",
      answer: "We offer a wide range of services including hair styling, makeup application, nail services, massage therapy, skincare treatments, eyebrow and lash services, and tattoo artistry. Our platform continues to expand with new service categories."
    },
    {
      question: "How much do your services cost?",
      answer: "Prices vary depending on the service and professional you choose. Each service provider sets their own rates, which are clearly displayed on their profile. You can compare prices and choose the option that best fits your budget."
    },
    {
      question: "Can I schedule services for a group or an event?",
      answer: "Absolutely! Many of our professionals offer group bookings and event services. Whether it's for a wedding, birthday party, or corporate event, you can coordinate with service providers to arrange group appointments."
    },
    {
      question: "What if I need to cancel or reschedule my appointment?",
      answer: "You can cancel or reschedule your appointment through your account dashboard. Please note that cancellation policies vary by service provider, so check their specific terms when booking. We recommend giving at least 24 hours notice when possible."
    },
    {
      question: "Do you serve all locations in Nigeria?",
      answer: "We're actively expanding across Nigeria! Currently, we serve major cities including Lagos, Abuja, and Port Harcourt, with plans to reach more locations soon. Check our platform to see if services are available in your area."
    },
    {
      question: "How can I become a beauty service provider on Elysian Beauty?",
      answer: "We'd love to have you join our platform! Simply apply through our \"Become a Provider\" section, submit your credentials and portfolio, and our team will review your application. Once approved, you can start accepting bookings and growing your business with us."
    }
  ])
  
  // Reactive state for open FAQ (only one at a time)
  const openFaq = ref<number | null>(0) // First FAQ is open by default
  
  // Toggle FAQ function
  const toggleFaq = (index: number) => {
    if (openFaq.value === index) {
      // Close the FAQ if it's already open
      openFaq.value = null
    } else {
      // Open the clicked FAQ (closes any other open FAQ)
      openFaq.value = index
    }
  }
  </script>