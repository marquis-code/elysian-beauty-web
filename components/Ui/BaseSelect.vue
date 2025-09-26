<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :class="[
        'w-full px-3 py-2 border-[0.5px] border-gray-300 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors',
        error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#045940]',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      ]"
    >
      <option value="" disabled>{{ placeholder || 'Select an option' }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue: string | number;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => `select-${Math.random().toString(36).substr(2, 9)}`
});

defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>