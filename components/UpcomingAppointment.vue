<template>
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <CheckSquare class="h-5 w-5 text-gray-400" />
      </div>
      <div>
        <h4 class="font-medium">{{ task.title }}</h4>
        <p class="text-sm text-gray-600">{{ task.description }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { CheckSquare } from 'lucide-vue-next'
  
  defineProps<{
    task: {
      title: string
      description: string
    }
  }>()
  </script>