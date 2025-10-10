<template>
  <div class="relative" ref="dropdownRef">
    <!-- Dropdown Trigger -->
    <div
      @click="toggleDropdown"
      class="w-full px-4 py-4 bg-gray-25 border-[0.5px] border-gray-100 rounded-2xl cursor-pointer transition-all duration-200 hover:border-emerald-300"
      :class="[
        isOpen ? 'border-emerald-500 ring-2 ring-emerald-500/20' : '',
        error ? 'border-red-300 ring-2 ring-red-500/20' : ''
      ]"
    >
      <div class="flex items-center justify-between">
        <!-- Selected Option Display -->
        <div class="flex items-center space-x-3 flex-1">
          <div v-if="selectedOption?.icon" class="text-2xl">
            {{ selectedOption.icon }}
          </div>
          <div class="flex-1">
            <div v-if="selectedOption" class="font-medium text-gray-900">
              {{ selectedOption.label }}
            </div>
            <div v-else class="text-gray-500">
              {{ placeholder }}
            </div>
            <div v-if="selectedOption?.description" class="text-sm text-gray-600 mt-0.5">
              {{ selectedOption.description }}
            </div>
          </div>
        </div>
        
        <!-- Dropdown Arrow -->
        <svg 
          class="w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0"
          :class="{ 'rotate-180': isOpen }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div 
        v-if="isOpen"
        class="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
      >
        <div class="max-h-80 overflow-y-auto p-2">
          <div 
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
            :class="[
              modelValue === option.value 
                ? 'bg-emerald-50 border-2 border-emerald-600' 
                : 'hover:bg-gray-50 border-2 border-transparent'
            ]"
          >
            <!-- Icon -->
            <div v-if="option.icon" class="text-2xl flex-shrink-0">
              {{ option.icon }}
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="font-medium text-gray-900">
                {{ option.label }}
              </div>
              <div v-if="option.description" class="text-sm text-gray-600 mt-0.5">
                {{ option.description }}
              </div>
            </div>
            
            <!-- Selected Indicator -->
            <div 
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
              :class="modelValue === option.value
                ? 'border-emerald-600 bg-emerald-600'
                : 'border-gray-300'"
            >
              <div v-if="modelValue === option.value" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface DropdownOption {
  value: string
  label: string
  description?: string
  icon?: string
}

interface Props {
  modelValue: string
  options: DropdownOption[]
  placeholder?: string
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  error: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: DropdownOption) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
