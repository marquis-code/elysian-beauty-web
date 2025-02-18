<template>
    <button
      :class="[
        'px-4 py-2 rounded-lg transition-colors',
        active ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700'
      ]"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    active: boolean
  }>()
  </script>