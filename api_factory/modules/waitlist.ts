import { GATEWAY_ENDPOINT } from "../axios.config";

export const waitlist_api = {
  $_join_waitlist: (payload: { email: string, purpose: string}) => {
    const url = '/api/waitlist';
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_fetch_waitlist: () => {
    const url = '/api/waitlist';
    return GATEWAY_ENDPOINT.get(url);
  }
};
