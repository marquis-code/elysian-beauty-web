<template>
  <div class="min-h-screen w-[600px] h-96 overflow-y-auto flex flex-col">
    <!-- Header -->
    <header class="p-4 md:p-6 bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20">
      <div class="max-w-md mx-auto flex items-center justify-between">
        <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-gray-900">Verify Email</h1>
        <div class="w-9"></div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg animate-pulse" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-4">Enter verification code</h2>
          <p class="text-gray-600 text-sm mb-2">Almost there! We've sent a 4-digit code to</p>
          <p class="font-semibold text-sm mb-2" style="color: #045940;">{{ email }}</p>
          <p class="text-sm text-gray-500">Enter it below to verify your account</p>
        </div>

        <!-- OTP Input -->
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="flex justify-center space-x-4">
            <input
              v-for="(digit, index) in 4"
              :key="index"
              :ref="el => otpInputs[index] = el"
              v-model="otpCode[index]"
              type="text"
              maxlength="1"
              class="w-16 h-16 text-center text-2xl font-bold bg-white border-[0.5px] border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
              :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': errors.otpCode }"
              @input="handleOtpInput($event, index)"
              @keydown.delete="handleOtpDelete($event, index)"
              @paste="handleOtpPaste($event, index)"
            />
          </div>
          
          <p v-if="errors.otpCode" class="text-red-500 text-sm text-center">{{ errors.otpCode }}</p>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || otpCode.join('').length !== 4"
            class="w-full py-3 text-white font-semibold rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            style="background: linear-gradient(135deg, #045940 0%, #059669 100%);"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
            <span v-else>Verify</span>
          </button>

          <!-- Resend OTP -->
          <div class="text-center bg-gray-100 rounded-2xl p-4">
            <p class="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
            <button
              type="button"
              @click="resendOtp"
              :disabled="resendCooldown > 0 || resending"
              class="text-sm font-semibold hover:underline disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              :style="resendCooldown === 0 && !resending ? 'color: #045940;' : ''"
            >
              <span v-if="resending">Sending...</span>
              <span v-else-if="resendCooldown > 0">Resend OTP in {{ resendCooldown }}s</span>
              <span v-else>Resend OTP</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <footer class="py-6 px-4">
      <div class="max-w-md mx-auto flex items-center justify-center space-x-6 text-sm text-gray-500">
        <a href="#" class="flex items-center space-x-1 hover:text-gray-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span>Terms of Service</span>
        </a>
        <a href="#" class="flex items-center space-x-1 hover:text-gray-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Support</span>
        </a>
        <span>© 2025 Elysian Beauty</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { use_auth_verify_user } from '@/composables/auth/useVerifyUser'
import { use_auth_resend_verify_email } from '@/composables/auth/useResendEmail'
const { verifyUser, loading, setPayload } = use_auth_verify_user()
const { resendVerifyEmail, loading: resending } = use_auth_resend_verify_email()
const router = useRouter()
const route = useRoute()

// State
const email = ref(route.query.email)
const otpCode = ref(['', '', '', ''])
const otpInputs = ref<HTMLInputElement[]>([])
const resendCooldown = ref(0)

const errors = reactive({
  otpCode: ''
})

// OTP Input Handlers
const handleOtpInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '') // Only allow digits
  
  otpCode.value[index] = value
  
  if (value && index < 3) {
    const nextInput = otpInputs.value[index + 1]
    if (nextInput) nextInput.focus()
  }
  
  // Clear error when user starts typing
  if (errors.otpCode) {
    errors.otpCode = ''
  }
}

const handleOtpDelete = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace' && !otpCode.value[index] && index > 0) {
    const prevInput = otpInputs.value[index - 1]
    if (prevInput) prevInput.focus()
  }
}

const handleOtpPaste = (event: ClipboardEvent, index: number) => {
  event.preventDefault()
  const paste = event.clipboardData?.getData('text') || ''
  const digits = paste.replace(/\D/g, '').slice(0, 4)
  
  for (let i = 0; i < digits.length && (index + i) < 4; i++) {
    otpCode.value[index + i] = digits[i]
  }
  
  // Focus the last filled input or the next empty one
  const lastIndex = Math.min(index + digits.length - 1, 3)
  const nextEmptyIndex = otpCode.value.findIndex((code, i) => i > lastIndex && !code)
  const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : lastIndex
  
  if (otpInputs.value[focusIndex]) {
    otpInputs.value[focusIndex].focus()
  }
}

// Form submission
const handleSubmit = async () => {
  const otpString = otpCode.value.join('')
  
  if (otpString.length !== 4) {
    errors.otpCode = 'Please enter the complete 4-digit code'
    return
  }
  
  if (!/^\d{4}$/.test(otpString)) {
    errors.otpCode = 'OTP must contain only numbers'
    return
  }
  
  try {
    const payload = {
      email: email.value,
      otp: otpString
    }
    
    setPayload(payload)
    const result = await verifyUser()
    
    if (result.type !== 'ERROR') {
      // Clear stored email
      localStorage.removeItem('signup_email')
      // Redirect to success page or dashboard
      // router.push('/dashboard')
    } else {
      errors.otpCode = 'Invalid verification code. Please try again.'
    }
  } catch (error) {
    console.error('Error during OTP verification:', error)
    errors.otpCode = 'Verification failed. Please try again.'
  }
}

// Resend OTP
const resendOtp = async () => {
  if (resendCooldown.value > 0) return
  
  try {
    await resendVerifyEmail()
    resendCooldown.value = 60
    
    const countdown = setInterval(() => {
      resendCooldown.value--
      if (resendCooldown.value <= 0) {
        clearInterval(countdown)
      }
    }, 1000)
  } catch (error) {
    console.error('Error resending OTP:', error)
  }
}

// // Lifecycle
// onMounted(() => {
//   // Get email from localStorage
//   const storedEmail = localStorage.getItem('client_signup_form')
//   if (storedEmail) {
//     email.value = storedEmail
//   } else {
//     // Redirect back to signup if no email found
//     router.push('/signup')
//     return
//   }
  
//   // Focus first input
//   nextTick(() => {
//     if (otpInputs.value[0]) {
//       otpInputs.value[0].focus()
//     }
//   })
// })

// Lifecycle
onMounted(() => {
  // Get email from localStorage
  const storedData = localStorage.getItem("client_signup_form");

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);

      if (parsedData?.form?.email) {
        email.value = parsedData.form.email;
      } else {
        // Redirect back to signup if email is missing
        window.location.href = "/signup";
        return;
      }
    } catch (e) {
      console.error("Invalid localStorage data:", e);
      window.location.href = "/signup";
      return;
    }
  }
  
  // else {
  //   // Redirect back to signup if no data found
  //   window.location.href = "/signup";
  //   return;
  // }

  // Focus first input
  nextTick(() => {
    if (otpInputs.value[0]) {
      otpInputs.value[0].focus();
    }
  });
});


// SEO
useHead({
  title: 'Verify Email - Elysian Beauty',
  meta: [
    { name: 'description', content: 'Verify your email address to complete registration' }
  ]
})

definePageMeta({
  layout:  'auth'
})
</script>
