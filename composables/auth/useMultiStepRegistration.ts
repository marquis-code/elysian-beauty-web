import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const useMultiStepRegistration = () => {
  const router = useRouter()
  const route = useRoute()
  const loading = ref(false)
  const showPassword = ref(false)
  
  const form = ref<RegistrationForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    accountType: 'client',
    verificationCode: ''
  })

  const errors = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    verificationCode: '',
    form: ''
  })

  const currentStep = computed(() => {
    const step = route.query.step as string
    const savedStep = localStorage.getItem('registrationStep')
    
    if (!step && !savedStep) {
      return 'account-type'
    }
    
    if (savedStep && (!step || parseInt(step) > parseInt(savedStep))) {
      router.replace({ query: { step: savedStep }})
      return savedStep
    }
    
    return step || 'account-type'
  })

  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const steps = {
    'account-type': {
      validate: () => {
        errors.value.form = ''
        if (!form.value.accountType) {
          errors.value.form = 'Please select an account type'
          return false
        }
        return true
      },
      submit: async () => {
        try {
          loading.value = true
          await $fetch('/api/auth/register/step1', {
            method: 'POST',
            body: { accountType: form.value.accountType }
          })
          localStorage.setItem('registrationStep', '2')
          router.push({ query: { step: '2' }})
        } catch (error) {
          errors.value.form = 'An error occurred'
        } finally {
          loading.value = false
        }
      }
    },
    '2': {
      validate: () => {
        let isValid = true
        errors.value = { ...errors.value, firstName: '', lastName: '', email: '', password: '', confirmPassword: '', form: '' }

        if (!form.value.firstName) {
          errors.value.firstName = 'First name is required'
          isValid = false
        }
        if (!form.value.lastName) {
          errors.value.lastName = 'Last name is required'
          isValid = false
        }
        if (!form.value.email) {
          errors.value.email = 'Email is required'
          isValid = false
        } else if (!validateEmail(form.value.email)) {
          errors.value.email = 'Invalid email format'
          isValid = false
        }
        if (!form.value.password) {
          errors.value.password = 'Password is required'
          isValid = false
        }
        if (form.value.password !== form.value.confirmPassword) {
          errors.value.confirmPassword = 'Passwords do not match'
          isValid = false
        }
        return isValid
      },
      submit: async () => {
        try {
          loading.value = true
          await $fetch('/api/auth/register/step2', {
            method: 'POST',
            body: {
              firstName: form.value.firstName,
              lastName: form.value.lastName,
              email: form.value.email,
              password: form.value.password
            }
          })
          localStorage.setItem('registrationStep', '3')
          router.push({ query: { step: '3' }})
        } catch (error) {
          errors.value.form = 'An error occurred'
        } finally {
          loading.value = false
        }
      }
    },
    '3': {
      validate: () => {
        let isValid = true
        errors.value = { ...errors.value, phone: '', location: '', form: '' }

        if (!form.value.phone) {
          errors.value.phone = 'Phone is required'
          isValid = false
        }
        if (!form.value.location) {
          errors.value.location = 'Location is required'
          isValid = false
        }
        return isValid
      },
      submit: async () => {
        try {
          loading.value = true
          await $fetch('/api/auth/register/step3', {
            method: 'POST',
            body: {
              phone: form.value.phone,
              location: form.value.location
            }
          })
          localStorage.setItem('registrationStep', '4')
          router.push({ query: { step: '4' }})
        } catch (error) {
          errors.value.form = 'An error occurred'
        } finally {
          loading.value = false
        }
      }
    },
    '4': {
      validate: () => {
        errors.value.verificationCode = ''
        if (!form.value.verificationCode) {
          errors.value.verificationCode = 'Verification code is required'
          return false
        }
        return true
      },
      submit: async () => {
        try {
          loading.value = true
          await $fetch('/api/auth/register/verify', {
            method: 'POST',
            body: { code: form.value.verificationCode }
          })
          localStorage.removeItem('registrationStep')
          router.push('/registration-success')
        } catch (error) {
          errors.value.form = 'Invalid verification code'
        } finally {
          loading.value = false
        }
      }
    }
  }

  const handleSubmit = async () => {
    const currentStepConfig = steps[currentStep.value]
    if (currentStepConfig.validate()) {
      await currentStepConfig.submit()
    }
  }

  return {
    form,
    errors,
    loading,
    currentStep,
    showPassword,
    togglePassword,
    handleSubmit
  }
}