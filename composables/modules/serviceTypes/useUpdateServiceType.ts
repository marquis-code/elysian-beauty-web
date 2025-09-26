import { serviceType_api } from "@/api_factory/modules/service-types";
import { ref } from "vue";

export const useUpdateServiceType = () => {
	const loading = ref(false);

	const updateServiceType = async (id, payload: {
		serviceType: string;
		description: string;
		duration: number;
		price: number;
	}) => {
		loading.value = true;
		const res = await serviceType_api.$_update_serviceType(id, payload) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { updateServiceType, loading };
};
