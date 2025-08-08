import { GATEWAY_ENDPOINT } from "../axios.config";

interface Waitlist {
    email:  String
    purpose: String
}
export const waitlist_api = {
  $_create_waitlist: (payload: Waitlist) => {
    const url = "/waitlist";
    return GATEWAY_ENDPOINT.post(url, payload);
  }
};
