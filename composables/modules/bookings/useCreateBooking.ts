import { bookings_api } from "@/api_factory/modules/bookings";
import { ref } from "vue";

export const useCreateBooking = () => {
	const loading = ref(false);

	const createBooking = async (payload: {
		serviceProviderId: string;
		serviceType: string;
		date: string;
		duration: number;
		location: string;
	}) => {
		loading.value = true;
		const res = await bookings_api.$_create_bookings(payload) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { createBooking, loading };
};
