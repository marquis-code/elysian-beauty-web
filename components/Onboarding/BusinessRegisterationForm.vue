<template>
    <div class="min-h-screen bg-white p-4 md:p-6 w-full">
      <!-- Progress Bar -->
      <div class="max-w-2xl mx-auto mb-8 w-full">
        <div class="flex items-center justify-between -mb-2">
          <h1 class="text-2xl font-medium">
            {{ currentStep === 3 ? 'OTP Verification' : 'Biodata' }}
          </h1>
          <span class="text-base text-gray-600">{{ currentStep }}/3</span>
        </div>
        <div class="flex gap-2 h-2">
          <div 
            v-for="step in 3" 
            :key="step"
            :class="[
              'flex-1 rounded-full',
              step <= currentStep ? 'bg-black' : 'bg-gray-200'
            ]"
          ></div>
        </div>
      </div>
  
      <form @submit.prevent="handleSubmit" class="max-w-2xl w-full mx-auto">
        <!-- Step 1: Biodata -->
        <div v-if="currentStep === 1" class="space-y-6">
          <!-- Business Type -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Choose Business Type</label>
            <div class="relative">
              <input
                v-model="form.businessType"
                type="text"
                readonly
                class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50 "
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.75 11.2879C20.75 10.8736 20.4142 10.5379 20 10.5379C19.5858 10.5379 19.25 10.8736 19.25 11.2879H20.75ZM8.66228 10.0132L9.37379 10.2503L8.66228 10.0132ZM9 9L9.71151 8.76283C9.60943 8.45657 9.32282 8.25 9 8.25C8.67718 8.25 8.39057 8.45657 8.28849 8.76283L9 9ZM9.36754 10.1026L8.65603 10.3398L9.36754 10.1026ZM14.6325 10.1026L15.344 10.3398V10.3398L14.6325 10.1026ZM15 9L15.7115 8.76283C15.6094 8.45657 15.3228 8.25 15 8.25C14.6772 8.25 14.3906 8.45657 14.2885 8.76283L15 9ZM15.3377 10.0132L14.6262 10.2503L15.3377 10.0132ZM3.07365 7.74763L2.34206 7.58246L3.07365 7.74763ZM3.88434 6.17344L3.26029 5.75743L3.88434 6.17344ZM3.19864 7.33481L2.4983 7.06644L3.19864 7.33481ZM17.5436 3.22883L17.2563 3.92163L17.5436 3.22883ZM19.603 5.40454L18.9789 5.82057L19.603 5.40454ZM20.9264 7.74775L20.1948 7.9129L20.9264 7.74775ZM20.1156 6.17347L19.4916 6.58951L20.1156 6.17347ZM20.8013 7.33471L21.5016 7.0663L20.8013 7.33471ZM6.45624 3.22885L6.16893 2.53606L6.45624 3.22885ZM4.39681 5.4047L3.77277 4.98869L4.39681 5.4047ZM5.93717 3.50666L5.52009 2.88332L5.93717 3.50666ZM6.74922 20.9993L6.74943 20.2493L6.74922 20.9993ZM6.99908 20.2494L6.74943 20.2493L6.749 21.7493L6.99865 21.7494L6.99908 20.2494ZM17.25 20.2485H17V21.7485H17.25V20.2485ZM4.75 18.2493V11.2879H3.25V18.2493H4.75ZM19.25 11.2879V18.2485H20.75V11.2879H19.25ZM8.88994 3.75H15.11V2.25H8.88994V3.75ZM9.37379 10.2503L9.71151 9.23717L8.28849 8.76283L7.95077 9.776L9.37379 10.2503ZM8.28849 9.23717L8.65603 10.3398L10.0791 9.86546L9.71151 8.76283L8.28849 9.23717ZM15.344 10.3398L15.7115 9.23717L14.2885 8.76283L13.9209 9.86546L15.344 10.3398ZM14.2885 9.23717L14.6262 10.2503L16.0492 9.776L15.7115 8.76283L14.2885 9.23717ZM4.50838 6.58945L5.02086 5.82071L3.77277 4.98869L3.26029 5.75743L4.50838 6.58945ZM18.9789 5.82057L19.4916 6.58951L20.7396 5.75744L20.227 4.9885L18.9789 5.82057ZM18.0943 12.75C20.1133 12.75 21.75 11.1133 21.75 9.09431H20.25C20.25 10.2849 19.2849 11.25 18.0943 11.25V12.75ZM12 12.75C13.5172 12.75 14.8642 11.7792 15.344 10.3398L13.9209 9.86546C13.6453 10.6923 12.8716 11.25 12 11.25V12.75ZM8.65603 10.3398C9.13581 11.7792 10.4828 12.75 12 12.75V11.25C11.1284 11.25 10.3547 10.6923 10.0791 9.86546L8.65603 10.3398ZM14.6262 10.2503C15.1238 11.7431 16.5208 12.75 18.0943 12.75V11.25C17.1664 11.25 16.3427 10.6563 16.0492 9.776L14.6262 10.2503ZM5.90569 12.75C7.47922 12.75 8.8762 11.7431 9.37379 10.2503L7.95077 9.776C7.65734 10.6563 6.83357 11.25 5.90569 11.25V12.75ZM2.25 9.09431C2.25 11.1133 3.88671 12.75 5.90569 12.75V11.25C4.71514 11.25 3.75 10.2849 3.75 9.09431H2.25ZM3.75 9.09431C3.75 8.38134 3.75423 8.13871 3.80524 7.9128L2.34206 7.58246C2.24577 8.009 2.25 8.44668 2.25 9.09431H3.75ZM3.26029 5.75743C2.90106 6.29629 2.65477 6.65812 2.4983 7.06644L3.89898 7.60318C3.98185 7.38691 4.11291 7.18269 4.50838 6.58945L3.26029 5.75743ZM3.80524 7.9128C3.82902 7.80748 3.86034 7.704 3.89898 7.60318L2.4983 7.06644C2.43391 7.23448 2.38169 7.40693 2.34206 7.58246L3.80524 7.9128ZM15.11 3.75C16.4279 3.75 16.875 3.7635 17.2563 3.92163L17.8309 2.53604C17.1085 2.2365 16.301 2.25 15.11 2.25V3.75ZM20.227 4.9885C19.5663 3.99747 19.1296 3.31812 18.4797 2.88327L17.6456 4.12996C17.9886 4.35951 18.2478 4.72397 18.9789 5.82057L20.227 4.9885ZM17.2563 3.92163C17.3925 3.97814 17.5229 4.04792 17.6456 4.12996L18.4797 2.88327C18.2753 2.74654 18.058 2.63023 17.8309 2.53604L17.2563 3.92163ZM21.75 9.09431C21.75 8.44673 21.7542 8.0091 21.658 7.58259L20.1948 7.9129C20.2458 8.1388 20.25 8.3814 20.25 9.09431H21.75ZM19.4916 6.58951C19.887 7.18268 20.0181 7.38688 20.101 7.60313L21.5016 7.0663C21.3451 6.65803 21.0989 6.29624 20.7396 5.75744L19.4916 6.58951ZM21.658 7.58259C21.6183 7.40697 21.5661 7.23442 21.5016 7.0663L20.101 7.60313C20.1396 7.704 20.171 7.80752 20.1948 7.9129L21.658 7.58259ZM8.88994 2.25C7.6988 2.25 6.89128 2.2365 6.16893 2.53606L6.74355 3.92164C7.12485 3.7635 7.57191 3.75 8.88994 3.75V2.25ZM5.02086 5.82071C5.75195 4.72404 6.01116 4.35955 6.35424 4.12999L5.52009 2.88332C4.87015 3.31819 4.43347 3.99759 3.77277 4.98869L5.02086 5.82071ZM6.16893 2.53606C5.94179 2.63026 5.72446 2.74657 5.52009 2.88332L6.35424 4.12999C6.47686 4.04794 6.60726 3.97816 6.74355 3.92164L6.16893 2.53606ZM17.25 21.7485C19.183 21.7485 20.75 20.1815 20.75 18.2485H19.25C19.25 19.3531 18.3546 20.2485 17.25 20.2485V21.7485ZM13.75 18.4985C13.75 20.2935 15.2051 21.7485 17 21.7485V20.2485C16.0335 20.2485 15.25 19.465 15.25 18.4985H13.75ZM15.25 18.4985C15.25 16.7036 13.7949 15.2485 12 15.2485V16.7485C12.9665 16.7485 13.75 17.532 13.75 18.4985H15.25ZM10.25 18.4988C10.25 17.5322 11.0336 16.7485 12 16.7485V15.2485C10.205 15.2485 8.75 16.7039 8.75 18.4988H10.25ZM6.74943 20.2493C5.64508 20.249 4.75 19.3537 4.75 18.2493H3.25C3.25 20.1819 4.8164 21.7488 6.749 21.7493L6.74943 20.2493ZM6.99865 21.7494C8.79425 21.7499 10.25 20.2942 10.25 18.4988H8.75C8.75 19.4658 7.96592 20.2497 6.99908 20.2494L6.99865 21.7494Z" fill="#A3A8A7"/>
                    </svg>
              </span>
            </div>
          </div>
  
          <!-- Full Name -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Full Name <span class="text-sm">(First Name First)</span></label>
            <div class="relative">
              <input
                v-model="form.fullName"
                type="text"
                class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50 "
                :class="{ 'border-red-500': v$.fullName.$error }"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16841 16.1211C5.2822 13.615 7.76737 12 10.5098 12H13.4902C16.2326 12 18.7178 13.615 19.8316 16.1211V16.1211C20.8514 18.4156 19.1718 21 16.6609 21H7.33909C4.82819 21 3.14864 18.4156 4.16841 16.1211V16.1211Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                    <path d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                    </svg>

              </span>
            </div>
          </div>
  
          <!-- Email -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Email</label>
            <div class="relative">
              <input
                v-model="form.email"
                type="email"
                class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50 "
                :class="{ 'border-red-500': v$.email.$error }"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12C3 9.67029 3 8.50544 3.3806 7.58658C3.88807 6.36144 4.86144 5.38807 6.08658 4.8806C7.00544 4.5 8.17029 4.5 10.5 4.5H13.5C15.8297 4.5 16.9946 4.5 17.9134 4.8806C19.1386 5.38807 20.1119 6.36144 20.6194 7.58658C21 8.50544 21 9.67029 21 12V12C21 14.3297 21 15.4946 20.6194 16.4134C20.1119 17.6386 19.1386 18.6119 17.9134 19.1194C16.9946 19.5 15.8297 19.5 13.5 19.5H10.5C8.17029 19.5 7.00544 19.5 6.08658 19.1194C4.86144 18.6119 3.88807 17.6386 3.3806 16.4134C3 15.4946 3 14.3297 3 12V12Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                    <path d="M3 8L6.47486 10.7025C8.82448 12.5299 9.99929 13.4436 11.3413 13.6221C11.7788 13.6802 12.222 13.6802 12.6595 13.622C14.0015 13.4436 15.1762 12.5298 17.5258 10.7023L21 8" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
                    </svg>

              </span>
            </div>
          </div>
  
          <!-- Phone -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Phone (Mobile)</label>
            <div class="relative">
              <input
                v-model="form.phone.number"
                type="tel"
                class="w-full p-4 border rounded-full pl-24"
                :class="{ 'border-red-500': v$.phone.number.$error }"
              />
              <div class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <img src="@/assets/img/flag.png" alt="NG" class="w-6 h-4" />
                <span>+234</span>
              </div>
            </div>
          </div>
  
          <!-- Password -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Create Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50  pr-12"
                :class="{ 'border-red-500': v$.password.$error }"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8V8C17 5.23858 14.7614 3 12 3V3C9.23858 3 7 5.23858 7 8V8M12 12.5V16.5M9.5 21H14.5C16.8346 21 18.0019 21 18.8856 20.5277C19.5833 20.1548 20.1548 19.5833 20.5277 18.8856C21 18.0019 21 16.8346 21 14.5V14.5C21 12.1654 21 10.9981 20.5277 10.1144C20.1548 9.4167 19.5833 8.84525 18.8856 8.47231C18.0019 8 16.8346 8 14.5 8H9.5C7.16537 8 5.99805 8 5.11441 8.47231C4.4167 8.84525 3.84525 9.4167 3.47231 10.1144C3 10.9981 3 12.1654 3 14.5V14.5C3 16.8346 3 18.0019 3.47231 18.8856C3.84525 19.5833 4.4167 20.1548 5.11441 20.5277C5.99805 21 7.16537 21 9.5 21Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </span>
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2"
              >
              <img v-if="!showPassword" src="@/assets/icons/eye-close.svg" class="h-6 w-6" />
              <img v-if="showPassword" src="@/assets/icons/eye-open.svg" class="h-6 w-6" />
              </button>
            </div>
          </div>
  
          <!-- Confirm Password -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Confirm Password</label>
            <div class="relative">
                <!-- {{ v$.confirmPassword.$error }} -->
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50  pr-12"
                :class="{ 'border-red-500': v$.confirmPassword.$error }"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8V8C17 5.23858 14.7614 3 12 3V3C9.23858 3 7 5.23858 7 8V8M12 12.5V16.5M9.5 21H14.5C16.8346 21 18.0019 21 18.8856 20.5277C19.5833 20.1548 20.1548 19.5833 20.5277 18.8856C21 18.0019 21 16.8346 21 14.5V14.5C21 12.1654 21 10.9981 20.5277 10.1144C20.1548 9.4167 19.5833 8.84525 18.8856 8.47231C18.0019 8 16.8346 8 14.5 8H9.5C7.16537 8 5.99805 8 5.11441 8.47231C4.4167 8.84525 3.84525 9.4167 3.47231 10.1144C3 10.9981 3 12.1654 3 14.5V14.5C3 16.8346 3 18.0019 3.47231 18.8856C3.84525 19.5833 4.4167 20.1548 5.11441 20.5277C5.99805 21 7.16537 21 9.5 21Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </span>
              <button 
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2"
              >
              <img v-if="!showConfirmPassword" src="@/assets/icons/eye-close.svg" class="h-6 w-6" />
              <img v-if="showConfirmPassword" src="@/assets/icons/eye-open.svg" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
  
        <!-- Step 2: Business Details -->
        <div v-if="currentStep === 2" class="space-y-6">
          <!-- Business Type (readonly) -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Business Type</label>
            <div class="relative">
              <input
                v-model="form.businessType"
                type="text"
                readonly
                class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50  bg-gray-50"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.75 11.2879C20.75 10.8736 20.4142 10.5379 20 10.5379C19.5858 10.5379 19.25 10.8736 19.25 11.2879H20.75ZM8.66228 10.0132L9.37379 10.2503L8.66228 10.0132ZM9 9L9.71151 8.76283C9.60943 8.45657 9.32282 8.25 9 8.25C8.67718 8.25 8.39057 8.45657 8.28849 8.76283L9 9ZM9.36754 10.1026L8.65603 10.3398L9.36754 10.1026ZM14.6325 10.1026L15.344 10.3398V10.3398L14.6325 10.1026ZM15 9L15.7115 8.76283C15.6094 8.45657 15.3228 8.25 15 8.25C14.6772 8.25 14.3906 8.45657 14.2885 8.76283L15 9ZM15.3377 10.0132L14.6262 10.2503L15.3377 10.0132ZM3.07365 7.74763L2.34206 7.58246L3.07365 7.74763ZM3.88434 6.17344L3.26029 5.75743L3.88434 6.17344ZM3.19864 7.33481L2.4983 7.06644L3.19864 7.33481ZM17.5436 3.22883L17.2563 3.92163L17.5436 3.22883ZM19.603 5.40454L18.9789 5.82057L19.603 5.40454ZM20.9264 7.74775L20.1948 7.9129L20.9264 7.74775ZM20.1156 6.17347L19.4916 6.58951L20.1156 6.17347ZM20.8013 7.33471L21.5016 7.0663L20.8013 7.33471ZM6.45624 3.22885L6.16893 2.53606L6.45624 3.22885ZM4.39681 5.4047L3.77277 4.98869L4.39681 5.4047ZM5.93717 3.50666L5.52009 2.88332L5.93717 3.50666ZM6.74922 20.9993L6.74943 20.2493L6.74922 20.9993ZM6.99908 20.2494L6.74943 20.2493L6.749 21.7493L6.99865 21.7494L6.99908 20.2494ZM17.25 20.2485H17V21.7485H17.25V20.2485ZM4.75 18.2493V11.2879H3.25V18.2493H4.75ZM19.25 11.2879V18.2485H20.75V11.2879H19.25ZM8.88994 3.75H15.11V2.25H8.88994V3.75ZM9.37379 10.2503L9.71151 9.23717L8.28849 8.76283L7.95077 9.776L9.37379 10.2503ZM8.28849 9.23717L8.65603 10.3398L10.0791 9.86546L9.71151 8.76283L8.28849 9.23717ZM15.344 10.3398L15.7115 9.23717L14.2885 8.76283L13.9209 9.86546L15.344 10.3398ZM14.2885 9.23717L14.6262 10.2503L16.0492 9.776L15.7115 8.76283L14.2885 9.23717ZM4.50838 6.58945L5.02086 5.82071L3.77277 4.98869L3.26029 5.75743L4.50838 6.58945ZM18.9789 5.82057L19.4916 6.58951L20.7396 5.75744L20.227 4.9885L18.9789 5.82057ZM18.0943 12.75C20.1133 12.75 21.75 11.1133 21.75 9.09431H20.25C20.25 10.2849 19.2849 11.25 18.0943 11.25V12.75ZM12 12.75C13.5172 12.75 14.8642 11.7792 15.344 10.3398L13.9209 9.86546C13.6453 10.6923 12.8716 11.25 12 11.25V12.75ZM8.65603 10.3398C9.13581 11.7792 10.4828 12.75 12 12.75V11.25C11.1284 11.25 10.3547 10.6923 10.0791 9.86546L8.65603 10.3398ZM14.6262 10.2503C15.1238 11.7431 16.5208 12.75 18.0943 12.75V11.25C17.1664 11.25 16.3427 10.6563 16.0492 9.776L14.6262 10.2503ZM5.90569 12.75C7.47922 12.75 8.8762 11.7431 9.37379 10.2503L7.95077 9.776C7.65734 10.6563 6.83357 11.25 5.90569 11.25V12.75ZM2.25 9.09431C2.25 11.1133 3.88671 12.75 5.90569 12.75V11.25C4.71514 11.25 3.75 10.2849 3.75 9.09431H2.25ZM3.75 9.09431C3.75 8.38134 3.75423 8.13871 3.80524 7.9128L2.34206 7.58246C2.24577 8.009 2.25 8.44668 2.25 9.09431H3.75ZM3.26029 5.75743C2.90106 6.29629 2.65477 6.65812 2.4983 7.06644L3.89898 7.60318C3.98185 7.38691 4.11291 7.18269 4.50838 6.58945L3.26029 5.75743ZM3.80524 7.9128C3.82902 7.80748 3.86034 7.704 3.89898 7.60318L2.4983 7.06644C2.43391 7.23448 2.38169 7.40693 2.34206 7.58246L3.80524 7.9128ZM15.11 3.75C16.4279 3.75 16.875 3.7635 17.2563 3.92163L17.8309 2.53604C17.1085 2.2365 16.301 2.25 15.11 2.25V3.75ZM20.227 4.9885C19.5663 3.99747 19.1296 3.31812 18.4797 2.88327L17.6456 4.12996C17.9886 4.35951 18.2478 4.72397 18.9789 5.82057L20.227 4.9885ZM17.2563 3.92163C17.3925 3.97814 17.5229 4.04792 17.6456 4.12996L18.4797 2.88327C18.2753 2.74654 18.058 2.63023 17.8309 2.53604L17.2563 3.92163ZM21.75 9.09431C21.75 8.44673 21.7542 8.0091 21.658 7.58259L20.1948 7.9129C20.2458 8.1388 20.25 8.3814 20.25 9.09431H21.75ZM19.4916 6.58951C19.887 7.18268 20.0181 7.38688 20.101 7.60313L21.5016 7.0663C21.3451 6.65803 21.0989 6.29624 20.7396 5.75744L19.4916 6.58951ZM21.658 7.58259C21.6183 7.40697 21.5661 7.23442 21.5016 7.0663L20.101 7.60313C20.1396 7.704 20.171 7.80752 20.1948 7.9129L21.658 7.58259ZM8.88994 2.25C7.6988 2.25 6.89128 2.2365 6.16893 2.53606L6.74355 3.92164C7.12485 3.7635 7.57191 3.75 8.88994 3.75V2.25ZM5.02086 5.82071C5.75195 4.72404 6.01116 4.35955 6.35424 4.12999L5.52009 2.88332C4.87015 3.31819 4.43347 3.99759 3.77277 4.98869L5.02086 5.82071ZM6.16893 2.53606C5.94179 2.63026 5.72446 2.74657 5.52009 2.88332L6.35424 4.12999C6.47686 4.04794 6.60726 3.97816 6.74355 3.92164L6.16893 2.53606ZM17.25 21.7485C19.183 21.7485 20.75 20.1815 20.75 18.2485H19.25C19.25 19.3531 18.3546 20.2485 17.25 20.2485V21.7485ZM13.75 18.4985C13.75 20.2935 15.2051 21.7485 17 21.7485V20.2485C16.0335 20.2485 15.25 19.465 15.25 18.4985H13.75ZM15.25 18.4985C15.25 16.7036 13.7949 15.2485 12 15.2485V16.7485C12.9665 16.7485 13.75 17.532 13.75 18.4985H15.25ZM10.25 18.4988C10.25 17.5322 11.0336 16.7485 12 16.7485V15.2485C10.205 15.2485 8.75 16.7039 8.75 18.4988H10.25ZM6.74943 20.2493C5.64508 20.249 4.75 19.3537 4.75 18.2493H3.25C3.25 20.1819 4.8164 21.7488 6.749 21.7493L6.74943 20.2493ZM6.99865 21.7494C8.79425 21.7499 10.25 20.2942 10.25 18.4988H8.75C8.75 19.4658 7.96592 20.2497 6.99908 20.2494L6.99865 21.7494Z" fill="#A3A8A7"/>
</svg>

              </span>
            </div>
          </div>
  
          <!-- Business Name -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Business Name</label>
            <div class="relative">
              <input
                v-model="form.businessName"
                type="text"
                class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50 "
                :class="{ 'border-red-500': v$.businessName.$error }"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.75 11.2879C20.75 10.8736 20.4142 10.5379 20 10.5379C19.5858 10.5379 19.25 10.8736 19.25 11.2879H20.75ZM8.66228 10.0132L9.37379 10.2503L8.66228 10.0132ZM9 9L9.71151 8.76283C9.60943 8.45657 9.32282 8.25 9 8.25C8.67718 8.25 8.39057 8.45657 8.28849 8.76283L9 9ZM9.36754 10.1026L8.65603 10.3398L9.36754 10.1026ZM14.6325 10.1026L15.344 10.3398V10.3398L14.6325 10.1026ZM15 9L15.7115 8.76283C15.6094 8.45657 15.3228 8.25 15 8.25C14.6772 8.25 14.3906 8.45657 14.2885 8.76283L15 9ZM15.3377 10.0132L14.6262 10.2503L15.3377 10.0132ZM3.07365 7.74763L2.34206 7.58246L3.07365 7.74763ZM3.88434 6.17344L3.26029 5.75743L3.88434 6.17344ZM3.19864 7.33481L2.4983 7.06644L3.19864 7.33481ZM17.5436 3.22883L17.2563 3.92163L17.5436 3.22883ZM19.603 5.40454L18.9789 5.82057L19.603 5.40454ZM20.9264 7.74775L20.1948 7.9129L20.9264 7.74775ZM20.1156 6.17347L19.4916 6.58951L20.1156 6.17347ZM20.8013 7.33471L21.5016 7.0663L20.8013 7.33471ZM6.45624 3.22885L6.16893 2.53606L6.45624 3.22885ZM4.39681 5.4047L3.77277 4.98869L4.39681 5.4047ZM5.93717 3.50666L5.52009 2.88332L5.93717 3.50666ZM6.74922 20.9993L6.74943 20.2493L6.74922 20.9993ZM6.99908 20.2494L6.74943 20.2493L6.749 21.7493L6.99865 21.7494L6.99908 20.2494ZM17.25 20.2485H17V21.7485H17.25V20.2485ZM4.75 18.2493V11.2879H3.25V18.2493H4.75ZM19.25 11.2879V18.2485H20.75V11.2879H19.25ZM8.88994 3.75H15.11V2.25H8.88994V3.75ZM9.37379 10.2503L9.71151 9.23717L8.28849 8.76283L7.95077 9.776L9.37379 10.2503ZM8.28849 9.23717L8.65603 10.3398L10.0791 9.86546L9.71151 8.76283L8.28849 9.23717ZM15.344 10.3398L15.7115 9.23717L14.2885 8.76283L13.9209 9.86546L15.344 10.3398ZM14.2885 9.23717L14.6262 10.2503L16.0492 9.776L15.7115 8.76283L14.2885 9.23717ZM4.50838 6.58945L5.02086 5.82071L3.77277 4.98869L3.26029 5.75743L4.50838 6.58945ZM18.9789 5.82057L19.4916 6.58951L20.7396 5.75744L20.227 4.9885L18.9789 5.82057ZM18.0943 12.75C20.1133 12.75 21.75 11.1133 21.75 9.09431H20.25C20.25 10.2849 19.2849 11.25 18.0943 11.25V12.75ZM12 12.75C13.5172 12.75 14.8642 11.7792 15.344 10.3398L13.9209 9.86546C13.6453 10.6923 12.8716 11.25 12 11.25V12.75ZM8.65603 10.3398C9.13581 11.7792 10.4828 12.75 12 12.75V11.25C11.1284 11.25 10.3547 10.6923 10.0791 9.86546L8.65603 10.3398ZM14.6262 10.2503C15.1238 11.7431 16.5208 12.75 18.0943 12.75V11.25C17.1664 11.25 16.3427 10.6563 16.0492 9.776L14.6262 10.2503ZM5.90569 12.75C7.47922 12.75 8.8762 11.7431 9.37379 10.2503L7.95077 9.776C7.65734 10.6563 6.83357 11.25 5.90569 11.25V12.75ZM2.25 9.09431C2.25 11.1133 3.88671 12.75 5.90569 12.75V11.25C4.71514 11.25 3.75 10.2849 3.75 9.09431H2.25ZM3.75 9.09431C3.75 8.38134 3.75423 8.13871 3.80524 7.9128L2.34206 7.58246C2.24577 8.009 2.25 8.44668 2.25 9.09431H3.75ZM3.26029 5.75743C2.90106 6.29629 2.65477 6.65812 2.4983 7.06644L3.89898 7.60318C3.98185 7.38691 4.11291 7.18269 4.50838 6.58945L3.26029 5.75743ZM3.80524 7.9128C3.82902 7.80748 3.86034 7.704 3.89898 7.60318L2.4983 7.06644C2.43391 7.23448 2.38169 7.40693 2.34206 7.58246L3.80524 7.9128ZM15.11 3.75C16.4279 3.75 16.875 3.7635 17.2563 3.92163L17.8309 2.53604C17.1085 2.2365 16.301 2.25 15.11 2.25V3.75ZM20.227 4.9885C19.5663 3.99747 19.1296 3.31812 18.4797 2.88327L17.6456 4.12996C17.9886 4.35951 18.2478 4.72397 18.9789 5.82057L20.227 4.9885ZM17.2563 3.92163C17.3925 3.97814 17.5229 4.04792 17.6456 4.12996L18.4797 2.88327C18.2753 2.74654 18.058 2.63023 17.8309 2.53604L17.2563 3.92163ZM21.75 9.09431C21.75 8.44673 21.7542 8.0091 21.658 7.58259L20.1948 7.9129C20.2458 8.1388 20.25 8.3814 20.25 9.09431H21.75ZM19.4916 6.58951C19.887 7.18268 20.0181 7.38688 20.101 7.60313L21.5016 7.0663C21.3451 6.65803 21.0989 6.29624 20.7396 5.75744L19.4916 6.58951ZM21.658 7.58259C21.6183 7.40697 21.5661 7.23442 21.5016 7.0663L20.101 7.60313C20.1396 7.704 20.171 7.80752 20.1948 7.9129L21.658 7.58259ZM8.88994 2.25C7.6988 2.25 6.89128 2.2365 6.16893 2.53606L6.74355 3.92164C7.12485 3.7635 7.57191 3.75 8.88994 3.75V2.25ZM5.02086 5.82071C5.75195 4.72404 6.01116 4.35955 6.35424 4.12999L5.52009 2.88332C4.87015 3.31819 4.43347 3.99759 3.77277 4.98869L5.02086 5.82071ZM6.16893 2.53606C5.94179 2.63026 5.72446 2.74657 5.52009 2.88332L6.35424 4.12999C6.47686 4.04794 6.60726 3.97816 6.74355 3.92164L6.16893 2.53606ZM17.25 21.7485C19.183 21.7485 20.75 20.1815 20.75 18.2485H19.25C19.25 19.3531 18.3546 20.2485 17.25 20.2485V21.7485ZM13.75 18.4985C13.75 20.2935 15.2051 21.7485 17 21.7485V20.2485C16.0335 20.2485 15.25 19.465 15.25 18.4985H13.75ZM15.25 18.4985C15.25 16.7036 13.7949 15.2485 12 15.2485V16.7485C12.9665 16.7485 13.75 17.532 13.75 18.4985H15.25ZM10.25 18.4988C10.25 17.5322 11.0336 16.7485 12 16.7485V15.2485C10.205 15.2485 8.75 16.7039 8.75 18.4988H10.25ZM6.74943 20.2493C5.64508 20.249 4.75 19.3537 4.75 18.2493H3.25C3.25 20.1819 4.8164 21.7488 6.749 21.7493L6.74943 20.2493ZM6.99865 21.7494C8.79425 21.7499 10.25 20.2942 10.25 18.4988H8.75C8.75 19.4658 7.96592 20.2497 6.99908 20.2494L6.99865 21.7494Z" fill="#A3A8A7"/>
</svg>

              </span>
            </div>
          </div>
  
          <!-- Services -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">What type of services do you offer?</label>
            <div class="relative">
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="service in form.services"
                  :key="service"
                  class="px-4 py-2 bg-[#A3A8A7] font-medium text-white rounded-full text-sm flex items-center gap-2"
                >
                  {{ service }}
                  <button
                    type="button"
                    @click="removeService(service)"
                    class="text-gray-500 hover:text-gray-700"
                  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#FAFBFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </span>
              </div>
              <input
                v-model="newService"
                type="text"
                class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50 "
                placeholder="Add a service"
                @keyup.enter="addService"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">💼</span>
            </div>
          </div>
  
          <!-- Business Location Type -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Business Location Type</label>
            <select
              v-model="form.businessLocationType"
              class="w-full p-4 border rounded-full appearance-none pl-12"
            >
              <option value="Physical">Physical</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>
  
          <!-- Business Address -->
          <div class="space-y-2">
            <label class="block text-gray-500 text-sm">Enter your business address (Street, City, State)</label>
            <div class="relative">
              <input
                v-model="form.businessAddress"
                type="text"
                class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50 "
                :class="{ 'border-red-500': v$.businessAddress.$error }"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0001 3C7.02956 3 2.99997 7 4.00012 12C4.66541 15.3259 7.98533 18.4306 10.1339 20.1367C10.8361 20.6944 11.1873 20.9732 11.7325 21.0468C11.8836 21.0672 12.1166 21.0672 12.2678 21.0468C12.813 20.9732 13.1641 20.6944 13.8664 20.1368C16.015 18.4306 19.335 15.3259 20.0001 12C21 7 16.9707 3 12.0001 3Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M15 11.15C15 12.8069 13.6569 14.15 12 14.15C10.3431 14.15 9 12.8069 9 11.15C9 9.49315 10.3431 8.15 12 8.15C13.6569 8.15 15 9.49315 15 11.15Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

              </span>
            </div>
          </div>
        </div>
  
        <!-- Step 3: OTP Verification -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div class="text-center space-y-4 py-5">
            <h2 class="text-3xl font-medium           ">Enter verification code</h2>
            <p class="text-[#A3A8A7] font-light">
              Almost there! We've sent a 4-digit code to<br/>
              <span class="text-black">{{ form.email }}</span>
              Enter it below to verify your account.
            </p>
            <!-- Almost there! We've sent a 4-digit code to olasehindeolalekanpeter@gmail.com. Enter it below to verify your account. -->
          </div>
  
          <div class="flex justify-center gap-4 py-6">
            <input
              v-for="(digit, index) in 4"
              :key="index"
              v-model="form.otpCode[index]"
              type="text"
              maxlength="1"
              class="w-20 h-20 text-center text-2xl border rounded-full"
              @input="handleOtpInput($event, index)"
              @keydown.delete="handleOtpDelete($event, index)"
            />
          </div>

        </div>
  
        <!-- Navigation -->
        <div class="mt-8 flex justify-center items-center">
          <button
            v-if="currentStep === 3"
            type="submit"
            class="w-full max-w-lg mx-auto p-4 bg-[#282B2A] text-white rounded-full hover:bg-[#282B2A]"
          >
            Verify
          </button>
          <button
            v-else
            type="button"
            @click="nextStep"
            class="w-full p-4 bg-[#282B2A] text-white rounded-full hover:bg-[#282B2A]"
          >
            Continue
          </button>
        </div>

        <p class="text-center font-light text-gray-500 pt-10">
            Didn't receive the code? 
            <button type="button" class="text-[#282B2A] font-semibold" @click="resendOtp">
              Resend OTP
            </button>
          </p>
      </form>
  
      <!-- Footer -->
      <OnboardingFooter />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength, sameAs } from '@vuelidate/validators'
  
  interface RegistrationForm {
    businessType: string;
    fullName: string;
    email: string;
    phone: {
      countryCode: string;
      number: string;
    };
    password: string;
    confirmPassword: string;
    businessName: string;
    services: string[];
    businessLocationType: string;
    businessAddress: string;
    otpCode: string[];
  }
  
  const currentStep = ref(1)
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const newService = ref('')
  
  const form = reactive<RegistrationForm>({
    businessType: 'Registered Business',
    fullName: '',
    email: '',
    phone: {
      countryCode: '+234',
      number: ''
    },
    password: '',
    confirmPassword: '',
    businessName: '',
    services: [],
    businessLocationType: 'Physical',
    businessAddress: '',
    otpCode: ['', '', '', '']
  })
  
  
  const rules = {
    fullName: { required },
    email: { required, email },
    phone: {
      number: { required, minLength: minLength(10) }
    },
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAs: sameAs(() => form.password) },
    businessName: { required },
    businessAddress: { required }
  }
  
  const v$ = useVuelidate(rules, form)
  
  const addService = () => {
    if (newService.value.trim() && !form.services.includes(newService.value.trim())) {
      form.services.push(newService.value.trim())
      newService.value = ''
    }
  }
  
  const removeService = (service: string) => {
    form.services = form.services.filter(s => s !== service)
  }
  
  const handleOtpInput = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement
    const value = input.value
  
    if (value && index < 3) {
      const nextInput = document.querySelector(`input:nth-child(${index + 2})`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }
  
  const handleOtpDelete = (event: KeyboardEvent, index: number) => {
    if (event.key === 'Backspace' && !form.otpCode[index] && index > 0) {
      const prevInput = document.querySelector(`input:nth-child(${index})`) as HTMLInputElement
      if (prevInput) prevInput.focus()
    }
  }
  
  const nextStep = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
      currentStep.value++
    }
  }
  
  const resendOtp = () => {
    // Implement OTP resend logic
    console.log('Resending OTP...')
  }
  
  const handleSubmit = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
      // Handle form submission
      console.log('Form submitted:', form)
    }
  }
  </script>