import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { auth_api } from "@/api_factory/modules/auth";
import { useUser } from "~/composables/auth/useUser";
import { useCustomToast } from "@/composables/core/useCustomToast";

const { showToast } = useCustomToast();

const credential = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  phoneNum: "",
  provider: "",
  role: "", // You can update this field based on roles such as SUPER_ADMIN, ADMIN, etc.
});

export const useRegister = () => {
  const router = useRouter();
  const loading = ref(false);

  // Disable form if certain fields are empty or if the request is loading
  const isFormDisabled = computed(() => 
    !credential.value.firstName || 
    !credential.value.lastName || 
    !credential.value.email || 
    !credential.value.password || 
    !credential.value.location || 
    !credential.value.phoneNum || 
    !credential.value.provider || 
    !credential.value.role || 
    loading.value
  );

  const register = async () => {
    loading.value = true;
    try {
      const res = (await auth_api.$_register(credential.value)) as any;
      loading.value = false;

      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Registration successful. Please check your email.",
          toastType: "success",
          duration: 3000,
        });
        // Optionally navigate after successful registration
        router.push("/login");
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Something went wrong",
          toastType: "error",
          duration: 3000,
        });
      }
    } catch (error: any) {
      loading.value = false;
      showToast({
        title: "Error",
        message: error.message || "An unexpected error occurred",
        toastType: "error",
        duration: 3000,
      });
    }
  };

  const setCredentials = (newCredentials: any) => {
    credential.value = { ...credential.value, ...newCredentials };
  };

  return { credential, register, loading, isFormDisabled, setCredentials };
};
