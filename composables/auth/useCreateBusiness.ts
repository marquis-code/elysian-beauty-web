import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from "@/composables/core/useCustomToast";

interface ServiceProvider {
  serviceRole: string;
  businessName: string;
  serviceTypes: string[];
  otherServiceType: string;
  businessLocationType: string;
  businessLocation: string;
  location?: string; // Add location field for freelancers
}

interface Credential {
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
  password: string;
  role: string;
  serviceProvider?: ServiceProvider;
}

const { showToast } = useCustomToast();

const credential = ref<Credential>({
  firstName: "",
  lastName: "",
  email: "",
  provider: "EMAIL",
  password: "",
  role: "SERVICEPROVIDER",
});

export const useCreateBusiness = () => {
  const router = useRouter();
  const loading = ref(false);

  // Disable form if required fields are empty or if the request is loading
  const isFormDisabled = computed(() => {
    const {
      firstName,
      lastName,
      email,
      password,
      provider,
      role,
      serviceProvider,
    } = credential.value;

    return (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !provider ||
      !role ||
      (role === "SERVICEPROVIDER" && (!serviceProvider?.businessName || !serviceProvider?.businessLocation || serviceProvider?.serviceTypes.length === 0)) ||
      loading.value
    );
  });

  const register = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_register(credential.value);
      console.log(res, "res here");
      loading.value = false;

      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Registration successful. Please check your email.",
          toastType: "success",
          duration: 3000,
        });

        // Navigate to OTP verification page
        router.push({
          path: "/client/otp-verification",
          query: { email: credential.value.email },
        });
        return res;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.message || "Something went wrong",
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

  const setCredentials = (newCredentials: Partial<Credential>) => {
    if (newCredentials.role === "SERVICEPROVIDER" && newCredentials.serviceProvider) {
      credential.value.serviceProvider = {
        ...credential.value.serviceProvider,
        ...newCredentials.serviceProvider,
      };

      // Ensure 'location' is set for freelancers
      if (newCredentials.serviceProvider.serviceRole === "FREELANCER") {
        credential.value.serviceProvider.location = newCredentials.serviceProvider.businessLocation;
      }

      delete newCredentials.serviceProvider;
    } else if (newCredentials.role === "FREELANCER") {
      delete credential.value.serviceProvider;
    }

    credential.value = {
      ...credential.value,
      ...newCredentials,
    };
  };

  return {
    credential,
    register,
    loading,
    isFormDisabled,
    setCredentials,
  };
};
