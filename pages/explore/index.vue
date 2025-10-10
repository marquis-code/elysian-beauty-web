<!-- <template>
  <div class="bg-white min-h-screen container mx-auto">
    <header class="sticky top-0 z-50 bg-white">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between gap-6">
          <div class="flex-shrink-0">
            <NuxtLink to="/explore" class="flex items-center space-x-2">
             <img src="@/assets/img/blue-logo.png" class="h-8 w-32" />
            </NuxtLink>
          </div>

          <div class="flex-1 max-w-2xl">
            <SearchBar
              ref="searchBarComponent"
              @select="handleSearchSelect"
              @search="handleSearch"
            />
          </div>

          <div class="flex items-center space-x-4">
            <button class="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

          
            <button class="flex items-center space-x-2 p-2 rounded-lg transition-colors">
              <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </div>
              <div class="hidden md:block">
                <p class="text-sm text-start font-medium text-gray-900">{{ `${user?.firstName} ${user?.lastName}`}}</p>
                <p class="text-xs text-start text-gray-500">{{ user?.role ?? 'Nil' }}</p>
              </div>
              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="px-5 py-6">
      <div class="sticky top-20 z-40 bg-white pb-2 shadow-sm rounded-lg">
        <h2 class="text-xl font-medium text-gray-800 mb-4 px-1">Explore Category</h2>
        <div class="flex overflow-x-auto pb-2 -mx-1 hide-scrollbar mb-4 gap-2" ref="categoryScrollContainer">
          <button
            v-for="serviceType in uniqueServiceTypes"
            :key="serviceType"
            @click="scrollToServiceType(serviceType)"
            :class="[
              'flex-shrink-0 mx-1 px-4 py-2 rounded-full text-white text-sm whitespace-nowrap transition-all duration-300 font-medium',
              activeServiceType === serviceType
                ? 'bg-emerald-600 shadow-lg scale-105'
                : 'bg-emerald-800 hover:bg-emerald-700'
            ]"
          >
            {{ serviceType }}
          </button>
        </div>
      </div>

      <section v-if="fetchingServiceTypes && !filteredServices?.length" class="flex flex-col items-center justify-center py-16">
        <div class="relative">
          <div class="w-16 h-16 border-[0.5px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          <div class="flex justify-center mt-6 space-x-2">
            <div class="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style="animation-delay: 0ms;"></div>
            <div class="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style="animation-delay: 150ms;"></div>
            <div class="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style="animation-delay: 300ms;"></div>
          </div>
        </div>
        <p class="text-gray-600 mt-4 text-lg font-medium">Loading services...</p>
        <p class="text-gray-400 text-sm mt-1">Please wait while we fetch the latest services for you</p>
      </section>

      <section v-else-if="!fetchingServiceTypes && !filteredServices?.length" class="flex flex-col items-center justify-center py-20">
        <div class="text-center">
          <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
              <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
              <polyline points="3,7 12,13 21,7"></polyline>
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">No Services Available</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">
            {{ currentSearch ? `No services found for "${currentSearch}"` : 'We couldn\'t find any services at the moment. This might be temporary while we\'re updating our listings.' }}
          </p>
          <button @click="refreshServices" class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium">
            Refresh Page
          </button>
        </div>
      </section>
      <section v-else class="animate-fade-in">
        <div
          ref="scrollContainer"
          @scroll="handleScroll"
          class="max-h-[calc(100vh-350px)] mt-10 overflow-y-auto scroll-smooth"
        >
          <div class="space-y-8 pb-10 pr-2">
            <section
              v-for="serviceType in uniqueServiceTypesFiltered"
              :key="serviceType"
              :data-service-type="serviceType"
              :ref="(el) => setSectionRef(serviceType, el as HTMLElement)"
              class="mb-12 scroll-mt-40"
            >
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-800">{{ serviceType }}</h2>
                <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {{ getServiceCount(serviceType) }} service{{ getServiceCount(serviceType) !== 1 ? 's' : '' }}
                </span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                  v-for="(salon, index) in getServicesByType(serviceType)"
                  :key="`${serviceType}-${index}`"
                  @click="router.push(`/explore/${salon?.id}`)"
                  class="relative group cursor-pointer transform transition-all border-[0.5px] border-gray-100 rounded-2xl bg-white shadow-sm p-3 duration-200 hover:scale-105 hover:shadow-lg"
                >
            
                  <div class="relative overflow-hidden">
                    <div class="relative">
                        <img
                        src="@/assets/img/about3.png"
                        alt="Salon"
                        loading="lazy"
                        class="w-full h-[200px] rounded-xl object-cover group-hover:brightness-110 transition-all duration-200"
                        @error="(e) => e.target.src = 'https://via.placeholder.com/200'"
                      />
                    </div>
                    <button 
                      @click.stop="toggleFavorite(salon.id)"
                      class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 hover:text-red-500 transition-colors">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                    </button>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </div>
                  <div class="mt-3 space-y-2">
                    <h3 class="text-sm font-semibold text-gray-800 line-clamp-1">
                      {{ salon?.ServiceProvider?.businessName || 'Salon Name' }}
                    </h3>
                    <p class="text-base font-bold text-[#282B2A]">
                      <span class="text-sm font-[400]">From</span> ₦{{ salon?.price?.toLocaleString() || '0' }}
                    </p>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-gray-500 flex items-center gap-x-2 truncate flex-1 mr-2">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.0001 2.5C5.85797 2.5 2.49997 5.83333 3.33344 10C3.85761 12.6205 6.35932 15.0761 8.14386 16.5378C8.82698 17.0973 9.16854 17.3771 9.72646 17.4542C9.87755 17.475 10.1227 17.475 10.2738 17.4542C10.8317 17.3771 11.1732 17.0973 11.8564 16.5378C13.641 15.0762 16.1427 12.6205 16.6668 10C17.5 5.83333 14.1422 2.5 10.0001 2.5Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                          <path d="M12.5 9.29167C12.5 10.6724 11.3807 11.7917 10 11.7917C8.61929 11.7917 7.5 10.6724 7.5 9.29167C7.5 7.91095 8.61929 6.79167 10 6.79167C11.3807 6.79167 12.5 7.91095 12.5 9.29167Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                        </svg>
                        {{ salon?.ServiceProvider?.businessLocation || 'Location' }}
                      </span>
                      <div class="flex items-center space-x-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span class="text-gray-400">({{ salon?.reviews ?? 0 }})</span>
                      </div>
                    </div>
                    <div class="flex items-center justify-between">
                      <span v-if="salon?.ServiceProvider?.businessIsVerified" class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div v-if="loadingMore" class="flex justify-center py-8">
            <div class="w-8 h-8 border-[0.5px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          </div>

    
          <div v-if="!loadingMore && hasReachedEnd" class="text-center py-8">
            <p class="text-gray-500 text-sm">No more services to load</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchServiceTypes } from "@/composables/modules/serviceTypes/useFetchServiceTypes"
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useUser } from "@/composables/auth/useUser"
import { useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'

const router = useRouter()
const { serviceTypes, loading: fetchingServiceTypes } = useFetchServiceTypes()
const { user } = useUser()

// Refs
const scrollContainer = ref<HTMLElement | null>(null)
const categoryScrollContainer = ref<HTMLElement | null>(null)
const searchBarComponent = ref<any>(null)
const activeServiceType = ref<string>('')
const sectionRefs = ref<Record<string, HTMLElement>>({})
const loadingMore = ref(false)
const itemsPerServiceType = ref<Record<string, number>>({})
const hasReachedEnd = ref(false)
const scrollTimeout = ref<NodeJS.Timeout | null>(null)
const observerTimeout = ref<NodeJS.Timeout | null>(null)
const currentSearch = ref<string>('')

// Get unique service types from serviceTypes
const uniqueServiceTypes = computed(() => {
  if (!serviceTypes.value || serviceTypes.value.length === 0) return []
  
  const types = Array.from(new Set(serviceTypes.value.map(item => item.serviceType)))
  return types.sort() as string[]
})

// Get unique service types for filtered services
const uniqueServiceTypesFiltered = computed(() => {
  if (!filteredServices.value || filteredServices.value.length === 0) return []
  
  const types = Array.from(new Set(filteredServices.value.map(item => item.serviceType)))
  return types.sort() as string[]
})

// Filter services based on search query
const filteredServices = computed(() => {
  if (!currentSearch.value.trim()) return serviceTypes.value || []
  
  const query = currentSearch.value.toLowerCase().trim()
  
  return serviceTypes.value?.filter(service => {
    const matchesService = service.serviceType?.toLowerCase().includes(query)
    const matchesProvider = service.ServiceProvider?.businessName?.toLowerCase().includes(query)
    const matchesLocation = service.ServiceProvider?.businessLocation?.toLowerCase().includes(query)
    
    return matchesService || matchesProvider || matchesLocation
  }) || []
})

// Initialize items per service type
const initializeItemsPerServiceType = () => {
  const result: Record<string, number> = {}
  uniqueServiceTypes.value.forEach(serviceType => {
    result[serviceType] = 4
  })
  itemsPerServiceType.value = result
}

// Watch for serviceTypes changes
watch(() => serviceTypes.value, (newVal) => {
  if (newVal && newVal.length > 0) {
    initializeItemsPerServiceType()
    if (!activeServiceType.value && uniqueServiceTypes.value.length > 0) {
      activeServiceType.value = uniqueServiceTypes.value[0]
    }
  }
}, { immediate: true })

// Handle search bar select event
const handleSearchSelect = (event: any) => {
  const { type, result } = event
  
  if (type === 'service') {
    router.push(`/explore/${result.id}`)
  } else if (type === 'serviceType') {
    currentSearch.value = ''
    scrollToServiceType(result.name)
  } else if (type === 'provider') {
    router.push(`/providers/${result.name}`)
  }
}

// Handle search event
const handleSearch = (query: string) => {
  currentSearch.value = query
}

// Get services by type with pagination
const getServicesByType = (serviceType: string) => {
  const filtered = filteredServices.value?.filter(item => item.serviceType === serviceType) || []
  const limit = itemsPerServiceType.value[serviceType] || 4
  return filtered.slice(0, limit)
}

// Get service count
const getServiceCount = (serviceType: string) => {
  return filteredServices.value?.filter(item => item.serviceType === serviceType).length || 0
}

// Set section refs for scroll tracking
const setSectionRef = (serviceType: string, el: HTMLElement) => {
  if (el) {
    sectionRefs.value[serviceType] = el
  }
}

// Handle scroll to track active category
const handleScroll = (e: Event) => {
  const container = e.target as HTMLElement

  // Detect which service type is in view
  detectVisibleServiceType(container)

  // Infinite scroll: load more items when near bottom
  if (container.scrollHeight - (container.scrollTop + container.clientHeight) < 800) {
    loadMoreItems()
  }
}

// Detect which service type is currently visible
const detectVisibleServiceType = (container: HTMLElement) => {
  if (observerTimeout.value) {
    clearTimeout(observerTimeout.value)
  }

  observerTimeout.value = setTimeout(() => {
    const scrollTop = container.scrollTop
    const containerHeight = container.clientHeight
    const threshold = containerHeight / 3

    let currentActive = activeServiceType.value
    let maxVisibility = 0

    Object.entries(sectionRefs.value).forEach(([serviceType, element]) => {
      const elementTop = element.offsetTop
      const elementHeight = element.offsetHeight
      const elementBottom = elementTop + elementHeight

      // Calculate how much of this element is visible
      const visibleTop = Math.max(scrollTop, elementTop)
      const visibleBottom = Math.min(scrollTop + containerHeight, elementBottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibility = visibleHeight / containerHeight

      if (visibility > maxVisibility) {
        maxVisibility = visibility
        currentActive = serviceType
      }
    })

    if (currentActive !== activeServiceType.value) {
      activeServiceType.value = currentActive
      scrollCategoryIntoView(currentActive)
    }
  }, 100)
}

// Scroll the category button into view
const scrollCategoryIntoView = (serviceType: string) => {
  if (!categoryScrollContainer.value) return

  nextTick(() => {
    const button = categoryScrollContainer.value?.querySelector(
      `button:nth-child(${uniqueServiceTypesFiltered.value.indexOf(serviceType) + 1})`
    ) as HTMLElement

    if (button) {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  })
}

// Load more items (infinite scroll)
const loadMoreItems = () => {
  if (loadingMore.value || hasReachedEnd.value) return

  loadingMore.value = true
  
  setTimeout(() => {
    let allLoaded = true

    Object.keys(itemsPerServiceType.value).forEach(serviceType => {
      const total = getServiceCount(serviceType)
      const current = itemsPerServiceType.value[serviceType]
      
      if (current < total) {
        itemsPerServiceType.value[serviceType] = Math.min(current + 3, total)
        allLoaded = false
      }
    })

    if (allLoaded) {
      hasReachedEnd.value = true
    }

    loadingMore.value = false
  }, 600)
}

// Scroll to service type section
const scrollToServiceType = (serviceType: string) => {
  const element = sectionRefs.value[serviceType]
  if (element && scrollContainer.value) {
    activeServiceType.value = serviceType
    const elementTop = element.offsetTop - 120 // Account for sticky nav
    
    scrollContainer.value.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    })

    // Also scroll category button into view
    nextTick(() => {
      scrollCategoryIntoView(serviceType)
    })
  }
}

// Toggle favorite
const toggleFavorite = (salonId: string) => {
  console.log('Toggled favorite for salon:', salonId)
  // Add your favorite logic here
}

// Refresh services
const refreshServices = () => {
  currentSearch.value = ''
  if (searchBarComponent.value) {
    searchBarComponent.value.clearSearch()
  }
  initializeItemsPerServiceType()
  hasReachedEnd.value = false
  if (uniqueServiceTypes.value.length > 0) {
    activeServiceType.value = uniqueServiceTypes.value[0]
  }
}

// Initialize on mount
onMounted(() => {
  if (uniqueServiceTypes.value.length > 0) {
    activeServiceType.value = uniqueServiceTypes.value[0]
  }
})

definePageMeta({
  layout: 'header-only'
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Custom pulse animation with delays */
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}

/* Line clamp utility */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scroll behavior */
.scroll-smooth {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style> -->


<template>
  <div class="bg-white min-h-screen container mx-auto ">
    <!-- Reusable Header Component -->
    <ReusableHeaderWithSearch
      ref="headerComponent"
      :user="user"
      :show-search="true"
      :show-notifications="true"
      support-email="elysianbeauty@gmail.com"
      @logout="handleLogout"
      @navigate-to-profile="goToProfile"
      @search-select="handleSearchSelect"
      @search="handleSearch"
    />

    <div class="px-5 py-6">
      <!-- Sticky Service Type Navigation -->
      <div class="sticky top-20 z-40 bg-white pb-2 shadow-sm rounded-lg">
        <h2 class="text-xl font-medium text-gray-800 mb-4 px-1">Explore Category</h2>
        <div class="flex overflow-x-auto pb-2 -mx-1 hide-scrollbar mb-4 gap-2" ref="categoryScrollContainer">
          <button
            v-for="serviceType in uniqueServiceTypes"
            :key="serviceType"
            @click="scrollToServiceType(serviceType)"
            :class="[
              'flex-shrink-0 mx-1 px-4 py-2 rounded-full text-white text-sm whitespace-nowrap transition-all duration-300 font-medium',
              activeServiceType === serviceType
                ? 'bg-emerald-600 shadow-lg scale-105'
                : 'bg-emerald-800 hover:bg-emerald-700'
            ]"
          >
            {{ serviceType }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <section v-if="fetchingServiceTypes && !filteredServices?.length" class="flex flex-col items-center justify-center py-16">
        <div class="relative">
          <div class="w-16 h-16 border-[0.5px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          <div class="flex justify-center mt-6 space-x-2">
            <div class="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style="animation-delay: 0ms;"></div>
            <div class="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style="animation-delay: 150ms;"></div>
            <div class="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style="animation-delay: 300ms;"></div>
          </div>
        </div>
        <p class="text-gray-600 mt-4 text-lg font-medium">Loading services...</p>
        <p class="text-gray-400 text-sm mt-1">Please wait while we fetch the latest services for you</p>
      </section>

      <!-- Empty State -->
      <section v-else-if="!fetchingServiceTypes && !filteredServices?.length" class="flex flex-col items-center justify-center py-20">
        <div class="text-center">
          <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
              <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
              <polyline points="3,7 12,13 21,7"></polyline>
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">No Services Available</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">
            {{ currentSearch ? `No services found for "${currentSearch}"` : 'We couldn\'t find any services at the moment. This might be temporary while we\'re updating our listings.' }}
          </p>
          <button @click="refreshServices" class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium">
            Refresh Page
          </button>
        </div>
      </section>

      <!-- Services Content with Infinite Scroll max-h-[calc(100vh-350px)] -->
      <section v-else class="animate-fade-in">
        <div
          ref="scrollContainer"
          @scroll="handleScroll"
          class=" mt-10 overflow-y-auto scroll-smooth"
        >
          <div class="space-y-8 pb-10 pr-2">
            <section
              v-for="serviceType in uniqueServiceTypesFiltered"
              :key="serviceType"
              :data-service-type="serviceType"
              :ref="(el) => setSectionRef(serviceType, el as HTMLElement)"
              class="mb-12 scroll-mt-40"
            >
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-800">{{ serviceType }}</h2>
                <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {{ getServiceCount(serviceType) }} service{{ getServiceCount(serviceType) !== 1 ? 's' : '' }}
                </span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                  v-for="(salon, index) in getServicesByType(serviceType)"
                  :key="`${serviceType}-${index}`"
                  @click="router.push(`/explore/${salon?.id}`)"
                  class="relative group cursor-pointer transform transition-all border-[0.5px] border-gray-100 rounded-2xl bg-white shadow-sm p-3 duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <div class="relative overflow-hidden">
                    <div class="relative">
                      <img
                        src="@/assets/img/about3.png"
                        alt="Salon"
                        loading="lazy"
                        class="w-full h-[200px] rounded-xl object-cover group-hover:brightness-110 transition-all duration-200"
                        @error="(e) => e.target.src = 'https://via.placeholder.com/200'"
                      />
                    </div>
                    <button 
                      @click.stop="toggleFavorite(salon.id)"
                      class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 hover:text-red-500 transition-colors">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                    </button>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </div>
                  <div class="mt-3 space-y-2">
                    <h3 class="text-sm font-semibold text-gray-800 line-clamp-1">
                      {{ salon?.ServiceProvider?.businessName || 'Salon Name' }}
                    </h3>
                    <p class="text-base font-bold text-[#282B2A]">
                      <span class="text-sm font-[400]">From</span> ₦{{ salon?.price?.toLocaleString() || '0' }}
                    </p>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-gray-500 flex items-center gap-x-2 truncate flex-1 mr-2">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.0001 2.5C5.85797 2.5 2.49997 5.83333 3.33344 10C3.85761 12.6205 6.35932 15.0761 8.14386 16.5378C8.82698 17.0973 9.16854 17.3771 9.72646 17.4542C9.87755 17.475 10.1227 17.475 10.2738 17.4542C10.8317 17.3771 11.1732 17.0973 11.8564 16.5378C13.641 15.0762 16.1427 12.6205 16.6668 10C17.5 5.83333 14.1422 2.5 10.0001 2.5Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                          <path d="M12.5 9.29167C12.5 10.6724 11.3807 11.7917 10 11.7917C8.61929 11.7917 7.5 10.6724 7.5 9.29167C7.5 7.91095 8.61929 6.79167 10 6.79167C11.3807 6.79167 12.5 7.91095 12.5 9.29167Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                        </svg>
                        {{ salon?.ServiceProvider?.businessLocation || 'Location' }}
                      </span>
                      <div class="flex items-center space-x-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span class="text-gray-400">({{ salon?.reviews ?? 0 }})</span>
                      </div>
                    </div>
                    <div class="flex items-center justify-between">
                      <span v-if="salon?.ServiceProvider?.businessIsVerified" class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Loading indicator for infinite scroll -->
          <div v-if="loadingMore" class="flex justify-center py-8">
            <div class="w-8 h-8 border-[0.5px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          </div>

          <!-- End of content indicator -->
          <div v-if="!loadingMore && hasReachedEnd" class="text-center py-8">
            <p class="text-gray-500 text-sm">No more services to load</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchServiceTypes } from "@/composables/modules/serviceTypes/useFetchServiceTypes"
import ReusableHeaderWithSearch from "@/components/ReusableHeaderWithSearch.vue"
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useUser } from "@/composables/auth/useUser"
import { useRouter } from 'vue-router'

const router = useRouter()
const { serviceTypes, loading: fetchingServiceTypes } = useFetchServiceTypes()
const { user } = useUser()

// Refs
const headerComponent = ref<any>(null)
const scrollContainer = ref<HTMLElement | null>(null)
const categoryScrollContainer = ref<HTMLElement | null>(null)
const activeServiceType = ref<string>('')
const sectionRefs = ref<Record<string, HTMLElement>>({})
const loadingMore = ref(false)
const itemsPerServiceType = ref<Record<string, number>>({})
const hasReachedEnd = ref(false)
const observerTimeout = ref<NodeJS.Timeout | null>(null)
const currentSearch = ref<string>('')

// Get unique service types from serviceTypes
const uniqueServiceTypes = computed(() => {
  if (!serviceTypes.value || serviceTypes.value.length === 0) return []
  
  const types = Array.from(new Set(serviceTypes.value.map(item => item.serviceType)))
  return types.sort() as string[]
})

// Get unique service types for filtered services
const uniqueServiceTypesFiltered = computed(() => {
  if (!filteredServices.value || filteredServices.value.length === 0) return []
  
  const types = Array.from(new Set(filteredServices.value.map(item => item.serviceType)))
  return types.sort() as string[]
})

// Filter services based on search query
const filteredServices = computed(() => {
  if (!currentSearch.value.trim()) return serviceTypes.value || []
  
  const query = currentSearch.value.toLowerCase().trim()
  
  return serviceTypes.value?.filter(service => {
    const matchesService = service.serviceType?.toLowerCase().includes(query)
    const matchesProvider = service.ServiceProvider?.businessName?.toLowerCase().includes(query)
    const matchesLocation = service.ServiceProvider?.businessLocation?.toLowerCase().includes(query)
    
    return matchesService || matchesProvider || matchesLocation
  }) || []
})

// Initialize items per service type
const initializeItemsPerServiceType = () => {
  const result: Record<string, number> = {}
  uniqueServiceTypes.value.forEach(serviceType => {
    result[serviceType] = 4
  })
  itemsPerServiceType.value = result
}

// Watch for serviceTypes changes
watch(() => serviceTypes.value, (newVal) => {
  if (newVal && newVal.length > 0) {
    initializeItemsPerServiceType()
    if (!activeServiceType.value && uniqueServiceTypes.value.length > 0) {
      activeServiceType.value = uniqueServiceTypes.value[0]
    }
  }
}, { immediate: true })

// Handle search bar select event
const handleSearchSelect = (event: any) => {
  const { type, result } = event
  
  if (type === 'service') {
    router.push(`/explore/${result.id}`)
  } else if (type === 'serviceType') {
    currentSearch.value = ''
    scrollToServiceType(result.name)
  } else if (type === 'provider') {
    router.push(`/providers/${result.name}`)
  }
}

// Handle search event
const handleSearch = (query: string) => {
  currentSearch.value = query
}

// Get services by type with pagination
const getServicesByType = (serviceType: string) => {
  const filtered = filteredServices.value?.filter(item => item.serviceType === serviceType) || []
  const limit = itemsPerServiceType.value[serviceType] || 4
  return filtered.slice(0, limit)
}

// Get service count
const getServiceCount = (serviceType: string) => {
  return filteredServices.value?.filter(item => item.serviceType === serviceType).length || 0
}

// Set section refs for scroll tracking
const setSectionRef = (serviceType: string, el: HTMLElement) => {
  if (el) {
    sectionRefs.value[serviceType] = el
  }
}

// Handle scroll to track active category
const handleScroll = (e: Event) => {
  const container = e.target as HTMLElement

  // Detect which service type is in view
  detectVisibleServiceType(container)

  // Infinite scroll: load more items when near bottom
  if (container.scrollHeight - (container.scrollTop + container.clientHeight) < 800) {
    loadMoreItems()
  }
}

// Detect which service type is currently visible
const detectVisibleServiceType = (container: HTMLElement) => {
  if (observerTimeout.value) {
    clearTimeout(observerTimeout.value)
  }

  observerTimeout.value = setTimeout(() => {
    const scrollTop = container.scrollTop
    const containerHeight = container.clientHeight

    let currentActive = activeServiceType.value
    let maxVisibility = 0

    Object.entries(sectionRefs.value).forEach(([serviceType, element]) => {
      const elementTop = element.offsetTop
      const elementHeight = element.offsetHeight
      const elementBottom = elementTop + elementHeight

      // Calculate how much of this element is visible
      const visibleTop = Math.max(scrollTop, elementTop)
      const visibleBottom = Math.min(scrollTop + containerHeight, elementBottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibility = visibleHeight / containerHeight

      if (visibility > maxVisibility) {
        maxVisibility = visibility
        currentActive = serviceType
      }
    })

    if (currentActive !== activeServiceType.value) {
      activeServiceType.value = currentActive
      scrollCategoryIntoView(currentActive)
    }
  }, 100)
}

// Scroll the category button into view
const scrollCategoryIntoView = (serviceType: string) => {
  if (!categoryScrollContainer.value) return

  nextTick(() => {
    const button = categoryScrollContainer.value?.querySelector(
      `button:nth-child(${uniqueServiceTypesFiltered.value.indexOf(serviceType) + 1})`
    ) as HTMLElement

    if (button) {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  })
}

// Load more items (infinite scroll)
const loadMoreItems = () => {
  if (loadingMore.value || hasReachedEnd.value) return

  loadingMore.value = true
  
  setTimeout(() => {
    let allLoaded = true

    Object.keys(itemsPerServiceType.value).forEach(serviceType => {
      const total = getServiceCount(serviceType)
      const current = itemsPerServiceType.value[serviceType]
      
      if (current < total) {
        itemsPerServiceType.value[serviceType] = Math.min(current + 3, total)
        allLoaded = false
      }
    })

    if (allLoaded) {
      hasReachedEnd.value = true
    }

    loadingMore.value = false
  }, 600)
}

// Scroll to service type section
const scrollToServiceType = (serviceType: string) => {
  const element = sectionRefs.value[serviceType]
  if (element && scrollContainer.value) {
    activeServiceType.value = serviceType
    const elementTop = element.offsetTop - 120 // Account for sticky nav
    
    scrollContainer.value.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    })

    // Also scroll category button into view
    nextTick(() => {
      scrollCategoryIntoView(serviceType)
    })
  }
}

// Toggle favorite
const toggleFavorite = (salonId: string) => {
  console.log('Toggled favorite for salon:', salonId)
  // Add your favorite logic here
}

// Refresh services
const refreshServices = () => {
  currentSearch.value = ''
  if (headerComponent.value) {
    headerComponent.value.clearSearch()
  }
  initializeItemsPerServiceType()
  hasReachedEnd.value = false
  if (uniqueServiceTypes.value.length > 0) {
    activeServiceType.value = uniqueServiceTypes.value[0]
  }
}

// Handle logout
const handleLogout = () => {
  // Add your logout logic here
  console.log('Logging out...')
}

// Navigate to profile
const goToProfile = () => {
  router.push('/profile')
}

// Initialize on mount
onMounted(() => {
  if (uniqueServiceTypes.value.length > 0) {
    activeServiceType.value = uniqueServiceTypes.value[0]
  }
})

definePageMeta({
  layout: 'header-only'
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Custom pulse animation with delays */
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}

/* Line clamp utility */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scroll behavior */
.scroll-smooth {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>