<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Left Sidebar -->
      <aside class="fixed left-0 top-0 h-full w-64 bg-[#2A2F33] text-white">
        <div class="p-6">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20at%207.34.36%E2%80%AFAM-Od69keKu3iIeae5OtZya4eEAb7zgBW.png" alt="Elysian Beauty" class="h-8" />
        </div>
        <nav class="mt-6">
          <NuxtLink v-for="item in menuItems" :key="item.name" :to="item.path"
            :class="[
              'flex items-center px-6 py-3 text-sm',
              item.name === 'Recent Bookings' 
                ? 'bg-[#37664F] text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            ]">
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
          </NuxtLink>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <main class="pl-64">
        <!-- Header -->
        <header class="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h1 class="text-2xl font-semibold">Recent Bookings</h1>
          <div class="flex items-center gap-6">
            <div class="relative">
              <input type="text" 
                v-model="searchQuery"
                placeholder="Search product, customer, etc..."
                class="w-[400px] pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:border-gray-400"
              />
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <BellIcon class="h-6 w-6 text-gray-500" />
            <div class="flex items-center gap-2">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20at%207.34.36%E2%80%AFAM-Od69keKu3iIeae5OtZya4eEAb7zgBW.png" alt="Profile" class="h-8 w-8 rounded-full" />
              <div>
                <p class="font-medium">Olasehinde Olalekan</p>
                <p class="text-sm text-gray-500">Professional</p>
              </div>
              <ChevronDownIcon class="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </header>
  
        <!-- Table Section -->
        <div class="p-8">
          <div class="bg-white rounded-lg shadow">
            <div class="p-4">
              <input type="text" 
                v-model="tableSearch"
                placeholder="Search order..."
                class="w-full px-4 py-2 rounded border focus:outline-none focus:border-gray-400"
              />
            </div>
  
            <table class="w-full">
              <thead class="bg-gray-50 border-y">
                <tr>
                  <th class="px-4 py-3 text-left">
                    <input type="checkbox" 
                      v-model="selectAll"
                      @change="toggleSelectAll"
                      class="rounded border-gray-300"
                    />
                  </th>
                  <th class="px-4 py-3 text-left text-sm text-gray-500">ORDER</th>
                  <th class="px-4 py-3 text-left text-sm text-gray-500">CUSTOMER</th>
                  <th class="px-4 py-3 text-left text-sm text-gray-500">DATE</th>
                  <th class="px-4 py-3 text-left text-sm text-gray-500">SERVICE</th>
                  <th class="px-4 py-3 text-left text-sm text-gray-500">STATUS</th>
                  <th class="px-4 py-3 text-left text-sm text-gray-500">METHOD</th>
                  <th class="px-4 py-3 text-left text-sm text-gray-500">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="booking in paginatedBookings" :key="booking.id" class="border-b">
                  <td class="px-4 py-4">
                    <input type="checkbox" 
                      v-model="selectedBookings"
                      :value="booking.id"
                      class="rounded border-gray-300"
                    />
                  </td>
                  <td class="px-4 py-4 text-sm">#{{ booking.order }}</td>
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <div v-if="booking.avatar" class="h-8 w-8 rounded-full overflow-hidden">
                        <img :src="booking.avatar" :alt="booking.name" class="h-full w-full object-cover" />
                      </div>
                      <div v-else class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                        {{ getInitials(booking.name) }}
                      </div>
                      <div>
                        <p class="font-medium">{{ booking.name }}</p>
                        <p class="text-sm text-gray-500">{{ booking.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm">{{ booking.date }}</td>
                  <td class="px-4 py-4 text-sm">{{ booking.service }}</td>
                  <td class="px-4 py-4">
                    <span :class="[
                      'px-2 py-1 text-xs rounded-full',
                      booking.status === 'Confirmed' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-yellow-50 text-yellow-600'
                    ]">
                      {{ booking.status }}
                    </span>
                  </td>
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-2">
                      <!-- <img src="/mastercard-icon.png" alt="Mastercard" class="h-5" /> -->
                      <span class="text-sm text-gray-500">•••• 1234</span>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <button class="text-gray-400 hover:text-gray-600">
                      <EllipsisHorizontalIcon class="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <!-- Pagination -->
            <div class="px-4 py-3 flex items-center justify-between">
              <p class="text-sm text-gray-500">
                Displaying {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredBookings.length }} entries
              </p>
              <div class="flex items-center gap-2">
                <button 
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 rounded border"
                  :class="currentPage === 1 ? 'text-gray-400' : 'hover:bg-gray-50'"
                >
                  Previous
                </button>
                <div class="flex items-center gap-1">
                  <button 
                    v-for="page in totalPages"
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'px-3 py-1 rounded',
                      currentPage === page 
                        ? 'bg-[#37664F] text-white' 
                        : 'hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                </div>
                <button 
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1 rounded border"
                  :class="currentPage === totalPages ? 'text-gray-400' : 'hover:bg-gray-50'"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useCreateBooking } from '~/composables/modules/bookings/useCreateBooking'
  import { useUpdateBooking } from '~/composables/modules/bookings/useUpdateBooking'
  import { useFetchBookings } from '~/composables/modules/bookings/useFetchBookings'
  import { useDeleteBooking } from '~/composables/modules/bookings/useDeleteBooking'

  const { updateBooking, loading: updating } = useUpdateBooking()
  const { fetchBookings, loading: fetching } = useFetchBookings()
  const { deleteBooking, loading: deleting  } = useDeleteBooking()

  import { 
    HomeIcon, 
    CalendarIcon, 
    ClockIcon, 
    ChatBubbleLeftIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    ArrowRightOnRectangleIcon,
    MagnifyingGlassIcon,
    BellIcon,
    ChevronDownIcon,
    EllipsisHorizontalIcon
  } from '@heroicons/vue/24/outline'
  
  interface Booking {
    id: number
    order: string
    name: string
    email: string
    date: string
    service: string
    status: 'Confirmed' | 'Pending'
    avatar?: string
  }
  
  const menuItems = [
    { name: 'Overview', path: '/overview', icon: HomeIcon },
    { name: 'Appointment', path: '/appointment', icon: CalendarIcon },
    { name: 'Recent Bookings', path: '/bookings', icon: ClockIcon },
    { name: 'Messages', path: '/messages', icon: ChatBubbleLeftIcon },
    { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
    { name: 'Help centre', path: '/help', icon: QuestionMarkCircleIcon },
    { name: 'Logout', path: '/logout', icon: ArrowRightOnRectangleIcon },
  ]
  
  // Sample data
  const bookings = ref<Booking[]>([
    {
      id: 1,
      order: '345918',
      name: 'Emeka Okafor',
      email: 'Emeka.Okafor@gmail.com',
      date: 'Feb. 02, 10:21AM',
      service: 'Haircut',
      status: 'Confirmed',
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20at%207.34.36%E2%80%AFAM-Od69keKu3iIeae5OtZya4eEAb7zgBW.png'
    },
    // Add more sample data here...
  ])
  
  const searchQuery = ref('')
  const tableSearch = ref('')
  const selectedBookings = ref<number[]>([])
  const selectAll = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = 8
  
  const filteredBookings = computed(() => {
    return bookings.value.filter(booking => {
      const searchTerm = tableSearch.value.toLowerCase()
      return (
        booking.order.toLowerCase().includes(searchTerm) ||
        booking.name.toLowerCase().includes(searchTerm) ||
        booking.email.toLowerCase().includes(searchTerm)
      )
    })
  })
  
  const totalPages = computed(() => {
    return Math.ceil(filteredBookings.value.length / itemsPerPage)
  })
  
  const startIndex = computed(() => {
    return (currentPage.value - 1) * itemsPerPage
  })
  
  const endIndex = computed(() => {
    return Math.min(startIndex.value + itemsPerPage, filteredBookings.value.length)
  })
  
  const paginatedBookings = computed(() => {
    return filteredBookings.value.slice(startIndex.value, endIndex.value)
  })
  
  const toggleSelectAll = () => {
    if (selectAll.value) {
      selectedBookings.value = paginatedBookings.value.map(booking => booking.id)
    } else {
      selectedBookings.value = []
    }
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>