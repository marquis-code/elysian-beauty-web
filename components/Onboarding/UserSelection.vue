<template>
    <div class="flex min-h-screen items-center max-w-lg w-full justify-center px-4">
        <div class="w-full text-center">
            <h1 class="text-3xl font-semibold text-[#282B2A]">Sign up</h1>
            <p class="mt-2 text-[#79807E] pb-8">Please choose your account category</p>

            <div class="mt-6 space-y-6 w-full">
                <button
                    class="flex w-full items-center justify-between font-medium rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-[#282B2A] shadow-sm hover:bg-gray-50"
                >
                    Client Seeking Services
                    <span class="text-gray-500">
                        <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 12.1807H17M17 12.1807L13 8.18066M17 12.1807L13 16.1807"
                                stroke="#045940"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </span>
                </button>

                <button
                    class="flex w-full items-center justify-between font-medium rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-[#282B2A] shadow-sm hover:bg-gray-50"
                >
                    Beauty Professionals
                    <span class="text-gray-500">
                        <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 12.1807H17M17 12.1807L13 8.18066M17 12.1807L13 16.1807"
                                stroke="#045940"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </span>
                </button>
            </div>

            <p class="mt-4 text-[#0D0D12] pt-4">
                Already have an account?
                <a href="#" class="text-[#045940] hover:underline">Login</a>
            </p>

           <OnboardingFooter />
        </div>
    </div>
</template>
  
  <script setup lang="ts">
  // No script logic needed for this simple UI.
  </script>
  
  <style>
/* Custom styles if needed */
</style>
  