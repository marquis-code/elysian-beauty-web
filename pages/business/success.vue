<!-- <template>
      <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="text-3xl font-semibold text-[#282B2A] flex items-center gap-2">
      Success <span class="text-lg">😊🎉</span>
    </div>
    <div class="bg-white shadow-sm rounded-lg p-6 mt-6 w-full text-center">
      <div class="flex justify-center">
        <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg width="100" height="101" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.324219" width="100" height="100" rx="50" fill="#10B981"/>
            <g clip-path="url(#clip0_863_2875)">
            <path d="M46.5 55.8753L62.586 39.7876L65.0623 42.2621L46.5 60.8243L35.363 49.6873L37.8375 47.2128L46.5 55.8753Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_863_2875">
            <rect width="42" height="42" fill="white" transform="translate(29 29.3242)"/>
            </clipPath>
            </defs>
            </svg>

        </div>
      </div>
      <p class="text-[#79807E] mt-4 max-w-sm">
        You're All Set! Start hiring your favourite beauty service providers now, at your convenience!
      </p>
  <div class="pt-6">
    <button @click="router.push('/login')"  class="mt-6 bg-black w-full text-white py-3.5 px-6 rounded-full hover:bg-gray-800">
        Login
      </button>
  </div>
    </div>
    <OnboardingFooter />
  </div>
    </template>
    
    <script setup lang="ts">
    import  { useRegister } from '~/composables/auth/useRegister'
    const { register, loading } = useRegister()
    const router = useRouter()
  
    definePageMeta({
      layout: "auth"
    })

    </script>
   -->

   <template>
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <!-- Success Icon -->
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon class="w-12 h-12 text-green-600" />
        </div>
  
        <!-- Success Message -->
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
        <p class="text-gray-600 mb-8">
          Welcome to our platform! Your business account has been created successfully. 
          You can now start offering your services to customers.
        </p>
  
        <!-- Action Buttons -->
        <div class="space-y-4">
          <NuxtLink
            to="/dashboard"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 inline-block"
          >
            Go to Dashboard
          </NuxtLink>
          
          <NuxtLink
            to="/profile/setup"
            class="w-full border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 inline-block"
          >
            Complete Profile Setup
          </NuxtLink>
        </div>
  
        <!-- Additional Info -->
        <div class="mt-8 p-4 bg-blue-50 rounded-xl">
          <p class="text-sm text-blue-800">
            <strong>Next Steps:</strong> Complete your profile setup to start receiving bookings and showcase your services.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { CheckCircleIcon } from '@heroicons/vue/24/outline'
  
  // Set page meta
  definePageMeta({
    layout: 'auth'
  })
  </script>