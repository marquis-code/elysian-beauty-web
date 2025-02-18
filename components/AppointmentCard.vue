<template>
    <div
      :class="[
        'p-4 rounded-lg mb-4',
        typeClasses[appointment.type] || 'bg-white'
      ]"
    >
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-medium">{{ appointment.title }}</h3>
          <div class="flex items-center text-sm text-gray-600 mt-2">
            <User class="h-4 w-4 mr-1" />
            <span>{{ appointment.client }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-600 mt-1">
            <MapPin class="h-4 w-4 mr-1" />
            <span>{{ appointment.location }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-600 mt-1">
            <Clock class="h-4 w-4 mr-1" />
            <span>{{ appointment.time }}</span>
          </div>
        </div>
        <div class="flex -space-x-2">
          <img
            v-for="(avatar, index) in appointment.avatars"
            :key="index"
            :src="avatar"
            :alt="'Avatar ' + (index + 1)"
            class="h-8 w-8 rounded-full border-2 border-white"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { User, MapPin, Clock } from 'lucide-vue-next'
  
  defineProps<{
    appointment: {
      title: string
      client: string
      location: string
      time: string
      type: string
      avatars: string[]
    }
  }>()
  
  const typeClasses = {
    gele: 'bg-emerald-50',
    makeup: 'bg-amber-50',
    massage: 'bg-rose-50'
  }
  </script>