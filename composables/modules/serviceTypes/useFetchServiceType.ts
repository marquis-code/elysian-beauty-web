import { serviceType_api } from "@/api_factory/modules/service-types";
import { ref } from "vue";

export const useFetchServiceType = () => {
	const loading = ref(false);
	const serviceType = ref(null);

	const fetchServiceType = async (id: string) => {
		loading.value = true;
		const res = await serviceType_api.$_fetch_serviceType(id) as any;

		if (res.type !== "ERROR") {
			serviceType.value = res.data;
		}

		loading.value = false;
	};

	return { fetchServiceType, serviceType, loading };
};
