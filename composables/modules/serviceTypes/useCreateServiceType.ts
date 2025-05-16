import { serviceType_api } from "@/api_factory/modules/service-types";
import { ref } from "vue";

export const useCreateServiceType = () => {
	const loading = ref(false);

	const createServiceType = async (payload: {
		serviceType: string;
		description: string;
		duration: number;
		price: number;
	}) => {
		loading.value = true;
		const res = await serviceType_api.$_create_serviceType(payload) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { createServiceType, loading };
};
