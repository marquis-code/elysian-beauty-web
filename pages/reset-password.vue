<template>
    <div class="w-full max-w-lg mx-auto bg-white rounded-xl py-6 m-6 lg:m-0">
      <h2 class="text-3xl font-semibold text-[#045940] mb-2 text-center">Create password</h2>
      <p class="text-[#79807E] mb-6 text-center">Please login to your account</p>
      <form @submit.prevent="handleSubmit">
        <!-- Password -->
        <div class="mt-4">
          <label for="password" class="block text-[#045940] font-light text-sm mb-1">Password</label>
          <div class="relative">
            <input
                v-model="credential.password"
                id="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="********"
                class="w-full p-3 py-4 border rounded-full  text-[#045940] placeholder:text-[#A3A8A7] pl-10 outline-none text-sm py-3 "
            />
            <svg class="absolute top-3 left-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 8V8C17 5.23858 14.7614 3 12 3V3C9.23858 3 7 5.23858 7 8V8M12 12.5V16.5M9.5 21H14.5C16.8346 21 18.0019 21 18.8856 20.5277C19.5833 20.1548 20.1548 19.5833 20.5277 18.8856C21 18.0019 21 16.8346 21 14.5V14.5C21 12.1654 21 10.9981 20.5277 10.1144C20.1548 9.4167 19.5833 8.84525 18.8856 8.47231C18.0019 8 16.8346 8 14.5 8H9.5C7.16537 8 5.99805 8 5.11441 8.47231C4.4167 8.84525 3.84525 9.4167 3.47231 10.1144C3 10.9981 3 12.1654 3 14.5V14.5C3 16.8346 3 18.0019 3.47231 18.8856C3.84525 19.5833 4.4167 20.1548 5.11441 20.5277C5.99805 21 7.16537 21 9.5 21Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-4 text-gray-500"
            >
              <span v-if="!showPassword">
                <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669"
                stroke="#1D2739"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M12.5 11.25L13.75 13.3333"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6665 9.16669L18.3332 10.8334"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.6665 10.8334L3.33317 9.16669"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 11.25L6.25 13.3333"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
              </span>
              <span v-else>
                <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z"
                stroke="#1D2739"
                stroke-width="2"
              />
              <path
                d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z"
                stroke="#1D2739"
                stroke-width="1.5"
              />
            </svg>
              </span>
            </button>
          </div>
          <!-- <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p> -->
        </div>

              <!-- Confirm Password -->
              <!-- <div class="mt-4">
          <label for="password" class="block text-[#045940] font-light text-sm mb-1">New password</label>
          <div class="relative">
            <input
                v-model="form.confirmPassword"
                id="password"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="********"
                class="w-full p-3 py-4 border rounded-full  text-[#045940] placeholder:text-[#A3A8A7] pl-10 outline-none text-sm py-3 "
                :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <svg class="absolute top-3 left-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 8V8C17 5.23858 14.7614 3 12 3V3C9.23858 3 7 5.23858 7 8V8M12 12.5V16.5M9.5 21H14.5C16.8346 21 18.0019 21 18.8856 20.5277C19.5833 20.1548 20.1548 19.5833 20.5277 18.8856C21 18.0019 21 16.8346 21 14.5V14.5C21 12.1654 21 10.9981 20.5277 10.1144C20.1548 9.4167 19.5833 8.84525 18.8856 8.47231C18.0019 8 16.8346 8 14.5 8H9.5C7.16537 8 5.99805 8 5.11441 8.47231C4.4167 8.84525 3.84525 9.4167 3.47231 10.1144C3 10.9981 3 12.1654 3 14.5V14.5C3 16.8346 3 18.0019 3.47231 18.8856C3.84525 19.5833 4.4167 20.1548 5.11441 20.5277C5.99805 21 7.16537 21 9.5 21Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <button
                type="button"
                @click="toggleConfirmPassword"
                class="absolute inset-y-0 right-4 text-gray-500"
            >
              <span v-if="!showConfirmPassword">
                <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669"
                stroke="#1D2739"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M12.5 11.25L13.75 13.3333"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6665 9.16669L18.3332 10.8334"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.6665 10.8334L3.33317 9.16669"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 11.25L6.25 13.3333"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
              </span>
              <span v-else>
                <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z"
                stroke="#1D2739"
                stroke-width="2"
              />
              <path
                d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z"
                stroke="#1D2739"
                stroke-width="1.5"
              />
            </svg>
              </span>
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
        </div> -->
  
        <!-- Login Button -->
<div class="pt-5">
    <button
            type="submit"
            class="w-full bg-[#045940] text-white p-3 py-3.5 rounded-full mt-6 hover:bg-[#045940]00"
        >
        Create paswword
        </button>
</div>
  
        <!-- Errors -->
        <!-- <p v-if="errors.form" class="text-red-500 text-center text-sm mt-4">{{ errors.form }}</p> -->
      </form>
  
      <!-- Additional Links -->
      <div class="flex items-center justify-between mt-6 text-sm">
        <!--        <label class="flex items-center text-[#79807E]">-->
        <!--          <input type="checkbox" class="form-checkbox text-green-600" /> Remember me-->
        <!--        </label>-->
        <div class="remember-me-container">
          <!-- Custom Checkbox -->
          <input type="checkbox" id="remember" class="custom-checkbox" />
          <label for="remember" class="custom-label">Remember me</label>
        </div>
  
        <NuxtLink to="/forgot" class="text-[#79807E]">Forgot Password?</NuxtLink>
      </div>
  
  
      <!-- Sign Up Link -->
      <div class="text-center mt-6">
        <p class="text-[#0D0D12] text-sm">
          Don’t have an account? <NuxtLink to="/signup" class="text-[#045940]">Sign Up</NuxtLink>
        </p>
      </div>
    </div>
    <CoreFullScreenLoader :visible="loading" />
  </template>
    <script setup lang="ts">
    import  { use_auth_reset_password } from '@/composables/auth/useResetPassword'
    const { credential, resetPassword, loading } = use_auth_reset_password()
    import { ref } from "vue";
  
    definePageMeta({
      layout: "auth"
    })
    
    const form = ref({
      password: "",
      // confirmPassword: ""
    });
    
    // const errors = ref({
    //   password: "",
    //   confirmPassword: "",
    //   form: "",
    // });
    
    const showPassword = ref(false);

    const showConfirmPassword = ref(false);
    
    const togglePassword = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };

    const toggleConfirmPassword = () => {
      showPassword.value = !showPassword.value;
    };
    
    const handleSubmit = () => {
      // errors.value = { confirmPassword: "", password: "", form: "" };
      // if (!form.value.password) {
      //   errors.value.password = "Password is required";
      // }

      // if (!form.value.confirmPassword) {
      //   errors.value.confirmPassword = "Confirm Password is required";
      // }
      // if (!errors.value.confirmPassword && !errors.value.password) {
        // login()()
        resetPassword
        // Simulate API call
        // setTimeout(() => {
        //   if (form.value.email === "test@example.com" && form.value.password === "password") {
        //     alert("Login successful");
        //   } else {
        //     errors.value.form = "Your username or password is incorrect";
        //   }
        // }, 1000);
      // }
    };
    </script>
    
    <style scoped>
    /* Add custom styles here */
    </style>
    