<!-- components/Navbar.vue -->
<template>
    <main>
      <header class="flex items-center justify-between px-6 max-w-7xl mx-auto py-6">
        <div class="flex items-center">
          <NuxtLink to="/"><img src="@/assets/img/blue-logo.png" alt="Elysian Logo" class="h-8" /></NuxtLink>
        </div>
        <nav class="hidden md:flex gap-6 text-gray-700">
          <NuxtLink to="/about" class="hover:text-emerald-900 text-sm text-[#101011]">About</NuxtLink>
          <NuxtLink to="/services" class="hover:text-emerald-900 text-sm text-[#101011]">Services</NuxtLink>
          <NuxtLink to="/blogs" class="hover:text-emerald-900 text-sm text-[#101011]">Blog</NuxtLink>
          <button @click="showContactModal = true" class="hover:text-emerald-900 text-sm text-[#101011]">Contact</button>
        </nav>

        <div class="flex gap-4">
          <button @click="isOpenSidebar = true" type="button" class="-m-2.5 lg:hidden p-2.5 text-gray-700">
            <span class="sr-only">Open sidebar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>

          <NuxtLink to="/login" class="border-[0.5px] hidden lg:block border-emerald-900 text-sm text-emerald-900 px-4 py-2.5 rounded-full">
            Login
          </NuxtLink>
          <NuxtLink to="/signup" class="bg-emerald-900 hidden lg:block text-sm text-white px-4 py-2.5 rounded-full">
            SignUp
          </NuxtLink>
          <!-- <NuxtLink to="/waitlist" class="border-[0.5px] hidden lg:block border-emerald-900 text-sm text-emerald-900 px-4 py-2.5 rounded-full">
            Login
          </NuxtLink>
          <NuxtLink to="/waitlist" class="bg-emerald-900 hidden lg:block text-sm text-white px-4 py-2.5 rounded-full">
            SignUp
          </NuxtLink> -->
        </div>
      </header>

      <div v-if="isOpenSidebar" class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
        <!--
          Off-canvas menu backdrop, show/hide based on off-canvas menu state.

          Entering: "transition-opacity ease-linear duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "transition-opacity ease-linear duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>

        <div class="fixed inset-0 flex">
          <!--
            Off-canvas menu, show/hide based on off-canvas menu state.

            Entering: "transition ease-in-out duration-300 transform"
              From: "-translate-x-full"
              To: "translate-x-0"
            Leaving: "transition ease-in-out duration-300 transform"
              From: "translate-x-0"
              To: "-translate-x-full"
          -->
          <div class="relative mr-16 flex w-full max-w-xs flex-1">
            <!--
              Close button, show/hide based on off-canvas menu state.

              Entering: "ease-in-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in-out duration-300"
                From: "opacity-100"
                To: "opacity-0"
            -->
            <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button @click="isOpenSidebar = false" type="button" class="-m-2.5 p-2.5 bg-white rounded-full">
                <span class="sr-only">Close sidebar</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div class="flex h-16 shrink-0 items-center">
                <img class="h-8 w-auto" src="@/assets/img/blue-logo.png" alt="Your Company">
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li>
                        <!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
                        <NuxtLink @click="isOpenSidebar = false" to="/about" class="group flex gap-x-3 rounded-md bg-gray-50 p-2 py-3 text-sm/6 font-semibold text-emerald-900">
<!--                          <svg class="size-6 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />-->
<!--                          </svg>-->
                          About
                        </NuxtLink>
                      </li>
                      <li>
                        <NuxtLink @click="isOpenSidebar = false" to="/services" class="group flex gap-x-3 rounded-md p-2 py-3 text-sm/6 font-semibold text-emerald-900 hover:bg-gray-50 hover:text-emerald-900">
<!--                          <svg class="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />-->
<!--                          </svg>-->
                          Services
                        </NuxtLink>
                      </li>
                      <li>
                        <NuxtLink @click="isOpenSidebar = false" to="/blogs" class="group flex gap-x-3 rounded-md p-2 py-3 text-sm/6 font-semibold text-emerald-900 hover:bg-gray-50 hover:text-emerald-900">
<!--                          <svg class="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />-->
<!--                          </svg>-->
                          Blog
                        </NuxtLink>
                      </li>
                      <li>
                        <a @click="showContactModal = true" href="#" class="group flex gap-x-3 rounded-md p-2 py-3 text-sm/6 font-semibold text-emerald-900 hover:bg-gray-50 hover:text-emerald-900">
<!--                          <svg class="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />-->
<!--                          </svg>-->
                          Contact
                        </a>
                      </li>
                      <li>
                        <NuxtLink @click="isOpenSidebar = false" to="/login" class="group flex gap-x-3 rounded-md p-2 py-3 text-sm/6 font-semibold text-emerald-900 hover:bg-gray-50 hover:text-emerald-900">
                          Login
                        </NuxtLink>
                        <!-- <NuxtLink @click="isOpenSidebar = false" to="/waitlist" class="group flex gap-x-3 rounded-md p-2 py-3 text-sm/6 font-semibold text-emerald-900 hover:bg-gray-50 hover:text-emerald-900">
                          Login
                        </NuxtLink> -->
                      </li>
                    </ul>
                  </li>

<!--                  <li class="mt-auto">-->
<!--                    <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600">-->
<!--                      Settings-->
<!--                    </a>-->
<!--                  </li>-->
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <CoreFullScreenModal @close="showContactModal = false" header-text="Get In Touch" class="" :show="showContactModal">
        <ContactForm />
      </CoreFullScreenModal>
    </main>
  </template>

  <script setup lang="ts">
  const router = useRouter()
  const showContactModal = ref(false)
  const isOpenSidebar = ref(false)
  </script>