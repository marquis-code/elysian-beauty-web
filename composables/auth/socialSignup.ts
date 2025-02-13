import { auth_api } from "@/api_factory/modules/auth";
import { useUser } from "@/composables/auth/useUser";
import { useRouter } from 'vue-router';

export const use_auth_social_signup = () => {
  const Router = useRouter();
  const credential = {
    idToken: ref(""),
    provider: ref(""),
    app: ref(""),
    firstName: ref(""), // Changed to ref for reactivity
    lastName: ref(""),  // Changed to ref for reactivity
    password: ref(""),  // Changed to ref for reactivity
  };

  const loading = ref(false);
  const error = ref<string | null>(null); // Added error handling

  const social_signup = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_social_signup({
        idToken: credential.idToken.value,
        provider: credential.provider.value,
        app: credential.app.value,
        create: {
          firstName: credential.firstName.value,
          lastName: credential.lastName.value,
          password: credential.password.value,
        },
      });

      if (res.type !== "ERROR") {
        useUser().createUser(res.data);
        Router.push("/dashboard");
      } else {
        throw new Error(res.message || 'Social signup failed.');
      }
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const setAuthObj = (data: any) => {
    credential.idToken.value = data.idToken;
    credential.provider.value = data.provider;
    credential.app.value = data.app;
    credential.firstName.value = data.firstName;
    credential.lastName.value = data.lastName;
    credential.password.value = data.password;
  };

  return { credential, social_signup, loading, setAuthObj, error };
};
