// composables/useFetchAvailabilities.ts
import { availability_api } from "@/api_factory/modules/availability";
import { ref } from "vue";

export const useFetchAvailabilities = () => {
  const loading = ref(false);
  const availabilities = ref([]);

  const fetchAvailabilities = async () => {
    loading.value = true;
    const res = await availability_api.$_fetch_availabilities() as any;

    if (res.type !== "ERROR") {
      availabilities.value = res.data;
    }

    loading.value = false;
    return res;
  };

  return { fetchAvailabilities, availabilities, loading };
};

