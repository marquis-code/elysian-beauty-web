<template>
  <div class="min-h-screen w-full bg-white p-4 md:p-6">
    <div class="max-w-5xl w-full mx-auto">
      <!-- Progress indicator -->
      <!-- <div class="flex items-center mb-8">
        <div class="text-xl font-semibold">{{ currentStep === 1 ? 'Biodata' : 'OTP Verification' }}</div>
        <div class="ml-auto text-gray-500">{{ currentStep }}/2</div>
      </div> -->

      <div class="max-w-2xl mx-auto mb-8 w-full">
        <div class="flex items-center justify-between -mb-2">
          <h1 class="text-2xl font-medium">
            {{ currentStep === 2 ? 'OTP Verification' : 'Biodata' }}
          </h1>
          <span class="text-base text-gray-600">{{ currentStep }}/2</span>
        </div>
        <div class="flex gap-2 h-2">
          <div 
            v-for="step in 2" 
            :key="step"
            :class="[
              'flex-1 rounded-full',
              step <= currentStep ? 'bg-black' : 'bg-gray-200'
            ]"
          ></div>
        </div>
      </div>

      <!-- Step 1: Biodata -->
      <form v-if="currentStep === 1" @submit.prevent="handleBiodataSubmit" class="space-y-4 w-full">
        <h2 class="text-xl text-center font-semibold mb-8">Create an Account</h2>

        <!-- Business Type -->
        <div class="space-y-2">
          <label class="text-sm">Choose Business Type</label>
          <div class="relative">
            <select
              v-model="formData.businessType"
              class="w-full p-3 border rounded-full pl-10 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'border-red-500': v$.businessType.$error }"
            >
              <option value="Freelancer">Freelancer</option>
              <option value="Business">Business</option>
            </select>
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
              👤
            </span>
          </div>
          <span v-if="v$.businessType.$error" class="text-red-500 text-sm">
            {{ v$.businessType.$errors[0].$message }}
          </span>
        </div>

        <!-- Full Name -->
        <div class="space-y-2">
          <label class="text-sm">Full Name</label>
          <div class="relative">
            <input
              v-model="formData.fullName"
              type="text"
              placeholder="First Name Should Come First"
              class="w-full p-3 border rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'border-red-500': v$.fullName.$error }"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.16841 16.959C5.2822 14.4529 7.76737 12.8379 10.5098 12.8379H13.4902C16.2326 12.8379 18.7178 14.4529 19.8316 16.959V16.959C20.8514 19.2535 19.1718 21.8379 16.6609 21.8379H7.33909C4.82819 21.8379 3.14864 19.2535 4.16841 16.959V16.959Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M9 6.83789C9 5.18104 10.3431 3.83789 12 3.83789C13.6569 3.83789 15 5.18104 15 6.83789C15 8.49474 13.6569 9.83789 12 9.83789C10.3431 9.83789 9 8.49474 9 6.83789Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

            </span>
          </div>
          <span v-if="v$.fullName.$error" class="text-red-500 text-sm">
            {{ v$.fullName.$errors[0].$message }}
          </span>
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label class="text-sm">Email</label>
          <div class="relative">
            <input
              v-model="formData.email"
              type="email"
              class="w-full p-3 border rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'border-red-500': v$.email.$error }"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 12.8379C3 10.5082 3 9.34333 3.3806 8.42447C3.88807 7.19933 4.86144 6.22596 6.08658 5.71849C7.00544 5.33789 8.17029 5.33789 10.5 5.33789H13.5C15.8297 5.33789 16.9946 5.33789 17.9134 5.71849C19.1386 6.22596 20.1119 7.19933 20.6194 8.42447C21 9.34333 21 10.5082 21 12.8379V12.8379C21 15.1676 21 16.3325 20.6194 17.2513C20.1119 18.4764 19.1386 19.4498 17.9134 19.9573C16.9946 20.3379 15.8297 20.3379 13.5 20.3379H10.5C8.17029 20.3379 7.00544 20.3379 6.08658 19.9573C4.86144 19.4498 3.88807 18.4764 3.3806 17.2513C3 16.3325 3 15.1676 3 12.8379V12.8379Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M3 8.83789L6.47486 11.5404C8.82448 13.3678 9.99929 14.2815 11.3413 14.46C11.7788 14.5181 12.222 14.5181 12.6595 14.4599C14.0015 14.2814 15.1762 13.3677 17.5258 11.5402L21 8.83789" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

            </span>
          </div>
          <span v-if="v$.email.$error" class="text-red-500 text-sm">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>

        <!-- Phone -->
        <div class="space-y-2">
          <label class="text-sm">Phone (Mobile)</label>
          <div class="relative">
            <input
              v-model="formData.phone"
              type="tel"
              class="w-full p-3 border rounded-full pl-24 focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'border-red-500': v$.phone.$error }"
            />
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
              <img src="@/assets/img/flag.png" alt="Nigeria" class="w-6 h-4 mr-1" />
              <span>+234</span>
            </div>
          </div>
          <span v-if="v$.phone.$error" class="text-red-500 text-sm">
            {{ v$.phone.$errors[0].$message }}
          </span>
        </div>

        <!-- Location -->
        <div class="space-y-2">
          <label class="text-sm">Location</label>
          <div class="relative">
            <input
              v-model="formData.location"
              type="text"
              placeholder="City, State, Country"
              class="w-full p-3 border rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'border-red-500': v$.location.$error }"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0001 3.83789C7.02956 3.83789 2.99997 7.83789 4.00012 12.8379C4.66541 16.1638 7.98533 19.2684 10.1339 20.9746C10.8361 21.5322 11.1873 21.8111 11.7325 21.8847C11.8836 21.9051 12.1166 21.9051 12.2678 21.8847C12.813 21.8111 13.1641 21.5323 13.8664 20.9746C16.015 19.2685 19.335 16.1638 20.0001 12.8379C21 7.83789 16.9707 3.83789 12.0001 3.83789Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M15 11.9879C15 13.6447 13.6569 14.9879 12 14.9879C10.3431 14.9879 9 13.6447 9 11.9879C9 10.331 10.3431 8.98789 12 8.98789C13.6569 8.98789 15 10.331 15 11.9879Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

            </span>
          </div>
          <span v-if="v$.location.$error" class="text-red-500 text-sm">
            {{ v$.location.$errors[0].$message }}
          </span>
        </div>

        <!-- Password -->
        <div class="space-y-2">
          <label class="text-sm">Create Password</label>
          <div class="relative">
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full p-3 border rounded-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'border-red-500': v$.password.$error }"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8.83789V8.83789C17 6.07647 14.7614 3.83789 12 3.83789V3.83789C9.23858 3.83789 7 6.07647 7 8.83789V8.83789M12 13.3379V17.3379M9.5 21.8379H14.5C16.8346 21.8379 18.0019 21.8379 18.8856 21.3656C19.5833 20.9926 20.1548 20.4212 20.5277 19.7235C21 18.8398 21 17.6725 21 15.3379V15.3379C21 13.0033 21 11.8359 20.5277 10.9523C20.1548 10.2546 19.5833 9.68314 18.8856 9.31021C18.0019 8.83789 16.8346 8.83789 14.5 8.83789H9.5C7.16537 8.83789 5.99805 8.83789 5.11441 9.31021C4.4167 9.68314 3.84525 10.2546 3.47231 10.9523C3 11.8359 3 13.0033 3 15.3379V15.3379C3 17.6725 3 18.8398 3.47231 19.7235C3.84525 20.4212 4.4167 20.9926 5.11441 21.3656C5.99805 21.8379 7.16537 21.8379 9.5 21.8379Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </span>
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
            <img v-if="!showPassword" src="@/assets/icons/eye-close.svg" class="h-8 w-8" />
            <img v-if="showPassword" src="@/assets/icons/eye-open.svg" class="h-8 w-8" />
            </button>
          </div>
          <span v-if="v$.password.$error" class="text-red-500 text-sm">
            {{ v$.password.$errors[0].$message }}
          </span>
        </div>

        <!-- Confirm Password -->
        <div class="space-y-2">
          <label class="text-sm">Confirm Password</label>
          <div class="relative">
            <input
              v-model="formData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="w-full p-3 border rounded-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'border-red-500': v$.confirmPassword.$error }"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8.83789V8.83789C17 6.07647 14.7614 3.83789 12 3.83789V3.83789C9.23858 3.83789 7 6.07647 7 8.83789V8.83789M12 13.3379V17.3379M9.5 21.8379H14.5C16.8346 21.8379 18.0019 21.8379 18.8856 21.3656C19.5833 20.9926 20.1548 20.4212 20.5277 19.7235C21 18.8398 21 17.6725 21 15.3379V15.3379C21 13.0033 21 11.8359 20.5277 10.9523C20.1548 10.2546 19.5833 9.68314 18.8856 9.31021C18.0019 8.83789 16.8346 8.83789 14.5 8.83789H9.5C7.16537 8.83789 5.99805 8.83789 5.11441 9.31021C4.4167 9.68314 3.84525 10.2546 3.47231 10.9523C3 11.8359 3 13.0033 3 15.3379V15.3379C3 17.6725 3 18.8398 3.47231 19.7235C3.84525 20.4212 4.4167 20.9926 5.11441 21.3656C5.99805 21.8379 7.16537 21.8379 9.5 21.8379Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </span>
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
            <img v-if="!showConfirmPassword" src="@/assets/icons/eye-close.svg" class="h-8 w-8" />
            <img v-if="showConfirmPassword" src="@/assets/icons/eye-open.svg" class="h-8 w-8" />
            </button>
          </div>
          <span v-if="v$.confirmPassword.$error" class="text-red-500 text-sm">
            {{ v$.confirmPassword.$errors[0].$message }}
          </span>
        </div>

        <button
          type="submit"
          class="w-full bg-gray-900 text-white p-4 rounded-full hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </form>

      <!-- Step 2: OTP Verification -->
      <form v-else @submit.prevent="handleOtpSubmit" class="space-y-4 w-full">
        <button
          type="button"
          @click="currentStep = 1"
          class="flex items-center text-gray-600 mb-8"
        >
          ← Back
        </button>

        <h2 class="text-2xl font-bold">Enter verification code</h2>
        <p class="text-gray-600">
          Almost there! We've sent a 4-digit code to<br />
          <strong>{{ formData.email }}</strong>.<br />
          Enter it below to verify your account.
        </p>

        <div class="flex justify-between gap-4 my-8">
          <template v-for="(digit, index) in 4" :key="index">
            <input
              v-model="otpDigits[index]"
              type="text"
              maxlength="1"
              class="w-16 h-16 text-center text-2xl border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'border-red-500': v$.otpCode.$error }"
              @input="handleOtpInput($event, index)"
              @keydown.backspace="handleOtpBackspace($event, index)"
            />
          </template>
        </div>

        <span v-if="v$.otpCode.$error" class="text-red-500 text-sm block">
          {{ v$.otpCode.$errors[0].$message }}
        </span>

        <button
          type="submit"
          class="w-full bg-gray-900 text-white p-4 rounded-full hover:bg-gray-800 transition-colors"
        >
          Verify
        </button>

        <p class="text-center text-gray-600">
          Didn't receive the code?
          <button
            type="button"
            @click="resendOtp"
            class="text-gray-900 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </form>

      <!-- Footer -->
      <div class="mt-8 flex items-center justify-center gap-6 text-gray-500 text-sm">
        <a href="#" class="hover:text-gray-900">Terms of Service</a>
        <a href="#" class="hover:text-gray-900">Support</a>
        <span>© 2025 Elysian Beauty</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

interface FormData {
  businessType: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  confirmPassword: string;
  otpCode: string;
}

const currentStep = ref(1)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const otpDigits = ref(['', '', '', ''])

const formData = reactive<FormData>({
  businessType: 'Freelancer',
  fullName: '',
  email: '',
  phone: '',
  location: '',
  password: '',
  confirmPassword: '',
  otpCode: ''
})

const rules = {
  businessType: { required },
  fullName: { required, minLength: minLength(3) },
  email: { required, email },
  phone: { required, minLength: minLength(10) },
  location: { required },
  password: { required, minLength: minLength(8) },
  confirmPassword: { required, sameAs: sameAs(formData.password) },
  otpCode: { required, minLength: minLength(4) }
}

const v$ = useVuelidate(rules, formData)

const handleBiodataSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  // Proceed to next step
  currentStep.value = 2
}

const handleOtpInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  const value = input.value

  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    input.value = ''
    return
  }

  // Move to next input
  if (value && index < 3) {
    const nextInput = document.querySelector(`input:nth-child(${index + 2})`) as HTMLInputElement
    if (nextInput) nextInput.focus()
  }

  // Update OTP code
  formData.otpCode = otpDigits.value.join('')
}

const handleOtpBackspace = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    const prevInput = document.querySelector(`input:nth-child(${index})`) as HTMLInputElement
    if (prevInput) {
      prevInput.focus()
      prevInput.value = ''
      otpDigits.value[index - 1] = ''
    }
  }
}

const handleOtpSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  // Handle form submission
  console.log('Form submitted:', formData)
}

const resendOtp = () => {
  // Handle OTP resend
  console.log('Resending OTP to:', formData.email)
}
</script>