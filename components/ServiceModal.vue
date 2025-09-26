<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ isEditing ? 'Edit Service' : 'Create New Service' }}
          </h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6">
          <div class="space-y-4">
            <div>
              <label for="serviceType" class="block text-sm font-medium text-gray-700 mb-1">
                Service Type
              </label>
              <input
                id="serviceType"
                v-model="form.serviceType"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#045940] focus:border-transparent"
                placeholder="Enter service type"
              >
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                v-model="form.description"
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#045940] focus:border-transparent"
                placeholder="Enter description"
              ></textarea>
            </div>

            <div>
              <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                id="price"
                v-model.number="form.price"
                type="number"
                required
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#045940] focus:border-transparent"
                placeholder="Enter price"
              >
            </div>

            <div>
              <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">
                Duration (hours)
              </label>
              <input
                id="duration"
                v-model.number="form.duration"
                type="number"
                required
                min="0.5"
                step="0.5"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#045940] focus:border-transparent"
                placeholder="Enter duration in hours"
              >
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-[#045940] hover:bg-[#034531] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Service, CreateServicePayload } from '~/types'

interface Props {
  isOpen: boolean
  service?: Service | null
  loading?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'submit', payload: CreateServicePayload): void
}

const props = withDefaults(defineProps<Props>(), {
  service: null,
  loading: false
})

const emit = defineEmits<Emits>()

const form = reactive<CreateServicePayload>({
  serviceType: '',
  description: '',
  price: 0,
  duration: 1
})

const isEditing = computed(() => !!props.service)

watch(() => props.service, (newService) => {
  if (newService) {
    form.serviceType = newService.serviceType
    form.description = newService.description
    form.price = newService.price
    form.duration = newService.duration
  }
}, { immediate: true })

watch(() => props.isOpen, (isOpen) => {
  if (isOpen && !props.service) {
    // Reset form when opening for new service
    Object.assign(form, {
      serviceType: '',
      description: '',
      price: 0,
      duration: 1
    })
  }
})

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>