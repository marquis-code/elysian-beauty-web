import { categories_api } from "@/api_factory/modules/categories";
import { ref } from "vue";

export const useFetchCategories = () => {
	const loading = ref(false);
	const categories = ref([]);

	const fetchCategories = async () => {
		loading.value = true;
		const res = await categories_api.$_fetch_categories() as any;

		if (res.type !== "ERROR") {
			categories.value = res.data;
		}

		loading.value = false;
	};

	return { fetchCategories, categories, loading };
};
