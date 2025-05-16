import { categories_api } from "@/api_factory/modules/categories";
import { ref } from "vue";

export const useCreateCategory = () => {
	const loading = ref(false);

	const createCategory = async (payload: {
		reviewer: string;
		rating: number;
		topic: string;
		review: string;
		serviceProviderId: string;
	}) => {
		loading.value = true;
		const res = await categories_api.$_create_category(payload) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { createCategory, loading };
};
