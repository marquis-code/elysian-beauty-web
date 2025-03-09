<template>
    <div class="flex h-screen bg-gray-50">
      <!-- Sidebar -->
      <aside class="w-64 bg-[#2A2F33] text-white hidden lg:block">
        <div class="p-6">
          <!-- <img src="/placeholder.svg" alt="Elysian Beauty" class="h-8" /> -->
        </div>
        <nav class="mt-6">
          <div v-for="item in menuItems" :key="item.label" 
            class="px-6 py-3 flex items-center gap-3 hover:bg-[#374151] cursor-pointer"
            :class="{ 'bg-[#1E4D43] text-white': item.active }">
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.label }}</span>
          </div>
          <div class="mt-8 px-6 text-gray-400 text-sm">PREFERENCE</div>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <div class="flex-1 overflow-auto">
        <!-- Header -->
        <header class="bg-white p-4 flex items-center justify-between border-b">
          <div class="relative w-96">
            <input 
              type="text"
              placeholder="Search product, customer, etc..."
              class="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100"
            />
            <Search class="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div class="flex items-center gap-4">
            <Bell class="w-6 h-6 text-gray-600" />
            <div class="flex items-center gap-3">
              <!-- <img 
                src="/placeholder.svg" 
                alt="Profile" 
                class="w-10 h-10 rounded-full"
              /> -->
              <div>
                <div class="font-semibold">Olasehinde Olalekan</div>
                <div class="text-sm text-gray-500">Professional</div>
              </div>
              <ChevronDown class="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </header>
  
        <!-- Dashboard Content -->
        <main class="p-6">
          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div v-for="stat in stats" :key="stat.label" 
              class="bg-white p-6 rounded-lg shadow-sm">
              <div class="flex items-center gap-3 mb-4">
                <component :is="stat.icon" class="w-6 h-6" />
                <span class="text-gray-600">{{ stat.label }}</span>
              </div>
              <div class="text-2xl font-bold mb-2">
                {{ stat.value }}
              </div>
              <div class="flex items-center gap-2">
                <ArrowUp v-if="stat.change > 0" class="w-4 h-4 text-green-500" />
                <ArrowDown v-else class="w-4 h-4 text-red-500" />
                <span :class="stat.change > 0 ? 'text-green-500' : 'text-red-500'">
                  {{ Math.abs(stat.change) }}%
                </span>
                <span class="text-gray-400 text-sm">vs last 7 days</span>
              </div>
            </div>
          </div>
  
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Revenue Chart -->
            <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h2 class="text-lg font-semibold mb-2">Revenue Report</h2>
                  <div class="text-2xl font-bold">₦20,745.00</div>
                  <div class="flex items-center gap-2 mt-1">
                    <ArrowUp class="w-4 h-4 text-green-500" />
                    <span class="text-green-500">80%</span>
                    <span class="text-gray-400 text-sm">vs previous month</span>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span class="text-sm text-gray-600">Earning</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-[#1E4D43]"></div>
                    <span class="text-sm text-gray-600">Expense</span>
                  </div>
                </div>
              </div>
              <div class="h-64">
                <Bar 
                  :data="chartData"
                  :options="chartOptions"
                />
              </div>
            </div>
  
            <!-- Upcoming Appointments -->
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-lg font-semibold mb-4">Upcoming Appointment</h2>
              <div class="space-y-4">
                <div v-for="appointment in appointments" :key="appointment.id"
                  class="p-4 border rounded-lg">
                  <div class="flex justify-between items-start mb-2">
                    <div class="text-center">
                      <div class="text-sm text-gray-500">{{ appointment.date }}</div>
                      <div class="font-semibold">{{ appointment.month }}</div>
                    </div>
                    <div class="flex-1 px-4">
                      <div class="font-semibold">{{ appointment.service }}</div>
                      <div class="text-sm text-gray-500">{{ appointment.time }}</div>
                      <div class="text-sm text-gray-500">{{ appointment.location }}</div>
                    </div>
                    <div>
                      <span :class="{
                        'bg-green-100 text-green-700': appointment.status === 'Confirmed',
                        'bg-yellow-100 text-yellow-700': appointment.status === 'Pending'
                      }" class="px-3 py-1 rounded-full text-sm">
                        {{ appointment.status }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-500">
                    <User class="w-4 h-4" />
                    <span>{{ appointment.client }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { 
    Home, Calendar, Clock, Mail, Settings, 
    HelpCircle, LogOut, Search, Bell, ChevronDown,
    ArrowUp, ArrowDown, User, DollarSign, Users,
    ShoppingCart
  } from 'lucide-vue-next'
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  
  const menuItems = [
    { label: 'Overview', icon: Home, active: true },
    { label: 'Appointment', icon: Calendar },
    { label: 'Recent Bookings', icon: Clock },
    { label: 'Messages', icon: Mail },
    { label: 'Settings', icon: Settings },
    { label: 'Help centre', icon: HelpCircle },
    { label: 'Logout', icon: LogOut },
  ]
  
  const stats = [
    { 
      label: 'Total Sales', 
      value: '₦120,452', 
      change: 80,
      icon: DollarSign 
    },
    { 
      label: 'Customers', 
      value: '2000', 
      change: 90,
      icon: Users 
    },
    { 
      label: 'Product', 
      value: '1,423', 
      change: 88,
      icon: ShoppingCart 
    },
    { 
      label: 'Revenue', 
      value: '₦220,745.00', 
      change: -20,
      icon: DollarSign 
    },
  ]
  
  const appointments = [
    {
      id: 1,
      date: '06',
      month: 'FEB',
      service: 'Haircut',
      time: 'WED | 02:30PM - 04:30PM',
      location: 'Sangotedo, Lekki Lagos',
      status: 'Confirmed',
      client: 'Olalekan'
    },
    {
      id: 2,
      date: '09',
      month: 'FEB',
      service: 'Massage',
      time: 'WED | 02:30PM - 04:30PM',
      location: 'Sangotedo, Lekki Lagos',
      status: 'Pending',
      client: 'Olalekan'
    },
    {
      id: 3,
      date: '09',
      month: 'FEB',
      service: 'Gele Tying',
      time: 'WED | 02:30PM - 04:30PM',
      location: 'Sangotedo, Lekki Lagos',
      status: 'Confirmed',
      client: 'Olalekan'
    }
  ]
  
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Earning',
        data: [200, 400, 600, 300, 500, 200, 700, 400],
        backgroundColor: '#E5E7EB',
        borderRadius: 4
      },
      {
        label: 'Expense',
        data: [300, 500, 400, 600, 400, 300, 500, 600],
        backgroundColor: '#1E4D43',
        borderRadius: 4
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
  </script>