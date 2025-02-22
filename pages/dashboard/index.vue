

<template>
<main>
  <div class="flex-1 overflow-auto">

      <!-- Dashboard Content -->
      <main class="p-6">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <div v-for="stat in stats" :key="stat.label" 
            class="bg-white border-[0.5px] border-gray-100 p-6 rounded-lg">
            <div class="flex items-center gap-3 mb-4">
              <!-- <component :is="stat.icon" class="w-6 h-6" /> -->
               <img :src="stat.icon" class="w-10 h-10" />
              <span class="text-gray-600">{{ stat.label }}</span>
            </div>
            <div class="text-2xl font-semibold text-[#282B2A] mb-2">
              {{ stat.value }}
            </div>
            <div  class="flex pt-6 text-sm inline items-center gap-2">
             <div :class="[stat.change > 0 ? 'text-[#045940] bg-[#EBFEF8]' : 'bg-[#FEE2E2] text-[#EF4444]']" class="flex inline font-bold rounded-full px-3 py-1.5">
                <ArrowUp v-if="stat.change > 0" class="w-4 h-4 text-green-500" />
                <ArrowDown v-else class="w-4 h-4 text-red-500" />
                <span class="pl-2" :class="stat.change > 0 ? 'text-green-500' : 'text-red-500'">
                  {{ Math.abs(stat.change) }}%
                </span>
             </div>
              <span class="text-gray-400 text-sm">vs last 7 days</span>
            </div>
          </div>
        </div>


  <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
    <!-- Revenue Chart -->
    <div class="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
      <div class="flex justify-between items-start mb-6">
        <div class="space-y-5">
          <h2 class="text-lg font-semibold mb-2">Revenue Report</h2>
          <div class="text-3xl font-bold">₦20,745.00</div>
          <div class="flex items-center gap-2 mt-1">
            <div class="flex inline font-bold rounded-full px-3 py-1.5 text-[#045940] bg-[#EBFEF8]">
              <ArrowUp class="w-4 h-4 text-green-500" />
              <span class="text-green-500">80%</span>
            </div>
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
    <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Upcoming Appointment</h2>
      <div class="space-y-4">
        <div v-for="appointment in appointments" :key="appointment.id"
          class="p-4 border rounded-lg">
          <div class="flex justify-between items-start mb-2">
            <div class="text-center">
              <div class="text-sm text-gray-500">{{ appointment.date }}</div>
              <div class="font-semibold">{{ appointment.month }}</div>
            </div>
            <div class="flex-1 px-4 space-y-3">
              <div class="text-sm text-gray-500">{{ appointment.time }}</div>

              <section class="flex gap-x-4 items-center">
                <div class="font-semibold text-[#045940]">{{ appointment.service }}</div>
                <div>
                  <span :class="{
                    'bg-green-100 text-green-700': appointment.status === 'Confirmed',
                    'bg-yellow-100 text-yellow-700': appointment.status === 'Pending'
                  }" class="px-3 py-1 rounded-full text-sm">
                    {{ appointment.status }}
                  </span>
                </div>
              </section>

              <section class="flex gap-x-3 items-center mt-2">
                <div class="text-sm text-gray-500">{{ appointment.location }}</div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <User class="w-4 h-4" />
                  <span class="text-[#282B2A] font-semibold">{{ appointment.client }}</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      </main>
    </div>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import sales from '@/assets/icons/total-sales.svg'
import customers from '@/assets/icons/total-customers.svg'
import products from '@/assets/icons/total-products.svg'
import revenue from '@/assets/icons/total-revenue.svg'
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
    icon: sales
  },
  { 
    label: 'Customers', 
    value: '2000', 
    change: 90,
    icon: customers
  },
  { 
    label: 'Product', 
    value: '1,423', 
    change: 88,
    icon: products
  },
  { 
    label: 'Revenue', 
    value: '₦220,745.00', 
    change: -20,
    icon: revenue
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

const router = useRouter()

definePageMeta({
    layout: 'dashboard'
})
</script>