import { serviceType_api } from "@/api_factory/modules/service-types";
import { ref } from "vue";

export const useDeleteServiceType = () => {
	const loading = ref(false);

	const deleteServiceType = async (id: string) => {
		loading.value = true;
		const res = await serviceType_api.$_delete_serviceType(id) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { deleteServiceType, loading };
};
