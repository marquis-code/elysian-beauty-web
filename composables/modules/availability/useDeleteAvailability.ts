// composables/useDeleteAvailability.ts
import { availability_api } from "@/api_factory/modules/availability";
import { ref } from "vue";

export const useDeleteAvailability = () => {
  const loading = ref(false);

  const deleteAvailability = async (id: string) => {
    loading.value = true;
    const res = await availability_api.$_delete_availability(id) as any;

    if (res.type !== "ERROR") {
      // handle success
    }

    loading.value = false;
    return res;
  };

  return { deleteAvailability, loading };
};
