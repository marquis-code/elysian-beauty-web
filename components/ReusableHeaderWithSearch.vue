<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between gap-6">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/explore" class="flex items-center space-x-2">
            <img src="@/assets/img/blue-logo.png" class="h-8 w-32" alt="Logo" />
          </NuxtLink>
        </div>

        <!-- Search Bar Component (Optional) -->
        <div v-if="showSearch" class="flex-1 max-w-2xl">
          <SearchBar
            ref="searchBarComponent"
            @select="handleSearchSelect"
            @search="handleSearch"
          />
        </div>

        <!-- Right Side Icons -->
        <div class="flex items-center space-x-4">
          <!-- Notification Icon -->
          <button 
            v-if="showNotifications"
            class="relative p-2 text-gray-600 hover:text-primary transition-colors"
            title="Notifications"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

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

          <!-- User Profile Dropdown -->
          <div class="relative">
            <button
              @click.stop="toggleProfileDropdown"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-sm font-semibold text-white">
                  {{ userInitials }}
                </span>
              </div>
              <div class="hidden md:block">
                <p class="text-sm text-start font-medium text-gray-900">{{ userName }}</p>
                <p class="text-xs text-start text-gray-500">{{ userRole }}</p>
              </div>
              <svg 
                class="w-4 h-4 text-gray-600 transition-transform duration-200" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                :class="{ 'rotate-180': showProfileDropdown }"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
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
                    class="md:w-5 md:h-5 text-gray-400 group-hover:text-primary"
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
                  <span class="group-hover:text-primary">My Profile</span>
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
        </div>
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
              <div class="bg-primary px-6 py-4 flex items-center justify-between">
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
                    <code class="flex-1 text-sm text-gray-800 break-all">{{ supportEmail }}</code>
                    <button
                      @click="copySupportEmail"
                      class="ml-2 px-3 py-1 bg-primary text-white text-xs rounded transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
                      :class="{ 'bg-primary': emailCopied }"
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

                  <!-- Email Input -->
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Your Email</label>
                    <input
                      v-model="supportForm.email"
                      type="email"
                      placeholder="your@email.com"
                      class="custom-input"
                    />
                  </div>

                  <!-- Subject Input -->
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
                    class="w-full bg-primary text-white py-3 text-sm rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg v-if="!isSubmittingSupport" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
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
                <div class="flex gap-3 pt-4">
                  <button
                    @click="closeLogoutModal"
                    class="flex-1 px-4 py-2 text-sm md:text-base border-[0.5px] border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
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

interface UserData {
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  role?: string
}

interface SupportFormData {
  email: string
  title: string
  message: string
}

interface Props {
  user?: UserData
  showSearch?: boolean
  showNotifications?: boolean
  supportEmail?: string
}

const props = withDefaults(defineProps<Props>(), {
  showSearch: true,
  showNotifications: true,
  supportEmail: 'elysianbeauty@gmail.com'
})

const emit = defineEmits<{
  logout: []
  navigateToProfile: []
  searchSelect: [event: any]
  search: [query: string]
}>()

const router = useRouter()

// Refs
const searchBarComponent = ref<any>(null)
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

// Computed properties
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

const userRole = computed(() => {
  return props.user?.role || 'User'
})

const userInitials = computed(() => {
  const name = userName.value
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
})

// Methods
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
    await navigator.clipboard.writeText(props.supportEmail)
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
        businessEmail: props.supportEmail
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

const handleSearchSelect = (event: any) => {
  emit('searchSelect', event)
}

const handleSearch = (query: string) => {
  emit('search', query)
}

// Handle outside clicks
const handleOutsideClick = () => {
  showProfileDropdown.value = false
}

// Expose methods for parent components
defineExpose({
  clearSearch: () => {
    if (searchBarComponent.value) {
      searchBarComponent.value.clearSearch?.()
    }
  }
})

if (process.client) {
  onMounted(() => {
    document.addEventListener('click', handleOutsideClick)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutsideClick)
  })
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>