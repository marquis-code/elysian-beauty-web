<template>
  <div class="space-y-2">
    <label 
      v-if="label" 
      :for="selectId"
      class="block text-sm font-medium text-gray-700"
      :class="{ 'text-red-600': hasError }"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <button
        :id="selectId"
        ref="buttonRef"
        type="button"
        @click="toggleDropdown"
        @blur="handleBlur"
        :disabled="disabled"
        :class="[
          'relative w-full bg-white border rounded-lg shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
          {
            'border-gray-300 focus:border-[#045940] focus:ring-[#045940]': !hasError && !disabled,
            'border-red-300 focus:border-red-500 focus:ring-red-500': hasError,
            'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed': disabled
          }
        ]"
      >
        <span v-if="selectedOption" class="block truncate">
          {{ selectedOption.label }}
        </span>
        <span v-else class="block truncate text-gray-500">
          {{ placeholder }}
        </span>
        
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
        </span>
      </button>

      <!-- Dropdown -->
      <Teleport to="body">
        <div
          v-if="isOpen"
          ref="dropdownRef"
          :style="dropdownStyle"
          class="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
        >
          <div
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 transition-colors"
            :class="{
              'text-[#045940] bg-green-50': option.value === modelValue,
              'text-gray-900': option.value !== modelValue
            }"
          >
            <span class="block truncate">{{ option.label }}</span>
            <span
              v-if="option.value === modelValue"
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-[#045940]"
            >
              <CheckIcon class="h-5 w-5" />
            </span>
          </div>
          
          <!-- Empty state -->
          <div v-if="options.length === 0" class="px-3 py-2 text-gray-500 text-center">
            No options available
          </div>
        </div>
      </Teleport>
    </div>
    
    <!-- Error message -->
    <p v-if="hasError && errorMessage" class="text-sm text-red-600">
      {{ errorMessage }}
    </p>
    
    <!-- Help text -->
    <p v-if="helpText && !hasError" class="text-sm text-gray-500">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/24/outline'

interface DropdownOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  options: DropdownOption[]
  disabled?: boolean
  required?: boolean
  error?: boolean
  errorMessage?: string
  helpText?: string
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', option: DropdownOption): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  disabled: false,
  required: false,
  error: false
})

const emit = defineEmits<Emits>()

const selectId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement>()
const buttonRef = ref<HTMLElement>()
const dropdownStyle = ref({})

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

const hasError = computed(() => props.error || !!props.errorMessage)

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      updateDropdownPosition()
    })
  }
}

const selectOption = (option: DropdownOption) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option)
  isOpen.value = false
}

const handleBlur = (event: FocusEvent) => {
  // Close dropdown when focus moves away from the component
  setTimeout(() => {
    if (!dropdownRef.value?.contains(event.relatedTarget as Node)) {
      isOpen.value = false
    }
  }, 100)
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (buttonRef.value && !buttonRef.value.contains(target) && 
      dropdownRef.value && !dropdownRef.value.contains(target)) {
    isOpen.value = false
  }
}

const updateDropdownPosition = () => {
  if (!buttonRef.value) return
  
  const button = buttonRef.value
  const rect = button.getBoundingClientRect()
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  
  dropdownStyle.value = {
    position: 'absolute',
    top: `${rect.bottom + scrollTop}px`,
    left: `${rect.left + scrollLeft}px`,
    width: `${rect.width}px`,
    zIndex: 1000
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition)
})
</script>