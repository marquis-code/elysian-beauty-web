<template>
  <section class="relative overflow-hidden rounded-3xl bg-[#045940] text-white">
    <!-- Carousel Container -->
    <div class="relative w-full h-full min-h-[500px] md:min-h-[600px]">
      <!-- Carousel Slides -->
      <div class="flex transition-transform duration-500 ease-in-out h-full"
           :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        
        <!-- Dynamic Slides -->
        <div v-for="(slide, index) in slides" :key="index" 
             class="w-full flex-shrink-0 flex flex-col md:flex-row">
          <!-- Text Section -->
          <div class="flex flex-col justify-center w-full md:w-1/2 px-8 py-12 md:px-16 md:py-16">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {{ slide.title }}
            </h1>
            <p class="text-lg mb-8 opacity-90 max-w-lg">
              {{ slide.description }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="router.push('/explore')" 
                      class="bg-[#FFD23F] text-[#045940] text-sm rounded-full px-8 py-4 font-semibold hover:bg-yellow-400 transition-colors">
                {{ slide.primaryButton }}
              </button>
              <button class="flex items-center justify-center gap-2 text-sm rounded-full border border-white px-8 py-4 hover:bg-white hover:text-emerald-700 transition-colors">
                {{ slide.secondaryButton }}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.91667 3.75V5.41667H13.4083L3.75 15.075L4.925 16.25L14.5833 6.59167V12.0833H16.25V3.75H7.91667Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Image Section -->
          <div class="flex-1 relative min-h-[300px] md:min-h-full">
            <div class="absolute inset-0 bg-gradient-to-l from-transparent via-emerald-700/20 to-emerald-700/60 md:w-32 z-10"></div>
            <img
              :src="slide.image"
              :alt="slide.alt"
              class="object-cover object-center h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Dots -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="currentSlide === index ? 'bg-white' : 'bg-white/40'"
      />
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="previousSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-20"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-20"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import advertImage from "@/assets/img/hero-female.png"
import advertImage2 from "@/assets/img/beauty-products4.png"
import advertImage3 from "@/assets/img/beauty-products1.png"

const router = useRouter()

// Slide data for cleaner code
const slides = ref([
  {
    title: "Book Trusted Beauty Experts Near You — Anytime, Anywhere in Nigeria",
    description: "Find and book verified hairstylists, makeup artists, nail technicians, and more. Enjoy stress-free beauty appointments from the comfort of your home or at your favorite salon.",
    primaryButton: "Find Beauty Experts",
    secondaryButton: "Join as a Professional",
    image: advertImage,
    alt: "Beauty Expert"
  },
  {
    title: "Experience  Awesome Beauty Treatments at Your Doorstep.",
    description: "Catch a break on the salon fuss and experience convenient beauty services brought to you in the comforts of your own home with Elysian Beauty. Deluxe services and goods, right at your door step.",
    primaryButton: "Browse Services",
    secondaryButton: "View Portfolio",
    image: advertImage2,
    alt: "Beauty Transformation"
  },
  {
    title: "Convenient Self-Care, Made Available Nationwide in Nigeria",
    description: " Elysian Beauty links you to confirmed, professional beauty experts and genuine products in a variety of categories, all on one easy to use site.",
    primaryButton: "Book Now",
    secondaryButton: "How It Works",
    image: advertImage3,
    alt: "Beauty Session"
  }
])

const currentSlide = ref(0)
const autoSlideInterval = ref<NodeJS.Timeout | null>(null)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetAutoSlide()
}

const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const resetAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value)
  }
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value)
  }
})
</script>

<style scoped>
section {
  min-height: 500px;
}

@media (min-width: 768px) {
  section {
    min-height: 600px;
  }
}
</style>