import { categories_api } from "@/api_factory/modules/categories";
import { ref } from "vue";

export const useFetchCategories = () => {
	const loading = ref(false);
	const categories = ref([]);

	const fetchCategories = async () => {
		loading.value = true;
		const res = await categories_api.$_fetch_categories() as any;
		console.log(res.data, 'fetch categoreis response')

		if (res.type !== "ERROR") {
			categories.value = res.data.result;
		}

		loading.value = false;
	};

	onMounted(() => {
		fetchCategories()
	})

	return { fetchCategories, categories, loading };
};
