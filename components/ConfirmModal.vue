<!-- <template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <div class="text-center">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>
            <p class="text-sm text-gray-600 mb-6">{{ message }}</p>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="confirm"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
  message: string
  loading?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'confirm'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const closeModal = () => {
  emit('close')
}

const confirm = () => {
  emit('confirm')
}
</script> -->


<template>
  <UiModal
    :show="modelValue"
    @close="handleClose"
    :max-width="'md'"
  >
    <div class="bg-white rounded-lg shadow-xl">
      <!-- Header -->
      <div class="flex items-center p-6 border-b border-gray-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          </div>
        </div>
        <button
          @click="handleClose"
          class="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <div class="text-sm text-gray-700">
          {{ message }}
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
        <UiBaseButton
          variant="ghost"
          @click="handleClose"
          :disabled="loading"
        >
          Cancel
        </UiBaseButton>
        <UiBaseButton
          @click="handleConfirm"
          :loading="loading"
          class="bg-red-600 hover:bg-red-700 text-white"
        >
          {{ confirmText }}
        </UiBaseButton>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
// Props
interface Props {
  modelValue: boolean;
  title: string;
  message: string;
  confirmText?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  loading: false
});

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
}

const emit = defineEmits<Emits>();

// Methods
const handleClose = () => {
  emit('update:modelValue', false);
};

const handleConfirm = () => {
  emit('confirm');
};
</script>