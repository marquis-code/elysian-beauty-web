<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <!-- Header -->
      <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h1m5-12v12m0 0h7a2 2 0 002-2V9a2 2 0 00-2-2h-7m0 12H9a2 2 0 01-2-2V9a2 2 0 012-2h3"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900">Salon Availability</h1>
                <p class="text-sm text-gray-600">Manage your salon's operating hours</p>
              </div>
            </div>
            
            <!-- Save Button -->
            <button
              @click="handleSave"
              :disabled="loading"
              class="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Loading State -->
        <div v-if="loading && !availability" class="flex items-center justify-center py-12">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Loading Availability</h3>
            <p class="text-gray-600">Please wait while we fetch your salon's availability settings...</p>
          </div>
        </div>
  
        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <h3 class="text-sm font-semibold text-red-800">Error Loading Availability</h3>
              <p class="text-sm text-red-700 mt-1">{{ error }}</p>
            </div>
          </div>
          <button
            @click="loadAvailability('salon-123')"
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
  
        <!-- Main Content -->
        <div v-else-if="availability" class="space-y-6">
          <!-- Operational Status -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-lg font-bold text-gray-900">Salon Status</h2>
                <p class="text-sm text-gray-600">Control your salon's operational status</p>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-gray-700">
                  {{ availability.isOperational ? 'Operational' : 'Closed' }}
                </span>
                <button
                  @click="toggleOperationalStatus"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  :class="availability.isOperational ? 'bg-blue-600' : 'bg-gray-200'"
                >
                  <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    :class="availability.isOperational ? 'translate-x-6' : 'translate-x-1'"
                  ></span>
                </button>
              </div>
            </div>
            
            <div v-if="!availability.isOperational" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <div>
                  <h3 class="text-sm font-semibold text-yellow-800">Salon Currently Closed</h3>
                  <p class="text-sm text-yellow-700 mt-1">Your salon is marked as closed. Customers won't be able to book appointments.</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Tab Navigation -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
                  :class="activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <div class="flex items-center space-x-2">
                    <component :is="tab.icon" class="w-4 h-4" />
                    <span>{{ tab.name }}</span>
                  </div>
                </button>
              </nav>
            </div>
  
            <!-- Tab Content -->
            <div class="p-6">
              <!-- Weekly Schedule Tab -->
              <div v-if="activeTab === 'weekly'" class="space-y-6">
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <h3 class="text-lg font-bold text-gray-900">Weekly Schedule</h3>
                    <p class="text-sm text-gray-600">Set your regular operating hours for each day of the week</p>
                  </div>
                  <button
                    @click="copyScheduleToAll"
                    class="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Copy Monday to All Days
                  </button>
                </div>
  
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div
                    v-for="(day, index) in availability.weeklySchedule"
                    :key="day.dayOfWeek"
                    class="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <!-- Day Header -->
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <h4 class="font-semibold text-gray-900">{{ day.dayName }}</h4>
                        <span
                          class="px-2 py-1 text-xs font-medium rounded-full"
                          :class="day.isAvailable 
                            ? 'bg-green-100 text-[#045940]00' 
                            : 'bg-red-100 text-red-800'"
                        >
                          {{ day.isAvailable ? 'Available' : 'Closed' }}
                        </span>
                      </div>
                      <button
                        @click="toggleDayAvailability(index)"
                        class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        :class="day.isAvailable ? 'bg-blue-600' : 'bg-gray-300'"
                      >
                        <span
                          class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform"
                          :class="day.isAvailable ? 'translate-x-5' : 'translate-x-1'"
                        ></span>
                      </button>
                    </div>
  
                    <!-- Time Slots -->
                    <div v-if="day.isAvailable" class="space-y-3">
                      <div
                        v-for="slot in day.timeSlots"
                        :key="slot.id"
                        class="bg-white rounded-lg p-3 border border-gray-200"
                      >
                        <div class="flex items-center justify-between mb-3">
                          <div class="flex items-center space-x-2">
                            <span
                              class="w-2 h-2 rounded-full"
                              :class="slot.isAvailable ? 'bg-green-500' : 'bg-red-500'"
                            ></span>
                            <span class="text-sm font-medium text-gray-900">
                              {{ formatTimeRange(slot.startTime, slot.endTime) }}
                            </span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <button
                              @click="editTimeSlot(index, slot.id)"
                              class="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
                            </button>
                            <button
                              @click="removeTimeSlot(index, slot.id)"
                              class="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div class="flex items-center justify-between text-xs text-gray-600">
                          <span>Max: {{ slot.maxBookings }} bookings</span>
                          <span>Current: {{ slot.currentBookings || 0 }} bookings</span>
                        </div>
                      </div>
  
                      <!-- Add Time Slot Button -->
                      <button
                        @click="addTimeSlot(index)"
                        class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                      >
                        <div class="flex items-center justify-center space-x-2">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          <span class="text-sm font-medium">Add Time Slot</span>
                        </div>
                      </button>
                    </div>
  
                    <!-- Closed Day Message -->
                    <div v-else class="text-center py-4 text-gray-500">
                      <svg class="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                      <p class="text-sm">Closed on {{ day.dayName }}</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Date Ranges Tab -->
              <div v-if="activeTab === 'ranges'" class="space-y-6">
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <h3 class="text-lg font-bold text-gray-900">Special Date Ranges</h3>
                    <p class="text-sm text-gray-600">Override your weekly schedule for specific date ranges</p>
                  </div>
                  <button
                    @click="showDateRangeModal = true"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      <span>Add Date Range</span>
                    </div>
                  </button>
                </div>
  
                <!-- Date Ranges List -->
                <div v-if="availability.dateRanges.length > 0" class="space-y-4">
                  <div
                    v-for="range in availability.dateRanges"
                    :key="range.id"
                    class="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div class="flex items-center justify-between mb-3">
                      <div>
                        <h4 class="font-semibold text-gray-900">{{ range.title }}</h4>
                        <p class="text-sm text-gray-600">{{ formatDate(range.startDate) }} - {{ formatDate(range.endDate) }}</p>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span
                          class="px-2 py-1 text-xs font-medium rounded-full"
                          :class="range.isAvailable 
                            ? 'bg-green-100 text-[#045940]00' 
                            : 'bg-red-100 text-red-800'"
                        >
                          {{ range.isAvailable ? 'Available' : 'Closed' }}
                        </span>
                        <button
                          @click="editDateRange(range.id)"
                          class="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button
                          @click="removeDateRange(range.id)"
                          class="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div v-if="range.description" class="text-sm text-gray-600 mb-3">
                      {{ range.description }}
                    </div>
                    
                    <div class="flex items-center justify-between text-xs text-gray-500">
                      <span>{{ range.overrideWeeklySchedule ? 'Overrides weekly schedule' : 'Uses weekly schedule' }}</span>
                      <span>Updated {{ formatDateShort(range.updatedAt) }}</span>
                    </div>
                  </div>
                </div>
  
                <!-- Empty State -->
                <div v-else class="text-center py-12">
                  <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h1m5-12v12m0 0h7a2 2 0 002-2V9a2 2 0 00-2-2h-7m0 12H9a2 2 0 01-2-2V9a2 2 0 012-2h3"></path>
                  </svg>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">No Special Date Ranges</h3>
                  <p class="text-gray-600 mb-4">You haven't set any special availability periods yet.</p>
                  <button
                    @click="showDateRangeModal = true"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Date Range
                  </button>
                </div>
              </div>
  
              <!-- Calendar Tab -->
              <div v-if="activeTab === 'calendar'" class="space-y-6">
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <h3 class="text-lg font-bold text-gray-900">Calendar View</h3>
                    <p class="text-sm text-gray-600">View your availability in calendar format</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button
                      @click="previousMonth"
                      class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                    </button>
                    <h4 class="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
                      {{ getMonthName(selectedMonth) }} {{ selectedYear }}
                    </h4>
                    <button
                      @click="nextMonth"
                      class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
  
                <!-- Calendar Grid -->
                <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <!-- Calendar Header -->
                  <div class="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                    <div
                      v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
                      :key="day"
                      class="p-3 text-center text-sm font-semibold text-gray-700"
                    >
                      {{ day }}
                    </div>
                  </div>
  
                  <!-- Calendar Body -->
                  <div class="grid grid-cols-7">
                    <div
                      v-for="date in calendarDates"
                      :key="date.date"
                      class="min-h-[100px] border-b border-r border-gray-200 p-2 hover:bg-gray-50 transition-colors cursor-pointer"
                      :class="{
                        'bg-gray-100 text-gray-400': !date.isCurrentMonth,
                        'bg-blue-50 border-blue-200': date.date === selectedDate,
                        'bg-red-50': date.availability && !date.availability.isAvailable,
                        'bg-green-50': date.availability && date.availability.isAvailable
                      }"
                      @click="selectDate(date.date)"
                    >
                      <div class="flex items-center justify-between mb-1">
                        <span
                          class="text-sm font-medium"
                          :class="{
                            'text-blue-600': isToday(date.date),
                            'text-gray-900': date.isCurrentMonth && !isToday(date.date),
                            'text-gray-400': !date.isCurrentMonth
                          }"
                        >
                          {{ new Date(date.date).getDate() }}
                        </span>
                        <div v-if="date.availability" class="flex items-center space-x-1">
                          <div
                            class="w-2 h-2 rounded-full"
                            :class="date.availability.isAvailable ? 'bg-green-500' : 'bg-red-500'"
                          ></div>
                        </div>
                      </div>
                      
                      <div v-if="date.availability && date.availability.isAvailable" class="space-y-1">
                        <div
                          v-for="slot in date.availability.timeSlots.slice(0, 2)"
                          :key="slot.id"
                          class="text-xs px-1 py-0.5 bg-blue-100 text-blue-800 rounded truncate"
                        >
                          {{ formatTime(slot.startTime) }}
                        </div>
                        <div
                          v-if="date.availability.timeSlots.length > 2"
                          class="text-xs text-gray-500"
                        >
                          +{{ date.availability.timeSlots.length - 2 }} more
                        </div>
                      </div>
                      
                      <div v-else-if="date.availability && !date.availability.isAvailable" class="text-xs text-red-600 font-medium">
                        Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Time Slot Modal -->
      <Transition name="modal">
        <div v-if="showTimeSlotModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold text-gray-900">
                  {{ editingTimeSlot ? 'Edit Time Slot' : 'Add Time Slot' }}
                </h3>
                <button
                  @click="closeTimeSlotModal"
                  class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
  
              <form @submit.prevent="saveTimeSlot" class="space-y-4">
                <!-- Time Range -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
                    <input
                      v-model="timeSlotForm.startTime"
                      type="time"
                      step="1"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
                    <input
                      v-model="timeSlotForm.endTime"
                      type="time"
                      step="1"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
  
                <!-- Max Bookings -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Maximum Bookings</label>
                  <input
                    v-model.number="timeSlotForm.maxBookings"
                    type="number"
                    min="1"
                    max="50"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    required
                  />
                </div>
  
                <!-- Available Toggle -->
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700">Available for Booking</label>
                    <p class="text-xs text-gray-600">Allow customers to book during this time slot</p>
                  </div>
                  <button
                    type="button"
                    @click="timeSlotForm.isAvailable = !timeSlotForm.isAvailable"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :class="timeSlotForm.isAvailable ? 'bg-blue-600' : 'bg-gray-200'"
                  >
                    <span
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                      :class="timeSlotForm.isAvailable ? 'translate-x-6' : 'translate-x-1'"
                    ></span>
                  </button>
                </div>
  
                <!-- Error Messages -->
                <div v-if="timeSlotErrors.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-3">
                  <ul class="text-sm text-red-700 space-y-1">
                    <li v-for="error in timeSlotErrors" :key="error">• {{ error }}</li>
                  </ul>
                </div>
  
                <!-- Actions -->
                <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    @click="closeTimeSlotModal"
                    class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {{ editingTimeSlot ? 'Update' : 'Add' }} Time Slot
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
  
      <!-- Date Range Modal -->
      <Transition name="modal">
        <div v-if="showDateRangeModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold text-gray-900">
                  {{ editingDateRange ? 'Edit Date Range' : 'Add Date Range' }}
                </h3>
                <button
                  @click="closeDateRangeModal"
                  class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
  
              <form @submit.prevent="saveDateRange" class="space-y-4">
                <!-- Title -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    v-model="dateRangeForm.title"
                    type="text"
                    placeholder="e.g., Holiday Closure, Special Hours"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    required
                  />
                </div>
  
                <!-- Description -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    v-model="dateRangeForm.description"
                    rows="3"
                    placeholder="Additional details about this date range"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  ></textarea>
                </div>
  
                <!-- Date Range -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                    <input
                      v-model="dateRangeForm.startDate"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                    <input
                      v-model="dateRangeForm.endDate"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
  
                <!-- Available Toggle -->
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700">Available During This Period</label>
                    <p class="text-xs text-gray-600">Toggle salon availability for this date range</p>
                  </div>
                  <button
                    type="button"
                    @click="dateRangeForm.isAvailable = !dateRangeForm.isAvailable"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :class="dateRangeForm.isAvailable ? 'bg-blue-600' : 'bg-gray-200'"
                  >
                    <span
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                      :class="dateRangeForm.isAvailable ? 'translate-x-6' : 'translate-x-1'"
                    ></span>
                  </button>
                </div>
  
                <!-- Override Weekly Schedule -->
                <div v-if="dateRangeForm.isAvailable" class="flex items-center justify-between">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700">Override Weekly Schedule</label>
                    <p class="text-xs text-gray-600">Use custom time slots instead of weekly schedule</p>
                  </div>
                  <button
                    type="button"
                    @click="dateRangeForm.overrideWeeklySchedule = !dateRangeForm.overrideWeeklySchedule"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :class="dateRangeForm.overrideWeeklySchedule ? 'bg-blue-600' : 'bg-gray-200'"
                  >
                    <span
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                      :class="dateRangeForm.overrideWeeklySchedule ? 'translate-x-6' : 'translate-x-1'"
                    ></span>
                  </button>
                </div>
  
                <!-- Custom Time Slots -->
                <div v-if="dateRangeForm.isAvailable && dateRangeForm.overrideWeeklySchedule" class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-700">Custom Time Slots</label>
                  
                  <div
                    v-for="(slot, index) in dateRangeForm.customTimeSlots"
                    :key="slot.id"
                    class="bg-gray-50 rounded-lg p-3 border border-gray-200"
                  >
                    <div class="grid grid-cols-2 gap-3 mb-3">
                      <input
                        v-model="slot.startTime"
                        type="time"
                        step="1"
                        class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <input
                        v-model="slot.endTime"
                        type="time"
                        step="1"
                        class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                    <div class="flex items-center justify-between">
                      <input
                        v-model.number="slot.maxBookings"
                        type="number"
                        min="1"
                        max="50"
                        placeholder="Max bookings"
                        class="w-24 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        @click="removeDateRangeTimeSlot(index)"
                        class="p-1 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
  
                  <button
                    type="button"
                    @click="addDateRangeTimeSlot"
                    class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <div class="flex items-center justify-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      <span class="text-sm font-medium">Add Time Slot</span>
                    </div>
                  </button>
                </div>
  
                <!-- Actions -->
                <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    @click="closeDateRangeModal"
                    class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {{ editingDateRange ? 'Update' : 'Add' }} Date Range
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
  
      <!-- Success Toast -->
      <Transition name="toast">
        <div v-if="showSuccessToast" class="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Availability updated successfully!</span>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  import { useAvailability } from '~/composables/useAvailability'
  import { formatTime, formatTimeRange, formatDate, formatDateShort, getDaysInMonth, getFirstDayOfMonth, isToday, isPastDate } from '~/utils/dateHelpers'
  import type { TimeSlot, DateRangeAvailability } from '~/types/availability'
  
  // Composables
  const {
    availability,
    loading,
    error,
    selectedDate,
    selectedMonth,
    selectedYear,
    loadAvailability,
    saveAvailability,
    addTimeSlot,
    removeTimeSlot,
    updateTimeSlot,
    toggleDayAvailability,
    addDateRange,
    removeDateRange,
    updateDateRange,
    getDateAvailability,
    validateTimeSlot,
    checkTimeSlotConflicts,
    createTimeSlot
  } = useAvailability()
  
  // Local state
  const activeTab = ref('weekly')
  const showTimeSlotModal = ref(false)
  const showDateRangeModal = ref(false)
  const showSuccessToast = ref(false)
  const editingTimeSlot = ref<{ dayIndex: number; slotId: string } | null>(null)
  const editingDateRange = ref<string | null>(null)
  const timeSlotErrors = ref<string[]>([])
  
  // Tab configuration
  const tabs = [
    {
      id: 'weekly',
      name: 'Weekly Schedule',
      icon: 'svg'
    },
    {
      id: 'ranges',
      name: 'Date Ranges',
      icon: 'svg'
    },
    {
      id: 'calendar',
      name: 'Calendar View',
      icon: 'svg'
    }
  ]
  
  // Form data
  const timeSlotForm = reactive({
    startTime: '09:00:00',
    endTime: '10:00:00',
    isAvailable: true,
    maxBookings: 5
  })
  
  const dateRangeForm = reactive({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    isAvailable: true,
    overrideWeeklySchedule: false,
    customTimeSlots: []
  })
  
  // Computed properties
  const calendarDates = computed(() => {
    const year = selectedYear.value
    const month = selectedMonth.value
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    
    const dates = []
    
    // Previous month's trailing days
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const date = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      dates.push({
        date,
        isCurrentMonth: false,
        availability: getDateAvailability(date)
      })
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      dates.push({
        date,
        isCurrentMonth: true,
        availability: getDateAvailability(date)
      })
    }
    
    // Next month's leading days
    const remainingCells = 42 - dates.length // 6 rows × 7 days
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    
    for (let day = 1; day <= remainingCells; day++) {
      const date = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      dates.push({
        date,
        isCurrentMonth: false,
        availability: getDateAvailability(date)
      })
    }
    
    return dates
  })
  
  // Methods
  const toggleOperationalStatus = () => {
    if (availability.value) {
      availability.value.isOperational = !availability.value.isOperational
    }
  }
  
  const copyScheduleToAll = () => {
    if (!availability.value) return
    
    const mondaySchedule = availability.value.weeklySchedule[1] // Monday is index 1
    
    for (let i = 0; i < availability.value.weeklySchedule.length; i++) {
      if (i !== 1) { // Skip Monday itself
        availability.value.weeklySchedule[i] = {
          ...availability.value.weeklySchedule[i],
          isAvailable: mondaySchedule.isAvailable,
          timeSlots: mondaySchedule.timeSlots.map(slot => ({
            ...slot,
            id: `${i}-${slot.id.split('-').slice(1).join('-')}`
          }))
        }
      }
    }
  }
  
  const editTimeSlot = (dayIndex: number, slotId: string) => {
    if (!availability.value) return
    
    const slot = availability.value.weeklySchedule[dayIndex].timeSlots.find(s => s.id === slotId)
    if (!slot) return
    
    editingTimeSlot.value = { dayIndex, slotId }
    timeSlotForm.startTime = slot.startTime
    timeSlotForm.endTime = slot.endTime
    timeSlotForm.isAvailable = slot.isAvailable
    timeSlotForm.maxBookings = slot.maxBookings || 5
    timeSlotErrors.value = []
    showTimeSlotModal.value = true
  }
  
  const closeTimeSlotModal = () => {
    showTimeSlotModal.value = false
    editingTimeSlot.value = null
    timeSlotErrors.value = []
    
    // Reset form
    timeSlotForm.startTime = '09:00:00'
    timeSlotForm.endTime = '10:00:00'
    timeSlotForm.isAvailable = true
    timeSlotForm.maxBookings = 5
  }
  
  const saveTimeSlot = () => {
    timeSlotErrors.value = []
    
    // Validate time slot
    const tempSlot: TimeSlot = {
      id: 'temp',
      startTime: timeSlotForm.startTime,
      endTime: timeSlotForm.endTime,
      isAvailable: timeSlotForm.isAvailable,
      maxBookings: timeSlotForm.maxBookings
    }
    
    const validationErrors = validateTimeSlot(tempSlot)
    if (validationErrors.length > 0) {
      timeSlotErrors.value = validationErrors
      return
    }
    
    if (editingTimeSlot.value) {
      // Update existing time slot
      const { dayIndex, slotId } = editingTimeSlot.value
      
      // Check for conflicts (excluding current slot)
      if (checkTimeSlotConflicts(dayIndex, tempSlot, slotId)) {
        timeSlotErrors.value = ['This time slot conflicts with an existing slot']
        return
      }
      
      updateTimeSlot(dayIndex, slotId, {
        startTime: timeSlotForm.startTime,
        endTime: timeSlotForm.endTime,
        isAvailable: timeSlotForm.isAvailable,
        maxBookings: timeSlotForm.maxBookings
      })
    } else {
      // Add new time slot
      const dayIndex = 0 // This should be passed from the calling context
      
      if (checkTimeSlotConflicts(dayIndex, tempSlot)) {
        timeSlotErrors.value = ['This time slot conflicts with an existing slot']
        return
      }
      
      addTimeSlot(dayIndex)
    }
    
    closeTimeSlotModal()
  }
  
  const editDateRange = (rangeId: string) => {
    if (!availability.value) return
    
    const range = availability.value.dateRanges.find(r => r.id === rangeId)
    if (!range) return
    
    editingDateRange.value = rangeId
    dateRangeForm.title = range.title
    dateRangeForm.description = range.description || ''
    dateRangeForm.startDate = range.startDate
    dateRangeForm.endDate = range.endDate
    dateRangeForm.isAvailable = range.isAvailable
    dateRangeForm.overrideWeeklySchedule = range.overrideWeeklySchedule
    dateRangeForm.customTimeSlots = range.customTimeSlots ? [...range.customTimeSlots] : []
    showDateRangeModal.value = true
  }
  
  const closeDateRangeModal = () => {
    showDateRangeModal.value = false
    editingDateRange.value = null
    
    // Reset form
    dateRangeForm.title = ''
    dateRangeForm.description = ''
    dateRangeForm.startDate = ''
    dateRangeForm.endDate = ''
    dateRangeForm.isAvailable = true
    dateRangeForm.overrideWeeklySchedule = false
    dateRangeForm.customTimeSlots = []
  }
  
  const saveDateRange = () => {
    if (editingDateRange.value) {
      // Update existing date range
      updateDateRange(editingDateRange.value, {
        title: dateRangeForm.title,
        description: dateRangeForm.description,
        startDate: dateRangeForm.startDate,
        endDate: dateRangeForm.endDate,
        isAvailable: dateRangeForm.isAvailable,
        overrideWeeklySchedule: dateRangeForm.overrideWeeklySchedule,
        customTimeSlots: dateRangeForm.customTimeSlots.length > 0 ? [...dateRangeForm.customTimeSlots] : undefined
      })
    } else {
      // Add new date range
      addDateRange({
        title: dateRangeForm.title,
        description: dateRangeForm.description,
        startDate: dateRangeForm.startDate,
        endDate: dateRangeForm.endDate,
        isAvailable: dateRangeForm.isAvailable,
        overrideWeeklySchedule: dateRangeForm.overrideWeeklySchedule,
        customTimeSlots: dateRangeForm.customTimeSlots.length > 0 ? [...dateRangeForm.customTimeSlots] : undefined
      })
    }
    
    closeDateRangeModal()
  }
  
  const addDateRangeTimeSlot = () => {
    dateRangeForm.customTimeSlots.push({
      id: `custom-${Date.now()}`,
      startTime: '09:00:00',
      endTime: '10:00:00',
      isAvailable: true,
      maxBookings: 5
    })
  }
  
  const removeDateRangeTimeSlot = (index: number) => {
    dateRangeForm.customTimeSlots.splice(index, 1)
  }
  
  const selectDate = (date: string) => {
    selectedDate.value = date
  }
  
  const previousMonth = () => {
    if (selectedMonth.value === 0) {
      selectedMonth.value = 11
      selectedYear.value--
    } else {
      selectedMonth.value--
    }
  }
  
  const nextMonth = () => {
    if (selectedMonth.value === 11) {
      selectedMonth.value = 0
      selectedYear.value++
    } else {
      selectedMonth.value++
    }
  }
  
  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return months[month]
  }
  
  const handleSave = async () => {
    const success = await saveAvailability()
    if (success) {
      showSuccessToast.value = true
      setTimeout(() => {
        showSuccessToast.value = false
      }, 3000)
    }
  }
  
  // Lifecycle
  onMounted(() => {
    loadAvailability('salon-123')
  })
  
  // Set default dates for date range form
  watch(() => showDateRangeModal.value, (show) => {
    if (show && !editingDateRange.value) {
      const today = new Date().toISOString().split('T')[0]
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      dateRangeForm.startDate = today
      dateRangeForm.endDate = tomorrow.toISOString().split('T')[0]
    }
  })

  definePageMeta({
    layout: 'dashboard'
  })
  </script>
  
  <style scoped>
  /* Modal transitions */
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
  
  /* Toast transitions */
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }
  
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #6366f1);
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #4f46e5);
  }
  
  /* Mobile optimizations */
  @media (max-width: 640px) {
    .grid-cols-7 {
      font-size: 0.875rem;
    }
    
    .min-h-\[100px\] {
      min-height: 80px;
    }
    
    .max-w-7xl {
      max-width: 100%;
    }
    
    .lg\:grid-cols-2 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
  
  /* Focus states for accessibility */
  button:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  
  /* Improved touch targets for mobile */
  @media (max-width: 768px) {
    button {
      min-height: 44px;
      min-width: 44px;
    }
    
    input,
    select,
    textarea {
      min-height: 44px;
    }
  }
  
  /* Animation for loading states */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  /* Hover effects for interactive elements */
  @media (hover: hover) {
    .hover\:scale-105:hover {
      transform: scale(1.05);
    }
    
    .hover\:shadow-lg:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    .hover\:shadow-xl:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  }
  
  /* Prevent text selection on interactive elements */
  button,
  .cursor-pointer {
    user-select: none;
  }
  
  /* Smooth transitions for all interactive elements */
  * {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  </style>
  