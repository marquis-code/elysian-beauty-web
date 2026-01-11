// api_factory/modules/availability.ts
import { GATEWAY_ENDPOINT } from "../axios.config";

type AvailabilityTypeEnum = "IMMEDIATELY" | "NOT_AVAILABLE" | "FEW_DAYS"; 

interface WorkingDays {
  day: string;
  startTime: string;
  endTime: string;
}

interface Availability {
  serviceProviderId: string;
  availabilityType: AvailabilityTypeEnum;
  workingDays: WorkingDays[];
}

export const availability_api = {
  $_create_availability: (payload: Availability) => {
    const url = "/availability";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  
  $_update_availability: (id: string, payload: WorkingDays[]) => {
    const url = `/availability/${id}`;
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  $_fetch_availability_by_provider: (serviceProviderId: string) => {
    const url = `/availability/service-provider/${serviceProviderId}`;
    return GATEWAY_ENDPOINT.get(url);
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
  
  $_health_check: () => {
    const url = "/availability/health";
    return GATEWAY_ENDPOINT.get(url);
  },
};