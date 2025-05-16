import { appointment_api } from "@/api_factory/modules/appointment";
import { ref } from "vue";

export const useFetchAppointments = () => {
	const loading = ref(false);
	const appointments = ref([]);

	const fetchAppointments = async () => {
		loading.value = true;
		const res = await appointment_api.$_fetch_appointments() as any;

		if (res.type !== "ERROR") {
			appointments.value = res.data;
		}

		loading.value = false;
	};

	return { fetchAppointments, appointments, loading };
};
