import { review_api } from "@/api_factory/modules/reviews";
import { ref } from "vue";

export const useUpdateReview = () => {
	const loading = ref(false);

	const updateReview = async (payload: {
		reviewer: string;
		rating: number;
		topic: string;
		review: string;
		serviceProviderId: string;
	}) => {
		loading.value = true;
		const res = await review_api.$_update_review(payload) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { updateReview, loading };
};
