// import { useRouter } from "vue-router";
// import { ref, computed } from "vue";
// import { auth_api } from "@/api_factory/modules/auth";
// import { useCustomToast } from "@/composables/core/useCustomToast";

// interface ServiceProvider {
//   serviceRole: "FREELANCER" | "REGISTEREDBUSINESS";
//   businessName?: string;
//   serviceTypes: string[];
//   otherServiceType?: string;
//   businessLocationType?: string;
//   businessLocation?: string;
//   location?: string; // Used only for Freelancers
// }

// interface Credential {
//   firstName: string;
//   lastName: string;
//   email: string;
//   provider: string;
//   password: string;
//   role: "SERVICEPROVIDER";
//   serviceProvider: ServiceProvider;
// }

// const { showToast } = useCustomToast();

// const credential = ref<Credential>({
//   firstName: "",
//   lastName: "",
//   email: "",
//   provider: "EMAIL",
//   password: "",
//   role: "SERVICEPROVIDER",
//   serviceProvider: {
//     serviceRole: "REGISTEREDBUSINESS", // Default to registered business
//     businessName: "",
//     serviceTypes: [],
//     otherServiceType: "",
//     businessLocationType: "",
//     businessLocation: "",
//   },
// });

// export const useCreateBusiness = () => {
//   const router = useRouter();
//   const loading = ref(false);

//   // Disable form if required fields are empty or if the request is loading
//   const isFormDisabled = computed(() => {
//     const { firstName, lastName, email, password, serviceProvider } =
//       credential.value;

//     return (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !password ||
//       serviceProvider.serviceTypes.length === 0 ||
//       (serviceProvider.serviceRole === "REGISTEREDBUSINESS" &&
//         (!serviceProvider.businessName ||
//           !serviceProvider.businessLocation ||
//           !serviceProvider.businessLocationType)) ||
//       (serviceProvider.serviceRole === "FREELANCER" &&
//         !serviceProvider.location) ||
//       loading.value
//     );
//   });

//   const register = async () => {
//     loading.value = true;
//     try {
//       const payload = { ...credential.value };

//       // Ensure proper payload structure based on service role
//       if (payload.serviceProvider.serviceRole === "FREELANCER") {
//         payload.serviceProvider = {
//           serviceRole: "FREELANCER",
//           serviceTypes: credential.value.serviceProvider.serviceTypes,
//           businessName: credential.value.serviceProvider.businessName,
//           otherServiceType: credential.value.serviceProvider.otherServiceType,
//           location: credential.value.serviceProvider.businessLocation, // Freelancer uses 'location'
//         };
//       } else {
//         payload.serviceProvider = {
//           serviceRole: "REGISTEREDBUSINESS",
//           businessName: credential.value.serviceProvider.businessName,
//           serviceTypes: credential.value.serviceProvider.serviceTypes,
//           otherServiceType: credential.value.serviceProvider.otherServiceType,
//           businessLocationType:
//             credential.value.serviceProvider.businessLocationType,
//           businessLocation: credential.value.serviceProvider.businessLocation,
//         };
//       }

//       const res = (await auth_api.$_register(payload)) as any;
//       console.log(res, "res here");
//       loading.value = false;

//       if (res.type !== "ERROR") {
//         showToast({
//           title: "Success",
//           message: "Registration successful. Please check your email.",
//           toastType: "success",
//           duration: 3000,
//         });

//         // Navigate to OTP verification page
//         router.push({
//           path: "/client/otp-verification",
//           query: { email: credential.value.email },
//         });
//         return res;
//       } else {
//         showToast({
//           title: "Error",
//           message: res?.data?.message || "Something went wrong",
//           toastType: "error",
//           duration: 3000,
//         });
//       }

//       return res
//     } catch (error: any) {
//       loading.value = false;
//       // Check for CORS errors
//       const isCORSError =
//         // Network error message often indicates CORS issues
//         error.message?.includes("Network Error") ||
//         // Failed to fetch is common in CORS errors
//         error.message?.includes("Failed to fetch") ||
//         // Explicit CORS error messages
//         error.message?.includes("CORS") ||
//         error.message?.includes("Cross-Origin Request Blocked") ||
//         // Check if it's a TypeError with specific CORS-related messages
//         (error instanceof TypeError &&
//           (error.message?.includes("Failed to fetch") ||
//             error.message?.includes("NetworkError")));

//       if (isCORSError) {
//         console.error("CORS Error:", error);
//         showToast({
//           title: "Error",
//           message:
//             error.message ||
//             "Unable to connect to the server due to CORS restrictions. Please try again later or contact support.",
//           toastType: "error",
//           duration: 3000,
//         });
//       } else {
//         showToast({
//           title: "Error",
//           message: error.message || "An unexpected error occurred",
//           toastType: "error",
//           duration: 3000,
//         });
//       }

//       return error

//       // showToast({
//       //   title: "Error",
//       //   message: error.message || "An unexpected error occurred",
//       //   toastType: "error",
//       //   duration: 3000,
//       // });
//     }
//   };

//   const setCredentials = (newCredentials: Partial<Credential>) => {
//     credential.value = {
//       ...credential.value,
//       ...newCredentials,
//     };

//     // Ensure proper service role assignment
//     if (newCredentials.serviceProvider) {
//       credential.value.serviceProvider = {
//         ...credential.value.serviceProvider,
//         ...newCredentials.serviceProvider,
//       };

//       if (newCredentials.serviceProvider.serviceRole === "FREELANCER") {
//         credential.value.serviceProvider.location =
//           newCredentials.serviceProvider.businessLocation;
//       } else {
//         delete credential.value.serviceProvider.location;
//       }
//     }
//   };

//   return {
//     credential,
//     register,
//     loading,
//     isFormDisabled,
//     setCredentials,
//   };
// };

// import { useRouter } from "vue-router";
// import { ref, computed } from "vue";
// import { auth_api } from "@/api_factory/modules/auth";
// import { useCustomToast } from "@/composables/core/useCustomToast";

// interface ServiceProvider {
//   serviceRole: "FREELANCER" | "REGISTEREDBUSINESS";
//   businessName?: string;
//   serviceTypes: string[];
//   otherServiceType?: string;
//   businessLocationType?: string;
//   businessLocation?: string;
//   location?: string; // Used only for Freelancers
// }

// interface Credential {
//   firstName: string;
//   lastName: string;
//   email: string;
//   provider: string;
//   password: string;
//   role: "SERVICEPROVIDER";
//   serviceProvider: ServiceProvider;
// }

// const { showToast } = useCustomToast();

// const credential = ref<Credential>({
//   firstName: "",
//   lastName: "",
//   email: "",
//   provider: "EMAIL",
//   password: "",
//   role: "SERVICEPROVIDER",
//   serviceProvider: {
//     serviceRole: "REGISTEREDBUSINESS", // Default to registered business
//     businessName: "",
//     serviceTypes: [],
//     otherServiceType: "",
//     businessLocationType: "",
//     businessLocation: "",
//   },
// });

// export const useCreateBusiness = () => {
//   const router = useRouter();
//   const loading = ref(false);

//   // Disable form if required fields are empty or if the request is loading
//   const isFormDisabled = computed(() => {
//     const { firstName, lastName, email, password, serviceProvider } =
//       credential.value;

//     return (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !password ||
//       serviceProvider.serviceTypes.length === 0 ||
//       (serviceProvider.serviceRole === "REGISTEREDBUSINESS" &&
//         (!serviceProvider.businessName ||
//           !serviceProvider.businessLocation ||
//           !serviceProvider.businessLocationType)) ||
//       (serviceProvider.serviceRole === "FREELANCER" &&
//         !serviceProvider.location) ||
//       loading.value
//     );
//   });

//   const register = async () => {
//     loading.value = true;
//     try {
//       const payload = { ...credential.value };

//       // Ensure proper payload structure based on service role
//       if (payload.serviceProvider.serviceRole === "FREELANCER") {
//         payload.serviceProvider = {
//           serviceRole: "FREELANCER",
//           serviceTypes: credential.value.serviceProvider.serviceTypes,
//           businessName: credential.value.serviceProvider.businessName,
//           otherServiceType: credential.value.serviceProvider.otherServiceType,
//           location: credential.value.serviceProvider.location, // Use location for Freelancer
//           // businessLocation is not included for Freelancers
//         };
//       } else {
//         payload.serviceProvider = {
//           serviceRole: "REGISTEREDBUSINESS",
//           businessName: credential.value.serviceProvider.businessName,
//           serviceTypes: credential.value.serviceProvider.serviceTypes,
//           otherServiceType: credential.value.serviceProvider.otherServiceType,
//           businessLocationType:
//             credential.value.serviceProvider.businessLocationType,
//           businessLocation: credential.value.serviceProvider.businessLocation,
//           // location is not included for RegisteredBusiness
//         };
//       }

//       const res = (await auth_api.$_register(payload)) as any;
//       console.log(res, "res here");
//       loading.value = false;

//       if (res.type !== "ERROR") {
//         showToast({
//           title: "Success",
//           message: "Registration successful. Please check your email.",
//           toastType: "success",
//           duration: 3000,
//         });

//         // Navigate to OTP verification page
//         router.push({
//           path: "/client/otp-verification",
//           query: { email: credential.value.email },
//         });
//         return res;
//       } else {
//         showToast({
//           title: "Error",
//           message: res?.data?.message || "Something went wrong",
//           toastType: "error",
//           duration: 3000,
//         });
//       }

//       return res;
//     } catch (error: any) {
//       loading.value = false;
//       // Check for CORS errors
//       const isCORSError =
//         // Network error message often indicates CORS issues
//         error.message?.includes("Network Error") ||
//         // Failed to fetch is common in CORS errors
//         error.message?.includes("Failed to fetch") ||
//         // Explicit CORS error messages
//         error.message?.includes("CORS") ||
//         error.message?.includes("Cross-Origin Request Blocked") ||
//         // Check if it's a TypeError with specific CORS-related messages
//         (error instanceof TypeError &&
//           (error.message?.includes("Failed to fetch") ||
//             error.message?.includes("NetworkError")));

//       if (isCORSError) {
//         console.error("CORS Error:", error);
//         showToast({
//           title: "Error",
//           message:
//             error.message ||
//             "Unable to connect to the server due to CORS restrictions. Please try again later or contact support.",
//           toastType: "error",
//           duration: 3000,
//         });
//       } else {
//         showToast({
//           title: "Error",
//           message: error.message || "An unexpected error occurred",
//           toastType: "error",
//           duration: 3000,
//         });
//       }

//       return error;
//     }
//   };

//   const setCredentials = (newCredentials: Partial<Credential>) => {
//     credential.value = {
//       ...credential.value,
//       ...newCredentials,
//     };

//     // Ensure proper service role assignment
//     if (newCredentials.serviceProvider) {
//       credential.value.serviceProvider = {
//         ...credential.value.serviceProvider,
//         ...newCredentials.serviceProvider,
//       };

//       // Update location field based on service role
//       if (newCredentials.serviceProvider.serviceRole === "FREELANCER") {
//         // For Freelancer, set location but not businessLocation
//         credential.value.serviceProvider.location = 
//           credential.value.serviceProvider.location || 
//           credential.value.serviceProvider.businessLocation;
        
//         // Optionally clear businessLocation for Freelancers
//         // credential.value.serviceProvider.businessLocation = "";
//       } else {
//         // For RegisteredBusiness, ensure location is not used
//         delete credential.value.serviceProvider.location;
//       }
//     }
//   };

//   return {
//     credential,
//     register,
//     loading,
//     isFormDisabled,
//     setCredentials,
//   };
// };


// import { useRouter } from "vue-router";
// import { ref, computed } from "vue";
// import { auth_api } from "@/api_factory/modules/auth";
// import { useCustomToast } from "@/composables/core/useCustomToast";

// interface ServiceProvider {
//   serviceRole: "FREELANCER" | "REGISTEREDBUSINESS";
//   businessName?: string;
//   serviceTypes: string[];
//   otherServiceType?: string;
//   businessLocationType?: string;
//   businessLocation?: string;
//   location?: string; // Used only for Freelancers
// }

// interface Credential {
//   firstName: string;
//   lastName: string;
//   email: string;
//   provider: string;
//   password: string;
//   role: "SERVICEPROVIDER";
//   serviceProvider: ServiceProvider;
// }

// const { showToast } = useCustomToast();

// const credential = ref<Credential>({
//   firstName: "",
//   lastName: "",
//   email: "",
//   provider: "EMAIL",
//   password: "",
//   role: "SERVICEPROVIDER",
//   serviceProvider: {
//     serviceRole: "REGISTEREDBUSINESS", // Default to registered business
//     businessName: "",
//     serviceTypes: [],
//     otherServiceType: "",
//     businessLocationType: "",
//     businessLocation: "",
//   },
// });

// export const useCreateBusiness = () => {
//   const router = useRouter();
//   const loading = ref(false);

//   // Disable form if required fields are empty or if the request is loading
//   const isFormDisabled = computed(() => {
//     const { firstName, lastName, email, password, serviceProvider } =
//       credential.value;

//     return (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !password ||
//       serviceProvider.serviceTypes.length === 0 ||
//       (serviceProvider.serviceRole === "REGISTEREDBUSINESS" &&
//         (!serviceProvider.businessName ||
//           !serviceProvider.businessLocation ||
//           !serviceProvider.businessLocationType)) ||
//       (serviceProvider.serviceRole === "FREELANCER" &&
//         !serviceProvider.location) ||
//       loading.value
//     );
//   });

//   const register = async () => {
//     loading.value = true;
//     try {
//       const payload = { ...credential.value };

//       // Ensure proper payload structure based on service role
//       if (payload.serviceProvider.serviceRole === "FREELANCER") {
//         // For Freelancers, explicitly define only the fields we want to include
//         payload.serviceProvider = {
//           serviceRole: "FREELANCER",
//           serviceTypes: credential.value.serviceProvider.serviceTypes,
//           businessName: credential.value.serviceProvider.businessName,
//           otherServiceType: credential.value.serviceProvider.otherServiceType,
//           location: credential.value.serviceProvider.location,
//           // businessLocation is explicitly excluded for Freelancers
//           // businessLocationType is also excluded for Freelancers
//         };
//       } else {
//         payload.serviceProvider = {
//           serviceRole: "REGISTEREDBUSINESS",
//           businessName: credential.value.serviceProvider.businessName,
//           serviceTypes: credential.value.serviceProvider.serviceTypes,
//           otherServiceType: credential.value.serviceProvider.otherServiceType,
//           businessLocationType:
//             credential.value.serviceProvider.businessLocationType,
//           businessLocation: credential.value.serviceProvider.businessLocation,
//           // location is not included for RegisteredBusiness
//         };
//       }

//       const res = (await auth_api.$_register(payload)) as any;
//       console.log(res, "res here");
//       loading.value = false;

//       if (res.type !== "ERROR") {
//         showToast({
//           title: "Success",
//           message: "Registration successful. Please check your email.",
//           toastType: "success",
//           duration: 3000,
//         });

//         // Navigate to OTP verification page
//         router.push({
//           path: "/client/otp-verification",
//           query: { email: credential.value.email },
//         });
//         return res;
//       } else {
//         showToast({
//           title: "Error",
//           message: res?.data?.message || "Something went wrong",
//           toastType: "error",
//           duration: 3000,
//         });
//       }

//       return res;
//     } catch (error: any) {
//       loading.value = false;
//       // Check for CORS errors
//       const isCORSError =
//         // Network error message often indicates CORS issues
//         error.message?.includes("Network Error") ||
//         // Failed to fetch is common in CORS errors
//         error.message?.includes("Failed to fetch") ||
//         // Explicit CORS error messages
//         error.message?.includes("CORS") ||
//         error.message?.includes("Cross-Origin Request Blocked") ||
//         // Check if it's a TypeError with specific CORS-related messages
//         (error instanceof TypeError &&
//           (error.message?.includes("Failed to fetch") ||
//             error.message?.includes("NetworkError")));

//       if (isCORSError) {
//         console.error("CORS Error:", error);
//         showToast({
//           title: "Error",
//           message:
//             error.message ||
//             "Unable to connect to the server due to CORS restrictions. Please try again later or contact support.",
//           toastType: "error",
//           duration: 3000,
//         });
//       } else {
//         showToast({
//           title: "Error",
//           message: error.message || "An unexpected error occurred",
//           toastType: "error",
//           duration: 3000,
//         });
//       }

//       return error;
//     }
//   };

//   const setCredentials = (newCredentials: Partial<Credential>) => {
//     credential.value = {
//       ...credential.value,
//       ...newCredentials,
//     };

//     // Ensure proper service role assignment
//     if (newCredentials.serviceProvider) {
//       credential.value.serviceProvider = {
//         ...credential.value.serviceProvider,
//         ...newCredentials.serviceProvider,
//       };

//       // Update location field based on service role
//       if (newCredentials.serviceProvider.serviceRole === "FREELANCER") {
//         // For Freelancer, set location but not businessLocation
//         credential.value.serviceProvider.location = 
//           credential.value.serviceProvider.location || 
//           credential.value.serviceProvider.businessLocation;
        
//         // Clear businessLocation for Freelancers
//         credential.value.serviceProvider.businessLocation = "";
//         credential.value.serviceProvider.businessLocationType = "";
//       } else {
//         // For RegisteredBusiness, ensure location is not used
//         delete credential.value.serviceProvider.location;
//       }
//     }
//   };

//   return {
//     credential,
//     register,
//     loading,
//     isFormDisabled,
//     setCredentials,
//   };
// };

import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from "@/composables/core/useCustomToast";

interface ServiceProvider {
  serviceRole: "FREELANCER" | "REGISTEREDBUSINESS";
  businessName?: string;
  serviceTypes: string[];
  otherServiceType?: string;
  businessLocationType?: string;
  businessLocation?: string;
  location?: string; // Used only for Freelancers
}

interface Credential {
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
  password: string;
  role: "SERVICEPROVIDER";
  serviceProvider: ServiceProvider;
}

const { showToast } = useCustomToast();

const credential = ref<Credential>({
  firstName: "",
  lastName: "",
  email: "",
  provider: "EMAIL",
  password: "",
  role: "SERVICEPROVIDER",
  serviceProvider: {
    serviceRole: "REGISTEREDBUSINESS", // Default to registered business
    businessName: "",
    serviceTypes: [],
    otherServiceType: "",
    businessLocationType: "",
    businessLocation: "",
  },
});

export const useCreateBusiness = () => {
  const router = useRouter();
  const loading = ref(false);

  // Disable form if required fields are empty or if the request is loading
  const isFormDisabled = computed(() => {
    const { firstName, lastName, email, password, serviceProvider } =
      credential.value;

    return (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      serviceProvider.serviceTypes.length === 0 ||
      (serviceProvider.serviceRole === "REGISTEREDBUSINESS" &&
        (!serviceProvider.businessName ||
          !serviceProvider.businessLocation ||
          !serviceProvider.businessLocationType)) ||
      (serviceProvider.serviceRole === "FREELANCER" &&
        !serviceProvider.location) ||
      loading.value
    );
  });

  const register = async () => {
    loading.value = true;
    try {
      let payload = { ...credential.value };

      // Ensure proper payload structure based on service role
      if (payload.serviceProvider.serviceRole === "FREELANCER") {
        // Remove businessLocation from the parent credential object
        delete payload.serviceProvider.businessLocation;
        delete payload.serviceProvider.businessLocationType;
      }

      const { businessLocation, ...rest } = payload;

      const finalPayload = payload.serviceProvider.serviceRole === "FREELANCER" ? rest : payload;
      
      const res = (await auth_api.$_register(finalPayload)) as any;
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

      return res;
    } catch (error: any) {
      loading.value = false;
      const isCORSError =
        error.message?.includes("Network Error") ||
        error.message?.includes("Failed to fetch") ||
        error.message?.includes("CORS") ||
        error.message?.includes("Cross-Origin Request Blocked") ||
        (error instanceof TypeError &&
          (error.message?.includes("Failed to fetch") ||
            error.message?.includes("NetworkError")));

      if (isCORSError) {
        console.error("CORS Error:", error);
        showToast({
          title: "Error",
          message:
            error.message ||
            "Unable to connect to the server due to CORS restrictions. Please try again later or contact support.",
          toastType: "error",
          duration: 3000,
        });
      } else {
        showToast({
          title: "Error",
          message: error.message || "An unexpected error occurred",
          toastType: "error",
          duration: 3000,
        });
      }

      return error;
    }
  };

  const setCredentials = (newCredentials: Partial<Credential>) => {
    credential.value = {
      ...credential.value,
      ...newCredentials,
    };

    if (newCredentials.serviceProvider) {
      credential.value.serviceProvider = {
        ...credential.value.serviceProvider,
        ...newCredentials.serviceProvider,
      };

      if (newCredentials.serviceProvider.serviceRole === "FREELANCER") {
        credential.value.serviceProvider.location = 
          credential.value.serviceProvider.location || 
          credential.value.serviceProvider.businessLocation;

        delete credential.value.serviceProvider.businessLocation;
        delete credential.value.serviceProvider.businessLocationType;
      } else {
        delete credential.value.serviceProvider.location;
      }
    }
  };

  return {
    credential,
    register,
    loading,
    isFormDisabled,
    setCredentials,
  };
};
