import { categories_api } from "@/api_factory/modules/categories";
import { ref } from "vue";

export const useUpdateCategory = () => {
	const loading = ref(false);

	const updateCategory = async (payload: {
		reviewer: string;
		rating: number;
		topic: string;
		review: string;
		serviceProviderId: string;
	}) => {
		loading.value = true;
		const res = await categories_api.$_update_category(payload) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { updateCategory, loading };
};
