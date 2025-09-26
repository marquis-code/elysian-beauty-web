<template>
  <div class="min-h-screen">
    <div class="container mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">Category Management</h1>
            <p class="text-gray-600 mt-2">Organize your services into categories</p>
          </div>
          <UiBaseButton @click="openCreateModal">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Category
          </UiBaseButton>
        </div>
      </div>

      {{ categories }}

      <!-- Loading State -->
      <div v-if="fetchingAllCategories || fetching" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#045940]"></div>
      </div>

      <!-- Categories Table -->
      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">All Categories</h2>
        </div>
        
        <div v-if="categories?.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No categories</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
          <div class="mt-6">
            <UiBaseButton @click="openCreateModal">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Category
            </UiBaseButton>
          </div>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs truncate" :title="category.description">
                    {{ category.description }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="service in category?.services?.slice(0, 3)"
                      :key="service.id"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#045940] bg-opacity-10 text-[#045940]"
                    >
                      {{ service.serviceType }}
                    </span>
                    <span
                      v-if="category?.services?.length > 3"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                    >
                      +{{ category?.services?.length - 3 }} more
                    </span>
                  </div>
                  <div v-if="category?.services?.length === 0" class="text-sm text-gray-400">
                    No services assigned
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <UiBaseButton
                      variant="ghost"
                      size="sm"
                      @click="openViewModal(category)"
                      class="text-blue-600 hover:text-blue-800"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </UiBaseButton>
                    <UiBaseButton
                      variant="ghost"
                      size="sm"
                      @click="openEditModal(category)"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </UiBaseButton>
                    <UiBaseButton
                      variant="ghost"
                      size="sm"
                      @click="openDeleteModal(category)"
                      class="text-red-600 hover:text-red-800"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </UiBaseButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Category Create/Edit Modal -->
    <CategoryModal
      v-model="showCategoryModal"
      :category="selectedCategory"
      :service-options="serviceOptions"
      :loading="creating || updating"
      :mode="modalMode"
      @submit="handleCategorySubmit"
    />

    <!-- Category View Modal -->
    <CategoryViewModal
      v-model="showViewModal"
      :category="selectedCategory"
    />

    <!-- Delete Confirmation Modal -->
<ConfirmModal
      v-model="showDeleteModal"
      title="Delete Category"
      :message="`Are you sure you want to delete '${selectedCategory?.name}'? This action cannot be undone.`"
      confirm-text="Delete"
      :loading="deleting"
      @confirm="handleDeleteCategory"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCreateCategory } from "@/composables/modules/categories/useCreateCategory"
import { useUpdateCategory } from "@/composables/modules/categories/useUpdateCategory"
import { useDeleteCategory } from "@/composables/modules/categories/useDeleteCategory"
import { useFetchCategory } from "@/composables/modules/categories/useFetchCategory"
import { useFetchCategories } from "@/composables/modules/categories/useFetchCategories"
import { useFetchServiceTypes } from "@/composables/modules/serviceTypes/useFetchServiceTypes"
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

type ModalMode = 'create' | 'edit' | 'view';

// Composables
const { createCategory, loading: creating } = useCreateCategory();
const { updateCategory, loading: updating } = useUpdateCategory();
const { deleteCategory, loading: deleting } = useDeleteCategory();
const { fetchCategory, loading: fetchingCategory } = useFetchCategory();
const { fetchCategories, categories, loading: fetchingAllCategories } = useFetchCategories();
const { fetchServiceTypes, serviceTypes: services, loading: fetching } = useFetchServiceTypes();

// Reactive state
const showCategoryModal = ref(false);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const selectedCategory = ref<Category | null>(null);
const modalMode = ref<ModalMode>('create');

// Computed
const serviceOptions = computed(() => services.value || []);

// Methods
const openCreateModal = () => {
  selectedCategory.value = null;
  modalMode.value = 'create';
  showCategoryModal.value = true;
};

const openEditModal = (category: Category) => {
  selectedCategory.value = category;
  modalMode.value = 'edit';
  showCategoryModal.value = true;
};

const openViewModal = (category: Category) => {
  selectedCategory.value = category;
  showViewModal.value = true;
};

const openDeleteModal = (category: Category) => {
  selectedCategory.value = category;
  showDeleteModal.value = true;
};

const handleCategorySubmit = async (data: CreateCategoryPayload) => {
  try {
    if (selectedCategory.value && modalMode.value === 'edit') {
      // Update existing category
      await updateCategory(selectedCategory.value.id, data);
    } else {
      // Create new category
      await createCategory(data);
    }
    showCategoryModal.value = false;
    await fetchCategories(); // Refresh the list
  } catch (error) {
    console.error('Error submitting category:', error);
  }
};

const handleDeleteCategory = async () => {
  if (!selectedCategory.value) return;
  
  try {
    await deleteCategory(selectedCategory.value.id);
    showDeleteModal.value = false;
    await fetchCategories(); // Refresh the list
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchCategories(),
    fetchServiceTypes()
  ]);
});

// Meta
useHead({
  title: 'Category Management'
});

definePageMeta({
  layout: 'dashboard'
});
</script>