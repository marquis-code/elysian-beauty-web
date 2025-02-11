<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export interface KYCFormData {
  identificationType: 'government-id' | 'voters-card' | null;
  verificationMethod: 'input' | 'upload' | null;
  idNumber: string;
  document: File | null;
}

const currentStep = ref(1);
const uploadProgress = ref(0);
const isUploading = ref(false);

const schema = yup.object({
  identificationType: yup.string().oneOf(['government-id', 'voters-card']).required('Please select an ID type'),
  verificationMethod: yup.string().oneOf(['input', 'upload']).nullable(),
  idNumber: yup.string().when('verificationMethod', {
    is: 'input',
    then: (schema) => schema.matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, 'Invalid ID format')
  }),
  document: yup.mixed().when('verificationMethod', {
    is: 'upload',
    then: (schema) => schema.required('Please upload a document')
  })
});

const { handleSubmit, resetForm, values, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    identificationType: null,
    verificationMethod: null,
    idNumber: '',
    document: null
  }
});

const onSubmit = handleSubmit(async (values) => {
  if (currentStep.value < 4) {
    currentStep.value++;
    return;
  }
  
  // Handle final submission
  try {
    isUploading.value = true;
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      uploadProgress.value = i;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    // Here you would actually submit the form data to your backend
  } finally {
    isUploading.value = false;
  }
});

const canContinue = computed(() => {
  switch (currentStep.value) {
    case 1:
      return !!values.identificationType;
    case 2:
      return !!values.verificationMethod;
    case 3:
      return values.verificationMethod === 'input' ? !!values.idNumber : true;
    case 4:
      return values.verificationMethod === 'upload' ? !!values.document : true;
    default:
      return false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-sm">
      <!-- Step 1: Select ID Type -->
      <div v-if="currentStep === 1" class="p-6">
        <h1 class="text-2xl font-semibold mb-2">KYC Verification</h1>
        <p class="text-gray-500 mb-6">
          Verify your identity by uploading a valid government-issued ID or
          Voter's Card along with proof of address to secure your account.
        </p>
        
        <div class="space-y-4">
          <button
            v-for="type in ['government-id', 'voters-card']"
            :key="type"
            @click="values.identificationType = type"
            class="w-full p-4 border rounded-lg"
            :class="{
              'border-green-600 bg-green-50': values.identificationType === type,
              'border-gray-200': values.identificationType !== type
            }"
          >
            {{ type === 'government-id' ? 'Government ID' : "Voter's Card" }}
          </button>
        </div>
      </div>

      <!-- Step 2: Select Verification Method -->
      <div v-if="currentStep === 2" class="p-6">
        <h1 class="text-2xl font-semibold mb-6">{{ values.identificationType === 'voters-card' ? "Voter's card" : 'ID' }}</h1>
        <p class="text-gray-500 mb-6">How would you like to verify your identity?</p>
        
        <div class="space-y-4">
          <button
            v-for="method in ['input', 'upload']"
            :key="method"
            @click="values.verificationMethod = method"
            class="w-full p-4 border rounded-lg flex items-center justify-center space-x-2"
            :class="{
              'border-green-600 bg-green-50': values.verificationMethod === method,
              'border-gray-200': values.verificationMethod !== method
            }"
          >
            <span>{{ method === 'input' ? 'Input ID Numbers' : 'Upload' }}</span>
          </button>
        </div>
      </div>

      <!-- Step 3: Input ID Number -->
      <div v-if="currentStep === 3 && values.verificationMethod === 'input'" class="p-6">
        <h1 class="text-2xl font-semibold mb-2">{{ values.identificationType === 'voters-card' ? "Voter's card" : 'ID' }} Verification</h1>
        <p class="text-gray-500 mb-6">Enter your unique ID number</p>
        
        <input
          v-model="values.idNumber"
          type="text"
          placeholder="7777-7777-7777-7777"
          class="w-full p-4 border rounded-lg"
          :class="{ 'border-red-500': errors.idNumber }"
        />
        <p v-if="errors.idNumber" class="mt-2 text-red-500 text-sm">{{ errors.idNumber }}</p>
      </div>

      <!-- Step 4: Upload Document -->
      <div v-if="currentStep === 4 || values.verificationMethod === 'upload'" class="p-6">
        <h1 class="text-2xl font-semibold mb-2">{{ values.identificationType === 'voters-card' ? "Voter's card" : 'ID' }} Verification</h1>
        
        <div
          class="border-2 border-dashed rounded-lg p-8 text-center"
          @drop.prevent="values.document = $event.dataTransfer?.files[0]"
          @dragover.prevent
        >
          <div v-if="!values.document && !isUploading">
            <span class="block mb-2">Click to upload or drag and drop</span>
            <span class="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</span>
            <input
              type="file"
              class="hidden"
              accept="image/*"
              @change="values.document = $event.target.files[0]"
            />
          </div>

          <div v-else-if="isUploading" class="space-y-4">
            <div class="flex items-center justify-between">
              <span>{{ values.document?.name }}</span>
              <span>{{ uploadProgress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-green-600 h-2 rounded-full"
                :style="{ width: `${uploadProgress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t">
        <button
          @click="onSubmit"
          :disabled="!canContinue"
          class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>