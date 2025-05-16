import { review_api } from "@/api_factory/modules/reviews";
import { ref } from "vue";

export const useFetchReviews = () => {
	const loading = ref(false);
	const reviews = ref([]);

	const fetchReviews = async () => {
		loading.value = true;
		const res = await review_api.$_fetch_reviews() as any;

		if (res.type !== "ERROR") {
			reviews.value = res.data;
		}

		loading.value = false;
	};

	return { fetchReviews, reviews, loading };
};
