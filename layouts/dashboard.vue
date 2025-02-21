<!-- <template>
  <div class="flex h-screen">

    <div v-if="isMobileMenuOpen" 
         class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
         @click="isMobileMenuOpen = false">
    </div>


    <aside 
      class="fixed inset-y-0 left-0 w-64 bg-[#282B2A] text-white transform lg:transform-none lg:opacity-100 transition-all duration-300 ease-in-out z-30"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
      <div class="p-6">
        <img src="@/assets/icons/logo-white.svg" alt="Elysian Beauty" class="h-8" />
      </div>
      <nav class="mt-6">
        <div v-for="item in menuItems" 
          :key="item.label" 
          @click="handleMenuClick(item)"
          class="px-6 py-3 flex items-center gap-3 hover:bg-[#374151] cursor-pointer"
          :class="{ 'bg-[#1E4D43] text-white': item.active }">
          <component :is="item.icon" class="w-5 h-5" />
          <NuxtLink :to="item.path">{{ item.label }}</NuxtLink>
        </div>
        <div class="mt-8 px-6 text-gray-400 text-sm">PREFERENCE</div>
      </nav>
    </aside>


    <div class="flex-1 ml-0 lg:ml-64">

      <header class="bg-white h-16 fixed right-0 left-0 lg:left-64 z-10 border-b">
        <div class="h-full px-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button 
              class="lg:hidden text-gray-600 hover:text-gray-900"
              @click="isMobileMenuOpen = !isMobileMenuOpen">
              <Menu class="w-6 h-6" />
            </button>
            <h1 class="text-xl font-semibold text-gray-900">{{ currentPage }}</h1>
          </div>
          
          <div class="flex items-center gap-4">
            <button class="p-2">

            <img src="@/assets/icons/Bell.svg" alt="Profile" class="w-10 h-10 rounded-full" />
          </button>
          <div class="flex items-center gap-2">
            <img :src="profileImage" alt="Profile" class="w-10 h-10 rounded-full" />
           <div>
            <p>Olas...</p>
            <span class="text-sm text-gray-600">Professional</span>
           </div>
            <ChevronDownIcon class="w-4 h-4 text-gray-600" />
          </div>
          </div>
        </div>
      </header>


      <main class="pt-16 h-screen overflow-y-auto bg-[#F9FAFB]">
        <div class="">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import profileImage from '@/assets/img/avatar.svg'
    import { BellIcon, CameraIcon, ChevronDownIcon, ShareIcon } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { 
  Home, Calendar, Clock, Mail, Settings, 
  HelpCircle, LogOut, Search, Bell, ChevronDown,
  ArrowUp, ArrowDown, User, DollarSign, Users,
  ShoppingCart, Menu
} from 'lucide-vue-next'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const isMobileMenuOpen = ref(false)
const currentPage = ref('Overview')

const menuItems = [
  { label: 'Overview', path: '/dashboard', icon: Home, active: true },
  { label: 'Appointment', path: '/dashboard/appointnments', icon: Calendar },
  { label: 'Recent Bookings', path: '/dashboard/recent-boookings', icon: Clock },
  { label: 'Messages', path: '/dashboard/messages', icon: Mail },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  { label: 'Help centre', path: '/dashboard/help-center', icon: HelpCircle },
  { label: 'Logout', path: '/dashboard', icon: LogOut },
]

const handleMenuClick = (item: any) => {
  // Update active state
  menuItems.forEach(menuItem => menuItem.active = menuItem.label === item.label)
  currentPage.value = item.label
  // Close mobile menu after selection
  isMobileMenuOpen.value = false
}

// Rest of your existing script code...
const stats = [
  { 
    label: 'Total Sales', 
    value: '₦120,452', 
    change: 80,
    icon: DollarSign 
  },
  { 
    label: 'Customers', 
    value: '2000', 
    change: 90,
    icon: Users 
  },
  { 
    label: 'Product', 
    value: '1,423', 
    change: 88,
    icon: ShoppingCart 
  },
  { 
    label: 'Revenue', 
    value: '₦220,745.00', 
    change: -20,
    icon: DollarSign 
  },
]

const appointments = [
  {
    id: 1,
    date: '06',
    month: 'FEB',
    service: 'Haircut',
    time: 'WED | 02:30PM - 04:30PM',
    location: 'Sangotedo, Lekki Lagos',
    status: 'Confirmed',
    client: 'Olalekan'
  },
  {
    id: 2,
    date: '09',
    month: 'FEB',
    service: 'Massage',
    time: 'WED | 02:30PM - 04:30PM',
    location: 'Sangotedo, Lekki Lagos',
    status: 'Pending',
    client: 'Olalekan'
  },
  {
    id: 3,
    date: '09',
    month: 'FEB',
    service: 'Gele Tying',
    time: 'WED | 02:30PM - 04:30PM',
    location: 'Sangotedo, Lekki Lagos',
    status: 'Confirmed',
    client: 'Olalekan'
  }
]

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Earning',
      data: [200, 400, 600, 300, 500, 200, 700, 400],
      backgroundColor: '#E5E7EB',
      borderRadius: 4
    },
    {
      label: 'Expense',
      data: [300, 500, 400, 600, 400, 300, 500, 600],
      backgroundColor: '#1E4D43',
      borderRadius: 4
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}
</script> -->


<template>
  <div class="flex h-screen">
    <!-- Overlay for mobile menu -->
    <div v-if="isMobileMenuOpen" 
         class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
         @click="isMobileMenuOpen = false">
    </div>

    <!-- Mobile Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 w-64 bg-[#282B2A] text-white transform lg:transform-none lg:opacity-100 transition-all duration-300 ease-in-out z-30"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
      <div class="p-6">
        <img src="@/assets/icons/logo-white.svg" alt="Elysian Beauty" class="h-8" />
      </div>
      <nav class="mt-6">
        <div 
          v-for="item in menuItems" 
          :key="item.label" 
          @click="item.action ? item.action() : handleMenuClick(item)"
          class="px-6 py-3 flex items-center gap-3 hover:bg-[#374151] cursor-pointer"
          :class="{ 'bg-[#1E4D43] text-white': item.active }"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <NuxtLink v-if="item.path" :to="item.path">{{ item.label }}</NuxtLink>
          <span v-else>{{ item.label }}</span>
        </div>
        <div class="mt-8 px-6 text-gray-400 text-sm">PREFERENCE</div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 ml-0 lg:ml-64">
      <!-- Header -->
      <header class="bg-white h-16 fixed right-0 left-0 lg:left-64 z-10 border-b">
        <div class="h-full px-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button 
              class="lg:hidden text-gray-600 hover:text-gray-900"
              @click="isMobileMenuOpen = !isMobileMenuOpen">
              <Menu class="w-6 h-6" />
            </button>
            <h1 class="text-xl font-semibold text-gray-900">{{ currentPage }}</h1>
          </div>
          
          <div class="flex items-center gap-4">
            <button class="p-2">
              <img src="@/assets/icons/Bell.svg" alt="Profile" class="w-10 h-10 rounded-full" />
            </button>
            <div class="flex items-center gap-2">
              <img :src="profileImage" alt="Profile" class="w-10 h-10 rounded-full" />
              <div>
                <p>Olas...</p>
                <span class="text-sm text-gray-600">Professional</span>
              </div>
              <ChevronDownIcon class="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="pt-16 h-screen overflow-y-auto bg-[#F9FAFB]">
        <div>
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogOut } from '@/composables/core/useLogout'
import profileImage from '@/assets/img/avatar.svg'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Home, Calendar, Clock, Mail, Settings, 
  HelpCircle, LogOut, ShoppingCart, Menu 
} from 'lucide-vue-next'
const { logout } = useLogOut()

const router = useRouter()
const isMobileMenuOpen = ref(false)
const currentPage = ref('Overview')

const menuItems = [
  { label: 'Overview', path: '/dashboard', icon: Home, active: true },
  { label: 'Appointment', path: '/dashboard/appointments', icon: Calendar },
  { label: 'Recent Bookings', path: '/dashboard/recent-bookings', icon: Clock },
  { label: 'Messages', path: '/dashboard/messages', icon: Mail },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  { label: 'Help centre', path: '/dashboard/help-center', icon: HelpCircle },
  { label: 'Logout', icon: LogOut, action: handleLogout } // Updated logout action
]

const handleMenuClick = (item: any) => {
  menuItems.forEach(menuItem => menuItem.active = menuItem.label === item.label)
  currentPage.value = item.label
  isMobileMenuOpen.value = false
}

function handleLogout() {
  console.log('Logging out...')

  // Clear authentication data (example)
  localStorage.removeItem('token') 
  localStorage.removeItem('user')

  // // Redirect to login page
  // router.push('/login')
  logout()
}
</script>
