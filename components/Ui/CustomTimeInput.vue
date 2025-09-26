<template>
  <div class="space-y-2">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700"
      :class="{ 'text-red-600': hasError }"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <!-- Main Input Container -->
      <div
        class="relative flex items-center bg-white border rounded-lg shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-[#045940] focus-within:border-[#045940]"
        :class="{
          'border-gray-300': !hasError && !disabled,
          'border-red-300': hasError,
          'border-gray-200 bg-gray-50': disabled,
          'hover:border-gray-400': !disabled && !hasError
        }"
      >
        <!-- Clock Icon -->
        <div class="absolute left-3 pointer-events-none">
          <ClockIcon
            class="w-4 h-4 transition-colors duration-200"
            :class="{
              'text-gray-400': !hasError,
              'text-red-400': hasError
            }"
          />
        </div>

        <!-- Time Display/Input -->
        <div class="flex items-center w-full pl-10 pr-3">
          <!-- Hour Input -->
          <input
            :id="inputId"
            ref="hourInput"
            v-model="hourValue"
            type="text"
            inputmode="numeric"
            maxlength="2"
            placeholder="HH"
            :disabled="disabled"
            :readonly="readonly"
            class="w-8 text-center bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-sm font-medium"
            :class="{
              'text-gray-500': disabled,
              'cursor-not-allowed': disabled || readonly
            }"
            @input="onHourInput"
            @blur="validateHour"
            @keydown="onKeyDown($event, 'hour')"
            @focus="onFocus"
          />

          <!-- Separator -->
          <span class="text-gray-400 font-medium mx-1">:</span>

          <!-- Minute Input -->
          <input
            ref="minuteInput"
            v-model="minuteValue"
            type="text"
            inputmode="numeric"
            maxlength="2"
            placeholder="MM"
            :disabled="disabled"
            :readonly="readonly"
            class="w-8 text-center bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-sm font-medium"
            :class="{
              'text-gray-500': disabled,
              'cursor-not-allowed': disabled || readonly
            }"
            @input="onMinuteInput"
            @blur="validateMinute"
            @keydown="onKeyDown($event, 'minute')"
          />

          <!-- AM/PM Toggle (for 12-hour format) -->
          <div v-if="!use24Hour" class="ml-3 flex">
            <button
              type="button"
              :disabled="disabled"
              @click="toggleAmPm"
              class="px-2 py-1 text-xs font-medium rounded transition-colors duration-200"
              :class="{
                'bg-[#045940] text-white': !disabled,
                'bg-gray-300 text-gray-500 cursor-not-allowed': disabled,
                'hover:bg-[#034a37]': !disabled
              }"
            >
              {{ amPm }}
            </button>
          </div>
        </div>

        <!-- Clear Button -->
        <button
          v-if="modelValue && !disabled && !readonly && clearable"
          type="button"
          @click="clearTime"
          class="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Time Picker Dropdown -->
    <Teleport to="body">
      <div
        v-if="showDropdown"
        ref="dropdown"
        class="fixed z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        :style="dropdownStyle"
      >
        <div class="p-3 border-b border-gray-100">
          <div class="text-xs font-medium text-gray-700 mb-2">Quick Select</div>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="time in quickTimes"
              :key="time"
              type="button"
              @click="selectQuickTime(time)"
              class="px-2 py-1 text-xs bg-gray-50 hover:bg-gray-100 rounded transition-colors duration-200 text-gray-700"
            >
              {{ formatDisplayTime(time) }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Error Message -->
    <div
      v-if="hasError && errorMessage"
      class="text-sm text-red-600 mt-1 flex items-center space-x-1"
    >
      <ExclamationCircleIcon class="w-4 h-4 flex-shrink-0" />
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Helper Text -->
    <div
      v-if="helperText && !hasError"
      class="text-sm text-gray-500 mt-1"
    >
      {{ helperText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import {
  ClockIcon,
  XMarkIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

// Props
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  use24Hour?: boolean
  minTime?: string
  maxTime?: string
  step?: number // in minutes
  errorMessage?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  showQuickSelect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Select time',
  disabled: false,
  readonly: false,
  required: false,
  clearable: true,
  use24Hour: true,
  step: 15,
  size: 'md',
  showQuickSelect: true
})

// Emits
interface Emits {
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  change: [value: string]
}

const emit = defineEmits<Emits>()

// Refs
const hourInput = ref<HTMLInputElement>()
const minuteInput = ref<HTMLInputElement>()
const dropdown = ref<HTMLElement>()

// Reactive data
const hourValue = ref('')
const minuteValue = ref('')
const amPm = ref<'AM' | 'PM'>('AM')
const showDropdown = ref(false)
const dropdownStyle = ref({})
const inputId = ref(`time-input-${Math.random().toString(36).substr(2, 9)}`)

// Computed
const hasError = computed(() => !!props.errorMessage)

const quickTimes = computed(() => {
  const times = []
  const start = props.use24Hour ? 0 : 1
  const end = props.use24Hour ? 24 : 13
  
  for (let hour = start; hour < end; hour++) {
    for (let minute = 0; minute < 60; minute += props.step) {
      const timeStr = props.use24Hour
        ? `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        : `${hour}:${minute.toString().padStart(2, '0')}`
      
      if (isTimeInRange(timeStr)) {
        times.push(timeStr)
      }
      
      if (times.length >= 12) break // Limit quick select options
    }
    if (times.length >= 12) break
  }
  
  return times
})

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (newValue && newValue !== getCurrentTimeString()) {
    parseTime(newValue)
  } else if (!newValue) {
    resetTime()
  }
}, { immediate: true })

watch([hourValue, minuteValue, amPm], () => {
  updateModelValue()
})

// Methods
const parseTime = (timeString: string) => {
  if (!timeString) return
  
  const timeRegex = props.use24Hour
    ? /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/
    : /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i
  
  const match = timeString.match(timeRegex)
  
  if (match) {
    hourValue.value = match[1].padStart(2, '0')
    minuteValue.value = match[2].padStart(2, '0')
    
    if (!props.use24Hour && match[3]) {
      amPm.value = match[3].toUpperCase() as 'AM' | 'PM'
    }
  }
}

const resetTime = () => {
  hourValue.value = ''
  minuteValue.value = ''
  amPm.value = 'AM'
}

const getCurrentTimeString = (): string => {
  if (!hourValue.value || !minuteValue.value) return ''
  
  if (props.use24Hour) {
    return `${hourValue.value}:${minuteValue.value}`
  } else {
    return `${hourValue.value}:${minuteValue.value} ${amPm.value}`
  }
}

const updateModelValue = () => {
  const timeString = getCurrentTimeString()
  if (timeString !== props.modelValue) {
    emit('update:modelValue', timeString)
    emit('change', timeString)
  }
}

const onHourInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '') // Remove non-digits
  
  if (value.length > 2) {
    value = value.slice(0, 2)
  }
  
  if (props.use24Hour) {
    if (parseInt(value) > 23) {
      value = '23'
    }
  } else {
    if (parseInt(value) > 12) {
      value = '12'
    }
    if (value === '00') {
      value = '12'
    }
  }
  
  hourValue.value = value
  
  // Auto-advance to minutes when hour is complete
  if (value.length === 2) {
    nextTick(() => {
      minuteInput.value?.focus()
    })
  }
}

const onMinuteInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '') // Remove non-digits
  
  if (value.length > 2) {
    value = value.slice(0, 2)
  }
  
  if (parseInt(value) > 59) {
    value = '59'
  }
  
  minuteValue.value = value
}

const validateHour = () => {
  if (hourValue.value && hourValue.value.length === 1) {
    hourValue.value = hourValue.value.padStart(2, '0')
  }
  
  if (props.use24Hour) {
    if (!hourValue.value && minuteValue.value) {
      hourValue.value = '00'
    }
  } else {
    if (!hourValue.value && minuteValue.value) {
      hourValue.value = '12'
    }
  }
}

const validateMinute = () => {
  if (minuteValue.value && minuteValue.value.length === 1) {
    minuteValue.value = minuteValue.value.padStart(2, '0')
  }
  
  if (!minuteValue.value && hourValue.value) {
    minuteValue.value = '00'
  }
}

const onKeyDown = (event: KeyboardEvent, field: 'hour' | 'minute') => {
  const allowedKeys = [
    'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
  ]
  
  // Allow navigation keys
  if (allowedKeys.includes(event.key)) {
    if (event.key === 'ArrowRight' && field === 'hour') {
      event.preventDefault()
      minuteInput.value?.focus()
    } else if (event.key === 'ArrowLeft' && field === 'minute') {
      event.preventDefault()
      hourInput.value?.focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      incrementTime(field, 1)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      incrementTime(field, -1)
    }
    return
  }
  
  // Allow only digits
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault()
  }
}

const incrementTime = (field: 'hour' | 'minute', direction: 1 | -1) => {
  if (field === 'hour') {
    let hour = parseInt(hourValue.value) || 0
    hour += direction
    
    if (props.use24Hour) {
      if (hour < 0) hour = 23
      if (hour > 23) hour = 0
    } else {
      if (hour < 1) hour = 12
      if (hour > 12) hour = 1
    }
    
    hourValue.value = hour.toString().padStart(2, '0')
  } else {
    let minute = parseInt(minuteValue.value) || 0
    minute += direction
    
    if (minute < 0) minute = 59
    if (minute > 59) minute = 0
    
    minuteValue.value = minute.toString().padStart(2, '0')
  }
}

const toggleAmPm = () => {
  amPm.value = amPm.value === 'AM' ? 'PM' : 'AM'
}

const clearTime = () => {
  resetTime()
  emit('update:modelValue', '')
  emit('change', '')
}

const onFocus = (event: FocusEvent) => {
  emit('focus', event)
  if (props.showQuickSelect) {
    showQuickSelect()
  }
}

const showQuickSelect = () => {
  if (!hourInput.value) return
  
  showDropdown.value = true
  
  nextTick(() => {
    const rect = hourInput.value!.getBoundingClientRect()
    dropdownStyle.value = {
      top: `${rect.bottom + window.scrollY + 4}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${Math.max(rect.width, 200)}px`
    }
  })
}

const selectQuickTime = (time: string) => {
  parseTime(time)
  showDropdown.value = false
}

const formatDisplayTime = (time: string): string => {
  if (props.use24Hour) {
    return time
  }
  
  const [hour, minute] = time.split(':')
  const hourNum = parseInt(hour)
  const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum
  const period = hourNum >= 12 ? 'PM' : 'AM'
  
  return `${displayHour}:${minute} ${period}`
}

const isTimeInRange = (time: string): boolean => {
  if (!props.minTime && !props.maxTime) return true
  
  const timeValue = convertToMinutes(time)
  
  if (props.minTime) {
    const minValue = convertToMinutes(props.minTime)
    if (timeValue < minValue) return false
  }
  
  if (props.maxTime) {
    const maxValue = convertToMinutes(props.maxTime)
    if (timeValue > maxValue) return false
  }
  
  return true
}

const convertToMinutes = (time: string): number => {
  const [hour, minute] = time.split(':').map(num => parseInt(num))
  return hour * 60 + minute
}

const handleClickOutside = (event: Event) => {
  if (
    dropdown.value &&
    !dropdown.value.contains(event.target as Node) &&
    !hourInput.value?.contains(event.target as Node) &&
    !minuteInput.value?.contains(event.target as Node)
  ) {
    showDropdown.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
input[type="text"]::-webkit-outer-spin-button,
input[type="text"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="text"] {
  -moz-appearance: textfield;
}
</style>