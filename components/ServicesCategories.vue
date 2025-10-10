<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h3 class="text-lg font-semibold mb-2">Services/Categories</h3>
      <p class="text-[#475467] font-light">{{ headerDescription }}</p>
    </div>

    <!-- Sub Tabs -->
    <div class="flex items-center justify-between">
      <div class="flex gap-8">
        <button
          @click="activeSubTab = 'services'"
          :class="servicesTabClass"
        >
          Services
        </button>
        <button
          @click="activeSubTab = 'categories'"
          :class="categoriesTabClass"
        >
          Categories
        </button>
      </div>
      <button
        @click="handleAddClick"
        class="px-4 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
      >
        {{ addButtonText }}
      </button>
    </div>

    <!-- Services Tab Content -->
    <div v-show="activeSubTab === 'services'">
      <!-- Loading state using actual fetching status -->
      <div v-if="fetching" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>

      <!-- Services table with actual data from composable -->
      <div v-else-if="serviceTypes && serviceTypes.length > 0" class="overflow-x-auto border-[0.5px] border-gray-100 rounded-xl">
        <table class="min-w-full">
          <thead class="border-b-[0.5px] border-gray-100">
            <tr>
              <th class="px-6 py-5 text-left text-sm font-medium text-gray-500">Service Name</th>
              <th class="px-6 py-5 text-left text-sm font-medium text-gray-500">Price</th>
              <th class="px-6 py-5 text-left text-sm font-medium text-gray-500">Categories</th>
              <th class="px-6 py-5 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y-[0.5px] divide-gray-100">
            <tr v-for="service in serviceTypes" :key="service.id" class="hover:bg-gray-25">
              <td class="px-6 py-5 text-sm text-gray-900">{{ service.serviceType }}</td>
              <td class="px-6 py-5 text-sm text-gray-900">₦{{ service.price?.toLocaleString() }}</td>
              <td class="px-6 py-5">
                <!-- {{ service?.ServiceCategory }} -->
                  Nil
                <!-- <select
                  :value="getServiceCategoryId(service.id)"
                  @change="updateServiceCategory(service, $event)"
                  class="text-sm text-gray-700 bg-gray-100 border-0 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-gray-900"
                >
                  <option value="">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select> -->
              </td>
              <td class="px-6 py-5 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openServiceModal(service)"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="confirmDeleteService(service)"
                    class="text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <p class="text-gray-500 mb-4">No services yet. Create your first service to get started.</p>
        <button
          @click="openServiceModal()"
          class="px-4 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
        >
          Add Service
        </button>
      </div>
    </div>

    <!-- Categories Tab Content -->
    <div v-show="activeSubTab === 'categories'">
      <!-- Loading state using actual fetching status -->
      <div v-if="fetchingCategories" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-[0.5px] border-gray-100"></div>
      </div>

      <!-- Categories list with actual data from composable -->
      <div v-else-if="categories && categories.length > 0" class="bg-white border-[0.5px] border-gray-100 rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <h4 class="text-xl font-bold text-gray-900">Categories</h4>
          <!-- <button
            @click="openCategoryModal()"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button> -->
        </div>

        <div class="space-y-6">
          <div v-for="category in categories" :key="category.id" class="space-y-3">
            <div class="flex items-center justify-between">
              <h5 class="text-base font-semibold text-gray-900">{{ category.name }}</h5>
              <div class="flex items-center gap-2">
                <button
                  @click="openCategoryModal(category)"
                  class="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteCategory(category)"
                  class="text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="service in category.services"
                :key="service.id"
                class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
              >
                {{ service.serviceType }}
              </span>
              <span v-if="!category.services || category.services.length === 0" class="text-sm text-gray-400 italic">
                No services assigned
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white border border-gray-200 rounded-2xl p-12">
        <div class="flex flex-col items-center justify-center">
          <div class="mb-6">
            <h4 class="text-xl font-bold text-gray-900 mb-2">Categories</h4>
          </div>
          <button
            @click="openCategoryModal()"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Add your first category
          </button>
        </div>
      </div>
    </div>

    <!-- Service Modal Component -->
    <ServiceModal
      v-model="showServiceModal"
      :service="selectedService"
      :categories="categories"
      @save="handleServiceSave"
    />

    <!-- Category Modal Component -->
    <CategoryModal
      v-model="showCategoryModal"
      :category="selectedCategory"
      :services="serviceTypes"
      @save="handleCategorySave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCreateServiceType } from "@/composables/modules/serviceTypes/useCreateServiceType"
import { useDeleteServiceType } from "@/composables/modules/serviceTypes/useDeleteServiceType"
import { useUpdateServiceType } from "@/composables/modules/serviceTypes/useUpdateServiceType"
import { useFetchServiceTypes } from "@/composables/modules/serviceTypes/useFetchServiceTypes"
import { useCreateCategory } from "@/composables/modules/categories/useCreateCategory"
import { useDeleteCategory } from "@/composables/modules/categories/useDeleteCategory"
import { useUpdateCategory } from "@/composables/modules/categories/useUpdateCategory"
import { useFetchCategories } from "@/composables/modules/categories/useFetchCategories"

const { createServiceType, loading: creatingService } = useCreateServiceType()
const { updateServiceType, loading: updatingService } = useUpdateServiceType()
const { deleteServiceType, loading: deletingService } = useDeleteServiceType()
const { fetchServiceTypes, serviceTypes, loading: fetching } = useFetchServiceTypes()

const { createCategory, loading: creatingCategory } = useCreateCategory()
const { updateCategory, loading: updatingCategory } = useUpdateCategory()
const { deleteCategory, loading: deletingCategory } = useDeleteCategory()
const { fetchCategories, categories, loading: fetchingCategories } = useFetchCategories()

// State
const activeSubTab = ref('services')
const showServiceModal = ref(false)
const showCategoryModal = ref(false)
const selectedService = ref(null)
const selectedCategory = ref(null)

// Computed properties
const headerDescription = computed(() => {
  return activeSubTab.value === 'services' 
    ? 'Please enter your name and email to update your details.' 
    : 'Add the type of services you offer'
})

const addButtonText = computed(() => {
  return activeSubTab.value === 'services' ? 'New Service' : 'Add new'
})

const servicesTabClass = computed(() => [
  'pb-3 text-sm font-medium border-b-2 transition-colors',
  activeSubTab.value === 'services'
    ? 'border-gray-900 text-gray-900'
    : 'border-transparent text-gray-500 hover:text-gray-700'
])

const categoriesTabClass = computed(() => [
  'pb-3 text-sm font-medium border-b-2 transition-colors',
  activeSubTab.value === 'categories'
    ? 'border-gray-900 text-gray-900'
    : 'border-transparent text-gray-500 hover:text-gray-700'
])

const handleAddClick = () => {
  if (activeSubTab.value === 'services') {
    openServiceModal()
  } else {
    openCategoryModal()
  }
}

const openServiceModal = (service = null) => {
  selectedService.value = service
  showServiceModal.value = true
}

const openCategoryModal = (category = null) => {
  selectedCategory.value = category
  showCategoryModal.value = true
}

const getServiceCategoryId = (serviceId: string) => {
  const category = categories.value?.find(cat => 
    cat.services?.some(s => s.id === serviceId)
  )
  return category?.id || ''
}

const updateServiceCategory = async (service: any, event: Event) => {
  const categoryId = (event.target as HTMLSelectElement).value
  
  if (!categoryId) return
  
  try {
    // Find the category and update it to include this service
    const category = categories.value?.find(c => c.id === categoryId)
    if (category) {
      const serviceIds = category.services?.map(s => s.id) || []
      if (!serviceIds.includes(service.id)) {
        serviceIds.push(service.id)
        await updateCategory(categoryId, {
          name: category.name,
          description: category.description,
          services: serviceIds
        })
        await fetchCategories()
      }
    }
  } catch (error) {
    console.error('Error updating service category:', error)
  }
}

const handleServiceSave = async (serviceData: any) => {
  try {
    if (selectedService.value) {
      await updateServiceType(selectedService.value.id, serviceData)
    } else {
      await createServiceType(serviceData)
    }
    await fetchServiceTypes()
    showServiceModal.value = false
    selectedService.value = null
  } catch (error) {
    console.error('Error saving service:', error)
  }
}

const confirmDeleteService = (service: any) => {
  if (confirm(`Are you sure you want to delete "${service.serviceType}"?`)) {
    handleServiceDelete(service.id)
  }
}

const handleServiceDelete = async (serviceId: string) => {
  try {
    await deleteServiceType(serviceId)
    await fetchServiceTypes()
  } catch (error) {
    console.error('Error deleting service:', error)
  }
}

const handleCategorySave = async (categoryData: any) => {
  try {
    if (selectedCategory.value) {
      await updateCategory(selectedCategory.value.id, categoryData)
    } else {
      await createCategory(categoryData)
    }
    await fetchCategories()
    showCategoryModal.value = false
    selectedCategory.value = null
  } catch (error) {
    console.error('Error saving category:', error)
  }
}

const confirmDeleteCategory = (category: any) => {
  if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
    handleCategoryDelete(category.id)
  }
}

const handleCategoryDelete = async (categoryId: string) => {
  try {
    await deleteCategory(categoryId)
    await fetchCategories()
  } catch (error) {
    console.error('Error deleting category:', error)
  }
}

onMounted(async () => {
  await Promise.all([
    fetchServiceTypes(),
    fetchCategories()
  ])
})
</script>
