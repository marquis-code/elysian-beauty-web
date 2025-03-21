import { appointment_api } from "@/api_factory/modules/appointment";
import { ref } from "vue";

export const useDeleteAppointment = () => {
	const loading = ref(false);

	const deleteAppointment = async (id: string) => {
		loading.value = true;
		const res = await appointment_api.$_delete_appointment(id) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { deleteAppointment, loading };
};
