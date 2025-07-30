<template>
    <div class="w-full max-w-lg mx-auto bg-white  rounded-xl py-6 m-6 lg:m-0">
    <h2 class="text-3xl font-semibold text-[#045940] mb-4 text-center">Hi, Welcome</h2>
    <p class="text-[#79807E] mb-6 text-center">Please login to your account</p>
    <form @submit.prevent="handleSubmit">
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
              class="w-full p-3 py-4 border rounded-full  text-[#045940] placeholder:text-[#A3A8A7] pl-10 outline-none text-sm py-3 "
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
             
          <img v-if="!showPassword" src="@/assets/icons/eye-close.svg" class="h-6 w-6" />
          <img v-if="showPassword" src="@/assets/icons/eye-open.svg" class="h-6 w-6" />
          </button>
        </div>
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>

      <!-- Login Button -->
      <button
          type="submit"
          class="w-full bg-[#045940] text-white p-3 py-3.5 rounded-full mt-6 hover:bg-[#045940]00"
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
        <label for="remember" class="text-[#79807E]">Remember me</label>
      </div>

      <NuxtLink to="/forgot" class="text-[#79807E]">Forgot Password?</NuxtLink>
    </div>

    <div class="remember-me-container mt-8">
        <!-- Custom Checkbox -->
        <input type="checkbox" id="remember" class="custom-checkbox" />
        <label for="remember" class="text-[#79807E] text-sm">By using this app, you agree to our Terms and Conditions. Please read them carefully.</label>
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
      <button @click="signInWithGoogle" type="button"
          class="mt-2 w-full text-sm text-[#011610] border border-gray-300 flex items-center justify-center p-3 rounded-full hover:bg-gray-100"
      >
        <img src="@/assets/icons/google-icon.svg" alt="Google" class="w-6 h-6 mr-2" />
        Sign in with Google
      </button>
    </div>

    <!-- Sign Up Link -->
    <div class="text-center mt-6">
      <p class="text-[#0D0D12] text-sm">
        <!-- Don’t have an account? <NuxtLink to="/waitlist" class="text-[#045940]">Sign Up</NuxtLink> -->
        Don’t have an account? <NuxtLink to="/signup" class="text-[#045940]">Sign Up</NuxtLink>
      </p>
    </div>

    <OnboardingFooter />
  </div>
  <CoreFullScreenLoader :visible="loading" />
</template>

<script setup lang="ts">
  import  { useLogin } from '@/composables/auth/useLogin'
  import { useAuth } from '@/composables/auth/useAuth'
  const { signInWithGoogle, signInWithApple } = useAuth()
  const { login, loading, credential } = useLogin()
  import { ref } from "vue";

  const form = ref({
    email: "",
    password: "",
  });
  
  const errors = ref({
    email: "",
    password: "",
    form: "",
  });
  
  const showPassword = ref(false);
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  
  const handleSubmit = async () => {
    errors.value = { email: "", password: "", form: "" };
    if (!form.value.email) {
      errors.value.email = "Email is required";
    }
    if (!form.value.password) {
      errors.value.password = "Password is required";
    }
    if (!errors.value.email && !errors.value.password) {
      credential.value = { ...form.value}
      await login()
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  