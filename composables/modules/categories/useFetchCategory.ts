import { categories_api } from "@/api_factory/modules/categories";
import { ref } from "vue";

export const useFetchCategory = () => {
	const loading = ref(false);
	const category = ref(null);

	const fetchCategory = async (id: string) => {
		loading.value = true;
		const res = await categories_api.$_fetch_category(id) as any;

		if (res.type !== "ERROR") {
			category.value = res.data;
		}

		loading.value = false;
	};

	return { fetchCategory, category, loading };
};
