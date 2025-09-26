<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 py-6">
      <!-- Header with slide-in animation -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="space-y-1">
            <h1 class="text-xl font-bold text-gray-900 tracking-tight">Service Management</h1>
            <p class="text-gray-600 text-sm sm:text-base">Manage your services and their details</p>
          </div>
          <button
            @click="openCreateModal"
            class="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 self-start sm:self-auto"
          >
            <svg class="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Service</span>
          </button>
        </div>
      </div>

      <!-- Search and Filter Section with glass morphism -->
      <div class="mb-8 animate-fade-in-up" style="animation-delay: 0.1s">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1">
              <div class="relative group">
                <input
                  v-model="searchQuery"
                  placeholder="Search services..."
                  class="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500"
                >
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex gap-3">
              <select
                v-model="sortBy"
                class="px-4 py-4 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all duration-300 text-gray-900 min-w-[140px]"
              >
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
              <select
                v-model="sortOrder"
                class="px-4 py-4 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all duration-300 text-gray-900 min-w-[120px]"
              >
                <option v-for="option in orderOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State with pulse animation -->
      <div v-if="fetching" class="flex justify-center items-center h-64 animate-fade-in">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin animate-pulse" style="animation-delay: 0.1s"></div>
        </div>
      </div>

      <!-- Services Content -->
      <div v-else class="animate-fade-in-up" style="animation-delay: 0.2s">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <!-- Header -->
          <div class="px-6 py-5 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white/50">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 class="text-xl font-bold text-gray-900">
                All Services <span class="text-emerald-600">({{ totalServices }})</span>
              </h2>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <span class="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  Showing {{ startIndex }}-{{ endIndex }} of {{ totalServices }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-if="paginatedServices.length === 0" class="text-center py-16 px-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ searchQuery ? 'No matching services' : 'No services yet' }}
            </h3>
            <p class="text-gray-500 mb-8 max-w-md mx-auto">
              {{ searchQuery ? 'Try adjusting your search criteria to find what you\'re looking for.' : 'Get started by creating your first service to begin managing your offerings.' }}
            </p>
            <button
              v-if="!searchQuery"
              @click="openCreateModal"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Your First Service
            </button>
          </div>

          <!-- Mobile Card View -->
          <div v-else class="block lg:hidden">
            <div class="divide-y divide-gray-100">
              <div
                v-for="(service, index) in paginatedServices"
                :key="service.id"
                class="p-6 hover:bg-gray-50/50 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                :style="{ animationDelay: `${index * 0.05}s` }"
                style="animation: slideInLeft 0.6s ease-out forwards"
                @click="openViewModal(service)"
              >
                <div class="space-y-4">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0 space-y-2">
                      <h3 class="text-lg font-bold text-gray-900 truncate">
                        {{ service.serviceType }}
                      </h3>
                      <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {{ service.description }}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div class="text-xl font-bold text-emerald-600">
                        ₦{{ service?.price?.toLocaleString() }}
                      </div>
                      <div class="flex items-center gap-1 text-sm text-gray-500">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ service.duration }} hour{{ service.duration !== 1 ? 's' : '' }}
                      </div>
                    </div>
                    <div class="flex items-center gap-1">
                      <button
                        @click.stop="openEditModal(service)"
                        class="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        @click.stop="openDeleteModal(service)"
                        class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div v-if="service.ServiceProvider" class="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                    <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-14 0h2m0 0h2m-2 0V9a2 2 0 012-2h2a2 2 0 012 2v12" />
                    </svg>
                    <span class="font-medium">{{ service.ServiceProvider.businessName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Table View -->
          <div v-else class="hidden lg:block overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gradient-to-r from-gray-50 to-gray-100/50">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Service</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Description</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Duration</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Provider</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="(service, index) in paginatedServices"
                  :key="service.id"
                  class="hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-emerald-50/30 transition-all duration-300 cursor-pointer group"
                  :style="{ animationDelay: `${index * 0.05}s` }"
                  style="animation: fadeInUp 0.6s ease-out forwards"
                  @click="openViewModal(service)"
                >
                  <td class="px-6 py-5">
                    <div class="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                      {{ service.serviceType }}
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="text-sm text-gray-700 max-w-xs truncate group-hover:text-gray-900 transition-colors duration-200" :title="service.description">
                      {{ service.description }}
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="text-lg font-bold text-emerald-600">
                      ₦{{ service?.price?.toLocaleString() }}
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-1 text-sm text-gray-700">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ service.duration }} hour{{ service.duration !== 1 ? 's' : '' }}
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="text-sm text-gray-700">
                      {{ service.ServiceProvider?.businessName || 'N/A' }}
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        @click.stop="openEditModal(service)"
                        class="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        @click.stop="openDeleteModal(service)"
                        class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Enhanced Pagination -->
          <div v-if="totalPages > 1" class="px-6 py-5 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/30 to-white/30">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="text-sm font-medium text-gray-700 text-center sm:text-left">
                Page {{ currentPage }} of {{ totalPages }}
              </div>
              
              <div class="flex items-center justify-center sm:justify-end gap-2">
                <button
                  :disabled="currentPage === 1"
                  @click="goToPage(currentPage - 1)"
                  class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span class="hidden sm:inline">Previous</span>
                </button>

                <div class="hidden sm:flex items-center gap-1">
                  <template v-for="page in visiblePages" :key="page">
                    <button
                      v-if="page !== '...'"
                      @click="goToPage(page)"
                      :class="[
                        'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105',
                        page === currentPage
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-emerald-50 hover:border-emerald-300'
                      ]"
                    >
                      {{ page }}
                    </button>
                    <span v-else class="px-2 py-1 text-gray-500">...</span>
                  </template>
                </div>

                <button
                  :disabled="currentPage === totalPages"
                  @click="goToPage(currentPage + 1)"
                  class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  <span class="hidden sm:inline">Next</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div class="flex items-center gap-3 text-sm">
                <span class="font-medium text-gray-700">Show:</span>
                <select
                  v-model="itemsPerPage"
                  class="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                >
                  <option v-for="option in itemsPerPageOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Modal -->
    <ServicesServiceModal
      v-model="showServiceModal"
      :service="selectedService"
      :loading="creating || updating"
      @submit="handleServiceSubmit"
    />

    <!-- Enhanced View Service Modal -->
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
          v-if="showViewModal"
          class="fixed inset-0 z-50 overflow-y-auto"
          @click="showViewModal = false"
        >
          <div class="flex min-h-full items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"></div>
            
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to-class="opacity-100 translate-y-0 sm:scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 sm:scale-100"
              leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                v-if="selectedService"
                @click.stop
                class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all"
              >
                <!-- Modal Header -->
                <div class="relative px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100/50">
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <h3 class="text-2xl font-bold text-gray-900">Service Details</h3>
                      <p class="text-sm text-emerald-700 font-medium">{{ selectedService.serviceType }}</p>
                    </div>
                    <button
                      @click="showViewModal = false"
                      class="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200 transform hover:scale-110"
                    >
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Modal Content -->
                <div class="px-6 py-6 max-h-[70vh] overflow-y-auto">
                  <div class="space-y-6">
                    <!-- Service Info Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <!-- Price Card -->
                      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-5 border border-emerald-200/50">
                        <div class="flex items-center gap-3 mb-2">
                          <div class="p-2 bg-emerald-600 rounded-lg">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <h4 class="font-semibold text-gray-900">Price</h4>
                        </div>
                        <p class="text-3xl font-bold text-emerald-600">₦{{ selectedService?.price?.toLocaleString() }}</p>
                      </div>

                      <!-- Duration Card -->
                      <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 border border-blue-200/50">
                        <div class="flex items-center gap-3 mb-2">
                          <div class="p-2 bg-blue-600 rounded-lg">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 class="font-semibold text-gray-900">Duration</h4>
                        </div>
                        <p class="text-2xl font-bold text-blue-600">
                          {{ selectedService.duration }} hour{{ selectedService.duration !== 1 ? 's' : '' }}
                        </p>
                      </div>
                    </div>

                    <!-- Description -->
                    <div class="bg-gray-50 rounded-xl p-5 border border-gray-200/50">
                      <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Description
                      </h4>
                      <p class="text-gray-700 leading-relaxed">{{ selectedService.description }}</p>
                    </div>

                    <!-- Provider Info -->
                    <div v-if="selectedService.ServiceProvider" class="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-5 border border-purple-200/50">
                      <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-14 0h2m0 0h2m-2 0V9a2 2 0 012-2h2a2 2 0 012 2v12" />
                        </svg>
                        Service Provider
                      </h4>
                      <p class="text-lg font-semibold text-purple-700">{{ selectedService.ServiceProvider.businessName }}</p>
                    </div>

                    <!-- Additional Details -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div class="flex items-center gap-2 text-gray-600">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H3a1 1 0 00-1 1v8a1 1 0 001 1h18a1 1 0 001-1V8a1 1 0 00-1-1h-5M8 7h8" />
                        </svg>
                        <span>Service ID: {{ selectedService.id }}</span>
                      </div>
                      <div v-if="selectedService.createdAt" class="flex items-center gap-2 text-gray-600">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H3a1 1 0 00-1 1v8a1 1 0 001 1h18a1 1 0 001-1V8a1 1 0 00-1-1h-5M8 7h8" />
                        </svg>
                        <span>Created: {{ new Date(selectedService.createdAt).toLocaleDateString() }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Modal Actions -->
                <div class="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
                  <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                      @click="showViewModal = false; openEditModal(selectedService)"
                      class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 order-2 sm:order-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Service
                    </button>
                    <button
                      @click="showViewModal = false"
                      class="px-6 py-3 text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 order-1 sm:order-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Confirmation Modal -->
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
          v-if="showDeleteModal"
          class="fixed inset-0 z-50 overflow-y-auto"
          @click="showDeleteModal = false"
        >
          <div class="flex min-h-full items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"></div>
            
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to-class="opacity-100 translate-y-0 sm:scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 sm:scale-100"
              leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                @click.stop
                class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all"
              >
                <div class="p-6">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.081 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-bold text-gray-900">Delete Service</h3>
                      <p class="text-sm text-gray-600">This action cannot be undone</p>
                    </div>
                  </div>
                  
                  <p class="text-gray-700 mb-6">
                    Are you sure you want to delete <span class="font-semibold text-gray-900">'{{ selectedService?.serviceType }}'</span>? This will permanently remove the service from your system.
                  </p>
                  
                  <div class="flex gap-3">
                    <button
                      @click="handleDeleteService"
                      :disabled="deleting"
                      class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                    >
                      <svg v-if="deleting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {{ deleting ? 'Deleting...' : 'Delete Service' }}
                    </button>
                    <button
                      @click="showDeleteModal = false"
                      :disabled="deleting"
                      class="flex-1 px-4 py-3 text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import type { Service, CreateServicePayload } from '~/types';
import { useCreateServiceType } from "@/composables/modules/serviceTypes/useCreateServiceType";
import { useDeleteServiceType } from "@/composables/modules/serviceTypes/useDeleteServiceType";
import { useUpdateServiceType } from "@/composables/modules/serviceTypes/useUpdateServiceType";
import { useFetchServiceTypes } from "@/composables/modules/serviceTypes/useFetchServiceTypes";

// Composables
const { createServiceType, loading: creating } = useCreateServiceType();
const { updateServiceType, loading: updating } = useUpdateServiceType();
const { deleteServiceType, loading: deleting } = useDeleteServiceType();
const { fetchServiceTypes, serviceTypes: services, loading: fetching } = useFetchServiceTypes();

// Reactive state
const showServiceModal = ref(false);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const selectedService = ref<Service | null>(null);

// Search and filter state
const searchQuery = ref('');
const sortBy = ref('serviceType');
const sortOrder = ref('asc');

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Options
const sortOptions = [
  { value: 'serviceType', label: 'Service Type' },
  { value: 'price', label: 'Price' },
  { value: 'duration', label: 'Duration' },
  { value: 'createdAt', label: 'Created Date' }
];

const orderOptions = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' }
];

const itemsPerPageOptions = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' }
];

// Computed properties
const filteredServices = computed(() => {
  if (!services.value) return [];
  
  let filtered = services.value.filter(service => {
    const searchLower = searchQuery.value.toLowerCase();
    return (
      service.serviceType.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower) ||
      service.ServiceProvider?.businessName?.toLowerCase().includes(searchLower)
    );
  });

  // Sort services
  filtered.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy.value) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'duration':
        aValue = a.duration;
        bValue = b.duration;
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt || 0).getTime();
        bValue = new Date(b.createdAt || 0).getTime();
        break;
      default:
        aValue = a.serviceType.toLowerCase();
        bValue = b.serviceType.toLowerCase();
    }

    if (sortOrder.value === 'desc') {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    } else {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    }
  });

  return filtered;
});

const totalServices = computed(() => filteredServices.value.length);
const totalPages = computed(() => Math.ceil(totalServices.value / itemsPerPage.value));

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredServices.value.slice(start, end);
});

const startIndex = computed(() => {
  return totalServices.value === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1;
});

const endIndex = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return Math.min(end, totalServices.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
});

// Methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const openCreateModal = () => {
  selectedService.value = null;
  showServiceModal.value = true;
};

const openEditModal = (service: Service) => {
  selectedService.value = service;
  showServiceModal.value = true;
};

const openViewModal = (service: Service) => {
  selectedService.value = service;
  showViewModal.value = true;
};

const openDeleteModal = (service: Service) => {
  selectedService.value = service;
  showDeleteModal.value = true;
};

const handleServiceSubmit = async (data: CreateServicePayload) => {
  try {
    if (selectedService.value) {
      await updateServiceType(selectedService.value.id, data);
    } else {
      await createServiceType(data);
    }
    showServiceModal.value = false;
    await fetchServiceTypes();
  } catch (error) {
    console.error('Error submitting service:', error);
  }
};

const handleDeleteService = async () => {
  if (!selectedService.value) return;
  
  try {
    await deleteServiceType(selectedService.value.id);
    showDeleteModal.value = false;
    await fetchServiceTypes();
  } catch (error) {
    console.error('Error deleting service:', error);
  }
};

// Watchers
watch([searchQuery, sortBy, sortOrder, itemsPerPage], () => {
  currentPage.value = 1;
});

// Lifecycle
onMounted(() => {
  fetchServiceTypes();
});

// Meta
useHead({
  title: 'Service Management'
});

definePageMeta({
  layout: 'dashboard'
});
</script>

<style scoped>
/* Custom animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Enhanced hover effects */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:text-emerald-600 {
  color: #059669;
}

.group:hover .group-hover\:text-gray-900 {
  color: #111827;
}

/* Focus styles */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid #059669;
  outline-offset: 2px;
}

/* Loading animation enhancement */
@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse-scale 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>