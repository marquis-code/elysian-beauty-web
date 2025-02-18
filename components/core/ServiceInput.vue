<template>
    <div>
      <label class="block text-sm font-medium text-gray-700">Services Offered</label>
      <div class="relative">
        <input
          v-model="newService"
          @keydown.enter.prevent="addService"
          type="text"
          class="w-full rounded-full border-gray-300 shadow-sm"
          placeholder="Type a service and press Enter"
        />
        <div class="mt-2 flex flex-wrap gap-2">
          <div
            v-for="service in modelValue"
            :key="service"
            class="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
          >
            {{ service }}
            <button
              @click="removeService(service)"
              class="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    modelValue: string[]
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void
    (e: 'add', value: string): void
    (e: 'remove', value: string): void
  }>()
  
  const newService = ref('')
  
  const addService = () => {
    if (newService.value && !props.modelValue.includes(newService.value)) {
      emit('add', newService.value)
      newService.value = ''
    }
  }
  
  const removeService = (service: string) => {
    emit('remove', service)
  }
  </script>