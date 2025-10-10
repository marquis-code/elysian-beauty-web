<template>
  <div class="min-h-screen">
    <div class="relative h-64 bg-gray-200">
      <img
        src="@/assets/img/about4.png"
        alt="Cover"
        class="w-full h-full object-cover"
      />
      <button
        @click="handleCoverChange"
        class="absolute top-4 right-4 px-4 py-2 bg-white rounded-full text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50"
      >
        Change Cover
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      <input
        ref="coverInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onCoverImageSelected"
      />
    </div>


    <div class="container mx-auto px-4 -mt-20 relative">
      <div class="flex flex-col md:flex-row items-start gap-4">
        <img
          src="@/assets/img/user-avatar.svg"
          alt="Profile"
          class="w-32 h-32 rounded-full border-4 border-white bg-white"
        />
        <!-- <img
          :src="profileImage"
          alt="Profile"
          class="w-32 h-32 rounded-full border-4 border-white bg-white"
        /> -->
        <div class="flex-1 mt-4 md:mt-24">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-semibold">{{ `${user?.firstName || 'User'} ${user?.lastName || ''}` }}</h2>
              <p class="text-gray-600">{{ user?.role ?? 'Professional' }}</p>
            </div>
            <div class="flex gap-2">
              <button
                @click="shareProfile"
                class="px-4 py-2 border rounded-full hover:bg-gray-50 text-sm flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>


      <div class="mt-8">
        <nav class="flex gap-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-2.5 px-4 text-sm font-medium relative',
              activeTab === tab.id
                ? 'text-white bg-[#282B2A] rounded-full'
                : 'text-[#A3A8A7] hover:text-gray-700'
            ]"
          >
            {{ tab.name }}
            <span
              v-if="tab.count"
              class="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full"
            >{{ tab.count }}</span>
          </button>
        </nav>
      </div>


      <div class="py-8">

        <div v-if="activeTab === 'details'">
          <h3 class="text-lg font-semibold mb-2">Details</h3>
          <p class="text-[#475467] font-light mb-6">Please enter your name and email to update your details.</p>
          
          <form @submit.prevent="updateProfile" class="space-y-6 divide divide-y divide-gray-100 w-full">
            <div class="flex justify-between items-center">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              </div>
              <div class="max-w-2xl w-full">
                <input
                  v-model="form.firstName"
                  type="text"
                  class="w-full px-4 py-4 border-[0.5px] border-gray-100 outline-none rounded-lg"
                  placeholder="Olalekan"
                />
              </div>
            </div>

            <div class="flex justify-between items-center pt-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              </div>
              <div class="max-w-2xl w-full">
                <input
                  v-model="form.lastName"
                  type="text"
                  class="w-full px-4 py-4 border-[0.5px] border-gray-100 outline-none rounded-lg"
                  placeholder="Olasehinde"
                />
              </div>
            </div>

            <div class="flex justify-between items-center pt-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              </div>
              <div class="max-w-2xl w-full">
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-4 py-4 border-[0.5px] border-gray-100 outline-none rounded-lg"
                  placeholder="Olasehindeolalekan@example.com"
                />
              </div>
            </div>

            <div class="flex justify-end gap-2 pt-6">
              <button
                type="button"
                class="px-6 py-3 text-sm border rounded-full hover:bg-gray-50"
                @click="resetForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-3 text-sm bg-[#045940] text-white rounded-full hover:bg-[#034530]"
              >
                Update Details
              </button>
            </div>
          </form>
        </div>


        <div v-if="activeTab === 'password'">
          <h3 class="text-lg font-semibold mb-2">Password</h3>
          <p class="text-[#475467] font-light mb-6">Update your password to keep your account secure.</p>
          
          <form @submit.prevent="updatePassword" class="space-y-6 divide divide-y divide-gray-100 w-full">
            <div class="flex justify-between items-center">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              </div>
              <div class="max-w-2xl w-full">
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  class="w-full px-4 py-4 border-[0.5px] border-gray-100 outline-none rounded-lg"
                  placeholder="Enter current password"
                />
              </div>
            </div>

            <div class="flex justify-between items-center pt-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              </div>
              <div class="max-w-2xl w-full">
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  class="w-full px-4 py-4 border-[0.5px] border-gray-100 outline-none rounded-lg"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div class="flex justify-end gap-2 pt-6">
              <button
                type="button"
                class="px-6 py-3 text-sm border rounded-full hover:bg-gray-50"
                @click="resetPasswordForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-3 text-sm bg-[#045940] text-white rounded-full hover:bg-[#034530]"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

           <div v-if="activeTab === 'reviews'">
          <h2 class="text-xl font-semibold mb-8">{{ reviewsList.length }} Reviews</h2>
          
          <!-- Loading State -->
          <div v-if="fetchingReviews" class="flex items-center justify-center py-12">
            <div class="space-y-4 w-full">
              <div class="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div class="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div class="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="reviewsList.length === 0" class="text-center flex justify-center items-center flex-col py-12">
            <img src="@/assets/img/empty-state.svg" />
            <p class="text-gray-500 text-lg">No reviews yet</p>
            <p class="text-gray-400 text-sm mt-2">Your reviews will appear here once customers leave feedback</p>
          </div>

          <!-- Reviews Grid -->
          <div v-else class="grid md:grid-cols-[300px,1fr] gap-8">

            <div class="space-y-6">
              <div>
                <div class="text-6xl font-bold">{{ calculateAverageRating }}</div>
                <p class="text-gray-600 mt-2">Get a quick overview of your customers' feedback.</p>
              </div>
              
              <div class="space-y-2">
                <div v-for="rating in calculatedRatings" :key="rating.stars" class="flex items-center gap-2">
                  <span class="w-4 text-sm">{{ rating.stars }}</span>
                  <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gray-900"
                      :style="{ width: `${rating.percentage}%` }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-500 w-8 text-right">{{ rating.count }}</span>
                </div>
              </div>
            </div>


            <div class="space-y-8">
              <div v-for="review in reviewsList" :key="review.id" class="pb-8 border-b last:border-b-0">
                <div class="flex items-center gap-2 mb-2">
                  <div class="flex">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      :class="[
                        'w-5 h-5',
                        i <= Math.round(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      ]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="font-bold">{{ review.rating.toFixed(1) }}</span>
                  <span class="text-gray-500">|</span>
                  <span class="text-gray-500">{{ formatDate(review.createdAt) }}</span>
                  <span class="text-gray-500">|</span>
                  <span class="text-gray-500">{{ review.reviewer }}</span>
                </div>
                
                <h3 class="text-xl font-semibold mb-2">{{ review.topic }}</h3>
                <p class="text-gray-600 mb-4">{{ review.review }}</p>
                
                <button class="text-green-700 font-medium hover:underline">Reply</button>
              </div>
            </div>
          </div>
        </div>
<!-- 
        <div v-if="activeTab === 'reviews'">
          <h2 class="text-3xl font-bold mb-8">120 Reviews</h2>
          
          <div class="grid md:grid-cols-[300px,1fr] gap-8">

            <div class="space-y-6">
              <div>
                <div class="text-6xl font-bold">4.8</div>
                <p class="text-gray-600 mt-2">Get a quick overview of your customers' feedback.</p>
              </div>
              
              <div class="space-y-2">
                <div v-for="rating in ratings" :key="rating.stars" class="flex items-center gap-2">
                  <span class="w-4">{{ rating.stars }}</span>
                  <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gray-900"
                      :style="{ width: `${rating.percentage}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>


            <div class="space-y-8">
              <div v-for="review in reviews" :key="review.id" class="pb-8 border-b last:border-b-0">
                <div class="flex items-center gap-2 mb-2">
                  <div class="flex">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      :class="[
                        'w-5 h-5',
                        i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      ]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="font-bold">{{ review.rating.toFixed(1) }}</span>
                  <span class="text-gray-500">|</span>
                  <span class="text-gray-500">{{ review.date }}</span>
                  <span class="text-gray-500">|</span>
                  <span class="text-gray-500">{{ review.author }}</span>
                </div>
                
                <h3 class="text-xl font-semibold mb-2">{{ review.title }}</h3>
                <p class="text-gray-600 mb-4">{{ review.content }}</p>
                
                <button class="text-green-700 font-medium hover:underline">Reply</button>
              </div>
            </div>
          </div>
        </div> -->

        <ServicesCategories v-if="activeTab === 'services'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ServicesCategories from '@/components/ServicesCategories.vue'
import { useFetchServiceProvidersReview } from "@/composables/modules/reviews/useFetchServiceProvidersReviews"
import { useUser } from "@/composables/auth/useUser";
import { definePageMeta } from '#imports'
const { user } = useUser()
const { reviews: reviewsList, loading: fetchingReviews } = useFetchServiceProvidersReview()

const coverInput = ref<HTMLInputElement | null>(null)

const tabs = [
  { id: 'details', name: 'My Details' },
  { id: 'password', name: 'Password' },
  // { id: 'billing', name: 'Billing' },
  { id: 'reviews', name: 'Reviews' },
  { id: 'services', name: 'Services' },
]

const reviews = [
  {
    id: 1,
    rating: 5.0,
    date: 'Feb 1, 2025',
    author: 'Anonymous',
    title: 'Exceptional Service with attention details',
    content: 'The service was top-notch, and my skin has never felt this radiant. The attention to detail, professionalism, and care made all the difference. I left feeling pampered, confident, and glowing! Highly recommend to anyone looking for quality beauty services!'
  },
  {
    id: 2,
    rating: 5.0,
    date: 'Feb 1, 2025',
    author: 'Fabiyi Adejimeji',
    title: 'Exceptional Service with attention details',
    content: 'The service was top-notch, and my skin has never felt this radiant. The attention to detail, professionalism, and care made all the difference. I left feeling pampered, confident, and glowing! Highly recommend to anyone looking for quality beauty services!'
  },
  {
    id: 3,
    rating: 5.0,
    date: 'Feb 1, 2025',
    author: 'Fabiyi Adejimeji',
    title: 'Exceptional Service with attention details',
    content: 'The service was top-notch, and my skin has never felt this radiant. The attention to detail, professionalism, and care made all the difference. I left feeling pampered, confident, and glowing! Highly recommend to anyone looking for quality beauty services!'
  }
]

const ratings = [
  { stars: 5, percentage: 90 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 0 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
]

const activeTab = ref('details')

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
})

onMounted(() => {
  form.value.firstName = user.value?.firstName || ''
  form.value.lastName = user.value?.lastName || ''
  form.value.email = user.value?.email || ''
})

const handleCoverChange = () => {
  coverInput.value?.click()
}

const onCoverImageSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      console.log('Cover image selected')
    }
    reader.readAsDataURL(input.files[0])
  }
}

const shareProfile = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'My Profile',
        text: `Check out ${user.value?.firstName}'s profile`,
        url: window.location.href,
      })
    }
  } catch (error) {
    console.error('Error sharing:', error)
  }
}

const updateProfile = () => {
  console.log('Form submitted:', form.value)
}

const updatePassword = () => {
  console.log('Password update:', passwordForm.value)
}

const resetForm = () => {
  form.value = {
    firstName: user.value?.firstName || '',
    lastName: user.value?.lastName || '',
    email: user.value?.email || '',
  }
}

const resetPasswordForm = () => {
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
  }
}

definePageMeta({
  layout: 'dashboard'
})
</script>
