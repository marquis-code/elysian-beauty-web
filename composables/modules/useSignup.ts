// composables/useSignup.ts
import { ref, computed } from 'vue'

export const useSignup = () => {
  const step = ref(1)
  const businessType = ref('')
  const maxSteps = computed(() => businessType.value === 'Freelancer' ? 2 : 3)
  
  const formData = ref({
    businessType: '',
    fullName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    services: [] as string[],
    businessLocationType: '',
    businessAddress: ''
  })

  const addService = (service: string) => {
    if (!formData.value.services.includes(service)) {
      formData.value.services.push(service)
    }
  }

  const removeService = (service: string) => {
    formData.value.services = formData.value.services.filter(s => s !== service)
  }

  const nextStep = () => {
    if (step.value < maxSteps.value) {
      step.value++
    }
  }

  const prevStep = () => {
    if (step.value > 1) {
      step.value--
    }
  }

  return {
    step,
    maxSteps,
    formData,
    addService,
    removeService,
    nextStep,
    prevStep
  }
}
