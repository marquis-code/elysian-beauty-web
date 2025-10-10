import { review_api } from "@/api_factory/modules/reviews";
import { useUser } from "@/composables/auth/useUser";
import { ref } from "vue";

export const useFetchServiceProvidersReview = () => {
    const loading = ref(false);
    const reviews = ref([]);
    const { user } = useUser()

    const fetchServiceProvidersReview = async () => {
        loading.value = true;
        const res = await review_api.$_fetch_service_provider_review(user.value.id) as any;

        if (res.type !== "ERROR") {
            reviews.value = res.data;
        }

        loading.value = false;
    };

    onMounted(() => {
        fetchServiceProvidersReview()
    })

    return { fetchServiceProvidersReview, reviews, loading };
};
