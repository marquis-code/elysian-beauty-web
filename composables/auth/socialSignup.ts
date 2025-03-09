import { auth_api } from "@/api_factory/modules/auth";
import { useUser } from "@/composables/auth/useUser";
import { useRouter } from "vue-router";
import { ref } from "vue";

export const use_auth_social_signup = () => {
  const Router = useRouter();
  const credential = {
    // idToken: ref(""),
    provider: ref(""),
    role: ref(""),
    firstName: ref(""),
    email: ref(""),
    lastName: ref(""),
    password: ref(""),
    location: ref("Lekki, Ajah"),
  };

  const loading = ref(false);
  const error = ref<string | null>(null);
  const isLocationLoading = ref(false);

  const getCurrentLocation = (): Promise<string> => {
    return new Promise((resolve) => {
      isLocationLoading.value = true;

      if (!navigator.geolocation) {
        isLocationLoading.value = false;
        credential.location.value = "Lekki Ajah";
        resolve("Lekki Ajah");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationString = `${position.coords.latitude}, ${position.coords.longitude}`;
          credential.location.value = locationString;
          isLocationLoading.value = false;
          resolve(locationString);
        },
        () => {
          console.log("Using default location: Lekki Ajah");
          credential.location.value = "Lekki Ajah";
          isLocationLoading.value = false;
          resolve("Lekki Ajah");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  };

  const social_signup = async () => {
    loading.value = true;
    error.value = null;

    try {
      await getCurrentLocation();

      const res = await auth_api.$_social_signup({
        // idToken: credential.idToken.value,
        provider: credential.provider.value.toUpperCase(),
        role: credential.role.value,
        firstName: credential.firstName.value,
        lastName: credential.lastName.value,
        email: credential.email.value,
        // password: credential.password.value,
        location: 'Lekki, Ajah'
        // location: credential.location.value,
      });

      if (res.type !== "ERROR") {
        useUser().createUser(res.data);
        Router.push("/dashboard");
      } else {
        throw new Error(res.message || "Social signup failed.");
      }
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setAuthObj = async (data: any) => {
    // credential.idToken.value = data.idToken;
    credential.provider.value = data.provider;
    credential.role.value = data.app || "CLIENT";
    credential.firstName.value = data.firstName;
    credential.lastName.value = data.lastName;
    credential.email.value = data.email;
    credential.password.value = data.password;
    
    await getCurrentLocation();
  };

  onMounted(async () => {
    await getCurrentLocation();
  });

  return { 
    credential, 
    social_signup, 
    loading, 
    setAuthObj, 
    error,
    isLocationLoading 
  };
};