<template>
    <div class="min-h-screen bg-gray-25">
      <div class="max-w-7xl mx-auto rounded-lg shadow-sm">
        <div class="p-4 md:p-6">
          <!-- Header with Add New button and view tabs -->
          <div class="flex flex-col md:flex-row  justify-between items-start md:items-center mb-8 gap-4">
            <button class="flex items-center gap-2 bg-[#282B2A] text-sm text-[#FAFBFB] px-4 py-3 rounded-full">
              <PlusCircleIcon class="w-5 h-5" />
              <span>Add New</span>
            </button>
            
            <div class="flex gap-2 flex-wrap">
              <button 
                @click="activeView = 'today'" 
                :class="[
                  'px-6 py-3 rounded-full text-sm font-medium',
                  activeView === 'today' ? 'bg-[#034330] text-[#FAFBFB]' : 'bg-[#E3E5E5] text-[#282B2A]'
                ]"
              >
                Today
              </button>
              <button 
                @click="activeView = 'week'" 
                :class="[
                  'px-6 py-3 rounded-full text-sm font-medium',
                  activeView === 'week' ? 'bg-[#034330] text-white' : 'bg-[#E3E5E5] text-[#282B2A]'
                ]"
              >
                This week
              </button>
              <button class="px-6 py-3 text-sm rounded-full bg-[#E3E5E5] text-[#282B2A] font-medium flex items-center gap-1">
                Next 7days
                <ChevronDownIcon class="w-5 h-5" />
              </button>
              <button class="px-6 py-3 text-sm rounded-full bg-[#E3E5E5] text-[#282B2A] font-medium flex items-center gap-1">
                <CalendarIcon class="w-5 h-5" />
                Feb 12 - Feb 29 2025
              </button>
            </div>
          </div>
          
          <!-- Calendar Content -->
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Main Calendar Area -->
            <div class="flex-1 border-[0.5px] rounded-xl bg-white border-gray-50 p-6">
              <DailyView v-if="activeView === 'today'" :appointments="todayAppointments" />
              <WeeklyView v-else-if="activeView === 'week'" :appointments="weeklyAppointments" />
            </div>
            
            <!-- Sidebar - Only show in daily view -->
            <div v-if="activeView === 'today'" class="lg:w-80">
              <div class="space-y-6">
                <!-- Mini Calendar -->
                <div class="border-[0.5px] border-gray-25 rounded-lg bg-white p-5">
                  <h3 class="text-base text-[#282B2A] font-medium mb-4">Calendar</h3>
                  <MiniCalendar :appointments="allAppointments" @select-date="selectDate" />
                </div>
                
                <!-- Upcoming Appointments -->
                <div class="border-[0.5px] border-gray-25 rounded-lg bg-white p-5">
                  <h3 class="text-base text-[#282B2A] font-medium mb-4">Upcoming Appointments</h3>
                  <UpcomingAppointments :appointments="upcomingAppointments" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import avatar from '@/assets/img/avatar.png'
  import { ref, computed } from 'vue'
  import { PlusCircleIcon, ChevronDownIcon, CalendarIcon } from 'lucide-vue-next'
  
  // Types
  interface Appointment {
    id: string;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    location: string;
    attendees: Array<{
      id: string;
      name: string;
      avatar: string;
    }>;
    type: 'gele' | 'makeup' | 'massage' | 'task';
    contact?: string;
  }
  
  interface Task {
    id: string;
    title: string;
    completed: boolean;
    description: string;
  }
  
  // State
  const activeView = ref<'today' | 'week'>('today')
  const selectedDate = ref(new Date())
  
  // Generate sample data
  const generateAppointments = (): Appointment[] => {
    const appointments: Appointment[] = []
    const types = ['gele', 'makeup', 'massage', 'task']
    const titles = {
      gele: 'Gele Tying',
      makeup: 'Makeup',
      massage: 'Deep Tissue Massage',
      task: 'Task A here'
    }
    
    // Generate appointments for the current month
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    // Create appointments for each day
    for (let day = 1; day <= 28; day++) {
      // Skip some days to make it realistic
      if (day % 3 === 0) continue
      
      // Create 1-3 appointments per day
      const numAppointments = Math.floor(Math.random() * 3) + 1
      
      for (let i = 0; i < numAppointments; i++) {
        const hour = 8 + Math.floor(Math.random() * 9) // 8 AM to 5 PM
        const type = types[Math.floor(Math.random() * types.length)] as 'gele' | 'makeup' | 'massage' | 'task'
        
        appointments.push({
          id: `appt-${day}-${i}`,
          title: titles[type],
          date: new Date(year, month, day),
          startTime: `${hour}:21 AM`,
          endTime: '09:00 AM',
          location: 'Lagos, Island, Leki',
          attendees: [
            {
              id: '1',
              name: 'Fabiyi Adejimobi',
              avatar: avatar
            },
            {
              id: '2',
              name: 'John Doe',
              avatar: avatar
            },
            {
            id: '3',
              name: 'Jane Smith',
              avatar: avatar
            }
          ],
          type,
          contact: type === 'gele' && Math.random() > 0.7 ? '09033110326' : undefined
        })
      }
    }
    
    // Add specific appointments for today to match the screenshot
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const specificAppointments = [
      {
        id: 'today-1',
        title: 'Gele Tying',
        date: today,
        startTime: '08:00 AM',
        endTime: '09:00 AM',
        location: 'Lagos, Island, Leki',
        attendees: [
          { id: '1', name: 'Fabiyi Adejimobi', avatar: avatar },
          { id: '2', name: 'John Doe', avatar: avatar },
          { id: '3', name: 'Jane Smith', avatar: avatar }
        ],
        type: 'gele' as const
      },
      {
        id: 'today-2',
        title: 'Makeup',
        date: today,
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        location: 'Lagos, Island, Leki',
        attendees: [
          { id: '1', name: 'Fabiyi Adejimobi', avatar: avatar }
        ],
        type: 'makeup' as const
      },
      {
        id: 'today-3',
        title: 'Deep Tissue Massage',
        date: today,
        startTime: '11:00 AM',
        endTime: '12:00 PM',
        location: 'Lagos, Island, Leki',
        attendees: [
          { id: '1', name: 'Fabiyi Adejimobi', avatar: avatar }
        ],
        type: 'massage' as const
      },
      {
        id: 'today-4',
        title: 'Task A here',
        date: today,
        startTime: '12:00 PM',
        endTime: '13:00 PM',
        location: 'Lagos, Island, Leki',
        attendees: [
          { id: '1', name: 'Fabiyi Adejimobi', avatar: avatar }
        ],
        type: 'task' as const
      },
      {
        id: 'today-5',
        title: 'Gele Tying',
        date: today,
        startTime: '14:00 PM',
        endTime: '15:00 PM',
        location: 'Lagos, Island, Leki',
        attendees: [
          { id: '1', name: 'Fabiyi Adejimobi', avatar: avatar },
          { id: '2', name: 'John Doe', avatar: avatar },
          { id: '3', name: 'Jane Smith', avatar: avatar }
        ],
        type: 'gele' as const,
        contact: '09033110326'
      },
      {
        id: 'today-6',
        title: 'Task A here',
        date: today,
        startTime: '15:00 PM',
        endTime: '16:00 PM',
        location: 'Lagos, Island, Leki',
        attendees: [
          { id: '1', name: 'Fabiyi Adejimobi', avatar: avatar }
        ],
        type: 'task' as const
      }
    ]
    
    // Add the specific appointments
    appointments.push(...specificAppointments)
    
    return appointments
  }
  
  const generateTasks = (): Task[] => {
    return [
      {
        id: 'task-1',
        title: 'Task 3',
        completed: true,
        description: 'guidelines regarding color contrast ratios and provide options for users to adjust text size'
      },
      {
        id: 'task-2',
        title: 'Task 3',
        completed: true,
        description: 'guidelines regarding color contrast ratios and provide options for users to adjust text size'
      },
      {
        id: 'task-3',
        title: 'Task 4',
        completed: true,
        description: 'guidelines regarding color contrast ratios and provide options for users to adjust text size'
      }
    ]
  }
  
  // Data
  const allAppointments = ref<Appointment[]>(generateAppointments())
  const tasks = ref<Task[]>(generateTasks())
  
  // Computed properties
  const todayAppointments = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return allAppointments.value.filter(appointment => {
      const appointmentDate = new Date(appointment.date)
      appointmentDate.setHours(0, 0, 0, 0)
      return appointmentDate.getTime() === today.getTime()
    }).sort((a, b) => {
      const aHour = parseInt(a.startTime.split(':')[0])
      const bHour = parseInt(b.startTime.split(':')[0])
      return aHour - bHour
    })
  })
  
  const weeklyAppointments = computed(() => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1) // Monday
    startOfWeek.setHours(0, 0, 0, 0)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6) // Sunday
    endOfWeek.setHours(23, 59, 59, 999)
    
    return allAppointments.value.filter(appointment => {
      const appointmentDate = new Date(appointment.date)
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek
    })
  })
  
  const upcomingAppointments = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return allAppointments.value
      .filter(appointment => {
        const appointmentDate = new Date(appointment.date)
        appointmentDate.setHours(0, 0, 0, 0)
        return appointmentDate >= today
      })
      .sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA.getTime() - dateB.getTime()
      })
      .slice(0, 3)
  })
  
  // Methods
  const selectDate = (date: Date) => {
    selectedDate.value = date
  }
</script>