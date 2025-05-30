<template>
  <div class="min-h-screen bg-white md:p-6 w-full">
    <!-- Progress Bar -->
    <div class="max-w-2xl space-y-4 mx-auto mb-8 w-full">
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
            <select
              v-model="form.businessType"
              class="w-full p-3 border rounded-full pl-10 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'border-red-500': errors.businessType }"
            >
              <option value="Freelancer">Freelancer</option>
              <option value="Business">Business</option>
            </select>
            <span class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.75 12.1257C20.75 11.7115 20.4142 11.3757 20 11.3757C19.5858 11.3757 19.25 11.7115 19.25 12.1257H20.75ZM8.66228 10.8511L9.37379 11.0882L8.66228 10.8511ZM9 9.83789L9.71151 9.60072C9.60943 9.29446 9.32282 9.08789 9 9.08789C8.67718 9.08789 8.39057 9.29446 8.28849 9.60072L9 9.83789ZM9.36754 10.9405L8.65603 11.1777L9.36754 10.9405ZM14.6325 10.9405L15.344 11.1777V11.1777L14.6325 10.9405ZM15 9.83789L15.7115 9.60072C15.6094 9.29446 15.3228 9.08789 15 9.08789C14.6772 9.08789 14.3906 9.29446 14.2885 9.60072L15 9.83789ZM15.3377 10.8511L14.6262 11.0882L15.3377 10.8511ZM3.07365 8.58552L2.34206 8.42035L3.07365 8.58552ZM3.88434 7.01133L3.26029 6.59532L3.88434 7.01133ZM3.19864 8.1727L2.4983 7.90433L3.19864 8.1727ZM17.5436 4.06672L17.2563 4.75952L17.5436 4.06672ZM19.603 6.24243L18.9789 6.65846L19.603 6.24243ZM20.9264 8.58564L20.1948 8.75079L20.9264 8.58564ZM20.1156 7.01136L19.4916 7.4274L20.1156 7.01136ZM20.8013 8.17261L21.5016 7.90419L20.8013 8.17261ZM6.45624 4.06674L6.16893 3.37395L6.45624 4.06674ZM4.39681 6.24259L3.77277 5.82658L4.39681 6.24259ZM5.93717 4.34455L5.52009 3.72121L5.93717 4.34455ZM6.74922 21.8372L6.74943 21.0872L6.74922 21.8372ZM6.99908 21.0873L6.74943 21.0872L6.749 22.5872L6.99865 22.5873L6.99908 21.0873ZM17.25 21.0864H17V22.5864H17.25V21.0864ZM4.75 19.0872V12.1257H3.25V19.0872H4.75ZM19.25 12.1257V19.0864H20.75V12.1257H19.25ZM8.88994 4.58789H15.11V3.08789H8.88994V4.58789ZM9.37379 11.0882L9.71151 10.0751L8.28849 9.60072L7.95077 10.6139L9.37379 11.0882ZM8.28849 10.0751L8.65603 11.1777L10.0791 10.7034L9.71151 9.60072L8.28849 10.0751ZM15.344 11.1777L15.7115 10.0751L14.2885 9.60072L13.9209 10.7034L15.344 11.1777ZM14.2885 10.0751L14.6262 11.0882L16.0492 10.6139L15.7115 9.60072L14.2885 10.0751ZM4.50838 7.42735L5.02086 6.6586L3.77277 5.82658L3.26029 6.59532L4.50838 7.42735ZM18.9789 6.65846L19.4916 7.4274L20.7396 6.59533L20.227 5.82639L18.9789 6.65846ZM18.0943 13.5879C20.1133 13.5879 21.75 11.9512 21.75 9.9322H20.25C20.25 11.1228 19.2849 12.0879 18.0943 12.0879V13.5879ZM12 13.5879C13.5172 13.5879 14.8642 12.617 15.344 11.1777L13.9209 10.7034C13.6453 11.5302 12.8716 12.0879 12 12.0879V13.5879ZM8.65603 11.1777C9.13581 12.617 10.4828 13.5879 12 13.5879V12.0879C11.1284 12.0879 10.3547 11.5302 10.0791 10.7034L8.65603 11.1777ZM14.6262 11.0882C15.1238 12.581 16.5208 13.5879 18.0943 13.5879V12.0879C17.1664 12.0879 16.3427 11.4941 16.0492 10.6139L14.6262 11.0882ZM5.90569 13.5879C7.47922 13.5879 8.8762 12.581 9.37379 11.0882L7.95077 10.6139C7.65734 11.4941 6.83357 12.0879 5.90569 12.0879V13.5879ZM2.25 9.9322C2.25 11.9512 3.88671 13.5879 5.90569 13.5879V12.0879C4.71514 12.0879 3.75 11.1228 3.75 9.9322H2.25ZM3.75 9.9322C3.75 9.21923 3.75423 8.9766 3.80524 8.75069L2.34206 8.42035C2.24577 8.84689 2.25 9.28457 2.25 9.9322H3.75ZM3.26029 6.59532C2.90106 7.13418 2.65477 7.49601 2.4983 7.90433L3.89898 8.44107C3.98185 8.2248 4.11291 8.02058 4.50838 7.42735L3.26029 6.59532ZM3.80524 8.75069C3.82902 8.64537 3.86034 8.54189 3.89898 8.44107L2.4983 7.90433C2.43391 8.07237 2.38169 8.24482 2.34206 8.42035L3.80524 8.75069ZM15.11 4.58789C16.4279 4.58789 16.875 4.60139 17.2563 4.75952L17.8309 3.37393C17.1085 3.07439 16.301 3.08789 15.11 3.08789V4.58789ZM20.227 5.82639C19.5663 4.83536 19.1296 4.15601 18.4797 3.72117L17.6456 4.96786C17.9886 5.1974 18.2478 5.56186 18.9789 6.65846L20.227 5.82639ZM17.2563 4.75952C17.3925 4.81603 17.5229 4.88581 17.6456 4.96786L18.4797 3.72117C18.2753 3.58443 18.058 3.46812 17.8309 3.37393L17.2563 4.75952ZM21.75 9.9322C21.75 9.28462 21.7542 8.84699 21.658 8.42048L20.1948 8.75079C20.2458 8.97669 20.25 9.21929 20.25 9.9322H21.75ZM19.4916 7.4274C19.887 8.02057 20.0181 8.22477 20.101 8.44102L21.5016 7.90419C21.3451 7.49592 21.0989 7.13413 20.7396 6.59533L19.4916 7.4274ZM21.658 8.42048C21.6183 8.24486 21.5661 8.07231 21.5016 7.90419L20.101 8.44102C20.1396 8.54189 20.171 8.64541 20.1948 8.75079L21.658 8.42048ZM8.88994 3.08789C7.6988 3.08789 6.89128 3.07439 6.16893 3.37395L6.74355 4.75953C7.12485 4.6014 7.57191 4.58789 8.88994 4.58789V3.08789ZM5.02086 6.6586C5.75195 5.56193 6.01116 5.19744 6.35424 4.96788L5.52009 3.72121C4.87015 4.15608 4.43347 4.83548 3.77277 5.82658L5.02086 6.6586ZM6.16893 3.37395C5.94179 3.46815 5.72446 3.58446 5.52009 3.72121L6.35424 4.96788C6.47686 4.88584 6.60726 4.81605 6.74355 4.75953L6.16893 3.37395ZM17.25 22.5864C19.183 22.5864 20.75 21.0194 20.75 19.0864H19.25C19.25 20.191 18.3546 21.0864 17.25 21.0864V22.5864ZM13.75 19.3364C13.75 21.1314 15.2051 22.5864 17 22.5864V21.0864C16.0335 21.0864 15.25 20.3029 15.25 19.3364H13.75ZM15.25 19.3364C15.25 17.5415 13.7949 16.0864 12 16.0864V17.5864C12.9665 17.5864 13.75 18.3699 13.75 19.3364H15.25ZM10.25 19.3366C10.25 18.3701 11.0336 17.5864 12 17.5864V16.0864C10.205 16.0864 8.75 17.5418 8.75 19.3366H10.25ZM6.74943 21.0872C5.64508 21.0869 4.75 20.1916 4.75 19.0872H3.25C3.25 21.0198 4.8164 22.5867 6.749 22.5872L6.74943 21.0872ZM6.99865 22.5873C8.79425 22.5878 10.25 21.1321 10.25 19.3366H8.75C8.75 20.3037 7.96592 21.0876 6.99908 21.0873L6.99865 22.5873Z" fill="#A3A8A7"/>
</svg>

            </span>
          </div>
          <p v-if="errors.businessType" class="text-red-500 text-sm">{{ errors.businessType }}</p>
        </div>

      <section class="grid grid-cols-2 gap-6">
                <!-- Full Name -->
                <div class="space-y-2">
          <label class="block text-gray-500 text-sm">Full Name <span class="text-sm">(First Name First)</span></label>
          <div class="relative">
            <input
              v-model="form.fullName"
              type="text"
              class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50"
              :class="{ 'border-red-500': errors.fullName }"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.16841 16.959C5.2822 14.4529 7.76737 12.8379 10.5098 12.8379H13.4902C16.2326 12.8379 18.7178 14.4529 19.8316 16.959V16.959C20.8514 19.2535 19.1718 21.8379 16.6609 21.8379H7.33909C4.82819 21.8379 3.14864 19.2535 4.16841 16.959V16.959Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M9 6.83789C9 5.18104 10.3431 3.83789 12 3.83789C13.6569 3.83789 15 5.18104 15 6.83789C15 8.49474 13.6569 9.83789 12 9.83789C10.3431 9.83789 9 8.49474 9 6.83789Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

            </span>
          </div>
          <p v-if="errors.fullName" class="text-red-500 text-sm">{{ errors.fullName }}</p>
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label class="block text-gray-500 text-sm">Email</label>
          <div class="relative">
            <input
              v-model="form.email"
              type="email"
              class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50"
              :class="{ 'border-red-500': errors.email }"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 12.8379C3 10.5082 3 9.34333 3.3806 8.42447C3.88807 7.19933 4.86144 6.22596 6.08658 5.71849C7.00544 5.33789 8.17029 5.33789 10.5 5.33789H13.5C15.8297 5.33789 16.9946 5.33789 17.9134 5.71849C19.1386 6.22596 20.1119 7.19933 20.6194 8.42447C21 9.34333 21 10.5082 21 12.8379V12.8379C21 15.1676 21 16.3325 20.6194 17.2513C20.1119 18.4764 19.1386 19.4498 17.9134 19.9573C16.9946 20.3379 15.8297 20.3379 13.5 20.3379H10.5C8.17029 20.3379 7.00544 20.3379 6.08658 19.9573C4.86144 19.4498 3.88807 18.4764 3.3806 17.2513C3 16.3325 3 15.1676 3 12.8379V12.8379Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M3 8.83789L6.47486 11.5404C8.82448 13.3678 9.99929 14.2815 11.3413 14.46C11.7788 14.5181 12.222 14.5181 12.6595 14.4599C14.0015 14.2814 15.1762 13.3677 17.5258 11.5402L21 8.83789" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

            </span>
          </div>
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
        </div>
      </section>

        <!-- Phone -->
        <div class="space-y-2">
          <label class="block text-gray-500 text-sm">Phone (Mobile)</label>
          <div class="relative flex">
            <div class="relative w-1/3">
              <select
                v-model="form.phone.countryCode"
                class="w-full p-4 border rounded-l-full appearance-none pl-12 pr-8"
              >
                <option v-for="country in countries" :key="country.code" :value="country.code">
                  {{ country.name }} ({{ country.code }})
                </option>
              </select>
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
               <img src="@/assets/img/flag.png" class="h-6 w-6" />
              </span>
              <span class="absolute right-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 10.3379L12 15.3379L17 10.3379" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </span>
            </div>
            <input
              v-model="form.phone.number"
              type="tel"
              class="w-2/3 p-4 border rounded-r-full"
              :class="{ 'border-red-500': errors.phone }"
            />
          </div>
          <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>
        </div>

     <section class="grid grid-cols-2 gap-6">
      <!-- Password -->
      <div class="space-y-2">
          <label class="block text-gray-500 text-sm">Create Password</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50 pr-12"
              :class="{ 'border-red-500': errors.password }"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8.83789V8.83789C17 6.07647 14.7614 3.83789 12 3.83789V3.83789C9.23858 3.83789 7 6.07647 7 8.83789V8.83789M12 13.3379V17.3379M9.5 21.8379H14.5C16.8346 21.8379 18.0019 21.8379 18.8856 21.3656C19.5833 20.9926 20.1548 20.4212 20.5277 19.7235C21 18.8398 21 17.6725 21 15.3379V15.3379C21 13.0033 21 11.8359 20.5277 10.9523C20.1548 10.2546 19.5833 9.68314 18.8856 9.31021C18.0019 8.83789 16.8346 8.83789 14.5 8.83789H9.5C7.16537 8.83789 5.99805 8.83789 5.11441 9.31021C4.4167 9.68314 3.84525 10.2546 3.47231 10.9523C3 11.8359 3 13.0033 3 15.3379V15.3379C3 17.6725 3 18.8398 3.47231 19.7235C3.84525 20.4212 4.4167 20.9926 5.11441 21.3656C5.99805 21.8379 7.16537 21.8379 9.5 21.8379Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password -->
        <div class="space-y-2">
          <label class="block text-gray-500 text-sm">Confirm Password</label>
          <div class="relative">
            <input
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50 pr-12"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8.83789V8.83789C17 6.07647 14.7614 3.83789 12 3.83789V3.83789C9.23858 3.83789 7 6.07647 7 8.83789V8.83789M12 13.3379V17.3379M9.5 21.8379H14.5C16.8346 21.8379 18.0019 21.8379 18.8856 21.3656C19.5833 20.9926 20.1548 20.4212 20.5277 19.7235C21 18.8398 21 17.6725 21 15.3379V15.3379C21 13.0033 21 11.8359 20.5277 10.9523C20.1548 10.2546 19.5833 9.68314 18.8856 9.31021C18.0019 8.83789 16.8346 8.83789 14.5 8.83789H9.5C7.16537 8.83789 5.99805 8.83789 5.11441 9.31021C4.4167 9.68314 3.84525 10.2546 3.47231 10.9523C3 11.8359 3 13.0033 3 15.3379V15.3379C3 17.6725 3 18.8398 3.47231 19.7235C3.84525 20.4212 4.4167 20.9926 5.11441 21.3656C5.99805 21.8379 7.16537 21.8379 9.5 21.8379Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</p>
        </div>
     </section>
      </div>


      <div v-if="currentStep === 2" class="space-y-6">
          
        <div class="space-y-2">
          <label class="block text-gray-500 text-sm">Business Name</label>
          <div class="relative">
            <input
              v-model="form.businessName"
              type="text"
              class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50"
              :class="{ 'border-red-500': errors.businessName }"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.75 11.2879C20.75 10.8736 20.4142 10.5379 20 10.5379C19.5858 10.5379 19.25 10.8736 19.25 11.2879H20.75ZM8.66228 10.0132L9.37379 10.2503L8.66228 10.0132ZM9 9L9.71151 8.76283C9.60943 8.45657 9.32282 8.25 9 8.25C8.67718 8.25 8.39057 8.45657 8.28849 8.76283L9 9ZM9.36754 10.1026L8.65603 10.3398L9.36754 10.1026ZM14.6325 10.1026L15.344 10.3398V10.3398L14.6325 10.1026ZM15 9L15.7115 8.76283C15.6094 8.45657 15.3228 8.25 15 8.25C14.6772 8.25 14.3906 8.45657 14.2885 8.76283L15 9ZM15.3377 10.0132L14.6262 10.2503L15.3377 10.0132ZM3.07365 7.74763L2.34206 7.58246L3.07365 7.74763ZM3.88434 6.17344L3.26029 5.75743L3.88434 6.17344ZM3.19864 7.33481L2.4983 7.06644L3.19864 7.33481ZM17.5436 3.22883L17.2563 3.92163L17.5436 3.22883ZM19.603 5.40454L18.9789 5.82057L19.603 5.40454ZM20.9264 7.74775L20.1948 7.9129L20.9264 7.74775ZM20.1156 6.17347L19.4916 6.58951L20.1156 6.17347ZM20.8013 7.33471L21.5016 7.0663L20.8013 7.33471ZM6.45624 3.22885L6.16893 2.53606L6.45624 3.22885ZM4.39681 5.4047L3.77277 4.98869L4.39681 5.4047ZM5.93717 3.50666L5.52009 2.88332L5.93717 3.50666ZM6.74922 20.9993L6.74943 20.2493L6.74922 20.9993ZM6.99908 20.2494L6.74943 20.2493L6.749 21.7493L6.99865 21.7494L6.99908 20.2494ZM17.25 20.2485H17V21.7485H17.25V20.2485ZM4.75 18.2493V11.2879H3.25V18.2493H4.75ZM19.25 11.2879V18.2485H20.75V11.2879H19.25ZM8.88994 3.75H15.11V2.25H8.88994V3.75ZM9.37379 10.2503L9.71151 9.23717L8.28849 8.76283L7.95077 9.776L9.37379 10.2503ZM8.28849 9.23717L8.65603 10.3398L10.0791 9.86546L9.71151 8.76283L8.28849 9.23717ZM15.344 10.3398L15.7115 9.23717L14.2885 8.76283L13.9209 9.86546L15.344 10.3398ZM14.2885 9.23717L14.6262 10.2503L16.0492 9.776L15.7115 8.76283L14.2885 9.23717ZM4.50838 6.58945L5.02086 5.82071L3.77277 4.98869L3.26029 5.75743L4.50838 6.58945ZM18.9789 5.82057L19.4916 6.58951L20.7396 5.75744L20.227 4.9885L18.9789 5.82057ZM18.0943 12.75C20.1133 12.75 21.75 11.1133 21.75 9.09431H20.25C20.25 10.2849 19.2849 11.25 18.0943 11.25V12.75ZM12 12.75C13.5172 12.75 14.8642 11.7792 15.344 10.3398L13.9209 9.86546C13.6453 10.6923 12.8716 11.25 12 11.25V12.75ZM8.65603 10.3398C9.13581 11.7792 10.4828 12.75 12 12.75V11.25C11.1284 11.25 10.3547 10.6923 10.0791 9.86546L8.65603 10.3398ZM14.6262 10.2503C15.1238 11.7431 16.5208 12.75 18.0943 12.75V11.25C17.1664 11.25 16.3427 10.6563 16.0492 9.776L14.6262 10.2503ZM5.90569 12.75C7.47922 12.75 8.8762 11.7431 9.37379 10.2503L7.95077 9.776C7.65734 10.6563 6.83357 11.25 5.90569 11.25V12.75ZM2.25 9.09431C2.25 11.1133 3.88671 12.75 5.90569 12.75V11.25C4.71514 11.25 3.75 10.2849 3.75 9.09431H2.25ZM3.75 9.09431C3.75 8.38134 3.75423 8.13871 3.80524 7.9128L2.34206 7.58246C2.24577 8.009 2.25 8.44668 2.25 9.09431H3.75ZM3.26029 5.75743C2.90106 6.29629 2.65477 6.65812 2.4983 7.06644L3.89898 7.60318C3.98185 7.38691 4.11291 7.18269 4.50838 6.58945L3.26029 5.75743ZM3.80524 7.9128C3.82902 7.80748 3.86034 7.704 3.89898 7.60318L2.4983 7.06644C2.43391 7.23448 2.38169 7.40693 2.34206 7.58246L3.80524 7.9128ZM15.11 3.75C16.4279 3.75 16.875 3.7635 17.2563 3.92163L17.8309 2.53604C17.1085 2.2365 16.301 2.25 15.11 2.25V3.75ZM20.227 4.9885C19.5663 3.99747 19.1296 3.31812 18.4797 2.88327L17.6456 4.12996C17.9886 4.35951 18.2478 4.72397 18.9789 5.82057L20.227 4.9885ZM17.2563 3.92163C17.3925 3.97814 17.5229 4.04792 17.6456 4.12996L18.4797 2.88327C18.2753 2.74654 18.058 2.63023 17.8309 2.53604L17.2563 3.92163ZM21.75 9.09431C21.75 8.44673 21.7542 8.0091 21.658 7.58259L20.1948 7.9129C20.2458 8.1388 20.25 8.3814 20.25 9.09431H21.75ZM19.4916 6.58951C19.887 7.18268 20.0181 7.38688 20.101 7.60313L21.5016 7.0663C21.3451 6.65803 21.0989 6.29624 20.7396 5.75744L19.4916 6.58951ZM21.658 7.58259C21.6183 7.40697 21.5661 7.23442 21.5016 7.0663L20.101 7.60313C20.1396 7.704 20.171 7.80752 20.1948 7.9129L21.658 7.58259ZM8.88994 2.25C7.6988 2.25 6.89128 2.2365 6.16893 2.53606L6.74355 3.92164C7.12485 3.7635 7.57191 3.75 8.88994 3.75V2.25ZM5.02086 5.82071C5.75195 4.72404 6.01116 4.35955 6.35424 4.12999L5.52009 2.88332C4.87015 3.31819 4.43347 3.99759 3.77277 4.98869L5.02086 5.82071ZM6.16893 2.53606C5.94179 2.63026 5.72446 2.74657 5.52009 2.88332L6.35424 4.12999C6.47686 4.04794 6.60726 3.97816 6.74355 3.92164L6.16893 2.53606ZM17.25 21.7485C19.183 21.7485 20.75 20.1815 20.75 18.2485H19.25C19.25 19.3531 18.3546 20.2485 17.25 20.2485V21.7485ZM13.75 18.4985C13.75 20.2935 15.2051 21.7485 17 21.7485V20.2485C16.0335 20.2485 15.25 19.465 15.25 18.4985H13.75ZM15.25 18.4985C15.25 16.7036 13.7949 15.2485 12 15.2485V16.7485C12.9665 16.7485 13.75 17.532 13.75 18.4985H15.25ZM10.25 18.4988C10.25 17.5322 11.0336 16.7485 12 16.7485V15.2485C10.205 15.2485 8.75 16.7039 8.75 18.4988H10.25ZM6.74943 20.2493C5.64508 20.249 4.75 19.3537 4.75 18.2493H3.25C3.25 20.1819 4.8164 21.7488 6.749 21.7493L6.74943 20.2493ZM6.99865 21.7494C8.79425 21.7499 10.25 20.2942 10.25 18.4988H8.75C8.75 19.4658 7.96592 20.2497 6.99908 20.2494L6.99865 21.7494Z" fill="#A3A8A7"/>
</svg>

            </span>
          </div>
          <p v-if="errors.businessName" class="text-red-500 text-sm">{{ errors.businessName }}</p>
        </div>
        <div class="space-y-2">
  <label class="block text-gray-500 text-sm">What type of services do you offer?</label>
  
  <div class="relative">
    <!-- Selected Services -->
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
          class="text-white bg-red-500 hover:bg-red-700 rounded-full px-2"
        >
          ×
        </button>
      </span>
    </div>

    <!-- Dropdown for Selecting Services -->
    <select
      v-model="selectedService"
      @change="addService"
      class="w-full p-4 border rounded-full outline-none bg-gray-50"
    >
      <option value="" disabled>Select a service</option>
      <option v-for="service in allowedServices" :key="service" :value="service">
        {{ service }}
      </option>
    </select>
  </div>

  <!-- Input Field for 'Other' Service -->
  <div v-if="form.services.includes('Other')" class="relative mt-2">
    <input
      v-model="form.otherServiceType"
      type="text"
      class="w-full p-4 border rounded-full outline-none border-[0.5px] bg-gray-50"
      placeholder="Please specify your service"
    />
  </div>
</div>



        <div class="space-y-2">
          <label class="block text-gray-500 text-sm">Business Location Type</label>
          <select
            v-model="form.businessLocationType"
            class="w-full p-4 border rounded-full appearance-none pl-12"
          >
            <option value="PHYSICAL">Physical</option>
            <option value="ONLINE">Virtual</option>
          </select>
        </div>


        <div class="space-y-2">
          <label class="block text-gray-500 text-sm">Enter your {{ form.businessType === 'Freelancer' ? 'home' : 'business' }} address (Street, City, State)</label>
          <div class="relative">
            <input
              v-model="form.businessAddress"
              type="text"
              class="w-full p-4 border rounded-full pl-12 outline-none border-[0.5px] bg-gray-50"
              :class="{ 'border-red-500': errors.businessAddress }"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0001 3C7.02956 3 2.99997 7 4.00012 12C4.66541 15.3259 7.98533 18.4306 10.1339 20.1367C10.8361 20.6944 11.1873 20.9732 11.7325 21.0468C11.8836 21.0672 12.1166 21.0672 12.2678 21.0468C12.813 20.9732 13.1641 20.6944 13.8664 20.1368C16.015 18.4306 19.335 15.3259 20.0001 12C21 7 16.9707 3 12.0001 3Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M15 11.15C15 12.8069 13.6569 14.15 12 14.15C10.3431 14.15 9 12.8069 9 11.15C9 9.49315 10.3431 8.15 12 8.15C13.6569 8.15 15 9.49315 15 11.15Z" stroke="#A3A8A7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

            </span>
          </div>
          <p v-if="errors.businessAddress" class="text-red-500 text-sm">{{ errors.businessAddress }}</p>
        </div>
      </div>


      <div v-if="currentStep === 3" class="space-y-6">
        <div class="text-center space-y-4 py-5">
          <h2 class="text-3xl font-medium">Enter verification code</h2>
          <p class="text-[#A3A8A7] font-light">
            Almost there! We've sent a 4-digit code to<br/>
            <span class="text-black">{{ form.email }}</span>
            Enter it below to verify your account.
          </p>
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
          :disabled="processing"
        >
          {{ processing ? 'Verifying...' : 'Verify' }}
        </button>
        <button
          v-else
          type="button"
          @click="nextStep"
          class="w-full p-4 bg-[#282B2A] disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-full hover:bg-[#282B2A]"
          :disabled="processing"
        >
          {{ processing ? 'Processing...' : 'Continue' }}
        </button>
      </div>

      <p v-if="currentStep === 3" class="text-center font-light text-gray-500 pt-10">
        Didn't receive the code? 
        <button type="button" class="text-[#282B2A] font-semibold" @click="resendOtp">
          Resend OTP
        </button>
      </p>
    </form>

    <OnboardingFooter />

    <CoreFullScreenLoader :visible="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
  import { use_auth_verify_user } from '@/composables/auth/useVerifyUser'
  import { use_auth_resend_verify_email } from '@/composables/auth/useResendEmail'
import { useCreateBusiness } from '@/composables/auth/useCreateBusiness'

const {  verifyUser, loading: processing, setPayload } = use_auth_verify_user()
const { resendVerifyEmail, loading: resending } = use_auth_resend_verify_email()

interface FormData {
  businessType: 'Freelancer' | 'Business'
  fullName: string
  email: string
  phone: {
    countryCode: string
    number: string
  }
  password: string
  confirmPassword: string
  businessName: string
  services: string[]
  businessLocationType: string
  businessAddress: string
  otpCode: string[]
}

interface Credential {
  firstName: string
  lastName: string
  email: string
  provider: string
  password: string
  role: string
  // businessLocation?: string
  serviceProvider?: {
    serviceRole: string
    businessName?: string
    serviceTypes: string[]
    otherServiceType: string
    businessLocationType: string
    businessLocation?: string
  }
}

const { setCredentials, credential, register, loading } = useCreateBusiness()

const router = useRouter()
const route = useRoute()

const currentStep = ref(1)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const newService = ref('')
const isSubmitting = ref(false)

const form = reactive<FormData>({
  businessType: 'Freelancer',
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

const errors = reactive({
  businessType: '',
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  businessName: '',
  businessAddress: ''
})

const countries = [
  { name: 'Nigeria', code: '+234' },
]

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  // Validate common fields for both Freelancer and Business
  if (!form.businessType) {
    errors.businessType = 'Business type is required'
    isValid = false
  }

  if (!form.fullName) {
    errors.fullName = 'Full name is required'
    isValid = false
  }

  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
    isValid = false
  }

  if (!form.phone.number) {
    errors.phone = 'Phone number is required'
    isValid = false
  } else if (!/^\d{10}$/.test(form.phone.number)) {
    errors.phone = 'Phone number must be 10 digits'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long'
    isValid = false
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  // Validate business-specific fields only when on step 2
  if (currentStep.value === 2) {
    if (!form.businessAddress) {
      errors.businessAddress = 'Address is required'
      isValid = false
    }

    if (form.businessType === 'Business') {
      if (!form.businessName) {
        errors.businessName = 'Business name is required'
        isValid = false
      }
    }
  }

  return isValid
}

const allowedServices = [
  "HairStyling",
  "MakeupArtist",
  "NailTechnician",
  "MassageTherapy",
  "Beautician",
  "Barber",
  "TattooArtist",
  "PiercingArtist",
  "PersonalTrainer",
  "Nutritionist",
  "YogaInstructor",
  "Other"
];

const selectedService = ref("");

const addService = () => {
  if (selectedService.value && !form.services.includes(selectedService.value)) {
    form.services.push(selectedService.value);
  }
  selectedService.value = "";
};

const removeService = (service: string) => {
  form.services = form.services.filter(s => s !== service);
  if (service === "Other") {
    form.otherServiceType = "";
  }
};


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

const updateUrlStep = (step: number) => {
  router.replace({ query: { ...route.query, step: step.toString() } })
}

watch(() => route.query.step, (newStep) => {
  if (newStep) {
    currentStep.value = parseInt(newStep as string)
  }
})

onMounted(() => {
  const stepFromUrl = route.query.step
  if (stepFromUrl) {
    currentStep.value = parseInt(stepFromUrl as string)
  }
})

const submitFormData = async () => {
  isSubmitting.value = true
  try {
    const mappedCredential: Credential = {
      firstName: form.fullName.split(' ')[0],
      lastName: form.fullName.split(' ').slice(1).join(' '),
      email: form.email,
      provider: "EMAIL",
      password: form.password,
      role: "SERVICEPROVIDER",
      businessLocation: form.businessAddress,
      serviceProvider: {
        serviceRole: form.businessType === 'Freelancer' ? "FREELANCER" : "REGISTEREDBUSINESS",
        businessName: form.businessName,
        serviceTypes: form.services.length > 0 ? form.services : ["Other"],
        otherServiceType: form.services.length > 0 ? form.services.join(', ') : "",
        businessLocationType: form.businessLocationType.toUpperCase(),
        // businessLocation: form.businessAddress,
      }
    }

    // Set credentials in the composable
    setCredentials(mappedCredential)
    await register().then((res) => {
       if(res.type !== 'ERROR'){
        currentStep.value = 3
        updateUrlStep(3)
       }
    })
     
  } catch (error) {
    console.error('Error submitting form data:', error)
    // Handle error (e.g., show error message to user)
  } finally {
    isSubmitting.value = false
  }
}

const nextStep = async () => {
  if (validateForm()) {
    if (currentStep.value === 1) {
      currentStep.value = 2
      updateUrlStep(2)
    } else if (currentStep.value === 2) {
      await submitFormData()
    }
  }
}

const resendOtp = () => {
  console.log('Resending OTP...')
  // Implement OTP resend logic
}

const handleSubmit = async () => {
  if (validateForm()) {
    if (currentStep.value < 3) {
      await nextStep()
    } else {
      isSubmitting.value = true
      try {
        // Verify OTP
        const payloadOj = {
            email: form.email,
            otp: form.otpCode.join('')
        }
        // await register(form.otpCode.join(''))
        setPayload(payloadOj)
        await verifyUser().then((res: any) => {
          console.log(res, 'Registration complete!')
          if(res.type !== 'ERROR'){
             window.location.href = '/business/success'
            router.push('/business/success')
          }
          //  window.location.href = '/account-success'
          // router.push('/dashboard')
        })
      } catch (error) {
        console.error('Error during OTP verification:', error)
        // Handle error (e.g., show error message to user)
      } finally {
        isSubmitting.value = false
      }
    }
  }
}
</script>