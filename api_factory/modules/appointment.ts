import { GATEWAY_ENDPOINT } from "../axios.config";

interface Appointment {
  serviceProviderId: string;
  serviceType:  string;
  date:  string;
  duration: number;
  location:  string;
}

export const appointment_api = {
  $_create_appointment: (payload: Appointment) => {
    const url = "/appoinments";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_update_appointment: (id, payload: Appointment) => {
   const url = `/appoinments/${id}`;
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  $_delete_appointment: (id: string) => {
    const url = `/appoinments/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  },
  $_fetch_appointment: (id: string) => {
    const url = `/appoinments/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_appointments: () => {
    const url = "/appointments";
    return GATEWAY_ENDPOINT.get(url);
  },
};
