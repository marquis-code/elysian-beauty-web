import { waitlist_api } from "@/api_factory/modules/waitlist";
import { ref } from "vue";

export const useFetchWaitlist = () => {
	const loading = ref(false);
	const waitlist = ref([]);

	const fetchWaitlist = async () => {
		loading.value = true;
		const res = await waitlist_api.$_fetch_waitlist() as any;

		if (res.type !== "ERROR") {
			waitlist.value = res.data;
		}

		loading.value = false;
	};

	return { fetchWaitlist, waitlist, loading };
};
