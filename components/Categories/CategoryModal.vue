<template>
  <UiBaseModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="isEdit ? 'Edit Category' : 'Create New Category'"
    size="lg"
  >
    <form @submit.prevent="handleSubmit">
      <UiBaseInput
        v-model="form.name"
        label="Category Name"
        placeholder="Enter category name"
        required
        :error="errors.name"
      />

      {{ serviceOptions }}
      
      <UiBaseTextarea
        v-model="form.description"
        label="Description"
        placeholder="Enter category description"
        required
        :rows="4"
        :error="errors.description"
      />
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Services
        </label>
        <div class="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
          <div v-if="serviceOptions.length === 0" class="text-gray-500 text-sm">
            No services available
          </div>
          <div v-else class="space-y-2">
            <label
              v-for="service in serviceOptions"
              :key="service.id"
              class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                :value="service.id"
                v-model="form.services"
                class="rounded border-gray-300 text-[#045940] focus:ring-[#045940]"
              />
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-900">{{ service.serviceType }}</div>
                <div class="text-xs text-gray-500">₦{{ service.price.toLocaleString() }} • {{ service.duration }}hr</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </form>
    
    <template #footer>
      <UiBaseButton
        variant="secondary"
        @click="$emit('update:modelValue', false)"
        :disabled="loading"
      >
        Cancel
      </UiBaseButton>
      <UiBaseButton
        type="submit"
        @click="handleSubmit"
        :loading="loading"
      >
        {{ isEdit ? 'Update Category' : 'Create Category' }}
      </UiBaseButton>
    </template>
  </UiBaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { Category, Service, CreateCategoryPayload } from '~/types';

interface Props {
  modelValue: boolean;
  category?: Category | null;
  serviceOptions?: Service[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  serviceOptions: () => []
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  submit: [data: CreateCategoryPayload];
}>();

const isEdit = computed(() => !!props.category);

const form = reactive({
  name: '',
  description: '',
  services: [] as string[]
});

const errors = reactive({
  name: '',
  description: ''
});

const resetForm = () => {
  form.name = '';
  form.description = '';
  form.services = [];
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const validateForm = () => {
  let isValid = true;
  
  if (!form.name.trim()) {
    errors.name = 'Category name is required';
    isValid = false;
  } else {
    errors.name = '';
  }
  
  if (!form.description.trim()) {
    errors.description = 'Description is required';
    isValid = false;
  } else {
    errors.description = '';
  }
  
  return isValid;
};

const handleSubmit = () => {
  if (!validateForm()) return;
  
  emit('submit', {
    name: form.name,
    description: form.description,
    services: form.services
  });
};

watch(() => props.modelValue, (newValue) => {
  if (newValue && props.category) {
    form.name = props.category.name;
    form.description = props.category.description;
    form.services = [...props.category.services];
  } else if (!newValue) {
    resetForm();
  }
});

watch(() => props.category, (newCategory) => {
  if (newCategory) {
    form.name = newCategory.name;
    form.description = newCategory.description;
    form.services = [...newCategory.services];
  }
});
</script>
