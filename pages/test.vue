<template>
  <section class="my-12 max-w-5xl mx-auto">
    <!-- Section Container -->
    <div class="text-center mb-8">
      <p class="inline-block bg-green-100 text-green-700 py-1 px-3 rounded-full text-sm font-medium">
        Testimonials
      </p>
    </div>

    <!-- Testimonial Carousel -->
    <div class="relative overflow-hidden">
      <div
          ref="carouselRef"
          class="flex gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory"
      >
        <!-- Testimonial Cards -->
        <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-center bg-green-700 rounded-lg shadow-lg p-6 text-white"
        >
          <div class="flex items-center gap-3 mb-4">
            <img
                :src="testimonial.logo"
                :alt="testimonial.company"
                class="h-8 w-auto"
            />
            <h3 class="font-bold text-xl text-yellow-400">
              {{ testimonial.company }}
            </h3>
          </div>
          <blockquote class="text-lg font-light">
            “{{ testimonial.quote }}”
          </blockquote>
          <div class="flex items-center gap-3 mt-6">
            <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h4 class="font-semibold">{{ testimonial.name }}</h4>
              <p class="text-sm text-yellow-200">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <button
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100"
          @click="scrollCarousel('left')"
      >
        ←
      </button>
      <button
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100"
          @click="scrollCarousel('right')"
      >
        →
      </button>
    </div>

    <!-- Pagination Dots -->
    <div class="flex justify-center items-center mt-6 space-x-2">
      <span
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="w-3 h-3 rounded-full"
          :class="{
          'bg-green-700': index === currentIndex,
          'bg-gray-300': index !== currentIndex
        }"
      ></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  logo: string;
}

const testimonials = ref<Testimonial[]>([
  {
    name: "Olasehinde Olalekan",
    role: "Graphics Designer, Developer | Elysian Beauty",
    company: "Elysian Beauty",
    quote:
        "Sure we all love the enhanced experience of studying the sky using binoculars and various sizes and powers of telescopes.",
    avatar: "/images/avatar1.jpg",
    logo: "/images/company-logo1.png",
  },
  {
    name: "Jane Doe",
    role: "Product Designer | Elysian Beauty",
    company: "Elysian Beauty",
    quote:
        "Exploring beauty through the lens of creativity and functionality is truly a remarkable experience.",
    avatar: "/images/avatar2.jpg",
    logo: "/images/company-logo1.png",
  },
  // Add more testimonials as needed
]);

const carouselRef = ref<HTMLElement | null>(null);
const currentIndex = ref<number>(0);

// Function to scroll carousel
const scrollCarousel = (direction: "left" | "right") => {
  const carousel = carouselRef.value;
  if (carousel) {
    const scrollAmount = carousel.clientWidth + 16; // Adjust scroll amount based on gap
    if (direction === "left") {
      carousel.scrollLeft -= scrollAmount;
    } else {
      carousel.scrollLeft += scrollAmount;
    }
  }
};

// Watch scroll position to update active dot
watch(
    () => carouselRef.value?.scrollLeft,
    (scrollLeft) => {
      const index = Math.round(
          (scrollLeft || 0) / (carouselRef.value?.clientWidth || 1)
      );
      currentIndex.value = index;
    }
);
</script>

<style>

.no-scrollbar {
  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* Firefox */
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

</style>