import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";

// Runtime-only state
const runtimeData = {
  user: ref({}),
  userId: ref<string>(""),
  token: ref<string>(""),
};

// Persistent state (stored in localStorage)
const localStorageData = {
  user: useStorage("user", {}),
  userId: useStorage("userId", ""),
  token: useStorage("token", ""),
};

// Initialize runtime data from storage
(() => {
  runtimeData.userId.value = localStorageData.userId.value;
  runtimeData.user.value = localStorageData.user.value;
  runtimeData.token.value = localStorageData.token.value;
})();

export const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL as string;

export const useUser = () => {
  const id = computed(() => runtimeData.userId.value ?? "");

  const isLoggedIn = computed(() => {
    return Boolean(runtimeData.token.value && runtimeData.userId.value);
  });

  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    runtimeData.userId.value = "";
    runtimeData.user.value = {};
    runtimeData.token.value = "";
  };

  const setToken = (token: string) => {
    runtimeData.token.value = token;
    localStorageData.token.value = token;
  };

  const createUser = (data: { userId: string; token: string; firstName: string; lastName: string; email: string }) => {
    runtimeData.userId.value = data.userId;
    runtimeData.token.value = data.token;
    runtimeData.user.value = data;

    localStorageData.user.value = data;
    localStorageData.userId.value = data.userId;
    localStorageData.token.value = data.token;
  };

  return {
    id,
    isLoggedIn,
    ...runtimeData,
    logOut,
    createUser,
    setToken,
  };
};
