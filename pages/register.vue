<template>
    <div class="w-full max-w-2xl mx-auto bg-white rounded-xl py-6">
      <h2 class="text-3xl font-semibold text-[#045940] mb-4 text-center">Create Your Account</h2>
      <p class="text-[#79807E] mb-6 text-center">Please input your information</p>
      <form @submit.prevent="handleSubmit">
        <div class="grid lg:grid-cols-2 gap-4">
          <!-- First Name -->
          <div class="relative">
            <label for="firstName" class="block text-[#045940] font-light text-sm mb-1">First Name</label>
            <input
              v-model="form.firstName"
              id="firstName"
              type="text"
              placeholder="Input your first name"
              class="w-full p-3 py-4 border text-[#045940] rounded-full pl-10 placeholder:text-[#A3A8A7] outline-none text-sm py-3 "
              :class="{ 'border-red-500': errors.firstName }"
            />
            <svg class="absolute top-9 left-3" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2513 18C20.6764 16.4077 21.543 14.3051 21.543 12C21.543 7.02944 17.5135 3 12.543 3C7.57241 3 3.54297 7.02944 3.54297 12C3.54297 14.3051 4.40953 16.4077 5.83465 18M19.2513 18C17.6033 19.8412 15.2085 21 12.543 21C9.87747 21 7.48261 19.8412 5.83465 18M19.2513 18L18.7856 17.3122C17.3831 15.2408 15.0445 14 12.543 14V14C10.0415 14 7.70284 15.2408 6.30035 17.3122L5.83465 18M12.543 11.5C11.1623 11.5 10.043 10.3807 10.043 9C10.043 7.61929 11.1623 6.5 12.543 6.5C13.9237 6.5 15.043 7.61929 15.043 9C15.043 10.3807 13.9237 11.5 12.543 11.5Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
            <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
          </div>

          <!-- Last Name -->
          <div class="relative">
            <label for="lastName" class="block text-[#045940] font-light text-sm mb-1">Last Name</label>
            <input
              v-model="form.lastName"
              id="lastName"
              type="text"
              placeholder="Input your last name"
              class="w-full p-3 py-4 border text-[#045940] rounded-full pl-10 placeholder:text-[#A3A8A7] outline-none text-sm py-3 "
              :class="{ 'border-red-500': errors.lastName }"
            />
            <svg class="absolute top-9 left-3" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2513 18C20.6764 16.4077 21.543 14.3051 21.543 12C21.543 7.02944 17.5135 3 12.543 3C7.57241 3 3.54297 7.02944 3.54297 12C3.54297 14.3051 4.40953 16.4077 5.83465 18M19.2513 18C17.6033 19.8412 15.2085 21 12.543 21C9.87747 21 7.48261 19.8412 5.83465 18M19.2513 18L18.7856 17.3122C17.3831 15.2408 15.0445 14 12.543 14V14C10.0415 14 7.70284 15.2408 6.30035 17.3122L5.83465 18M12.543 11.5C11.1623 11.5 10.043 10.3807 10.043 9C10.043 7.61929 11.1623 6.5 12.543 6.5C13.9237 6.5 15.043 7.61929 15.043 9C15.043 10.3807 13.9237 11.5 12.543 11.5Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
            <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
          </div>
        </div>

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

        <!-- Password -->
        <div class="mt-4">
          <label for="password" class="block text-[#045940] font-light text-sm mb-1">Password</label>
          <div class="relative">
            <input
              v-model="form.password"
              id="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="********"
              class="w-full py-4 p-3 border rounded-full  text-[#045940] placeholder:text-[#A3A8A7] pl-10 outline-none text-sm "
              :class="{ 'border-red-500': errors.password }"
            />
            <svg class="absolute top-3 left-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 8V8C17 5.23858 14.7614 3 12 3V3C9.23858 3 7 5.23858 7 8V8M12 12.5V16.5M9.5 21H14.5C16.8346 21 18.0019 21 18.8856 20.5277C19.5833 20.1548 20.1548 19.5833 20.5277 18.8856C21 18.0019 21 16.8346 21 14.5V14.5C21 12.1654 21 10.9981 20.5277 10.1144C20.1548 9.4167 19.5833 8.84525 18.8856 8.47231C18.0019 8 16.8346 8 14.5 8H9.5C7.16537 8 5.99805 8 5.11441 8.47231C4.4167 8.84525 3.84525 9.4167 3.47231 10.1144C3 10.9981 3 12.1654 3 14.5V14.5C3 16.8346 3 18.0019 3.47231 18.8856C3.84525 19.5833 4.4167 20.1548 5.11441 20.5277C5.99805 21 7.16537 21 9.5 21Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <button
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 right-4 text-gray-500"
            >
              <!-- <span v-if="!showPassword">👁</span>
              <span v-else>🙈</span> -->
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
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full bg-[#045940] text-white p-3 py-3.5 rounded-full mt-6 hover:bg-green-800"
        >
          Login
        </button>

        <!-- Errors -->
        <p v-if="errors.form" class="text-red-500 text-center text-sm mt-4">{{ errors.form }}</p>
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

        <a href="#" class="text-[#79807E]">Forgot Password?</a>
      </div>

      <!-- Google Login -->
      <div class="text-center mt-6">
        <div class="flex items-center my-6">
          <!-- Left Line -->
          <div class="flex-grow border-t border-[#C1C7D0]"></div>

          <!-- Center Text -->
          <span class="mx-4 text-[#79807E] font-light text-sm">Or Sign in with</span>

          <!-- Right Line -->
          <div class="flex-grow border-t border-[#C1C7D0]"></div>
        </div>
<!--        <p class="text-[#045940]">Or Sign in with</p>-->
        <button
          class="mt-2 w-full text-sm text-[#011610] border border-gray-300 flex items-center justify-center p-3 rounded-full hover:bg-gray-100"
        >
          <img src="@/assets/icons/google-icon.svg" alt="Google" class="w-6 h-6 mr-2" />
          Sign in with Google
        </button>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center mt-6">
        <p class="text-[#0D0D12] text-sm">
          Don’t have an account? <NuxtLink to="/login" class="text-[#045940]">Login</NuxtLink>
        </p>
      </div>
    </div>
  <CoreFullScreenLoader :visible="loading" />
  </template>
  
  <script setup lang="ts">
  import  { use_auth_register } from '@/composables/auth/register'
  const { register, loading } = use_auth_register()
  import { ref } from "vue";

  definePageMeta({
    layout: "auth"
  })

  const form = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const errors = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    form: "",
  });

  const showPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  const handleSubmit = () => {
    errors.value = { firstName: "", lastName: "", email: "", password: "", form: "" };

    // Validation
    if (!form.value.firstName) errors.value.firstName = "First name is required";
    if (!form.value.lastName) errors.value.lastName = "Last name is required";
    if (!form.value.email) errors.value.email = "Email is required";
    if (!form.value.password) errors.value.password = "Password is required";

    if (
      !errors.value.firstName &&
      !errors.value.lastName &&
      !errors.value.email &&
      !errors.value.password
    ) {
      register()
      // Simulate API call
      // setTimeout(() => {
      //   if (form.value.email === "test@example.com") {
      //     alert("Account successfully created!");
      //   } else {
      //     errors.value.form = "An error occurred. Please try again.";
      //   }
      // }, 1000);
    }
  };
  </script>


<style>
/* Container styles for alignment */
.remember-me-container {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between checkbox and label */
}

/* Hide default checkbox appearance */
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none; /* Safari */
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db; /* Light gray border */
  border-radius: 4px; /* Slightly rounded corners */
  background-color: white; /* Default white background */
  cursor: pointer; /* Pointer on hover */
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* Checkbox checked state */
.custom-checkbox:checked {
  background-color: #045940; /* Dark green background */
  border-color: #045940; /* Dark green border */
}

/* Add a checkmark when checked */
.custom-checkbox:checked::before {
  content: '✔';
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
}

/* Focus outline for accessibility */
.custom-checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(34, 84, 61, 0.3); /* Green shadow on focus */
}

/* Label styles */
.custom-label {
  font-size: 14px;
  color: #4b5563; /* Neutral gray text */
  cursor: pointer; /* Pointer for label click */
}
</style>