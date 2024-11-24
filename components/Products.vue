<template>
  <section class="px-6 md:px-12 lg:px-20 py-12 bg-white">
    <!-- Heading Section -->
    <div class="mb-8">
      <div class="inline-block px-4 py-2.5 text-xs border border-[#F0F0F0] rounded-full text-gray-800 font-semibold">
        Beauty Products
      </div>
      <h3 class="text-2xl md:text-4xl font-bold mt-4 text-gray-900">
        Purchase beauty products at your convenience
      </h3>
    </div>

    <!-- Carousel Wrapper -->
    <div class="relative overflow-hidden">
      <div
          class="flex transition-transform duration-500"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <!-- Card -->
        <div
            v-for="(product, index) in products"
            :key="index"
            class="w-full md:w-1/3 flex-shrink-0 p-2 lg:p-4"
        >
          <div class="bg-white overflow-hidden">
            <!-- Image Section -->
            <img
                :src="product.image"
                :alt="product.name"
                class="w-full object-cover"
            />
            <!-- Text Section -->
            <div class="p-4 flex justify-between items-center">
            <div>
              <h4 class="text-lg font-bold text-[#141515]">{{ product.name }}</h4>
              <p class="text-sm text-[#79807E]">{{ product.description }}</p>
            </div>
              <div class="flex items-center mt-3">
                <span class="text-yellow-400 text-lg mr-1">★</span>
                <span class="text-gray-800 font-medium text-sm">{{ product.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div class="flex justify-between max-w-xs px-16 mx-auto items-center mt-4">
        <!-- Previous Button -->
        <button
            class=""
            @click="prevSlide"
        >
          <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="1" width="35" height="35" rx="17.5" stroke="#999999"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1919 11.8081C17.436 12.0521 17.436 12.4479 17.1919 12.6919L12.0089 17.875H25.5C25.8452 17.875 26.125 18.1548 26.125 18.5C26.125 18.8452 25.8452 19.125 25.5 19.125H12.0089L17.1919 24.3081C17.436 24.5521 17.436 24.9479 17.1919 25.1919C16.9479 25.436 16.5521 25.436 16.3081 25.1919L10.0581 18.9419C9.81398 18.6979 9.81398 18.3021 10.0581 18.0581L16.3081 11.8081C16.5521 11.564 16.9479 11.564 17.1919 11.8081Z" fill="#999999"/>
          </svg>

        </button>
        <!-- Dots -->
        <div class="flex gap-2">
          <span
              v-for="(_, index) in products.length"
              :key="index"
              class="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"
              :class="{ 'bg-gray-800': currentSlide % products.length === index }"
              @click="goToSlide(index)"
          ></span>
        </div>

        <!-- Next Button -->
        <button
            class=""
            @click="nextSlide"
        >
          <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="1" width="35" height="35" rx="17.5" stroke="#070C29"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.8081 11.8081C19.0521 11.564 19.4479 11.564 19.6919 11.8081L25.9419 18.0581C26.0592 18.1753 26.125 18.3342 26.125 18.5C26.125 18.6658 26.0592 18.8247 25.9419 18.9419L19.6919 25.1919C19.4479 25.436 19.0521 25.436 18.8081 25.1919C18.564 24.9479 18.564 24.5521 18.8081 24.3081L23.9911 19.125H10.5C10.1548 19.125 9.875 18.8452 9.875 18.5C9.875 18.1548 10.1548 17.875 10.5 17.875H23.9911L18.8081 12.6919C18.564 12.4479 18.564 12.0521 18.8081 11.8081Z" fill="#070C29"/>
          </svg>

          <!--          <svg-->
<!--              xmlns="http://www.w3.org/2000/svg"-->
<!--              class="w-5 h-5 text-gray-800"-->
<!--              fill="currentColor"-->
<!--              viewBox="0 0 20 20"-->
<!--          >-->
<!--            <path-->
<!--                fill-rule="evenodd"-->
<!--                d="M7.293 16.707a1 1 0 010-1.414L11.586 11H4a1 1 0 110-2h7.586L7.293 4.707a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z"-->
<!--                clip-rule="evenodd"-->
<!--            />-->
<!--          </svg>-->
        </button>
      </div>
    </div>
  </section>
</template>


<script lang="ts" setup>
import product1 from '@/assets/img/products1.png';
import product2 from '@/assets/img/products2.png';
import product3 from '@/assets/img/products3.png';
import product4 from '@/assets/img/products4.png';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

interface Product {
  name: string;
  description: string;
  rating: number;
  image: string;
}

const products: Product[] = [
  {
    name: 'Fash Wash',
    description: 'Senior Real Estate Advisor',
    rating: 4.9,
    image: product1,
  },
  {
    name: 'Jane Doe',
    description: 'Senior Real Estate Advisor',
    rating: 4.9,
    image: product2,
  },
  {
    name: 'Haylie Philips',
    description: 'Senior Real Estate Advisor',
    rating: 4.9,
    image: product3,
  },
  {
    name: 'Haylie Philips',
    description: 'Senior Real Estate Advisor',
    rating: 4.9,
    image: product4,
  },
];

const currentSlide = ref(0);
const intervalId = ref<number | null>(null);

// Move to the next slide
const nextSlide = () => {
  if (currentSlide.value >= products.length - 1) {
    currentSlide.value = 0; // Reset to the first slide
  } else {
    currentSlide.value++;
  }
};

// Move to the previous slide
const prevSlide = () => {
  if (currentSlide.value === 0) {
    currentSlide.value = products.length - 1; // Go to the last slide
  } else {
    currentSlide.value--;
  }
};

// Jump to a specific slide
const goToSlide = (index: number) => {
  currentSlide.value = index;
};

// Auto-play functionality
const startAutoPlay = () => {
  intervalId.value = window.setInterval(nextSlide, 3000);
};

const stopAutoPlay = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

// Lifecycle hooks
onMounted(() => {
  startAutoPlay();
});

onBeforeUnmount(() => {
  stopAutoPlay();
});
</script>
