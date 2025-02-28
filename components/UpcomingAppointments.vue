<template>
    <div class="">
      <div 
        v-for="(task, index) in tasks" 
        :key="index"
        class="flex gap-3 py-6 border-b-[0.5px] last:border-0"
      >
        <div class="flex-shrink-0 pt-1">
          <div class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center bg-gray-900">
            <CheckIcon class="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <h4 class="font-medium text-[#262626]">{{ task.title }}</h4>
          <p class="text-xs font-light text-gray-500 mt-2">{{ task.description }}</p>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckIcon } from 'lucide-vue-next'

const props = defineProps<{
  appointments: Array<{
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
    type: string;
  }>
}>()

// Convert appointments to tasks
const tasks = computed(() => {
  return props.appointments.map(appointment => ({
    id: appointment.id,
    title: `Task ${Math.floor(Math.random() * 5) + 1}`,
    completed: true,
    description: 'guidelines regarding color contrast ratios and provide options for users to adjust text size'
  }))
})
</script>
