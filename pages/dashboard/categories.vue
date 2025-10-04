<template>
  <div class="min-h-screen ">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-extrabold text-gray-900">Category Management</h1>
            <p class="text-gray-600 text-sm mt-2">Organize your services into categories</p>
          </div>
          <button
            @click="openCreateModal"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Category
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="fetchingAllCategories || fetching" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Categories Table -->
      <div v-else class="bg-white rounded-lg shadow-sm border-[0.5px] border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b-[0.5px] border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900">All Categories</h2>
        </div>
        
        <!-- Empty State -->
        <div v-if="categories?.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No categories</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
          <div class="mt-6">
            <button
              @click="openCreateModal"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary "
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Category
            </button>
          </div>
        </div>

        <!-- Categories Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y-[0.5px] divide-gray-100">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services Count
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
              <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-25">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-500 max-w-xs" :title="category.description">
                    {{ truncateText(category.description, 50) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ category.services?.length || 0 }} services
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="service in category.services?.slice(0, 2)"
                      :key="service.id"
                      class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800"
                    >
                      {{ service.serviceType }}
                    </span>
                    <span
                      v-if="category.services?.length > 2"
                      class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600"
                    >
                      +{{ category.services.length - 2 }} more
                    </span>
                  </div>
                  <div v-if="!category.services?.length" class="text-sm text-gray-400">
                    No services assigned
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    @click="viewCategory(category)"
                    class="text-blue-600 hover:text-blue-900 transition-colors"
                    title="View Details"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    @click="openEditModal(category)"
                    class="text-green-600 hover:text-green-900 transition-colors"
                    title="Edit"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="openDeleteModal(category)"
                    class="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- View Category Modal -->
    <Teleport to="body">
      <div
        v-if="showViewModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeViewModal"
      >
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
            @click.stop
          >
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
                  Category Details
                </h3>
                <div v-if="selectedCategory" class="space-y-4">
                  <!-- Category Info -->
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Category Information</h4>
                    <div class="space-y-2 text-sm">
                      <div>
                        <span class="text-gray-600">Name:</span>
                        <span class="ml-2 font-medium">{{ selectedCategory.name }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Description:</span>
                        <span class="ml-2 font-medium">{{ selectedCategory.description }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Total Services:</span>
                        <span class="ml-2 font-medium">{{ selectedCategory.services?.length || 0 }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Services List -->
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="text-sm font-semibold text-gray-700 mb-3">Services in this Category</h4>
                    <div v-if="selectedCategory.services?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div
                        v-for="service in selectedCategory.services"
                        :key="service.id"
                        class="flex items-center p-2 bg-white rounded border"
                      >
                        <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span class="text-sm text-gray-900">{{ service.serviceType }}</span>
                      </div>
                    </div>
                    <div v-else class="text-sm text-gray-500 italic">
                      No services assigned to this category
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="closeViewModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Create/Edit Category Modal -->
    <Teleport to="body">
      <div
        v-if="showCategoryModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeCategoryModal"
      >
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            @click.stop
          >
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
                  {{ isEditMode ? 'Edit Category' : 'Create New Category' }}
                </h3>
                <form @submit.prevent="handleCategorySubmit" class="space-y-4">
                  <!-- Name -->
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">
                      Category Name *
                    </label>
                    <input
                      id="name"
                      v-model="categoryForm.name"
                      type="text"
                     class="custom-input"
                      placeholder="e.g., Hair Services"
                      required
                    />
                  </div>

                  <!-- Description -->
                  <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      v-model="categoryForm.description"
                      rows="3"
                      class="custom-input"
                      placeholder="Describe what services this category includes..."
                      required
                    ></textarea>
                  </div>

                  <!-- Services Selection -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Select Services *
                    </label>
                    <div class="border-[0.5px] border-gray-100 rounded-md p-3 max-h-48 overflow-y-auto">
                      <div v-if="!serviceOptions.length" class="text-sm text-gray-500 italic">
                        Loading services...
                      </div>
                      <div v-else class="space-y-2">
                        <label
                          v-for="service in serviceOptions"
                          :key="service.id"
                          class="flex items-center cursor-pointer hover:bg-gray-25 p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            :value="service.id"
                            v-model="categoryForm.services"
                            class="custom-checkbox"
                          />
                          <span class="ml-2 text-sm text-gray-900">{{ service.serviceType }}</span>
                        </label>
                      </div>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">
                      Selected: {{ categoryForm.services.length }} services
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                :disabled="creating || updating"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                @click="handleCategorySubmit"
              >
                <span v-if="creating || updating" class="mr-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ creating || updating ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Category' : 'Create Category') }}
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                @click="closeCategoryModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeDeleteModal"
      >
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            @click.stop
          >
            <div class="flex justify-center items-center flex-col">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
                </svg>
              </div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Delete Category
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete this category? This action cannot be undone.
                  </p>
                  <div v-if="categoryToDelete" class="mt-3 p-3 bg-gray-50 rounded-md">
                    <p class="text-sm font-medium text-gray-900">{{ categoryToDelete.name }}</p>
                    <p class="text-sm text-gray-600">{{ categoryToDelete.services?.length || 0 }} services will be unassigned</p>
                  </div>
                </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                :disabled="deleting"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                @click="handleDeleteCategory"
              >
                <span v-if="deleting" class="mr-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ deleting ? 'Deleting...' : 'Delete Category' }}
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                @click="closeDeleteModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { useCreateCategory } from "@/composables/modules/categories/useCreateCategory"
import { useDeleteCategory } from "@/composables/modules/categories/useDeleteCategory"
import { useUpdateCategory } from "@/composables/modules/categories/useUpdateCategory"
import { useFetchCategory } from "@/composables/modules/categories/useFetchCategory"
import { useFetchCategories } from "@/composables/modules/categories/useFetchCategories"
import { useFetchServiceTypes } from "@/composables/modules/serviceTypes/useFetchServiceTypes"

// Define types based on the data structure
interface Service {
  id: string
  serviceType: string
}

interface Category {
  id: string
  name: string
  description: string
  services: Service[]
}

interface CreateCategoryPayload {
  name: string
  description: string
  services: string[]
}

// Composables
const { createCategory, loading: creating } = useCreateCategory()
const { updateCategory, loading: updating } = useUpdateCategory()
const { deleteCategory, loading: deleting } = useDeleteCategory()
const { fetchCategory, loading: fetchingCategory } = useFetchCategory()
const { fetchCategories, categories, loading: fetchingAllCategories } = useFetchCategories()
const { fetchServiceTypes, serviceTypes: services, loading: fetching } = useFetchServiceTypes()

// Modal states
const showViewModal = ref(false)
const showCategoryModal = ref(false)
const showDeleteModal = ref(false)

// Selected data
const selectedCategory = ref<Category | null>(null)
const categoryToDelete = ref<Category | null>(null)

// Form state
const categoryForm = reactive({
  name: '',
  description: '',
  services: [] as string[]
})

// Computed
const serviceOptions = computed(() => services.value || [])
const isEditMode = computed(() => !!selectedCategory.value)

// Utility functions
const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Modal handlers
const viewCategory = (category: Category) => {
  selectedCategory.value = category
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedCategory.value = null
}

const openCreateModal = () => {
  selectedCategory.value = null
  categoryForm.name = ''
  categoryForm.description = ''
  categoryForm.services = []
  showCategoryModal.value = true
}

const openEditModal = (category: Category) => {
  selectedCategory.value = category
  categoryForm.name = category.name
  categoryForm.description = category.description
  categoryForm.services = category.services?.map(s => s.id) || []
  showCategoryModal.value = true
}

const closeCategoryModal = () => {
  showCategoryModal.value = false
  selectedCategory.value = null
  categoryForm.name = ''
  categoryForm.description = ''
  categoryForm.services = []
}

const openDeleteModal = (category: Category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  categoryToDelete.value = null
}

// CRUD operations
const handleCategorySubmit = async () => {
  if (!categoryForm.name.trim() || !categoryForm.description.trim() || categoryForm.services.length === 0) {
    alert('Please fill in all required fields and select at least one service.')
    return
  }

  const payload: CreateCategoryPayload = {
    name: categoryForm.name.trim(),
    description: categoryForm.description.trim(),
    services: categoryForm.services
  }

  try {
    if (isEditMode.value && selectedCategory.value) {
      // Update existing category
      await updateCategory(selectedCategory.value.id, payload)
      console.log('Category updated successfully')
    } else {
      // Create new category
      await createCategory(payload)
      console.log('Category created successfully')
    }
    
    // Close modal and refresh list
    closeCategoryModal()
    await fetchCategories()
    
  } catch (error) {
    console.error('Error submitting category:', error)
    alert('Error submitting category. Please try again.')
  }
}

const handleDeleteCategory = async () => {
  if (!categoryToDelete.value) return

  try {
    await deleteCategory(categoryToDelete.value.id)
    console.log('Category deleted successfully')
    
    // Close modal and refresh list
    closeDeleteModal()
    await fetchCategories()
    
  } catch (error) {
    console.error('Error deleting category:', error)
    alert('Error deleting category. Please try again.')
  }
}

// Initialize
onMounted(async () => {
  await Promise.all([
    fetchCategories(),
    fetchServiceTypes()
  ])
})

// Meta
useHead({
  title: 'Category Management'
})

definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

</style>