import { bookings_api } from "@/api_factory/modules/bookings";
import { ref } from "vue";

export const useFetchBooking = () => {
	const loading = ref(false);
	const booking = ref(null);

	const fetchBooking = async (id: string) => {
		loading.value = true;
		const res = await bookings_api.$_fetch_bookings(id) as any;

		if (res.type !== "ERROR") {
			booking.value = res.data;
		}

		loading.value = false;
	};

	return { fetchBooking, booking, loading };
};
