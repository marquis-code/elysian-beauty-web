<template>
    <main>
        <OnboardingClientOtpVerification />
        <CoreFullScreenLoader :visible="loading" />
    </main>
        </template>
        
        <script setup lang="ts">
        import  { useRegister } from '~/composables/auth/useRegister'
        const { register, loading } = useRegister()
      
        definePageMeta({
          layout: "auth"
        })
    
        </script>
      
    