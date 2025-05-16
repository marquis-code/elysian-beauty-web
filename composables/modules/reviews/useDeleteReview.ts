import { review_api } from "@/api_factory/modules/reviews";
import { ref } from "vue";

export const useDeleteReview = () => {
	const loading = ref(false);

	const deleteReview = async (id: string) => {
		loading.value = true;
		const res = await review_api.$_delete_review(id) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { deleteReview, loading };
};
