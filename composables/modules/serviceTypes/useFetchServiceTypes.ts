import { serviceType_api } from "@/api_factory/modules/service-types";
import { ref } from "vue";

export const useFetchServiceTypes = () => {
	const loading = ref(false);
	const serviceTypes = ref([]);

	const fetchServiceTypes = async () => {
		loading.value = true;
		const res = await serviceType_api.$_fetch_serviceTypes() as any;
		console.log(res, 'serves heres')

		if (res.type !== "ERROR") {
			serviceTypes.value = res?.data?.data?.serviceTypes || [];
		}

		loading.value = false;
	};

	onMounted(() => {
		fetchServiceTypes()
	})

	return { fetchServiceTypes, serviceTypes, loading };
};
