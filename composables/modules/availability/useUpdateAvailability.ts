// composables/useUpdateAvailability.ts
import { availability_api } from "@/api_factory/modules/availability";
import { ref } from "vue";

export const useUpdateAvailability = () => {
  const loading = ref(false);

  interface WorkingDays {
    day: string;
    startTime: string;
    endTime: string;
  }

  const updateAvailability = async (
    id: string,
    payload: WorkingDays[]
  ) => {
    loading.value = true;
    
    const res = await availability_api.$_update_availability(id, payload) as any;

    if (res.type !== "ERROR") {
      // handle success
    }

    loading.value = false;
    return res;
  };

  return { updateAvailability, loading };
};