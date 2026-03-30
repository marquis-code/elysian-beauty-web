<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        @focus="showSearchResults = true"
        @blur="() => setTimeout(() => showSearchResults = false, 200)"
        type="text"
        placeholder="Search product, customer, etc..."
        class="w-full px-4 py-3 text-sm pl-10 border-[0.5px] border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
      />
      <svg
        class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>

      <!-- Search Results Dropdown -->
      <transition name="fade">
        <div
          v-if="showSearchResults && searchQuery"
          class="absolute top-full left-0 right-0 mt-2 bg-white border-[0.5px] border-gray-100 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto min-w-max"
        >
          <!-- Search Results Loading -->
          <div v-if="searchLoading" class="p-4 text-center">
            <div class="inline-block w-6 h-6 border-[0.5px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
            <p class="text-gray-500 text-sm mt-2">Searching...</p>
          </div>

          <!-- Search Results -->
          <div v-else-if="searchResults.length > 0">
            <!-- Services Results -->
            <div v-if="searchResults.some(r => r.type === 'service')" class="border-b border-gray-200">
              <div class="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide sticky top-0">Services</div>
              <div class="p-2">
              <div
                v-for="result in searchResults.filter(r => r.type === 'service')"
                :key="`service-${result.id}`"
                @click="selectSearchResult(result)"
                class="px-4 py-3 hover:bg-gray-25 cursor-pointer border-b-[0.5px] border-gray-50 transition-colors"
              >
              <!-- src="@/assets/img/about3.png" -->
                <div class="flex items-start space-x-3">
                  <div class="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src="@/assets/img/about3.png"
                      alt="Service"
                      class="w-full h-full object-cover"
                      @error="(e) => e.target.src = 'https://via.placeholder.com/48'"
                    />
                    <!-- <img
                      :src="result.image || 'https://via.placeholder.com/48'"
                      alt="Service"
                      class="w-full h-full object-cover"
                      @error="(e) => e.target.src = 'https://via.placeholder.com/48'"
                    /> -->
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 truncate">{{ result.name }}</h4>
                    <p class="text-xs text-gray-600 truncate">{{ result.provider }}</p>
                    <p class="text-sm font-semibold text-emerald-600 mt-1">₦{{ result.price?.toLocaleString() }}</p>
                  </div>
                </div>
              </div>
              </div>
            </div>

            <!-- Service Providers Results -->
            <div v-if="searchResults.some(r => r.type === 'provider')" class="border-b-[0.5px] border-gray-100">
              <div class="px-4 py-3 bg-gray-25 text-xs font-semibold text-gray-600 uppercase tracking-wide sticky top-0">Service Providers</div>
            <div class="p-2">
                  <div
                v-for="result in searchResults.filter(r => r.type === 'provider')"
                :key="`provider-${result.id}`"
                @click="selectSearchResult(result)"
                class="px-4 py-3 hover:bg-gray-25 rounded-2xl cursor-pointer border-b-[0.5px] border-gray-50 transition-colors"
              >
              <!-- {{ result }} -->
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-gray-900">{{ result.name }}</h4>
                    <p class="text-xs text-gray-600">{{ result.location }}</p>
                    <div v-if="result.verified" class="flex items-center space-x-1 mt-1">
                      <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-xs text-blue-600">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <!-- Service Types Results -->
            <div v-if="searchResults.some(r => r.type === 'serviceType')">
              <div class="px-4 py-2 bg-gray-25 text-xs rounded-3xl font-semibold text-gray-600 uppercase tracking-wide sticky top-0">Service Types</div>
              <div
                v-for="result in searchResults.filter(r => r.type === 'serviceType')"
                :key="`type-${result.id}`"
                @click="selectSearchResult(result)"
                class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b-[0.5px] bordr-l-0 border-gray-50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-gray-900">{{ result.name }}</h4>
                    <p class="text-xs text-gray-600">{{ result.count }} services available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div v-else class="p-8 text-center">
            <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <p class="text-gray-500 text-sm">No results found for "{{ searchQuery }}"</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetchServiceTypes } from '@/composables/modules/serviceTypes/useFetchServiceTypes'

// Props
interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search product, customer, etc...'
})

// Emits
interface SearchResult {
  id: string
  type: 'service' | 'provider' | 'serviceType'
  name: string
  provider?: string
  price?: number
  image?: string
  location?: string
  verified?: boolean
  count?: number
  serviceTypeId?: string
}

interface SearchEvent {
  type: 'service' | 'provider' | 'serviceType'
  result: SearchResult
}

const emit = defineEmits<{
  select: [event: SearchEvent]
  search: [query: string]
}>()

// State
const searchQuery = ref<string>('')
const searchResults = ref<SearchResult[]>([])
const searchLoading = ref(false)
const showSearchResults = ref(false)

// Composables
const { serviceTypes } = useFetchServiceTypes()

// Search functionality
const handleSearch = () => {
  emit('search', searchQuery.value)
  searchLoading.value = true

  setTimeout(() => {
    if (!searchQuery.value.trim()) {
      searchResults.value = []
      searchLoading.value = false
      return
    }

    const query = searchQuery.value.toLowerCase().trim()
    const results: SearchResult[] = []

    // Search through services
    if (serviceTypes.value) {
      serviceTypes.value.forEach(service => {
        const matchesService = service.serviceType?.toLowerCase().includes(query)
        const matchesProvider = service.ServiceProvider?.businessName?.toLowerCase().includes(query)
        const matchesLocation = service.ServiceProvider?.businessLocation?.toLowerCase().includes(query)

        if (matchesService || matchesProvider || matchesLocation) {
          results.push({
            id: service.id,
            type: 'service',
            name: service.ServiceProvider?.businessName || 'Unknown',
            provider: service.serviceType,
            price: service.price,
            image: service.image,
            serviceTypeId: service.serviceType
          })
        }
      })

      // Get unique service types
      const uniqueTypes = new Set(serviceTypes.value.map(s => s.serviceType))
      uniqueTypes.forEach(serviceType => {
        if (serviceType?.toLowerCase().includes(query)) {
          const count = serviceTypes.value?.filter(s => s.serviceType === serviceType).length || 0
          results.push({
            id: `type-${serviceType}`,
            type: 'serviceType',
            name: serviceType,
            count: count
          })
        }
      })

      // Get unique providers
      const uniqueProviders = new Map()
      serviceTypes.value.forEach(service => {
        const provider = service.ServiceProvider
        if (provider && !uniqueProviders.has(provider.businessName)) {
          if (
            provider.businessName?.toLowerCase().includes(query) ||
            provider.businessLocation?.toLowerCase().includes(query)
          ) {
            uniqueProviders.set(provider.businessName, {
            //   id: `provider-${provider.businessName}`,
              id: service?.id,
              type: 'provider',
              name: provider.businessName,
              location: provider.businessLocation,
              verified: provider.businessIsVerified
            })
          }
        }
      })

      results.push(...Array.from(uniqueProviders.values()))
    }

    searchResults.value = results.slice(0, 15) // Limit to 15 results
    searchLoading.value = false
  }, 300)
}

// Select search result
const selectSearchResult = (result: SearchResult) => {
  console.log(result, 'search ehere')
  emit('select', {
    type: result.type,
    result
  })

  navigateTo(`/explore/${result.id}`)

  searchQuery.value = ''
  showSearchResults.value = false
  searchResults.value = []
}

// Clear search
const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  showSearchResults.value = false
}

// Expose methods
defineExpose({
  clearSearch,
  searchQuery
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
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