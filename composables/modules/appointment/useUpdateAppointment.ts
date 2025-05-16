import { appointment_api } from "@/api_factory/modules/appointment";
import { ref } from "vue";

export const useUpdateAppointment = () => {
	const loading = ref(false);

	const updateAppointment = async (payload: {
		serviceProviderId: string;
		serviceType: string;
		date: string;
		duration: number;
		location: string;
	}) => {
		loading.value = true;
		const res = await appointment_api.$_update_appointment(payload) as any;

		if (res.type !== "ERROR") {
			// handle success
		}

		loading.value = false;
	};

	return { updateAppointment, loading };
};
