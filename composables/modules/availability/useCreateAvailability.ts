// composables/useCreateAvailability.ts
import { availability_api } from "@/api_factory/modules/availability";
import { ref } from "vue";

export const useCreateAvailability = () => {
  const loading = ref(false);

  type AvailabilityTypeEnum = "IMMEDIATELY" | "NOT_AVAILABLE" | "FEW_DAYS"; 

interface WorkingDays {
  day: string;
  startTime: string;
  endTime: string;
}


  const createAvailability = async (payload: {
    serviceProviderId: string;
    availabilityType: AvailabilityTypeEnum;
    workingDays: Array<{
      day: string;
      startTime: string;
      endTime: string;
    }>;
  }) => {
    loading.value = true;
    const res = await availability_api.$_create_availability(payload) as any;

    if (res.type !== "ERROR") {
      // handle success
    }

    loading.value = false;
    return res;
  };

  return { createAvailability, loading };
};
