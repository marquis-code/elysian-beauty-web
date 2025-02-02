<template>
    <div class="w-full max-w-2xl mx-auto bg-white rounded-xl py-6 m-6 lg:m-0">
      <h2 class="text-3xl font-semibold text-[#045940] mb-2 text-center">Create password</h2>
      <p class="text-[#79807E] mb-10 text-center">Please enter the email address you used to register</p>
      <form @submit.prevent="handleSubmit">
        <!-- Email -->
        <div class="mt-4 relative">
          <label for="email" class="block text-[#045940] font-light text-sm mb-1">Email</label>
          <input
              v-model="form.email"
              id="email"
              type="email"
              placeholder="Input your email address"
              class="w-full p-3 py-4 border rounded-full  text-[#045940] placeholder:text-[#A3A8A7] pl-10 outline-none text-sm py-3 "
              :class="{ 'border-red-500': errors.email }"
          />
          <svg class="absolute top-9 left-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8V8C17 5.23858 14.7614 3 12 3V3C9.23858 3 7 5.23858 7 8V8M12 12.5V16.5M9.5 21H14.5C16.8346 21 18.0019 21 18.8856 20.5277C19.5833 20.1548 20.1548 19.5833 20.5277 18.8856C21 18.0019 21 16.8346 21 14.5V14.5C21 12.1654 21 10.9981 20.5277 10.1144C20.1548 9.4167 19.5833 8.84525 18.8856 8.47231C18.0019 8 16.8346 8 14.5 8H9.5C7.16537 8 5.99805 8 5.11441 8.47231C4.4167 8.84525 3.84525 9.4167 3.47231 10.1144C3 10.9981 3 12.1654 3 14.5V14.5C3 16.8346 3 18.0019 3.47231 18.8856C3.84525 19.5833 4.4167 20.1548 5.11441 20.5277C5.99805 21 7.16537 21 9.5 21Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
  
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
    
        <!-- Login Button -->
        <button
            type="submit"
            class="w-full bg-[#045940] text-white p-3 py-3.5 rounded-full mt-6 hover:bg-green-800"
        >
          Submit
        </button>
  
        <!-- Errors -->
        <p v-if="errors.form" class="text-red-500 text-center text-sm mt-4">{{ errors.form }}</p>
      </form>
  
  
      <!-- Sign Up Link -->
      <div class="text-center mt-6">
        <p class="text-[#0D0D12] text-sm">
          Don’t have an account? <NuxtLink to="/register" class="text-[#045940]">Sign Up</NuxtLink>
        </p>
      </div>
    </div>
    <CoreFullScreenLoader :visible="loading" />
  </template>
    <script setup lang="ts">
    import  { use_auth_login } from '~/composables/auth/useLogin'
    const { login, loading } = use_auth_login()
    import { ref } from "vue";
  
    definePageMeta({
      layout: "auth"
    })
    
    const form = ref({
      email: "",
    });
    
    const errors = ref({
      email: "",
      form: "",
    });
    
    const showPassword = ref(false);
    
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    
    const handleSubmit = () => {
      errors.value = { email: "", form: "" };
      if (!form.value.email) {
        errors.value.email = "Email is required";
      }
      if (!errors.value.email && !errors.value.password) {
        login()()
        // Simulate API call
        // setTimeout(() => {
        //   if (form.value.email === "test@example.com" && form.value.password === "password") {
        //     alert("Login successful");
        //   } else {
        //     errors.value.form = "Your username or password is incorrect";
        //   }
        // }, 1000);
      }
    };
    </script>
    
    <style scoped>
    /* Add custom styles here */
    </style>
    