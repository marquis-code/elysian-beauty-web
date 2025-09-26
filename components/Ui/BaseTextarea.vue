<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :class="[
        'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors resize-vertical',
        error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#045940]',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      ]"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rows?: number;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  id: () => `textarea-${Math.random().toString(36).substr(2, 9)}`
});

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>