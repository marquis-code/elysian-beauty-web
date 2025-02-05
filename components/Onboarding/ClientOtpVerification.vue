<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div class="w-full max-w-md text-center space-y-4">
        <h1 class="text-[32px] font-semibold text-[#282B2A]">Enter verification code</h1>
        
        <p class="text-[#A3A8A7] font-light">
          Almost there! We've sent a 4-digit code to
          <span class="text-[#045940] font-semibold">{{ email }}</span>. Enter it below to verify
          your account.
        </p>
  
        <div class="flex justify-center gap-4 my-8 pt-6">
          <template v-for="(digit, index) in 4" :key="index">
            <input
              type="text"
              maxlength="1"
              v-model="otpValues[index]"
              @input="handleInput($event, index)"
              @keydown="handleKeydown($event, index)"
              @paste="handlePaste"
              ref="inputs"
              class="w-16 h-16 text-3xl text-center rounded-full border focus:border-[#045940] outline-none focus:ring-0 transition-colors"
              :class="{
                'border-gray-200': !otpValues[index],
                'border-emerald-800': otpValues[index]
              }"
            />
          </template>
        </div>
<div class="pt-6">
      
    <button
          @click="verifyOTP"
          class="w-full py-3.5 bg-[#045940] text-white rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isComplete || loading"
        >
           {{ loading ? 'processing' : 'Verify' }}
        </button>
</div>
  
        <p class="text-[#A3A8A7] pt-6">
          Didn't receive the code? 
          <button 
            @click="resendOTP" 
            class="text-[#045940] font-medium hover:text-emerald-700"
          >
            Resend OTP
          </button>
        </p>
  
        <OnboardingFooter />
      </div>
    </div>
    <CoreFullScreenLoader text="Please wait while we  verify your OTP" :visible="loading" />
  </template>
  
  <script setup lang="ts">
  import { use_auth_verify_user } from '@/composables/auth/useVerifyUser'
  const {  verifyUser, loading, setPayload } = use_auth_verify_user()
  const email = ref('olasehindeolalekanpeter@gmail.com')
  const otpValues = ref(['', '', '', ''])
  const inputs = ref<HTMLInputElement[]>([])
  const isComplete = computed(() => otpValues.value.every(val => val.length === 1))
  const route = useRoute()
  
  const handleInput = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement
    const value = input.value
  
    // Ensure only numbers are entered
    if (!/^\d*$/.test(value)) {
      otpValues.value[index] = ''
      return
    }
  
    // Update the value
    otpValues.value[index] = value
  
    // Move to next input if available
    if (value && index < 3) {
      inputs.value[index + 1].focus()
    }
  }
  
  const handleKeydown = (event: KeyboardEvent, index: number) => {
    // Handle backspace
    if (event.key === 'Backspace' && !otpValues.value[index] && index > 0) {
      otpValues.value[index - 1] = ''
      inputs.value[index - 1].focus()
    }
  }
  
  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault()
    const paste = event.clipboardData?.getData('text')
    if (!paste) return
  
    // Only process if pasted content is a number
    if (!/^\d+$/.test(paste)) return
  
    const digits = paste.slice(0, 4).split('')
    otpValues.value = [...digits, ...Array(4 - digits.length).fill('')]
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = otpValues.value.findIndex(val => !val)
    if (nextEmptyIndex !== -1) {
      inputs.value[nextEmptyIndex].focus()
    } else {
      inputs.value[3].focus()
    }
  }
  
  const verifyOTP = async () => {
    const otp = otpValues.value.join('')
    const payloadObj = {
      email: route.query.email,
      otp
    }
    setPayload(payloadObj)
    await verifyUser()
    console.log('Verifying OTP:', otp)
    // Add your verification logic here
  }
  
  const resendOTP = () => {
    console.log('Resending OTP...')
    // Add your resend logic here
  }
  </script>