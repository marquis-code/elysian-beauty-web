<template>
    <a
      href="#"
      :class="[
        'flex items-center px-4 py-3 text-gray-300 hover:bg-emerald-800 transition-colors',
        active ? 'bg-emerald-800' : ''
      ]"
    >
      <component :is="icon" class="h-5 w-5 mr-3" />
      <span>{{ text }}</span>
    </a>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    icon: string
    text: string
    active?: boolean
  }>()
  </script>