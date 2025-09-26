<template>
  <UiModal
    :show="modelValue"
    @close="handleClose"
    :max-width="'lg'"
  >
    <div class="bg-white rounded-lg shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ mode === 'create' ? 'Create Category' : 'Edit Category' }}
        </h3>
        <button
          @click="handleClose"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Category Name -->
          <div>
            <label for="categoryName" class="block text-sm font-medium text-gray-700 mb-2">
              Category Name <span class="text-red-500">*</span>
            </label>
            <input
              id="categoryName"
              v-model="formData.name"
              type="text"
              required
              placeholder="Enter category name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#045940] focus:border-[#045940] focus:outline-none"
            />
          </div>

          <!-- Category Description -->
          <div>
            <label for="categoryDescription" class="block text-sm font-medium text-gray-700 mb-2">
              Description <span class="text-red-500">*</span>
            </label>
            <textarea
              id="categoryDescription"
              v-model="formData.description"
              required
              rows="3"
              placeholder="Enter category description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#045940] focus:border-[#045940] focus:outline-none resize-none"
            />
          </div>

          <!-- Services Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Services <span class="text-red-500">*</span>
            </label>
            <div class="border border-gray-300 rounded-md p-4 max-h-64 overflow-y-auto">
              <div v-if="serviceOptions.length === 0" class="text-gray-500 text-sm text-center py-4">
                No services available
              </div>
              <div v-else class="space-y-2">
                <label
                  v-for="service in serviceOptions"
                  :key="service.id"
                  class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    :value="service.id"
                    v-model="formData.services"
                    class="h-4 w-4 text-[#045940] focus:ring-[#045940] border-gray-300 rounded"
                  />
                  <span class="ml-3 text-sm text-gray-700">{{ service.serviceType }}</span>
                </label>
              </div>
            </div>
            <p class="mt-1 text-sm text-gray-500">
              Selected: {{ formData.services.length }} service{{ formData.services.length !== 1 ? 's' : '' }}
            </p>
          </div>
        </form>
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
          @click="handleSubmit"
          :loading="loading"
          :disabled="!isFormValid"
        >
          {{ mode === 'create' ? 'Create Category' : 'Update Category' }}
        </UiBaseButton>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue';

// Types
interface Service {
  id: string;
  serviceType: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

interface CreateCategoryPayload {
  name: string;
  description: string;
  services: string[];
}

// Props
interface Props {
  modelValue: boolean;
  category?: Category | null;
  serviceOptions: Service[];
  loading?: boolean;
  mode: 'create' | 'edit';
}

const props = withDefaults(defineProps<Props>(), {
  category: null,
  loading: false,
  mode: 'create'
});

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', data: CreateCategoryPayload): void;
}

const emit = defineEmits<Emits>();

// Reactive state
const formData = ref<CreateCategoryPayload>({
  name: '',
  description: '',
  services: []
});

// Computed
const isFormValid = computed(() => {
  return formData.value.name.trim() !== '' && 
         formData.value.description.trim() !== '' &&
         formData.value.services.length > 0;
});

// Methods
const handleClose = () => {
  emit('update:modelValue', false);
  resetForm();
};

const handleSubmit = () => {
  if (!isFormValid.value) return;
  
  emit('submit', { ...formData.value });
};

const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    services: []
  };
};

const populateForm = () => {
  if (props.category && props.mode === 'edit') {
    formData.value = {
      name: props.category.name,
      description: props.category.description,
      services: props.category.services.map(service => service.id)
    };
  } else {
    resetForm();
  }
};

// Watchers
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        populateForm();
      });
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

watch(
  () => props.category,
  () => {
    if (props.modelValue) {
      populateForm();
    }
  }
);
</script>