<!-- <template>
  <div class="flex h-screen">

    <div v-if="isMobileMenuOpen" 
         class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
         @click="isMobileMenuOpen = false">
    </div>


    <aside 
      class="fixed inset-y-0 left-0 w-64 bg-[#282B2A] px-4 text-white transform lg:transform-none lg:opacity-100 transition-all duration-300 ease-in-out z-30"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
      <div class="p-6">
        <img src="@/assets/icons/logo-white.svg" alt="Elysian Beauty" class="h-8" />
      </div>
      <nav class="mt-6 space-y-4">
        <div 
          v-for="item in menuItems" 
          :key="item.label" 
          @click="item.action ? item.action() : handleMenuClick(item)"
          class="px-6 py-3 flex  rounded-full items-center gap-3 hover:bg-[#374151] cursor-pointer"
          :class="{ 'bg-[#045940] text-white': item.active }"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <NuxtLink v-if="item.path" :to="item.path">{{ item.label }}</NuxtLink>
          <span v-else>{{ item.label }}</span>
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
            <button @click="showNotifications = true" class="p-2">
              <img src="@/assets/icons/Bell.svg" alt="Profile" class="w-10 h-10 rounded-full" />
            </button>
            <div @click="router.push('/dashboard/profile')" class="flex cursor-pointer items-center gap-2">
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
        <div>
          <slot />
        </div>
      </main>
    </div>
  </div>
  <NotificationsPanel @close="closeNotifications" v-if="showNotifications" /> 
</template>

<script setup lang="ts">
import { useLogOut } from '@/composables/core/useLogout'
import profileImage from '@/assets/img/avatar.svg'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { 
  Home, Calendar, Clock, Mail, Settings, 
  HelpCircle, LogOut, ShoppingCart, Menu 
} from 'lucide-vue-next'
const { logout } = useLogOut()

const isMobileMenuOpen = ref(false)
const currentPage = ref('Overview')
const showNotifications = ref(false)
const closeNotifications = () => {
  showNotifications.value = false
}

const menuItems = [
  { label: 'Overview', path: '/dashboard', icon: Home, active: true },
  { label: 'Appointment', path: '/dashboard/appointments', icon: Calendar },
  { label: 'Recent Bookings', path: '/dashboard/recent-bookings', icon: Clock },
  { label: 'Messages', path: '/dashboard/message', icon: Mail },
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
      class="fixed inset-y-0 left-0 w-64 bg-[#282B2A] px-4 text-white transform lg:transform-none lg:opacity-100 transition-all duration-300 ease-in-out z-30"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
      <div class="p-6">
        <img src="@/assets/icons/logo-white.svg" alt="Elysian Beauty" class="h-8" />
      </div>
      <nav class="mt-6 space-y-4">
        <div 
          v-for="item in menuItems" 
          :key="item.label" 
          @click="item.action ? item.action() : handleMenuClick(item)"
          class="px-6 py-3 flex rounded-full items-center gap-3 hover:bg-[#374151] cursor-pointer"
          :class="{ 'bg-[#045940] text-white': item.active }"
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
      <header class="h-16 py-5 z-[9999] bg-white/90 fixed right-0 left-0 lg:left-64 z-10">
        <div class="h-full px-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button 
              class="lg:hidden text-gray-600 hover:text-gray-900"
              @click="isMobileMenuOpen = !isMobileMenuOpen">
              <Menu class="w-6 h-6" />
            </button>
            
            <!-- Search Bar -->
            <div class="relative hidden md:block">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search class="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search product, customer, etc..." 
                class="pl-10 pr-4 py-4 w-80 rounded-full border-[0.5px] border-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
          <div v-if="!userProfile.isComplete" class="hidden md:flex items-center gap-3">
              <div class="relative w-10 h-10 rounded-full bg-[#045940] text-sm flex items-center justify-center text-[#EBFEF8] font-medium">
                {{ userProfile.completionPercentage }}%
              </div>
              <div class="flex space-y-2 flex-col">
                <div class="flex items-center gap-1">
                  <span class="font-medium text-sm text-[#2B2D33]">Complete Setup</span>
                  <!-- <ChevronRight 
                    @click="router.push('/dashboard/profile')" 
                    class="w-5 h-5 cursor-pointer" 
                  /> -->
                  <svg  @click="router.push('/dashboard/profile')" class="cursor-pointer"  width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.25 7.24121L15.25 12.2412L10.25 17.2412" stroke="#282B2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                </div>
                <div class="w-36 h-2 bg-gray-200 rounded-full">
                  <div 
                    class="h-full bg-[#045940] rounded-full" 
                    :style="`width: ${userProfile.completionPercentage}%`"
                  ></div>
                </div>
              </div>
            </div>
          <div class="flex items-center gap-4">
            <!-- Profile Completion Section -->
            
            <!-- Notification Bell -->
            <button @click="showNotifications = true" class="p-2 relative">
              <Bell class="w-6 h-6 text-gray-600" />
              <span v-if="unreadNotifications > 0" class="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {{ unreadNotifications }}
              </span>
            </button>
            
            <!-- User Profile -->
            <div @click="router.push('/dashboard/profile')" class="flex cursor-pointer items-center gap-2">
              <img :src="profileImage" alt="Profile" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium">{{ userProfile.name }}</p>
                <span class="text-sm text-gray-600">{{ userProfile.role }}</span>
              </div>
              <ChevronDownIcon class="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="pt-24 h-screen overflow-y-auto bg-[#F9FAFB]">
        <div>
          <slot />
        </div>
      </main>
    </div>
  </div>
  <NotificationsPanel @close="closeNotifications" v-if="showNotifications" /> 
</template>

<script setup lang="ts">
import { useLogOut } from '@/composables/core/useLogout'
import profileImage from '@/assets/img/avatar.svg'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { 
  Home, Calendar, Clock, Mail, Settings, 
  HelpCircle, LogOut, ShoppingCart, Menu,
  Search, Bell, ChevronRight
} from 'lucide-vue-next'
import { ChevronDownIcon } from 'lucide-vue-next'
const { logout } = useLogOut()

const isMobileMenuOpen = ref(false)
const currentPage = ref('Overview')
const showNotifications = ref(false)
const unreadNotifications = ref(3)

// Dummy user profile object
const userProfile = ref({
  id: 1,
  name: 'Olas...',
  role: 'Professional',
  email: 'olas@example.com',
  phone: '',
  address: '123 Main St',
  city: 'Lagos',
  state: '',
  country: 'Nigeria',
  profilePicture: profileImage,
  businessHours: {
    set: true,
    details: []
  },
  services: {
    set: false,
    details: []
  },
  paymentMethods: {
    set: true,
    details: []
  },
  team: {
    set: false,
    details: []
  },
  notifications: {
    set: true,
    details: []
  }
})

// Calculate profile completion percentage
const calculateProfileCompletion = () => {
  const fields = [
    userProfile.value.phone !== '',
    userProfile.value.state !== '',
    userProfile.value.businessHours.set,
    userProfile.value.services.set,
    userProfile.value.paymentMethods.set,
    userProfile.value.team.set,
    userProfile.value.notifications.set
  ]
  
  const completedFields = fields.filter(field => field).length
  return Math.round((completedFields / fields.length) * 100)
}

// Computed property for profile completion percentage
userProfile.value.completionPercentage = calculateProfileCompletion()

// Computed property to check if profile is complete
userProfile.value.isComplete = computed(() => {
  return userProfile.value.completionPercentage === 100
})

const closeNotifications = () => {
  showNotifications.value = false
}

const menuItems = [
  { label: 'Overview', path: '/dashboard', icon: Home, active: true },
  { label: 'Appointment', path: '/dashboard/appointments', icon: Calendar },
  { label: 'Recent Bookings', path: '/dashboard/recent-bookings', icon: Clock },
  { label: 'Messages', path: '/dashboard/message', icon: Mail },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  { label: 'Help centre', path: '/dashboard/help-center', icon: HelpCircle },
  { label: 'Logout', icon: LogOut, action: handleLogout }
]

const handleMenuClick = (item: any) => {
  menuItems.forEach(menuItem => menuItem.active = menuItem.label === item.label)
  currentPage.value = item.label
  isMobileMenuOpen.value = false
}

function handleLogout() {
  console.log('Logging out...')
  localStorage.removeItem('token') 
  localStorage.removeItem('user')
  logout()
}
</script>