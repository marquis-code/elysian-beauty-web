<!-- <template>
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
              <div class="px-6 py-5 border-b-[0.5px] border-gray-100">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-black text-gray-900">
                    {{ service ? 'Edit Service' : 'New Service' }}
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
                    Service Name *
                  </label>
                  <input
                    v-model="formData.serviceType"
                    type="text"
                    required
                    class="custom-input"
                    placeholder="e.g., Haircut"
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
                    placeholder="Describe the service..."
                  ></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Price (₦) *
                    </label>
                    <input
                      v-model.number="formData.price"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      class="custom-input"
                      placeholder="1500.00"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Duration (hours) *
                    </label>
                    <input
                      v-model.number="formData.duration"
                      type="number"
                      required
                      min="0.5"
                      step="0.5"
                      class="custom-input"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    v-model="formData.categoryId"
                    class="custom-input"
                  >
                    <option value="">Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </form>

              <div class="px-6 py-4 border-t-[0.5px] border-gray-100 flex justify-between">
                <button
                  v-if="service"
                  @click="handleDelete"
                  type="button"
                  class="px-4 py-2 text-red-600 bg-red-50 text-sm rounded-lg transition-colors"
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
                    {{ service ? 'Update' : 'Create' }}
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
  service: Object,
  categories: Array
})

const emit = defineEmits(['update:modelValue', 'save', 'delete'])

const formData = ref({
  serviceType: '',
  description: '',
  price: 0,
  duration: 1,
  categoryId: ''
})

watch(() => props.service, (newService) => {
  if (newService) {
    formData.value = {
      serviceType: newService.serviceType || '',
      description: newService.description || '',
      price: newService.price || 0,
      duration: newService.duration || 1,
      categoryId: newService.categoryId || ''
    }
  } else {
    formData.value = {
      serviceType: '',
      description: '',
      price: 0,
      duration: 1,
      categoryId: ''
    }
  }
}, { immediate: true })

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleSubmit = () => {
  emit('save', formData.value)
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this service?')) {
    emit('delete', props.service.id)
  }
}
</script>
