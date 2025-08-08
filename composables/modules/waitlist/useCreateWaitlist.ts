// composables/useCreateAvailability.ts
import { waitlist_api } from "@/api_factory/modules/waitlist";
import { ref } from "vue";

export const useCreateWaitlist = () => {
  const loading = ref(false);

  const createWaitlist = async (payload: {
    email: string;
    purpose: string
  }) => {
    loading.value = true;
    const res = await waitlist_api.$_create_waitlist(payload) as any;

    if (res.type !== "ERROR") {
      // handle success
    }

    loading.value = false;
    return res;
  };

  return { createWaitlist, loading };
};
