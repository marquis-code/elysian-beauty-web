<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-full w-64 bg-[#2A2B2E] text-white">
      <div class="p-6">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20at%207.37.30%E2%80%AFAM-PZaafGSfhBcYaUk9ozggsfl14XWyT0.png" alt="Elysian Logo" class="h-8" />
      </div>
      <nav class="mt-6">
        <template v-for="(item, index) in navigationItems" :key="index">
          <a 
            :href="item.path" 
            class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700"
            :class="{ 'bg-[#31363F]': item.active }"
          >
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
          </a>
        </template>
      </nav>
      <div class="absolute bottom-0 w-full p-4">
        <div class="text-xs text-gray-500 uppercase">Preference</div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 flex-1 p-8">
      <div class="max-w-4xl">
        <!-- Header -->
        <header class="mb-8 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-semibold">Reviews</h1>
            <div class="flex items-center">
              <span class="text-2xl">★</span>
              <span class="ml-1 text-xl">5.0</span>
              <span class="ml-2 text-gray-500">(51)</span>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button class="rounded-full p-2 hover:bg-gray-100">
              <BellIcon class="h-6 w-6 text-gray-600" />
            </button>
            <div class="flex items-center gap-2">
              <img 
                src="/placeholder.svg?height=40&width=40" 
                alt="Profile" 
                class="h-10 w-10 rounded-full"
              />
              <div>
                <p class="font-medium">Olasehinde Olalekan</p>
                <p class="text-sm text-gray-500">Professional</p>
              </div>
              <ChevronDownIcon class="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </header>

        <!-- Reviews List -->
        <div class="space-y-6">
          <article v-for="(review, index) in reviews" :key="index" class="border-b border-gray-200 pb-6">
            <div class="flex items-center gap-2 mb-2">
              <div class="flex text-yellow-400">
                <StarIcon v-for="n in 5" :key="n" class="h-5 w-5" />
              </div>
              <span class="font-medium">{{ review.rating }}</span>
              <span class="text-gray-500">|</span>
              <span class="text-gray-500">{{ review.date }}</span>
              <span class="text-gray-500">|</span>
              <span>{{ review.author }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ review.title }}</h3>
            <p class="text-gray-700 mb-4">{{ review.content }}</p>
            <button class="text-green-700 font-medium hover:underline">Reply</button>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  HomeIcon, 
  CalendarIcon, 
  ClockIcon, 
  MessageSquareIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
  BellIcon,
  StarIcon,
  ChevronDownIcon
} from 'lucide-vue-next'

interface NavigationItem {
  name: string
  path: string
  icon: any
  active?: boolean
}

interface Review {
  rating: number
  date: string
  author: string
  title: string
  content: string
}

const navigationItems = ref<NavigationItem[]>([
  { name: 'Overview', path: '/', icon: HomeIcon },
  { name: 'Appointment', path: '/appointment', icon: CalendarIcon },
  { name: 'Recent Bookings', path: '/bookings', icon: ClockIcon, active: true },
  { name: 'Messages', path: '/messages', icon: MessageSquareIcon },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
  { name: 'Help centre', path: '/help', icon: HelpCircleIcon },
  { name: 'Logout', path: '/logout', icon: LogOutIcon },
])

const reviews = ref<Review[]>([
  {
    rating: 5.0,
    date: 'Feb 1, 2025',
    author: 'Fabiyi Adejimeji',
    title: 'Exceptional Service with attention details',
    content: "I'm absolutely thrilled with the exceptional service from this salon! The team went above and beyond to tailor their system to our unique needs, resulting in a seamless workflow. The technology is incredibly user-friendly and adaptable. But what truly stands out is the warmth and professionalism of the entire team. It's been an absolute pleasure working with them!"
  },
  {
    rating: 5.0,
    date: 'Feb 1, 2025',
    author: 'Anonymous',
    title: 'Exceptional Service with attention details',
    content: "I'm absolutely thrilled with the exceptional service from this salon! The team went above and beyond to tailor their system to our unique needs, resulting in a seamless workflow. The technology is incredibly user-friendly and adaptable. But what truly stands out is the warmth and professionalism of the entire team. It's been an absolute pleasure working with them!"
  },
  // Add more reviews as needed
])
</script>

<style>
/* Add any additional custom styles here if needed */
</style>