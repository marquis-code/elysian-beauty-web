import { bookings_api } from "@/api_factory/modules/bookings";
import { ref } from "vue";

export const useDeleteBooking = () => {
	const loading = ref(false);

	const deleteBooking = async (id: string) => {
		loading.value = true;
		const res = await bookings_api.$_delete_bookings(id) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { deleteBooking, loading };
};
