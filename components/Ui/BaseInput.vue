<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="[
        'w-full px-3 py-2 border-[0.5px] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors',
        error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#045940]',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      ]"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  id: () => `input-${Math.random().toString(36).substr(2, 9)}`
});

defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>