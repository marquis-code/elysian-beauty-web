<template>
    <div class="flex h-screen bg-gray-50">
      <!-- Sidebar -->
      <aside class="w-64 bg-[#2A2A2A] text-white">
        <div class="p-4">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20at%207.43.44%E2%80%AFAM-DAxeVGQOoexdCCBtqXgfJbeI1qxqIG.png" alt="Elysian Logo" class="h-8" />
        </div>
        <nav class="mt-8">
          <SidebarLink icon="Home" text="Overview" />
          <SidebarLink icon="Calendar" text="Appointment" active />
          <SidebarLink icon="BookOpen" text="Recent Bookings" />
          <SidebarLink icon="MessageSquare" text="Messages" />
          <SidebarLink icon="Settings" text="Settings" />
          <SidebarLink icon="HelpCircle" text="Help centre" />
          <SidebarLink icon="LogOut" text="Logout" />
        </nav>
        <div class="mt-auto p-4">
          <p class="text-gray-400 text-sm">PREFERENCE</p>
        </div>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <header class="bg-white border-b p-4 flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <h1 class="text-2xl font-semibold">Appointments</h1>
            <div class="flex items-center text-sm text-gray-600">
              <Bell class="h-5 w-5 mr-2" />
              <span>Tomorrow Reminder</span>
              <span class="ml-2">{{ formattedDate }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <Search class="h-5 w-5 text-gray-400" />
            <Bell class="h-5 w-5 text-gray-400" />
            <div class="flex items-center space-x-2">
              <!-- <img
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
                class="h-10 w-10 rounded-full"
              /> -->
              <div>
                <p class="font-medium">Olasehinde Olalekan</p>
                <p class="text-sm text-gray-600">Professional</p>
              </div>
              <ChevronDown class="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </header>
  
        <div class="p-6">
          <!-- Action Buttons -->
          <div class="flex items-center justify-between mb-6">
            <button class="bg-[#2A2A2A] text-white px-4 py-2 rounded-lg flex items-center">
              <Plus class="h-4 w-4 mr-2" />
              Add New
            </button>
            <div class="flex items-center space-x-4">
              <TabButton :active="activeTab === 'today'" @click="activeTab = 'today'">
                Today
              </TabButton>
              <TabButton :active="activeTab === 'week'" @click="activeTab = 'week'">
                This week
              </TabButton>
              <TabButton :active="activeTab === 'next7'" @click="activeTab = 'next7'">
                Next 7days
                <ChevronDown class="h-4 w-4 ml-1" />
              </TabButton>
              <button class="bg-gray-100 px-4 py-2 rounded-lg flex items-center">
                <Calendar class="h-4 w-4 mr-2" />
                Feb 12 - Feb 29 2025
              </button>
            </div>
          </div>
  
          <!-- Calendar Grid -->
          <div class="grid grid-cols-4 gap-6">
            <!-- Appointments Timeline -->
            <div class="col-span-3">
              <template v-if="activeTab === 'today'">
                <!-- <TimelineView :appointments="todayAppointments" /> -->
              </template>
              <template v-else-if="activeTab === 'week'">
                <WeekView :appointments="weekAppointments" />
              </template>
            </div>
  
            <!-- Calendar -->
            <div class="col-span-1">
              <div class="bg-white rounded-lg p-4">
                <h3 class="font-medium mb-4">Calendar</h3>
                <DatePicker v-model="selectedDate" />
                
                <div class="mt-8">
                  <h3 class="font-medium mb-4">Upcoming Appointments</h3>
                  <div class="space-y-4">
                    <UpcomingAppointment
                      v-for="task in upcomingTasks"
                      :key="task.id"
                      :task="task"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { format } from 'date-fns'
  import {
    Bell,
    Search,
    ChevronDown,
    Plus,
    Calendar,
    Home,
    BookOpen,
    MessageSquare,
    Settings,
    HelpCircle,
    LogOut
  } from 'lucide-vue-next'
  
  // State
  const activeTab = ref('today')
  const selectedDate = ref(new Date())
  
  // Computed
  const formattedDate = computed(() => {
    return format(new Date(), 'MMMM dd, yyyy')
  })
  
  // Sample data
  const todayAppointments = ref([
    {
      id: 1,
      title: 'Gele Tying',
      client: 'Febiyi Adejimeji',
      location: 'Lagos, Island, Leki',
      time: '10:21AM - 09:00 AM',
      type: 'gele',
      avatars: ['/placeholder.svg?height=32&width=32', '/placeholder.svg?height=32&width=32']
    },
    {
      id: 2,
      title: 'Makeup',
      client: 'Febiyi Adejimeji',
      location: 'Lagos, Island, Leki',
      time: '10:21AM - 09:00 AM',
      type: 'makeup',
      avatars: ['/placeholder.svg?height=32&width=32']
    },
    // Add more appointments...
  ])
  
  const weekAppointments = ref([
    // Week view appointments...
  ])
  
  const upcomingTasks = ref([
    {
      id: 1,
      title: 'Task 3',
      description: 'guidelines regarding color contrast ratios and provide options for users to adjust text size'
    },
    {
      id: 2,
      title: 'Task 4',
      description: 'guidelines regarding color contrast ratios and provide options for users to adjust text size'
    }
  ])
  </script>
  
  <style>
  .router-link-active {
    @apply bg-emerald-800;
  }
  </style>