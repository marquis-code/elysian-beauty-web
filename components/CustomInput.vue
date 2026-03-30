<template>
  <div class="space-y-2">
    <label 
      v-if="label" 
      :for="inputId"
      class="block text-sm font-medium text-gray-700"
      :class="{ 'text-red-600': hasError }"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
          {
            'border-gray-300 focus:border-[#045940] focus:ring-[#045940]': !hasError && !disabled,
            'border-red-300 focus:border-red-500 focus:ring-red-500': hasError,
            'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed': disabled,
            'pr-10': hasError || $slots.suffix
          }
        ]"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <!-- Error icon -->
      <div v-if="hasError" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" />
      </div>
      
      <!-- Suffix slot -->
      <div v-if="$slots.suffix && !hasError" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <slot name="suffix" />
      </div>
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
import { ref, computed, useAttrs } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

interface Props {
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: boolean
  errorMessage?: string
  helpText?: string
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'input', event: Event): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  error: false
})

const emit = defineEmits<Emits>()

// Remove event handlers from inherited attrs to avoid duplication
const attrs = useAttrs()
const { onInput, onBlur, onFocus, ...inheritedAttrs } = attrs

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const inputValue = computed({
  get: () => props.modelValue || '',
  set: (value: string | number) => emit('update:modelValue', value)
})

const hasError = computed(() => props.error || !!props.errorMessage)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>