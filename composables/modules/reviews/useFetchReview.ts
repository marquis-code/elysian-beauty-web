import { review_api } from "@/api_factory/modules/reviews";
import { ref } from "vue";

export const useFetchReview = () => {
	const loading = ref(false);
	const review = ref(null);

	const fetchReview = async (id: string) => {
		loading.value = true;
		const res = await review_api.$_fetch_review(id) as any;

		if (res.type !== "ERROR") {
			review.value = res.data;
		}

		loading.value = false;
	};

	return { fetchReview, review, loading };
};
