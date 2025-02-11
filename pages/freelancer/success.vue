<template>
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
    <button  class="mt-6 bg-black w-full text-white py-3.5 px-6 rounded-full hover:bg-gray-800">
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
  
    definePageMeta({
      layout: "auth"
    })

    </script>
  
