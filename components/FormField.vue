<template>
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        {{ label }}
        <span v-if="required" class="text-red-500 ml-1">*</span>
      </label>
      <slot />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    label: string
    required?: boolean
    error?: string
  }
  
  defineProps<Props>()
  </script>