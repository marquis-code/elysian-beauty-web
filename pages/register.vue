<template>
  <OnboardingUserSelection />
  <CoreFullScreenLoader :visible="loading" />
  </template>
  
  <script setup lang="ts">
  import  { useRegister } from '~/composables/auth/useRegister'
  const { register, loading } = useRegister()
  import { ref } from "vue";

  definePageMeta({
    layout: "auth"
  })

  const form = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const errors = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    form: "",
  });

  const showPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  const handleSubmit = () => {
    errors.value = { firstName: "", lastName: "", email: "", password: "", form: "" };

    // Validation
    if (!form.value.firstName) errors.value.firstName = "First name is required";
    if (!form.value.lastName) errors.value.lastName = "Last name is required";
    if (!form.value.email) errors.value.email = "Email is required";
    if (!form.value.password) errors.value.password = "Password is required";

    if (
      !errors.value.firstName &&
      !errors.value.lastName &&
      !errors.value.email &&
      !errors.value.password
    ) {
      register()
      // Simulate API call
      // setTimeout(() => {
      //   if (form.value.email === "test@example.com") {
      //     alert("Account successfully created!");
      //   } else {
      //     errors.value.form = "An error occurred. Please try again.";
      //   }
      // }, 1000);
    }
  };
  </script>


<style>
/* Container styles for alignment */
.remember-me-container {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between checkbox and label */
}

/* Hide default checkbox appearance */
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none; /* Safari */
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db; /* Light gray border */
  border-radius: 4px; /* Slightly rounded corners */
  background-color: white; /* Default white background */
  cursor: pointer; /* Pointer on hover */
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* Checkbox checked state */
.custom-checkbox:checked {
  background-color: #045940; /* Dark green background */
  border-color: #045940; /* Dark green border */
}

/* Add a checkmark when checked */
.custom-checkbox:checked::before {
  content: '✔';
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
}

/* Focus outline for accessibility */
.custom-checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(34, 84, 61, 0.3); /* Green shadow on focus */
}

/* Label styles */
.custom-label {
  font-size: 14px;
  color: #4b5563; /* Neutral gray text */
  cursor: pointer; /* Pointer for label click */
}
</style>