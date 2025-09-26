<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Mobile Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="closeMobileMenu"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 w-64 bg-[#282B2A] text-white transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Logo Section -->
      <div class="flex items-center justify-between p-6 border-b border-gray-700 lg:justify-center">
        <img src="@/assets/icons/logo-white.svg" alt="Elysian Beauty" class="h-8" />
        <button 
          @click="closeMobileMenu"
          class="text-white hover:text-gray-300 lg:hidden"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="mt-6 px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)]">
        <div 
          v-for="item in menuItems" 
          :key="item.label" 
          @click="handleMenuClick(item)"
          class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#374151]"
          :class="{ 
            'bg-[#045940] text-white': item.active,
            'text-gray-300 hover:text-white': !item.active 
          }"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <NuxtLink 
            v-if="item.path" 
            :to="item.path" 
            class="flex-1 text-sm font-medium"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </NuxtLink>
          <span v-else class="flex-1 text-sm font-medium">{{ item.label }}</span>
        </div>

        <!-- Preference Section -->
        <div class="mt-8 pt-4 border-t border-gray-700">
          <div class="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            Preference
          </div>
          <!-- Add preference items here if needed -->
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 lg:ml-0">
      <!-- Header -->
      <header class="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Left Section -->
            <div class="flex items-center gap-4">
              <!-- Mobile Menu Button -->
              <button 
                @click="toggleMobileMenu"
                class="text-gray-600 hover:text-gray-900 lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu class="w-6 h-6" />
              </button>
              
              <!-- Search Bar -->
              <div class="relative hidden sm:block">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search class="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search product, customer, etc..." 
                  class="pl-10 pr-4 py-2 w-64 md:w-80 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <!-- Right Section -->
            <div class="flex items-center gap-2 sm:gap-4">
              <!-- Profile Completion (Desktop) -->
              <div 
                v-if="!userProfile.isComplete" 
                class="hidden lg:flex items-center gap-3 cursor-pointer"
                @click="router.push('/dashboard/profile')"
              >
                <div class="relative w-10 h-10 rounded-full bg-[#045940] text-xs flex items-center justify-center text-[#EBFEF8] font-medium">
                  {{ userProfile.completionPercentage }}%
                </div>
                <div class="flex flex-col space-y-1">
                  <div class="flex items-center gap-1">
                    <span class="font-medium text-sm text-[#2B2D33]">Complete Setup</span>
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                  <div class="w-32 h-2 bg-gray-200 rounded-full">
                    <div 
                      class="h-full bg-[#045940] rounded-full transition-all duration-300" 
                      :style="`width: ${userProfile.completionPercentage}%`"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Mobile Search Button -->
              <button 
                @click="showMobileSearch = true"
                class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md sm:hidden"
              >
                <Search class="w-5 h-5" />
              </button>
              
              <!-- Notification Bell -->
              <button 
                @click="showNotifications = true" 
                class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <Bell class="w-5 h-5" />
                <span 
                  v-if="unreadNotifications > 0" 
                  class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-medium"
                >
                  {{ unreadNotifications > 9 ? '9+' : unreadNotifications }}
                </span>
              </button>
              
              <!-- User Profile Dropdown -->
              <div class="relative">
                <button 
                  @click="toggleDropdown" 
                  class="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img 
                    :src="profileImage" 
                    alt="Profile" 
                    class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                    @error="handleImageError"
                  />
                  <div class="hidden sm:block text-left">
                    <p class="font-medium text-sm text-gray-900 truncate max-w-20">{{ userProfile.name }}</p>
                    <span class="text-xs text-gray-600">{{ userProfile.role }}</span>
                  </div>
                  <ChevronDownIcon class="w-4 h-4 text-gray-600 transition-transform" :class="{ 'rotate-180': dropdownVisible }" />
                </button>

                <!-- Dropdown Menu -->
                <div 
                  v-if="dropdownVisible" 
                  ref="dropdownMenu"
                  class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 dropdown-menu"
                >
                  <!-- User Info Header -->
                  <div class="flex items-center gap-3 px-4 py-3 bg-[#E3E5E5] border-b">
                    <img 
                      src="@/assets/img/avatar-male.png" 
                      alt="Avatar"
                      class="w-10 h-10 rounded-full object-cover"
                      @error="handleImageError"
                    />
                    <div>
                      <h3 class="text-[#282B2A] text-sm font-semibold">{{ userProfile.fullName || 'Olasehinde Olalekan' }}</h3>
                      <p class="text-[#282B2A] text-xs">{{ userProfile.role }}</p>
                    </div>
                  </div>

                  <!-- Dropdown Items -->
                  <div class="py-1">
                    <button 
                      @click="goToProfile" 
                      class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99316 8.75H7.00619C5.17792 8.75 3.52114 9.8267 2.77861 11.4974C2.09877 13.027 3.21846 14.75 4.8924 14.75H11.1069C12.7809 14.75 13.9006 13.027 13.2207 11.4974C12.4782 9.8267 10.8214 8.75 8.99316 8.75Z" stroke="#282B2A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.33301 11.75L7.33301 12.75L9.66634 10.75" stroke="#282B2A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 4.75C6 3.64543 6.89543 2.75 8 2.75C9.10457 2.75 10 3.64543 10 4.75C10 5.85457 9.10457 6.75 8 6.75C6.89543 6.75 6 5.85457 6 4.75Z" stroke="#282B2A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span class="text-sm text-gray-700">Your profile</span>
                    </button>

                    <button 
                      @click="editAvailability" 
                      class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.55304 13.3315L3.29758 14.2318C2.80929 14.4267 2.56515 14.5241 2.42241 14.4361C2.37812 14.4088 2.34084 14.3716 2.31355 14.3273C2.22557 14.1845 2.32301 13.9404 2.51791 13.4521L3.41813 11.1966M5.55304 13.3315L12.9363 5.94826M5.55304 13.3315L5.33579 11.9156C5.30727 11.7298 5.29301 11.6368 5.24019 11.5686C5.22293 11.5463 5.20293 11.5263 5.18064 11.5091C5.1124 11.4563 5.01947 11.442 4.83361 11.4135L3.41813 11.1966M3.41813 11.1966L10.8014 3.81336M12.9363 5.94826L10.8014 3.81336M12.9363 5.94826L13.5992 5.28536C14.1888 4.69582 14.1888 3.74 13.5992 3.15046V3.15046C13.0097 2.56092 12.0539 2.56092 11.4643 3.15046L10.8014 3.81336M2 5.08301C3.33333 4.74967 4 4.08301 4.33333 2.74967C4.66667 4.08301 5.33333 4.74967 6.66667 5.08301C5.33333 5.41634 4.66667 6.08301 4.33333 7.41634C4 6.08301 3.33333 5.41634 2 5.08301ZM10 11.9163C10.6667 11.7497 11 11.4163 11.1667 10.7497C11.3333 11.4163 11.6667 11.7497 12.3333 11.9163C11.6667 12.083 11.3333 12.4163 11.1667 13.083C11 12.4163 10.6667 12.083 10 11.9163Z" stroke="#282B2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span class="text-sm text-gray-700">Edit Availability</span>
                    </button>

                    <button 
                      @click="goToAccountSettings" 
                      class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.63198 8.75C9.63198 9.64907 8.903 10.3779 8.00376 10.3779C7.10452 10.3779 6.37555 9.64907 6.37555 8.75C6.37555 7.85093 7.10452 7.12209 8.00376 7.12209C8.903 7.12209 9.63198 7.85093 9.63198 8.75Z" stroke="#282B2A" stroke-width="1.5" stroke-linejoin="round"/>
                        <path d="M6.11169 3.87835C6.47636 3.46814 6.6587 3.26303 6.84209 3.13218C7.53714 2.63623 8.47039 2.63623 9.16544 3.13218C9.34883 3.26303 9.53116 3.46814 9.89583 3.87835V3.87835C10.0117 4.0087 10.0696 4.07387 10.1315 4.1325C10.3603 4.34951 10.6371 4.50934 10.9395 4.59894C11.0212 4.62315 11.1066 4.64074 11.2775 4.67591V4.67591C11.8147 4.78645 12.0832 4.84172 12.288 4.93488C13.0658 5.28876 13.5329 6.09775 13.4504 6.94832C13.4287 7.17221 13.3423 7.43227 13.1696 7.95237V7.95237C13.1147 8.11774 13.0872 8.20042 13.0674 8.2832C12.9937 8.59004 12.9937 8.90996 13.0674 9.2168C13.0872 9.29958 13.1147 9.38226 13.1696 9.54763V9.54763C13.3423 10.0677 13.4287 10.3278 13.4504 10.5517C13.5329 11.4023 13.0658 12.2112 12.288 12.5651C12.0832 12.6583 11.8147 12.7135 11.2775 12.8241V12.8241C11.1066 12.8593 11.0212 12.8768 10.9395 12.9011C10.6371 12.9907 10.3603 13.1505 10.1315 13.3675C10.0696 13.4261 10.0117 13.4913 9.89583 13.6217V13.6217C9.53116 14.0319 9.34883 14.237 9.16544 14.3678C8.47039 14.8638 7.53714 14.8638 6.84209 14.3678C6.6587 14.237 6.47636 14.0319 6.11169 13.6217V13.6217C5.99582 13.4913 5.93788 13.4261 5.87606 13.3675C5.64726 13.1505 5.37038 12.9907 5.06803 12.9011C4.98634 12.8768 4.90089 12.8593 4.72998 12.8241V12.8241C4.19286 12.7135 3.9243 12.6583 3.71955 12.5651C2.94172 12.2112 2.47466 11.4023 2.55712 10.5517C2.57882 10.3278 2.66519 10.0677 2.83792 9.54763V9.54763C2.89285 9.38226 2.92031 9.29958 2.94018 9.2168C3.01383 8.90996 3.01383 8.59004 2.94018 8.2832C2.92031 8.20042 2.89285 8.11774 2.83792 7.95237V7.95237C2.66519 7.43227 2.57882 7.17221 2.55712 6.94832C2.47466 6.09775 2.94172 5.28876 3.71955 4.93488C3.9243 4.84172 4.19286 4.78645 4.72998 4.67591V4.67591C4.90089 4.64074 4.98634 4.62315 5.06803 4.59894C5.37038 4.50934 5.64726 4.34951 5.87606 4.1325C5.93788 4.07387 5.99582 4.0087 6.11169 3.87835V3.87835Z" stroke="#282B2A" stroke-width="1.5" stroke-linejoin="round"/>
                      </svg>
                      <span class="text-sm text-gray-700">Account Settings</span>
                    </button>

                    <button 
                      @click="handleLogout" 
                      class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors text-red-600"
                    >
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6667 12.0833L14 8.75M14 8.75L10.6667 5.41667M14 8.75H6M6 2.75H5.2C4.0799 2.75 3.51984 2.75 3.09202 2.96799C2.7157 3.15973 2.40973 3.46569 2.21799 3.84202C2 4.26984 2 4.82989 2 5.95V11.55C2 12.6701 2 13.2302 2.21799 13.658C2.40973 14.0343 2.71569 14.3403 3.09202 14.532C3.51984 14.75 4.0799 14.75 5.2 14.75H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span class="text-sm">Log out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Mobile Search Modal -->
      <div 
        v-if="showMobileSearch"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden mobile-search-modal"
        @click="showMobileSearch = false"
      >
        <div class="bg-white p-4" @click.stop>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search class="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search product, customer, etc..." 
              class="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              ref="mobileSearchInput"
            />
          </div>
          <button 
            @click="showMobileSearch = false"
            class="mt-4 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Profile Completion Banner (Mobile) -->
      <div 
        v-if="!userProfile.isComplete" 
        class="bg-green-50 border-b border-green-100 px-4 py-3 lg:hidden"
        @click="router.push('/dashboard/profile')"
      >
        <div class="flex items-center gap-3 cursor-pointer">
          <div class="w-8 h-8 rounded-full bg-[#045940] text-xs flex items-center justify-center text-white font-medium">
            {{ userProfile.completionPercentage }}%
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-1 mb-1">
              <span class="font-medium text-sm text-[#2B2D33]">Complete Setup</span>
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div 
                class="h-full bg-[#045940] rounded-full transition-all duration-300" 
                :style="`width: ${userProfile.completionPercentage}%`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-[#F9FAFB] p-4 sm:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>

  <!-- Modals and Overlays -->
  <NotificationsPanel 
    v-if="showNotifications" 
    @close="closeNotifications" 
  />
  
  <UpdatedAvailabilityModal 
    v-if="showAvailabilityModal" 
    @close="showAvailabilityModal = false"
    @save="handleSaveAvailability"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLogOut } from '@/composables/core/useLogout'
import { 
  Home, Calendar, Clock, Mail, Settings, 
  HelpCircle, LogOut, ShoppingCart, Menu,
  Search, Bell, ChevronRight, ChevronDownIcon
} from 'lucide-vue-next'

// Composables
const router = useRouter()
const { logout } = useLogOut()

// Reactive state
const isMobileMenuOpen = ref(false)
const currentPage = ref('Overview')
const showNotifications = ref(false)
const showMobileSearch = ref(false)
const unreadNotifications = ref(3)
const showAvailabilityModal = ref(false)
const dropdownVisible = ref(false)
const dropdownMenu = ref<HTMLElement | null>(null)
const mobileSearchInput = ref<HTMLInputElement | null>(null)
const profileImage = ref('@/assets/img/avatar-male.png')

// User profile data
const userProfile = ref({
  id: 1,
  name: 'Olas...',
  fullName: 'Olasehinde Olalekan',
  role: 'Professional',
  email: 'olas@example.com',
  phone: '',
  address: '123 Main St',
  city: 'Lagos',
  state: '',
  country: 'Nigeria',
  profilePicture: profileImage.value,
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
  },
  completionPercentage: 0,
  isComplete: false
})

// Menu items configuration
const menuItems = ref([
  { label: 'Overview', path: '/dashboard', icon: Home, active: true },
  { label: 'Appointment', path: '/dashboard/appointments', icon: Calendar },
  { label: 'Services', path: '/dashboard/services', icon: Clock },
  { label: 'Categories', path: '/dashboard/categories', icon: ShoppingCart },
  { label: 'Recent Bookings', path: '/dashboard/recent-bookings', icon: Clock },
  { label: 'Messages', path: '/dashboard/message', icon: Mail },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  { label: 'Help centre', path: '/dashboard/help-center', icon: HelpCircle },
  { label: 'Logout', icon: LogOut, action: handleLogout }
])

// Computed properties
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

// Initialize profile completion
userProfile.value.completionPercentage = calculateProfileCompletion()
userProfile.value.isComplete = userProfile.value.completionPercentage === 100

// Watch for mobile search modal
watch(showMobileSearch, (newValue) => {
  if (newValue) {
    nextTick(() => {
      if (mobileSearchInput.value) {
        mobileSearchInput.value.focus()
      }
    })
  }
})

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleMenuClick = (item: any) => {
  if (item.action) {
    item.action()
  } else {
    menuItems.value.forEach(menuItem => menuItem.active = menuItem.label === item.label)
    currentPage.value = item.label
  }
  closeMobileMenu()
}

function handleLogout() {
  console.log('Logging out...')
  localStorage.removeItem('token') 
  localStorage.removeItem('user')
  logout()
}

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

const closeDropdown = (event: MouseEvent) => {
  if (dropdownMenu.value && !dropdownMenu.value.contains(event.target as Node)) {
    dropdownVisible.value = false
  }
}

const closeNotifications = () => {
  showNotifications.value = false
}

const handleSaveAvailability = (data: any) => {
  console.log('Availability saved:', data)
  showAvailabilityModal.value = false
}

const goToProfile = () => {
  router.push('/dashboard/profile')
  dropdownVisible.value = false
}

const editAvailability = () => {
  showAvailabilityModal.value = true
  dropdownVisible.value = false
}

const goToAccountSettings = () => {
  router.push('/dashboard/settings')
  dropdownVisible.value = false
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-avatar.png' // Fallback image
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('mousedown', closeDropdown)
  
  // Close mobile menu on route change
  router.afterEach(() => {
    closeMobileMenu()
  })
})

</script>


<style scoped>
.dropdown-menu {
  position: absolute;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  top: 40px;
  right: 0;
  z-index: 10;
  border-radius: 8px;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 12px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
</style>