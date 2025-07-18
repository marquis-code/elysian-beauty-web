<template>
  <header class="w-full border-b border-gray-200 bg-white">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <div class="h-8 w-32">
          <img src="@/assets/img/blue-logo.png" />
        </div>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:block flex-grow mx-4 max-w-md">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-2.5 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Search product, customer, etc..."
          />
        </div>
      </div>

      <!-- Notification and Profile -->
      <div class="flex items-center space-x-4">
        <!-- Notification Icons -->
        <div class="flex space-x-2">
          <button class="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button class="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </button>
        </div>

        <!-- Profile -->
        <div class="flex items-center">
          <div class="h-8 w-8 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden">
            <!-- <img src="/profile-placeholder.png" alt="Profile" class="h-full w-full object-cover" /> -->
          </div>
          <div class="ml-2 hidden md:block">
            <div class="flex items-center">
              <span class="font-medium text-sm">Olas...</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="text-xs text-gray-500">Professional</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
