<template>
  <section class="bg-gray-50 py-16 lg:py-24">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left Image -->
        <div class="animate-fade-in-left">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="@/assets/img/why-choose.png" 
              alt="Professional hairstylist working with client"
              class="w-full h-[500px] lg:h-[600px] object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
        
        <!-- Right Content -->
        <div class="space-y-8 animate-fade-in-right">
          <h2 class="text-4xl lg:text-[49px] font-semibold text-[#045940] leading-tight">
            Why Choose Elysian Beauty?
          </h2>
          
          <div class="space-y-8 stagger-children">
            <!-- Feature 1 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8  flex items-center justify-center mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.85019 8.61912C3.70423 7.96165 3.72665 7.27796 3.91535 6.63146C4.10405 5.98496 4.45294 5.39657 4.92966 4.92084C5.40638 4.44512 5.9955 4.09747 6.6424 3.91012C7.2893 3.72277 7.97303 3.70179 8.63019 3.84912C8.9919 3.28342 9.4902 2.81788 10.0791 2.49541C10.6681 2.17293 11.3287 2.00391 12.0002 2.00391C12.6716 2.00391 13.3323 2.17293 13.9212 2.49541C14.5102 2.81788 15.0085 3.28342 15.3702 3.84912C16.0284 3.70114 16.7133 3.72203 17.3612 3.90983C18.0091 4.09764 18.599 4.44626 19.076 4.92327C19.5531 5.40029 19.9017 5.99019 20.0895 6.63812C20.2773 7.28605 20.2982 7.97095 20.1502 8.62912C20.7159 8.99083 21.1814 9.48912 21.5039 10.0781C21.8264 10.667 21.9954 11.3277 21.9954 11.9991C21.9954 12.6706 21.8264 13.3312 21.5039 13.9202C21.1814 14.5091 20.7159 15.0074 20.1502 15.3691C20.2975 16.0263 20.2765 16.71 20.0892 17.3569C19.9018 18.0038 19.5542 18.5929 19.0785 19.0697C18.6027 19.5464 18.0144 19.8953 17.3679 20.084C16.7213 20.2727 16.0377 20.2951 15.3802 20.1491C15.019 20.717 14.5203 21.1845 13.9303 21.5084C13.3404 21.8324 12.6782 22.0022 12.0052 22.0022C11.3322 22.0022 10.67 21.8324 10.0801 21.5084C9.49011 21.1845 8.99143 20.717 8.63019 20.1491C7.97303 20.2965 7.2893 20.2755 6.6424 20.0881C5.9955 19.9008 5.40638 19.5531 4.92966 19.0774C4.45294 18.6017 4.10405 18.0133 3.91535 17.3668C3.72665 16.7203 3.70423 16.0366 3.85019 15.3791C3.28015 15.0184 2.81061 14.5193 2.48524 13.9283C2.15988 13.3374 1.98926 12.6737 1.98926 11.9991C1.98926 11.3245 2.15988 10.6609 2.48524 10.0699C2.81061 9.47895 3.28015 8.97988 3.85019 8.61912Z" stroke="#505554" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12L11 14L15 10" stroke="#505554" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div>
                <h3 class="text-xl font-semibold text-[#505554] mb-2">
                  Verified Beauty Professionals
                </h3>
                <p class="text-[#505554] font-[400] leading-relaxed">
                  We handpick and vet every hairstylist, makeup artist, and beauty technician to 
                  ensure you get professional-grade service, every time.
                </p>
              </div>
            </div>
            
            <!-- Feature 2 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8  flex items-center justify-center mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.85019 8.61912C3.70423 7.96165 3.72665 7.27796 3.91535 6.63146C4.10405 5.98496 4.45294 5.39657 4.92966 4.92084C5.40638 4.44512 5.9955 4.09747 6.6424 3.91012C7.2893 3.72277 7.97303 3.70179 8.63019 3.84912C8.9919 3.28342 9.4902 2.81788 10.0791 2.49541C10.6681 2.17293 11.3287 2.00391 12.0002 2.00391C12.6716 2.00391 13.3323 2.17293 13.9212 2.49541C14.5102 2.81788 15.0085 3.28342 15.3702 3.84912C16.0284 3.70114 16.7133 3.72203 17.3612 3.90983C18.0091 4.09764 18.599 4.44626 19.076 4.92327C19.5531 5.40029 19.9017 5.99019 20.0895 6.63812C20.2773 7.28605 20.2982 7.97095 20.1502 8.62912C20.7159 8.99083 21.1814 9.48912 21.5039 10.0781C21.8264 10.667 21.9954 11.3277 21.9954 11.9991C21.9954 12.6706 21.8264 13.3312 21.5039 13.9202C21.1814 14.5091 20.7159 15.0074 20.1502 15.3691C20.2975 16.0263 20.2765 16.71 20.0892 17.3569C19.9018 18.0038 19.5542 18.5929 19.0785 19.0697C18.6027 19.5464 18.0144 19.8953 17.3679 20.084C16.7213 20.2727 16.0377 20.2951 15.3802 20.1491C15.019 20.717 14.5203 21.1845 13.9303 21.5084C13.3404 21.8324 12.6782 22.0022 12.0052 22.0022C11.3322 22.0022 10.67 21.8324 10.0801 21.5084C9.49011 21.1845 8.99143 20.717 8.63019 20.1491C7.97303 20.2965 7.2893 20.2755 6.6424 20.0881C5.9955 19.9008 5.40638 19.5531 4.92966 19.0774C4.45294 18.6017 4.10405 18.0133 3.91535 17.3668C3.72665 16.7203 3.70423 16.0366 3.85019 15.3791C3.28015 15.0184 2.81061 14.5193 2.48524 13.9283C2.15988 13.3374 1.98926 12.6737 1.98926 11.9991C1.98926 11.3245 2.15988 10.6609 2.48524 10.0699C2.81061 9.47895 3.28015 8.97988 3.85019 8.61912Z" stroke="#505554" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12L11 14L15 10" stroke="#505554" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div>
                <h3 class="text-xl font-semibold text-[#505554] mb-2">
                  Easy Online Booking
                </h3>
                <p class="text-[#505554] font-[400] leading-relaxed">
                  Schedule beauty services in just a few clicks. Browse profiles, compare prices, 
                  and pick the perfect professional for your look.
                </p>
              </div>
            </div>
            
            <!-- Feature 3 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8  flex items-center justify-center mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.85019 8.61912C3.70423 7.96165 3.72665 7.27796 3.91535 6.63146C4.10405 5.98496 4.45294 5.39657 4.92966 4.92084C5.40638 4.44512 5.9955 4.09747 6.6424 3.91012C7.2893 3.72277 7.97303 3.70179 8.63019 3.84912C8.9919 3.28342 9.4902 2.81788 10.0791 2.49541C10.6681 2.17293 11.3287 2.00391 12.0002 2.00391C12.6716 2.00391 13.3323 2.17293 13.9212 2.49541C14.5102 2.81788 15.0085 3.28342 15.3702 3.84912C16.0284 3.70114 16.7133 3.72203 17.3612 3.90983C18.0091 4.09764 18.599 4.44626 19.076 4.92327C19.5531 5.40029 19.9017 5.99019 20.0895 6.63812C20.2773 7.28605 20.2982 7.97095 20.1502 8.62912C20.7159 8.99083 21.1814 9.48912 21.5039 10.0781C21.8264 10.667 21.9954 11.3277 21.9954 11.9991C21.9954 12.6706 21.8264 13.3312 21.5039 13.9202C21.1814 14.5091 20.7159 15.0074 20.1502 15.3691C20.2975 16.0263 20.2765 16.71 20.0892 17.3569C19.9018 18.0038 19.5542 18.5929 19.0785 19.0697C18.6027 19.5464 18.0144 19.8953 17.3679 20.084C16.7213 20.2727 16.0377 20.2951 15.3802 20.1491C15.019 20.717 14.5203 21.1845 13.9303 21.5084C13.3404 21.8324 12.6782 22.0022 12.0052 22.0022C11.3322 22.0022 10.67 21.8324 10.0801 21.5084C9.49011 21.1845 8.99143 20.717 8.63019 20.1491C7.97303 20.2965 7.2893 20.2755 6.6424 20.0881C5.9955 19.9008 5.40638 19.5531 4.92966 19.0774C4.45294 18.6017 4.10405 18.0133 3.91535 17.3668C3.72665 16.7203 3.70423 16.0366 3.85019 15.3791C3.28015 15.0184 2.81061 14.5193 2.48524 13.9283C2.15988 13.3374 1.98926 12.6737 1.98926 11.9991C1.98926 11.3245 2.15988 10.6609 2.48524 10.0699C2.81061 9.47895 3.28015 8.97988 3.85019 8.61912Z" stroke="#505554" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12L11 14L15 10" stroke="#505554" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div>
                <h3 class="text-xl font-semibold text-[#505554] mb-2">
                  Home & Salon Services Available
                </h3>
                <p class="text-[#505554] font-[400] leading-relaxed">
                  Prefer glam at home? Or want to visit a professional's studio? Elysian lets you 
                  choose what works best for you.
                </p>
              </div>
            </div>
            
            <!-- Feature 4 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8  flex items-center justify-center mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.85019 8.61912C3.70423 7.96165 3.72665 7.27796 3.91535 6.63146C4.10405 5.98496 4.45294 5.39657 4.92966 4.92084C5.40638 4.44512 5.9955 4.09747 6.6424 3.91012C7.2893 3.72277 7.97303 3.70179 8.63019 3.84912C8.9919 3.28342 9.4902 2.81788 10.0791 2.49541C10.6681 2.17293 11.3287 2.00391 12.0002 2.00391C12.6716 2.00391 13.3323 2.17293 13.9212 2.49541C14.5102 2.81788 15.0085 3.28342 15.3702 3.84912C16.0284 3.70114 16.7133 3.72203 17.3612 3.90983C18.0091 4.09764 18.599 4.44626 19.076 4.92327C19.5531 5.40029 19.9017 5.99019 20.0895 6.63812C20.2773 7.28605 20.2982 7.97095 20.1502 8.62912C20.7159 8.99083 21.1814 9.48912 21.5039 10.0781C21.8264 10.667 21.9954 11.3277 21.9954 11.9991C21.9954 12.6706 21.8264 13.3312 21.5039 13.9202C21.1814 14.5091 20.7159 15.0074 20.1502 15.3691C20.2975 16.0263 20.2765 16.71 20.0892 17.3569C19.9018 18.0038 19.5542 18.5929 19.0785 19.0697C18.6027 19.5464 18.0144 19.8953 17.3679 20.084C16.7213 20.2727 16.0377 20.2951 15.3802 20.1491C15.019 20.717 14.5203 21.1845 13.9303 21.5084C13.3404 21.8324 12.6782 22.0022 12.0052 22.0022C11.3322 22.0022 10.67 21.8324 10.0801 21.5084C9.49011 21.1845 8.99143 20.717 8.63019 20.1491C7.97303 20.2965 7.2893 20.2755 6.6424 20.0881C5.9955 19.9008 5.40638 19.5531 4.92966 19.0774C4.45294 18.6017 4.10405 18.0133 3.91535 17.3668C3.72665 16.7203 3.70423 16.0366 3.85019 15.3791C3.28015 15.0184 2.81061 14.5193 2.48524 13.9283C2.15988 13.3374 1.98926 12.6737 1.98926 11.9991C1.98926 11.3245 2.15988 10.6609 2.48524 10.0699C2.81061 9.47895 3.28015 8.97988 3.85019 8.61912Z" stroke="#505554" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12L11 14L15 10" stroke="#505554" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div>
                <h3 class="text-xl font-semibold text-[#505554] mb-2">
                  Pay Securely Online
                </h3>
                <p class="text-[#505554] font-[400] leading-relaxed">
                  No cash hassles. Pay quickly and safely through our secure online payment 
                  system, and only release payment once the job is done.
                </p>
              </div>
            </div>
          </div>
          
          <button class="group inline-flex items-center gap-3 px-8 py-4 border border-gray-800 rounded-full text-[#505554] font-medium text-lg hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105">
            Learn More
            <svg class="ml-3" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.91667 0.75V2.41667H10.4083L0.75 12.075L1.925 13.25L11.5833 3.59167V9.08333H13.25V0.75H4.91667Z" fill="#121212"/>
              </svg>

          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>