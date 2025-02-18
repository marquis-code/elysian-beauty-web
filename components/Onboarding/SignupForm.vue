<template>
  <div class="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-semibold">{{ getCurrentTitle }}</h2>
        <div class="flex gap-2">
          <div 
            v-for="i in maxSteps" 
            :key="i"
            class="w-24 h-1 rounded"
            :class="i <= step ? 'bg-black' : 'bg-gray-200'"
          ></div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Step 1 -->
        <template v-if="step === 1">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Choose Business Type</label>
              <select 
                v-model="formData.businessType"
                class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
              >
                <option value="Freelancer">Freelancer</option>
                <option value="Registered Business">Registered Business</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                v-model="formData.fullName"
                type="text"
                class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                v-model="formData.email"
                type="email"
                class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
              />
            </div>

            <CorePhoneInput 
              v-model="formData.phone"
              class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
            />

            <CoreLocationInput 
              v-model="formData.location"
              class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
            />

            <CorePasswordInput 
              v-model="formData.password"
              class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
            />

            <CorePasswordInput 
              v-model="formData.confirmPassword"
              placeholder="Confirm Password"
              class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
            />
          </div>
        </template>

        <!-- Step 2 (OTP Verification) -->
        <template v-if="step === 2">
          <OtpVerification 
            :email="formData.email"
            @verified="handleOtpVerified"
          />
        </template>

        <!-- Step 3 (Business Details - Only for Registered Business) -->
        <template v-if="step === 3 && formData.businessType === 'Registered Business'">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Business Name</label>
              <input 
                v-model="formData.businessName"
                type="text"
                class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
              />
            </div>

            <ServiceInput 
              v-model="formData.services"
              @add="addService"
              @remove="removeService"
            />

            <div>
              <label class="block text-sm font-medium text-gray-700">Business Location Type</label>
              <select 
                v-model="formData.businessLocationType"
                class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
              >
                <option value="Physical">Physical</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Business Address</label>
              <input 
                v-model="formData.businessAddress"
                type="text"
                class="mt-1 block w-full rounded-full border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </template>

        <div class="flex justify-between">
          <button 
            v-if="step > 1"
            type="button"
            @click="prevStep"
            class="rounded-full bg-gray-200 px-6 py-3"
          >
            Back
          </button>
          <button 
            type="submit"
            class="rounded-full bg-black text-white px-6 py-3 w-full"
            :class="{ 'ml-auto': step > 1 }"
          >
            {{ step === maxSteps ? 'Complete' : 'Continue' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSignup } from '@/composables/modules/useSignup'
const { 
  step, 
  maxSteps, 
  formData, 
  addService, 
  removeService, 
  nextStep, 
  prevStep 
} = useSignup()

const getCurrentTitle = computed(() => {
  if (step.value === 2) return 'OTP Verification'
  return 'Biodata'
})

const handleSubmit = async () => {
  // Add form validation here
  nextStep()
}

const handleOtpVerified = () => {
  if (formData.value.businessType === 'Freelancer') {
    // Complete registration for freelancer
  } else {
    nextStep()
  }
}
</script>
