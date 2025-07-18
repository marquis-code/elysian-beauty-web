<template>
  <div>
    <!-- Background Blur Overlay -->
    <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center"
    >
      <!-- Modal -->
      <div
          class="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative"
      >
        <!-- Modal Header -->
        <h2 class="text-center text-green-700 text-xl font-semibold mb-4">
          Get In Touch
        </h2>
        <h3 class="text-center text-gray-700 text-xl mb-6">
          How can we help?
        </h3>
        <!-- Form -->
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Full Name -->
          <div class="relative">
            <input
                type="text"
                placeholder="Fullname"
                v-model="form.fullname"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <span
                class="absolute top-3 left-3 text-gray-500"
            >👤</span>
          </div>
          <!-- Email -->
          <div class="relative">
            <input
                type="email"
                placeholder="Email"
                v-model="form.email"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <span
                class="absolute top-3 left-3 text-gray-500"
            >📧</span>
          </div>
          <!-- Message -->
          <div class="relative">
            <textarea
                placeholder="Message"
                v-model="form.message"
                rows="4"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            ></textarea>
          </div>
          <!-- Submit Button -->
          <button
              type="submit"
              class="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-[#045940]00 focus:outline-none"
          >
            Send a Message
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Modal visibility state
const show = ref(false);

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

// Form data
const form = ref({
  fullname: "",
  email: "",
  message: "",
});

const emit = defineEmits(['close'])

// Toggle modal visibility
const toggleModal = () => {
  emit('close')
};

// Submit form handler
const submitForm = () => {
  console.log("Form submitted", form.value);
  emit('close') // Close modal after submission
};
</script>
