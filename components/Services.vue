<template>
    <div class="min-h-screen">
      <!-- Services/Categories Section -->
      <main class="container mx-auto px-4">
        <h1 class="text-xl font-bold mb-2">Services/Categories</h1>
        <p class="text-gray-600 font-light mb-6">Please enter your name and email to update your details.</p>
  
        <!-- Tabs -->
        <div class="mb-6 flex justify-between items-center">
          <nav class=" flex space-x-8">
            <button 
              @click="activeTab = 'services'"
              :class="[
                activeTab === 'services' 
                  ? 'border-[#282B2A] text-[#282B2A]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium'
              ]"
            >
              Services
            </button>
            <button 
              @click="activeTab = 'categories'"
              :class="[
                activeTab === 'categories' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium'
              ]"
            >
              Categories
            </button>
          </nav>

          <button 
            @click="openNewServiceModal"
            class="bg-gray-900 text-white px-4 py-2.5 rounded-full text-sm text-sm font-medium hover:bg-gray-800"
          >
            New Service
          </button>
        </div>
  
        <!-- Services List -->
        <div class="flex justify-between items-center mb-6">
          <div class="grid grid-cols-3 border-b-[0.5px] border-gray-300 pb-10 w-full text-sm font-medium text-gray-500">
            <span>Service Name</span>
            <span>Price</span>
            <span>Categories</span>
          </div>
        </div>
  
        <div class="space-y-2">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="grid grid-cols-3 items-center py-4"
          >
            <span class="text-gray-900 font-medium">{{ service.name }}</span>
            <span class="text-gray-600">{{ formatPrice(service.price) }}</span>
            <div class="flex items-center justify-between">
              <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                {{ service.category }}
              </span>
              <button class="text-gray-400 hover:text-gray-600">
                <span class="sr-only">Menu</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Service {
    id: number
    name: string
    price: number
    category: string
  }
  
  const activeTab = ref('services')
  
  const services = ref<Service[]>([
    { id: 1, name: 'Haircut', price: 1500.00, category: 'Hair' },
    { id: 2, name: 'Gele Magic', price: 1500.00, category: 'Styling' },
    { id: 3, name: 'Hair extensions', price: 1500.00, category: 'Hair' },
    { id: 4, name: 'Nails', price: 1500.00, category: 'Beauty' },
    { id: 5, name: 'Massage', price: 1500.00, category: 'Wellness' },
    { id: 6, name: 'Makeup', price: 1500.00, category: 'Beauty' },
  ])
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price)
  }
  
  const openNewServiceModal = () => {
    // Implementation for new service modal
  }
  </script>