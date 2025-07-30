import { availability_api } from "@/api_factory/modules/availability";
import { ref } from "vue";

export const useFetchAvailability = () => {
  const loading = ref(false);
  const availability = ref(null);

  const fetchAvailability = async (id: string) => {
    loading.value = true;
    const res = await availability_api.$_fetch_availability(id) as any;

    if (res.type !== "ERROR") {
      availability.value = res.data;
    }

    loading.value = false;
    return res;
  };

  return { fetchAvailability, availability, loading };
};
