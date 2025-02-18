<template>
    <div class="relative">
      <label class="block text-sm font-medium text-gray-700">Phone (Mobile)</label>
      <div class="flex">
        <select 
          v-model="selectedCountry"
          class="rounded-l-full border-r-0 border-gray-300 shadow-sm"
        >
          <option 
            v-for="country in countries" 
            :key="country.code"
            :value="country"
          >
            {{ country.flag }} +{{ country.dialCode }}
          </option>
        </select>
        <input
          v-model="phoneNumber"
          type="tel"
          class="flex-1 rounded-r-full border-l-0 border-gray-300 shadow-sm"
          :placeholder="'Phone number'"
          @input="validatePhone"
        />
      </div>
      <span v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  // Add phone validation logic here
  </script>