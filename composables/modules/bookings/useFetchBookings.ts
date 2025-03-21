import { bookings_api } from "@/api_factory/modules/bookings";
import { ref } from "vue";

export const useFetchBookings = () => {
	const loading = ref(false);
	const bookings = ref([]);

	const fetchBookings = async () => {
		loading.value = true;
		const res = await bookings_api.$_fetch_bookingss() as any;

		if (res.type !== "ERROR") {
			bookings.value = res.data;
		}

		loading.value = false;
	};

	return { fetchBookings, bookings, loading };
};
