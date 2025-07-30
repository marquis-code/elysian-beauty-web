<template>
  <div class="min-h-screen border- w-[600px]  flex flex-col">
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg" style="background: linear-gradient(135deg, #045940 0%, #059669 100%);">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-3">Sign up</h1>
          <p class="text-gray-600">Please choose your account category</p>
        </div>

        <!-- Account Type Selection -->
        <div class="space-y-4 mb-8">
          <!-- Client Option -->
          <button
            @click="selectAccountType('CLIENT')"
            class="w-full flex items-center justify-between p-6 bg-white border border-gray-200 rounded-2xl hover:border-emerald-300 transition-all duration-200 group hover:shadow-md"
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div class="text-left">
                <span class="text-lg font-semibold text-gray-900">Client Seeking Services</span>
                <p class="text-sm text-gray-500">Book beauty services from professionals</p>
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <!-- Service Provider Option -->
          <button
            @click="selectAccountType('SERVICE_PROVIDER')"
            class="w-full flex items-center justify-between p-6 bg-white border border-gray-200 rounded-2xl hover:border-emerald-300 transition-all duration-200 group hover:shadow-md"
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div class="text-left">
                <span class="text-lg font-semibold text-gray-900">Beauty Professionals</span>
                <p class="text-sm text-gray-500">Offer your services to clients</p>
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Login Link -->
        <div class="text-center">
          <span class="text-gray-600">Already have an account? </span>
          <!-- <NuxtLink to="/login" class="font-semibold hover:underline" style="color: #045940;">Login</NuxtLink> -->
          <NuxtLink to="/waitlist" class="font-semibold hover:underline" style="color: #045940;">Login</NuxtLink>
        </div>
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
const router = useRouter()

const selectAccountType = (type: 'CLIENT' | 'SERVICE_PROVIDER') => {
  router.push('/waitlist')
  // if (type === 'CLIENT') {
  //   router.push('/signup/client')
  // } else {
  //   router.push('/signup/service-provider')
  // }
}

// SEO
useHead({
  title: 'Sign Up - Elysian Beauty',
  meta: [
    { name: 'description', content: 'Join Elysian Beauty as a client or service provider' }
  ]
})

definePageMeta({
  layout: 'auth'
})
</script>
