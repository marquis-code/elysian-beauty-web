import { GATEWAY_ENDPOINT } from "../axios.config";

interface ServiceType {
  serviceType:  string;
  description:  string;
  duration: number;
  price:  number;
}

export const serviceType_api = {
  $_create_serviceType: (payload: ServiceType) => {
    const url = "/service-types";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_update_serviceType: (id: string, payload: ServiceType) => {
    const url = `/service-types/${id}`;
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  $_delete_serviceType: (id: string) => {
    const url = `/service-types/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  },
  $_fetch_serviceType: (id: string) => {
    const url = `/service-types/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_serviceTypes: () => {
    const url = "/service-types";
    return GATEWAY_ENDPOINT.get(url);
  },
    $_fetch_serviceProvider_services: (id: string) => {
   const url = `/service-types/sp/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
};
