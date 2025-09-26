<template>
  <UiBaseModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="isEdit ? 'Edit Service' : 'Create New Service'"
    size="lg"
  >
    <form @submit.prevent="handleSubmit">
      <UiBaseInput
        v-model="form.serviceType"
        label="Service Type"
        placeholder="Enter service type"
        required
        :error="errors.serviceType"
      />
      
      <UiBaseTextarea
        v-model="form.description"
        label="Description"
        placeholder="Enter service description"
        required
        :rows="4"
        :error="errors.description"
      />
      
      <UiBaseInput
        v-model="form.price"
        label="Price (₦)"
        type="number"
        placeholder="Enter price"
        required
        :error="errors.price"
      />
      
      <UiBaseInput
        v-model="form.duration"
        label="Duration (hours)"
        type="number"
        placeholder="Enter duration"
        required
        :error="errors.duration"
      />
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
        {{ isEdit ? 'Update Service' : 'Create Service' }}
      </UiBaseButton>
    </template>
  </UiBaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { Service, CreateServicePayload } from '~/types';

interface Props {
  modelValue: boolean;
  service?: Service | null;
  loading?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  submit: [data: CreateServicePayload];
}>();

const isEdit = computed(() => !!props.service);

const form = reactive({
  serviceType: '',
  description: '',
  price: 0,
  duration: 1
});

const errors = reactive({
  serviceType: '',
  description: '',
  price: '',
  duration: ''
});

const resetForm = () => {
  form.serviceType = '';
  form.description = '';
  form.price = 0;
  form.duration = 1;
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const validateForm = () => {
  let isValid = true;
  
  if (!form.serviceType.trim()) {
    errors.serviceType = 'Service type is required';
    isValid = false;
  } else {
    errors.serviceType = '';
  }
  
  if (!form.description.trim()) {
    errors.description = 'Description is required';
    isValid = false;
  } else {
    errors.description = '';
  }
  
  if (!form.price || form.price <= 0) {
    errors.price = 'Price must be greater than 0';
    isValid = false;
  } else {
    errors.price = '';
  }
  
  if (!form.duration || form.duration <= 0) {
    errors.duration = 'Duration must be greater than 0';
    isValid = false;
  } else {
    errors.duration = '';
  }
  
  return isValid;
};

const handleSubmit = () => {
  if (!validateForm()) return;
  
  emit('submit', {
    serviceType: form.serviceType,
    description: form.description,
    price: Number(form.price),
    duration: Number(form.duration)
  });
};

watch(() => props.modelValue, (newValue) => {
  if (newValue && props.service) {
    form.serviceType = props.service.serviceType;
    form.description = props.service.description;
    form.price = props.service.price;
    form.duration = props.service.duration;
  } else if (!newValue) {
    resetForm();
  }
});

watch(() => props.service, (newService) => {
  if (newService) {
    form.serviceType = newService.serviceType;
    form.description = newService.description;
    form.price = newService.price;
    form.duration = newService.duration;
  }
});
</script>