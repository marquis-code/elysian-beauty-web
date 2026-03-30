<template>
  <header class="relative bg-white shadow-sm">
    <div class="p-4 md:p-6 lg:flex lg:space-x-0 space-y-3 lg:space-y-0 justify-between items-center">
      <!-- Left Section: Business Info -->
      <div class="flex-1">
        <h1 class="text-xl font-black text-[#282B2A] truncate">
          {{ serviceProvider?.ServiceProvider?.businessName ?? 'Service Provider' }}
        </h1>
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
          <!-- Rating -->
          <div class="flex items-center">
            <span class="text-sm font-medium text-gray-900">5.0</span>
            <div class="flex ml-1 gap-0.5">
              <svg
                v-for="i in 5"
                :key="i"
                width="16"
                height="16"
                class="md:w-5 md:h-5"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8411 11.933C15.6253 12.1422 15.5261 12.4447 15.5753 12.7413L16.3161 16.8413C16.3786 17.1888 16.2319 17.5405 15.9411 17.7413C15.6561 17.9497 15.2769 17.9747 14.9661 17.808L11.2753 15.883C11.1469 15.8147 11.0044 15.778 10.8586 15.7738H10.6328C10.5544 15.7855 10.4778 15.8105 10.4078 15.8488L6.71611 17.783C6.53361 17.8747 6.32694 17.9072 6.12444 17.8747C5.63111 17.7813 5.30194 17.3113 5.38277 16.8155L6.12444 12.7155C6.17361 12.4163 6.07444 12.1122 5.85861 11.8997L2.84944 8.98301C2.59777 8.73884 2.51027 8.37217 2.62527 8.04134C2.73694 7.71134 3.02194 7.47051 3.36611 7.41634L7.50777 6.81551C7.82277 6.78301 8.09944 6.59134 8.24111 6.30801L10.0661 2.56634C10.1094 2.48301 10.1653 2.40634 10.2328 2.34134L10.3078 2.28301C10.3469 2.23967 10.3919 2.20384 10.4419 2.17467L10.5328 2.14134L10.6744 2.08301H11.0253C11.3386 2.11551 11.6144 2.30301 11.7586 2.58301L13.6078 6.30801C13.7411 6.58051 14.0003 6.76967 14.2994 6.81551L18.4411 7.41634C18.7911 7.46634 19.0836 7.70801 19.1994 8.04134C19.3086 8.37551 19.2144 8.74217 18.9578 8.98301L15.8411 11.933Z"
                  fill="#282B2A"
                />
              </svg>
            </div>
            <span class="ml-1 text-xs md:text-sm text-gray-500">(7)</span>
          </div>

          <!-- Timing -->
          <div class="text-xs md:text-sm text-[#282B2A] truncate">
            Closed, opens at 9:00am
          </div>

          <!-- Verification Status -->
          <div class="text-xs md:text-sm text-[#282B2A]">
            <span class="inline-flex items-center gap-1">
              <span
                class="w-2 h-2 rounded-full"
                :class="
                  serviceProvider?.ServiceProvider?.businessIsVerified
                    ? 'bg-green-500'
                    : 'bg-gray-400'
                "
              ></span>
              {{ serviceProvider?.ServiceProvider?.businessIsVerified ? 'Verified' : 'Not Verified' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right Section: Action Buttons -->
      <div class="flex items-center gap-2 md:gap-4 ml-auto md:ml-0">
        <!-- Support Button -->
        <button
          @click.stop="toggleSupportModal"
          class="p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
          :class="{ 'bg-gray-200': showSupportModal }"
          title="Support"
        >
          <svg
            width="20"
            height="20"
            class="md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </button>

        <!-- Profile Button with User Info -->
        <div class="relative">
          <button
            @click.stop="toggleProfileDropdown"
            class="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-[#045940] text-white hover:bg-[#034a32] transition-all duration-200 transform hover:scale-105 active:scale-95"
            :class="{ 'bg-[#034a32]': showProfileDropdown }"
            title="Profile Menu"
          >
            <!-- User Avatar Circle -->
            <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
              <span class="text-sm md:text-base font-semibold text-white">
                {{ userInitials }}
              </span>
            </div>
            
            <!-- User Info - Hidden on mobile -->
            <div class="hidden md:flex flex-col items-start text-left">
              <span class="text-sm font-medium text-white leading-tight">
                {{ userName }}
              </span>
              <span class="text-xs text-white text-opacity-80 leading-tight">
                {{ userEmail }}
              </span>
            </div>

            <!-- Dropdown Arrow -->
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-transform duration-200 flex-shrink-0"
              :class="{ 'rotate-180': showProfileDropdown }"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <!-- Profile Dropdown Menu -->
          <Transition
            enter-active-class="transition duration-200 ease-out origin-top-right"
            enter-from-class="opacity-0 scale-95 -translate-y-2"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in origin-top-right"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-2"
          >
            <div
              v-if="showProfileDropdown"
              class="absolute right-0 mt-2 w-48 md:w-56 bg-white rounded-lg shadow-xl border-[0.5px] border-gray-50 py-2 z-40"
              @click.stop
            >
              <!-- User Info in Dropdown (for mobile) -->
              <div class="md:hidden px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-900 truncate">{{ userName }}</p>
                <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
              </div>

              <!-- Profile Option -->
              <button
                @click="navigateToProfile"
                class="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 group"
              >
                <svg
                  width="18"
                  height="18"
                  class="md:w-5 md:h-5 text-gray-400 group-hover:text-[#045940]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="group-hover:text-[#045940]">My Profile</span>
              </button>

              <!-- Divider -->
              <div class="h-px bg-gray-100 my-1"></div>

              <!-- Logout Option -->
              <button
                @click="handleLogoutClick"
                class="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center gap-3 group"
              >
                <svg
                  width="18"
                  height="18"
                  class="md:w-5 md:h-5 text-red-400 group-hover:text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span class="group-hover:text-red-700">Logout</span>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Book Now Button -->
        <button
          @click="handleNavigationToBookingPage"
          class="bg-[#045940] text-white text-sm px-4 md:px-10 py-3 rounded-full font-medium hover:bg-[#034a32] active:scale-95 transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
        >
          BOOK NOW
        </button>
      </div>
    </div>

    <!-- Support Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showSupportModal"
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          @click.self="closeSupportModal"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out transform"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in transform"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" @click.stop>
              <!-- Modal Header -->
              <div class="bg-gradient-to-r from-[#045940] to-[#034a32] px-6 py-4 flex items-center justify-between">
                <h2 class="text-xl font-bold text-white">Support</h2>
                <button
                  @click="closeSupportModal"
                  class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all duration-200"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <!-- Modal Content -->
              <div class="p-6 space-y-6">
                <!-- Email Support Section -->
                <div class="space-y-3">
                  <h3 class="font-semibold text-gray-800 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-10 5L2 7"></path>
                    </svg>
                    Email Support
                  </h3>
                  <p class="text-sm text-gray-600">Contact us at:</p>
                  <div class="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <code class="flex-1 text-sm text-gray-800 break-all">elysianbeauty@gmail.com</code>
                    <button
                      @click="copySupportEmail"
                      class="ml-2 px-3 py-1 bg-[#045940] text-white text-xs rounded hover:bg-[#034a32] transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
                      :class="{ 'bg-green-500 hover:bg-green-600': emailCopied }"
                    >
                      <svg v-if="!emailCopied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {{ emailCopied ? 'Copied!' : 'Copy' }}
                    </button>
                  </div>
                </div>

                <!-- Divider -->
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <!-- Message Form Section -->
                <div class="space-y-4">
                  <h3 class="font-semibold text-gray-800 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Send us a Message
                  </h3>

                  <!-- Name Input -->
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Your Email</label>
                    <input
                      v-model="supportForm.email"
                      type="email"
                      placeholder="your@email.com"
                      class="custom-input"
                    />
                  </div>

                  <!-- Title Input -->
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      v-model="supportForm.title"
                      type="text"
                      placeholder="What do you need help with?"
                      class="custom-input"
                    />
                  </div>

                  <!-- Message Input -->
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      v-model="supportForm.message"
                      placeholder="Please describe your issue..."
                      rows="4"
                      class="custom-input resize-none"
                    ></textarea>
                  </div>

                  <!-- Submit Button -->
                  <button
                    @click="submitSupportMessage"
                    :disabled="isSubmittingSupport"
                    class="w-full bg-[#045940] text-white py-3 text-sm rounded-lg hover:bg-[#034a32] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg v-if="!isSubmittingSupport" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="1"></circle>
                      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24"></path>
                    </svg>
                    <span>{{ isSubmittingSupport ? 'Sending...' : 'Send Message' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Logout Confirmation Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showLogoutModal"
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          @click.self="closeLogoutModal"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out transform"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in transform"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden" @click.stop>
              <!-- Modal Header -->
              <div class="bg-gradient-to-r from-red-500 to-red-600 p-6 flex items-center justify-center">
                <svg width="32" height="32" class="text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4m0 4h.01"></path>
                </svg>
              </div>

              <!-- Modal Content -->
              <div class="p-6 text-center space-y-4">
                <h2 class="text-xl font-bold text-gray-900">Confirm Logout</h2>
                <p class="text-gray-600 text-sm">
                  Are you sure you want to logout? You'll need to sign in again to access your account.
                </p>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-10">
                  <button
                    @click="closeLogoutModal"
                    class="flex-1 px-4 py-2 text-sm md:text-base border-[0.5px] border-gray-100 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    @click="confirmLogout"
                    :disabled="isLoggingOut"
                    class="flex-1 px-4 py-2 text-sm md:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg v-if="!isLoggingOut" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>{{ isLoggingOut ? 'Logging out...' : 'Yes, Logout' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

interface ServiceProviderData {
  ServiceProvider?: {
    businessName: string
    businessIsVerified: boolean
  }
}

interface UserData {
  name?: string
  email?: string
  firstName?: string
  lastName?: string
}

interface SupportFormData {
  email: string
  title: string
  message: string
}

const props = defineProps<{
  serviceProvider?: ServiceProviderData
  user?: UserData
}>()

const emit = defineEmits<{
  logout: []
  navigateToProfile: []
}>()

const route = useRoute()
const router = useRouter()

// State - FIXED: Changed initial value from true to false
const showProfileDropdown = ref(false)
const showSupportModal = ref(false)
const showLogoutModal = ref(false)
const emailCopied = ref(false)
const isSubmittingSupport = ref(false)
const isLoggingOut = ref(false)

const supportForm = ref<SupportFormData>({
  email: '',
  title: '',
  message: ''
})

// Computed properties for user display
const userName = computed(() => {
  if (props.user?.name) return props.user.name
  if (props.user?.firstName && props.user?.lastName) {
    return `${props.user.firstName} ${props.user.lastName}`
  }
  if (props.user?.firstName) return props.user.firstName
  return 'User'
})

const userEmail = computed(() => {
  return props.user?.email || 'user@example.com'
})

const userInitials = computed(() => {
  const name = userName.value
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
})

// Methods - FIXED: Added .stop to prevent event propagation
const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value
  if (showProfileDropdown.value) {
    showSupportModal.value = false
  }
}

const toggleSupportModal = () => {
  showSupportModal.value = !showSupportModal.value
  if (showSupportModal.value) {
    showProfileDropdown.value = false
  }
}

const closeSupportModal = () => {
  showSupportModal.value = false
  resetSupportForm()
}

const closeLogoutModal = () => {
  showLogoutModal.value = false
}

const handleNavigationToBookingPage = () => {
  // navigateTo(`/explore/${route?.params?.id}/book`)
   navigateTo(`/explore/${route?.params?.id}/choose-service`)
  showProfileDropdown.value = false
}

const navigateToProfile = () => {
  emit('navigateToProfile')
  showProfileDropdown.value = false
}

const handleLogoutClick = () => {
  showProfileDropdown.value = false
  showLogoutModal.value = true
}

const copySupportEmail = async () => {
  try {
    await navigator.clipboard.writeText('elysianbeauty@gmail.com')
    emailCopied.value = true
    setTimeout(() => {
      emailCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}

const submitSupportMessage = async () => {
  if (!supportForm.value.email || !supportForm.value.title || !supportForm.value.message) {
    alert('Please fill in all fields')
    return
  }

  isSubmittingSupport.value = true

  try {
    await $fetch('/api/send-support-email', {
      method: 'POST',
      body: {
        userEmail: supportForm.value.email,
        subject: supportForm.value.title,
        message: supportForm.value.message,
        businessEmail: 'elysianbeauty@gmail.com'
      }
    })

    alert('Message sent successfully! We will get back to you soon.')
    closeSupportModal()
  } catch (err) {
    console.error('Failed to send message:', err)
    alert('Failed to send message. Please try again or contact us directly.')
  } finally {
    isSubmittingSupport.value = false
  }
}

const confirmLogout = async () => {
  isLoggingOut.value = true

  try {
    if (process.client) {
      localStorage.clear()
      sessionStorage.clear()
    }

    emit('logout')
    await navigateTo('/')
  } catch (err) {
    console.error('Logout error:', err)
    isLoggingOut.value = false
  }
}

const resetSupportForm = () => {
  supportForm.value = {
    email: '',
    title: '',
    message: ''
  }
}

// FIXED: Better event handling for closing dropdowns
const handleOutsideClick = (event: MouseEvent) => {
  showProfileDropdown.value = false
  showSupportModal.value = false
}

if (process.client) {
  onMounted(() => {
    document.addEventListener('click', handleOutsideClick)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutsideClick)
  })
}
</script>