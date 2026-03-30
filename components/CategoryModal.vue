<!-- <template>
  <UiModal
    :show="modelValue"
    @close="handleClose"
    :max-width="'lg'"
  >
    <div class="bg-white rounded-lg shadow-xl">

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


      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">

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
</script> -->


<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeModal"
      >
        <div class="flex min-h-full items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
          
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              @click.stop
              class="relative w-full max-w-lg bg-white rounded-2xl transform transition-all"
            >
              <div class="px-6 py-3 border-b-[0.5px] border-gray-100">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-black text-gray-900">
                    {{ category ? 'Edit Category' : 'New Category' }}
                  </h3>
                  <button
                    @click="closeModal"
                    class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form @submit.prevent="handleSubmit" class="px-6 py-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="custom-input"
                    placeholder="e.g., Hair Services"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    v-model="formData.description"
                    required
                    rows="3"
                    class="custom-input"
                    placeholder="Describe the category..."
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Assign Services
                  </label>
                  <div class="border-[0.5px] border-gray-100 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
                    <label
                      v-for="service in services"
                      :key="service.id"
                      class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        :value="service.id"
                        v-model="formData.serviceIds"
                        class="custom-checkbox"
                      />
                      <span class="ml-2 text-sm text-gray-900">{{ service.serviceType }}</span>
                    </label>
                    <p v-if="services.length === 0" class="text-sm text-gray-500 italic">
                      No services available
                    </p>
                  </div>
                  <p class="mt-1 text-xs text-gray-500">
                    Selected: {{ formData.serviceIds.length }} service(s)
                  </p>
                </div>
              </form>

              <div class="px-6 py-4 border-t-[0.5px] border-gray-100 flex justify-between">
                <button
                  v-if="category"
                  @click="handleDelete"
                  type="button"
                  class="px-4 py-2 text-red-600 text-sm bg-red-50 rounded-lg transition-colors"
                >
                  Delete
                </button>
                <div class="flex gap-3 ml-auto">
                  <button
                    @click="closeModal"
                    type="button"
                    class="px-6 py-2 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleSubmit"
                    type="submit"
                    class="px-6 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {{ category ? 'Update' : 'Create' }}
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  category: Object,
  services: Array
})

const emit = defineEmits(['update:modelValue', 'save', 'delete'])

const formData = ref({
  name: '',
  description: '',
  serviceIds: []
})

watch(() => props.category, (newCategory) => {
  if (newCategory) {
    formData.value = {
      name: newCategory.name || '',
      description: newCategory.description || '',
      serviceIds: newCategory.services?.map(s => s.id) || []
    }
  } else {
    formData.value = {
      name: '',
      description: '',
      serviceIds: []
    }
  }
}, { immediate: true })

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleSubmit = () => {
  const payload = {
    name: formData.value.name,
    description: formData.value.description,
    services: formData.value.serviceIds
  }
  emit('save', payload)
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this category?')) {
    emit('delete', props.category.id)
  }
}
</script>
