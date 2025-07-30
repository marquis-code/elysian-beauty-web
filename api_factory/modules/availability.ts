// api_factory/modules/availability.ts
import { GATEWAY_ENDPOINT } from "../axios.config";

interface Availability {
  serviceProviderId: string;
  workingDays: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
}

export const availability_api = {
  $_create_availability: (payload: Availability) => {
    const url = "/availability";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  
  $_update_availability: (id: string, payload: Partial<Availability>) => {
    const url = `/availability/${id}`;
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  
  $_delete_availability: (id: string) => {
    const url = `/availability/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  },
  
  $_fetch_availability: (id: string) => {
    const url = `/availability/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  
  $_fetch_availabilities: () => {
    const url = "/availability";
    return GATEWAY_ENDPOINT.get(url);
  },
  
  $_fetch_availability_by_provider: (serviceProviderId: string) => {
    const url = `/availability/service-provider/${serviceProviderId}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  
  $_health_check: () => {
    const url = "/availability/health";
    return GATEWAY_ENDPOINT.get(url);
  },
};