<template>
    <div class="fixed inset-0 bg-black bg-opacity-25 flex items-start justify-center pt-16">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <div class="flex space-x-4">
            <button 
              @click="activeTab = 'all'"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md',
                activeTab === 'all' 
                  ? 'bg-green-50 text-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              All
            </button>
            <button 
              @click="activeTab = 'unread'"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md',
                activeTab === 'unread' 
                  ? 'bg-green-50 text-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              Unread (17)
            </button>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              @click="markAllAsRead"
              class="text-sm text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Mark all as read
            </button>
            <button @click="close" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Notification list -->
        <div class="max-h-[600px] overflow-y-auto">
          <div class="p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-4">Last 7 days</h3>
            <div class="space-y-4">
              <div v-for="notification in recentNotifications" :key="notification.id" class="flex space-x-3">
                <div :class="[
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                  notification.type === 'task' ? 'bg-green-100' : 'bg-blue-100'
                ]">
                <svg v-if="notification.type === 'task'" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="16" fill="#045940"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.0996 10.8436C25.1768 10.9918 25.2478 11.1439 25.3123 11.2996C25.5468 11.8656 25.6505 12.4777 25.7007 13.2132C25.75 13.936 25.75 14.8309 25.75 15.9722V16V16.0278C25.75 17.1691 25.75 18.064 25.7007 18.7868C25.6505 19.5223 25.5468 20.1344 25.3123 20.7004C24.7287 22.1093 23.6093 23.2287 22.2004 23.8123C21.6344 24.0468 21.0223 24.1505 20.2868 24.2007C19.564 24.25 18.6691 24.25 17.5278 24.25H17.5H14.5H14.4722C13.3309 24.25 12.436 24.25 11.7132 24.2007C10.9777 24.1505 10.3656 24.0468 9.79957 23.8123C8.39066 23.2287 7.27128 22.1093 6.68769 20.7004C6.45323 20.1344 6.3495 19.5223 6.29931 18.7868C6.24999 18.064 6.25 17.1691 6.25 16.0278V16V15.9722C6.25 14.8309 6.24999 13.936 6.29931 13.2132C6.3495 12.4777 6.45323 11.8656 6.68769 11.2996C7.27128 9.89066 8.39066 8.77128 9.79957 8.18769C10.3656 7.95323 10.9777 7.8495 11.7132 7.79931C12.436 7.74999 13.3309 7.75 14.4722 7.75H14.5H17.5H17.5278C18.1047 7.75 18.6186 7.75 19.0792 7.75636C19.0273 7.99602 19 8.24482 19 8.5C19 8.75976 19.0283 9.01292 19.082 9.25655C18.6295 9.25011 18.1093 9.25 17.5 9.25H14.5C13.3249 9.25 12.4811 9.25041 11.8153 9.29584C11.1562 9.34081 10.7264 9.42737 10.3736 9.57351C9.33223 10.0049 8.50486 10.8322 8.07351 11.8736C7.92737 12.2264 7.84081 12.6562 7.79584 13.3153C7.75041 13.9811 7.75 14.8249 7.75 16C7.75 17.1751 7.75041 18.0189 7.79584 18.6847C7.84081 19.3438 7.92737 19.7736 8.07351 20.1264C8.50486 21.1678 9.33223 21.9951 10.3736 22.4265C10.7264 22.5726 11.1562 22.6592 11.8153 22.7042C12.4811 22.7496 13.3249 22.75 14.5 22.75H17.5C18.6751 22.75 19.5189 22.7496 20.1847 22.7042C20.8438 22.6592 21.2736 22.5726 21.6264 22.4265C22.6678 21.9951 23.4951 21.1678 23.9265 20.1264C24.0726 19.7736 24.1592 19.3438 24.2042 18.6847C24.2496 18.0189 24.25 17.1751 24.25 16C24.25 14.8249 24.2496 13.9811 24.2042 13.3153C24.1592 12.6562 24.0726 12.2264 23.9265 11.8736C23.9058 11.8236 23.8842 11.7742 23.8617 11.7252C24.3371 11.5242 24.7589 11.2212 25.0996 10.8436Z" fill="#FAFBFB"/>
<path d="M7 12L10.4749 14.7025C12.8245 16.5299 13.9993 17.4436 15.3413 17.6221C15.7788 17.6802 16.222 17.6802 16.6595 17.622C18.0015 17.4436 19.1762 16.5298 21.5258 14.7023L25 12" stroke="#FAFBFB" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M24.5 8.5C24.5 9.60457 23.6046 10.5 22.5 10.5C21.3954 10.5 20.5 9.60457 20.5 8.5C20.5 7.39543 21.3954 6.5 22.5 6.5C23.6046 6.5 24.5 7.39543 24.5 8.5Z" fill="#FAFBFB"/>
</svg>

                  <!-- <svg 
                    v-if="notification.type === 'task'"
                    class="w-4 h-4 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg> -->
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-900">{{ notification.title }}</p>
                  <p class="text-sm text-gray-500">{{ notification.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Notification {
    id: number
    type: 'task' | 'appointment'
    title: string
    description: string
    date: Date
  }
  
  const activeTab = ref('all')
  
  const recentNotifications = ref<Notification[]>([
    {
      id: 1,
      type: 'task',
      title: 'Task Due Today: Finalize UI Design for E-Commerce',
      description: 'Reminder that a high-priority task is due by the end of the day.',
      date: new Date()
    },
    {
      id: 2,
      type: 'task',
      title: 'Task Completed: Create Wireframes for New Project',
      description: 'The wireframes have been successfully completed and are ready for review.',
      date: new Date()
    },
    // Add more notifications as needed
  ])
  
  const markAllAsRead = () => {
    // Implementation for marking all as read
  }
  
  const close = () => {
    // Implementation for closing the panel
  }
  
  defineExpose({
    close
  })
  </script>