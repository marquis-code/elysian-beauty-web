import { GATEWAY_ENDPOINT } from "../axios.config";

interface ServiceType {
  serviceType:  string;
  description:  string;
  duration: number;
  price:  number;
}

export const serviceType_api = {
  $_create_serviceType: (payload: ServiceType) => {
    const url = "/serviceTypes";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_update_serviceType: (payload: ServiceType) => {
    const url = "/serviceTypes";
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  $_delete_serviceType: (id: string) => {
    const url = `/serviceTypes/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  },
  $_fetch_serviceType: (id: string) => {
    const url = `/serviceTypes/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_serviceTypes: () => {
    const url = "/serviceTypes";
    return GATEWAY_ENDPOINT.get(url);
  },
};
