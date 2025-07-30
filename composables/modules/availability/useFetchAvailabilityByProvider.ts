// composables/useFetchAvailabilityByProvider.ts
import { availability_api } from "@/api_factory/modules/availability";
import { ref } from "vue";

export const useFetchAvailabilityByProvider = () => {
  const loading = ref(false);
  const availabilities = ref([]);

  const fetchAvailabilityByProvider = async (serviceProviderId: string) => {
    loading.value = true;
    const res = await availability_api.$_fetch_availability_by_provider(serviceProviderId) as any;

    if (res.type !== "ERROR") {
      availabilities.value = res.data;
    }

    loading.value = false;
    return res;
  };

  return { fetchAvailabilityByProvider, availabilities, loading };
};
