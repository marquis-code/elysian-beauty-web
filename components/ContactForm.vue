<template>
  <div
      class="relative"
  >
    <!-- Modal Header -->
    <h3 class="text-center text-2xl text-[#045940] font-semibold mb-6">
      How can we help?
    </h3>
    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Full Name -->
      <div class="relative">
        <input
            type="text"
            placeholder="Fullname"
            v-model="form.fullname"
            class="w-full px-4 py-4 border-[0.5px] border-gray-100 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <span
            class="absolute top-3 left-3 text-gray-500"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.16841 16.1211C5.2822 13.615 7.76737 12 10.5098 12H13.4902C16.2326 12 18.7178 13.615 19.8316 16.1211V16.1211C20.8514 18.4156 19.1718 21 16.6609 21H7.33909C4.82819 21 3.14864 18.4156 4.16841 16.1211V16.1211Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

        </span>
      </div>
      <!-- Email -->
      <div class="relative">
        <input
            type="email"
            placeholder="Email"
            v-model="form.email"
            class="w-full px-4 py-4 border-[0.5px] border-gray-100 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <span
            class="absolute top-3 left-3 text-gray-500"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 12C3 9.67029 3 8.50544 3.3806 7.58658C3.88807 6.36144 4.86144 5.38807 6.08658 4.8806C7.00544 4.5 8.17029 4.5 10.5 4.5H13.5C15.8297 4.5 16.9946 4.5 17.9134 4.8806C19.1386 5.38807 20.1119 6.36144 20.6194 7.58658C21 8.50544 21 9.67029 21 12V12C21 14.3297 21 15.4946 20.6194 16.4134C20.1119 17.6386 19.1386 18.6119 17.9134 19.1194C16.9946 19.5 15.8297 19.5 13.5 19.5H10.5C8.17029 19.5 7.00544 19.5 6.08658 19.1194C4.86144 18.6119 3.88807 17.6386 3.3806 16.4134C3 15.4946 3 14.3297 3 12V12Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M3 8L6.47486 10.7025C8.82448 12.5299 9.99929 13.4436 11.3413 13.6221C11.7788 13.6802 12.222 13.6802 12.6595 13.622C14.0015 13.4436 15.1762 12.5298 17.5258 10.7023L21 8" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

        </span>
      </div>
      <!-- Message -->
      <div class="relative">
            <textarea
                placeholder="Message"
                v-model="form.message"
                rows="4"
                class="w-full resize-none px-4 py-3 border-[0.5px] border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            ></textarea>
      </div>
      <!-- Submit Button -->
<div class="pt-10">
  <button
      type="submit"
      class="w-full bg-[#045940] text-white py-3.5 text-sm rounded-lg hover:bg-[#045940] focus:outline-none"
  >
    Send a Message
  </button>
</div>
    </form>
  </div>
  </template>

<script setup lang="ts">
import { ref } from "vue";

// Form data
const form = ref({
  fullname: "",
  email: "",
  message: "",
});

// Submit form handler
const submitForm = () => {
  console.log("Form submitted", form.value);
};
</script>
