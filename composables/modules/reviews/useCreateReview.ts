import { review_api } from "@/api_factory/modules/reviews";
import { ref } from "vue";

export const useCreateReview = () => {
	const loading = ref(false);

	const createReview = async (payload: {
		reviewer: string;
		rating: number;
		topic: string;
		review: string;
		serviceProviderId: string;
	}) => {
		loading.value = true;
		const res = await review_api.$_create_review(payload) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { createReview, loading };
};
