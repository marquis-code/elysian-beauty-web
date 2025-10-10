import { serviceType_api } from "@/api_factory/modules/service-types";
import { ref } from "vue";

export const useFetchServiceType = () => {
	const loading = ref(false);
	const serviceType = ref(null);
	const route = useRoute()

	const fetchServiceType = async () => {
		loading.value = true;
		const res = await serviceType_api.$_fetch_serviceType(route?.params?.id) as any;

		if (res.type !== "ERROR") {
			serviceType.value = res?.data?.data?.serviceType;
		}

		loading.value = false;
	};

	onMounted(() => {
		fetchServiceType()
	})
	return { fetchServiceType, serviceType, loading };
};
