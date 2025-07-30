// import { useRouter } from 'vue-router';
// import { ref, computed } from 'vue';
// import { auth_api } from '@/api_factory/modules/auth';
// import { useUser } from '~/composables/auth/useUser';
// import { useCustomToast } from '@/composables/core/useCustomToast';

// const { showToast } = useCustomToast();
// // const route = useRoute()

// export const use_auth_verify_user = () => {
//     const loading = ref(false);
//     const route = useRoute()
//     const credential = ref({
//         email: "",
//         otp: ""
//     });

//     const verifyUser = async () => {
//         loading.value = true;
//         const router = useRouter()
//         const res = await auth_api.$_verify_user(credential.value) as any
//         console.log(res, 'res here')
//         loading.value = false;

//         if (res.status === 200 || res.status === 201) {
//             router.push('/account-success')
//             window.location.href = '/account-success'
//             showToast({ title: 'Success', message: res?.data?.message, toastType: 'success', duration: 3000 });
//             res
//         } else {
//             window.location.href = '/account-success'
//             showToast({ title: 'Error', message: res?.data?.message || 'Something went wrong', toastType: 'error', duration: 3000 });
//             return res
//         }
//     };

//     const setPayload = (data: any) => {
//         credential.value.email = route.query.email || data.email,
//         credential.value.otp = data.otp
//     }
//     return { credential, verifyUser, loading, setPayload };
// };


import { ref, readonly } from "vue"

export const use_auth_verify_user = () => {
  const loading = ref(false)
  const payload = ref(null)

  const setPayload = (data: any) => {
    payload.value = data
    console.log("Verify payload set:", data)
  }

  const verifyUser = async () => {
    loading.value = true

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Verifying user with payload:", payload.value)

      // Simulate successful verification
      return { type: "SUCCESS", data: { message: "Verification successful" } }
    } catch (error) {
      console.error("Verification error:", error)
      return { type: "ERROR", error: "Verification failed" }
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    setPayload,
    verifyUser,
  }
}
