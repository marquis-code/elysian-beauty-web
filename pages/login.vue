<template>
 <OnboardingLogin />
  <CoreFullScreenLoader :visible="loading" />
</template>

  <script setup lang="ts">
  import  { useLogin } from '~/composables/auth/useLogin'
  const { login, loading } = useLogin()

  definePageMeta({
    layout: "auth"
  })
  
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  