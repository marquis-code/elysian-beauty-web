<template>
  <div class="min-h-screen ">
    <main class="container mx-auto">
      <div class="px-6 pt-10 space-y-6">
        <div class="relative">
            <input type="text" 
              v-model="tableSearch"
              placeholder="Search order..."
              class="w-full px-4 py-4 font-light pl-10 rounded-xl bg-white border-[0.5px] focus:outline-none focus:border-gray-100"
            />
            <svg class="absolute left-0 top-4 left-3"  width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.81478 2.5332C14.1261 2.5332 17.6329 6.04004 17.6329 10.3513C17.6329 12.3854 16.8523 14.2405 15.5749 15.6328L18.0884 18.1411C18.3237 18.3763 18.3245 18.7569 18.0892 18.9921C17.972 19.1109 17.8171 19.1696 17.6629 19.1696C17.5096 19.1696 17.3554 19.1109 17.2374 18.9937L14.6936 16.457C13.3554 17.5286 11.6587 18.1703 9.81478 18.1703C5.50349 18.1703 1.99585 14.6626 1.99585 10.3513C1.99585 6.04004 5.50349 2.5332 9.81478 2.5332ZM9.81478 3.73747C6.16744 3.73747 3.20012 6.70399 3.20012 10.3513C3.20012 13.9987 6.16744 16.966 9.81478 16.966C13.4613 16.966 16.4286 13.9987 16.4286 10.3513C16.4286 6.70399 13.4613 3.73747 9.81478 3.73747Z" fill="#171717"/>
</svg>

          </div>
        <div class="overflow-hidden border-[0.5px] border-gray-100 sm:rounded-lg">
    
          <table class="w-full rounded-2xl bprder-[0.5px] border-gray-100 overflow-hidden">
            <thead class="bg-white">
              <tr>
                <th class="px-4 py-3 text-left">
                  <input type="checkbox" 
                    v-model="selectAll"
                    @change="toggleSelectAll"
                    class="rounded border-gray-300"
                  />
                </th>
                <th class="px-4 py-6 text-left text-sm text-[#A3A8A7] font-medium">ORDER</th>
                <th class="px-4 py-6 text-left text-sm text-[#A3A8A7] font-medium">CUSTOMER</th>
                <th class="px-4 py-6 text-left text-sm text-[#A3A8A7] font-medium">DATE</th>
                <th class="px-4 py-6 text-left text-sm text-[#A3A8A7] font-medium">SERVICE</th>
                <th class="px-4 py-6 text-left text-sm text-[#A3A8A7] font-medium">STATUS</th>
                <th class="px-4 py-6 text-left text-sm text-[#A3A8A7] font-medium">METHOD</th>
                <th class="px-4 py-6 text-left text-sm text-[#A3A8A7] font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking in paginatedBookings" :key="booking.id" class="border-b-[0.5px] bg-white">
                <td class="px-4 py-4 bg-white">
                  <input type="checkbox" 
                    v-model="selectedBookings"
                    :value="booking.id"
                    class="rounded border-gray-300"
                  />
                </td>
                <td class="px-4 py-4 bg-white text-sm">#{{ booking.order }}</td>
                <td class="px-4 py-4 bg-white">
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
                <td class="px-4 py-4 bg-white text-sm">{{ booking.date }}</td>
                <td class="px-4 py-4 bg-white text-sm">{{ booking.service }}</td>
                <td class="px-4 py-4 bg-white">
                  <span :class="[
                    'px-2 py-1 text-xs rounded-full',
                    booking.status === 'Confirmed' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-yellow-50 text-yellow-600'
                  ]">
                    {{ booking.status }}
                  </span>
                </td>
                <td class="px-4 py-4 bg-white">
                  <div class="flex items-center gap-2">
                    <img src="@/assets/icons/master-card.svg" alt="Mastercard" class="h-5" />
                    <span class="text-sm text-gray-500">•••• 1234</span>
                  </div>
                </td>
                <td class="px-4 py-4 bg-white">
                  <button class="text-gray-400 hover:text-gray-600">
                    <EllipsisHorizontalIcon class="h-5 w-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="px-4 py-6 flex items-center justify-between">
            <p class="text-sm text-gray-500">
              Displaying {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredBookings.length }} entries
            </p>
            <div class="flex items-center gap-2">
              <button 
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-[#282B2A] flex items-center gap-x-2"
                :class="currentPage === 1 ? 'text-gray-400' : 'hover:bg-gray-50'"
              >
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5601 12.8427C10.6049 12.8875 10.6404 12.9406 10.6646 12.9991C10.6888 13.0576 10.7013 13.1202 10.7013 13.1835C10.7013 13.2468 10.6888 13.3095 10.6646 13.368C10.6404 13.4264 10.6049 13.4796 10.5601 13.5243C10.5154 13.5691 10.4622 13.6046 10.4037 13.6288C10.3453 13.653 10.2826 13.6655 10.2193 13.6655C10.156 13.6655 10.0933 13.653 10.0349 13.6288C9.97638 13.6046 9.92325 13.5691 9.87849 13.5243L5.06141 8.70725C5.01662 8.66251 4.98109 8.60938 4.95685 8.55091C4.93261 8.49243 4.92013 8.42974 4.92013 8.36644C4.92013 8.30314 4.93261 8.24045 4.95685 8.18197C4.98109 8.1235 5.01662 8.07037 5.06141 8.02563L9.87849 3.20855C9.96888 3.11816 10.0915 3.06738 10.2193 3.06738C10.3471 3.06738 10.4697 3.11816 10.5601 3.20855C10.6505 3.29894 10.7013 3.42153 10.7013 3.54936C10.7013 3.67719 10.6505 3.79978 10.5601 3.89017L6.08324 8.36644L10.5601 12.8427Z" fill="#282B2A"/>
              </svg>

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
                class="px-3 py-1 text-[#282B2A] flex items-center gap-x-2"
                :class="currentPage === totalPages ? 'text-gray-400' : 'hover:bg-gray-50'"
              >
                Next <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9142 8.70725L7.09717 13.5243C7.05241 13.5691 6.99928 13.6046 6.9408 13.6288C6.88233 13.653 6.81965 13.6655 6.75636 13.6655C6.69307 13.6655 6.63039 13.653 6.57192 13.6288C6.51344 13.6046 6.46031 13.5691 6.41555 13.5243C6.3708 13.4796 6.33529 13.4264 6.31107 13.368C6.28685 13.3095 6.27438 13.2468 6.27438 13.1835C6.27438 13.1202 6.28685 13.0576 6.31107 12.9991C6.33529 12.9406 6.3708 12.8875 6.41555 12.8427L10.8924 8.36644L6.41555 3.89017C6.32516 3.79978 6.27438 3.67719 6.27438 3.54936C6.27438 3.42153 6.32516 3.29894 6.41555 3.20855C6.50594 3.11816 6.62853 3.06738 6.75636 3.06738C6.88419 3.06738 7.00678 3.11816 7.09717 3.20855L11.9142 8.02563C11.959 8.07037 11.9946 8.1235 12.0188 8.18197C12.0431 8.24045 12.0555 8.30314 12.0555 8.36644C12.0555 8.42974 12.0431 8.49243 12.0188 8.55091C11.9946 8.60938 11.959 8.66251 11.9142 8.70725Z" fill="#282B2A"/>
</svg>

              </button>
            </div>
          </div>
        </div>
      </div>


    </main>
  </div>
</template>

<script setup lang="ts">
import avatar from '@/assets/img/user-avatar.svg'
import { ref, computed } from 'vue'
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
    avatar: avatar
  },
  {
    id: 2,
    order: '345918',
    name: 'Emeka Okafor',
    email: 'Emeka.Okafor@gmail.com',
    date: 'Feb. 02, 10:21AM',
    service: 'Haircut',
    status: 'Pending',
    avatar: avatar
  },  {
    id: 3,
    order: '345918',
    name: 'Emeka Okafor',
    email: 'Emeka.Okafor@gmail.com',
    date: 'Feb. 02, 10:21AM',
    service: 'Haircut',
    status: 'Confirmed',
    avatar: avatar
  },  {
    id: 4,
    order: '345918',
    name: 'Emeka Okafor',
    email: 'Emeka.Okafor@gmail.com',
    date: 'Feb. 02, 10:21AM',
    service: 'Haircut',
    status: 'Pending',
    avatar: avatar
  },  {
    id: 5,
    order: '345918',
    name: 'Emeka Okafor',
    email: 'Emeka.Okafor@gmail.com',
    date: 'Feb. 02, 10:21AM',
    service: 'Haircut',
    status: 'Confirmed',
    avatar: avatar
  },
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

definePageMeta({
  layout: 'dashboard'
})
</script>

<style>
/* Add any additional styles here */
</style>