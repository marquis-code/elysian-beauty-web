<template>
  <UiBaseModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="title"
    size="sm"
  >
    <div class="text-center">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
        <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
      <p class="text-sm text-gray-500 mb-6">{{ message }}</p>
    </div>
    
    <template #footer>
      <UiBaseButton
        variant="secondary"
        @click="$emit('update:modelValue', false)"
        :disabled="loading"
      >
        Cancel
      </UiBaseButton>
      <UiBaseButton
        variant="danger"
        @click="$emit('confirm')"
        :loading="loading"
      >
        {{ confirmText }}
      </UiBaseButton>
    </template>
  </UiBaseModal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title: string;
  message: string;
  confirmText?: string;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  confirmText: 'Delete'
});

defineEmits<{
  'update:modelValue': [value: boolean];
  confirm: [];
}>();
</script>