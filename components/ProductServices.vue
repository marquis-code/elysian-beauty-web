<template>
  <section class="px-6 md:px-12 lg:px-20 py-12 bg-white">
    <!-- Heading Section -->
    <div class="mb-12">
      <h2 class="text-lg text-[#04594D] font-medium">Products and Services</h2>
      <h3 class="text-3xl md:text-4xl font-medium text-[#282B2A]">
        Discover Our Extensive Selection of Premium Beauty <br class="hidden md:block" /> Products and Services
      </h3>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Card 1 -->
      <div v-for="(product, idx) in products" :key="idx" class="flex flex-col items-center">
        <div class="bg-emerald-900 rounded-xl overflow-hidden w-full">
          <img
              :src="product.image"
              alt="Body Slimming"
              class="object-cover w-full h-56"
          />
        </div>
        <div class="mt-4">
          <div class="flex gap-2 items-center">
            <!-- Icon Container -->
            <div class="h-10 w-20 bg-yellow-400 flex items-center justify-center rounded-full">
              <img
                  :src="product.icon"
                  alt=""
                  class="object-cover"
              />
            </div>

            <div>
              <h4 class="text-base font-bold">Body Slimming</h4>
              <p class="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
img {
  object-fit: cover; /* Ensures images are positioned perfectly inside the card */
}

.card {
  background-color: #064e3b; /* Emerald-900 */
}

.card-icon {
  background-color: #ffd23f; /* Yellow Icon Background */
  padding: 8px;
  border-radius: 50%;
}
</style>
<script setup lang="ts">
import product1 from '@/assets/img/beauty-products1.png'
import product2 from '@/assets/img/beauty-products2.png'
import product3 from '@/assets/img/beauty-products3.png'
import product4 from '@/assets/img/beauty-products4.png'
import product5 from '@/assets/img/beauty-products5.png'
import product6 from '@/assets/img/hero-female.png'
import productIcon1 from '@/assets/img/product-icon1.png'
import productIcon2 from '@/assets/img/product-icon2.png'
import productIcon3 from '@/assets/img/product-icon3.png'
import productIcon4 from '@/assets/img/product-icon4.png'
import productIcon5 from '@/assets/img/product-icon5.png'
import productIcon6 from '@/assets/img/product-icon6.png'

const products = ref([
  {
    name: 'Body Slimming',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. ',
    image: product1,
    icon: productIcon1
  },
  {
    name: 'Botox & Filler',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. ',
    image: product2,
    icon: productIcon2
  },
  {
    name: 'Facial Thread',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. ',
    image: product3,
    icon: productIcon3
  },
  {
    name: 'Facial Lasers',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. ',
    image: product4,
    icon: productIcon4
  },
  {
    name: 'Face Slimming',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. ',
    image: product5,
    icon: productIcon5
  },
  {
    name: 'Face Glowing',
    description: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. ',
    image: product6,
    icon: productIcon6
  },
])
</script>