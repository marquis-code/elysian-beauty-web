import { GATEWAY_ENDPOINT } from "../axios.config";

interface Booking {
  serviceProviderId: string;
  serviceType:  string;
  date:  string;
  duration: number;
  location:  string;
}

export const bookings_api = {
  $_create_bookings: (payload: Booking) => {
    const url = "/bookingss";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_update_bookings: (payload: Booking) => {
    const url = "/bookingss";
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  $_delete_bookings: (id: string) => {
    const url = `/bookingss/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  },
  $_fetch_booking: (id: string) => {
    const url = `/bookings/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_bookings: () => {
    const url = "/bookings";
    return GATEWAY_ENDPOINT.get(url);
  },
};
