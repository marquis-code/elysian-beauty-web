import { categories_api } from "@/api_factory/modules/categories";
import { ref } from "vue";

export const useDeleteCategory = () => {
	const loading = ref(false);

	const deleteCategory = async (id: string) => {
		loading.value = true;
		const res = await categories_api.$_delete_category(id) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { deleteCategory, loading };
};
