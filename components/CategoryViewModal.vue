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
          Category Details
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
      <div class="p-6" v-if="category">
        <div class="space-y-6">
          <!-- Category Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
            <div class="p-3 bg-gray-50 rounded-md border">
              <p class="text-gray-900 font-medium">{{ category.name }}</p>
            </div>
          </div>

          <!-- Category Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div class="p-3 bg-gray-50 rounded-md border">
              <p class="text-gray-900">{{ category.description }}</p>
            </div>
          </div>

          <!-- Services -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Services ({{ category.services?.length || 0 }})
            </label>
            <div class="border border-gray-300 rounded-md p-4 max-h-64 overflow-y-auto">
              <div v-if="category.services?.length === 0" class="text-gray-500 text-sm text-center py-4">
                No services assigned to this category
              </div>
              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div
                  v-for="service in category.services"
                  :key="service.id"
                  class="flex items-center p-2 bg-[#045940] bg-opacity-10 text-[#045940] rounded-md"
                >
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm font-medium">{{ service.serviceType }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Category Stats -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 mb-3">Category Statistics</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-[#045940]">{{ category.services?.length || 0 }}</div>
                <div class="text-sm text-gray-600">Total Services</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-[#045940]">{{ formatDate(category.id) }}</div>
                <div class="text-sm text-gray-600">Category ID</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
        <UiBaseButton
          variant="ghost"
          @click="handleClose"
        >
          Close
        </UiBaseButton>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
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

// Props
interface Props {
  modelValue: boolean;
  category?: Category | null;
}

const props = withDefaults(defineProps<Props>(), {
  category: null
});

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}

const emit = defineEmits<Emits>();

// Methods
const handleClose = () => {
  emit('update:modelValue', false);
};

const formatDate = (id: string) => {
  // This is just to show the first 8 characters of the ID
  // You might want to show actual creation date if available
  return id.substring(0, 8) + '...';
};
</script>