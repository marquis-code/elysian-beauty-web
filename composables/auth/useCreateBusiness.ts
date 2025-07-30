import { ref, readonly } from "vue"
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useCreateBusiness = () => {
  const loading = ref(false)
  const credential = ref(null)
  const router = useRouter()

  const setCredentials = (credentials: any) => {
    credential.value = credentials
    console.log("Business credentials set:", credentials)
  }

  const { showToast } = useCustomToast();

  const register = async () => {
    loading.value = true

    try {
      // Mock API call
      // await new Promise((resolve) => setTimeout(resolve, 2000))
      const res = await auth_api.$_register(credential.value);

    if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Registration successful. Please check your email.",
          toastType: "success",
          duration: 3000,
        });

        // Navigate to OTP verification page
        router.push({
          path: "/signup/verify",
          query: { email: credential.value.email },
        });
        return { type: "SUCCESS", data: { message: "Registration successful" } }
      } else {
        showToast({
          title: "Error",
          message: res?.data?.message || "Something went wrong",
          toastType: "error",
          duration: 3000,
        });
      }

  
    } catch (error) {
      console.error("Registration error:", error)
      return { type: "ERROR", error: "Registration failed" }
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    credential: readonly(credential),
    setCredentials,
    register,
  }
}
