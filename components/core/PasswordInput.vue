<template>
    <div class="relative">
      <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <div class="relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          class="w-full rounded-full border-gray-300 shadow-sm pr-10"
          @input="validatePassword"
        />
        <button
          type="button"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
          @click="togglePassword"
        >
          <EyeIcon v-if="showPassword" class="h-5 w-5 text-gray-400" />
          <EyeOffIcon v-else class="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <div v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  const password = ref('')
  const showPassword = ref(false)
  const error = ref('')
  
  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    error.value = regex.test(password.value) ? '' : 'Password must be at least 8 characters long with at least one number, special character, uppercase and lowercase letter'
  }
  </script>