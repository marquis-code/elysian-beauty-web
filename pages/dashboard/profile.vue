<template>
    <div class="min-h-screen">
      <!-- Header -->
      <!-- <header class="flex justify-between items-center p-4 bg-white">
        <h1 class="text-xl font-semibold">Profile</h1>
        <div class="flex items-center gap-4">
          <button class="p-2">
            <BellIcon class="w-6 h-6 text-gray-600" />
          </button>
          <div class="flex items-center gap-2">
            <img :src="profileImage" alt="Profile" class="w-8 h-8 rounded-full" />
            <span class="text-sm text-gray-600">Professional</span>
            <ChevronDownIcon class="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </header> -->
  
      <!-- Cover Image Section -->
      <div class="relative h-64 bg-gray-200">
        <img
          :src="coverImage"
          alt="Cover"
          class="w-full h-full object-cover"
        />
        <button
          @click="handleCoverChange"
          class="absolute top-4 right-4 px-4 py-2 bg-white rounded-full text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50"
        >
          <CameraIcon class="w-4 h-4" />
          Change Cover
        </button>
        <input
          ref="coverInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onCoverImageSelected"
        />
      </div>
  
      <!-- Profile Info -->
      <div class="max-w-5xl mx-auto px-4 -mt-20 relative">
        <div class="flex flex-col md:flex-row items-start gap-4">
          <img
            :src="profileImage"
            alt="Profile"
            class="w-32 h-32 rounded-full border-4 border-white bg-white"
          />
          <div class="flex-1 mt-4 md:mt-24">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 class="text-2xl font-semibold">{{ name }}</h2>
                <p class="text-gray-600">{{ title }}</p>
              </div>
              <div class="flex gap-2">
                <button
                  @click="shareProfile"
                  class="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <ShareIcon class="w-4 h-4" />
                  Share
                </button>
                <button class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                  View profile
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Navigation Tabs -->
        <div class="mt-8 border-b">
          <nav class="flex gap-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'pb-4 px-2 text-sm font-medium relative',
                activeTab === tab.id
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ tab.name }}
              <span
                v-if="tab.count"
                class="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full"
              >{{ tab.count }}</span>
            </button>
          </nav>
        </div>
  
        <!-- Form Section -->
        <div class="py-8" v-if="activeTab === 'details'">
          <h3 class="text-lg font-semibold mb-2">Details</h3>
          <p class="text-gray-600 mb-6">Please enter your name and email to update your details.</p>
          
          <form @submit.prevent="updateProfile" class="space-y-6 max-w-2xl">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                v-model="form.firstName"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                placeholder="Olalekan"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                v-model="form.lastName"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                placeholder="Olasehinde"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                placeholder="Olasehindeolalekan@example.com"
              />
            </div>
  
            <div class="flex justify-end gap-2">
              <button
                type="button"
                class="px-4 py-2 border rounded-lg hover:bg-gray-50"
                @click="resetForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Update password
              </button>
            </div>
          </form>
        </div>

        <div v-if="activeTab === 'reviews'" class="py-8">
        <h2 class="text-3xl font-bold mb-8">120 Reviews</h2>
        
        <div class="grid md:grid-cols-[300px,1fr] gap-8">
          <!-- Rating Overview -->
          <div class="space-y-6">
            <div>
              <div class="text-6xl font-bold">4.8</div>
              <p class="text-gray-600 mt-2">Get a quick overview of your customers' feedback.</p>
            </div>
            
            <div class="space-y-2">
              <div v-for="rating in ratings" :key="rating.stars" class="flex items-center gap-2">
                <span class="w-4">{{ rating.stars }}</span>
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gray-900"
                    :style="{ width: `${rating.percentage}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews List -->
          <div class="space-y-8">
            <div v-for="review in reviews" :key="review.id" class="pb-8 border-b last:border-b-0">
              <div class="flex items-center gap-2 mb-2">
                <div class="flex">
                  <StarIcon
                    v-for="i in 5"
                    :key="i"
                    :class="[
                      'w-5 h-5',
                      i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    ]"
                  />
                </div>
                <span class="font-bold">{{ review.rating.toFixed(1) }}</span>
                <span class="text-gray-500">|</span>
                <span class="text-gray-500">{{ review.date }}</span>
                <span class="text-gray-500">|</span>
                <span class="text-gray-500">{{ review.author }}</span>
              </div>
              
              <h3 class="text-xl font-semibold mb-2">{{ review.title }}</h3>
              <p class="text-gray-600 mb-4">{{ review.content }}</p>
              
              <button class="text-green-700 font-medium hover:underline">Reply</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { BellIcon, CameraIcon, ChevronDownIcon, StarIcon, ShareIcon } from 'lucide-vue-next'
  import coverImage from '@/assets/img/login.png'
  import profileImage from '@/assets/img/avatar.svg'
  
//   const coverImage = ref('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2010.14.52%E2%80%AFAM-KkW8oBalL2vbs1NpgoO8f7XI4almkA.png')
//   const profileImage = ref('/placeholder.svg?height=128&width=128')
  const name = ref('Olalekan Peter')
  const title = ref('Masseur Therapist')
  const coverInput = ref<HTMLInputElement | null>(null)
  
  const tabs = [
    { id: 'details', name: 'My Details' },
    { id: 'password', name: 'Password' },
    { id: 'billing', name: 'Billing' },
    { id: 'reviews', name: 'Reviews', count: 2 },
  ]

  const reviews = [
  {
    id: 1,
    rating: 5.0,
    date: 'Feb 1, 2025',
    author: 'Anonymous',
    title: 'Exceptional Service with attention details',
    content: 'The service was top-notch, and my skin has never felt this radiant. The attention to detail, professionalism, and care made all the difference. I left feeling pampered, confident, and glowing! Highly recommend to anyone looking for quality beauty services!'
  },
  {
    id: 2,
    rating: 5.0,
    date: 'Feb 1, 2025',
    author: 'Fabiyi Adejimeji',
    title: 'Exceptional Service with attention details',
    content: 'The service was top-notch, and my skin has never felt this radiant. The attention to detail, professionalism, and care made all the difference. I left feeling pampered, confident, and glowing! Highly recommend to anyone looking for quality beauty services!'
  },
  {
    id: 3,
    rating: 5.0,
    date: 'Feb 1, 2025',
    author: 'Fabiyi Adejimeji',
    title: 'Exceptional Service with attention details',
    content: 'The service was top-notch, and my skin has never felt this radiant. The attention to detail, professionalism, and care made all the difference. I left feeling pampered, confident, and glowing! Highly recommend to anyone looking for quality beauty services!'
  }
]

const ratings = [
  { stars: 5, percentage: 90 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 0 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
]
  
//   const activeTab = ref('details')
const activeTab = ref('reviews')
  
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
  })
  
  const handleCoverChange = () => {
    coverInput.value?.click()
  }
  
  const onCoverImageSelected = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        coverImage.value = e.target?.result as string
      }
      reader.readAsDataURL(input.files[0])
    }
  }
  
  const shareProfile = async () => {
    try {
      await navigator.share({
        title: 'My Profile',
        text: `Check out ${name.value}'s profile`,
        url: window.location.href,
      })
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }
  
  const updateProfile = () => {
    // Handle form submission
    console.log('Form submitted:', form.value)
  }

  definePageMeta({
    layout: 'dashboard'
  })
  
  const resetForm = () => {
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
    }
  }
  </script>

<style scoped>
.text-[80px] {
  font-size: 80px;
}
</style>