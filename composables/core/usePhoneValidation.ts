import { ref } from 'vue'

export const usePhoneValidation = () => {
  const isChecking = ref(false)
  const phoneExists = ref(false)

  const checkPhoneExists = async (phone: string): Promise<boolean> => {
    // Simulate API call - replace with your actual API endpoint
    isChecking.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Simulate phone number check (replace with actual API call)
      phoneExists.value = phone === '1234567890'
      return phoneExists.value
    } finally {
      isChecking.value = false
    }
  }

  return {
    isChecking,
    phoneExists,
    checkPhoneValidation: checkPhoneExists
  }
}
