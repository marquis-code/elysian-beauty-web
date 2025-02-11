<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-white w-full">
    <div class="w-full max-w-5xl space-y-6 w-full">
      <h1 class="text-3xl text-center font-semibold text-gray-900">Create an Account</h1>
      
      <form @submit.prevent="handleSubmit" class="space-y-6 w-full">
        <!-- Full Name Input -->
        <div class="space-y-1 w-full">
          <label class="block text-gray-500 text-sm">
            Full Name <span class="text-xs">(First Name Should Come First)</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 flex items-center">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16841 16.2969C5.2822 13.7908 7.76737 12.1758 10.5098 12.1758H13.4902C16.2326 12.1758 18.7178 13.7908 19.8316 16.2969V16.2969C20.8514 18.5913 19.1718 21.1758 16.6609 21.1758H7.33909C4.82819 21.1758 3.14864 18.5913 4.16841 16.2969V16.2969Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M9 6.17578C9 4.51893 10.3431 3.17578 12 3.17578C13.6569 3.17578 15 4.51893 15 6.17578C15 7.83264 13.6569 9.17578 12 9.17578C10.3431 9.17578 9 7.83264 9 6.17578Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
            <input
              v-model="formData.fullName"
              type="text"
              class="w-full pl-12 pr-4 py-3.5 outline-none focus:border-[#045940] rounded-full border   "
              :class="{ 'border-red-500': errors.fullName }"
            />
          </div>
          <p v-if="errors.fullName" class="text-red-500 text-sm">{{ errors.fullName }}</p>
        </div>

        <!-- Email Input -->
        <div class="space-y-1 w-full">
          <label class="block text-gray-500 text-sm">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 flex items-center">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12.1758C3 9.84607 3 8.68122 3.3806 7.76236C3.88807 6.53722 4.86144 5.56385 6.08658 5.05638C7.00544 4.67578 8.17029 4.67578 10.5 4.67578H13.5C15.8297 4.67578 16.9946 4.67578 17.9134 5.05638C19.1386 5.56385 20.1119 6.53722 20.6194 7.76236C21 8.68122 21 9.84607 21 12.1758V12.1758C21 14.5055 21 15.6703 20.6194 16.5892C20.1119 17.8143 19.1386 18.7877 17.9134 19.2952C16.9946 19.6758 15.8297 19.6758 13.5 19.6758H10.5C8.17029 19.6758 7.00544 19.6758 6.08658 19.2952C4.86144 18.7877 3.88807 17.8143 3.3806 16.5892C3 15.6703 3 14.5055 3 12.1758V12.1758Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M3 8.17578L6.47486 10.8783C8.82448 12.7057 9.99929 13.6194 11.3413 13.7979C11.7788 13.856 12.222 13.856 12.6595 13.7978C14.0015 13.6193 15.1762 12.7056 17.5258 10.8781L21 8.17578" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
            </div>
            <input
              v-model="formData.email"
              type="email"
              class="w-full pl-12 pr-4 py-3.5 outline-none focus:border-[#045940] rounded-full border   "
              :class="{ 'border-red-500': errors.email }"
            />
          </div>
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
        </div>

        <!-- Phone Input -->
        <div class="space-y-1 w-full">
          <label class="block text-gray-500 text-sm">Phone (Mobile)</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 flex items-center space-x-2">
              <img src="@/assets/img/flag.png" class="h-4 w-4" />

              <span class="text-gray-600">+234</span>
            </div>
            <input
              v-model="formData.phone"
              type="tel"
              class="w-full pl-28 pr-12 py-3.5 outline-none focus:border-[#045940] rounded-full border   "
              :class="{ 'border-red-500': errors.phone }"
            />
            <div class="absolute inset-y-0 right-4 flex items-center">
              <Icon name="heroicons:eye" class="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <p v-if="phoneExists" class="text-red-500 text-sm">An account with this phone number already exists</p>
        </div>

        <!-- Location Input -->
        <div class="space-y-1 w-full">
          <label class="block text-gray-500 text-sm">Location</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 flex items-center">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0001 3.17578C7.02956 3.17578 2.99997 7.17578 4.00012 12.1758C4.66541 15.5017 7.98533 18.6063 10.1339 20.3125C10.8361 20.8701 11.1873 21.149 11.7325 21.2226C11.8836 21.243 12.1166 21.243 12.2678 21.2226C12.813 21.149 13.1641 20.8702 13.8664 20.3125C16.015 18.6064 19.335 15.5017 20.0001 12.1758C21 7.17578 16.9707 3.17578 12.0001 3.17578Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M15 11.3258C15 12.9826 13.6569 14.3258 12 14.3258C10.3431 14.3258 9 12.9826 9 11.3258C9 9.66893 10.3431 8.32578 12 8.32578C13.6569 8.32578 15 9.66893 15 11.3258Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
            <input
              v-model="formData.location"
              type="text"
              placeholder="Enter Address"
              class="w-full pl-12 pr-4 py-3.5 outline-none focus:border-[#045940] rounded-full border   "
            />
          </div>
        </div>

        <!-- Password Input -->
        <div class="space-y-1 w-full">
          <label class="block text-gray-500 text-sm">Create Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 flex items-center">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8.17578V8.17578C17 5.41436 14.7614 3.17578 12 3.17578V3.17578C9.23858 3.17578 7 5.41436 7 8.17578V8.17578M12 12.6758V16.6758M9.5 21.1758H14.5C16.8346 21.1758 18.0019 21.1758 18.8856 20.7035C19.5833 20.3305 20.1548 19.7591 20.5277 19.0614C21 18.1777 21 17.0104 21 14.6758V14.6758C21 12.3411 21 11.1738 20.5277 10.2902C20.1548 9.59248 19.5833 9.02103 18.8856 8.6481C18.0019 8.17578 16.8346 8.17578 14.5 8.17578H9.5C7.16537 8.17578 5.99805 8.17578 5.11441 8.6481C4.4167 9.02103 3.84525 9.59248 3.47231 10.2902C3 11.1738 3 12.3411 3 14.6758V14.6758C3 17.0104 3 18.1777 3.47231 19.0614C3.84525 19.7591 4.4167 20.3305 5.11441 20.7035C5.99805 21.1758 7.16537 21.1758 9.5 21.1758Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full pl-12 pr-12 py-3.5 outline-none focus:border-[#045940] rounded-full border   "
              :class="{ 'border-red-500': errors.password }"
            />
            <button
              @click="showPassword = !showPassword"
              type="button"
              class="absolute inset-y-0 right-4 flex items-center"
            >
              <!-- <Icon 
                :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                class="h-5 w-5 text-gray-400" 
              /> -->
              <img v-if="!showPassword" src="@/assets/icons/eye-close.svg" class="h-8 w-8" />
              <img v-if="showPassword" src="@/assets/icons/eye-open.svg" class="h-8 w-8" />
              <!-- <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> -->
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password Input -->
        <div class="space-y-1 w-full">
          <label class="block text-gray-500 text-sm">Confirm Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 flex items-center">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8.17578V8.17578C17 5.41436 14.7614 3.17578 12 3.17578V3.17578C9.23858 3.17578 7 5.41436 7 8.17578V8.17578M12 12.6758V16.6758M9.5 21.1758H14.5C16.8346 21.1758 18.0019 21.1758 18.8856 20.7035C19.5833 20.3305 20.1548 19.7591 20.5277 19.0614C21 18.1777 21 17.0104 21 14.6758V14.6758C21 12.3411 21 11.1738 20.5277 10.2902C20.1548 9.59248 19.5833 9.02103 18.8856 8.6481C18.0019 8.17578 16.8346 8.17578 14.5 8.17578H9.5C7.16537 8.17578 5.99805 8.17578 5.11441 8.6481C4.4167 9.02103 3.84525 9.59248 3.47231 10.2902C3 11.1738 3 12.3411 3 14.6758V14.6758C3 17.0104 3 18.1777 3.47231 19.0614C3.84525 19.7591 4.4167 20.3305 5.11441 20.7035C5.99805 21.1758 7.16537 21.1758 9.5 21.1758Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

            </div>
            <input
              v-model="formData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="w-full pl-12 pr-12 py-3.5 outline-none focus:border-[#045940] rounded-full border   "
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <button
              @click="showConfirmPassword = !showConfirmPassword"
              type="button"
              class="absolute inset-y-0 right-4 flex items-center"
            >
            <img v-if="!showConfirmPassword" src="@/assets/icons/eye-close.svg" class="h-8 w-8" />
            <img v-if="showConfirmPassword" src="@/assets/icons/eye-open.svg" class="h-8 w-8" />
              <!-- <Icon 
                :name="showConfirmPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                class="h-5 w-5 text-gray-400" 
              /> -->
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</p>
        </div>

        <!-- Submit Button -->
   <div class="pt-3">
    <button
         :disabled="loading"
          type="submit"
          class="w-full py-4 bg-[#045940] text-white rounded-full hover:bg-emerald-800 transition-colors"
        >
          {{  loading ? 'processing..' : 'Continue' }}
        </button>
   </div>

        <!-- Login Link -->
        <div class="text-center space-x-1">
          <span class="text-gray-600">Already have an account?</span>
          <NuxtLink to="/login" class="text-gray-900 font-medium">Login</NuxtLink>
        </div>
      </form>
    </div>
  </div>
  <CoreFullScreenLoader :visible="loading" />
</template>

<script setup lang="ts">
import { useRegister } from '@/composables/auth/useRegister'
const { setCredentials, register, loading, isFormDisabled } = useRegister()
import { ref, reactive } from 'vue'

interface FormData {
  fullName: string
  email: string
  phone: string
  location: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
}

const formData = reactive<FormData>({
  fullName: '',
  email: '',
  phone: '',
  location: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive<FormErrors>({})
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const phoneExists = ref(false)

const validateForm = (): boolean => {
  let isValid = true
  errors.fullName = ''
  errors.email = ''
  errors.phone = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!formData.fullName) {
    errors.fullName = 'Full name is required'
    isValid = false
  }

  if (!formData.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format'
    isValid = false
  }

  if (!formData.phone) {
    errors.phone = 'Phone number is required'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Password is required'
    isValid = false
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (validateForm()) {
    // Assuming formData.fullName is something like "John Doe"
    const name = formData.fullName.split(' ');

    // Assuming the full name has at least two parts: first and last name
    const payload = {
      firstName: name[0], 
      lastName: name[1] || "", 
      email: formData.email,
      password: formData.password,
      location: formData.location,
      phoneNum: formData.phone,
      provider: "EMAIL",
      role: "CLIENT",
    };

    // Set the credentials using the setCredentials function
    setCredentials(payload);

    // Register the user
    await register();

    // Handle form submission (e.g., logging the formData)
    console.log('Form submitted:', formData);
  } else {
    // Optionally handle validation failure (e.g., show an error message)
    console.log('Form validation failed');
  }
};

</script>