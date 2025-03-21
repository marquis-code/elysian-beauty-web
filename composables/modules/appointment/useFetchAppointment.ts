import { appointment_api } from "@/api_factory/modules/appointment";
import { ref } from "vue";

export const useFetchAppointment = () => {
	const loading = ref(false);
	const appointment = ref(null);

	const fetchAppointment = async (id: string) => {
		loading.value = true;
		const res = await appointment_api.$_fetch_appointment(id) as any;

		if (res.type !== "ERROR") {
			appointment.value = res.data;
		}

		loading.value = false;
	};

	return { fetchAppointment, appointment, loading };
};
